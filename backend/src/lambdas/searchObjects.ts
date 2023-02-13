import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import customersService from "src/services/customersService";
import productsService from "src/services/productsService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { type, pattern } = event.queryStringParameters;
  if (!type || !pattern) {
    return {
      statusCode: 400,
      body: JSON.stringify("Bad Request! Search pattern or type is null"),
    };
  }
  switch (type.toLowerCase()) {
    case "products": {
      const result = await productsService.searchProductAsync(pattern);
      return { statusCode: 200, body: JSON.stringify(result) };
    }
    case "customers": {
      const result = await customersService.searchCustomerAsync(pattern);
      return { statusCode: 200, body: JSON.stringify(result) };
    }
    default: {
      return { statusCode: 400, body: JSON.stringify("Bad Request!") };
    }
  }
};
