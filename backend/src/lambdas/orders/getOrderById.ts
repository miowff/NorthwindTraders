import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import ordersService from "src/services/ordersService";
import { HEADERS } from "../headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const order = await ordersService.getById(+id);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(order),
        };
      }
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify(`Bad request`),
      };
    }
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request`),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
