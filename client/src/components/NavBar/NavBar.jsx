import React, { Component } from "react";
import { connect } from "react-redux";
import { isPanelSelect } from "../../actions/isPanelSelect";
import { getSelectedMarker } from "../../actions/marker/getSelectedMarker";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/signIn/logout";
import PropTypes from "prop-types";
import {
  LogoutBtn,
  Header,
  Logo,
  Title,
  User,
  LoginImg,
  LoginName,
  Input,
  Nav,
  NavItem,
  NavLink,
  Icon,
  Label,
  Panel,
  ResponsiveMenu,
  ResponsiveNav
} from "./style";

const activeClassName = "nav-item-active";

const Logout = withRouter(({ history, logOutFromApp }) => {
  return (
    <LogoutBtn
      onClick={() => {
        logOutFromApp({
          userId: "",
          userName: "",
          error: "",
          isAuthorized: false
        });
        localStorage.removeItem("token");
        history.push("/login");
      }}
    >
      Sign out
    </LogoutBtn>
  );
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  handleCheckBox = event => {
    this.setState({
      checked: event.target.checked
    });
  };

  handleMap = () => {
    const { getSelectedMarker } = this.props;
    getSelectedMarker("");
  };

  handleMapCreator = () => {
    const { isPanelSelect, getSelectedMarker } = this.props;
    getSelectedMarker("");
    isPanelSelect(true);
  };

  render() {
    const { logout } = this.props;
    return (
      <Panel>
        <ResponsiveMenu>
          <Header>
            <Logo src={"earth.png"} />
            <Title className="logoName">mapCreator</Title>
          </Header>
          <Label htmlFor="toggle">&#9776;</Label>
          <Input type="checkbox" id="toggle" onChange={this.handleCheckBox} />
        </ResponsiveMenu>
        <ResponsiveNav isChecked={this.state.checked}>
          <User>
            <LoginImg src={"user.png"} />
            <LoginName>UserNick</LoginName>
          </User>
          <Logout logOutFromApp={logout} />
          <Nav>
            <NavItem>
              <NavLink
                onClick={this.handleMap}
                to="/"
                exact={true}
                activeClassName={activeClassName}
              >
                <Icon src={"map.png"} /> Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={this.handleMapCreator}
                to="/createMarker"
                activeClassName={activeClassName}
              >
                <Icon src={"gps.png"} width={32} height={32} />Create Marker
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/statistic" activeClassName={activeClassName}>
                <Icon src={"graph.png"} width={32} height={32} />Statistic
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/list" activeClassName={activeClassName}>
                <Icon src={"list.png"} width={32} height={32} />List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" activeClassName={activeClassName}>
                <Icon src={"users.png"} width={32} height={32} />Users
              </NavLink>
            </NavItem>
          </Nav>
        </ResponsiveNav>
      </Panel>
    );
  }
}

const mapDispatchToProps = {
  isPanelSelect,
  getSelectedMarker,
  logout
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(NavBar);

NavBar.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
