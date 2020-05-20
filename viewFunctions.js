function generateWorksheetView(questions) {
    let worksheetHTML = ''

    questions.forEach((question, key) => {
        let questionHTML = '<div class="questionContainer"><div class="question">'
        questionHTML += `<div>Q${key+1}.</div><div>${question.x}</div><div>&nbsp;${question.operand}&nbsp;</div>`
        questionHTML += `<div>${question.y}</div><div>&nbsp;=&nbsp;</div>`
        questionHTML += '<div class="answerBox"></div><div class="tickBox"></div></div></div>'
        worksheetHTML += questionHTML
    })

    return worksheetHTML
}

function printWorksheet () {
    window.print();
    console.log('printing...')
}