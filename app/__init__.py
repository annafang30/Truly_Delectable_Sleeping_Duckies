# TNPG: Truly Delectable Sleeping Duckies
# Roster: Anna Fang, Aleksandra Shifrina, Samson Wu, Ravindra Mangar
# SoftDev
# P04

from flask import Flask, render_template, request, session, redirect, url_for
from input_module import *
from api_module import *
from db_module import *

reset_database()
generate_preset_database()
print_all_users()

app = Flask(__name__)
app.secret_key = b'pAHy827suhda*82sljsjd'


@app.route('/')
def home():
    logged_in = False
    session_username = ""
    stats = get_all_states_stats()
    print(stats)

    if 'username' in session:
        logged_in = True
        session_username = session['username']

    return render_template("home.html", login_status=logged_in, username=session_username, stats = stats)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session:  # if already logged in
        return redirect(url_for('home'))

    if request.method == 'POST':  # if submitted
        username = request.form['username'].strip()
        password = request.form['password']
        if check_user_exists(username) and get_user_password(username) == password:
            session['username'] = request.form['username']
            return redirect(url_for('home'))
        return render_template('login.html', error="Wrong username and password")

    return render_template("login.html", error="")


@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session:  # if already logged in
        return redirect(url_for('home'))

    if request.method == 'POST':  # if submitted
        new_user = request.form['new_username'].strip()
        new_pass = request.form['new_password']
        new_pass_confirm = request.form['new_password_confirm']

        if check_user_exists(new_user):
            return render_template("register.html", error="Username and password did not meet minimum requirements")

        if not new_pass == new_pass_confirm:
            return render_template("register.html", error="Passwords don't match!")

        if check_username_requirements(new_user) and check_password_requirements(new_pass):
            add_newuser(new_user, new_pass)
            session['username'] = new_user
            return redirect(url_for('home'))

        return render_template("register.html", error="Username and password did not meet minimum requirements")

    return render_template("register.html", error="")


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


@app.route('/state/<state_name>', methods=['GET'])
def state(state_name):
    if not state_name in list(STATES.keys()):
        return redirect(url_for('home'))

    logged_in = False
    session_username = ""

    if 'username' in session:
        logged_in = True
        session_username = session['username']

    stats = get_state_stats(state_name)

    return render_template("state.html", login_status=logged_in, username=session_username, state=STATES[state_name], stats=stats)


@app.route('/forum', methods=['GET', 'POST'])
def forum():
    logged_in = False
    session_username = ""
    posts = get_all_forum_posts()

    if 'username' in session:
        logged_in = True
        session_username = session['username']

    if request.method == "POST" and not logged_in:
        return redirect(url_for('login'))

    if request.method == "POST" and logged_in:
        text = request.form['posttext']
        id = request.form['postid']
        if len(text) > 0:
            add_newpost(session_username, text, int(id))
            return redirect(url_for("forum"))

    return render_template("forum.html", login_status=logged_in, username=session_username, posts=posts)


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
