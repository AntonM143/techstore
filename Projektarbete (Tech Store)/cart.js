function initSite(){

}
function allPrices() {
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	let totalt = 0
	userList = JSON.parse(userList)

	if(activeUser !== null){
		console.log("active user exist, and therefor userlist exists")
		for(i = 0; i < userList.length; i++){	
			console.log("user list looping")
			if(userList[i].customer == activeUser){
				console.log("user match", "local = ", userList[i].customer, "session = ", activeUser)
				cart = userList[i].cart
						for(i = 0; i < cart.length; i++){
							let price = cart[i].price
							let totalSumCon = document.getElementById("totPrice")
							let totalSum = document.createElement("p")
							totalSumCon.innerHTML = ""
							totalt += price
							totalSum.className = "totalSum";
							totalSum.innerText += "Totalt pris: " + totalt + " kr";
							totalSumCon.appendChild(totalSum)
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
 //funktion för knapp som bekräftar köp
function confirmbtn (){
	//skapar knapp samt skriver text i den
	let confirm = document.getElementById("confirmBtn");
	let btn = document.createElement("button");
	btn.className = "btnConfirm fas fa-check"
	let userList = localStorage.getItem("users")
	let activeUser = sessionStorage.getItem("customer")
	userList = JSON.parse(userList)
	btn.innerText = "Slutför ditt köp!"
	confirm.appendChild(btn);
	//skapar en onclick för knappen
	btn.addEventListener("click", function()  {
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
		allPrices()
	});
}
confirmbtn()

