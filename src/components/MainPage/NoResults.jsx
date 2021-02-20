import React from "react";
import { Row, Col, Empty, Button } from "antd";
import { Header, Caption, NavigationButton } from "../Styled/FundamentalComponents.jsx";
import { Link } from "react-router-dom";

const NoResults = (props) => {
  let { message, isListing } = props;

  return (
    <Row justify="center" align="middle" className="py-1">
      <Empty
        description={<Caption className="eighteenFont" light>{message}</Caption>}
        image={
        //    Empty.PRESENTED_IMAGE_SIMPLE
        "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        }
        // imageStyle={{marginTop: "-14px", height: "60%"}}
      >
        {isListing ? (
          <Link to={`/internship-listings/add-listing`}>
            <Button 
            style={{border: "none", backgroundColor: " #1890ff", color:"white", 
            
            marginTop: "-10px"
        }}
            >
                Create Listing
            </Button>
          </Link>
        ) : null}
      </Empty>
    </Row>
  );
};

export default NoResults;
