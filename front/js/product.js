
/* URLparams */
/* window.location.href 
    window.location.search
*/ 
const queryString = window.location.search
const parametreUrl = new URLSearchParams(queryString); //Recupere la 'queryString' de l'URL
const  id =  parametreUrl.get("id"); // Recupere la valeur de 'id' dans l'URL
if (id !=null){
    let sofaPrice = 0
    let imagUrl, altText

}




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

    sofaPrice = price;
    imagUrl= imageUrl;
    altText = altTxt;

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

            })
            
        }
    }
      
    /* add to cart button + values */
    const button= document.querySelector ( '#addToCart')
    if (button != null) {
        button.addEventListener("click", (e) => {
            const colors = document.querySelector('#colors').value
            const quantity = document.querySelector("#quantity").value

            /* if cart is invalid, alert ! */
            if (colors == null || colors == ""|| quantity == null || quantity == 0){

                (alert ("Sélectionnez une couleur et une quantité"))  
                
                return
            }


            
/* local storage */
            registerCart(colors, quantity)
          
            localStorage.setItem(id,JSON.stringify(data))  
            /*redirect to html file if order is valid */
            window.location.href = "cart.html"

        })
    }

    
    function registerCart(colors, quantity){
        const data = {
            id : id,
            colors:colors,
            price:sofaPrice,
            quantity:Number ( quantity),
            imageUrl: imagUrl,
            altTxt: altText,

        }
    }








