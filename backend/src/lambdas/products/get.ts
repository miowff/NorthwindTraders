import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";
import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const id = event.queryStringParameters["id"];
      if (id) {
        const customer = await productsService.getById(+id);
        return responseCreator(200, JSON.stringify(customer));
      }
    }
    const products = await productsService.getAll();
    return responseCreator(200, JSON.stringify(products));
  } catch (err) {
    return responseCreator(400, JSON.stringify(err), err);
  }
};
