import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const products = await productsService.getAllAsync();
  return { statusCode: 200, body: JSON.stringify(products) };
};
