import React, { useEffect, useState } from "react";

//React Routing
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch as ReactSwitch,
  Redirect,
  useRouteMatch as match,
  useParams
} from "react-router-dom";

//Ant Design
import { Layout } from "antd";

//Components
import MainPage from "./components/Main_Page/MainPage";
import BusinessNavBar from "./components/BusinessNavBar";
import CompanyDetails from "./components/Company_Details/CompanyDetails";
import HirePipeline from "./components/Candidates/HirePipeline";
import StudentInfo from "./components/Candidates/StudentInfo";
import NavSearch from "./components/NavSearch";

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <BusinessNavBar />
            <Content>
              <div
                style={{
                  marginLeft: "6%"
                }} /** <===== GHETTO SOLUTION (Prevents Overlap of Page and Navbar) */
              >
                <Route path="/dashboard" exact component={MainPage} />
                <Route
                  path="/"
                  exact
                  render={props => {
                    return (
                      (this.authParam = props.location.search),
                      <Redirect to="/dashboard" />
                    );
                  }}
                />
                <Route path="/applicants">{this.renderPage()}</Route>
                <Route path="/settings">{this.renderPage()}</Route>
              </div>
            </Content>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }

  renderPage = () => {
    return (
      <React.Fragment>
        <NavSearch />
        <ReactSwitch>
          <div
            style={{
              backgroundColor: "#eceff9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Route path="/settings" exact component={CompanyDetails} />

            <Route path="/applicants" exact component={HirePipeline} />
            <Route path={`/applicants/:id`} component={StudentInfo} />
          </div>
        </ReactSwitch>
      </React.Fragment>
    );
  };
}
export default App;
