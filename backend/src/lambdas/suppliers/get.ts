import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import responseCreator from "src/services/responseCreator";
import suppliersService from "src/services/suppliersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const supplier = await suppliersService.getById(+id);
        return responseCreator(200, JSON.stringify(supplier));
      }
    }
    const suppliers = await suppliersService.getAll();
    return responseCreator(200, JSON.stringify(suppliers));
  } catch (err) {
    return responseCreator(200, JSON.stringify(err), err);
  }
};
