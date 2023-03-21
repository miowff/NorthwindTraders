import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import suppliersService from "src/services/suppliersService";
import { HEADERS } from "../headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const supplier = await suppliersService.getById(+id);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(supplier),
        };
      }
    }
    const suppliers = await suppliersService.getAll();
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(suppliers),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
