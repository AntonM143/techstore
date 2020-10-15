var listOfProducts;
let productContainer = document.getElementById("productContainer")

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

function initSite() {
    loadProducts();
    // This would also be a good place to initialize other parts of the UI


}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
   
    for(i = 0; i < listOfProducts.length; i++){
        
        //Skapar html för våra produkt kort
        let productTitle =document.createElement("h2")
        let productImg = document.createElement("img")
        let productImgContainer = document.createElement("div")
        let productDescr = document.createElement("div")
        let productPrice = document.createElement("p")
        let productCard = document.createElement("div")
        
        
        
        //Hämtar kontent för produkter från vår JSON fil
        productImg.src = listOfProducts[i].image
        productTitle.innerText = listOfProducts[i].title
        productDescr.innerText = listOfProducts[i].description
        productPrice.innerText = listOfProducts[i].price
        
        //Lägger till våra produkter till vår sida
        productContainer.appendChild(productCard)
        productCard.appendChild(productTitle)
        productCard.appendChild(productDescr)
        productImgContainer.appendChild(productImg)
        productCard.appendChild(productImgContainer) 
        productCard.appendChild(productPrice)
        
        //ger våra produkt "properties" klass namn så vi kan styla dem i css
        productCard.className = "productCard"
        productPrice.className = "productPrice"
        productDescr.className = "productDescr"
        productImgContainer.className = "productImgContainer"
        productImg.className = "productImg"
        productTitle.className = "productTitle"

        //All styling ska flytta till css, men kan läggas här under utveckling

    }
    
    console.log(listOfProducts);
    
    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
}


