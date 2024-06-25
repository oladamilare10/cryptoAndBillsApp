import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    useEffect(()=> {
        let login = localStorage.getItem('login');
        if(!login) {
            localStorage.setItem("loginStatus", "Please Login your Account");
            navigate("/Login", {replace: true});
        }
    })
    return(
        <Component />
    )
}

export default Protected