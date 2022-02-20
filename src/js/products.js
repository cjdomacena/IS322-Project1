const base_url = 'https://fakestoreapi.com'


let current_products;

// Fetch all products
const getAllProducts = async () =>
{
	try
	{
		const data = await fetch(`${ base_url }/products?limit=9`);
		const res = await data.json();
		return res;
	} catch (e)
	{
		console.log(e)
	}

}

// Fetch all categories
const getCategories = async () =>
{
	const data = await fetch(`${ base_url }/products/categories`);
	const res = await data.json();

	return res
}

const getCategoryItems = async (category) =>
{
	const data = await fetch(`${ base_url }/products/category/${ category }`);
	const res = data.json()

	return res;
}

const displayAllProducts = (data) =>
{

	let prod_list = document.getElementById('products-list')
	data.map((data) =>
	{
		const prod_item = document.createElement('div');
		prod_item.classList.add('product-item');

		// Will hold image of the product
		const prod_image = document.createElement('div');
		prod_image.classList.add('product-image');

		// create element of image
		const img = document.createElement('img');
		img.src = data.image

		// Appends img to product image container
		// <prod_image><image></prod_image>
		prod_image.appendChild(img);

		const prod_info = document.createElement('div');

		const prod_name = document.createElement('h4');
		prod_name.innerText = data.title;

		const prod_info_list = document.createElement('ul');
		for (i = 0; i < 3; i++)
		{
			const li = document.createElement('li');
			const p = document.createElement('p');
			switch (i)
			{
				case 0:
					p.innerText = data.description;
					p.classList.add('product-short-desc')
					break;
				case 1:
					p.innerText = data.category;
					p.classList.add('product-category')
					break;
				case 2:
					p.innerText = `$${ data.price }`
					p.classList.add('product-price')
					break;
				default:
					break;
			}
			li.appendChild(p)
			prod_info_list.appendChild(li)
		}

		prod_info.appendChild(prod_name);
		prod_info.appendChild(prod_info_list);

		prod_item.appendChild(prod_image);
		prod_item.appendChild(prod_info);

		prod_list.appendChild(prod_item);
	})
}

const displayAllCategories = (data) =>
{
	const select = document.getElementById('filter-category');
	data.map((item) =>
	{
		const option = document.createElement('option');
		option.value = item
		option.innerText = item
		select.appendChild(option)
	})
}


document.addEventListener("DOMContentLoaded", () =>
{
	getCategories().then((data) => displayAllCategories(data));
	getAllProducts().then((data) => displayAllProducts(data));
})

const cat_filter_btn = document.getElementById('filter-category');
cat_filter_btn.addEventListener('change', (e) =>
{
	let prod_list = document.getElementById('products-list')
	prod_list.innerHTML = ""
	if(e.currentTarget.value === 'default'){
		getAllProducts().then((data) => displayAllProducts(data));
	}else{
		getCategoryItems(e.currentTarget.value).then((data) => displayAllProducts(data));
	}
})

