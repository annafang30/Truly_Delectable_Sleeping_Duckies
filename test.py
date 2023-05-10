import requests

response = requests.get("https://raw.githubusercontent.com/rashiq/mcbroken-archive/main/mcbroken.json")

print(response.text)