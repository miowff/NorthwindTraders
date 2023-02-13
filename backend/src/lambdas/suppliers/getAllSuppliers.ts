import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import suppliersService from "src/services/suppliersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const suppliers = await suppliersService.getAllAsync();
  return { statusCode: 200, body: JSON.stringify(suppliers) };
};
