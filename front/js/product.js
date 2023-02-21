let cart = (JSON.parse(localStorage.getItem("Cart")) == null ? [] : JSON.parse(localStorage.getItem("Cart")));
let purchase = null

//cette constante permet de récupérer l'identifiant passé à la fin de l'URL, selon la page produit sélectionnée
const id = new URLSearchParams(window.location.search).get("id")
// on appelle l'API pour qu'elle nous donne l'ID du produit de la page sur laquelle on est 
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
        return res.json();
    })
    .then(function(sofa) {
        dataFlow(sofa)
        // console.log(`Données de ${sofa.name} récupérées :`, sofa)
    })
    // on catch en cas d'erreur
    .catch(function(error) {
        console.log("Message d'erreur : \n" + error);
    });

//fonction globale pour afficher les informations du produit dynamiquement selon le canapé sélectionné
function dataFlow(sofa) {
    //Le titre de la page est dynamique en fonction du canapé sélectionné
    document.title = ` ${sofa.name}`
    // appel des fonctions destinées à créer l'ensemble des paramètres inhérents à la page du produit 
    createImage(sofa.imageUrl, sofa.altTxt)
    createTitle(sofa.name)
    createPrice(sofa.price)
    createDescription(sofa.description)
    createColors(sofa.colors)
}

// avec cet ensemble de fonction, on séléctionne les éléments dans l'HTML selon le nom de la classe/id afin de créer les différents éléments de la page
function createImage(imageUrl, altTxt) {
    if (!imageUrl || !altTxt) return
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function createTitle(name) {
    if (!name) return
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function createPrice(price) {
    if (!price) return
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function createDescription(description) {
    if (!description) return
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function createColors(colors) {
    if (!colors) return
    const select = document.querySelector("#colors") // on crée un élement select
    if (select != null) { // s'il existe, boucle sur le tableau des couleurs fourni
        colors.forEach((colors) => { // puis on crée l'élément option pour chaque couleur
            const option = document.createElement('option') // Pour chaque couleur, la fonction crée un élément <option> et définit sa valeur et son contenu
            option.value = colors
            option.textContent = colors
            select.appendChild(option)
        })

    }
}

document.querySelector('#addToCart').addEventListener("click", (e) => {
    e.preventDefault()
 
    let color = document.querySelector('#colors').value
    let quantity = document.querySelector('#quantity').value 
 
    // on appelle également la fonction orderIncorrect pour vérifier si aucun élément ne manque
    if (!choices(color, quantity)) {
        alert('Couleur et/ou quantité saisi(e)s incorrect(s)')
        return
    }
    
    let purchase = {
        id: id, // from urlSearchParams
        color: color,
        quantity: Number(quantity),
    }

    // Puis on appelle addtocart pour stocker les données dans le LocalStorage
    addToCart(purchase)
})

//Cette fonction sert à déterminer si tous les paramètres avant l'ajout au panier sont corrects ( couleur sélectionnée, quantité entre 1 et 100/non nulle)
function choices(colors, quantity) {
    if (colors == null || colors == "" || quantity == null || quantity == 0 || quantity <= 0 || quantity > 100)
        return false
    return true
}

//Avec addToCart, on permet l'ajout des diverses informations du produit sélectionné au panier 
function addToCart(purchase) {

    if (!purchase)  return

    if ( cart != null ) {

        let indexProduct = cart.findIndex(
            (el) => el.id === purchase.id && el.color == purchase.color
        );

        console.log( indexProduct ) 
        
        if (indexProduct != -1) {
             
            let newQty = parseInt(cart[indexProduct].quantity) + parseInt(purchase.quantity)
            
            cart[indexProduct].quantity = newQty
            
            cart.push(purchase)
            
            cart.pop()

        } else { 
            
            cart.push(purchase)

        }
    } else {

        cart.push(purchase)

    }
    
    localStorage.setItem("Cart", JSON.stringify(cart))
    
    purchaseConfirmation()

}

//Cette fonction permet de confirmer l'achat
function purchaseConfirmation() {

    if (window.confirm(`Votre article a bien été ajouté au panier !`)) // si tout est vérifié et que l'alerte d'ajout au panier s'affiche, on renvoit vers cart.html en cliquant sur "OK"
    {
        window.location.href = "cart.html"
    } else {
        window.close // si l'utilisateur appuie sur "annuler", on reste sur la page. Toutefois, les données seront quand même ajoutées au panier et au localStorage
    }
}