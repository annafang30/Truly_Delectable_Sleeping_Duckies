# McMapping Disappointment by Truly_Delectable_Sleeping_Duckies
### Anna Fang: PM, front end work (JS and HTML) 
### Aleksandra Shifrina: front end work (JS and HTML)
### Samson Wu: middle wear (Flask server) and back end work (API) 
### Ravindra Mangar: back end (Database and API)
 
# Project Description (Abstract): 
* display of a map visualization of the United States
* hovering displays of state happiness (%) and ice cream machine brokenness of individual states 
* clicking into a state will display of local mcdonalds locations via an interactive map, and yelp ratings of said local stores. 
* users can login and use a rant forum to complain about mcdonalds ice cream machine outages. 
* users can peruse through graphical representations of our data and our conclusions 
* (stretch goal?) users can find mcdonald locations through address search 


# APIs: 
* <a href="https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_Yelp.md">Yelp</a>
    - Gets ratings of the specific McDonald's locations
* <a href = https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_OpenStreetMap.md> OpenStreetMap</a>
    - Gets the street layout of a specified area 

# Datasets (this will fluctuate ^^): 
* <a href="https://www.kaggle.com/datasets/thedevastator mcdonalds-ice-cream-machines-broken-timeseries">McBroken</a>
* <a href="https://wallethub.com/edu/happiest-states/6959">State Happiness</a>
* <a href="https://www.kaggle.com/datasets/lislejoem/us-minimum-wage-by-state-from-1968-to-2017">State Minimum Wages</a>

# Launch Codes:
1. Navigate in your terminal to a directory where you will store "McMapping Disappointment" using ```cd```
<br>

2. Clone the repository with ```git clone git@github.com:annafang30/Truly_Delectable_Sleeping_Duckies.git```

<br>

3. Navigate into the Truly_Delectable_Sleeping_Duckies repo using ```cd Truly_Delectable_Sleeping_Duckies/```
<br>

4. Create a virtual environment by entering `````python3 -m venv <VENV_PATH>```
<br>

5. Activate the virtual environment with ```. <VENV_PATH>/bin/activate``` or ```Scripts\activate.bat```
<br> 

6. Install any required python libraries via ```pip install -r requirements.txt```
<br> 

7. Navigate to /app and run the app in your terminal by typing ```python3 __init__.py```. Clicking on the link labeled "http://127.0.0.1:5000" or cping it into any browser of your choice will give you free reign to explore our project. 
<br> 

8. Enjoy! 
