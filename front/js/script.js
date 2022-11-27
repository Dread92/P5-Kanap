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



/* Fonctions pour récupérer l'id de l'article + création d'un lien qui renvoie vers la page produit .. */
    function showProducts(datas) {

      const itemid = datas[0]._itemid
      const link = makeLink (itemid)
      appendChildren(link)
   
    }

    function makeLink (id) {

      const link = document.createElement('a')
      link.href = "./product.html?id=" + id
      return link

    }

      function appendChildren(link) {

        const items =  document.querySelector("#items")
        if (items != null) {
          items.appendChild(link)
        }

      }
      /* fabrication de la carte image+ titre + paragraphe */


      function createArticle(){

      }
      
      function createImage() {

      }

      function createTitle() {

      }

      function createParagraph(){
        
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