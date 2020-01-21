// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"gridCodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grid = void 0;
var grid = [0, 196, 195, 197, 200, 202, 203, 204, 206, 207, 151, 152, 157, 156, 159, 169, 168, 167, 166, 165, 0, 194, 193, 198, 199, 201, 209, 208, 205, 177, 150, 153, 154, 155, 158, 160, 161, 162, 163, 164, 104, 102, 101, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 0, 0, 252, 0, 0, 253, 184, 183, 182, 129, 130, 131, 132, 133, 134, 135, 137, 138, 139, 0, 0, 0, 251, 0, 191, 187, 185, 186, 181, 121, 123, 145, 144, 142, 140, 136, 127, 128, 0, 0, 0, 0, 250, 192, 190, 188, 178, 179, 180, 120, 122, 147, 146, 143, 141, 124, 125, 0, 0, 0, 0, 0, 0, 0, 0, 189, 0, 0, 172, 171, 173, 174, 175, 176, 170, 126, 0, 0, 0, 0, 0];
exports.grid = grid;
},{}],"map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatData = formatData;
exports.formatMeso = formatMeso;
exports.countMacroCodes = countMacroCodes;
exports.getContextNumberDetails = getContextNumberDetails;
exports.createSpatialGrid = createSpatialGrid;

var _gridCodes = require("./gridCodes");

// Distribute to seperate file
function formatData(data) {
  var map = {};
  map = countMacroCodes(data, map); // console.log(createSpatialMesos(map));

  return createSpatialGrid();
}

function formatMeso(data) {
  var map = {};
  map = countMacroCodes(data, map); // console.log(createSpatialMesos(map));

  return createSpatialMesos(map);
}
/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */


function countMacroCodes(data, map) {
  data.map(function (finding) {
    var macro = getContextNumberDetails(finding.CONTEXT).macro;
    var meso = getContextNumberDetails(finding.CONTEXT).meso;
    var year = getContextNumberDetails(finding.CONTEXT).year; // Only show the first year of the macro square: 124

    if (year != 12 && macro == 124) return;
    var noMacroInObject = !map[meso];
    if (noMacroInObject) map[meso] = 1;else map[meso]++;
  });
  return map;
}
/**
   * @param {str} contextNumber ("T13-124-1-A")
   * @returns {obj} of the individual values of the context code (see below)
      "T13-124-1-A"
      13 = year
      124 = macro
      1 = meso
      A = micro
   */


function getContextNumberDetails(contextNumber) {
  if (!contextNumber) return '';
  var regex = /T(\d{2})?-?(\d{3})?-?([1234])?/g;
  var contextNumberSearch = regex.exec(contextNumber);
  if (!contextNumberSearch) return '';
  return {
    contextNumber: contextNumber,
    year: contextNumberSearch[1],
    macro: contextNumberSearch[2],
    meso: "".concat(contextNumberSearch[2], "-").concat(contextNumberSearch[3])
  };
}

function createSpatialGrid() {
  var spatialGrid = [];
  var row = 0;
  var column = 0;

  _gridCodes.grid.forEach(function (square, i) {
    if (i % 20 === 0 && i !== 0) {
      column = 0;
      row++;
    }

    var tempObj = {
      macro: square,
      column: column,
      row: row
    };
    spatialGrid.push(tempObj);
    column++;
  });

  return spatialGrid;
}

function createSpatialMesos(map) {
  var newWave = [];

  _gridCodes.grid.forEach(function (square, i) {
    for (var j = 1; j < 5; j++) {
      var meso = "".concat(square, "-").concat(j);
      var tempObj = {
        macro: _gridCodes.grid[i],
        meso: meso,
        rMeso: j,
        value: map[meso]
      };
      newWave.push(tempObj);
    }
  });

  return newWave;
}

var showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);
var isShowMacro = document.getElementById('showMacro').checked;

function showMacro() {
  document.querySelector('#showMacro').classList.toggle('btn-active');

  if (!isShowMacro) {
    document.querySelectorAll('.macro').forEach(function (i) {
      return i.classList.add('showMacro');
    });
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 100)');
  } else {
    document.querySelectorAll('.macro').forEach(function (i) {
      return i.classList.remove('showMacro');
    });
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 0)');
  }

  isShowMacro = !isShowMacro;
}
},{"./gridCodes":"gridCodes.js"}],"helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = normalize;
exports.getMap = getMap;
exports.structureData = structureData;
exports.capitalize = void 0;

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function getMap(data, value) {
  var map = {};
  data.forEach(function (e) {
    var key = e[value];
    if (!map[key]) map[key] = 1;else map[key]++;
  });
  return map;
}

