First steps
-----------
- dependencies:
	- server:

		cd my-typeorm-demo-server
		npm i
		
	- app:
		
		cd my-typeorm-demo-ws
		npm i
		
- library:
		
	cd cd my-typeorm-demo-ws
	npm run build-lib
	
- softlinks to library:

	cd my-typeorm-demo-ws\dist\my-typeorm-demo-lib
	npm link
	
	cd my-typeorm-demo-server
	npm link my-typeorm-demo-lib
