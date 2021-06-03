==============
my-ts-orm-demo
==============

- Preface
- How to build projects?


------------------------------------------------------------------------------------------------------------------------------
Preface
=======
This projects demostrates:
- how to build NestJS based servers which accesses database with ORM
- how to share model object between NestJS server and Angular client with Angular library 

Client:					my-ts-orm-demo/projects/my-ts-orm-demo
Common library:			my-ts-orm-demo/projects/my-ts-orm-demo-lib
Server 1 (MikroORM):	my-mikroorm-demo-server
Server 2 (TypeORM):		my-typeorm-demo-server

NOTE:
	It's not a mono-repo project. I didn't want to use the same NPM libraries for client and server applications.
	You have to build projects separately - one-by-one.
	
------------------------------------------------------------------------------------------------------------------------------
How to build projects?
======================
- NPM packages:
	- client+lib:
		
		cd my-ts-orm-demo
		npm i
		
	- server 1:

		cd my-mikroorm-demo-server
		npm i
		
	- server 2:

		cd my-typeorm-demo-server
		npm i
		
	
- library:
		
	cd my-ts-orm-demo
	npm run build-lib
	
		OR 
		
	npm run build-lib-watch	
	

- softlinks to library (ONLY ONCE) :
	- check if softlinks are consistent:
	
		cd HOME\AppData\Roaming\npm\node_modules
		
	- if 'my-ts-orm-demo-lib' exists, try to open
	
		If it doesn't exist or you cannot open it it's inconsistent.
		If it exists remove it and create it again:

			cd my-ts-orm-demo\dist\my-ts-orm-demo-lib
			npm link

	- then bind lib link into projects:
		cd my-mikroorm-demo-server
		npm run lib-link					(which calls:	npm link my-ts-orm-demo-lib)
	

		cd my-typeorm-demo-server
		npm run lib-link					(which calls:	npm link my-ts-orm-demo-lib)
	
- build:

	cd my-mikroorm-demo-server
	npm run build

	cd my-typeorm-demo-server
		

- run:

	- Pre-requisites:
	
		- PostgreSQL database:	mymikroormdemo 
			
		Create database with:	createDbWithSchema.sh
		
		
	- run server:
		
		- server 1:
			cd my-mikroorm-demo-server
			npm run start
			
				OR
				
			npm run start:dev
		
		- server 2:
			cd my-typeorm-demo-server
			npm run start
			
				OR
				
			npm run start:dev
			
		!!!!!!!! NOTE: Only one server can be started at a time (every server listens on port 3000).
			
	- run app:
	
		cd my-ts-orm-demo
		npm run start