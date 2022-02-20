const base_url = 'https://fakestoreapi.com'


let current_products;

// Fetch all products
const getAllProducts = async () => {
	try{
		const data = await fetch(`${ base_url }/products?limit=9`);
		const res = await data.json();
		return res;
	}catch(e){
		console.log(e)
	}

}

// Fetch all categories
const getCategories = async () => {
	const data = await fetch(`${base_url}/products/categories`);
	const res = await data.json();

	return res
}

const displayAllProducts = (data) => {

}

const displayAllCategories = (data) => {
	const select = document.getElementById('filter-category');
	data.map((item) => {
		const option = document.createElement('option');
		option.value = item
		option.innerText = item
		select.appendChild(option)
	})
}

// Put categories of item into select tag
getCategories().then(data => displayAllCategories(data))



