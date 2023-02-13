import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = +event.queryStringParameters["id"];
    const customer = await productsService.getByIdAsync(id);
    return { statusCode: 200, body: JSON.stringify(customer) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};
