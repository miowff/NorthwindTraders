import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const customers = await customersService.getAll();
    return { statusCode: 200, body: JSON.stringify(customers) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};
