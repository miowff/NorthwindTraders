import { ServicesError } from "src/errors/servicesError";
import { HEADERS } from "src/lambdas/headers";

const responseCreator = (
  statusCode: number,
  response: string,
  _err?: Error | unknown
) => {
  if (_err) {
    if (_err instanceof ServicesError) {
      return {
        statusCode: statusCode,
        headers: HEADERS,
        body: JSON.stringify(`Bad request: ${_err}`),
      };
    }
  }
  return {
    statusCode: statusCode,
    headers: HEADERS,
    body: response,
  };
};

export default responseCreator;
