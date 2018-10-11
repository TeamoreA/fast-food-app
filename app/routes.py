'''defining the routes'''
from flask import render_template
from flask_cors import CORS
from app import app

CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')
