console.log('javascript is already loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location= search.value

    messageOne.textContent = 'loading ..'
    messageTwo.textContent = ''
    
fetch('http://localhost:3000/weather?address='+location). then((response) => {
    response.json(). then((data) => {
        if(data.error){
            return console.log(data.error),
            messageOne.textContent = data.error,
            messageTwo.textContent =''
        }
        console.log(data.location)
        console.log(data.forecast),
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })
})

    console.log(location)
})
