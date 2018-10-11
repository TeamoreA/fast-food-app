'''app initialisation'''
from flask import Flask


app = Flask(__name__)

# local import
from app import routes
