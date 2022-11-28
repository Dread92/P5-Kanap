
/* URLparams */ 
/* window.location.href 
    window.location.search
*/ 
const queryString = window.location.search
const parametreURL = new URLSearchParams(queryString); //Recupere la 'queryString' de l'URL
const  id =  urlParameters.get("id"); // Recupere la valeur de 'id' dans l'URL
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
.then ((response)=> response.json ())
.then ((res) => console.log(res))



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