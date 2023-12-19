import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryLink({ path, img, category, placeholder }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Link
      to={`/category/${path}`}
      className='aspect-[4/1] w-full lg:w-1/3 relative group'
    >
      {width >= 1024 ? (
        <img
          src={img}
          alt={category}
          loading='lazy'
          className='w-full h-full object-cover transition-all'
        />
      ) : (
        <img
          src={placeholder}
          alt={category}
          loading='lazy'
          className='w-full h-full object-cover'
        />
      )}
      <div className='absolute top-0 left-0 w-full h-full flex lg:group-hover:backdrop-blur-0 backdrop-blur-sm group-hover:bg-[rgba(0,0,0,.3)] bg-[rgba(0,0,0,.5)] justify-center items-center text-lg font-bold text-gray-100 uppercase transition-all'>
        {category}
      </div>
    </Link>
  );
}
