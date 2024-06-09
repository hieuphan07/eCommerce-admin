import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../../MainNavigation/MainNavigation';

import './Root.css';

function RootLayout() {
	return (
		<div>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default RootLayout;
