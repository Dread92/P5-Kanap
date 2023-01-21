
/* URLparams */
/* window.location.href 
    window.location.search
*/ 
const queryString = window.location.search
const parametreUrl = new URLSearchParams(queryString); //Recupere la 'queryString' de l'URL
const  id =  parametreUrl.get("id"); // Recupere la valeur de 'id' dans l'URL





fetch(`http://localhost:3000/api/products/${id}`)
.then(function (reponse) {
    if (reponse.ok) {
      return reponse.json(); 
    }
  })
  .then(function (id) { 
    dataFlow(id); 

})

document.title = ` Choix de vote Kanap`

function dataFlow(sofa) {
   
    

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


        productToPurchase(id)
    }



    function productToPurchase(id) {
        const button = document.querySelector('#addToCart')

        button.addEventListener("click", () => {


            const colors = document.querySelector('#colors').value
            const quantity = document.querySelector('#quantity').value



            const purchase = {
                id: id,
                color: colors,
                quantity: Number(quantity),
                name: articleName
            }
       
    
            if (orderIncorrect(purchase, colors, quantity)) return
            addToCart(purchase, colors)
           
         
        })
    }

    function orderIncorrect ( colors, quantity){
        if
            (colors == null || colors == ""|| quantity == null || quantity == 0 || quantity < 1 || quantity > 100){
                (alert ("Sélectionnez une couleur et une quantité entre 1 et 100"))    
               return true
        }} 




        function addToCart (purchase,colors){
            let cart = JSON.parse(localStorage.getItem("Cart"))

            if (cart == null){
                cart=[]
                cart.push(purchase)
                localStorage.setItem("Cart", JSON.stringify(cart))
               
            }

            else if (cart != null){
                for(i=0; i<cart.length; i++) {
                    if(
                        cart[i].id = purchase.id &&
                        cart[i].colors==colors
                    ){
                        return(
                            cart[i].quantity = Math.min(cart[i].quantity+purchase.quantity,100),
                            localStorage.setItem("Cart", JSON.stringify(cart))
                            
                        )

                    }
                }
            

            for (i=0; i< cart.length; i++){
                if(cart[i].id == purchase.id &&
                    cart[i].colors != colors ||
                    cart[i].id != purchase.id
                     )
                     {
                        return(
                            cart.push(purchase),
                            localStorage.setItem("Cart", JSON.stringify(cart)),
                           
                            redirectToCart()
                            
                        )
                     }
            }

        }

        }





        function confirmation(purchase){
            let cart = JSON.parse(localStorage.getItem("Cart"))
        }


        function redirectToCart() {
            window.location.href = "cart.html"
          }
          
