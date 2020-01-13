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
},{}],"helpers.js":[function(require,module,exports) {
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

function structureData(data, category) {
  var newData = {
    name: 'root',
    children: [{
      name: 'ao',
      children: []
    }]
  };

  if (category) {
    var keys = Object.keys(getMap(data, category));
    var values = Object.values(getMap(data, category));
    values.forEach(function (e, i) {
      newData.children[0].children.push({
        name: keys[i],
        value: values[i],
        category: category
      });
    });
  } else {
    newData.children[0].children.push({
      name: 'All Data',
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

function update(svg, spatialGrid) {
  var t = d3.transition().duration(750);
  var values = spatialGrid.map(function (i) {
    return i.value;
  });
  var highestValue = d3.max(values);
  svg.selectAll('rect').data(spatialGrid).transition(t).attr('fill', function (d) {
    return d.value ? "rgba(127, 205, 144, ".concat((0, _helpers.normalize)(d.value, 0, highestValue), ")") : '#fff';
  }); // TODO Create a slider for the 500

  svg.selectAll('.value').data(spatialGrid).text(function (d) {
    return d.value;
  });
}

function drawGrid(svg, spatialGrid) {
  var values = spatialGrid.map(function (i) {
    return i.value;
  });
  var highestValue = d3.max(values);
  svg.selectAll('rect').data(spatialGrid).enter().append('rect').attr('x', function (d, i) {
    return d.column * 50;
  }).attr('y', function (d, i) {
    return d.row * 50;
  }).attr('fill', function (d) {
    return d.value ? "rgba(127, 205, 144, ".concat((0, _helpers.normalize)(d.value, 0, highestValue), ")") : '#fff';
  }) // TODO Create a slider for the 500
  .attr('width', 50).attr('height', 50).exit().remove();
  svg.selectAll('.macro').data(spatialGrid).enter().append('text').attr('class', 'macro').text(function (d) {
    return d.macro ? d.macro : '';
  }).attr('x', function (d, i) {
    return d.column * 50 + 15;
  }).attr('y', function (d, i) {
    return d.row * 50 + 25;
  });
  svg.selectAll('.value').data(spatialGrid).enter().append('text').attr('class', 'value').text(function (d) {
    return d.value;
  }).attr('x', function (d, i) {
    return d.column * 50 + 15;
  }).attr('y', function (d, i) {
    return d.row * 50 + 40;
  });
}
},{"./helpers":"helpers.js"}],"map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextNumberDetails = getContextNumberDetails;

var _gridCodes = require("./gridCodes");

var _drawMap = require("./draw-map");

// Distribute to seperate file
// Load data file
// TODO make this dynamic with an upload button
fetch('data.json').then(function (response) {
  return response.json();
}).then(function (json) {
  return handleData(json);
});

var handleData = function handleData(data) {
  var svg = d3.select('.map').append('svg'); // Format data

  var newData = data.filter(function (i) {
    return i.SEASON == 2013;
  });
  var spatialGrid = formatData(data);
  var spatialGrid2 = formatData(newData);
  (0, _drawMap.drawGrid)(svg, spatialGrid);
  setTimeout(function () {
    (0, _drawMap.update)(svg, spatialGrid2);
  }, 2000);
  setTimeout(function () {
    (0, _drawMap.update)(svg, spatialGrid);
  }, 4000);
};

function formatData(data) {
  var map = {};
  map = countMacroCodes(data, map);
  return createSpatialGrid(map);
}
/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */


function countMacroCodes(data, map) {
  data.map(function (finding) {
    var macro = getContextNumberDetails(finding.CONTEXT).macro;
    var year = getContextNumberDetails(finding.CONTEXT).year; // Only show the first year of the macro square: 124

    if (year == 12 && macro == 124) return;
    var noMacroInObject = !map[macro];
    if (noMacroInObject) map[macro] = 1;else map[macro]++;
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
  var regex = /T(\d{2})?-?(\d{3})/g; // const regex = /T(\d{2})?-?(\d{3})?-?([1234])?-?([ABCD1234])/g;

  var contextNumberSearch = regex.exec(contextNumber);
  if (!contextNumberSearch) return '';
  return {
    contextNumber: contextNumberSearch[0] || null,
    year: contextNumberSearch[1] || null,
    macro: contextNumberSearch[2] || null // meso: contextNumberSearch[3] || null,
    // micro: contextNumberSearch[4] || null

  };
}

function createSpatialGrid(map) {
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
      value: map[square],
      column: column,
      row: row
    };
    column++;
    spatialGrid.push(tempObj);
  });

  return spatialGrid;
}

var showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);
var showValueButton = document.querySelector('#showValue');
showValueButton.addEventListener('click', showValue);
var isShowMacro = document.getElementById('showMacro').checked;
var isShowValue = document.getElementById('showValue').checked;

function showMacro() {
  if (!isShowMacro) document.querySelectorAll('.macro').forEach(function (i) {
    return i.style.opacity = 1;
  });else document.querySelectorAll('.macro').forEach(function (i) {
    return i.style.opacity = 0;
  });
  isShowMacro = !isShowMacro;
}

function showValue() {
  if (!isShowValue) document.querySelectorAll('.value').forEach(function (i) {
    return i.style.opacity = 0.4;
  });else document.querySelectorAll('.value').forEach(function (i) {
    return i.style.opacity = 0;
  });
  isShowValue = !isShowValue;
}
},{"./gridCodes":"gridCodes.js","./draw-map":"draw-map.js"}],"breadcrumbs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPath = renderPath;

