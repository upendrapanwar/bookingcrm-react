import React from 'react';
//import { Oval } from 'react-loader-spinner';
import { Spinner } from 'flowbite-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ top: 0, left: 0 }}>
      <Spinner color="gray" size="xl" />
    </div>
    /*<div className="flex justify-center items-center h-screen bg-white bg-opacity-50">
      <Oval
        height={150}
        width={150}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
      />
    </div>*/
    
  );
};

export default Loader;