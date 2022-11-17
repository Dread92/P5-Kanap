fetch ("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => getProduct(data))



function getProduct(dataproduct){
console.log(dataproduct)
const imageUrl =dataproduct[1].imageUrl
console.log("url de l'image, imageUrl")


const anchor = document.createElement("a");
anchor.href = "http://localhost:3000/images/kanap02.jpeg"
anchor.text ="un super canap"
const items=  document.querySelector("#items")

    items.appendChild(anchor)
    console.log("Nous avons ajouté le lien")
    }




