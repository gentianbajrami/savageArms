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
  BlogDashboard,
  EditBlog,
} from './pages';

import { action1 as registerAction } from './pages/Register';
import { action1 as loginAction } from './pages/Login';
import { action as createBlogAction } from './pages/Blog/CreateBlog';
import { action as deleteBlogAction } from './pages/Blog/DeleteBlog';
import { action as editBlogAction } from './pages/Blog/EditBlog';

import { loader as blogDashboardLoader } from './pages/Blog/BlogDashboard';
import { loader as editBlogLoader } from './pages/Blog/EditBlog';

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
      {
        path: 'blog',
        element: <BlogDashboard />,
        loader: blogDashboardLoader(queryClient),
      },
      {
        path: 'delete-blog/:id',
        action: deleteBlogAction(queryClient),
      },
      {
        path: 'edit-blog/:id',
        element: <EditBlog />,
        loader: editBlogLoader(queryClient),
        action: editBlogAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
