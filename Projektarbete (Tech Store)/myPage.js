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
					var table = document.getElementById("myTable");
					let inOrders = pastOrders[i]

					for (let i = 0; i < inOrders.length; i++ ){
						var row = table.insertRow(0);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var cell4 = row.insertCell(3);

						cell1.appendChild(getImgElement(inOrders[i], "cartImg"))
						cell2.appendChild(getTitleElement(inOrders[i]))
						cell3.appendChild(getPriceElement(inOrders[i]))
						

					}
				}
			}

		}		
}		



/* var table = document.getElementById("myTable");
var row = table.insertRow(0);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);

 */