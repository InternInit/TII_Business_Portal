from flask import Blueprint, Flask, jsonify, request, redirect, make_response
import json
import requests

app = Flask(__name__)

studentApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/cache/students"
listingsApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/cache/listings"

if(app.config.get("ENV") == "development"):
    studentApiUrl = studentApiUrl.format(stage="dev")
    listingsApiUrl = listingsApiUrl.format(stage="dev")
elif(app.config.get("ENV") == "production"):
    studentApiUrl = studentApiUrl.format(stage="prod")
    listingsApiUrl = listingsApiUrl.format(stage="prod")


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
    headers = request.headers
    req = requests.get(listingsApiUrl, headers={"Authorization": headers.get("Authorization")})
    print(req.text)
    return jsonify(req.text)

@app.route("/api/remove_internship_listing", methods=["DELETE"])
def remove_internship_listing():
    return ""

@app.route("/api/update_internship_listings", methods = ["PUT", "POST"])
def update_internship_listings():
    body = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(listingsApiUrl, headers={"Authorization": headers.get("Authorization"), "ListingId": headers.get("ListingId")}, json = json.loads(body))
    print(req.text)
    return jsonify(req.text)



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
