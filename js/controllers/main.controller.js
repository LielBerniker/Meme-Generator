'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gElCanvas
var gCtx
var gPos
var gCanvasTop, gCanvasDown, gCanvasMiddle
var gStartPos
var gSavedMemes = []
var gCurrMeme
var gImgsAfterFilter


function onInit() {
  gElCanvas = document.querySelector('.edit-meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  restartCanvasLocations()
  renderGallery()
  
  
  var memes = loadFromStorage(STORAGE_KEY)
  if (memes) gSavedMemes = memes
  // addListeners()
  // resizeCanvas()
}

function toggleMenu() {
  document.body.classList.toggle('menu-opened')
}

function resizeCanvas() {
  const elContainer = document.querySelector('.edit-meme-canvas')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}


function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createCircle(center)
    renderCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  // Getting the clicked position
  const pos = getEvPos(ev)
  // { x: 15, y : 15 }
  if (!isCircleClicked(pos)) return
  setCircleDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const circle = getCircle();
  if (!circle.isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveCircle(dx, dy)
  gStartPos = pos
  renderCanvas()
}

function onUp() {
  setCircleDrag(false)
  document.body.style.cursor = 'grab'
}






function onReplaceSiteToLinkedin() {
  toggleMenu()
  window.open("https://www.linkedin.com/in/saar-fridman/",
    "_blank")
}

function onReplaceSiteToGithub() {
  window.open("https://github.com/saarf77",
    "_blank")
}

