function generateNumberForQuestions() {
    let nos = document.querySelectorAll('input')
    minVal=parseInt(nos[0].value)
    maxVal=parseInt(nos[1].value)

    return generateRandomNo(minVal, maxVal)
}

function generateWorksheetQuestions() {
    let questions = [];

    for (let i=0; i < 10; i++)
    {
        let x = generateNumberForQuestions()
        let y = generateNumberForQuestions()
        let operand = document.querySelector('select').value
        if(operand === 'All') {
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

        operand = operand == '×' ? operand = '&#215;' : operand
        operand = operand == '÷' ? operand = '&#247;' : operand

        //console.log(`Operand: ${operand}`)

        let boxPos = generateRandomNo(1,5)
        let answer
        let checkedQuestion
        switch(operand) {
            case '+':
                answer = x + y
                break
            case '-':
                checkedQuestion = checkMinusAnswer(x, y)
                x = checkedQuestion[0]
                y = checkedQuestion[1]
                answer = checkedQuestion[2]
                break
            case '&#215;':
                checkedQuestion = checkMultiplyAnswer(x, y)
                x = checkedQuestion[0]
                y = checkedQuestion[1]
                answer = checkedQuestion[2]
                break
            case '&#247;':
                checkedQuestion = checkDivideAnswer(x, y)
                x = checkedQuestion[0]
                y = checkedQuestion[1]
                answer = checkedQuestion[2]
                break
            default:
                answer='opps'
                break
        }


        questions.push({ x, y, operand, boxPos, answer })

    }
    return questions;
}

function checkMinusAnswer(x, y) {
    let checkedQuestion = []

    while((x-y) < 0) {
        x = generateNumberForQuestions()
        y = generateNumberForQuestions()
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x - y
    return checkedQuestion
}

function checkMultiplyAnswer(x, y) {
    let checkedQuestion = []

    while( x > 12 || y > 12) {
        x = generateNumberForQuestions()
        y = generateNumberForQuestions()
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x * y
    return checkedQuestion
}

function checkDivideAnswer(x, y) {
    let checkedQuestion = []

    while(x%y != 0 || x === 0 || y === 0) {
        x = generateNumberForQuestions()
        y = generateNumberForQuestions()
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x / y
    return checkedQuestion
}
