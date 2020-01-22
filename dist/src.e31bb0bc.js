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
},{}],"../node_modules/html-to-image/lib/utils.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WOFF = 'application/font-woff';
var JPEG = 'image/jpeg';
var mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: JPEG,
    jpeg: JPEG,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
};
exports.uuid = (function uuid() {
    // generate uuid for className of pseudo elements.
    // We should not use GUIDs, otherwise pseudo elements sometimes cannot be captured.
    var counter = 0;
    // ref: http://stackoverflow.com/a/6248722/2519373
    var randomFourChars = function () {
        return ("0000" + (Math.random() * (Math.pow(36, 4)) << 0).toString(36)).slice(-4);
    };
    return function () {
        counter += 1;
        return "u" + randomFourChars() + counter;
    };
}());
function parseExtension(url) {
    var match = /\.([^./]*?)$/g.exec(url);
    if (match)
        return match[1];
    return '';
}
exports.parseExtension = parseExtension;
function getMimeType(url) {
    var ext = parseExtension(url).toLowerCase();
    return mimes[ext] || '';
}
exports.getMimeType = getMimeType;
function delay(ms) {
    return function (args) { return new Promise((function (resolve) {
        setTimeout(function () {
            resolve(args);
        }, ms);
    })); };
}
exports.delay = delay;
function createImage(url) {
    return new Promise((function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.onerror = reject;
        image.crossOrigin = 'anonymous';
        image.src = url;
    }));
}
exports.createImage = createImage;
function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
}
exports.isDataUrl = isDataUrl;
function toDataURL(content, mimeType) {
    return "data:" + mimeType + ";base64," + content;
}
exports.toDataURL = toDataURL;
function getDataURLContent(dataURL) {
    return dataURL.split(/,/)[1];
}
exports.getDataURLContent = getDataURLContent;
function toBlob(canvas) {
    return new Promise((function (resolve) {
        var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
        var len = binaryString.length;
        var binaryArray = new Uint8Array(len);
        for (var i = 0; i < len; i += 1) {
            binaryArray[i] = binaryString.charCodeAt(i);
        }
        resolve(new Blob([binaryArray], {
            type: 'image/png',
        }));
    }));
}
function canvasToBlob(canvas) {
    if (canvas.toBlob) {
        return new Promise((function (resolve) {
            canvas.toBlob(resolve);
        }));
    }
    return toBlob(canvas);
}
exports.canvasToBlob = canvasToBlob;
function toArray(arrayLike) {
    var arr = [];
    for (var i = 0, l = arrayLike.length; i < l; i += 1) {
        arr.push(arrayLike[i]);
    }
    return arr;
}
exports.toArray = toArray;
function px(node, styleProperty) {
    var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
    return parseFloat(value.replace('px', ''));
}
function getNodeWidth(node) {
    var leftBorder = px(node, 'border-left-width');
    var rightBorder = px(node, 'border-right-width');
    return node.scrollWidth + leftBorder + rightBorder;
}
exports.getNodeWidth = getNodeWidth;
function getNodeHeight(node) {
    var topBorder = px(node, 'border-top-width');
    var bottomBorder = px(node, 'border-bottom-width');
    return node.scrollHeight + topBorder + bottomBorder;
}
exports.getNodeHeight = getNodeHeight;
function getPixelRatio() {
    return (window.devicePixelRatio || 1);
}
exports.getPixelRatio = getPixelRatio;
function svgToDataURL(svg) {
    return Promise.resolve()
        .then(function () { return new XMLSerializer().serializeToString(svg); })
        .then(encodeURIComponent)
        .then(function (html) { return "data:image/svg+xml;charset=utf-8," + html; });
}
exports.svgToDataURL = svgToDataURL;
function getBlobFromImageURL(url) {
    return createImage(url).then(function (image) {
        var width = image.width, height = image.height;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var ratio = getPixelRatio();
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = "" + width;
        canvas.style.height = "" + height;
        context.scale(ratio, ratio);
        context.drawImage(image, 0, 0);
        var dataURL = canvas.toDataURL(getMimeType(url));
        return getDataURLContent(dataURL);
    });
}
exports.getBlobFromImageURL = getBlobFromImageURL;

},{}],"../node_modules/html-to-image/lib/clonePseudoElements.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function formatCssText(style) {
    var content = style.getPropertyValue('content');
    return style.cssText + " content: " + content + ";";
}
function formatCssProperties(style) {
    return utils_1.toArray(style).map(function (name) {
        var value = style.getPropertyValue(name);
        var priority = style.getPropertyPriority(name);
        return name + ": " + value + (priority ? ' !important' : '') + ";";
    }).join(' ');
}
function getPseudoElementStyle(className, pseudo, style) {
    var selector = "." + className + ":" + pseudo;
    var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
    return document.createTextNode(selector + "{" + cssText + "}");
}
function clonePseudoElement(nativeNode, clonedNode, pseudo) {
    var style = window.getComputedStyle(nativeNode, pseudo);
    var content = style.getPropertyValue('content');
    if (content === '' || content === 'none') {
        return;
    }
    var className = utils_1.uuid();
    var styleElement = document.createElement('style');
    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
    clonedNode.className = clonedNode.className + " " + className;
    clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode) {
    [
        ':before',
        ':after',
    ].forEach(function (pseudo) { return clonePseudoElement(nativeNode, clonedNode, pseudo); });
}
exports.default = clonePseudoElements;

},{"./utils":"../node_modules/html-to-image/lib/utils.js"}],"../node_modules/html-to-image/lib/cloneNode.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var clonePseudoElements_1 = __importDefault(require("./clonePseudoElements"));
function cloneSingleNode(nativeNode) {
    if (nativeNode instanceof HTMLCanvasElement) {
        return utils_1.createImage(nativeNode.toDataURL());
    }
    if (nativeNode.tagName && nativeNode.tagName.toLowerCase() === 'svg') {
        return Promise.resolve(nativeNode)
            .then(function (svg) { return utils_1.svgToDataURL(svg); })
            .then(utils_1.createImage);
    }
    return Promise.resolve(nativeNode.cloneNode(false));
}
function cloneChildren(nativeNode, clonedNode, filter) {
    var children = utils_1.toArray(nativeNode.childNodes);
    if (children.length === 0) {
        return Promise.resolve(clonedNode);
    }
    // clone children in order
    return children.reduce(function (done, child) { return done
        .then(function () { return cloneNode(child, filter); })
        .then(function (clonedChild) {
        if (clonedChild) {
            clonedNode.appendChild(clonedChild);
        }
    }); }, Promise.resolve())
        .then(function () { return clonedNode; });
}
function cloneCssStyle(nativeNode, clonedNode) {
    var source = window.getComputedStyle(nativeNode);
    var target = clonedNode.style;
    if (source.cssText) {
        target.cssText = source.cssText;
    }
    else {
        utils_1.toArray(source).forEach(function (name) {
            target.setProperty(name, source.getPropertyValue(name), source.getPropertyPriority(name));
        });
    }
}
function cloneInputValue(nativeNode, clonedNode) {
    if (nativeNode instanceof HTMLTextAreaElement) {
        clonedNode.innerHTML = nativeNode.value;
    }
    if (nativeNode instanceof HTMLInputElement) {
        clonedNode.setAttribute('value', nativeNode.value);
    }
}
function decorate(nativeNode, clonedNode) {
    if (!(clonedNode instanceof Element)) {
        return clonedNode;
    }
    return Promise.resolve()
        .then(function () { return cloneCssStyle(nativeNode, clonedNode); })
        .then(function () { return clonePseudoElements_1.default(nativeNode, clonedNode); })
        .then(function () { return cloneInputValue(nativeNode, clonedNode); })
        .then(function () { return clonedNode; });
}
function cloneNode(domNode, filter, isRoot) {
    if (!isRoot && filter && !filter(domNode)) {
        return Promise.resolve(null);
    }
    return Promise.resolve(domNode)
        .then(cloneSingleNode)
        .then(function (clonedNode) { return cloneChildren(domNode, clonedNode, filter); })
        .then(function (clonedNode) { return decorate(domNode, clonedNode); });
}
exports.default = cloneNode;

},{"./utils":"../node_modules/html-to-image/lib/utils.js","./clonePseudoElements":"../node_modules/html-to-image/lib/clonePseudoElements.js"}],"../node_modules/html-to-image/lib/getBlobFromURL.js":[function(require,module,exports) {
"use strict";
/* tslint:disable:max-line-length */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// KNOWN ISSUE
// -----------
// Can not handle redirect-url, such as when access 'http://something.com/avatar.png'
// will redirect to 'http://something.com/65fc2ffcc8aea7ba65a1d1feda173540'
var TIMEOUT = 30000;
function getBlobFromURL(url, options) {
    // cache bypass so we dont have CORS issues with cached images
    // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    if (options.cacheBust) {
        url += ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime(); // tslint:disable-line
    }
    var failed = function (reason) {
        var placeholder = '';
        if (options.imagePlaceholder) {
            var split = options.imagePlaceholder.split(/,/);
            if (split && split[1]) {
                placeholder = split[1];
            }
        }
        var msg = "Failed to fetch resource: " + url;
        if (reason) {
            msg = typeof reason === 'string' ? reason : reason.message;
        }
        if (msg) {
            console.error(msg);
        }
        return placeholder;
    };
    var deferred = window.fetch
        // fetch
        ? window.fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blob) { return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () { return resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }); })
            .then(utils_1.getDataURLContent)
            .catch(function () { return new Promise(function (resolve, reject) {
            reject();
        }); })
        // xhr
        : new Promise((function (resolve, reject) {
            var req = new XMLHttpRequest();
            var timeout = function () {
                reject(new Error("Timeout of " + TIMEOUT + "ms occured while fetching resource: " + url));
            };
            var done = function () {
                if (req.readyState !== 4) {
                    return;
                }
                if (req.status !== 200) {
                    reject(new Error("Failed to fetch resource: " + url + ", status: " + req.status));
                    return;
                }
                var encoder = new FileReader();
                encoder.onloadend = function () {
                    resolve(utils_1.getDataURLContent(encoder.result));
                };
                encoder.readAsDataURL(req.response);
            };
            req.onreadystatechange = done;
            req.ontimeout = timeout;
            req.responseType = 'blob';
            req.timeout = TIMEOUT;
            req.open('GET', url, true);
            req.send();
        }));
    return deferred.catch(failed);
}
exports.default = getBlobFromURL;

},{"./utils":"../node_modules/html-to-image/lib/utils.js"}],"../node_modules/html-to-image/lib/embedResources.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getBlobFromURL_1 = __importDefault(require("./getBlobFromURL"));
var utils_1 = require("./utils");
var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
function resolveUrl(url, baseUrl) {
    // url is absolute already
    if (url.match(/^[a-z]+:\/\//i)) {
        return url;
    }
    // url is absolute already, without protocol
    if (url.match(/^\/\//)) {
        return window.location.protocol + url;
    }
    // dataURI, mailto:, tel:, etc.
    if (url.match(/^[a-z]+:/i)) {
        return url;
    }
    var doc = document.implementation.createHTMLDocument();
    var base = doc.createElement('base');
    var a = doc.createElement('a');
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) {
        base.href = baseUrl;
    }
    a.href = url;
    return a.href;
}
function escape(url) {
    return url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
}
function urlToRegex(url) {
    return new RegExp("(url\\(['\"]?)(" + escape(url) + ")(['\"]?\\))", 'g');
}
function parseURLs(str) {
    var result = [];
    str.replace(URL_REGEX, function (raw, quotation, url) {
        result.push(url);
        return raw;
    });
    return result.filter(function (url) { return !utils_1.isDataUrl(url); });
}
function embed(cssString, resourceURL, baseURL, options) {
    var resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
    return Promise.resolve(resolvedURL)
        .then(function (url) { return getBlobFromURL_1.default(url, options); })
        .then(function (data) { return utils_1.toDataURL(data, utils_1.getMimeType(resourceURL)); })
        .then(function (dataURL) { return cssString.replace(urlToRegex(resourceURL), "$1" + dataURL + "$3"); })
        .then(function (content) { return content; }, function () { return resolvedURL; });
}
function shouldEmbed(string) {
    return string.search(URL_REGEX) !== -1;
}
exports.shouldEmbed = shouldEmbed;
function embedResources(cssString, baseUrl, options) {
    if (!shouldEmbed(cssString)) {
        return Promise.resolve(cssString);
    }
    return Promise.resolve(cssString)
        .then(parseURLs)
        .then(function (urls) { return urls.reduce(function (done, url) { return done.then(function (ret) { return embed(ret, url, baseUrl, options); }); }, Promise.resolve(cssString)); });
}
exports.default = embedResources;

},{"./getBlobFromURL":"../node_modules/html-to-image/lib/getBlobFromURL.js","./utils":"../node_modules/html-to-image/lib/utils.js"}],"../node_modules/html-to-image/lib/embedWebFonts.js":[function(require,module,exports) {
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var embedResources_1 = __importStar(require("./embedResources"));
function parseCSS(source) {
    if (source === undefined) {
        return [];
    }
    var cssText = source;
    var css = [];
    var cssKeyframeRegex = '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
    var combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]'
        + '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})'; // to match css & media queries together
    var cssCommentsRegex = new RegExp('(\\/\\*[\\s\\S]*?\\*\\/)', 'gi');
    // strip out comments
    cssText = cssText.replace(cssCommentsRegex, '');
    var keyframesRegex = new RegExp(cssKeyframeRegex, 'gi');
    var arr;
    while (true) {
        arr = keyframesRegex.exec(cssText);
        if (arr === null) {
            break;
        }
        css.push(arr[0]);
    }
    cssText = cssText.replace(keyframesRegex, '');
    // unified regex
    var unified = new RegExp(combinedCSSRegex, 'gi');
    while (true) {
        arr = unified.exec(cssText);
        if (arr === null) {
            break;
        }
        css.push(arr[0]);
    }
    return css;
}
function fetchCSS(url, sheet) {
    return fetch(url).then(function (res) {
        return {
            url: url,
            cssText: res.text(),
        };
    }, function (e) {
        console.log('ERROR FETCHING CSS: ', e.toString());
    });
}
function embedFonts(data) {
    return data.cssText.then(function (resolved) {
        var cssText = resolved;
        var fontLocations = cssText.match(/url\([^)]+\)/g) || [];
        var fontLoadedPromises = fontLocations.map(function (location) {
            var url = location.replace(/url\(([^]+)\)/g, '$1');
            if (!url.startsWith('https://')) {
                var source = data.url;
                url = new URL(url, source).href;
            }
            return new Promise(function (resolve, reject) {
                fetch(url)
                    .then(function (res) { return res.blob(); })
                    .then(function (blob) {
                    var reader = new FileReader();
                    reader.addEventListener('load', function (res) {
                        // Side Effect
                        cssText = cssText.replace(location, "url(" + reader.result + ")");
                        resolve([location, reader.result]);
                    });
                    reader.readAsDataURL(blob);
                })
                    .catch(reject);
            });
        });
        return Promise.all(fontLoadedPromises).then(function () { return cssText; });
    });
}
function getCssRules(styleSheets) {
    var ret = [];
    var promises = [];
    // First loop inlines imports
    styleSheets.forEach(function (sheet) {
        if ('cssRules' in sheet) {
            try {
                utils_1.toArray(sheet.cssRules).forEach(function (item) {
                    if (item.type === CSSRule.IMPORT_RULE) {
                        promises.push(fetchCSS(item.href, sheet)
                            .then(embedFonts)
                            .then(function (cssText) {
                            var parsed = parseCSS(cssText);
                            parsed.forEach(function (rule) {
                                sheet.insertRule(rule, sheet.cssRules.length);
                            });
                        })
                            .catch(function (e) {
                            console.log('Error loading remote css', e.toString());
                        }));
                    }
                });
            }
            catch (e) {
                var inline_1 = styleSheets.find(function (a) { return a.href === null; }) || document.styleSheets[0];
                if (sheet.href != null) {
                    promises.push(fetchCSS(sheet.href, inline_1)
                        .then(embedFonts)
                        .then(function (cssText) {
                        var parsed = parseCSS(cssText);
                        parsed.forEach(function (rule) {
                            inline_1.insertRule(rule, sheet.cssRules.length);
                        });
                    })
                        .catch(function (e) {
                        console.log('Error loading remote stylesheet', e.toString());
                    }));
                }
                console.log('Error inlining remote css file', e.toString());
            }
        }
    });
    return Promise
        .all(promises)
        .then(function () {
        // Second loop parses rules
        styleSheets.forEach(function (sheet) {
            if ('cssRules' in sheet) {
                try {
                    utils_1.toArray(sheet.cssRules).forEach(function (item) {
                        ret.push(item);
                    });
                }
                catch (e) {
                    console.log("Error while reading CSS rules from " + sheet.href, e.toString());
                }
            }
        });
        return ret;
    });
}
function getWebFontRules(cssRules) {
    return cssRules
        .filter(function (rule) { return rule.type === CSSRule.FONT_FACE_RULE; })
        .filter(function (rule) { return embedResources_1.shouldEmbed(rule.style.getPropertyValue('src')); });
}
function parseWebFontRules(clonedNode) {
    return new Promise(function (resolve, reject) {
        if (!clonedNode.ownerDocument) {
            reject(new Error('Provided element is not within a Document'));
        }
        resolve(utils_1.toArray(clonedNode.ownerDocument.styleSheets));
    })
        .then(getCssRules)
        .then(getWebFontRules);
}
exports.parseWebFontRules = parseWebFontRules;
function embedWebFonts(clonedNode, options) {
    return parseWebFontRules(clonedNode)
        .then(function (rules) { return Promise.all(rules.map(function (rule) {
        var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
        return embedResources_1.default(rule.cssText, baseUrl, options);
    })); })
        .then(function (cssStrings) { return cssStrings.join('\n'); })
        .then(function (cssString) {
        var styleNode = document.createElement('style');
        var sytleContent = document.createTextNode(cssString);
        styleNode.appendChild(sytleContent);
        if (clonedNode.firstChild) {
            clonedNode.insertBefore(styleNode, clonedNode.firstChild);
        }
        else {
            clonedNode.appendChild(styleNode);
        }
        return clonedNode;
    });
}
exports.default = embedWebFonts;

},{"./utils":"../node_modules/html-to-image/lib/utils.js","./embedResources":"../node_modules/html-to-image/lib/embedResources.js"}],"../node_modules/html-to-image/lib/embedImages.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var getBlobFromURL_1 = __importDefault(require("./getBlobFromURL"));
var embedResources_1 = __importDefault(require("./embedResources"));
function embedBackground(clonedNode, options) {
    var background = clonedNode.style.getPropertyValue('background');
    if (!background) {
        return Promise.resolve(clonedNode);
    }
    return Promise.resolve(background)
        .then(function (cssString) { return embedResources_1.default(cssString, null, options); })
        .then(function (cssString) {
        clonedNode.style.setProperty('background', cssString, clonedNode.style.getPropertyPriority('background'));
        return clonedNode;
    });
}
function embedImageNode(clonedNode, options) {
    if (!(clonedNode instanceof HTMLImageElement) || utils_1.isDataUrl(clonedNode.src)) {
        return Promise.resolve(clonedNode);
    }
    return Promise.resolve(clonedNode.src)
        .then(function (url) { return getBlobFromURL_1.default(url, options); })
        .then(function (data) { return utils_1.toDataURL(data, utils_1.getMimeType(clonedNode.src)); })
        .then(function (dataURL) { return new Promise((function (resolve, reject) {
        clonedNode.onload = resolve;
        clonedNode.onerror = reject;
        clonedNode.src = dataURL;
    })); })
        .then(function () { return clonedNode; }, function () { return clonedNode; });
}
function embedChildren(clonedNode, options) {
    var children = utils_1.toArray(clonedNode.childNodes);
    var deferreds = children.map(function (child) { return embedImages(child, options); });
    return Promise.all(deferreds).then(function () { return clonedNode; });
}
function embedImages(clonedNode, options) {
    if (!(clonedNode instanceof Element)) {
        return Promise.resolve(clonedNode);
    }
    return Promise.resolve(clonedNode)
        .then(function (node) { return embedBackground(node, options); })
        .then(function (node) { return embedImageNode(node, options); })
        .then(function (node) { return embedChildren(node, options); });
}
exports.default = embedImages;

},{"./utils":"../node_modules/html-to-image/lib/utils.js","./getBlobFromURL":"../node_modules/html-to-image/lib/getBlobFromURL.js","./embedResources":"../node_modules/html-to-image/lib/embedResources.js"}],"../node_modules/html-to-image/lib/createSvgDataURL.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function createSvgDataURL(clonedNode, width, height) {
    var xmlns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(xmlns, 'svg');
    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttributeNS('', 'width', "" + width);
    svg.setAttributeNS('', 'height', "" + height);
    foreignObject.setAttributeNS('', 'width', '100%');
    foreignObject.setAttributeNS('', 'height', '100%');
    foreignObject.setAttributeNS('', 'x', '0');
    foreignObject.setAttributeNS('', 'y', '0');
    foreignObject.setAttributeNS('', 'externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);
    foreignObject.appendChild(clonedNode);
    return utils_1.svgToDataURL(svg);
}
exports.default = createSvgDataURL;

},{"./utils":"../node_modules/html-to-image/lib/utils.js"}],"../node_modules/html-to-image/lib/applyStyleWithOptions.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyStyleWithOptions(clonedNode, options) {
    var style = clonedNode.style;
    if (options.backgroundColor) {
        style.backgroundColor = options.backgroundColor;
    }
    if (options.width) {
        style.width = options.width + "px";
    }
    if (options.height) {
        style.height = options.height + "px";
    }
    if (options.style) {
        Object.assign(style, options.style);
    }
    return clonedNode;
}
exports.default = applyStyleWithOptions;

},{}],"../node_modules/html-to-image/lib/index.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloneNode_1 = __importDefault(require("./cloneNode"));
var embedWebFonts_1 = __importDefault(require("./embedWebFonts"));
var embedImages_1 = __importDefault(require("./embedImages"));
var createSvgDataURL_1 = __importDefault(require("./createSvgDataURL"));
var applyStyleWithOptions_1 = __importDefault(require("./applyStyleWithOptions"));
var utils_1 = require("./utils");
function getImageSize(domNode, options) {
    if (options === void 0) { options = {}; }
    var width = options.width || utils_1.getNodeWidth(domNode);
    var height = options.height || utils_1.getNodeHeight(domNode);
    return { width: width, height: height };
}
function toSvgDataURL(domNode, options) {
    if (options === void 0) { options = {}; }
    var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
    return cloneNode_1.default(domNode, options.filter, true)
        .then(function (clonedNode) { return embedWebFonts_1.default(clonedNode, options); })
        .then(function (clonedNode) { return embedImages_1.default(clonedNode, options); })
        .then(function (clonedNode) { return applyStyleWithOptions_1.default(clonedNode, options); })
        .then(function (clonedNode) { return createSvgDataURL_1.default(clonedNode, width, height); });
}
exports.toSvgDataURL = toSvgDataURL;
function toCanvas(domNode, options) {
    if (options === void 0) { options = {}; }
    return toSvgDataURL(domNode, options)
        .then(utils_1.createImage)
        .then(utils_1.delay(100))
        .then(function (image) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var ratio = utils_1.getPixelRatio();
        var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = "" + width;
        canvas.style.height = "" + height;
        context.scale(ratio, ratio);
        if (options.backgroundColor) {
            context.fillStyle = options.backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(image, 0, 0);
        return canvas;
    });
}
exports.toCanvas = toCanvas;
function toPixelData(domNode, options) {
    if (options === void 0) { options = {}; }
    var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
    return toCanvas(domNode, options)
        .then(function (canvas) { return (canvas.getContext('2d').getImageData(0, 0, width, height).data); });
}
exports.toPixelData = toPixelData;
function toPng(domNode, options) {
    if (options === void 0) { options = {}; }
    return toCanvas(domNode, options).then(function (canvas) { return (canvas.toDataURL()); });
}
exports.toPng = toPng;
function toJpeg(domNode, options) {
    if (options === void 0) { options = {}; }
    return toCanvas(domNode, options).then(function (canvas) { return (canvas.toDataURL('image/jpeg', options.quality || 1)); });
}
exports.toJpeg = toJpeg;
function toBlob(domNode, options) {
    if (options === void 0) { options = {}; }
    return toCanvas(domNode, options).then(utils_1.canvasToBlob);
}
exports.toBlob = toBlob;
exports.default = {
    toSvgDataURL: toSvgDataURL,
    toCanvas: toCanvas,
    toPixelData: toPixelData,
    toPng: toPng,
    toJpeg: toJpeg,
    toBlob: toBlob,
};

},{"./cloneNode":"../node_modules/html-to-image/lib/cloneNode.js","./embedWebFonts":"../node_modules/html-to-image/lib/embedWebFonts.js","./embedImages":"../node_modules/html-to-image/lib/embedImages.js","./createSvgDataURL":"../node_modules/html-to-image/lib/createSvgDataURL.js","./applyStyleWithOptions":"../node_modules/html-to-image/lib/applyStyleWithOptions.js","./utils":"../node_modules/html-to-image/lib/utils.js"}],"../node_modules/downloadjs/download.js":[function(require,module,exports) {
var define;
//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));

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

var htmlToImage = _interopRequireWildcard(require("html-to-image"));

var _downloadjs = _interopRequireDefault(require("downloadjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    meso: "".concat(contextNumberSearch[2], "-").concat(contextNumberSearch[3]),
    mesoOnly: contextNumberSearch[3]
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
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, .4)');
  } else {
    document.querySelectorAll('.macro').forEach(function (i) {
      return i.classList.remove('showMacro');
    });
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 0)');
  }

  isShowMacro = !isShowMacro;
}

