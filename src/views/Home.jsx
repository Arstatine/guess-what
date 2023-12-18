import React, { useMemo } from 'react';
import { categories } from '../utils';
import { Link } from 'react-router-dom';
import CategoryLink from '../components/CategoryLink';

function Home() {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) =>
      a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    );
  }, []);

  return (
    <div className='flex justify-between min-h-screen items-center flex-col'>
      <div className='container pb-6 lg:pb-0 pt-6 px-6 lg:px-0'>
        <h1 className='text-5xl lg:text-9xl text-center font-black uppercase'>
          Guess <span className='text-red-400'>What?</span>
        </h1>
        <p className='text-xl lg:text-3xl text-center font-normal'>
          A simple trivia quiz for you.
        </p>
      </div>
      <div className='container'>
        <div className='flex flex-wrap justify-center'>
          {sortedCategories.map((category) => {
            return (
              <MemoizedCategoryLink
                key={category.id}
                path={category.path}
                placeholder={category.placeholder}
                img={category.img}
                category={category.category}
              />
            );
          })}
        </div>

        <div className='text-5xl text-center font-black uppercase outline-none caret-transparent' />
      </div>
      <div className='bg-slate-200 w-full text-center py-6'>
        <Link
          to='https://arstatine.github.io'
          target='_blank'
          className='text-lg'
        >
          Made by{' '}
          <span className='text-red-500 hover:text-red-300'>Arstatine</span>
        </Link>
      </div>
    </div>
  );
}

const MemoizedCategoryLink = React.memo(CategoryLink);

export default Home;
