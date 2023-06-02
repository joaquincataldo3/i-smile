export function activateClass(array) {
    //El array que llegan son los nombres de las clases de las funciones
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`).classList.add(`${element}-active`);
    });
}
export function deactivateClass(array) {
    //El array que llegan son los nombres de las clases de las funciones
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`)?.classList.remove(`${element}-active`);
    });
}

export function changeCartProductDimension() {
    const productCards = document.querySelectorAll('.cart-product-card');
    // Le saco la clase multiple por las dudas que no haya 2
    document.querySelector('.cart-products-section').classList.remove('multiple-cart-products-section');
    productCards.forEach(card => {
        card.classList.remove('two-products');
        card.classList.remove('multiple-products');
    });

    if (productCards.length < 3) { //Menos de 3 productos
        if (productCards.length == 2) {
            productCards.forEach(card => {
                card.classList.add('two-products');
            });
        }
        if (productCards.length == 0) {
            document.querySelector('.cart-products-section').innerHTML =
                `<p class ="no-items-msg">No tienes productos en el carro</p>`;
        }
    } else {//3 o mas productos
        document.querySelector('.cart-products-section').classList.add('multiple-cart-products-section');
        productCards.forEach(card => {
            card.classList.add('multiple-products');
        });
    }
}

export function changeWishlistProductDimension() {
    const productCards = document.querySelectorAll('.wishlist-product-card');
    // Le saco la clase multiple por las dudas que no haya 2
    document.querySelector('.wishlist-products-section').classList.remove('multiple-wishlist-products-section');
    productCards.forEach(card => {
        card.classList.remove('two-products');
        card.classList.remove('multiple-products');
    });

    if (productCards.length < 3) { //Menos de 3 productos
        if (productCards.length == 2) {
            productCards.forEach(card => {
                card.classList.add('two-products');
            });
        }
        if (productCards.length == 0) {
            document.querySelector('.wishlist-products-section').innerHTML =
                `<p class ="no-items-msg">No tienes productos en tu wishlist</p>`;
        }
    } else {//3 o mas productos
        document.querySelector('.wishlist-products-section').classList.add('multiple-wishlist-products-section');
        productCards.forEach(card => {
            card.classList.add('multiple-products');
        });
    }
}

export async function addFilesToFormData(formData, fileInputs) {
    // Itero sobre cada uno
    for (let i = 0; i < fileInputs.length; i++) {
        const input = fileInputs[i];
        // Capturo el color_id de ese input
        const inputColorId = input.dataset.colorid;
        // Agarro todos los files asociados a ese input
        const files = input.files;
        for (let j = 0; j < files.length; j++) {
            formData.append(inputColorId, files[j]);
        }
    }
};

export async function addWishlistProduct(productId, colorId) {
    const data = await getLoggedUser();
    if (!data.userId) { //Si dio error el usuario
        return data.meta.msg
    }
    // Armo el body
    let body = {
        userId: data.userId,
        productId,
        colorId
    }
    //Armo el fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    // Enviar la solicitud HTTP utilizando la API Fetch
    fetch(`/api/product/addWishlistProduct`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return
            // TODO: Con esta data crear un cartelito con el mensaje
        })
        .catch(error => console.log(error));
};

export async function removeWishlistProduct(productId, colorId) {
    const data = await getLoggedUser();
    if (!data.userId) { //Si dio error el usuario
        return
    }
    // Armo el body
    let body = {
        userId: data.userId,
        productId,
        colorId
    }
    //Armo el fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    // Enviar la solicitud HTTP utilizando la API Fetch
    fetch('/api/product/removeWishlistProduct', requestOptions)
        .then(response => response.json())
        .then(data => {
            return
            // TODO: Con esta data crear un cartelito con el mensaje

        })
        .catch(error => console.log(error));
};

export async function getLoggedUser() {
    return (await (await fetch(`/api/user/getLoggedUserId`)).json())
};

export async function printWishlistProducts() {
    const data = await getLoggedUser();
    if (!data.userId) { //Si dio error el usuario
        return
    }
    const userId = data.userId;
    //Armo el fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    };
    // Enviar la solicitud HTTP utilizando la API Fetch
    let response = (await (await fetch('/api/product/getWishedProducts', requestOptions)).json());
    let wishedProducts = response.userWishlistProducts;
    // return console.log(response);
    const wishlistProductsSection = document.querySelector('.wishlist-products-section');
    wishlistProductsSection ? wishlistProductsSection.innerHTML = '' : null;
    wishedProducts.forEach(prod => {
        const filename = (prod.wishedProduct.files.find(img => img.colors_id == prod.wishedProductColor.id)).filename;
        wishlistProductsSection ? wishlistProductsSection.innerHTML +=
            `
        <div class="wishlist-product-card" data-colorid="${prod.wishedProductColor.id}" data-productid="${prod.wishedProduct.id}">
                <div class="wishlist-product-img-container">
                    <img src="/img/${filename}" alt="product-image" class="wishlist-product-selected-img">
                </div>
                <div class="wishlist-product-selected-info-qty-container">
                    <div class="wishlist-product-selected-name-remove-container">
                        <p class="wishlist-product-selected-name">${prod.wishedProduct.name}</p>
                        <button class="wishlist-product-selected-remove-btn"><i class='bx bx-x remove-wishlist-product-btn'></i>
                        </button>
                    </div>
                    
                    <div class="quick-add-bag-container">
                        <p class="wishlist-product-selected-color-size">${prod.wishedProductColor.name}</p>
                        <i class='bx bx-shopping-bag quick-add-bag-button'></i>
                        <ul class="wishlist-quick-add-sizes-list">
                            <li class="wishlist-quick-add-size">XS</li>
                            <li class="wishlist-quick-add-size">S</li>
                            <li class="wishlist-quick-add-size">M</li>
                            <li class="wishlist-quick-add-size">L</li>
                        </ul>
                    </div>
                    
                    <div class="wishlist-product-selected-quantity-container">
                        <p class="total">US$ ${prod.wishedProduct.price}</p>
                    </div>
                </div>
            </div>
        ` : null;
    })

};

