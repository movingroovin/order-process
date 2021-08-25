InitFabric();

function InitFabric() {
  // Canvas config
  var canvas = new fabric.Canvas('canvas');
  // let canvasWidth =  document.querySelector('#fabricCanvas').getBoundingClientRect().width;
  // let canvasHeight =  document.querySelector('#fabricCanvas').getBoundingClientRect().height;
  // console.log(canvasWidth, canvasHeight);
  canvas.setHeight(500);
  // canvas.setWidth(canvasWidth);
  canvas.renderAll();

  // rectangle
  var rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: '#36bbd9'
  });
  canvas.add(rect);
}
