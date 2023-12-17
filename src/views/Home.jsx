import { categories } from '../utils';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='container py-12 px-6 lg:px-0'>
        <h1 className='text-5xl lg:text-9xl text-center font-black uppercase'>
          Guess <span className='text-red-400'>What?</span>
        </h1>
        <p className='text-xl lg:text-3xl text-center font-normal'>
          A simple trivia quiz for you.
        </p>
        <br />
        <div className='flex flex-wrap'>
          {categories
            .sort((a, b) =>
              a.category.toLowerCase().localeCompare(b.category.toLowerCase())
            )
            .map((category) => {
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.path}`}
                  className='bg-slate-200 aspect-video w-full sm:w-1/2 lg:w-1/3 relative group'
                >
                  <img
                    src={category.img}
                    alt={category.category}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute top-0 left-0 w-full h-full group-hover:backdrop-blur-0 bg-[rgba(0,0,0,.3)] backdrop-blur-sm flex justify-center items-center text-lg md:text-2xl font-bold text-gray-100 uppercase'>
                    {category.category}
                  </div>
                </Link>
              );
            })}
        </div>

        <div className='text-5xl text-center font-black uppercase outline-none caret-transparent' />
      </div>
      <div className='pb-12'>
        <Link
          to='https://arstatine.github.io'
          target='_blank'
          className='text-2xl'
        >
          Made by{' '}
          <span className='text-red-500 hover:text-red-300'>Arstatine</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
