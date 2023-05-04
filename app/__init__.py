# TNPG: Truly Delectable Sleeping Duckies
# Roster: Anna Fang, Aleksandra Shifrina, Samson Wu, Ravindra Mangar
# SoftDev
# P04

from flask import Flask, render_template, request, session, redirect, url_for
from input_module import *
from api_module import *
from db_module import *

app = Flask(__name__)
app.secret_key = b'pAHy827suhda*82sljsjd'

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session: #if already logged in
        return redirect(url_for('home'))
    
    if request.method == 'POST': #if submitted
        username = request.form['username']
        password = request.form['password']

    return render_template("login.html")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session: #if already logged in
        return redirect(url_for('home'))
    
    if request.method == 'POST': #if submitted
        new_user = request.form['new_username']
        new_pass = request.form['new_password']

        #check if user exists in db already
        if check_username_requirements(new_user) and check_password_requirements(new_pass):
            #add user and login
            session['username'] = new_user
            return redirect(url_for('home'))

    return render_template("register.html")

@app.route('/logout')
def logout():
    return redirect(url_for('home'))

@app.route('/state')
def state():
    return render_template("state.html")

@app.route('/forum')
def forum():
    return render_template("forum.html")

if __name__ == "__main__":
    app.debug = True
    app.run()