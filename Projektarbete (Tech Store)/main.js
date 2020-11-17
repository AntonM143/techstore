window.addEventListener("load", initSite)
var listOfProducts;
let body = document.getElementById("indexBody")
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
	if (body){
		loadProducts();
		loginLogoutButton()
		cartCounter()
	}
}
//Create Title Element and get content
export function getTitleElement(product, myClass) {
	let productTitle = document.createElement('h2');
	productTitle.className = myClass;
	productTitle.innerText = product.title;
	return productTitle;
}
//Create Price element and get content
export function getPriceElement(product, myClass) {
	let productPrice = document.createElement('p');
	productPrice.className = myClass;
	productPrice.innerText = product.price + ':-';
	return productPrice;
}
//Create Description element and get content
export function getDescriptionElement(product, myClass) {
	let productDescr = document.createElement('div');
	productDescr.className = myClass;
	productDescr.innerText = product.description;
	return productDescr;
}
// Create IMG element append to parent container div and get source
export function getImgElement(product, myClass) {
	let productImgContainer = document.createElement('div');
	productImgContainer.className = 'productImgContainer';
	let productImg = document.createElement('img');
	productImg.className = myClass;
	productImg.src = product.image;
	productImgContainer.appendChild(productImg);
	return productImgContainer;
}
//Create productCard and append it to productContainer
export function createProductCard(myClass, appendTo) {
	let productCard = document.createElement('div');
	productCard.className = myClass;
	appendTo.appendChild(productCard);
	return productCard;
}
// Create a button
function cartButton(product) {
    let	productButton = document.createElement("button")
    productButton.className = "productButton"
    productButton.innerText = "lägg till i kundvagn"
	//För att få rätt produkt i addToCart
/* 	let productList = listOfProducts[i]; 
 */	
	let iconButton = document.createElement("div")
    iconButton.className = "fas fa-cart-arrow-down"
	productButton.addEventListener("click", () => {
		addProductToCart(product)
	 })

    productButton.appendChild(iconButton)   


	return productButton
}
//Dynamisk login och logut knapp
export function loginLogoutButton() {
	let loginLogoutBtn = document.getElementById("loginLogoutBtn")
	let loginIcon = document.createElement("div")
	loginIcon.className = "fas fa-sign-in-alt loginIcon"
	
	if(sessionStorage.customer == null){
		loginLogoutBtn.innerText = "Logga in"
		loginLogoutBtn.appendChild(loginIcon)
		loginLogoutBtn.addEventListener("click", () => {
			window.location = "login.html"	
			
		})
	}	
	else{
		loginLogoutBtn.innerText ="Logga ut"
		loginLogoutBtn.appendChild(loginIcon)
		loginLogoutBtn.addEventListener("click", () => {
			sessionStorage.clear()
			let counter = document.getElementById("counterCart")
			counter.innerText = ""
			loginLogoutButton()
			cartCounter()
		})
	}
}


function addProductToCart(product) {


	
	let localArray = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	localArray = JSON.parse(localArray)
	if(activeUser !== null){
		for(let i = 0; i < localArray.length; i++){ //Loopar igenom alla sparade kunder
			if(activeUser == localArray[i].customer){ //Letar efter en match mellan inloggad kund och sparad kund
				let productToSave = localArray[i]
				productToSave.cart.push(product)	
				localStorage.setItem("users", JSON.stringify(localArray))
				cartCounter()
	
			}	
		}
	}
	else{
		let noUserCart = localStorage.getItem("noUserCart")
		//Om localstorage är tom, skapa en array
		if(noUserCart == null) {
			noUserCart = []
		}
		//Om localStorage finns, hämta och omvandla
		else {
			noUserCart = JSON.parse(noUserCart)
		} 
		noUserCart.push(product)	
		localStorage.setItem("noUserCart", JSON.stringify(noUserCart))
		cartCounter()

	}

}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
	for (let i = 0; i < listOfProducts.length; i++) {
		let productCard = createProductCard("productCard", productContainer);
		let productButton = cartButton(listOfProducts[i]);

		productCard.appendChild(getTitleElement(listOfProducts[i], "productTitle"));
		productCard.appendChild(getDescriptionElement(listOfProducts[i], "productDescr"));
		productCard.appendChild(getImgElement(listOfProducts[i], "productImg"));
		productCard.appendChild(getPriceElement(listOfProducts[i], "productPrice"));
		productCard.appendChild(productButton);
		
	}
}


export function cartCounter(){

	let localArray = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	localArray = JSON.parse(localArray)
	
		if(activeUser !== null){

			for(let i = 0; i < localArray.length; i++){ //Loopar igenom alla sparade kunder

				if(activeUser == localArray[i].customer){ //Letar efter en match mellan inloggad kund och sparad kund
					
					let counter = document.getElementById("counterCart")
					let currentCounter = localArray[i].cart
					if(currentCounter.length){
						for ( let i = 0; i < currentCounter.length ; i ++){
							counter.innerText = currentCounter.length 
						}
					}else{
						
						counter.innerText = ""
					}
				}	
			}

		}else {
			let noUserCart = localStorage.getItem("noUserCart")
			noUserCart = JSON.parse(noUserCart)
				if(noUserCart !== null){	
					for(let i = 0; i < noUserCart.length; i++){
						let counter = document.getElementById("counterCart")
						counter.innerText = noUserCart.length 
					}	
				}
		}
}

