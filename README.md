# gRPC-Lab
gRPC and gRPC-Web lab for testing purposes. I made this repo for pentesting gRPC-Web and researching on it.

# The Result of Research
See the [gRPC-Pentest-Suite]("https://github.com/nxenon/grpc-pentest-suite") Repo. I made 2 tools:

- grpc-coder.py which makes the manipulating gRPC-Web payloads easy
  - +burp suite extension for using this script easy
- grpc-scan.py which scans gRPC-Web Javascript Webpacked files for finding messages and endpoints

# The Lab

the examples directory in this repo, has these examples:
- [Echo](./examples/echo): simple echo app with grpc-web
- [Hello World](./examples/hello_world): simple hello world grpc app
- [Vulnerable XSS Echo](./examples/vuln-xss-echo-client-protect): app using grpc-web which is vulnerable to xss ,but it has client protections
- [Vulnerable XSS Multi Parameter Echo](./examples/vuln-xss-echo-client-protect-multiple-params): app using grpc-web which is vulnerable to xss ,but it has client protections and uses multiple parameters instead of one
- [XSS Secured](./examples/xss-secure): XSS Secured --> the input gets encoded in server
- [Hidden SQLi](./examples/hidden-sqli): gRPC-Web Lab which has 2 hidden SQLi vulnerability.

# Protobuf Compiler (protoc) 
Read [Protoc Readme](./protoc.md)

# Setup gRPC-Web
Read [gRPC-Web Readme](./grpc-web.md)

# Test with .proto file
If you have `.proto` file read [grpcui README](./grpcui.md)

# Reference
All Examples are examples in main [gRPC-Web Github repo]("https://github.com/grpc/grpc-web") with some specific changes. 