'''defining the routes'''
from flask import render_template
from flask_cors import CORS
from app import app

CORS(app)


@app.route('/')
def home():
    '''home route'''
    return render_template('index.html')


@app.route('/login')
def login():
    '''login page route'''
    return render_template('login.html', title='login')


@app.route('/register')
def register():
    '''register page route'''
    return render_template('register.html', title='register')


@app.route('/admin/myorders')
def user_orders():
    '''route to return orders'''
    return render_template('user_orders.html', title='orders')


@app.route('/admin/orders_list')
def orders_list():
    '''method to display orders list'''
    return render_template('orders_list.html', title='orders')


@app.route('/admin/admin_index')
def admin_index():
    '''method to return the admin homepage'''
    return render_template('admin_index.html', title='home')


@app.route('/admin/create_menu')
def create_menu():
    '''route to return the create menu page'''
    return render_template('create_menu.html', title='create-menu')


@app.route('/user/create_order')
def create_order():
    '''route to return create order page'''
    return render_template('create_order.html', title='create-order')
