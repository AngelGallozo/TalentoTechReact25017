const sumar=function(a,b){
    return a+b;
}

const btnNuevo = document.getElementsByClassName("btn-nuevo")[0];
if (btnNuevo) {
    btnNuevo.addEventListener("click", function() {
        alert(sumar(25,27));
    });
} else {
    console.error("No se encontró el botón con la clase 'btn-nuevo'");
}