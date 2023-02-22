import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.queryStringParameters["id"];
    if (!id) {
      return { statusCode: 400, body: "Bad request! id query param is null." };
    }
    const customer = await customersService.getById(id);
    return { statusCode: 200, body: JSON.stringify(customer) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};
