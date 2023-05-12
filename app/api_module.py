import requests
import json

def get_latlon(zipcode):
  result = requests.get("https://forecast.weather.gov/zipcity.php?inputstring=11420")
