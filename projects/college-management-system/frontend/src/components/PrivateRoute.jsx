import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../features/login/TokenService";

export function PrivateRoute(){
    const token = getToken();

    if(token){
        // continue with the child route component
        return (<Outlet/>)
    }
    else{
        // redirect user on the login route 
        return <Navigate to={"/"} />

    }
}