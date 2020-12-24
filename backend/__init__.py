from flask import Blueprint, Flask, jsonify, request, redirect, make_response
from dateutil.parser import parse
from datetime import datetime, date, time, timezone
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

def determine_date_offset(dt_string):
    dt = parse(dt_string)
    today = datetime.now(timezone.utc)
    days = (dt-today).days
    return days

# Non-recursively resolve datetimes
# full_intern_map: (dict) contaning full intern data
# intern_item : Tuple: ((String), (String/Map/List)) sub-item of full_intern_map
def datetime_resolver(intern):
    new_intern = {}
    for sub_item in intern.items():
        if isinstance(sub_item[1], str):
            try:
                days = determine_date_offset(sub_item[1])
                new_intern["Days Until " + sub_item[0]] = int(days)
            except ValueError:
                pass
            new_intern[sub_item[0]] = sub_item[1]
        elif isinstance(sub_item[1], dict):
            new_sub_item = {}
            for nested_map_item in sub_item[1].items():
                if isinstance(nested_map_item[1], str):
                    try:
                        days = determine_date_offset(nested_map_item[1])
                        new_sub_item["Days Until " + nested_map_item[0]] = int(days)
                    except ValueError:
                        pass
                new_sub_item[nested_map_item[0]] = nested_map_item[1]
            new_intern[sub_item[0]] = new_sub_item
        elif isinstance(sub_item[1], list):
            new_list = []
            for nested_list_item in sub_item[1]:
                if isinstance(nested_list_item, dict):
                    new_map = {}
                    for map_item in nested_list_item.items():
                        if isinstance(map_item[1], str):
                            try:
                                days = determine_date_offset(map_item[1])
                                new_map["Days Until " + map_item[0]] = int(days)
                            except ValueError:
                                pass
                        new_map[map_item[0]] = map_item[1]
                    new_list.append(new_map)
                else:
                    new_list.append(nested_list_item)
            new_intern[sub_item[0]] = new_list

    return new_intern
        
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
    return jsonify(req.text)

@app.route("/api/remove_internship_listing", methods=["DELETE"])
def remove_internship_listing():
    return ""

@app.route("/api/update_internship_listings", methods = ["PUT", "POST"])
def update_internship_listings():
    body = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(listingsApiUrl, headers={"Authorization": headers.get("Authorization"), "ListingId": headers.get("ListingId")}, json = json.loads(body))
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
    query = request.get_data().decode("utf-8")
    headers = request.headers
    #"https://webhook.site/84b87408-08ff-477f-8f4a-dee9e61235e9"
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json= json.loads(query))
    #req = requests.post("https://webhook.site/84b87408-08ff-477f-8f4a-dee9e61235e9", headers={"Authorization": headers.get("Authorization")}, json= json.loads(query))
    '''
    with open('data.json', 'w') as f:
        json.dump(json.loads(req.text), f, indent=4)
    f.close()
    '''
    resp_json = json.loads(req.text)
    new_interns = []
    for intern in resp_json["data"]["getInterns"]:
        new_interns.append(datetime_resolver(intern))
    return json.dumps(new_interns)

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
