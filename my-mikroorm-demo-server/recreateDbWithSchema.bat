dropDb -U postgres mymikroormdemo
createDb -U postgres mymikroormdemo

call node_modules/.bin/mikro-orm schema:update --fk-checks -r

