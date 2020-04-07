document.querySelector('.generate').addEventListener('click', () => {
    console.log('generating...')
    document.querySelector('.print').addEventListener('click', (e) => {
        e.stopImmediatePropagation()
        printWorksheet()
    })
})

