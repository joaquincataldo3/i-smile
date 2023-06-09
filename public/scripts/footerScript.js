window.addEventListener('load', () => {

    const footerIconsContainer = document.querySelectorAll('.footer-icon-container')
    const footerDataIconsContainer = document.querySelectorAll('.mobile-footer-data-icon-container')
    const dataXContainer = document.querySelectorAll('.x-container')
    const closeFooterDataBtn = document.querySelectorAll('.close-footer-data')
    const addressBtn = document.querySelector('.open-map');
    const copyAddress = document.querySelector('.copy-address');
    const copyNumber = document.querySelector('.copy-number');
    const callNumber = document.querySelector('.call-number');

    // logica para clickear iconos en footer mobile
    footerIconsContainer.forEach((icon, indexIcon) => {
        icon.addEventListener('click', () => {
            // como estan separados los iconos de la data de cada uno
            // pregunto si el index del icon es igual al index de la data
            // y agrego clase
            for (let indexData = 0; indexData < footerDataIconsContainer.length; indexData++) {
                if (indexIcon === indexData) {
                    footerDataIconsContainer[indexData].classList.add('mobile-footer-data-icon-container-active')
                }
            }

        })
    });

    dataXContainer.forEach((item, indexItem) => {
        item.addEventListener('click', () => {
            for (let indexData = 0; indexData < footerDataIconsContainer.length; indexData++) {
                if (indexItem === indexData) {
                    footerDataIconsContainer[indexData].classList.remove('mobile-footer-data-icon-container-active')
                }
            }
        })
    })


    closeFooterDataBtn.forEach((btn, indexBtn) => {
        btn.addEventListener('click', () => {
            for (let indexFooterData = 0; indexFooterData < footerDataIconsContainer.length; indexFooterData++) {
                if (indexBtn == indexFooterData) {
                    footerDataIconsContainer[indexBtn].classList.remove('mobile-footer-data-icon-container-active')
                }
            }
        })
    })

    //Para llamar cuando toca
    const phoneNumber = '+541159442644'
    callNumber.addEventListener('click', () => {
        window.location.href = `tel:${phoneNumber}`;
    });

    copyNumber.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber)
        copyNumber.innerHTML = 'Número copiado'
        setTimeout(() => {
            copyNumber.innerHTML = 'Copiar número de teléfono en portapapeles'
        }, 2000)
    })

    // Para copiar al portapapeles
    const address = 'Avenida Santa Fé 2911 3 F, C1425 Buenos Aires'
    copyAddress.addEventListener('click', () => {
        navigator.clipboard.writeText(address)
        copyAddress.innerHTML = 'Dirección copiada'
        setTimeout(() => {
            copyAddress.innerHTML = 'Copiar dirección en el portapapeles'
        }, 2000)
    })

    //Para abrir maps
    addressBtn.addEventListener('click', () => {
        window.open('https://goo.gl/maps/tt2tMzZsEzj7UYxa9', '_blank');
    });

})