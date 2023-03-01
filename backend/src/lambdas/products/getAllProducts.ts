import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import productsService from "src/services/productsService";
import { HEADERS } from "../headers";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productsService.getAll();
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(products),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  }
};
