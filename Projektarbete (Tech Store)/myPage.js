import {loginLogoutButton, cartCounter} from "./main.js"
let body = document.getElementById("myPageBody")
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
	



	}