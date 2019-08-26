# healthnet-block

A healthcare prototype application in Blockchain


--------


# Prerequisites


    - Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
    - Docker Engine: Version 17.03 or higher
    - Docker-Compose: Version 1.8 or higher
    - Node: 8.9 or higher (note version 9 and higher is not supported)
    - npm: v5.x
    - git: 2.9.x or higher
    - Python: 2.7.x
    - A code editor of your choice, we recommend VSCode.


    ! running the prerequisites script will automatically get the above components and you can skip this step and go through setup
        - Since the script installs node via nvm u need to make sure no other runtime is the system (like `nodejs` from snap pckg manager)

# Setup

    1) `npm install -g composer-cli@0.20`

    2) `npm install -g composer-rest-server@0.20`

    3) `npm install -g generator-hyperledger-composer@0.20`

    4) `npm install -g yo`

    5) `npm install -g composer-playground@0.20`

    ## Install Hyperledger Fabric

        - `
            mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

            curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
            tar -xvf fabric-dev-servers.tar.gz

        `

        - `
            cd ~/fabric-dev-servers
            export FABRIC_VERSION=hlfv11
            ./downloadFabric.sh
        `

        - `
            cd ~/fabric-dev-servers
            export FABRIC_VERSION=hlfv11
            ./startFabric.sh
            ./createPeerAdminCard.sh
        `

    // Run: `composer-playground` in order to run the local playground without need of frontend testing purposes only.


    # Seting up the network:

	1) `yo hyperledger-composer:businessnetwork`
	2) Enter `healthnet-block` for the network name
	3) Select `Apache-2.0` as the license
	4) Enter `mc.thesis.demo` as the namespace
	5) Select `No` when asked whether to generate an empty network or not
	

# Generate the business network archive:

	1) navigate inside the project folder
	2) `composer archive create -t   dir -n .`

	After this a `.bna` file called `healthnet-block@0.0.1.bna` will be created.


# Deploying the network:

	A PeerAdmin business network card with the correct credentials is already created as part of development environment installation.

	1) install the network run:
	`composer network install --card PeerAdmin@hlfv1 --archiveFile healthnet-block@0.0.1.bna`


	2) start the network run:
	`composer network start --networkName healthnet-block --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card`

	3) Import the network administrator identity
	`composer card import --file networkadmin.card`
    // this can be skipped after first time

	4) Ping our network so see that it's alive
	`composer network ping --card admin@healthnet-block`


# Generating the REST server:

	We will generate a skeleton rest server via `composer-rest-server` for exposing the different api endpoints for the Frontend Web Application. The REST API is prefered over other API architectures as it provides us a useful layer of language angostic abstraction.

	1) Run: `composer-rest-server` or `composer-rest-server -c admin@healthnet-block -n never -d n -w true` to restart

	2) Enter `admin@HealthNet-Block` as the card name

	3) Select `Never use namespaces` when asked whether to use namespaces in the generated API

	4) Select `No` when asked to secure the generated API 

	5) Select `No` when asked to enable authentication using Passport

	6) Select `No` when asked to enable the explorer test interface

	7) Select `No` when asked to enable dynamic logging

	8) Select `Yes` when asked whether to enable event publication

	9) Select `No` when asked whether to enable TLS security


	The generated API is connected to the deployed blockchain and business network. Skipping on some of the options is only done for the sake of development demonstration of the prototype application and is considered a future work feature implementation to further solidify the security of the platform.


# Generate a skeleton Angular application


	1) inside the folder run `yo hyperledger-composer:angular`

	2) Select `Yes` when asked to connect to running business network

	3) Enter standard package.json information:
		- project name
		- description
		- author name
		- author email
		- license
	
	4) Enter `admin@healthnet-block` for the business network card
	
	5) Select `Connect to an existing REST API`

	6) Enter `http://localhost` for the REST server address.

	7) Enter `3000` for the server port.

	8) Select `Namespaces are not used`

	This will get us a scaffolding for the project and install all dependencies needed via the package manager, npm in our case. Now we can see a second `healthnet-block` folder inside which contains our Frontend application in Angular 4. navigate through the command line inside of it and run: `npm start`. This will fire up the Angular frontend application running against our REST API at `http://localhost:4200`

