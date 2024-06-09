import React from 'react';
import {
	useRouteLoaderData,
	useNavigate,
	json,
	Form,
	redirect,
} from 'react-router-dom';

import './List.css';

const List = () => {
	const products = useRouteLoaderData('products');
	const navigate = useNavigate();

	return (
		<div className='products-container'>
			<h1 className='product-title'>Products</h1>
			<input className='product-search' placeholder='Enter Search!' />
			{products && (
				<table className='products-table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Image</th>
							<th>Category</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, ind) => {
							return (
								<tr key={product._id}>
									<td className='productId'>{product._id}</td>
									<td className='productName'>{product.name}</td>
									<td className='productPrice'>
										{Number(product.price).toLocaleString('en')}
									</td>
									<td className='productImage'>
										<img src={product.photos?.[0]} alt={product.name} />
									</td>
									<td className='productCategory'>{product.category}</td>
									<td className='productActions'>
										<button
											className='btn--update'
											button='button'
											onClick={() => navigate(`/products/edit/${product._id}`)}
										>
											Update
										</button>
										<Form method='delete' action={'/delete/' + product._id}>
											<button className='btn--delete' button='submit'>
												Delete
											</button>
										</Form>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default List;

// products loader
export async function loader(url) {
	const response = await fetch(`${url}products`);
	if (!response.ok) return console.log('Something went wrong');
	return response;
}

// action delete product
export async function action(url, { request, params }) {
	try {
		const { productId } = params;
		const isConfirm = window.confirm('Are you sure?');
		if (isConfirm) {
			const response = await fetch(`${url}products/${productId}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			// check response status
			console.log();

			if (!response.ok) {
				throw json(
					{ message: 'Something went wrong! Cannot delete this item' },
					{ status: 500 }
				);
			}
			return redirect('/products');
		}
		return redirect('/products');
	} catch (err) {
		console.log(err);
	}
}
