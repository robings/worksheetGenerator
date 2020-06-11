function generateWorksheetView(questions) {
    console.log(questions)
    let worksheetHTML = ''

    questions.forEach((question, key) => {
        let questionHTML = '<div class="questionContainer"><div class="question">'
        questionHTML += `<div class="questionNumber">Q${key+1}.</div>`

        if(question.boxPos === 1) {
            questionHTML += '<div class="answerBox"></div>'
        } else {
            questionHTML += `<div>${question.x}</div>`
        }

        questionHTML += `<div>&nbsp;${question.operand}&nbsp;</div>`

        if(question.boxPos === 2) {
            questionHTML += '<div class="answerBox"></div>'
        } else {
            questionHTML += `<div>${question.y}</div>`
        }

        questionHTML += '<div>&nbsp;=&nbsp;</div>'

        if(question.boxPos > 2) {
            questionHTML += '<div class="answerBox"></div>'
        } else {
            questionHTML += `<div>${question.answer}</div>`
        }

        questionHTML += '<div class="tickBox"></div></div></div>'
        worksheetHTML += questionHTML
    })

    return worksheetHTML
}

function printWorksheet () {
    window.print();
}

function displayError (errorMessage) {
    document.querySelector('.error-message').textContent = errorMessage
    document.querySelector('.error-message').style.display = "block"

    setTimeout(function() {
        document.querySelector('.error-message').style.display = "none"
        document.querySelector('.error-message').textContent = ""
    }, 5000)
}
