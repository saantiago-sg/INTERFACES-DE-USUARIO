let canvas = document.querySelector("#canvasPaint");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect(); // obtiene la posicion del canvas, left y top
let x = 0;
let y = 0;
let dibujando = false;
let color = 'black';
let grosorP = 1;

// PAINT(DIBUJAR - BORRAR)

function colorInp(c){   // cambio el color que elije el usuario por parametro
color  = c;
}

function grosorPen(g){  // cambio el grosor que elije el usuario por parametro
grosorP = g;
}

canvas.addEventListener('mousedown', function(e){  // esta funcion capta el primer click cuando dibuja el usuario
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    dibujando = true;
});

canvas.addEventListener('mousemove', function(e){   // esta funcion realiza el movimiento por donde se desplaza el usuario con el mouse
    if(dibujando === true){ 
        dibujar(x,y, e.clientX - rect.left, e.clientY - rect.top);
        x = e.clientX;
        y = e.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup', function(e){   // esta funcion capta cuando el mouse deja de dar click
    if(dibujando === true){
        dibujar(x,y, e.clientX - rect.left, e.clientY - rect.top);
        x = 0;
        y = 0;
        dibujando = false;
    }
});

function dibujar(x1, y1, x2, y2){   //paso los parametros de la posiciones
    ctx.beginPath();    // abro el path
    ctx.strokeStyle = color;
    ctx.lineWidth = grosorP;
    ctx.moveTo(x1, y1); // empiezo la linea
    ctx.lineTo(x2, y2); // termino la linea
    ctx.stroke();
    ctx.closePath(); // cierro el path
}

function deleteDraw(){
    color = 'white';
    //clase para icono borrar
}
let btnDel = document.querySelector('#btnDelete').addEventListener('click', deleteDraw);

//  AGREGAR IMAGEN

let inputImage = document.querySelector(".inputImage");

//canvas.addEventListener('click', colorGrey);
    inputImage.onchange = e => {

        let file = e.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = readerEvent => {
            let content = readerEvent.target.result;

            image = new Image();
            image.src = content;
    

    image.onload = function(){
    canvas.width = this.width;
    canvas.height = this.height;

    let imageAspectRatio = (1.0 * this.height) / this.width;
    let imageScaleWidth = canvas.width;
    let imageScaleHeight = canvas.width * imageAspectRatio;

    ctx.drawImage(this, 0, 0, imageScaleWidth, imageScaleHeight);

    
    let imageData = ctx.getImageData(0, 0, imageScaleWidth, imageScaleHeight);
    
    ctx.putImageData(imageData, 0, 0);
        }
    }
}

//FILTROS DE COLORES

function colorNegativo(){

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);    //obtengo los datos de la imagen, altura ancho y pos
    let pixeles = imageData.data;
    
    for (var i = 0; i < pixeles.length; i += 4) { // recorre uno a uno los pixeles de la imagen y cambia el color por el complementario

        pixeles[i] = 255 - pixeles[i]; // rojo
        pixeles[i + 1] = 255 - pixeles[i + 1]; // verde
        pixeles[i + 2] = 255 - pixeles[i + 2]; // azul
      }
      ctx.putImageData(imageData, 0, 0);
      }
let btnNegativo = document.querySelector("#btnNegativo").addEventListener("click", colorNegativo);


function colorBrillo(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);    //obtengo los datos de la imagen, altura ancho y pos
    let pixeles = imageData.data;
   
    for (var i = 0; i < pixeles.length; i += 4) { // recorre uno a uno los pixeles de la imagen y cambia el color por el complementario
        
        pixeles[i] = (255/3) + pixeles[i]; // rojo
        pixeles[i + 1] = (255/3) + pixeles[i + 1]; // verde
        pixeles[i + 2] = (255/3) + pixeles[i + 2]; // azul   
    }
ctx.putImageData(imageData, 0, 0); 
}
let btnBrillo = document.querySelector("#btnBrillo").addEventListener("click", colorBrillo); 

function colorGris(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixeles = imageData.data;

    for (let i = 0; i < pixeles.length; i += 4) {
        let sum = pixeles[i] + pixeles[i+1] + pixeles[i+2];
        let promedio = parseInt(sum/3);
        pixeles[i] = promedio;
        pixeles[i+1] = promedio;
        pixeles[i+2] = promedio;
      }
      //imageData.data = pixeles;
      ctx.putImageData(imageData, 0, 0);
}
let btnGris = document.querySelector("#btnGris").addEventListener("click", colorGris);

function colorSepia(){

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixeles = imageData.data;
    let numPixels = imageData.width * imageData.height;
    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixeles[ i * 4 ];
        var g = pixeles[ i * 4 + 1 ];
        var b = pixeles[ i * 4 + 2 ];
 
        pixeles[ i * 4 ] = 255 - r;
        pixeles[ i * 4 + 1 ] = 255 - g;
        pixeles[ i * 4 + 2 ] = 255 - b;
 
        pixeles[ i * 4 ] = ( r *.393 ) + ( g *.769 ) + ( b * .189 );
        pixeles[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        pixeles[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    ctx.putImageData(imageData, 0, 0);
}
let btnSepia = document.querySelector("#btnSepia").addEventListener("click", colorSepia);


function guardarImage(){
let link = document.createElement('a');
let url = canvas.toDataURL();
let filename = 'imagecanvas.jpg';
link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
}
let btnGuardar = document.querySelector("#btnGuardar").addEventListener("click", guardarImage);