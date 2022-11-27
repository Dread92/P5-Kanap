fetch("http://localhost:3000/api/products")
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json(); 
      }
    })
    .then(function (datas) { 
      console.log(datas)  
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

      const itemid = datas[0]._itemid
      const imageUrl = datas[0].imageUrl
      const altTxt = datas[0].altTxt
      const name = datas[0].name
      const description = datas[0].description


      const image = createImage(imageUrl, altTxt)
      const link = makeLink (itemid)
      const article = createArticle()
      const h3 = createTitle (name)
      const p = createParagraph(description)

      article.appendChild(image)
      article.appendChild(h3)
      article.appendChild(p)
      appendChildren(link, article)
   
    }



    function makeLink (id) {

      const link = document.createElement('a')
      link.href = "./product.html?id=" + id
      return link

    }

      function appendChildren(link, article) {

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
        image.removeAttribute ("title")
        image.removeAttribute ("style")
        return image
      }


      function createArticle(){

      

        const article = document.createElement('article')
       
        console.log(article)

        return article 
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
	

























	/*
	
	function showProducts(datas) {

		if(!datas) return;

	  for (let i = 0; i < datas.length; i = i + 1) {

		
		let product = datas[i];
		
		console.log( product );
		
    const link = document.createElement("a")
    link.href = datas
    link.text = "un super canap"

	   }
	
	}

 /*
fetch ("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => getProduct(data))


function getProduct(dataproduct){
console.log(dataproduct)

const imageUrl =dataproduct[0].imageUrl
const anchor = makeAnchor(imageUrl);
appendChildren(anchor)
}



function makeAnchor(url){
    const anchor = document.createElement("a");
    anchor.href = url
    anchor.text ="Kanap test"
    return anchor
}

function appendChildren(anchor){
    const items=  document.querySelector("#items")
    if(items!=null){
    items.appendChild(anchor)
    }   
}
*/