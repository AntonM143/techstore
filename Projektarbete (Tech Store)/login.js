import { myPageBtn } from "./main.js"

let registerName = document.getElementById("registerCustomer")
let registerPassword = document.getElementById("registerPassword")
let loginName = document.getElementById("customerName")
let loginPassword = document.getElementById("customerPassword")
let loginWrap = document.getElementById("loginDiv")
let registerWrap = document.getElementById("registerDiv")
let message = document.createElement("p")
let body = document.getElementById("loginBody")
window.addEventListener("load", initSite)

function initSite() {
    if (body){
        console.log("loginBody detected")
        registerUser()
        loginUser()
	}
}

function getUserList() {
    //Funktion som hämtar eller skapar array i/från localStorage
    let userArray = localStorage.getItem("users")
    //Om localstorage är tom, skapa en array
    if(userArray == null) {
        userArray = []
    }
    //Om localStorage finns, hämta och omvandla
    else {
        userArray = JSON.parse(userArray)
    } 
    console.log(userArray, "getUserFunction")
    return userArray
}
//Funktion som sparar item i localStorage
export function saveArrayToLocal(arrayToLocal) {
    localStorage.setItem("users", JSON.stringify(arrayToLocal))
}
//Funktion som kollar att användare inte redan finns
function checkRegisterUser(nameToCheck, passwordToCheck) { 
    let myList = getUserList() 
    
    let registerListMatch = false
    for(let i = 0; i < myList.length; i++){
        if(nameToCheck == myList[i].customer && passwordToCheck == myList[i].password || nameToCheck == myList[i].customer){
            registerListMatch = true
        }
    }
    return registerListMatch
}

function checkLoginUser(nameToCheck, passwordToCheck) { 
    let myList = getUserList() 
    
    let loginListMatch = false
    for(let i = 0; i < myList.length; i++){
        if(nameToCheck == myList[i].customer && passwordToCheck == myList[i].password){
            loginListMatch = true
        }
    }
    return loginListMatch
}



//Lägg till ett object i array och spara i localStorage
export function addToArray() {
   
   
    let myArray = getUserList()
    myArray.push({
        customer: registerName.value,
        password: registerPassword.value,
        cart: [],
        oldOrders: []
    })
    saveArrayToLocal(myArray)
}
//Registrera ny användare
function registerUser() {
    let registerButton = document.getElementById("registerButton")
    registerButton.addEventListener("click", () => {

        checkRegisterUser(registerName.value, registerPassword.value)
        if(checkRegisterUser(registerName.value, registerPassword.value)){
            console.log("user already exists")
            loginErrorText(registerWrap, "user already exists")
            
        }
        else if(registerName.value == ""){
            console.log("you need to type a username")
            loginErrorText(registerWrap, "You need to type a username")

        }
        else if(registerPassword.value == ""){
            console.log("you need to type a password")
            loginErrorText(registerWrap, "You need to type a password")

        }
        else{
            addToArray()
            console.log("successfull")
            registerSuccessText(registerWrap, "Registration successful")
        }
})
}
function loginUser() {
    let loginButton = document.getElementById("loginButton")

    loginButton.addEventListener("click", () => {
        
        checkLoginUser(loginName.value, loginPassword.value)
        if(checkLoginUser(loginName.value, loginPassword.value)){
            sessionStorage.setItem("customer", loginName.value)
            window.location = "index.html"
        }
        else{

            console.log("login failed")
            loginErrorText(loginWrap, "login failed, try again!")
        }

    })
}
    function loginErrorText(appendToDiv, text) {
        
        message.innerText = text
        message.style.color = "red"
        appendToDiv.appendChild(message)
         
    }

    function registerSuccessText(appendToDiv, text) {
        
        message.innerText = text
        message.style.color = "green"
        appendToDiv.appendChild(message)
        
    }




