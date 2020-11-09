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
	loginLogoutButton()
	cartCounter()
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
	//För att få rätt produkt i addToCart
	let productList = listOfProducts[i]; 
	productButton.data = productList
	iconButton = document.createElement("div")
    iconButton.className = "fas fa-cart-arrow-down"
    productButton.appendChild(iconButton)   

	return productButton
}
//Dynamisk login och logut knapp
function loginLogoutButton() {
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
		})
	}
}


function addProductToCart(myButton) {

	myButton.addEventListener("click", () => {
		let localArray = localStorage.getItem("users")
        let activeUser = sessionStorage.getItem("customer")
		localArray = JSON.parse(localArray)
		if(activeUser !== null){
			for(i = 0; i < localArray.length; i++){ //Loopar igenom alla sparade kunder
				if(activeUser == localArray[i].customer){ //Letar efter en match mellan inloggad kund och sparad kund
					let productToSave = localArray[i]
					productToSave.cart.push(myButton.data)	
					localStorage.setItem("users", JSON.stringify(localArray))
					console.log(myButton.data)
					cartCounter()
				}	
			}
		}
		else{
			
			console.log("inte inloggad")

			let noUserCart = localStorage.getItem("noUserCart")
			
			//Om localstorage är tom, skapa en array
			if(noUserCart == null) {
				noUserCart = []
				
			}
			//Om localStorage finns, hämta och omvandla
			else {
				noUserCart = JSON.parse(noUserCart)
				
			} 
			noUserCart.push(myButton.data)	
			localStorage.setItem("noUserCart", JSON.stringify(noUserCart))
			console.log(noUserCart)
			cartCounter()
			
		}
		
	})
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
		addProductToCart(productButton)
	}
}


function cartCounter(){

	let localArray = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	localArray = JSON.parse(localArray)
	
		if(activeUser !== null){

			for(let i = 0; i < localArray.length; i++){ //Loopar igenom alla sparade kunder

				if(activeUser == localArray[i].customer){ //Letar efter en match mellan inloggad kund och sparad kund
					
					currentCounter = localArray[i].cart
				
					for(let i = 0; i < currentCounter.length ; i++){
						let counter = document.getElementById("counterCart")
						counter.innerText = currentCounter.length 
						console.log(currentCounter.length)
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
						console.log(noUserCart.length)
					}	
				}
		}
}

