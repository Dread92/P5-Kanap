
/* URLparams */


 
/* window.location.href 
    window.location.search
*/ 
const queryString = window.location.search
const parametreUrl = new URLSearchParams(queryString); //Recupere la 'queryString' de l'URL
const  id =  parametreUrl.get("id"); // Recupere la valeur de 'id' dans l'URL
console.log(id)


fetch(`http://localhost:3000/api/products/${id}`)
.then(function (reponse) {
    if (reponse.ok) {
      return reponse.json(); 
    }
  })
  .then(function (id) { 
    dataFlow(id); })


function dataFlow(sofa) {


    const altTxt= sofa.altTxt
    const colors = sofa.colors
    const description = sofa.description
    const imageUrl = sofa.imageUrl
    const name = sofa.name
    const price = sofa.price



    createImage( imageUrl, altTxt)
    createTitle ( name )
    createPrice (price)
    createDescription ( description)
    createColors ( colors)

}

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
        const select = document.querySelector ("#colors")
        if ( select != null ) {

            colors.forEach((colors) => {
                const option = document.createElement('option')
                option.value = colors
                option.textContent = colors
                select.appendChild (option)
            });
            
        }
    }











/*
fetch(`http://localhost:3000/api/products/${id}`)
.then(function (reponse) {
    if (reponse.ok) {
      return reponse.json(); 
    }
  })
  .then(function (id) { 
    monParametre(id); 
   
})*/