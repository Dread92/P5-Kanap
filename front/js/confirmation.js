
const orderId = getOrderId()

document.getElementById("orderId").innerText=orderId


function getOrderId() {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get("orderId")
    
    }