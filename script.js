window.onload = function () {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Frontend',
            foto: 'https://drupal.ed.team/sites/default/files/imagenes-cdn-edteam/2019-03/Redes%20Enrutammiento.png',
            precio: 150
        },
        {
            id: 2,
            nombre: 'Backend',
            foto: 'https://drupal.ed.team/sites/default/files/styles/medium/public/imagenes-cdn-edteam/2019-01/Android%20Material%20Design.png?itok=cuUacCaR',
            precio: 70
        },
        {
            id: 3,
            nombre: 'Dart',
            foto: 'https://drupal.ed.team/sites/default/files/styles/medium/public/imagenes-cdn-edteam/2018-12/Dart.png?itok=Ul2YVOuq',
            precio: 25
        },
        {
            id: 4,
            nombre: 'Flutter',
            foto: 'https://drupal.ed.team/sites/default/files/styles/medium/public/imagenes-cdn-edteam/2018-12/Flutter.png?itok=MpF412ML',
            precio: 30
        },
        {
            id: 5,
            nombre: 'DW en Java',
            foto: 'https://drupal.ed.team/sites/default/files/styles/medium/public/courses/images/java-web.jpg',
            precio: 30
        },
        {
            id: 6,
            nombre: 'React JS',
            foto: 'https://drupal.ed.team/sites/default/files/imagenes-cdn-edteam/2019-04/React%20Rutas%20manejo%20de%20estados%20%281%29.png',
            precio: 15
        }
    ]
    
    let $$items = document.querySelector('#items');
    
    let carrito = [];
    
    let total = 0;
    
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    
    // Funciones
    function renderItems () {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            //Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('card-img');
            miNodoImagen.setAttribute('src',info['foto']);
            
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = 'S/.' + info['precio'] ;
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', agregarCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $$items.appendChild(miNodo);
        }
    }
    function agregarCarrito () {
        //Añadimos al localStorage
        localStorage.setItem( 'indice',this.getAttribute('marcador') );
        // Anyadimos el Nodo a nuestro carrito
        // carrito.push()

        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();

    }

    function renderizarCarrito () {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Generamos los Nodos a partir de carrito
        carrito=localStorage.getItem('indice');
        carrito.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-left');
            miNodo.textContent = `${miItem[0]['nombre']} -S/. ${miItem[0]['precio']}`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger');
            miBoton.textContent = 'Eliminar producto';
            miBoton.setAttribute('posicion', indice);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }
    
    function borrarItemCarrito () {
        // Obtenemos la posicion que hay en el boton pulsado
        let posicion = this.getAttribute('posicion');
        // Borramos la posicion que nos interesa
        carrito.splice(posicion, 1);
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }
    
    function calcularTotal () {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
        totalAviso = totalDosDecimales;
        
    
    }
    
    
    
    // Eventos
    
    // Inicio
    renderItems();  
    
    
} 

function mostrarAviso(){
    var nombre = document.getElementById('txtnombre').value;
    var email = document.getElementById('txtemail').value;
    alert( 'Su compra ha sido registrada' + ' Nombre: '+ nombre + ' Correo: ' + email);
}
function nuevaCompra(){
    alert( 'Se borrarán los datos');
}