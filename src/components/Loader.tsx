import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
