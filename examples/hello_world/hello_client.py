import grpc
import helloworld_pb2
import helloworld_pb2_grpc


def run():
    print('trying to send message to server!')
    with grpc.insecure_channel('localhost:54321') as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        resp = stub.SayHello(helloworld_pb2.HelloRequest(name='Amin'))
        resp2 = stub.SayHello(helloworld_pb2.HelloRequest(name='Nasiri'))
    print('Server Said :' + resp.message)
    print('Server Said :' + resp2.message)


run()
