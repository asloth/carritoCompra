window.onload = function () {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Frontend',
            foto: 'https://pbs.twimg.com/media/DAkzwVJXYAAkl8D.jpg',
            precio: 150
        },
        {
            id: 2,
            nombre: 'Backend',
            foto: 'https://i.mdel.net/i/db/2018/10/999524/999524-500w.jpg',
            precio: 70
        },
        {
            id: 3,
            nombre: 'Fundamentos de Java',
            foto: 'https://i.mdel.net/i/db/2019/3/1082532/1082532-500w.jpg',
            precio: 25
        },
        {
            id: 4,
            nombre: 'Master en Phyton',
            foto: 'https://em.wattpad.com/3a85d3ae5dbd443af93cf63f4a8f35b6d9d91603/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6f38576136576b4571325a6f43773d3d2d3532363437303832332e313530643339343432343731383765613539363236343634313237392e6a7067?s=fit&w=720&h=720',
            precio: 30
        },
        {
            id: 5,
            nombre: 'Fundamentos de Cloud Computing',
            foto: 'https://uustuus.ee/wp-content/uploads/2017/02/pasha-harulia7.jpg',
            precio: 30
        },
        {
            id: 6,
            nombre: 'La integral y sus aplicaciones',
            foto: 'https://pbs.twimg.com/media/DAkzwVJXYAAkl8D.jpg',
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