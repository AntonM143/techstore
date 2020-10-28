let registerButton = document.getElementById("registerButton")
let loginButton = document.getElementById("loginButton")
let registerName = document.getElementById("registerCustomer")
let registerPassword = document.getElementById("registerPassword")
let loginName = document.getElementById("customerName")
let loginPassword = document.getElementById("customerPassword")

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
function saveArrayToLocal(arrayToLocal) {
    localStorage.setItem("users", JSON.stringify(arrayToLocal))
}
//Funktion som kollar att användare inte redan finns
function checkUser(nameToCheck, passwordToCheck) { 
    let myList = getUserList() 
    
    listMatch = false
    for(i = 0; i < myList.length; i++){
        if(nameToCheck == myList[i].customer && passwordToCheck == myList[i].password || nameToCheck == myList[i].customer){
            listMatch = true
        }
    }
    return listMatch
}



//Lägg till ett object i array och spara i localStorage
function addToArray() {
    let myArray = getUserList()
    
    myArray.push({
        customer: registerName.value,
        password: registerPassword.value,
        cart: []
    })
    saveArrayToLocal(myArray)
}
//Registrera ny användare
registerButton.addEventListener("click", () => {

    checkUser(registerName.value, registerPassword.value)
    if(listMatch == true){
        console.log("user already exists")
    }
    else if(registerName.value == ""){
        console.log("you need to type a username")
    }
    else if(registerPassword.value == ""){
        console.log("you need to type a password")
    }
    else{
        addToArray()
    }
})


