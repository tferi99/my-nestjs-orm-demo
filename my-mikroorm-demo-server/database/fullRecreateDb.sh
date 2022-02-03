. .config

dropDb -U postgres ${DB}

createDb -U postgres ${DB}
if [ $? -ne 0 ]
then
	echo 'Database cannot be created.' 1>&2
	exit
fi

node ../dist/src/orm/call-create-schema.js

