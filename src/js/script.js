// Landing Page
function carousel(img_path)
{
	const carousel_container = document.getElementById('carousel-container')
	carousel_container.style.backgroundImage = `url("./${ img_path }")`
}
// IIFE
(function carousel_change()
{
	const img_paths =
		['../src/images/product-1.png',
			'../src/images/product-2.png',
			'../src/images/product-3.png'
		]

	//counter
	let i = 1

	// Default bg img
	document.getElementById('carousel-container').style.backgroundImage = `url("${img_paths[0]}")`

	setInterval(() =>
	{
		carousel(img_paths[i])
		// if i less than 2, increment i, if goes greater than 2 reset back to zero
		i = i < 2 ? i + 1 : 0
	}, 3000)

}
)()

