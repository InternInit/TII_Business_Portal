from flask import Flask, Response, jsonify
import json
import requests

app = Flask(__name__)

studentApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/cache/students"
if(app.config.get("ENV") == "development"):
    studentApiUrl = studentApiUrl.format(stage="dev")
elif(app.config.get("ENV") == "production"):
    studentApiUrl = studentApiUrl.format(stage="prod")


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

@app.route("/api/get_internship_listings", methods=["GET"])
def get_internship_listings():
    return ""

@app.route("/api/add_internship_listing", methods=["POST"])
def add_internship_listing():
    return ""

@app.route("/api/remove_internship_listing", methods=["DELETE"])
def remove_internship_listing():
    return ""

@app.route("/api/update_internship_listings", methods = ["PUT", "POST"])
def update_internship_listings():
    return ""




#################################
#
#        STUDENT FEEDBACK
#
#################################

@app.route('/api/get_student_feedback', methods=["GET"])
def get_student_feedback():
    return ""


'''

Review Applicants

'''

@app.route('/api/get_student_candidates', methods=["GET"])
def get_student_candidates():
    print(studentApiUrl)
    req = requests.get(studentApiUrl, headers={"Authorization": "Bearer e149eb67-8016-4d09-aa73-6bab85bdea1d"})
    print(req.text)
    return jsonify(json.loads(req.text))

@app.route('/api/update_student_status', methods=["PUT"])
def update_student_status():
    return ""

@app.route('/api/update_student_removed', methods=["DELETE"])
def update_student_removed():
    return ""





@app.route('/api/logout')
def logout():
    return "logged out"

if __name__ == "__main__":
    app.run(debug=True)
