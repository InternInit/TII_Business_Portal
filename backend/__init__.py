from flask import Blueprint, Flask, jsonify, request, redirect, make_response
from dateutil.parser import parse
from datetime import datetime, date, time, timezone
import json
import requests
from collections import MutableMapping
from contextlib import suppress

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
    if(dt.tzinfo is not None):
        today = datetime.now(timezone.utc)
        days = (dt-today).days
        return days
    else:
        raise ValueError

# Non-recursively resolve up to level-2 datetimes
# Yeah ik it looks like shit but thats the price we pay for dealing with JSON.
def datetime_resolver(intern):
    new_intern = {}
    for sub_item in intern.items():
        if isinstance(sub_item[1], str):
            try:
                days = determine_date_offset(sub_item[1])
                new_intern["Days Until " + sub_item[0]] = int(days)
                new_intern[sub_item[0] + "Formatted"] = parse(sub_item[1]).strftime("%b %d %Y")
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
                        new_sub_item[nested_map_item[0] + "Formatted"] = parse(nested_map_item[1]).strftime("%b %d %Y")
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
                                new_map[map_item[0] + "Formatted"] = parse(map_item[1]).strftime("%b %d %Y")
                            except ValueError:
                                pass
                        new_map[map_item[0]] = map_item[1]
                    new_list.append(new_map)
                else:
                    new_list.append(nested_list_item)
            new_intern[sub_item[0]] = new_list

    return new_intern
        
def formdata_datetime_resolver(formData):
    newFormData = {}
    for page in formData.items():
        pageNum = page[0]
        pageVal = page[1]
        newFormData[pageNum] = {}
        for field in pageVal.items():
            fieldName = field[0]
            fieldVal = field[1]
            if(isinstance(fieldVal, list)):
                daysList = []
                formattedList = []
                errored = False
                for item in fieldVal:
                    if(isinstance(item, str)):
                        try:
                            days = determine_date_offset(item)
                            daysList.append(days)
                            formattedList.append(parse(item).strftime("%b %d %Y"))
                        except ValueError:
                            errored = True
                if((not errored) and ((daysList != []) and (formattedList != []))):
                    newFormData[pageNum]["Days Until " + fieldName] = daysList
                    newFormData[pageNum][fieldName + " Formatted"] = formattedList
            newFormData[pageNum][fieldName] = fieldVal
    return newFormData

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


@app.route('/api/get_student_candidates', methods=["GET", "POST"])
def get_student_candidates():
    query = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json= json.loads(query))
    resp_json = json.loads(req.text)
    new_interns = []
    
    # Yeah Velocity was acting up so I'm gonna resolve datetime strings in Flask for now.
    # Thatgit s's what we get for using a 19 year old language.
    try:
        for intern in resp_json["data"]["getInterns"]:
            loaded_intern = intern
            if(loaded_intern["status"] == "Accepted"):
                loaded_intern["grades"] = datetime_resolver(json.loads(intern["grades"]))
                loaded_intern["hours"] = datetime_resolver(json.loads(intern["hours"]))
                loaded_intern["feedback"] = datetime_resolver(json.loads(intern["feedback"]))
            
            new_intern = datetime_resolver(loaded_intern)
            new_intern["formData"] = formdata_datetime_resolver(json.loads(new_intern["formData"]))

            new_interns.append(new_intern)
        return json.dumps(new_interns)
    except KeyError:
        return resp_json

@app.route('/api/update_student_status', methods=["POST"])
def update_student_status():
    body = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(studentApiUrl, headers={"Authorization": headers.get("Authorization"), "InternId": headers.get("InternId")}, json= json.loads(body))
    return jsonify(req.text)

@app.route('/api/mutate_candidate_assoc', methods=["POST"])
def mutate_candidate_assoc():
    query = request.get_data().decode("utf-8")
    headers = request.headers
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json= json.loads(query))
    resp_json = json.loads(req.text)
    return json.dumps(resp_json)

def delete_keys_from_dict(dictionary, keys):
    for key in keys:
        with suppress(KeyError):
            del dictionary[key]
    for value in dictionary.values():
        if isinstance(value, MutableMapping):
            delete_keys_from_dict(value, keys)
                
@app.route('/api/mutate_grades_assoc', methods=["POST"])
def mutate_grades_assoc():
    query = json.loads(request.get_data().decode("utf-8"))
    keys = ["dueDateFormatted", "Days Until dueDate", "finishedDateFormatted", "Days Until finishedDate"]
    query["variables"]["grades"] = json.loads(query["variables"]["grades"])
    delete_keys_from_dict(query["variables"]["grades"], keys)
    query["variables"]["grades"] = json.dumps(query["variables"]["grades"])
    
    headers = request.headers
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json=query)
    resp_json = json.loads(req.text)
    grades = resp_json["data"]["updateInternAssoc"]["grades"]
    grades = json.loads(grades)
    return json.dumps(datetime_resolver(grades))

@app.route('/api/mutate_hours_assoc', methods=["POST"])
def mutate_hours_assoc():
    query = json.loads(request.get_data().decode("utf-8"))
    keys = ["dueDateFormatted", "Days Until dueDate", "dateFormatted", "Days Until date"]
    query["variables"]["hours"] = json.loads(query["variables"]["hours"])
    delete_keys_from_dict(query["variables"]["hours"], keys)
    query["variables"]["hours"] = json.dumps(query["variables"]["hours"])
    
    headers = request.headers
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json=query)
    resp_json = json.loads(req.text)
    hours = resp_json["data"]["updateInternAssoc"]["hours"]
    hours = json.loads(hours)
    return json.dumps(datetime_resolver(hours))

@app.route('/api/mutate_feedback_assoc', methods=["POST"])
def mutate_feedback_assoc():
    query = json.loads(request.get_data().decode("utf-8"))
    keys = ["dateFormatted", "Days Until date"]
    query["variables"]["feedback"] = json.loads(query["variables"]["feedback"])
    delete_keys_from_dict(query["variables"]["feedback"], keys)
    query["variables"]["feedback"] = json.dumps(query["variables"]["feedback"])
    
    headers = request.headers
    req = requests.post(graphQLApiEndpoint, headers={"Authorization": headers.get("Authorization")}, json=query)
    resp_json = json.loads(req.text)
    feedback = resp_json["data"]["updateInternAssoc"]["feedback"]
    feedback = json.loads(feedback)
    return json.dumps(datetime_resolver(feedback))


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
