
/* URLparams */
/* window.location.href 
    window.location.search
*/ 
const id = new URLSearchParams(window.location.search).get("id")
console.log( id)



// on appelle l'API pour qu'elle nous donne l'ID du produit de la page sur laquelle on est// 
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
.catch(function (error) {
    console.log("Message d'erreur : \n" + error);
  });


function dataFlow(sofa) {
    document.title = ` ${sofa.name}`
    
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


        productToPurchase(colors, quantity,id)
    }



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
       
    
            if (orderIncorrect(purchase, colors, quantity)) return
            addToCart(purchase, colors,id)
           
         
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
                purchaseConfirmation(purchase)
            }

            else if (cart != null){
                for(i = 0; i < cart.length; i++) {
                    if(
                        cart[i].id == purchase.id &&
                        cart[i].color == purchase.color
                    ){
                        return(
                            cart[i].quantity = Math.min(cart[i].quantity + purchase.quantity,100),
                            localStorage.setItem("Cart", JSON.stringify(cart)),
                            purchaseConfirmation(purchase)
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
                           
                            purchaseConfirmation(purchase)
                            
                        )
                     }
            }

        }

        }




/*
        function confirmation(purchase){
            let cart = JSON.parse(localStorage.getItem("Cart"))
              function redirectToCart() {
            window.location.href = "cart.html"
          }
        }*/

/*
        function redirectToCart() {
            window.location.href = "cart.html"
          }*/
          
          function purchaseConfirmation(purchase) 
          {
          
            let cart = JSON.parse(localStorage.getItem("Cart"))
           
        
            if (window.confirm(`Votre article a bien été ajouté au panier !`))
             {
                window.location.href = "cart.html"
            } else {
                window.close
            }}

