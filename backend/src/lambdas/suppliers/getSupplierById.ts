import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import suppliersService from "src/services/suppliersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = +event.queryStringParameters["id"];
  if (!id) {
    return { statusCode: 400, body: "Bad request! id query param is null." };
  }
  const supllier = await suppliersService.getByIdAsync(id);
  return { statusCode: 200, body: JSON.stringify(supllier) };
};
