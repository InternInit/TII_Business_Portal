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
import { updateCandidates, batchUpdateListings } from "./redux/actions";

//axios
import axios from "axios";

//Components
import MainPage from "./components/Main_Page/MainPage";
import BusinessNavBar from "./components/BusinessNavBar";
import CompanyDetails from "./components/Company_Details/CompanyDetails";
import HirePipeline from "./components/Candidates/HirePipeline";
import StudentInfo from "./components/Candidates/StudentInfo";
import CandidatesContainer from "./components/Candidates/candidatesContainer";
import NavSearch from "./components/NavSearch";
import PositionPost from "./components/Internship_Postings/PositionPost";
import InternshipDetails from "./components/Internship_Postings/InternshipDetails";
import SchoolContact from "./components/School_Contact/SchoolContact";
import InternFeedback from "./components/Intern_Feedback/InternFeedback";
import FeedbackResponse from "./components/Intern_Feedback/FeedbackResponse";
const { Content } = Layout;

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    listings: state.listings,
  };
};

const mapDispatchToProps = {
  updateCandidates,
  batchUpdateListings,
};

class App extends React.Component {
  componentDidMount() {
    this.auth();
    this.getCandidates();
    this.getListings();
  }

  auth = () => {};

  getCandidates = () => {
    axios.get(`/api/get_student_candidates`).then((res) => {
      let candidates = res.data;
      this.props.updateCandidates(candidates);
      console.log(candidates);
    });
  };

  getListings = () => {
    const headers = {
      headers: {
        Authorization: "Bearer e149eb67-8016-4d09-aa73-6bab85bdea1d",
      },
    };

    axios.get("/api/get_internship_listings", headers).then((response) => {
      console.log(response.data);
      console.log(JSON.parse(response.data));
      this.props.batchUpdateListings(JSON.parse(response.data));
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <BusinessNavBar />
            <Content>
              <div
                style={{
                  marginLeft: "6%",
                }} /** <===== GHETTO SOLUTION (Prevents Overlap of Page and Navbar) */
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
                      />
                    )}
                  />
                </ReactSwitch>

                <Route
                  path="/intern-feedback"
                  exact
                  component={InternFeedback}
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
              </div>
            </Content>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
