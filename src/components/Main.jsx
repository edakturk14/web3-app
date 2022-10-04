import React, { useState } from 'react';
import Typed from 'react-typed';

const Main = () => {
    return (
      <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
            Eda Akturk
          </h1>
          <div className='flex justify-center items-center'>
          <Typed
          className='md:text-5xl text-fuchsia-600 sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['web3 modal', 'lens']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
          <p className='md:text-lg font-bold text-gray-500'>
            Hey there! This is a sample app. 
          </p>
  
        </div>
      </div>
    );
  };
  
  export default Main;