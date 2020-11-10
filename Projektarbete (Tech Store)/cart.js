import {loginLogoutButton, cartCounter, getTitleElement, getPriceElement, getDescriptionElement, getImgElement, createProductCard} from "./main.js"
let body = document.getElementById("cartBody")
let userList = localStorage.getItem("users")
let activeUser = sessionStorage.getItem("customer")
let noUserCart = localStorage.getItem("noUserCart")
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
	
		removeProduct()

	}
}
//Funktion som skriver ut sparad kundvagn till kundvagns sidan
function printCart() {
	userList = JSON.parse(userList)
	noUserCart = JSON.parse(noUserCart)
	let cartDiv = document.getElementById("cartProducts")
	
	if(userList !== null){
		for (let i = 0; i < userList.length; i++){
			if(activeUser == userList[i].customer) {
				console.log ("****match found**** ", userList[i].customer, activeUser)
				let cart = userList[i].cart
					if(cart !== null){
						for(let i = 0; i < cart.length; i++){
							console.log("loopar carten")
							let productCard = createProductCard("cartProdCard", cartDiv)

							productCard.appendChild(getImgElement(cart[i], "cartImg"))
							productCard.appendChild(getTitleElement(cart[i]))
							productCard.appendChild(getPriceElement(cart[i]))
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
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	let noUserCart = localStorage.getItem("noUserCart")
	let totalt = 0
 	userList = JSON.parse(userList)
 	noUserCart = JSON.parse(noUserCart)
	
	if(activeUser !== null){
		console.log("active user exist, and therefor userlist exists")
		for(let i = 0; i < userList.length; i++){	
			console.log("user list looping")
			if(userList[i].customer == activeUser){
				console.log("user match", "local = ", userList[i].customer, "session = ", activeUser)
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
		console.log("no user ")
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
				console.log(noUserPrice)
			}
		}
	}
}
 
 //funktion för knapp som bekräftar köp
function confirmbtn (){
	//skapar knapp samt skriver text i den
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	let noUserList = localStorage.getItem("noUserCart")
	userList = JSON.parse(userList)
	noUserList = JSON.parse(noUserList)
	if(noUserList || userList) {
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
			else if (noUserList !== null) {
				alert("Logga in för att slutföra ditt köp")		
			}
			allPrices()
		});
	}
}

//Skapar en ny user som kopierar current user + cart och sparar i localstorage
function saveOld(){
	let userList = localStorage.getItem("users")
	localStorage.setItem("oldOrders", userList)
	localStorage.getItem("oldOrders")

}

/* function RemoveProdBtn(appendTo) {

	let removeProdBtn = document.createElement("button")
	removeProdBtn.className = "removeProdBtn"
	removeProdBtn.innerText = "Remove product"

	

} */

function removeProduct() {
	
	
	let removedProduct = JSON.parse(localStorage.getItem("users")) //Varför funkar denna men inte "userList = JSON.parse(userList)" ??????



	if(activeUser){
		for (let i = 0; i < userList.length; i++){
			
			if(activeUser == userList[i].customer){
				
/* 				userList = JSON.parse(userList)
 */
				userList = userList[i].customer
				let cart = userList.cart
				
/* 
				userList.splice(i, 0)  */
			
			}	
		}	
	}


	

	//userList.splice(product, 1)
}

