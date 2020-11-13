import {loginLogoutButton, cartCounter, getTitleElement, getPriceElement, getDescriptionElement, getImgElement, createProductCard,} from "./main.js"
import {  addToArray, saveArrayToLocal } from "./login.js"
let body = document.getElementById("cartBody")
let activeUser = sessionStorage.getItem("customer")
window.addEventListener("load", initSite)


function initSite() {
	if (body){
		console.log("cartBody detected")
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
				let cart = userList[i].cart
					if(cart !== null){
						cartDiv.innerHTML = ""
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
	if(parseNoUserCart() || parseUserList()) {
		let confirm = document.getElementById("confirmBtn");
		let btn = document.createElement("button");
		let iconBtn = document.createElement("div")
		iconBtn.className = "fas fa-check"
		btn.className = "btnConfirm"
		btn.innerText = "Slutför köp"
		confirm.appendChild(btn);
		btn.appendChild(iconBtn);
		//skapar en onclick för knappen
		btn.addEventListener("click", function()  {
			if(activeUser){
				let userList = parseUserList()
				for (let i = 0; i < userList.length; i++){
					if(activeUser == userList[i].customer){
						
						userList[i] = emptyCart() 
						localStorage.setItem("users", JSON.stringify(userList))
						let totalSumCon = document.getElementById("totPrice")
						totalSumCon.innerText = ""
						alert("Köp bekräftat")
		

						location.href = "index.html" 
						return
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


function RemoveProdBtn(product, appendTo) {

	let removeProdBtn = document.createElement("button")
	removeProdBtn.className = "removeProdBtn"
	removeProdBtn.innerText = "Remove product"
	appendTo.appendChild(removeProdBtn)

	removeProdBtn.addEventListener("click", () => {
		removeProduct(product)
		printCart()
		allPrices()
		cartCounter()
	})
	

} 
 
function removeProduct(product) {
	
	
	let userList = parseUserList()
	
	if(activeUser){
		for (let i = 0; i < userList.length; i++){
			let cart = userList[i].cart
			if(activeUser == userList[i].customer && cart.length){
				for(let i = 0; i < cart.length; i++) {
					if(cart[i].title === product.title) {
						
						
						console.log(cart)
						cart.splice(i, 1) 
						console.log(cart)

						let newUserList = userList
						localStorage.setItem("users", JSON.stringify(newUserList))

						return
					}
				}
			}
		}	
	}
} 



function getUser() {
	let userList = parseUserList()
	if(activeUser) {
		for (let i = 0; i < userList.length; i++) {
			if(userList[i].customer == activeUser){
				return userList[i]
			}

		}
	}
}


function getCart() {
	if(activeUser){
		getUser()
		return getUser().cart
		
	}
}



function saveOldOrders(order) {//Kanske kan få fler användnigs områden om jag gör en if(cart) / else
    if(activeUser){
	let user = getUser()
	
	console.log("cart: ", order.cart)
	console.log("oldOlders: ", user.oldOrders)
	
	order.cart.splice(0, 0, dateToDay())
	order.oldOrders.push(order.cart)
	
	console.log("cart after push", order.cart) 
	console.log("end of PTOO ", order)
	}
}

function emptyCart() {//samma som ovan. möjligtvis en if(cart) return userCart else något annat
	if(activeUser){
		let user = getUser()
		let cart = getCart()
		saveOldOrders(user)
		
		console.log("E.C = ", user.cart)
		
		cart.splice(cart)
		user.cart = cart
		
		console.log("E.C = ", cart)
		console.log("finalLogg = ", user)
		
		return user
	}

}

function dateToDay() {
	let today = new Date().toISOString().slice(0, 10)

	return today
}