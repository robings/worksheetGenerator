function generateWorksheetQuestions() {
    let questions = [];

    let worksheetSections = document.querySelectorAll('.worksheet-section')
    let multiplicationRestricted = document.getElementById('multiplicationRestrictionFlag').checked === true;
    let divisionRestricted = document.getElementById('divisionRestrictionFlag').checked === true;

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
                    checkedQuestion = createMultiplyQuestion(minVal, maxVal, multiplicationRestricted)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#247;':
                    checkedQuestion = createDivideQuestion(minVal, maxVal, divisionRestricted)
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
    validateValues(minVal, maxVal, "Minus");
    
    let x, y, checkedQuestion = [];

    do {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    } while((x-y) < 0)

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x - y
    return checkedQuestion
}

function createMultiplyQuestion(minVal, maxVal, restricted) {
    validateValues(minVal, maxVal, "Multiply");
    
    let x, y, checkedQuestion = []

    if (restricted) {
            minVal = minVal > 12 ? 1 : minVal;
            x = generateRandomNo(minVal, 12)
            y = generateRandomNo(minVal, 12)
    } else {
        x = generateRandomNo(minVal, maxVal)
        y = generateRandomNo(minVal, maxVal)
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x * y
    return checkedQuestion
}

function createDivideQuestion(minVal, maxVal, restricted) {
    validateValues(minVal, maxVal, "Divide");
    
    let x, y, checkedQuestion = []

    minVal = minVal === 0 ? 1: minVal;

    let timeOut = 1;

    if (restricted){
        maxVal = maxVal > 144 ? 144 : maxVal;
        minVal = minVal > 144 ? 1 : minVal;

        do {
            x = generateRandomNo(minVal, maxVal);
            y = generateRandomNo(minVal, maxVal);
        } while (x%y != 0 || Math.min(x, y) > 12 || (x/y) > 12);
    } else {
        do {
            x = generateRandomNo(minVal, maxVal);
            y = generateRandomNo(minVal, maxVal);
            timeOut++;
        } while (x%y != 0 && timeOut < 10000);
    }    

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x / y
    return checkedQuestion
}

function generateRandomNo(minNum, maxNum) {
    validateValues(minNum, maxNum, 'Random')
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}

function validateValues(minVal, maxVal, questionType) {
    let functionName = `create${questionType}Question`;

    if (questionType === 'Random') {
        functionName = 'generateRandomNo';
    }

    if (minVal === null || maxVal === null || minVal === undefined || maxVal === undefined) {
        throw new Error (`${functionName}: Value Error`);
    }

    if (!minVal.toString().match(/^\d+$/) || !maxVal.toString().match(/^\d+$/)) {
        throw new Error(`${functionName}: Value Error`);
    }
}

module.exports = {
    createMinusQuestion,
    createDivideQuestion,
    createMultiplyQuestion,
    generateRandomNo,
    validateValues,
}
