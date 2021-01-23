import React, { useEffect, useState } from "react";

//React Routing
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch as ReactSwitch,
  Redirect,
  useRouteMatch as match,
} from "react-router-dom";

//Ant Design
import { Layout } from "antd";

//Redux
import { connect } from "react-redux";
import {
  updateCandidates,
  updateInterns,
  updateCompanyUsers,
  updateName,
  updateDescription,
  updateWebsite,
  updateEmail,
  updatePhoneNumber,
  updateAvatar,
  updateId,
  batchUpdateListings,
  addListing,
  updateListing,
  startGlobalLoading,
  finishGlobalLoading,
  startCandidateLoading,
  finishCandidateLoading,
  startInternLoading,
  finishInternLoading,
  startListingLoading,
  finishListingLoading,
} from "./redux/actions";

//axios
import axios from "axios";

//Lodash
import _ from "lodash";

//Amplify
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

//Components
import MainPage from "./components/MainPage/MainPage.jsx";
import BusinessNavBar from "./components/General/BusinessNavBar.jsx";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import CandidatesContainer from "./components/Candidates/CandidatesContainer.jsx";
import PositionPost from "./components/InternshipPostings/PositionPost.jsx";
import InternshipDetails from "./components/InternshipPostings/InternshipDetails.jsx";
import StudentInternPage from "./components/InternFeedback/StudentInternPage.jsx";
import InternPageContainer from "./components/InternFeedback/InternPageContainer.jsx";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
//import Employeepage from "./components/CompanyUsers/Employeepage";
//import CreateUser from "./components/CompanyUsers/CreateUser";
//import UserDetails from "./components/CompanyUsers/UserDetails";

import "./App.scss";

Amplify.configure(awsconfig);

const { Content, Sider } = Layout;

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    listings: state.listings,
    loadingStatuses: state.loadingStatuses,
  };
};

const mapDispatchToProps = {
  updateCandidates,
  updateInterns,
  updateCompanyUsers,
  updateName,
  updateDescription,
  updateWebsite,
  updateEmail,
  updatePhoneNumber,
  updateAvatar,
  updateId,
  batchUpdateListings,
  addListing,
  updateListing,
  startGlobalLoading,
  finishGlobalLoading,
  startCandidateLoading,
  finishCandidateLoading,
  startInternLoading,
  finishInternLoading,
  startListingLoading,
  finishListingLoading,
};

class App extends React.Component {

  constructor(props){
    super(props)
    if(localStorage.getItem("NumCandidates") === null){
      localStorage.setItem("NumCandidates", 3);
    }
    if(localStorage.getItem("NumInterns") === null){
      localStorage.setItem("NumInterns", 3);
    }
  }

  componentDidMount() {
    this.props.startGlobalLoading();
    this.auth();
    this.getFullCandidates();
    this.getListings();
    this.getBusinessUsers();
    this.props.finishGlobalLoading();
  }

  inMemoryToken;

  auth = async () => {
    Auth.currentSession()
      .then((session) => {
        console.log(session);
        this.inMemoryToken = {
          token: session.idToken.jwtToken,
          expiry: session.idToken.payload.exp,
          refresh: session.refreshToken.token,
          access: session.accessToken.jwtToken,
        };
        console.log(this.inMemoryToken);
        this.props.updateId(session.idToken.payload["custom:companyId"]);
        this.getBusinessInfo(session.idToken.payload);
      })
      .catch((error) => {
        console.log("Session Error: " + error);

        if (window.location.href.split("/")[3] !== "login") {
          window.location.href =
            window.location.href.split("/").slice(0, 3).join("/") + "/login";
        }
      });
  };

  getJwt = () => {
    return new Promise((resolve, reject) => {
      let app = this;
      function checkToken() {
        if (app.inMemoryToken === undefined) {
          setTimeout(() => {
            checkToken();
          }, 10);
        } else {
          resolve(app.inMemoryToken.token);
        }
      }
      checkToken();
    });
  };

  getAccess = () => {
    return new Promise((resolve, reject) => {
      let app = this;
      function checkToken() {
        if (app.inMemoryToken === undefined) {
          setTimeout(() => {
            checkToken();
          }, 10);
        } else {
          resolve(app.inMemoryToken.access);
        }
      }
      checkToken();
    });
  };

  logout = async () => {
    Auth.signOut()
      .then(() => console.log("Signed Out"))
      .catch(() => console.log("Could Not Sign Out"));
    if (window.location.href.split("/")[3] !== "login") {
      window.location.href =
        window.location.href.split("/").slice(0, 3).join("/") + "/login";
    }
  };

  getBusinessInfo = (payload) => {
    this.props.updateName(payload["custom:company"]);
    this.props.updateDescription(
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    );
    this.props.updateWebsite("google.nl");
    this.props.updateEmail("apechell0@cafepress.com");
    this.props.updatePhoneNumber("810-591-4366");
    this.props.updateAvatar(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8coQTo1rlE96O3Ljd9bx0CObBpUE6nLDyww&usqp=CAU"
    );
  };

