import React, { useEffect, useState, PureComponent } from "react";

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
import QueueAnim from "rc-queue-anim";

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
import Employeepage from "./components/CompanyUsers/Employeepage";
import CreateUser from "./components/CompanyUsers/CreateUser";
import UserDetails from "./components/CompanyUsers/UserDetails";

import "./App.scss";

Amplify.configure(awsconfig);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("Development");
} else {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

function noop() {}

const { Content, Sider } = Layout;

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    listings: state.listings,
    loadingStatuses: state.loadingStatuses,
    interns: state.interns.currentInterns,
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
  constructor(props) {
    super(props);
    if (localStorage.getItem("NumReview") === null) {
      localStorage.setItem("NumCandidates", 3);
    }
    if (localStorage.getItem("NumInterview") === null) {
      localStorage.setItem("NumCandidates", 3);
    }
    if (localStorage.getItem("NumInterns") === null) {
      localStorage.setItem("NumInterns", 3);
    }
    if (localStorage.getItem("NumListings") === null) {
      localStorage.setItem("NumListings", 3);
    }
    if (localStorage.getItem("NumUsers") === null) {
      localStorage.setItem("NumUsers", 3);
    }
    this.setupInterceptor();
  }

  componentDidMount() {
    this.props.startGlobalLoading();
    this.auth();
    this.getFullCandidates();
    this.getListings();
    this.getBusinessUsers();
    this.props.finishGlobalLoading();
  }

  setupInterceptor() {
    axios.interceptors.response.use((res) => {
      //console.log(res)
      // Important: response interceptors **must** return the response.
      return res;
    });
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
        console.log(this.inMemoryToken.expiry);
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

  getBusinessInfo = async () => {
    let access = await this.getAccess();
    axios({
      url: "/api/get_business_info",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: `
        query MyQuery {
          getBusinessInfo(Id: "${this.props.companyInfo.id}") {
            Id
            description
            email
            name
            phoneNumber
            website
          }
        }
      `,
      },
    })
      .then((result) => {
        let data = result.data.data.getBusinessInfo
        console.log(data);
        this.props.updateName(data.name);
        this.props.updateDescription(
          data.description
        );
        this.props.updateWebsite(data.website);
        this.props.updateEmail(data.email);
        this.props.updatePhoneNumber(data.phoneNumber);
        this.props.updateAvatar(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8coQTo1rlE96O3Ljd9bx0CObBpUE6nLDyww&usqp=CAU"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getFullCandidates = async () => {
    this.props.startCandidateLoading();
    this.props.startInternLoading();
    let access = await this.getAccess();
    console.log(this.props);
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
    })
      .then((result) => {
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
        localStorage.setItem(
          "NumReview",
          candidates.filter((candidate) => candidate.status === "Review").length
        );
        localStorage.setItem(
          "NumInterview",
          candidates.filter((candidate) =>
            candidate.status.includes("Interview")
          ).length
        );
        this.props.updateInterns(interns);
        localStorage.setItem("NumInterns", interns.length);
        this.props.finishCandidateLoading();
        this.props.finishInternLoading();
      })
      .catch((error) => {
        console.log(error);
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
        //console.log(response.data);
        this.props.batchUpdateListings(
          _.isEqual(JSON.parse(response.data), {
            message: "Internal server error",
          })
            ? []
            : JSON.parse(response.data)
        );
        localStorage.setItem("NumListings", (JSON.parse(response.data).length) ? JSON.parse(response.data).length : 3);
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
      localStorage.setItem("NumUsers", this.props.companyInfo.users.length);
      console.log(response.data);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <ReactSwitch>
            <Route
              path="/login"
              exact
              render={() => <Login auth={this.auth} key="login" />}
            />
            <Route
              path="/signup"
              exact
              render={() => <Signup auth={this.auth} key="signup" />}
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
                    render={(props) => (
                      <MainPage
                        {...props}
                        key="mainpage"
                        candidates={this.props.companyInfo.candidates}
                        listings={this.props.listings}
                        loading={this.props.loadingStatuses}
                        interns={this.props.interns}
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
                      render={(props) => (
                        <InternshipDetails
                          {...props}
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
                      render={(props) => <PositionPost {...props} />}
                    />
                    <Route
                      key="internshipdetailroute"
                      path={`/internship-listings/:id`}
                      exact
                      render={(props) => (
                        <InternshipDetails
                          {...props}
                          title="Edit Posting"
                          buttonText="Save Changes"
                          updateListing={this.props.updateListing}
                        />
                      )}
                    />
                  </ReactSwitch>

                  <Route
                    path="/my-interns"
                    exact
                    render={(props) => (
                      <StudentInternPage {...props} key="studentinternpage" />
                    )}
                  />
                  <Route
                    path={`/my-interns/:id`}
                    render={(props) => (
                      <InternPageContainer
                        {...props}
                        getAccess={this.getAccess}
                        key="internpagecontainer"
                      />
                    )}
                  />
                  <Route
                    path="/settings"
                    render={(props) => (
                      <CompanyDetails {...props} getAccess={this.getAccess} companyInfo={this.props.companyInfo} key="companydetails" />
                    )}
                  />
                  <RouteCandidates getAccess={this.getAccess} />

                  <ReactSwitch>
                    <Route
                      path="/users"
                      exact
                      render={(props) => (
                        <Employeepage
                          {...props}
                          loading={
                            this.props.loadingStatuses.isCandidateLoading
                          }
                          users={this.props.companyInfo.users}
                        />
                      )}
                    />
                    <Route
                      path="/users/new-account"
                      exact
                      render={(props) => (
                        <CreateUser
                          {...props}
                          companyInfo={this.props.companyInfo}
                          token={this.inMemoryToken}
                        />
                      )}
                    />
                    <Route
                      path={`/users/:id`}
                      exact
                      render={(props) => <UserDetails {...props} />}
                    />
                  </ReactSwitch>
                </div>
              </Content>
            </Layout>
          </ReactSwitch>
        </Router>
      </React.Fragment>
    );
  }
}

class RouteCandidates extends PureComponent {
  render() {
    return (
      <Route
        key="candidatescontainer"
        path="/applicants"
        render={(props) => (
          <CandidatesContainer {...props} getAccess={this.props.getAccess} />
        )}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
