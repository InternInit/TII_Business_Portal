import React from "react";

import {
  Input,
  Upload,
  Button,
  Form,
  Row as AntRow,
  Col as AntCol,
  PageHeader,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Transition, config } from "react-spring/renderprops";

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
} from "../../redux/actions";

import NavSearch from "../General/NavSearch.jsx";

import {
  PageContainer,
  InnerContainer,
  FormContainer,
  Header,
} from "../Styled/FundamentalComponents.jsx";
import { Link } from "react-router-dom";

import gql from "graphql-tag";
import { print } from "graphql";

import axios from "axios";

// prettier-ignore
const MUTATION = gql`
mutation MyMutation ($Id:String!, $description:String, $email:String, $name:String, $phoneNumber:String, $website:String){
  updateBusinessInfoTest(input: {Id:$Id, description:$description, email:$email, name:$name, phoneNumber:$phoneNumber, website:$website}) {
    Id
    description
    email
    name
    phoneNumber
    website
  }
}                 
`

const { TextArea } = Input;
const { Dragger } = Upload;

//CSS Constants
const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "6vh",
};

const draggerStyle = {
  width: "35vh",
  height: "40px",
};

const headerClassNames = "twentyFont mb-point-5";

const marginTop = {
  marginTop: "0px",
};

//Form Props
const FormProps = {
  TotalForm: {
    name: "Company Details",
  },
  name: {
    key: "name",
    name: "name",
  },
  Description: {
    key: "description",
    name: "description",
  },
  Website: {
    key: "website",
    name: "website",
  },
  EMail: {
    key: "email",
    name: "email",
  },
  Phone: {
    key: "phoneNumber",
    name: "phoneNumber",
  },
  Visual: {
    key: "visual",
    name: "Visual",
  },
  Avatar: {
    key: "avatar",
    name: "Avatar",
  },
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
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
};

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = { business: null };
  }

  waitForRef = (ref) => {
    return new Promise((resolve, reject) => {
      function checkRef() {
        if (ref.current === null) {
          setTimeout(() => {
            checkRef();
          }, 10);
        } else {
          resolve(ref);
        }
      }
      checkRef();
    });
  };

  setFieldData = async () => {
    let fetchedRef = await this.waitForRef(this.formRef);
    console.log(this.props.companyInfo);
    fetchedRef.current.setFieldsValue(this.props.companyInfo);
  };
  componentDidMount() {
    let variable = null;
    this.setFieldData();
  }

  goToDashboard = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <PageContainer>
        <NavSearch title="Company Information" searchBar={false} />
        <InnerContainer className="py-2 px-4">
          <Transition
            items={this.props.location.pathname}
            from={{ opacity: 0.5, transform: "translateY(20px)" }}
            enter={{ opacity: 1, transform: "translateY(0px)" }}
            leave={{ opacity: 1 }}
            config={config.stiff}
          >
            {(location) => (props) => (
              <FormContainer key="companyDetails" style={{ ...props }}>
                <PageHeader
                  onBack={() => this.goToDashboard()}
                  style={{ position: "absolute", left: "3.5em", top: "1em" }}
                  title={
                    <Link
                      to="/dashboard"
                      style={{ fontWeight: "normal", color: "#262626" }}
                    >
                      Back to Dashboard
                    </Link>
                  }
                />
                <Header
                  className="twentyEightFont universal-center mb-1"
                  bolded
                >
                  Company Details
                </Header>
                {/**
                 *
                 * Company Name
                 *
                 */}
                <Form
                  {...FormProps.TotalForm}
                  ref={this.formRef}
                  onFinish={this.handleSave}
                >
                  <Header className={headerClassNames}>Company Name</Header>
                  <Form.Item {...FormProps.name}>
                    <Input
                      placeholder="Change Company Name"
                      size="large"
                      style={marginTop}
                    />
                  </Form.Item>
                  {/**
                   *
                   * Company Description
                   *
                   */}
                  <Header className={headerClassNames}>
                    Company Description
                  </Header>
                  {/* <InfoHeader>Company Description</InfoHeader> */}
                  <Form.Item {...FormProps.Description}>
                    <TextArea
                      placeholder="Company Description"
                      autoSize={{ minRows: 5, maxRows: 10 }}
                      style={marginTop}
                    />
                  </Form.Item>
                  {/**
                   *
                   * Company Website
                   *
                   */}
                  <Header className={headerClassNames}>Company Website</Header>
                  <Form.Item {...FormProps.Website}>
                    <Input
                      placeholder="https://www.interninit.com"
                      size="large"
                      style={marginTop}
                    />
                  </Form.Item>
                  {/**
                   *
                   * E-Mail
                   *
                   */}
                  <Header className={headerClassNames}>Company Email</Header>
                  <Form.Item {...FormProps.EMail}>
                    <Input
                      placeholder="company@email.com"
                      size="large"
                      style={marginTop}
                    />
                  </Form.Item>
                  {/**
                   *
                   * Phone Number
                   *
                   */}
                  <Header className={headerClassNames}>
                    Company Phone Number
                  </Header>
                  <Form.Item {...FormProps.Phone}>
                    <Input
                      placeholder="123 456 7891"
                      size="large"
                      style={marginTop}
                    />
                  </Form.Item>

                  {/**Row for Upload files */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <AntRow gutter={[150, 20]}>
                      {/**
                       *
                       * Company Visual
                       *
                       */}
                      <AntCol xs={24} sm={24} md={24} lg={12}>
                        <Header
                          className={headerClassNames}
                          style={{ textAlign: "center" }}
                        >
                          Upload Company Visual
                        </Header>
                        <Form.Item {...FormProps.Visual}>
                          <Dragger style={draggerStyle}>
                            <h1 style={{ color: "#69c0ff" }}>
                              <InboxOutlined />
                            </h1>
                            <h5>Click or Drag Files to Upload Here</h5>
                          </Dragger>
                        </Form.Item>
                      </AntCol>

                      {/**
                       *
                       * Company Logo
                       *
                       */}
                      <AntCol xs={24} sm={24} md={24} lg={12}>
                        <Header
                          className={headerClassNames}
                          style={{ textAlign: "center" }}
                        >
                          Upload Company Logo
                        </Header>
                        <Form.Item {...FormProps.Avatar}>
                          <Dragger style={draggerStyle}>
                            <h1 style={{ color: "#69c0ff" }}>
                              <InboxOutlined />
                            </h1>
                            <h5>Click or Drag Files to Upload Here</h5>
                          </Dragger>
                        </Form.Item>
                      </AntCol>
                    </AntRow>
                  </div>
                  {/**
                   *
                   * Save Changes Button
                   *
                   */}
                  <div style={buttonStyle}>
                    <Form.Item>
                      <Button
                        type="primary"
                        size="large"
                        style={{ width: "36vh" }}
                        htmlType="submit"
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </FormContainer>
            )}
          </Transition>
        </InnerContainer>
      </PageContainer>
    );
  }

  handleSave = async (values) => {
    console.log("This is the finished form", values);
    let access = await this.props.getAccess();

    axios({
      url: "/api/mutate_business_info",
      method: "post",
      headers: {
        Authorization: access,
      },
      data: {
        query: print(MUTATION),
        variables: {
          Id: this.props.companyInfo.id,
          description: values.description,
          email: values.email,
          name: values.name,
          phoneNumber: values.phoneNumber,
          website: values.website,
        },
      },
    })
      .then((result) => {
        //console.log(result.data[gradeId]);
        //console.log(internIndex, gradeId, result.data[gradeId]);
        let data = result.data.data.updateBusinessInfoTest;
        this.props.updateName(data.name);
        this.props.updateDescription(data.description);
        this.props.updateWebsite(data.website);
        this.props.updateEmail(data.email);
        this.props.updatePhoneNumber(data.phoneNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
