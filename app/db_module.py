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
    c.execute("CREATE TABLE IF NOT EXISTS Forum(postID INTEGER, parentID INTEGER, username TEXT, text TEXT, date TEXT);")

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

def get_username_by_ID(ID):
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users WHERE ID=?", (ID,))
    dict = c.fetchone()

    db.close()

    return dict[0]

def get_users_table_length():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users")
    dict = c.fetchall()
    db.close()

    return len(dict)

def get_all_users():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users")
    dict = c.fetchall()

    db.close()

    return [i[0] for i in dict]
    


def print_all_users():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Users")
    dict = c.fetchall()
    print(dict)
    db.close()

#gets all posts in their parent id order
def get_all_forum_posts():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Forum")
    dict = c.fetchall()
    dict.sort(key=lambda dict: dict[4], reverse=True)
    print(dict)
    db.close()
    return dict

def add_newpost(username, text, parentID):
    if not check_user_exists(username):
        return

    now = datetime.now()
    dt_string = now.strftime("%B %d, %Y %I:%M:%S")

    data = (get_forum_table_length(), parentID, username, text, dt_string)
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("INSERT INTO Forum VALUES(?,?,?,?,?)", data)
    db.commit()
    db.close()

def get_forum_table_length():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Forum")
    dict = c.fetchall()
    db.close()

    return len(dict)

def print_all_forum_posts():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM Forum")
    dict = c.fetchall()
    print(dict)
    db.close()

def generate_preset_database():
    reset_database()
    add_newuser('samson', 'samson123')
    add_newuser('anna', 'anna123')
    add_newuser('ravindra', 'ravindra123')
    add_newuser('aleksandra', 'aleksandra123')

    add_newpost('samson', 'I HATE THE CHAMBERS ST MCDONALDS!', -1)
    add_newpost('ravindra', 'sameeeeee', 0)
    add_newpost('aleksandra', 'i disagree!!!', 0)
    add_newpost('anna', 'why?', 2)
    add_newpost('ravindra', 'hello forum', -1)
    add_newpost('samson', 'why hello', 4)
   