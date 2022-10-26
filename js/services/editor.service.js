function markLine(line) {
    if (!line) return
    const lineWidth = gCtx.measureText(line.txt).width + line.size
    const lineHeight = line.size + 30
    gCtx.strokeStyle = 'yellow'
    gCtx.strokeRect(
      line.pos.x - lineWidth / 2 - 10,
      line.pos.y - lineHeight / 2,
      lineWidth + 20,
      lineHeight
    )
  }