
## grpc web reference:
https://grpc.io/docs/platforms/web/quickstart/

## install js plugin for protoc:

### protoc

[Protoc Readme](protoc.md)

### NPM

    npm install -g protoc-gen-js
    npm install -g webpack-cli

### Steps

To generate the protobuf message classes from our .proto file, run the following command:

    protoc -I=./ NAME.proto --js_out=import_style=commonjs:./


To generate the service client stub file, run this command:

    protoc -I=./ echo.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./

In the --grpc-web_out param above:

mode can be `grpcwebtext`` (default) --> unary & Server-side Streaming

or `grpcweb` --> only unary

    import_style can be closure (default) or commonjs

### Error when using Webpack

[Check This}("https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported")

export NODE_OPTIONS=--openssl-legacy-provider

npm i -g webpack-cli


### Install Envoy Proxy

to proxy request to gRPC Backend Server you have to set up a proxy like envoy:
[Install Envoy]("https://www.envoyproxy.io/docs/envoy/latest/start/install")

