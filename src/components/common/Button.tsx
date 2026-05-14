import React from "react";
import "../../App.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "light" | "danger" | "success" | "ghost";
}

export const Button = ({ variant = "primary", className = "", style, ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      style={style} 
      {...props} 
    />
  );
};
