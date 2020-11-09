
import {loginLogoutButton, cartCounter} from "./main.js"
let body = document.getElementById("cartBody")
window.addEventListener("load", initSite)

function initSite() {
	if (body){
		console.log("cartBody detected")
		allPrices()
		loginLogoutButton()
		cartCounter()
		allPrices()
		confirmbtn()

	}
}

function printCart() {


	if(cart.length > 0) {
		for(let i = 0; i < cart.length; i++ ){

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
		//Möjglitvis skapa en funktion som räknar priser på produkter som inte är sparade till användare
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
