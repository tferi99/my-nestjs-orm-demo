#------------------------------------ 
SRC_ROOT=../src
SERVER_LIB_SRC=../libs/client-lib/src
DEST_TS=${SERVER_LIB_SRC}/client-lib.model.ts

CLIENT_1_LIB=../../my-ts-orm-demo/libs

# generate into TS file
echo 'Generating...'
./createModelInterface.sh $SRC_ROOT > $DEST_TS

# deploy the whole library to clients
echo 'Deploy...'
rm -rf $CLIENT_1_LIB/client-lib/*
cp -R $SERVER_LIB_SRC/* $CLIENT_1_LIB/client-lib
