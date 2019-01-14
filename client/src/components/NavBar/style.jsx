import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
const activeClassName = "nav-item-active";

const Panel = styled.div`
  height: 100%;
  background: #4ddbff;

  @media (max-width: 1199px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Header = styled.div`
  display: flex;
  padding-top: 30px;
  margin-bottom: 70px;
  justify-content: center;

  @media (max-width: 1199px) {
    justify-content: flex-start;
    margin-left: 30px;
    margin-bottom: 0;
    padding: 0;
    align-items: center;
  }
`;

const Logo = styled.img`
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 26px;
  display: flex;
  align-items: center;

  @media (max-width: 1199px) {
    margin: 0;
  }
`;

const User = styled.div`
  @media (max-width: 1199px) {
    display: none;
  }
`;

const LoginImg = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
const LoginName = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
`;

const Label = styled.label`
  display: none;

  @media (max-width: 1199px) {
    display: flex;
    cursor: pointer;
    font-size: 30px;
    justify-content: flex-end;
    margin: 0;
    align-items: center;
    margin-right: 30px;
  }
`;

const Nav = styled.ul`
  margin-top: 60px;
  padding-left: 0;

  @media (max-width: 1199px) {
    display: none;
    width: 100%;
    text-align: center;
    z-index: 21;
  }
`;

const Input = styled.input`
  display: none;

  @media (max-width: 1199px) {
    &:checked + ${Nav} {
      display: block;
    }
  }
`;

const NavItem = styled.li`
  list-style-type: none;
  margin: 5px 0;
  height: 50px;
  display: flex;
  align-items: center;
  width: 90%
  margin-left: auto;
  margin-right: auto;


  &:hover{
    background: #00b8e6;
  }
`;

const NavLink = styled(Link).attrs({ activeClassName })`
  color: #000;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 5px;
  color: #000;

  &:hover {
    text-decoration-line: none;
    color: #000;
  }

  &.${activeClassName} {
    background: #00b8e6;
  }
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const LogoutBtn = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  background: #00b8e6;
  cursor: pointer;
  height: 40px;
  width: 165px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00b8e6;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;

  @media (max-width: 1199px) {
    display: none;
  }
`;

export {
  Label,
  LogoutBtn,
  Panel,
  Header,
  Logo,
  Title,
  User,
  LoginImg,
  LoginName,
  Nav,
  NavItem,
  NavLink,
  Icon,
  Input
};
