import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-transparent">
      <ul className="border-4 border-indigo-600 rounded-full w-52 h-11 flex justify-center items-center p-0 m-0 bg-white cursor-pointer transition ease-in-out duration-200 relative">
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave1 transition ease-in-out duration-200"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave2 transition ease-in-out duration-200 delay-200"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave3 transition ease-in-out duration-200 delay-230"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave4 transition ease-in-out duration-200 delay-100"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 transition ease-in-out duration-200 delay-500"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave2 transition ease-in-out duration-200 delay-500"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave4 transition ease-in-out duration-200 delay-400"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave3 transition ease-in-out duration-200 delay-150"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1"></li>
      </ul>
    </div>
  );
};

export default Loader;
