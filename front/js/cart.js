// titre de la page
document.title = ` Votre Panier`
// on récupètre la clé Cart dans le localStorage et onn lui associe la constante cart
const cart = JSON.parse(localStorage.getItem("Cart"));
// on fait appel à l'API via une requête fetch, en utilisant une méthode flexible POST/GET grâce à la variable "options"
const fetchAPI = (url, method, type, datas) => {

    let options = {
        method: method,
        headers: {
            "Content-Type": type
        }
    }

    if (!url || !method || !type) //on arrete la fonction si l'un de ces élémnents manque
        return false;

    if (method === 'POST') { // si la method est strictement POST, on récupère les produits via " datas"
        options.body = JSON.stringify(datas)
    }

    return fetch(url, options) // on fait un fetch sur l'URL du produit d'où vient la redirection + les différentes options que l'utilisateur avait défini
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => { // si une erreur survient, une alerte s'affiche
            alert(ERROR_SERVER)
        })
}
cart.forEach(item => displayItem(item)) // on fait une boucle sur l'array du localstorage afin d'afficher correctement les produits sur la page du panier via la fonction displayItem
totalCart() // On appelle la fonction totalCart pour calculer le prix total du panier



// on utilise une fonction asynchrone pour fetch les produits de l'API
async function displayItem(item) { // on prend item en argument qui contient l'id afin que l'affichage soit fait dynamiquement selon les produits ajoutés au panier
    let sofa = await fetchAPI('http://localhost:3000/api/products/' + item.id, 'GET', 'application/json', false)
    const article = createArticle(item) // appel des deux fonctions item&sofa qui permettent d'afficher au bon endroit le contenu de la "carte" du canapé et son image
    const imageDiv = createImageInDiv(sofa)
    article.appendChild(imageDiv) // on créé l'enfant à article où se trouve l'image 
    const cardItemContent = createCartContent(sofa, item)
    article.appendChild(cardItemContent)
    displayArticle(article) // on appelle la fonction display article    
}


// fonction qui permet de crée cart__item__content dans lequel on créé "description" et "settings"
function createCartContent(item, product) {
    const cardItemContent = document.createElement('div')
    cardItemContent.classList.add("cart__item__content")
    const description = createDescription(item, product) // appel des fonctions createDescription et createSettings afin de remplir la description et le choix couleur/quantité de la carte dans le panier
    const settings = createSettings(item, product)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}
//fonnction qui crée une div settings(cart__item__content__settings) puis fait appel à addQuantitySettings et addDeleteSettings.
function createSettings(item, product) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    addQuantitySettings(settings, item, product)// permet de modifier la quantité
    addDeleteSettings(settings, product)// permet d'ajouter le bouton supprimer
    return settings
}
// fonction qui permet d'ajouter une quantité comprise entre 1 & 100
function addQuantitySettings(settings, item, product) {
    const quantity = document.createElement("div")//on crée les éléments HTML
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = " Qté :"
    quantity.appendChild(p)
    const input = document.createElement("input") // on configure les inputs en type nombre, quantité min/max et on ajoute la classe ItemQuantity
    input.type = "number" // input type important car il détermine qu'on a à faire à des nombres et pas des lettres
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"// valeur minimale
    input.max = "100"//valeur maximale
    input.value = product.quantity // valeur par défaut = le nombre de produits séléctionnés par l'utilisateur
    input.addEventListener('change', (e) => updateQuantity(product.id, product.color, input.value)) // on appelle la fonction updatequantity qui va permettre de rafraîchir la page en cas de changement de quantité
    // générer bouton supprimer ( deleteitem) + gestion du addeventlistener
    settings.appendChild(input)
}
// fonction qui permet de créer le bouton supprimer
function addDeleteSettings(settings, product) {
    const deleteButton = document.createElement("div"); // on ajoute une div dans le HTML
    deleteButton.className = "cart__item__content__settings__delete";// création de la classe dans le HTML et du paragraphe
    let deleteProduct = document.createElement("p");
    deleteButton.appendChild(deleteProduct);
    deleteProduct.className = "deleteItem";
    deleteProduct.innerHTML = "Supprimer";
    deleteProduct.addEventListener('click', (e) => deleteArticle(product.id, product.color))// ajout d'un addevenlistener qui va supprimer du l'id et la couleur du localstorage
    settings.appendChild(deleteButton);
}
// fonction qui va permettre de créer le contenu de la carte produit dans le panier 
function createDescription(item) {
    const description = document.createElement("div")// création de la div 
    description.classList.add("cart__item__content__description")// création de la classe dans le HTML
    const h2 = document.createElement("h2")// création du titre
    h2.textContent = item.name
    const pColor = document.createElement("p")// création des paragraphes
    pColor.innerText = item.colors 
    console.log(item.colors)
    const pPrice = document.createElement("p")
    pPrice.innerText = item.price + "€" // on implante le prix pour qu'il s'affiche dynamiquement à côté de €
    description.appendChild(h2)// on append les différents enfants à la div principale
    description.appendChild(pColor)
    description.appendChild(pPrice)
    return description
}

