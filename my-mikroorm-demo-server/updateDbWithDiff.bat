pg_dump -U postgres mymikroormdemo > db-before.sql
call node_modules/.bin/mikro-orm schema:update --fk-checks -d
call node_modules/.bin/mikro-orm schema:update --fk-checks -r

pg_dump -U postgres mymikroormdemo > db.sql

rem ediff db-before.sql db.sql

diff db-before.sql db.sql
pause

