import React from 'react';
import { Form, json, useRouteLoaderData } from 'react-router-dom';

import './LoginContent.css';

const LoginContent = () => {
	const { userInfo } = useRouteLoaderData('root');
	return (
		<div className='form-container'>
			<h2>{userInfo ? 'Welcome ' + userInfo.fullname : 'Sign in'}</h2>
			{!userInfo && (
				<Form className='form-login' method='post'>
					<label htmlFor='email'>Email</label>
					<input id='email' name='email' type='email' required />
					<label htmlFor='password'>Password</label>
					<input id='password' name='password' type='password' required />
					<button>Login</button>
				</Form>
			)}
			{userInfo && (
				<Form className='form-logout' action='/' method='post'>
					<button>Logout</button>
				</Form>
			)}
		</div>
	);
};

export default LoginContent;

export async function action(url, { request, params }) {
	const formData = Object.fromEntries(await request.formData());
	const user = {
		email: formData.email,
		password: formData.password,
	};
	const response = await fetch(`${url}auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
		credentials: 'include',
	});
	if (!response.ok) {
		throw json(
			{ message: 'Something went wrong! (Failed to login)' },
			{ status: 403 }
		);
	}
	return response;
}
