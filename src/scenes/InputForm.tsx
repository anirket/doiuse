import React from 'react';

type Props = {};

const InputForm = (props: Props) => {
  return (
    <div className="user-input">
      <div className="w-full md:flex justify-around gap-8 items-center">
        <section className='md:w-1/2'>
          <label className='text-sm pl-[1px]' htmlFor="section">Enter BrowserList String</label>
          <input
            className="w-full h-8 border-[1.5px] outline-none focus:shadow-sm rounded-md p-2 focus:border-blue-300 focus:border-2 mt-2"
            name='browserlist-string'
            placeholder='Eg: last 2 Chrome versions'
            type="text"
          />
        </section>
        <section className='md:w-1/2 mt-4 md:mt-0'>
          <label className='text-sm pl-[1px]' htmlFor="section">Search</label>
          <input
            className="w-full h-8 border-[1.5px] outline-none focus:shadow-sm rounded-md p-2 focus:border-blue-300 focus:border-2 mt-2"
            name='search-query'
            type="text"
          />
        </section>
        <button className='p-[5px] px-4 mt-8 border-2 text-sm rounded-lg w-full md:w-28 hover:border-blue-500'>Search</button>
      </div>
    </div>
  );
};

export default InputForm;
