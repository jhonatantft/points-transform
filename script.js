/**
 * auxiliary variables
 */
var x0;
var y0;
var x1;
var y1;
var x2;
var y2;
var count = 0;

/**
 * Creates matrix according to size choosen by user
 */
function generateTable () {
  var matrixSize = Number(document.getElementById('matrix-size').value) || 40;
  var body = document.getElementById('bresenham-matrix');

  resetGeneratedBresenhamMatrix(document.querySelector('table'));
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');

  for (var i = 0; i < matrixSize; i++) {
    var tr = document.createElement('tr');
    tr.className = 'tr-size';
    for (var j = 0; j < matrixSize; j++) {
      var td = document.createElement('td');
      td.className = 'td-size';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  body.appendChild(table);
  table.setAttribute('border', '1');

  /**
   * The display size could be based on the entire screen real size
   */
  // table.setAttribute('width', screen.width - 100);
  // table.setAttribute('height', screen.height - 200);

  // Binds click event on each td
  $('td').on('click', function paint (event) {
    count++;
    if (count === 1) {
      y0 = $(this).parent().children().index($(this));
      x0 = $(this).parent().parent().children().index($(this).parent());
      console.log('(' + x0 + ',' + y0 + ')');
      drawing(x0, y0);
    }

    if (count === 2) {
      y1 = $(this).parent().children().index($(this));
      x1 = $(this).parent().parent().children().index($(this).parent());
      console.log('(' + x1 + ',' + y1 + ')');
      drawing(x1, y1);
    }

    /**
     * For triangless
     */
    if (count === 3) {
      y2 = $(this).parent().children().index($(this));
      x2 = $(this).parent().parent().children().index($(this).parent());
      console.log('(' + x2 + ',' + y2 + ')');
      drawing(x2, y2);
    }
  })
}

/**
 * Removes table element from DOM if it was
 * already drawn
 */
function resetGeneratedBresenhamMatrix (table) {
  if (table instanceof HTMLElement) {
    table.parentElement.removeChild(table);
    count = 0;
  }
}

/**
 * Draws a triangle given three painted points
 */
function drawTriangle () {
  drawsBresenhamsLine(x0, y0, x1, y1)
  drawsBresenhamsLine(x1, y1, x2, y2)
  drawsBresenhamsLine(x2, y2, x0, y0)
}

/**
 * Scales triangle according to multiplier defined
 * by use, the default value is 2
 * It multiplicates each coordinate by the multiplier value
 */
function scale () {
  var multiplier = Number(document.getElementById('scale-multiplier').value) || 2;
  reset()
  drawsBresenhamsLine(x0 * multiplier, y0 * multiplier, x1 * multiplier, y1 * multiplier)
  drawsBresenhamsLine(x1 * multiplier, y1 * multiplier, x2 * multiplier, y2 * multiplier)
  drawsBresenhamsLine(x2 * multiplier, y2 * multiplier, x0 * multiplier, y0 * multiplier)
}

/**
 * Changes the position of the triangle, adding a value to the x-axis values
 */
function translateX () {
  var position = Number(document.getElementById('translateX').value) || 2;
  reset()
  drawsBresenhamsLine(x0, y0 + position, x1, y1 + position)
  drawsBresenhamsLine(x1, y1 + position, x2, y2 + position)
  drawsBresenhamsLine(x2, y2 + position, x0, y0 + position)
}

/**
 * Changes the position of the triangle, adding a value to the y-axis values
 */
function translateY () {
  var position = Number(document.getElementById('translateY').value) || 2;
  reset()
  drawsBresenhamsLine(x0 + position, y0, x1 + position, y1)
  drawsBresenhamsLine(x1 + position, y1, x2 + position, y2)
  drawsBresenhamsLine(x2 + position, y2, x0 + position, y0)
}

/**
 * Draws rotated triangle using a center spot
 * according with angle passed by user
 * The center spot will be always the first to
 * be painted
 */
function rotated () {
  var angle = Number(document.getElementById('rotateAngle').value) || 90;
  reset();
  var [newX1, newY1] = rotate(x0, y0, x1, y1, angle)
  var [newX2, newY2] = rotate(x0, y0, x2, y2, angle)
  drawsBresenhamsLine(x0, y0, newX1, newY1)
  drawsBresenhamsLine(newX1, newY1, newX2, newY2)
  drawsBresenhamsLine(newX2, newY2, x0, y0)
}

/**
 * Calculates new points given angle
 */
function rotate (cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * (-angle),
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
}

/**
 * Draws into html the result of euler calulation
 */
function drawEuler () {
  var eulerDiv = document.querySelector('.euler');
  var coordinates = euler();
  eulerDiv.innerHTML = '<table class="table table-dark">' +
                          '<tbody>' +
                              '<tr>' +
                              '<th scope="row">x</th>' +
                              '<td>' + coordinates.x[0] + '</td>' +
                              '<td>' + coordinates.x[1] + '</td>' +
                              '<td>' + coordinates.x[2] + '</td>' +
                              '</tr>' +
                              '<tr>' +
                              '<th scope="row">y</th>' +
                              '<td>' + coordinates.y[0] + '</td>' +
                              '<td>' + coordinates.y[1] + '</td>' +
                              '<td>' + coordinates.y[2] + '</td>' +
                              '</tr>' +
                              '<tr>' +
                              '<th scope="row">z</th>' +
                              '<td>' + coordinates.z[0] + '</td>' +
                              '<td>' + coordinates.z[1] + '</td>' +
                              '<td>' + coordinates.z[2] + '</td>' +
                              '</tr>' +
                          '</tbody>' +
                        '</table>';
}

/**
 * Calculates values according to given data
 */
function euler () {
  var xPoint = Number(document.getElementById('x').value) || 0;
  var yPoint = Number(document.getElementById('y').value) || 0;
  var zPoint = Number(document.getElementById('z').value) || 0;
  var angle = Number(document.getElementById('eulerAngle').value) || 90;

  var radians = (Math.PI / 180) * (angle);
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);

  return {
    x: (() => {
      var y = (yPoint * cos) - (zPoint * sin);
      var z = (yPoint * sin) + (zPoint * cos);
      return [Math.round(xPoint), Math.round(y), Math.round(z)]
    })(),
    y:(() => {
      var x = (zPoint * sin) + (xPoint * cos);
      var z = (zPoint * cos) - (xPoint * sin);
      return [Math.round(x), Math.round(yPoint), Math.round(z)]
    })(),
    z:(() => {
      var x = (xPoint * cos) - (yPoint * sin);
      var y = (xPoint * sin) + (yPoint * cos);
      return [Math.round(x), Math.round(y), Math.round(zPoint)]
    })()
  }
}

/**
 * Draws Bresenham line based on it's algorithm
 */
function drawsBresenhamsLine (x = x0, y = y0, xp = x1, yp = y1) {  
  var dx = xp - x;
  var sx = (dx < 0) ? -1 : 1;
  var dy = yp - y;
  var sy = (dy < 0) ? -1 : 1;
  if (Math.abs(dy) < Math.abs(dx)) {
    var m = dy / dx;
    var b = y - m * x;

    while (x != xp) {
      drawing(x, parseInt(Math.round(m * x + b)));
      x += sx;
    }
  } else {
    var m = dx / dy;
    var b = x - m * y;

    while (y != yp) {
      drawing(parseInt(Math.round(m * y + b)), y);
      y += sy;
    }
  }
  drawing(xp, yp);
}

/**
 * Paint specific box based on given coordinates
 *
 * @param {Number} x - x coordinate
 * @param {Number} y - y coordinate
 */
function drawing (x, y) {
  var column = $('table').find('tr').eq(x);
  var row = column.find('td').eq(y);
  row.addClass('violet');
  console.log('drawing: ' + '(' + x + ',' + y + ')');
}

/**
 * Removes all painted td from table
 */
function reset () {
  var element = $('table').find('td');
  element.removeClass('violet');
  count = 0;
}
