from concurrent import futures

import grpc
import hiddensqli_pb2
import hiddensqli_pb2_grpc
from dotenv import load_dotenv
import os
import json

load_dotenv()

import mysql.connector


def create_db():
    _host = os.getenv("host")
    _user = os.getenv("user")
    _password = os.getenv("password")
    _db_name = 'grpc_lab_hidden_sqli'

    mydb = mysql.connector.connect(
        host=_host,
        user=_user,
        password=_password,
    )

    mycursor = mydb.cursor()

    mycursor.execute(f"CREATE DATABASE IF NOT EXISTS {_db_name};")

    mycursor.close()
    mydb.close()

    create_search_tables(_host, _user, _password, _db_name)


def create_search_tables(host, user, password, db):

    mydb = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=db
    )

    mycursor = mydb.cursor()

    check_table_query = f"SELECT 1 FROM information_schema.tables WHERE table_name = 'posts'"

    mycursor.execute(check_table_query)

    # Fetch the result
    table_exists = mycursor.fetchone()
    if table_exists is None:

        create_tb_query = """
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body  VARCHAR(255) NOT NULL,
        is_published TINYINT(1) NOT NULL
    );
        """.strip()

        mycursor.execute(create_tb_query)

        insert_test_posts(host, user, password, db)

    mycursor.close()
    mydb.close()


def insert_test_posts(host, user, password, db):
    mydb = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=db
    )
    mycursor = mydb.cursor()

    test_data_list = [
        ["Title Test 1", "Test 1 is a published Post", 1],
        ["Dog", "Test 2 is a published Post", 1],
        ["Cat", "Test 3 is a published Post", 1],
        ["Title Test 4", "Test 4 is a published Post", 1],
        ["Title Test 5", "Test 5 is a published Post", 1],
        ["Cars", "Cars Post is a published Post", 1],
        ["Title Test 7", "Test 7 is not a published Post", 0],
        ["Title Test 8", "Test 8 is not a published Post", 0],
        ["The Whale", "Test 9 is not a published Post -- T1hsIsTh3Fl@g", 0],
        ["Title Test 10", "Test 10 is not a published Post", 0],
        ["Title Test 11", "Test 11 is not a published Post", 0],
        ["Title Test 12", "Test 12 is not a published Post", 0],
        ["Title Test 13", "Test 13 is a published Post", 1],
    ]

    for t in test_data_list:
        insert_query = f"INSERT INTO posts (title, body, is_published) VALUES ('{t[0]}', '{t[1]}', '{t[2]}');"
        mycursor.execute(insert_query)

    mydb.commit()

    mycursor.close()
    mydb.close()


def config_mysql():

    if not os.path.exists("./.env"):
        with open('./.env', 'w') as env_file:
            env_file.write(
                """
host=127.0.0.1
user=USERNAME
password=PASSWORD
                """.strip()
            )
        print('Fill the .env file and run again.')
        exit(1)

    create_db()


def get_post_by_search_word(word):

    word = f"%{word}%"

    _host = os.getenv("host")
    _user = os.getenv("user")
    _password = os.getenv("password")
    _db_name = 'grpc_lab_hidden_sqli'

    mydb = mysql.connector.connect(
        host=_host,
        user=_user,
        password=_password,
        database=_db_name
    )

    mycursor = mydb.cursor()

    query = f"SELECT * FROM posts WHERE (title LIKE %s OR body like %s) AND is_published=1;"
    mycursor.execute(query, (word, word))

    results = mycursor.fetchall()

    temp_list = []

    for row in results:
        temp_list.append(
            {
                'id': row[0],
                'title': row[1],
                'body': row[2],
                'is_published': row[3]
            }
        )

    string_list = json.dumps(temp_list)
    return string_list


def get_post_by_search_word_hidden(word):

    word = f"%{word}%"

    _host = os.getenv("host")
    _user = os.getenv("user")
    _password = os.getenv("password")
    _db_name = 'grpc_lab_hidden_sqli'

    mydb = mysql.connector.connect(
        host=_host,
        user=_user,
        password=_password,
        database=_db_name
    )

    mycursor = mydb.cursor()

    query = f"SELECT * FROM posts WHERE (title LIKE '{word}' OR body like '{word}') AND is_published=1;"

    try:

        mycursor.execute(query)
    except Exception as e:
        return json.dumps([])

    results = mycursor.fetchall()

    temp_list = []

    for row in results:
        temp_list.append(
            {
                'id': row[0],
                'title': row[1],
                'body': row[2],
                'is_published': row[3]
            }
        )

    string_list = json.dumps(temp_list)
    return string_list


class Searcher(hiddensqli_pb2_grpc.SearcherServicer):
    def Search(self, request, context):
        if request.search_word:
            pass
        return hiddensqli_pb2.SearchResponse(result="Test Result Normal Search")


class HiddenSearcher(hiddensqli_pb2_grpc.HiddenSearcherServicer):
    def Search2(self, request, context):
        return hiddensqli_pb2.SearchResponse(result="Test Result Hidden Search")


def serve():
    port = '9090'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    hiddensqli_pb2_grpc.add_SearcherServicer_to_server(Searcher(), server)
    hiddensqli_pb2_grpc.add_HiddenSearcherServicer_to_server(HiddenSearcher(), server)

    server.add_insecure_port('[::]:' + port)
    server.start()
    server.wait_for_termination()


config_mysql()
serve()