function displayArticle(article) { // on sélectionne cart__items dans le html puis création d'un enfant à qui on créé l'enfant article 
    document.querySelector("#cart__items").appendChild(article)
}
// fonction qui permet de créer l'article et d'ajouter cart__item
function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")// ajout de la classe cart__item
    article.dataset.id = item.id// permet d'ajouter l'item en fonction de l'ID et de la couleur séléctionnée
    article.dataset.colors = item.colors
    return article
}
//fonction qui va permettre l'affichage de l'image du produit dans le panier
function createImageInDiv(item) {
    const div = document.createElement("div")// création de la div dans le HTML
    div.classList.add("cart__item__img")// création de la classe dans la div
    const image = document.createElement('img') // création de l'élément image 
    image.src = item.imageUrl // on prend l'url de l'image en fonction du produit qui doit être affiché
    image.alt = item.altTxt // texte en fonction du produit
    div.appendChild(image)
    return div
}
// fonction asynchrone pour calculer la totalité du panier
async function totalCart() {
    let nb = 0// on définit les deux variables nombre/total à 0 de base
    let total = 0
    for (let product of cart) {// on créé ensuite une boucle qui va itérer sur chaque produit du panier
        let datasProduct = await fetchAPI('http://localhost:3000/api/products/' + product.id, 'GET', 'application/json', false)// pour chaque produit, on appelle l'API par l'id du produit afin de récuperer le prix
        nb += parseInt(product.quantity) // on ajoute la quantité à la variable nb
        total += (parseInt(product.quantity) * parseInt(datasProduct.price))// puis on multiplie le nb(nombre)par le prix pour avoir le total
    }
    document.getElementById("totalQuantity").innerText = nb//on sélectionne les éléments HTML totalQuantity/totalPrice pour l'affichage du nombre d'article et du prix total
    document.getElementById("totalPrice").innerText = total
}
// fonction qui va permettre d'actualiser en temps réel la quantité de canapés depuis le panier
const updateQuantity = (productId, productColor, qty) => {
    if (!productId || !productColor || !qty)// on vérifie qu'aucun des paramètres ne manque
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


// fonction qui permet d'intéragir avec le bouton supprimer pour qu'il efface des articles
const deleteArticle = (productId, productColor) => {
    if (!productId || !productColor)// on vérifie qu'aucun des paramètres ne manque
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



// fonctions pour chaque élément du formulaire afin de vérifier la validité ce ceux-ci et prévenir l'utilisateur de saisir des données interdites par le REGEX
function isEmailInvalid() {
    const email = document.querySelector("#email")
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Entrez une adresse mail valide")
        return true
    }
    return false
}

function isCityInvalid() {
    const city = document.querySelector("#city")
    const cityRegex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
    if (cityRegex.test(city) === false) {
        alert("Entrez un nom de ville valide")
        return true
    }
    return false
}

function isAddressInvalid() {
    const address = document.querySelector("#address")
    const addressRegex = /d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*/
    if (addressRegex.test(address) === false) {
        alert("Entrez une adresse postale valide")
        return true
    }
    return false
}

function isFirstNameInvalid() {
    const firstName = document.querySelector("#firstName")
    const firstNameRegex = /^[a-z ,.'-]+$/i
    if (firstNameRegex.test(firstName) === false) {
        alert("Entrez un prénom valide")
        return true
    }
    return false
}


function isLastnameInvalid() {
    const lastName = document.querySelector("#lastName")
    const lastNameRegex = /^[a-z ,.'-]+$/i
    if (lastNameRegex.test(lastName) === false) {
        alert("Entrez un prénom valide")
        return true
    }
    return false

}

// fonction globale qui verifie chaque champ du fomulaire; si l'un des champs est invalide, une erreur est renvoyée.
function isFormInvalid() {
    if (isCityInvalid() || isEmailInvalid() || isAddressInvalid() || isFirstNameInvalid() || isLastnameInvalid()) {
        alert("Votre adresse email,votre adresse postale ou votre nom/prénom est invalide")
    }
    //else fetch
}


// window.location.href = "confirmation.html" + "?orderId=" + data.orderId ;