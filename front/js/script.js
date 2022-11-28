fetch("http://localhost:3000/api/products")
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json(); 
      }
    })
    .then(function (datas) { 
      showProducts(datas); 
     
  })
    .catch(function (erreur) {
      console.log("Message d'erreur : \n" + erreur);
    });
    	

    /* altTxt: "Photo d'un canapé bleu, deux places"
colors:(3) ['Blue', 'White', 'Black']
description:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl:"http://localhost:3000/images/kanap01.jpeg"
name:"Kanap Sinopé"
price :1849
_id:"107fb5b75607497b96722bda5b504926" */

/* Fonctions pour récupérer l'id de l'article + création d'un lien qui renvoie vers la page produit .. */
    function showProducts(datas) {

      if(!datas) return;
      for (let i = 0; i < datas.length; i++){ /*loop pour prendre chaque produit , accolade englobant toutes les constantes */

      const itemid = datas[i]._itemid
      const imageUrl = datas[i].imageUrl
      const altTxt = datas[i].altTxt
      const name = datas[i].name
      const description = datas[i].description
      /* const {itemid, imageUrl, altTxt, name, description} = data[0]     --> destructuring */

   
      const link = makeLink (itemid)

      const article = document.createElement('article') /* la fonction make article n'avait qu'une ligne */
      const image = createImage(imageUrl, altTxt)
      const h3 = createTitle (name)
      const p = createParagraph(description)

      article.appendChild(image)
      article.appendChild(h3)
      article.appendChild(p)
      appendArticleToLink(link, article)
    }

  }



    function makeLink (id) {

      const link = document.createElement('a')
      link.href = "./product.html?id=" + id
      return link

    }

      function appendArticleToLink(link, article) {

        const items =  document.querySelector("#items")
        if (items != null) {
          items.appendChild(link)
          link.appendChild(article)
        }

      }

   
      /* fabrication de la carte image+ titre + paragraphe */
      function createImage ( imageUrl, altTxt) {
        const image = document.createElement("img")
        image.src = imageUrl 
        image.alt = altTxt
        return image
      }

      function createTitle(name) {
        const h3 =  document.createElement("h3")
        h3.textContent = name 
        h3.classList.add('productname')
        return h3
      }

      function createParagraph(description){
        const p = document.createElement('p')
        p.textContent = description
        p.classList.add("productDescription")
        return p
      }
	

















