function generateWorksheetQuestions() {
    let questions = [];

    let worksheetSections = document.querySelectorAll('.worksheet-section')

    worksheetSections.forEach((worksheetSection) => {
        let minVal=parseInt(worksheetSection.children[1].value)
        let maxVal=parseInt(worksheetSection.children[3].value)

        let noOfQuestions = parseInt(worksheetSection.children[7].value)
        let operandChoice = worksheetSection.children[5].value

        for (let i=0; i < noOfQuestions; i++)
        {
            let x = generateRandomNo(minVal, maxVal)
            let y = generateRandomNo(minVal, maxVal)
            let operand

            if(operandChoice === 'All') {
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
            } else {
                operand = operandChoice
            }

            operand = operand == '×' ? operand = '&#215;' : operand
            operand = operand == '÷' ? operand = '&#247;' : operand

            let boxPos = generateRandomNo(1,5)
            let answer
            let checkedQuestion
            switch(operand) {
                case '+':
                    answer = x + y
                    break
                case '-':
                    checkedQuestion = checkMinusAnswer(x, y, minVal, maxVal)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#215;':
                    checkedQuestion = checkMultiplyAnswer(x, y, minVal, maxVal)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#247;':
                    checkedQuestion = checkDivideAnswer(x, y, minVal, maxVal)
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
    })

    return questions;
}

function checkMinusAnswer(x, y, minVal, maxVal) {
    let checkedQuestion = []

    while((x-y) < 0) {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x - y
    return checkedQuestion
}

function checkMultiplyAnswer(x, y, minVal, maxVal) {
    let checkedQuestion = []

    while( x > 12 || y > 12) {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x * y
    return checkedQuestion
}

function checkDivideAnswer(x, y, minVal, maxVal) {
    let checkedQuestion = []

    while(x%y != 0 || x === 0 || y === 0) {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x / y
    return checkedQuestion
}
