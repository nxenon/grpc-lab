# Hello World

gRPC client and server testing. 

Note: This is not gRPC-Web Example


# Python Setup

    python -m pip install grpcio
    python -m pip install grpcio-tools

if you want to make change on .proto file then you have to run this:

    python -m grpc_tools.protoc -I=. --python_out=. --pyi_out=./ --grpc_python_out=./ helloworld.proto

# Run
Run the Server

    python3 hello_server.py

Run the Client

    python3 hello_client
