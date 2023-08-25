import grpc
import hiddensqli_pb2
import hiddensqli_pb2_grpc


def run():
    print('trying to send message to server!')
    with grpc.insecure_channel('localhost:9090') as channel:
        stub = hiddensqli_pb2_grpc.SearcherStub(channel)
        resp = stub.Search(hiddensqli_pb2.SearchRequest(search_word="test"))

    print('Server Said :' + resp.result)


run()
