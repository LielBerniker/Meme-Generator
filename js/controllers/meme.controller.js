function renderMeme(imgId) {

    var imgSource = `img/${imgId}.jpg`
    const img = new Image()
    img.src = imgSource
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  
      gCurrMeme.lines.forEach((line) => {
        renderLine(line)
      })
    }
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

