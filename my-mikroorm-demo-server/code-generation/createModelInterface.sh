# It create interface module for client projects.
#
# Call ./entitiesDos2Unix.sh if conversion fails.
APP=`basename $0`
BLACKLIST=gen.blacklist
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
	cat $IN_FILE | awk '
		# DISABLED by default
		BEGIN {		
			disablePrint("STARTUP")
		}
		# empty line: NO
		/^[ \t]*$/ {
			next
		}
		
		# import: NO
		/^[ \t]*import/ {
			next
		}
		
		# 1-line annotation: NO + ON
		/^[ \t]*@.*[\)][ \t]*$/ {
			enablePrint("1 @")
			next
		}
		
		# start of multy-line annotation: NO + DISABLED
		/^[ \t]*@.*[^\)][ \t]*$/ {
			disablePrint("START multy @")
			next
		}
		
		# start of multy-line comment: NO + ENABLED
		/^[ \t]*\/\*/ {
			disablePrint("END multy #")
			next
		}
		
		# end of multy-line comment: NO + ENABLED
		/\*\/[ \t]*$/ {
			enablePrint("START multy #")
			next
		}
		
		# 1-line comment: NO
		/^[ \t]*\/\// {
			next
		}
		
		# export: YES + ENABLED
		/^[ \t]*export.*class/ {
			enablePrint("export")
			gsub("class", "interface", $0)
			gsub("abstract", "", $0)
			gsub("extends OrmBaseEntity", "", $0)
			gsub("  ", " ", $0)
			printf "\n%s\n", $0
			next
		}
		
		# Collection -> []
		/[ \t]*[a-zA-Z0-9_]+[ \t]*:[ \t]*Collection<[a-zA-Z_]+>/ {
			enablePrint("property collection")
			s = gensub(/([ \t]*[a-zA-Z0-9_]+[ \t]*:[ \t]*)(Collection<)([a-zA-Z0-9_]+)>.*/, "\\1\\3[];", "g")
			printf "%s\n", s
			next
		}
		
		# property with type: YES
		# remove '!'
		/^[ \t]*[a-z]*[ ]*[a-zA-Z0-9_!?]+[ \t]*:[ \t][a-zA-Z0-9_]+;[ \t]*$/ {
			enablePrint("property + type")
			gsub("public ", "", $0)
			match($0, /^[ \t]*([a-zA-Z0-9_!?]+)[ \t]*:[ \t]([a-zA-Z0-9_]+);[ \t]*$/, fld)
			gsub("!", "", fld[1])
			printf "  %s: %s;\n", fld[1], fld[2]
			next
		}
		
		# property with type and default value: YES
		# -> optional:      property?: type
		/^[ \t]*[a-z]*[ ]*[a-zA-Z0-9_!?]+[ \t]*:[ \t]*[a-zA-Z0-9_]+[ \t]=.*;[ \t]*$/ {
			enablePrint("property + type + default")
			gsub("public ", "", $0)
			match($0, /^[ \t]*([a-zA-Z0-9_!?]+)[ \t]*:[ \t]*([a-zA-Z0-9_]+)[ \t]=.*;[ \t]*$/, fld)
			printf "  %s?: %s;\n", fld[1], fld[2]
			next
		}
		
		# all other
		{
			if (enabled == 1) {
				printf "%s\n", $0
			}
		}
		
		function enablePrint(cause) {
			enabled=1
			#printf "[%s]+++++++++++++++++++++++++++++++ ON\n", cause
		}
		
		function disablePrint(cause) {
			enabled=0
			#printf "[%s]----------------------------------------------------- off\n", cause
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


