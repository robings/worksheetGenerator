document.querySelector('.generate').addEventListener('click', () => {
    if(document.querySelectorAll('input')[0].value < 0 ||
        document.querySelectorAll('input')[1].value < 0) {
        alert('No minus numbers')
    } else if(document.querySelectorAll('input')[0].value === '' ||
        document.querySelectorAll('input')[1].value === '') {
        alert('A minimum number and maximum number are required')
    } else {
        console.log('generating...')
        let questions = generateWorksheetQuestions()
        // console.log(questions)
        document.getElementById('worksheet').innerHTML = generateWorksheetView(questions)

        document.querySelector('.print').addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            printWorksheet()
        })
    }
})

function generateRandomNo (minNum, maxNum) {
    return Math.floor(Math.random()*(maxNum-minNum+1)+minNum)
}
