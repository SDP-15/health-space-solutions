import mysql.connector
import sys


class DB:
    def __init__(self):
        self.server = "sdp-15.cdi3alkln8jp.eu-west-2.rds.amazonaws.com"
        self.database = "sdp-15"
        self.username = "admin"
        self.password = "jiphEx-woffez-8qaqto"
        self.connection = None
        self.cursor = None

    def getConneciton(self):
        if self.connection == None:
            self.connection = mysql.connector.connect(
                host=self.server,
                database=self.database,
                user=self.username,
                password=self.password,
            )
            if self.connection.is_connected():
                db_Info = self.connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                self.cursor = self.connection.cursor()
            else:
                sys.exit("Can't connect to db")

        return self.connection

    def executeQuery(self, query: str):
        if self.cursor == None:
            self.getConneciton()
        self.cursor.execute(query)
        self.connection.commit()
