//On fait tout d'abord un appel à l'API via une requête fetch pour avoir les données des produits. Si une erreur intervient durant le process, cela va renvoyer une erreur.
fetch("http://localhost:3000/api/products")
    .then(function(reponse) {
        if (reponse.ok) {
            return reponse.json();
        }
    })
    .then(function(datas) {
        showProducts(datas);

    })
    .catch(function(erreur) {
        console.log("Message d'erreur : \n" + erreur);
    });

//titre de la page
document.title = ` Bienvenue chez Kanap`

// Données que l'on veut récupérer dans l'API, exemple:
/* altTxt: "Photo d'un canapé bleu, deux places"
colors:(3) ['Blue', 'White', 'Black']
description:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl:"http://localhost:3000/images/kanap01.jpeg"
name:"Kanap Sinopé"
price :1849
_id:"107fb5b75607497b96722bda5b504926" */


//Fonction globale d'affichage des produits via "data"
function showProducts(datas) {
    if (!datas) return;
    for (let i = 0; i < datas.length; i++) { // boucle qui parcourt le tableau de produits
        //Pour chaque produit, on récupète les différentes données inhérentes à celui ci via des constantes
        const id = datas[i]._id
        const imageUrl = datas[i].imageUrl
        const altTxt = datas[i].altTxt
        const name = datas[i].name
        const description = datas[i].description
        const link = makeLink(id)
        // Puis on crée les éléments HTML nécessaires pour afficher les informations du produit 
        const article = document.createElement('article')
        const image = createImage(imageUrl, altTxt)
        const h3 = createTitle(name)
        const p = createParagraph(description)
        /* création d'enfants à <article> */
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
        appendArticleToLink(link, article)
    }
}


/////////////////////////////////
// Création des éléments HTML // 
///////////////////////////////

// Avec id en argument, on crée une balise <a> qui renvoi à  ./product.html?id= + l'id du produit souhaité
function makeLink(id) {
    const link = document.createElement('a')
    link.href = "./product.html?id=" + id
    return link
}


// On prend la classe items dans le HTML pour ajouter les éléments lien et l'article au DOM
function appendArticleToLink(link, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(link)
        link.appendChild(article)
    }
}


//fabrication de la carte image+ titre + paragraphe 
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
// fabrication du titre en récupérant dans le HTML la classe productname et création de l'élément h3
function createTitle(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add('productname')
    return h3
}
// fabrication du paragraphe + récupération de l'élément productDescription
function createParagraph(description) {
    const p = document.createElement('p')
    p.textContent = description
    p.classList.add("productDescription")
    return p
}



















