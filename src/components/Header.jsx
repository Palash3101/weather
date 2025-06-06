import React from 'react'

function Header() {
return (
  <div className='h-auto flex justify-between '>
    <div>
      <input className='bg-(--dark_boxes) rounded-[15px] h-[45px] w-[700px] m-5 px-4' placeholder='Search...' />
    </div>
    <div className='flex items-center m-5'>
      Dark Mode
    </div>
  </div>
)
}

export default Header