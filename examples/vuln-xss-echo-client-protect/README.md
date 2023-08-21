# Setup

## Generate Stub Files

stub files are ready but if you want to make change on .proto file you can recompile with these commands:

To generate the protobuf message classes from our .proto file, run the following command:

    protoc -I=./ NAME.proto --js_out=import_style=commonjs:./

To generate the service client stub file, run this command:

    protoc -I=./ echo.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./

then you can make your desired changes to stub files: `NAME_pb2` and `NAME_pb2_grpc` files

## Node gRPC Back-end Server Setup
you have to run the server (gRPC Backend Server)
go to node-server directory:

    cd node-server
    npm install
    node server.js


## Setup Proxy
run the envoy proxy to proxy request to gRPC backend server:

in each example there is a `envoy.yaml` file which is config file of envoy proxy. check the ports in the config

    evnoy -c envoy.yaml

## Setup Javascript Front-end

all front-end files are in commonjs-example, after making changes to file you have to webpack them:

    cd commonjs-example
    npm install
    npx webpack

then it makes a `dist` directory which webpacked js file is there, and you have to import `dist/main.js` in your html code which are added by default in echotest.html file:

then server the `commonjs-example` directory with python:
    
    cd commonjs-example
    python3 -m http.server --bind 127.0.0.1 8686
    
open `http://127.0.0.1:8686/echotest.html` in browser and test the code.

    