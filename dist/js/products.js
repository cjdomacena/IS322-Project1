const base_url="https://fakestoreapi.com";let current_products;const getAllProducts=async()=>{try{const e=await fetch(`${base_url}/products?limit=9`);return await e.json()}catch(e){console.log(e)}},getCategories=async()=>{const e=await fetch(`${base_url}/products/categories`);return await e.json()},getCategoryItems=async e=>(await fetch(`${base_url}/products/category/${e}`)).json(),displayAllProducts=e=>{let t=document.getElementById("products-list");t.innerHTML="",e.map((e=>{const c=document.createElement("div");c.classList.add("product-item");const n=document.createElement("div");n.classList.add("product-image");const r=document.createElement("img");r.src=e.image,n.appendChild(r);const l=document.createElement("div"),d=document.createElement("h4");d.innerText=e.title;const s=document.createElement("ul");for(i=0;i<3;i++){const t=document.createElement("li"),c=document.createElement("p");switch(i){case 0:c.innerText=e.description,c.classList.add("product-short-desc");break;case 1:c.innerText=e.category,c.classList.add("product-category");break;case 2:c.innerText=`$${e.price}`,c.classList.add("product-price")}t.appendChild(c),s.appendChild(t)}l.appendChild(d),l.appendChild(s),c.appendChild(n),c.appendChild(l),t.appendChild(c)}))},displayAllCategories=e=>{const t=document.getElementById("filter-category");e.map((e=>{const c=document.createElement("option");c.value=e,c.innerText=e,t.appendChild(c)}))};document.addEventListener("DOMContentLoaded",(()=>{getCategories().then((e=>displayAllCategories(e))),getAllProducts().then((e=>displayAllProducts(e)))}));const cat_filter_btn=document.getElementById("filter-category");cat_filter_btn.addEventListener("change",(e=>{document.getElementById("products-list").innerHTML="","default"===e.currentTarget.value?getAllProducts().then((e=>displayAllProducts(e))):getCategoryItems(e.currentTarget.value).then((e=>displayAllProducts(e)))}));const price_filter_btn=document.getElementById("filter-price");price_filter_btn.addEventListener("change",(e=>{document.getElementById("products-list").innerHTML="";let t=e.currentTarget.value;"price-asc"===t?getAllProducts().then((e=>displayAllProducts(e.sort(((e,t)=>e.price-t.price))))):"price-desc"===t?getAllProducts().then((e=>displayAllProducts(e.sort(((e,t)=>t.price-e.price))))):getAllProducts().then((e=>displayAllProducts(e)))}));const name_filter_btn=document.getElementById("filter-name");name_filter_btn.addEventListener("change",(e=>{switch(e.currentTarget.value){case"name-desc":getAllProducts().then((e=>displayAllProducts(e.sort(((e,t)=>{const c=e.title,n=t.title;return c<n?-1:c>n?1:void 0})))));break;case"name-asc":getAllProducts().then((e=>displayAllProducts(e.sort(((e,t)=>{const c=e.title,n=t.title;return c>n?-1:c<n?1:void 0})))));break;default:getAllProducts().then((e=>displayAllProducts(e)))}}));