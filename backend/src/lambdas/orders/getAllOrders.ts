import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import ordersService from "src/services/ordersService";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const orders = await ordersService.getAll();
    return { statusCode: 200, body: JSON.stringify(orders) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};