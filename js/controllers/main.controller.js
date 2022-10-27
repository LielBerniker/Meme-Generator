'use strict'
const memeNumber = 18
var gCurrImgMeme = null
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gSavedMemes = []
var isMemePage = false
var gElCanvas
var gElLeft
var gElTop 
var gCtx
var gPos
var gCanvasTop, gCanvasDown, gCanvasMiddle
var gStartPos
var gSavedMemes = []
var gCurrMeme
var gImgsAfterFilter


function onInit() {
 

  gElCanvas = document.querySelector('.edit-meme-canvas')
  gElCanvas.addEventListener('click', function(e) {
    getCursorPosition(gElCanvas, e)
}),
  gCtx = gElCanvas.getContext('2d')
  initGMeme()
  if(isMemePage)
  {
    console.log("hrll")
    document.querySelector(".gallery-container").innerHTML = ''
    document.querySelector('section[class = "edit-container flex"]').style.display ='none';
    document.querySelector(".gallery-container").style.visibility = 'visible'
    document.querySelector("input").style.display ='none';
    document.querySelector('section[class = "filters-container flex"]').style.display ='none';
    renderMemes()
  }
  else if(gCurrImgMeme !== null)
  {
    document.querySelector(".gallery-container").innerHTML = ''
    document.querySelector('section[class = "edit-container flex"]').style.visibility = 'visible'
    document.querySelector("input").style.display ='none';
    document.querySelector('section[class = "filters-container flex"]').style.display ='none';
    renderMeme(gCurrImgMeme)
  }
  else{
    document.querySelector(".gallery-container").innerHTML = ''
    document.querySelector('section[class = "edit-container flex"]').style.visibility = 'hidden'
    // document.querySelector(".gallery-container").style.display = 'bloack-grid'
    // document.querySelector("input").style.display = 'bloack-grid';
    // document.querySelector('section[class = "filters-container flex"]').style.display = 'bloack-grid';
    // restartCanvasLocations()
    renderGallery() 
    // var memes = loadFromStorage(STORAGE_KEY)
    // if (memes) gSavedMemes = memes
    // addListeners()
    // resizeCanvas()
  }

}
function renderGallery()
{
  let elContainer = document.querySelector(".gallery-container")
  for (let i = 1; i <= memeNumber; i++) {
    if(conatinStr(gFilterBy,i-1))
    {
    var strName = `img/meme-imgs/${i}.jpg`
    var elCurrImg = document.createElement("img")
    elCurrImg.src = strName
    elCurrImg.id = `meme-imgs/${i}`
    elCurrImg.addEventListener('click', function () {
        gCurrImgMeme = this.id
        onInit()
    });
    elCurrImg.className = "meme-img-select"
    elContainer.appendChild(elCurrImg)
  }
  }
}
function renderMemes()
{
  let elContainer = document.querySelector(".gallery-container")
  var allSaveImg = loadFromStorage(ALL_MEMES)
  if(allSaveImg !== null)
  {
  for(let currImg of allSaveImg)
  {
  
    var elCurrImg = document.createElement("img")
    elCurrImg.src = currImg;
    elCurrImg.className = "meme-img-select"
    elCurrImg.addEventListener('click',function(event)
    {
      var a1 = document.createElement("a")
      // const urlCreator = window.URL 
      // imageData = urlCreator.createObjectURL(this.data);
      a1.setAttribute("href",event.target.src);
      a1.setAttribute("download", "imgMeme.jpg");
      document.body.appendChild(a1);
      a1.click();
      a1.remove()
    })
    elContainer.appendChild(elCurrImg)
  }
}
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
function onAddLine()
{
  addLine(gCurrImgMeme)
}

function getCursorPosition(canvas, event) {

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
 
 isLineClicked({x:x,y:y})

}

function onDeleteLine()
{
  DeleteLine(gCurrImgMeme)

}

function onChangeColor(val)
{
  onSelectFillColor(val,gCurrImgMeme)
}

function onSetLineText(event)
{
  setMemeText(event.value,gCurrImgMeme)
}

function onMoveText(direction)
{
  moveText(direction,gCurrImgMeme)
}

function onChangeFontFamily(val)
{
  changeFontFamily(val,gCurrImgMeme)
}

function onChangeFontSize(val)
{
   changeFontSize(val,gCurrImgMeme)
}

function onGalleryShow()
{
  location.reload();
}

function onSaveMeme()
{
  
  saveMemes()
}

function onMemeShow()
{
  gCurrImgMeme = null
  isMemePage = true
  onInit()
}

function onMoveTextX(move)
{
  moveTextX(move,gCurrImgMeme)
}

function onMoveTextY(move)
{
  moveTextY(move,gCurrImgMeme)
}
 
function onFlexible()
{
  var randNum = Math.floor(Math.random() * memeNumber);
  gCurrImgMeme = `meme-imgs/${randNum}`
  onInit()
}

function onSetFilterByKeyword(event)
{
  gFilterBy = event.value
  onInit()
}

function conatinStr(str,i){
for(let currDes of gImgs[i].keywords)
{
  if(currDes.includes(str))
  {
    return true
  }
}
return false
}
function onIncreaseFontSizeAndFilter(event)
{
  gFilterBy = event.innerHTML.toLowerCase()
  onInit()
}
 function onShareAll()
 {
  // shareAll()
 }


