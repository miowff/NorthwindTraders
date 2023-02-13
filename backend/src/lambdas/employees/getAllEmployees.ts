import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import employeesService from "src/services/employeesService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const employees = await employeesService.getAllAsync();
  return { statusCode: 200, body: JSON.stringify(employees) };
};
