import requests

result = requests.get("https://forecast.weather.gov/zipcity.php?inputstring=11354")
result = result.url.split("&")[-2:]
result = [i[4:] for i in result]

print(result)
