document.querySelector('.generate').addEventListener('click', () => {
    if (validateInput()) {
        displayError(validateInput())
    } else {
        let noOfQuestions = countQuestions()
        document.querySelector('.error-message').style.display = 'none'
        document.querySelector('.error-message').textContent = ''

        let questions = generateWorksheetQuestions()
        document.getElementById('worksheet').innerHTML = generateWorksheetView(questions)
        document.getElementById('answersheet').innerHTML = generateAnswersheetView(questions)

        if(document.getElementById('customBoxFlag').checked === true) {
            let customQuestionText = document.getElementById('customBoxText').value
            document.querySelector('#customBox .questionNumber').textContent = `Q${noOfQuestions}.`
            document.querySelector('#customBox .customQuestion').textContent = customQuestionText
            document.getElementById('customBox').style.display = 'block'
        } else {
            document.getElementById('customBox').style.display = 'none'
        }

        document.getElementById('totalPossibleScore').innerText = `/ ${noOfQuestions}`

        document.querySelector('.print').addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            printWorksheet()
        })
    }
})

document.querySelector('.worksheet-section').children[7].addEventListener('change', () => {
    let noOfQuestions = countQuestions()
    document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
})

document.querySelector('.worksheet-section').children[8].addEventListener('click', (e) => {
    if (document.querySelectorAll('.worksheet-section').length === 1) {
        displayError('Cannot delete the last section')
    } else {
        e.currentTarget.parentElement.remove()
        let noOfQuestions = countQuestions()
        document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
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

    document.querySelectorAll('.worksheet-section')[lastSection].children[7].addEventListener('change', () => {
        let noOfQuestions = countQuestions()
        document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
    })

    document.querySelectorAll('.worksheet-section')[lastSection].children[8].addEventListener('click', (e) => {
        if (document.querySelectorAll('.worksheet-section').length === 1) {
            displayError('Cannot delete the last section')
        } else {
            e.currentTarget.parentElement.remove()
            let noOfQuestions = countQuestions()
            document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
        }
    })
})

document.getElementById('customBoxFlag').addEventListener('change', () => {
    document.getElementById('noOfQuestionsDisplay').textContent = countQuestions()
    if(document.getElementById('customBoxFlag').checked === true) {
        document.getElementById('maxQuestionsDisplay').textContent = '21'
        document.getElementById('customBoxText').style.display = 'block'
    } else {
        document.getElementById('maxQuestionsDisplay').textContent = '28'
        document.getElementById('customBoxText').style.display = 'none'
    }
})

document.getElementById('imageFlag').addEventListener('change', () => {
    if(document.getElementById('imageFlag').checked === true) {
        document.querySelector('main img').style.display = 'block'
    } else {
        document.querySelector('main img').style.display = 'none'
    }
})

function countQuestions() {
    let totalQuestions = 0
    let worksheetSections = document.querySelectorAll('.worksheet-section')
    worksheetSections.forEach((worksheetSection) => {
        if (worksheetSection.children[7].value != "") {
            totalQuestions += parseInt(worksheetSection.children[7].value)
        }
    })
    if(document.getElementById('customBoxFlag').checked === true) {
        totalQuestions += 1
    }
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
    let minGreaterThanMaxFlag = false
    let operandErrorFlag = false
    let maxQuestions
    if(document.getElementById('customBoxFlag').checked === true) {
        maxQuestions= 21
    } else {
        maxQuestions = 28
    }

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

        if (parseInt(worksheetSection.querySelectorAll('input')[0].value) >=
            parseInt(worksheetSection.querySelectorAll('input')[1].value)) {
            minGreaterThanMaxFlag = true
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
    message += minGreaterThanMaxFlag ? 'Minimum number cannot be greater than or equal to maximum number. ' : ''
    message += operandErrorFlag ? 'Operand error. ' : ''

    if (totalQuestions > maxQuestions) {
        message += `${maxQuestions} is the maximum number of questions that will fit on the page.`
    }

    return message
}
