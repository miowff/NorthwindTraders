import React from 'react';
import styled from 'styled-components';

import useTimer from './useTimer';

const Header: React.FC = (props) => {
  const time = useTimer();
  return (
    <StyledHeader {...props}>
      <Timer>
        {time}
      </Timer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
`;

const Timer = styled.div`
  color: #314155;
  line-height: 50px;
  padding: 10px 15px;
  margin-left: 30px;
`;

export default Header;
