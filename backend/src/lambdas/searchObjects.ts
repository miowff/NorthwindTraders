import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";
import productsService from "src/services/productsService";
import { HEADERS } from "./headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { type, pattern } = event.queryStringParameters;
    if (!type || !pattern) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify("Bad Request! Search pattern or type is null"),
      };
    }
    switch (type.toLowerCase()) {
      case "products": {
        const result = await productsService.search(pattern);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(result),
        };
      }
      case "customers": {
        const result = await customersService.find(pattern);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(result),
        };
      }
      default: {
        return {
          statusCode: 400,
          headers: HEADERS,
          body: JSON.stringify("Bad Request!"),
        };
      }
    }
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
