import dotenv from 'dotenv';
dotenv.config();

/**
 * getEnvVariable - function to get the env variable values
 * 
 * @param {*} envVarName 
 */
export function getEnvVariable(envVarName) {
    const envValue = process.env[envVarName];
    if(!envValue) {
        return new Error(`${envVarName} is Not Found`);
    }

    return envValue;
}