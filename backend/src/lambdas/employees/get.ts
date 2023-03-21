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
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const employee = await employeesService.getById(+id);
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(employee),
        };
      }
    }
    const employees = await employeesService.getAll();
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(employees),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
