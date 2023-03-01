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
    const id = +event.queryStringParameters["id"];
    const supllier = await suppliersService.getById(id);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(supllier),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
