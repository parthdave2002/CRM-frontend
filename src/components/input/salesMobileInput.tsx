import React, { FC } from 'react'
import { Button, Input, InputProps  } from "reactstrap";

interface PropsData{
    datatype?: InputProps["type"];
    value ?: string | number; 
    placeholder ?: string;
    handleChange : (value: string ) => void;
    handleClickCall : () => void;
}

const SalesMobileInput  : FC <PropsData> = ({handleChange, handleClickCall,placeholder, value, datatype}) => {

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleClickCall();
    };

  return (
    <>
          <div className="flex self-center my-[2rem] justify-end gap-x-3 border-0">
            <Input type={datatype}  className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100" placeholder={placeholder} value={value} onChange={(e) => handleChange(e.target.value)} onKeyUp={handleKeyUp} />
            <Button className="px-[2rem] py-4 rounded-r-full bg-blue-600 text-gray-50 absolute" onClick={() => handleClickCall()}> Go   </Button>
          </div>
    </>
  )
}

export default SalesMobileInput