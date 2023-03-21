import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";
import productsService from "src/services/productsService";
import responseCreator from "src/services/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.queryStringParameters) {
      const { type, pattern } = event.queryStringParameters;
      if (!type || !pattern) {
        return responseCreator(
          400,
          "Bad Request! Search pattern or type is null"
        );
      }
      switch (type.toLowerCase()) {
        case "products": {
          const result = await productsService.search(pattern);
          return responseCreator(200, JSON.stringify(result));
        }
        case "customers": {
          const result = await customersService.find(pattern);
          return responseCreator(200, JSON.stringify(result));
        }
        default: {
          return responseCreator(400, "Bad Request!");
        }
      }
    }
    return responseCreator(400, "Bad Request!");
  } catch (err) {
    return responseCreator(400, JSON.stringify(err), err);
  }
};
