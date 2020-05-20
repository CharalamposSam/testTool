const textarea = document.querySelector('textarea'),
  numOfChar = document.querySelector('.numOfChar span'),
  button = document.querySelector('button'),
  copyBtn = document.querySelector('.copy'),
  copyLabel = document.querySelector('.copyCont div'),
  lengthNum = document.querySelector('.numOfcharToGenerate'),
  generateBtn = document.querySelector('.generate'),
  alertMessage = document.querySelector('.alertMessage'),
  copied = document.querySelector('.copied'),
  copyAlert = document.querySelector('.copyAlert'),
  generateCharactes = document.querySelector('#generateCharactes'),
  checkboxes = document.querySelectorAll('.checkboxes .container input'),
  checkboxesContainer = document.querySelector('.checkboxes'),
  generateCont = document.querySelector('.generateCont'),
  selectFile = document.querySelector('#selectFile'),
  btnDownloadFile = document.querySelector('.downloadFilesCont button'),
  downloadFileName = document.querySelector('.downloadFilesCont input'),
  downloadFileExt = document.querySelector('.downloadFilesCont p')

textarea.addEventListener('keyup', getTheNumber)
textarea.addEventListener('paste', getTheNumber)

textarea.addEventListener('keydown', backspace)

function getTheNumber() {
  setTimeout(() => {
    const textareaValue = Array.from(textarea.value)
    numOfChar.textContent = textareaValue.length
  }, 10)
}

function backspace(e) {
  if (e.keyCode == 8 || e.keyCode == 46) {
    const textareaValue = Array.from(textarea.value)
    numOfChar.textContent = textareaValue.length
  }
}

function generate() {
  let characters

  if (generateCharactes.value == 'latin') {
    if (checkboxes[1].checked == true && checkboxes[2].checked == false) {
      characters = 'abcdefghijklmnopqrstuvwxyz'
    }
    if (checkboxes[2].checked == true && checkboxes[1].checked == false) {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (checkboxes[1].checked == true && checkboxes[2].checked == true) {
      characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
  } else if (generateCharactes.value == 'greek') {
    if (checkboxes[1].checked == true && checkboxes[2].checked == false) {
      characters = 'αβγδεζηθικλμνξοπρστυφχψω'
    }
    if (checkboxes[2].checked == true && checkboxes[1].checked == false) {
      characters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
    }
    if (checkboxes[1].checked == true && checkboxes[2].checked == true) {
      characters = 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
    }
  } else if (generateCharactes.value == 'chinese') {
    characters = '诶比西迪伊艾弗吉尺杰开吉吾儿贼德'
  }

  if (checkboxes[3].checked == true) {
    characters += '0123456789'
  }
  if (checkboxes[4].checked == true) {
    characters += '!@#$%^&*+_-;'
  }
  console.log(characters)
  let lengthNum = +document.querySelector('.numOfcharToGenerate').value
  let result = ''
  for (let i = 0; i < lengthNum; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  textarea.value = result
  getTheNumber()
}

generateCont.addEventListener('change', () => {
  if (generateCharactes.value == 'chinese') {
    checkboxesContainer.classList.add('disableCheckBox')
    checkboxes.forEach(check => {
      check.checked = false
    })
  } else {
    checkboxesContainer.classList.remove('disableCheckBox')
    checkboxes[1].checked = true
  }
})

lengthNum.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    generate()
  }
})

lengthNum.addEventListener('keyup', () => {
  if (lengthNum.value != '') {
    generateBtn.style.opacity = '1'
    generateBtn.style.cursor = 'pointer'
  } else {
    generateBtn.style.opacity = '.3'
    generateBtn.style.cursor = 'not-allowed'
  }
})

generateBtn.addEventListener('click', () => {
  generate()
})

generateBtn.addEventListener('mouseover', () => {
  if (lengthNum.value != '') {
    alertMessage.style.opacity = 0
  } else {
    alertMessage.style.opacity = 1
  }
})
generateBtn.addEventListener('mouseout', () => {
  alertMessage.style.opacity = 0
})

copyBtn.addEventListener('click', () => {
  if (textarea.value == '') {
    copyAlert.style.opacity = '1'
    setTimeout(() => {
      copyAlert.style.opacity = '0'
    }, 2000)
  } else {
    var copyText = textarea
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
    copied.style.opacity = '1'
    setTimeout(() => {
      copied.style.opacity = '0'
    }, 2000)
  }
})

selectFile.addEventListener('change', () => {
  let val = selectFile.value
  let name = val.split('/')[1]
  let name1 = name.split('.')[0]
  let name2 = name.split('.')[1]
  let ext = name.split('.')[2]
  console.log(ext)
  downloadFileName.value = `${name1}.${name2}`
  downloadFileExt.textContent = `.${ext}`
})

btnDownloadFile.addEventListener('click', () => {
  let newName = downloadFileName.value
  let ext = selectFile.value
  ext = ext.split('.')[2]

  console.log(ext)

  let a = document.createElement('a')
  a.href = selectFile.value
  a.setAttribute('download', `${newName}.${ext}`)
  document.body.appendChild(a)
  a.click()
  a.remove()
})
