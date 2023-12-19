import { Link } from 'react-router-dom';

function CategoryItem({ path, category, id }) {
  return (
    <Link
      to={`/category/${path}`}
      className={`${path == id && 'text-blue-500'} hover:text-blue-500`}
    >
      {category}
    </Link>
  );
}

export default CategoryItem;
