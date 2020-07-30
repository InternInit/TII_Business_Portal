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
      <Layout>
        <Layout>
          <Content>
            <MainPage />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default App;
