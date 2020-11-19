import {loginLogoutButton, cartCounter,createProductCard,getImgElement,getTitleElement,getPriceElement} from "./main.js"
import {parseUserList} from "./cart.js"
let body = document.getElementById("myPageBody")
let activeUser = sessionStorage.getItem("customer")
window.addEventListener("load", initSite)

function initSite() {
	if (body){
		loginLogoutButton()
		cartCounter()
		orderHistory()
	}
}
/** Skriver ut gamla ordrar på min sida */	
function orderHistory(){	
	let userList = parseUserList()
	let historyDiv = document.getElementById("orderHistory")
	for (let i = 0; i < userList.length; i++){
		if(activeUser == userList[i].customer) {
			let currentUser = userList[i]
			let pastOrders = currentUser.oldOrders	
			for(let i = 0; i < pastOrders.length; i++){
				let inOrders = pastOrders[i]	
				let productCard = createProductCard("hisProdCard", historyDiv)
				let newTable = document.createElement("table")	
				let headLine = document.createElement("h4")
				headLine.innerText = 'Orderdatum ' +  inOrders[0]
				productCard.appendChild(headLine)
				productCard.appendChild(newTable)
				for (let i = 1; i < inOrders.length; i++ ){
					let row = newTable.insertRow(0);
					let cell1 = row.insertCell(0);
					let cell2 = row.insertCell(1);
					let cell3 = row.insertCell(2);
					cell1.appendChild(getImgElement(inOrders[i], "historyImg"))
					cell2.appendChild(getTitleElement(inOrders[i], "titleText"))
					cell3.appendChild(getPriceElement(inOrders[i], "priceText"))
				}
			}
		}

	}		
}		



