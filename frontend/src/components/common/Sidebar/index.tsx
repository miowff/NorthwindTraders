import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';
import routes from './routes';

const Sidebar: React.FC = (props) => {
  return (
    <StyledSidebar {...props}>
      <CompanyLabel>
        <b>Northwind</b>
        {' '}
        Traders
      </CompanyLabel>
      <NavList>
        <Category>General</Category>
        <NavItem routeItem={routes.home} />
        <NavItem routeItem={routes.dashboard} />
        <Category>Backoffice</Category>
        <NavItem routeItem={routes.suppliers} />
        <NavItem routeItem={routes.products} />
        <NavItem routeItem={routes.orders} />
        <NavItem routeItem={routes.employees} />
        <NavItem routeItem={routes.customers} />
        <NavItem routeItem={routes.search} />
      </NavList>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  background-color: #1f2937;
  color: #D1D5DB;
  height: 100vh;
`;

const CompanyLabel = styled.div`
  background-color: #111827;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 70px;
  & > b {
    font-weight: 900;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Category = styled.li`
  color: #9CA3AF;
  font-size: 16px;
  line-height: 1.25;
  padding: 15px;
  text-transform: uppercase;
`;

export default Sidebar;
