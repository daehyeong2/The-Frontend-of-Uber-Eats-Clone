import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="text-left text-red-600">
    {errorMessage}
  </span>
);

export default FormError;
