import React from 'react';
import { useRouteLoaderData, useLoaderData } from 'react-router-dom';

import Widget from '../Widget/Widget';
import './Dashboard.css';

const Dashboard = () => {
	const data = useRouteLoaderData('root');
	const orders = useLoaderData();

	if (!data.userInfo.isAdmin) {
		return (
			<h2 style={{ textAlign: 'center', marginTop: '20px' }}>
				You are not admin to access to the dashboard. Please sign in with admin
				account.
			</h2>
		);
	}

	return (
		<div className='dashboard-container'>
			<h3>Dash board</h3>
			<div className='widgets-container'>
				<Widget
					number={2}
					infoOfNumber='Clients'
					icon='fa-solid fa-user-plus'
				/>
				<Widget
					number='44.779.000'
					sup='VND'
					infoOfNumber='Earning of Months'
					icon='fa-solid fa-dollar-sign'
				/>
				<Widget
					number={2}
					infoOfNumber='New orders'
					icon='fa-solid fa-file-medical'
				/>
			</div>
			<div className='history-container'>
				<h4 className='history-title'>History</h4>
				<table className='history-table'>
					<thead>
						<tr>
							<th>ID User</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Total</th>
							<th>Delivery</th>
							<th>Status</th>
							<th>Detail</th>
						</tr>
					</thead>
					{orders && orders?.length > 0 && (
						<tbody>
							{orders.map((order) => {
								return (
									<tr key={order._id}>
										<td>{order.userId}</td>
										<td>{order.contact?.fullname}</td>
										<td>{order.contact?.phoneNumber}</td>
										<td>{order.contact?.address}</td>
										<td>{order.total}</td>
										<td>Chưa vận chuyển</td>
										<td>Chưa thanh toán</td>
										<td>
											<button type='button'>View</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default Dashboard;
