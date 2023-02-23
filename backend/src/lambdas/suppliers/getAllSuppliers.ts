import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import suppliersService from "src/services/suppliersService";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const suppliers = await suppliersService.getAll();
    return { statusCode: 200, body: JSON.stringify(suppliers) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(`Bad request: ${err}`) };
  }
};