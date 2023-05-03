# P4 by Truly_Delectable_Sleeping_Duckies
### Anna Fang: PM, front end work (JS and HTML) 
### Aleksandra Shifrina: front end work (JS and HTML) and support for back end work (Database and API) 
### Samson Wu: middle wear (Flask server) and back end work (API) 
### Ravindra Mangar: back end (Database and API)
 
# Project Description: 
* display of a map visualization of the United States
* hovering displays of happiness rankings and minimum wage of individual states 
* display of all mcdonalds locations, ice cream machine status, and yelp rating within a state
* users can find mcdonald locations through address search 
* (stretch goal) users can login and use a rant forum to complain about mcdonalds ice cream machine outages. 

# APIs: 
* <a href="https://mcbroken.com/">McBroken [no card]</a> 
    - This API updates the statuses of McDonalds ice cream machines every 30 minutes
* <a href="https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_Yelp.md">Yelp</a>
    - Gets ratings of the specific McDonald's locations
* <a href="https://github.com/asopinka/mcdonalds-api">Mcdonalds Location Grabber</a>
    - Allows us to query nearby McDonald's locations

# Datasets (as of now): 
* <a href="https://www.kaggle.com/datasets/thedevastator mcdonalds-ice-cream-machines-broken-timeseries">McBroken</a>
* <a href="https://wallethub.com/edu/happiest-states/6959">State Happiness</a>
* <a href="https://www.kaggle.com/datasets/lislejoem/us-minimum-wage-by-state-from-1968-to-2017">State Minimum Wages</a>

# Launch Codes:
1. Navigate in your terminal to a directory where you will store "McTitle" using ```cd```
2. Clone the repository through 
<br> 

```git clone git@github.com:annafang30/Truly_Delectable_Sleeping_Duckies.git```
3. Navigate into the Truly_Delectable_Sleeping_Duckies repo using 
<br>

 ```cd Truly_Delectable_Sleeping_Duckies/```
4. Create a virtual environment by entering
<br>

`````python3 -m venv <VENV_NAME>```
5. cd into <VENV_NAME> and activate it with ```.bin/activate``` or ```Scripts\activate.bat```
6. Install any required python libraries via ```pip install -r ../requirements.txt```
7. Run the app in your terminal by typing ```python3 ../__init__.py```. Clicking on the link labeled "http://127.0.0.1:5000" or cp it into any browser of your choice will give you free reign to explore our project. 
8. Enjoy! 
