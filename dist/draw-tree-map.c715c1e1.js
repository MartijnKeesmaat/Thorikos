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
})({"draw-tree-map.js":[function(require,module,exports) {
function normalize(value, min, max) {
  return (value - min) / (max - min);
}

var dummy = {
  name: 'root',
  children: [{
    name: 'ao',
    children: [{
      name: 'Lekane',
      value: 364
    }, {
      name: 'Tile',
      value: 2482
    }, {
      name: 'Loomweight',
      value: 13
    }, {
      name: 'Jug',
      value: 532
    }, {
      name: 'Pithos',
      value: 712
    }, {
      name: 'Amphora',
      value: 2472
    }, {
      name: 'Undetermined',
      value: 5980
    }, {
      name: 'Closed shape',
      value: 2394
    }, {
      name: 'Cooking pot',
      value: 838
    }, {
      name: 'Open shape',
      value: 1720
    }, {
      name: 'Basin',
      value: 352
    }, {
      name: 'Bowl',
      value: 128
    }, {
      name: 'Skyphos',
      value: 163
    }, {
      name: 'Krater',
      value: 75
    }, {
      name: 'Kantharos',
      value: 16
    }, {
      name: 'Chytra',
      value: 38
    }, {
      name: 'Cup',
      value: 301
    }, {
      name: 'Juglet',
      value: 152
    }, {
      name: 'Louterion',
      value: 14
    }, {
      name: 'Grinding stone',
      value: 118
    }, {
      name: 'Plate',
      value: 38
    }, {
      name: 'Lamp',
      value: 59
    }, {
      name: 'Waster',
      value: 4
    }, {
      name: 'Hydria',
      value: 31
    }, {
      name: 'Table amphora',
      value: 73
    }, {
      name: 'Beehive',
      value: 90
    }, {
      name: 'Mortar',
      value: 127
    }, {
      name: 'Brasier',
      value: 3
    }, {
      name: 'Lekythos',
      value: 33
    }, {
      name: 'Kotyle',
      value: 44
    }, {
      name: 'Lid',
      value: 52
    }, {
      name: 'Stopper',
      value: 4
    }, {
      name: 'Lekanis',
      value: 23
    }, {
      name: 'Oinochoe',
      value: 38
    }, {
      name: 'Kylix',
      value: 44
    }, {
      name: 'Terracotta',
      value: 8
    }, {
      name: 'Amphora stopper',
      value: 1
    }, {
      name: 'Stone',
      value: 145
    }, {
      name: 'Stemless cup',
      value: 6
    }, {
      name: 'Slag',
      value: 18
    }, {
      name: 'Jar',
      value: 110
    }, {
      name: 'Brick',
      value: 44
    }, {
      name: 'Unguentarium',
      value: 3
    }, {
      name: 'Lagynos',
      value: 1
    }, {
      name: 'Saltcellar',
      value: 5
    }, {
      name: '',
      value: 2
    }, {
      name: 'Stand',
      value: 9
    }, {
      name: 'Shell',
      value: 39
    }, {
      name: 'Collared jar',
      value: 1
    }, {
      name: 'Pebble',
      value: 34
    }, {
      name: 'Pedestalled bowl',
      value: 7
    }, {
      name: 'Drinking vessel',
      value: 50
    }, {
      name: 'Olpe',
      value: 10
    }, {
      name: 'Mug',
      value: 3
    }, {
      name: 'Lopas',
      value: 12
    }, {
      name: 'Alabastron',
      value: 1
    }, {
      name: 'Funerary stele',
      value: 1
    }, {
      name: 'Cheese pot',
      value: 4
    }, {
      name: 'Lebes',
      value: 8
    }, {
      name: 'Aryballos',
      value: 4
    }, {
      name: 'Litharge',
      value: 3
    }, {
      name: 'Cistern lining',
      value: 6
    }, {
      name: 'Horseshoe',
      value: 1
    }, {
      name: 'Pyxis',
      value: 5
    }, {
      name: 'Stamnos',
      value: 1
    }, {
      name: 'Flake',
      value: 13
    }, {
      name: 'Bead',
      value: 1
    }, {
      name: 'Scraper',
      value: 1
    }, {
      name: 'Kados',
      value: 18
    }, {
      name: 'Scoop',
      value: 2
    }, {
      name: 'Pan',
      value: 9
    }, {
      name: 'Pessos',
      value: 7
    }, {
      name: 'Tripod',
      value: 3
    }, {
      name: 'Askos',
      value: 2
    }, {
      name: 'Antefix',
      value: 2
    }, {
      name: 'Griddle',
      value: 1
    }, {
      name: 'Loutrophoros',
      value: 1
    }, {
      name: 'Stemmed cup',
      value: 6
    }, {
      name: 'Cooking bell',
      value: 4
    }, {
      name: 'Tankard',
      value: 1
    }, {
      name: 'Exaleiptron',
      value: 2
    }, {
      name: 'Amphoriskos',
      value: 6
    }, {
      name: 'Storage vessel',
      value: 9
    }, {
      name: 'Skeleton',
      value: 2
    }, {
      name: 'Stemmed vessel',
      value: 2
    }, {
      name: 'Krateriskos',
      value: 2
    }, {
      name: 'Crushing stone',
      value: 1
    }, {
      name: 'Psykter',
      value: 1
    }, {
      name: 'Bolsal',
      value: 2
    }, {
      name: 'Spindle whorl',
      value: 1
    }, {
      name: 'Furnace base',
      value: 1
    }, {
      name: 'Pot',
      value: 2
    }, {
      name: 'Ashlar',
      value: 1
    }, {
      name: 'Crucible',
      value: 2
    }, {
      name: 'Sieve',
      value: 1
    }, {
      name: 'Dinos',
      value: 1
    }, {
      name: 'Trough',
      value: 1
    }, {
      name: 'Ladle',
      value: 1
    }, {
      name: 'Lopadion',
      value: 1
    }, {
      name: 'Stemmed bowl',
      value: 1
    }]
  }]
}; // https://bl.ocks.org/HarryStevens/545ca9d50cb9abbd68bfee526b0541f9

var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
},
    aspect = 0.85,
    minHeight = 400,
    duration = 1000,
    categories = 'abcdef'.split(''),
    colors = {};
categories.forEach(function (d, i) {
  colors[d] = d3.schemeSet2[i];
});
var treemap = d3.treemap().padding(1).round(true);
var svg = d3.select('.treemap').append('svg').call(d3.zoom().on('zoom', function () {
  svg.attr('transform', d3.event.transform);
}));
var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var root = d3.hierarchy(dummy).sum(function (d) {
  return d.value;
}).sort(function (a, b) {
  return b.value - a.value;
});
draw();

onresize = function onresize(_) {
  return draw(true);
}; // d3.interval(_ => {
//   // console.log(makeData());
//   root = d3
//     .hierarchy(dummy)
//     .sum(d => d.value)
//     .sort((a, b) => b.value - a.value);
//   draw();
// }, duration * 2);


function draw(resizing) {
  // width = innerWidth - margin.left - margin.right;
  width = 1000;
  var baseHeight = innerWidth * aspect;
  baseHeight = baseHeight < minHeight ? minHeight : baseHeight > innerHeight ? innerHeight : baseHeight; // height = baseHeight - margin.top - margin.bottom;

  height = 500;
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
    rects.exit().style('opacity', 1).transition().duration(duration).style('opacity', 1e-6).remove();
    rects.transition().duration(duration).attr('transform', function (d) {
      return "translate(".concat(d.x0, ",").concat(d.y0, ")");
    }).attr('width', function (d) {
      return d.x1 - d.x0;
    }).attr('height', function (d) {
      return d.y1 - d.y0;
    });
  }

  var counter = 104;
  rects.enter().append('rect').attr('class', 'rect').style('fill', function (d, i) {// const random = Math.floor(Math.random() * 3) + 7;
    // console.log(random);
    // return `rgba(127, 205, 144, ${random / 10}`;
  }).style('fill', function (d, i) {
    counter--;
    return "rgba(127, 205, 144, ".concat(0.3 + normalize(counter, 0, 104), ")");
  }) // TODO update this n eventually
  .attr('transform', function (d) {
    return "translate(".concat(d.x0, ",").concat(d.y0, ")");
  }).attr('width', function (d) {
    return d.x1 - d.x0;
  }).attr('height', function (d) {
    return d.y1 - d.y0;
  }).style('opacity', 1e-6).on('click', function (d) {
    var coords = d3.mouse(this);
    console.log(this);
    console.log(d.data.name);
    console.log(d.data.value);
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
    root = d3.hierarchy(newData).sum(function (d) {
      return d.value;
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    draw();
  }).on('mouseover', function (d) {
    this.style.opacity = 0.6;
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
    }).transition().duration(duration).attr('transform', function (d) {
      return "translate(".concat(d.x0, ", ").concat(d.y0, ")");
    });
  }

  labels.enter().append('text').attr('class', 'label').attr('dy', 16).attr('dx', 5).attr('fill', '#fff').attr('transform', function (d) {
    return "translate(".concat(d.x0, ", ").concat(d.y0, ")");
  }).html(function (d) {
    return "<tspan style='font-weight: 500'>".concat(d.data.name, "</tspan><tspan dx=10>").concat(d.data.value, "</tspan>");
  }).style('opacity', 1e-6).transition().duration(duration).style('opacity', 1);
}

function makeData() {
  return {
    name: 'root',
    children: categories.map(function (name) {
      return {
        name: name,
        children: d3.range(randBetween(5, 10)).map(function (d, i) {
          return {
            name: "".concat(name).concat(i),
            value: randBetween(10, 100)
          };
        })
      };
    })
  };
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
},{}],"../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64949" + '/');

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
},{}]},{},["../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","draw-tree-map.js"], null)
//# sourceMappingURL=/draw-tree-map.c715c1e1.js.map