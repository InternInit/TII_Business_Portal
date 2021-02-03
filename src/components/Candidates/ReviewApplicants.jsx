import React, { Component } from "react";
import "../../App.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  Button,
  Switch,
  Divider,
  Row as AntRow,
  Col as AntCol,
  Dropdown,
} from "antd";
import { Transition, config } from "react-spring/renderprops";
import { Header, InnerContainer } from "../Styled/FundamentalComponents.jsx";
import { AiOutlineUser } from "react-icons/ai";
import _ from "lodash";

import InfoBar from "../General/InfoBar.jsx";
import SortByMenu from "../General/SortByMenu.jsx";
import CandidateQuickviewTab from "./CandidateQuickviewTab.jsx";
import CandidateQuickviewReviewTab from "./CandidateQuickviewReviewTab.jsx";
import CandidateDetailedviewTab from "./CandidateDetailedviewTab.jsx";
import CandidateDetailedviewReviewTab from "./CandidateDetailedviewReviewTab.jsx";
import {
  CandidateQuickviewTabSkeleton,
  CandidateDetailedviewSkeleton,
} from "./CandidateSkeletons.jsx";

//Ant Design Styles
const AddFilterStyle = {
  width: "270px",
  height: "40px",
  fontFamily: "roboto",
  align: "inline-block",
};

const mapStateToProps = (state) => {
  return {
    companyInfo: state.companyInfo,
    loadingStatuses: state.loadingStatuses,
  };
};

class ReviewApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickview: true,
      page: "1",
      review: true,
      sortType: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleReview = (internId) => {
    //console.log(internId);
    this.props.updateCandidateStatus(internId, "Review");
  };

  handleInterviewUnread = (internId) => {
    this.props.updateCandidateStatus(internId, "Online Interview");
  };

  handleInterviewReview = (internId) => {
    this.props.updateCandidateStatus(internId, "Online Interview");
  };

  handleReject = (internId) => {
    this.props.updateCandidateStatus(internId, "Rejected");
  };

  setSort = (val) => {
    switch (val) {
      case "First Name":
        this.setState({ sortType: "formData[0]['First Name']" });
        break;
      case "Last Name":
        this.setState({ sortType: "formData[0]['Last Name']" });
        break;
      case "School":
        this.setState({ sortType: "formData[1]['Education'][0].Name" });
        break;
      case "Position":
        this.setState({ sortType: "appliedFor" });
        break;
      case "GPA":
        this.setState({ sortType: "formData[0]['Unweighted GPA']" });
        break;
      default:
        this.setState({ sortType: "formData[0]['First Name']" });
        break;
    }

    return;
  };

  render() {
    return (
      <Transition
        items={this.props.location.pathname}
        from={{ opacity: 0.5, transform: "translateY(20px)" }}
        enter={{ opacity: 1, transform: "translateY(0px)" }}
        leave={{ opacity: 1 }}
        config={config.stiff}
      >
        {(location) => (props) => (
          <InnerContainer key="reviewApplicantsContainer" style={{ ...props }}>
            <AntRow className="pt-2" gutter={[32, 16]}>
              <AntCol flex="270px">
                <Dropdown
                  overlay={
                    <SortByMenu
                      gpa={true}
                      setSort={(val) => this.setSort(val)}
                    />
                  }
                  trigger={["click"]}
                >
                  <Button type="default" style={AddFilterStyle}>
                    <span className="sixteenFont">Sort By</span>
                  </Button>
                </Dropdown>
              </AntCol>
              <AntCol className="universal-middle" flex="auto">
                <AntRow align="middle">
                  <AntCol flex="120px">
                    {this.state.quickview ? (
                      <Header className="eighteenFont" bolded>
                        Quickview
                      </Header>
                    ) : (
                      <Header className="eighteenFont" bolded>
                        Detailed View
                      </Header>
                    )}
                  </AntCol>
                  <AntCol>
                    <Switch
                      defaultChecked
                      onChange={() =>
                        this.setState({ quickview: !this.state.quickview })
                      }
                    />
                  </AntCol>
                </AntRow>
              </AntCol>
            </AntRow>

            <Header className="twentyEightFont mt-1 mb-point-75" bolded>
              Unread Applicants
            </Header>

            {this.renderUnreadApplicants()}

            {this.renderReviewApplicants()}
          </InnerContainer>
        )}
      </Transition>
    );
  }

  renderUnreadApplicants = () => {
    let { candidates } = this.props.companyInfo;
    let unreadCandidates = _.orderBy(
      candidates.filter((candidate) => candidate.status === "Pending"),
      this.state.sortType
    );
    return this.state.quickview ? (
      <React.Fragment>
        <InfoBar
          mobileHeader="Applicants"
          fieldOne={{ name: "Name", sm: 4, lg: 4, align: "universal-left" }}
          fieldTwo={{
            name: "School and Region",
            sm: 8,
            lg: 8,
            align: "universal-center",
          }}
          fieldThree={{ name: "GPA", sm: 3, lg: 3, align: "universal-center" }}
          fieldFour={{
            name: "Applied For",
            sm: 6,
            lg: 6,
            align: "universal-center",
          }}
          fieldFive={{
            name: "Actions",
            sm: 3,
            lg: 3,
            align: "universal-center",
          }}
        />
        {this.props.loadingStatuses.isCandidateLoading ? (
          <>
            <CandidateQuickviewTabSkeleton />
            <CandidateQuickviewTabSkeleton />
            <CandidateQuickviewTabSkeleton />
          </>
        ) : unreadCandidates.length > 0 ? (
          unreadCandidates.map((student, index) => (
            <CandidateQuickviewTab
              key={index}
              id={student.Id}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              school={student.formData["1"]["Education"][0]}
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Unread Applicants
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Divider />
        {this.props.loadingStatuses.isCandidateLoading ? (
          <>
            <CandidateDetailedviewSkeleton />
            <CandidateDetailedviewSkeleton />
            <CandidateDetailedviewSkeleton />
          </>
        ) : unreadCandidates.length > 0 ? (
          unreadCandidates.map((student, index) => (
            <CandidateDetailedviewTab
              key={index}
              id={student.Id}
              /**
               * All avatars follow this style path. If valid, avatar will show up. If not, the ANTD default will
               * show up.
               */
              avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              city={student.formData["0"].City}
              school={student.formData["1"]["Education"][0].Name}
              schoolAddress={
                student.formData["1"]["Education"][0].Address +
                ", " +
                student.formData["1"]["Education"][0].State
              }
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              age={student.formData["1"].Age}
              workDate={
                student.formData["0"]["Starting/Ending Dates"][0].split(
                  "T"
                )[0] +
                " - " +
                student.formData["0"]["Starting/Ending Dates"][1].split("T")[0]
              }
              workDays={student.formData["0"]["Willing Work Days"]}
              workTimes={student.formData["0"]["Willing Work Times"]}
              activities={student.formData["3"].Extracurriculars}
              courses={student.formData["3"].Courses}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Unread Applicants
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderReviewApplicants = () => {
    let { candidates } = this.props.companyInfo;
    let reviewCandidates = _.orderBy(
      candidates.filter((candidate) => candidate.status === "Review"),
      this.state.sortType
    );
    return this.state.quickview ? (
      <React.Fragment>
        <Header className="twentyEightFont mt-2 mb-point-75" bolded>
          Marked for Review
        </Header>
        <InfoBar
          mobileHeader="Applicants"
          fieldOne={{ name: "Name", sm: 4, lg: 4, align: "universal-left" }}
          fieldTwo={{
            name: "School and Region",
            sm: 8,
            lg: 8,
            align: "universal-center",
          }}
          fieldThree={{ name: "GPA", sm: 3, lg: 3, align: "universal-center" }}
          fieldFour={{
            name: "Applied For",
            sm: 6,
            lg: 6,
            align: "universal-center",
          }}
          fieldFive={{
            name: "Actions",
            sm: 3,
            lg: 3,
            align: "universal-center",
          }}
        />
        {this.props.loadingStatuses.isCandidateLoading ? (
          <>
            {_.times(localStorage.getItem("NumReview"), () => (
              <CandidateQuickviewTabSkeleton review={true} />
            ))}
          </>
        ) : reviewCandidates.length > 0 ? (
          reviewCandidates.map((student, index) => (
            <CandidateQuickviewReviewTab
              key={index}
              id={student.Id}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              school={student.formData["1"]["Education"][0]}
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Applicants to Review
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Header className="twentyEightFont mt-2" bolded>
          Marked for Review
        </Header>
        <Divider />
        {this.props.loadingStatuses.isCandidateLoading ? (
          <>
            {_.times(localStorage.getItem("NumReview"), () => (
              <CandidateDetailedviewSkeleton review={true} />
            ))}
          </>
        ) : reviewCandidates.length > 0 ? (
          reviewCandidates.map((student, index) => (
            <CandidateDetailedviewReviewTab
              key={index}
              id={student.Id}
              /**
               * All avatars follow this style path. If valid, avatar will show up. If not, the ANTD default will
               * show up.
               */
              avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${student.Id}/profile_picture`}
              name={
                student.formData["0"]["First Name"] +
                " " +
                student.formData["0"]["Last Name"]
              }
              city={student.formData["0"].City}
              school={student.formData["1"]["Education"][0].Name}
              schoolAddress={
                student.formData["1"]["Education"][0].Address +
                ", " +
                student.formData["1"]["Education"][0].State
              }
              GPA={parseFloat(student.formData["0"]["Unweighted GPA"])}
              appliedFor={student.appliedFor}
              age={student.formData["1"].Age}
              workDate={
                student.formData["0"]["Starting/Ending Dates"][0].split(
                  "T"
                )[0] +
                " - " +
                student.formData["0"]["Starting/Ending Dates"][1].split("T")[0]
              }
              workDays={student.formData["0"]["Willing Work Days"]}
              workTimes={student.formData["0"]["Willing Work Times"]}
              activities={student.formData["3"].Extracurriculars}
              courses={student.formData["3"].Courses}
              onReview={() => this.handleReview(student.Id)}
              onInterview={() => this.handleInterviewUnread(student.Id)}
              onReject={() => this.handleReject(student.Id)}
            />
          ))
        ) : (
          <div className="py-2-5 universal-center ">
            <AntRow justify="center" align="middle">
              <AiOutlineUser className="review-applicants-no-content-icon" />
            </AntRow>
            <AntRow justify="center" align="middle">
              <Header className="twentyFourFont" color="#bfbfbf">
                No Applicants to Review
              </Header>
            </AntRow>
          </div>
        )}
      </React.Fragment>
    );
  };
}

export default withRouter(connect(mapStateToProps)(ReviewApplicants));
