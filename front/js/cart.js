/* cart js page */


/*0: altTxt: "Photo d'un canapé jaune et noir, quattre places"
colors: "Black/Yellow"
id: "415b7cacb65d43b2b5c1ff70f3393ad1"
imageUrl: "http://localhost:3000/images/kanap02.jpeg"
price: 4499
quantity: 2
name: Kanap Sinopé*/



const cart= [];

getStorage()
console.log(cart)
cart.forEach(item => displayItem(item))


function getStorage(){

    const numberOfProducts= localStorage.length;


for (let i=0 ; i < numberOfProducts; i++){


    const item=localStorage.getItem(localStorage.key(i))
    const itemProduct = JSON.parse(item)
    cart.push(itemProduct)


}
}

function displayItem (item){


    const article = createArticle(item)
    displayArticle(article)


    
    const div = createImageInDiv (item)
    article.appendChild(div)



    const cardContent = createCardContent(item)
    article.appendChild(cardContent)
}

function createCardContent(item){


    const div = document.createElement("div")
    div.classList.add("cart__item__content")
    
    const description= document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name


    const p = document.createElement("p")
    p.textcontent = item.colors

    const p2 = document.createElement("p")
    p2.textContent = item.price + "€";


    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    div.appendChild(description)

    return div


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





