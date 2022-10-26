'use strict'


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function makeId(length = 4) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}


function getRandomFont() {
  const index = getRandomIntInclusive(0, 2)
  var fonts = ['Arial', 'Impact', 'David']

  return fonts[index]
}



function getRandomStr() {
  var index = getRandomIntInclusive(0, 14)
  var stringsList = [
    'Are you kidding me?',
    `Let's talk tomorrow`,
    'What the hell?!',
    'Im out',
    'Yes, please',
    'I did it!',
    'please tell me more',
    'what did you do?!',
    'Im not sure about that',
    'That is awesome',
    'All this yours, enjoy',
    'HAHAHA',
    'Im tireddd',
    'Get over it now',
    'I wonnn',
  ]

  return stringsList[index]
}




function renderLine(line) {
  gCtx.beginPath()
  gCtx.textAlign = line.align
  gCtx.lineWidth = 1
  gCtx.font = `${line.size}px ${line.font}` 
  gCtx.fillStyle = line.color
  gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  gCtx.strokeStyle = line.strokeStyle
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
  gCtx.closePath()
}

// main controller
function resizeCanvas() {
  const elContainer = document.querySelector('.edit-meme-canvas')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}