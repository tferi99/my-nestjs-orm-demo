======================
How to build projects?
======================

- NPM packages:
	- server:

		cd my-typeorm-demo-server
		npm i
		
	- app:
		
		cd my-typeorm-demo-ws
		npm i
	
	
- library:
		
	cd cd my-typeorm-demo-ws
	npm run build-lib
	
		OR 
		
	npm run build-lib-watch	
	
	

- softlinks to library (ONLY ONCE) :

	cd my-typeorm-demo-ws\dist\my-typeorm-demo-lib
	npm link
	
	cd my-typeorm-demo-server
	npm link my-typeorm-demo-lib

- build:

	cd my-typeorm-demo-server
	npm run build
	