import {loginLogoutButton, cartCounter, getTitleElement, getPriceElement, getDescriptionElement, getImgElement, createProductCard, myPageBtn, removeElementById} from "./main.js"
import {  addToArray, saveArrayToLocal } from "./login.js"
let body = document.getElementById("cartBody")
let activeUser = sessionStorage.getItem("customer")
window.addEventListener("load", initSite)


function initSite() {
	if (body){
		loginLogoutButton()
		cartCounter()
		allPrices()
		confirmbtn()
		printCart()
		myPageBtn()
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
		cartDiv.innerHTML = ""
		for (let i = 0; i < noUserCart.length; i++){
			let productCard = createProductCard("cartProdCard", cartDiv)

			productCard.appendChild(getImgElement(noUserCart[i], "cartImg"))
			productCard.appendChild(getTitleElement(noUserCart[i]))
			productCard.appendChild(getPriceElement(noUserCart[i]))
			RemoveProdBtn(noUserCart[i], productCard)							

		}
	}
}


export function allPrices() {
	let userList = parseUserList()
	let activeUser = sessionStorage.getItem("customer")
	let noUserCart = parseNoUserCart()
	let totalt = 0
 	
	
	if(activeUser !== null){
		for(let i = 0; i < userList.length; i++){	
			if(userList[i].customer == activeUser){
				let cart = userList[i].cart
				if( cart.length > 0){
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
				} else {
					let totalSumCon = document.getElementById("totPrice")
					totalSumCon.innerHTML = ""
				}
				return
			}
			
		}	
	}
	else{
		if(noUserCart !== null){
			if( noUserCart.length > 0){
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
			else {
				let totalSumCon = document.getElementById("totPrice")
				totalSumCon.innerHTML = ""
			}
		}

	}
}

function createConfirmBtn(){
	let container = document.getElementById("productContainer");
	let iconBtn = document.createElement("div")
	let btn = document.createElement("button");
	btn.className = "btnConfirm"
	btn.innerText = "Slutför köp"
	iconBtn.className = "fas fa-check"
	btn.id="btnConfirm"
	container.appendChild(btn);
	btn.appendChild(iconBtn);
	btn.addEventListener("click", () => {
		confirmOrder()
	})
} 

 //funktion för knapp som bekräftar köp
function confirmbtn (){
	let noUserCart = parseNoUserCart()	
	let userCart = getCart()										
	if(activeUser && userCart.length) {   
		createConfirmBtn()
	}
	else if(noUserCart && noUserCart.length) {
		createConfirmBtn()
	}
}

function confirmOrder() {	
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
		else if (activeUser == null) {
			alert("Logga in för att slutföra ditt köp")		
			window.location = "./login.html"
		}
		allPrices()
}

//Skapar en ny user som kopierar current user + cart och sparar i localstorage
function RemoveProdBtn(product, appendTo) {
	let userCart = getCart()
	let noUserCart = parseNoUserCart()
	let removeProdBtn = document.createElement("button")
	let trashCanIcon = document.createElement("div")
	trashCanIcon.className = "far fa-trash-alt"
	removeProdBtn.className = "removeProdBtn"
	removeProdBtn.innerText = "Ta bort"
	removeProdBtn.appendChild(trashCanIcon)
	appendTo.appendChild(removeProdBtn)
	

	removeProdBtn.addEventListener("click", () => {
	
	if(activeUser){	
		if(getCart().length > 1){
			removeProduct(product)
			cartCounter()
			allPrices()
			printCart()		
		}
		else{
			removeProduct(product)
			cartCounter()
			allPrices()
			printCart()		
			removeElementById("btnConfirm")
		}
	
	}
	else if(noUserCart){
		console.log("no user cart")
		if(noUserCart.length > 1){
			removeProduct(product)
			cartCounter()
			allPrices()
			printCart()		
			console.log("if")
		}
		else {
			removeProduct(product)
			cartCounter()
			allPrices()
			printCart()		
			removeElementById("btnConfirm")
			console.log("else")
		}

	}
})
	

} 
 
function removeProduct(product) {
	
	let userList = parseUserList()
	let noUserCart = parseNoUserCart()
	
	if(activeUser){
		for (let i = 0; i < userList.length; i++){
			let cart = userList[i].cart
			if(activeUser == userList[i].customer && cart.length){
				for(let i = 0; i < cart.length; i++) {
					if(cart[i].title === product.title) {
						cart.splice(i, 1) 
						let newUserList = userList
						localStorage.setItem("users", JSON.stringify(newUserList))
						return
					}
				}
			}
		}	
	}
	if(!activeUser && noUserCart){
		for(let i = 0; i < noUserCart.length; i++){
			if(noUserCart[i].title === product.title){
				noUserCart.splice(i, 1)	
				localStorage.setItem("noUserCart", JSON.stringify(noUserCart))
				return
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
		let userCart = getUser().cart
		console.log(userCart)
		return userCart
	}
}



function saveOldOrders(order) {//Kanske kan få fler användnigs områden om jag gör en if(cart) / else
    if(activeUser){
	let user = getUser()
	order.cart.splice(0, 0, dateToDay())
	order.oldOrders.push(order.cart)
	}
}

function emptyCart() {//samma som ovan. möjligtvis en if(cart) return userCart else något annat
	if(activeUser){
		let user = getUser()
		let cart = getCart()
		saveOldOrders(user)
		cart.splice(cart)
		user.cart = cart
		return user
	}

}

function dateToDay() {
	let today = new Date().toISOString().slice(0, 10)

	return today
}
