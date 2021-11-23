export default function cart() {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = document.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const cartTableTotal = document.querySelector('.card-table__total')
    const modalForm = document.querySelector('.modal-form')
    const nameCustomer = modalForm.elements.nameCustomer
    const phoneCustomer = modalForm.elements.phoneCustomer

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
    
        const newCart = cart.filter(good => {
            return good.id !== id
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if(good.id === id) {
                good.count++
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if(good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
                
            }
            return good
        })
    
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('getGoods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ? 
                     JSON.parse(localStorage.getItem('cart')) : []
        
        if(cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if(good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const renderCartGoods = (goods) => {
        cartTable.innerHTML = ''

        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${good.count}</td>
                <td><button class="cart-btn-plus"">+</button></td>
                <td>${good.price * +good.count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `

            cartTable.append(tr)

            tr.addEventListener('click', (e) => {
                if(e.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(good.id)
                }
            })
            cartTableTotal.innerHTML = '' 
        })
    }

    const sendForm = () => {
        const testURL = 'https://jsonplaceholder.typicode.com/posts'
        const cartArray = localStorage.getItem('cart') ? 
                    JSON.parse(localStorage.getItem('cart')) : []

        fetch(testURL, {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: nameCustomer.value,
                phone: phoneCustomer.value
            })
        }).then(() => {
            cart.style.display = ''

            modalForm.reset()
        })
    }

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        sendForm()
    })
    cartBtn.addEventListener('click', function() {
        cart.style.display = 'flex'

        const cartArray = localStorage.getItem('cart') ? 
              JSON.parse(localStorage.getItem('cart')) : []

        renderCartGoods(cartArray)

    })

    closeBtn.addEventListener('click', function() {
        cart.style.display = ''
    })

    cart.addEventListener('click', (e) => {
        if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
            cart.style.display = ''
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.style.display = ''
        }
    })

    if(goodsContainer) {
        goodsContainer.addEventListener('click', (e) => {
            if(e.target.closest('.add-to-cart')) {
                const buttonToCart = e.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id
                addToCart(goodId)
            }
        })
    }
}
