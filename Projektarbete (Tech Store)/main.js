var listOfProducts;
let productContainer = document.getElementById('productContainer');

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
	fetch('./products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (products) {
			listOfProducts = products;
			addProductsToWebpage();
		});
}

function initSite() {
	loadProducts();
	// This would also be a good place to initialize other parts of the UI
}

//Create Title Element and get content
function getTitleElement(product) {
	productTitle = document.createElement('h2');
	productTitle.className = 'productTitle';
	productTitle.innerText = product.title;
	return productTitle;
}

//Create Price element and get content
function getPriceElement(product) {
	productPrice = document.createElement('p');
	productPrice.className = 'productPrice';
	productPrice.innerText = product.price + ':-';
	return productPrice;
}

//Create Description element and get content
function getDescriptionElement(product) {
	productDescr = document.createElement('div');
	productDescr.className = 'productDescr';
	productDescr.innerText = product.description;
	return productDescr;
}

// Create IMG element append to parent container div and get source
function getImgElement(product) {
	productImgContainer = document.createElement('div');
	productImgContainer.className = 'productImgContainer';
	productImg = document.createElement('img');
	productImg.className = 'productImg';
	productImg.src = listOfProducts[i].image;
	productImgContainer.appendChild(productImg);
	return productImgContainer;
}

//Create productCard and append it to productContainer
function createProductCard() {
	productCard = document.createElement('div');
	productCard.className = 'productCard';
	productContainer.appendChild(productCard);
	return productCard;
}

// Create a button
function cartButton() {
    productButton = document.createElement("button")
    productButton.className = "productButton"
    productButton.innerText = "lägg till i kundvagn"
    iconButton = document.createElement("div")
    iconButton.className = "fas fa-cart-arrow-down"
    productButton.appendChild(iconButton)
    
    
    
    
    
    

    
    
    return productButton
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
	for (i = 0; i < listOfProducts.length; i++) {
		createProductCard();
		cartButton();

		productCard.appendChild(getTitleElement(listOfProducts[i]));
		productCard.appendChild(getDescriptionElement(listOfProducts[i]));
		productCard.appendChild(getImgElement(listOfProducts[i]));
		productCard.appendChild(getPriceElement(listOfProducts[i]));
		productCard.appendChild(productButton);
	}
}

/* function getCartButton(product) {
    let productButton = document.createElement("button")
    productContainer.appendChild(productButton) // for developing, change to correct container once done
    productButton.className = "productButton"
    productButton.innerText = "lägg till i kundvagn"
    productButton.data = JSON.stringify(product)
    productButton.addEventListener("click", function(bla){

        console.log(bla.target.data)
    })
}

  getCartButton({test:1})  */

//calculate sum of array
function getArraySum(a){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
}

var payChecks = [123,155,134, 205, 105]; 
var weeklyPay= getArraySum(payChecks);
console.log(weeklyPay)
//

let hej = localStorage.getItem("users")
	console.log(hej)