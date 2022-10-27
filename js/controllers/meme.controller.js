let gMeme
const ALL_MEMES = "ALL_MEMES"

function initGMeme(){
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [
      {
        pos: {
          x: gElCanvas.width/2,
          y:gElCanvas.width/13,
        },
        txt: 'Sample text up',
        size: 40,
        align:'center',
        fillColor:'white',
        strokeColor: 'black',
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
        fillColor: 'white',
        strokeColor: 'black',
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
      fillColor: 'white',
      strokeColor: 'black',
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
        document.querySelector("input[class='meme-text-input'").value = gMeme.lines[selectedLine].txt
        // markLine(gMeme.lines[selectedLine])
       
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

function moveText(direction,imgId)
{
  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){
    switch (direction) {
      case 'right':
        gMeme.lines[curIndex].align = 'end'
        break;
      case 'center':
        gMeme.lines[curIndex].align = 'center'
        break;      
      case 'left':
        gMeme.lines[curIndex].align = 'start'
        break;
      default:
        break;
    }
  }
  renderMeme(imgId)
}

function changeFontFamily(font,imgId){

 var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){
  gMeme.lines[curIndex].fontfamily = font.toLowerCase()
  }
  renderMeme(imgId)
}

function changeFontSize(val,imgId)
{
  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){

    if(gMeme.lines[curIndex].size + val >8 && gMeme.lines[curIndex].size + val < 80)
    {
      gMeme.lines[curIndex].size += val 
    }
  }
  renderMeme(imgId)
}
 function saveMemes()
 {
  
 var curImgData = getImage();
 var allSaveImg = loadFromStorage(ALL_MEMES)
   if(allSaveImg === null)
     {
      allSaveImg = []
     }
      allSaveImg.push(curImgData)
      saveToStorage(ALL_MEMES,allSaveImg)
 }

function getImage() {
  var dataURL = gElCanvas.toDataURL("image/png");

  return dataURL
}
 function  moveTextX(move,imgId)
 {
  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){

    if(gMeme.lines[curIndex].pos.y + move >30 && gMeme.lines[curIndex].pos.y + move < 495)
    {
      gMeme.lines[curIndex].pos.y += move
    }
  }
  renderMeme(imgId)
 }

 function  moveTextY(move,imgId)
 {
  var curIndex =gMeme.selectedLineIdx
  if(curIndex !==-1){

    if(gMeme.lines[curIndex].pos.x + move >45 && gMeme.lines[curIndex].pos.x + move < 470)
    {
      gMeme.lines[curIndex].pos.x += move
    }
  }
  renderMeme(imgId)
 }

function shareAll()
{
  console.log(gElCanvas.toDataURL())
  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: gElCanvas.toDataURL("image/png")
  }
  try {
     navigator.share(shareData)
  } catch (err) {
   console.log(err)
  }
}



  // function markLine(line) {
//   if (!line) return
//   const lineWidth = gCtx.measureText(line.txt).width + line.size
//   const lineHeight = line.size + 20
//   gCtx.strokeStyle = 'yellow'
//   gCtx.strokeRect(
//     line.pos.x - lineWidth / 2 - 10,
//     line.pos.y - lineHeight / 2,
//     lineWidth + 20,
//     lineHeight
//   )
// }



