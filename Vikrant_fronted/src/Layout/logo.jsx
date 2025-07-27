import React from "react";

const LogoComp = ({ 
  src = "logo.jpg", 
  alt = "Logo", 
  size = "w-16 h-16",
  position = "top-4 left-4",
  borderColor = "border-green-500/30 hover:border-green-400/60"
}) => {
  return (
    <div className={`fixed ${position} z-50`}>
      <img 
        src={src} 
        alt={alt} 
        className={`${size} rounded-lg shadow-lg border-2 ${borderColor} transition-all duration-300`}
      />
    </div>
  );
};

export default LogoComp;