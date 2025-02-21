import React from "react";
import "../../css/miniComponents/errorComponent.scss";

interface ErrorComponentProps {
  errorMessage: string;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorMessage,
  onRetry,
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2>Ooops! Something went wrong.</h2>
        <p> {errorMessage} </p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
