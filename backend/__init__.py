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




#################################
#                                
#      INTERNSHIP LISTINGS       
#                                
#################################
 
@app.route("/get_internship_listings", methods=["GET"])
def get_internship_listings():
    return ""

@app.route("/add_internship_listing", methods=["POST"])
def add_internship_listing():
    return ""

@app.route("/remove_internship_listing", methods=["DELETE"])
def remove_internship_listing():
    return ""

@app.route("/update_internship_listings", methods = ["PUT", "POST"])
def update_internship_listings():
    return ""




#################################
#                                
#        STUDENT FEEDBACK      
#                                
#################################

@app.route('/get_student_feedback', methods=["GET"])
def get_student_feedback():
    return ""

'''

Review Applicants

'''

@app.route('/get_student_candidates', methods=["GET"])
def get_student_candidates():
    return ""

@app.route('/update_student_status', methods=["PUT"])
def update_student_status():
    return ""

@app.route('/update_student_removed', methods=["DELETE"])
def update_student_removed():
    return ""





@app.route('/logout')
def logout():
    return "logged out"
