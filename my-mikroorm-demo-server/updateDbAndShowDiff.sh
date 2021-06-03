DB=mymikroormdemo

pg_dump -U postgres ${DB} > db-before.sql
node_modules/.bin/mikro-orm schema:update --fk-checks -d
node_modules/.bin/mikro-orm schema:update --fk-checks -r

pg_dump -U postgres ${DB} > db.sql

#ediff db-before.sql db.sql

diff db-before.sql db.sql

