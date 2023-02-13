import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import ordersService from "src/services/ordersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const orders = await ordersService.getAllAsync();
  return { statusCode: 200, body: JSON.stringify(orders) };
};
