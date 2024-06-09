import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { json } from 'react-router-dom';

const Home = () => {
	return <Dashboard />;
};

export default Home;

export async function loader(url) {
	const response = await fetch(`${url}orders`, {
		credentials: 'include',
	});
	if (!response.ok) {
		throw json(
			{ message: 'Failed to fetch orders or not authenticated by admin' },
			{ status: 401 }
		);
	}
	return response;
}
