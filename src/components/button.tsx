import React from "react";
import { cn } from "../utils/cn";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  text: string;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  text,
  className,
}) => {
  return (
    <button
      type="submit"
      disabled={!canClick}
      className={cn(
        "text-white py-3 w-full text-lg transition-all",
        canClick
          ? "bg-lime-700 hover:opacity-90"
          : "bg-neutral-300 hover:opacity-100 cursor-default",
        className
      )}
    >
      {loading ? "Loading.." : text}
    </button>
  );
};

export default Button;
