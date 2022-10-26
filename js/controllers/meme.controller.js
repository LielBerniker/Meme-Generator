let gMeme
function initGMeme(){
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        pos: {
          x: gElCanvas.width/2,
          y:gElCanvas.width/13,
        },
        txt: 'Sample text up',
        size: 40,
        align:'center',
        fillColor:'rgb(0, 0, 0)',
        strokeColor: 'rgb(0, 0, 0)',
        isSelected: false,
        fontfamily: 'impact',
      },
      {
        pos: {
          x: gElCanvas.width/2,
          y: gElCanvas.width - gElCanvas.width/25,
        },
        txt: 'Sample text down',
        size: 40,
        align:'center',
        fillColor: 'rgb(0, 0, 0)',
        strokeColor: 'rgb(0, 0, 0)',
        isSelected: false,
        fontfamily: 'impact',
      },
    ],
  }
}


function getGMeme() {
  return gMeme
}

function renderMeme(imgId) {
    gCurrMeme  = getGMeme()
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
    gCtx.lineWidth = 1
    gCtx.font = `${line.size}px ${line.fontfamily}` 
    gCtx.textAlign = line.align
    gCtx.fillStyle = line.fillColor
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeStyle = line.strokeColor
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    gCtx.closePath()
  }

  function addLine(imgId)
  {
    let currLine = {
      pos: {
        x: gElCanvas.width/2,
        y:gElCanvas.width/2,
      },
      txt: 'Sample text up',
      size: 40,
      align:'center',
      fillColor: 'rgb(0, 0, 0)',
      strokeColor: 'rgb(0, 0, 0)',
      isSelected: false,
      fontfamily: 'impact',
    }
    gMeme.lines.push(currLine)
    renderMeme(imgId)
    
  }
  


  function isLineClicked(clickedPos) {
    const oldIdx = gMeme.selectedLineIdx
    let selectedLine
    selectedLine = gMeme.lines.findIndex(line => {
        const textWidth = gCtx.measureText(line.txt)
        const halfWidth = textWidth.width / 2
        const height = textWidth.fontBoundingBoxAscent + textWidth.fontBoundingBoxDescent
        return (
            clickedPos.y < line.pos.y &&
            clickedPos.y > line.pos.y - height &&
            clickedPos.x > line.pos.x - halfWidth &&
            clickedPos.x < line.pos.x + halfWidth
        )
    })
    console.log(selectedLine)
    if (selectedLine !== -1 && selectedLine !== oldIdx) {
      if(oldIdx!==-1)
      {
        gMeme.lines[oldIdx].isSelected = false
      }
        gMeme.selectedLineIdx = selectedLine
        gMeme.lines[selectedLine].isSelected = true
       
    }
}
function  DeleteLine(imgId)
{
  var curIndex = gMeme.selectedLineIdx
  gMeme.lines.splice(curIndex,1)
  gMeme.selectedLineIdx = -1
  renderMeme(imgId)

}

function onSelectFillColor(val,imgId) {
 

  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){
  gMeme.lines[curIndex].fillColor = val
  gMeme.lines[curIndex].strokeColor = val

  }
  renderMeme(imgId)

}
function setMemeText(val,imgId)
{
  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){
  gMeme.lines[curIndex].txt = val
  }
  renderMeme(imgId)
}


