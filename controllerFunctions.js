document.querySelector('.generate').addEventListener('click', () => {
    if (validateInput()) {
        document.querySelector('.error-message').textContent = validateInput()
    } else {
        document.querySelector('.error-message').textContent = ""
        console.log('generating...')
        let questions = generateWorksheetQuestions()
        // console.log(questions)
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
        document.querySelector('.error-message').textContent = "Cannot delete the last section"
    } else {
        e.currentTarget.parentElement.remove()
        let noOfQuestions = countQuestions()
        document.getElementById('noOfQuestions').textContent = `No. of Questions: ${noOfQuestions} (max 28)`
    }
})

document.querySelector('.add-section').addEventListener('click', () => {
    document.querySelector('.error-message').textContent = ""

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
            document.querySelector('.error-message').textContent = "Cannot delete the last section"
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

    if (document.querySelectorAll('input')[0].value < 0 ||
        document.querySelectorAll('input')[1].value < 0 ||
        document.querySelectorAll('input')[2].value < 0) {
        message += 'Negative numbers cannot be entered into the form.\n'
    }
    if (document.querySelectorAll('input')[0].value === '' ||
        document.querySelectorAll('input')[1].value === '') {
        message += 'A minimum number and maximum number are required.\n'
    }
    if (document.querySelectorAll('input')[2].value === '') {
        message += 'Please enter a number of questions.\n'
    }
    if (totalQuestions > 28) {
        message += '28 is the maximum number of questions that will fit on the page.'
    }

    return message
}
