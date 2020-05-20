document.querySelector('.generate').addEventListener('click', () => {
    console.log('generating...')
    let questions = generateWorksheetQuestions()
    // console.log(questions)
    document.getElementById('worksheet').innerHTML = generateWorksheetView(questions)

    document.querySelector('.print').addEventListener('click', (e) => {
        e.stopImmediatePropagation()
        printWorksheet()
    })
})

function generateRandomNo (minNum, maxNum) {
    return Math.floor(Math.random()*(maxNum-minNum+1)+minNum)
}
