DB=mymikroormdemo

dropDb -U postgres ${DB}
createDb -U postgres ${DB}

node_modules/.bin/mikro-orm schema:create --fk-checks -r

