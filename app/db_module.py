import sqlite3
from datetime import datetime
DB_FILE="database.db"

def reset_database():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("DROP TABLE IF EXISTS Users")
    c.execute("DROP TABLE IF EXISTS Forum")
    c.execute("DROP TABLE IF EXISTS McBroken")
    c.execute("DROP TABLE IF EXISTS States")

    c.execute("CREATE TABLE IF NOT EXISTS Users(username TEXT, password TEXT, userID INTEGER);")
    c.execute("CREATE TABLE IF NOT EXISTS Forum(postID INTEGER, text TEXT, userID INTEGER);")
    c.execute("CREATE TABLE IF NOT EXISTS McBroken(lat REAL, long REAL, isbroken INTEGER, city TEXT, state TEXT, address TEXT);")
    c.execute("CREATE TABLE IF NOT EXISTS States(name TEXT, happiness REAL, wage REAL);")

    db.commit()
    db.close()

def add_newuser(username, password):
    data = (username, password, get_users_table_length())
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("INSERT INTO Users VALUES(?,?,?)", data)
    db.commit()
    db.close()

def check_user_exists(username):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM Users WHERE username=?", (username,))
    dict = c.fetchone()

    db.close()

    if dict == None: #if no user
        return False
    
    return True

#gets the user's password from the database
def get_user_password(username):
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users WHERE username=?", (username,))
    dict = c.fetchone()

    db.close()

    return dict[1]

def get_users_table_length():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users")
    dict = c.fetchall()
    db.close()

    return len(dict)

def print_all_users():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users")
    dict = c.fetchall()
    print(dict)
    db.close()

def generate_preset_database():
    reset_database()
    add_newuser('samson', 'samson123')
    add_newuser('anna', 'anna123')
    add_newuser('ravindra', 'ravindra123')
    add_newuser('aleksandra', 'aleksandra123')
   