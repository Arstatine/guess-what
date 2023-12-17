import { Route, Routes } from 'react-router-dom';
import { Category, Home, NotFound } from '../views';

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/category/:id' element={<Category />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
