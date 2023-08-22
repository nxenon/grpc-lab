# grpcui

you have to make protoset from .proto file:

    protoc --proto_path=. --descriptor_set_out=echo.protoset --include_imports ./echo.proto

then you can use grpcui:

    grpcui -protoset echo.protoset -plaintext localhost:8080

Then you can test grpc-web easily. the point is you must have `.proto` file.
