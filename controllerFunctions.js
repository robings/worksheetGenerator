function generateRandomNo (minNum, maxNum) {
    return Math.floor(Math.random()*(maxNum-minNum+1)+minNum)
}

function generateWorksheetQuestions() {
    let questions = [];

    for (let i=0; i < 20; i++)
    {
        let nos = document.querySelectorAll('input')
        minVal=parseInt(nos[0].value)
        maxVal=parseInt(nos[1].value)
        console.log(minVal, maxVal)
        let x = generateRandomNo(minVal, maxVal)
        let y = generateRandomNo(minVal, maxVal)
        let operand = document.querySelector('select').value
        if(operand === "All") {
            let random = generateRandomNo(1,4)
            switch (random) {
                case 1:
                    operand = '+'
                    break
                case 2:
                    operand = '-'
                    break
                case 3:
                    operand = '&#215;'
                    break
                default:
                    operand = '&#247;'
            }

        }

        questions.push({ x, y, operand })

    }
    return questions;
}

function generateWorksheet(questions) {
    let worksheetHTML = ''

    questions.forEach((question, key) => {
        let questionHTML = '<div class="question">'
        questionHTML += `<div>Q${key+1}.</div><div>${question.x}</div><div>&nbsp;${question.operand}&nbsp;</div>`
        questionHTML += `<div>${question.y}</div><div>&nbsp;=&nbsp;</div>`
        questionHTML += '<div class="answerBox"></div><div class="tickBox"></div></div>'
        worksheetHTML += questionHTML
    })

    return worksheetHTML
}

function printWorksheet () {
    window.print();
    console.log('printing...')
}