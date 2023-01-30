

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


document.title = ` Votre Panier`
const cart= [];
getStorage()
console.log(cart)
cart.forEach(item => displayItem(item))

function getStorage(products) {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart != null) {
        for (let product of cart) {
            for (let a = 0, b = products.length; a < b; a++) {
                if (product.id === products[a]._id) {
                    product.name = products[a].name;
                    product.price = products[a].price;
                    product.imageUrl = products[a].imageUrl;
                    product.altTxt = products[a].altTxt;
                    product.description = products[a].description;
                }
            }
        }
        console.log( "Produits dans le panier:" , cart)
    }
    else {
       alert(("Aucun article dans le panier"))
    }
}


function displayItem (item){

    const article = createArticle(item)
    const imageDiv = createImageInDiv (item)
    article.appendChild(imageDiv)
    const cardItemContent= createCartContent(item)
    article.appendChild(cardItemContent)

    displayArticle(article)
}


function createCartContent(item){

   const cardItemContent = document.createElement('div')
   cardItemContent.classList.add("cart__item__content")
   const description = createDescription(item)
    const settings = createSettings(item)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)

    return cardItemContent
}



function createSettings(item){
    const settings= document.createElement("div")
    settings.classList.add("cart__item__settings")

    addQuantitySettings(settings, item)
    return settings
}

function addQuantitySettings(settings, item){
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
    input.value = item.quantity

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

    if(regex.test(email)=== false){
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