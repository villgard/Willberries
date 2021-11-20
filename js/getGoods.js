export default function getGoods() {
    const links = document.querySelectorAll('.navigation-link')
    const URL = '/db/db.json'

    const getData = () => {
        fetch(URL)
        .then((res) => res.json())
        .then((data) => { 
            console.log(data)
            localStorage.setItem('getGoods', JSON.stringify([...data]));
        })
    }

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            getData()
        })
    })
}
