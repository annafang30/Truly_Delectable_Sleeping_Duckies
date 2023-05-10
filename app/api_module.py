import requests
import json

STATES = {
    'AK': 'Alaska',
    'AL': 'Alabama',
    'AR': 'Arkansas',
    'AZ': 'Arizona',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'IA': 'Iowa',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'MA': 'Massachusetts',
    'MD': 'Maryland',
    'ME': 'Maine',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MO': 'Missouri',
    'MS': 'Mississippi',
    'MT': 'Montana',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'NE': 'Nebraska',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NV': 'Nevada',
    'NY': 'New York',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VA': 'Virginia',
    'VT': 'Vermont',
    'WA': 'Washington',
    'WI': 'Wisconsin',
    'WV': 'West Virginia',
    'WY': 'Wyoming'
}

MCBROKEN_URL = "https://raw.githubusercontent.com/rashiq/mcbroken-archive/main/mcbroken.json"

mcbroken_json = requests.get(MCBROKEN_URL)
MCBROKEN = [i for i in json.loads(mcbroken_json.text) if i["properties"]["country"] == "USA"]

HAPPINESS = []
with open('app/happy_states.json') as data:
    HAPPINESS = json.load(data)

MINIMUM_WAGES = []
with open('app/minimum_wages.json') as data:
    MINIMUM_WAGES = json.load(data)

def get_ratio_broken_by_state(state):
    broken = len([i for i in MCBROKEN if i["properties"]["is_broken"] and i["properties"]["is_active"] and i["properties"]["state"] == state])
    working = len([i for i in MCBROKEN if not i["properties"]["is_broken"] and i["properties"]["is_active"] and i["properties"]["state"] == state])
    return broken/(broken+working)

def get_happiness_by_state(state):
    for s in HAPPINESS:
        if s["state"] == state:
            return s["totalScore"]
        
def get_min_wage_by_state(state):
    for s in MINIMUM_WAGES:
        if s["state"] == state:
            return s["minimumWage"]

def get_state_stats(state):
    try:
        return {
            "state_short" : state,
            "state_full" : STATES[state],
            "min_wage" : "{:.{}f}".format(get_min_wage_by_state(STATES[state]), 2),
            "happiness" : get_happiness_by_state(STATES[state]),
            "broken_ratio" : round(get_ratio_broken_by_state(state)*100, 2)
        }
    except:
        return {
            "state_short" : state,
            "state_full" : STATES[state],
            "min_wage" : get_min_wage_by_state(STATES[state]),
            "happiness" : get_happiness_by_state(STATES[state]),
            "broken_ratio" : round(get_ratio_broken_by_state(state)*100, 2)
        }

def get_all_states_stats():
    list = []
    for key in STATES:
        list.append(get_state_stats(key))
    return list