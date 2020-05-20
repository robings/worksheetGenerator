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
