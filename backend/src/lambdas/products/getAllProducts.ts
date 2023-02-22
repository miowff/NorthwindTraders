import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productsService.getAll();
    return { statusCode: 200, body: JSON.stringify(products) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};
