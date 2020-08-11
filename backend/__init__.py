from flask import Flask, Response
import json
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def home():
    return "Hello World"

@app.route('/api/get_business_data', methods=["GET"])
def get_business_data():
    return "business data"

@app.route('/api/update_business_interns', methods = ["PUT", "POST"])
def update_business_interns():
    return "updated business interns"

@app.route('/api/update_business_listings', methods = ["PUT", "POST"])
def update_business_lisitings():
    return "updated business listings"


@app.route('/logout')
def logout():
    return "logged out"