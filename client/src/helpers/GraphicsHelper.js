// determines positions offsets for shapes to be drawn depending on number. returns center of shape.
function drawNumber(number, canvas) {
  // small y offset value to bring elements closer to center
  const yOffset = canvas.height / 10;
  switch (number) {
    case 0:
      // center center element
      return [{ x: canvas.width / 2, y: canvas.height / 2 }];
    case 1:
      return [
        //upper right element
        { x: canvas.width / 4, y: canvas.height / 4 + yOffset },
        //bottom right element
        {
          x: canvas.width - canvas.width / 4,
          y: canvas.height - canvas.height / 4 - yOffset,
        },
      ];
    case 2:
      return [
        //upper center element
        { x: canvas.width / 2, y: canvas.height / 4 + yOffset },
        //bottom left element
        { x: canvas.width / 4, y: canvas.height - canvas.height / 4 - yOffset },
        //bottom right element
        {
          x: canvas.width - canvas.width / 4,
          y: canvas.height - canvas.height / 4 - yOffset,
        },
      ];
    default:
      break;
  }
}

/* assigns color to fill and stroke depending on card value */
function drawColor(color, ctx) {
  switch (color) {
    case 0:
      ctx.strokeStyle = "Red";
      ctx.fillStyle = "Red";
      return;
    case 1:
      ctx.strokeStyle = "Black";
      ctx.fillStyle = "Black";
      return;
    case 2:
      ctx.strokeStyle = "Green";
      ctx.fillStyle = "Green";
      return;
    default:
      break;
  }
}

/* draw function with nested functions for each shape to be drawn */
function drawShape(position, shape, canvas, ctx, scale = 1) {
  switch (shape) {
    case 0:
      drawSquare(position.x, position.y, canvas, ctx, scale);
      return;
    case 1:
      drawTriangle(position.x, position.y, canvas, ctx, scale);
      return;
    case 2:
      drawCircle(position.x, position.y, canvas, ctx, scale);
      return;
    default:
      break;
  }

  function drawSquare(x, y, canvas, ctx, scale) {
    const squareWidth = (canvas.width / 3) * scale;
    const squareOffset = squareWidth / 2;

    ctx.beginPath();
    ctx.rect(x - squareOffset, y - squareOffset, squareWidth, squareWidth);
  }
  function drawCircle(x, y, canvas, ctx, scale) {
    const circleRadius = (canvas.width / 5) * scale;

    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  }
  function drawTriangle(x, y, canvas, ctx, scale) {
    const triangleRadius = (canvas.width / 4) * scale;
    const circleXOffset = Math.cos(Math.PI / 6) * triangleRadius;
    const circleYOffset = Math.sin(Math.PI / 6) * triangleRadius;

    ctx.beginPath();
    ctx.moveTo(x, y - triangleRadius);
    ctx.lineTo(x + circleXOffset, y + circleYOffset);
    ctx.lineTo(x - circleXOffset, y + circleYOffset);
    ctx.lineTo(x, y - triangleRadius);
    ctx.lineTo(x, y - triangleRadius);
  }
}

function drawShade(position, shading, shape, canvas, ctx) {
  switch (shading) {
    case 0:
      ctx.fill();
      ctx.closePath();
      return;
    case 1:
      ctx.stroke();
      ctx.closePath();
      return;
    case 2:
      ctx.stroke();
      ctx.closePath();
      drawShape(position, shape, canvas, ctx, 0.5);
      ctx.fill();
      ctx.closePath();
      return;
    default:
      break;
  }
}

export function drawCardGraphic(card, canvas, ctx) {
  let drawPositions = drawNumber(card.number, canvas);

  for (const position of drawPositions) {
    drawColor(card.color, ctx);
    drawShape(position, card.shape, canvas, ctx);
    drawShade(position, card.shading, card.shape, canvas, ctx);
  }
}
