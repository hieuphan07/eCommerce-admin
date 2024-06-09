import React from 'react';
import {
	Form,
	useLoaderData,
	useParams,
	json,
	redirect,
	useNavigate,
} from 'react-router-dom';

import './ProductManagement.css';

const ProductManagement = () => {
	const product = useLoaderData();
	const { productId } = useParams();
	const navigate = useNavigate();
	return (
		<div className='product-form__container'>
			<h2>{productId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h2>
			<Form
				className='product-form'
				method={productId ? 'patch' : 'post'}
				encType='multipart/form-data'
			>
				<label htmlFor='name'>Product Name</label>
				<input
					id='name'
					name='name'
					type='string'
					placeholder='Enter Product Name'
					defaultValue={product?.name ?? ''}
					required
				/>
				<label htmlFor='category'>Category</label>
				<input
					id='category'
					name='category'
					type='string'
					placeholder='Enter Category'
					defaultValue={product?.category ?? ''}
					required
				/>
				<label htmlFor='price'>Price</label>
				<input
					id='price'
					name='price'
					type='number'
					placeholder='Enter Price'
					defaultValue={product?.price ?? ''}
					required
				/>
				<label htmlFor='short_desc'>Short Description</label>
				<textarea
					rows={4}
					id='short_desc'
					name='short_desc'
					type='string'
					placeholder='Enter Short Description'
					defaultValue={product?.['short_desc'] ?? ''}
					required
				/>
				<label htmlFor='long_desc'>Long Description</label>
				<textarea
					rows={20}
					id='long_desc'
					name='long_desc'
					type='string'
					placeholder='Enter Long Description'
					defaultValue={
						product?.['long_desc'] ?? 'Tính năng nổi bật \n\n• \n• \n• '
					}
					required
				/>
				<label htmlFor='photos'>Upload image (5 images)</label>
				{!product?.photos && (
					<input id='photos' name='images' type='file' multiple />
				)}
				{product?.photos?.length > 0 && (
					<input
						id='photos'
						name='photos'
						defaultValue={product?.photos}
						required
					/>
				)}
				<div className='btn-actions'>
					<button type='submit' className='btn-actions__submit'>
						Submit
					</button>
					<button
						type='button'
						className='btn-actions__cancel'
						onClick={() => navigate('/products')}
					>
						Cancel
					</button>
				</div>
			</Form>
		</div>
	);
};

export default ProductManagement;

export async function action(url, { request, params }) {
	const { productId } = params;
	const { method } = request;

	const ADD_PRODUCT_URL = `${url}products/create-product`;
	const EDIT_PRODUCT_URL = `${url}products/${productId}/edit`;

	const formData = await request.formData();
	const imageFiles = formData.getAll('images');
	const photos = formData.get('photos');

	const urlImages = imageFiles.map((curr) => curr.name);
	const urlPhotos = photos?.split(',');

	const product = {
		name: formData.get('name'),
		category: formData.get('category'),
		price: Number(formData.get('price')),
		short_desc: formData.get('short_desc'),
		long_desc: formData.get('long_desc'),
		photos: method === 'POST' ? urlImages : urlPhotos,
	};

	const response = await fetch(
		method === 'POST' ? ADD_PRODUCT_URL : EDIT_PRODUCT_URL,
		{
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
			credentials: 'include',
		}
	);
	if (!response.ok) {
		throw json({ message: 'Failed to add/update product' }, { status: 404 });
	}

	return redirect('/products');
}

export async function loader(url, { request, params }) {
	const { productId } = params;
	const response = await fetch(`${url}products/${productId}`);
	if (!response.ok) {
		throw json({ message: 'Not found!' }, { status: 404 });
	}
	return response;
}
