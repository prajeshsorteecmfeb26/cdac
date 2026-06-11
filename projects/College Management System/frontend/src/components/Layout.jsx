import { useLocation } from "react-router-dom"
import { NavigationBar } from "./NavigationBar";

export function Layout(){

    const location = useLocation();

    return location.pathname !== "/" ? (<NavigationBar/>) : null
}