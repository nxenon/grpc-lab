
Basic Description of a .proto file:

https://grpc.io/docs/what-is-grpc/introduction/


Tutorial:

    https://protobuf.dev/getting-started/pythontutorial/


## Installation
### on Macos

    brew install protobuf
    protoc --version

or download executable:
https://github.com/protocolbuffers/protobuf/releases/download/v23.3/protoc-23.3-osx-x86_64.zip

### on Linux

apt install -y protobuf-compiler

    protoc --version


### on Windows

Download Windows binary and run it:

https://github.com/protocolbuffers/protobuf/releases/

for example:

https://github.com/protocolbuffers/protobuf/releases/download/v23.3/protoc-23.3-win64.zip

extract and run protoc.exe in bin directory:

protoc.exe --version

### compiling

#### Python

    python -m pip install grpcio
    python -m pip install grpcio-tools
    python -m grpc_tools.protoc -I=. --python_out=. --pyi_out=./ --grpc_python_out=./ helloworld.proto
