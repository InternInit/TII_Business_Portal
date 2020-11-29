import React, { useEffect, useState } from "react";

//React Routing
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch as ReactSwitch,
  Redirect,
  useRouteMatch as match,
  useParams,
} from "react-router-dom";

//Ant Design
import { Layout } from "antd";

//Redux
import { connect } from "react-redux";
import {
  updateCandidates,
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
import SchoolContact from "./components/SchoolContact/SchoolContact.jsx";
import StudentInternPage from "./components/InternFeedback/StudentInternPage.jsx";
import FeedbackResponse from "./components/InternFeedback/FeedbackResponse.jsx";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Employeepage from "./components/CompanyUsers/Employeepage";
import CreateUser from "./components/CompanyUsers/CreateUser";
import UserDetails from "./components/CompanyUsers/UserDetails";

import "./App.scss";

Amplify.configure(awsconfig);

const { Content, Sider } = Layout;

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    listings: state.listings,
  };
};

const mapDispatchToProps = {
  updateCandidates,
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
};

class App extends React.Component {
  componentDidMount() {
    this.auth();
    this.getCandidates();
    this.getListings();
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
        let id = session.idToken.payload.sub;
        this.props.updateId(session.idToken.payload["custom:companyId"]);
        this.getBusinessInfo(session.idToken.payload);
      })
      .catch((error) => {
        console.log("Session Error: " + error);
        /*
        if (window.location.href.split("/")[3] !== "login") {
          window.location.href =
            window.location.href.split("/").slice(0, 3).join("/") + "/login";
        }
        */
       this.props.updateId("6aa19690-d874-4fdd-a1d8-a1168a7b632c");
       this.getBusinessInfo({"custom:company": "The Internship Initiative LLC."});

        //TODO: Update to a more elegant solution
      });
  }

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

  getCandidates = () => {
    axios.get(`/api/get_student_candidates`).then((res) => {
      let candidates = res.data;
      this.props.updateCandidates(
        res.data.message === "Internal server error" ? [] : res.data
      );
      console.log(candidates);
    });
  };

  getListings = () => {
    const headers = {
      headers: {
        Authorization: "Bearer 6aa19690-d874-4fdd-a1d8-a1168a7b632c",
      },
    };

    axios.get("/api/get_internship_listings", headers).then((response) => {
      console.log(response.data);
      this.props.batchUpdateListings(
        _.isEqual(JSON.parse(response.data), {
          message: "Internal server error",
        })
          ? []
          : JSON.parse(response.data)
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route path="/login" exact component={() => (
            <Login
              auth={this.auth}
            />)}
          />
          <Route path="/signup" exact component={() => (
            <Signup
              auth={this.auth}
            />)} 
          />

          <Layout>
            <Sider width={80}>
              <BusinessNavBar 
                logout={this.logout}
              />
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
                      candidates={this.props.companyInfo.candidates}
                      listings={this.props.listings}
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
                  path="/intern-feedback"
                  exact
                  component={StudentInternPage}
                />
                <Route
                  path={`/intern-feedback/:id`}
                  exact
                  component={FeedbackResponse}
                />

                <Route
                  path="/contact-schools"
                  exact
                  component={SchoolContact}
                />
                <Route path="/applicants" component={CandidatesContainer} />
                <Route path="/settings" component={CompanyDetails} />

                <ReactSwitch>
                  <Route path="/users" exact component={() => 
                    <Employeepage
                      companyInfo={this.props.companyInfo}
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
                </ReactSwitch>
              </div>
            </Content>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
