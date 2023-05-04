# good username = true
# bad username = false
def check_username_requirements(username):
    if len(username) < 4:
        return False
    
    
# good pass = true
# bad pass = false
def check_password_requirements(password):
    if len(password) < 4:
        return False
    