const base_url="https://fakestoreapi.com";let current_products;const getAllProducts=async()=>{try{const t=await fetch(`${base_url}/products?limit=9`);return await t.json()}catch(t){console.log(t)}},getCategories=async()=>{const t=await fetch(`${base_url}/products/categories`);return await t.json()},displayAllProducts=t=>{},displayAllCategories=t=>{const e=document.getElementById("filter-category");t.map((t=>{const a=document.createElement("option");a.value=t,a.innerText=t,e.appendChild(a)}))};getCategories().then((t=>displayAllCategories(t)));