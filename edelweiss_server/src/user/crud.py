from sqlalchemy.orm import Session

from . import model, schema, fake_info

def get_user(email):
    for user in fake_info.fake_db_user:
        if user["email"] == email:
            return user
    return None
