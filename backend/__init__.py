from flask import Blueprint, Flask, jsonify, request, redirect, make_response
import json
import requests

app = Flask(__name__)

studentApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/cache/students"
listingsApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/cache/listings"
authApiUrl = "https://wnbssomd26.execute-api.us-east-1.amazonaws.com/{stage}/auth/"
graphQLApiEndpoint = "https://4gxyw7jvnvgbrpgiaxvmgwqydy.appsync-api.us-east-1.amazonaws.com/graphql"

if(app.config.get("ENV") == "development"):
    studentApiUrl = studentApiUrl.format(stage="dev")
    listingsApiUrl = listingsApiUrl.format(stage="dev")
    authApiUrl = authApiUrl.format(stage="dev")
elif(app.config.get("ENV") == "production"):
    studentApiUrl = studentApiUrl.format(stage="prod")
    listingsApiUrl = listingsApiUrl.format(stage="prod")
    authApiUrl = authApiUrl.format(stage="prod")


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
'''
@app.route('/api/get_student_candidates', methods=["GET"])
def get_student_candidates():
    print(studentApiUrl)
    req = requests.get(studentApiUrl, headers={"Authorization": "Bearer 6aa19690-d874-4fdd-a1d8-a1168a7b632c"})
    return jsonify(json.loads(req.text))
'''
@app.route('/api/get_student_candidates', methods=["GET", "POST"])
def get_student_candidates():
    data = request.get_data().decode("utf-8")
    headers = request.headers
    #"https://webhook.site/84b87408-08ff-477f-8f4a-dee9e61235e9"
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json= json.loads(data))
    return jsonify(req.text)

@app.route('/api/update_student_status', methods=["POST"])
def update_student_status():
    body = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(studentApiUrl, headers={"Authorization": headers.get("Authorization"), "InternId": headers.get("InternId")}, json= json.loads(body))
    return jsonify(req.text)

@app.route('/api/update_student_removed', methods=["DELETE"])
def update_student_removed():
    return ""

##############################
#
#       USER MANAGEMENT
#
##############################

@app.route('/api/admin_create_user', methods=["POST"])
def admin_create_user():
    body = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(authApiUrl+"adminCreateUser", headers={"Authorization": headers.get("Authorization")}, json = json.loads(body))
    return jsonify(req.text)

@app.route('/api/list_users', methods=["GET"])
def list_users():
    headers = request.headers
    req = requests.get(authApiUrl+"listUsers", headers={"Authorization": headers.get("Authorization"), "companyId": headers.get("companyId")})
    return jsonify(req.text)


@app.route('/api/logout')
def logout():
    return "logged out"

if __name__ == "__main__":
    app.run(debug=True)
