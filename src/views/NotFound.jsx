import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function NotFound() {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col px-12'>
      <Link to='/' className='w-full sm:w-[50%] lg:w-[25%]'>
        <img src={logo} alt='' />
      </Link>
      <div className='text-8xl sm:text-9xl font-black uppercase text-center py-12'>
        <div className='tracking-widest flex bg-slate-500 w-full justify-center items-center'>
          <div className='w-1/3 relative flex justify-between items-center h-auto'>
            <span className='hover:rotate-90 cursor-pointer transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              4
            </span>
          </div>
          <div className='w-1/3 relative flex justify-between items-center h-auto'>
            <span className='hover:rotate-90 cursor-pointer transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              0
            </span>
          </div>
          <div className='w-1/3 relative flex justify-between items-center h-auto'>
            <span className='hover:rotate-90 cursor-pointer transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              4
            </span>
          </div>
        </div>
        <div className='text-5xl sm:text-7xl mt-12'>NOT FOUND</div>
      </div>
      <Link
        to='/'
        className='uppercase rounded-sm border px-4 py-2 border-black hover:bg-slate-100 tracking-widest'
      >
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
