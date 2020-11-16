import {loginLogoutButton, cartCounter,createProductCard,getImgElement,getTitleElement,getPriceElement} from "./main.js"
import {parseUserList} from "./cart.js"
let body = document.getElementById("myPageBody")
let activeUser = sessionStorage.getItem("customer")
window.addEventListener("load", initSite)

function initSite() {
	if (body){
		console.log("mypage detected")
		loginLogoutButton()
		cartCounter()
		orderHistory()
		
		
	}
}
	
function orderHistory(){
	
	
	let userList = parseUserList()
	let cartDiv = document.getElementById("cartProducts")
	
		for (let i = 0; i < userList.length; i++){

			if(activeUser == userList[i].customer) {

			let currentUser = userList[i]
			let pastOrders = currentUser.oldOrders
				
				for(let i = 0; i < pastOrders.length; i++){
					
					let productCard = createProductCard("cartProdCard", cartDiv)
					let inOrders = pastOrders[i]

					for (let i = 0; i < inOrders.length; i++ ){
						productCard.appendChild(getImgElement(inOrders[i], "cartImg"))
						productCard.appendChild(getTitleElement(inOrders[i]))
						productCard.appendChild(getPriceElement(inOrders[i]))

					}
				}
			}

		}		
}		