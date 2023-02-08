
const orderId = getOrderId()




function getOrderId() {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get("orderId")
    
    }