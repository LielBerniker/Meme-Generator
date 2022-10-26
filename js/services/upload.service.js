'use strict'
var gId = 18

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}



function onImgInput(ev) {
    loadImageFromInput(ev)
    // hideGallery()
}

function loadImageFromInput(ev) {
    document.querySelector('.edit-meme-canvas').innerHTML = ''
    var reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img = {id: gId, url: img.src , keywords: ['funny'], myMeme: true}
        gImgs.push(img)
        gId++
        renderGallery()
    }
    reader.readAsDataURL(ev.target.files[0])
}

function setMyUploadImg(imgId) {
    gMeme = createMeme({ selectedImgId: imgId })
    renderMyMeme()
}

function renderMyMeme() {
    gCurrMeme = getgMeme()
    const img = new Image()
    img.src = gCurrMeme['url'].url
  
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  
      gCurrMeme.lines.forEach((line) => {
        renderLine(line)
      })
    }
  }
  
