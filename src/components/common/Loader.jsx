import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white bg-opacity-50">
      <Oval
        height={150}
        width={150}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loader;