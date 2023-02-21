function getOrderId() {
    return new URLSearchParams(location.search).get("orderId")    
}

document.getElementById("orderId").innerText = getOrderId()

localStorage.clear()