import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
  } from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";
  
  export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const customers = await customersService.getAllAsync();
    return { statusCode: 200, body: JSON.stringify(customers) };
  };
  