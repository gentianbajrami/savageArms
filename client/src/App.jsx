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
  AddFirearm,
  AllFirearms,
  EditFirearm,
  Cart,
  Products,
  SingleProductPage,
} from './pages';

import { action1 as registerAction } from './pages/Register';
import { action1 as loginAction } from './pages/Login';
import { action1 as addFirearmAction } from './pages/Firearms/AddFirearm';
import { action1 as deleteFirearmAction } from './pages/Firearms/DeleteFirearm';
import { action1 as editFirearmAction } from './pages/Firearms/EditFirearm';
import { action as createBlogAction } from './pages/Blog/CreateBlog';
import { action as deleteBlogAction } from './pages/Blog/DeleteBlog';
import { action as editBlogAction } from './pages/Blog/EditBlog';
import { action as singleProductAction } from './pages/SingleProductPage';
import { action as deleteCartItemAction } from './pages/DeleteCartItemAction';
import { action as updateCartItemAction } from './pages/UpdateCartItemAction';

import { loader as allFirearmsLoader } from './pages/Firearms/AllFirearms';
import { loader as editFirearmLoader } from './pages/Firearms/EditFirearm';
import { loader as blogDashboardLoader } from './pages/Blog/BlogDashboard';
import { loader as editBlogLoader } from './pages/Blog/EditBlog';

import { loader1 as adminLoader } from './pages/Admin';
import { loader as dashboardLoader } from './pages/Dashboard/DashboardLayout';
import { loader as blogLoader } from './pages/Blog';
import { loader as cartLoader } from './pages/Cart';
import { loader as productLoader } from './pages/Products';
import { loader as singleProductLoader } from './pages/SingleProductPage';

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
      {
        path: 'blog',
        element: <Blog />,
        loader: blogLoader(queryClient),
      },
      { path: 'profile', element: <Profile /> },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cart',
        element: <Cart />,
        loader: cartLoader(queryClient),
        children: [
          {
            path: 'update/:id',
            action:
              updateCartItemAction(queryClient),
          },
          {
            path: 'remove/:id',
            action:
              deleteCartItemAction(queryClient),
          },
        ],
      },
      {
        path: 'products',
        element: <Products />,
        loader: productLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProductPage />,
        loader: singleProductLoader(queryClient),
        action: singleProductAction(queryClient),
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
    loader: dashboardLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AddFirearm />,
        action: addFirearmAction(queryClient),
      },
      {
        path: 'add-firearm', // ✅ accessible at /dashboard/add-firearm too
        element: <AddFirearm />,
        action: addFirearmAction(queryClient),
      },
      {
        path: 'admin',
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: 'edit-firearm/:id',
        element: <EditFirearm />,
        loader: editFirearmLoader,
        action: editFirearmAction,
      },
      {
        path: 'delete-firearm/:id',
        action: deleteFirearmAction,
      },
      {
        path: 'all-firearms',
        element: <AllFirearms />,
        loader: allFirearmsLoader,
      },
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
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
