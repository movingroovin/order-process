// Canvas config
var canvas = new fabric.Canvas('canvas', {
  width: window.innerWidth,
});

var drawingModeEl = document.getElementById('drawing-mode');
drawingModeEl.onclick = function() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
  if (canvas.isDrawingMode) {
    drawingModeEl.innerHTML = '退出繪畫模式';
  }
  else {
    drawingModeEl.innerHTML = '繪畫模式';
  }
};

// rectangle
var rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 70,
  fill: 'red'
});
canvas.add(rect);

// Image
fabric.Image.fromURL('../assest/img/chip.jpg', (img) => {
  const oImg = img.set({
    left: 200,
    top: 50,
    width: 200,
    height: 200
  });
  canvas.add(oImg);
})

// Editable Text
const iText = new fabric.IText('雙擊以編輯文字', {
  left: 500,
  top: 50,
  fontSize: 26,
  fontFamily: 'helvetica'
})
canvas.add(iText)




// setting canvas responsive
// window.onresize = (event) => {
//   fitResponsiveCanvas();
// };

// function fitResponsiveCanvas() {
//  // canvas dimensions
//  let canvasSize = {
//     width: 1200,
//     height: 300
//  };
//  // canvas container dimensions
//  let containerSize = {
//     width: document.getElementById('fabricCanvas').offsetWidth,
//     height: document.getElementById('fabricCanvas').offsetHeight
//  };
//  let scaleRatio = Math.min(containerSize.width / canvasSize.width, containerSize.height / canvasSize.height);
//  canvas.setWidth(containerSize.width);
//  canvas.setHeight(containerSize.height);
//  //set canvas zoom aspect
//  canvas.setZoom(scaleRatio)
// }