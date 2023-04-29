import { PropsWithChildren } from "react";

const ErrorBanner: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="text-3xl sticky top-0 z-50 bg-red-700 text-w p-5 text-center leading-none font-bold">
      {children}
    </div>
  );
};

export default ErrorBanner;
