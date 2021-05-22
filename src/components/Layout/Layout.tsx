import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ROUTE from "../../config/routes";
import ColumnContainer from "../Container/ColumnContainer";
import Location from "../Location/Location";

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 10% 0.5rem;
  align-items: center;
  background-color: #008080;
  margin-bottom: 2rem;
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

const Logo = styled(ColumnContainer)`
  color: white;
  h1 {
    margin: 0;
  }
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Logo>
          <h1>Weather Forecast App</h1>
          <Location />
        </Logo>
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
