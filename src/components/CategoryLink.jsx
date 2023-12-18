import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryLink({ path, img, category, placeholder }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      to={`/category/${path}`}
      className='aspect-video w-full sm:w-1/2 lg:w-1/3 relative group'
    >
      <img
        src={img}
        alt={category}
        loading='lazy'
        className={`w-full h-full object-cover opacity-100 ${
          !imageLoaded && 'hidden  opacity-0'
        } transition-all`}
      />
      <img
        src={placeholder}
        alt={category}
        loading='lazy'
        className={`w-full h-full object-cover opacity-100 ${
          imageLoaded && 'hidden opacity-0'
        } transition-all`}
        onLoad={handleImageLoad}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-[rgba(0,0,0,.3)] bg-[rgba(0,0,0,.5)] flex justify-center items-center text-lg md:text-2xl font-bold text-gray-100 uppercase'>
        {category}
      </div>
    </Link>
  );
}
