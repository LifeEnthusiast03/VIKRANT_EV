import React from "react";
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/common/Navbar/navbar";
import ElectricBikeChatbot from "../components/ui/Bikebot/bikechatbot";
import LogoComp from "./logo";

const Layout = ({ children, }) => {
    const { isAuthenticated} = useAuth();
    return(
    <div className="relative">
        <LogoComp/>
        <Navbar />
        {children}
        {isAuthenticated && <ElectricBikeChatbot />}
    </div>
    )
  
};

export default Layout;
