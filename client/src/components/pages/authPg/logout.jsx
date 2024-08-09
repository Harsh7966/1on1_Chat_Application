import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../../../storage/auth";

export const Logout= () =>{

    const {logoutUser} = UseContext();
    const navigate= useNavigate();
    
    useEffect(()=>{
        logoutUser();
    }, [logoutUser]);

    navigate("/");
}