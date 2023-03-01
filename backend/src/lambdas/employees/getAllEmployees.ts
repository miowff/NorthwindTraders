import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import employeesService from "src/services/employeesService";
import { HEADERS } from "../headers";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
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
