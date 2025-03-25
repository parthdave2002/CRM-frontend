import React, { FC } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import FarmeDashboard from './farmeDashboard';

interface Cartprops{
  setCartOpen : (value : boolean) => void;
}

const CartList : FC<Cartprops> = ({setCartOpen}) => {
  return (
    <>

      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Cart </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => setCartOpen(false)}> <FaWindowClose /> </div>
      </div>

      <div className="p-4 flex h-screen shadow mt-4 shadow-indigo-500/50 rounded-xl">
        <div className="flex-1 px-3 h-full flex ">
            <FarmeDashboard classData='border-r dark:border-gray-600 w-full py-2 px-4 transition-all duration-800 ease-in-out' />
        </div>

        <div className="flex-1 px-3 h-full flex ">
          <div className="w-full"> Hii </div>
        </div>
      </div>

    </>
  )
}

export default CartList