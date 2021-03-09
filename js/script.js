/*Variables principales*/ 
const productList = []
const cart = [];
var counter = 0, auxCounter = 3;

/*Clase*/
class Product{
    constructor(id,name,type,price,description,stock,img,qty){
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = parseFloat(price);
        this.description = description;
        this.stock = parseInt(stock);
        this.img = img;
        this.qty = qty;
    }
    sold(){
        this.stock -= 1;
    }
}
/*Botón ver más */
$("#btn-SM").click(addCards);
/*Funciones */

function gettingLocalStorage(){
    let cartArray = localStorage.getItem("cart");
    if(cartArray != null){
        let aux = JSON.parse(cartArray);
        console.log(typeof(aux))
        for (const i of aux){
            let product = new Product(i.id,i.name,i.type,i.price,i.description,i.stock,i.img,i.qty)
            cart.push(product);
            createCartModal(product);
        }
    }
}
function createCartModal(product){
    newElement(`#cartModalBody`,`<tr id="cartModalProduct${product.id}">
                                                    <td class="w-25">
                                                        <img src="${product.img}" class="img-fluid img-thumbnail" alt="Sheep">
                                                    </td>
                                                    <td>${product.name}</td>
                                                    <td>$${product.price}</td>
                                                    <td class="qty">${product.qty}</td>
                                                    <td>$${product.price * product.qty}</td>
                                                    <td>
                                                    <a href="#" class="btn btn-danger btn-sm btn-delete">
                                                        <i class="fa fa-times"></i>
                                                    </a>
                                                    </td>
                                                </tr>`)
  $(".btn-delete").click(() => deleteCartItem(product));

}
function refreshCartModal(product){
    let element = document.getElementById(`cartModalProduct${product.id}`);
    element.innerHTML= `  <td class="w-25">
                                <img src="${product.img}" class="img-fluid img-thumbnail" alt="Sheep">
                            </td>
                            <td>${product.name}</td>
                            <td>$${product.price}</td>
                            <td class="qty">${product.qty}</td>
                            <td>$${product.price * product.qty}</td>
                            <td>
                            <a href="#" class="btn btn-danger btn-sm btn-delete">
                                <i class="fa fa-times"></i>
                            </a>
                            </td>`
    $(".btn-delete").click(() => deleteCartItem(product));
}
function addCards(){
    for (counter; counter <auxCounter; counter++){
        let product = new Product(data[counter].id,data[counter].name,data[counter].type,data[counter].price,data[counter].description,data[counter].stock,data[counter].img);
        newProduct(data[counter]);
        productList.push(product);
    }
    auxCounter += 3;
}

function newProduct(product){
    newElement("#card-deck",`<div class="card col-md-4">
                                <div class="card-head">
                                    <img src="${product.img}" alt="" class="card-img-top w-100">
                                </div>
                                    <p class="card-product">${product.name}</p>
                                    <span class="card-price">$${product.price}</span>
                                    <div class="card-button">
                                    <button type="button" class="btn btn-light" data-toggle="modal" data-target="#product${product.id}"><i class="gg-eye"></i></button>
                                    <button id="${product.id}" class="btn btn-primary">Agregar al carrito</button>
                                    </div>
                            </div>`)
    newElement("#card-deck",`<div class="modal fade" id="product${product.id}" tabIndex="-1" role="dialog" aria-labelledby="modalProduct${product.id}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="modalProduct${product.id}">${product.name}</h5>
                                            </button>
                                            </div>
                                        <div class="modal-body">
                                            <img class="modal-img" src="${product.img}"></img>
                                            <div class="modal-description">
                                                <p>Nombre: ${product.name}</p>
                                                <p>Precio: $${product.price}</p>
                                                <p>Descripción: ${product.description}</p>

                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    $(`#${product.id}`).click( function () {
            if (cart == "") {
                product.qty = 1;
                cart.push(product);
                createCartModal(product);
            } else {
                for (let i = 0; i <= cart.length; i++) {
                    if (cart[i] == undefined) {
                        product.qty = 1;
                        cart.push(product);
                        createCartModal(product);
                        break;
                    } else if (product.id == cart[i].id) {
                        cart[i].qty += 1;
                        product.qty = cart[i].qty;
                        refreshCartModal(product);
                        break;
                    }
                };
            }
            localStorage.setItem("cart",JSON.stringify(cart));
        });
        
        
    }

function deleteCartItem(product){
    console.log(".")
    for(let i= 0;i<cart.length;i++){
        if(cart[i].id == product.id){
            console.log(product.id)
            cart.splice(i,1)
        }
    }
}
function newElement(key,value){
    $(key).append(value);
}
/*Llamada a funciones*/
gettingLocalStorage();
addCards();

