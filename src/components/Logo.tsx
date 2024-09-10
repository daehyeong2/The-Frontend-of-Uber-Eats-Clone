import React from "react";
import uberLogo from "../logo.svg";

interface ILogoProps {
  className?: string;
  alt?: string;
}

const Logo: React.FC<ILogoProps> = ({ className, alt }) => {
  return <img className={className} alt={alt} src={uberLogo} />;
};

export default Logo;
