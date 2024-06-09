import React from 'react';
import {
	NavLink,
	json,
	redirect,
	useRouteLoaderData,
	Form,
} from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
	const data = useRouteLoaderData('root');

	return (
		<div className='main-navigation'>
			<ul>
				<div className='main-pages'>
					<li>
						<NavLink
							className={({ isActive }) => {
								return isActive ? 'active' : '';
							}}
							to='/'
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => {
								return isActive ? 'active' : '';
							}}
							to='/products'
						>
							Products
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => {
								return isActive ? 'active' : '';
							}}
							to='/create-product'
						>
							Add New Product
						</NavLink>
					</li>
				</div>
				<div className='auth-pages'>
					<li>
						<NavLink
							className={({ isActive }) => {
								return isActive ? 'active' : '';
							}}
							to='/auth/login'
						>
							{data?.userInfo ? 'Welcome ' + data?.userInfo?.fullname : 'Login'}
						</NavLink>
					</li>
					{data?.userInfo && (
						<li>
							<Form method='post'>
								<button>Logout</button>
							</Form>
						</li>
					)}
				</div>
			</ul>
		</div>
	);
};

export default MainNavigation;

export async function loader(url) {
	const response = await fetch(`${url}auth/login`, {
		credentials: 'include',
	});
	switch (response.status) {
		case 401:
			const error = { message: 'Login first' };
			return error;
		case 422:
			return { message: 'Not Authenticated' };
		default:
			return response;
	}
}

export async function action(url) {
	const response = await fetch(`${url}auth/logout`, {
		method: 'POST',
		credentials: 'include',
	});
	if (!response.ok) {
		throw json(
			{ message: 'Something went wrong! (Failed to logout)' },
			{ status: 404 }
		);
	}
	return redirect('/');
}