var _helpers = require("./helpers");

function renderPath(path, pathIndex, pathText) {
  var pathQuery = document.querySelector('#path');
  var entry = (0, _helpers.capitalize)(path[pathIndex].toLowerCase());
  if (path.length > 1) pathText += " > ".concat(entry);else pathText += "".concat(entry);
  pathQuery.innerHTML = pathText;
  pathIndex++;
}
},{"./helpers":"helpers.js"}],"draw-tree-map.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./helpers");

var _map = require("./map");

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
    currentCategory = '',
    path = [],
    pathText = "",
    pathIndex = 0,
    currentDataStructured;
fetch('data.json').then(function (response) {
  return response.json();
}).then(function (json) {
  return handleData(json);
});

function handleData(data) {
  // Show macro codes instead of contextNumber
  data.forEach(function (e) {
    return e['CONTEXT'] = (0, _map.getContextNumberDetails)(e['CONTEXT']).macro;
  }); // Set data

  currentData = _toConsumableArray(data);
  currentDataStructured = (0, _helpers.structureData)(data); // Setup treemap

  var config = setup();
  var treemap = config.treemap;
  var svg = config.svg;
  var g = config.g;

  function addCategoryToTreemap(category) {
    currentDataStructured = (0, _helpers.structureData)(data, category);

    if (category === 'CONTEXT') {
      var map = currentData.map(function (e) {
        return (0, _map.getContextNumberDetails)(e['CONTEXT']).macro;
      });
    }

    if (selection.length > 0) {
      currentCategory = category;
      var currentPath = selection[0].category;
      var currentSelection = selection[0].name;
      path.push(category);
      (0, _breadcrumbs.renderPath)(path, pathIndex, pathText);
      var filtered = currentData.filter(function (e) {
        return e[currentPath] == currentSelection;
      });
      var newData = (0, _helpers.structureData)(filtered, category);
    } else {
      var newData = (0, _helpers.structureData)(data, category);
    } // Render new data


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
  var zoomBtn = document.querySelector('#zoom');
  zoomBtn.addEventListener('click', zoomTreemap);
  var zoomBtnOut = document.querySelector('#back');
  zoomBtnOut.addEventListener('click', zoomTreemapOut);

  function zoomTreemap() {
    if (currentDataStructured.children[0].children.length > 10) {
      currentDataStructured.children[0].children.splice(0, 10);
      root = d3.hierarchy(currentDataStructured).sum(function (d) {
        return d.value;
      }).sort(function (a, b) {
        return b.value - a.value;
      });
      draw();
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
      selection.push({
        name: d.data.name,
        category: d.data.category
      });
      path.push(d.data.name);
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
      currentData = currentData.filter(function (e) {
        return e[d.data.category] == d.data.name;
      });
      currentDataStructured = (0, _helpers.structureData)(currentData);
      (0, _breadcrumbs.renderPath)(path, pathIndex, pathText);
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
      event(category);
    });
  });
}
},{"./helpers":"helpers.js","./map":"map.js","./breadcrumbs":"breadcrumbs.js"}],"index.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50834" + '/');

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