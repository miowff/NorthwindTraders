import { ResponseDetails } from '@backend/models/response/responseDetails';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { State } from '@/redux';

import colors from '../../styles/colors';
import Page from '../common/Page';

const Home: React.FC = () => {
  const logData = useSelector<State, ResponseDetails[]>((state) => state.logData);

  const metrics = logData.reduce<any>((accumulatedMetrics, log) => ({
    ...accumulatedMetrics,
    [log.operation]: (accumulatedMetrics[log.operation] || 0) + 1,
    ['Query count']: accumulatedMetrics['Query count'] + 1,
    ['Results count']: accumulatedMetrics['Results count'] + log.resultsCount,
  }), {
    ['Query count']: 0,
    ['Results count']: 0,
    ['SELECT']: 0,
    ['SELECT WHERE']: 0,
    ['SELECT LEFT JOIN']: 0,
  });

  return (
    <StyledPage title={null}>
      <MainInfo>
        <div>
          <Title>Worker</Title>
          <div>Colo: KBP</div>
          <div>Country: UA</div>
        </div>
        <div>
          <Title>
            SQL Metrics
          </Title>
          {Object.entries(metrics).map((metric, index) => (
            <MetricInfo>
              {index > 1 ? '# ' : ''}{metric[0]}: {metric[1]}
            </MetricInfo>
          ))}
        </div>

      </MainInfo>

      <Title>
        Activity log
      </Title>
      <SecondaryTitle>
        Explore the app and see metrics here
      </SecondaryTitle>
      {logData.map((log) => {
        return (
          <div>
            <SecondaryText>
              {log.time}
            </SecondaryText>
            <OperationDescription>
              {log.operationDescription}
            </OperationDescription>
          </div>
        );
      })}
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 60px;
`;

const Title = styled.div`
  font-size: 25px;
`;

const SecondaryText = styled.div`
  font-size: 16px;
  color: ${colors.secondaryText};
`;

const SecondaryTitle = styled.div`
  font-size: 16px;
  color: #1F2937;
`;

const OperationDescription = styled.div`
  font-size: 17.5px;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
`;

const MetricInfo = styled.div`
  font-size: 17.5px;
  color: #1F2937;
`;

const MainInfo = styled.div`
  display: flex;
  margin: 30px;
  & > div {
    width: 50%;
  }
`;

export default Home;