  getFullCandidates = async () => {
    this.props.startCandidateLoading();
    this.props.startInternLoading();
    let access = await this.getAccess();
    axios({
      url: "/api/get_student_candidates",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: `
        query MyQuery {
          getInterns(businessId: "${this.props.companyInfo.id}") {
            grades
            assocId
            formData
            appliedFor
            Id
            hours
            feedback
            school {
              address
              counselorName
              email
              name
              phone
              state
            }
            status
            version
          }
        }
      `,
      },
    }).then((result) => {
      console.log(result.data);
      let candidates = [];
      let interns = [];
      result.data.forEach((candidate) => {
        if (candidate.status === "Accepted") {
          interns.push(candidate);
        } else {
          candidates.push(candidate);
        }
      });
      this.props.updateCandidates(candidates);
      localStorage.setItem("NumCandidates", candidates.length);
      this.props.updateInterns(interns);
      localStorage.setItem("NumInterns", interns.length);
      this.props.finishCandidateLoading();
      this.props.finishInternLoading();
    });
  };

  getListings = async () => {
    this.props.startListingLoading();
    let token = await this.getJwt();
    console.log(this.props.companyInfo);
    const headers = {
      headers: {
        Authorization: `Bearer ${this.props.companyInfo.id}`,
      },
    };
    console.log(headers.headers.Authorization);

    axios
      .get("/api/get_internship_listings", headers)
      .then((response) => {
        console.log(response.data);
        this.props.batchUpdateListings(
          _.isEqual(JSON.parse(response.data), {
            message: "Internal server error",
          })
            ? []
            : JSON.parse(response.data)
        );
        this.props.finishListingLoading();
      })
      .catch((error) => {
        this.props.finishListingLoading();
      });
  };

  getBusinessUsers = async () => {
    let token = await this.getAccess();

    const headers = {
      headers: {
        Authorization: "Bearer " + token,
        companyId: this.props.companyInfo.id,
      },
    };

    axios.get("/api/list_users", headers).then((response) => {
      this.props.updateCompanyUsers(JSON.parse(response.data));
      console.log(response.data);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            path="/login"
            exact
            component={() => <Login auth={this.auth} key="login" />}
          />
          <Route
            path="/signup"
            exact
            component={() => <Signup auth={this.auth} key="signup" />}
          />

          <Layout>
            <Sider width={80} style={{ zIndex: "100" }}>
              <BusinessNavBar logout={this.logout} />
            </Sider>
            <Content>
              <div
                style={{}} /** <===== GHETTO SOLUTION (Prevents Overlap of Page and Navbar) */
              >
                <Route
                  path="/dashboard"
                  exact
                  component={() => (
                    <MainPage
                      key="mainpage"
                      candidates={this.props.companyInfo.candidates}
                      listings={this.props.listings}
                      loading={this.props.loadingStatuses}
                      interns={this.props.companyInfo.interns}
                    />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => {
                    return (
                      (this.authParam = props.location.search),
                      (<Redirect to="/dashboard" />)
                    );
                  }}
                />

                <ReactSwitch>
                  <Route
                    path="/internship-listings/add-listing"
                    exact
                    component={() => (
                      <InternshipDetails
                        key="newinternship"
                        buttonText="Add Post"
                        title="Create New Post"
                        addListing={this.props.addListing}
                        id={this.props.companyInfo.id}
                      />
                    )}
                  />
                  <Route
                    path="/internship-listings"
                    exact
                    component={PositionPost}
                  />
                  <Route
                    path={`/internship-listings/:id`}
                    exact
                    component={() => (
                      <InternshipDetails
                        key="internshipdetails"
                        buttonText="Save Changes"
                        title="Post Information"
                        listings={this.props.listings}
                        updateListing={this.props.updateListing}
                        id={this.props.companyInfo.id}
                      />
                    )}
                  />
                </ReactSwitch>

                <Route
                  path="/my-interns"
                  exact
                  component={() => (
                    <StudentInternPage key="studentinternpage" />
                  )}
                />
                <Route
                  path={`/my-interns/:id`}
                  component={(props) => (
                    <InternPageContainer {...props} key="internpagecontainer" />
                  )}
                />
                <Route
                  key="candidatescontainer"
                  path="/applicants"
                  component={() => (
                    <CandidatesContainer getAccess={this.getAccess} />
                  )}
                />
                <Route
                  path="/settings"
                  component={() => <CompanyDetails key="companydetails" />}
                />

                {/**<ReactSwitch>
                  <Route path="/users" exact component={() => 
                    <Employeepage
                      users={this.props.companyInfo.users}
                    />} 
                  />
                  <Route
                    path="/users/new-account"
                    exact
                    component={() => 
                      <CreateUser
                        companyInfo={this.props.companyInfo}
                        token={this.inMemoryToken}
                      />}
                  />
                  <Route path={`/users/:id`} exact component={UserDetails} />
                    </ReactSwitch>*/}
              </div>
            </Content>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
