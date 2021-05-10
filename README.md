# Biobank

## Initial concepts
It is advisable to do at least some Hyperledger Fabric tutorials, especially [Using the Fabric test network](https://hyperledger-fabric.readthedocs.io/en/release-2.2/test_network.html), [Deploying a smart contract to a channel](https://hyperledger-fabric.readthedocs.io/en/release-2.2/deploy_chaincode.html), and [Writing your First Application](https://hyperledger-fabric.readthedocs.io/en/release-2.2/write_first_app.html).

Maybe you can find helpful to read the [Key Concepts](https://hyperledger-fabric.readthedocs.io/en/release-2.2/key_concepts.html) section

## Project
This is the master project in the course of computer engineer, of University of São Paulo.


## How to use
### Setting up 
1. Clone the repository
2. Install the [Fabric binaries](https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html) (I'm not sure if it is absolutely needed)
3. Set up the environment variables `export PATH=<path to repository location>/bin:$PATH`
4. Install Docker and Docker Compose

### Up your network
1. go to blockchain/test-network/
2. Set up a network, channel, and CA's with `./network.sh up createChannel -ca`

### Deploying a smart contract
1. Write your smart contract in contract/lib/
2. go to test-network/
3. Use the `./deploy_chaincode.sh` script to deploy your smart contract <br>
3.1 Make shure you set up the parameters `CHAINCODE_NAME`, and `SEQUENCE`

### deploy application
1. go to application/fabric-details
2. Delete the folder wallet
3. run `node enrollAdmin.js` and `node registerUser.js` to create user
4. go to application/
5. run `node index.js`


### Set Up Hyperledger Explorer
1. Go to explorer/
2. Modify file app/platform/fabric/connection-profile/first-network.json <br>
2.1. correct all paths <br>
2.2. Correct the keystore filename, to name in adminPrivateKey <br>
2.2.1 ex: "/home/toshi/Desktop/biobank/biobank/blockchain/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/24b525451c164323e9cb21207063d252bb6b53099715c28a6a732787a0de4ae8_sk"
3. cd app/persistence/fabric/postgreSQL/db
4. sudo -u postgres ./createdb.sh
5. run `./main.sh install` and `./start.sh`
6. maybe you need to delete /wallet/first-network/exploreradmin.id


### Monitor network
You can monitor you network by command `./monitordocker.sh net_test`
