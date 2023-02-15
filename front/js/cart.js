document.title = ` Votre Panier`

const cart = JSON.parse(localStorage.getItem("Cart"));

const fetchAPI = (url, method, type, datas) => {
     
    let options = {
        method: method,
        headers: { "Content-Type": type}
    }

    if (!url || !method || !type)
        return false;
    
    if (method === 'POST'){
        options.body = JSON.stringify( datas )
    }
    
    return fetch(url, options )
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            alert( ERROR_SERVER )
        })
}


cart.forEach(item => displayItem(item))

totalCart()




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

    input.addEventListener('change', (e) => updateQuantity(product.id, product.color, input.value))

    
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

async function totalCart() {

    let nb = 0
    let total = 0
        
    for ( let product of cart ) {
        
        let datasProduct = await fetchAPI( 'http://localhost:3000/api/products/' + product.id , 'GET' , 'application/json' , false )
        
        nb += parseInt( product.quantity )
        
        total += ( parseInt(product.quantity) * parseInt(datasProduct.price) )
        
    }
    
    document.getElementById("totalQuantity").innerText = nb
    document.getElementById("totalPrice").innerText = total
    
}


const updateQuantity = (productId, productColor, qty) => {
        
    if (!productId || !productColor || !qty)
        return false;

    let indexProduct = cart.findIndex(
        (el) => el.id === productId && el.color == productColor
    ) 
    
    if (indexProduct != -1) {
        
        cart[indexProduct].quantity = parseInt(qty)
        
        localStorage.setItem("Cart", JSON.stringify(cart))

        document.location.href = "cart.html"

    } else {
        
        return false;

    }
}

const deleteArticle = (productId, productColor) => {
    
    if (!productId || !productColor)
        return false;
    
    let indexProduct = cart.findIndex(
        (el) => el.id === productId && el.color == productColor
    ) 

    if (indexProduct != -1) {
        
        cart.splice(indexProduct, 1)
        
        localStorage.setItem("Cart", JSON.stringify(cart))

        document.location.href = "cart.html"

    } else {
        
        return false;

    }
    
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
        alert("Entrez un nom de ville valide")
        return true
    }
    return false
}

function isAddressInvalid(){
    const address=document.querySelector("#address")

    const addressRegex= /d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*/

    if(addressRegex.test(address)=== false){
        alert("Entrez une adresse postale valide")
        return true
    }
    return false
}

function isFirstNameInvalid(){
    const firstName=document.querySelector("#firstName")
    const firstNameRegex = /^[a-z ,.'-]+$/i

    if(firstNameRegex.test(firstName)=== false){
        alert("Entrez un prénom valide")
        return true
    }
    return false
    
}


function isLastnameInvalid(){
    const lastName=document.querySelector("#lastName")
    const lastNameRegex = /^[a-z ,.'-]+$/i

    if(lastNameRegex.test(lastName)=== false){
        alert("Entrez un prénom valide")
        return true
    }
    return false

}





function isFormValid(){
    if(isCityInvalid() || isEmailInvalid() || isAddressInvalid() || isFirstNameInvalid() || isLastnameInvalid() ){
        alert("Votre adresse email,votre adresse postale ou votre nom/prénom est invalide")    }
    //else fetch
}


// window.location.href = "confirmation.html" + "?orderId=" + data.orderId ;