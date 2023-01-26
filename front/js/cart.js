

document.title = ` Votre Panier`
const cart= [];
getStorage()
console.log(cart)
cart.forEach(item => displayItem(item))


function getStorage(){
    const numberOfProducts= localStorage.length;

    for (let i=0 ; i < numberOfProducts; i++){
    const item=localStorage.getItem(localStorage.key(i)) ||""
    const itemProduct = JSON.parse(item)
    cart.push(itemProduct)
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





