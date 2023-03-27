import mysql.connector

def conn_db():
  return mysql.connector.connect(
    host="sdp-15.cdi3alkln8jp.eu-west-2.rds.amazonaws.com",
    user="admin",
    password="jiphEx-woffez-8qaqto",
    database="sdp-15"
  )

def insert_data(db, data):
  mycursor = db.cursor()

  sql_query = "INSERT INTO eyetracker (score, timestamp) VALUES (%s, %s)"
  val = (data[0], data[1])
  mycursor.execute(sql_query, val)

  db.commit()

  print(mycursor.rowcount, "record inserted.")
