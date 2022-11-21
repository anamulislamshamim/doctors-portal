import { RouterProvider } from 'react-router-dom';
import router from './Routes/UserRoutes/UserRoutes';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={ router } />
    </div>
  );
}

export default App;
