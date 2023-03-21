import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";
import { HEADERS } from "../headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const customer = await productsService.getById(+id);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(customer),
        };
      }
    }
    const products = await productsService.getAll();
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(products),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};