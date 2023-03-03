import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/colors';
import Page from '../common/Page';

const Home: React.FC = () => {
  return (
    <StyledPage title={null}>
      <Title>
        Welcome to Northwind Traders
      </Title>
      <SecondaryTitle>
        Running on Cloudflare's D1
      </SecondaryTitle>
      <MainImage
        src="https://imagedelivery.net/4wj01aQOZZ0hemsvbxWAvA/763bcbcd-da6d-46ec-f5e1-70c1c1a33d00/public"
        alt="database"
      />
      <TextBlock>
        This is a demo of the Northwind dataset,
        running on Cloudflare Workers,
        and D1 - Cloudflare's newest SQL database,
        running on SQLite.
      </TextBlock>
      <TextBlock>
        Read our D1 announcement to learn more about D1.
      </TextBlock>
      <TextBlock>
        This dataset was sourced from northwind-SQLite3.
      </TextBlock>
      <TextBlock>
        You can use the UI to explore Supplies,
        Orders, Customers, Employees and Products,
        or you can use search if you know what you're looking for.
      </TextBlock>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 60px;
`;

const Title = styled.div`
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 10px;
`;

const TextBlock = styled.div`
  margin-bottom: 20px;
`;

const SecondaryTitle = styled(TextBlock)`
  font-size: 22.5px;
  color: ${colors.secondaryText};
`;

const MainImage = styled.img`
  float: right;
  object-fit: scale-down;
  width: 480px;
`;

export default Home;
