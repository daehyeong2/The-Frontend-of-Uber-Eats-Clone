import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="text-left text-red-600">{errorMessage}</span>
);

export default FormError;
