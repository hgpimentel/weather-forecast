import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ROUTE from "../../config/routes";

const Header = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  align-items: center;
  background-color: #008080;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 1.5rem;
    font-size: 1.25rem;
  }

  a {
    text-decoration: none;
    color: #88dfdf;
  }

  a:hover,
  a:active,
  a.active {
    color: #e6fcfc;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  color: white;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Logo>Weather Forecast App</Logo>
        <Nav>
          <ul>
            <li>
              <NavLink to={ROUTE.TODAY}>Today</NavLink>
            </li>
            <li>
              <NavLink to={ROUTE.NEXT7DAYS}>Next 7 Days</NavLink>
            </li>
          </ul>
        </Nav>
      </Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
