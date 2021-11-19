export default function cart() {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = document.querySelector('.modal-close')

    cartBtn.addEventListener('click', function() {
        cart.style.display = 'flex'
    })

    closeBtn.addEventListener('click', function() {
        cart.style.display = ''
    })
}
