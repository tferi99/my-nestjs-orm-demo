======================
How to build projects?
======================

- NPM packages:
	- server:

		cd my-mikroorm-demo-server
		npm i
		
	- app:
		
		cd my-ts-orm-demo
		npm i
	
	NOTE: Since I preferred MikroORM to TypeORM 'my-typeorm-demo-server' finished.
		It became an abandoned project.		
		You can also try to build it but it maybe consists inconsistent model classes.
	
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
		If it exists remove it. Create it again.

	cd my-ts-orm-demo\dist\my-ts-orm-demo-lib
	npm link
	
	cd my-mikroorm-demo-server
	npm link my-ts-orm-demo-lib

- build:

	cd my-mikroorm-demo-server
	npm run build
	
- run:

	- Pre-requisites:
	
		- PostgreSQL database:	mymikroormdemo 
			
		Create database with:	createDbWithSchema.bat
		
		
	- run server:
	
		cd my-mikroorm-demo-server
		npm run start
		
			OR
			
		npm run start:dev
		
	- run app:
	
		cd my-ts-orm-demo
		npm run start