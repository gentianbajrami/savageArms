import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Accessories,
  Admin,
  Blog,
  Error,
  Firearms,
  Home,
  Login,
  MainLayout,
  Performance,
  Profile,
  Register,
  About,
  Suppressor,
  Bipods,
} from './pages';

import { action1 as registerAction } from './pages/Register';
import { action1 as loginAction } from './pages/Login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // homepage content
      { path: 'firearms', element: <Firearms /> },
      {
        path: 'accessories',
        children: [
          {
            index: true,
            element: <Accessories />,
          },
          {
            path: 'suppressor',
            element: <Suppressor />,
          },
          {
            path: 'bipods',
            element: <Bipods />,
          },
        ],
      },
      {
        path: 'performance',
        element: <Performance />,
      },
      { path: 'blog', element: <Blog /> },
      { path: 'profile', element: <Profile /> },
      { path: 'admin', element: <Admin /> },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
