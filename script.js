document.querySelector('.generate').addEventListener('click', () => {
    console.log('generating...')
    let questions = generateWorksheetQuestions()
    console.log(questions)
    document.getElementById('worksheet').innerHTML = generateWorksheet(questions)

    document.querySelector('.print').addEventListener('click', (e) => {
        e.stopImmediatePropagation()
        printWorksheet()
    })
})

