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


    function showProducts(datas) {
      
      const imageUrl = datas[0].imageUrl
      const link = document.createElement('a')
      link.href = imageUrl
      link.text = "un super canap"

      const items =  document.querySelector("#items")

      if (items != null) {
        items.appendChild(link)
      }
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