import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Route } from './routes';

interface Props {
  routeItem: Route,
}

const NavItem: React.FC<Props> = ({ routeItem: { icon, name, path } }) => {
  const location = useLocation();
  return (
    <StyledNavItem isActive={location.pathname === path}>
      <StyledLink to={path}>
        <IconWrapper>
          {icon}
        </IconWrapper>
        {name}
      </StyledLink>
    </StyledNavItem>
  );
};

const StyledNavItem = styled.li<{ isActive: boolean }>`
  ${({ isActive }) => isActive ? 'background-color: #374155;' : ''};
  &:hover {
    background-color: #374155;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 60px;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  padding: 10px 0;
`;

export default NavItem;
