import { getToken } from "../features/login/TokenService";

export function getApiConfig(){
    return { headers: { Authorization: `Bearer ${getToken()}` }  }
}