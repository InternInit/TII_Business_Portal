import React from 'react';

//Components
import MainPage from './components/Main_Page/MainPage';
import BusinessNavBar from './components/BusinessNavBar';

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
import { Layout } from 'antd';
import CompanyDetails from './components/Company_Details/CompanyDetails';
const { Content } = Layout;


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>

            <BusinessNavBar />
            <Content>
              {this.renderPage()}
            </Content>
          </Layout>
        </Router>
      </React.Fragment>
    )
  }


  renderPage = () => {
    return (
      <React.Fragment>
        <ReactSwitch>

          <div style={{ marginLeft: '6%' }} /** <===== GHETTO SOLUTION (Prevents Overlap of Page and Navbar) */>
            <Route to='/dashboard' exact component={MainPage} />


            <Route
              path="/"
              exact
              render={props => {
                return (
                  (this.authParam = props.location.search),
                  <Redirect to='/dashboard' />
                );
              }}
            />
          </div>
        </ReactSwitch>
      </React.Fragment>

    )
  }



}
export default App;
