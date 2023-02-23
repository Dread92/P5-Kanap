// On récupère l'élement orderId depuis l'URL
function getOrderId() {
    return new URLSearchParams(location.search).get("orderId")    
}
// on créé l'élement dans le HTML et on lui assigne getOrderId afin que le numéro de commande soit affiché
document.getElementById("orderId").innerText = getOrderId()
// on efface la totalité du localStorage
localStorage.clear()