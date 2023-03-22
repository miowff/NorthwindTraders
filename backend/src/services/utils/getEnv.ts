import { EnvVariables } from "src/enums/envVariables";

const getEnv = (envName: EnvVariables) => {
  return process.env[envName];
};
export default getEnv;