var capitalize = function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.substring(1);
};

exports.capitalize = capitalize;

function structureData(data, category, detail) {
  var newData = {
    name: 'root',
    children: [{
      name: 'ao',
      children: []
    }]
  }; // if (category) {

  var keys = Object.keys(getMap(data, category, detail));
  var values = Object.values(getMap(data, category, detail));

  if (category) {
    values.forEach(function (e, i) {
      newData.children[0].children.push({
        name: keys[i],
        value: values[i],
        category: category
      });
    });
  } else {
    newData.children[0].children.push({
      name: detail || 'All objects',
      value: data.length
    });
  }

  return newData;
}
},{}],"draw-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;
exports.drawGrid = drawGrid;

var _helpers = require("./helpers");

function update(svg, spatialGrid, mesos) {
  var t = d3.transition().duration(750);
  var values = mesos.map(function (i) {
    return i.value;
  });
  var highestValue = d3.max(values);
  svg.selectAll('.meso').data(mesos).attr('fill', function (d) {
    return d.value ? "rgba(127, 205, 144, ".concat((0, _helpers.normalize)(d.value, 0, highestValue), ")") : 'rgba(127, 205, 144, 0)';
  });
  svg.selectAll('.value').data(spatialGrid).text(function (d) {
    return d.value;
  });
}

function drawGrid(svg, spatialGrid, mesos) {
  var values = mesos.map(function (i) {
    return i.value;
  });
  var highestValue = d3.max(values);
  svg.selectAll('rect').data(spatialGrid).enter().append('rect').attr('class', 'macroSquare').attr('x', function (d, i) {
    return d.column * 50;
  }).attr('y', function (d, i) {
    return d.row * 50;
  }).attr('fill', 'none').attr('width', 50).attr('height', 50).exit().remove();
  var tooltipV = d3.select('body').append('div').attr('class', 'tooltip').text('');
  var tooltipM = d3.select('body').append('div').attr('class', 'tooltip').text('');
  var f = 0;
  var notF = 0;
  svg.selectAll('.meso').data(mesos).enter().append('rect').attr('class', 'meso').attr('x', function (d, i) {
    if (i % 4 === 0 && i !== 0) f++;
    var m = mesos[i].rMeso;
    if (m === 2 || m === 4) return spatialGrid[f].column * 50 + 25;else return spatialGrid[f].column * 50;
  }).attr('y', function (d, i) {
    if (i % 4 === 0 && i !== 0) notF++;
    var m = mesos[i].rMeso;
    if (m === 3 || m === 4) return spatialGrid[notF].row * 50 + 25;else return spatialGrid[notF].row * 50;
  }).attr('fill', function (d) {
    return d.value ? "rgba(127, 205, 144, ".concat((0, _helpers.normalize)(d.value, 0, highestValue), ")") : 'rgba(255, 255, 255, 0)';
  }).attr('width', 25).attr('height', 25).on('mouseover', function (d) {
    tooltipV.text("Objecten: ".concat(d.value || 0)).style('visibility', 'visible');
    tooltipM.text("Meso: ".concat(d.meso)).style('visibility', 'visible');
  }).on('mousemove', function () {
    tooltipV.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px');
    tooltipM.style('top', event.pageY - 30 + 'px').style('left', event.pageX + 10 + 'px');
  }).on('mouseout', function () {
    tooltipV.style('visibility', 'hidden');
    tooltipM.style('visibility', 'hidden'); // tooltipM.text(d.value).style('visibility', 'visible');
  }).exit().remove();
  svg.selectAll('.macro').data(spatialGrid).enter().append('text').attr('class', 'macro').text(function (d) {
    return d.macro ? d.macro : '';
  }).attr('x', function (d, i) {
    return d.column * 50 + 15;
  }).attr('y', function (d, i) {
    return d.row * 50 + 30;
  });
}
},{"./helpers":"helpers.js"}],"breadcrumbs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPath = renderPath;

var _helpers = require("./helpers");

function renderPath() {}
},{"./helpers":"helpers.js"}],"draw-tree-map.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./helpers");

var _map = require("./map");

var _drawMap = require("./draw-map");

var _breadcrumbs = require("./breadcrumbs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9
var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
},
    aspect = 0.85,
    minHeight = 450,
    duration = 300;
