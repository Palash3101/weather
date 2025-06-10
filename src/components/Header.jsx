import '../index.css'

function Header() {
return (
  <div className='h-auto flex justify-between '>
    <div>
      <input className='bg-(--dark_boxes) rounded-[15px] h-[35px] m-3 ml-5 px-4 header' placeholder='Search...' />
    </div>
    <div className='flex items-center m-5'>
      Dark Mode
    </div>
  </div>
)
}

export default Header