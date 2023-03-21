import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import employeesService from "src/services/employeesService";
import responseCreator from "src/services/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const employee = await employeesService.getById(+id);
        return responseCreator(200, JSON.stringify(employee));
      }
    }
    const employees = await employeesService.getAll();
    return responseCreator(200, JSON.stringify(employees));
  } catch (err) {
    return responseCreator(400, JSON.stringify(err), err);
  }
};
