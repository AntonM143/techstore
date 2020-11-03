 function allPrices() {
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	userList = JSON.parse(userList)
	
	if(activeUser !== null){
		console.log("active user exist, and therefor userlist exists")
		for(i = 0; i < userList.length; i++){	
			console.log("user list looping")
			if(userList[i].customer == activeUser){
				console.log("user match", "local = ", userList[i].customer, "session = ", activeUser)
				cart = userList[i].cart
				if(cart.length > 0){
					for(i = 0; i < cart.length; i++){
						price = cart[i].price
						console.log(price)
					}
				}
				else{
					console.log("finns ingen cart")
				}
			}
		}	
	}
	else{
		console.log("ended up in else")
	}
 }

 allPrices()