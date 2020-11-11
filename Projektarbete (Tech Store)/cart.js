import {loginLogoutButton, cartCounter, getTitleElement, getPriceElement, getDescriptionElement, getImgElement, createProductCard} from "./main.js"
let body = document.getElementById("cartBody")
let activeUser = sessionStorage.getItem("customer")
window.addEventListener("load", initSite)


function initSite() {
	if (body){
		console.log("cartBody detected")
		allPrices()
		loginLogoutButton()
		cartCounter()
		allPrices()
		confirmbtn()
		printCart()
	

	}
}
	
export function parseUserList() {
	let userList = localStorage.getItem("users")
	userList = JSON.parse(userList)	
	return userList
}
export function myCart () {
	let userList = parseUserList()
	for (let i = 0; i < userList.length; i++){
		if(activeUser == userList[i].customer) {
			let cart = userList[i].cart
			return cart
		}
	}
}
export function parseNoUserCart () {
	let noUserCart = localStorage.getItem("noUserCart")
	noUserCart = JSON.parse(noUserCart)
	return noUserCart
}

//Funktion som skriver ut sparad kundvagn till kundvagns sidan
function printCart() {
	let userList = parseUserList()
	let noUserCart = parseNoUserCart()
	let cartDiv = document.getElementById("cartProducts")
	
	if(userList !== null){
		for (let i = 0; i < userList.length; i++){
			if(activeUser == userList[i].customer) {
				let cart = myCart()
					if(cart !== null){
						for(let i = 0; i < cart.length; i++){
							let productCard = createProductCard("cartProdCard", cartDiv)

							productCard.appendChild(getImgElement(cart[i], "cartImg"))
							productCard.appendChild(getTitleElement(cart[i]))
							productCard.appendChild(getPriceElement(cart[i]))
							RemoveProdBtn(cart[i], productCard)
							
						}
					}
			}
		}	
	}
	if(activeUser == null && noUserCart){
		for (let i = 0; i < noUserCart.length; i++){
			let productCard = createProductCard("cartProdCard", cartDiv)
			productCard.appendChild(getImgElement(noUserCart[i], "cartImg"))
			productCard.appendChild(getTitleElement(noUserCart[i]))
			productCard.appendChild(getPriceElement(noUserCart[i]))
		}
	}
}


function allPrices() {
	let userList = parseUserList()
	let activeUser = sessionStorage.getItem("customer")
	let noUserCart = parseNoUserCart()
	let totalt = 0
 	
	
	if(activeUser !== null){
		for(let i = 0; i < userList.length; i++){	
			if(userList[i].customer == activeUser){
				let cart = userList[i].cart
				for(i = 0; i < cart.length; i++){
					let loginPrice = cart[i].price
					let totalSumCon = document.getElementById("totPrice")
					let totalSum = document.createElement("p")
					totalSumCon.innerHTML = ""
					totalt += loginPrice
					totalSum.className = "totalSum";
					totalSum.innerText += "Totalt pris: " + totalt + " kr";
					totalSumCon.appendChild(totalSum)
				}
				return
			}
		}	
	}
	else{
		if(noUserCart !== null){
			for (let i = 0; i < noUserCart.length; i++){
				let noUserPrice = noUserCart[i].price
				let totalSumCon = document.getElementById("totPrice")
				let totalSum = document.createElement("p")
				totalSumCon.innerHTML = ""
				totalt += noUserPrice
				totalSum.className = "totalSum";
				totalSum.innerText += "Totalt pris: " + totalt +" kr"
				totalSumCon.appendChild(totalSum)
			}
		}
	}
}
 
 //funktion för knapp som bekräftar köp
function confirmbtn (){
	//skapar knapp samt skriver text i den
	let userList = parseUserList()
	let activeUser = sessionStorage.getItem("customer")
	let noUserCart = parseNoUserCart()
	if(noUserCart || userList) {
		let confirm = document.getElementById("confirmBtn");
		let btn = document.createElement("button");
		btn.className = "btnConfirm fas fa-check"
		btn.innerText = "Slutför ditt köp!"
		confirm.appendChild(btn);
		//skapar en onclick för knappen
		btn.addEventListener("click", function()  {
			if(activeUser !== null){
				for(let i = 0; i < userList.length; i++){
					if(userList[i].customer == activeUser){
						let user = userList[i];
						let userCart = user.cart;
						saveOld()
						userCart.splice(0, userCart.length)
						let totalSumCon = document.getElementById("totPrice")
						totalSumCon.innerText = ""
						alert("Köp bekräftat")
						location.href = "index.html"
						localStorage.setItem("users", JSON.stringify(userList))
					}
				}		
			}
			else if (noUserCart !== null) {
				alert("Logga in för att slutföra ditt köp")		
			}
			allPrices()
		});
	}
}

//Skapar en ny user som kopierar current user + cart och sparar i localstorage
function saveOld(){
	let userList = parseUserList()
	localStorage.setItem("oldOrders", userList)
	localStorage.getItem("oldOrders")

}

function RemoveProdBtn(product, appendTo) {

	let removeProdBtn = document.createElement("button")
	removeProdBtn.className = "removeProdBtn"
	removeProdBtn.innerText = "Remove product"
	appendTo.appendChild(removeProdBtn)

	removeProdBtn.addEventListener("click", () => {
		removeProduct(product)
	})
	

} 
/* 
function removeProduct(product) {
	
	
	let userList = parseUserList()
	let cart = myCart()


	if(activeUser){
		for (let i = 0; i < userList.length; i++){
			if(activeUser == userList[i].customer && cart.length){
				for(let i = 0; i < cart.length; i++) {
					if(cart[i].title === product.title) {
						
						
						console.log(cart)
						cart.splice(product, 1) 
						console.log(cart)

						localStorage.setItem("users", JSON.stringify(userList))

						return
					}
				}
				
			

				if(cart.length) {
					for(let i = 0; i < cart.length; i++){

						if(cart[i].title === product.title) {
							console.log(cart)
							cart.splice(i, 1)
							console.log(cart)
							localStorage.setItem("users", JSON.stringify(userList))
							
							printCart()
							return

						}
					}
				}
			}
		}	
	}
} */

//Misstänker att det bråkar då jag deklarerar userList = JSON.parse(userList) i flera funktioner även om det för mig logiskt inte borde..


//Global variable synkar inte hämtars bara en gång