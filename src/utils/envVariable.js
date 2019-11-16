import dotenv from 'dotenv';
dotenv.config();

//todo make a function that will return the env variable
// if the env is not found then throw an error
export function getEnvVariable(envVarName) {
    const envValue = process.env[envVarName];
    if(!envValue) {
        return new Error(`${envVarName} is Not Found`);
    }

    return envValue;
}