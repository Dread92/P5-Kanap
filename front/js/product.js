
//cette constante permet de récupérer l'identifiant passé à la fin de l'URL, selon la page produit sélectionnée
const id = new URLSearchParams(window.location.search).get("id")
// on appelle l'API pour qu'elle nous donne l'ID du produit de la page sur laquelle on est 
fetch(`http://localhost:3000/api/products/${id}`)
.then
(function(res){
    return res.json();
})
.then
(function(sofa){
    dataFlow(sofa)
    console.log(`Données de ${sofa.name} récupérées :`, sofa)
})
// on catch en cas d'erreur
.catch(function (error) {
    console.log("Message d'erreur : \n" + error);
  });

//fonction globale pour afficher les informations du produit dynamiquement selon le canapé sélectionné
function dataFlow(sofa) {
    //Le titre de la page est dynamique en fonction du canapé sélectionné
    document.title = ` ${sofa.name}`
    // ces variables servent à stocker les informations du canapé sélectionné
    const altTxt= sofa.altTxt
    const colors = sofa.colors
    const description = sofa.description
    const imageUrl = sofa.imageUrl
    const name = sofa.name
    const price = sofa.price
    sofaPrice = price;
    imgUrl= imageUrl;
    altText=altTxt;
    articleName=name;
  // appel des fonctions destinées à créer l'ensemble des paramètres inhérents à la page du produit 
    createImage( imageUrl, altTxt)
    createTitle ( name )
    createPrice (price)
    createDescription ( description)
    createColors ( colors)
}

// avec cet ensemble de fonction, on séléctionne les éléments dans l'HTML selon le nom de la classe/id afin de créer les différents éléments de la page
    function createImage(imageUrl, altTxt){
        const image = document.createElement ( 'img')
        image.src = imageUrl
        image.alt = altTxt
        const parent = document.querySelector(".item__img")
        if (parent != null) parent.appendChild (image)
    }
    function createTitle (name) {
        const h1 = document.querySelector ("#title")
        if (h1 != null) h1.textContent = name   
    }
    function createPrice ( price ) {
        const span = document.querySelector ("#price")
        if (span != null) span.textContent= price 
    }
    function createDescription ( description) {
        const p = document.querySelector ("#description")
        if ( p != null ) p.textContent = description 
    }
    function createColors ( colors) {
        const select = document.querySelector ("#colors")// on crée un élement select
        if ( select != null ) {// s'il existe, boucle sur le tableau des couleurs fourni
            colors.forEach((colors) => {// puis on crée l'élément option pour chaque couleur
                const option = document.createElement('option')// Pour chaque couleur, la fonction crée un élément <option> et définit sa valeur et son contenu
                option.value = colors
                option.textContent = colors
                select.appendChild (option) 
            })  
            
        }
// Appel de la fonction productToPurchase pour enregistrer les paramètres du canapé choisis par l'utilisateur
        productToPurchase(colors, quantity,id)
    }


// fonction qui permet au clic d'enregistrer dans le localstorage la couleur et la quantité, ainsi que l'ID du produit
    function productToPurchase() {
        const button = document.querySelector('#addToCart')
        button.addEventListener("click", () => {
            const colors = document.querySelector('#colors').value
            const quantity = document.querySelector('#quantity').value
            const purchase = {
                id: id,
                color: colors,
                quantity: Number(quantity),
            }
// on appelle également la fonction orderIncorrect pour vérifier si aucun élément ne manque
            if (orderIncorrect(colors, quantity)) return false;
// Puis on appelle addtocart pour stocker les données dans le LocalStorage
            addToCart(purchase, colors)
        })
    }
//Cette fonction sert à déterminer si tous les paramètres avant l'ajout au panier sont corrects ( couleur sélectionnée, quantité entre 1 et 100/non nulle)
    function orderIncorrect ( colors, quantity){
        if
            (colors == null || colors == ""|| quantity == null || quantity == 0 || quantity <= 0 || quantity > 100){
                (alert ("Sélectionnez une couleur et une quantité entre 1 et 100"))    
               return true
        }} 
//Avec addToCart, on permet l'ajout des diverses informations du produit sélectionné au panier 
        function addToCart (purchase,colors){
            let cart = JSON.parse(localStorage.getItem("Cart"))
// On vérifie si le Panier n'est pas vide
            if (cart == null){
                cart=[]
                cart.push(purchase)
                localStorage.setItem("Cart", JSON.stringify(cart))
                purchaseConfirmation(purchase)
            }
// si le panier n'est pas vide, alors on vérifie si article est déjà présent dans le panier
            else if (cart != null){
                for(i = 0; i < cart.length; i++) {
                    if(
                        //vérifie si l'id de l'article et sa couleur correspondent à ceux d'un article déjà présent dans le panier
                        cart[i].id == purchase.id &&
                        cart[i].color == purchase.color
                    ){
                        return(
                            cart[i].quantity = Math.min(cart[i].quantity + purchase.quantity,100),// si déjà présent, on ajoute jusqu'à un maximum de 100 exemplaires du même article
                            localStorage.setItem("Cart", JSON.stringify(cart)), // on crée une clé "Cart" dans le localstorage pour stocker les informations récupérées 
                            purchaseConfirmation(purchase)// Puis on renvoi vers la page cart.html 
                        )
                    }
                }
                //boucle qui itère sur les articles présents dans le panier
            for (i=0; i< cart.length; i++){//Pour chaque article, elle vérifie si l'id et la couleur de l'article correspond à ceux de l'article à ajouter
                if(cart[i].id == purchase.id &&//Si l'id et la couleur correspondent, elle met à jour la quantité de l'article dans le panier
                    cart[i].colors != colors ||
                    cart[i].id != purchase.id
                     )
                     {
                        return( //ajoute l'article au panier et enregistre le panier
                            cart.push(purchase),
                            localStorage.setItem("Cart", JSON.stringify(cart)),
                            purchaseConfirmation(purchase)// Puis on renvoi vers la page cart.html 
                        )
                     }
            }

        }

        }

    //Cette fonction permet de confirmer l'achat
          function purchaseConfirmation(purchase) 
          {
          
            let cart = JSON.parse(localStorage.getItem("Cart"))//utilisation la méthode JSON.parse pour convertir le contenu du localStorage avec la clé "Cart"
            if (window.confirm(`Votre article a bien été ajouté au panier !`))// si tout est vérifié et que l'alerte d'ajout au panier s'affiche, on renvoit vers cart.html en cliquant sur "OK"
             {
                window.location.href = "cart.html"
            } else {
                window.close// si l'utilisateur appuie sur "annuler", on reste sur la page. Toutefois, les données seront quand même ajoutées au panier et au localStorage
            }}
