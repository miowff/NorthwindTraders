import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import employeesService from "src/services/employeesService";
import { HEADERS } from "../headers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = +event.queryStringParameters["id"];
    const employee = await employeesService.getById(id);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(employee),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
