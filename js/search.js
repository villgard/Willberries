export default function search() {
    const searchField = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    searchField.addEventListener('input', (e) => {
        // console.log(e.target.value)
    })
 
    searchBtn.addEventListener('click', () => {
        let searchResult = searchField.value || 'Чтобы что-нибудь найти - надо что-нибудь ввести)'
        console.log(searchResult)
    })
}
