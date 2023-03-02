import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";
import { HEADERS } from "../headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (!id) {
        return {
          statusCode: 400,
          body: "Bad request! id query param is null.",
        };
      }
      const customer = await customersService.getById(id);
      return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(customer),
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
