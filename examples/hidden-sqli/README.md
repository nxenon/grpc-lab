# Hidden SQLi

gRPC-Web SQLi Lab

# Python Setup

    python -m pip install grpcio
    python -m pip install grpcio-tools

if you want to make change on .proto file then you have to run this:

    python -m grpc_tools.protoc -I=. --python_out=. --pyi_out=./ --grpc_python_out=./ hiddensqli.proto

# 0. Mysql Setup

first you have to set up mysql:

when you first run the server.py, if there is not a `.env` file it creates one.

the script creates a database, so that it must have enough permission to do this. DB name is: `grpc_lab_hidden_sqli`

    host=HOSTNAME
    user=USERNAME
    password=PASSWORD

in `examples/hidden-sqli/server` there is a requirements.txt file which you have to install them.

    pip install -r requirements.txt

if there is any problem in sql tables or rows, just delete the database `grpc_lab_hidden_sqli` and rerun the server.py


# 1. Run Server
Run the Server
    
    cd server
    python3 server.py


# Setup gRPC-Web (Client Side)

See this [gRPC-Web Readme](../../grpc-web.md)

## 2. Run Envoy Proxy


## 3. Server the JS & HTML Files
