import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import RootLayout from './pages/RootLayout/Root';
import Error from './pages/Error';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';

import { loader as productsLoader } from './components/List/List';
import { action as manipulateProduct } from './components/ProductManagement/ProductManagement';
import { loader as productLoader } from './components/ProductManagement/ProductManagement';
import { action as loginAction } from './components/Login/LoginContent';
import {
	loader as loginLoader,
	action as logoutAction,
} from './MainNavigation/MainNavigation';
import { loader as ordersLoader } from './pages/Home';
import { action as deleteProduct } from './components/List/List';

const url = 'https://ecommerce-shop-5f0427530cdd.herokuapp.com/';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <Error />,
		element: <RootLayout />,
		loader: () => loginLoader(url),
		action: () => logoutAction(url),
		id: 'root',
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
				loader: () => ordersLoader(url),
			},
			{
				path: 'auth/login',
				element: <Login />,
				action: () => loginAction(url),
			},
			{
				path: 'products',
				id: 'products',
				loader: () => productsLoader(url),
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: 'edit/:productId',
						element: <EditProduct />,
						loader: () => productLoader(url),
						action: () => manipulateProduct(url),
					},
				],
			},
			{
				path: 'create-product',
				element: <AddProduct />,
				action: () => manipulateProduct(url),
			},
			{
				path: 'delete/:productId',
				action: () => deleteProduct(url),
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
