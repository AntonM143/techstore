 import {bajs}  from "./main.js"
 

function allPrices() {
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	let totalt = 0
	userList = JSON.parse(userList)
	

	if(activeUser !== null){
		console.log("active user exist, and therefor userlist exists")
		for(let i = 0; i < userList.length; i++){	
			console.log("user list looping")
			if(userList[i].customer == activeUser){
				console.log("user match", "local = ", userList[i].customer, "session = ", activeUser)
				let cart = userList[i].cart
 					for(i = 0; i < cart.length; i++){
						let price = cart[i].price
						totalt += price
						console.log("price = ", price)
						console.log("totalt = ", totalt)
					}
					return
			}
		}	
	}
	else{
        console.log("ended up in else")
        //Möjglitvis skapa en funktion som räknar priser på produkter som inte är sparade till användare
	}
 }

 allPrices()