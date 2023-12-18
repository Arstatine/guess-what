import React, { useMemo } from 'react';
import { categories } from '../utils';
import CategoryItem from './CategoryItem';

function CategoryList({ param }) {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) =>
      a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    );
  }, []);

  return (
    <div className='flex gap-6 flex-col justify-center items-center bg-gray-100 py-12 px-6 rounded w-full lg:w-auto shrink-0'>
      <div className='flex flex-col text-center'>
        <h1 className='font-bold uppercase text-center pb-4 text-2xl'>
          Categories
        </h1>
        {sortedCategories.map((category) => {
          return (
            <MemoizeCategoryItem
              key={category.id}
              category={category.category}
              path={category.path}
              id={param}
            />
          );
        })}
      </div>
      <h1 className='hidden lg:block text-center mb-6 font-bold text-2xl tracking-widest uppercase'>
        Hotkeys
      </h1>
      <p className='hidden lg:block uppercase'>
        Stop -
        <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
          Esc
        </span>
      </p>
      <p className='hidden lg:block uppercase'>
        Restart -
        <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
          Ctrl
        </span>
        +
        <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
          Space
        </span>
      </p>
      <p className='hidden lg:block uppercase'>
        Skip -
        <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
          Tab
        </span>
      </p>
    </div>
  );
}

const MemoizeCategoryItem = React.memo(CategoryItem);

export default CategoryList;
