import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import ordersService from "src/services/ordersService";
import responseCreator from "src/services/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const order = await ordersService.getById(+id);
        return responseCreator(200, JSON.stringify(order));
      }
    }
    const orders = await ordersService.getAll();
    return responseCreator(200, JSON.stringify(orders));
  } catch (err) {
    return responseCreator(400, JSON.stringify(err), err);
  }
};