document.querySelector('.share').addEventListener('click', save);

function save() {
  if (!document.body.className.match('isFlipped')) {
    document.querySelector('body').classList.toggle('isFlipped');
    document.querySelector('#myCard').classList.toggle('flip');
    document.querySelector('.switch input').checked = true;
  }

  var dom = [document.querySelector('header'), document.querySelector('.back'), document.querySelector('.options--map'), document.querySelector('.categorial-buttons')];
  dom.forEach(function (e) {
    return e.style.display = 'none';
  });
  document.querySelectorAll('text').forEach(function (e) {
    return e.style.display = 'none';
  });
  htmlToImage.toPng(document.querySelector('body')).then(function (dataUrl) {
    (0, _downloadjs.default)(dataUrl, 'my-node.png');
    dom.forEach(function (e) {
      return e.style.display = 'flex';
    });
    document.querySelectorAll('text').forEach(function (e) {
      return e.style.display = 'block';
    });
  });
}
},{"./gridCodes":"gridCodes.js","html-to-image":"../node_modules/html-to-image/lib/index.js","downloadjs":"../node_modules/downloadjs/download.js"}],"helpers.js":[function(require,module,exports) {
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
  document.querySelector('.map-legend__middle').innerHTML = highestValue / 2;
  document.querySelector('.map-legend__highest').innerHTML = highestValue;
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
    return d.column * 50 + 25;
  }).attr('y', function (d, i) {
    return d.row * 50 + 15;
  });
  document.querySelector('.map-legend__middle').innerHTML = Math.floor(highestValue / 2);
  document.querySelector('.map-legend__highest').innerHTML = highestValue;
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
  currentData = currentData.filter(function (i) {
    return (0, _map.getContextNumberDetails)(i.CONTEXT).mesoOnly;
  });
  currentDataStructured = (0, _helpers.structureData)(currentData);
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

  addEventToCategoryBttn(addCategoryToTreemap);
  document.querySelector('#showMap').classList.add('pulse');
  setTimeout(function () {
    document.querySelector('#showMap').classList.remove('pulse');
  }, 1000); // First paint

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
      }, 1000);
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
    })[0];
    currentData = clickedBread.data;
    currentDataStructured = (0, _helpers.structureData)(clickedBread.data, false, clickedBread.name);
    (0, _drawMap.update)(mapSvg, spatialGrid, (0, _map.formatMeso)(currentData));
    breadcrumbs.path.splice(clickedBread.level + 1);
    breadcrumbs.currentLevel = clickedBread.level;
    breadcrumbs.nextLevel = true;
    printBreadCrumbs(breadcrumbs);
    var categoryButtons = document.querySelectorAll('.button-category');
    console.log(breadcrumbs);
    categoryButtons.forEach(function (e) {
      var category = e.dataset.category;
      console.log(category);

      if (breadcrumbs.path.some(function (i) {
        return i.name == category;
      })) {
        console.log('a');
      } else {
        console.log('b');
        e.classList.remove('button-active');
        e.classList.remove('button-activated');
      }
    });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54894" + '/');

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