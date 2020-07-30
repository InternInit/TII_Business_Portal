import React from 'react';

//Components
import MainPage from './components/Main_Page/MainPage';
import BusinessNavBar from './components/BusinessNavBar';

//Ant Design
import { Layout } from 'antd';
const { Content } = Layout;


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.AppContainer()}
      </React.Fragment>
    )
  }



  renderNav = () => {
    return (
      <BusinessNavBar />
    )
  }

  renderPage = () => {
    return (
      <React.Fragment>
        <div style={{ marginLeft: '6%' }} /** <===== GHETTO SOLUTION (Prevents Overlap of Page and Navbar) */>
          <MainPage />
        </div>
      </React.Fragment>

    )
  }

  AppContainer = () => {
    return (
      <React.Fragment>
        <Layout>
          {this.renderNav()}
          <Content>
            {this.renderPage()}
          </Content>
        </Layout>
      </React.Fragment>
    );
  };

}
export default App;
