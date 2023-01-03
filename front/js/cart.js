/* cart js page */

const cart= [];

getStorage()



function getStorage(){

    const numberOfProducts= localStorage.length;

for (let i=0 ; i < numberOfProducts; i++){
    const item=localStorage.getItem(localStorage.key(i))
    const itemProduct = JSON.parse(item)
    cart.push(itemProduct)
}
}




