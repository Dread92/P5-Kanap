
/*
fetch(`http://localhost:3000/api/products`)



.then
(function(res){
    return res.json();
})

.then
(function(products){
    console.log(products)
    getStorage(products)
   
})
.catch(function (error) {
    console.log("Message d'erreur : \n" + error);
  });
*/

document.title = ` Votre Panier`


const cart = JSON.parse(localStorage.getItem("Cart"));
cart.forEach(item => displayItem(item))





function displayItem (item){
    console.log(item)
    fetch(`http://localhost:3000/api/products/${item.id}`)
.then
(function(res){
    return res.json();
})

.then
(function(sofa){
    

    const article = createArticle(item)
    const imageDiv = createImageInDiv (sofa)
    article.appendChild(imageDiv)
    const cardItemContent= createCartContent(sofa, item)
    article.appendChild(cardItemContent)

    displayArticle(article)
  
})
.catch(function (error) {
    console.log("Message d'erreur : \n" + error);
  });
  
}


function createCartContent(item, product){

   const cardItemContent = document.createElement('div')
   cardItemContent.classList.add("cart__item__content")
   const description = createDescription(item)
    const settings = createSettings(item, product)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)

    return cardItemContent
}



function createSettings(item, product){
    const settings= document.createElement("div")
    settings.classList.add("cart__item__settings")

    addQuantitySettings(settings, item, product)
    return settings
}

function addQuantitySettings(settings, item, product){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = " Qté :"
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min="1"
    input.max="100"
    input.value = product.quantity
    
    settings.appendChild(input)
}



function createDescription (item) {

    const description= document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const pColor = document.createElement("p")
    pColor.innerText = item.colors
    console.log(item.colors)
    const pPrice = document.createElement("p")
    pPrice.innerText = item.price + "€"


    description.appendChild(h2)
    description.appendChild(pColor)
    description.appendChild(pPrice)

    return description
}


function displayArticle(article){
    document.querySelector("#cart__items") .appendChild(article)
}


function createArticle(item){
    const article = document.createElement("article")
    article.classList.add ("cart__item")
    article.dataset.id=item.id
    article.dataset.colors=item.colors
    return article
}



function createImageInDiv (item){

    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image= document.createElement('img')
    image.src = item.imageUrl 
    image.alt= item.altTxt
    div.appendChild(image)

    return div
}




// REGEX part for email and city

function isEmailInvalid(){
    const email=document.querySelector("#email")
   
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/

    if(regex.test(email)===false){
        alert("Entrez une adresse mail valide")
        return true
    }
    return false
}

function isCityInvalid(){
    const city=document.querySelector("#city")

    const cityRegex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/

    if(cityRegex.test(city)=== false){
        alert("Entrez une adresse postale valide")
        return true
    }
    return false
}


function isFormValid(){
    if(isCityInvalid() || isEmailInvalid() ){
        alert("Votre adresse email ou votre adresse postale est invalide")    }
    
}







function totalCart() {
    let totalProducts = 0
    let totalPrice = 0

    
    const products = document.querySelectorAll(".cart__item")
    products.forEach((item, sofa, displayItem ) => {
        totalProducts += JSON.parse(item.dataset.quantity)
        totalPrice += item.dataset.quantity * item.dataset.price
    });
    document.getElementById("totalQuantity").textContent = totalProducts
    document.getElementById("totalPrice").textContent = totalPrice
}


















