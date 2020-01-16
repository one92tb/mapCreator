import React from "react";
import NoAuthorization from "../../NoAuthorization/NoAuthorization";
import Users from "../../Users/Users";
import Main from "../../Main/Main";
import Statistic from "../../Statistic/Statistic";
import NavBar from "../../NavBar/NavBar";
import List from "../../List/List";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { ContainerStyle, RowStyle, ColStyle } from "../style";
import decode from "jwt-decode";

export const authAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const { userData } = decode(token);
    if (userData.isAdmin === false) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const AuthAdmin = () => {
  return (
    <Container fluid tag={ContainerStyle}>
      <Row tag={RowStyle}>
        <Col tag={ColStyle} lg="12" xl="2">
          <NavBar />
        </Col>
        <Col tag={ColStyle} lg="12" xl="10">
          <Switch>
            <Route path={"/"} exact={true} component={Main} />
            <Route path={"/createMarker"} component={Main} />
            <Route path={"/statistic"} component={Statistic} />
            <Route path={"/list"} component={List} />
            <Route
              render={props => (authAdmin() ? <Users /> : <NoAuthorization />)}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
