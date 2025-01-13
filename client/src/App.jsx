import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  DashboardLayout,
  Dashboard,
  CreateBlog,
} from './pages';

import { action1 as registerAction } from './pages/Register';
import { action1 as loginAction } from './pages/Login';
import { action as createBlogAction } from './pages/Blog/CreateBlog';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'create-blog',
        element: <CreateBlog />,
        action: createBlogAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider
      router={router}
    ></RouterProvider>
  );
};
export default App;
