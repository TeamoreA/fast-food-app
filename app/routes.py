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
    return render_template('login.html', title='login')


@app.route('/register')
def register():
    return render_template('register.html', title='register')


@app.route('/admin/myorders')
def user_orders():
    return render_template('user_orders.html', title='orders')


@app.route('/admin/orders_list')
def orders_list():
    return render_template('orders_list.html', title='orders')


@app.route('/admin/admin_index')
def admin_index():
    return render_template('admin_index.html', title='home')


@app.route('/admin/create_menu')
def create_menu():
    return render_template('create_menu.html', title='create')


@app.route('/user/create_order')
def create_order():
    return render_template('create_order.html', title='create')
