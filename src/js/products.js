const base_url = 'https://fakestoreapi.com'
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

// Fetch items in specific category. Provided by api
const getCategoryItems = async (category) =>
{
	const data = await fetch(`${ base_url }/products/category/${ category }`);
	const res = data.json()

	return res;
}

// Render products
const displayAllProducts = (data) =>
{
	let prod_list = document.getElementById('products-list');
	prod_list.innerHTML = ""
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

// Display all categories
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

// Load data and put categories in select input
document.addEventListener("DOMContentLoaded", () =>
{
	getCategories().then((data) => displayAllCategories(data));
	getAllProducts().then((data) => displayAllProducts(data));
})

// Category Filter
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

// Price filter
const price_filter_btn = document.getElementById('filter-price');
price_filter_btn.addEventListener('change', (e) =>
{
	let prod_list = document.getElementById('products-list')
	prod_list.innerHTML = ""

	let filter_val = e.currentTarget.value

	if (filter_val === 'price-asc')
		getAllProducts().then((data) => displayAllProducts(data.sort((a, b) => a.price - b.price)))
	else if (filter_val === 'price-desc')
	{
		getAllProducts().then((data) => displayAllProducts(data.sort((a, b) => b.price - a.price)))
	} else
	{
		getAllProducts().then((data) => displayAllProducts(data))
	}
})

// Name filter
const name_filter_btn = document.getElementById('filter-name');
name_filter_btn.addEventListener('change', (e) =>
{

	switch (e.currentTarget.value)
	{
		case 'name-desc':
			getAllProducts().then((data) => displayAllProducts(data.sort((a, b) =>
			{
				const prod_A = a.title;
				const prod_B = b.title;

				if (prod_A < prod_B) return -1;
				if (prod_A > prod_B) return 1;
			})))
			break;
		case 'name-asc':
			getAllProducts().then((data) => displayAllProducts(data.sort((a, b) =>
			{
				const prod_A = a.title;
				const prod_B = b.title;

				if (prod_A > prod_B) return -1;
				if (prod_A < prod_B) return 1;
			})))
			break;
		default:
			getAllProducts().then((data) => displayAllProducts(data));
			break;
	}

})

