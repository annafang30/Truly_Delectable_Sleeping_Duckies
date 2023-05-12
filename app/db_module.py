import sqlite3
from datetime import datetime
import json
import requests

DB_FILE="database.db"
MCBROKEN_URL = "https://raw.githubusercontent.com/rashiq/mcbroken-archive/main/mcbroken.json"
STATE_HAPPINESS_URL = "https://raw.githubusercontent.com/samsonahh/state_stats/main/happy_states.json"
STATE_WAGE_URL = "https://raw.githubusercontent.com/samsonahh/state_stats/main/minimum_wages.json"

try:
    mcbroken_json = requests.get(MCBROKEN_URL)
    MCBROKEN = [i for i in json.loads(
        mcbroken_json.text) if i["properties"]["country"] == "USA"]
except:
    MCBROKEN = {}

try:
    happy_json = requests.get(STATE_HAPPINESS_URL)
    HAPPINESS = json.loads(happy_json.text)
except:
    HAPPINESS = {}

try:
    wage_json = requests.get(STATE_WAGE_URL)
    MINIMUM_WAGES = json.loads(wage_json.text)
except:
    MINIMUM_WAGES = {}

STATES = { 'AK': 'Alaska',  'AL': 'Alabama', 'AR': 'Arkansas', 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado',  'CT': 'Connecticut', 'DE': 'Delaware','FL': 'Florida',  'GA': 'Georgia', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas','KY': 'Kentucky', 'LA': 'Louisiana', 'MA': 'Massachusetts', 'MD': 'Maryland', 'ME': 'Maine', 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MS': 'Mississippi', 'MT': 'Montana', 'NC': 'North Carolina', 'ND': 'North Dakota', 'NE': 'Nebraska','NH': 'New Hampshire','NJ': 'New Jersey','NM': 'New Mexico','NV': 'Nevada','NY': 'New York','OH': 'Ohio','OK': 'Oklahoma','OR': 'Oregon','PA': 'Pennsylvania','RI': 'Rhode Island','SC': 'South Carolina','SD': 'South Dakota','TN': 'Tennessee','TX': 'Texas','UT': 'Utah','VA': 'Virginia','VT': 'Vermont','WA': 'Washington','WI': 'Wisconsin','WV': 'West Virginia','WY': 'Wyoming'}

def reset_database():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("DROP TABLE IF EXISTS Users")
    c.execute("DROP TABLE IF EXISTS Forum")
    c.execute("DROP TABLE IF EXISTS McBroken")
    c.execute("DROP TABLE IF EXISTS States")

    c.execute("CREATE TABLE IF NOT EXISTS Users(username TEXT, password TEXT, userID INTEGER);")
    c.execute("CREATE TABLE IF NOT EXISTS Forum(postID INTEGER, parentID INTEGER, username TEXT, text TEXT, date TEXT);")
    c.execute("CREATE TABLE IF NOT EXISTS States(state TEXT, state_short TEXT, happiness REAL, wage REAL);")
    
    db.commit()
    db.close()

def add_state_data():
    if len(HAPPINESS) == 0 or len(MINIMUM_WAGES) == 0:
        return

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    h = []
    w = []

    for happy in HAPPINESS:
        h.append(happy)
    
    for wage in MINIMUM_WAGES:
        w.append(wage)

    for i in range(len(h)):
        c.execute("INSERT INTO States VALUES (?, ?, ?, ?)", 
                 (h[i]["state"], list(STATES.keys())[list(STATES.values()).index(h[i]["state"])], h[i]["totalScore"], w[i]["minimumWage"]))
    
    db.commit()
    db.close()  

def print_all_states():
    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM States")
    dict = c.fetchall()
    print(dict)
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

def get_ratio_broken_by_state(state):
    broken = len([i for i in MCBROKEN if i["properties"]["is_broken"]
                 and i["properties"]["is_active"] and i["properties"]["state"] == state])
    total = len([i for i in MCBROKEN if i["properties"]["state"] == state])
    if total == 0:
        return None
    return broken/(total)

def get_state_stats(state):
    state_name = ""
    happiness = 0
    wage = 0

    db = sqlite3.connect(DB_FILE) #open if file exists, if not it will create a new db          
    c = db.cursor() #creates db cursor to execute and fetch      

    c.execute("SELECT * FROM States")
    dict = c.fetchall()
    db.close()

    for s in dict:
        if s[1] == state:
            state_name = s[0]
            happiness = s[2]
            wage = s[3]
    try:
        return {
            "name": state_name,
            "min_wage": "$" + make_money_two_decimals(wage),
            "happiness": happiness,
            "broken_ratio": str(round(get_ratio_broken_by_state(state)*100, 2)) + "%"
        }
    except:
        return {
            "name": state_name,
            "min_wage": "$" + make_money_two_decimals(wage),
            "happiness": happiness,
            "broken_ratio": "N/A"
        }

def get_all_states_stats():
    all = {}
    for key in list(STATES.keys()):
        all[key] = get_state_stats(key)
    return all

def make_money_two_decimals(float):
    if str(float).find('.') == -1:
        return str(float) + ".00"
    
    after_zero = str(float).split('.')[1]
    if len(after_zero) == 1:
        return str(float) + "0"
    return str(float)

def generate_preset_database():
    reset_database()
    
    add_state_data()

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
   