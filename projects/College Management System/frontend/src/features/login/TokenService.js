export function storeToken(token){
    localStorage.setItem("token", token);
}

export function storeRole(role){
    localStorage.setItem("role", role);
}


export function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export function getToken(){
    return localStorage.getItem("token");
}

export function getRole(){
    return localStorage.getItem("role");
}