var currentData = [],
    selection = [],
    // currentCategory = '',
currentDataStructured;
var currentLevel = 0;
var breadcrumbs = {
  currentLevel: 0,
  nextLevel: true,
  path: []
};
fetch('data.json').then(function (response) {
  return response.json();
}).then(function (json) {
  return handleData(json);
});

function handleData(data) {
  document.querySelector('.treemap--loading').style.display = 'none'; // Set data

  currentData = _toConsumableArray(data);
  currentDataStructured = (0, _helpers.structureData)(data);
  updateBreadCrumbs(currentData, 'All objects', 'root');
  printBreadCrumbs(breadcrumbs);
  var mapSvg = d3.select('.map').append('svg');
  var spatialGrid = (0, _map.formatData)(currentData); // console.log(spatialGrid);

  (0, _drawMap.drawGrid)(mapSvg, spatialGrid, (0, _map.formatMeso)(data)); // Setup treemap

  var config = setup();
  var treemap = config.treemap;
  var svg = config.svg;
  var g = config.g; // let catCount = 0;

  function addCategoryToTreemap(category, e) {
    if (e.className.match('activated')) return;
    currentDataStructured = (0, _helpers.structureData)(currentData, category);
    updateBreadCrumbs(currentData, category, 'category');
    printBreadCrumbs(breadcrumbs);
    var newData = (0, _helpers.structureData)(currentData, category);
    root = d3.hierarchy(newData).sum(function (d) {
      return d.value;
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    draw();
  }

  onresize = function onresize(_) {
    return draw(true);
  };

  addEventToCategoryBttn(addCategoryToTreemap); // First paint

  var root = d3.hierarchy(currentDataStructured).sum(function (d) {
    return d.value;
  }).sort(function (a, b) {
    return b.value - a.value;
  });
  draw();
  setTimeout(function () {
    document.querySelector('.treemap').classList.add('treemap--active');
  }, 1);
  var zoomBtn = document.querySelector('#zoom');
  zoomBtn.addEventListener('click', zoomTreemap);
  zoomBtn.addEventListener('mouseenter', showZoomTreemap);
  zoomBtn.addEventListener('mouseleave', noShowZoomTreemap); // const zoomBtnOut = document.querySelector('#back');
  // zoomBtnOut.addEventListener('click', zoomTreemapOut);

  function zoomTreemap() {
    var current = currentDataStructured.children[0].children.sort(function (a, b) {
      return b.value - a.value;
    });

    if (current.length > 10) {
      current.splice(0, 10);
      root = d3.hierarchy(currentDataStructured).sum(function (d) {
        return d.value;
      }).sort(function (a, b) {
        return b.value - a.value;
      });
      draw();
    }
  }

  function showZoomTreemap() {
    var current = currentDataStructured.children[0].children.sort(function (a, b) {
      return b.value - a.value;
    });

    if (current.length > 10) {
      if (currentDataStructured.children[0].children.sort(function (a, b) {
        return b.value - a.value;
      })) {
        d3.selectAll('.rect').each(function (d, i) {
          for (var j = 0; j < 10; j++) {
            if (i == j) {
              d3.select(this).style('opacity', "0");
            }
          }
        });
        d3.selectAll('.label').each(function (d, i) {
          for (var j = 0; j < 10; j++) {
            if (i == j) {
              d3.select(this).style('opacity', ".4");
            }
          }
        });
      }
    }
  }

  function noShowZoomTreemap() {
    if (currentDataStructured.children[0].children.sort(function (a, b) {
      return b.value - a.value;
    })) {
      d3.selectAll('.rect').each(function (d, i) {
        for (var j = 0; j < 10; j++) {
          if (i == j) {
            d3.select(this).style('opacity', "1");
          }
        }
      });
      d3.selectAll('.label').each(function (d, i) {
        for (var j = 0; j < 10; j++) {
          if (i == j) {
            d3.select(this).style('opacity', "1");
          }
        }
      });
    }
  }

  function zoomTreemapOut() {
    currentDataStructured = (0, _helpers.structureData)(data, 'SHAPE OBJECT');
    root = d3.hierarchy(currentDataStructured).sum(function (d) {
      return d.value;
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    draw();
  }

  function draw(resizing) {
    var width = 1000;
    var baseHeight = innerWidth * aspect;
    baseHeight = baseHeight < minHeight ? minHeight : baseHeight > innerHeight ? innerHeight : baseHeight;
    var height = 450;
    svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    g.attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
    treemap.size([width, height]);
    var leaves = treemap(root).leaves();
    var rects = svg.selectAll('.rect').data(leaves, function (d) {
      return d.data.name;
    });

    if (resizing) {
      rects.exit().remove();
      rects.attr('transform', function (d) {
        return "translate(".concat(d.x0, ",").concat(d.y0, ")");
      }).attr('width', function (d) {
        return d.x1 - d.x0;
      }).attr('height', function (d) {
        return d.y1 - d.y0;
      });
    } else {
      rects.exit().style('opacity', 1).transition().duration(0).style('opacity', 1e-6).remove();
      rects.transition().duration(100).attr('transform', function (d) {
        return "translate(".concat(d.x0, ",").concat(d.y0, ")");
      }).attr('width', function (d) {
        return d.x1 - d.x0;
      }).attr('height', function (d) {
        return d.y1 - d.y0;
      });
    }

    var objCount = root.children[0].children.length;
    var counter = root.children[0].children.length;
    rects.enter().append('rect').attr('class', 'rect').style('fill', function (d, i) {
      counter--;
      return objCount > 3 ? "rgba(127, 205, 144, ".concat(0.4 + (0, _helpers.normalize)(counter, 0, objCount)) : "rgba(127, 205, 144, 1)";
    }).attr('transform', function (d) {
      return "translate(".concat(d.x0, ",").concat(d.y0, ")");
    }).attr('width', function (d) {
      return d.x1 - d.x0;
    }).attr('height', function (d) {
      return d.y1 - d.y0;
    }).style('opacity', 1e-6).on('click', function (d) {
      if (document.querySelectorAll('rect.rect').length <= 1) return;
      selection.push({
        name: d.data.name,
        category: d.data.category
      });
      document.querySelector('#showMap').classList.add('pulse');
      setTimeout(function () {
        document.querySelector('#showMap').classList.remove('pulse');
      }, 2000);
      var newData = {
        name: 'root',
        children: [{
          name: 'ao',
          children: [{
            name: d.data.name,
            value: d.data.value
          }]
        }]
      };
      var activeButton = document.querySelector('.button-active');
      activeButton.classList.remove('button-active');
      activeButton.classList.add('button-activated');
      currentData = currentData.filter(function (e) {
        return e[d.data.category] == d.data.name;
      });
      currentDataStructured = (0, _helpers.structureData)(currentData); // renderPath(path, pathIndex, pathText);

      updateBreadCrumbs(currentData, d.data.name, 'detail');
      printBreadCrumbs(breadcrumbs);
      var spatialGrid = (0, _map.formatData)(currentData); // const spatialGrid = formatMeso(currentData);

      (0, _drawMap.update)(mapSvg, spatialGrid, (0, _map.formatMeso)(currentData));
      root = d3.hierarchy(newData).sum(function (d) {
        return d.value;
      }).sort(function (a, b) {
        return b.value - a.value;
      });
      draw();
    }).on('mouseover', function (d) {
      this.style.opacity = 0.8;
    }).on('mouseleave', function (d) {
      this.style.opacity = 1;
    }).transition().duration(duration).style('opacity', 1);
    var labels = svg.selectAll('.label').data(leaves.filter(function (f) {
      return f.x1 - f.x0 > 60 && f.y1 - f.y0 > 30;
    }), function (d) {
      return d.data.name;
    });

    if (resizing) {
      labels.exit().remove();
      labels.html(function (d) {
        return "<tspan style='font-weight: 500'>".concat(d.data.name, "</tspan><tspan dx=10>").concat(d.data.value, "</tspan>");
      }).attr('transform', function (d) {
        return "translate(".concat(d.x0, ", ").concat(d.y0, ")");
      });
    } else {
      labels.exit().style('opacity', 1).transition().duration(duration).style('opacity', 1e-6).remove();
      labels.html(function (d) {
        return "<tspan style='font-weight: 500'>".concat(d.data.name, "</tspan><tspan dx=10>").concat(d.data.value, "</tspan>");
      }).transition().duration(100).attr('transform', function (d) {
        return "translate(".concat(d.x0, ", ").concat(d.y0, ")");
      });
    }

    labels.enter().append('text').attr('class', 'label').attr('dy', 16).attr('dx', 5).attr('fill', '#fff').attr('transform', function (d) {
      return "translate(".concat(d.x0, ", ").concat(d.y0, ")");
    }).html(function (d) {
      return "<tspan style='font-weight: 500'>".concat(d.data.name, "</tspan><tspan dx=10>").concat(d.data.value, "</tspan>");
    }).style('opacity', 1e-6).transition().duration(300).style('opacity', 1);
  }

  function updateBreadCrumbs(currentData, name, type) {
    if (type === 'category' && breadcrumbs.nextLevel) {
      breadcrumbs.path.push({
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        name: name,
        category: true
      });
      breadcrumbs.currentLevel++;
      breadcrumbs.nextLevel = false;
    } else if (type === 'category' && !breadcrumbs.nextLevel) {
      breadcrumbs.path[breadcrumbs.path.length - 1] = {
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        category: true,
        name: name
      };
    }

    if (type === 'detail' || type === 'root') {
      breadcrumbs.path.push({
        level: breadcrumbs.currentLevel,
        data: currentData,
        objCount: currentData.length,
        name: name
      });
      breadcrumbs.currentLevel++;
      breadcrumbs.nextLevel = true;
    }
  }

  function printBreadCrumbs(breadcrumbs) {
    // console.log(breadcrumbs);
    var container = document.querySelector('#path');
    container.innerHTML = '';
    breadcrumbs.path.forEach(function (e) {
      if (e.category) {
        var img = document.createElement('img');
        if (e.name === 'SHAPE OBJECT') img.src = '/shape object.c010fc72.svg';
        if (e.name === 'SHAPE DETAILS') img.src = '/shape-detail.34d50015.svg';
        if (e.name === 'CHRONOLOGY 1st IMPRESSION') img.src = '/tijdperk.cb680242.svg';
        if (e.name === 'PRODUCTION PLACE') img.src = '/production-place.4212d16c.svg';
        if (e.name === 'CONSERVATION') img.src = '/conservation.9e748c39.svg';
        if (e.name === 'SEASON') img.src = '/season.ee70b878.svg';
        if (e.name === 'WARE') img.src = '/ware.d4219b9e.svg';
        container.appendChild(img);
      } else {
        var button = document.createElement('button'); // const linkText = document.createTextNode(`${e.name} (${e.objCount})`);

        var linkText = document.createTextNode("".concat(e.name, " \u203A"));
        button.appendChild(linkText);
        button.value = e.name;
        button.addEventListener('click', function (e) {
          clickBreadcrumb(e, breadcrumbs);
        });
        container.appendChild(button);
      }
    });
  }

  function clickBreadcrumb(current, breadcrumbs) {
    var clickedBread = breadcrumbs.path.filter(function (e) {
      return e.name === current.target.value;
    })[0]; // console.log(currentData);
    // console.log(clickedBread);

    currentData = clickedBread.data;
    currentDataStructured = (0, _helpers.structureData)(clickedBread.data, false, clickedBread.name); // console.log(currentData);

    breadcrumbs.path.splice(clickedBread.level + 1);
    breadcrumbs.currentLevel = clickedBread.level;
    breadcrumbs.nextLevel = true;
    printBreadCrumbs(breadcrumbs);
    root = d3.hierarchy(currentDataStructured).sum(function (d) {
      return d.value;
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    draw();
  }
}

function setup() {
  var treemap = d3.treemap().padding(1).round(true);
  var svg = d3.select('.treemap').append('svg').attr('class', 'svg');
  var g = svg.append('g').attr('class', 'g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  return {
    treemap: treemap,
    svg: d3.select('.svg'),
    g: d3.select('g')
  };
}

function addEventToCategoryBttn(event) {
  var categoryButtons = document.querySelectorAll('.button-category');
  categoryButtons.forEach(function (e) {
    var category = e.dataset.category;
    e.addEventListener('click', function () {
      event(category, e);
    });
  });
}

var allButtons = document.querySelectorAll('.button-category');
allButtons.forEach(function (e) {
  return e.addEventListener('click', addStateToButton);
});

function addStateToButton(e) {
  if (e.currentTarget.className.match('activated')) return;
  var button = e.currentTarget;
  allButtons.forEach(function (e) {
    return e.classList.remove('button-active');
  });
  button.classList.add('button-active');
}
},{"./helpers":"helpers.js","./map":"map.js","./draw-map":"draw-map.js","./breadcrumbs":"breadcrumbs.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles.scss");

var _map = require("./map");

var _drawTreeMap = require("./draw-tree-map");
},{"./styles.scss":"styles.scss","./map":"map.js","./draw-tree-map":"draw-tree-map.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55299" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map