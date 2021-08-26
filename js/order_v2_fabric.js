InitFabric();

function InitFabric() {
  // Canvas config
  var canvas = new fabric.Canvas('canvas');
  canvas.setHeight(500);
  canvas.setWidth(window.innerWidth*0.55);
  canvas.renderAll();

  // rectangle
  var rect = new fabric.Rect({
    top: 30,
    left: 30,
    width: window.innerWidth*0.55-60,
    height: 500-60,
    fill: '#36bbd9'
  });
  canvas.add(rect);
}
