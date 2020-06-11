document.querySelector('.generate').addEventListener('click', () => {
    if (validateInput()) {
        displayError(validateInput())
    } else {
        document.querySelector('.error-message').style.display = "none"
        document.querySelector('.error-message').textContent = ""
        let questions = generateWorksheetQuestions()
        document.getElementById('worksheet').innerHTML = generateWorksheetView(questions)
        document.getElementById('totalPossibleScore').innerText = `/ ${questions.length}`

        document.querySelector('.print').addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            printWorksheet()
        })
    }
})

document.querySelector('.worksheet-section').children[7].addEventListener('blur', () => {
    let noOfQuestions = countQuestions()
    document.getElementById('noOfQuestions').textContent = `No. of Questions: ${noOfQuestions} (max 28)`
})

document.querySelector('.worksheet-section').children[8].addEventListener('click', (e) => {
    if (document.querySelectorAll('.worksheet-section').length === 1) {
        displayError("Cannot delete the last section")
    } else {
        e.currentTarget.parentElement.remove()
        let noOfQuestions = countQuestions()
        document.getElementById('noOfQuestions').textContent = `No. of Questions: ${noOfQuestions} (max 28)`
    }
})

document.querySelector('.add-section').addEventListener('click', () => {
    document.querySelector('.error-message').textContent = ""
    document.querySelector('.error-message').style.display = "none"

    let newElement = document.createElement('div')
    newElement.setAttribute("class", "worksheet-section")

    let newSection = `<label>Min No: </label><input type="number" />
                    <label>Max No: </label><input type="number" />
                    <label>Operand:</label>
                    <select>
                        <option>+</option>
                        <option>-</option>
                        <option>&#215;</option>
                        <option>&#247;</option>
                        <option>All</option>
                    </select>
                    <label >No. of Questions: </label><input type="number" />
                    <div class="button delete float-right">Delete</div>`

    newElement.innerHTML = newSection

    document.getElementById('worksheetSectionSettings').appendChild(newElement)

    let lastSection = document.querySelectorAll('.worksheet-section').length - 1

    document.querySelectorAll('.worksheet-section')[lastSection].children[7].addEventListener('blur', () => {
        let noOfQuestions = countQuestions()
        document.getElementById('noOfQuestions').textContent = `No. of Questions: ${noOfQuestions} (max 28)`
    })

    document.querySelectorAll('.worksheet-section')[lastSection].children[8].addEventListener('click', (e) => {
        if (document.querySelectorAll('.worksheet-section').length === 1) {
            displayError("Cannot delete the last section")
        } else {
            e.currentTarget.parentElement.remove()
            let noOfQuestions = countQuestions()
            document.getElementById('noOfQuestions').textContent = `No. of Questions: ${noOfQuestions} (max 28)`
        }
    })
})

function generateRandomNo(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}

function countQuestions() {
    let totalQuestions = 0
    let worksheetSections = document.querySelectorAll('.worksheet-section')
    worksheetSections.forEach((worksheetSection) => {
        if (worksheetSection.children[7].value != "") {
            totalQuestions += parseInt(worksheetSection.children[7].value)
        }
    })
    return totalQuestions
}

function validateInput() {
    let message = ''
    let totalQuestions = countQuestions()
    let worksheetSections = document.querySelectorAll('.worksheet-section')
    let negNosMessageFlag = false
    let nosRequiredFlag = false
    let digitsOnlyFlag = false
    let noOfQuestionsFlag = false
    let operandErrorFlag = false

    worksheetSections.forEach((worksheetSection) => {
        if (worksheetSection.querySelectorAll('input')[0].value < 0 ||
            worksheetSection.querySelectorAll('input')[1].value < 0 ||
            worksheetSection.querySelectorAll('input')[2].value < 0) {
            negNosMessageFlag = true
        }
        if (worksheetSection.querySelectorAll('input')[0].value === '' ||
            worksheetSection.querySelectorAll('input')[1].value === '') {
            nosRequiredFlag = true
        }
        if (!worksheetSection.querySelectorAll('input')[0].value.match(/^\d+$/) ||
            !worksheetSection.querySelectorAll('input')[1].value.match(/^\d+$/) ||
            !worksheetSection.querySelectorAll('input')[2].value.match(/^\d+$/)) {
            digitsOnlyFlag = true
        }
        if (worksheetSection.querySelectorAll('input')[2].value === '') {
            noOfQuestionsFlag = true
        }

        if (!worksheetSection.querySelector('select').value.match(/^[+-×÷]$/) &&
            worksheetSection.querySelector('select').value != "All") {
            operandErrorFlag = true
        }
    })

    message += negNosMessageFlag ? 'Negative numbers cannot be entered into the form. ' : ''
    message += nosRequiredFlag ? 'A minimum number and maximum number are required. ' : ''
    message += digitsOnlyFlag ? 'Only numbers can be entered in the form. ' : ''
    message += noOfQuestionsFlag ? 'Please enter a number of questions. ' : ''
    message += operandErrorFlag ? 'Operand error. ' : ''

    if (totalQuestions > 28) {
        message += '28 is the maximum number of questions that will fit on the page.'
    }

    return message
}
