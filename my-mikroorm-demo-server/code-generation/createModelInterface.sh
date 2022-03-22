# It create interface module for client projects.
#
# Call ./entitiesDos2Unix.sh if conversion fails.
APP=`basename $0`
BLACKLIST=gen.blacklist
TRACE=0

if [ $# -ne 1 ]
then
	
	echo "Usage: $APP <source-root>" 1>&2
	exit 1
fi

SRC_ROOT=$1

echo "//!!!!!!!!!!!!!!!!!! GENARATED BY ${APP} - DON'T CHANGE IT !!!!!!!!!!!!!!!!!!"

convert() {
	if [ $# -ne 1 ]
	then
		echo "Usage: convert(<file>)" 1>&2
		exit 1
	fi
	IN_FILE=$1
	
	#echo "========================= $IN_FILE ========================="
	cat $IN_FILE | awk -v trace=$TRACE -v file=$IN_FILE '
		# DISABLED by default
		BEGIN {		
			disablePrint(">>>>>>>>>>>> STARTUP: " file)
			noPrintSectionDepth=0
		}
		
		# constructor: DONT-PRINT + NOPRINT_SECTION++									constructor(obj?: Partial<Company>) {
		/^[ \t]*constructor\(.*{.*$/ {
			noPrintSectionDepth=1
			disablePrint("NOPRINT_SECTION: " noPrintSectionDepth)
			next
		}
		
		# we are in NOPRINT_SECTION: DONT-PRINT
		{
			if (noPrintSectionDepth > 0) {
				# closing bracket: NOPRINT_SECTION--									}
				if (match($0, /^[ \t]*.*}[ \t]*$/) > 0) {
					noPrintSectionDepth--
					if (noPrintSectionDepth <= 0) {
						enablePrint("NOPRINT_SECTION: " noPrintSectionDepth)
					}
					next
				}

				# opening bracket: NOPRINT_SECTION++									something {
				if (match($0, /^[ \t]*.*{[ \t]*$/) > 0) {								
					noPrintSectionDepth++
					next
				}
				next
			}
		}
		
		# empty line: DONT-PRINT
		/^[ \t]*$/ {
			next
		}
		
		# import: DONT-PRINT
		/^[ \t]*import/ {
			next
		}
		
		# single-line annotation: DONT-PRINT + ON										@Property({ length: 256 }) 
		/^[ \t]*@.*[\)][ \t]*$/ {
			enablePrint("single-line @")
			next
		}
		
		# start of multy-line annotation: DONT-PRINT + OFF								@Property({
		# note: pattern is simple because single-line annotation catched before
		/^[ \t]*@.*$/ {
			disablePrint("START multy-line @")
			next
		}
		
		# start of multy-line comment: DONT-PRINT + OFF									/* comment
		/^[ \t]*\/\*.*/ {
			disablePrint("END multy-line comment")
			next
		}
		
		# end of multy-line comment: DONT-PRINT + ON									comment */			
		/.*\*\/[ \t]*$/ {
			enablePrint("START multy #")
			next
		}
		
		# single-line comment: DONT-PRINT												// comment	
		/^[ \t]*\/\/.*/ {
			next
		}
		
		# export class -> interface: PRINT + ON											export class Person extends OrmIntTimestampEntity {
		/^[ \t]*export.*class.*/ {
			enablePrint("export")
			gsub("class", "interface", $0)
			gsub("abstract", "", $0)
			gsub("extends OrmBaseEntity", "", $0)
			gsub("  ", " ", $0)
			printf "\n%s\n", $0
			next
		}
		
		# Collection declaration -> :[]																workers: Collection<Person>;	->	workers: Person[];
		/[ \t]*[a-zA-Z0-9_]+[ \t]*:[ \t]*Collection<[a-zA-Z_]+>/ {
			enablePrint("property collection")
			s = gensub(/([ \t]*[a-zA-Z0-9_]+[ \t]*:[ \t]*)(Collection<)([a-zA-Z0-9_]+)>.*/, "\\1\\3[];", "g")
			printf "%s\n", s
			next
		}

		# Collection definition -> = []																workers = new Collection<Person>(this);	->	workers = new Person[];
		/[ \t]*[a-zA-Z0-9_]+[ \t]*=[ \t]*new[ \t]*Collection<[a-zA-Z_]+>/ {
			enablePrint("property collection")
			s = gensub(/([ \t]*[a-zA-Z0-9_]+[ \t]*=[ \t]*new[ \t]*)(Collection<)([a-zA-Z0-9_]+)>.*/, "\\1\\3[];", "g")
			printf "%s\n", s
			next
		}

		# property with type: PRINT																	note: string;
		# + remove '!'
		/^[ \t]*[a-z]*[ ]*[a-zA-Z0-9_!?]+[ \t]*:[ \t][a-zA-Z0-9_]+;[ \t]*$/ {						
			enablePrint("property + type")
			gsub("public ", "", $0)
			match($0, /^[ \t]*([a-zA-Z0-9_!?]+)[ \t]*:[ \t]([a-zA-Z0-9_]+);[ \t]*$/, fld)
			gsub("!", "", fld[1])
			printf "  %s: %s;\n", fld[1], fld[2]
			next
		}
		
		# property with type and default value: YES													  active: bool = false;
		# -> optional:      property?: type
		/^[ \t]*[a-z]*[ ]*[a-zA-Z0-9_!?]+[ \t]*:[ \t]*[a-zA-Z0-9_]+[ \t]=.*;[ \t]*$/ {
			enablePrint("property + type + default")
			gsub("public ", "", $0)
			match($0, /^[ \t]*([a-zA-Z0-9_!?]+)[ \t]*:[ \t]*([a-zA-Z0-9_]+)[ \t]=.*;[ \t]*$/, fld)
			printf "  %s?: %s;\n", fld[1], fld[2]
			next
		}
		
		# all other: PRINT if ON
		{
			if (enabled == 1) {
				printf "%s\n", $0
			}
		}
		
		function enablePrint(cause) {
			enabled=1
			if (trace > 0) {
				printf "[%s]+++++++++++++++++++++++++++++++ ON\n", cause
			}
		}
		
		function disablePrint(cause) {
			enabled=0
			if (trace > 0) {
				printf "[%s]----------------------------------------------------- off\n", cause
			}
		}
		
	'
	
}


find $SRC_ROOT -name '*.entity.ts' | while read f
do
	fname=`basename $f`
	grep -q $fname $BLACKLIST
	if [ $? -ne 0 ]
	then
		#echo "--- $fname ---"
		convert $f
	fi
done


