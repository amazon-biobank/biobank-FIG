cd blockchain/test-network
./network.sh up createChannel -ca

# setar enviroment
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

./deploy_chaincode.sh

cd application/fabric-details
deletar wallet antigo
node enrollAdmin.js
node registerUser.js
cd application
node index.js

cd explorer/..../first-network
renomear o admin sk
cd app/persistence/fabric/postgreSQL/db
sudo -u postgres ./createdb.sh
./main.sh install
npm start

deletar /wallet/first-network/exploreradmin.id

# Para desligar o explorer
npm run app-stop
npm install


cd test-network



# setar para peer 1
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# setar para peer 2
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051


# -------------------------------- IBM BLOCKCHAIN

START_IMAGE="ibmcom/ibp-microfab:0.0.11"
docker run -e MICROFAB_CONFIG --label fabric-environment-name="1 Org Local Fabric Microfab" -p 8080:8080 $START_IMAGE

CONTAINER=$(docker ps -f label=fabric-environment-name="1 Org Local Fabric Microfab" -q -a)
for CONTAINER in $(docker ps -f label=fabric-environment-name="1 Org Local Fabric Microfab" -q -a) 
do 
docker rm -f ${CONTAINER}
done

docker volume prune -f

# for VOLUME in $(docker volume ls -f label=fabric-environment-name="1 Org Local Fabric Microfab" -q)
# do 
# docker volume rm -f ${VOLUME} 
# done


export MICROFAB_CONFIG='{"port":8080,  "endorsing_organizations": [{"name": "Org1"}],"channels": [{"name": "mychannel","endorsing_organizations": ["Org1"]}]}'

export MICROFAB_CONFIG='{
    "port": 8080,
    "endorsing_organizations":[
        {
            "name": "Org1"
        }
      ],
    "channels":[
        {
            "name": "channel1",
            "endorsing_organizations":[
                "Org1"
            ],
            "capability_level": "V2_0"
        },
        {
            "name": "channel2",
            "endorsing_organizations":[
                "Org1"
            ],
            "capability_level": "V2_0"
        }
    ],
    "timeout": "60s"
}'

export MICROFAB_CONFIG='{
    "port": 8080,
    "endorsing_organizations":[
        {
            "name": "Org1"
        }
      ],
    "channels":[
        {
            "name": "channel1",
            "endorsing_organizations":[
                "Org1"
            ],
            "capability_level": "V2_0"
        }
    ],
    "timeout": "60s"
}'