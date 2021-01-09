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

            let x, y
            let boxPos = generateRandomNo(1,5)
            let answer
            let checkedQuestion
            switch(operand) {
                case '+':
                    x = generateRandomNo(minVal, maxVal)
                    y = generateRandomNo(minVal, maxVal)
                    answer = x + y
                    break
                case '-':
                    checkedQuestion = createMinusQuestion(minVal, maxVal)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#215;':
                    checkedQuestion = createMultiplyQuestion(minVal, maxVal)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#247;':
                    checkedQuestion = createDivideQuestion(minVal, maxVal)
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

function createMinusQuestion(minVal, maxVal) {
    let x, y, checkedQuestion = [];

    if (!minVal.toString().match(/^\d+$/) || !maxVal.toString().match(/^\d+$/)) {
        throw new Error("createMinusQuestion: Value Error");
    }


    do {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    } while((x-y) < 0)

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x - y
    return checkedQuestion
}

function createMultiplyQuestion(minVal, maxVal) {
    let x, y, checkedQuestion = []

    do {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    } while( x > 12 || y > 12)

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x * y
    return checkedQuestion
}

function createDivideQuestion(minVal, maxVal) {
    let x, y, checkedQuestion = []

    minVal === 0 ? minVal = 1: minVal
    maxVal > 144 ? maxVal = 144 : maxVal

    do {
        x = generateRandomNo(minVal, maxVal);
        y = generateRandomNo(minVal, maxVal);
    } while (x%y != 0 || Math.min(x, y) > 12 || (x/y) > 12);

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x / y
    return checkedQuestion
}

function generateRandomNo(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}

module.exports = {
    createMinusQuestion,
}
