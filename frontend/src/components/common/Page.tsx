import { Button } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  title: string | null;
  query?:  Pick<UseQueryResult, 'isLoading' | 'data' | 'error'>;
  withBack?: boolean;
}

const Page: React.FC<Props> = ({ children, title, query, withBack, ...props }) => {
  const { isLoading, error, data } = query || {};

  const navigate = useNavigate();
  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  const showChildren = useMemo(() => !query
    || (!isLoading && !error && data), [data, error, isLoading, query]);

  return (
    <StyledPage {...props}>
      {title && <Title>{title}</Title>}
      {isLoading ? (
        <div>Loading...</div>
      ) : null}
      {!isLoading && !showChildren ? (
        <div>Error...</div>
      ) : null}
      {showChildren ? (
        <>
          {children}
        </>
      ) : null}
      {withBack ? (
        <BackButton color="error" variant="contained" onClick={handleGoBack}>Go back</BackButton>
      ) : null}
    </StyledPage>
  );
};

const StyledPage = styled.div`
  padding: 30px 30px 60px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 15px 20px;
`;

const BackButton = styled(Button)`
  background-color: #EF4444;
  margin: 60px 0 0 15px;
  padding: 10px 20px;
  text-transform: none;
`;

export default Page;