export function getDeepCopy(arg) {
    return JSON.parse(JSON.stringify(arg));
}

export function adaptProductsToBeListed(products) {
    // Copia profunda para poder editar valores
    products = getDeepCopy(products);
    // Ordeno el array
    products.sort((a, b) => b.id - a.id);
    products.forEach(product => {
        // Aca itero para a cada color de cada producto dejarle las files armadas para pintar en front
        product.colors.forEach(color => {
            color.files = product.files?.filter(file => file.colors_id == color.id);
            // Lo ordeno
            color.files?.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = color.files.indexOf(file);
                    color.files.splice(indexToRemove, 1);//Lo elimino
                    color.files.splice(1, 0, file); //Lo pongo 2do
                }
            });
        })
    });
    return products
}

export async function listenSizesBtns(condition) {//Escucha a todos los quick-sizes => Ultimo boton antes de agregar a la wishlist
    const quickSizes = document.querySelectorAll('.quick-size');
    for (let i = 0; i < quickSizes.length; i++) {
        const btn = quickSizes[i];
        btn.addEventListener('click', handeClickInSizeBtn);
    };
};

export function removeSizesBtnsListener() { //Funcion que va por todos los quick-sizes y le saca el evento
    const quickSizes = document.querySelectorAll('.quick-size');
    for (let i = 0; i < quickSizes.length; i++) {
        const btn = quickSizes[i];
        btn.removeEventListener('click', handeClickInSizeBtn);
    };
}
const handeClickInSizeBtn = async (e) => {//Para manejar el evento 'click'
    const body = document.querySelector('body');
    const quickAddCartContainer = 'add-to-cart-container'
    const blackScreen = 'black-screen';
    const btn = e.target;
    // Capturo al producto
    const productCard = btn.closest('.product-quick-actions-container');
    // Activo la animacion de loading
    productCard.querySelector('.loading-container').classList.add('loading-container-active');
    // Agarro id y colorid
    const productId = productCard.dataset.productid;
    const productColorId = productCard.dataset.colorid;
    await addCartProduct(productId, productColorId); //TODO: COMPLETAR
    setTimeout(() => { //Simula el tiempo de pedido a la api
        // Activo las clases para el popup "Agregaste al carro..."
        body.classList.add('noScroll');
        activateClass([blackScreen, quickAddCartContainer]);
        // Desactivo la animacion de loading una vez complete el pedido a la api
        productCard.querySelector('.loading-container').classList.remove('loading-container-active');
        // Desactivo la clase active del card
        clearQuickActions(productCard);
    }, 1000);




}
export function clearQuickActions(container) { //Vuelve las quickAction del container a predeterminadas
    container?.querySelector('.product-quick-actions-container')?.classList.remove(`product-quick-actions-container-active`)
    container?.querySelector('.quick-cart-container')?.classList.remove('quick-cart-container-active');
    container?.querySelector('.quick-fav-container')?.classList.remove('quick-fav-container-active');
    container?.querySelector('.quick-sizes-container')?.classList.remove('quick-sizes-container-active');
    removeSizesBtnsListener();//Esta funcion es para sacrle el eventListener
}

export async function addCartProduct(productId, colorId) {
    const data = await getLoggedUser();
    if (!data.userId) { //Si dio error el usuario
        return data.meta.msg
    }
    // Armo el body
    let body = {
        userId: data.userId,
        productId,
        colorId
    };
    return console.log(body);
    //Armo el fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    // Enviar la solicitud HTTP utilizando la API Fetch
    fetch(`/api/product/addWishlistProduct`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return
            // TODO: Con esta data crear un cartelito con el mensaje
        })
        .catch(error => console.log(error));
}

export function disableAllPopups(exception) {
    // desabilita todos los popUps, excepto el que se pasa por argumento
    const popups = document.querySelectorAll('.popup');
    popups.forEach(elem=>{
        const className = elem.classList[0];
        elem.classList.remove(`${className}-active`)
    })
}