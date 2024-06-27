(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i23 = decorators.length - 1, decorator; i23 >= 0; i23--)
      if (decorator = decorators[i23])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/jsdifflib/index.js
  var require_jsdifflib = __commonJS({
    "node_modules/jsdifflib/index.js"(exports, module) {
      __whitespace = { " ": true, "	": true, "\n": true, "\f": true, "\r": true };
      var difflib2 = module.exports = {
        defaultJunkFunction: function(c12) {
          return __whitespace.hasOwnProperty(c12);
        },
        stripLinebreaks: function(str) {
          return str.replace(/^[\n\r]*|[\n\r]*$/g, "");
        },
        stringAsLines: function(str) {
          var lfpos = str.indexOf("\n");
          var crpos = str.indexOf("\r");
          var linebreak = lfpos > -1 && crpos > -1 || crpos < 0 ? "\n" : "\r";
          var lines = str.split(linebreak);
          for (var i23 = 0; i23 < lines.length; i23++) {
            lines[i23] = difflib2.stripLinebreaks(lines[i23]);
          }
          return lines;
        },
        // iteration-based reduce implementation
        __reduce: function(func, list, initial) {
          if (initial != null) {
            var value = initial;
            var idx = 0;
          } else if (list) {
            var value = list[0];
            var idx = 1;
          } else {
            return null;
          }
          for (; idx < list.length; idx++) {
            value = func(value, list[idx]);
          }
          return value;
        },
        // comparison function for sorting lists of numeric tuples
        __ntuplecomp: function(a11, b7) {
          var mlen = Math.max(a11.length, b7.length);
          for (var i23 = 0; i23 < mlen; i23++) {
            if (a11[i23] < b7[i23])
              return -1;
            if (a11[i23] > b7[i23])
              return 1;
          }
          return a11.length == b7.length ? 0 : a11.length < b7.length ? -1 : 1;
        },
        __calculate_ratio: function(matches3, length) {
          return length ? 2 * matches3 / length : 1;
        },
        // returns a function that returns true if a key passed to the returned function
        // is in the dict (js object) provided to this function; replaces being able to
        // carry around dict.has_key in python...
        __isindict: function(dict) {
          return function(key) {
            return dict.hasOwnProperty(key);
          };
        },
        // replacement for python's dict.get function -- need easy default values
        __dictget: function(dict, key, defaultValue) {
          return dict.hasOwnProperty(key) ? dict[key] : defaultValue;
        },
        SequenceMatcher: function(a11, b7, isjunk) {
          this.set_seqs = function(a12, b8) {
            this.set_seq1(a12);
            this.set_seq2(b8);
          };
          this.set_seq1 = function(a12) {
            if (a12 == this.a)
              return;
            this.a = a12;
            this.matching_blocks = this.opcodes = null;
          };
          this.set_seq2 = function(b8) {
            if (b8 == this.b)
              return;
            this.b = b8;
            this.matching_blocks = this.opcodes = this.fullbcount = null;
            this.__chain_b();
          };
          this.__chain_b = function() {
            var b8 = this.b;
            var n31 = b8.length;
            var b2j = this.b2j = {};
            var populardict = {};
            for (var i23 = 0; i23 < b8.length; i23++) {
              var elt = b8[i23];
              if (b2j.hasOwnProperty(elt)) {
                var indices = b2j[elt];
                if (n31 >= 200 && indices.length * 100 > n31) {
                  populardict[elt] = 1;
                  delete b2j[elt];
                } else {
                  indices.push(i23);
                }
              } else {
                b2j[elt] = [i23];
              }
            }
            for (var elt in populardict) {
              if (populardict.hasOwnProperty(elt)) {
                delete b2j[elt];
              }
            }
            var isjunk2 = this.isjunk;
            var junkdict = {};
            if (isjunk2) {
              for (var elt in populardict) {
                if (populardict.hasOwnProperty(elt) && isjunk2(elt)) {
                  junkdict[elt] = 1;
                  delete populardict[elt];
                }
              }
              for (var elt in b2j) {
                if (b2j.hasOwnProperty(elt) && isjunk2(elt)) {
                  junkdict[elt] = 1;
                  delete b2j[elt];
                }
              }
            }
            this.isbjunk = difflib2.__isindict(junkdict);
            this.isbpopular = difflib2.__isindict(populardict);
          };
          this.find_longest_match = function(alo, ahi, blo, bhi) {
            var a12 = this.a;
            var b8 = this.b;
            var b2j = this.b2j;
            var isbjunk = this.isbjunk;
            var besti = alo;
            var bestj = blo;
            var bestsize = 0;
            var j3 = null;
            var j2len = {};
            var nothing = [];
            for (var i23 = alo; i23 < ahi; i23++) {
              var newj2len = {};
              var jdict = difflib2.__dictget(b2j, a12[i23], nothing);
              for (var jkey in jdict) {
                if (jdict.hasOwnProperty(jkey)) {
                  j3 = jdict[jkey];
                  if (j3 < blo)
                    continue;
                  if (j3 >= bhi)
                    break;
                  newj2len[j3] = k = difflib2.__dictget(j2len, j3 - 1, 0) + 1;
                  if (k > bestsize) {
                    besti = i23 - k + 1;
                    bestj = j3 - k + 1;
                    bestsize = k;
                  }
                }
              }
              j2len = newj2len;
            }
            while (besti > alo && bestj > blo && !isbjunk(b8[bestj - 1]) && a12[besti - 1] == b8[bestj - 1]) {
              besti--;
              bestj--;
              bestsize++;
            }
            while (besti + bestsize < ahi && bestj + bestsize < bhi && !isbjunk(b8[bestj + bestsize]) && a12[besti + bestsize] == b8[bestj + bestsize]) {
              bestsize++;
            }
            while (besti > alo && bestj > blo && isbjunk(b8[bestj - 1]) && a12[besti - 1] == b8[bestj - 1]) {
              besti--;
              bestj--;
              bestsize++;
            }
            while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b8[bestj + bestsize]) && a12[besti + bestsize] == b8[bestj + bestsize]) {
              bestsize++;
            }
            return [besti, bestj, bestsize];
          };
          this.get_matching_blocks = function() {
            if (this.matching_blocks != null)
              return this.matching_blocks;
            var la = this.a.length;
            var lb = this.b.length;
            var queue = [[0, la, 0, lb]];
            var matching_blocks = [];
            var alo, ahi, blo, bhi, qi, i23, j3, k8, x6;
            while (queue.length) {
              qi = queue.pop();
              alo = qi[0];
              ahi = qi[1];
              blo = qi[2];
              bhi = qi[3];
              x6 = this.find_longest_match(alo, ahi, blo, bhi);
              i23 = x6[0];
              j3 = x6[1];
              k8 = x6[2];
              if (k8) {
                matching_blocks.push(x6);
                if (alo < i23 && blo < j3)
                  queue.push([alo, i23, blo, j3]);
                if (i23 + k8 < ahi && j3 + k8 < bhi)
                  queue.push([i23 + k8, ahi, j3 + k8, bhi]);
              }
            }
            matching_blocks.sort(difflib2.__ntuplecomp);
            var i1 = j1 = k1 = block = 0;
            var non_adjacent = [];
            for (var idx in matching_blocks) {
              if (matching_blocks.hasOwnProperty(idx)) {
                block = matching_blocks[idx];
                i2 = block[0];
                j2 = block[1];
                k2 = block[2];
                if (i1 + k1 == i2 && j1 + k1 == j2) {
                  k1 += k2;
                } else {
                  if (k1)
                    non_adjacent.push([i1, j1, k1]);
                  i1 = i2;
                  j1 = j2;
                  k1 = k2;
                }
              }
            }
            if (k1)
              non_adjacent.push([i1, j1, k1]);
            non_adjacent.push([la, lb, 0]);
            this.matching_blocks = non_adjacent;
            return this.matching_blocks;
          };
          this.get_opcodes = function() {
            if (this.opcodes != null)
              return this.opcodes;
            var i23 = 0;
            var j3 = 0;
            var answer = [];
            this.opcodes = answer;
            var block2, ai, bj, size, tag;
            var blocks = this.get_matching_blocks();
            for (var idx in blocks) {
              if (blocks.hasOwnProperty(idx)) {
                block2 = blocks[idx];
                ai = block2[0];
                bj = block2[1];
                size = block2[2];
                tag = "";
                if (i23 < ai && j3 < bj) {
                  tag = "replace";
                } else if (i23 < ai) {
                  tag = "delete";
                } else if (j3 < bj) {
                  tag = "insert";
                }
                if (tag)
                  answer.push([tag, i23, ai, j3, bj]);
                i23 = ai + size;
                j3 = bj + size;
                if (size)
                  answer.push(["equal", ai, i23, bj, j3]);
              }
            }
            return answer;
          };
          this.get_grouped_opcodes = function(n31) {
            if (!n31)
              n31 = 3;
            var codes = this.get_opcodes();
            if (!codes)
              codes = [["equal", 0, 1, 0, 1]];
            var code2, tag, i1, i23, j12, j22;
            if (codes[0][0] == "equal") {
              code2 = codes[0];
              tag = code2[0];
              i1 = code2[1];
              i23 = code2[2];
              j12 = code2[3];
              j22 = code2[4];
              codes[0] = [tag, Math.max(i1, i23 - n31), i23, Math.max(j12, j22 - n31), j22];
            }
            if (codes[codes.length - 1][0] == "equal") {
              code2 = codes[codes.length - 1];
              tag = code2[0];
              i1 = code2[1];
              i23 = code2[2];
              j12 = code2[3];
              j22 = code2[4];
              codes[codes.length - 1] = [tag, i1, Math.min(i23, i1 + n31), j12, Math.min(j22, j12 + n31)];
            }
            var nn = n31 + n31;
            var groups = [];
            for (var idx in codes) {
              if (codes.hasOwnProperty(idx)) {
                code2 = codes[idx];
                tag = code2[0];
                i1 = code2[1];
                i23 = code2[2];
                j12 = code2[3];
                j22 = code2[4];
                if (tag == "equal" && i23 - i1 > nn) {
                  groups.push([tag, i1, Math.min(i23, i1 + n31), j12, Math.min(j22, j12 + n31)]);
                  i1 = Math.max(i1, i23 - n31);
                  j12 = Math.max(j12, j22 - n31);
                }
                groups.push([tag, i1, i23, j12, j22]);
              }
            }
            if (groups && groups[groups.length - 1][0] == "equal")
              groups.pop();
            return groups;
          };
          this.ratio = function() {
            matches = difflib2.__reduce(
              function(sum, triple) {
                return sum + triple[triple.length - 1];
              },
              this.get_matching_blocks(),
              0
            );
            return difflib2.__calculate_ratio(matches, this.a.length + this.b.length);
          };
          this.quick_ratio = function() {
            var fullbcount, elt;
            if (this.fullbcount == null) {
              this.fullbcount = fullbcount = {};
              for (var i23 = 0; i23 < this.b.length; i23++) {
                elt = this.b[i23];
                fullbcount[elt] = difflib2.__dictget(fullbcount, elt, 0) + 1;
              }
            }
            fullbcount = this.fullbcount;
            var avail = {};
            var availhas = difflib2.__isindict(avail);
            var matches3 = numb = 0;
            for (var i23 = 0; i23 < this.a.length; i23++) {
              elt = this.a[i23];
              if (availhas(elt)) {
                numb = avail[elt];
              } else {
                numb = difflib2.__dictget(fullbcount, elt, 0);
              }
              avail[elt] = numb - 1;
              if (numb > 0)
                matches3++;
            }
            return difflib2.__calculate_ratio(matches3, this.a.length + this.b.length);
          };
          this.real_quick_ratio = function() {
            var la = this.a.length;
            var lb = this.b.length;
            return _calculate_ratio(Math.min(la, lb), la + lb);
          };
          this.isjunk = isjunk ? isjunk : difflib2.defaultJunkFunction;
          this.a = this.b = null;
          this.set_seqs(a11, b7);
        },
        /**
         * Builds and returns a visual diff view.  The single parameter, `params', should contain
         * the following values:
         *
         * - baseText: the string that will be used as the base input to SequenceMatcher
         * - nextText: the string that will be used as the new text input to SequenceMatcher
         *
         * or
         *
         * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
         * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
         * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
         *
         * and:
         *
         * - baseTextName: the title to be displayed above the base text listing in the diff view; defaults
         *     to "Base Text"
         * - newTextName: the title to be displayed above the new text listing in the diff view; defaults
         *     to "New Text"
         * - contextSize: the number of lines of context to show around differences; by default, all lines
         *     are shown
         * - inline: if false, a side-by-side diff view is generated (default); if true, an inline diff view is
         *     generated
         */
        buildView: function(params) {
          var baseTextLines = params.baseTextLines === void 0 ? difflib2.stringAsLines(params.baseText) : params.baseTextLines;
          var newTextLines = params.newTextLines === void 0 ? difflib2.stringAsLines(params.newText) : params.newTextLines;
          var opcodes = params.opcodes === void 0 ? new difflib2.SequenceMatcher(baseTextLines, newTextLines).get_opcodes() : params.opcodes;
          var baseTextName = params.baseTextName ? params.baseTextName : "Base Text";
          var newTextName = params.newTextName ? params.newTextName : "New Text";
          var contextSize = params.contextSize;
          var inline = params.inline || false;
          if (baseTextLines == null)
            throw "Cannot build diff view; baseTextLines is not defined.";
          if (newTextLines == null)
            throw "Cannot build diff view; newTextLines is not defined.";
          if (!opcodes)
            throw "Canno build diff view; opcodes is not defined.";
          function celt(name, clazz) {
            var e33 = document.createElement(name);
            e33.className = clazz;
            return e33;
          }
          function telt(name, text) {
            var e33 = document.createElement(name);
            e33.appendChild(document.createTextNode(text));
            return e33;
          }
          function ctelt(name, clazz, text) {
            var e33 = document.createElement(name);
            e33.className = clazz;
            e33.appendChild(document.createTextNode(text));
            return e33;
          }
          var tdata = document.createElement("thead");
          var node = document.createElement("tr");
          tdata.appendChild(node);
          if (inline) {
            node.appendChild(document.createElement("th"));
            node.appendChild(document.createElement("th"));
            node.appendChild(ctelt("th", "texttitle", baseTextName + " vs. " + newTextName));
          } else {
            node.appendChild(document.createElement("th"));
            node.appendChild(ctelt("th", "texttitle", baseTextName));
            node.appendChild(document.createElement("th"));
            node.appendChild(ctelt("th", "texttitle", newTextName));
          }
          tdata = [tdata];
          var rows = [];
          var node2;
          function addCells(row, tidx, tend, textLines, change2) {
            if (tidx < tend) {
              row.appendChild(telt("th", (tidx + 1).toString()));
              row.appendChild(ctelt("td", change2, textLines[tidx].replace(/\t/g, "\xA0\xA0\xA0\xA0")));
              return tidx + 1;
            } else {
              row.appendChild(document.createElement("th"));
              row.appendChild(celt("td", "empty"));
              return tidx;
            }
          }
          function addCellsInline(row, tidx, tidx2, textLines, change2) {
            row.className = change2;
            row.appendChild(telt("th", tidx == null ? "" : (tidx + 1).toString()));
            row.appendChild(telt("th", tidx2 == null ? "" : (tidx2 + 1).toString()));
            row.appendChild(telt("td", textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\xA0\xA0\xA0\xA0")));
          }
          for (var idx = 0; idx < opcodes.length; idx++) {
            code = opcodes[idx];
            change = code[0];
            var b7 = code[1];
            var be = code[2];
            var n31 = code[3];
            var ne = code[4];
            var rowcnt = Math.max(be - b7, ne - n31);
            var toprows = [];
            var botrows = [];
            for (var i23 = 0; i23 < rowcnt; i23++) {
              if (contextSize && opcodes.length > 1 && (idx > 0 && i23 == contextSize || idx == 0 && i23 == 0) && change == "equal") {
                var jump = rowcnt - (idx == 0 ? 1 : 2) * contextSize;
                if (jump > 1) {
                  toprows.push(node = document.createElement("tr"));
                  b7 += jump;
                  n31 += jump;
                  i23 += jump - 1;
                  node.appendChild(telt("th", "..."));
                  if (!inline)
                    node.appendChild(ctelt("td", "skip", ""));
                  node.appendChild(telt("th", "..."));
                  node.appendChild(ctelt("td", "skip", ""));
                  if (idx + 1 == opcodes.length) {
                    break;
                  } else {
                    continue;
                  }
                }
              }
              toprows.push(node = document.createElement("tr"));
              if (inline) {
                if (change == "insert") {
                  addCellsInline(node, null, n31++, newTextLines, change);
                } else if (change == "replace") {
                  botrows.push(node2 = document.createElement("tr"));
                  if (b7 < be)
                    addCellsInline(node, b7++, null, baseTextLines, "delete");
                  if (n31 < ne)
                    addCellsInline(node2, null, n31++, newTextLines, "insert");
                } else if (change == "delete") {
                  addCellsInline(node, b7++, null, baseTextLines, change);
                } else {
                  addCellsInline(node, b7++, n31++, baseTextLines, change);
                }
              } else {
                b7 = addCells(node, b7, be, baseTextLines, change);
                n31 = addCells(node, n31, ne, newTextLines, change);
              }
            }
            for (var i23 = 0; i23 < toprows.length; i23++)
              rows.push(toprows[i23]);
            for (var i23 = 0; i23 < botrows.length; i23++)
              rows.push(botrows[i23]);
          }
          rows.push(node = ctelt("th", "author", "diff view generated by "));
          node.setAttribute("colspan", inline ? 3 : 4);
          node.appendChild(node2 = telt("a", "jsdifflib"));
          node2.setAttribute("href", "http://github.com/cemerick/jsdifflib");
          tdata.push(node = document.createElement("tbody"));
          for (var idx in rows)
            node.appendChild(rows[idx]);
          node = celt("table", "diff" + (inline ? " inlinediff" : ""));
          for (var idx in tdata)
            node.appendChild(tdata[idx]);
          return node;
        }
      };
    }
  });

  // node_modules/jstat/dist/jstat.js
  var require_jstat = __commonJS({
    "node_modules/jstat/dist/jstat.js"(exports, module) {
      (function(window2, factory) {
        if (typeof exports === "object") {
          module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define(factory);
        } else {
          window2.jStat = factory();
        }
      })(exports, function() {
        var jStat2 = function(Math2, undefined2) {
          var concat = Array.prototype.concat;
          var slice = Array.prototype.slice;
          var toString2 = Object.prototype.toString;
          function calcRdx(n31, m6) {
            var val = n31 > m6 ? n31 : m6;
            return Math2.pow(
              10,
              17 - ~~(Math2.log(val > 0 ? val : -val) * Math2.LOG10E)
            );
          }
          var isArray = Array.isArray || function isArray2(arg) {
            return toString2.call(arg) === "[object Array]";
          };
          function isFunction2(arg) {
            return toString2.call(arg) === "[object Function]";
          }
          function isNumber(num) {
            return typeof num === "number" ? num - num === 0 : false;
          }
          function toVector(arr) {
            return concat.apply([], arr);
          }
          function jStat3() {
            return new jStat3._init(arguments);
          }
          jStat3.fn = jStat3.prototype;
          jStat3._init = function _init(args) {
            if (isArray(args[0])) {
              if (isArray(args[0][0])) {
                if (isFunction2(args[1]))
                  args[0] = jStat3.map(args[0], args[1]);
                for (var i23 = 0; i23 < args[0].length; i23++)
                  this[i23] = args[0][i23];
                this.length = args[0].length;
              } else {
                this[0] = isFunction2(args[1]) ? jStat3.map(args[0], args[1]) : args[0];
                this.length = 1;
              }
            } else if (isNumber(args[0])) {
              this[0] = jStat3.seq.apply(null, args);
              this.length = 1;
            } else if (args[0] instanceof jStat3) {
              return jStat3(args[0].toArray());
            } else {
              this[0] = [];
              this.length = 1;
            }
            return this;
          };
          jStat3._init.prototype = jStat3.prototype;
          jStat3._init.constructor = jStat3;
          jStat3.utils = {
            calcRdx,
            isArray,
            isFunction: isFunction2,
            isNumber,
            toVector
          };
          jStat3._random_fn = Math2.random;
          jStat3.setRandom = function setRandom(fn2) {
            if (typeof fn2 !== "function")
              throw new TypeError("fn is not a function");
            jStat3._random_fn = fn2;
          };
          jStat3.extend = function extend(obj) {
            var i23, j3;
            if (arguments.length === 1) {
              for (j3 in obj)
                jStat3[j3] = obj[j3];
              return this;
            }
            for (i23 = 1; i23 < arguments.length; i23++) {
              for (j3 in arguments[i23])
                obj[j3] = arguments[i23][j3];
            }
            return obj;
          };
          jStat3.rows = function rows(arr) {
            return arr.length || 1;
          };
          jStat3.cols = function cols(arr) {
            return arr[0].length || 1;
          };
          jStat3.dimensions = function dimensions(arr) {
            return {
              rows: jStat3.rows(arr),
              cols: jStat3.cols(arr)
            };
          };
          jStat3.row = function row(arr, index) {
            if (isArray(index)) {
              return index.map(function(i23) {
                return jStat3.row(arr, i23);
              });
            }
            return arr[index];
          };
          jStat3.rowa = function rowa(arr, i23) {
            return jStat3.row(arr, i23);
          };
          jStat3.col = function col(arr, index) {
            if (isArray(index)) {
              var submat = jStat3.arange(arr.length).map(function() {
                return new Array(index.length);
              });
              index.forEach(function(ind, i24) {
                jStat3.arange(arr.length).forEach(function(j3) {
                  submat[j3][i24] = arr[j3][ind];
                });
              });
              return submat;
            }
            var column = new Array(arr.length);
            for (var i23 = 0; i23 < arr.length; i23++)
              column[i23] = [arr[i23][index]];
            return column;
          };
          jStat3.cola = function cola(arr, i23) {
            return jStat3.col(arr, i23).map(function(a11) {
              return a11[0];
            });
          };
          jStat3.diag = function diag(arr) {
            var nrow = jStat3.rows(arr);
            var res = new Array(nrow);
            for (var row = 0; row < nrow; row++)
              res[row] = [arr[row][row]];
            return res;
          };
          jStat3.antidiag = function antidiag(arr) {
            var nrow = jStat3.rows(arr) - 1;
            var res = new Array(nrow);
            for (var i23 = 0; nrow >= 0; nrow--, i23++)
              res[i23] = [arr[i23][nrow]];
            return res;
          };
          jStat3.transpose = function transpose(arr) {
            var obj = [];
            var objArr, rows, cols, j3, i23;
            if (!isArray(arr[0]))
              arr = [arr];
            rows = arr.length;
            cols = arr[0].length;
            for (i23 = 0; i23 < cols; i23++) {
              objArr = new Array(rows);
              for (j3 = 0; j3 < rows; j3++)
                objArr[j3] = arr[j3][i23];
              obj.push(objArr);
            }
            return obj.length === 1 ? obj[0] : obj;
          };
          jStat3.map = function map2(arr, func, toAlter) {
            var row, nrow, ncol, res, col;
            if (!isArray(arr[0]))
              arr = [arr];
            nrow = arr.length;
            ncol = arr[0].length;
            res = toAlter ? arr : new Array(nrow);
            for (row = 0; row < nrow; row++) {
              if (!res[row])
                res[row] = new Array(ncol);
              for (col = 0; col < ncol; col++)
                res[row][col] = func(arr[row][col], row, col);
            }
            return res.length === 1 ? res[0] : res;
          };
          jStat3.cumreduce = function cumreduce(arr, func, toAlter) {
            var row, nrow, ncol, res, col;
            if (!isArray(arr[0]))
              arr = [arr];
            nrow = arr.length;
            ncol = arr[0].length;
            res = toAlter ? arr : new Array(nrow);
            for (row = 0; row < nrow; row++) {
              if (!res[row])
                res[row] = new Array(ncol);
              if (ncol > 0)
                res[row][0] = arr[row][0];
              for (col = 1; col < ncol; col++)
                res[row][col] = func(res[row][col - 1], arr[row][col]);
            }
            return res.length === 1 ? res[0] : res;
          };
          jStat3.alter = function alter(arr, func) {
            return jStat3.map(arr, func, true);
          };
          jStat3.create = function create(rows, cols, func) {
            var res = new Array(rows);
            var i23, j3;
            if (isFunction2(cols)) {
              func = cols;
              cols = rows;
            }
            for (i23 = 0; i23 < rows; i23++) {
              res[i23] = new Array(cols);
              for (j3 = 0; j3 < cols; j3++)
                res[i23][j3] = func(i23, j3);
            }
            return res;
          };
          function retZero() {
            return 0;
          }
          jStat3.zeros = function zeros(rows, cols) {
            if (!isNumber(cols))
              cols = rows;
            return jStat3.create(rows, cols, retZero);
          };
          function retOne() {
            return 1;
          }
          jStat3.ones = function ones(rows, cols) {
            if (!isNumber(cols))
              cols = rows;
            return jStat3.create(rows, cols, retOne);
          };
          jStat3.rand = function rand(rows, cols) {
            if (!isNumber(cols))
              cols = rows;
            return jStat3.create(rows, cols, jStat3._random_fn);
          };
          function retIdent(i23, j3) {
            return i23 === j3 ? 1 : 0;
          }
          jStat3.identity = function identity(rows, cols) {
            if (!isNumber(cols))
              cols = rows;
            return jStat3.create(rows, cols, retIdent);
          };
          jStat3.symmetric = function symmetric(arr) {
            var size = arr.length;
            var row, col;
            if (arr.length !== arr[0].length)
              return false;
            for (row = 0; row < size; row++) {
              for (col = 0; col < size; col++)
                if (arr[col][row] !== arr[row][col])
                  return false;
            }
            return true;
          };
          jStat3.clear = function clear2(arr) {
            return jStat3.alter(arr, retZero);
          };
          jStat3.seq = function seq(min, max, length, func) {
            if (!isFunction2(func))
              func = false;
            var arr = [];
            var hival = calcRdx(min, max);
            var step = (max * hival - min * hival) / ((length - 1) * hival);
            var current = min;
            var cnt;
            for (cnt = 0; current <= max && cnt < length; cnt++, current = (min * hival + step * hival * cnt) / hival) {
              arr.push(func ? func(current, cnt) : current);
            }
            return arr;
          };
          jStat3.arange = function arange(start, end, step) {
            var rl = [];
            var i23;
            step = step || 1;
            if (end === undefined2) {
              end = start;
              start = 0;
            }
            if (start === end || step === 0) {
              return [];
            }
            if (start < end && step < 0) {
              return [];
            }
            if (start > end && step > 0) {
              return [];
            }
            if (step > 0) {
              for (i23 = start; i23 < end; i23 += step) {
                rl.push(i23);
              }
            } else {
              for (i23 = start; i23 > end; i23 += step) {
                rl.push(i23);
              }
            }
            return rl;
          };
          jStat3.slice = /* @__PURE__ */ function() {
            function _slice(list, start, end, step) {
              var i23;
              var rl = [];
              var length = list.length;
              if (start === undefined2 && end === undefined2 && step === undefined2) {
                return jStat3.copy(list);
              }
              start = start || 0;
              end = end || list.length;
              start = start >= 0 ? start : length + start;
              end = end >= 0 ? end : length + end;
              step = step || 1;
              if (start === end || step === 0) {
                return [];
              }
              if (start < end && step < 0) {
                return [];
              }
              if (start > end && step > 0) {
                return [];
              }
              if (step > 0) {
                for (i23 = start; i23 < end; i23 += step) {
                  rl.push(list[i23]);
                }
              } else {
                for (i23 = start; i23 > end; i23 += step) {
                  rl.push(list[i23]);
                }
              }
              return rl;
            }
            function slice2(list, rcSlice) {
              var colSlice, rowSlice;
              rcSlice = rcSlice || {};
              if (isNumber(rcSlice.row)) {
                if (isNumber(rcSlice.col))
                  return list[rcSlice.row][rcSlice.col];
                var row = jStat3.rowa(list, rcSlice.row);
                colSlice = rcSlice.col || {};
                return _slice(row, colSlice.start, colSlice.end, colSlice.step);
              }
              if (isNumber(rcSlice.col)) {
                var col = jStat3.cola(list, rcSlice.col);
                rowSlice = rcSlice.row || {};
                return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step);
              }
              rowSlice = rcSlice.row || {};
              colSlice = rcSlice.col || {};
              var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step);
              return rows.map(function(row2) {
                return _slice(row2, colSlice.start, colSlice.end, colSlice.step);
              });
            }
            return slice2;
          }();
          jStat3.sliceAssign = function sliceAssign(A6, rcSlice, B5) {
            var nl, ml;
            if (isNumber(rcSlice.row)) {
              if (isNumber(rcSlice.col))
                return A6[rcSlice.row][rcSlice.col] = B5;
              rcSlice.col = rcSlice.col || {};
              rcSlice.col.start = rcSlice.col.start || 0;
              rcSlice.col.end = rcSlice.col.end || A6[0].length;
              rcSlice.col.step = rcSlice.col.step || 1;
              nl = jStat3.arange(
                rcSlice.col.start,
                Math2.min(A6.length, rcSlice.col.end),
                rcSlice.col.step
              );
              var m6 = rcSlice.row;
              nl.forEach(function(n32, i23) {
                A6[m6][n32] = B5[i23];
              });
              return A6;
            }
            if (isNumber(rcSlice.col)) {
              rcSlice.row = rcSlice.row || {};
              rcSlice.row.start = rcSlice.row.start || 0;
              rcSlice.row.end = rcSlice.row.end || A6.length;
              rcSlice.row.step = rcSlice.row.step || 1;
              ml = jStat3.arange(
                rcSlice.row.start,
                Math2.min(A6[0].length, rcSlice.row.end),
                rcSlice.row.step
              );
              var n31 = rcSlice.col;
              ml.forEach(function(m7, j3) {
                A6[m7][n31] = B5[j3];
              });
              return A6;
            }
            if (B5[0].length === undefined2) {
              B5 = [B5];
            }
            rcSlice.row.start = rcSlice.row.start || 0;
            rcSlice.row.end = rcSlice.row.end || A6.length;
            rcSlice.row.step = rcSlice.row.step || 1;
            rcSlice.col.start = rcSlice.col.start || 0;
            rcSlice.col.end = rcSlice.col.end || A6[0].length;
            rcSlice.col.step = rcSlice.col.step || 1;
            ml = jStat3.arange(
              rcSlice.row.start,
              Math2.min(A6.length, rcSlice.row.end),
              rcSlice.row.step
            );
            nl = jStat3.arange(
              rcSlice.col.start,
              Math2.min(A6[0].length, rcSlice.col.end),
              rcSlice.col.step
            );
            ml.forEach(function(m7, i23) {
              nl.forEach(function(n32, j3) {
                A6[m7][n32] = B5[i23][j3];
              });
            });
            return A6;
          };
          jStat3.diagonal = function diagonal(diagArray) {
            var mat = jStat3.zeros(diagArray.length, diagArray.length);
            diagArray.forEach(function(t17, i23) {
              mat[i23][i23] = t17;
            });
            return mat;
          };
          jStat3.copy = function copy(A6) {
            return A6.map(function(row) {
              if (isNumber(row))
                return row;
              return row.map(function(t17) {
                return t17;
              });
            });
          };
          var jProto = jStat3.prototype;
          jProto.length = 0;
          jProto.push = Array.prototype.push;
          jProto.sort = Array.prototype.sort;
          jProto.splice = Array.prototype.splice;
          jProto.slice = Array.prototype.slice;
          jProto.toArray = function toArray() {
            return this.length > 1 ? slice.call(this) : slice.call(this)[0];
          };
          jProto.map = function map2(func, toAlter) {
            return jStat3(jStat3.map(this, func, toAlter));
          };
          jProto.cumreduce = function cumreduce(func, toAlter) {
            return jStat3(jStat3.cumreduce(this, func, toAlter));
          };
          jProto.alter = function alter(func) {
            jStat3.alter(this, func);
            return this;
          };
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function(func) {
                  var self2 = this, results;
                  if (func) {
                    setTimeout(function() {
                      func.call(self2, jProto[passfunc].call(self2));
                    });
                    return this;
                  }
                  results = jStat3[passfunc](this);
                  return isArray(results) ? jStat3(results) : results;
                };
              })(funcs[i23]);
          })("transpose clear symmetric rows cols dimensions diag antidiag".split(" "));
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function(index, func) {
                  var self2 = this;
                  if (func) {
                    setTimeout(function() {
                      func.call(self2, jProto[passfunc].call(self2, index));
                    });
                    return this;
                  }
                  return jStat3(jStat3[passfunc](this, index));
                };
              })(funcs[i23]);
          })("row col".split(" "));
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function() {
                  return jStat3(jStat3[passfunc].apply(null, arguments));
                };
              })(funcs[i23]);
          })("create zeros ones rand identity".split(" "));
          return jStat3;
        }(Math);
        (function(jStat3, Math2) {
          var isFunction2 = jStat3.utils.isFunction;
          function ascNum(a11, b7) {
            return a11 - b7;
          }
          function clip(arg, min, max) {
            return Math2.max(min, Math2.min(arg, max));
          }
          jStat3.sum = function sum(arr) {
            var sum2 = 0;
            var i23 = arr.length;
            while (--i23 >= 0)
              sum2 += arr[i23];
            return sum2;
          };
          jStat3.sumsqrd = function sumsqrd(arr) {
            var sum = 0;
            var i23 = arr.length;
            while (--i23 >= 0)
              sum += arr[i23] * arr[i23];
            return sum;
          };
          jStat3.sumsqerr = function sumsqerr(arr) {
            var mean = jStat3.mean(arr);
            var sum = 0;
            var i23 = arr.length;
            var tmp;
            while (--i23 >= 0) {
              tmp = arr[i23] - mean;
              sum += tmp * tmp;
            }
            return sum;
          };
          jStat3.sumrow = function sumrow(arr) {
            var sum = 0;
            var i23 = arr.length;
            while (--i23 >= 0)
              sum += arr[i23];
            return sum;
          };
          jStat3.product = function product(arr) {
            var prod = 1;
            var i23 = arr.length;
            while (--i23 >= 0)
              prod *= arr[i23];
            return prod;
          };
          jStat3.min = function min(arr) {
            var low = arr[0];
            var i23 = 0;
            while (++i23 < arr.length)
              if (arr[i23] < low)
                low = arr[i23];
            return low;
          };
          jStat3.max = function max(arr) {
            var high = arr[0];
            var i23 = 0;
            while (++i23 < arr.length)
              if (arr[i23] > high)
                high = arr[i23];
            return high;
          };
          jStat3.unique = function unique2(arr) {
            var hash = {}, _arr = [];
            for (var i23 = 0; i23 < arr.length; i23++) {
              if (!hash[arr[i23]]) {
                hash[arr[i23]] = true;
                _arr.push(arr[i23]);
              }
            }
            return _arr;
          };
          jStat3.mean = function mean(arr) {
            return jStat3.sum(arr) / arr.length;
          };
          jStat3.meansqerr = function meansqerr(arr) {
            return jStat3.sumsqerr(arr) / arr.length;
          };
          jStat3.geomean = function geomean(arr) {
            var logs = arr.map(Math2.log);
            var meanOfLogs = jStat3.mean(logs);
            return Math2.exp(meanOfLogs);
          };
          jStat3.median = function median(arr) {
            var arrlen = arr.length;
            var _arr = arr.slice().sort(ascNum);
            return !(arrlen & 1) ? (_arr[arrlen / 2 - 1] + _arr[arrlen / 2]) / 2 : _arr[arrlen / 2 | 0];
          };
          jStat3.cumsum = function cumsum(arr) {
            return jStat3.cumreduce(arr, function(a11, b7) {
              return a11 + b7;
            });
          };
          jStat3.cumprod = function cumprod(arr) {
            return jStat3.cumreduce(arr, function(a11, b7) {
              return a11 * b7;
            });
          };
          jStat3.diff = function diff(arr) {
            var diffs = [];
            var arrLen = arr.length;
            var i23;
            for (i23 = 1; i23 < arrLen; i23++)
              diffs.push(arr[i23] - arr[i23 - 1]);
            return diffs;
          };
          jStat3.rank = function(arr) {
            var i23;
            var distinctNumbers = [];
            var numberCounts = {};
            for (i23 = 0; i23 < arr.length; i23++) {
              var number = arr[i23];
              if (numberCounts[number]) {
                numberCounts[number]++;
              } else {
                numberCounts[number] = 1;
                distinctNumbers.push(number);
              }
            }
            var sortedDistinctNumbers = distinctNumbers.sort(ascNum);
            var numberRanks = {};
            var currentRank = 1;
            for (i23 = 0; i23 < sortedDistinctNumbers.length; i23++) {
              var number = sortedDistinctNumbers[i23];
              var count = numberCounts[number];
              var first = currentRank;
              var last = currentRank + count - 1;
              var rank = (first + last) / 2;
              numberRanks[number] = rank;
              currentRank += count;
            }
            return arr.map(function(number2) {
              return numberRanks[number2];
            });
          };
          jStat3.mode = function mode(arr) {
            var arrLen = arr.length;
            var _arr = arr.slice().sort(ascNum);
            var count = 1;
            var maxCount = 0;
            var numMaxCount = 0;
            var mode_arr = [];
            var i23;
            for (i23 = 0; i23 < arrLen; i23++) {
              if (_arr[i23] === _arr[i23 + 1]) {
                count++;
              } else {
                if (count > maxCount) {
                  mode_arr = [_arr[i23]];
                  maxCount = count;
                  numMaxCount = 0;
                } else if (count === maxCount) {
                  mode_arr.push(_arr[i23]);
                  numMaxCount++;
                }
                count = 1;
              }
            }
            return numMaxCount === 0 ? mode_arr[0] : mode_arr;
          };
          jStat3.range = function range(arr) {
            return jStat3.max(arr) - jStat3.min(arr);
          };
          jStat3.variance = function variance(arr, flag) {
            return jStat3.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
          };
          jStat3.pooledvariance = function pooledvariance(arr) {
            var sumsqerr = arr.reduce(function(a11, samples) {
              return a11 + jStat3.sumsqerr(samples);
            }, 0);
            var count = arr.reduce(function(a11, samples) {
              return a11 + samples.length;
            }, 0);
            return sumsqerr / (count - arr.length);
          };
          jStat3.deviation = function(arr) {
            var mean = jStat3.mean(arr);
            var arrlen = arr.length;
            var dev = new Array(arrlen);
            for (var i23 = 0; i23 < arrlen; i23++) {
              dev[i23] = arr[i23] - mean;
            }
            return dev;
          };
          jStat3.stdev = function stdev(arr, flag) {
            return Math2.sqrt(jStat3.variance(arr, flag));
          };
          jStat3.pooledstdev = function pooledstdev(arr) {
            return Math2.sqrt(jStat3.pooledvariance(arr));
          };
          jStat3.meandev = function meandev(arr) {
            var mean = jStat3.mean(arr);
            var a11 = [];
            for (var i23 = arr.length - 1; i23 >= 0; i23--) {
              a11.push(Math2.abs(arr[i23] - mean));
            }
            return jStat3.mean(a11);
          };
          jStat3.meddev = function meddev(arr) {
            var median = jStat3.median(arr);
            var a11 = [];
            for (var i23 = arr.length - 1; i23 >= 0; i23--) {
              a11.push(Math2.abs(arr[i23] - median));
            }
            return jStat3.median(a11);
          };
          jStat3.coeffvar = function coeffvar(arr) {
            return jStat3.stdev(arr) / jStat3.mean(arr);
          };
          jStat3.quartiles = function quartiles(arr) {
            var arrlen = arr.length;
            var _arr = arr.slice().sort(ascNum);
            return [
              _arr[Math2.round(arrlen / 4) - 1],
              _arr[Math2.round(arrlen / 2) - 1],
              _arr[Math2.round(arrlen * 3 / 4) - 1]
            ];
          };
          jStat3.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
            var sortedArray = arr.slice().sort(ascNum);
            var quantileVals = [quantilesArray.length];
            var n31 = arr.length;
            var i23, p7, m6, aleph, k8, gamma;
            if (typeof alphap === "undefined")
              alphap = 3 / 8;
            if (typeof betap === "undefined")
              betap = 3 / 8;
            for (i23 = 0; i23 < quantilesArray.length; i23++) {
              p7 = quantilesArray[i23];
              m6 = alphap + p7 * (1 - alphap - betap);
              aleph = n31 * p7 + m6;
              k8 = Math2.floor(clip(aleph, 1, n31 - 1));
              gamma = clip(aleph - k8, 0, 1);
              quantileVals[i23] = (1 - gamma) * sortedArray[k8 - 1] + gamma * sortedArray[k8];
            }
            return quantileVals;
          };
          jStat3.percentile = function percentile(arr, k8, exclusive) {
            var _arr = arr.slice().sort(ascNum);
            var realIndex = k8 * (_arr.length + (exclusive ? 1 : -1)) + (exclusive ? 0 : 1);
            var index = parseInt(realIndex);
            var frac = realIndex - index;
            if (index + 1 < _arr.length) {
              return _arr[index - 1] + frac * (_arr[index] - _arr[index - 1]);
            } else {
              return _arr[index - 1];
            }
          };
          jStat3.percentileOfScore = function percentileOfScore(arr, score, kind) {
            var counter = 0;
            var len = arr.length;
            var strict = false;
            var value, i23;
            if (kind === "strict")
              strict = true;
            for (i23 = 0; i23 < len; i23++) {
              value = arr[i23];
              if (strict && value < score || !strict && value <= score) {
                counter++;
              }
            }
            return counter / len;
          };
          jStat3.histogram = function histogram(arr, binCnt) {
            binCnt = binCnt || 4;
            var first = jStat3.min(arr);
            var binWidth = (jStat3.max(arr) - first) / binCnt;
            var len = arr.length;
            var bins = [];
            var i23;
            for (i23 = 0; i23 < binCnt; i23++)
              bins[i23] = 0;
            for (i23 = 0; i23 < len; i23++)
              bins[Math2.min(Math2.floor((arr[i23] - first) / binWidth), binCnt - 1)] += 1;
            return bins;
          };
          jStat3.covariance = function covariance(arr1, arr2) {
            var u11 = jStat3.mean(arr1);
            var v6 = jStat3.mean(arr2);
            var arr1Len = arr1.length;
            var sq_dev = new Array(arr1Len);
            var i23;
            for (i23 = 0; i23 < arr1Len; i23++)
              sq_dev[i23] = (arr1[i23] - u11) * (arr2[i23] - v6);
            return jStat3.sum(sq_dev) / (arr1Len - 1);
          };
          jStat3.corrcoeff = function corrcoeff(arr1, arr2) {
            return jStat3.covariance(arr1, arr2) / jStat3.stdev(arr1, 1) / jStat3.stdev(arr2, 1);
          };
          jStat3.spearmancoeff = function(arr1, arr2) {
            arr1 = jStat3.rank(arr1);
            arr2 = jStat3.rank(arr2);
            return jStat3.corrcoeff(arr1, arr2);
          };
          jStat3.stanMoment = function stanMoment(arr, n31) {
            var mu = jStat3.mean(arr);
            var sigma = jStat3.stdev(arr);
            var len = arr.length;
            var skewSum = 0;
            for (var i23 = 0; i23 < len; i23++)
              skewSum += Math2.pow((arr[i23] - mu) / sigma, n31);
            return skewSum / arr.length;
          };
          jStat3.skewness = function skewness(arr) {
            return jStat3.stanMoment(arr, 3);
          };
          jStat3.kurtosis = function kurtosis(arr) {
            return jStat3.stanMoment(arr, 4) - 3;
          };
          var jProto = jStat3.prototype;
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function(fullbool, func) {
                  var arr = [];
                  var i24 = 0;
                  var tmpthis = this;
                  if (isFunction2(fullbool)) {
                    func = fullbool;
                    fullbool = false;
                  }
                  if (func) {
                    setTimeout(function() {
                      func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
                    });
                    return this;
                  }
                  if (this.length > 1) {
                    tmpthis = fullbool === true ? this : this.transpose();
                    for (; i24 < tmpthis.length; i24++)
                      arr[i24] = jStat3[passfunc](tmpthis[i24]);
                    return arr;
                  }
                  return jStat3[passfunc](this[0], fullbool);
                };
              })(funcs[i23]);
          })("cumsum cumprod".split(" "));
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function(fullbool, func) {
                  var arr = [];
                  var i24 = 0;
                  var tmpthis = this;
                  if (isFunction2(fullbool)) {
                    func = fullbool;
                    fullbool = false;
                  }
                  if (func) {
                    setTimeout(function() {
                      func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
                    });
                    return this;
                  }
                  if (this.length > 1) {
                    if (passfunc !== "sumrow")
                      tmpthis = fullbool === true ? this : this.transpose();
                    for (; i24 < tmpthis.length; i24++)
                      arr[i24] = jStat3[passfunc](tmpthis[i24]);
                    return fullbool === true ? jStat3[passfunc](jStat3.utils.toVector(arr)) : arr;
                  }
                  return jStat3[passfunc](this[0], fullbool);
                };
              })(funcs[i23]);
          })("sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr geomean median diff rank mode range variance deviation stdev meandev meddev coeffvar quartiles histogram skewness kurtosis".split(" "));
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jProto[passfunc] = function() {
                  var arr = [];
                  var i24 = 0;
                  var tmpthis = this;
                  var args = Array.prototype.slice.call(arguments);
                  var callbackFunction;
                  if (isFunction2(args[args.length - 1])) {
                    callbackFunction = args[args.length - 1];
                    var argsToPass = args.slice(0, args.length - 1);
                    setTimeout(function() {
                      callbackFunction.call(
                        tmpthis,
                        jProto[passfunc].apply(tmpthis, argsToPass)
                      );
                    });
                    return this;
                  } else {
                    callbackFunction = void 0;
                    var curriedFunction = function curriedFunction2(vector) {
                      return jStat3[passfunc].apply(tmpthis, [vector].concat(args));
                    };
                  }
                  if (this.length > 1) {
                    tmpthis = tmpthis.transpose();
                    for (; i24 < tmpthis.length; i24++)
                      arr[i24] = curriedFunction(tmpthis[i24]);
                    return arr;
                  }
                  return curriedFunction(this[0]);
                };
              })(funcs[i23]);
          })("quantiles percentileOfScore".split(" "));
        })(jStat2, Math);
        (function(jStat3, Math2) {
          jStat3.gammaln = function gammaln(x6) {
            var j3 = 0;
            var cof = [
              76.18009172947146,
              -86.50532032941678,
              24.01409824083091,
              -1.231739572450155,
              0.001208650973866179,
              -5395239384953e-18
            ];
            var ser = 1.000000000190015;
            var xx, y7, tmp;
            tmp = (y7 = xx = x6) + 5.5;
            tmp -= (xx + 0.5) * Math2.log(tmp);
            for (; j3 < 6; j3++)
              ser += cof[j3] / ++y7;
            return Math2.log(2.5066282746310007 * ser / xx) - tmp;
          };
          jStat3.loggam = function loggam(x6) {
            var x0, x22, xp, gl, gl0;
            var k8, n31;
            var a11 = [
              0.08333333333333333,
              -0.002777777777777778,
              7936507936507937e-19,
              -5952380952380952e-19,
              8417508417508418e-19,
              -0.001917526917526918,
              0.00641025641025641,
              -0.02955065359477124,
              0.1796443723688307,
              -1.3924322169059
            ];
            x0 = x6;
            n31 = 0;
            if (x6 == 1 || x6 == 2) {
              return 0;
            }
            if (x6 <= 7) {
              n31 = Math2.floor(7 - x6);
              x0 = x6 + n31;
            }
            x22 = 1 / (x0 * x0);
            xp = 2 * Math2.PI;
            gl0 = a11[9];
            for (k8 = 8; k8 >= 0; k8--) {
              gl0 *= x22;
              gl0 += a11[k8];
            }
            gl = gl0 / x0 + 0.5 * Math2.log(xp) + (x0 - 0.5) * Math2.log(x0) - x0;
            if (x6 <= 7) {
              for (k8 = 1; k8 <= n31; k8++) {
                gl -= Math2.log(x0 - 1);
                x0 -= 1;
              }
            }
            return gl;
          };
          jStat3.gammafn = function gammafn(x6) {
            var p7 = [
              -1.716185138865495,
              24.76565080557592,
              -379.80425647094563,
              629.3311553128184,
              866.9662027904133,
              -31451.272968848367,
              -36144.413418691176,
              66456.14382024054
            ];
            var q = [
              -30.8402300119739,
              315.35062697960416,
              -1015.1563674902192,
              -3107.771671572311,
              22538.11842098015,
              4755.846277527881,
              -134659.9598649693,
              -115132.2596755535
            ];
            var fact = false;
            var n31 = 0;
            var xden = 0;
            var xnum = 0;
            var y7 = x6;
            var i23, z5, yi, res;
            if (x6 > 171.6243769536076) {
              return Infinity;
            }
            if (y7 <= 0) {
              res = y7 % 1 + 36e-17;
              if (res) {
                fact = (!(y7 & 1) ? 1 : -1) * Math2.PI / Math2.sin(Math2.PI * res);
                y7 = 1 - y7;
              } else {
                return Infinity;
              }
            }
            yi = y7;
            if (y7 < 1) {
              z5 = y7++;
            } else {
              z5 = (y7 -= n31 = (y7 | 0) - 1) - 1;
            }
            for (i23 = 0; i23 < 8; ++i23) {
              xnum = (xnum + p7[i23]) * z5;
              xden = xden * z5 + q[i23];
            }
            res = xnum / xden + 1;
            if (yi < y7) {
              res /= yi;
            } else if (yi > y7) {
              for (i23 = 0; i23 < n31; ++i23) {
                res *= y7;
                y7++;
              }
            }
            if (fact) {
              res = fact / res;
            }
            return res;
          };
          jStat3.gammap = function gammap(a11, x6) {
            return jStat3.lowRegGamma(a11, x6) * jStat3.gammafn(a11);
          };
          jStat3.lowRegGamma = function lowRegGamma(a11, x6) {
            var aln = jStat3.gammaln(a11);
            var ap = a11;
            var sum = 1 / a11;
            var del = sum;
            var b7 = x6 + 1 - a11;
            var c12 = 1 / 1e-30;
            var d11 = 1 / b7;
            var h11 = d11;
            var i23 = 1;
            var ITMAX = -~(Math2.log(a11 >= 1 ? a11 : 1 / a11) * 8.5 + a11 * 0.4 + 17);
            var an;
            if (x6 < 0 || a11 <= 0) {
              return NaN;
            } else if (x6 < a11 + 1) {
              for (; i23 <= ITMAX; i23++) {
                sum += del *= x6 / ++ap;
              }
              return sum * Math2.exp(-x6 + a11 * Math2.log(x6) - aln);
            }
            for (; i23 <= ITMAX; i23++) {
              an = -i23 * (i23 - a11);
              b7 += 2;
              d11 = an * d11 + b7;
              c12 = b7 + an / c12;
              d11 = 1 / d11;
              h11 *= d11 * c12;
            }
            return 1 - h11 * Math2.exp(-x6 + a11 * Math2.log(x6) - aln);
          };
          jStat3.factorialln = function factorialln(n31) {
            return n31 < 0 ? NaN : jStat3.gammaln(n31 + 1);
          };
          jStat3.factorial = function factorial(n31) {
            return n31 < 0 ? NaN : jStat3.gammafn(n31 + 1);
          };
          jStat3.combination = function combination(n31, m6) {
            return n31 > 170 || m6 > 170 ? Math2.exp(jStat3.combinationln(n31, m6)) : jStat3.factorial(n31) / jStat3.factorial(m6) / jStat3.factorial(n31 - m6);
          };
          jStat3.combinationln = function combinationln(n31, m6) {
            return jStat3.factorialln(n31) - jStat3.factorialln(m6) - jStat3.factorialln(n31 - m6);
          };
          jStat3.permutation = function permutation(n31, m6) {
            return jStat3.factorial(n31) / jStat3.factorial(n31 - m6);
          };
          jStat3.betafn = function betafn(x6, y7) {
            if (x6 <= 0 || y7 <= 0)
              return void 0;
            return x6 + y7 > 170 ? Math2.exp(jStat3.betaln(x6, y7)) : jStat3.gammafn(x6) * jStat3.gammafn(y7) / jStat3.gammafn(x6 + y7);
          };
          jStat3.betaln = function betaln(x6, y7) {
            return jStat3.gammaln(x6) + jStat3.gammaln(y7) - jStat3.gammaln(x6 + y7);
          };
          jStat3.betacf = function betacf(x6, a11, b7) {
            var fpmin = 1e-30;
            var m6 = 1;
            var qab = a11 + b7;
            var qap = a11 + 1;
            var qam = a11 - 1;
            var c12 = 1;
            var d11 = 1 - qab * x6 / qap;
            var m22, aa, del, h11;
            if (Math2.abs(d11) < fpmin)
              d11 = fpmin;
            d11 = 1 / d11;
            h11 = d11;
            for (; m6 <= 100; m6++) {
              m22 = 2 * m6;
              aa = m6 * (b7 - m6) * x6 / ((qam + m22) * (a11 + m22));
              d11 = 1 + aa * d11;
              if (Math2.abs(d11) < fpmin)
                d11 = fpmin;
              c12 = 1 + aa / c12;
              if (Math2.abs(c12) < fpmin)
                c12 = fpmin;
              d11 = 1 / d11;
              h11 *= d11 * c12;
              aa = -(a11 + m6) * (qab + m6) * x6 / ((a11 + m22) * (qap + m22));
              d11 = 1 + aa * d11;
              if (Math2.abs(d11) < fpmin)
                d11 = fpmin;
              c12 = 1 + aa / c12;
              if (Math2.abs(c12) < fpmin)
                c12 = fpmin;
              d11 = 1 / d11;
              del = d11 * c12;
              h11 *= del;
              if (Math2.abs(del - 1) < 3e-7)
                break;
            }
            return h11;
          };
          jStat3.gammapinv = function gammapinv(p7, a11) {
            var j3 = 0;
            var a1 = a11 - 1;
            var EPS = 1e-8;
            var gln = jStat3.gammaln(a11);
            var x6, err, t17, u11, pp, lna1, afac;
            if (p7 >= 1)
              return Math2.max(100, a11 + 100 * Math2.sqrt(a11));
            if (p7 <= 0)
              return 0;
            if (a11 > 1) {
              lna1 = Math2.log(a1);
              afac = Math2.exp(a1 * (lna1 - 1) - gln);
              pp = p7 < 0.5 ? p7 : 1 - p7;
              t17 = Math2.sqrt(-2 * Math2.log(pp));
              x6 = (2.30753 + t17 * 0.27061) / (1 + t17 * (0.99229 + t17 * 0.04481)) - t17;
              if (p7 < 0.5)
                x6 = -x6;
              x6 = Math2.max(
                1e-3,
                a11 * Math2.pow(1 - 1 / (9 * a11) - x6 / (3 * Math2.sqrt(a11)), 3)
              );
            } else {
              t17 = 1 - a11 * (0.253 + a11 * 0.12);
              if (p7 < t17)
                x6 = Math2.pow(p7 / t17, 1 / a11);
              else
                x6 = 1 - Math2.log(1 - (p7 - t17) / (1 - t17));
            }
            for (; j3 < 12; j3++) {
              if (x6 <= 0)
                return 0;
              err = jStat3.lowRegGamma(a11, x6) - p7;
              if (a11 > 1)
                t17 = afac * Math2.exp(-(x6 - a1) + a1 * (Math2.log(x6) - lna1));
              else
                t17 = Math2.exp(-x6 + a1 * Math2.log(x6) - gln);
              u11 = err / t17;
              x6 -= t17 = u11 / (1 - 0.5 * Math2.min(1, u11 * ((a11 - 1) / x6 - 1)));
              if (x6 <= 0)
                x6 = 0.5 * (x6 + t17);
              if (Math2.abs(t17) < EPS * x6)
                break;
            }
            return x6;
          };
          jStat3.erf = function erf(x6) {
            var cof = [
              -1.3026537197817094,
              0.6419697923564902,
              0.019476473204185836,
              -0.00956151478680863,
              -946595344482036e-18,
              366839497852761e-18,
              42523324806907e-18,
              -20278578112534e-18,
              -1624290004647e-18,
              130365583558e-17,
              15626441722e-18,
              -85238095915e-18,
              6529054439e-18,
              5059343495e-18,
              -991364156e-18,
              -227365122e-18,
              96467911e-18,
              2394038e-18,
              -6886027e-18,
              894487e-18,
              313092e-18,
              -112708e-18,
              381e-18,
              7106e-18,
              -1523e-18,
              -94e-18,
              121e-18,
              -28e-18
            ];
            var j3 = cof.length - 1;
            var isneg = false;
            var d11 = 0;
            var dd = 0;
            var t17, ty, tmp, res;
            if (x6 < 0) {
              x6 = -x6;
              isneg = true;
            }
            t17 = 2 / (2 + x6);
            ty = 4 * t17 - 2;
            for (; j3 > 0; j3--) {
              tmp = d11;
              d11 = ty * d11 - dd + cof[j3];
              dd = tmp;
            }
            res = t17 * Math2.exp(-x6 * x6 + 0.5 * (cof[0] + ty * d11) - dd);
            return isneg ? res - 1 : 1 - res;
          };
          jStat3.erfc = function erfc(x6) {
            return 1 - jStat3.erf(x6);
          };
          jStat3.erfcinv = function erfcinv(p7) {
            var j3 = 0;
            var x6, err, t17, pp;
            if (p7 >= 2)
              return -100;
            if (p7 <= 0)
              return 100;
            pp = p7 < 1 ? p7 : 2 - p7;
            t17 = Math2.sqrt(-2 * Math2.log(pp / 2));
            x6 = -0.70711 * ((2.30753 + t17 * 0.27061) / (1 + t17 * (0.99229 + t17 * 0.04481)) - t17);
            for (; j3 < 2; j3++) {
              err = jStat3.erfc(x6) - pp;
              x6 += err / (1.1283791670955126 * Math2.exp(-x6 * x6) - x6 * err);
            }
            return p7 < 1 ? x6 : -x6;
          };
          jStat3.ibetainv = function ibetainv(p7, a11, b7) {
            var EPS = 1e-8;
            var a1 = a11 - 1;
            var b1 = b7 - 1;
            var j3 = 0;
            var lna, lnb, pp, t17, u11, err, x6, al, h11, w6, afac;
            if (p7 <= 0)
              return 0;
            if (p7 >= 1)
              return 1;
            if (a11 >= 1 && b7 >= 1) {
              pp = p7 < 0.5 ? p7 : 1 - p7;
              t17 = Math2.sqrt(-2 * Math2.log(pp));
              x6 = (2.30753 + t17 * 0.27061) / (1 + t17 * (0.99229 + t17 * 0.04481)) - t17;
              if (p7 < 0.5)
                x6 = -x6;
              al = (x6 * x6 - 3) / 6;
              h11 = 2 / (1 / (2 * a11 - 1) + 1 / (2 * b7 - 1));
              w6 = x6 * Math2.sqrt(al + h11) / h11 - (1 / (2 * b7 - 1) - 1 / (2 * a11 - 1)) * (al + 5 / 6 - 2 / (3 * h11));
              x6 = a11 / (a11 + b7 * Math2.exp(2 * w6));
            } else {
              lna = Math2.log(a11 / (a11 + b7));
              lnb = Math2.log(b7 / (a11 + b7));
              t17 = Math2.exp(a11 * lna) / a11;
              u11 = Math2.exp(b7 * lnb) / b7;
              w6 = t17 + u11;
              if (p7 < t17 / w6)
                x6 = Math2.pow(a11 * w6 * p7, 1 / a11);
              else
                x6 = 1 - Math2.pow(b7 * w6 * (1 - p7), 1 / b7);
            }
            afac = -jStat3.gammaln(a11) - jStat3.gammaln(b7) + jStat3.gammaln(a11 + b7);
            for (; j3 < 10; j3++) {
              if (x6 === 0 || x6 === 1)
                return x6;
              err = jStat3.ibeta(x6, a11, b7) - p7;
              t17 = Math2.exp(a1 * Math2.log(x6) + b1 * Math2.log(1 - x6) + afac);
              u11 = err / t17;
              x6 -= t17 = u11 / (1 - 0.5 * Math2.min(1, u11 * (a1 / x6 - b1 / (1 - x6))));
              if (x6 <= 0)
                x6 = 0.5 * (x6 + t17);
              if (x6 >= 1)
                x6 = 0.5 * (x6 + t17 + 1);
              if (Math2.abs(t17) < EPS * x6 && j3 > 0)
                break;
            }
            return x6;
          };
          jStat3.ibeta = function ibeta(x6, a11, b7) {
            var bt = x6 === 0 || x6 === 1 ? 0 : Math2.exp(jStat3.gammaln(a11 + b7) - jStat3.gammaln(a11) - jStat3.gammaln(b7) + a11 * Math2.log(x6) + b7 * Math2.log(1 - x6));
            if (x6 < 0 || x6 > 1)
              return false;
            if (x6 < (a11 + 1) / (a11 + b7 + 2))
              return bt * jStat3.betacf(x6, a11, b7) / a11;
            return 1 - bt * jStat3.betacf(1 - x6, b7, a11) / b7;
          };
          jStat3.randn = function randn(n31, m6) {
            var u11, v6, x6, y7, q;
            if (!m6)
              m6 = n31;
            if (n31)
              return jStat3.create(n31, m6, function() {
                return jStat3.randn();
              });
            do {
              u11 = jStat3._random_fn();
              v6 = 1.7156 * (jStat3._random_fn() - 0.5);
              x6 = u11 - 0.449871;
              y7 = Math2.abs(v6) + 0.386595;
              q = x6 * x6 + y7 * (0.196 * y7 - 0.25472 * x6);
            } while (q > 0.27597 && (q > 0.27846 || v6 * v6 > -4 * Math2.log(u11) * u11 * u11));
            return v6 / u11;
          };
          jStat3.randg = function randg(shape, n31, m6) {
            var oalph = shape;
            var a1, a22, u11, v6, x6, mat;
            if (!m6)
              m6 = n31;
            if (!shape)
              shape = 1;
            if (n31) {
              mat = jStat3.zeros(n31, m6);
              mat.alter(function() {
                return jStat3.randg(shape);
              });
              return mat;
            }
            if (shape < 1)
              shape += 1;
            a1 = shape - 1 / 3;
            a22 = 1 / Math2.sqrt(9 * a1);
            do {
              do {
                x6 = jStat3.randn();
                v6 = 1 + a22 * x6;
              } while (v6 <= 0);
              v6 = v6 * v6 * v6;
              u11 = jStat3._random_fn();
            } while (u11 > 1 - 0.331 * Math2.pow(x6, 4) && Math2.log(u11) > 0.5 * x6 * x6 + a1 * (1 - v6 + Math2.log(v6)));
            if (shape == oalph)
              return a1 * v6;
            do {
              u11 = jStat3._random_fn();
            } while (u11 === 0);
            return Math2.pow(u11, 1 / oalph) * a1 * v6;
          };
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jStat3.fn[passfunc] = function() {
                  return jStat3(
                    jStat3.map(this, function(value) {
                      return jStat3[passfunc](value);
                    })
                  );
                };
              })(funcs[i23]);
          })("gammaln gammafn factorial factorialln".split(" "));
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jStat3.fn[passfunc] = function() {
                  return jStat3(jStat3[passfunc].apply(null, arguments));
                };
              })(funcs[i23]);
          })("randn".split(" "));
        })(jStat2, Math);
        (function(jStat3, Math2) {
          (function(list) {
            for (var i23 = 0; i23 < list.length; i23++)
              (function(func) {
                jStat3[func] = function f7(a11, b7, c12) {
                  if (!(this instanceof f7))
                    return new f7(a11, b7, c12);
                  this._a = a11;
                  this._b = b7;
                  this._c = c12;
                  return this;
                };
                jStat3.fn[func] = function(a11, b7, c12) {
                  var newthis = jStat3[func](a11, b7, c12);
                  newthis.data = this;
                  return newthis;
                };
                jStat3[func].prototype.sample = function(arr) {
                  var a11 = this._a;
                  var b7 = this._b;
                  var c12 = this._c;
                  if (arr)
                    return jStat3.alter(arr, function() {
                      return jStat3[func].sample(a11, b7, c12);
                    });
                  else
                    return jStat3[func].sample(a11, b7, c12);
                };
                (function(vals) {
                  for (var i24 = 0; i24 < vals.length; i24++)
                    (function(fnfunc) {
                      jStat3[func].prototype[fnfunc] = function(x6) {
                        var a11 = this._a;
                        var b7 = this._b;
                        var c12 = this._c;
                        if (!x6 && x6 !== 0)
                          x6 = this.data;
                        if (typeof x6 !== "number") {
                          return jStat3.fn.map.call(x6, function(x7) {
                            return jStat3[func][fnfunc](x7, a11, b7, c12);
                          });
                        }
                        return jStat3[func][fnfunc](x6, a11, b7, c12);
                      };
                    })(vals[i24]);
                })("pdf cdf inv".split(" "));
                (function(vals) {
                  for (var i24 = 0; i24 < vals.length; i24++)
                    (function(fnfunc) {
                      jStat3[func].prototype[fnfunc] = function() {
                        return jStat3[func][fnfunc](this._a, this._b, this._c);
                      };
                    })(vals[i24]);
                })("mean median mode variance".split(" "));
              })(list[i23]);
          })("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy laplace lognormal noncentralt normal pareto studentt weibull uniform binomial negbin hypgeom poisson triangular tukey arcsine".split(" "));
          jStat3.extend(jStat3.beta, {
            pdf: function pdf(x6, alpha, beta) {
              if (x6 > 1 || x6 < 0)
                return 0;
              if (alpha == 1 && beta == 1)
                return 1;
              if (alpha < 512 && beta < 512) {
                return Math2.pow(x6, alpha - 1) * Math2.pow(1 - x6, beta - 1) / jStat3.betafn(alpha, beta);
              } else {
                return Math2.exp((alpha - 1) * Math2.log(x6) + (beta - 1) * Math2.log(1 - x6) - jStat3.betaln(alpha, beta));
              }
            },
            cdf: function cdf(x6, alpha, beta) {
              return x6 > 1 || x6 < 0 ? (x6 > 1) * 1 : jStat3.ibeta(x6, alpha, beta);
            },
            inv: function inv(x6, alpha, beta) {
              return jStat3.ibetainv(x6, alpha, beta);
            },
            mean: function mean(alpha, beta) {
              return alpha / (alpha + beta);
            },
            median: function median(alpha, beta) {
              return jStat3.ibetainv(0.5, alpha, beta);
            },
            mode: function mode(alpha, beta) {
              return (alpha - 1) / (alpha + beta - 2);
            },
            // return a random sample
            sample: function sample(alpha, beta) {
              var u11 = jStat3.randg(alpha);
              return u11 / (u11 + jStat3.randg(beta));
            },
            variance: function variance(alpha, beta) {
              return alpha * beta / (Math2.pow(alpha + beta, 2) * (alpha + beta + 1));
            }
          });
          jStat3.extend(jStat3.centralF, {
            // This implementation of the pdf function avoids float overflow
            // See the way that R calculates this value:
            // https://svn.r-project.org/R/trunk/src/nmath/df.c
            pdf: function pdf(x6, df1, df2) {
              var p7, q, f7;
              if (x6 < 0)
                return 0;
              if (df1 <= 2) {
                if (x6 === 0 && df1 < 2) {
                  return Infinity;
                }
                if (x6 === 0 && df1 === 2) {
                  return 1;
                }
                return 1 / jStat3.betafn(df1 / 2, df2 / 2) * Math2.pow(df1 / df2, df1 / 2) * Math2.pow(x6, df1 / 2 - 1) * Math2.pow(1 + df1 / df2 * x6, -(df1 + df2) / 2);
              }
              p7 = df1 * x6 / (df2 + x6 * df1);
              q = df2 / (df2 + x6 * df1);
              f7 = df1 * q / 2;
              return f7 * jStat3.binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p7);
            },
            cdf: function cdf(x6, df1, df2) {
              if (x6 < 0)
                return 0;
              return jStat3.ibeta(df1 * x6 / (df1 * x6 + df2), df1 / 2, df2 / 2);
            },
            inv: function inv(x6, df1, df2) {
              return df2 / (df1 * (1 / jStat3.ibetainv(x6, df1 / 2, df2 / 2) - 1));
            },
            mean: function mean(df1, df2) {
              return df2 > 2 ? df2 / (df2 - 2) : void 0;
            },
            mode: function mode(df1, df2) {
              return df1 > 2 ? df2 * (df1 - 2) / (df1 * (df2 + 2)) : void 0;
            },
            // return a random sample
            sample: function sample(df1, df2) {
              var x1 = jStat3.randg(df1 / 2) * 2;
              var x22 = jStat3.randg(df2 / 2) * 2;
              return x1 / df1 / (x22 / df2);
            },
            variance: function variance(df1, df2) {
              if (df2 <= 4)
                return void 0;
              return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
            }
          });
          jStat3.extend(jStat3.cauchy, {
            pdf: function pdf(x6, local, scale) {
              if (scale < 0) {
                return 0;
              }
              return scale / (Math2.pow(x6 - local, 2) + Math2.pow(scale, 2)) / Math2.PI;
            },
            cdf: function cdf(x6, local, scale) {
              return Math2.atan((x6 - local) / scale) / Math2.PI + 0.5;
            },
            inv: function(p7, local, scale) {
              return local + scale * Math2.tan(Math2.PI * (p7 - 0.5));
            },
            median: function median(local) {
              return local;
            },
            mode: function mode(local) {
              return local;
            },
            sample: function sample(local, scale) {
              return jStat3.randn() * Math2.sqrt(1 / (2 * jStat3.randg(0.5))) * scale + local;
            }
          });
          jStat3.extend(jStat3.chisquare, {
            pdf: function pdf(x6, dof) {
              if (x6 < 0)
                return 0;
              return x6 === 0 && dof === 2 ? 0.5 : Math2.exp((dof / 2 - 1) * Math2.log(x6) - x6 / 2 - dof / 2 * Math2.log(2) - jStat3.gammaln(dof / 2));
            },
            cdf: function cdf(x6, dof) {
              if (x6 < 0)
                return 0;
              return jStat3.lowRegGamma(dof / 2, x6 / 2);
            },
            inv: function(p7, dof) {
              return 2 * jStat3.gammapinv(p7, 0.5 * dof);
            },
            mean: function(dof) {
              return dof;
            },
            // TODO: this is an approximation (is there a better way?)
            median: function median(dof) {
              return dof * Math2.pow(1 - 2 / (9 * dof), 3);
            },
            mode: function mode(dof) {
              return dof - 2 > 0 ? dof - 2 : 0;
            },
            sample: function sample(dof) {
              return jStat3.randg(dof / 2) * 2;
            },
            variance: function variance(dof) {
              return 2 * dof;
            }
          });
          jStat3.extend(jStat3.exponential, {
            pdf: function pdf(x6, rate) {
              return x6 < 0 ? 0 : rate * Math2.exp(-rate * x6);
            },
            cdf: function cdf(x6, rate) {
              return x6 < 0 ? 0 : 1 - Math2.exp(-rate * x6);
            },
            inv: function(p7, rate) {
              return -Math2.log(1 - p7) / rate;
            },
            mean: function(rate) {
              return 1 / rate;
            },
            median: function(rate) {
              return 1 / rate * Math2.log(2);
            },
            mode: function mode() {
              return 0;
            },
            sample: function sample(rate) {
              return -1 / rate * Math2.log(jStat3._random_fn());
            },
            variance: function(rate) {
              return Math2.pow(rate, -2);
            }
          });
          jStat3.extend(jStat3.gamma, {
            pdf: function pdf(x6, shape, scale) {
              if (x6 < 0)
                return 0;
              return x6 === 0 && shape === 1 ? 1 / scale : Math2.exp((shape - 1) * Math2.log(x6) - x6 / scale - jStat3.gammaln(shape) - shape * Math2.log(scale));
            },
            cdf: function cdf(x6, shape, scale) {
              if (x6 < 0)
                return 0;
              return jStat3.lowRegGamma(shape, x6 / scale);
            },
            inv: function(p7, shape, scale) {
              return jStat3.gammapinv(p7, shape) * scale;
            },
            mean: function(shape, scale) {
              return shape * scale;
            },
            mode: function mode(shape, scale) {
              if (shape > 1)
                return (shape - 1) * scale;
              return void 0;
            },
            sample: function sample(shape, scale) {
              return jStat3.randg(shape) * scale;
            },
            variance: function variance(shape, scale) {
              return shape * scale * scale;
            }
          });
          jStat3.extend(jStat3.invgamma, {
            pdf: function pdf(x6, shape, scale) {
              if (x6 <= 0)
                return 0;
              return Math2.exp(-(shape + 1) * Math2.log(x6) - scale / x6 - jStat3.gammaln(shape) + shape * Math2.log(scale));
            },
            cdf: function cdf(x6, shape, scale) {
              if (x6 <= 0)
                return 0;
              return 1 - jStat3.lowRegGamma(shape, scale / x6);
            },
            inv: function(p7, shape, scale) {
              return scale / jStat3.gammapinv(1 - p7, shape);
            },
            mean: function(shape, scale) {
              return shape > 1 ? scale / (shape - 1) : void 0;
            },
            mode: function mode(shape, scale) {
              return scale / (shape + 1);
            },
            sample: function sample(shape, scale) {
              return scale / jStat3.randg(shape);
            },
            variance: function variance(shape, scale) {
              if (shape <= 2)
                return void 0;
              return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
            }
          });
          jStat3.extend(jStat3.kumaraswamy, {
            pdf: function pdf(x6, alpha, beta) {
              if (x6 === 0 && alpha === 1)
                return beta;
              else if (x6 === 1 && beta === 1)
                return alpha;
              return Math2.exp(Math2.log(alpha) + Math2.log(beta) + (alpha - 1) * Math2.log(x6) + (beta - 1) * Math2.log(1 - Math2.pow(x6, alpha)));
            },
            cdf: function cdf(x6, alpha, beta) {
              if (x6 < 0)
                return 0;
              else if (x6 > 1)
                return 1;
              return 1 - Math2.pow(1 - Math2.pow(x6, alpha), beta);
            },
            inv: function inv(p7, alpha, beta) {
              return Math2.pow(1 - Math2.pow(1 - p7, 1 / beta), 1 / alpha);
            },
            mean: function(alpha, beta) {
              return beta * jStat3.gammafn(1 + 1 / alpha) * jStat3.gammafn(beta) / jStat3.gammafn(1 + 1 / alpha + beta);
            },
            median: function median(alpha, beta) {
              return Math2.pow(1 - Math2.pow(2, -1 / beta), 1 / alpha);
            },
            mode: function mode(alpha, beta) {
              if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
                return void 0;
              return Math2.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
            },
            variance: function variance() {
              throw new Error("variance not yet implemented");
            }
          });
          jStat3.extend(jStat3.lognormal, {
            pdf: function pdf(x6, mu, sigma) {
              if (x6 <= 0)
                return 0;
              return Math2.exp(-Math2.log(x6) - 0.5 * Math2.log(2 * Math2.PI) - Math2.log(sigma) - Math2.pow(Math2.log(x6) - mu, 2) / (2 * sigma * sigma));
            },
            cdf: function cdf(x6, mu, sigma) {
              if (x6 < 0)
                return 0;
              return 0.5 + 0.5 * jStat3.erf((Math2.log(x6) - mu) / Math2.sqrt(2 * sigma * sigma));
            },
            inv: function(p7, mu, sigma) {
              return Math2.exp(-1.4142135623730951 * sigma * jStat3.erfcinv(2 * p7) + mu);
            },
            mean: function mean(mu, sigma) {
              return Math2.exp(mu + sigma * sigma / 2);
            },
            median: function median(mu) {
              return Math2.exp(mu);
            },
            mode: function mode(mu, sigma) {
              return Math2.exp(mu - sigma * sigma);
            },
            sample: function sample(mu, sigma) {
              return Math2.exp(jStat3.randn() * sigma + mu);
            },
            variance: function variance(mu, sigma) {
              return (Math2.exp(sigma * sigma) - 1) * Math2.exp(2 * mu + sigma * sigma);
            }
          });
          jStat3.extend(jStat3.noncentralt, {
            pdf: function pdf(x6, dof, ncp) {
              var tol = 1e-14;
              if (Math2.abs(ncp) < tol)
                return jStat3.studentt.pdf(x6, dof);
              if (Math2.abs(x6) < tol) {
                return Math2.exp(jStat3.gammaln((dof + 1) / 2) - ncp * ncp / 2 - 0.5 * Math2.log(Math2.PI * dof) - jStat3.gammaln(dof / 2));
              }
              return dof / x6 * (jStat3.noncentralt.cdf(x6 * Math2.sqrt(1 + 2 / dof), dof + 2, ncp) - jStat3.noncentralt.cdf(x6, dof, ncp));
            },
            cdf: function cdf(x6, dof, ncp) {
              var tol = 1e-14;
              var min_iterations = 200;
              if (Math2.abs(ncp) < tol)
                return jStat3.studentt.cdf(x6, dof);
              var flip = false;
              if (x6 < 0) {
                flip = true;
                ncp = -ncp;
              }
              var prob = jStat3.normal.cdf(-ncp, 0, 1);
              var value = tol + 1;
              var lastvalue = value;
              var y7 = x6 * x6 / (x6 * x6 + dof);
              var j3 = 0;
              var p7 = Math2.exp(-ncp * ncp / 2);
              var q = Math2.exp(-ncp * ncp / 2 - 0.5 * Math2.log(2) - jStat3.gammaln(3 / 2)) * ncp;
              while (j3 < min_iterations || lastvalue > tol || value > tol) {
                lastvalue = value;
                if (j3 > 0) {
                  p7 *= ncp * ncp / (2 * j3);
                  q *= ncp * ncp / (2 * (j3 + 1 / 2));
                }
                value = p7 * jStat3.beta.cdf(y7, j3 + 0.5, dof / 2) + q * jStat3.beta.cdf(y7, j3 + 1, dof / 2);
                prob += 0.5 * value;
                j3++;
              }
              return flip ? 1 - prob : prob;
            }
          });
          jStat3.extend(jStat3.normal, {
            pdf: function pdf(x6, mean, std) {
              return Math2.exp(-0.5 * Math2.log(2 * Math2.PI) - Math2.log(std) - Math2.pow(x6 - mean, 2) / (2 * std * std));
            },
            cdf: function cdf(x6, mean, std) {
              return 0.5 * (1 + jStat3.erf((x6 - mean) / Math2.sqrt(2 * std * std)));
            },
            inv: function(p7, mean, std) {
              return -1.4142135623730951 * std * jStat3.erfcinv(2 * p7) + mean;
            },
            mean: function(mean) {
              return mean;
            },
            median: function median(mean) {
              return mean;
            },
            mode: function(mean) {
              return mean;
            },
            sample: function sample(mean, std) {
              return jStat3.randn() * std + mean;
            },
            variance: function(mean, std) {
              return std * std;
            }
          });
          jStat3.extend(jStat3.pareto, {
            pdf: function pdf(x6, scale, shape) {
              if (x6 < scale)
                return 0;
              return shape * Math2.pow(scale, shape) / Math2.pow(x6, shape + 1);
            },
            cdf: function cdf(x6, scale, shape) {
              if (x6 < scale)
                return 0;
              return 1 - Math2.pow(scale / x6, shape);
            },
            inv: function inv(p7, scale, shape) {
              return scale / Math2.pow(1 - p7, 1 / shape);
            },
            mean: function mean(scale, shape) {
              if (shape <= 1)
                return void 0;
              return shape * Math2.pow(scale, shape) / (shape - 1);
            },
            median: function median(scale, shape) {
              return scale * (shape * Math2.SQRT2);
            },
            mode: function mode(scale) {
              return scale;
            },
            variance: function(scale, shape) {
              if (shape <= 2)
                return void 0;
              return scale * scale * shape / (Math2.pow(shape - 1, 2) * (shape - 2));
            }
          });
          jStat3.extend(jStat3.studentt, {
            pdf: function pdf(x6, dof) {
              dof = dof > 1e100 ? 1e100 : dof;
              return 1 / (Math2.sqrt(dof) * jStat3.betafn(0.5, dof / 2)) * Math2.pow(1 + x6 * x6 / dof, -((dof + 1) / 2));
            },
            cdf: function cdf(x6, dof) {
              var dof2 = dof / 2;
              return jStat3.ibeta((x6 + Math2.sqrt(x6 * x6 + dof)) / (2 * Math2.sqrt(x6 * x6 + dof)), dof2, dof2);
            },
            inv: function(p7, dof) {
              var x6 = jStat3.ibetainv(2 * Math2.min(p7, 1 - p7), 0.5 * dof, 0.5);
              x6 = Math2.sqrt(dof * (1 - x6) / x6);
              return p7 > 0.5 ? x6 : -x6;
            },
            mean: function mean(dof) {
              return dof > 1 ? 0 : void 0;
            },
            median: function median() {
              return 0;
            },
            mode: function mode() {
              return 0;
            },
            sample: function sample(dof) {
              return jStat3.randn() * Math2.sqrt(dof / (2 * jStat3.randg(dof / 2)));
            },
            variance: function variance(dof) {
              return dof > 2 ? dof / (dof - 2) : dof > 1 ? Infinity : void 0;
            }
          });
          jStat3.extend(jStat3.weibull, {
            pdf: function pdf(x6, scale, shape) {
              if (x6 < 0 || scale < 0 || shape < 0)
                return 0;
              return shape / scale * Math2.pow(x6 / scale, shape - 1) * Math2.exp(-Math2.pow(x6 / scale, shape));
            },
            cdf: function cdf(x6, scale, shape) {
              return x6 < 0 ? 0 : 1 - Math2.exp(-Math2.pow(x6 / scale, shape));
            },
            inv: function(p7, scale, shape) {
              return scale * Math2.pow(-Math2.log(1 - p7), 1 / shape);
            },
            mean: function(scale, shape) {
              return scale * jStat3.gammafn(1 + 1 / shape);
            },
            median: function median(scale, shape) {
              return scale * Math2.pow(Math2.log(2), 1 / shape);
            },
            mode: function mode(scale, shape) {
              if (shape <= 1)
                return 0;
              return scale * Math2.pow((shape - 1) / shape, 1 / shape);
            },
            sample: function sample(scale, shape) {
              return scale * Math2.pow(-Math2.log(jStat3._random_fn()), 1 / shape);
            },
            variance: function variance(scale, shape) {
              return scale * scale * jStat3.gammafn(1 + 2 / shape) - Math2.pow(jStat3.weibull.mean(scale, shape), 2);
            }
          });
          jStat3.extend(jStat3.uniform, {
            pdf: function pdf(x6, a11, b7) {
              return x6 < a11 || x6 > b7 ? 0 : 1 / (b7 - a11);
            },
            cdf: function cdf(x6, a11, b7) {
              if (x6 < a11)
                return 0;
              else if (x6 < b7)
                return (x6 - a11) / (b7 - a11);
              return 1;
            },
            inv: function(p7, a11, b7) {
              return a11 + p7 * (b7 - a11);
            },
            mean: function mean(a11, b7) {
              return 0.5 * (a11 + b7);
            },
            median: function median(a11, b7) {
              return jStat3.mean(a11, b7);
            },
            mode: function mode() {
              throw new Error("mode is not yet implemented");
            },
            sample: function sample(a11, b7) {
              return a11 / 2 + b7 / 2 + (b7 / 2 - a11 / 2) * (2 * jStat3._random_fn() - 1);
            },
            variance: function variance(a11, b7) {
              return Math2.pow(b7 - a11, 2) / 12;
            }
          });
          function betinc(x6, a11, b7, eps) {
            var a0 = 0;
            var b0 = 1;
            var a1 = 1;
            var b1 = 1;
            var m9 = 0;
            var a22 = 0;
            var c92;
            while (Math2.abs((a1 - a22) / a1) > eps) {
              a22 = a1;
              c92 = -(a11 + m9) * (a11 + b7 + m9) * x6 / (a11 + 2 * m9) / (a11 + 2 * m9 + 1);
              a0 = a1 + c92 * a0;
              b0 = b1 + c92 * b0;
              m9 = m9 + 1;
              c92 = m9 * (b7 - m9) * x6 / (a11 + 2 * m9 - 1) / (a11 + 2 * m9);
              a1 = a0 + c92 * a1;
              b1 = b0 + c92 * b1;
              a0 = a0 / b1;
              b0 = b0 / b1;
              a1 = a1 / b1;
              b1 = 1;
            }
            return a1 / a11;
          }
          jStat3.extend(jStat3.binomial, {
            pdf: function pdf(k8, n31, p7) {
              return p7 === 0 || p7 === 1 ? n31 * p7 === k8 ? 1 : 0 : jStat3.combination(n31, k8) * Math2.pow(p7, k8) * Math2.pow(1 - p7, n31 - k8);
            },
            cdf: function cdf(x6, n31, p7) {
              var betacdf;
              var eps = 1e-10;
              if (x6 < 0)
                return 0;
              if (x6 >= n31)
                return 1;
              if (p7 < 0 || p7 > 1 || n31 <= 0)
                return NaN;
              x6 = Math2.floor(x6);
              var z5 = p7;
              var a11 = x6 + 1;
              var b7 = n31 - x6;
              var s20 = a11 + b7;
              var bt = Math2.exp(jStat3.gammaln(s20) - jStat3.gammaln(b7) - jStat3.gammaln(a11) + a11 * Math2.log(z5) + b7 * Math2.log(1 - z5));
              if (z5 < (a11 + 1) / (s20 + 2))
                betacdf = bt * betinc(z5, a11, b7, eps);
              else
                betacdf = 1 - bt * betinc(1 - z5, b7, a11, eps);
              return Math2.round((1 - betacdf) * (1 / eps)) / (1 / eps);
            }
          });
          jStat3.extend(jStat3.negbin, {
            pdf: function pdf(k8, r18, p7) {
              if (k8 !== k8 >>> 0)
                return false;
              if (k8 < 0)
                return 0;
              return jStat3.combination(k8 + r18 - 1, r18 - 1) * Math2.pow(1 - p7, k8) * Math2.pow(p7, r18);
            },
            cdf: function cdf(x6, r18, p7) {
              var sum = 0, k8 = 0;
              if (x6 < 0)
                return 0;
              for (; k8 <= x6; k8++) {
                sum += jStat3.negbin.pdf(k8, r18, p7);
              }
              return sum;
            }
          });
          jStat3.extend(jStat3.hypgeom, {
            pdf: function pdf(k8, N6, m6, n31) {
              if (k8 !== k8 | 0) {
                return false;
              } else if (k8 < 0 || k8 < m6 - (N6 - n31)) {
                return 0;
              } else if (k8 > n31 || k8 > m6) {
                return 0;
              } else if (m6 * 2 > N6) {
                if (n31 * 2 > N6) {
                  return jStat3.hypgeom.pdf(N6 - m6 - n31 + k8, N6, N6 - m6, N6 - n31);
                } else {
                  return jStat3.hypgeom.pdf(n31 - k8, N6, N6 - m6, n31);
                }
              } else if (n31 * 2 > N6) {
                return jStat3.hypgeom.pdf(m6 - k8, N6, m6, N6 - n31);
              } else if (m6 < n31) {
                return jStat3.hypgeom.pdf(k8, N6, n31, m6);
              } else {
                var scaledPDF = 1;
                var samplesDone = 0;
                for (var i23 = 0; i23 < k8; i23++) {
                  while (scaledPDF > 1 && samplesDone < n31) {
                    scaledPDF *= 1 - m6 / (N6 - samplesDone);
                    samplesDone++;
                  }
                  scaledPDF *= (n31 - i23) * (m6 - i23) / ((i23 + 1) * (N6 - m6 - n31 + i23 + 1));
                }
                for (; samplesDone < n31; samplesDone++) {
                  scaledPDF *= 1 - m6 / (N6 - samplesDone);
                }
                return Math2.min(1, Math2.max(0, scaledPDF));
              }
            },
            cdf: function cdf(x6, N6, m6, n31) {
              if (x6 < 0 || x6 < m6 - (N6 - n31)) {
                return 0;
              } else if (x6 >= n31 || x6 >= m6) {
                return 1;
              } else if (m6 * 2 > N6) {
                if (n31 * 2 > N6) {
                  return jStat3.hypgeom.cdf(N6 - m6 - n31 + x6, N6, N6 - m6, N6 - n31);
                } else {
                  return 1 - jStat3.hypgeom.cdf(n31 - x6 - 1, N6, N6 - m6, n31);
                }
              } else if (n31 * 2 > N6) {
                return 1 - jStat3.hypgeom.cdf(m6 - x6 - 1, N6, m6, N6 - n31);
              } else if (m6 < n31) {
                return jStat3.hypgeom.cdf(x6, N6, n31, m6);
              } else {
                var scaledCDF = 1;
                var scaledPDF = 1;
                var samplesDone = 0;
                for (var i23 = 0; i23 < x6; i23++) {
                  while (scaledCDF > 1 && samplesDone < n31) {
                    var factor = 1 - m6 / (N6 - samplesDone);
                    scaledPDF *= factor;
                    scaledCDF *= factor;
                    samplesDone++;
                  }
                  scaledPDF *= (n31 - i23) * (m6 - i23) / ((i23 + 1) * (N6 - m6 - n31 + i23 + 1));
                  scaledCDF += scaledPDF;
                }
                for (; samplesDone < n31; samplesDone++) {
                  scaledCDF *= 1 - m6 / (N6 - samplesDone);
                }
                return Math2.min(1, Math2.max(0, scaledCDF));
              }
            }
          });
          jStat3.extend(jStat3.poisson, {
            pdf: function pdf(k8, l20) {
              if (l20 < 0 || k8 % 1 !== 0 || k8 < 0) {
                return 0;
              }
              return Math2.pow(l20, k8) * Math2.exp(-l20) / jStat3.factorial(k8);
            },
            cdf: function cdf(x6, l20) {
              var sumarr = [], k8 = 0;
              if (x6 < 0)
                return 0;
              for (; k8 <= x6; k8++) {
                sumarr.push(jStat3.poisson.pdf(k8, l20));
              }
              return jStat3.sum(sumarr);
            },
            mean: function(l20) {
              return l20;
            },
            variance: function(l20) {
              return l20;
            },
            sampleSmall: function sampleSmall(l20) {
              var p7 = 1, k8 = 0, L6 = Math2.exp(-l20);
              do {
                k8++;
                p7 *= jStat3._random_fn();
              } while (p7 > L6);
              return k8 - 1;
            },
            sampleLarge: function sampleLarge(l20) {
              var lam = l20;
              var k8;
              var U, V6, slam, loglam, a11, b7, invalpha, vr, us;
              slam = Math2.sqrt(lam);
              loglam = Math2.log(lam);
              b7 = 0.931 + 2.53 * slam;
              a11 = -0.059 + 0.02483 * b7;
              invalpha = 1.1239 + 1.1328 / (b7 - 3.4);
              vr = 0.9277 - 3.6224 / (b7 - 2);
              while (1) {
                U = Math2.random() - 0.5;
                V6 = Math2.random();
                us = 0.5 - Math2.abs(U);
                k8 = Math2.floor((2 * a11 / us + b7) * U + lam + 0.43);
                if (us >= 0.07 && V6 <= vr) {
                  return k8;
                }
                if (k8 < 0 || us < 0.013 && V6 > us) {
                  continue;
                }
                if (Math2.log(V6) + Math2.log(invalpha) - Math2.log(a11 / (us * us) + b7) <= -lam + k8 * loglam - jStat3.loggam(k8 + 1)) {
                  return k8;
                }
              }
            },
            sample: function sample(l20) {
              if (l20 < 10)
                return this.sampleSmall(l20);
              else
                return this.sampleLarge(l20);
            }
          });
          jStat3.extend(jStat3.triangular, {
            pdf: function pdf(x6, a11, b7, c12) {
              if (b7 <= a11 || c12 < a11 || c12 > b7) {
                return NaN;
              } else {
                if (x6 < a11 || x6 > b7) {
                  return 0;
                } else if (x6 < c12) {
                  return 2 * (x6 - a11) / ((b7 - a11) * (c12 - a11));
                } else if (x6 === c12) {
                  return 2 / (b7 - a11);
                } else {
                  return 2 * (b7 - x6) / ((b7 - a11) * (b7 - c12));
                }
              }
            },
            cdf: function cdf(x6, a11, b7, c12) {
              if (b7 <= a11 || c12 < a11 || c12 > b7)
                return NaN;
              if (x6 <= a11)
                return 0;
              else if (x6 >= b7)
                return 1;
              if (x6 <= c12)
                return Math2.pow(x6 - a11, 2) / ((b7 - a11) * (c12 - a11));
              else
                return 1 - Math2.pow(b7 - x6, 2) / ((b7 - a11) * (b7 - c12));
            },
            inv: function inv(p7, a11, b7, c12) {
              if (b7 <= a11 || c12 < a11 || c12 > b7) {
                return NaN;
              } else {
                if (p7 <= (c12 - a11) / (b7 - a11)) {
                  return a11 + (b7 - a11) * Math2.sqrt(p7 * ((c12 - a11) / (b7 - a11)));
                } else {
                  return a11 + (b7 - a11) * (1 - Math2.sqrt((1 - p7) * (1 - (c12 - a11) / (b7 - a11))));
                }
              }
            },
            mean: function mean(a11, b7, c12) {
              return (a11 + b7 + c12) / 3;
            },
            median: function median(a11, b7, c12) {
              if (c12 <= (a11 + b7) / 2) {
                return b7 - Math2.sqrt((b7 - a11) * (b7 - c12)) / Math2.sqrt(2);
              } else if (c12 > (a11 + b7) / 2) {
                return a11 + Math2.sqrt((b7 - a11) * (c12 - a11)) / Math2.sqrt(2);
              }
            },
            mode: function mode(a11, b7, c12) {
              return c12;
            },
            sample: function sample(a11, b7, c12) {
              var u11 = jStat3._random_fn();
              if (u11 < (c12 - a11) / (b7 - a11))
                return a11 + Math2.sqrt(u11 * (b7 - a11) * (c12 - a11));
              return b7 - Math2.sqrt((1 - u11) * (b7 - a11) * (b7 - c12));
            },
            variance: function variance(a11, b7, c12) {
              return (a11 * a11 + b7 * b7 + c12 * c12 - a11 * b7 - a11 * c12 - b7 * c12) / 18;
            }
          });
          jStat3.extend(jStat3.arcsine, {
            pdf: function pdf(x6, a11, b7) {
              if (b7 <= a11)
                return NaN;
              return x6 <= a11 || x6 >= b7 ? 0 : 2 / Math2.PI * Math2.pow(Math2.pow(b7 - a11, 2) - Math2.pow(2 * x6 - a11 - b7, 2), -0.5);
            },
            cdf: function cdf(x6, a11, b7) {
              if (x6 < a11)
                return 0;
              else if (x6 < b7)
                return 2 / Math2.PI * Math2.asin(Math2.sqrt((x6 - a11) / (b7 - a11)));
              return 1;
            },
            inv: function(p7, a11, b7) {
              return a11 + (0.5 - 0.5 * Math2.cos(Math2.PI * p7)) * (b7 - a11);
            },
            mean: function mean(a11, b7) {
              if (b7 <= a11)
                return NaN;
              return (a11 + b7) / 2;
            },
            median: function median(a11, b7) {
              if (b7 <= a11)
                return NaN;
              return (a11 + b7) / 2;
            },
            mode: function mode() {
              throw new Error("mode is not yet implemented");
            },
            sample: function sample(a11, b7) {
              return (a11 + b7) / 2 + (b7 - a11) / 2 * Math2.sin(2 * Math2.PI * jStat3.uniform.sample(0, 1));
            },
            variance: function variance(a11, b7) {
              if (b7 <= a11)
                return NaN;
              return Math2.pow(b7 - a11, 2) / 8;
            }
          });
          function laplaceSign(x6) {
            return x6 / Math2.abs(x6);
          }
          jStat3.extend(jStat3.laplace, {
            pdf: function pdf(x6, mu, b7) {
              return b7 <= 0 ? 0 : Math2.exp(-Math2.abs(x6 - mu) / b7) / (2 * b7);
            },
            cdf: function cdf(x6, mu, b7) {
              if (b7 <= 0) {
                return 0;
              }
              if (x6 < mu) {
                return 0.5 * Math2.exp((x6 - mu) / b7);
              } else {
                return 1 - 0.5 * Math2.exp(-(x6 - mu) / b7);
              }
            },
            mean: function(mu) {
              return mu;
            },
            median: function(mu) {
              return mu;
            },
            mode: function(mu) {
              return mu;
            },
            variance: function(mu, b7) {
              return 2 * b7 * b7;
            },
            sample: function sample(mu, b7) {
              var u11 = jStat3._random_fn() - 0.5;
              return mu - b7 * laplaceSign(u11) * Math2.log(1 - 2 * Math2.abs(u11));
            }
          });
          function tukeyWprob(w6, rr, cc) {
            var nleg = 12;
            var ihalf = 6;
            var C1 = -30;
            var C22 = -50;
            var C32 = 60;
            var bb = 8;
            var wlar = 3;
            var wincr1 = 2;
            var wincr2 = 3;
            var xleg = [
              0.9815606342467192,
              0.9041172563704749,
              0.7699026741943047,
              0.5873179542866175,
              0.3678314989981802,
              0.1252334085114689
            ];
            var aleg = [
              0.04717533638651183,
              0.10693932599531843,
              0.16007832854334622,
              0.20316742672306592,
              0.2334925365383548,
              0.24914704581340277
            ];
            var qsqz = w6 * 0.5;
            if (qsqz >= bb)
              return 1;
            var pr_w = 2 * jStat3.normal.cdf(qsqz, 0, 1, 1, 0) - 1;
            if (pr_w >= Math2.exp(C22 / cc))
              pr_w = Math2.pow(pr_w, cc);
            else
              pr_w = 0;
            var wincr;
            if (w6 > wlar)
              wincr = wincr1;
            else
              wincr = wincr2;
            var blb = qsqz;
            var binc = (bb - qsqz) / wincr;
            var bub = blb + binc;
            var einsum = 0;
            var cc1 = cc - 1;
            for (var wi = 1; wi <= wincr; wi++) {
              var elsum = 0;
              var a11 = 0.5 * (bub + blb);
              var b7 = 0.5 * (bub - blb);
              for (var jj = 1; jj <= nleg; jj++) {
                var j3, xx;
                if (ihalf < jj) {
                  j3 = nleg - jj + 1;
                  xx = xleg[j3 - 1];
                } else {
                  j3 = jj;
                  xx = -xleg[j3 - 1];
                }
                var c12 = b7 * xx;
                var ac = a11 + c12;
                var qexpo = ac * ac;
                if (qexpo > C32)
                  break;
                var pplus = 2 * jStat3.normal.cdf(ac, 0, 1, 1, 0);
                var pminus = 2 * jStat3.normal.cdf(ac, w6, 1, 1, 0);
                var rinsum = pplus * 0.5 - pminus * 0.5;
                if (rinsum >= Math2.exp(C1 / cc1)) {
                  rinsum = aleg[j3 - 1] * Math2.exp(-(0.5 * qexpo)) * Math2.pow(rinsum, cc1);
                  elsum += rinsum;
                }
              }
              elsum *= 2 * b7 * cc / Math2.sqrt(2 * Math2.PI);
              einsum += elsum;
              blb = bub;
              bub += binc;
            }
            pr_w += einsum;
            if (pr_w <= Math2.exp(C1 / rr))
              return 0;
            pr_w = Math2.pow(pr_w, rr);
            if (pr_w >= 1)
              return 1;
            return pr_w;
          }
          function tukeyQinv(p7, c12, v6) {
            var p0 = 0.322232421088;
            var q0 = 0.099348462606;
            var p1 = -1;
            var q1 = 0.588581570495;
            var p22 = -0.342242088547;
            var q2 = 0.531103462366;
            var p32 = -0.204231210125;
            var q3 = 0.10353775285;
            var p42 = -453642210148e-16;
            var q4 = 0.0038560700634;
            var c1 = 0.8832;
            var c22 = 0.2368;
            var c32 = 1.214;
            var c42 = 1.208;
            var c52 = 1.4142;
            var vmax = 120;
            var ps = 0.5 - 0.5 * p7;
            var yi = Math2.sqrt(Math2.log(1 / (ps * ps)));
            var t17 = yi + ((((yi * p42 + p32) * yi + p22) * yi + p1) * yi + p0) / ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
            if (v6 < vmax)
              t17 += (t17 * t17 * t17 + t17) / v6 / 4;
            var q = c1 - c22 * t17;
            if (v6 < vmax)
              q += -c32 / v6 + c42 * t17 / v6;
            return t17 * (q * Math2.log(c12 - 1) + c52);
          }
          jStat3.extend(jStat3.tukey, {
            cdf: function cdf(q, nmeans, df) {
              var rr = 1;
              var cc = nmeans;
              var nlegq = 16;
              var ihalfq = 8;
              var eps1 = -30;
              var eps2 = 1e-14;
              var dhaf = 100;
              var dquar = 800;
              var deigh = 5e3;
              var dlarg = 25e3;
              var ulen1 = 1;
              var ulen2 = 0.5;
              var ulen3 = 0.25;
              var ulen4 = 0.125;
              var xlegq = [
                0.9894009349916499,
                0.9445750230732326,
                0.8656312023878318,
                0.755404408355003,
                0.6178762444026438,
                0.45801677765722737,
                0.2816035507792589,
                0.09501250983763744
              ];
              var alegq = [
                0.027152459411754096,
                0.062253523938647894,
                0.09515851168249279,
                0.12462897125553388,
                0.14959598881657674,
                0.16915651939500254,
                0.18260341504492358,
                0.1894506104550685
              ];
              if (q <= 0)
                return 0;
              if (df < 2 || rr < 1 || cc < 2)
                return NaN;
              if (!Number.isFinite(q))
                return 1;
              if (df > dlarg)
                return tukeyWprob(q, rr, cc);
              var f22 = df * 0.5;
              var f2lf = f22 * Math2.log(df) - df * Math2.log(2) - jStat3.gammaln(f22);
              var f21 = f22 - 1;
              var ff4 = df * 0.25;
              var ulen;
              if (df <= dhaf)
                ulen = ulen1;
              else if (df <= dquar)
                ulen = ulen2;
              else if (df <= deigh)
                ulen = ulen3;
              else
                ulen = ulen4;
              f2lf += Math2.log(ulen);
              var ans = 0;
              for (var i23 = 1; i23 <= 50; i23++) {
                var otsum = 0;
                var twa1 = (2 * i23 - 1) * ulen;
                for (var jj = 1; jj <= nlegq; jj++) {
                  var j3, t1;
                  if (ihalfq < jj) {
                    j3 = jj - ihalfq - 1;
                    t1 = f2lf + f21 * Math2.log(twa1 + xlegq[j3] * ulen) - (xlegq[j3] * ulen + twa1) * ff4;
                  } else {
                    j3 = jj - 1;
                    t1 = f2lf + f21 * Math2.log(twa1 - xlegq[j3] * ulen) + (xlegq[j3] * ulen - twa1) * ff4;
                  }
                  var qsqz;
                  if (t1 >= eps1) {
                    if (ihalfq < jj) {
                      qsqz = q * Math2.sqrt((xlegq[j3] * ulen + twa1) * 0.5);
                    } else {
                      qsqz = q * Math2.sqrt((-(xlegq[j3] * ulen) + twa1) * 0.5);
                    }
                    var wprb = tukeyWprob(qsqz, rr, cc);
                    var rotsum = wprb * alegq[j3] * Math2.exp(t1);
                    otsum += rotsum;
                  }
                }
                if (i23 * ulen >= 1 && otsum <= eps2)
                  break;
                ans += otsum;
              }
              if (otsum > eps2) {
                throw new Error("tukey.cdf failed to converge");
              }
              if (ans > 1)
                ans = 1;
              return ans;
            },
            inv: function(p7, nmeans, df) {
              var rr = 1;
              var cc = nmeans;
              var eps = 1e-4;
              var maxiter = 50;
              if (df < 2 || rr < 1 || cc < 2)
                return NaN;
              if (p7 < 0 || p7 > 1)
                return NaN;
              if (p7 === 0)
                return 0;
              if (p7 === 1)
                return Infinity;
              var x0 = tukeyQinv(p7, cc, df);
              var valx0 = jStat3.tukey.cdf(x0, nmeans, df) - p7;
              var x1;
              if (valx0 > 0)
                x1 = Math2.max(0, x0 - 1);
              else
                x1 = x0 + 1;
              var valx1 = jStat3.tukey.cdf(x1, nmeans, df) - p7;
              var ans;
              for (var iter = 1; iter < maxiter; iter++) {
                ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0);
                valx0 = valx1;
                x0 = x1;
                if (ans < 0) {
                  ans = 0;
                  valx1 = -p7;
                }
                valx1 = jStat3.tukey.cdf(ans, nmeans, df) - p7;
                x1 = ans;
                var xabs = Math2.abs(x1 - x0);
                if (xabs < eps)
                  return ans;
              }
              throw new Error("tukey.inv failed to converge");
            }
          });
        })(jStat2, Math);
        (function(jStat3, Math2) {
          var push2 = Array.prototype.push;
          var isArray = jStat3.utils.isArray;
          function isUsable(arg) {
            return isArray(arg) || arg instanceof jStat3;
          }
          jStat3.extend({
            // add a vector/matrix to a vector/matrix or scalar
            add: function add(arr, arg) {
              if (isUsable(arg)) {
                if (!isUsable(arg[0]))
                  arg = [arg];
                return jStat3.map(arr, function(value, row, col) {
                  return value + arg[row][col];
                });
              }
              return jStat3.map(arr, function(value) {
                return value + arg;
              });
            },
            // subtract a vector or scalar from the vector
            subtract: function subtract(arr, arg) {
              if (isUsable(arg)) {
                if (!isUsable(arg[0]))
                  arg = [arg];
                return jStat3.map(arr, function(value, row, col) {
                  return value - arg[row][col] || 0;
                });
              }
              return jStat3.map(arr, function(value) {
                return value - arg;
              });
            },
            // matrix division
            divide: function divide(arr, arg) {
              if (isUsable(arg)) {
                if (!isUsable(arg[0]))
                  arg = [arg];
                return jStat3.multiply(arr, jStat3.inv(arg));
              }
              return jStat3.map(arr, function(value) {
                return value / arg;
              });
            },
            // matrix multiplication
            multiply: function multiply(arr, arg) {
              var row, col, nrescols, sum, nrow, ncol, res, rescols;
              if (arr.length === void 0 && arg.length === void 0) {
                return arr * arg;
              }
              nrow = arr.length, ncol = arr[0].length, res = jStat3.zeros(nrow, nrescols = isUsable(arg) ? arg[0].length : ncol), rescols = 0;
              if (isUsable(arg)) {
                for (; rescols < nrescols; rescols++) {
                  for (row = 0; row < nrow; row++) {
                    sum = 0;
                    for (col = 0; col < ncol; col++)
                      sum += arr[row][col] * arg[col][rescols];
                    res[row][rescols] = sum;
                  }
                }
                return nrow === 1 && rescols === 1 ? res[0][0] : res;
              }
              return jStat3.map(arr, function(value) {
                return value * arg;
              });
            },
            // outer([1,2,3],[4,5,6])
            // ===
            // [[1],[2],[3]] times [[4,5,6]]
            // ->
            // [[4,5,6],[8,10,12],[12,15,18]]
            outer: function outer(A6, B5) {
              return jStat3.multiply(A6.map(function(t17) {
                return [t17];
              }), [B5]);
            },
            // Returns the dot product of two matricies
            dot: function dot(arr, arg) {
              if (!isUsable(arr[0]))
                arr = [arr];
              if (!isUsable(arg[0]))
                arg = [arg];
              var left = arr[0].length === 1 && arr.length !== 1 ? jStat3.transpose(arr) : arr, right = arg[0].length === 1 && arg.length !== 1 ? jStat3.transpose(arg) : arg, res = [], row = 0, nrow = left.length, ncol = left[0].length, sum, col;
              for (; row < nrow; row++) {
                res[row] = [];
                sum = 0;
                for (col = 0; col < ncol; col++)
                  sum += left[row][col] * right[row][col];
                res[row] = sum;
              }
              return res.length === 1 ? res[0] : res;
            },
            // raise every element by a scalar
            pow: function pow(arr, arg) {
              return jStat3.map(arr, function(value) {
                return Math2.pow(value, arg);
              });
            },
            // exponentiate every element
            exp: function exp(arr) {
              return jStat3.map(arr, function(value) {
                return Math2.exp(value);
              });
            },
            // generate the natural log of every element
            log: function exp(arr) {
              return jStat3.map(arr, function(value) {
                return Math2.log(value);
              });
            },
            // generate the absolute values of the vector
            abs: function abs(arr) {
              return jStat3.map(arr, function(value) {
                return Math2.abs(value);
              });
            },
            // computes the p-norm of the vector
            // In the case that a matrix is passed, uses the first row as the vector
            norm: function norm(arr, p7) {
              var nnorm = 0, i23 = 0;
              if (isNaN(p7))
                p7 = 2;
              if (isUsable(arr[0]))
                arr = arr[0];
              for (; i23 < arr.length; i23++) {
                nnorm += Math2.pow(Math2.abs(arr[i23]), p7);
              }
              return Math2.pow(nnorm, 1 / p7);
            },
            // computes the angle between two vectors in rads
            // In case a matrix is passed, this uses the first row as the vector
            angle: function angle(arr, arg) {
              return Math2.acos(jStat3.dot(arr, arg) / (jStat3.norm(arr) * jStat3.norm(arg)));
            },
            // augment one matrix by another
            // Note: this function returns a matrix, not a jStat object
            aug: function aug(a11, b7) {
              var newarr = [];
              var i23;
              for (i23 = 0; i23 < a11.length; i23++) {
                newarr.push(a11[i23].slice());
              }
              for (i23 = 0; i23 < newarr.length; i23++) {
                push2.apply(newarr[i23], b7[i23]);
              }
              return newarr;
            },
            // The inv() function calculates the inverse of a matrix
            // Create the inverse by augmenting the matrix by the identity matrix of the
            // appropriate size, and then use G-J elimination on the augmented matrix.
            inv: function inv(a11) {
              var rows = a11.length;
              var cols = a11[0].length;
              var b7 = jStat3.identity(rows, cols);
              var c12 = jStat3.gauss_jordan(a11, b7);
              var result = [];
              var i23 = 0;
              var j3;
              for (; i23 < rows; i23++) {
                result[i23] = [];
                for (j3 = cols; j3 < c12[0].length; j3++)
                  result[i23][j3 - cols] = c12[i23][j3];
              }
              return result;
            },
            // calculate the determinant of a matrix
            det: function det(a11) {
              if (a11.length === 2) {
                return a11[0][0] * a11[1][1] - a11[0][1] * a11[1][0];
              }
              var determinant = 0;
              for (var i23 = 0; i23 < a11.length; i23++) {
                var submatrix = [];
                for (var row = 1; row < a11.length; row++) {
                  submatrix[row - 1] = [];
                  for (var col = 0; col < a11.length; col++) {
                    if (col < i23) {
                      submatrix[row - 1][col] = a11[row][col];
                    } else if (col > i23) {
                      submatrix[row - 1][col - 1] = a11[row][col];
                    }
                  }
                }
                var sign = i23 % 2 ? -1 : 1;
                determinant += det(submatrix) * a11[0][i23] * sign;
              }
              return determinant;
            },
            gauss_elimination: function gauss_elimination(a11, b7) {
              var i23 = 0, j3 = 0, n31 = a11.length, m6 = a11[0].length, factor = 1, sum = 0, x6 = [], maug, pivot, temp, k8;
              a11 = jStat3.aug(a11, b7);
              maug = a11[0].length;
              for (i23 = 0; i23 < n31; i23++) {
                pivot = a11[i23][i23];
                j3 = i23;
                for (k8 = i23 + 1; k8 < m6; k8++) {
                  if (pivot < Math2.abs(a11[k8][i23])) {
                    pivot = a11[k8][i23];
                    j3 = k8;
                  }
                }
                if (j3 != i23) {
                  for (k8 = 0; k8 < maug; k8++) {
                    temp = a11[i23][k8];
                    a11[i23][k8] = a11[j3][k8];
                    a11[j3][k8] = temp;
                  }
                }
                for (j3 = i23 + 1; j3 < n31; j3++) {
                  factor = a11[j3][i23] / a11[i23][i23];
                  for (k8 = i23; k8 < maug; k8++) {
                    a11[j3][k8] = a11[j3][k8] - factor * a11[i23][k8];
                  }
                }
              }
              for (i23 = n31 - 1; i23 >= 0; i23--) {
                sum = 0;
                for (j3 = i23 + 1; j3 <= n31 - 1; j3++) {
                  sum = sum + x6[j3] * a11[i23][j3];
                }
                x6[i23] = (a11[i23][maug - 1] - sum) / a11[i23][i23];
              }
              return x6;
            },
            gauss_jordan: function gauss_jordan(a11, b7) {
              var m6 = jStat3.aug(a11, b7);
              var h11 = m6.length;
              var w6 = m6[0].length;
              var c12 = 0;
              var x6, y7, y22;
              for (y7 = 0; y7 < h11; y7++) {
                var maxrow = y7;
                for (y22 = y7 + 1; y22 < h11; y22++) {
                  if (Math2.abs(m6[y22][y7]) > Math2.abs(m6[maxrow][y7]))
                    maxrow = y22;
                }
                var tmp = m6[y7];
                m6[y7] = m6[maxrow];
                m6[maxrow] = tmp;
                for (y22 = y7 + 1; y22 < h11; y22++) {
                  c12 = m6[y22][y7] / m6[y7][y7];
                  for (x6 = y7; x6 < w6; x6++) {
                    m6[y22][x6] -= m6[y7][x6] * c12;
                  }
                }
              }
              for (y7 = h11 - 1; y7 >= 0; y7--) {
                c12 = m6[y7][y7];
                for (y22 = 0; y22 < y7; y22++) {
                  for (x6 = w6 - 1; x6 > y7 - 1; x6--) {
                    m6[y22][x6] -= m6[y7][x6] * m6[y22][y7] / c12;
                  }
                }
                m6[y7][y7] /= c12;
                for (x6 = h11; x6 < w6; x6++) {
                  m6[y7][x6] /= c12;
                }
              }
              return m6;
            },
            // solve equation
            // Ax=b
            // A is upper triangular matrix
            // A=[[1,2,3],[0,4,5],[0,6,7]]
            // b=[1,2,3]
            // triaUpSolve(A,b) // -> [2.666,0.1666,1.666]
            // if you use matrix style
            // A=[[1,2,3],[0,4,5],[0,6,7]]
            // b=[[1],[2],[3]]
            // will return [[2.666],[0.1666],[1.666]]
            triaUpSolve: function triaUpSolve(A6, b7) {
              var size = A6[0].length;
              var x6 = jStat3.zeros(1, size)[0];
              var parts;
              var matrix_mode = false;
              if (b7[0].length != void 0) {
                b7 = b7.map(function(i23) {
                  return i23[0];
                });
                matrix_mode = true;
              }
              jStat3.arange(size - 1, -1, -1).forEach(function(i23) {
                parts = jStat3.arange(i23 + 1, size).map(function(j3) {
                  return x6[j3] * A6[i23][j3];
                });
                x6[i23] = (b7[i23] - jStat3.sum(parts)) / A6[i23][i23];
              });
              if (matrix_mode)
                return x6.map(function(i23) {
                  return [i23];
                });
              return x6;
            },
            triaLowSolve: function triaLowSolve(A6, b7) {
              var size = A6[0].length;
              var x6 = jStat3.zeros(1, size)[0];
              var parts;
              var matrix_mode = false;
              if (b7[0].length != void 0) {
                b7 = b7.map(function(i23) {
                  return i23[0];
                });
                matrix_mode = true;
              }
              jStat3.arange(size).forEach(function(i23) {
                parts = jStat3.arange(i23).map(function(j3) {
                  return A6[i23][j3] * x6[j3];
                });
                x6[i23] = (b7[i23] - jStat3.sum(parts)) / A6[i23][i23];
              });
              if (matrix_mode)
                return x6.map(function(i23) {
                  return [i23];
                });
              return x6;
            },
            // A -> [L,U]
            // A=LU
            // L is lower triangular matrix
            // U is upper triangular matrix
            lu: function lu(A6) {
              var size = A6.length;
              var L6 = jStat3.identity(size);
              var R6 = jStat3.zeros(A6.length, A6[0].length);
              var parts;
              jStat3.arange(size).forEach(function(t17) {
                R6[0][t17] = A6[0][t17];
              });
              jStat3.arange(1, size).forEach(function(l20) {
                jStat3.arange(l20).forEach(function(i23) {
                  parts = jStat3.arange(i23).map(function(jj) {
                    return L6[l20][jj] * R6[jj][i23];
                  });
                  L6[l20][i23] = (A6[l20][i23] - jStat3.sum(parts)) / R6[i23][i23];
                });
                jStat3.arange(l20, size).forEach(function(j3) {
                  parts = jStat3.arange(l20).map(function(jj) {
                    return L6[l20][jj] * R6[jj][j3];
                  });
                  R6[l20][j3] = A6[parts.length][j3] - jStat3.sum(parts);
                });
              });
              return [L6, R6];
            },
            // A -> T
            // A=TT'
            // T is lower triangular matrix
            cholesky: function cholesky(A6) {
              var size = A6.length;
              var T6 = jStat3.zeros(A6.length, A6[0].length);
              var parts;
              jStat3.arange(size).forEach(function(i23) {
                parts = jStat3.arange(i23).map(function(t17) {
                  return Math2.pow(T6[i23][t17], 2);
                });
                T6[i23][i23] = Math2.sqrt(A6[i23][i23] - jStat3.sum(parts));
                jStat3.arange(i23 + 1, size).forEach(function(j3) {
                  parts = jStat3.arange(i23).map(function(t17) {
                    return T6[i23][t17] * T6[j3][t17];
                  });
                  T6[j3][i23] = (A6[i23][j3] - jStat3.sum(parts)) / T6[i23][i23];
                });
              });
              return T6;
            },
            gauss_jacobi: function gauss_jacobi(a11, b7, x6, r18) {
              var i23 = 0;
              var j3 = 0;
              var n31 = a11.length;
              var l20 = [];
              var u11 = [];
              var d11 = [];
              var xv, c12, h11, xk;
              for (; i23 < n31; i23++) {
                l20[i23] = [];
                u11[i23] = [];
                d11[i23] = [];
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 > j3) {
                    l20[i23][j3] = a11[i23][j3];
                    u11[i23][j3] = d11[i23][j3] = 0;
                  } else if (i23 < j3) {
                    u11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = d11[i23][j3] = 0;
                  } else {
                    d11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = u11[i23][j3] = 0;
                  }
                }
              }
              h11 = jStat3.multiply(jStat3.multiply(jStat3.inv(d11), jStat3.add(l20, u11)), -1);
              c12 = jStat3.multiply(jStat3.inv(d11), b7);
              xv = x6;
              xk = jStat3.add(jStat3.multiply(h11, x6), c12);
              i23 = 2;
              while (Math2.abs(jStat3.norm(jStat3.subtract(xk, xv))) > r18) {
                xv = xk;
                xk = jStat3.add(jStat3.multiply(h11, xv), c12);
                i23++;
              }
              return xk;
            },
            gauss_seidel: function gauss_seidel(a11, b7, x6, r18) {
              var i23 = 0;
              var n31 = a11.length;
              var l20 = [];
              var u11 = [];
              var d11 = [];
              var j3, xv, c12, h11, xk;
              for (; i23 < n31; i23++) {
                l20[i23] = [];
                u11[i23] = [];
                d11[i23] = [];
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 > j3) {
                    l20[i23][j3] = a11[i23][j3];
                    u11[i23][j3] = d11[i23][j3] = 0;
                  } else if (i23 < j3) {
                    u11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = d11[i23][j3] = 0;
                  } else {
                    d11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = u11[i23][j3] = 0;
                  }
                }
              }
              h11 = jStat3.multiply(jStat3.multiply(jStat3.inv(jStat3.add(d11, l20)), u11), -1);
              c12 = jStat3.multiply(jStat3.inv(jStat3.add(d11, l20)), b7);
              xv = x6;
              xk = jStat3.add(jStat3.multiply(h11, x6), c12);
              i23 = 2;
              while (Math2.abs(jStat3.norm(jStat3.subtract(xk, xv))) > r18) {
                xv = xk;
                xk = jStat3.add(jStat3.multiply(h11, xv), c12);
                i23 = i23 + 1;
              }
              return xk;
            },
            SOR: function SOR(a11, b7, x6, r18, w6) {
              var i23 = 0;
              var n31 = a11.length;
              var l20 = [];
              var u11 = [];
              var d11 = [];
              var j3, xv, c12, h11, xk;
              for (; i23 < n31; i23++) {
                l20[i23] = [];
                u11[i23] = [];
                d11[i23] = [];
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 > j3) {
                    l20[i23][j3] = a11[i23][j3];
                    u11[i23][j3] = d11[i23][j3] = 0;
                  } else if (i23 < j3) {
                    u11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = d11[i23][j3] = 0;
                  } else {
                    d11[i23][j3] = a11[i23][j3];
                    l20[i23][j3] = u11[i23][j3] = 0;
                  }
                }
              }
              h11 = jStat3.multiply(
                jStat3.inv(jStat3.add(d11, jStat3.multiply(l20, w6))),
                jStat3.subtract(
                  jStat3.multiply(d11, 1 - w6),
                  jStat3.multiply(u11, w6)
                )
              );
              c12 = jStat3.multiply(jStat3.multiply(jStat3.inv(jStat3.add(
                d11,
                jStat3.multiply(l20, w6)
              )), b7), w6);
              xv = x6;
              xk = jStat3.add(jStat3.multiply(h11, x6), c12);
              i23 = 2;
              while (Math2.abs(jStat3.norm(jStat3.subtract(xk, xv))) > r18) {
                xv = xk;
                xk = jStat3.add(jStat3.multiply(h11, xv), c12);
                i23++;
              }
              return xk;
            },
            householder: function householder(a11) {
              var m6 = a11.length;
              var n31 = a11[0].length;
              var i23 = 0;
              var w6 = [];
              var p7 = [];
              var alpha, r18, k8, j3, factor;
              for (; i23 < m6 - 1; i23++) {
                alpha = 0;
                for (j3 = i23 + 1; j3 < n31; j3++)
                  alpha += a11[j3][i23] * a11[j3][i23];
                factor = a11[i23 + 1][i23] > 0 ? -1 : 1;
                alpha = factor * Math2.sqrt(alpha);
                r18 = Math2.sqrt((alpha * alpha - a11[i23 + 1][i23] * alpha) / 2);
                w6 = jStat3.zeros(m6, 1);
                w6[i23 + 1][0] = (a11[i23 + 1][i23] - alpha) / (2 * r18);
                for (k8 = i23 + 2; k8 < m6; k8++)
                  w6[k8][0] = a11[k8][i23] / (2 * r18);
                p7 = jStat3.subtract(
                  jStat3.identity(m6, n31),
                  jStat3.multiply(jStat3.multiply(w6, jStat3.transpose(w6)), 2)
                );
                a11 = jStat3.multiply(p7, jStat3.multiply(a11, p7));
              }
              return a11;
            },
            // A -> [Q,R]
            // Q is orthogonal matrix
            // R is upper triangular
            QR: function() {
              var sum = jStat3.sum;
              var range = jStat3.arange;
              function qr2(x6) {
                var n31 = x6.length;
                var p7 = x6[0].length;
                var r18 = jStat3.zeros(p7, p7);
                x6 = jStat3.copy(x6);
                var i23, j3, k8;
                for (j3 = 0; j3 < p7; j3++) {
                  r18[j3][j3] = Math2.sqrt(sum(range(n31).map(function(i24) {
                    return x6[i24][j3] * x6[i24][j3];
                  })));
                  for (i23 = 0; i23 < n31; i23++) {
                    x6[i23][j3] = x6[i23][j3] / r18[j3][j3];
                  }
                  for (k8 = j3 + 1; k8 < p7; k8++) {
                    r18[j3][k8] = sum(range(n31).map(function(i24) {
                      return x6[i24][j3] * x6[i24][k8];
                    }));
                    for (i23 = 0; i23 < n31; i23++) {
                      x6[i23][k8] = x6[i23][k8] - x6[i23][j3] * r18[j3][k8];
                    }
                  }
                }
                return [x6, r18];
              }
              return qr2;
            }(),
            lstsq: /* @__PURE__ */ function() {
              function R_I(A6) {
                A6 = jStat3.copy(A6);
                var size = A6.length;
                var I6 = jStat3.identity(size);
                jStat3.arange(size - 1, -1, -1).forEach(function(i23) {
                  jStat3.sliceAssign(
                    I6,
                    { row: i23 },
                    jStat3.divide(jStat3.slice(I6, { row: i23 }), A6[i23][i23])
                  );
                  jStat3.sliceAssign(
                    A6,
                    { row: i23 },
                    jStat3.divide(jStat3.slice(A6, { row: i23 }), A6[i23][i23])
                  );
                  jStat3.arange(i23).forEach(function(j3) {
                    var c12 = jStat3.multiply(A6[j3][i23], -1);
                    var Aj = jStat3.slice(A6, { row: j3 });
                    var cAi = jStat3.multiply(jStat3.slice(A6, { row: i23 }), c12);
                    jStat3.sliceAssign(A6, { row: j3 }, jStat3.add(Aj, cAi));
                    var Ij = jStat3.slice(I6, { row: j3 });
                    var cIi = jStat3.multiply(jStat3.slice(I6, { row: i23 }), c12);
                    jStat3.sliceAssign(I6, { row: j3 }, jStat3.add(Ij, cIi));
                  });
                });
                return I6;
              }
              function qr_solve(A6, b7) {
                var array_mode = false;
                if (b7[0].length === void 0) {
                  b7 = b7.map(function(x7) {
                    return [x7];
                  });
                  array_mode = true;
                }
                var QR = jStat3.QR(A6);
                var Q = QR[0];
                var R6 = QR[1];
                var attrs = A6[0].length;
                var Q1 = jStat3.slice(Q, { col: { end: attrs } });
                var R1 = jStat3.slice(R6, { row: { end: attrs } });
                var RI = R_I(R1);
                var Q2 = jStat3.transpose(Q1);
                if (Q2[0].length === void 0) {
                  Q2 = [Q2];
                }
                var x6 = jStat3.multiply(jStat3.multiply(RI, Q2), b7);
                if (x6.length === void 0) {
                  x6 = [[x6]];
                }
                if (array_mode)
                  return x6.map(function(i23) {
                    return i23[0];
                  });
                return x6;
              }
              return qr_solve;
            }(),
            jacobi: function jacobi(a11) {
              var condition = 1;
              var n31 = a11.length;
              var e33 = jStat3.identity(n31, n31);
              var ev = [];
              var b7, i23, j3, p7, q, maxim, theta, s20;
              while (condition === 1) {
                maxim = a11[0][1];
                p7 = 0;
                q = 1;
                for (i23 = 0; i23 < n31; i23++) {
                  for (j3 = 0; j3 < n31; j3++) {
                    if (i23 != j3) {
                      if (maxim < Math2.abs(a11[i23][j3])) {
                        maxim = Math2.abs(a11[i23][j3]);
                        p7 = i23;
                        q = j3;
                      }
                    }
                  }
                }
                if (a11[p7][p7] === a11[q][q])
                  theta = a11[p7][q] > 0 ? Math2.PI / 4 : -Math2.PI / 4;
                else
                  theta = Math2.atan(2 * a11[p7][q] / (a11[p7][p7] - a11[q][q])) / 2;
                s20 = jStat3.identity(n31, n31);
                s20[p7][p7] = Math2.cos(theta);
                s20[p7][q] = -Math2.sin(theta);
                s20[q][p7] = Math2.sin(theta);
                s20[q][q] = Math2.cos(theta);
                e33 = jStat3.multiply(e33, s20);
                b7 = jStat3.multiply(jStat3.multiply(jStat3.inv(s20), a11), s20);
                a11 = b7;
                condition = 0;
                for (i23 = 1; i23 < n31; i23++) {
                  for (j3 = 1; j3 < n31; j3++) {
                    if (i23 != j3 && Math2.abs(a11[i23][j3]) > 1e-3) {
                      condition = 1;
                    }
                  }
                }
              }
              for (i23 = 0; i23 < n31; i23++)
                ev.push(a11[i23][i23]);
              return [e33, ev];
            },
            rungekutta: function rungekutta(f7, h11, p7, t_j, u_j, order) {
              var k12, k22, u_j1, k32, k42;
              if (order === 2) {
                while (t_j <= p7) {
                  k12 = h11 * f7(t_j, u_j);
                  k22 = h11 * f7(t_j + h11, u_j + k12);
                  u_j1 = u_j + (k12 + k22) / 2;
                  u_j = u_j1;
                  t_j = t_j + h11;
                }
              }
              if (order === 4) {
                while (t_j <= p7) {
                  k12 = h11 * f7(t_j, u_j);
                  k22 = h11 * f7(t_j + h11 / 2, u_j + k12 / 2);
                  k32 = h11 * f7(t_j + h11 / 2, u_j + k22 / 2);
                  k42 = h11 * f7(t_j + h11, u_j + k32);
                  u_j1 = u_j + (k12 + 2 * k22 + 2 * k32 + k42) / 6;
                  u_j = u_j1;
                  t_j = t_j + h11;
                }
              }
              return u_j;
            },
            romberg: function romberg(f7, a11, b7, order) {
              var i23 = 0;
              var h11 = (b7 - a11) / 2;
              var x6 = [];
              var h1 = [];
              var g6 = [];
              var m6, a1, j3, k8, I6;
              while (i23 < order / 2) {
                I6 = f7(a11);
                for (j3 = a11, k8 = 0; j3 <= b7; j3 = j3 + h11, k8++)
                  x6[k8] = j3;
                m6 = x6.length;
                for (j3 = 1; j3 < m6 - 1; j3++) {
                  I6 += (j3 % 2 !== 0 ? 4 : 2) * f7(x6[j3]);
                }
                I6 = h11 / 3 * (I6 + f7(b7));
                g6[i23] = I6;
                h11 /= 2;
                i23++;
              }
              a1 = g6.length;
              m6 = 1;
              while (a1 !== 1) {
                for (j3 = 0; j3 < a1 - 1; j3++)
                  h1[j3] = (Math2.pow(4, m6) * g6[j3 + 1] - g6[j3]) / (Math2.pow(4, m6) - 1);
                a1 = h1.length;
                g6 = h1;
                h1 = [];
                m6++;
              }
              return g6;
            },
            richardson: function richardson(X, f7, x6, h11) {
              function pos(X2, x7) {
                var i24 = 0;
                var n31 = X2.length;
                var p7;
                for (; i24 < n31; i24++)
                  if (X2[i24] === x7)
                    p7 = i24;
                return p7;
              }
              var h_min = Math2.abs(x6 - X[pos(X, x6) + 1]);
              var i23 = 0;
              var g6 = [];
              var h1 = [];
              var y1, y22, m6, a11, j3;
              while (h11 >= h_min) {
                y1 = pos(X, x6 + h11);
                y22 = pos(X, x6);
                g6[i23] = (f7[y1] - 2 * f7[y22] + f7[2 * y22 - y1]) / (h11 * h11);
                h11 /= 2;
                i23++;
              }
              a11 = g6.length;
              m6 = 1;
              while (a11 != 1) {
                for (j3 = 0; j3 < a11 - 1; j3++)
                  h1[j3] = (Math2.pow(4, m6) * g6[j3 + 1] - g6[j3]) / (Math2.pow(4, m6) - 1);
                a11 = h1.length;
                g6 = h1;
                h1 = [];
                m6++;
              }
              return g6;
            },
            simpson: function simpson(f7, a11, b7, n31) {
              var h11 = (b7 - a11) / n31;
              var I6 = f7(a11);
              var x6 = [];
              var j3 = a11;
              var k8 = 0;
              var i23 = 1;
              var m6;
              for (; j3 <= b7; j3 = j3 + h11, k8++)
                x6[k8] = j3;
              m6 = x6.length;
              for (; i23 < m6 - 1; i23++) {
                I6 += (i23 % 2 !== 0 ? 4 : 2) * f7(x6[i23]);
              }
              return h11 / 3 * (I6 + f7(b7));
            },
            hermite: function hermite(X, F, dF, value) {
              var n31 = X.length;
              var p7 = 0;
              var i23 = 0;
              var l20 = [];
              var dl = [];
              var A6 = [];
              var B5 = [];
              var j3;
              for (; i23 < n31; i23++) {
                l20[i23] = 1;
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 != j3)
                    l20[i23] *= (value - X[j3]) / (X[i23] - X[j3]);
                }
                dl[i23] = 0;
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 != j3)
                    dl[i23] += 1 / (X[i23] - X[j3]);
                }
                A6[i23] = (1 - 2 * (value - X[i23]) * dl[i23]) * (l20[i23] * l20[i23]);
                B5[i23] = (value - X[i23]) * (l20[i23] * l20[i23]);
                p7 += A6[i23] * F[i23] + B5[i23] * dF[i23];
              }
              return p7;
            },
            lagrange: function lagrange(X, F, value) {
              var p7 = 0;
              var i23 = 0;
              var j3, l20;
              var n31 = X.length;
              for (; i23 < n31; i23++) {
                l20 = F[i23];
                for (j3 = 0; j3 < n31; j3++) {
                  if (i23 != j3)
                    l20 *= (value - X[j3]) / (X[i23] - X[j3]);
                }
                p7 += l20;
              }
              return p7;
            },
            cubic_spline: function cubic_spline(X, F, value) {
              var n31 = X.length;
              var i23 = 0, j3;
              var A6 = [];
              var B5 = [];
              var alpha = [];
              var c12 = [];
              var h11 = [];
              var b7 = [];
              var d11 = [];
              for (; i23 < n31 - 1; i23++)
                h11[i23] = X[i23 + 1] - X[i23];
              alpha[0] = 0;
              for (i23 = 1; i23 < n31 - 1; i23++) {
                alpha[i23] = 3 / h11[i23] * (F[i23 + 1] - F[i23]) - 3 / h11[i23 - 1] * (F[i23] - F[i23 - 1]);
              }
              for (i23 = 1; i23 < n31 - 1; i23++) {
                A6[i23] = [];
                B5[i23] = [];
                A6[i23][i23 - 1] = h11[i23 - 1];
                A6[i23][i23] = 2 * (h11[i23 - 1] + h11[i23]);
                A6[i23][i23 + 1] = h11[i23];
                B5[i23][0] = alpha[i23];
              }
              c12 = jStat3.multiply(jStat3.inv(A6), B5);
              for (j3 = 0; j3 < n31 - 1; j3++) {
                b7[j3] = (F[j3 + 1] - F[j3]) / h11[j3] - h11[j3] * (c12[j3 + 1][0] + 2 * c12[j3][0]) / 3;
                d11[j3] = (c12[j3 + 1][0] - c12[j3][0]) / (3 * h11[j3]);
              }
              for (j3 = 0; j3 < n31; j3++) {
                if (X[j3] > value)
                  break;
              }
              j3 -= 1;
              return F[j3] + (value - X[j3]) * b7[j3] + jStat3.sq(value - X[j3]) * c12[j3] + (value - X[j3]) * jStat3.sq(value - X[j3]) * d11[j3];
            },
            gauss_quadrature: function gauss_quadrature() {
              throw new Error("gauss_quadrature not yet implemented");
            },
            PCA: function PCA(X) {
              var m6 = X.length;
              var n31 = X[0].length;
              var i23 = 0;
              var j3, temp1;
              var u11 = [];
              var D5 = [];
              var result = [];
              var temp2 = [];
              var Y = [];
              var Bt = [];
              var B5 = [];
              var C6 = [];
              var V6 = [];
              var Vt = [];
              for (i23 = 0; i23 < m6; i23++) {
                u11[i23] = jStat3.sum(X[i23]) / n31;
              }
              for (i23 = 0; i23 < n31; i23++) {
                B5[i23] = [];
                for (j3 = 0; j3 < m6; j3++) {
                  B5[i23][j3] = X[j3][i23] - u11[j3];
                }
              }
              B5 = jStat3.transpose(B5);
              for (i23 = 0; i23 < m6; i23++) {
                C6[i23] = [];
                for (j3 = 0; j3 < m6; j3++) {
                  C6[i23][j3] = jStat3.dot([B5[i23]], [B5[j3]]) / (n31 - 1);
                }
              }
              result = jStat3.jacobi(C6);
              V6 = result[0];
              D5 = result[1];
              Vt = jStat3.transpose(V6);
              for (i23 = 0; i23 < D5.length; i23++) {
                for (j3 = i23; j3 < D5.length; j3++) {
                  if (D5[i23] < D5[j3]) {
                    temp1 = D5[i23];
                    D5[i23] = D5[j3];
                    D5[j3] = temp1;
                    temp2 = Vt[i23];
                    Vt[i23] = Vt[j3];
                    Vt[j3] = temp2;
                  }
                }
              }
              Bt = jStat3.transpose(B5);
              for (i23 = 0; i23 < m6; i23++) {
                Y[i23] = [];
                for (j3 = 0; j3 < Bt.length; j3++) {
                  Y[i23][j3] = jStat3.dot([Vt[i23]], [Bt[j3]]);
                }
              }
              return [X, D5, Vt, Y];
            }
          });
          (function(funcs) {
            for (var i23 = 0; i23 < funcs.length; i23++)
              (function(passfunc) {
                jStat3.fn[passfunc] = function(arg, func) {
                  var tmpthis = this;
                  if (func) {
                    setTimeout(function() {
                      func.call(tmpthis, jStat3.fn[passfunc].call(tmpthis, arg));
                    }, 15);
                    return this;
                  }
                  if (typeof jStat3[passfunc](this, arg) === "number")
                    return jStat3[passfunc](this, arg);
                  else
                    return jStat3(jStat3[passfunc](this, arg));
                };
              })(funcs[i23]);
          })("add divide multiply subtract dot pow exp log abs norm angle".split(" "));
        })(jStat2, Math);
        (function(jStat3, Math2) {
          var slice = [].slice;
          var isNumber = jStat3.utils.isNumber;
          var isArray = jStat3.utils.isArray;
          jStat3.extend({
            // 2 different parameter lists:
            // (value, mean, sd)
            // (value, array, flag)
            zscore: function zscore() {
              var args = slice.call(arguments);
              if (isNumber(args[1])) {
                return (args[0] - args[1]) / args[2];
              }
              return (args[0] - jStat3.mean(args[1])) / jStat3.stdev(args[1], args[2]);
            },
            // 3 different paramter lists:
            // (value, mean, sd, sides)
            // (zscore, sides)
            // (value, array, sides, flag)
            ztest: function ztest() {
              var args = slice.call(arguments);
              var z5;
              if (isArray(args[1])) {
                z5 = jStat3.zscore(args[0], args[1], args[3]);
                return args[2] === 1 ? jStat3.normal.cdf(-Math2.abs(z5), 0, 1) : jStat3.normal.cdf(-Math2.abs(z5), 0, 1) * 2;
              } else {
                if (args.length > 2) {
                  z5 = jStat3.zscore(args[0], args[1], args[2]);
                  return args[3] === 1 ? jStat3.normal.cdf(-Math2.abs(z5), 0, 1) : jStat3.normal.cdf(-Math2.abs(z5), 0, 1) * 2;
                } else {
                  z5 = args[0];
                  return args[1] === 1 ? jStat3.normal.cdf(-Math2.abs(z5), 0, 1) : jStat3.normal.cdf(-Math2.abs(z5), 0, 1) * 2;
                }
              }
            }
          });
          jStat3.extend(jStat3.fn, {
            zscore: function zscore(value, flag) {
              return (value - this.mean()) / this.stdev(flag);
            },
            ztest: function ztest(value, sides, flag) {
              var zscore = Math2.abs(this.zscore(value, flag));
              return sides === 1 ? jStat3.normal.cdf(-zscore, 0, 1) : jStat3.normal.cdf(-zscore, 0, 1) * 2;
            }
          });
          jStat3.extend({
            // 2 parameter lists
            // (value, mean, sd, n)
            // (value, array)
            tscore: function tscore() {
              var args = slice.call(arguments);
              return args.length === 4 ? (args[0] - args[1]) / (args[2] / Math2.sqrt(args[3])) : (args[0] - jStat3.mean(args[1])) / (jStat3.stdev(args[1], true) / Math2.sqrt(args[1].length));
            },
            // 3 different paramter lists:
            // (value, mean, sd, n, sides)
            // (tscore, n, sides)
            // (value, array, sides)
            ttest: function ttest() {
              var args = slice.call(arguments);
              var tscore;
              if (args.length === 5) {
                tscore = Math2.abs(jStat3.tscore(args[0], args[1], args[2], args[3]));
                return args[4] === 1 ? jStat3.studentt.cdf(-tscore, args[3] - 1) : jStat3.studentt.cdf(-tscore, args[3] - 1) * 2;
              }
              if (isNumber(args[1])) {
                tscore = Math2.abs(args[0]);
                return args[2] == 1 ? jStat3.studentt.cdf(-tscore, args[1] - 1) : jStat3.studentt.cdf(-tscore, args[1] - 1) * 2;
              }
              tscore = Math2.abs(jStat3.tscore(args[0], args[1]));
              return args[2] == 1 ? jStat3.studentt.cdf(-tscore, args[1].length - 1) : jStat3.studentt.cdf(-tscore, args[1].length - 1) * 2;
            }
          });
          jStat3.extend(jStat3.fn, {
            tscore: function tscore(value) {
              return (value - this.mean()) / (this.stdev(true) / Math2.sqrt(this.cols()));
            },
            ttest: function ttest(value, sides) {
              return sides === 1 ? 1 - jStat3.studentt.cdf(Math2.abs(this.tscore(value)), this.cols() - 1) : jStat3.studentt.cdf(-Math2.abs(this.tscore(value)), this.cols() - 1) * 2;
            }
          });
          jStat3.extend({
            // Paramter list is as follows:
            // (array1, array2, array3, ...)
            // or it is an array of arrays
            // array of arrays conversion
            anovafscore: function anovafscore() {
              var args = slice.call(arguments), expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i23, j3;
              if (args.length === 1) {
                tmpargs = new Array(args[0].length);
                for (i23 = 0; i23 < args[0].length; i23++) {
                  tmpargs[i23] = args[0][i23];
                }
                args = tmpargs;
              }
              sample = new Array();
              for (i23 = 0; i23 < args.length; i23++) {
                sample = sample.concat(args[i23]);
              }
              sampMean = jStat3.mean(sample);
              expVar = 0;
              for (i23 = 0; i23 < args.length; i23++) {
                expVar = expVar + args[i23].length * Math2.pow(jStat3.mean(args[i23]) - sampMean, 2);
              }
              expVar /= args.length - 1;
              unexpVar = 0;
              for (i23 = 0; i23 < args.length; i23++) {
                sampSampMean = jStat3.mean(args[i23]);
                for (j3 = 0; j3 < args[i23].length; j3++) {
                  unexpVar += Math2.pow(args[i23][j3] - sampSampMean, 2);
                }
              }
              unexpVar /= sample.length - args.length;
              return expVar / unexpVar;
            },
            // 2 different paramter setups
            // (array1, array2, array3, ...)
            // (anovafscore, df1, df2)
            anovaftest: function anovaftest() {
              var args = slice.call(arguments), df1, df2, n31, i23;
              if (isNumber(args[0])) {
                return 1 - jStat3.centralF.cdf(args[0], args[1], args[2]);
              }
              var anovafscore = jStat3.anovafscore(args);
              df1 = args.length - 1;
              n31 = 0;
              for (i23 = 0; i23 < args.length; i23++) {
                n31 = n31 + args[i23].length;
              }
              df2 = n31 - df1 - 1;
              return 1 - jStat3.centralF.cdf(anovafscore, df1, df2);
            },
            ftest: function ftest(fscore, df1, df2) {
              return 1 - jStat3.centralF.cdf(fscore, df1, df2);
            }
          });
          jStat3.extend(jStat3.fn, {
            anovafscore: function anovafscore() {
              return jStat3.anovafscore(this.toArray());
            },
            anovaftes: function anovaftes() {
              var n31 = 0;
              var i23;
              for (i23 = 0; i23 < this.length; i23++) {
                n31 = n31 + this[i23].length;
              }
              return jStat3.ftest(this.anovafscore(), this.length - 1, n31 - this.length);
            }
          });
          jStat3.extend({
            // 2 parameter lists
            // (mean1, mean2, n1, n2, sd)
            // (array1, array2, sd)
            qscore: function qscore() {
              var args = slice.call(arguments);
              var mean1, mean2, n1, n210, sd;
              if (isNumber(args[0])) {
                mean1 = args[0];
                mean2 = args[1];
                n1 = args[2];
                n210 = args[3];
                sd = args[4];
              } else {
                mean1 = jStat3.mean(args[0]);
                mean2 = jStat3.mean(args[1]);
                n1 = args[0].length;
                n210 = args[1].length;
                sd = args[2];
              }
              return Math2.abs(mean1 - mean2) / (sd * Math2.sqrt((1 / n1 + 1 / n210) / 2));
            },
            // 3 different parameter lists:
            // (qscore, n, k)
            // (mean1, mean2, n1, n2, sd, n, k)
            // (array1, array2, sd, n, k)
            qtest: function qtest() {
              var args = slice.call(arguments);
              var qscore;
              if (args.length === 3) {
                qscore = args[0];
                args = args.slice(1);
              } else if (args.length === 7) {
                qscore = jStat3.qscore(args[0], args[1], args[2], args[3], args[4]);
                args = args.slice(5);
              } else {
                qscore = jStat3.qscore(args[0], args[1], args[2]);
                args = args.slice(3);
              }
              var n31 = args[0];
              var k8 = args[1];
              return 1 - jStat3.tukey.cdf(qscore, k8, n31 - k8);
            },
            tukeyhsd: function tukeyhsd(arrays) {
              var sd = jStat3.pooledstdev(arrays);
              var means = arrays.map(function(arr) {
                return jStat3.mean(arr);
              });
              var n31 = arrays.reduce(function(n32, arr) {
                return n32 + arr.length;
              }, 0);
              var results = [];
              for (var i23 = 0; i23 < arrays.length; ++i23) {
                for (var j3 = i23 + 1; j3 < arrays.length; ++j3) {
                  var p7 = jStat3.qtest(means[i23], means[j3], arrays[i23].length, arrays[j3].length, sd, n31, arrays.length);
                  results.push([[i23, j3], p7]);
                }
              }
              return results;
            }
          });
          jStat3.extend({
            // 2 different parameter setups
            // (value, alpha, sd, n)
            // (value, alpha, array)
            normalci: function normalci() {
              var args = slice.call(arguments), ans = new Array(2), change2;
              if (args.length === 4) {
                change2 = Math2.abs(jStat3.normal.inv(args[1] / 2, 0, 1) * args[2] / Math2.sqrt(args[3]));
              } else {
                change2 = Math2.abs(jStat3.normal.inv(args[1] / 2, 0, 1) * jStat3.stdev(args[2]) / Math2.sqrt(args[2].length));
              }
              ans[0] = args[0] - change2;
              ans[1] = args[0] + change2;
              return ans;
            },
            // 2 different parameter setups
            // (value, alpha, sd, n)
            // (value, alpha, array)
            tci: function tci() {
              var args = slice.call(arguments), ans = new Array(2), change2;
              if (args.length === 4) {
                change2 = Math2.abs(jStat3.studentt.inv(args[1] / 2, args[3] - 1) * args[2] / Math2.sqrt(args[3]));
              } else {
                change2 = Math2.abs(jStat3.studentt.inv(args[1] / 2, args[2].length - 1) * jStat3.stdev(args[2], true) / Math2.sqrt(args[2].length));
              }
              ans[0] = args[0] - change2;
              ans[1] = args[0] + change2;
              return ans;
            },
            significant: function significant(pvalue, alpha) {
              return pvalue < alpha;
            }
          });
          jStat3.extend(jStat3.fn, {
            normalci: function normalci(value, alpha) {
              return jStat3.normalci(value, alpha, this.toArray());
            },
            tci: function tci(value, alpha) {
              return jStat3.tci(value, alpha, this.toArray());
            }
          });
          function differenceOfProportions(p1, n1, p22, n210) {
            if (p1 > 1 || p22 > 1 || p1 <= 0 || p22 <= 0) {
              throw new Error("Proportions should be greater than 0 and less than 1");
            }
            var pooled = (p1 * n1 + p22 * n210) / (n1 + n210);
            var se = Math2.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n210));
            return (p1 - p22) / se;
          }
          jStat3.extend(jStat3.fn, {
            oneSidedDifferenceOfProportions: function oneSidedDifferenceOfProportions(p1, n1, p22, n210) {
              var z5 = differenceOfProportions(p1, n1, p22, n210);
              return jStat3.ztest(z5, 1);
            },
            twoSidedDifferenceOfProportions: function twoSidedDifferenceOfProportions(p1, n1, p22, n210) {
              var z5 = differenceOfProportions(p1, n1, p22, n210);
              return jStat3.ztest(z5, 2);
            }
          });
        })(jStat2, Math);
        jStat2.models = /* @__PURE__ */ function() {
          function sub_regress(exog) {
            var var_count = exog[0].length;
            var modelList = jStat2.arange(var_count).map(function(endog_index) {
              var exog_index = jStat2.arange(var_count).filter(function(i23) {
                return i23 !== endog_index;
              });
              return ols(
                jStat2.col(exog, endog_index).map(function(x6) {
                  return x6[0];
                }),
                jStat2.col(exog, exog_index)
              );
            });
            return modelList;
          }
          function ols(endog, exog) {
            var nobs = endog.length;
            var df_model = exog[0].length - 1;
            var df_resid = nobs - df_model - 1;
            var coef = jStat2.lstsq(exog, endog);
            var predict = jStat2.multiply(exog, coef.map(function(x6) {
              return [x6];
            })).map(function(p7) {
              return p7[0];
            });
            var resid = jStat2.subtract(endog, predict);
            var ybar = jStat2.mean(endog);
            var SSE = jStat2.sum(predict.map(function(f7) {
              return Math.pow(f7 - ybar, 2);
            }));
            var SSR = jStat2.sum(endog.map(function(y7, i23) {
              return Math.pow(y7 - predict[i23], 2);
            }));
            var SST = SSE + SSR;
            var R22 = SSE / SST;
            return {
              exog,
              endog,
              nobs,
              df_model,
              df_resid,
              coef,
              predict,
              resid,
              ybar,
              SST,
              SSE,
              SSR,
              R2: R22
            };
          }
          function t_test(model) {
            var subModelList = sub_regress(model.exog);
            var sigmaHat = Math.sqrt(model.SSR / model.df_resid);
            var seBetaHat = subModelList.map(function(mod) {
              var SST = mod.SST;
              var R22 = mod.R2;
              return sigmaHat / Math.sqrt(SST * (1 - R22));
            });
            var tStatistic = model.coef.map(function(coef, i23) {
              return (coef - 0) / seBetaHat[i23];
            });
            var pValue = tStatistic.map(function(t17) {
              var leftppf = jStat2.studentt.cdf(t17, model.df_resid);
              return (leftppf > 0.5 ? 1 - leftppf : leftppf) * 2;
            });
            var c12 = jStat2.studentt.inv(0.975, model.df_resid);
            var interval95 = model.coef.map(function(coef, i23) {
              var d11 = c12 * seBetaHat[i23];
              return [coef - d11, coef + d11];
            });
            return {
              se: seBetaHat,
              t: tStatistic,
              p: pValue,
              sigmaHat,
              interval95
            };
          }
          function F_test(model) {
            var F_statistic = model.R2 / model.df_model / ((1 - model.R2) / model.df_resid);
            var fcdf = function(x6, n1, n210) {
              return jStat2.beta.cdf(x6 / (n210 / n1 + x6), n1 / 2, n210 / 2);
            };
            var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid);
            return { F_statistic, pvalue };
          }
          function ols_wrap(endog, exog) {
            var model = ols(endog, exog);
            var ttest = t_test(model);
            var ftest = F_test(model);
            var adjust_R2 = 1 - (1 - model.R2) * ((model.nobs - 1) / model.df_resid);
            model.t = ttest;
            model.f = ftest;
            model.adjust_R2 = adjust_R2;
            return model;
          }
          return { ols: ols_wrap };
        }();
        jStat2.extend({
          buildxmatrix: function buildxmatrix() {
            var matrixRows = new Array(arguments.length);
            for (var i23 = 0; i23 < arguments.length; i23++) {
              var array2 = [1];
              matrixRows[i23] = array2.concat(arguments[i23]);
            }
            return jStat2(matrixRows);
          },
          builddxmatrix: function builddxmatrix() {
            var matrixRows = new Array(arguments[0].length);
            for (var i23 = 0; i23 < arguments[0].length; i23++) {
              var array2 = [1];
              matrixRows[i23] = array2.concat(arguments[0][i23]);
            }
            return jStat2(matrixRows);
          },
          buildjxmatrix: function buildjxmatrix(jMat) {
            var pass = new Array(jMat.length);
            for (var i23 = 0; i23 < jMat.length; i23++) {
              pass[i23] = jMat[i23];
            }
            return jStat2.builddxmatrix(pass);
          },
          buildymatrix: function buildymatrix(array2) {
            return jStat2(array2).transpose();
          },
          buildjymatrix: function buildjymatrix(jMat) {
            return jMat.transpose();
          },
          matrixmult: function matrixmult(A6, B5) {
            var i23, j3, k8, result, sum;
            if (A6.cols() == B5.rows()) {
              if (B5.rows() > 1) {
                result = [];
                for (i23 = 0; i23 < A6.rows(); i23++) {
                  result[i23] = [];
                  for (j3 = 0; j3 < B5.cols(); j3++) {
                    sum = 0;
                    for (k8 = 0; k8 < A6.cols(); k8++) {
                      sum += A6.toArray()[i23][k8] * B5.toArray()[k8][j3];
                    }
                    result[i23][j3] = sum;
                  }
                }
                return jStat2(result);
              }
              result = [];
              for (i23 = 0; i23 < A6.rows(); i23++) {
                result[i23] = [];
                for (j3 = 0; j3 < B5.cols(); j3++) {
                  sum = 0;
                  for (k8 = 0; k8 < A6.cols(); k8++) {
                    sum += A6.toArray()[i23][k8] * B5.toArray()[j3];
                  }
                  result[i23][j3] = sum;
                }
              }
              return jStat2(result);
            }
          },
          //regress and regresst to be fixed
          regress: function regress(jMatX, jMatY) {
            var innerinv = jStat2.xtranspxinv(jMatX);
            var xtransp = jMatX.transpose();
            var next = jStat2.matrixmult(jStat2(innerinv), xtransp);
            return jStat2.matrixmult(next, jMatY);
          },
          regresst: function regresst(jMatX, jMatY, sides) {
            var beta = jStat2.regress(jMatX, jMatY);
            var compile = {};
            compile.anova = {};
            var jMatYBar = jStat2.jMatYBar(jMatX, beta);
            compile.yBar = jMatYBar;
            var yAverage = jMatY.mean();
            compile.anova.residuals = jStat2.residuals(jMatY, jMatYBar);
            compile.anova.ssr = jStat2.ssr(jMatYBar, yAverage);
            compile.anova.msr = compile.anova.ssr / (jMatX[0].length - 1);
            compile.anova.sse = jStat2.sse(jMatY, jMatYBar);
            compile.anova.mse = compile.anova.sse / (jMatY.length - (jMatX[0].length - 1) - 1);
            compile.anova.sst = jStat2.sst(jMatY, yAverage);
            compile.anova.mst = compile.anova.sst / (jMatY.length - 1);
            compile.anova.r2 = 1 - compile.anova.sse / compile.anova.sst;
            if (compile.anova.r2 < 0)
              compile.anova.r2 = 0;
            compile.anova.fratio = compile.anova.msr / compile.anova.mse;
            compile.anova.pvalue = jStat2.anovaftest(
              compile.anova.fratio,
              jMatX[0].length - 1,
              jMatY.length - (jMatX[0].length - 1) - 1
            );
            compile.anova.rmse = Math.sqrt(compile.anova.mse);
            compile.anova.r2adj = 1 - compile.anova.mse / compile.anova.mst;
            if (compile.anova.r2adj < 0)
              compile.anova.r2adj = 0;
            compile.stats = new Array(jMatX[0].length);
            var covar = jStat2.xtranspxinv(jMatX);
            var sds, ts, ps;
            for (var i23 = 0; i23 < beta.length; i23++) {
              sds = Math.sqrt(compile.anova.mse * Math.abs(covar[i23][i23]));
              ts = Math.abs(beta[i23] / sds);
              ps = jStat2.ttest(ts, jMatY.length - jMatX[0].length - 1, sides);
              compile.stats[i23] = [beta[i23], sds, ts, ps];
            }
            compile.regress = beta;
            return compile;
          },
          xtranspx: function xtranspx(jMatX) {
            return jStat2.matrixmult(jMatX.transpose(), jMatX);
          },
          xtranspxinv: function xtranspxinv(jMatX) {
            var inner = jStat2.matrixmult(jMatX.transpose(), jMatX);
            var innerinv = jStat2.inv(inner);
            return innerinv;
          },
          jMatYBar: function jMatYBar(jMatX, beta) {
            var yBar = jStat2.matrixmult(jMatX, beta);
            return new jStat2(yBar);
          },
          residuals: function residuals(jMatY, jMatYBar) {
            return jStat2.matrixsubtract(jMatY, jMatYBar);
          },
          ssr: function ssr(jMatYBar, yAverage) {
            var ssr2 = 0;
            for (var i23 = 0; i23 < jMatYBar.length; i23++) {
              ssr2 += Math.pow(jMatYBar[i23] - yAverage, 2);
            }
            return ssr2;
          },
          sse: function sse(jMatY, jMatYBar) {
            var sse2 = 0;
            for (var i23 = 0; i23 < jMatY.length; i23++) {
              sse2 += Math.pow(jMatY[i23] - jMatYBar[i23], 2);
            }
            return sse2;
          },
          sst: function sst(jMatY, yAverage) {
            var sst2 = 0;
            for (var i23 = 0; i23 < jMatY.length; i23++) {
              sst2 += Math.pow(jMatY[i23] - yAverage, 2);
            }
            return sst2;
          },
          matrixsubtract: function matrixsubtract(A6, B5) {
            var ans = new Array(A6.length);
            for (var i23 = 0; i23 < A6.length; i23++) {
              ans[i23] = new Array(A6[i23].length);
              for (var j3 = 0; j3 < A6[i23].length; j3++) {
                ans[i23][j3] = A6[i23][j3] - B5[i23][j3];
              }
            }
            return jStat2(ans);
          }
        });
        jStat2.jStat = jStat2;
        return jStat2;
      });
    }
  });

  // node_modules/@adobe/lit-mobx/lib/mixin-custom.js
  var reaction = Symbol("LitMobxRenderReaction");
  var cachedRequestUpdate = Symbol("LitMobxRequestUpdate");
  function MobxReactionUpdateCustom(constructor, ReactionConstructor) {
    var _a2, _b2;
    return _b2 = class MobxReactingElement extends constructor {
      constructor() {
        super(...arguments);
        this[_a2] = () => {
          this.requestUpdate();
        };
      }
      connectedCallback() {
        super.connectedCallback();
        const name = this.constructor.name || this.nodeName;
        this[reaction] = new ReactionConstructor(`${name}.update()`, this[cachedRequestUpdate]);
        if (this.hasUpdated)
          this.requestUpdate();
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        if (this[reaction]) {
          this[reaction].dispose();
          this[reaction] = void 0;
        }
      }
      update(changedProperties) {
        if (this[reaction]) {
          this[reaction].track(super.update.bind(this, changedProperties));
        } else {
          super.update(changedProperties);
        }
      }
    }, _a2 = cachedRequestUpdate, _b2;
  }

  // node_modules/mobx/dist/mobx.esm.js
  var niceErrors = {
    0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
    1: function _(annotationType, key) {
      return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
    },
    /*
    2(prop) {
        return `invalid decorator for '${prop.toString()}'`
    },
    3(prop) {
        return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
    },
    4(prop) {
        return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
    },
    */
    5: "'keys()' can only be used on observable objects, arrays, sets and maps",
    6: "'values()' can only be used on observable objects, arrays, sets and maps",
    7: "'entries()' can only be used on observable objects, arrays and maps",
    8: "'set()' can only be used on observable objects, arrays and maps",
    9: "'remove()' can only be used on observable objects, arrays and maps",
    10: "'has()' can only be used on observable objects, arrays and maps",
    11: "'get()' can only be used on observable objects, arrays and maps",
    12: "Invalid annotation",
    13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
    14: "Intercept handlers should return nothing or a change object",
    15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
    16: "Modification exception: the internal structure of an observable array was changed.",
    17: function _2(index, length) {
      return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
    },
    18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
    19: function _3(other) {
      return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
    },
    20: function _4(other) {
      return "Cannot initialize map from " + other;
    },
    21: function _5(dataStructure) {
      return "Cannot convert to map from '" + dataStructure + "'";
    },
    22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
    23: "It is not possible to get index atoms from arrays",
    24: function _6(thing) {
      return "Cannot obtain administration from " + thing;
    },
    25: function _7(property, name) {
      return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
    },
    26: "please specify a property",
    27: function _8(property, name) {
      return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
    },
    28: function _9(thing) {
      return "Cannot obtain atom from " + thing;
    },
    29: "Expecting some object",
    30: "invalid action stack. did you forget to finish an action?",
    31: "missing option for computed: get",
    32: function _10(name, derivation) {
      return "Cycle detected in computation " + name + ": " + derivation;
    },
    33: function _11(name) {
      return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
    },
    34: function _12(name) {
      return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
    },
    35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
    36: "isolateGlobalState should be called before MobX is running any reactions",
    37: function _13(method) {
      return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
    },
    38: "'ownKeys()' can only be used on observable objects",
    39: "'defineProperty()' can only be used on observable objects"
  };
  var errors = true ? niceErrors : {};
  function die(error) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (true) {
      var e33 = typeof error === "string" ? error : errors[error];
      if (typeof e33 === "function")
        e33 = e33.apply(null, args);
      throw new Error("[MobX] " + e33);
    }
    throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
  }
  var mockGlobal = {};
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    return mockGlobal;
  }
  var assign = Object.assign;
  var getDescriptor = Object.getOwnPropertyDescriptor;
  var defineProperty = Object.defineProperty;
  var objectPrototype = Object.prototype;
  var EMPTY_ARRAY = [];
  Object.freeze(EMPTY_ARRAY);
  var EMPTY_OBJECT = {};
  Object.freeze(EMPTY_OBJECT);
  var hasProxy = typeof Proxy !== "undefined";
  var plainObjectString = /* @__PURE__ */ Object.toString();
  function assertProxies() {
    if (!hasProxy) {
      die(true ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
    }
  }
  function warnAboutProxyRequirement(msg) {
    if (globalState.verifyProxies) {
      die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
    }
  }
  function getNextId() {
    return ++globalState.mobxGuid;
  }
  function once(func) {
    var invoked = false;
    return function() {
      if (invoked) {
        return;
      }
      invoked = true;
      return func.apply(this, arguments);
    };
  }
  var noop = function noop2() {
  };
  function isFunction(fn2) {
    return typeof fn2 === "function";
  }
  function isStringish(value) {
    var t17 = typeof value;
    switch (t17) {
      case "string":
      case "symbol":
      case "number":
        return true;
    }
    return false;
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto == null) {
      return true;
    }
    var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
  }
  function isGenerator(obj) {
    var constructor = obj == null ? void 0 : obj.constructor;
    if (!constructor) {
      return false;
    }
    if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
      return true;
    }
    return false;
  }
  function addHiddenProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: true,
      configurable: true,
      value
    });
  }
  function addHiddenFinalProp(object2, propName, value) {
    defineProperty(object2, propName, {
      enumerable: false,
      writable: false,
      configurable: true,
      value
    });
  }
  function createInstanceofPredicate(name, theClass) {
    var propName = "isMobX" + name;
    theClass.prototype[propName] = true;
    return function(x6) {
      return isObject(x6) && x6[propName] === true;
    };
  }
  function isES6Map(thing) {
    return thing instanceof Map;
  }
  function isES6Set(thing) {
    return thing instanceof Set;
  }
  var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
  function getPlainObjectKeys(object2) {
    var keys = Object.keys(object2);
    if (!hasGetOwnPropertySymbols) {
      return keys;
    }
    var symbols = Object.getOwnPropertySymbols(object2);
    if (!symbols.length) {
      return keys;
    }
    return [].concat(keys, symbols.filter(function(s20) {
      return objectPrototype.propertyIsEnumerable.call(object2, s20);
    }));
  }
  var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
    return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  } : (
    /* istanbul ignore next */
    Object.getOwnPropertyNames
  );
  function stringifyKey(key) {
    if (typeof key === "string") {
      return key;
    }
    if (typeof key === "symbol") {
      return key.toString();
    }
    return new String(key).toString();
  }
  function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
  }
  function hasProp(target, prop) {
    return objectPrototype.hasOwnProperty.call(target, prop);
  }
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target) {
    var res = {};
    ownKeys(target).forEach(function(key) {
      res[key] = getDescriptor(target, key);
    });
    return res;
  };
  function _defineProperties(target, props) {
    for (var i23 = 0; i23 < props.length; i23++) {
      var descriptor = props[i23];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i23 = 1; i23 < arguments.length; i23++) {
        var source = arguments[i23];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o29, p7) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o30, p8) {
      o30.__proto__ = p8;
      return o30;
    };
    return _setPrototypeOf(o29, p7);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _unsupportedIterableToArray(o29, minLen) {
    if (!o29)
      return;
    if (typeof o29 === "string")
      return _arrayLikeToArray(o29, minLen);
    var n31 = Object.prototype.toString.call(o29).slice(8, -1);
    if (n31 === "Object" && o29.constructor)
      n31 = o29.constructor.name;
    if (n31 === "Map" || n31 === "Set")
      return Array.from(o29);
    if (n31 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n31))
      return _arrayLikeToArray(o29, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i23 = 0, arr2 = new Array(len); i23 < len; i23++)
      arr2[i23] = arr[i23];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o29, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o29[Symbol.iterator] || o29["@@iterator"];
    if (it)
      return (it = it.call(o29)).next.bind(it);
    if (Array.isArray(o29) || (it = _unsupportedIterableToArray(o29)) || allowArrayLike && o29 && typeof o29.length === "number") {
      if (it)
        o29 = it;
      var i23 = 0;
      return function() {
        if (i23 >= o29.length)
          return {
            done: true
          };
        return {
          done: false,
          value: o29[i23++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  var storedAnnotationsSymbol = /* @__PURE__ */ Symbol("mobx-stored-annotations");
  function createDecoratorAnnotation(annotation) {
    function decorator(target, property) {
      if (is20223Decorator(property)) {
        return annotation.decorate_20223_(target, property);
      } else {
        storeAnnotation(target, property, annotation);
      }
    }
    return Object.assign(decorator, annotation);
  }
  function storeAnnotation(prototype, key, annotation) {
    if (!hasProp(prototype, storedAnnotationsSymbol)) {
      addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
    }
    if (isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      die("'" + fieldName + "' is decorated with 'override', but no such decorated member was found on prototype.");
    }
    assertNotDecorated(prototype, annotation, key);
    if (!isOverride(annotation)) {
      prototype[storedAnnotationsSymbol][key] = annotation;
    }
  }
  function assertNotDecorated(prototype, annotation, key) {
    if (!isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed.\nUse '@override' decorator for methods overridden by subclass.");
    }
  }
  function collectStoredAnnotations(target) {
    if (!hasProp(target, storedAnnotationsSymbol)) {
      addHiddenProp(target, storedAnnotationsSymbol, _extends({}, target[storedAnnotationsSymbol]));
    }
    return target[storedAnnotationsSymbol];
  }
  function is20223Decorator(context) {
    return typeof context == "object" && typeof context["kind"] == "string";
  }
  function assert20223DecoratorType(context, types) {
    if (!types.includes(context.kind)) {
      die("The decorator applied to '" + String(context.name) + "' cannot be used on a " + context.kind + " element");
    }
  }
  var $mobx = /* @__PURE__ */ Symbol("mobx administration");
  var Atom = /* @__PURE__ */ function() {
    function Atom2(name_) {
      if (name_ === void 0) {
        name_ = true ? "Atom@" + getNextId() : "Atom";
      }
      this.name_ = void 0;
      this.isPendingUnobservation_ = false;
      this.isBeingObserved_ = false;
      this.observers_ = /* @__PURE__ */ new Set();
      this.diffValue_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      this.name_ = name_;
    }
    var _proto = Atom2.prototype;
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.reportObserved = function reportObserved$1() {
      return reportObserved(this);
    };
    _proto.reportChanged = function reportChanged() {
      startBatch();
      propagateChanged(this);
      endBatch();
    };
    _proto.toString = function toString2() {
      return this.name_;
    };
    return Atom2;
  }();
  var isAtom = /* @__PURE__ */ createInstanceofPredicate("Atom", Atom);
  function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
      onBecomeObservedHandler = noop;
    }
    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop;
    }
    var atom = new Atom(name);
    if (onBecomeObservedHandler !== noop) {
      onBecomeObserved(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop) {
      onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }
    return atom;
  }
  function identityComparer(a11, b7) {
    return a11 === b7;
  }
  function structuralComparer(a11, b7) {
    return deepEqual(a11, b7);
  }
  function shallowComparer(a11, b7) {
    return deepEqual(a11, b7, 1);
  }
  function defaultComparer(a11, b7) {
    if (Object.is) {
      return Object.is(a11, b7);
    }
    return a11 === b7 ? a11 !== 0 || 1 / a11 === 1 / b7 : a11 !== a11 && b7 !== b7;
  }
  var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    "default": defaultComparer,
    shallow: shallowComparer
  };
  function deepEnhancer(v6, _19, name) {
    if (isObservable(v6)) {
      return v6;
    }
    if (Array.isArray(v6)) {
      return observable.array(v6, {
        name
      });
    }
    if (isPlainObject(v6)) {
      return observable.object(v6, void 0, {
        name
      });
    }
    if (isES6Map(v6)) {
      return observable.map(v6, {
        name
      });
    }
    if (isES6Set(v6)) {
      return observable.set(v6, {
        name
      });
    }
    if (typeof v6 === "function" && !isAction(v6) && !isFlow(v6)) {
      if (isGenerator(v6)) {
        return flow(v6);
      } else {
        return autoAction(name, v6);
      }
    }
    return v6;
  }
  function shallowEnhancer(v6, _19, name) {
    if (v6 === void 0 || v6 === null) {
      return v6;
    }
    if (isObservableObject(v6) || isObservableArray(v6) || isObservableMap(v6) || isObservableSet(v6)) {
      return v6;
    }
    if (Array.isArray(v6)) {
      return observable.array(v6, {
        name,
        deep: false
      });
    }
    if (isPlainObject(v6)) {
      return observable.object(v6, void 0, {
        name,
        deep: false
      });
    }
    if (isES6Map(v6)) {
      return observable.map(v6, {
        name,
        deep: false
      });
    }
    if (isES6Set(v6)) {
      return observable.set(v6, {
        name,
        deep: false
      });
    }
    if (true) {
      die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
    }
  }
  function referenceEnhancer(newValue) {
    return newValue;
  }
  function refStructEnhancer(v6, oldValue) {
    if (isObservable(v6)) {
      die("observable.struct should not be used with observable values");
    }
    if (deepEqual(v6, oldValue)) {
      return oldValue;
    }
    return v6;
  }
  var OVERRIDE = "override";
  function isOverride(annotation) {
    return annotation.annotationType_ === OVERRIDE;
  }
  function createActionAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$1,
      extend_: extend_$1,
      decorate_20223_: decorate_20223_$1
    };
  }
  function make_$1(adm, key, descriptor, source) {
    var _this$options_;
    if ((_this$options_ = this.options_) != null && _this$options_.bound) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
    }
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if (isAction(descriptor.value)) {
      return 1;
    }
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
    defineProperty(source, key, actionDescriptor);
    return 2;
  }
  function extend_$1(adm, key, descriptor, proxyTrap) {
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
    return adm.defineProperty_(key, actionDescriptor, proxyTrap);
  }
  function decorate_20223_$1(mthd, context) {
    if (true) {
      assert20223DecoratorType(context, ["method", "field"]);
    }
    var kind = context.kind, name = context.name, addInitializer = context.addInitializer;
    var ann = this;
    var _createAction = function _createAction2(m6) {
      var _ann$options_$name, _ann$options_, _ann$options_$autoAct, _ann$options_2;
      return createAction((_ann$options_$name = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.name) != null ? _ann$options_$name : name.toString(), m6, (_ann$options_$autoAct = (_ann$options_2 = ann.options_) == null ? void 0 : _ann$options_2.autoAction) != null ? _ann$options_$autoAct : false);
    };
    if (kind == "field") {
      addInitializer(function() {
        storeAnnotation(this, name, ann);
      });
      return;
    }
    if (kind == "method") {
      var _this$options_2;
      if (!isAction(mthd)) {
        mthd = _createAction(mthd);
      }
      if ((_this$options_2 = this.options_) != null && _this$options_2.bound) {
        addInitializer(function() {
          var self2 = this;
          var bound = self2[name].bind(self2);
          bound.isMobxAction = true;
          self2[name] = bound;
        });
      }
      return mthd;
    }
    die("Cannot apply '" + ann.annotationType_ + "' to '" + String(name) + "' (kind: " + kind + "):" + ("\n'" + ann.annotationType_ + "' can only be used on properties with a function value."));
  }
  function assertActionDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;
    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
    }
  }
  function createActionDescriptor(adm, annotation, key, descriptor, safeDescriptors) {
    var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertActionDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return {
      value: createAction(
        (_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(),
        value,
        (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false,
        // https://github.com/mobxjs/mobx/discussions/3140
        (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : void 0
      ),
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }
  function createFlowAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$2,
      extend_: extend_$2,
      decorate_20223_: decorate_20223_$2
    };
  }
  function make_$2(adm, key, descriptor, source) {
    var _this$options_;
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
    }
    if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
      if (this.extend_(adm, key, descriptor, false) === null) {
        return 0;
      }
    }
    if (isFlow(descriptor.value)) {
      return 1;
    }
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
    defineProperty(source, key, flowDescriptor);
    return 2;
  }
  function extend_$2(adm, key, descriptor, proxyTrap) {
    var _this$options_2;
    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
    return adm.defineProperty_(key, flowDescriptor, proxyTrap);
  }
  function decorate_20223_$2(mthd, context) {
    var _this$options_3;
    if (true) {
      assert20223DecoratorType(context, ["method"]);
    }
    var name = context.name, addInitializer = context.addInitializer;
    if (!isFlow(mthd)) {
      mthd = flow(mthd);
    }
    if ((_this$options_3 = this.options_) != null && _this$options_3.bound) {
      addInitializer(function() {
        var self2 = this;
        var bound = self2[name].bind(self2);
        bound.isMobXFlow = true;
        self2[name] = bound;
      });
    }
    return mthd;
  }
  function assertFlowDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;
    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
    }
  }
  function createFlowDescriptor(adm, annotation, key, descriptor, bound, safeDescriptors) {
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }
    assertFlowDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;
    if (!isFlow(value)) {
      value = flow(value);
    }
    if (bound) {
      var _adm$proxy_;
      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
      value.isMobXFlow = true;
    }
    return {
      value,
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }
  function createComputedAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$3,
      extend_: extend_$3,
      decorate_20223_: decorate_20223_$3
    };
  }
  function make_$3(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$3(adm, key, descriptor, proxyTrap) {
    assertComputedDescriptor(adm, this, key, descriptor);
    return adm.defineComputedProperty_(key, _extends({}, this.options_, {
      get: descriptor.get,
      set: descriptor.set
    }), proxyTrap);
  }
  function decorate_20223_$3(get3, context) {
    if (true) {
      assert20223DecoratorType(context, ["getter"]);
    }
    var ann = this;
    var key = context.name, addInitializer = context.addInitializer;
    addInitializer(function() {
      var adm = asObservableObject(this)[$mobx];
      var options = _extends({}, ann.options_, {
        get: get3,
        context: this
      });
      options.name || (options.name = true ? adm.name_ + "." + key.toString() : "ObservableObject." + key.toString());
      adm.values_.set(key, new ComputedValue(options));
    });
    return function() {
      return this[$mobx].getObservablePropValue_(key);
    };
  }
  function assertComputedDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var get3 = _ref2.get;
    if (!get3) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
    }
  }
  function createObservableAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$4,
      extend_: extend_$4,
      decorate_20223_: decorate_20223_$4
    };
  }
  function make_$4(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  function extend_$4(adm, key, descriptor, proxyTrap) {
    var _this$options_$enhanc, _this$options_;
    assertObservableDescriptor(adm, this, key, descriptor);
    return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
  }
  function decorate_20223_$4(desc, context) {
    if (true) {
      if (context.kind === "field") {
        throw die("Please use `@observable accessor " + String(context.name) + "` instead of `@observable " + String(context.name) + "`");
      }
      assert20223DecoratorType(context, ["accessor"]);
    }
    var ann = this;
    var kind = context.kind, name = context.name;
    var initializedObjects = /* @__PURE__ */ new WeakSet();
    function initializeObservable(target, value) {
      var _ann$options_$enhance, _ann$options_;
      var adm = asObservableObject(target)[$mobx];
      var observable2 = new ObservableValue(value, (_ann$options_$enhance = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.enhancer) != null ? _ann$options_$enhance : deepEnhancer, true ? adm.name_ + "." + name.toString() : "ObservableObject." + name.toString(), false);
      adm.values_.set(name, observable2);
      initializedObjects.add(target);
    }
    if (kind == "accessor") {
      return {
        get: function get3() {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, desc.get.call(this));
          }
          return this[$mobx].getObservablePropValue_(name);
        },
        set: function set4(value) {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, value);
          }
          return this[$mobx].setObservablePropValue_(name, value);
        },
        init: function init(value) {
          if (!initializedObjects.has(this)) {
            initializeObservable(this, value);
          }
          return value;
        }
      };
    }
    return;
  }
  function assertObservableDescriptor(adm, _ref, key, descriptor) {
    var annotationType_ = _ref.annotationType_;
    if (!("value" in descriptor)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
    }
  }
  var AUTO = "true";
  var autoAnnotation = /* @__PURE__ */ createAutoAnnotation();
  function createAutoAnnotation(options) {
    return {
      annotationType_: AUTO,
      options_: options,
      make_: make_$5,
      extend_: extend_$5,
      decorate_20223_: decorate_20223_$5
    };
  }
  function make_$5(adm, key, descriptor, source) {
    var _this$options_3, _this$options_4;
    if (descriptor.get) {
      return computed.make_(adm, key, descriptor, source);
    }
    if (descriptor.set) {
      var set4 = createAction(key.toString(), descriptor.set);
      if (source === adm.target_) {
        return adm.defineProperty_(key, {
          configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
          set: set4
        }) === null ? 0 : 2;
      }
      defineProperty(source, key, {
        configurable: true,
        set: set4
      });
      return 2;
    }
    if (source !== adm.target_ && typeof descriptor.value === "function") {
      var _this$options_2;
      if (isGenerator(descriptor.value)) {
        var _this$options_;
        var flowAnnotation2 = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
        return flowAnnotation2.make_(adm, key, descriptor, source);
      }
      var actionAnnotation2 = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
      return actionAnnotation2.make_(adm, key, descriptor, source);
    }
    var observableAnnotation2 = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
    if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
      var _adm$proxy_;
      descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }
    return observableAnnotation2.make_(adm, key, descriptor, source);
  }
  function extend_$5(adm, key, descriptor, proxyTrap) {
    var _this$options_5, _this$options_6;
    if (descriptor.get) {
      return computed.extend_(adm, key, descriptor, proxyTrap);
    }
    if (descriptor.set) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: createAction(key.toString(), descriptor.set)
      }, proxyTrap);
    }
    if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
      var _adm$proxy_2;
      descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
    }
    var observableAnnotation2 = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
    return observableAnnotation2.extend_(adm, key, descriptor, proxyTrap);
  }
  function decorate_20223_$5(desc, context) {
    die("'" + this.annotationType_ + "' cannot be used as a decorator");
  }
  var OBSERVABLE = "observable";
  var OBSERVABLE_REF = "observable.ref";
  var OBSERVABLE_SHALLOW = "observable.shallow";
  var OBSERVABLE_STRUCT = "observable.struct";
  var defaultCreateObservableOptions = {
    deep: true,
    name: void 0,
    defaultDecorator: void 0,
    proxy: true
  };
  Object.freeze(defaultCreateObservableOptions);
  function asCreateObservableOptions(thing) {
    return thing || defaultCreateObservableOptions;
  }
  var observableAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE);
  var observableRefAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_REF, {
    enhancer: referenceEnhancer
  });
  var observableShallowAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_SHALLOW, {
    enhancer: shallowEnhancer
  });
  var observableStructAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_STRUCT, {
    enhancer: refStructEnhancer
  });
  var observableDecoratorAnnotation = /* @__PURE__ */ createDecoratorAnnotation(observableAnnotation);
  function getEnhancerFromOptions(options) {
    return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
  }
  function getAnnotationFromOptions(options) {
    var _options$defaultDecor;
    return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : void 0;
  }
  function getEnhancerFromAnnotation(annotation) {
    var _annotation$options_$, _annotation$options_;
    return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
  }
  function createObservable(v6, arg2, arg3) {
    if (is20223Decorator(arg2)) {
      return observableAnnotation.decorate_20223_(v6, arg2);
    }
    if (isStringish(arg2)) {
      storeAnnotation(v6, arg2, observableAnnotation);
      return;
    }
    if (isObservable(v6)) {
      return v6;
    }
    if (isPlainObject(v6)) {
      return observable.object(v6, arg2, arg3);
    }
    if (Array.isArray(v6)) {
      return observable.array(v6, arg2);
    }
    if (isES6Map(v6)) {
      return observable.map(v6, arg2);
    }
    if (isES6Set(v6)) {
      return observable.set(v6, arg2);
    }
    if (typeof v6 === "object" && v6 !== null) {
      return v6;
    }
    return observable.box(v6, arg2);
  }
  assign(createObservable, observableDecoratorAnnotation);
  var observableFactories = {
    box: function box(value, options) {
      var o29 = asCreateObservableOptions(options);
      return new ObservableValue(value, getEnhancerFromOptions(o29), o29.name, true, o29.equals);
    },
    array: function array(initialValues, options) {
      var o29 = asCreateObservableOptions(options);
      return (globalState.useProxies === false || o29.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o29), o29.name);
    },
    map: function map(initialValues, options) {
      var o29 = asCreateObservableOptions(options);
      return new ObservableMap(initialValues, getEnhancerFromOptions(o29), o29.name);
    },
    set: function set(initialValues, options) {
      var o29 = asCreateObservableOptions(options);
      return new ObservableSet(initialValues, getEnhancerFromOptions(o29), o29.name);
    },
    object: function object(props, decorators, options) {
      return initObservable(function() {
        return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
      });
    },
    ref: /* @__PURE__ */ createDecoratorAnnotation(observableRefAnnotation),
    shallow: /* @__PURE__ */ createDecoratorAnnotation(observableShallowAnnotation),
    deep: observableDecoratorAnnotation,
    struct: /* @__PURE__ */ createDecoratorAnnotation(observableStructAnnotation)
  };
  var observable = /* @__PURE__ */ assign(createObservable, observableFactories);
  var COMPUTED = "computed";
  var COMPUTED_STRUCT = "computed.struct";
  var computedAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED);
  var computedStructAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED_STRUCT, {
    equals: comparer.structural
  });
  var computed = function computed2(arg1, arg2) {
    if (is20223Decorator(arg2)) {
      return computedAnnotation.decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, computedAnnotation);
    }
    if (isPlainObject(arg1)) {
      return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
    }
    if (true) {
      if (!isFunction(arg1)) {
        die("First argument to `computed` should be an expression.");
      }
      if (isFunction(arg2)) {
        die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
      }
    }
    var opts = isPlainObject(arg2) ? arg2 : {};
    opts.get = arg1;
    opts.name || (opts.name = arg1.name || "");
    return new ComputedValue(opts);
  };
  Object.assign(computed, computedAnnotation);
  computed.struct = /* @__PURE__ */ createDecoratorAnnotation(computedStructAnnotation);
  var _getDescriptor$config;
  var _getDescriptor;
  var currentActionId = 0;
  var nextActionId = 1;
  var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /* @__PURE__ */ getDescriptor(function() {
  }, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
  var tmpNameDescriptor = {
    value: "action",
    configurable: true,
    writable: false,
    enumerable: false
  };
  function createAction(actionName, fn2, autoAction2, ref) {
    if (autoAction2 === void 0) {
      autoAction2 = false;
    }
    if (true) {
      if (!isFunction(fn2)) {
        die("`action` can only be invoked on functions");
      }
      if (typeof actionName !== "string" || !actionName) {
        die("actions should have valid names, got: '" + actionName + "'");
      }
    }
    function res() {
      return executeAction(actionName, autoAction2, fn2, ref || this, arguments);
    }
    res.isMobxAction = true;
    res.toString = function() {
      return fn2.toString();
    };
    if (isFunctionNameConfigurable) {
      tmpNameDescriptor.value = actionName;
      defineProperty(res, "name", tmpNameDescriptor);
    }
    return res;
  }
  function executeAction(actionName, canRunAsDerivation, fn2, scope, args) {
    var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
    try {
      return fn2.apply(scope, args);
    } catch (err) {
      runInfo.error_ = err;
      throw err;
    } finally {
      _endAction(runInfo);
    }
  }
  function _startAction(actionName, canRunAsDerivation, scope, args) {
    var notifySpy_ = isSpyEnabled() && !!actionName;
    var startTime_ = 0;
    if (notifySpy_) {
      startTime_ = Date.now();
      var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
      spyReportStart({
        type: ACTION,
        name: actionName,
        object: scope,
        arguments: flattenedArgs
      });
    }
    var prevDerivation_ = globalState.trackingDerivation;
    var runAsAction = !canRunAsDerivation || !prevDerivation_;
    startBatch();
    var prevAllowStateChanges_ = globalState.allowStateChanges;
    if (runAsAction) {
      untrackedStart();
      prevAllowStateChanges_ = allowStateChangesStart(true);
    }
    var prevAllowStateReads_ = allowStateReadsStart(true);
    var runInfo = {
      runAsAction_: runAsAction,
      prevDerivation_,
      prevAllowStateChanges_,
      prevAllowStateReads_,
      notifySpy_,
      startTime_,
      actionId_: nextActionId++,
      parentActionId_: currentActionId
    };
    currentActionId = runInfo.actionId_;
    return runInfo;
  }
  function _endAction(runInfo) {
    if (currentActionId !== runInfo.actionId_) {
      die(30);
    }
    currentActionId = runInfo.parentActionId_;
    if (runInfo.error_ !== void 0) {
      globalState.suppressReactionErrors = true;
    }
    allowStateChangesEnd(runInfo.prevAllowStateChanges_);
    allowStateReadsEnd(runInfo.prevAllowStateReads_);
    endBatch();
    if (runInfo.runAsAction_) {
      untrackedEnd(runInfo.prevDerivation_);
    }
    if (runInfo.notifySpy_) {
      spyReportEnd({
        time: Date.now() - runInfo.startTime_
      });
    }
    globalState.suppressReactionErrors = false;
  }
  function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
  }
  function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
  }
  var _Symbol$toPrimitive;
  var CREATE = "create";
  _Symbol$toPrimitive = Symbol.toPrimitive;
  var ObservableValue = /* @__PURE__ */ function(_Atom) {
    _inheritsLoose(ObservableValue2, _Atom);
    function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
      var _this;
      if (name_ === void 0) {
        name_ = true ? "ObservableValue@" + getNextId() : "ObservableValue";
      }
      if (notifySpy === void 0) {
        notifySpy = true;
      }
      if (equals === void 0) {
        equals = comparer["default"];
      }
      _this = _Atom.call(this, name_) || this;
      _this.enhancer = void 0;
      _this.name_ = void 0;
      _this.equals = void 0;
      _this.hasUnreportedChange_ = false;
      _this.interceptors_ = void 0;
      _this.changeListeners_ = void 0;
      _this.value_ = void 0;
      _this.dehancer = void 0;
      _this.enhancer = enhancer;
      _this.name_ = name_;
      _this.equals = equals;
      _this.value_ = enhancer(value, void 0, name_);
      if (notifySpy && isSpyEnabled()) {
        spyReport({
          type: CREATE,
          object: _assertThisInitialized(_this),
          observableKind: "value",
          debugObjectName: _this.name_,
          newValue: "" + _this.value_
        });
      }
      return _this;
    }
    var _proto = ObservableValue2.prototype;
    _proto.dehanceValue = function dehanceValue(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.set = function set4(newValue) {
      var oldValue = this.value_;
      newValue = this.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        if (notifySpy) {
          spyReportStart({
            type: UPDATE,
            object: this,
            observableKind: "value",
            debugObjectName: this.name_,
            newValue,
            oldValue
          });
        }
        this.setNewValue_(newValue);
        if (notifySpy) {
          spyReportEnd();
        }
      }
    };
    _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
      checkIfStateModificationsAreAllowed(this);
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          object: this,
          type: UPDATE,
          newValue
        });
        if (!change2) {
          return globalState.UNCHANGED;
        }
        newValue = change2.newValue;
      }
      newValue = this.enhancer(newValue, this.value_, this.name_);
      return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
    };
    _proto.setNewValue_ = function setNewValue_(newValue) {
      var oldValue = this.value_;
      this.value_ = newValue;
      this.reportChanged();
      if (hasListeners(this)) {
        notifyListeners(this, {
          type: UPDATE,
          object: this,
          newValue,
          oldValue
        });
      }
    };
    _proto.get = function get3() {
      this.reportObserved();
      return this.dehanceValue(this.value_);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately) {
        listener({
          observableKind: "value",
          debugObjectName: this.name_,
          object: this,
          type: UPDATE,
          newValue: this.value_,
          oldValue: void 0
        });
      }
      return registerListener(this, listener);
    };
    _proto.raw = function raw() {
      return this.value_;
    };
    _proto.toJSON = function toJSON2() {
      return this.get();
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.value_ + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[_Symbol$toPrimitive] = function() {
      return this.valueOf();
    };
    return ObservableValue2;
  }(Atom);
  var _Symbol$toPrimitive$1;
  _Symbol$toPrimitive$1 = Symbol.toPrimitive;
  var ComputedValue = /* @__PURE__ */ function() {
    function ComputedValue2(options) {
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.observing_ = [];
      this.newObserving_ = null;
      this.isBeingObserved_ = false;
      this.isPendingUnobservation_ = false;
      this.observers_ = /* @__PURE__ */ new Set();
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      this.unboundDepsCount_ = 0;
      this.value_ = new CaughtException(null);
      this.name_ = void 0;
      this.triggeredBy_ = void 0;
      this.isComputing_ = false;
      this.isRunningSetter_ = false;
      this.derivation = void 0;
      this.setter_ = void 0;
      this.isTracing_ = TraceMode.NONE;
      this.scope_ = void 0;
      this.equals_ = void 0;
      this.requiresReaction_ = void 0;
      this.keepAlive_ = void 0;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      if (!options.get) {
        die(31);
      }
      this.derivation = options.get;
      this.name_ = options.name || (true ? "ComputedValue@" + getNextId() : "ComputedValue");
      if (options.set) {
        this.setter_ = createAction(true ? this.name_ + "-setter" : "ComputedValue-setter", options.set);
      }
      this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
      this.scope_ = options.context;
      this.requiresReaction_ = options.requiresReaction;
      this.keepAlive_ = !!options.keepAlive;
    }
    var _proto = ComputedValue2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      propagateMaybeChanged(this);
    };
    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function(listener) {
          return listener();
        });
      }
    };
    _proto.get = function get3() {
      if (this.isComputing_) {
        die(32, this.name_, this.derivation);
      }
      if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
      this.observers_.size === 0 && !this.keepAlive_) {
        if (shouldCompute(this)) {
          this.warnAboutUntrackedRead_();
          startBatch();
          this.value_ = this.computeValue_(false);
          endBatch();
        }
      } else {
        reportObserved(this);
        if (shouldCompute(this)) {
          var prevTrackingContext = globalState.trackingContext;
          if (this.keepAlive_ && !prevTrackingContext) {
            globalState.trackingContext = this;
          }
          if (this.trackAndCompute()) {
            propagateChangeConfirmed(this);
          }
          globalState.trackingContext = prevTrackingContext;
        }
      }
      var result = this.value_;
      if (isCaughtException(result)) {
        throw result.cause;
      }
      return result;
    };
    _proto.set = function set4(value) {
      if (this.setter_) {
        if (this.isRunningSetter_) {
          die(33, this.name_);
        }
        this.isRunningSetter_ = true;
        try {
          this.setter_.call(this.scope_, value);
        } finally {
          this.isRunningSetter_ = false;
        }
      } else {
        die(34, this.name_);
      }
    };
    _proto.trackAndCompute = function trackAndCompute() {
      var oldValue = this.value_;
      var wasSuspended = (
        /* see #1208 */
        this.dependenciesState_ === IDerivationState_.NOT_TRACKING_
      );
      var newValue = this.computeValue_(true);
      var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
      if (changed) {
        this.value_ = newValue;
        if (isSpyEnabled()) {
          spyReport({
            observableKind: "computed",
            debugObjectName: this.name_,
            object: this.scope_,
            type: "update",
            oldValue,
            newValue
          });
        }
      }
      return changed;
    };
    _proto.computeValue_ = function computeValue_(track) {
      this.isComputing_ = true;
      var prev = allowStateChangesStart(false);
      var res;
      if (track) {
        res = trackDerivedFunction(this, this.derivation, this.scope_);
      } else {
        if (globalState.disableErrorBoundaries === true) {
          res = this.derivation.call(this.scope_);
        } else {
          try {
            res = this.derivation.call(this.scope_);
          } catch (e33) {
            res = new CaughtException(e33);
          }
        }
      }
      allowStateChangesEnd(prev);
      this.isComputing_ = false;
      return res;
    };
    _proto.suspend_ = function suspend_() {
      if (!this.keepAlive_) {
        clearObserving(this);
        this.value_ = void 0;
        if (this.isTracing_ !== TraceMode.NONE) {
          console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
        }
      }
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      var _this = this;
      var firstTime = true;
      var prevValue = void 0;
      return autorun(function() {
        var newValue = _this.get();
        if (!firstTime || fireImmediately) {
          var prevU = untrackedStart();
          listener({
            observableKind: "computed",
            debugObjectName: _this.name_,
            type: UPDATE,
            object: _this,
            newValue,
            oldValue: prevValue
          });
          untrackedEnd(prevU);
        }
        firstTime = false;
        prevValue = newValue;
      });
    };
    _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
      if (false) {
        return;
      }
      if (this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
      }
      if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
        console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
      }
    };
    _proto.toString = function toString2() {
      return this.name_ + "[" + this.derivation.toString() + "]";
    };
    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };
    _proto[_Symbol$toPrimitive$1] = function() {
      return this.valueOf();
    };
    return ComputedValue2;
  }();
  var isComputedValue = /* @__PURE__ */ createInstanceofPredicate("ComputedValue", ComputedValue);
  var IDerivationState_;
  (function(IDerivationState_2) {
    IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
    IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
    IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
    IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
  })(IDerivationState_ || (IDerivationState_ = {}));
  var TraceMode;
  (function(TraceMode2) {
    TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
    TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
    TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
  })(TraceMode || (TraceMode = {}));
  var CaughtException = function CaughtException2(cause) {
    this.cause = void 0;
    this.cause = cause;
  };
  function isCaughtException(e33) {
    return e33 instanceof CaughtException;
  }
  function shouldCompute(derivation) {
    switch (derivation.dependenciesState_) {
      case IDerivationState_.UP_TO_DATE_:
        return false;
      case IDerivationState_.NOT_TRACKING_:
      case IDerivationState_.STALE_:
        return true;
      case IDerivationState_.POSSIBLY_STALE_: {
        var prevAllowStateReads = allowStateReadsStart(true);
        var prevUntracked = untrackedStart();
        var obs = derivation.observing_, l20 = obs.length;
        for (var i23 = 0; i23 < l20; i23++) {
          var obj = obs[i23];
          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e33) {
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            }
            if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
        }
        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        allowStateReadsEnd(prevAllowStateReads);
        return false;
      }
    }
  }
  function checkIfStateModificationsAreAllowed(atom) {
    if (false) {
      return;
    }
    var hasObservers = atom.observers_.size > 0;
    if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) {
      console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
    }
  }
  function checkIfStateReadsAreAllowed(observable2) {
    if (!globalState.allowStateReads && globalState.observableRequiresReaction) {
      console.warn("[mobx] Observable '" + observable2.name_ + "' being read outside a reactive context.");
    }
  }
  function trackDerivedFunction(derivation, f7, context) {
    var prevAllowStateReads = allowStateReadsStart(true);
    changeDependenciesStateTo0(derivation);
    derivation.newObserving_ = new Array(
      // Reserve constant space for initial dependencies, dynamic space otherwise.
      // See https://github.com/mobxjs/mobx/pull/3833
      derivation.runId_ === 0 ? 100 : derivation.observing_.length
    );
    derivation.unboundDepsCount_ = 0;
    derivation.runId_ = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    globalState.inBatch++;
    var result;
    if (globalState.disableErrorBoundaries === true) {
      result = f7.call(context);
    } else {
      try {
        result = f7.call(context);
      } catch (e33) {
        result = new CaughtException(e33);
      }
    }
    globalState.inBatch--;
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    warnAboutDerivationWithoutDependencies(derivation);
    allowStateReadsEnd(prevAllowStateReads);
    return result;
  }
  function warnAboutDerivationWithoutDependencies(derivation) {
    if (false) {
      return;
    }
    if (derivation.observing_.length !== 0) {
      return;
    }
    if (typeof derivation.requiresObservable_ === "boolean" ? derivation.requiresObservable_ : globalState.reactionRequiresObservable) {
      console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
    }
  }
  function bindDependencies(derivation) {
    var prevObserving = derivation.observing_;
    var observing = derivation.observing_ = derivation.newObserving_;
    var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
    var i0 = 0, l20 = derivation.unboundDepsCount_;
    for (var i23 = 0; i23 < l20; i23++) {
      var dep = observing[i23];
      if (dep.diffValue_ === 0) {
        dep.diffValue_ = 1;
        if (i0 !== i23) {
          observing[i0] = dep;
        }
        i0++;
      }
      if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
        lowestNewObservingDerivationState = dep.dependenciesState_;
      }
    }
    observing.length = i0;
    derivation.newObserving_ = null;
    l20 = prevObserving.length;
    while (l20--) {
      var _dep = prevObserving[l20];
      if (_dep.diffValue_ === 0) {
        removeObserver(_dep, derivation);
      }
      _dep.diffValue_ = 0;
    }
    while (i0--) {
      var _dep2 = observing[i0];
      if (_dep2.diffValue_ === 1) {
        _dep2.diffValue_ = 0;
        addObserver(_dep2, derivation);
      }
    }
    if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
      derivation.dependenciesState_ = lowestNewObservingDerivationState;
      derivation.onBecomeStale_();
    }
  }
  function clearObserving(derivation) {
    var obs = derivation.observing_;
    derivation.observing_ = [];
    var i23 = obs.length;
    while (i23--) {
      removeObserver(obs[i23], derivation);
    }
    derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
  }
  function untracked(action2) {
    var prev = untrackedStart();
    try {
      return action2();
    } finally {
      untrackedEnd(prev);
    }
  }
  function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
  }
  function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
  }
  function allowStateReadsStart(allowStateReads) {
    var prev = globalState.allowStateReads;
    globalState.allowStateReads = allowStateReads;
    return prev;
  }
  function allowStateReadsEnd(prev) {
    globalState.allowStateReads = prev;
  }
  function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      return;
    }
    derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
    var obs = derivation.observing_;
    var i23 = obs.length;
    while (i23--) {
      obs[i23].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  }
  var MobXGlobals = function MobXGlobals2() {
    this.version = 6;
    this.UNCHANGED = {};
    this.trackingDerivation = null;
    this.trackingContext = null;
    this.runId = 0;
    this.mobxGuid = 0;
    this.inBatch = 0;
    this.pendingUnobservations = [];
    this.pendingReactions = [];
    this.isRunningReactions = false;
    this.allowStateChanges = false;
    this.allowStateReads = true;
    this.enforceActions = true;
    this.spyListeners = [];
    this.globalReactionErrorHandlers = [];
    this.computedRequiresReaction = false;
    this.reactionRequiresObservable = false;
    this.observableRequiresReaction = false;
    this.disableErrorBoundaries = false;
    this.suppressReactionErrors = false;
    this.useProxies = true;
    this.verifyProxies = false;
    this.safeDescriptors = true;
  };
  var canMergeGlobalState = true;
  var isolateCalled = false;
  var globalState = /* @__PURE__ */ function() {
    var global2 = /* @__PURE__ */ getGlobal();
    if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals) {
      canMergeGlobalState = false;
    }
    if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version) {
      canMergeGlobalState = false;
    }
    if (!canMergeGlobalState) {
      setTimeout(function() {
        if (!isolateCalled) {
          die(35);
        }
      }, 1);
      return new MobXGlobals();
    } else if (global2.__mobxGlobals) {
      global2.__mobxInstanceCount += 1;
      if (!global2.__mobxGlobals.UNCHANGED) {
        global2.__mobxGlobals.UNCHANGED = {};
      }
      return global2.__mobxGlobals;
    } else {
      global2.__mobxInstanceCount = 1;
      return global2.__mobxGlobals = /* @__PURE__ */ new MobXGlobals();
    }
  }();
  function addObserver(observable2, node) {
    observable2.observers_.add(node);
    if (observable2.lowestObserverState_ > node.dependenciesState_) {
      observable2.lowestObserverState_ = node.dependenciesState_;
    }
  }
  function removeObserver(observable2, node) {
    observable2.observers_["delete"](node);
    if (observable2.observers_.size === 0) {
      queueForUnobservation(observable2);
    }
  }
  function queueForUnobservation(observable2) {
    if (observable2.isPendingUnobservation_ === false) {
      observable2.isPendingUnobservation_ = true;
      globalState.pendingUnobservations.push(observable2);
    }
  }
  function startBatch() {
    globalState.inBatch++;
  }
  function endBatch() {
    if (--globalState.inBatch === 0) {
      runReactions();
      var list = globalState.pendingUnobservations;
      for (var i23 = 0; i23 < list.length; i23++) {
        var observable2 = list[i23];
        observable2.isPendingUnobservation_ = false;
        if (observable2.observers_.size === 0) {
          if (observable2.isBeingObserved_) {
            observable2.isBeingObserved_ = false;
            observable2.onBUO();
          }
          if (observable2 instanceof ComputedValue) {
            observable2.suspend_();
          }
        }
      }
      globalState.pendingUnobservations = [];
    }
  }
  function reportObserved(observable2) {
    checkIfStateReadsAreAllowed(observable2);
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
      if (derivation.runId_ !== observable2.lastAccessedBy_) {
        observable2.lastAccessedBy_ = derivation.runId_;
        derivation.newObserving_[derivation.unboundDepsCount_++] = observable2;
        if (!observable2.isBeingObserved_ && globalState.trackingContext) {
          observable2.isBeingObserved_ = true;
          observable2.onBO();
        }
      }
      return observable2.isBeingObserved_;
    } else if (observable2.observers_.size === 0 && globalState.inBatch > 0) {
      queueForUnobservation(observable2);
    }
    return false;
  }
  function propagateChanged(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d11) {
      if (d11.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        if (d11.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d11, observable2);
        }
        d11.onBecomeStale_();
      }
      d11.dependenciesState_ = IDerivationState_.STALE_;
    });
  }
  function propagateChangeConfirmed(observable2) {
    if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.STALE_;
    observable2.observers_.forEach(function(d11) {
      if (d11.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
        d11.dependenciesState_ = IDerivationState_.STALE_;
        if (d11.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d11, observable2);
        }
      } else if (d11.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        observable2.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }
    });
  }
  function propagateMaybeChanged(observable2) {
    if (observable2.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
      return;
    }
    observable2.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
    observable2.observers_.forEach(function(d11) {
      if (d11.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d11.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
        d11.onBecomeStale_();
      }
    });
  }
  function logTraceInfo(derivation, observable2) {
    console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable2.name_ + "'");
    if (derivation.isTracing_ === TraceMode.BREAK) {
      var lines = [];
      printDepTree(getDependencyTree(derivation), lines, 1);
      new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable2.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
  }
  function printDepTree(tree, lines, depth) {
    if (lines.length >= 1e3) {
      lines.push("(and many more)");
      return;
    }
    lines.push("" + "	".repeat(depth - 1) + tree.name);
    if (tree.dependencies) {
      tree.dependencies.forEach(function(child) {
        return printDepTree(child, lines, depth + 1);
      });
    }
  }
  var Reaction = /* @__PURE__ */ function() {
    function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
      if (name_ === void 0) {
        name_ = true ? "Reaction@" + getNextId() : "Reaction";
      }
      this.name_ = void 0;
      this.onInvalidate_ = void 0;
      this.errorHandler_ = void 0;
      this.requiresObservable_ = void 0;
      this.observing_ = [];
      this.newObserving_ = [];
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.unboundDepsCount_ = 0;
      this.isDisposed_ = false;
      this.isScheduled_ = false;
      this.isTrackPending_ = false;
      this.isRunning_ = false;
      this.isTracing_ = TraceMode.NONE;
      this.name_ = name_;
      this.onInvalidate_ = onInvalidate_;
      this.errorHandler_ = errorHandler_;
      this.requiresObservable_ = requiresObservable_;
    }
    var _proto = Reaction2.prototype;
    _proto.onBecomeStale_ = function onBecomeStale_() {
      this.schedule_();
    };
    _proto.schedule_ = function schedule_() {
      if (!this.isScheduled_) {
        this.isScheduled_ = true;
        globalState.pendingReactions.push(this);
        runReactions();
      }
    };
    _proto.isScheduled = function isScheduled() {
      return this.isScheduled_;
    };
    _proto.runReaction_ = function runReaction_() {
      if (!this.isDisposed_) {
        startBatch();
        this.isScheduled_ = false;
        var prev = globalState.trackingContext;
        globalState.trackingContext = this;
        if (shouldCompute(this)) {
          this.isTrackPending_ = true;
          try {
            this.onInvalidate_();
            if (this.isTrackPending_ && isSpyEnabled()) {
              spyReport({
                name: this.name_,
                type: "scheduled-reaction"
              });
            }
          } catch (e33) {
            this.reportExceptionInDerivation_(e33);
          }
        }
        globalState.trackingContext = prev;
        endBatch();
      }
    };
    _proto.track = function track(fn2) {
      if (this.isDisposed_) {
        return;
      }
      startBatch();
      var notify = isSpyEnabled();
      var startTime;
      if (notify) {
        startTime = Date.now();
        spyReportStart({
          name: this.name_,
          type: "reaction"
        });
      }
      this.isRunning_ = true;
      var prevReaction = globalState.trackingContext;
      globalState.trackingContext = this;
      var result = trackDerivedFunction(this, fn2, void 0);
      globalState.trackingContext = prevReaction;
      this.isRunning_ = false;
      this.isTrackPending_ = false;
      if (this.isDisposed_) {
        clearObserving(this);
      }
      if (isCaughtException(result)) {
        this.reportExceptionInDerivation_(result.cause);
      }
      if (notify) {
        spyReportEnd({
          time: Date.now() - startTime
        });
      }
      endBatch();
    };
    _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
      var _this = this;
      if (this.errorHandler_) {
        this.errorHandler_(error, this);
        return;
      }
      if (globalState.disableErrorBoundaries) {
        throw error;
      }
      var message = true ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
      if (!globalState.suppressReactionErrors) {
        console.error(message, error);
      } else if (true) {
        console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
      }
      if (isSpyEnabled()) {
        spyReport({
          type: "error",
          name: this.name_,
          message,
          error: "" + error
        });
      }
      globalState.globalReactionErrorHandlers.forEach(function(f7) {
        return f7(error, _this);
      });
    };
    _proto.dispose = function dispose() {
      if (!this.isDisposed_) {
        this.isDisposed_ = true;
        if (!this.isRunning_) {
          startBatch();
          clearObserving(this);
          endBatch();
        }
      }
    };
    _proto.getDisposer_ = function getDisposer_(abortSignal) {
      var _this2 = this;
      var dispose = function dispose2() {
        _this2.dispose();
        abortSignal == null ? void 0 : abortSignal.removeEventListener == null ? void 0 : abortSignal.removeEventListener("abort", dispose2);
      };
      abortSignal == null ? void 0 : abortSignal.addEventListener == null ? void 0 : abortSignal.addEventListener("abort", dispose);
      dispose[$mobx] = this;
      return dispose;
    };
    _proto.toString = function toString2() {
      return "Reaction[" + this.name_ + "]";
    };
    _proto.trace = function trace$1(enterBreakPoint) {
      if (enterBreakPoint === void 0) {
        enterBreakPoint = false;
      }
      trace(this, enterBreakPoint);
    };
    return Reaction2;
  }();
  var MAX_REACTION_ITERATIONS = 100;
  var reactionScheduler = function reactionScheduler2(f7) {
    return f7();
  };
  function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions) {
      return;
    }
    reactionScheduler(runReactionsHelper);
  }
  function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        console.error(true ? "Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) : "[mobx] cycle in reaction: " + allReactions[0]);
        allReactions.splice(0);
      }
      var remainingReactions = allReactions.splice(0);
      for (var i23 = 0, l20 = remainingReactions.length; i23 < l20; i23++) {
        remainingReactions[i23].runReaction_();
      }
    }
    globalState.isRunningReactions = false;
  }
  var isReaction = /* @__PURE__ */ createInstanceofPredicate("Reaction", Reaction);
  function isSpyEnabled() {
    return !!globalState.spyListeners.length;
  }
  function spyReport(event) {
    if (false) {
      return;
    }
    if (!globalState.spyListeners.length) {
      return;
    }
    var listeners = globalState.spyListeners;
    for (var i23 = 0, l20 = listeners.length; i23 < l20; i23++) {
      listeners[i23](event);
    }
  }
  function spyReportStart(event) {
    if (false) {
      return;
    }
    var change2 = _extends({}, event, {
      spyReportStart: true
    });
    spyReport(change2);
  }
  var END_EVENT = {
    type: "report-end",
    spyReportEnd: true
  };
  function spyReportEnd(change2) {
    if (false) {
      return;
    }
    if (change2) {
      spyReport(_extends({}, change2, {
        type: "report-end",
        spyReportEnd: true
      }));
    } else {
      spyReport(END_EVENT);
    }
  }
  function spy(listener) {
    if (false) {
      console.warn("[mobx.spy] Is a no-op in production builds");
      return function() {
      };
    } else {
      globalState.spyListeners.push(listener);
      return once(function() {
        globalState.spyListeners = globalState.spyListeners.filter(function(l20) {
          return l20 !== listener;
        });
      });
    }
  }
  var ACTION = "action";
  var ACTION_BOUND = "action.bound";
  var AUTOACTION = "autoAction";
  var AUTOACTION_BOUND = "autoAction.bound";
  var DEFAULT_ACTION_NAME = "<unnamed action>";
  var actionAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION);
  var actionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION_BOUND, {
    bound: true
  });
  var autoActionAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION, {
    autoAction: true
  });
  var autoActionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION_BOUND, {
    autoAction: true,
    bound: true
  });
  function createActionFactory(autoAction2) {
    var res = function action2(arg1, arg2) {
      if (isFunction(arg1)) {
        return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction2);
      }
      if (isFunction(arg2)) {
        return createAction(arg1, arg2, autoAction2);
      }
      if (is20223Decorator(arg2)) {
        return (autoAction2 ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
      }
      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, autoAction2 ? autoActionAnnotation : actionAnnotation);
      }
      if (isStringish(arg1)) {
        return createDecoratorAnnotation(createActionAnnotation(autoAction2 ? AUTOACTION : ACTION, {
          name: arg1,
          autoAction: autoAction2
        }));
      }
      if (true) {
        die("Invalid arguments for `action`");
      }
    };
    return res;
  }
  var action = /* @__PURE__ */ createActionFactory(false);
  Object.assign(action, actionAnnotation);
  var autoAction = /* @__PURE__ */ createActionFactory(true);
  Object.assign(autoAction, autoActionAnnotation);
  action.bound = /* @__PURE__ */ createDecoratorAnnotation(actionBoundAnnotation);
  autoAction.bound = /* @__PURE__ */ createDecoratorAnnotation(autoActionBoundAnnotation);
  function isAction(thing) {
    return isFunction(thing) && thing.isMobxAction === true;
  }
  function autorun(view, opts) {
    var _opts$name, _opts, _opts2, _opts2$signal, _opts3;
    if (opts === void 0) {
      opts = EMPTY_OBJECT;
    }
    if (true) {
      if (!isFunction(view)) {
        die("Autorun expects a function as first argument");
      }
      if (isAction(view)) {
        die("Autorun does not accept actions since actions are untrackable");
      }
    }
    var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : true ? view.name || "Autorun@" + getNextId() : "Autorun";
    var runSync = !opts.scheduler && !opts.delay;
    var reaction2;
    if (runSync) {
      reaction2 = new Reaction(name, function() {
        this.track(reactionRunner);
      }, opts.onError, opts.requiresObservable);
    } else {
      var scheduler = createSchedulerFromOptions(opts);
      var isScheduled = false;
      reaction2 = new Reaction(name, function() {
        if (!isScheduled) {
          isScheduled = true;
          scheduler(function() {
            isScheduled = false;
            if (!reaction2.isDisposed_) {
              reaction2.track(reactionRunner);
            }
          });
        }
      }, opts.onError, opts.requiresObservable);
    }
    function reactionRunner() {
      view(reaction2);
    }
    if (!((_opts2 = opts) != null && (_opts2$signal = _opts2.signal) != null && _opts2$signal.aborted)) {
      reaction2.schedule_();
    }
    return reaction2.getDisposer_((_opts3 = opts) == null ? void 0 : _opts3.signal);
  }
  var run = function run2(f7) {
    return f7();
  };
  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function(f7) {
      return setTimeout(f7, opts.delay);
    } : run;
  }
  var ON_BECOME_OBSERVED = "onBO";
  var ON_BECOME_UNOBSERVED = "onBUO";
  function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
  }
  function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
  }
  function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
    var cb = isFunction(arg3) ? arg3 : arg2;
    var listenersKey = hook + "L";
    if (atom[listenersKey]) {
      atom[listenersKey].add(cb);
    } else {
      atom[listenersKey] = /* @__PURE__ */ new Set([cb]);
    }
    return function() {
      var hookListeners = atom[listenersKey];
      if (hookListeners) {
        hookListeners["delete"](cb);
        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }
  function extendObservable(target, properties, annotations, options) {
    if (true) {
      if (arguments.length > 4) {
        die("'extendObservable' expected 2-4 arguments");
      }
      if (typeof target !== "object") {
        die("'extendObservable' expects an object as first argument");
      }
      if (isObservableMap(target)) {
        die("'extendObservable' should not be used on maps, use map.merge instead");
      }
      if (!isPlainObject(properties)) {
        die("'extendObservable' only accepts plain objects as second argument");
      }
      if (isObservable(properties) || isObservable(annotations)) {
        die("Extending an object with another observable (object) is not supported");
      }
    }
    var descriptors = getOwnPropertyDescriptors(properties);
    initObservable(function() {
      var adm = asObservableObject(target, options)[$mobx];
      ownKeys(descriptors).forEach(function(key) {
        adm.extend_(
          key,
          descriptors[key],
          // must pass "undefined" for { key: undefined }
          !annotations ? true : key in annotations ? annotations[key] : true
        );
      });
    });
    return target;
  }
  function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
  }
  function nodeToDependencyTree(node) {
    var result = {
      name: node.name_
    };
    if (node.observing_ && node.observing_.length > 0) {
      result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
    }
    return result;
  }
  function unique(list) {
    return Array.from(new Set(list));
  }
  var generatorId = 0;
  function FlowCancellationError() {
    this.message = "FLOW_CANCELLED";
  }
  FlowCancellationError.prototype = /* @__PURE__ */ Object.create(Error.prototype);
  var flowAnnotation = /* @__PURE__ */ createFlowAnnotation("flow");
  var flowBoundAnnotation = /* @__PURE__ */ createFlowAnnotation("flow.bound", {
    bound: true
  });
  var flow = /* @__PURE__ */ Object.assign(function flow2(arg1, arg2) {
    if (is20223Decorator(arg2)) {
      return flowAnnotation.decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, flowAnnotation);
    }
    if (arguments.length !== 1) {
      die("Flow expects single argument with generator function");
    }
    var generator = arg1;
    var name = generator.name || "<unnamed flow>";
    var res = function res2() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = void 0;
      var promise = new Promise(function(resolve, reject) {
        var stepId = 0;
        rejector = reject;
        function onFulfilled(res3) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res3);
          } catch (e33) {
            return reject(e33);
          }
          next(ret);
        }
        function onRejected(err) {
          pendingPromise = void 0;
          var ret;
          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
          } catch (e33) {
            return reject(e33);
          }
          next(ret);
        }
        function next(ret) {
          if (isFunction(ret == null ? void 0 : ret.then)) {
            ret.then(next, reject);
            return;
          }
          if (ret.done) {
            return resolve(ret.value);
          }
          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }
        onFulfilled(void 0);
      });
      promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
        try {
          if (pendingPromise) {
            cancelPromise(pendingPromise);
          }
          var _res = gen["return"](void 0);
          var yieldedPromise = Promise.resolve(_res.value);
          yieldedPromise.then(noop, noop);
          cancelPromise(yieldedPromise);
          rejector(new FlowCancellationError());
        } catch (e33) {
          rejector(e33);
        }
      });
      return promise;
    };
    res.isMobXFlow = true;
    return res;
  }, flowAnnotation);
  flow.bound = /* @__PURE__ */ createDecoratorAnnotation(flowBoundAnnotation);
  function cancelPromise(promise) {
    if (isFunction(promise.cancel)) {
      promise.cancel();
    }
  }
  function isFlow(fn2) {
    return (fn2 == null ? void 0 : fn2.isMobXFlow) === true;
  }
  function _isObservable(value, property) {
    if (!value) {
      return false;
    }
    if (property !== void 0) {
      if (isObservableMap(value) || isObservableArray(value)) {
        return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
      }
      if (isObservableObject(value)) {
        return value[$mobx].values_.has(property);
      }
      return false;
    }
    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
  }
  function isObservable(value) {
    if (arguments.length !== 1) {
      die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    }
    return _isObservable(value);
  }
  function trace() {
    if (false) {
      return;
    }
    var enterBreakPoint = false;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[args.length - 1] === "boolean") {
      enterBreakPoint = args.pop();
    }
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
      return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing_ === TraceMode.NONE) {
      console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
    }
    derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
  }
  function getAtomFromArgs(args) {
    switch (args.length) {
      case 0:
        return globalState.trackingDerivation;
      case 1:
        return getAtom(args[0]);
      case 2:
        return getAtom(args[0], args[1]);
    }
  }
  function transaction(action2, thisArg) {
    if (thisArg === void 0) {
      thisArg = void 0;
    }
    startBatch();
    try {
      return action2.apply(thisArg);
    } finally {
      endBatch();
    }
  }
  function getAdm(target) {
    return target[$mobx];
  }
  var objectProxyTraps = {
    has: function has(target, name) {
      if (globalState.trackingDerivation) {
        warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
      }
      return getAdm(target).has_(name);
    },
    get: function get(target, name) {
      return getAdm(target).get_(name);
    },
    set: function set2(target, name, value) {
      var _getAdm$set_;
      if (!isStringish(name)) {
        return false;
      }
      if (!getAdm(target).values_.has(name)) {
        warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
      }
      return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
    },
    deleteProperty: function deleteProperty(target, name) {
      var _getAdm$delete_;
      if (true) {
        warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
      }
      if (!isStringish(name)) {
        return false;
      }
      return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
    },
    defineProperty: function defineProperty2(target, name, descriptor) {
      var _getAdm$definePropert;
      if (true) {
        warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
      }
      return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
    },
    ownKeys: function ownKeys2(target) {
      if (globalState.trackingDerivation) {
        warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
      }
      return getAdm(target).ownKeys_();
    },
    preventExtensions: function preventExtensions(target) {
      die(13);
    }
  };
  function asDynamicObservableObject(target, options) {
    var _target$$mobx, _target$$mobx$proxy_;
    assertProxies();
    target = asObservableObject(target, options);
    return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
  }
  function hasInterceptors(interceptable) {
    return interceptable.interceptors_ !== void 0 && interceptable.interceptors_.length > 0;
  }
  function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
    interceptors.push(handler);
    return once(function() {
      var idx = interceptors.indexOf(handler);
      if (idx !== -1) {
        interceptors.splice(idx, 1);
      }
    });
  }
  function interceptChange(interceptable, change2) {
    var prevU = untrackedStart();
    try {
      var interceptors = [].concat(interceptable.interceptors_ || []);
      for (var i23 = 0, l20 = interceptors.length; i23 < l20; i23++) {
        change2 = interceptors[i23](change2);
        if (change2 && !change2.type) {
          die(14);
        }
        if (!change2) {
          break;
        }
      }
      return change2;
    } finally {
      untrackedEnd(prevU);
    }
  }
  function hasListeners(listenable) {
    return listenable.changeListeners_ !== void 0 && listenable.changeListeners_.length > 0;
  }
  function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
    listeners.push(handler);
    return once(function() {
      var idx = listeners.indexOf(handler);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    });
  }
  function notifyListeners(listenable, change2) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners_;
    if (!listeners) {
      return;
    }
    listeners = listeners.slice();
    for (var i23 = 0, l20 = listeners.length; i23 < l20; i23++) {
      listeners[i23](change2);
    }
    untrackedEnd(prevU);
  }
  function makeObservable(target, annotations, options) {
    initObservable(function() {
      var _annotations;
      var adm = asObservableObject(target, options)[$mobx];
      if (annotations && target[storedAnnotationsSymbol]) {
        die("makeObservable second arg must be nullish when using decorators. Mixing @decorator syntax with annotations is not supported.");
      }
      (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target);
      ownKeys(annotations).forEach(function(key) {
        return adm.make_(key, annotations[key]);
      });
    });
    return target;
  }
  var SPLICE = "splice";
  var UPDATE = "update";
  var MAX_SPLICE_SIZE = 1e4;
  var arrayTraps = {
    get: function get2(target, name) {
      var adm = target[$mobx];
      if (name === $mobx) {
        return adm;
      }
      if (name === "length") {
        return adm.getArrayLength_();
      }
      if (typeof name === "string" && !isNaN(name)) {
        return adm.get_(parseInt(name));
      }
      if (hasProp(arrayExtensions, name)) {
        return arrayExtensions[name];
      }
      return target[name];
    },
    set: function set3(target, name, value) {
      var adm = target[$mobx];
      if (name === "length") {
        adm.setArrayLength_(value);
      }
      if (typeof name === "symbol" || isNaN(name)) {
        target[name] = value;
      } else {
        adm.set_(parseInt(name), value);
      }
      return true;
    },
    preventExtensions: function preventExtensions2() {
      die(15);
    }
  };
  var ObservableArrayAdministration = /* @__PURE__ */ function() {
    function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
      if (name === void 0) {
        name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
      }
      this.owned_ = void 0;
      this.legacyMode_ = void 0;
      this.atom_ = void 0;
      this.values_ = [];
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.enhancer_ = void 0;
      this.dehancer = void 0;
      this.proxy_ = void 0;
      this.lastKnownLength_ = 0;
      this.owned_ = owned_;
      this.legacyMode_ = legacyMode_;
      this.atom_ = new Atom(name);
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, true ? name + "[..]" : "ObservableArray[..]");
      };
    }
    var _proto = ObservableArrayAdministration2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.dehanceValues_ = function dehanceValues_(values) {
      if (this.dehancer !== void 0 && values.length > 0) {
        return values.map(this.dehancer);
      }
      return values;
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }
      if (fireImmediately) {
        listener({
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: "splice",
          index: 0,
          added: this.values_.slice(),
          addedCount: this.values_.length,
          removed: [],
          removedCount: 0
        });
      }
      return registerListener(this, listener);
    };
    _proto.getArrayLength_ = function getArrayLength_() {
      this.atom_.reportObserved();
      return this.values_.length;
    };
    _proto.setArrayLength_ = function setArrayLength_(newLength) {
      if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
        die("Out of range: " + newLength);
      }
      var currentLength = this.values_.length;
      if (newLength === currentLength) {
        return;
      } else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);
        for (var i23 = 0; i23 < newLength - currentLength; i23++) {
          newItems[i23] = void 0;
        }
        this.spliceWithArray_(currentLength, 0, newItems);
      } else {
        this.spliceWithArray_(newLength, currentLength - newLength);
      }
    };
    _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
      if (oldLength !== this.lastKnownLength_) {
        die(16);
      }
      this.lastKnownLength_ += delta;
      if (this.legacyMode_ && delta > 0) {
        reserveArrayBuffer(oldLength + delta + 1);
      }
    };
    _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
      var _this = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      var length = this.values_.length;
      if (index === void 0) {
        index = 0;
      } else if (index > length) {
        index = length;
      } else if (index < 0) {
        index = Math.max(0, length + index);
      }
      if (arguments.length === 1) {
        deleteCount = length - index;
      } else if (deleteCount === void 0 || deleteCount === null) {
        deleteCount = 0;
      } else {
        deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      }
      if (newItems === void 0) {
        newItems = EMPTY_ARRAY;
      }
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          object: this.proxy_,
          type: SPLICE,
          index,
          removedCount: deleteCount,
          added: newItems
        });
        if (!change2) {
          return EMPTY_ARRAY;
        }
        deleteCount = change2.removedCount;
        newItems = change2.added;
      }
      newItems = newItems.length === 0 ? newItems : newItems.map(function(v6) {
        return _this.enhancer_(v6, void 0);
      });
      if (this.legacyMode_ || true) {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength_(length, lengthDelta);
      }
      var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
      if (deleteCount !== 0 || newItems.length !== 0) {
        this.notifyArraySplice_(index, newItems, res);
      }
      return this.dehanceValues_(res);
    };
    _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
      if (newItems.length < MAX_SPLICE_SIZE) {
        var _this$values_;
        return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
      } else {
        var res = this.values_.slice(index, index + deleteCount);
        var oldItems = this.values_.slice(index + deleteCount);
        this.values_.length += newItems.length - deleteCount;
        for (var i23 = 0; i23 < newItems.length; i23++) {
          this.values_[index + i23] = newItems[i23];
        }
        for (var _i = 0; _i < oldItems.length; _i++) {
          this.values_[index + newItems.length + _i] = oldItems[_i];
        }
        return res;
      }
    };
    _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change2 = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        type: UPDATE,
        debugObjectName: this.atom_.name_,
        index,
        newValue,
        oldValue
      } : null;
      if (notifySpy) {
        spyReportStart(change2);
      }
      this.atom_.reportChanged();
      if (notify) {
        notifyListeners(this, change2);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    };
    _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change2 = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: SPLICE,
        index,
        removed,
        added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      if (notifySpy) {
        spyReportStart(change2);
      }
      this.atom_.reportChanged();
      if (notify) {
        notifyListeners(this, change2);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    };
    _proto.get_ = function get_(index) {
      if (this.legacyMode_ && index >= this.values_.length) {
        console.warn(true ? "[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + index);
        return void 0;
      }
      this.atom_.reportObserved();
      return this.dehanceValue_(this.values_[index]);
    };
    _proto.set_ = function set_(index, newValue) {
      var values = this.values_;
      if (this.legacyMode_ && index > values.length) {
        die(17, index, values.length);
      }
      if (index < values.length) {
        checkIfStateModificationsAreAllowed(this.atom_);
        var oldValue = values[index];
        if (hasInterceptors(this)) {
          var change2 = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_,
            index,
            newValue
          });
          if (!change2) {
            return;
          }
          newValue = change2.newValue;
        }
        newValue = this.enhancer_(newValue, oldValue);
        var changed = newValue !== oldValue;
        if (changed) {
          values[index] = newValue;
          this.notifyArrayChildUpdate_(index, newValue, oldValue);
        }
      } else {
        var newItems = new Array(index + 1 - values.length);
        for (var i23 = 0; i23 < newItems.length - 1; i23++) {
          newItems[i23] = void 0;
        }
        newItems[newItems.length - 1] = newValue;
        this.spliceWithArray_(values.length, 0, newItems);
      }
    };
    return ObservableArrayAdministration2;
  }();
  function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) {
      name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    if (owned === void 0) {
      owned = false;
    }
    assertProxies();
    return initObservable(function() {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
      addHiddenFinalProp(adm.values_, $mobx, adm);
      var proxy = new Proxy(adm.values_, arrayTraps);
      adm.proxy_ = proxy;
      if (initialValues && initialValues.length) {
        adm.spliceWithArray_(0, 0, initialValues);
      }
      return proxy;
    });
  }
  var arrayExtensions = {
    clear: function clear() {
      return this.splice(0);
    },
    replace: function replace(newItems) {
      var adm = this[$mobx];
      return adm.spliceWithArray_(0, adm.values_.length, newItems);
    },
    // Used by JSON.stringify
    toJSON: function toJSON() {
      return this.slice();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function splice(index, deleteCount) {
      for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        newItems[_key - 2] = arguments[_key];
      }
      var adm = this[$mobx];
      switch (arguments.length) {
        case 0:
          return [];
        case 1:
          return adm.spliceWithArray_(index);
        case 2:
          return adm.spliceWithArray_(index, deleteCount);
      }
      return adm.spliceWithArray_(index, deleteCount, newItems);
    },
    spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
      return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
    },
    push: function push() {
      var adm = this[$mobx];
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }
      adm.spliceWithArray_(adm.values_.length, 0, items);
      return adm.values_.length;
    },
    pop: function pop() {
      return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
    },
    shift: function shift() {
      return this.splice(0, 1)[0];
    },
    unshift: function unshift() {
      var adm = this[$mobx];
      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }
      adm.spliceWithArray_(0, 0, items);
      return adm.values_.length;
    },
    reverse: function reverse() {
      if (globalState.trackingDerivation) {
        die(37, "reverse");
      }
      this.replace(this.slice().reverse());
      return this;
    },
    sort: function sort() {
      if (globalState.trackingDerivation) {
        die(37, "sort");
      }
      var copy = this.slice();
      copy.sort.apply(copy, arguments);
      this.replace(copy);
      return this;
    },
    remove: function remove(value) {
      var adm = this[$mobx];
      var idx = adm.dehanceValues_(adm.values_).indexOf(value);
      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }
      return false;
    }
  };
  addArrayExtension("at", simpleFunc);
  addArrayExtension("concat", simpleFunc);
  addArrayExtension("flat", simpleFunc);
  addArrayExtension("includes", simpleFunc);
  addArrayExtension("indexOf", simpleFunc);
  addArrayExtension("join", simpleFunc);
  addArrayExtension("lastIndexOf", simpleFunc);
  addArrayExtension("slice", simpleFunc);
  addArrayExtension("toString", simpleFunc);
  addArrayExtension("toLocaleString", simpleFunc);
  addArrayExtension("toSorted", simpleFunc);
  addArrayExtension("toSpliced", simpleFunc);
  addArrayExtension("with", simpleFunc);
  addArrayExtension("every", mapLikeFunc);
  addArrayExtension("filter", mapLikeFunc);
  addArrayExtension("find", mapLikeFunc);
  addArrayExtension("findIndex", mapLikeFunc);
  addArrayExtension("findLast", mapLikeFunc);
  addArrayExtension("findLastIndex", mapLikeFunc);
  addArrayExtension("flatMap", mapLikeFunc);
  addArrayExtension("forEach", mapLikeFunc);
  addArrayExtension("map", mapLikeFunc);
  addArrayExtension("some", mapLikeFunc);
  addArrayExtension("toReversed", mapLikeFunc);
  addArrayExtension("reduce", reduceLikeFunc);
  addArrayExtension("reduceRight", reduceLikeFunc);
  function addArrayExtension(funcName, funcFactory) {
    if (typeof Array.prototype[funcName] === "function") {
      arrayExtensions[funcName] = funcFactory(funcName);
    }
  }
  function simpleFunc(funcName) {
    return function() {
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  function mapLikeFunc(funcName) {
    return function(callback, thisArg) {
      var _this2 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName](function(element, index) {
        return callback.call(thisArg, element, index, _this2);
      });
    };
  }
  function reduceLikeFunc(funcName) {
    return function() {
      var _this3 = this;
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      var callback = arguments[0];
      arguments[0] = function(accumulator, currentValue, index) {
        return callback(accumulator, currentValue, index, _this3);
      };
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }
  var isObservableArrayAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
  function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
  }
  var _Symbol$iterator;
  var _Symbol$toStringTag;
  var ObservableMapMarker = {};
  var ADD = "add";
  var DELETE = "delete";
  _Symbol$iterator = Symbol.iterator;
  _Symbol$toStringTag = Symbol.toStringTag;
  var ObservableMap = /* @__PURE__ */ function() {
    function ObservableMap2(initialData, enhancer_, name_) {
      var _this = this;
      if (enhancer_ === void 0) {
        enhancer_ = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = true ? "ObservableMap@" + getNextId() : "ObservableMap";
      }
      this.enhancer_ = void 0;
      this.name_ = void 0;
      this[$mobx] = ObservableMapMarker;
      this.data_ = void 0;
      this.hasMap_ = void 0;
      this.keysAtom_ = void 0;
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = enhancer_;
      this.name_ = name_;
      if (!isFunction(Map)) {
        die(18);
      }
      initObservable(function() {
        _this.keysAtom_ = createAtom(true ? _this.name_ + ".keys()" : "ObservableMap.keys()");
        _this.data_ = /* @__PURE__ */ new Map();
        _this.hasMap_ = /* @__PURE__ */ new Map();
        if (initialData) {
          _this.merge(initialData);
        }
      });
    }
    var _proto = ObservableMap2.prototype;
    _proto.has_ = function has_(key) {
      return this.data_.has(key);
    };
    _proto.has = function has2(key) {
      var _this2 = this;
      if (!globalState.trackingDerivation) {
        return this.has_(key);
      }
      var entry = this.hasMap_.get(key);
      if (!entry) {
        var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, true ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableMap.key?", false);
        this.hasMap_.set(key, newEntry);
        onBecomeUnobserved(newEntry, function() {
          return _this2.hasMap_["delete"](key);
        });
      }
      return entry.get();
    };
    _proto.set = function set4(key, value) {
      var hasKey = this.has_(key);
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          type: hasKey ? UPDATE : ADD,
          object: this,
          newValue: value,
          name: key
        });
        if (!change2) {
          return this;
        }
        value = change2.newValue;
      }
      if (hasKey) {
        this.updateValue_(key, value);
      } else {
        this.addValue_(key, value);
      }
      return this;
    };
    _proto["delete"] = function _delete(key) {
      var _this3 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          type: DELETE,
          object: this,
          name: key
        });
        if (!change2) {
          return false;
        }
      }
      if (this.has_(key)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: this.data_.get(key).value_,
          name: key
        } : null;
        if (notifySpy) {
          spyReportStart(_change);
        }
        transaction(function() {
          var _this3$hasMap_$get;
          _this3.keysAtom_.reportChanged();
          (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? void 0 : _this3$hasMap_$get.setNewValue_(false);
          var observable2 = _this3.data_.get(key);
          observable2.setNewValue_(void 0);
          _this3.data_["delete"](key);
        });
        if (notify) {
          notifyListeners(this, _change);
        }
        if (notifySpy) {
          spyReportEnd();
        }
        return true;
      }
      return false;
    };
    _proto.updateValue_ = function updateValue_(key, newValue) {
      var observable2 = this.data_.get(key);
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change2 = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: UPDATE,
          object: this,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        if (notifySpy) {
          spyReportStart(change2);
        }
        observable2.setNewValue_(newValue);
        if (notify) {
          notifyListeners(this, change2);
        }
        if (notifySpy) {
          spyReportEnd();
        }
      }
    };
    _proto.addValue_ = function addValue_(key, newValue) {
      var _this4 = this;
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      transaction(function() {
        var _this4$hasMap_$get;
        var observable2 = new ObservableValue(newValue, _this4.enhancer_, true ? _this4.name_ + "." + stringifyKey(key) : "ObservableMap.key", false);
        _this4.data_.set(key, observable2);
        newValue = observable2.value_;
        (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null ? void 0 : _this4$hasMap_$get.setNewValue_(true);
        _this4.keysAtom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change2 = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        name: key,
        newValue
      } : null;
      if (notifySpy) {
        spyReportStart(change2);
      }
      if (notify) {
        notifyListeners(this, change2);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    };
    _proto.get = function get3(key) {
      if (this.has(key)) {
        return this.dehanceValue_(this.data_.get(key).get());
      }
      return this.dehanceValue_(void 0);
    };
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.keys = function keys() {
      this.keysAtom_.reportObserved();
      return this.data_.keys();
    };
    _proto.values = function values() {
      var self2 = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next = keys.next(), done = _keys$next.done, value = _keys$next.value;
          return {
            done,
            value: done ? void 0 : self2.get(value)
          };
        }
      });
    };
    _proto.entries = function entries() {
      var self2 = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next2 = keys.next(), done = _keys$next2.done, value = _keys$next2.value;
          return {
            done,
            value: done ? void 0 : [value, self2.get(value)]
          };
        }
      });
    };
    _proto[_Symbol$iterator] = function() {
      return this.entries();
    };
    _proto.forEach = function forEach(callback, thisArg) {
      for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done; ) {
        var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
        callback.call(thisArg, value, key, this);
      }
    };
    _proto.merge = function merge(other) {
      var _this5 = this;
      if (isObservableMap(other)) {
        other = new Map(other);
      }
      transaction(function() {
        if (isPlainObject(other)) {
          getPlainObjectKeys(other).forEach(function(key) {
            return _this5.set(key, other[key]);
          });
        } else if (Array.isArray(other)) {
          other.forEach(function(_ref) {
            var key = _ref[0], value = _ref[1];
            return _this5.set(key, value);
          });
        } else if (isES6Map(other)) {
          if (other.constructor !== Map) {
            die(19, other);
          }
          other.forEach(function(value, key) {
            return _this5.set(key, value);
          });
        } else if (other !== null && other !== void 0) {
          die(20, other);
        }
      });
      return this;
    };
    _proto.clear = function clear2() {
      var _this6 = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done; ) {
            var key = _step2.value;
            _this6["delete"](key);
          }
        });
      });
    };
    _proto.replace = function replace2(values) {
      var _this7 = this;
      transaction(function() {
        var replacementMap = convertToMap(values);
        var orderedData = /* @__PURE__ */ new Map();
        var keysReportChangedCalled = false;
        for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done; ) {
          var key = _step3.value;
          if (!replacementMap.has(key)) {
            var deleted = _this7["delete"](key);
            if (deleted) {
              keysReportChangedCalled = true;
            } else {
              var value = _this7.data_.get(key);
              orderedData.set(key, value);
            }
          }
        }
        for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done; ) {
          var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
          var keyExisted = _this7.data_.has(_key);
          _this7.set(_key, _value);
          if (_this7.data_.has(_key)) {
            var _value2 = _this7.data_.get(_key);
            orderedData.set(_key, _value2);
            if (!keyExisted) {
              keysReportChangedCalled = true;
            }
          }
        }
        if (!keysReportChangedCalled) {
          if (_this7.data_.size !== orderedData.size) {
            _this7.keysAtom_.reportChanged();
          } else {
            var iter1 = _this7.data_.keys();
            var iter2 = orderedData.keys();
            var next1 = iter1.next();
            var next2 = iter2.next();
            while (!next1.done) {
              if (next1.value !== next2.value) {
                _this7.keysAtom_.reportChanged();
                break;
              }
              next1 = iter1.next();
              next2 = iter2.next();
            }
          }
        }
        _this7.data_ = orderedData;
      });
      return this;
    };
    _proto.toString = function toString2() {
      return "[object ObservableMap]";
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === true) {
        die("`observe` doesn't support fireImmediately=true in combination with maps.");
      }
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _createClass(ObservableMap2, [{
      key: "size",
      get: function get3() {
        this.keysAtom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag,
      get: function get3() {
        return "Map";
      }
    }]);
    return ObservableMap2;
  }();
  var isObservableMap = /* @__PURE__ */ createInstanceofPredicate("ObservableMap", ObservableMap);
  function convertToMap(dataStructure) {
    if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
      return dataStructure;
    } else if (Array.isArray(dataStructure)) {
      return new Map(dataStructure);
    } else if (isPlainObject(dataStructure)) {
      var map2 = /* @__PURE__ */ new Map();
      for (var key in dataStructure) {
        map2.set(key, dataStructure[key]);
      }
      return map2;
    } else {
      return die(21, dataStructure);
    }
  }
  var _Symbol$iterator$1;
  var _Symbol$toStringTag$1;
  var ObservableSetMarker = {};
  _Symbol$iterator$1 = Symbol.iterator;
  _Symbol$toStringTag$1 = Symbol.toStringTag;
  var ObservableSet = /* @__PURE__ */ function() {
    function ObservableSet2(initialData, enhancer, name_) {
      var _this = this;
      if (enhancer === void 0) {
        enhancer = deepEnhancer;
      }
      if (name_ === void 0) {
        name_ = true ? "ObservableSet@" + getNextId() : "ObservableSet";
      }
      this.name_ = void 0;
      this[$mobx] = ObservableSetMarker;
      this.data_ = /* @__PURE__ */ new Set();
      this.atom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = void 0;
      this.name_ = name_;
      if (!isFunction(Set)) {
        die(22);
      }
      this.enhancer_ = function(newV, oldV) {
        return enhancer(newV, oldV, name_);
      };
      initObservable(function() {
        _this.atom_ = createAtom(_this.name_);
        if (initialData) {
          _this.replace(initialData);
        }
      });
    }
    var _proto = ObservableSet2.prototype;
    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== void 0) {
        return this.dehancer(value);
      }
      return value;
    };
    _proto.clear = function clear2() {
      var _this2 = this;
      transaction(function() {
        untracked(function() {
          for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done; ) {
            var value = _step.value;
            _this2["delete"](value);
          }
        });
      });
    };
    _proto.forEach = function forEach(callbackFn, thisArg) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done; ) {
        var value = _step2.value;
        callbackFn.call(thisArg, value, value, this);
      }
    };
    _proto.add = function add(value) {
      var _this3 = this;
      checkIfStateModificationsAreAllowed(this.atom_);
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          type: ADD,
          object: this,
          newValue: value
        });
        if (!change2) {
          return this;
        }
      }
      if (!this.has(value)) {
        transaction(function() {
          _this3.data_.add(_this3.enhancer_(value, void 0));
          _this3.atom_.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          newValue: value
        } : null;
        if (notifySpy && true) {
          spyReportStart(_change);
        }
        if (notify) {
          notifyListeners(this, _change);
        }
        if (notifySpy && true) {
          spyReportEnd();
        }
      }
      return this;
    };
    _proto["delete"] = function _delete(value) {
      var _this4 = this;
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          type: DELETE,
          object: this,
          oldValue: value
        });
        if (!change2) {
          return false;
        }
      }
      if (this.has(value)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var _change2 = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: value
        } : null;
        if (notifySpy && true) {
          spyReportStart(_change2);
        }
        transaction(function() {
          _this4.atom_.reportChanged();
          _this4.data_["delete"](value);
        });
        if (notify) {
          notifyListeners(this, _change2);
        }
        if (notifySpy && true) {
          spyReportEnd();
        }
        return true;
      }
      return false;
    };
    _proto.has = function has2(value) {
      this.atom_.reportObserved();
      return this.data_.has(this.dehanceValue_(value));
    };
    _proto.entries = function entries() {
      var nextIndex = 0;
      var keys = Array.from(this.keys());
      var values = Array.from(this.values());
      return makeIterable({
        next: function next() {
          var index = nextIndex;
          nextIndex += 1;
          return index < values.length ? {
            value: [keys[index], values[index]],
            done: false
          } : {
            done: true
          };
        }
      });
    };
    _proto.keys = function keys() {
      return this.values();
    };
    _proto.values = function values() {
      this.atom_.reportObserved();
      var self2 = this;
      var nextIndex = 0;
      var observableValues = Array.from(this.data_.values());
      return makeIterable({
        next: function next() {
          return nextIndex < observableValues.length ? {
            value: self2.dehanceValue_(observableValues[nextIndex++]),
            done: false
          } : {
            done: true
          };
        }
      });
    };
    _proto.replace = function replace2(other) {
      var _this5 = this;
      if (isObservableSet(other)) {
        other = new Set(other);
      }
      transaction(function() {
        if (Array.isArray(other)) {
          _this5.clear();
          other.forEach(function(value) {
            return _this5.add(value);
          });
        } else if (isES6Set(other)) {
          _this5.clear();
          other.forEach(function(value) {
            return _this5.add(value);
          });
        } else if (other !== null && other !== void 0) {
          die("Cannot initialize set from " + other);
        }
      });
      return this;
    };
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === true) {
        die("`observe` doesn't support fireImmediately=true in combination with sets.");
      }
      return registerListener(this, listener);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.toJSON = function toJSON2() {
      return Array.from(this);
    };
    _proto.toString = function toString2() {
      return "[object ObservableSet]";
    };
    _proto[_Symbol$iterator$1] = function() {
      return this.values();
    };
    _createClass(ObservableSet2, [{
      key: "size",
      get: function get3() {
        this.atom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag$1,
      get: function get3() {
        return "Set";
      }
    }]);
    return ObservableSet2;
  }();
  var isObservableSet = /* @__PURE__ */ createInstanceofPredicate("ObservableSet", ObservableSet);
  var descriptorCache = /* @__PURE__ */ Object.create(null);
  var REMOVE = "remove";
  var ObservableObjectAdministration = /* @__PURE__ */ function() {
    function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
      if (values_ === void 0) {
        values_ = /* @__PURE__ */ new Map();
      }
      if (defaultAnnotation_ === void 0) {
        defaultAnnotation_ = autoAnnotation;
      }
      this.target_ = void 0;
      this.values_ = void 0;
      this.name_ = void 0;
      this.defaultAnnotation_ = void 0;
      this.keysAtom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.proxy_ = void 0;
      this.isPlainObject_ = void 0;
      this.appliedAnnotations_ = void 0;
      this.pendingKeys_ = void 0;
      this.target_ = target_;
      this.values_ = values_;
      this.name_ = name_;
      this.defaultAnnotation_ = defaultAnnotation_;
      this.keysAtom_ = new Atom(true ? this.name_ + ".keys" : "ObservableObject.keys");
      this.isPlainObject_ = isPlainObject(this.target_);
      if (!isAnnotation(this.defaultAnnotation_)) {
        die("defaultAnnotation must be valid annotation");
      }
      if (true) {
        this.appliedAnnotations_ = {};
      }
    }
    var _proto = ObservableObjectAdministration2.prototype;
    _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
      return this.values_.get(key).get();
    };
    _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
      var observable2 = this.values_.get(key);
      if (observable2 instanceof ComputedValue) {
        observable2.set(newValue);
        return true;
      }
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_ || this.target_,
          name: key,
          newValue
        });
        if (!change2) {
          return null;
        }
        newValue = change2.newValue;
      }
      newValue = observable2.prepareNewValue_(newValue);
      if (newValue !== globalState.UNCHANGED) {
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var _change = notify || notifySpy ? {
          type: UPDATE,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          oldValue: observable2.value_,
          name: key,
          newValue
        } : null;
        if (notifySpy) {
          spyReportStart(_change);
        }
        observable2.setNewValue_(newValue);
        if (notify) {
          notifyListeners(this, _change);
        }
        if (notifySpy) {
          spyReportEnd();
        }
      }
      return true;
    };
    _proto.get_ = function get_(key) {
      if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
        this.has_(key);
      }
      return this.target_[key];
    };
    _proto.set_ = function set_(key, value, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (hasProp(this.target_, key)) {
        if (this.values_.has(key)) {
          return this.setObservablePropValue_(key, value);
        } else if (proxyTrap) {
          return Reflect.set(this.target_, key, value);
        } else {
          this.target_[key] = value;
          return true;
        }
      } else {
        return this.extend_(key, {
          value,
          enumerable: true,
          writable: true,
          configurable: true
        }, this.defaultAnnotation_, proxyTrap);
      }
    };
    _proto.has_ = function has_(key) {
      if (!globalState.trackingDerivation) {
        return key in this.target_;
      }
      this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
      var entry = this.pendingKeys_.get(key);
      if (!entry) {
        entry = new ObservableValue(key in this.target_, referenceEnhancer, true ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableObject.key?", false);
        this.pendingKeys_.set(key, entry);
      }
      return entry.get();
    };
    _proto.make_ = function make_(key, annotation) {
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return;
      }
      assertAnnotable(this, annotation, key);
      if (!(key in this.target_)) {
        var _this$target_$storedA;
        if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
          return;
        } else {
          die(1, annotation.annotationType_, this.name_ + "." + key.toString());
        }
      }
      var source = this.target_;
      while (source && source !== objectPrototype) {
        var descriptor = getDescriptor(source, key);
        if (descriptor) {
          var outcome = annotation.make_(this, key, descriptor, source);
          if (outcome === 0) {
            return;
          }
          if (outcome === 1) {
            break;
          }
        }
        source = Object.getPrototypeOf(source);
      }
      recordAnnotationApplied(this, annotation, key);
    };
    _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }
      if (annotation === false) {
        return this.defineProperty_(key, descriptor, proxyTrap);
      }
      assertAnnotable(this, annotation, key);
      var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
      if (outcome) {
        recordAnnotationApplied(this, annotation, key);
      }
      return outcome;
    };
    _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change2 = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: descriptor.value
          });
          if (!change2) {
            return null;
          }
          var newValue = change2.newValue;
          if (descriptor.value !== newValue) {
            descriptor = _extends({}, descriptor, {
              value: newValue
            });
          }
        }
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.notifyPropertyAddition_(key, descriptor.value);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change2 = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: value
          });
          if (!change2) {
            return null;
          }
          value = change2.newValue;
        }
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: true,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        var observable2 = new ObservableValue(value, enhancer, true ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
        this.values_.set(key, observable2);
        this.notifyPropertyAddition_(key, observable2.value_);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      try {
        startBatch();
        var deleteOutcome = this.delete_(key);
        if (!deleteOutcome) {
          return deleteOutcome;
        }
        if (hasInterceptors(this)) {
          var change2 = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: void 0
          });
          if (!change2) {
            return null;
          }
        }
        options.name || (options.name = true ? this.name_ + "." + key.toString() : "ObservableObject.key");
        options.context = this.proxy_ || this.target_;
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: false,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };
        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }
        this.values_.set(key, new ComputedValue(options));
        this.notifyPropertyAddition_(key, void 0);
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.delete_ = function delete_(key, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }
      checkIfStateModificationsAreAllowed(this.keysAtom_);
      if (!hasProp(this.target_, key)) {
        return true;
      }
      if (hasInterceptors(this)) {
        var change2 = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: REMOVE
        });
        if (!change2) {
          return null;
        }
      }
      try {
        var _this$pendingKeys_, _this$pendingKeys_$ge;
        startBatch();
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var observable2 = this.values_.get(key);
        var value = void 0;
        if (!observable2 && (notify || notifySpy)) {
          var _getDescriptor2;
          value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor2.value;
        }
        if (proxyTrap) {
          if (!Reflect.deleteProperty(this.target_, key)) {
            return false;
          }
        } else {
          delete this.target_[key];
        }
        if (true) {
          delete this.appliedAnnotations_[key];
        }
        if (observable2) {
          this.values_["delete"](key);
          if (observable2 instanceof ObservableValue) {
            value = observable2.value_;
          }
          propagateChanged(observable2);
        }
        this.keysAtom_.reportChanged();
        (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_);
        if (notify || notifySpy) {
          var _change2 = {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || this.target_,
            debugObjectName: this.name_,
            oldValue: value,
            name: key
          };
          if (notifySpy) {
            spyReportStart(_change2);
          }
          if (notify) {
            notifyListeners(this, _change2);
          }
          if (notifySpy) {
            spyReportEnd();
          }
        }
      } finally {
        endBatch();
      }
      return true;
    };
    _proto.observe_ = function observe_(callback, fireImmediately) {
      if (fireImmediately === true) {
        die("`observe` doesn't support the fire immediately property for observable objects.");
      }
      return registerListener(this, callback);
    };
    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };
    _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
      var _this$pendingKeys_2, _this$pendingKeys_2$g;
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      if (notify || notifySpy) {
        var change2 = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: value
        } : null;
        if (notifySpy) {
          spyReportStart(change2);
        }
        if (notify) {
          notifyListeners(this, change2);
        }
        if (notifySpy) {
          spyReportEnd();
        }
      }
      (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true);
      this.keysAtom_.reportChanged();
    };
    _proto.ownKeys_ = function ownKeys_() {
      this.keysAtom_.reportObserved();
      return ownKeys(this.target_);
    };
    _proto.keys_ = function keys_() {
      this.keysAtom_.reportObserved();
      return Object.keys(this.target_);
    };
    return ObservableObjectAdministration2;
  }();
  function asObservableObject(target, options) {
    var _options$name;
    if (options && isObservableObject(target)) {
      die("Options can't be provided for already observable objects.");
    }
    if (hasProp(target, $mobx)) {
      if (!(getAdministration(target) instanceof ObservableObjectAdministration)) {
        die("Cannot convert '" + getDebugName(target) + "' into observable object:\nThe target is already observable of different type.\nExtending builtins is not supported.");
      }
      return target;
    }
    if (!Object.isExtensible(target)) {
      die("Cannot make the designated object observable; it is not extensible");
    }
    var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : true ? (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId() : "ObservableObject";
    var adm = new ObservableObjectAdministration(target, /* @__PURE__ */ new Map(), String(name), getAnnotationFromOptions(options));
    addHiddenProp(target, $mobx, adm);
    return target;
  }
  var isObservableObjectAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
  function getCachedObservablePropDescriptor(key) {
    return descriptorCache[key] || (descriptorCache[key] = {
      get: function get3() {
        return this[$mobx].getObservablePropValue_(key);
      },
      set: function set4(value) {
        return this[$mobx].setObservablePropValue_(key, value);
      }
    });
  }
  function isObservableObject(thing) {
    if (isObject(thing)) {
      return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
  }
  function recordAnnotationApplied(adm, annotation, key) {
    var _adm$target_$storedAn;
    if (true) {
      adm.appliedAnnotations_[key] = annotation;
    }
    (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
  }
  function assertAnnotable(adm, annotation, key) {
    if (!isAnnotation(annotation)) {
      die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
    }
    if (!isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
      var fieldName = adm.name_ + "." + key.toString();
      var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed.\nUse 'override' annotation for methods overridden by subclass.");
    }
  }
  var ENTRY_0 = /* @__PURE__ */ createArrayEntryDescriptor(0);
  var safariPrototypeSetterInheritanceBug = /* @__PURE__ */ function() {
    var v6 = false;
    var p7 = {};
    Object.defineProperty(p7, "0", {
      set: function set4() {
        v6 = true;
      }
    });
    Object.create(p7)["0"] = 1;
    return v6 === false;
  }();
  var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
  var StubArray = function StubArray2() {
  };
  function inherit(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== void 0) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }
  inherit(StubArray, Array.prototype);
  var LegacyObservableArray = /* @__PURE__ */ function(_StubArray, _Symbol$toStringTag2, _Symbol$iterator2) {
    _inheritsLoose(LegacyObservableArray2, _StubArray);
    function LegacyObservableArray2(initialValues, enhancer, name, owned) {
      var _this;
      if (name === void 0) {
        name = true ? "ObservableArray@" + getNextId() : "ObservableArray";
      }
      if (owned === void 0) {
        owned = false;
      }
      _this = _StubArray.call(this) || this;
      initObservable(function() {
        var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
        adm.proxy_ = _assertThisInitialized(_this);
        addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);
        if (initialValues && initialValues.length) {
          _this.spliceWithArray(0, 0, initialValues);
        }
        if (safariPrototypeSetterInheritanceBug) {
          Object.defineProperty(_assertThisInitialized(_this), "0", ENTRY_0);
        }
      });
      return _this;
    }
    var _proto = LegacyObservableArray2.prototype;
    _proto.concat = function concat() {
      this[$mobx].atom_.reportObserved();
      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }
      return Array.prototype.concat.apply(
        this.slice(),
        //@ts-ignore
        arrays.map(function(a11) {
          return isObservableArray(a11) ? a11.slice() : a11;
        })
      );
    };
    _proto[_Symbol$iterator2] = function() {
      var self2 = this;
      var nextIndex = 0;
      return makeIterable({
        next: function next() {
          return nextIndex < self2.length ? {
            value: self2[nextIndex++],
            done: false
          } : {
            done: true,
            value: void 0
          };
        }
      });
    };
    _createClass(LegacyObservableArray2, [{
      key: "length",
      get: function get3() {
        return this[$mobx].getArrayLength_();
      },
      set: function set4(newLength) {
        this[$mobx].setArrayLength_(newLength);
      }
    }, {
      key: _Symbol$toStringTag2,
      get: function get3() {
        return "Array";
      }
    }]);
    return LegacyObservableArray2;
  }(StubArray, Symbol.toStringTag, Symbol.iterator);
  Object.entries(arrayExtensions).forEach(function(_ref) {
    var prop = _ref[0], fn2 = _ref[1];
    if (prop !== "concat") {
      addHiddenProp(LegacyObservableArray.prototype, prop, fn2);
    }
  });
  function createArrayEntryDescriptor(index) {
    return {
      enumerable: false,
      configurable: true,
      get: function get3() {
        return this[$mobx].get_(index);
      },
      set: function set4(value) {
        this[$mobx].set_(index, value);
      }
    };
  }
  function createArrayBufferItem(index) {
    defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
  }
  function reserveArrayBuffer(max) {
    if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
      for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
        createArrayBufferItem(index);
      }
      OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
  }
  reserveArrayBuffer(1e3);
  function createLegacyArray(initialValues, enhancer, name) {
    return new LegacyObservableArray(initialValues, enhancer, name);
  }
  function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray(thing)) {
        if (property !== void 0) {
          die(23);
        }
        return thing[$mobx].atom_;
      }
      if (isObservableSet(thing)) {
        return thing.atom_;
      }
      if (isObservableMap(thing)) {
        if (property === void 0) {
          return thing.keysAtom_;
        }
        var observable2 = thing.data_.get(property) || thing.hasMap_.get(property);
        if (!observable2) {
          die(25, property, getDebugName(thing));
        }
        return observable2;
      }
      if (isObservableObject(thing)) {
        if (!property) {
          return die(26);
        }
        var _observable = thing[$mobx].values_.get(property);
        if (!_observable) {
          die(27, property, getDebugName(thing));
        }
        return _observable;
      }
      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }
    } else if (isFunction(thing)) {
      if (isReaction(thing[$mobx])) {
        return thing[$mobx];
      }
    }
    die(28);
  }
  function getAdministration(thing, property) {
    if (!thing) {
      die(29);
    }
    if (property !== void 0) {
      return getAdministration(getAtom(thing, property));
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
    if (isObservableMap(thing) || isObservableSet(thing)) {
      return thing;
    }
    if (thing[$mobx]) {
      return thing[$mobx];
    }
    die(24, thing);
  }
  function getDebugName(thing, property) {
    var named;
    if (property !== void 0) {
      named = getAtom(thing, property);
    } else if (isAction(thing)) {
      return thing.name;
    } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
      named = getAdministration(thing);
    } else {
      named = getAtom(thing);
    }
    return named.name_;
  }
  function initObservable(cb) {
    var derivation = untrackedStart();
    var allowStateChanges = allowStateChangesStart(true);
    startBatch();
    try {
      return cb();
    } finally {
      endBatch();
      allowStateChangesEnd(allowStateChanges);
      untrackedEnd(derivation);
    }
  }
  var toString = objectPrototype.toString;
  function deepEqual(a11, b7, depth) {
    if (depth === void 0) {
      depth = -1;
    }
    return eq(a11, b7, depth);
  }
  function eq(a11, b7, depth, aStack, bStack) {
    if (a11 === b7) {
      return a11 !== 0 || 1 / a11 === 1 / b7;
    }
    if (a11 == null || b7 == null) {
      return false;
    }
    if (a11 !== a11) {
      return b7 !== b7;
    }
    var type = typeof a11;
    if (type !== "function" && type !== "object" && typeof b7 != "object") {
      return false;
    }
    var className = toString.call(a11);
    if (className !== toString.call(b7)) {
      return false;
    }
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a11 === "" + b7;
      case "[object Number]":
        if (+a11 !== +a11) {
          return +b7 !== +b7;
        }
        return +a11 === 0 ? 1 / +a11 === 1 / b7 : +a11 === +b7;
      case "[object Date]":
      case "[object Boolean]":
        return +a11 === +b7;
      case "[object Symbol]":
        return typeof Symbol !== "undefined" && Symbol.valueOf.call(a11) === Symbol.valueOf.call(b7);
      case "[object Map]":
      case "[object Set]":
        if (depth >= 0) {
          depth++;
        }
        break;
    }
    a11 = unwrap(a11);
    b7 = unwrap(b7);
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a11 != "object" || typeof b7 != "object") {
        return false;
      }
      var aCtor = a11.constructor, bCtor = b7.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a11 && "constructor" in b7) {
        return false;
      }
    }
    if (depth === 0) {
      return false;
    } else if (depth < 0) {
      depth = -1;
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a11) {
        return bStack[length] === b7;
      }
    }
    aStack.push(a11);
    bStack.push(b7);
    if (areArrays) {
      length = a11.length;
      if (length !== b7.length) {
        return false;
      }
      while (length--) {
        if (!eq(a11[length], b7[length], depth - 1, aStack, bStack)) {
          return false;
        }
      }
    } else {
      var keys = Object.keys(a11);
      var key;
      length = keys.length;
      if (Object.keys(b7).length !== length) {
        return false;
      }
      while (length--) {
        key = keys[length];
        if (!(hasProp(b7, key) && eq(a11[key], b7[key], depth - 1, aStack, bStack))) {
          return false;
        }
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  }
  function unwrap(a11) {
    if (isObservableArray(a11)) {
      return a11.slice();
    }
    if (isES6Map(a11) || isObservableMap(a11)) {
      return Array.from(a11.entries());
    }
    if (isES6Set(a11) || isObservableSet(a11)) {
      return Array.from(a11.entries());
    }
    return a11;
  }
  function makeIterable(iterator) {
    iterator[Symbol.iterator] = getSelf;
    return iterator;
  }
  function getSelf() {
    return this;
  }
  function isAnnotation(thing) {
    return (
      // Can be function
      thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction(thing.make_) && isFunction(thing.extend_)
    );
  }
  ["Symbol", "Map", "Set"].forEach(function(m6) {
    var g6 = getGlobal();
    if (typeof g6[m6] === "undefined") {
      die("MobX requires global '" + m6 + "' to be available or polyfilled");
    }
  });
  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy,
      extras: {
        getDebugName
      },
      $mobx
    });
  }

  // node_modules/@adobe/lit-mobx/lib/mixin.js
  function MobxReactionUpdate(constructor) {
    return MobxReactionUpdateCustom(constructor, Reaction);
  }

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t17, e33, o29) {
      if (this._$cssResult$ = true, o29 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t17, this.t = e33;
    }
    get styleSheet() {
      let t17 = this.o;
      const s20 = this.t;
      if (e && void 0 === t17) {
        const e33 = void 0 !== s20 && 1 === s20.length;
        e33 && (t17 = o.get(s20)), void 0 === t17 && ((this.o = t17 = new CSSStyleSheet()).replaceSync(this.cssText), e33 && o.set(s20, t17));
      }
      return t17;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t17) => new n("string" == typeof t17 ? t17 : t17 + "", void 0, s);
  var i = (t17, ...e33) => {
    const o29 = 1 === t17.length ? t17[0] : e33.reduce((e34, s20, o30) => e34 + ((t18) => {
      if (true === t18._$cssResult$)
        return t18.cssText;
      if ("number" == typeof t18)
        return t18;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t18 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s20) + t17[o30 + 1], t17[0]);
    return new n(o29, t17, s);
  };
  var S = (s20, o29) => {
    if (e)
      s20.adoptedStyleSheets = o29.map((t17) => t17 instanceof CSSStyleSheet ? t17 : t17.styleSheet);
    else
      for (const e33 of o29) {
        const o30 = document.createElement("style"), n31 = t.litNonce;
        void 0 !== n31 && o30.setAttribute("nonce", n31), o30.textContent = e33.cssText, s20.appendChild(o30);
      }
  };
  var c = e ? (t17) => t17 : (t17) => t17 instanceof CSSStyleSheet ? ((t18) => {
    let e33 = "";
    for (const s20 of t18.cssRules)
      e33 += s20.cssText;
    return r(e33);
  })(t17) : t17;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i3, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t17, s20) => t17;
  var u = { toAttribute(t17, s20) {
    switch (s20) {
      case Boolean:
        t17 = t17 ? l : null;
        break;
      case Object:
      case Array:
        t17 = null == t17 ? t17 : JSON.stringify(t17);
    }
    return t17;
  }, fromAttribute(t17, s20) {
    let i23 = t17;
    switch (s20) {
      case Boolean:
        i23 = null !== t17;
        break;
      case Number:
        i23 = null === t17 ? null : Number(t17);
        break;
      case Object:
      case Array:
        try {
          i23 = JSON.parse(t17);
        } catch (t18) {
          i23 = null;
        }
    }
    return i23;
  } };
  var f = (t17, s20) => !i3(t17, s20);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t17) {
      this._$Ei(), (this.l ??= []).push(t17);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t17, s20 = y) {
      if (s20.state && (s20.attribute = false), this._$Ei(), this.elementProperties.set(t17, s20), !s20.noAccessor) {
        const i23 = Symbol(), r18 = this.getPropertyDescriptor(t17, i23, s20);
        void 0 !== r18 && e2(this.prototype, t17, r18);
      }
    }
    static getPropertyDescriptor(t17, s20, i23) {
      const { get: e33, set: h11 } = r2(this.prototype, t17) ?? { get() {
        return this[s20];
      }, set(t18) {
        this[s20] = t18;
      } };
      return { get() {
        return e33?.call(this);
      }, set(s21) {
        const r18 = e33?.call(this);
        h11.call(this, s21), this.requestUpdate(t17, r18, i23);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t17) {
      return this.elementProperties.get(t17) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t17 = n2(this);
      t17.finalize(), void 0 !== t17.l && (this.l = [...t17.l]), this.elementProperties = new Map(t17.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t18 = this.properties, s20 = [...h(t18), ...o2(t18)];
        for (const i23 of s20)
          this.createProperty(i23, t18[i23]);
      }
      const t17 = this[Symbol.metadata];
      if (null !== t17) {
        const s20 = litPropertyMetadata.get(t17);
        if (void 0 !== s20)
          for (const [t18, i23] of s20)
            this.elementProperties.set(t18, i23);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t18, s20] of this.elementProperties) {
        const i23 = this._$Eu(t18, s20);
        void 0 !== i23 && this._$Eh.set(i23, t18);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s20) {
      const i23 = [];
      if (Array.isArray(s20)) {
        const e33 = new Set(s20.flat(1 / 0).reverse());
        for (const s21 of e33)
          i23.unshift(c(s21));
      } else
        void 0 !== s20 && i23.push(c(s20));
      return i23;
    }
    static _$Eu(t17, s20) {
      const i23 = s20.attribute;
      return false === i23 ? void 0 : "string" == typeof i23 ? i23 : "string" == typeof t17 ? t17.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t17) => this.enableUpdating = t17), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t17) => t17(this));
    }
    addController(t17) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t17), void 0 !== this.renderRoot && this.isConnected && t17.hostConnected?.();
    }
    removeController(t17) {
      this._$EO?.delete(t17);
    }
    _$E_() {
      const t17 = /* @__PURE__ */ new Map(), s20 = this.constructor.elementProperties;
      for (const i23 of s20.keys())
        this.hasOwnProperty(i23) && (t17.set(i23, this[i23]), delete this[i23]);
      t17.size > 0 && (this._$Ep = t17);
    }
    createRenderRoot() {
      const t17 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t17, this.constructor.elementStyles), t17;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t17) => t17.hostConnected?.());
    }
    enableUpdating(t17) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t17) => t17.hostDisconnected?.());
    }
    attributeChangedCallback(t17, s20, i23) {
      this._$AK(t17, i23);
    }
    _$EC(t17, s20) {
      const i23 = this.constructor.elementProperties.get(t17), e33 = this.constructor._$Eu(t17, i23);
      if (void 0 !== e33 && true === i23.reflect) {
        const r18 = (void 0 !== i23.converter?.toAttribute ? i23.converter : u).toAttribute(s20, i23.type);
        this._$Em = t17, null == r18 ? this.removeAttribute(e33) : this.setAttribute(e33, r18), this._$Em = null;
      }
    }
    _$AK(t17, s20) {
      const i23 = this.constructor, e33 = i23._$Eh.get(t17);
      if (void 0 !== e33 && this._$Em !== e33) {
        const t18 = i23.getPropertyOptions(e33), r18 = "function" == typeof t18.converter ? { fromAttribute: t18.converter } : void 0 !== t18.converter?.fromAttribute ? t18.converter : u;
        this._$Em = e33, this[e33] = r18.fromAttribute(s20, t18.type), this._$Em = null;
      }
    }
    requestUpdate(t17, s20, i23) {
      if (void 0 !== t17) {
        if (i23 ??= this.constructor.getPropertyOptions(t17), !(i23.hasChanged ?? f)(this[t17], s20))
          return;
        this.P(t17, s20, i23);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t17, s20, i23) {
      this._$AL.has(t17) || this._$AL.set(t17, s20), true === i23.reflect && this._$Em !== t17 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t17);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t18) {
        Promise.reject(t18);
      }
      const t17 = this.scheduleUpdate();
      return null != t17 && await t17, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t19, s21] of this._$Ep)
            this[t19] = s21;
          this._$Ep = void 0;
        }
        const t18 = this.constructor.elementProperties;
        if (t18.size > 0)
          for (const [s21, i23] of t18)
            true !== i23.wrapped || this._$AL.has(s21) || void 0 === this[s21] || this.P(s21, this[s21], i23);
      }
      let t17 = false;
      const s20 = this._$AL;
      try {
        t17 = this.shouldUpdate(s20), t17 ? (this.willUpdate(s20), this._$EO?.forEach((t18) => t18.hostUpdate?.()), this.update(s20)) : this._$EU();
      } catch (s21) {
        throw t17 = false, this._$EU(), s21;
      }
      t17 && this._$AE(s20);
    }
    willUpdate(t17) {
    }
    _$AE(t17) {
      this._$EO?.forEach((t18) => t18.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t17)), this.updated(t17);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t17) {
      return true;
    }
    update(t17) {
      this._$Ej &&= this._$Ej.forEach((t18) => this._$EC(t18, this[t18])), this._$EU();
    }
    updated(t17) {
    }
    firstUpdated(t17) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i4 = t2.trustedTypes;
  var s2 = i4 ? i4.createPolicy("lit-html", { createHTML: (t17) => t17 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t17) => null === t17 || "object" != typeof t17 && "function" != typeof t17;
  var a2 = Array.isArray;
  var u2 = (t17) => a2(t17) || "function" == typeof t17?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _14 = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t17) => (i23, ...s20) => ({ _$litType$: t17, strings: i23, values: s20 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t17, i23) {
    if (!Array.isArray(t17) || !t17.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i23) : i23;
  }
  var P = (t17, i23) => {
    const s20 = t17.length - 1, o29 = [];
    let r18, l20 = 2 === i23 ? "<svg>" : "", c12 = f2;
    for (let i24 = 0; i24 < s20; i24++) {
      const s21 = t17[i24];
      let a11, u11, d11 = -1, y7 = 0;
      for (; y7 < s21.length && (c12.lastIndex = y7, u11 = c12.exec(s21), null !== u11); )
        y7 = c12.lastIndex, c12 === f2 ? "!--" === u11[1] ? c12 = v : void 0 !== u11[1] ? c12 = _14 : void 0 !== u11[2] ? ($.test(u11[2]) && (r18 = RegExp("</" + u11[2], "g")), c12 = m) : void 0 !== u11[3] && (c12 = m) : c12 === m ? ">" === u11[0] ? (c12 = r18 ?? f2, d11 = -1) : void 0 === u11[1] ? d11 = -2 : (d11 = c12.lastIndex - u11[2].length, a11 = u11[1], c12 = void 0 === u11[3] ? m : '"' === u11[3] ? g : p2) : c12 === g || c12 === p2 ? c12 = m : c12 === v || c12 === _14 ? c12 = f2 : (c12 = m, r18 = void 0);
      const x6 = c12 === m && t17[i24 + 1].startsWith("/>") ? " " : "";
      l20 += c12 === f2 ? s21 + n3 : d11 >= 0 ? (o29.push(a11), s21.slice(0, d11) + e3 + s21.slice(d11) + h2 + x6) : s21 + h2 + (-2 === d11 ? i24 : x6);
    }
    return [C(t17, l20 + (t17[s20] || "<?>") + (2 === i23 ? "</svg>" : "")), o29];
  };
  var V = class _V {
    constructor({ strings: t17, _$litType$: s20 }, n31) {
      let r18;
      this.parts = [];
      let c12 = 0, a11 = 0;
      const u11 = t17.length - 1, d11 = this.parts, [f7, v6] = P(t17, s20);
      if (this.el = _V.createElement(f7, n31), E.currentNode = this.el.content, 2 === s20) {
        const t18 = this.el.content.firstChild;
        t18.replaceWith(...t18.childNodes);
      }
      for (; null !== (r18 = E.nextNode()) && d11.length < u11; ) {
        if (1 === r18.nodeType) {
          if (r18.hasAttributes())
            for (const t18 of r18.getAttributeNames())
              if (t18.endsWith(e3)) {
                const i23 = v6[a11++], s21 = r18.getAttribute(t18).split(h2), e33 = /([.?@])?(.*)/.exec(i23);
                d11.push({ type: 1, index: c12, name: e33[2], strings: s21, ctor: "." === e33[1] ? k3 : "?" === e33[1] ? H : "@" === e33[1] ? I : R }), r18.removeAttribute(t18);
              } else
                t18.startsWith(h2) && (d11.push({ type: 6, index: c12 }), r18.removeAttribute(t18));
          if ($.test(r18.tagName)) {
            const t18 = r18.textContent.split(h2), s21 = t18.length - 1;
            if (s21 > 0) {
              r18.textContent = i4 ? i4.emptyScript : "";
              for (let i23 = 0; i23 < s21; i23++)
                r18.append(t18[i23], l2()), E.nextNode(), d11.push({ type: 2, index: ++c12 });
              r18.append(t18[s21], l2());
            }
          }
        } else if (8 === r18.nodeType)
          if (r18.data === o3)
            d11.push({ type: 2, index: c12 });
          else {
            let t18 = -1;
            for (; -1 !== (t18 = r18.data.indexOf(h2, t18 + 1)); )
              d11.push({ type: 7, index: c12 }), t18 += h2.length - 1;
          }
        c12++;
      }
    }
    static createElement(t17, i23) {
      const s20 = r3.createElement("template");
      return s20.innerHTML = t17, s20;
    }
  };
  function N(t17, i23, s20 = t17, e33) {
    if (i23 === w)
      return i23;
    let h11 = void 0 !== e33 ? s20._$Co?.[e33] : s20._$Cl;
    const o29 = c3(i23) ? void 0 : i23._$litDirective$;
    return h11?.constructor !== o29 && (h11?._$AO?.(false), void 0 === o29 ? h11 = void 0 : (h11 = new o29(t17), h11._$AT(t17, s20, e33)), void 0 !== e33 ? (s20._$Co ??= [])[e33] = h11 : s20._$Cl = h11), void 0 !== h11 && (i23 = N(t17, h11._$AS(t17, i23.values), h11, e33)), i23;
  }
  var S2 = class {
    constructor(t17, i23) {
      this._$AV = [], this._$AN = void 0, this._$AD = t17, this._$AM = i23;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t17) {
      const { el: { content: i23 }, parts: s20 } = this._$AD, e33 = (t17?.creationScope ?? r3).importNode(i23, true);
      E.currentNode = e33;
      let h11 = E.nextNode(), o29 = 0, n31 = 0, l20 = s20[0];
      for (; void 0 !== l20; ) {
        if (o29 === l20.index) {
          let i24;
          2 === l20.type ? i24 = new M(h11, h11.nextSibling, this, t17) : 1 === l20.type ? i24 = new l20.ctor(h11, l20.name, l20.strings, this, t17) : 6 === l20.type && (i24 = new L(h11, this, t17)), this._$AV.push(i24), l20 = s20[++n31];
        }
        o29 !== l20?.index && (h11 = E.nextNode(), o29++);
      }
      return E.currentNode = r3, e33;
    }
    p(t17) {
      let i23 = 0;
      for (const s20 of this._$AV)
        void 0 !== s20 && (void 0 !== s20.strings ? (s20._$AI(t17, s20, i23), i23 += s20.strings.length - 2) : s20._$AI(t17[i23])), i23++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t17, i23, s20, e33) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t17, this._$AB = i23, this._$AM = s20, this.options = e33, this._$Cv = e33?.isConnected ?? true;
    }
    get parentNode() {
      let t17 = this._$AA.parentNode;
      const i23 = this._$AM;
      return void 0 !== i23 && 11 === t17?.nodeType && (t17 = i23.parentNode), t17;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t17, i23 = this) {
      t17 = N(this, t17, i23), c3(t17) ? t17 === T || null == t17 || "" === t17 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t17 !== this._$AH && t17 !== w && this._(t17) : void 0 !== t17._$litType$ ? this.$(t17) : void 0 !== t17.nodeType ? this.T(t17) : u2(t17) ? this.k(t17) : this._(t17);
    }
    S(t17) {
      return this._$AA.parentNode.insertBefore(t17, this._$AB);
    }
    T(t17) {
      this._$AH !== t17 && (this._$AR(), this._$AH = this.S(t17));
    }
    _(t17) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t17 : this.T(r3.createTextNode(t17)), this._$AH = t17;
    }
    $(t17) {
      const { values: i23, _$litType$: s20 } = t17, e33 = "number" == typeof s20 ? this._$AC(t17) : (void 0 === s20.el && (s20.el = V.createElement(C(s20.h, s20.h[0]), this.options)), s20);
      if (this._$AH?._$AD === e33)
        this._$AH.p(i23);
      else {
        const t18 = new S2(e33, this), s21 = t18.u(this.options);
        t18.p(i23), this.T(s21), this._$AH = t18;
      }
    }
    _$AC(t17) {
      let i23 = A.get(t17.strings);
      return void 0 === i23 && A.set(t17.strings, i23 = new V(t17)), i23;
    }
    k(t17) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i23 = this._$AH;
      let s20, e33 = 0;
      for (const h11 of t17)
        e33 === i23.length ? i23.push(s20 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s20 = i23[e33], s20._$AI(h11), e33++;
      e33 < i23.length && (this._$AR(s20 && s20._$AB.nextSibling, e33), i23.length = e33);
    }
    _$AR(t17 = this._$AA.nextSibling, i23) {
      for (this._$AP?.(false, true, i23); t17 && t17 !== this._$AB; ) {
        const i24 = t17.nextSibling;
        t17.remove(), t17 = i24;
      }
    }
    setConnected(t17) {
      void 0 === this._$AM && (this._$Cv = t17, this._$AP?.(t17));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t17, i23, s20, e33, h11) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t17, this.name = i23, this._$AM = e33, this.options = h11, s20.length > 2 || "" !== s20[0] || "" !== s20[1] ? (this._$AH = Array(s20.length - 1).fill(new String()), this.strings = s20) : this._$AH = T;
    }
    _$AI(t17, i23 = this, s20, e33) {
      const h11 = this.strings;
      let o29 = false;
      if (void 0 === h11)
        t17 = N(this, t17, i23, 0), o29 = !c3(t17) || t17 !== this._$AH && t17 !== w, o29 && (this._$AH = t17);
      else {
        const e34 = t17;
        let n31, r18;
        for (t17 = h11[0], n31 = 0; n31 < h11.length - 1; n31++)
          r18 = N(this, e34[s20 + n31], i23, n31), r18 === w && (r18 = this._$AH[n31]), o29 ||= !c3(r18) || r18 !== this._$AH[n31], r18 === T ? t17 = T : t17 !== T && (t17 += (r18 ?? "") + h11[n31 + 1]), this._$AH[n31] = r18;
      }
      o29 && !e33 && this.j(t17);
    }
    j(t17) {
      t17 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t17 ?? "");
    }
  };
  var k3 = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t17) {
      this.element[this.name] = t17 === T ? void 0 : t17;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t17) {
      this.element.toggleAttribute(this.name, !!t17 && t17 !== T);
    }
  };
  var I = class extends R {
    constructor(t17, i23, s20, e33, h11) {
      super(t17, i23, s20, e33, h11), this.type = 5;
    }
    _$AI(t17, i23 = this) {
      if ((t17 = N(this, t17, i23, 0) ?? T) === w)
        return;
      const s20 = this._$AH, e33 = t17 === T && s20 !== T || t17.capture !== s20.capture || t17.once !== s20.once || t17.passive !== s20.passive, h11 = t17 !== T && (s20 === T || e33);
      e33 && this.element.removeEventListener(this.name, this, s20), h11 && this.element.addEventListener(this.name, this, t17), this._$AH = t17;
    }
    handleEvent(t17) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t17) : this._$AH.handleEvent(t17);
    }
  };
  var L = class {
    constructor(t17, i23, s20) {
      this.element = t17, this.type = 6, this._$AN = void 0, this._$AM = i23, this.options = s20;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17) {
      N(this, t17);
    }
  };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.3");
  var j = (t17, i23, s20) => {
    const e33 = s20?.renderBefore ?? i23;
    let h11 = e33._$litPart$;
    if (void 0 === h11) {
      const t18 = s20?.renderBefore ?? null;
      e33._$litPart$ = h11 = new M(i23.insertBefore(l2(), t18), t18, void 0, s20 ?? {});
    }
    return h11._$AI(t17), h11;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t17 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t17.firstChild, t17;
    }
    update(t17) {
      const i23 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t17), this._$Do = j(i23, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.5");

  // node_modules/@adobe/lit-mobx/lit-mobx.js
  var MobxLitElement = class extends MobxReactionUpdate(s3) {
  };

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t17) => (e33, o29) => {
    void 0 !== o29 ? o29.addInitializer(() => {
      customElements.define(t17, e33);
    }) : customElements.define(t17, e33);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o4 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r5 = (t17 = o4, e33, r18) => {
    const { kind: n31, metadata: i23 } = r18;
    let s20 = globalThis.litPropertyMetadata.get(i23);
    if (void 0 === s20 && globalThis.litPropertyMetadata.set(i23, s20 = /* @__PURE__ */ new Map()), s20.set(r18.name, t17), "accessor" === n31) {
      const { name: o29 } = r18;
      return { set(r19) {
        const n32 = e33.get.call(this);
        e33.set.call(this, r19), this.requestUpdate(o29, n32, t17);
      }, init(e34) {
        return void 0 !== e34 && this.P(o29, void 0, t17), e34;
      } };
    }
    if ("setter" === n31) {
      const { name: o29 } = r18;
      return function(r19) {
        const n32 = this[o29];
        e33.call(this, r19), this.requestUpdate(o29, n32, t17);
      };
    }
    throw Error("Unsupported decorator location: " + n31);
  };
  function n4(t17) {
    return (e33, o29) => "object" == typeof o29 ? r5(t17, e33, o29) : ((t18, e34, o30) => {
      const r18 = e34.hasOwnProperty(o30);
      return e34.constructor.createProperty(o30, r18 ? { ...t18, wrapped: true } : t18), r18 ? Object.getOwnPropertyDescriptor(e34, o30) : void 0;
    })(t17, e33, o29);
  }

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t17) => (...e33) => ({ _$litDirective$: t17, values: e33 });
  var i5 = class {
    constructor(t17) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t17, e33, i23) {
      this._$Ct = t17, this._$AM = e33, this._$Ci = i23;
    }
    _$AS(t17, e33) {
      return this.update(t17, e33);
    }
    update(t17, e33) {
      return this.render(...e33);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e6 = e5(class extends i5 {
    constructor(t17) {
      if (super(t17), t17.type !== t4.ATTRIBUTE || "class" !== t17.name || t17.strings?.length > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t17) {
      return " " + Object.keys(t17).filter((s20) => t17[s20]).join(" ") + " ";
    }
    update(s20, [i23]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s20.strings && (this.nt = new Set(s20.strings.join(" ").split(/\s/).filter((t17) => "" !== t17)));
        for (const t17 in i23)
          i23[t17] && !this.nt?.has(t17) && this.st.add(t17);
        return this.render(i23);
      }
      const r18 = s20.element.classList;
      for (const t17 of this.st)
        t17 in i23 || (r18.remove(t17), this.st.delete(t17));
      for (const t17 in i23) {
        const s21 = !!i23[t17];
        s21 === this.st.has(t17) || this.nt?.has(t17) || (s21 ? (r18.add(t17), this.st.add(t17)) : (r18.remove(t17), this.st.delete(t17)));
      }
      return w;
    }
  });

  // client/lib/shared_styles.css
  var styles = i`:host {
  color: #111;
  font-family: 'Google Sans Text', 'Roboto', sans-serif;
  /* LINT.IfChange */
  font-size: 12px;
  /* LINT.ThenChange(./constants.ts) */
  scrollbar-width: thin;

  /* TODO(b/305091034): Clean up color variables */
  --comparator-model-a: #4684d7;
  --comparator-model-b: #c78901;
  --comparator-model-a-win: #2291df;
  --comparator-model-b-win: #cb6a20;
  --comparator-model-a-win-bg: #2291df10;
  --comparator-model-b-win-bg: #cb6a2010;
  --comparator-model-a-win-bg-darker: #2291df30;
  --comparator-model-b-win-bg-darker: #cb6a2030;

  --comparator-grey-100: #f7f7f7;
  --comparator-grey-150: #f3f3f3;
  --comparator-grey-200: #eeeeee;
  --comparator-grey-250: #dddddd;
  --comparator-grey-300: #cccccc;
  --comparator-grey-400: #aaaaaa;
  --comparator-grey-450: #919191;
  --comparator-grey-500: #777777;
  --comparator-grey-600: #5c5c5c;
  --comparator-grey-800: #333333;

  --comparator-greygreen-100: #f0f2f0;
  --comparator-greygreen-200: #eaecea;
  --comparator-greygreen-300: #d1eed1;
  --comparator-greygreen-700: #335533;

  --comparator-greyblue-300: #828082;

  --comparator-green-100: #f8fff8;
  --comparator-green-200: #f3f9f3;
  --comparator-green-500: #339c33;

  --comparator-custom-func-100: #fbf7ff;
  --comparator-custom-func-200: #f2e7f9;
  --comparator-custom-func-500: #aa7fd1;
  --comparator-custom-func-800: #8622df;

  --comparator-search-match-background: #ffff9d;
  --comparator-search-match-foreground: #b73092;

  --comparator-popup-color: #db68cc;
}

::-webkit-scrollbar {
  background-color: transparent;
  height: 10px;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--comparator-grey-250);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--comparator-grey-300);
  border-radius: 5px;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}

ul {
  margin: 0;
  padding-left: 12px;
}

.clickable {
  cursor: pointer;
}

#container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#main {
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 50px);
}

#main-panel {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: auto;
}

#main-table {
  flex: 1;
}

#example-details {
  border-top: 3px solid var(--comparator-grey-300);
  height: 40%;
  overflow-y: hidden;
}

#example-details.expanded {
  height: 80%;
}

.table-panel {
  overflow-y: scroll;
  padding-left: 15px;
}

/* Header */
#header {
  align-items: center;
  background-color: white;
  border-bottom: 2px solid var(--comparator-grey-250);
  color: var(--comparator-grey-800);
  display: flex;
  height: 32px;
  padding: 9px 12px 7px 28px;
}

h1 {
  font-size: 20px;
  font-weight: 500;
  margin: 0 25px 0 10px;
}

.selected-dataset-path {
  border-radius: 10px;
  cursor: pointer;
  font-family: monospace;
  margin: 0 20px;
  max-width: calc(100vw - 500px);
  overflow-x: hidden;
  padding: 5px 10px;
  white-space: nowrap;
}

.selected-dataset-path:hover {
  background-color: var(--comparator-grey-150);
}

.load-data-button {
  background-color: var(--comparator-grey-150);
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  margin: 0 20px;
  padding: 5px 10px;
}

.load-data-button:hover {
  background-color: var(--comparator-grey-250);
}

.header-icon-container {
  display: flex;
  margin-left: auto;
}

.link-icon {
  padding: 0 6px;
  position: relative;
}

.icon {
  border-radius: 24px;
  color: var(--comparator-grey-500);
  cursor: pointer;
  padding: 6px;
}

.icon:hover {
  background-color: var(--comparator-grey-200);
}

/* Status message */
.status-message-container {
  align-items: center;
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  display: flex;
  font-size: 13px;
  font-weight: 500;
  justify-content: space-between;
  left: 0;
  margin: 0 auto;
  padding: 10px 15px;
  position: absolute;
  right: 0;
  top: 10px;
  width: 350px;
  z-index: 20;
}

.status-message-container .error-message {
  font-weight: normal;
}

.dismiss-button {
  color: #a8c7fa;
}

.popup-tooltip {
  align-items: center;
  background: var(--comparator-popup-color);
  border-radius: 1px;
  bottom: 0;
  display: flex;
  gap: 4px;
  position: absolute;
  left: 50%;
  padding: 2px 4px;
  transform: translate(-80%, 90%);
  white-space: nowrap;
}

.popup-tooltip:after {
  border-color: transparent transparent var(--comparator-popup-color) transparent;
  border-style: solid;
  border-width: 4px;
  bottom: 100%;
  content: "";
  left: 80%;
  position: absolute;
  transform: translateX(-50%);
}

.popup-tooltip a {
  color: white;
  text-decoration: none;
}

.popup-tooltip .close-icon {
  color: var(--comparator-grey-100);
  cursor: pointer;
  font-size: 11px;
}

/* Sidebar */
#sidebar {
  background-color: #f3f3f3;
  border-left: 2px solid #fff;
  display: flex;
  flex: 0 0 360px;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 0 5px;
}

.sidebar-component {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 5px 5px 10px 5px;
}

.sidebar-component-title {
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  font-size: 1.2em;
  justify-content: space-between;
  padding: 5px 8px;
}

.additional-note {
  color: #999;
  font-size: 11px;
}

.sidebar-component-content {
  padding: 8px 10px;
}

.sidebar-component-content .description {
  color: var(--comparator-grey-500);
  font-size: 12px;
  padding-bottom: 4px;
}

.sidebar-component-content table {
  width: 100%;
}

.sidebar-component-content th {
  background-color: var(--comparator-grey-200);
  font-size: 11px;
  font-weight: 200;
  padding: 4px 0;
}

.sidebar-component-content .sort-selected {
  font-weight: 900;
}

.sidebar-component-content td {
  padding: 2px 4px;
}

.sidebar-component-content tr.selected td {
  background-color: var(--comparator-greygreen-100);
  color: black;
}

.sidebar-component-content tr:hover td {
  background-color: var(--comparator-greygreen-200);
}

.sidebar-component-footer {
  background-color: var(--comparator-grey-100);
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 11px;
  justify-content: center;
  padding: 1px 8px;
}

/* Tables */
tr.second-row .model-a {
  background-color: var(--comparator-model-a);
  border-radius: 15px;
  padding: 0 15px;
}

tr.second-row .model-b {
  background-color: var(--comparator-model-b);
  border-radius: 15px;
  padding: 0 15px;
}

/* Filter chips */
.filter-chip {
  align-items: center;
  background-color: var(--comparator-greygreen-300);
  border-radius: 10px;
  color: var(--comparator-greygreen-700);
  display: flex;
  margin-left: 3px;
  padding: 2px 3px 2px 7px;
}

.chip-cancel-icon {
  cursor: pointer;
  font-size: 11px;
  margin-left: 2px;
  opacity: 0.7;
}

.chip-cancel-icon:hover {
  opacity: 1.0;
}

/* Sort icons */
.sort-icons-container {
  padding: 0 0 16px 20px;
  position: absolute;
  right: -4px;
  top: 10px;
}

.sort-icon {
  color: var(--comparator-grey-300);
  cursor: pointer;
  position: absolute;
  right: 0;
}

.sort-icon.up {
  top: -12px;
}

.sort-icon.down {
  top: 6px;
}

.sort-icon:hover {
  color: var(--comparator-grey-50);
}

.sort-icon.active {
  color: #fff;
}

.expand-icon {
  color: var(--comparator-grey-500);
  font-size: 13px;
}

/* Charts */
rect.clickable-transparent-area {
  cursor: pointer;
  fill: #fff;
  opacity: 0.2;
  stroke: none;
}

rect.clickable-transparent-area.selected,
rect.clickable-transparent-area:hover {
  opacity: 0.01;
}

text.right-aligned {
  text-anchor: end;
}

rect.a-color, circle.a-color {
  fill: var(--comparator-model-a);
}

rect.b-color, circle.b-color {
  fill: var(--comparator-model-b);
}

rect.a-win-color, circle.a-win-color {
  fill: var(--comparator-model-a-win);
}

rect.b-win-color, circle.b-win-color {
  fill: var(--comparator-model-b-win);
}

div.a-color, span.a-color {
  background-color: var(--comparator-model-a);
}

div.b-color, span.b-color {
  background-color: var(--comparator-model-b);
}

div.a-win-color, span.a-win-color {
  background-color: var(--comparator-model-a-win);
}

div.b-win-color, span.b-win-color {
  background-color: var(--comparator-model-b-win);
}

.a-color-bg {
  background-color: var(--comparator-model-a-background);
}

.b-color-bg {
  background-color: var(--comparator-model-b-background);
}

.a-win-color-bg {
  background-color: var(--comparator-model-a-win-bg);
}

.b-win-color-bg {
  background-color: var(--comparator-model-b-win-bg);
}

.a-win-color-bg-darker {
  background-color: var(--comparator-model-a-win-bg-darker);
}

.b-win-color-bg-darker {
  background-color: var(--comparator-model-b-win-bg-darker);
}
`;

  // client/components/bar_chart.css
  var styles2 = i`.bar-chart {
  display: block;
  margin: 0;
}

text {
  alignment-baseline: middle;
  fill: var(--comparator-grey-800);
  font-size: 11px;
  text-anchor: middle;
}

.bar {
  fill: var(--comparator-grey-400);
  fill-opacity: 0.5;
  stroke-width: 0;
}

.bar.some-selected,
.bar-label.some-selected {
  fill-opacity: 0.2;
}

.bar.selected,
.bar-label.selected,
.bar:hover {
  fill-opacity: 1.0;
}

text.bar-label {
  font-size: 10px;
  text-anchor: start;
}

.bar-chart .axis {
  fill: none;
  stroke: var(--comparator-grey-400);
  stroke-width: 1;
}

.bar-chart .axis-label {
  text-anchor: end;
}

text.highlighted {
  font-weight: 600;
}`;

  // client/components/bar_chart.ts
  var BarChartElement = class extends MobxLitElement {
    constructor() {
      super();
      this.getValueDomain = () => [];
      this.groupCount = 1;
      this.isNested = false;
      this.getDataValues = () => [];
      this.getGroupedDataValues = () => [];
      this.getGroupedNestedDataValues = () => [];
      this.handleClickBar = () => {
      };
      this.isAnyBarSelected = () => false;
      this.isThisBarSelected = () => false;
      this.getHighlightedValues = () => [];
      this.svgWidth = 280;
      this.barHeight = 14;
      this.verticalPaddingBetweenBarsWithinGroup = 1;
      this.verticalPadding = 1;
      this.leftAxisWidth = 110;
      this.rightPaddingDefault = 25;
      this.rightPaddingForNested = 55;
      makeObservable(this);
    }
    get aggregatedData() {
      const aggregatedCount = {};
      this.getValueDomain().forEach((value) => {
        const entryPair = Array.from({ length: this.groupCount }, () => {
          return { count: 0, weight: 0 };
        });
        aggregatedCount[value] = entryPair;
      });
      if (this.isNested === true) {
        const groupedNestedDataValues = this.getGroupedNestedDataValues();
        groupedNestedDataValues.forEach(
          (nestedValues, groupIndex) => {
            nestedValues.forEach((values) => {
              const elementCount = values.length;
              values.forEach((value) => {
                aggregatedCount[value][groupIndex].weight += 1 / elementCount;
              });
              new Set(values).forEach((value) => {
                aggregatedCount[value][groupIndex].count += 1;
              });
            });
          }
        );
      } else {
        const groupedDataValues = this.groupCount > 1 ? this.getGroupedDataValues() : [this.getDataValues()];
        groupedDataValues.forEach((values, groupIndex) => {
          values.forEach((value) => {
            aggregatedCount[value][groupIndex].count += 1;
            aggregatedCount[value][groupIndex].weight += 1;
          });
        });
      }
      return aggregatedCount;
    }
    get verticalPaddingForGroup() {
      return Math.ceil(this.barHeight / 2);
    }
    get rightPadding() {
      return this.isNested === true ? this.rightPaddingForNested : this.rightPaddingDefault;
    }
    get binHeight() {
      return (this.barHeight + this.verticalPaddingBetweenBarsWithinGroup) * this.groupCount + this.verticalPaddingForGroup * 2;
    }
    get svgHeight() {
      return this.binHeight * this.getValueDomain().length + this.verticalPadding * 2;
    }
    get barMaxWidth() {
      return this.svgWidth - this.rightPadding - this.leftAxisWidth;
    }
    renderLeftAxis() {
      const paddingBetweenBarAndAxisLine = 1;
      const tickLength = 2;
      const paddingBetweenTickAndLabel = 2;
      const renderAxis = b2`
        <line class="axis"
          x1=${-paddingBetweenBarAndAxisLine}
          x2=${-paddingBetweenBarAndAxisLine}
          y1="0"
          y2=${this.binHeight * this.getValueDomain().length} />`;
      const styleAxisLabel = (value) => e6({
        "axis-label": true,
        "highlighted": this.getHighlightedValues().includes(value)
      });
      const renderTicks = this.getValueDomain().map(
        (value, tickIndex) => b2`
          <g transform="translate(0, ${(tickIndex + 0.5) * this.binHeight})">
            <line class="axis"
              x1=${-paddingBetweenBarAndAxisLine}
              x2=${-paddingBetweenBarAndAxisLine - tickLength}
              y1="0"
              y2="0" />
            <text class=${styleAxisLabel(value)}
              x=${-paddingBetweenBarAndAxisLine - tickLength - paddingBetweenTickAndLabel}>
              <title>${value}</title>
              ${value}
            </text>
          </g>`
      );
      return b2`
        ${renderAxis}
        ${renderTicks}`;
    }
    renderGroupedBar(value, entryPair, maxCount, index) {
      const renderBars = entryPair.map(
        (entry, groupIndex) => {
          const barWidth = entry.weight * this.barMaxWidth / maxCount;
          const binRectClass = (value2) => e6({
            "bar": true,
            "some-selected": this.isAnyBarSelected(groupIndex),
            "selected": this.isThisBarSelected(value2, groupIndex),
            "a-color": this.groupCount === 2 && groupIndex === 0,
            "b-color": this.groupCount === 2 && groupIndex === 1
          });
          const binTextClass = (value2) => e6({
            "bar-label": true,
            "some-selected": this.isAnyBarSelected(groupIndex),
            "selected": this.isThisBarSelected(value2, groupIndex)
          });
          const barAreaHeight = this.barHeight + this.verticalPaddingBetweenBarsWithinGroup;
          return b2`
        <g transform="translate(0,
                                ${this.verticalPaddingForGroup + barAreaHeight * groupIndex})">
          <rect class=${binRectClass(value)}
            x="0"
            y="0"
            width=${barWidth}
            height=${this.barHeight} />
          <text class=${binTextClass(value)}
            x=${barWidth}
            y=${barAreaHeight * 0.5}
            dx="1">
            ${entry.weight > 0 ? this.isNested === true ? `${entry.weight.toFixed(1)} (${entry.count})` : entry.count : ""}
          </text>
          <rect class="clickable-transparent-area clickable"
            x="0"
            y="0"
            width=${this.barMaxWidth}
            height=${this.barHeight}
            @click=${() => void this.handleClickBar(value, groupIndex)} />
        </g>`;
        }
      );
      return b2`
        <g transform="translate(0, ${index * this.binHeight})">
          ${renderBars}
        </g>`;
    }
    render() {
      const aggregatedWeights = Object.values(this.aggregatedData).flat(2).map((entry) => entry.weight);
      const maxWeight = Math.max(1, Math.max(...aggregatedWeights));
      const renderGroupedBars = this.getValueDomain().map(
        (value, index) => {
          const entryPair = this.aggregatedData[value];
          return this.renderGroupedBar(value, entryPair, maxWeight, index);
        }
      );
      return x`
        <svg class="bar-chart"
          width=${this.svgWidth}
          height=${this.svgHeight}>
          <g transform="translate(${this.leftAxisWidth}, ${this.verticalPadding})">
            <g>${this.renderLeftAxis()}</g>
            <g>${renderGroupedBars}</g>
          </g>
        </svg>`;
    }
  };
  BarChartElement.styles = [styles, styles2];
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "getValueDomain", 2);
  __decorateClass([
    n4({ type: Number })
  ], BarChartElement.prototype, "groupCount", 2);
  __decorateClass([
    n4({ type: Boolean })
  ], BarChartElement.prototype, "isNested", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "getDataValues", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "getGroupedDataValues", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "getGroupedNestedDataValues", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "handleClickBar", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "isAnyBarSelected", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "isThisBarSelected", 2);
  __decorateClass([
    n4({ type: Object })
  ], BarChartElement.prototype, "getHighlightedValues", 2);
  __decorateClass([
    n4({ type: Number })
  ], BarChartElement.prototype, "svgWidth", 2);
  __decorateClass([
    n4({ type: Number })
  ], BarChartElement.prototype, "barHeight", 2);
  __decorateClass([
    n4({ type: Number })
  ], BarChartElement.prototype, "leftAxisWidth", 2);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "aggregatedData", 1);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "verticalPaddingForGroup", 1);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "rightPadding", 1);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "binHeight", 1);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "svgHeight", 1);
  __decorateClass([
    computed
  ], BarChartElement.prototype, "barMaxWidth", 1);
  BarChartElement = __decorateClass([
    t3("comparator-bar-chart")
  ], BarChartElement);

  // client/lib/types.ts
  var AOrB = /* @__PURE__ */ ((AOrB2) => {
    AOrB2["A"] = "A";
    AOrB2["B"] = "B";
    return AOrB2;
  })(AOrB || {});
  var FieldType = /* @__PURE__ */ ((FieldType2) => {
    FieldType2["NUMBER"] = "number";
    FieldType2["STRING"] = "string";
    FieldType2["CATEGORY"] = "category";
    FieldType2["TEXT"] = "text";
    FieldType2["URL"] = "url";
    FieldType2["IMAGE_PATH"] = "image_path";
    FieldType2["IMAGE_BYTE"] = "image_byte";
    FieldType2["PER_MODEL_BOOLEAN"] = "per_model_boolean";
    FieldType2["PER_MODEL_NUMBER"] = "per_model_number";
    FieldType2["PER_MODEL_CATEGORY"] = "per_model_category";
    FieldType2["PER_MODEL_TEXT"] = "per_model_text";
    FieldType2["PER_RATING_STRING"] = "per_rating_string";
    FieldType2["PER_RATING_PER_MODEL_CATEGORY"] = "per_rating_per_model_category";
    FieldType2["BASE"] = "base";
    return FieldType2;
  })(FieldType || {});
  var CustomFuncType = /* @__PURE__ */ ((CustomFuncType2) => {
    CustomFuncType2["REGEXP"] = "Regular Expr.";
    CustomFuncType2["PRECOMPUTED"] = "Precomputed";
    return CustomFuncType2;
  })(CustomFuncType || {});
  var CustomFuncReturnType = /* @__PURE__ */ ((CustomFuncReturnType2) => {
    CustomFuncReturnType2["BOOLEAN"] = "Boolean";
    CustomFuncReturnType2["NUMBER"] = "Number";
    return CustomFuncReturnType2;
  })(CustomFuncReturnType || {});

  // client/lib/constants.ts
  var BASE_FIELD_ID_PREFIX = "base:";
  var FIELD_ID_FOR_INDEX = `${BASE_FIELD_ID_PREFIX}index`;
  var FIELD_ID_FOR_INPUT = `${BASE_FIELD_ID_PREFIX}input_text`;
  var FIELD_ID_FOR_OUTPUT_A = `${BASE_FIELD_ID_PREFIX}output_text_a`;
  var FIELD_ID_FOR_OUTPUT_B = `${BASE_FIELD_ID_PREFIX}output_text_b`;
  var FIELD_ID_FOR_TAGS = `${BASE_FIELD_ID_PREFIX}tags`;
  var FIELD_ID_FOR_SCORE = `${BASE_FIELD_ID_PREFIX}score`;
  var FIELD_ID_FOR_RATIONALES = `${BASE_FIELD_ID_PREFIX}rationales`;
  var FIELD_ID_FOR_RATIONALE_LIST = `${BASE_FIELD_ID_PREFIX}rationale_list`;
  var DEFAULT_COLUMN_LIST = [
    { id: FIELD_ID_FOR_INDEX, name: "Index", type: "base" /* BASE */, visible: true },
    { id: FIELD_ID_FOR_INPUT, name: "Prompt", type: "base" /* BASE */, visible: true },
    {
      id: FIELD_ID_FOR_TAGS,
      name: "Prompt Categories",
      type: "base" /* BASE */,
      visible: false
    },
    {
      id: FIELD_ID_FOR_OUTPUT_A,
      name: "Response from Model A",
      type: "base" /* BASE */,
      visible: true
    },
    {
      id: FIELD_ID_FOR_OUTPUT_B,
      name: "Response from Model B",
      type: "base" /* BASE */,
      visible: true
    },
    { id: FIELD_ID_FOR_SCORE, name: "Score", type: "base" /* BASE */, visible: true },
    {
      id: FIELD_ID_FOR_RATIONALES,
      name: "Rationales",
      type: "base" /* BASE */,
      visible: false
    },
    {
      id: FIELD_ID_FOR_RATIONALE_LIST,
      name: "Rationale List",
      type: "base" /* BASE */,
      visible: false
    }
  ];
  var DEFAULT_SORTING_CRITERIA = {
    column: "None" /* NONE */,
    customField: null,
    modelIndex: null,
    order: "None" /* NONE */
  };
  var LINE_HEIGHT_IN_CELL = 17;
  var DEFAULT_NUM_EXAMPLES_TO_DISPLAY = 50;
  var DEFAULT_CHART_HEIGHT_FOR_CUSTOM_FUNCS = 60;
  var DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS = 40;
  var HISTOGRAM_BOTTOM_AXIS_HEIGHT = 9;
  var DEFAULT_HISTOGRAM_SPEC = {
    rangeLeft: -1.75,
    rangeRight: 1.75,
    numberOfBins: 7,
    isBounded: false,
    isDivergingScheme: true
  };
  var FIVE_POINT_LIKERT_HISTOGRAM_SPEC = {
    rangeLeft: 1,
    rangeRight: 5,
    numberOfBins: 9,
    isBounded: true,
    isDivergingScheme: true
  };
  var DEFAULT_WIN_RATE_THRESHOLD = 0.25;
  var DEFAULT_RATIONALE_CLUSTER_SIMILARITY_THRESHOLD = 0.8;
  var BUILT_IN_DEMO_FILES = [
    "https://pair-code.github.io/llm-comparator/data/example_tiny.json",
    "https://pair-code.github.io/llm-comparator/data/example_arena.json"
  ];
  var INITIAL_CUSTOM_FUNCTIONS = [
    {
      id: -1,
      // Will be overwritten.
      name: "Word count",
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "\\w+",
      returnType: "Number" /* NUMBER */,
      precomputed: false
    },
    {
      id: -1,
      name: "Contains bulleted lists",
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "\\n([*-])\\s",
      returnType: "Boolean" /* BOOLEAN */,
      precomputed: false
    },
    {
      id: -1,
      name: "Contains headings",
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "#+\\s+.+",
      returnType: "Boolean" /* BOOLEAN */,
      precomputed: false
    },
    {
      id: -1,
      name: "Contains URLs",
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "https?://[-a-zA-Z0-9&@#/%?=+~_|!:,.;]*[-a-zA-Z0-9&@#/%=+~_|]",
      returnType: "Boolean" /* BOOLEAN */,
      precomputed: false
    },
    {
      id: -1,
      name: 'Starts with "Sure"',
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "^Sure",
      returnType: "Boolean" /* BOOLEAN */,
      precomputed: false
    }
  ];

  // client/lib/utils.ts
  var import_jsdifflib = __toESM(require_jsdifflib());
  var import_jstat = __toESM(require_jstat());
  function getTextDiff(textA, textB) {
    const tokenize = (text) => text.match(/[\w\d'-]+|\W+/g);
    const wordsA = tokenize(textA) || [];
    const wordsB = tokenize(textB) || [];
    const replaceTokensThatThrowErrors = (token) => token === "hasOwnProperty" ? "_hasOwnProperty_" : token;
    const cleanedWordsA = [...wordsA].map(replaceTokensThatThrowErrors);
    const cleanedWordsB = [...wordsB].map(replaceTokensThatThrowErrors);
    const matcher = new import_jsdifflib.default.SequenceMatcher(cleanedWordsA, cleanedWordsB);
    const opcodes = matcher.get_opcodes();
    const textDiff = { parsedA: [], parsedB: [], isEquals: [] };
    for (const opcode of opcodes) {
      const changeType = opcode[0];
      const startA = Number(opcode[1]);
      const endA = Number(opcode[2]);
      const startB = Number(opcode[3]);
      const endB = Number(opcode[4]);
      textDiff.parsedA.push(wordsA.slice(startA, endA).join(""));
      textDiff.parsedB.push(wordsB.slice(startB, endB).join(""));
      textDiff.isEquals.push(changeType === "equal");
    }
    return textDiff;
  }
  function renderDiffString(strings2, equal) {
    const displaySpans = strings2.map((output, i23) => {
      const classes = e6({ "highlighted-match": equal[i23] });
      return x`<span class=${classes}>${output}</span>`;
    });
    return displaySpans;
  }
  function renderSearchedString(text, searchText2, caseInsensitive = true) {
    const pattern = new RegExp(searchText2, caseInsensitive === true ? "gi" : "g");
    const matches3 = text.matchAll(pattern);
    const matchList = [...matches3];
    if (!matchList.length) {
      return x`${text}`;
    }
    const matchedResults = matchList.map((match) => {
      return {
        index: match.index,
        text: match[0]
      };
    });
    const annotatedText = [];
    for (let j3 = 0; j3 < matchedResults.length; j3++) {
      if (j3 === 0) {
        annotatedText.push(x`${text.substring(0, matchedResults[j3].index)}`);
      }
      annotatedText.push(
        x`<span class=${e6({ "highlighted-search-match": true })}
        >${matchedResults[j3].text}</span
      >`
      );
      annotatedText.push(
        x`${text.substring(
          matchedResults[j3].index + matchedResults[j3].text.length,
          j3 < matchedResults.length - 1 ? matchedResults[j3 + 1].index : text.length
        )}`
      );
    }
    return annotatedText;
  }
  function searchText(text, stringToSearch, ignoreCase = true) {
    const pattern = new RegExp(
      stringToSearch,
      ignoreCase === true ? "i" : void 0
    );
    return pattern.test(text);
  }
  function formatRateToPercentage(rate) {
    return `${(rate * 100).toFixed(1)}%`;
  }
  function getWinRate(entry) {
    const sum = entry.results["a"] + entry.results["b"] + entry.results["tie"];
    if (sum === 0) {
      return 0;
    } else {
      return (entry.results["a"] + 0.5 * entry.results["tie"]) / sum;
    }
  }
  function getAvgScore(entry) {
    const count = entry.count;
    return count === 0 ? null : entry.scoreSum / count;
  }
  function makeNewSliceWinRate(sliceName) {
    const sliceWinRate = {
      sliceName,
      count: 0,
      results: { "a": 0, "b": 0, "tie": 0, "unknown": 0 },
      scoreSum: 0,
      scoreSqSum: 0
    };
    return sliceWinRate;
  }
  function getZScoreFromConfidenceLevel(confidenceLevel) {
    if (confidenceLevel === 0.95) {
      return 1.96;
    } else if (confidenceLevel === 0.99) {
      return 2.576;
    } else if (confidenceLevel === 0.9) {
      return 1.645;
    } else {
      throw new Error(`Use 0.9, 0.95, or 0.99 for confidence level.`);
    }
  }
  function calculateErrorMargin(count, scoreSum, scoreSqSum, confidenceLevel = 0.95) {
    if (count === 0) {
      return 0;
    } else if (count === 1) {
      return 1e4;
    }
    const variance = scoreSqSum - scoreSum ** 2 / count;
    const standardDeviation = Math.sqrt(variance / (count - 1));
    const standardError = standardDeviation / Math.sqrt(count);
    const zScore = getZScoreFromConfidenceLevel(confidenceLevel);
    const marginOfError = zScore * standardError;
    return marginOfError;
  }
  function getConfidenceIntervalForMeanFromAggregatedStats(count, sum, squareSum, isAxisReversed = false, confidenceLevel = 0.95) {
    if (count === 0) {
      return [0, 0];
    }
    const errorMargin = calculateErrorMargin(
      count,
      sum,
      squareSum,
      confidenceLevel
    );
    const mean = sum / count;
    const errorMarginLeft = mean - errorMargin * (isAxisReversed === true ? -1 : 1);
    const errorMarginRight = mean + errorMargin * (isAxisReversed === true ? -1 : 1);
    return [errorMarginLeft, errorMarginRight];
  }
  function getConfidenceIntervalForRate(countTrue, countFalse, confidenceLevel = 0.95) {
    const alpha = countTrue + 0.5;
    const beta = countFalse + 0.5;
    const left = import_jstat.default.beta.inv(1 - confidenceLevel, alpha, beta);
    const right = import_jstat.default.beta.inv(confidenceLevel, alpha, beta);
    return [left, right];
  }
  function getHistogramStepSize(histogramSpec) {
    return (histogramSpec.rangeRight - histogramSpec.rangeLeft) / histogramSpec.numberOfBins;
  }
  function getHistogramBinIndexFromValue(histogramSpec, value) {
    const stepSize = getHistogramStepSize(histogramSpec);
    const binPositionValue = (value - histogramSpec.rangeLeft) / stepSize;
    const binIndex = histogramSpec.isDivergingScheme === true && binPositionValue > histogramSpec.numberOfBins * 0.5 ? Math.ceil(binPositionValue) - 1 : Math.floor(binPositionValue);
    if (binIndex < 0) {
      return 0;
    } else if (binIndex > histogramSpec.numberOfBins - 1) {
      return histogramSpec.numberOfBins - 1;
    } else {
      return binIndex;
    }
  }
  function getHistogramRangeFromBinIndex(histogramSpec, binIndex) {
    const stepSize = getHistogramStepSize(histogramSpec);
    return {
      left: histogramSpec.rangeLeft + binIndex * stepSize,
      right: histogramSpec.rangeLeft + (binIndex + 1) * stepSize
    };
  }
  function getFloatPrecisionForHistogram(histogramSpec) {
    if (Math.abs(histogramSpec.rangeRight - histogramSpec.rangeLeft) < histogramSpec.numberOfBins) {
      return 2;
    } else if (Math.abs(histogramSpec.rangeRight - histogramSpec.rangeLeft) < histogramSpec.numberOfBins * 2) {
      return 1;
    } else {
      return 0;
    }
  }
  function getRangeInclusionFromBinIndex(histogramSpec, binIndex) {
    return {
      left: histogramSpec.isDivergingScheme === false || binIndex <= (histogramSpec.numberOfBins - 1) * 0.5,
      right: binIndex === histogramSpec.numberOfBins - 1 || histogramSpec.isDivergingScheme === true && binIndex >= (histogramSpec.numberOfBins - 1) * 0.5
    };
  }
  function makeNewCustomFunc(id) {
    const customFunc = {
      id,
      name: "",
      functionType: "Regular Expr." /* REGEXP */,
      functionBody: "",
      returnType: "Boolean" /* BOOLEAN */,
      precomputed: false
    };
    return customFunc;
  }
  function initializeCustomFuncSelections() {
    return { "A": null, "B": null, "A-B": null };
  }
  function getFieldIdForCustomFunc(customFuncId) {
    return `custom_function:${customFuncId}`;
  }
  function isPerModelFieldType(field) {
    return field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */ || field.type === "per_model_number" /* PER_MODEL_NUMBER */ || field.type === "per_model_category" /* PER_MODEL_CATEGORY */ || field.type === "per_model_text" /* PER_MODEL_TEXT */;
  }
  function isPerRatingFieldType(field) {
    return field.type === "per_rating_string" /* PER_RATING_STRING */ || field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */;
  }
  function toFixedIfNeeded(num) {
    if (num % 1 !== 0) {
      return num.toFixed(2);
    } else {
      return num.toString();
    }
  }
  function constructImageSrcFromByte(imageByte, imageType = "jpeg") {
    return `data:image/${imageType};base64,${imageByte}`;
  }
  function getMinAndMax(values) {
    const notNullValues = values.filter((value) => value != null).map((value) => value);
    const minValue = notNullValues.length > 0 ? Math.min(...notNullValues) : 0;
    const maxValue = notNullValues.length > 0 ? Math.max(...notNullValues) : 0;
    return { minValue, maxValue };
  }
  function groupByValues(values) {
    const aggregatedCount = {};
    values.forEach((value) => {
      if (!aggregatedCount[value]) {
        aggregatedCount[value] = 0;
      }
      aggregatedCount[value] += 1;
    });
    return aggregatedCount;
  }
  function groupByAndSortKeys(values) {
    const aggregatedCount = groupByValues(values);
    return Object.entries(aggregatedCount).sort((a11, b7) => b7[1] - a11[1]).map(([key, count]) => key);
  }
  function mergeTwoArrays(baseValues, extendedValues) {
    const baseValueSet = new Set(baseValues);
    return [
      ...baseValues,
      ...extendedValues.filter((value) => !baseValueSet.has(value))
    ];
  }
  function printCustomFuncResultValue(value) {
    if (value == null) {
      return "NULL";
    } else if (typeof value === "boolean") {
      return value === true ? "True" : "False";
    } else if (typeof value === "number" && !Number.isInteger(value)) {
      return value.toFixed(3);
    } else {
      return value;
    }
  }
  function convertToNumber(value) {
    if (typeof value === "number") {
      return value;
    } else if (value === null) {
      return null;
    } else if (typeof value === "string") {
      const parsedNumber = Number(value);
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      }
    }
    return null;
  }
  function isEqualSorting(a11, b7) {
    return a11.column === b7.column && (a11.customField == null && b7.customField == null || a11.customField != null && b7.customField != null && a11.customField.id === b7.customField.id) && a11.modelIndex === b7.modelIndex && a11.order === b7.order;
  }
  function compareStringsWithNulls(a11, b7) {
    if (a11 == null && b7 == null)
      return 0;
    if (a11 == null)
      return 1;
    if (b7 == null)
      return -1;
    return a11.localeCompare(b7);
  }
  function compareNumbersWithNulls(a11, b7, isDescending) {
    if (a11 === null && b7 === null) {
      return 0;
    } else if (a11 === null) {
      return 1;
    } else if (b7 === null) {
      return -1;
    } else {
      return isDescending === true ? b7 - a11 : a11 - b7;
    }
  }
  function replaceSpaceWithUnderscore(text) {
    return text.replaceAll(" ", "_");
  }
  function getHistogramFilterLabel(fieldName, histogramSpec, binIndex, model = null) {
    if (histogramSpec == null || binIndex == null) {
      return "";
    } else {
      const fieldNameWithNoSpace = replaceSpaceWithUnderscore(fieldName);
      const { left, right } = getHistogramRangeFromBinIndex(
        histogramSpec,
        binIndex
      );
      const leftStr = histogramSpec.isBounded === false && binIndex === 0 ? null : left.toFixed(getFloatPrecisionForHistogram(histogramSpec));
      const rightStr = histogramSpec.isBounded === false && binIndex === histogramSpec.numberOfBins - 1 ? null : right.toFixed(getFloatPrecisionForHistogram(histogramSpec));
      const revisedFieldName = model == null ? fieldNameWithNoSpace : model === "A-B" ? `${fieldNameWithNoSpace}(A) - ${fieldNameWithNoSpace}(B)` : `${fieldNameWithNoSpace}(${model})`;
      const operator = getHistogramStepSize(histogramSpec) > 0 ? "<" : ">";
      const rangeInclusion = getRangeInclusionFromBinIndex(
        histogramSpec,
        binIndex
      );
      const leftEqual = rangeInclusion.left === true ? "=" : "";
      const rightEqual = rangeInclusion.right === true ? "=" : "";
      if (leftStr !== null && rightStr !== null) {
        return `${leftStr} ${operator}${leftEqual} ${revisedFieldName} ${operator}${rightEqual} ${rightStr}`;
      } else if (leftStr == null) {
        return `${revisedFieldName} ${operator}${rightEqual} ${rightStr}`;
      } else {
        const flippedOperator = operator === ">" ? "<" : ">";
        return `${revisedFieldName} ${flippedOperator}${leftEqual} ${leftStr}`;
      }
    }
  }
  function getBarFilterLabel(customFuncName, model, value) {
    return `${customFuncName}(${replaceSpaceWithUnderscore(model)}) = ${value}`;
  }
  function extractTextFromTextOrSequenceChunks(val) {
    if (typeof val === "string") {
      return val;
    } else {
      return val.filter((chunk) => chunk.type === "text" /* TEXT */).map((chunk) => chunk.data).join("\n");
    }
  }

  // client/components/histogram.css
  var styles3 = i`.histogram {
  display: block;
  margin: 0 auto;
}

text {
  fill: var(--comparator-grey-500);
  font-size: 10px;
  text-anchor: middle;
}

text.left-aligned {
  text-anchor: start;
}

text.right-aligned {
  text-anchor: end;
}

.histogram .axis {
  fill: none;
  stroke: var(--comparator-grey-400);
  stroke-width: 1;
}

.histogram .axis-label {
  alignment-baseline: hanging;
  fill: var(--comparator-grey-400);
  font-size: 9px;
}

.axis-end-label-bg {
  fill-opacity: 0.8;
}

.axis-end-desc {
  alignment-baseline: hanging;
  fill: white;
  font-size: 10px;
}

line.mean-rule {
  fill: none;
  stroke: var(--comparator-greygreen-700);
  stroke-width: 2;
}

text.mean-rule-label {
  alignment-baseline: hanging;
  fill: var(--comparator-greygreen-700);
  font-size: 9px;
  text-anchor: start;
  visibility: hidden;
}

text.mean-rule-label.shown {
  visibility: visible;
}

.chart-title {
  alignment-baseline: middle;
  fill: var(--comparator-grey-500);
  text-anchor: end;
}

.histogram-bar-clip-area {
  fill: var(--comparator-grey-450);
}

rect.clickable-transparent-area {
  opacity: 0.25;
}

rect.clickable-transparent-area.some-selected {
  opacity: 0.8;
}

rect.clickable-transparent-area.selected {
  opacity: 0.15;
}

rect.clickable-transparent-area.some-selected:hover {
  opacity: 0.6;
}

rect.clickable-transparent-area:hover,
rect.clickable-transparent-area.selected:hover {
  opacity: 0.05;
}`;

  // client/components/histogram.ts
  var HistogramElement = class extends MobxLitElement {
    constructor() {
      super();
      this.getHistogramSpec = () => DEFAULT_HISTOGRAM_SPEC;
      this.getRawDataValues = () => [];
      this.handleClickHistogramBar = () => {
      };
      this.isAnyBinSelected = () => false;
      this.isThisBinSelected = () => false;
      this.svgWidth = 220;
      this.svgHeight = 70;
      this.neutralColorThreshold = () => null;
      this.specificColorScheme = null;
      this.showBottomAxis = true;
      this.showAxisEndDescription = false;
      this.isSimplified = false;
      this.isFlipXAxis = () => false;
      this.titleOnLeft = null;
      this.barSidePadding = 1;
      this.topPaddingDefault = 10;
      this.topPaddingForSimplified = 3;
      this.rightPadding = 5;
      this.titlePadding = 20;
      this.bottomAxisHeight = 18;
      this.bottomAxisEndDescriptionHeight = 12;
      this.paddingBetweenBarAndAxisLine = 1;
      this.showRuleLabel = false;
      this.minHeightToAlwaysShowRuleLabel = 50;
      makeObservable(this);
    }
    get leftPadding() {
      return this.titleOnLeft == null ? this.rightPadding : this.titlePadding;
    }
    get topPadding() {
      return this.isSimplified === true ? this.topPaddingForSimplified : this.topPaddingDefault;
    }
    get histogramAreaWidth() {
      return this.svgWidth - this.leftPadding - this.rightPadding;
    }
    get binWidth() {
      const numberOfBins = this.getHistogramSpec().numberOfBins;
      if (numberOfBins === 0) {
        return 0;
      } else {
        return Math.floor(this.histogramAreaWidth / numberOfBins);
      }
    }
    get bottomAxisAreaHeight() {
      return this.showAxisEndDescription === true ? this.bottomAxisHeight + this.bottomAxisEndDescriptionHeight : this.bottomAxisEndDescriptionHeight;
    }
    get barMaxHeight() {
      return this.svgHeight - this.topPadding - this.bottomAxisAreaHeight;
    }
    get useDivergingColorScheme() {
      return this.getHistogramSpec().isDivergingScheme === true;
    }
    get binnedData() {
      const values = Array.from({
        length: this.getHistogramSpec().numberOfBins
      }).fill(0);
      this.getRawDataValues().forEach((value) => {
        const binIndex = getHistogramBinIndexFromValue(
          this.getHistogramSpec(),
          value
        );
        values[binIndex] += 1;
      });
      return values;
    }
    get maxCount() {
      return Math.max(1, Math.max(...this.binnedData));
    }
    get mean() {
      const rawDataValues = this.getRawDataValues();
      if (rawDataValues.length === 0) {
        return 0;
      } else {
        return rawDataValues.reduce((a11, b7) => a11 + b7, 0) / rawDataValues.length;
      }
    }
    renderBottomAxis() {
      const tickLength = 2;
      const paddingBetweenTickAndLabel = 1;
      const renderAxis = b2`
        <line class="axis"
          x1="0"
          x2=${this.histogramAreaWidth}
          y1=${this.paddingBetweenBarAndAxisLine}
          y2=${this.paddingBetweenBarAndAxisLine} />`;
      const axisEndLabelWidth = 50;
      const axisEndLabelHeight = 11;
      const styleAxisEndLabelBg = (isRightSide) => e6({
        "axis-end-label-bg": true,
        "a-win-color": isRightSide === !this.isFlipXAxis(),
        "b-win-color": isRightSide === this.isFlipXAxis()
      });
      const renderAxisEndDescriptions = this.showAxisEndDescription === true ? b2`
          <rect class=${styleAxisEndLabelBg(false)}
            x="0" y=${this.bottomAxisHeight}
            width=${axisEndLabelWidth} height=${axisEndLabelHeight}
            rx="3" ry="3" />
          <rect class=${styleAxisEndLabelBg(true)}
            x=${this.histogramAreaWidth - axisEndLabelWidth}
            y=${this.bottomAxisHeight}
            width=${axisEndLabelWidth} height=${axisEndLabelHeight}
            rx="3" ry="3" />

          <text class="axis-end-desc left-aligned"
            x="0" y=${this.bottomAxisHeight}
            dx="2" dy="1">
            ${this.isFlipXAxis() === true ? "A" : "B"} is better
          </text>
          <text class="axis-end-desc right-aligned"
            x=${this.histogramAreaWidth} y=${this.bottomAxisHeight}
            dx="-2" dy="1">
            ${this.isFlipXAxis() === true ? "B" : "A"} is better
          </text>` : "";
      const numberOfBins = this.getHistogramSpec().numberOfBins;
      const renderTickLabel = (tickIndex) => {
        let value = null;
        if (this.getHistogramSpec().isBounded === true) {
          if (tickIndex === 0 || tickIndex === numberOfBins) {
            value = getHistogramRangeFromBinIndex(
              this.getHistogramSpec(),
              tickIndex
            ).left;
          }
        } else {
          if (tickIndex > 0 && tickIndex < numberOfBins) {
            value = getHistogramRangeFromBinIndex(
              this.getHistogramSpec(),
              tickIndex
            ).left;
          }
        }
        const styleAxisLabel = e6({
          "axis-label": true,
          "left-aligned": this.getHistogramSpec().isBounded === true && (this.isFlipXAxis() === false && tickIndex === 0 || this.isFlipXAxis() === true && tickIndex === numberOfBins),
          "right-aligned": this.getHistogramSpec().isBounded === true && (this.isFlipXAxis() === false && tickIndex === numberOfBins || this.isFlipXAxis() === true && tickIndex === 0)
        });
        return b2`
          <text class=${styleAxisLabel}
            y=${this.paddingBetweenBarAndAxisLine + tickLength + paddingBetweenTickAndLabel}>
            ${value != null ? value.toFixed(
          getFloatPrecisionForHistogram(this.getHistogramSpec())
        ) : ""}
          </text>`;
      };
      const renderTicks = Array.from({
        length: this.getHistogramSpec().numberOfBins + 1
      }).map((tick, tickIndex) => {
        const xOffsetRatio = tickIndex / this.getHistogramSpec().numberOfBins;
        const xOffset = this.histogramAreaWidth * (this.isFlipXAxis() === true ? 1 - xOffsetRatio : xOffsetRatio);
        return b2`
                  <g transform="translate(${xOffset}, 0)">
                    <line class="axis"
                      x1="0"
                      x2="0"
                      y1=${this.paddingBetweenBarAndAxisLine}
                      y2=${this.paddingBetweenBarAndAxisLine + tickLength} />
                    ${renderTickLabel(tickIndex)}
                  </g>`;
      });
      return b2`
        <g class="bottom-axis"
          transform="translate(0, ${this.barMaxHeight})">
          ${renderAxis}
          ${renderAxisEndDescriptions}
          ${renderTicks}
        </g>`;
    }
    // Draw the shape of the bars for clipping.
    clipShapeOfHistogramBar(count, maxCount, index) {
      const barHeight = count * this.barMaxHeight / maxCount;
      const xIndex = this.isFlipXAxis() === true ? this.binnedData.length - 1 - index : index;
      return b2`
        <rect
          x=${xIndex * this.binWidth + this.barSidePadding}
          y=${this.barMaxHeight - barHeight}
          width=${this.binWidth - this.barSidePadding * 2}
          height=${barHeight}
        />`;
    }
    // Specify fill colors of histogram bars and clip the shape.
    renderColoredBarAreas() {
      const histogramSpec = this.getHistogramSpec();
      const thresholdValue = this.neutralColorThreshold() != null ? this.neutralColorThreshold() : 0;
      const thresholdPoint = (histogramSpec.rangeLeft + histogramSpec.rangeRight) * 0.5 - thresholdValue * Math.sign(histogramSpec.rangeRight - histogramSpec.rangeLeft);
      const widthRatioOfColoredArea = (thresholdPoint - histogramSpec.rangeLeft) / (histogramSpec.rangeRight - histogramSpec.rangeLeft);
      const thresholdWidth = this.histogramAreaWidth * widthRatioOfColoredArea;
      const styleHistogramBarDefault = e6({
        "histogram-bar-clip-area": true,
        "a-color": this.specificColorScheme === "A",
        "b-color": this.specificColorScheme === "B"
      });
      return b2`
        <rect class=${styleHistogramBarDefault}
          x="0" y="0"
          width=${this.histogramAreaWidth} height=${this.barMaxHeight}
          clip-path="url(#clip-bars)" />
        ${this.useDivergingColorScheme === true && this.neutralColorThreshold() != null ? b2`
                <rect class=${this.isFlipXAxis() === true ? "a-win-color" : "b-win-color"}
                  width=${thresholdWidth} height=${this.barMaxHeight}
                  x="0" y="0"
                  clip-path="url(#clip-bars)" />
                <rect class=${this.isFlipXAxis() === true ? "b-win-color" : "a-win-color"}
                  width=${thresholdWidth} height=${this.barMaxHeight}
                  x=${this.histogramAreaWidth - thresholdWidth} y="0"
                  clip-path="url(#clip-bars)" />` : ""}`;
    }
    // Render number labels above bars and clickable transparent areas.
    renderHistogramBarElements(count, maxCount, index) {
      if (this.isSimplified === true) {
        return b2``;
      }
      const barHeight = count * this.barMaxHeight / maxCount;
      const binTextClass = (binIndex) => e6({
        "histogram-bar-label": true,
        "some-selected": this.isAnyBinSelected(),
        "selected": this.isThisBinSelected(binIndex)
      });
      const binClickableAreaClass = (binIndex) => e6({
        "clickable-transparent-area": true,
        "clickable": true,
        "some-selected": this.isAnyBinSelected(),
        "selected": this.isThisBinSelected(binIndex)
      });
      const xOffset = (binIndex) => this.binWidth * (this.isFlipXAxis() === true ? this.binnedData.length - 1 - binIndex : binIndex);
      const renderCountLabel = b2`
        <text class=${binTextClass(index)}
          x=${this.binWidth * 0.5}
          y=${this.barMaxHeight - barHeight}
          dy="-1">
          ${count > 0 ? count : ""}
        </text>`;
      const renderClickableArea = b2`
        <rect class=${binClickableAreaClass(index)}
          x=${this.barSidePadding}
          y=${-this.topPadding}
          width=${this.binWidth - this.barSidePadding * 2}
          height=${this.topPadding + this.barMaxHeight}
          @click=${() => void this.handleClickHistogramBar(index)}
        />`;
      return b2`
        <g transform="translate(${xOffset(index)}, 0)">
          ${renderCountLabel}
          ${renderClickableArea}
        </g>`;
    }
    // Render a vertical bar (i.e., rule) that indicates the mean value.
    renderMeanRule() {
      if (this.isSimplified === true || this.getRawDataValues().length <= 1) {
        return b2``;
      }
      const binIndex = getHistogramBinIndexFromValue(
        this.getHistogramSpec(),
        this.mean
      );
      const binStartingPosition = binIndex * this.histogramAreaWidth / this.getHistogramSpec().numberOfBins + this.barSidePadding;
      const { left, right } = getHistogramRangeFromBinIndex(
        this.getHistogramSpec(),
        binIndex
      );
      const binProportion = (this.mean - left) / (right - left);
      const binInsideOffset = binProportion * (this.binWidth - this.barSidePadding * 2);
      const xPositionBeforeFlipConsidered = binStartingPosition + binInsideOffset;
      const xPosition = this.isFlipXAxis() === true ? this.histogramAreaWidth - xPositionBeforeFlipConsidered : xPositionBeforeFlipConsidered;
      const styleMeanRuleLabel = e6({
        "mean-rule-label": true,
        "shown": this.svgHeight >= this.minHeightToAlwaysShowRuleLabel || this.showRuleLabel
      });
      return b2`
        <g class="mean-rule-container">
          <line class="mean-rule"
            x1=${xPosition} y1=${0}
            x2=${xPosition} y2=${this.barMaxHeight + 1}
            @mouseenter=${() => this.showRuleLabel = true}
            @mouseleave=${() => this.showRuleLabel = false}
          />
          <text class=${styleMeanRuleLabel}
            x=${xPosition + 2} y=${this.barMaxHeight * 0.1}>
            &mu;=${this.mean.toFixed(2)}
          </text>
        </g>`;
    }
    renderTitleOnLeft() {
      const paddingBetweenAxisAndTitle = 3;
      return this.titleOnLeft != null ? b2`
          <g class="left-title">
            <line class="axis"
              x1="0" x2="0"
              y1="0" y2=${this.barMaxHeight + this.paddingBetweenBarAndAxisLine}
            />
            <text class="chart-title"
              x="0" dx=${-paddingBetweenAxisAndTitle}
              y=${this.barMaxHeight * 0.5}>
              ${this.titleOnLeft}
            </text>
          </g>` : "";
    }
    render() {
      const histogramSpec = this.getHistogramSpec();
      if (histogramSpec === void 0) {
        return x``;
      }
      const binnedData = this.binnedData;
      const renderHistogramElementsForBars = binnedData.map(
        (value, index) => this.renderHistogramBarElements(value, this.maxCount, index)
      );
      const clipShapeOfHistogramBars = binnedData.map(
        (value, index) => this.clipShapeOfHistogramBar(value, this.maxCount, index)
      );
      const adjustedSvgHeight = this.showBottomAxis === true ? this.svgHeight : this.svgHeight - HISTOGRAM_BOTTOM_AXIS_HEIGHT;
      return x`
        <svg class="histogram"
          width=${this.svgWidth}
          height=${adjustedSvgHeight}>
          <g transform="translate(${this.leftPadding}, ${this.topPadding})">
            ${this.renderTitleOnLeft()}
            ${this.renderBottomAxis()}
            <g class="bars">
              <clipPath id="clip-bars">
                ${clipShapeOfHistogramBars}
              </clipPath>
              ${this.renderColoredBarAreas()}
              ${renderHistogramElementsForBars}
            </g>
            ${this.renderMeanRule()}
          </g>
        </svg>`;
    }
  };
  HistogramElement.styles = [styles, styles3];
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "getHistogramSpec", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "getRawDataValues", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "handleClickHistogramBar", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "isAnyBinSelected", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "isThisBinSelected", 2);
  __decorateClass([
    n4({ type: Number })
  ], HistogramElement.prototype, "svgWidth", 2);
  __decorateClass([
    n4({ type: Number })
  ], HistogramElement.prototype, "svgHeight", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "neutralColorThreshold", 2);
  __decorateClass([
    n4({ type: String })
  ], HistogramElement.prototype, "specificColorScheme", 2);
  __decorateClass([
    n4({ type: Boolean })
  ], HistogramElement.prototype, "showBottomAxis", 2);
  __decorateClass([
    n4({ type: Boolean })
  ], HistogramElement.prototype, "showAxisEndDescription", 2);
  __decorateClass([
    n4({ type: Boolean })
  ], HistogramElement.prototype, "isSimplified", 2);
  __decorateClass([
    n4({ type: Object })
  ], HistogramElement.prototype, "isFlipXAxis", 2);
  __decorateClass([
    n4({ type: String })
  ], HistogramElement.prototype, "titleOnLeft", 2);
  __decorateClass([
    observable
  ], HistogramElement.prototype, "showRuleLabel", 2);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "leftPadding", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "topPadding", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "histogramAreaWidth", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "binWidth", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "bottomAxisAreaHeight", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "barMaxHeight", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "useDivergingColorScheme", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "binnedData", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "maxCount", 1);
  __decorateClass([
    computed
  ], HistogramElement.prototype, "mean", 1);
  HistogramElement = __decorateClass([
    t3("comparator-histogram")
  ], HistogramElement);

  // client/services/service.ts
  var Service = class {
    initialize() {
    }
  };

  // client/services/custom_function_service.ts
  var CustomFunctionService = class extends Service {
    // Use regular expression to find matches in output_text.
    // If the return type is number, count the pattern.
    executeCustomFunctionRegExp(outputText, expression, returnType) {
      if (returnType === "Number" /* NUMBER */) {
        const regExp = new RegExp(expression, "g");
        const matches3 = outputText.match(regExp);
        return matches3 != null ? matches3.length : 0;
      } else {
        const regExp = new RegExp(expression);
        const matches3 = outputText.match(regExp);
        return matches3 != null ? true : false;
      }
    }
    executeCustomFunction(outputText, example, customFunc) {
      if (customFunc.functionType === "Regular Expr." /* REGEXP */) {
        return this.executeCustomFunctionRegExp(
          outputText,
          customFunc.functionBody,
          customFunc.returnType
        );
      } else {
        console.warning(
          `Unsupported custom function type: ${customFunc.functionType}`
        );
        return;
      }
    }
  };

  // client/services/state_service.ts
  var AppState = class extends Service {
    constructor(customFunctionService) {
      super();
      this.customFunctionService = customFunctionService;
      this.metadata = {
        source_path: "",
        custom_fields_schema: [],
        sampling_step_size: 1
      };
      this.models = [{ name: "" }, { name: "" }];
      this.examples = [];
      this.rationaleClusters = [];
      this.datasetPath = null;
      this.isDatasetPathUploadedFile = false;
      this.isOpenDatasetSelectionPanel = true;
      this.exampleDatasetPaths = BUILT_IN_DEMO_FILES;
      this.selectedTag = null;
      this.currentSorting = DEFAULT_SORTING_CRITERIA;
      this.isExampleExpanded = {};
      this.selectedExample = null;
      this.showSelectedExampleDetails = false;
      this.exampleDetailsPanelExpanded = false;
      this.hasRationaleClusters = false;
      this.selectedRationaleClusterId = null;
      this.hoveredRationaleClusterId = null;
      this.matchedRationaleClusterIds = [];
      this.rationaleClusterSimilarityThreshold = DEFAULT_RATIONALE_CLUSTER_SIMILARITY_THRESHOLD;
      this.columns = DEFAULT_COLUMN_LIST;
      this.showSidebarComponents = {};
      this.selectedBarChartValues = {};
      this.histogramSpecForScores = DEFAULT_HISTOGRAM_SPEC;
      this.selectedHistogramBinForScores = null;
      this.histogramSpecForCustomFields = {};
      this.selectedHistogramBinForCustomFields = {};
      this.selectedHistogramBinForRatingsForSelectedExample = null;
      this.selectedBarChartValueForSelectedExample = null;
      this.winRateThreshold = DEFAULT_WIN_RATE_THRESHOLD;
      this.isFlipScoreHistogramAxis = true;
      this.statusMessage = "";
      this.isOpenStatusMessage = false;
      this.statusMessageTimeout = null;
      this.searchFilters = {};
      this.searchFilterInputs = {};
      this.isOpenSettingsPanel = false;
      this.isShowTextDiff = true;
      this.useMonospace = false;
      this.numExamplesToDisplay = DEFAULT_NUM_EXAMPLES_TO_DISPLAY;
      this.isShowTagChips = true;
      this.isShowSidebar = true;
      this.numberOfLinesPerOutputCell = 7;
      this.customFunctions = {};
      this.histogramSpecForCustomFuncs = {};
      this.histogramSpecForCustomFuncsOfDiff = {};
      this.selectedCustomFuncId = null;
      this.selectionsFromCustomFuncResults = {};
      this.isShowCustomFuncEditor = false;
      this.valueDomainsForCustomFields = {};
      makeObservable(this);
    }
    getIsExampleExpanded(index) {
      return this.isExampleExpanded[index] ?? false;
    }
    resetSearchFilter(fieldId) {
      this.searchFilters[fieldId] = "";
      this.searchFilterInputs[fieldId] = "";
    }
    // Columns.
    getFieldFromId(fieldId) {
      return this.columns.find((field) => field.id === fieldId);
    }
    isColumnVisible(fieldId) {
      const matchedField = this.getFieldFromId(fieldId);
      return matchedField !== void 0 && matchedField.visible === true;
    }
    get numberOfShownTextColumns() {
      return (this.isColumnVisible(FIELD_ID_FOR_INPUT) === true ? 1 : 0) + (this.isColumnVisible(FIELD_ID_FOR_OUTPUT_A) === true ? 1 : 0) + (this.isColumnVisible(FIELD_ID_FOR_OUTPUT_B) === true ? 1 : 0) + (this.isColumnVisible(FIELD_ID_FOR_RATIONALES) === true ? 1 : 0) + this.metadata.custom_fields_schema.filter(
        (field) => field.type === "text" /* TEXT */ && this.isColumnVisible(field.name)
      ).length;
    }
    get scoreMiddlePoint() {
      return (this.histogramSpecForScores.rangeLeft + this.histogramSpecForScores.rangeRight) * 0.5;
    }
    // Check if A or B is a winner from a score.
    isWinnerFromScore(model, score) {
      if (score == null) {
        return false;
      }
      if (model === "A") {
        return score > this.scoreMiddlePoint + this.winRateThreshold;
      } else if (model === "B") {
        return score < this.scoreMiddlePoint - this.winRateThreshold;
      } else {
        return false;
      }
    }
    get isScoreDivergingScheme() {
      return this.scoreMiddlePoint === 0 || this.histogramSpecForScores.rangeLeft === FIVE_POINT_LIKERT_HISTOGRAM_SPEC.rangeLeft && this.histogramSpecForScores.rangeRight === FIVE_POINT_LIKERT_HISTOGRAM_SPEC.rangeRight;
    }
    get selectedCustomFunc() {
      if (this.selectedCustomFuncId != null) {
        return this.customFunctions[this.selectedCustomFuncId];
      } else {
        return null;
      }
    }
    get selectedCustomFuncName() {
      if (this.selectedCustomFunc != null) {
        return this.selectedCustomFunc.name;
      } else {
        return "";
      }
    }
    get newCustomFuncId() {
      if (Object.keys(this.customFunctions).length === 0) {
        return 0;
      } else {
        return Math.max(...Object.keys(this.customFunctions).map(Number)) + 1;
      }
    }
    get customFieldsOfNumberType() {
      return this.columns.filter(
        (field) => field.type === "number" /* NUMBER */
      );
    }
    get customFieldsOfCategoryType() {
      return this.columns.filter(
        (field) => field.type === "category" /* CATEGORY */
      );
    }
    get customFieldsOfPerModelNumberType() {
      return this.columns.filter((field) => field.type === "per_model_number" /* PER_MODEL_NUMBER */).filter((field) => field.id.startsWith("custom_field:"));
    }
    get customFieldsOfPerModelCategoryTypeIncludingPerRating() {
      return this.columns.filter(
        (field) => field.type === "per_model_category" /* PER_MODEL_CATEGORY */ || field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */ || field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */
      ).filter((field) => field.id.startsWith("custom_field:"));
    }
    customFieldsOfPerRatingTypesWithNoAggregationSupport() {
      return ["per_rating_string" /* PER_RATING_STRING */];
    }
    // Fields for per-rating types.
    get customFieldsOfPerRatingType() {
      return this.columns.filter((field) => isPerRatingFieldType(field));
    }
    // Fields without per-rating types.
    get customFieldsWithoutPerRatingType() {
      return this.columns.filter(
        (field) => !isPerRatingFieldType(field) && field.type !== "base" /* BASE */
      );
    }
    get visibleColumns() {
      return this.columns.filter((field) => field.visible === true);
    }
    // Columns without per rating types.
    get columnsWithoutPerRatingTypes() {
      return this.columns.filter((field) => !isPerRatingFieldType(field));
    }
    // Get the value domain for custom fields for side-by-side bar charts.
    // We display all the axis values even when their counts are zero.
    computeValueDomainForCustomField(field) {
      const groupIndices = Array.from(
        { length: this.models.length },
        (unused, i23) => i23
      );
      const values = groupIndices.map(
        (groupIndex) => this.examples.map(
          (ex) => ex.individual_rater_scores.map(
            (rating) => rating.custom_fields[field.id][groupIndex]
          ).flat()
        ).flat()
      ).flat();
      if (field.domain !== void 0) {
        this.valueDomainsForCustomFields[field.id] = mergeTwoArrays(
          field.domain,
          groupByAndSortKeys(values)
        );
      } else {
        this.valueDomainsForCustomFields[field.id] = groupByAndSortKeys(values);
      }
    }
    get individualRatingScoreValueDomain() {
      const scores = /* @__PURE__ */ new Set();
      this.examples.forEach((ex) => {
        ex.individual_rater_scores.filter((rating) => rating.score != null).forEach((rating) => {
          scores.add(rating.score);
        });
      });
      return Array.from(scores).sort((a11, b7) => b7 - a11).map((score) => score.toString());
    }
    // Models.
    getModelIndexFromAOrB(model) {
      if (model === "A") {
        return 0;
      } else if (model === "B") {
        return 1;
      } else {
        throw new Error(`Unknown model: ${model}`);
      }
    }
    get filteredExamplesExceptChartSelections() {
      let examples = this.examples;
      Object.entries(this.searchFilters).filter(([fieldId, stringToSearch]) => stringToSearch !== "").forEach(([fieldId, stringToSearch]) => {
        examples = examples.filter((ex) => {
          if (fieldId === FIELD_ID_FOR_INPUT) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.input_text),
              stringToSearch
            );
          } else if (fieldId === FIELD_ID_FOR_OUTPUT_A) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.output_text_a),
              stringToSearch
            );
          } else if (fieldId === FIELD_ID_FOR_OUTPUT_B) {
            return searchText(
              extractTextFromTextOrSequenceChunks(ex.output_text_b),
              stringToSearch
            );
          } else if (fieldId === FIELD_ID_FOR_RATIONALES) {
            return searchText(
              ex.individual_rater_scores.map((rating) => rating.rationale).join("\n"),
              stringToSearch
            );
          } else if (fieldId === FIELD_ID_FOR_RATIONALE_LIST) {
            return searchText(
              ex.rationale_list.map((item) => item.rationale).join("\n"),
              stringToSearch
            );
          } else {
            return ex.custom_fields[fieldId] != null && searchText(ex.custom_fields[fieldId], stringToSearch);
          }
        });
      });
      Object.values(this.customFunctions).filter(
        (customFunc) => customFunc.returnType === "Boolean" /* BOOLEAN */
      ).forEach((customFunc) => {
        const fieldId = getFieldIdForCustomFunc(customFunc.id);
        const selections = this.selectionsFromCustomFuncResults[customFunc.id];
        Object.values(AOrB).forEach((model, modelIndex) => {
          if (selections[model] != null) {
            examples = examples.filter(
              (ex) => ex.custom_fields[fieldId][modelIndex] === selections[model]
            );
          }
        });
      });
      return examples;
    }
    applyHistogramFilterForScores(examplesBeforeThisFilter) {
      let examples = examplesBeforeThisFilter;
      if (this.selectedHistogramBinForScores != null) {
        examples = examples.filter((ex) => ex.score != null).filter(
          (ex) => getHistogramBinIndexFromValue(
            this.histogramSpecForScores,
            ex.score
          ) === this.selectedHistogramBinForScores
        );
      }
      return examples;
    }
    // TODO: Merge with the side-by-side histograms.
    applyHistogramFilterForCustomFuncs(examplesBeforeThisFilter, excludeId = null, excludeModel = null) {
      let examples = examplesBeforeThisFilter;
      Object.values(this.customFunctions).filter(
        (customFunc) => customFunc.returnType === "Number" /* NUMBER */
      ).forEach((customFunc) => {
        const fieldId = getFieldIdForCustomFunc(customFunc.id);
        const selections = this.selectionsFromCustomFuncResults[customFunc.id];
        Object.values(AOrB).filter(
          (model) => excludeId == null || !(excludeId === customFunc.id && excludeModel === model)
        ).forEach((model) => {
          const modelIndex = this.getModelIndexFromAOrB(model);
          if (selections[model] != null) {
            examples = examples.filter(
              (ex) => ex.custom_fields[fieldId][modelIndex] != null
            ).filter(
              (ex) => getHistogramBinIndexFromValue(
                this.histogramSpecForCustomFuncs[customFunc.id],
                ex.custom_fields[fieldId][modelIndex]
              ) === selections[model]
            );
          }
        });
        if (selections["A-B"] != null && (excludeId == null || !(excludeId === customFunc.id && excludeModel === "A-B"))) {
          examples = examples.filter((ex) => {
            const valA = ex.custom_fields[fieldId][0];
            const valB = ex.custom_fields[fieldId][1];
            if (valA != null && valB != null && typeof valA === "number" && typeof valB === "number") {
              return getHistogramBinIndexFromValue(
                this.histogramSpecForCustomFuncsOfDiff[customFunc.id],
                valA - valB
              ) === selections["A-B"];
            } else {
              return false;
            }
          });
        }
      });
      return examples;
    }
    applyHistogramFilterForCustomFields(examplesBeforeThisFilter, excludeField = null, excludeModel = null) {
      let examples = examplesBeforeThisFilter;
      Object.keys(this.selectedHistogramBinForCustomFields).forEach((fieldId) => {
        const selections = this.selectedHistogramBinForCustomFields[fieldId];
        if (selections != null && typeof selections === "object") {
          Object.values(AOrB).filter(
            (model) => excludeField == null || !(excludeField === fieldId && excludeModel === model)
          ).forEach((model) => {
            const modelIndex = this.getModelIndexFromAOrB(model);
            if (selections[model] != null) {
              examples = examples.filter(
                (ex) => ex.custom_fields[fieldId][modelIndex] != null
              ).filter(
                (ex) => getHistogramBinIndexFromValue(
                  this.histogramSpecForCustomFields[fieldId],
                  ex.custom_fields[fieldId][modelIndex]
                ) === selections[model]
              );
            }
          });
        } else {
          if (selections != null && fieldId !== excludeField) {
            examples = examples.filter((ex) => ex.custom_fields[fieldId] != null).filter(
              (ex) => getHistogramBinIndexFromValue(
                this.histogramSpecForCustomFields[fieldId],
                ex.custom_fields[fieldId]
              ) === selections
            );
          }
        }
      });
      return examples;
    }
    applyBarChartFilterForCustomFields(examplesBeforeThisFilter, excludeField = null, excludeGroupIndex = null) {
      let examples = examplesBeforeThisFilter;
      Object.entries(this.selectedBarChartValues).forEach(
        ([fieldId, selectionsForGroups]) => {
          selectionsForGroups.map((selectionForGroup, groupIndex) => [
            selectionForGroup,
            groupIndex
          ]).filter(
            ([selectionForGroup, groupIndex]) => selectionForGroup != null && !(excludeField != null && excludeField === fieldId && excludeGroupIndex != null && excludeGroupIndex === groupIndex)
          ).forEach(([selectionForGroup, groupIndex]) => {
            examples = examples.filter((ex) => {
              const fieldValue = ex.custom_fields[fieldId];
              const value = fieldValue instanceof Array ? fieldValue[groupIndex] : fieldValue;
              return value instanceof Object ? Object.keys(value).includes(selectionForGroup) : value != null && value.toString() === selectionForGroup;
            });
          });
        }
      );
      return examples;
    }
    applyTagFilter(examplesBeforeThisFilter) {
      let examples = examplesBeforeThisFilter;
      if (this.selectedTag != null) {
        examples = examples.filter(
          (example) => example.tags.includes(this.selectedTag)
        );
      }
      return examples;
    }
    applyRationaleClusterFilter(examplesBeforeThisFilter) {
      let examples = examplesBeforeThisFilter;
      if (this.selectedRationaleClusterId != null) {
        examples = examples.filter((example) => {
          const clusterIds = example.rationale_list.map((rationale) => rationale.assignedClusterIds).flat();
          return clusterIds.includes(this.selectedRationaleClusterId);
        });
      }
      return examples;
    }
    // Get the list of examples for cases when a particular bin selection is not
    // applied. This is to render non-selected bars in histograms, which are not
    // part of this.filteredExamples.
    // e.g., If there exist two selections, bin_for_score=2 and bin_for_field_x=5,
    // the table shows filteredExamples that apply both of the filters.
    // However, for the score histogram, it will show data for bin_for_field_x=5,
    // because we want to visualize other bars (bin_for_score != 2) too with
    // opacity < 1. In this case,
    // @computed this.filteredExamples has data only for the two filters applied.
    // this.getFilteredExamplesExceptForParticularChart({histogram, score})]
    // returns data for when the bin_for_score=2 filter is not applied.
    // this.getFilteredExamplesExceptForParticularChart({histogram, x}) returns
    // data for when the bin_for_field_x=5 filter is not applied.
    getFilteredExamplesExceptForParticularChart(chartKey) {
      let examples = this.filteredExamplesExceptChartSelections;
      if (chartKey.chartType === "histogram" /* HISTOGRAM */ && chartKey.fieldId === FIELD_ID_FOR_SCORE) {
        examples = this.applyHistogramFilterForCustomFuncs(examples);
        examples = this.applyHistogramFilterForCustomFields(examples);
        examples = this.applyBarChartFilterForCustomFields(examples);
        examples = this.applyTagFilter(examples);
        examples = this.applyRationaleClusterFilter(examples);
      } else if (chartKey.chartType === "histogram" /* HISTOGRAM */) {
        examples = this.applyHistogramFilterForScores(examples);
        examples = this.applyHistogramFilterForCustomFuncs(examples);
        examples = this.applyBarChartFilterForCustomFields(examples);
        examples = this.applyTagFilter(examples);
        examples = this.applyRationaleClusterFilter(examples);
        examples = this.applyHistogramFilterForCustomFields(
          examples,
          chartKey.fieldId,
          chartKey.model
        );
      } else if (chartKey.chartType === "custom_function" /* CUSTOM_FUNCTION */) {
        examples = this.applyHistogramFilterForScores(examples);
        examples = this.applyHistogramFilterForCustomFields(examples);
        examples = this.applyBarChartFilterForCustomFields(examples);
        examples = this.applyTagFilter(examples);
        examples = this.applyRationaleClusterFilter(examples);
        const splitFieldId = chartKey.fieldId.split(":");
        const customFuncIdOfHistogramToIgnore = splitFieldId.length === 2 ? Number(splitFieldId[1]) : null;
        const modelFromCustomFuncOfHistogramToIgnore = chartKey.model;
        examples = this.applyHistogramFilterForCustomFuncs(
          examples,
          customFuncIdOfHistogramToIgnore,
          modelFromCustomFuncOfHistogramToIgnore
        );
      } else if (chartKey.chartType === "bar" /* BAR_CHART */) {
        examples = this.applyHistogramFilterForScores(examples);
        examples = this.applyHistogramFilterForCustomFuncs(examples);
        examples = this.applyHistogramFilterForCustomFields(examples);
        examples = this.applyTagFilter(examples);
        examples = this.applyRationaleClusterFilter(examples);
        const modelIndex = chartKey.model == null ? 0 : chartKey.model;
        examples = this.applyBarChartFilterForCustomFields(
          examples,
          chartKey.fieldId,
          modelIndex
        );
      } else if (chartKey.chartType === "tag" /* TAG */) {
        examples = this.applyHistogramFilterForScores(examples);
        examples = this.applyHistogramFilterForCustomFuncs(examples);
        examples = this.applyHistogramFilterForCustomFields(examples);
        examples = this.applyBarChartFilterForCustomFields(examples);
        examples = this.applyRationaleClusterFilter(examples);
      } else if (chartKey.chartType === "rationale_cluster" /* RATIONALE_CLUSTER */) {
        examples = this.applyHistogramFilterForScores(examples);
        examples = this.applyHistogramFilterForCustomFuncs(examples);
        examples = this.applyHistogramFilterForCustomFields(examples);
        examples = this.applyBarChartFilterForCustomFields(examples);
        examples = this.applyTagFilter(examples);
      }
      return examples;
    }
    get filteredExamples() {
      let examples = this.filteredExamplesExceptChartSelections;
      examples = this.applyHistogramFilterForScores(examples);
      examples = this.applyHistogramFilterForCustomFuncs(examples);
      examples = this.applyHistogramFilterForCustomFields(examples);
      examples = this.applyBarChartFilterForCustomFields(examples);
      examples = this.applyTagFilter(examples);
      examples = this.applyRationaleClusterFilter(examples);
      return examples;
    }
    get sortedExamples() {
      let examples = this.filteredExamples;
      const sorting = this.currentSorting;
      if (sorting.column === "None" /* NONE */ || sorting.order === "None" /* NONE */) {
        return examples;
      }
      if (sorting.column === "score" /* SCORE */) {
        examples = examples.slice().sort(
          (a11, b7) => compareNumbersWithNulls(
            a11.score,
            b7.score,
            sorting.order === "desc" /* DESC */
          )
        );
      } else if (sorting.column === "tags" /* TAGS */) {
        examples = examples.slice().sort(
          (a11, b7) => sorting.order === "desc" /* DESC */ ? b7.tags.join(",").localeCompare(a11.tags.join(",")) : a11.tags.join(",").localeCompare(b7.tags.join(","))
        );
      } else if (sorting.column === "value from selected Custom Function for Output A" /* FUNC_A */ || sorting.column === "value from selected Custom Function for Output B" /* FUNC_B */) {
        const selectedCustomFunc = this.selectedCustomFunc;
        const modelIndex = sorting.column === "value from selected Custom Function for Output A" /* FUNC_A */ ? 0 : 1;
        if (selectedCustomFunc != null && selectedCustomFunc.returnType === "Number" /* NUMBER */) {
          const fieldId = getFieldIdForCustomFunc(selectedCustomFunc.id);
          examples = examples.slice().sort(
            (ex0, ex1) => sorting.order === "desc" /* DESC */ ? ex1.custom_fields[fieldId][modelIndex] - ex0.custom_fields[fieldId][modelIndex] : ex0.custom_fields[fieldId][modelIndex] - ex1.custom_fields[fieldId][modelIndex]
          );
        }
      } else if (sorting.column === "custom attribute" /* CUSTOM_ATTRIBUTE */ && sorting.customField != null) {
        const fieldId = sorting.customField.id;
        const fieldType = this.columns.filter((field) => field.id === fieldId)[0].type;
        if (fieldType === "per_model_number" && sorting.modelIndex != null) {
          const getValueForPerModelNumber = (ex) => ex.custom_fields[fieldId][sorting.modelIndex];
          examples = examples.slice().sort(
            (a11, b7) => compareNumbersWithNulls(
              getValueForPerModelNumber(a11),
              getValueForPerModelNumber(b7),
              sorting.order === "desc" /* DESC */
            )
          );
        } else if ((fieldType === "per_model_boolean" || fieldType === "per_model_category") && sorting.modelIndex != null) {
          const castToString = (value) => typeof value === "boolean" ? String(value) : value;
          const getValueForPerModelString = (ex) => ex.custom_fields[fieldId].map(
            (value) => castToString(value)
          )[sorting.modelIndex];
          examples = examples.slice().sort(
            (a11, b7) => sorting.order === "desc" /* DESC */ ? compareStringsWithNulls(
              getValueForPerModelString(b7),
              getValueForPerModelString(a11)
            ) : compareStringsWithNulls(
              getValueForPerModelString(a11),
              getValueForPerModelString(b7)
            )
          );
        } else if (fieldType === "number") {
          const getValueForNumber = (ex) => ex.custom_fields[fieldId];
          examples = examples.slice().sort(
            (a11, b7) => compareNumbersWithNulls(
              getValueForNumber(a11),
              getValueForNumber(b7),
              sorting.order === "desc" /* DESC */
            )
          );
        } else {
          const getValueForString = (ex) => ex.custom_fields[fieldId];
          examples = examples.slice().sort(
            (a11, b7) => sorting.order === "desc" /* DESC */ ? compareStringsWithNulls(
              getValueForString(b7),
              getValueForString(a11)
            ) : compareStringsWithNulls(
              getValueForString(a11),
              getValueForString(b7)
            )
          );
        }
      } else if (sorting.column === "similarity between cluster label and the most similar rationale" /* RATIONALE_CLUSTER */) {
        const maxSimilarityValueFromRationaleListItems = (rationaleListItems) => Math.max(
          ...rationaleListItems.filter(
            (rationaleItem) => (rationaleItem.assignedClusterIds || []).includes(
              this.selectedRationaleClusterId
            )
          ).map(
            (rationaleItem) => rationaleItem.similarities[this.selectedRationaleClusterId]
          )
        );
        examples = examples.slice().sort(
          (a11, b7) => maxSimilarityValueFromRationaleListItems(b7.rationale_list) - maxSimilarityValueFromRationaleListItems(a11.rationale_list)
        );
      }
      return examples;
    }
    get examplesForMainTable() {
      return this.sortedExamples.slice(0, this.numExamplesToDisplay);
    }
    // Reset state variables.
    resetVariables() {
      this.isShowTextDiff = true;
      this.selectedExample = null;
      this.selectedTag = null;
      this.selectedCustomFuncId = null;
      this.isExampleExpanded = {};
      this.selectedHistogramBinForScores = null;
      this.selectedHistogramBinForCustomFields = {};
      this.selectedBarChartValues = {};
      this.selectionsFromCustomFuncResults = {};
      this.selectedRationaleClusterId = null;
      this.searchFilters = {};
      this.searchFilterInputs = {};
      [
        FIELD_ID_FOR_INPUT,
        FIELD_ID_FOR_OUTPUT_A,
        FIELD_ID_FOR_OUTPUT_B,
        FIELD_ID_FOR_RATIONALES,
        FIELD_ID_FOR_RATIONALE_LIST
      ].forEach((fieldId) => void this.resetSearchFilter(fieldId));
      this.currentSorting = DEFAULT_SORTING_CRITERIA;
      this.numExamplesToDisplay = DEFAULT_NUM_EXAMPLES_TO_DISPLAY;
      this.columns = DEFAULT_COLUMN_LIST;
      this.customFunctions = {};
      this.histogramSpecForCustomFuncs = {};
      this.histogramSpecForCustomFuncsOfDiff = {};
      this.histogramSpecForCustomFields = {};
      this.winRateThreshold = DEFAULT_WIN_RATE_THRESHOLD;
      this.hasRationaleClusters = false;
    }
    initialize() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = {};
      for (const [key, value] of urlSearchParams) {
        params[key] = decodeURIComponent(value);
      }
      if (params.hasOwnProperty("results_path")) {
        const datasetPath = params["results_path"];
        const maxExamplesToLoad = params.hasOwnProperty("max_examples") ? Number(params["max_examples"]) : null;
        const samplingStepSize = params.hasOwnProperty("sampling_step_size") ? Number(params["sampling_step_size"]) : null;
        const columnsToHide = params.hasOwnProperty("hide_columns") ? params["hide_columns"].split(",") : [];
        this.loadData(
          datasetPath,
          null,
          maxExamplesToLoad,
          samplingStepSize,
          columnsToHide
        );
      }
    }
    // Update the sorting option.
    updateSorting(sorting) {
      this.currentSorting = sorting;
    }
    // Reset the sorting option.
    resetSorting() {
      this.currentSorting = DEFAULT_SORTING_CRITERIA;
    }
    // Update the status message.
    updateStatusMessage(message, hasTimeout = false) {
      this.statusMessage = message;
      this.isOpenStatusMessage = true;
      if (this.statusMessageTimeout != null) {
        clearTimeout(this.statusMessageTimeout);
      }
      if (hasTimeout === true) {
        this.statusMessageTimeout = setTimeout(
          () => this.isOpenStatusMessage = false,
          5e3
        );
      }
    }
    get appLink() {
      return `https://pair-code.github.io/llm-comparator/`;
    }
    determineHistogramSpecForScores() {
      let minValue = 0;
      let maxValue = 0;
      const individualRaterScores = this.examples.flatMap(
        (ex) => ex.individual_rater_scores.map((rating) => rating.score)
      );
      if (individualRaterScores.length > 0) {
        const minAndMaxFromIndividualScores = getMinAndMax(individualRaterScores);
        minValue = minAndMaxFromIndividualScores.minValue;
        maxValue = minAndMaxFromIndividualScores.maxValue;
      } else {
        const minAndMax = getMinAndMax(this.examples.map((ex) => ex.score));
        minValue = minAndMax.minValue;
        maxValue = minAndMax.maxValue;
      }
      if (minValue === 1 && maxValue === 5) {
        this.histogramSpecForScores = FIVE_POINT_LIKERT_HISTOGRAM_SPEC;
      } else if (minValue >= 1) {
        this.histogramSpecForScores = {
          rangeLeft: minValue,
          rangeRight: maxValue,
          numberOfBins: 7,
          isBounded: true,
          isDivergingScheme: false
        };
      } else {
        this.histogramSpecForScores = DEFAULT_HISTOGRAM_SPEC;
      }
    }
    // Add histogram spec for custom functions with return type number.
    // TODO: Merge with the side-by-side histograms.
    addHistogramSpecForCustomFunc(customFunc) {
      if (customFunc.returnType === "Number" /* NUMBER */) {
        const fieldId = getFieldIdForCustomFunc(customFunc.id);
        const minAndMaxValues = getMinAndMax([
          ...this.examples.map(
            (ex) => ex.custom_fields[fieldId][0]
          ),
          ...this.examples.map(
            (ex) => ex.custom_fields[fieldId][1]
          )
        ]);
        const rangeLeft = minAndMaxValues.minValue;
        const verySmallValue = 1e-8;
        const rangeRight = minAndMaxValues.maxValue === rangeLeft ? minAndMaxValues.maxValue + verySmallValue : minAndMaxValues.maxValue;
        this.histogramSpecForCustomFuncs[customFunc.id] = {
          rangeLeft,
          rangeRight,
          numberOfBins: 6,
          isBounded: true,
          isDivergingScheme: false
        };
        const minAndMaxDiff = getMinAndMax(
          this.examples.filter(
            (ex) => ex.custom_fields[fieldId][0] != null && ex.custom_fields[fieldId][1] != null
          ).map(
            (ex) => ex.custom_fields[fieldId][0] - ex.custom_fields[fieldId][1]
          )
        );
        const absoluteMax = Math.max(
          Math.abs(minAndMaxDiff.minValue),
          Math.abs(minAndMaxDiff.maxValue)
        );
        const rangeEnd = absoluteMax === 0 ? 1 : absoluteMax;
        this.histogramSpecForCustomFuncsOfDiff[customFunc.id] = {
          rangeLeft: -rangeEnd,
          rangeRight: rangeEnd,
          numberOfBins: 7,
          isBounded: true,
          isDivergingScheme: true
        };
      }
    }
    // Add histogram spec for custom functions for custom fields.
    addHistogramSpecForCustomFields(field) {
      if (field.type === "number" /* NUMBER */) {
        const { minValue, maxValue } = getMinAndMax(
          this.examples.map(
            (ex) => convertToNumber(ex.custom_fields[field.id])
          )
        );
        this.histogramSpecForCustomFields[field.id] = {
          rangeLeft: minValue,
          rangeRight: maxValue,
          numberOfBins: 6,
          isBounded: true,
          isDivergingScheme: false
        };
        this.selectedHistogramBinForCustomFields[field.id] = null;
      } else if (field.type === "per_model_number" /* PER_MODEL_NUMBER */) {
        const minAndMaxValues = getMinAndMax([
          ...this.examples.map(
            (ex) => ex.custom_fields[field.id][0]
          ),
          ...this.examples.map(
            (ex) => ex.custom_fields[field.id][1]
          )
        ]);
        const rangeLeft = minAndMaxValues.minValue;
        const verySmallValue = 1e-8;
        const rangeRight = minAndMaxValues.maxValue === rangeLeft ? minAndMaxValues.maxValue + verySmallValue : minAndMaxValues.maxValue;
        this.histogramSpecForCustomFields[field.id] = {
          rangeLeft,
          rangeRight,
          numberOfBins: 6,
          isBounded: true,
          isDivergingScheme: false
        };
        this.selectedHistogramBinForCustomFields[field.id] = {
          "A": null,
          "B": null
        };
      }
    }
    // Read an uploaded json file.
    readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result.toString());
          } else {
            reject(new Error("Failed to read file content."));
          }
        };
        reader.readAsText(file);
      });
    }
    // Load data either from a specified path or uploaded file.
    async loadData(datasetPath, fileObject = null, maxNumExamplesToDisplay = null, samplingStepSize = null, columnsToHide = []) {
      this.isOpenDatasetSelectionPanel = false;
      this.updateStatusMessage("Loading the dataset... Please wait...");
      let dataResponse;
      if (fileObject != null) {
        try {
          const fileContent = await this.readFileContent(fileObject);
          const jsonResponse = JSON.parse(fileContent);
          dataResponse = jsonResponse;
        } catch (error) {
          console.error(error);
          this.updateStatusMessage(
            `Encountered an error while loading file "${datasetPath}": ${error}`
          );
          this.isOpenDatasetSelectionPanel = true;
          return;
        }
      } else {
        try {
          let response = new Response();
          if (datasetPath.startsWith("http")) {
            response = await fetch(datasetPath, {
              headers: { "Accept": "application/json" }
            });
          } else {
            const errorMessage = "Unsupported data loading method. Please provide a web URL or use the file uploader.";
            throw new Error(errorMessage);
          }
          if (response.status === 502) {
            const errorMessage = `Failed to load the dataset. The server may not exist anymore, possibly with updated URLs. Try opening this URL (${this.appLink}), rather than refreshing the page.`;
            throw new Error(errorMessage);
          }
          const jsonResponse = await response.json();
          if (jsonResponse.hasOwnProperty("error")) {
            throw new Error(jsonResponse.error);
          }
          dataResponse = jsonResponse;
        } catch (error) {
          console.error(error);
          this.updateStatusMessage(
            `Encountered an error while loading "${datasetPath}": ${error}`
          );
          this.isOpenDatasetSelectionPanel = true;
          return;
        }
      }
      this.datasetPath = datasetPath;
      this.isDatasetPathUploadedFile = fileObject != null;
      this.metadata = dataResponse.metadata;
      this.models = dataResponse.models;
      this.examples = dataResponse.examples.map(
        (example, index) => {
          example.index = index;
          example.individual_rater_scores.forEach(
            (rating, ratingIndex) => {
              rating.index = ratingIndex;
            }
          );
          return example;
        }
      );
      this.resetVariables();
      if (dataResponse.rationale_clusters) {
        this.rationaleClusters = [
          {
            id: -1,
            title: "(others)",
            aWinCount: 0,
            bWinCount: 0
          },
          ...dataResponse.rationale_clusters.map(
            (cluster, clusterIndex) => {
              return {
                id: clusterIndex,
                title: cluster.title,
                aWinCount: 0,
                bWinCount: 0
              };
            }
          )
        ];
        this.hasRationaleClusters = this.rationaleClusters.length > 1;
        if (this.hasRationaleClusters === true) {
          this.columns.filter(
            (field) => field.id === FIELD_ID_FOR_RATIONALE_LIST
          )[0].visible = true;
          this.reassignClusters();
        }
      }
      this.determineHistogramSpecForScores();
      const fieldTypes = Object.values(FieldType);
      this.metadata.custom_fields_schema.forEach(
        (loadedField) => {
          if (!fieldTypes.includes(loadedField.type)) {
            this.updateStatusMessage(
              `${loadedField.name} is not a valid field type. It should be one of [${fieldTypes.join(
                ", "
              )}].`
            );
          }
          const fieldId = `custom_field:${loadedField.name}`;
          const field = {
            id: fieldId,
            name: loadedField.name,
            type: loadedField.type,
            visible: !columnsToHide.includes(loadedField.name) && !this.customFieldsOfPerRatingTypesWithNoAggregationSupport().includes(
              loadedField.type
            ),
            domain: loadedField.domain || void 0
          };
          this.columns.push(field);
        }
      );
      this.customFieldsWithoutPerRatingType.forEach((field) => {
        this.examples.forEach((ex) => {
          const value = ex.custom_fields[field.name];
          ex.custom_fields[field.id] = value;
          delete ex.custom_fields[field.name];
        });
        this.addHistogramSpecForCustomFields(field);
        if (field.type === "category" /* CATEGORY */) {
          this.selectedBarChartValues[field.id] = [null];
        } else if (field.type === "per_model_category" /* PER_MODEL_CATEGORY */ || field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */) {
          this.selectedBarChartValues[field.id] = [null, null];
        }
        if (field.type === "text" /* TEXT */) {
          this.resetSearchFilter(field.id);
        }
      });
      this.customFieldsOfPerRatingType.forEach((ratingField) => {
        this.examples.forEach((ex) => {
          if (ratingField.type === "per_rating_string" /* PER_RATING_STRING */) {
            ex.individual_rater_scores.forEach((rating) => {
              const value = rating.custom_fields[ratingField.name];
              rating.custom_fields[ratingField.id] = value;
              delete rating.custom_fields[ratingField.name];
            });
          } else if (ratingField.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
            ex.individual_rater_scores.forEach((rating) => {
              const value = rating.custom_fields[ratingField.name] || [
                null,
                null
              ];
              rating.custom_fields[ratingField.id] = value;
              delete rating.custom_fields[ratingField.name];
            });
          }
        });
        this.examples.forEach((ex) => {
          if (ratingField.type === "per_rating_string" /* PER_RATING_STRING */) {
            ex.custom_fields[ratingField.id] = ex.individual_rater_scores.map(
              (rating) => rating.custom_fields[ratingField.id]
            ).join("\n");
          } else if (ratingField.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
            ex.custom_fields[ratingField.id] = this.models.map(
              (unused, modelIndex) => {
                const valuesAcrossRatings = ex.individual_rater_scores.map(
                  (rating) => rating.custom_fields[ratingField.id][modelIndex]
                );
                return groupByValues(valuesAcrossRatings);
              }
            );
          }
        });
        if (ratingField.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          this.computeValueDomainForCustomField(ratingField);
          this.selectedBarChartValues[ratingField.id] = [null, null];
        }
      });
      if (this.columns.filter((field) => field.type !== "base" /* BASE */).length > 0) {
        this.isOpenSettingsPanel = true;
      }
      for (let i23 = 0; i23 < this.examples.length; i23++) {
        const ex = this.examples[i23];
        if (typeof ex.output_text_a !== "string" || typeof ex.output_text_b !== "string") {
          this.isShowTextDiff = false;
          break;
        }
      }
      INITIAL_CUSTOM_FUNCTIONS.forEach((customFunc) => {
        const newId = this.newCustomFuncId;
        customFunc.id = newId;
        this.customFunctions[newId] = customFunc;
        this.selectionsFromCustomFuncResults[newId] = initializeCustomFuncSelections();
        this.runCustomFunction(this.examples, customFunc);
      });
      const statusMessage = `Loaded the dataset of ${this.examples.length} examples.`;
      this.updateStatusMessage(statusMessage, true);
      const url = new URL(window.location.href);
      if (this.isDatasetPathUploadedFile === false) {
        url.searchParams.set("results_path", this.datasetPath);
        if (columnsToHide.length > 0) {
          url.searchParams.set("hide_columns", columnsToHide.join(","));
        } else {
          if (url.searchParams.has("hide_columns")) {
            url.searchParams.delete("hide_columns");
          }
        }
        if (maxNumExamplesToDisplay != null) {
          url.searchParams.set(
            "max_examples",
            maxNumExamplesToDisplay.toString()
          );
        } else {
          if (url.searchParams.has("max_examples")) {
            url.searchParams.delete("max_examples");
          }
        }
      } else {
        url.searchParams.delete("results_path");
      }
      window.history.pushState({}, "", url.toString());
    }
    // Run a custom function over all examples.
    runCustomFunction(examples, customFunc) {
      try {
        const results = { "A": {}, "B": {} };
        examples.forEach((example, index) => {
          Object.values(AOrB).forEach((model) => {
            const output = model === "A" /* A */ ? example.output_text_a : example.output_text_b;
            const result = this.customFunctionService.executeCustomFunction(
              extractTextFromTextOrSequenceChunks(output),
              example,
              customFunc
            );
            if (index === 0 && result === void 0) {
              throw new Error(
                "Encountered an error while executing the function. See console for details."
              );
            } else if (result === void 0) {
              results[model][example.index] = null;
            } else {
              results[model][example.index] = result;
            }
          });
        });
        const fieldId = getFieldIdForCustomFunc(customFunc.id);
        examples.forEach((example) => {
          example.custom_fields[fieldId] = [
            results["A" /* A */][example.index],
            results["B" /* B */][example.index]
          ];
        });
        this.customFunctions[customFunc.id] = customFunc;
        this.selectionsFromCustomFuncResults[customFunc.id] = initializeCustomFuncSelections();
        this.addHistogramSpecForCustomFunc(customFunc);
        this.isShowCustomFuncEditor = false;
        const fieldType = customFunc.returnType === "Boolean" /* BOOLEAN */ ? "per_model_boolean" /* PER_MODEL_BOOLEAN */ : customFunc.returnType === "Number" /* NUMBER */ ? "per_model_number" /* PER_MODEL_NUMBER */ : "per_model_category" /* PER_MODEL_CATEGORY */;
        const existingField = this.columns.filter(
          (field) => field.id === fieldId
        );
        if (existingField.length > 0) {
          existingField[0].name = customFunc.name;
          existingField[0].type = fieldType;
        } else {
          this.columns.push({
            id: fieldId,
            name: customFunc.name,
            type: fieldType,
            visible: false
          });
        }
        this.updateStatusMessage(
          "Completed executing the function over examples.",
          true
        );
      } catch (error) {
        console.error(error);
        this.updateStatusMessage(error, false);
      }
    }
    // Remove a rationale cluster row.
    removeCluster(clusterId) {
      if (clusterId === this.selectedRationaleClusterId) {
        this.selectedRationaleClusterId = null;
      }
      this.rationaleClusters = this.rationaleClusters.filter(
        (cluster) => cluster.id !== clusterId
      );
      this.reassignClusters();
    }
    // Check if the similarity between a rationale phrase (each bullet item)
    // and a cluster title is above the threshold.
    reassignClusters() {
      this.examples.forEach((example) => {
        example.rationale_list.forEach((rationaleItem) => {
          rationaleItem.assignedClusterIds = this.rationaleClusters.map((cluster) => cluster.id).filter(
            (clusterId) => clusterId >= 0 && rationaleItem.similarities[clusterId] >= this.rationaleClusterSimilarityThreshold
          );
          if (rationaleItem.assignedClusterIds.length === 0) {
            rationaleItem.assignedClusterIds = [-1];
          }
        });
      });
    }
  };
  __decorateClass([
    observable
  ], AppState.prototype, "metadata", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "models", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "examples", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "rationaleClusters", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "datasetPath", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isDatasetPathUploadedFile", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isOpenDatasetSelectionPanel", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "exampleDatasetPaths", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedTag", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "currentSorting", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isExampleExpanded", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedExample", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "showSelectedExampleDetails", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "exampleDetailsPanelExpanded", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "hasRationaleClusters", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedRationaleClusterId", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "hoveredRationaleClusterId", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "matchedRationaleClusterIds", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "rationaleClusterSimilarityThreshold", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "columns", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "showSidebarComponents", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedBarChartValues", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "histogramSpecForScores", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedHistogramBinForScores", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "histogramSpecForCustomFields", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedHistogramBinForCustomFields", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedHistogramBinForRatingsForSelectedExample", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedBarChartValueForSelectedExample", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "winRateThreshold", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isFlipScoreHistogramAxis", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "statusMessage", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isOpenStatusMessage", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "searchFilters", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "searchFilterInputs", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isOpenSettingsPanel", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isShowTextDiff", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "useMonospace", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "numExamplesToDisplay", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isShowTagChips", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "isShowSidebar", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "numberOfLinesPerOutputCell", 2);
  __decorateClass([
    computed
  ], AppState.prototype, "numberOfShownTextColumns", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "scoreMiddlePoint", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "isScoreDivergingScheme", 1);
  __decorateClass([
    observable
  ], AppState.prototype, "customFunctions", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "histogramSpecForCustomFuncs", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "histogramSpecForCustomFuncsOfDiff", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectedCustomFuncId", 2);
  __decorateClass([
    observable
  ], AppState.prototype, "selectionsFromCustomFuncResults", 2);
  __decorateClass([
    computed
  ], AppState.prototype, "selectedCustomFunc", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "selectedCustomFuncName", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "newCustomFuncId", 1);
  __decorateClass([
    observable
  ], AppState.prototype, "isShowCustomFuncEditor", 2);
  __decorateClass([
    computed
  ], AppState.prototype, "customFieldsOfNumberType", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "customFieldsOfCategoryType", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "customFieldsOfPerModelNumberType", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "customFieldsOfPerModelCategoryTypeIncludingPerRating", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "visibleColumns", 1);
  __decorateClass([
    observable
  ], AppState.prototype, "valueDomainsForCustomFields", 2);
  __decorateClass([
    computed
  ], AppState.prototype, "individualRatingScoreValueDomain", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "filteredExamplesExceptChartSelections", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "filteredExamples", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "sortedExamples", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "examplesForMainTable", 1);
  __decorateClass([
    computed
  ], AppState.prototype, "appLink", 1);

  // client/core.ts
  var Core = class {
    constructor() {
      this.services = /* @__PURE__ */ new Map();
      this.buildServices();
    }
    async initialize() {
      const appState = this.getService(AppState);
      appState.initialize();
    }
    buildServices() {
      const customFunctionService = new CustomFunctionService();
      const appState = new AppState(customFunctionService);
      this.services.set(CustomFunctionService, customFunctionService);
      this.services.set(AppState, appState);
    }
    getService(t17) {
      const service = this.services.get(t17);
      if (service === void 0) {
        throw new Error(`Service is undefined: ${t17.name}`);
      }
      return service;
    }
  };
  var core = new Core();

  // client/components/charts.ts
  var ChartsElement = class extends MobxLitElement {
    constructor() {
      super(...arguments);
      this.appState = core.getService(AppState);
      this.svgWidth = 220;
      this.svgHeight = 110;
    }
    renderCustomFieldHistogram(field) {
      const chartSelectionKey = {
        chartType: "histogram" /* HISTOGRAM */,
        fieldId: field.id,
        model: null
      };
      const getHistogramRawDataValues = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey).filter((ex) => ex.custom_fields[field.id] != null).map((ex) => ex.custom_fields[field.id]);
      const handleClickHistogramBar = (binIndex) => {
        if (this.appState.selectedHistogramBinForCustomFields[field.id] === binIndex) {
          this.appState.selectedHistogramBinForCustomFields[field.id] = null;
        } else {
          this.appState.selectedHistogramBinForCustomFields[field.id] = binIndex;
        }
      };
      const isAnyBinSelected = () => this.appState.selectedHistogramBinForCustomFields[field.id] !== null;
      const isThisBinSelected = (binIndex) => binIndex === this.appState.selectedHistogramBinForCustomFields[field.id];
      return x`
        <comparator-histogram
          .getHistogramSpec=${() => this.appState.histogramSpecForCustomFields[field.id]}
          .getRawDataValues=${getHistogramRawDataValues}
          .handleClickHistogramBar=${handleClickHistogramBar}
          .isAnyBinSelected=${isAnyBinSelected}
          .isThisBinSelected=${isThisBinSelected}
          .svgHeight=${60}>
        </comparator-histogram>`;
    }
    renderCustomFieldSideBySideHistogram(field) {
      const getHistogramSpec = () => this.appState.histogramSpecForCustomFields[field.id];
      const chartSelectionKey = (model) => ({
        chartType: "histogram" /* HISTOGRAM */,
        fieldId: field.id,
        model
      });
      const getHistogramDataForA = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey("A")).filter(
        (ex) => ex.custom_fields[field.id][0] != null
      ).map((ex) => ex.custom_fields[field.id][0]);
      const getHistogramDataForB = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey("B")).filter(
        (ex) => ex.custom_fields[field.id][1] != null
      ).map((ex) => ex.custom_fields[field.id][1]);
      const handleClickHistogramBar = (binIndex, model) => {
        if (this.appState.selectedHistogramBinForCustomFields[field.id][model] === binIndex) {
          this.appState.selectedHistogramBinForCustomFields[field.id][model] = null;
        } else {
          this.appState.selectedHistogramBinForCustomFields[field.id][model] = binIndex;
        }
      };
      const handleClickHistogramBarForA = (binIndex) => void handleClickHistogramBar(binIndex, "A" /* A */);
      const handleClickHistogramBarForB = (binIndex) => void handleClickHistogramBar(binIndex, "B" /* B */);
      const selections = this.appState.selectedHistogramBinForCustomFields[field.id];
      const isAnyBinSelectedForA = () => selections["A"] != null;
      const isAnyBinSelectedForB = () => selections["B"] != null;
      const isThisBinSelectedForA = (binIndex) => selections["A"] === binIndex;
      const isThisBinSelectedForB = (binIndex) => selections["B"] === binIndex;
      if (getHistogramSpec() !== void 0) {
        return x` <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForA}
          .handleClickHistogramBar=${handleClickHistogramBarForA}
          .isAnyBinSelected=${isAnyBinSelectedForA}
          .isThisBinSelected=${isThisBinSelectedForA}
          .specificColorScheme=${"A"}
          .svgWidth=${this.svgWidth}
          .svgHeight=${this.svgHeight * 0.5}
          .showBottomAxis=${false}
          .titleOnLeft=${"A"}>
        </comparator-histogram>
        <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForB}
          .handleClickHistogramBar=${handleClickHistogramBarForB}
          .isAnyBinSelected=${isAnyBinSelectedForB}
          .isThisBinSelected=${isThisBinSelectedForB}
          .specificColorScheme=${"B"}
          .svgWidth=${this.svgWidth}
          .svgHeight=${this.svgHeight * 0.5}
          .showBottomAxis=${true}
          .titleOnLeft=${"B"}>
        </comparator-histogram>`;
      } else {
        return x``;
      }
    }
    renderCustomFieldBarChart(field) {
      const getValueDomain = () => {
        const values = this.appState.examples.filter((ex) => ex.custom_fields[field.id] != null).map((ex) => ex.custom_fields[field.id]);
        if (field.domain !== void 0) {
          return mergeTwoArrays(field.domain, groupByAndSortKeys(values));
        } else {
          return groupByAndSortKeys(values);
        }
      };
      const chartSelectionKey = {
        chartType: "bar" /* BAR_CHART */,
        fieldId: field.id,
        model: null
      };
      const getBarChartData = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey).filter((ex) => ex.custom_fields[field.id] != null).map((ex) => ex.custom_fields[field.id]);
      const handleClickBar = (value) => {
        if (this.appState.selectedBarChartValues[field.id][0] === value) {
          this.appState.selectedBarChartValues[field.id][0] = null;
        } else {
          this.appState.selectedBarChartValues[field.id][0] = value;
        }
      };
      const isAnyBarSelected = () => this.appState.selectedBarChartValues[field.id][0] !== null;
      const isThisBarSelected = (value) => this.appState.selectedBarChartValues[field.id][0] === value;
      return x`
        <comparator-bar-chart
            .getValueDomain=${getValueDomain}
            .getDataValues=${getBarChartData}
            .handleClickBar=${handleClickBar}
            .isAnyBarSelected=${isAnyBarSelected}
            .isThisBarSelected=${isThisBarSelected}>
        </comparator-bar-chart>`;
    }
    renderCustomFieldSideBySideBarChart(field) {
      const groupCount = this.appState.models.length;
      const groupIndices = Array.from({ length: groupCount }, (unused, i23) => i23);
      const getValueDomain = () => {
        const getValue = (ex) => ex.custom_fields[field.id];
        const values = groupIndices.flatMap(
          (groupIndex) => this.appState.examples.filter((ex) => getValue(ex)[groupIndex] != null).map((ex) => getValue(ex)[groupIndex].toString())
        );
        if (field.domain !== void 0) {
          return mergeTwoArrays(field.domain, groupByAndSortKeys(values));
        } else {
          return groupByAndSortKeys(values);
        }
      };
      const chartSelectionKey = (groupIndex) => ({
        chartType: "bar" /* BAR_CHART */,
        fieldId: field.id,
        model: groupIndex
      });
      const getBarChartData = () => {
        const getValue = (ex) => ex.custom_fields[field.id];
        return groupIndices.map(
          (groupIndex) => this.appState.getFilteredExamplesExceptForParticularChart(
            chartSelectionKey(groupIndex)
          ).filter((ex) => getValue(ex)[groupIndex] != null).map((ex) => getValue(ex)[groupIndex].toString())
        );
      };
      const handleClickBar = (value, groupIndex) => {
        if (this.appState.selectedBarChartValues[field.id][groupIndex] === value) {
          this.appState.selectedBarChartValues[field.id][groupIndex] = null;
        } else {
          this.appState.selectedBarChartValues[field.id][groupIndex] = value;
        }
      };
      const isAnyBarSelected = (groupIndex) => this.appState.selectedBarChartValues[field.id][groupIndex] !== null;
      const isThisBarSelected = (value, groupIndex) => this.appState.selectedBarChartValues[field.id][groupIndex] === value;
      return x` <comparator-bar-chart
      .getValueDomain=${getValueDomain}
      .getGroupedDataValues=${getBarChartData}
      .groupCount=${groupCount}
      .handleClickBar=${handleClickBar}
      .isAnyBarSelected=${isAnyBarSelected}
      .isThisBarSelected=${isThisBarSelected}>
    </comparator-bar-chart>`;
    }
    // Side-by-side bar charts for per-rating-per-model type.
    renderCustomFieldPerRatingSideBySideBarChart(field) {
      const groupCount = this.appState.models.length;
      const groupIndices = Array.from({ length: groupCount }, (unused, i23) => i23);
      const getValueDomain = () => {
        return this.appState.valueDomainsForCustomFields[field.id];
      };
      const chartSelectionKey = (groupIndex) => ({
        chartType: "bar" /* BAR_CHART */,
        fieldId: field.id,
        model: groupIndex
      });
      const getBarChartNestedData = () => {
        return groupIndices.map(
          (groupIndex) => this.appState.getFilteredExamplesExceptForParticularChart(
            chartSelectionKey(groupIndex)
          ).map((ex) => {
            return ex.individual_rater_scores.map(
              (rating) => rating.custom_fields[field.id][groupIndex]
            );
          })
        );
      };
      const handleClickBar = (value, groupIndex) => {
        if (this.appState.selectedBarChartValues[field.id][groupIndex] === value) {
          this.appState.selectedBarChartValues[field.id][groupIndex] = null;
        } else {
          this.appState.selectedBarChartValues[field.id][groupIndex] = value;
        }
      };
      const isAnyBarSelected = (groupIndex) => this.appState.selectedBarChartValues[field.id][groupIndex] !== null;
      const isThisBarSelected = (value, groupIndex) => this.appState.selectedBarChartValues[field.id][groupIndex] === value;
      return x` <comparator-bar-chart
      .getValueDomain=${getValueDomain}
      .getGroupedNestedDataValues=${getBarChartNestedData}
      .groupCount=${groupCount}
      .isNested=${true}
      .handleClickBar=${handleClickBar}
      .isAnyBarSelected=${isAnyBarSelected}
      .isThisBarSelected=${isThisBarSelected}>
    </comparator-bar-chart>`;
    }
    render() {
      const renderChartsForCustomFields = this.appState.columns.filter((field) => field.id.startsWith("custom_field:")).filter(
        (field) => field.type === "number" /* NUMBER */ || field.type === "category" /* CATEGORY */ || field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */ || field.type === "per_model_number" /* PER_MODEL_NUMBER */ || field.type === "per_model_category" /* PER_MODEL_CATEGORY */ || field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */
      ).map((field) => {
        if (field.type === "number" /* NUMBER */) {
          return [field.name, this.renderCustomFieldHistogram(field)];
        } else if (field.type === "per_model_number" /* PER_MODEL_NUMBER */) {
          return [
            field.name,
            this.renderCustomFieldSideBySideHistogram(field)
          ];
        } else if (field.type === "per_model_category" /* PER_MODEL_CATEGORY */ || field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */) {
          return [
            field.name,
            this.renderCustomFieldSideBySideBarChart(field)
          ];
        } else if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          return [
            field.name,
            this.renderCustomFieldPerRatingSideBySideBarChart(field)
          ];
        } else {
          return [field.name, this.renderCustomFieldBarChart(field)];
        }
      });
      const handleClickTitleBar = (fieldName) => {
        const key = `custom_field:${fieldName}`;
        if (!this.appState.showSidebarComponents.hasOwnProperty(key)) {
          this.appState.showSidebarComponents[key] = true;
        } else if (this.appState.showSidebarComponents[key] === false) {
          this.appState.showSidebarComponents[key] = true;
        } else {
          this.appState.showSidebarComponents[key] = false;
        }
      };
      const renderSidebarComponents = renderChartsForCustomFields.map((chart) => {
        const [fieldName, renderChart] = chart;
        const key = `custom_field:${fieldName}`;
        return x`
            <div class="sidebar-component">
              <div class="sidebar-component-title"
                @click=${() => void handleClickTitleBar(fieldName)}>
                <div>${fieldName}</div>
                <div>
                  ${this.appState.showSidebarComponents[key] === false ? x`<mwc-icon class="expand-icon">unfold_more</mwc-icon>` : x`<mwc-icon class="expand-icon">unfold_less</mwc-icon>`}
                </div>
              </div>
              ${this.appState.showSidebarComponents[key] === true ? x`
                  <div class="sidebar-component-content">
                    ${renderChart}
                  </div>` : ""}
            </div>`;
      });
      return x`${renderSidebarComponents}`;
    }
  };
  ChartsElement.styles = styles;
  ChartsElement = __decorateClass([
    t3("comparator-charts")
  ], ChartsElement);

  // client/components/custom_functions.css
  var styles4 = i`td {
  border-bottom: 1px solid #eee;
  height: 60px;
  vertical-align: top;
}

tr:first-child td {
  border-top: 1px solid #eee;
}

tr.selected td,
tr:hover td {
  background-color: var(--comparator-custom-func-100);
  color: #000;
}

td.function-info {
  padding: 6px 4px 2px 8px;
}

td.results-chart {
  padding-top: 2px;
  width: 132px;
}

td.edit-remove-icons {
  width: 20px;
  vertical-align: middle;
}

.function-name {
  padding: 3px 0;
}

.function-type {
  color: var(--comparator-grey-450);
  font-size: 10px;
}

.icon {
  color: var(--comparator-grey-300);
  margin: 2px 0;
  font-size: 12px;
}

.icon.disabled {
  visibility: hidden;
}

line.axis {
  fill: none;
  stroke: #ccc;
  stroke-width: 1;
}

.custom-func-results-bar {
  cursor: pointer;
  fill: #f3f3f3;
  stroke-width: 0;
}

.custom-func-results-bar.value-no.selected,
.custom-func-results-bar.value-no:hover {
  fill: #e7e7e7;
}

.model-a {
  fill: var(--comparator-model-a);
}

.model-b {
  fill: var(--comparator-model-b);
}

.custom-func-results-mean {
  stroke-width: 0;
}

.histogram-bar {
  fill-opacity: 0.75;
}

.model-label {
  alignment-baseline: hanging;
  fill: var(--comparator-grey-500);
  font-size: 11px;
  text-anchor: middle;
}

.number-label {
  fill: var(--comparator-grey-500);
  font-size: 11px;
  text-anchor: middle;
}

.number-label-description {
  fill: #bbb;
  font-size: 7px;
  text-anchor: end;
}

.edit-custom-function {
  background-color: var(--comparator-grey-100);
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 5px 10px;
}

.edit-custom-function-title {
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  padding: 4px 0;
}

.edit-custom-function-form {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.field-row {
  display: flex;
  gap: 4px;
  margin: 2px 0;
}

.field-row .field-row-label {
  font-weight: 500;
  padding: 4px 0;
  width: 45px;
}

.field-row .field-row-content {
  align-items: center;
  display: flex;
  gap: 8px;
}

.edit-custom-function .func-name-input {
  border: 1px solid var(--comparator-grey-300);
  font-family: monospace;
  padding: 4px 8px;
  width: 220px;
}

.edit-custom-function textarea {
  border: 1px solid var(--comparator-grey-300);
  margin-top: 4px;
  padding: 4px 6px;
  width: 220px;
}

.run-button {
  align-self: end;
  background-color: var(--comparator-custom-func-200);
  border: 0;
  border-radius: 12px;
  color: var(--comparator-custom-func-800);
  cursor: pointer;
  margin-top: 8px;
  padding: 6px 0;
  width: 80px;
}
`;

  // client/components/custom_functions.ts
  var BinaryStackedBarChart = class extends s3 {
    constructor() {
      super();
      this.svgWidth = 100;
      this.svgHeight = 40;
      this.customFuncId = -1;
      this.countA = 0;
      this.countB = 0;
      this.numExamples = 0;
      this.appState = core.getService(AppState);
      this.topPadding = 10;
      this.bottomPadding = 15;
      this.barSidePadding = 10;
      makeObservable(this);
    }
    get barAreaHeight() {
      return this.svgHeight - this.topPadding - this.bottomPadding;
    }
    get barWidth() {
      return this.svgWidth * 0.5 - this.barSidePadding * 2;
    }
    render() {
      const trueRateA = this.numExamples === 0 ? 0 : this.countA / this.numExamples;
      const trueRateB = this.numExamples === 0 ? 0 : this.countB / this.numExamples;
      const yPositionA = this.barAreaHeight * (1 - trueRateA);
      const yPositionB = this.barAreaHeight * (1 - trueRateB);
      const selections = this.appState.selectionsFromCustomFuncResults[this.customFuncId];
      const styleBarForFalse = (model) => e6({
        "custom-func-results-bar": true,
        "value-no": true,
        "selected": selections[model] === false
      });
      const styleBarForTrue = (model) => e6({
        "custom-func-results-bar": true,
        "model-a": model === "A" /* A */,
        "model-b": model === "B" /* B */
      });
      const styleClickableAreasForTrue = (model) => e6({
        "clickable-transparent-area": true,
        "selected": selections[model] === true
      });
      const handleClickBar = (customFuncId, model, isTrue) => {
        const selections2 = this.appState.selectionsFromCustomFuncResults[customFuncId];
        if (selections2[model] === isTrue) {
          selections2[model] = null;
        } else {
          selections2[model] = isTrue;
          this.appState.selectedCustomFuncId = customFuncId;
        }
      };
      const renderBottomAxis = b2`
        <g transform="translate(0, ${this.barAreaHeight})">
          <line class="axis" x1="0" x2=${this.svgWidth} y1=${1} y2=${1} />
          <text class="model-label" x=${this.svgWidth * 0.25} y=${2}>A</text>
          <text class="model-label" x=${this.svgWidth * 0.75} y=${2}>B</text>
        </g>`;
      const renderBarsForFalse = b2`
        <rect class=${styleBarForFalse("A" /* A */)}
            x=${this.barSidePadding} y="0"
            width=${this.barWidth} height=${yPositionA}
            @click=${() => void handleClickBar(this.customFuncId, "A" /* A */, false)} />
        <rect class=${styleBarForFalse("B" /* B */)}
            x=${this.svgWidth * 0.5 + this.barSidePadding} y="0"
            width=${this.barWidth} height=${yPositionB}
            @click=${() => void handleClickBar(this.customFuncId, "B" /* B */, false)} />`;
      const renderBarsForTrue = b2`
        <rect class=${styleBarForTrue("A" /* A */)}
            x=${this.barSidePadding} y=${yPositionA}
            width=${this.barWidth} height=${this.barAreaHeight * trueRateA} />
        <rect class=${styleBarForTrue("B" /* B */)}
            x=${this.svgWidth * 0.5 + this.barSidePadding} y=${yPositionB}
            width=${this.barWidth} height=${this.barAreaHeight * trueRateB} />`;
      const renderNumberLabelsForTrueCount = b2`
        <text class="number-label"
          x=${this.svgWidth * 0.25} y=${yPositionA} dy="-2">
          ${this.countA}
        </text>
        <text class="number-label"
          x=${this.svgWidth * 0.75} y=${yPositionB} dy="-2">
          ${this.countB}
        </text>`;
      const renderClickableAreasForTrue = b2`
        ${trueRateA > 0 ? b2`
            <rect class=${styleClickableAreasForTrue("A" /* A */)}
              x=${this.barSidePadding} y=${yPositionA}
              width=${this.barWidth}
              height=${this.barAreaHeight * trueRateA + 10}
              @click=${() => void handleClickBar(
        this.customFuncId,
        "A" /* A */,
        true
      )} />` : ""}
        ${trueRateB > 0 ? b2`
            <rect class=${styleClickableAreasForTrue("B" /* B */)}
              x=${this.svgWidth * 0.5 + this.barSidePadding} y=${yPositionB}
              width=${this.barWidth}
              height=${this.barAreaHeight * trueRateB + 10}
              @click=${() => void handleClickBar(
        this.customFuncId,
        "B" /* B */,
        true
      )} />` : ""}`;
      return x` <svg width=${this.svgWidth} height=${this.svgHeight}>
      <g transform="translate(0, ${this.topPadding})">
        ${renderBottomAxis} ${renderBarsForFalse} ${renderBarsForTrue}
        ${renderNumberLabelsForTrueCount} ${renderClickableAreasForTrue}
      </g>
    </svg>`;
    }
  };
  BinaryStackedBarChart.styles = [styles, styles4];
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "svgWidth", 2);
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "svgHeight", 2);
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "customFuncId", 2);
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "countA", 2);
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "countB", 2);
  __decorateClass([
    n4({ type: Number })
  ], BinaryStackedBarChart.prototype, "numExamples", 2);
  __decorateClass([
    computed
  ], BinaryStackedBarChart.prototype, "barAreaHeight", 1);
  __decorateClass([
    computed
  ], BinaryStackedBarChart.prototype, "barWidth", 1);
  BinaryStackedBarChart = __decorateClass([
    t3("comparator-binary-stacked-bar-chart")
  ], BinaryStackedBarChart);
  var CustomFunctionsElement = class extends MobxLitElement {
    constructor() {
      super(...arguments);
      this.appState = core.getService(AppState);
      this.svgWidth = 130;
      this.editedCustomFunc = makeNewCustomFunc(
        this.appState.newCustomFuncId
      );
    }
    renderChartForBooleanType(customFunc) {
      const svgHeight = DEFAULT_CHART_HEIGHT_FOR_CUSTOM_FUNCS;
      const filteredExamples = this.appState.filteredExamples;
      const aggregatedResults = {
        "A": { "true": 0, "false": 0 },
        "B": { "true": 0, "false": 0 }
      };
      const fieldId = getFieldIdForCustomFunc(customFunc.id);
      filteredExamples.forEach((ex) => {
        if (ex.custom_fields[fieldId][0] != null) {
          aggregatedResults["A"][ex.custom_fields[fieldId][0].toString()] += 1;
        }
        if (ex.custom_fields[fieldId][1] != null) {
          aggregatedResults["B"][ex.custom_fields[fieldId][1].toString()] += 1;
        }
      });
      return x` <comparator-binary-stacked-bar-chart
      .svgWidth=${this.svgWidth}
      .svgHeight=${svgHeight}
      .customFuncId=${customFunc.id}
      .countA=${aggregatedResults["A"]["true"]}
      .countB=${aggregatedResults["B"]["true"]}
      .numExamples=${filteredExamples.length}>
    </comparator-binary-stacked-bar-chart>`;
    }
    // TODO: Merge into the side-by-side histogram code in charts.ts.
    renderChartForNumberType(customFunc) {
      const getHistogramSpec = () => this.appState.histogramSpecForCustomFuncs[customFunc.id];
      const getHistogramSpecForDiff = () => this.appState.histogramSpecForCustomFuncsOfDiff[customFunc.id];
      const fieldId = getFieldIdForCustomFunc(customFunc.id);
      const chartSelectionKey = (model) => ({ chartType: "custom_function" /* CUSTOM_FUNCTION */, fieldId, model });
      const getHistogramDataForA = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey("A")).filter(
        (ex) => ex.custom_fields[fieldId][0] != null
      ).map((ex) => ex.custom_fields[fieldId][0]);
      const getHistogramDataForB = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey("B")).filter(
        (ex) => ex.custom_fields[fieldId][1] != null
      ).map((ex) => ex.custom_fields[fieldId][1]);
      const getHistogramDataForDiff = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey("A-B")).filter(
        (ex) => ex.custom_fields[fieldId][0] != null && ex.custom_fields[fieldId][1] != null
      ).map(
        (ex) => ex.custom_fields[fieldId][0] - ex.custom_fields[fieldId][1]
      );
      const handleClickHistogramBar = (binIndex, model) => {
        const selections2 = this.appState.selectionsFromCustomFuncResults[customFunc.id];
        if (selections2[model] === binIndex) {
          selections2[model] = null;
        } else {
          selections2[model] = binIndex;
          this.appState.selectedCustomFuncId = customFunc.id;
        }
      };
      const handleClickHistogramBarForA = (binIndex) => void handleClickHistogramBar(binIndex, "A" /* A */);
      const handleClickHistogramBarForB = (binIndex) => void handleClickHistogramBar(binIndex, "B" /* B */);
      const handleClickHistogramBarForDiff = (binIndex) => void handleClickHistogramBar(binIndex, "A-B");
      const selections = this.appState.selectionsFromCustomFuncResults[customFunc.id];
      const isAnyBinSelectedForA = () => selections["A"] != null;
      const isAnyBinSelectedForB = () => selections["B"] != null;
      const isAnyBinSelectedForDiff = () => selections["A-B"] != null;
      const isThisBinSelectedForA = (binIndex) => selections["A"] === binIndex;
      const isThisBinSelectedForB = (binIndex) => selections["B"] === binIndex;
      const isThisBinSelectedForDiff = (binIndex) => selections["A-B"] === binIndex;
      if (getHistogramSpec() !== void 0) {
        return x` <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForA}
          .handleClickHistogramBar=${handleClickHistogramBarForA}
          .isAnyBinSelected=${isAnyBinSelectedForA}
          .isThisBinSelected=${isThisBinSelectedForA}
          .specificColorScheme=${"A"}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${false}
          .titleOnLeft=${"A"}>
        </comparator-histogram>
        <comparator-histogram
          .getHistogramSpec=${getHistogramSpec}
          .getRawDataValues=${getHistogramDataForB}
          .handleClickHistogramBar=${handleClickHistogramBarForB}
          .isAnyBinSelected=${isAnyBinSelectedForB}
          .isThisBinSelected=${isThisBinSelectedForB}
          .specificColorScheme=${"B"}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${true}
          .titleOnLeft=${"B"}>
        </comparator-histogram>
        <comparator-histogram
          .getHistogramSpec=${getHistogramSpecForDiff}
          .getRawDataValues=${getHistogramDataForDiff}
          .handleClickHistogramBar=${handleClickHistogramBarForDiff}
          .isAnyBinSelected=${isAnyBinSelectedForDiff}
          .isThisBinSelected=${isThisBinSelectedForDiff}
          .svgWidth=${this.svgWidth}
          .svgHeight=${DEFAULT_SXS_HISTOGRAM_HEIGHT_FOR_CUSTOM_FUNCS}
          .showBottomAxis=${true}
          .titleOnLeft=${"A-B"}>
        </comparator-histogram>`;
      } else {
        return "";
      }
    }
    renderCustomFunctionRow(customFunc) {
      const handleClickTableRow = (customFuncId) => {
        if (this.appState.selectedCustomFuncId === customFuncId) {
          this.appState.selectedCustomFuncId = null;
        } else {
          this.appState.selectedCustomFuncId = customFuncId;
        }
      };
      const customFuncRowStyle = (customFuncId) => e6({
        "selected": customFuncId === this.appState.selectedCustomFuncId
      });
      const renderChart = customFunc.returnType === "Boolean" /* BOOLEAN */ ? x`
          <td class="results-chart">
            ${this.renderChartForBooleanType(customFunc)}
          </td>` : x`
          <td class="results-chart">
            ${this.renderChartForNumberType(customFunc)}
          </td>`;
      const handleClickEditIcon = () => {
        this.editedCustomFunc = {
          ...this.appState.customFunctions[customFunc.id]
        };
        this.appState.selectedCustomFuncId = customFunc.id;
        this.appState.isShowCustomFuncEditor = true;
      };
      const handleClickRemoveIcon = () => {
        if (this.appState.customFunctions[customFunc.id] !== void 0) {
          if (this.appState.selectedCustomFuncId === customFunc.id) {
            this.appState.selectedCustomFuncId = null;
          }
          const fieldId = getFieldIdForCustomFunc(customFunc.id);
          if (this.appState.currentSorting.customField != null && this.appState.currentSorting.customField.id === fieldId) {
            this.appState.resetSorting();
          }
          delete this.appState.selectionsFromCustomFuncResults[customFunc.id];
          delete this.appState.customFunctions[customFunc.id];
          this.appState.columns = this.appState.columns.filter(
            (field) => field.id !== fieldId
          );
          this.appState.updateStatusMessage("Removed the custom function.", true);
        }
      };
      const styleEditIcon = e6({
        "icon": true,
        "clickable": true,
        "disabled": customFunc.precomputed === true
      });
      return x`
      <tr class=${customFuncRowStyle(customFunc.id)}>
        <td class="function-info clickable"
          @click=${() => void handleClickTableRow(customFunc.id)}>
          <div class="function-name">${customFunc.name}</div>
          <div class="function-type">${customFunc.returnType}</div>
        </td>
          ${renderChart}
        </td>
        <td class="edit-remove-icons">
          <mwc-icon class=${styleEditIcon} @click=${handleClickEditIcon}>
            edit
          </mwc-icon>
          <mwc-icon class="icon clickable" @click=${handleClickRemoveIcon}>
            cancel
          </mwc-icon>
        </td>
      </tr>`;
    }
    renderCustomFunctionList() {
      const customFuncRows = Object.values(this.appState.customFunctions).map(
        (customFunc) => this.renderCustomFunctionRow(customFunc)
      );
      return x` <table class="statement-table">
      <tbody> ${customFuncRows} </tbody>
    </table>`;
    }
    renderCustomFunctionEditor() {
      const handleCustomFuncNameChange = (e33) => {
        this.editedCustomFunc.name = e33.target.value;
      };
      const handleCustomFuncBodyChange = (e33) => {
        this.editedCustomFunc.functionBody = e33.target.value;
      };
      const handleClickRun = () => {
        if (this.editedCustomFunc.functionBody === "") {
          this.appState.updateStatusMessage("Write an expression.");
          return;
        }
        if (this.editedCustomFunc.name === "") {
          this.editedCustomFunc.name = this.editedCustomFunc.functionBody;
        }
        this.appState.runCustomFunction(
          this.appState.examples,
          this.editedCustomFunc
        );
      };
      const handleClickCreateNewFuncButton = () => {
        if (this.appState.isShowCustomFuncEditor === false) {
          this.editedCustomFunc = makeNewCustomFunc(
            this.appState.newCustomFuncId
          );
          this.appState.isShowCustomFuncEditor = true;
        } else {
          this.appState.isShowCustomFuncEditor = false;
        }
      };
      return x`
        <div class="edit-custom-function">
          <div class="edit-custom-function-title clickable"
            @click=${handleClickCreateNewFuncButton}>
            <div>Create New Function</div>
            <div>
              ${this.appState.isShowCustomFuncEditor === false ? x`<mwc-icon class="expand-icon">unfold_more</mwc-icon>` : x`<mwc-icon class="expand-icon">close</mwc-icon>`}
            </div>
          </div>
            ${this.appState.isShowCustomFuncEditor === true ? x`
              <div class="edit-custom-function-form">
                <div class="field-row">
                  <div class="field-row-label">Name</div>
                  <input type="text" class="func-name-input"
                      @change=${handleCustomFuncNameChange}
                      placeholder='e.g., "Starts with Sure"'
                      .value=${this.editedCustomFunc.name} />
                </div>

                <div class="field-row">
                  <div class="field-row-label">Syntax</div>
                  <div class="field-row-content">
                    ${Object.values(CustomFuncType).filter((funcType) => funcType !== "Precomputed" /* PRECOMPUTED */).map(
        (val) => x`
                          <div>
                            <input type="radio" name="custom-func-type"
                              id="custom-func-type-${val}" value=${val}
                              .checked=${val === this.editedCustomFunc.functionType}
                              @change=${() => this.editedCustomFunc.functionType = val}
                            />
                            <label for="custom-func-type-${val}">
                              ${val}
                            </label>
                          </div>`
      )}
                  </div>
                </div>

                <div class="field-row">
                  <div class="field-row-label">Expr.</div>
                  <textarea rows="4"
                    @change=${handleCustomFuncBodyChange}
                    placeholder=${this.editedCustomFunc.functionType === "Regular Expr." /* REGEXP */ ? 'Regular expression for pattern matching (e.g., "^Sure")' : 'JavaScript expression that takes "output" (and "input") and returns boolean or number (e.g., output.length)'}
                    .value=${this.editedCustomFunc.functionBody}>
                  </textarea>
                </div>

                <div class="field-row">
                  <div class="field-row-label">Return</div>
                  <div class="field-row-content">
                    ${Object.values(CustomFuncReturnType).map(
        (val) => x`
                      <div>
                        <input type="radio" name="custom-func-return-type"
                          id="custom-func-return-type-${val}" value=${val}
                          .checked=${val === this.editedCustomFunc.returnType}
                          @change=${() => this.editedCustomFunc.returnType = val}
                        />
                        <label for="custom-func-return-type-${val}">
                          ${val}
                        </label>
                      </div>`
      )}
                  </div>
                </div>

                <button class="run-button" @click=${handleClickRun}>
                  Run
                </button>
              </div>
              ` : x``}
        </div>`;
    }
    render() {
      return x` <div class="sidebar-component">
      <div class="sidebar-component-title">
        Custom Functions
        <span class="additional-note">(Click row to see the values)</span>
      </div>
      <div class="sidebar-component-content">
        ${this.renderCustomFunctionList()}
        ${this.renderCustomFunctionEditor()}
      </div>
    </div>`;
    }
  };
  CustomFunctionsElement.styles = [styles, styles4];
  __decorateClass([
    observable
  ], CustomFunctionsElement.prototype, "editedCustomFunc", 2);
  CustomFunctionsElement = __decorateClass([
    t3("comparator-custom-functions")
  ], CustomFunctionsElement);

  // client/components/dataset_selection.css
  var styles5 = i`.dataset-selection-container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: calc(100vh - 57px);
  justify-content: center;
  position: absolute;
  width: 100vw;
  z-index: 10;
}

.dataset-selection {
  background-color: #fff;
  border-radius: 10px;
  font-size: 13px;
  height: 520px;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  width: 700px;
}

.close-button {
  padding: 20px;
  position: absolute;
  right: 0;
  top: 0;
}

.panel-title {
  color: var(--comparator-grey-250);
  font-size: 24px;
  padding-bottom: 5px;
}

.panel-title .selected {
  color: var(--comparator-grey-800);
}

.panel-instruction {
  color: var(--comparator-grey-800);
  line-height: 18px;
  margin: 5px 0;
  padding: 2px 0;
}

.textarea-wrapper {
  display: flex;
  margin: 5px 0;
}

.textarea-filepath {
  border-radius: 5px;
  font-family: monospace;
  font-size: 14px;
  margin-right: 5px;
  padding: 5px;
  width: calc(100% - 70px);
  word-break: break-all;
}

.filepath {
  background-color: #f3f3f3;
  font-family: monospace;
  word-break: break-all;
}

ul {
  border-top: 1px solid #eee;
  margin: 5px 0 25px 10px;
  padding-left: 0;
}

li {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  color: #777;
  font-family: monospace;
  list-style: none;
  padding: 10px;
  word-break: break-all;
}

li:hover {
  background-color: #eee;
  color: #555;
  text-decoration: underline;
}

input, button {
  font-size: 13px;
  padding: 5px 7px;
}

.file-upload {
  font-size: 14px;
  padding: 10px 0;
}
`;

  // client/components/dataset_selection.ts
  var DatasetSelectionElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.isShowFileUploadView = this.appState.isDatasetPathUploadedFile === true;
      this.editedDatasetPath = "";
      makeObservable(this);
    }
    static get styles() {
      return [styles, styles5];
    }
    getDocumentationLinkString() {
      const documentationLink = "https://github.com/PAIR-code/llm-comparator";
      return x`
      <div>
        The json file must contain these three properties:
        <span class="filepath">metadata</span>,
        <span class="filepath">models</span>,
        and <span class="filepath">examples</span>.
        <br />
        Each example in <span class="filepath">examples</span> must have
        <span class="filepath">input_text</span>,
        <span class="filepath">tags</span>,
        <span class="filepath">output_text_a</span>,
        <span class="filepath">output_text_b</span>,
        and <span class="filepath">score</span>.
        <br />
        Please refer to our document for details:
        <a href="${documentationLink}" target="_blank">${documentationLink}</a>
      </div>
    `;
    }
    renderViewForSpecifyingDataPath() {
      if (this.appState.datasetPath != null && this.appState.isDatasetPathUploadedFile === false && this.editedDatasetPath === "") {
        this.editedDatasetPath = this.appState.datasetPath;
      }
      const handleClickLoadButton = () => this.appState.loadData(this.editedDatasetPath, null);
      const handleClickDatasetPath = (datasetPath) => {
        this.appState.loadData(datasetPath, null);
      };
      const handleChangeDatasetPath = (e33) => {
        this.editedDatasetPath = e33.target.value;
      };
      const selectedClassMap = (datasetPath) => e6({
        "clickable": true,
        "selected": this.appState.datasetPath === datasetPath
      });
      const textareaPlaceholder = "Enter a URL to load the json file from.";
      const urlLoadPath = this.appState.appLink + "?results_path=https://.../...json";
      const panelIntro = x`
      Enter the URL path of a json file prepared for LLM Comparator.`;
      const panelOutro = x`
      ${this.getDocumentationLinkString()}<br/>
      Note that the server hosting the file must allow
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        target="_blank"
      >Cross-Origin Resource Sharing</a>.`;
      const panelInstruction = x`
        ${panelIntro}
        <div class="textarea-wrapper">
          <textarea type="text" class="textarea-filepath"
            placeholder=${textareaPlaceholder}
            size="70"
            rows="4"
            @change=${handleChangeDatasetPath}
          >${this.editedDatasetPath}</textarea>
          <button @click=${handleClickLoadButton}>
            Load
          </button>
        </div>
        ${panelOutro}

        <br /><br /><br />
        If you don't have your run,
        click one of the following example runs.

        <ul>
          ${this.appState.exampleDatasetPaths.map(
        (path) => x`<li class=${selectedClassMap(path)}
                @click=${() => void handleClickDatasetPath(path)}>${path}</li>`
      )}
        </ul>

        Note: You can also directly load the tool with a path by
        opening an URL like:<br />
        <span class="filepath">
          ${urlLoadPath}
        </span>
        `;
      return panelInstruction;
    }
    renderViewForUploadingData() {
      const handleFileUpload = (e33) => {
        const input = e33.target;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          this.appState.loadData(file.name, file);
        }
      };
      return x`
      <div class="file-upload">
        <label for="upload">Upload your json file: </label>
        <input type="file" id="upload" @change=${handleFileUpload} />
      </div>

      ${this.getDocumentationLinkString()}
    `;
    }
    render() {
      if (this.appState.isOpenDatasetSelectionPanel === false) {
        return x``;
      }
      const handleClickCloseButton = () => {
        this.appState.isOpenDatasetSelectionPanel = false;
      };
      const stylePanelTitle = (isUpload) => e6({
        "selected": isUpload === this.isShowFileUploadView,
        "clickable": true
      });
      const panelTitle = x` <span
        class=${stylePanelTitle(false)}
        @click=${() => this.isShowFileUploadView = false}>
        Select Data
      </span>
      <span>|</span>
      <span
        class=${stylePanelTitle(true)}
        @click=${() => this.isShowFileUploadView = true}>
        Upload File
      </span>`;
      const panelInstruction = this.isShowFileUploadView === true ? this.renderViewForUploadingData() : this.renderViewForSpecifyingDataPath();
      return x` <div class="dataset-selection-container">
      <div class="dataset-selection">
        ${this.appState.datasetPath !== null ? x` <div
              class="close-button clickable"
              @click=${handleClickCloseButton}>
              <mwc-icon>close</mwc-icon>
            </div>` : ""}
        <div class="panel-title">${panelTitle}</div>
        <div class="panel-instruction"> ${panelInstruction} </div>
      </div>
    </div>`;
    }
  };
  __decorateClass([
    observable
  ], DatasetSelectionElement.prototype, "isShowFileUploadView", 2);
  __decorateClass([
    observable
  ], DatasetSelectionElement.prototype, "editedDatasetPath", 2);
  DatasetSelectionElement = __decorateClass([
    t3("comparator-dataset-selection")
  ], DatasetSelectionElement);

  // client/components/example_details.css
  var styles6 = i`.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 15px;
}

.panel-header {
  align-items: center;
  border-bottom: 1px solid var(--comparator-grey-200);
  display: flex;
  height: 34px;
  justify-content: space-between;
}

.panel-title {
  align-items: center;
  display: flex;
  gap: 10px;
}

.panel-title h3 {
  font-size: 16px;
  font-weight: 200;
}

.filter-chips {
  display: flex;
  gap: 2px;
}

.panel-contents {
  display: flex;
  gap: 10px;
  height: calc(100% - 35px);
}

.score-distribution-chart {
  display: flex;
  padding: 5px 10px;
}

.rating-table {
  overflow-y: scroll;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

th {
  background-color: var(--comparator-grey-200);
  color: var(--comparator-grey-800);
  font-weight: normal;
  padding: 6px 4px;
  position: relative;
  vertical-align: top;
}

td {
  border-bottom: 1px solid #ddd;
  line-height: 13px;
  padding: 6px 8px;
  vertical-align: top;
}

th.index {
  width: 25px;
}

th.score {
  width: 55px;
}

th.flipped {
  width: 45px;
}

th.rationale {
  min-width: 300px;
}

tr.second-row th {
  color: white;
  padding: 0 4px 2px;
}

td.center-aligned {
  text-align: center;
}

td.highlighted {
  font-weight: 600;
}

td.a-win {
  background-color: var(--comparator-model-a-win-bg);
}

td.b-win {
  background-color: var(--comparator-model-b-win-bg);
}

td.rationale {
  overflow-wrap: anywhere;
  white-space: break-spaces;
}

.sort-icon {
  color: var(--comparator-grey-100);
}

.sort-icon.up {
  top: -12px;
}

.sort-icon.down {
  top: -2px;
}

.sort-icon:hover {
  color: var(--comparator-grey-300);
}

.sort-icon.active {
  color: var(--comparator-grey-500);
}
`;

  // client/components/example_details.ts
  var ExampleDetailsElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.sortOrder = "None" /* NONE */;
      makeObservable(this);
    }
    get selectedExample() {
      return this.appState.selectedExample;
    }
    get filteredRatings() {
      if (this.selectedExample == null) {
        return [];
      }
      return this.selectedExample.individual_rater_scores.filter(
        (rating) => this.appState.selectedHistogramBinForRatingsForSelectedExample == null || rating.score != null && getHistogramBinIndexFromValue(
          this.appState.histogramSpecForScores,
          rating.score
        ) === this.appState.selectedHistogramBinForRatingsForSelectedExample
      ).filter((rating) => {
        const selection = this.appState.selectedBarChartValueForSelectedExample;
        return selection == null || rating.custom_fields[selection.fieldId][selection.modelIndex] === selection.value;
      });
    }
    get sortedRatings() {
      return this.filteredRatings.sort(
        (a11, b7) => this.sortOrder === "None" /* NONE */ ? 1 : compareNumbersWithNulls(
          a11.score,
          b7.score,
          this.sortOrder === "desc" /* DESC */
        )
      );
    }
    // Score histogram for the individual ratings for a selected example.
    renderScoreHistogram() {
      const svgWidth = 220;
      const svgHeight = 110;
      const getHistogramRawDataValues = () => {
        return this.filteredRatings.filter((rating) => rating.score != null).map((rating) => rating.score);
      };
      const handleClickHistogramBar = (binIndex) => {
        if (this.appState.selectedHistogramBinForRatingsForSelectedExample === binIndex) {
          this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
        } else {
          this.appState.selectedHistogramBinForRatingsForSelectedExample = binIndex;
        }
      };
      const isAnyBinSelected = () => this.appState.selectedHistogramBinForRatingsForSelectedExample !== null;
      const isThisBinSelected = (binIndex) => binIndex === this.appState.selectedHistogramBinForRatingsForSelectedExample;
      return x` <comparator-histogram
      .getHistogramSpec=${() => this.appState.histogramSpecForScores}
      .getRawDataValues=${getHistogramRawDataValues}
      .handleClickHistogramBar=${handleClickHistogramBar}
      .isAnyBinSelected=${isAnyBinSelected}
      .isThisBinSelected=${isThisBinSelected}
      .svgWidth=${svgWidth}
      .svgHeight=${svgHeight}
      .neutralColorThreshold=${() => this.appState.winRateThreshold}
      .showAxisEndDescription=${true}
      .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
    </comparator-histogram>`;
    }
    // TODO: Create a separate data-table component.
    renderRaterTable() {
      const selectedExample = this.selectedExample;
      if (selectedExample == null) {
        return x``;
      }
      const readableRating = (label, isFlipped) => {
        if (label == null) {
          return "";
        } else if (label.endsWith("Than") || label.endsWith("SameAs")) {
          return isFlipped === true ? `B is ${label} A` : `A is ${label} B`;
        } else {
          return label;
        }
      };
      const styleScore = (score) => e6({
        "center-aligned": true,
        "a-win": this.appState.isScoreDivergingScheme === true && score != null && score > this.appState.scoreMiddlePoint,
        "b-win": this.appState.isScoreDivergingScheme === true && score != null && score < this.appState.scoreMiddlePoint
      });
      const styleSortIcons = (order) => e6({
        "sort-icon": true,
        "up": order === "asc" /* ASC */,
        "down": order === "desc" /* DESC */,
        "active": this.sortOrder === order
      });
      const handleClickSortIcon = (order) => {
        if (order === this.sortOrder) {
          this.sortOrder = "None" /* NONE */;
        } else {
          this.sortOrder = order;
        }
      };
      const renderSortIcons = () => x` <div class="sort-icons-container">
        <mwc-icon
          class=${styleSortIcons("asc" /* ASC */)}
          @click=${() => void handleClickSortIcon("asc" /* ASC */)}>
          arrow_drop_up
        </mwc-icon>
        <mwc-icon
          class=${styleSortIcons("desc" /* DESC */)}
          @click=${() => void handleClickSortIcon("desc" /* DESC */)}>
          arrow_drop_down
        </mwc-icon>
      </div>`;
      const renderCustomFieldHeaderCell = (field) => {
        if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          return x` <th class="" colspan="2">${field.name}</th>`;
        } else {
          return x` <th class="">${field.name}</th>`;
        }
      };
      const renderCustomFieldHeaderCellSecondRow = (field) => {
        if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          return x` <th><span class="model-a">A</span></th>
          <th><span class="model-b">B</span></th>`;
        } else {
          return x`<th></th>`;
        }
      };
      const renderHeaderRow = x` <tr>
        <th class="index" rowspan="2">Index</th>
        <th class="score" rowspan="2">Score ${renderSortIcons()}</th>
        <th class="label" rowspan="2">Rating</th>
        <th class="flipped" rowspan="2">Flipped?</th>
        <th class="rationale" rowspan="2">Rationale</th>
        ${this.appState.customFieldsOfPerRatingType.map(
        (field) => renderCustomFieldHeaderCell(field)
      )}
      </tr>
      <tr class="second-row">
        ${this.appState.customFieldsOfPerRatingType.map(
        (field) => renderCustomFieldHeaderCellSecondRow(field)
      )}
      </tr>`;
      const selection = this.appState.selectedBarChartValueForSelectedExample;
      const renderCustomField = (rating, field) => {
        const styleCell = (modelIndex, value) => e6({
          "highlighted": selection != null && selection.fieldId === field.id && selection.modelIndex === modelIndex && selection.value === value
        });
        if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          const value = rating.custom_fields[field.id] || [null, null];
          if (value.length !== 2) {
            throw new Error(`Invalid value for field ${field.id}: ${value}`);
          }
          return x` <td class=${styleCell(0, value[0])}>${value[0]}</td>
          <td class=${styleCell(1, value[1])}>${value[1]}</td>`;
        } else {
          return x` <td>${rating.custom_fields[field.id]}</td>`;
        }
      };
      const renderRow = (rating) => {
        return x` <tr>
        <td class="center-aligned">${rating.index}</td>
        <td class=${styleScore(rating.score)}>${rating.score}</td>
        <td>${readableRating(rating.rating_label, rating.is_flipped)}</td>
        <td class="center-aligned">
          ${rating.is_flipped == null ? "Unknown" : rating.is_flipped === true ? "Y" : "N"}
        </td>
        <td class="rationale"> ${rating.rationale} </td>
        ${this.appState.customFieldsOfPerRatingType.map(
          (field) => renderCustomField(rating, field)
        )}
      </tr>`;
      };
      const renderSortedRatings = this.sortedRatings.map(
        (rating) => renderRow(rating)
      );
      return x` <table>
      <thead>${renderHeaderRow}</thead>
      <tbody>${renderSortedRatings}</tbody>
    </table>`;
    }
    // Filter chips at the top of the panel.
    renderFilterChip(label, handleClickCancelButton) {
      return x`<div class="filter-chip">
      <span>${label}</span>
      <mwc-icon class="chip-cancel-icon" @click=${handleClickCancelButton}>
        cancel
      </mwc-icon>
    </div>`;
    }
    renderFilterChips() {
      const labelScore = getHistogramFilterLabel(
        "score",
        this.appState.histogramSpecForScores,
        this.appState.selectedHistogramBinForRatingsForSelectedExample,
        null
      );
      const handleClickCancelButtonForScore = () => {
        this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
      };
      const selection = this.appState.selectedBarChartValueForSelectedExample;
      const selectionField = selection == null ? null : this.appState.getFieldFromId(selection.fieldId);
      const labelCustomField = selection == null || selectionField == null ? "" : `${selectionField.name}(${Object.values(AOrB)[selection.modelIndex]}) = ${selection.value}`;
      const handleClickCancelButtonForCustomField = () => {
        this.appState.selectedBarChartValueForSelectedExample = null;
      };
      return x`
      ${this.appState.selectedHistogramBinForRatingsForSelectedExample != null ? this.renderFilterChip(labelScore, handleClickCancelButtonForScore) : x``}
      ${this.appState.selectedBarChartValueForSelectedExample != null ? this.renderFilterChip(
        labelCustomField,
        handleClickCancelButtonForCustomField
      ) : x``}
    `;
    }
    render() {
      const showSelectedExampleDetails = this.appState.showSelectedExampleDetails;
      const selectedExample = this.appState.selectedExample;
      if (showSelectedExampleDetails === false || selectedExample == null) {
        return x``;
      }
      const handleClickCloseButton = () => {
        this.appState.showSelectedExampleDetails = false;
        this.appState.selectedExample = null;
        this.appState.selectedHistogramBinForRatingsForSelectedExample = null;
        this.appState.selectedBarChartValueForSelectedExample = null;
      };
      const handleClickExpandButton = () => {
        this.appState.exampleDetailsPanelExpanded = !this.appState.exampleDetailsPanelExpanded;
      };
      return x`
        <div class="panel-container">
          <div class="panel-header">
            <div class="panel-title">
              <h3>Individual Ratings for Selected Example</h3>
              <div class="filter-chips">${this.renderFilterChips()}</div>
            </div>
            <div class="buttons">
              <mwc-icon class="clickable" @click=${handleClickExpandButton}>
                ${this.appState.exampleDetailsPanelExpanded === true ? "expand_more" : "expand_less"}
              </mwc-icon>
              <mwc-icon class="clickable" @click=${handleClickCloseButton}>
                close
              </mwc-icon>
            </div>
          </div>
          <div class="panel-contents">
            <div class="score-distribution-chart">
              ${this.renderScoreHistogram()}
            </div>
            <div class="rating-table">
              ${this.renderRaterTable()}
            </div>
          </div>
        </div>`;
    }
  };
  ExampleDetailsElement.styles = [styles, styles6];
  __decorateClass([
    observable
  ], ExampleDetailsElement.prototype, "sortOrder", 2);
  __decorateClass([
    computed
  ], ExampleDetailsElement.prototype, "selectedExample", 1);
  __decorateClass([
    computed
  ], ExampleDetailsElement.prototype, "filteredRatings", 1);
  __decorateClass([
    computed
  ], ExampleDetailsElement.prototype, "sortedRatings", 1);
  ExampleDetailsElement = __decorateClass([
    t3("comparator-example-details")
  ], ExampleDetailsElement);

  // node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d11, b7) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d12, b8) {
      d12.__proto__ = b8;
    } || function(d12, b8) {
      for (var p7 in b8)
        if (Object.prototype.hasOwnProperty.call(b8, p7))
          d12[p7] = b8[p7];
    };
    return extendStatics(d11, b7);
  };
  function __extends(d11, b7) {
    if (typeof b7 !== "function" && b7 !== null)
      throw new TypeError("Class extends value " + String(b7) + " is not a constructor or null");
    extendStatics(d11, b7);
    function __() {
      this.constructor = d11;
    }
    d11.prototype = b7 === null ? Object.create(b7) : (__.prototype = b7.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t17) {
      for (var s20, i23 = 1, n31 = arguments.length; i23 < n31; i23++) {
        s20 = arguments[i23];
        for (var p7 in s20)
          if (Object.prototype.hasOwnProperty.call(s20, p7))
            t17[p7] = s20[p7];
      }
      return t17;
    };
    return __assign.apply(this, arguments);
  };
  function __decorate(decorators, target, key, desc) {
    var c12 = arguments.length, r18 = c12 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d11;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r18 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i23 = decorators.length - 1; i23 >= 0; i23--)
        if (d11 = decorators[i23])
          r18 = (c12 < 3 ? d11(r18) : c12 > 3 ? d11(target, key, r18) : d11(target, key)) || r18;
    return c12 > 3 && r18 && Object.defineProperty(target, key, r18), r18;
  }
  function __values(o29) {
    var s20 = typeof Symbol === "function" && Symbol.iterator, m6 = s20 && o29[s20], i23 = 0;
    if (m6)
      return m6.call(o29);
    if (o29 && typeof o29.length === "number")
      return {
        next: function() {
          if (o29 && i23 >= o29.length)
            o29 = void 0;
          return { value: o29 && o29[i23++], done: !o29 };
        }
      };
    throw new TypeError(s20 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o29, n31) {
    var m6 = typeof Symbol === "function" && o29[Symbol.iterator];
    if (!m6)
      return o29;
    var i23 = m6.call(o29), r18, ar = [], e33;
    try {
      while ((n31 === void 0 || n31-- > 0) && !(r18 = i23.next()).done)
        ar.push(r18.value);
    } catch (error) {
      e33 = { error };
    } finally {
      try {
        if (r18 && !r18.done && (m6 = i23["return"]))
          m6.call(i23);
      } finally {
        if (e33)
          throw e33.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i23 = 0, l20 = from.length, ar; i23 < l20; i23++) {
        if (ar || !(i23 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i23);
          ar[i23] = from[i23];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  // node_modules/@material/mwc-icon/node_modules/@lit/reactive-element/css-tag.js
  var t5 = window;
  var e7 = t5.ShadowRoot && (void 0 === t5.ShadyCSS || t5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s4 = Symbol();
  var n5 = /* @__PURE__ */ new WeakMap();
  var o5 = class {
    constructor(t17, e33, n31) {
      if (this._$cssResult$ = true, n31 !== s4)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t17, this.t = e33;
    }
    get styleSheet() {
      let t17 = this.o;
      const s20 = this.t;
      if (e7 && void 0 === t17) {
        const e33 = void 0 !== s20 && 1 === s20.length;
        e33 && (t17 = n5.get(s20)), void 0 === t17 && ((this.o = t17 = new CSSStyleSheet()).replaceSync(this.cssText), e33 && n5.set(s20, t17));
      }
      return t17;
    }
    toString() {
      return this.cssText;
    }
  };
  var r6 = (t17) => new o5("string" == typeof t17 ? t17 : t17 + "", void 0, s4);
  var i6 = (t17, ...e33) => {
    const n31 = 1 === t17.length ? t17[0] : e33.reduce((e34, s20, n32) => e34 + ((t18) => {
      if (true === t18._$cssResult$)
        return t18.cssText;
      if ("number" == typeof t18)
        return t18;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t18 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s20) + t17[n32 + 1], t17[0]);
    return new o5(n31, t17, s4);
  };
  var S3 = (s20, n31) => {
    e7 ? s20.adoptedStyleSheets = n31.map((t17) => t17 instanceof CSSStyleSheet ? t17 : t17.styleSheet) : n31.forEach((e33) => {
      const n32 = document.createElement("style"), o29 = t5.litNonce;
      void 0 !== o29 && n32.setAttribute("nonce", o29), n32.textContent = e33.cssText, s20.appendChild(n32);
    });
  };
  var c4 = e7 ? (t17) => t17 : (t17) => t17 instanceof CSSStyleSheet ? ((t18) => {
    let e33 = "";
    for (const s20 of t18.cssRules)
      e33 += s20.cssText;
    return r6(e33);
  })(t17) : t17;

  // node_modules/@material/mwc-icon/node_modules/@lit/reactive-element/reactive-element.js
  var s5;
  var e8 = window;
  var r7 = e8.trustedTypes;
  var h3 = r7 ? r7.emptyScript : "";
  var o6 = e8.reactiveElementPolyfillSupport;
  var n6 = { toAttribute(t17, i23) {
    switch (i23) {
      case Boolean:
        t17 = t17 ? h3 : null;
        break;
      case Object:
      case Array:
        t17 = null == t17 ? t17 : JSON.stringify(t17);
    }
    return t17;
  }, fromAttribute(t17, i23) {
    let s20 = t17;
    switch (i23) {
      case Boolean:
        s20 = null !== t17;
        break;
      case Number:
        s20 = null === t17 ? null : Number(t17);
        break;
      case Object:
      case Array:
        try {
          s20 = JSON.parse(t17);
        } catch (t18) {
          s20 = null;
        }
    }
    return s20;
  } };
  var a3 = (t17, i23) => i23 !== t17 && (i23 == i23 || t17 == t17);
  var l3 = { attribute: true, type: String, converter: n6, reflect: false, hasChanged: a3 };
  var d3 = "finalized";
  var u3 = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
    }
    static addInitializer(t17) {
      var i23;
      this.finalize(), (null !== (i23 = this.h) && void 0 !== i23 ? i23 : this.h = []).push(t17);
    }
    static get observedAttributes() {
      this.finalize();
      const t17 = [];
      return this.elementProperties.forEach((i23, s20) => {
        const e33 = this._$Ep(s20, i23);
        void 0 !== e33 && (this._$Ev.set(e33, s20), t17.push(e33));
      }), t17;
    }
    static createProperty(t17, i23 = l3) {
      if (i23.state && (i23.attribute = false), this.finalize(), this.elementProperties.set(t17, i23), !i23.noAccessor && !this.prototype.hasOwnProperty(t17)) {
        const s20 = "symbol" == typeof t17 ? Symbol() : "__" + t17, e33 = this.getPropertyDescriptor(t17, s20, i23);
        void 0 !== e33 && Object.defineProperty(this.prototype, t17, e33);
      }
    }
    static getPropertyDescriptor(t17, i23, s20) {
      return { get() {
        return this[i23];
      }, set(e33) {
        const r18 = this[t17];
        this[i23] = e33, this.requestUpdate(t17, r18, s20);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t17) {
      return this.elementProperties.get(t17) || l3;
    }
    static finalize() {
      if (this.hasOwnProperty(d3))
        return false;
      this[d3] = true;
      const t17 = Object.getPrototypeOf(this);
      if (t17.finalize(), void 0 !== t17.h && (this.h = [...t17.h]), this.elementProperties = new Map(t17.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t18 = this.properties, i23 = [...Object.getOwnPropertyNames(t18), ...Object.getOwnPropertySymbols(t18)];
        for (const s20 of i23)
          this.createProperty(s20, t18[s20]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i23) {
      const s20 = [];
      if (Array.isArray(i23)) {
        const e33 = new Set(i23.flat(1 / 0).reverse());
        for (const i24 of e33)
          s20.unshift(c4(i24));
      } else
        void 0 !== i23 && s20.push(c4(i23));
      return s20;
    }
    static _$Ep(t17, i23) {
      const s20 = i23.attribute;
      return false === s20 ? void 0 : "string" == typeof s20 ? s20 : "string" == typeof t17 ? t17.toLowerCase() : void 0;
    }
    _$Eu() {
      var t17;
      this._$E_ = new Promise((t18) => this.enableUpdating = t18), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t17 = this.constructor.h) || void 0 === t17 || t17.forEach((t18) => t18(this));
    }
    addController(t17) {
      var i23, s20;
      (null !== (i23 = this._$ES) && void 0 !== i23 ? i23 : this._$ES = []).push(t17), void 0 !== this.renderRoot && this.isConnected && (null === (s20 = t17.hostConnected) || void 0 === s20 || s20.call(t17));
    }
    removeController(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.splice(this._$ES.indexOf(t17) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t17, i23) => {
        this.hasOwnProperty(i23) && (this._$Ei.set(i23, this[i23]), delete this[i23]);
      });
    }
    createRenderRoot() {
      var t17;
      const s20 = null !== (t17 = this.shadowRoot) && void 0 !== t17 ? t17 : this.attachShadow(this.constructor.shadowRootOptions);
      return S3(s20, this.constructor.elementStyles), s20;
    }
    connectedCallback() {
      var t17;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostConnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    enableUpdating(t17) {
    }
    disconnectedCallback() {
      var t17;
      null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostDisconnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    attributeChangedCallback(t17, i23, s20) {
      this._$AK(t17, s20);
    }
    _$EO(t17, i23, s20 = l3) {
      var e33;
      const r18 = this.constructor._$Ep(t17, s20);
      if (void 0 !== r18 && true === s20.reflect) {
        const h11 = (void 0 !== (null === (e33 = s20.converter) || void 0 === e33 ? void 0 : e33.toAttribute) ? s20.converter : n6).toAttribute(i23, s20.type);
        this._$El = t17, null == h11 ? this.removeAttribute(r18) : this.setAttribute(r18, h11), this._$El = null;
      }
    }
    _$AK(t17, i23) {
      var s20;
      const e33 = this.constructor, r18 = e33._$Ev.get(t17);
      if (void 0 !== r18 && this._$El !== r18) {
        const t18 = e33.getPropertyOptions(r18), h11 = "function" == typeof t18.converter ? { fromAttribute: t18.converter } : void 0 !== (null === (s20 = t18.converter) || void 0 === s20 ? void 0 : s20.fromAttribute) ? t18.converter : n6;
        this._$El = r18, this[r18] = h11.fromAttribute(i23, t18.type), this._$El = null;
      }
    }
    requestUpdate(t17, i23, s20) {
      let e33 = true;
      void 0 !== t17 && (((s20 = s20 || this.constructor.getPropertyOptions(t17)).hasChanged || a3)(this[t17], i23) ? (this._$AL.has(t17) || this._$AL.set(t17, i23), true === s20.reflect && this._$El !== t17 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t17, s20))) : e33 = false), !this.isUpdatePending && e33 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t18) {
        Promise.reject(t18);
      }
      const t17 = this.scheduleUpdate();
      return null != t17 && await t17, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t17;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t18, i24) => this[i24] = t18), this._$Ei = void 0);
      let i23 = false;
      const s20 = this._$AL;
      try {
        i23 = this.shouldUpdate(s20), i23 ? (this.willUpdate(s20), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
          var i24;
          return null === (i24 = t18.hostUpdate) || void 0 === i24 ? void 0 : i24.call(t18);
        }), this.update(s20)) : this._$Ek();
      } catch (t18) {
        throw i23 = false, this._$Ek(), t18;
      }
      i23 && this._$AE(s20);
    }
    willUpdate(t17) {
    }
    _$AE(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.forEach((t18) => {
        var i24;
        return null === (i24 = t18.hostUpdated) || void 0 === i24 ? void 0 : i24.call(t18);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t17)), this.updated(t17);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t17) {
      return true;
    }
    update(t17) {
      void 0 !== this._$EC && (this._$EC.forEach((t18, i23) => this._$EO(i23, this[i23], t18)), this._$EC = void 0), this._$Ek();
    }
    updated(t17) {
    }
    firstUpdated(t17) {
    }
  };
  u3[d3] = true, u3.elementProperties = /* @__PURE__ */ new Map(), u3.elementStyles = [], u3.shadowRootOptions = { mode: "open" }, null == o6 || o6({ ReactiveElement: u3 }), (null !== (s5 = e8.reactiveElementVersions) && void 0 !== s5 ? s5 : e8.reactiveElementVersions = []).push("1.6.3");

  // node_modules/@material/mwc-icon/node_modules/lit-html/lit-html.js
  var t6;
  var i7 = window;
  var s6 = i7.trustedTypes;
  var e9 = s6 ? s6.createPolicy("lit-html", { createHTML: (t17) => t17 }) : void 0;
  var o7 = "$lit$";
  var n7 = `lit$${(Math.random() + "").slice(9)}$`;
  var l4 = "?" + n7;
  var h4 = `<${l4}>`;
  var r8 = document;
  var u4 = () => r8.createComment("");
  var d4 = (t17) => null === t17 || "object" != typeof t17 && "function" != typeof t17;
  var c5 = Array.isArray;
  var v2 = (t17) => c5(t17) || "function" == typeof (null == t17 ? void 0 : t17[Symbol.iterator]);
  var a4 = "[ 	\n\f\r]";
  var f3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _15 = /-->/g;
  var m2 = />/g;
  var p3 = RegExp(`>|${a4}(?:([^\\s"'>=/]+)(${a4}*=${a4}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g2 = /'/g;
  var $2 = /"/g;
  var y3 = /^(?:script|style|textarea|title)$/i;
  var w2 = (t17) => (i23, ...s20) => ({ _$litType$: t17, strings: i23, values: s20 });
  var x2 = w2(1);
  var b3 = w2(2);
  var T2 = Symbol.for("lit-noChange");
  var A2 = Symbol.for("lit-nothing");
  var E2 = /* @__PURE__ */ new WeakMap();
  var C2 = r8.createTreeWalker(r8, 129, null, false);
  function P2(t17, i23) {
    if (!Array.isArray(t17) || !t17.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e9 ? e9.createHTML(i23) : i23;
  }
  var V2 = (t17, i23) => {
    const s20 = t17.length - 1, e33 = [];
    let l20, r18 = 2 === i23 ? "<svg>" : "", u11 = f3;
    for (let i24 = 0; i24 < s20; i24++) {
      const s21 = t17[i24];
      let d11, c12, v6 = -1, a11 = 0;
      for (; a11 < s21.length && (u11.lastIndex = a11, c12 = u11.exec(s21), null !== c12); )
        a11 = u11.lastIndex, u11 === f3 ? "!--" === c12[1] ? u11 = _15 : void 0 !== c12[1] ? u11 = m2 : void 0 !== c12[2] ? (y3.test(c12[2]) && (l20 = RegExp("</" + c12[2], "g")), u11 = p3) : void 0 !== c12[3] && (u11 = p3) : u11 === p3 ? ">" === c12[0] ? (u11 = null != l20 ? l20 : f3, v6 = -1) : void 0 === c12[1] ? v6 = -2 : (v6 = u11.lastIndex - c12[2].length, d11 = c12[1], u11 = void 0 === c12[3] ? p3 : '"' === c12[3] ? $2 : g2) : u11 === $2 || u11 === g2 ? u11 = p3 : u11 === _15 || u11 === m2 ? u11 = f3 : (u11 = p3, l20 = void 0);
      const w6 = u11 === p3 && t17[i24 + 1].startsWith("/>") ? " " : "";
      r18 += u11 === f3 ? s21 + h4 : v6 >= 0 ? (e33.push(d11), s21.slice(0, v6) + o7 + s21.slice(v6) + n7 + w6) : s21 + n7 + (-2 === v6 ? (e33.push(void 0), i24) : w6);
    }
    return [P2(t17, r18 + (t17[s20] || "<?>") + (2 === i23 ? "</svg>" : "")), e33];
  };
  var N2 = class _N {
    constructor({ strings: t17, _$litType$: i23 }, e33) {
      let h11;
      this.parts = [];
      let r18 = 0, d11 = 0;
      const c12 = t17.length - 1, v6 = this.parts, [a11, f7] = V2(t17, i23);
      if (this.el = _N.createElement(a11, e33), C2.currentNode = this.el.content, 2 === i23) {
        const t18 = this.el.content, i24 = t18.firstChild;
        i24.remove(), t18.append(...i24.childNodes);
      }
      for (; null !== (h11 = C2.nextNode()) && v6.length < c12; ) {
        if (1 === h11.nodeType) {
          if (h11.hasAttributes()) {
            const t18 = [];
            for (const i24 of h11.getAttributeNames())
              if (i24.endsWith(o7) || i24.startsWith(n7)) {
                const s20 = f7[d11++];
                if (t18.push(i24), void 0 !== s20) {
                  const t19 = h11.getAttribute(s20.toLowerCase() + o7).split(n7), i25 = /([.?@])?(.*)/.exec(s20);
                  v6.push({ type: 1, index: r18, name: i25[2], strings: t19, ctor: "." === i25[1] ? H2 : "?" === i25[1] ? L2 : "@" === i25[1] ? z : k4 });
                } else
                  v6.push({ type: 6, index: r18 });
              }
            for (const i24 of t18)
              h11.removeAttribute(i24);
          }
          if (y3.test(h11.tagName)) {
            const t18 = h11.textContent.split(n7), i24 = t18.length - 1;
            if (i24 > 0) {
              h11.textContent = s6 ? s6.emptyScript : "";
              for (let s20 = 0; s20 < i24; s20++)
                h11.append(t18[s20], u4()), C2.nextNode(), v6.push({ type: 2, index: ++r18 });
              h11.append(t18[i24], u4());
            }
          }
        } else if (8 === h11.nodeType)
          if (h11.data === l4)
            v6.push({ type: 2, index: r18 });
          else {
            let t18 = -1;
            for (; -1 !== (t18 = h11.data.indexOf(n7, t18 + 1)); )
              v6.push({ type: 7, index: r18 }), t18 += n7.length - 1;
          }
        r18++;
      }
    }
    static createElement(t17, i23) {
      const s20 = r8.createElement("template");
      return s20.innerHTML = t17, s20;
    }
  };
  function S4(t17, i23, s20 = t17, e33) {
    var o29, n31, l20, h11;
    if (i23 === T2)
      return i23;
    let r18 = void 0 !== e33 ? null === (o29 = s20._$Co) || void 0 === o29 ? void 0 : o29[e33] : s20._$Cl;
    const u11 = d4(i23) ? void 0 : i23._$litDirective$;
    return (null == r18 ? void 0 : r18.constructor) !== u11 && (null === (n31 = null == r18 ? void 0 : r18._$AO) || void 0 === n31 || n31.call(r18, false), void 0 === u11 ? r18 = void 0 : (r18 = new u11(t17), r18._$AT(t17, s20, e33)), void 0 !== e33 ? (null !== (l20 = (h11 = s20)._$Co) && void 0 !== l20 ? l20 : h11._$Co = [])[e33] = r18 : s20._$Cl = r18), void 0 !== r18 && (i23 = S4(t17, r18._$AS(t17, i23.values), r18, e33)), i23;
  }
  var M2 = class {
    constructor(t17, i23) {
      this._$AV = [], this._$AN = void 0, this._$AD = t17, this._$AM = i23;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t17) {
      var i23;
      const { el: { content: s20 }, parts: e33 } = this._$AD, o29 = (null !== (i23 = null == t17 ? void 0 : t17.creationScope) && void 0 !== i23 ? i23 : r8).importNode(s20, true);
      C2.currentNode = o29;
      let n31 = C2.nextNode(), l20 = 0, h11 = 0, u11 = e33[0];
      for (; void 0 !== u11; ) {
        if (l20 === u11.index) {
          let i24;
          2 === u11.type ? i24 = new R2(n31, n31.nextSibling, this, t17) : 1 === u11.type ? i24 = new u11.ctor(n31, u11.name, u11.strings, this, t17) : 6 === u11.type && (i24 = new Z2(n31, this, t17)), this._$AV.push(i24), u11 = e33[++h11];
        }
        l20 !== (null == u11 ? void 0 : u11.index) && (n31 = C2.nextNode(), l20++);
      }
      return C2.currentNode = r8, o29;
    }
    v(t17) {
      let i23 = 0;
      for (const s20 of this._$AV)
        void 0 !== s20 && (void 0 !== s20.strings ? (s20._$AI(t17, s20, i23), i23 += s20.strings.length - 2) : s20._$AI(t17[i23])), i23++;
    }
  };
  var R2 = class _R {
    constructor(t17, i23, s20, e33) {
      var o29;
      this.type = 2, this._$AH = A2, this._$AN = void 0, this._$AA = t17, this._$AB = i23, this._$AM = s20, this.options = e33, this._$Cp = null === (o29 = null == e33 ? void 0 : e33.isConnected) || void 0 === o29 || o29;
    }
    get _$AU() {
      var t17, i23;
      return null !== (i23 = null === (t17 = this._$AM) || void 0 === t17 ? void 0 : t17._$AU) && void 0 !== i23 ? i23 : this._$Cp;
    }
    get parentNode() {
      let t17 = this._$AA.parentNode;
      const i23 = this._$AM;
      return void 0 !== i23 && 11 === (null == t17 ? void 0 : t17.nodeType) && (t17 = i23.parentNode), t17;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t17, i23 = this) {
      t17 = S4(this, t17, i23), d4(t17) ? t17 === A2 || null == t17 || "" === t17 ? (this._$AH !== A2 && this._$AR(), this._$AH = A2) : t17 !== this._$AH && t17 !== T2 && this._(t17) : void 0 !== t17._$litType$ ? this.g(t17) : void 0 !== t17.nodeType ? this.$(t17) : v2(t17) ? this.T(t17) : this._(t17);
    }
    k(t17) {
      return this._$AA.parentNode.insertBefore(t17, this._$AB);
    }
    $(t17) {
      this._$AH !== t17 && (this._$AR(), this._$AH = this.k(t17));
    }
    _(t17) {
      this._$AH !== A2 && d4(this._$AH) ? this._$AA.nextSibling.data = t17 : this.$(r8.createTextNode(t17)), this._$AH = t17;
    }
    g(t17) {
      var i23;
      const { values: s20, _$litType$: e33 } = t17, o29 = "number" == typeof e33 ? this._$AC(t17) : (void 0 === e33.el && (e33.el = N2.createElement(P2(e33.h, e33.h[0]), this.options)), e33);
      if ((null === (i23 = this._$AH) || void 0 === i23 ? void 0 : i23._$AD) === o29)
        this._$AH.v(s20);
      else {
        const t18 = new M2(o29, this), i24 = t18.u(this.options);
        t18.v(s20), this.$(i24), this._$AH = t18;
      }
    }
    _$AC(t17) {
      let i23 = E2.get(t17.strings);
      return void 0 === i23 && E2.set(t17.strings, i23 = new N2(t17)), i23;
    }
    T(t17) {
      c5(this._$AH) || (this._$AH = [], this._$AR());
      const i23 = this._$AH;
      let s20, e33 = 0;
      for (const o29 of t17)
        e33 === i23.length ? i23.push(s20 = new _R(this.k(u4()), this.k(u4()), this, this.options)) : s20 = i23[e33], s20._$AI(o29), e33++;
      e33 < i23.length && (this._$AR(s20 && s20._$AB.nextSibling, e33), i23.length = e33);
    }
    _$AR(t17 = this._$AA.nextSibling, i23) {
      var s20;
      for (null === (s20 = this._$AP) || void 0 === s20 || s20.call(this, false, true, i23); t17 && t17 !== this._$AB; ) {
        const i24 = t17.nextSibling;
        t17.remove(), t17 = i24;
      }
    }
    setConnected(t17) {
      var i23;
      void 0 === this._$AM && (this._$Cp = t17, null === (i23 = this._$AP) || void 0 === i23 || i23.call(this, t17));
    }
  };
  var k4 = class {
    constructor(t17, i23, s20, e33, o29) {
      this.type = 1, this._$AH = A2, this._$AN = void 0, this.element = t17, this.name = i23, this._$AM = e33, this.options = o29, s20.length > 2 || "" !== s20[0] || "" !== s20[1] ? (this._$AH = Array(s20.length - 1).fill(new String()), this.strings = s20) : this._$AH = A2;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17, i23 = this, s20, e33) {
      const o29 = this.strings;
      let n31 = false;
      if (void 0 === o29)
        t17 = S4(this, t17, i23, 0), n31 = !d4(t17) || t17 !== this._$AH && t17 !== T2, n31 && (this._$AH = t17);
      else {
        const e34 = t17;
        let l20, h11;
        for (t17 = o29[0], l20 = 0; l20 < o29.length - 1; l20++)
          h11 = S4(this, e34[s20 + l20], i23, l20), h11 === T2 && (h11 = this._$AH[l20]), n31 || (n31 = !d4(h11) || h11 !== this._$AH[l20]), h11 === A2 ? t17 = A2 : t17 !== A2 && (t17 += (null != h11 ? h11 : "") + o29[l20 + 1]), this._$AH[l20] = h11;
      }
      n31 && !e33 && this.j(t17);
    }
    j(t17) {
      t17 === A2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t17 ? t17 : "");
    }
  };
  var H2 = class extends k4 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t17) {
      this.element[this.name] = t17 === A2 ? void 0 : t17;
    }
  };
  var I2 = s6 ? s6.emptyScript : "";
  var L2 = class extends k4 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t17) {
      t17 && t17 !== A2 ? this.element.setAttribute(this.name, I2) : this.element.removeAttribute(this.name);
    }
  };
  var z = class extends k4 {
    constructor(t17, i23, s20, e33, o29) {
      super(t17, i23, s20, e33, o29), this.type = 5;
    }
    _$AI(t17, i23 = this) {
      var s20;
      if ((t17 = null !== (s20 = S4(this, t17, i23, 0)) && void 0 !== s20 ? s20 : A2) === T2)
        return;
      const e33 = this._$AH, o29 = t17 === A2 && e33 !== A2 || t17.capture !== e33.capture || t17.once !== e33.once || t17.passive !== e33.passive, n31 = t17 !== A2 && (e33 === A2 || o29);
      o29 && this.element.removeEventListener(this.name, this, e33), n31 && this.element.addEventListener(this.name, this, t17), this._$AH = t17;
    }
    handleEvent(t17) {
      var i23, s20;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s20 = null === (i23 = this.options) || void 0 === i23 ? void 0 : i23.host) && void 0 !== s20 ? s20 : this.element, t17) : this._$AH.handleEvent(t17);
    }
  };
  var Z2 = class {
    constructor(t17, i23, s20) {
      this.element = t17, this.type = 6, this._$AN = void 0, this._$AM = i23, this.options = s20;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17) {
      S4(this, t17);
    }
  };
  var B = i7.litHtmlPolyfillSupport;
  null == B || B(N2, R2), (null !== (t6 = i7.litHtmlVersions) && void 0 !== t6 ? t6 : i7.litHtmlVersions = []).push("2.8.0");
  var D = (t17, i23, s20) => {
    var e33, o29;
    const n31 = null !== (e33 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== e33 ? e33 : i23;
    let l20 = n31._$litPart$;
    if (void 0 === l20) {
      const t18 = null !== (o29 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== o29 ? o29 : null;
      n31._$litPart$ = l20 = new R2(i23.insertBefore(u4(), t18), t18, void 0, null != s20 ? s20 : {});
    }
    return l20._$AI(t17), l20;
  };

  // node_modules/@material/mwc-icon/node_modules/lit-element/lit-element.js
  var l5;
  var o8;
  var s7 = class extends u3 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t17, e33;
      const i23 = super.createRenderRoot();
      return null !== (t17 = (e33 = this.renderOptions).renderBefore) && void 0 !== t17 || (e33.renderBefore = i23.firstChild), i23;
    }
    update(t17) {
      const i23 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t17), this._$Do = D(i23, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t17;
      super.connectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(true);
    }
    disconnectedCallback() {
      var t17;
      super.disconnectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(false);
    }
    render() {
      return T2;
    }
  };
  s7.finalized = true, s7._$litElement$ = true, null === (l5 = globalThis.litElementHydrateSupport) || void 0 === l5 || l5.call(globalThis, { LitElement: s7 });
  var n8 = globalThis.litElementPolyfillSupport;
  null == n8 || n8({ LitElement: s7 });
  (null !== (o8 = globalThis.litElementVersions) && void 0 !== o8 ? o8 : globalThis.litElementVersions = []).push("3.3.3");

  // node_modules/@material/mwc-icon/node_modules/@lit/reactive-element/decorators/custom-element.js
  var e10 = (e33) => (n31) => "function" == typeof n31 ? ((e34, n32) => (customElements.define(e34, n32), n32))(e33, n31) : ((e34, n32) => {
    const { kind: t17, elements: s20 } = n32;
    return { kind: t17, elements: s20, finisher(n33) {
      customElements.define(e34, n33);
    } };
  })(e33, n31);

  // node_modules/@material/mwc-icon/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n10;
  var e11 = null != (null === (n10 = window.HTMLSlotElement) || void 0 === n10 ? void 0 : n10.prototype.assignedElements) ? (o29, n31) => o29.assignedElements(n31) : (o29, n31) => o29.assignedNodes(n31).filter((o30) => o30.nodeType === Node.ELEMENT_NODE);

  // node_modules/@material/mwc-icon/mwc-icon-host.css.js
  var styles7 = i6`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

  // node_modules/@material/mwc-icon/mwc-icon.js
  var Icon = class Icon2 extends s7 {
    /** @soyTemplate */
    render() {
      return x2`<span><slot></slot></span>`;
    }
  };
  Icon.styles = [styles7];
  Icon = __decorate([
    e10("mwc-icon")
  ], Icon);

  // node_modules/lit-html/directives/style-map.js
  var n11 = "important";
  var i8 = " !" + n11;
  var o10 = e5(class extends i5 {
    constructor(t17) {
      if (super(t17), t17.type !== t4.ATTRIBUTE || "style" !== t17.name || t17.strings?.length > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t17) {
      return Object.keys(t17).reduce((e33, r18) => {
        const s20 = t17[r18];
        return null == s20 ? e33 : e33 + `${r18 = r18.includes("-") ? r18 : r18.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s20};`;
      }, "");
    }
    update(e33, [r18]) {
      const { style: s20 } = e33.element;
      if (void 0 === this.ft)
        return this.ft = new Set(Object.keys(r18)), this.render(r18);
      for (const t17 of this.ft)
        null == r18[t17] && (this.ft.delete(t17), t17.includes("-") ? s20.removeProperty(t17) : s20[t17] = null);
      for (const t17 in r18) {
        const e34 = r18[t17];
        if (null != e34) {
          this.ft.add(t17);
          const r19 = "string" == typeof e34 && e34.endsWith(i8);
          t17.includes("-") || r19 ? s20.setProperty(t17, r19 ? e34.slice(0, -11) : e34, r19 ? n11 : "") : s20[t17] = e34;
        }
      }
      return w;
    }
  });

  // client/components/example_table.css
  var styles8 = i`thead {
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 1;
}

thead.search-box-shown {
  height: 68px;
}

th {
  background-color: var(--comparator-greyblue-300);
  color: white;
  font-weight: normal;
  line-height: 17px;
  overflow: hidden;
  padding: 8px 6px 2px 6px;
  position: relative;
  vertical-align: top;
}

td {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid var(--comparator-grey-200);
  /* LINT.IfChange */
  line-height: 1.4em;
  /* LINT.ThenChange(../lib/constants.ts) */
  padding: 8px 4px 2px 12px;
  vertical-align: top;
}

tr.selected td {
  background-color: var(--comparator-green-100);
}

/* Header row */
th.example-index {
  min-width: 25px;
  width: 25px;
}

th.input-text {
  min-width: 300px;
  width: 30%;
}

th.output-text {
  min-width: 300px;
  overflow-x: hidden;
  width: 35%;
}

tr.one-text-column-hidden th.input-text,
tr.one-text-column-hidden th.output-text,
tr.one-text-column-hidden th.custom-text {
  width: 50%;
}

tr.two-text-columns-hidden th.input-text,
tr.two-text-columns-hidden th.output-text {
  width: 100%;
}

th.output-a {
  background-color: var(--comparator-model-a);
}

th.output-b {
  background-color: var(--comparator-model-b);
}

th.tags {
  min-width: 60px;
  width: 70px;
}

th.score {
  min-width: 70px;
  padding-left: 2px;
  padding-right: 10px;
  width: 70px;
}

th.rationales {
  min-width: 250px;
  width: 30%;
}

th.rationale-list {
  min-width: 200px;
  width: 20%;
}

th.custom-number {
  min-width: 20px;
  width: 50px;
}

th.custom-string,
th.custom-category,
th.custom-url {
  min-width: 100px;
}

th.custom-text {
  min-width: 250px;
  width: 30%;
}

th.custom-image {
  width: 200px;
}

th .custom-field-name {
  max-width: 100px;
}

th.custom-number .custom-field-name {
  max-width: 50px;
}

th.custom-per-model .custom-field-name {
  max-width: 120px;
}

th.custom-per-model-boolean {
  min-width: 50px;
}

th.custom-per-model-number {
  min-width: 60px;
}

th.custom-per-model-category {
  min-width: 160px;
}

th.custom-per-rating-string {
  min-width: 100px;
}

th.custom-per-rating-per-model-category {
  min-width: 135px;
}

tr.header-row th.custom-per-model {
  height: auto;
}

tr.second-row th {
  height: 20px;
  padding-top: 0;
}

tr.second-row .sort-icons-container {
  top: 1px;
}

/* Change padding when holder exists */
td.input-text,
td.output-text,
td.rationales,
td.custom-string,
td.custom-category,
td.custom-text,
td.custom-url,
td.custom-image,
td.custom-per-model-category,
td.custom-per-model-text,
td.custom-per-rating-string,
td.custom-per-rating-per-model-category {
  padding: 0 0 0 12px;
  position: relative;
}

/* for list-holder */
td.rationale-list {
  padding: 0 0 0 8px;
}

td.tags {
  overflow-x: hidden;
  word-break: break-word;
}

td.score {
  padding-left: 4px;
  text-align: center;
}

td.score.a-win {
  background-color: var(--comparator-model-a-win-bg);
}

td.score.b-win {
  background-color: var(--comparator-model-b-win-bg);
}

.score-number {
  font-size: 14px;
}

.score-description {
  background-color: var(--comparator-grey-450);
  border-radius: 5px;
  color: white;
  display: inline-block;
  font-size: 11px;
  margin: 2px 0;
  opacity: 0.8;
  padding: 0 3px;
}

.rater-info-link {
  color: var(--comparator-grey-600);
  font-size: 11px;
  padding: 4px 0;
  text-decoration: underline;
}

.selected .rater-info-link {
  color: var(--comparator-grey-800);
  font-weight: 600;
}

td.score:hover .rater-info-link {
  color: var(--comparator-grey-800);
}

ul.rationale-list {
  line-height: 1.3em;
  padding-left: 15px;
}

ul.rationale-list li {
  border-radius: 5px;
  margin: 0 2px 4px;
  position: relative;
}

/* for applying background-color also to the areas for the bulleted points */
ul.rationale-list li::before {
  border-radius: 5px;
  content: '';
  height: 100%;
  left: -16px;
  position: absolute;
  top: 0;
  width: 35px;
  z-index: -1;
}

ul.rationale-list li.cluster-selected {
  background-color: var(--comparator-greygreen-100);
  color: #000;
}

ul.rationale-list li:hover,
ul.rationale-list li:hover::before,
ul.rationale-list li.cluster-selected::before {
  background-color: var(--comparator-greygreen-200);
}

.text-holder,
.list-holder,
.sequence-chunks-holder,
.score-holder {
  height: 119px;  /* Set default as 17px x 7 rows */
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 8px;
}

.text-holder {
  overflow-wrap: anywhere;
  white-space: break-spaces;
}

.custom-per-model-text
.text-holder {
  width: 240px;
}

.sequence-chunks-holder {
  overflow-wrap: anywhere;
}

.score-holder {
  overflow-y: hidden;
  padding-top: 0;
}

tr.monospace .text-holder {
  font-family: monospace;
}

.text-chunk {
  white-space: break-spaces;
}

.highlighted-match {
  color: var(--comparator-green-500);
}

.highlighted-search-match {
  background-color: var(--comparator-search-match-background);
  color: var(--comparator-search-match-foreground);
  font-weight: 600;
}

/* For tag chips */
.input-text {
  overflow-x: hidden;
}

.input-text .text-holder:after,
.input-text .sequence-chunks-holder:after {
  content: "";
  display: block;
  height: 28px;
}

td .tag-chips {
  bottom: 0;
  display: flex;
  margin: 3px 20px 3px 0;
  padding-left: 0;
  position: absolute;
}

td .tag-chips .tag-chip {
  background-color: var(--comparator-custom-func-200);
  border: 1px solid var(--comparator-custom-func-500);
  border-radius: 15px;
  color: var(--comparator-custom-func-800);
  list-style: none;
  margin-right: 2px;
  padding: 1px 10px;
  white-space: nowrap;
}

/* For custom function chips */
.output-text .text-holder:after {
  content: "";
  display: block;
  height: 28px;
}

td .custom-func-result-chip {
  background-color: var(--comparator-custom-func-200);
  border: 1px solid var(--comparator-custom-func-500);
  bottom: 0;
  border-radius: 15px;
  color: var(--comparator-custom-func-800);
  margin: 3px 20px 3px 0;
  padding: 1px 15px;
  position: absolute;
}

td .custom-func-result-chip.greyscale {
  background-color: var(--comparator-grey-100);
  border: 1px solid var(--comparator-grey-200);
  color: #aaa;
}

/* Custom fields */
td.custom-number {
  text-align: right;
}

td.custom-string,
td.custom-category {
  word-break: break-word;
}

td.custom-url {
  word-break: break-all;
}

/* Per-model fields */
table.per-model-data {
  width: 100%;
}

table.per-model-data td {
  min-width: 25px;
  padding: 6px 4px;
  width: 50%;
}

td.custom-per-model-category td {
  min-width: 50px;
}

td.custom-per-model-first {
  border-left: 1px solid var(--comparator-grey-300);
}

td.custom-per-model-last {
  border-right: 1px solid var(--comparator-grey-300);
}

.chart-holder {
  height: 119px;  /* Set default as 17px x 7 rows */
  overflow-wrap: anywhere;
  overflow-y: auto;
  padding-top: 8px;
}

/* Set scrollbar as optional */
td.custom-string .text-holder,
td.custom-category .text-holder,
td.custom-url .text-holder,
td.custom-per-model-category .text-holder,
td.custom-per-model-text .text-holder {
  overflow-y: auto;
}

td.custom-image img {
  max-height: 110px;
  max-width: 180px;
}

/* Sort icons */
.sort-icons-container {
  background-color: var(--comparator-greyblue-300);
}

th.output-a .sort-icons-container {
  background-color: var(--comparator-model-a);
}

th.output-b .sort-icons-container {
  background-color: var(--comparator-model-b);
}

/* Search */
.search-icon-container {
  right: 14px;
  position: absolute;
  top: 10px;
}

.search-icon-container .sort-icon {
  font-size: 16px;
}

th .search-field {
  bottom: 3px;
  display: flex;
  font-size: 11px;
  gap: 2px;
  left: 5%;
  position: absolute;
  width: 90%;
}

th .search-field input {
  background: rgba(255, 255, 255, 0.5);
  border: 0;
  padding: 3px 5px;
  width: 100%;
}

th .search-field button {
  border: 0;
  color: var(--comparator-grey-500);
}

/* Show more */
.display-more-button {
  background-color: var(--comparator-grey-100);
  border: 0;
  font-size: 13px;
  margin: 10px 0;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}

.display-more-button:hover {
  background-color: var(--comparator-greygreen-100);
}
`;

  // client/components/example_table.ts
  var ExampleTableElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.showSearchBoxes = false;
      makeObservable(this);
    }
    static get styles() {
      return [styles, styles8];
    }
    styleCustomField(field, modelIndex = null) {
      return e6({
        "custom-number": field.type === "number" /* NUMBER */,
        "custom-string": field.type === "string" /* STRING */,
        "custom-category": field.type === "category" /* CATEGORY */,
        "custom-text": field.type === "text" /* TEXT */,
        "custom-url": field.type === "url" /* URL */,
        "custom-image": field.type === "image_path" /* IMAGE_PATH */ || field.type === "image_byte" /* IMAGE_BYTE */,
        "custom-per-model": isPerModelFieldType(field) === true,
        "custom-per-model-boolean": field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */,
        "custom-per-model-number": field.type === "per_model_number" /* PER_MODEL_NUMBER */,
        "custom-per-model-category": field.type === "per_model_category" /* PER_MODEL_CATEGORY */,
        "custom-per-model-text": field.type === "per_model_text" /* PER_MODEL_TEXT */,
        "custom-per-model-first": modelIndex === 0,
        "custom-per-model-last": modelIndex === this.appState.models.length - 1,
        "custom-per-rating-string": field.type === "per_rating_string" /* PER_RATING_STRING */,
        "custom-per-rating-per-model-category": field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */
      });
    }
    renderCustomFuncResultChip(value, customFunc) {
      const customFuncResultChipStyle = e6({
        "custom-func-result-chip": true,
        "greyscale": customFunc.returnType === "Boolean" /* BOOLEAN */ && value !== true
      });
      return x` <div class=${customFuncResultChipStyle}>
      ${customFunc.name}:
      <strong> ${printCustomFuncResultValue(value)} </strong>
    </div>`;
    }
    styleHolder(exampleIndex) {
      return o10({
        "height": this.appState.getIsExampleExpanded(exampleIndex) !== true ? `${this.appState.numberOfLinesPerOutputCell * LINE_HEIGHT_IN_CELL}px` : "auto",
        "min-height": this.appState.getIsExampleExpanded(exampleIndex) === true ? `${this.appState.numberOfLinesPerOutputCell * LINE_HEIGHT_IN_CELL}px` : null
      });
    }
    renderPerModelField(values, field, exampleIndex) {
      if (values.length !== 2) {
        throw new Error("Per-model fields must have exactly 2 values.");
      } else {
        const cells = values.map((value, modelIndex) => {
          const renderValue = () => {
            if (field.type === "per_model_number" /* PER_MODEL_NUMBER */ || field.type === "per_model_boolean" /* PER_MODEL_BOOLEAN */ || field.type === "per_model_category" /* PER_MODEL_CATEGORY */) {
              if (typeof value === "number") {
                return toFixedIfNeeded(value);
              } else {
                return value;
              }
            } else {
              const styleHolder = this.styleHolder(exampleIndex);
              return x`<div class="text-holder" style=${styleHolder}>${value}</div>`;
            }
          };
          return x` <td class=${this.styleCustomField(field, modelIndex)}>
              ${renderValue()}
            </td>`;
        });
        return x`${cells}`;
      }
    }
    // Per-rating per-model-category case.
    // (e.g., Quality: [['Awesome' (A), 'Bad' (B)] (Rater #0), ...]).
    // We use rowIndex and columnIndex instead of example and field, to ensure
    // the charts get updated when state variables get updated.
    renderPerRatingPerModelCategoryField(rowIndex, columnIndex) {
      const getValueDomain = () => {
        const field = this.appState.visibleColumns[columnIndex];
        return this.appState.valueDomainsForCustomFields[field.id];
      };
      const getBarChartData = () => {
        if (rowIndex >= this.appState.examplesForMainTable.length) {
          return [];
        } else {
          const ex = this.appState.examplesForMainTable[rowIndex];
          const field = this.appState.visibleColumns[columnIndex];
          return [
            ex.individual_rater_scores.map(
              (rating) => rating.custom_fields[field.id][0]
            ),
            ex.individual_rater_scores.map(
              (rating) => rating.custom_fields[field.id][1]
            )
          ];
        }
      };
      const isAnyBarSelected = (groupIndex) => {
        const field = this.appState.visibleColumns[columnIndex];
        return this.appState.selectedBarChartValueForSelectedExample != null && this.appState.selectedBarChartValueForSelectedExample.fieldId === field.id && this.appState.selectedBarChartValueForSelectedExample.modelIndex === groupIndex;
      };
      const isThisBarSelected = (value, groupIndex) => {
        const field = this.appState.visibleColumns[columnIndex];
        return this.appState.selectedBarChartValueForSelectedExample != null && this.appState.selectedBarChartValueForSelectedExample.fieldId === field.id && this.appState.selectedBarChartValueForSelectedExample.modelIndex === groupIndex && this.appState.selectedBarChartValueForSelectedExample.value === value;
      };
      const handleClickBar = (value, groupIndex) => {
        const field = this.appState.visibleColumns[columnIndex];
        const currentSelection = this.appState.selectedBarChartValueForSelectedExample;
        if (currentSelection != null && currentSelection.fieldId === field.id && currentSelection.modelIndex === groupIndex && currentSelection.value === value) {
          this.appState.selectedBarChartValueForSelectedExample = null;
        } else {
          this.appState.selectedExample = this.appState.examplesForMainTable[rowIndex];
          this.appState.showSelectedExampleDetails = true;
          this.appState.selectedBarChartValueForSelectedExample = {
            fieldId: field.id,
            modelIndex: groupIndex,
            value
          };
        }
      };
      const getHighlightedValues = () => {
        const field = this.appState.visibleColumns[columnIndex];
        return this.appState.selectedBarChartValues[field.id].filter(
          (value) => value != null
        );
      };
      return x` <td class="custom-per-rating-per-model-category">
      <div
        class="chart-holder"
        style=${this.styleHolder(this.appState.examplesForMainTable[rowIndex].index)}>
        <comparator-bar-chart
          .getValueDomain=${getValueDomain}
          .getGroupedDataValues=${getBarChartData}
          .groupCount=${2}
          .svgWidth=${130}
          .leftAxisWidth=${70}
          .barHeight=${6}
          .isAnyBarSelected=${isAnyBarSelected}
          .isThisBarSelected=${isThisBarSelected}
          .handleClickBar=${handleClickBar}
          .getHighlightedValues=${getHighlightedValues}>
        </comparator-bar-chart>
      </div>
    </td>`;
    }
    renderRow(example, rowIndex) {
      const handleDoubleClickRow = () => {
        this.appState.isExampleExpanded[example.index] = this.appState.getIsExampleExpanded(example.index) === true ? false : true;
      };
      const styleRow = e6({
        "selected": this.appState.selectedExample === example,
        "monospace": this.appState.useMonospace === true
      });
      const styleHolder = this.styleHolder(example.index);
      const textDiff = typeof example.output_text_a === "string" && typeof example.output_text_b === "string" ? getTextDiff(example.output_text_a, example.output_text_b) : getTextDiff("", "");
      const renderTextString = (rawText, parsedText, searchQuery, selectedCustomFunc2) => {
        if (searchQuery !== "") {
          return renderSearchedString(rawText, searchQuery);
        } else if (selectedCustomFunc2 != null && selectedCustomFunc2.functionType === "Regular Expr." /* REGEXP */) {
          return renderSearchedString(
            rawText,
            selectedCustomFunc2.functionBody,
            false
          );
        } else if (parsedText != null && this.appState.isShowTextDiff === true) {
          return renderDiffString(parsedText, textDiff.isEquals);
        } else {
          return rawText;
        }
      };
      const renderText = (rawText, parsedText, fieldId) => {
        const searchQuery = this.appState.searchFilters[fieldId];
        if (typeof rawText === "string") {
          const selectedCustomFunc2 = fieldId === FIELD_ID_FOR_OUTPUT_A || fieldId === FIELD_ID_FOR_OUTPUT_B ? this.appState.selectedCustomFunc : null;
          return x` <div class="text-holder" style=${styleHolder}
          >${renderTextString(
            rawText,
            parsedText,
            searchQuery,
            selectedCustomFunc2
          )}</div>`;
        } else {
          return x` <div class="sequence-chunks-holder" style=${styleHolder}>
          ${rawText.map(
            (chunk) => chunk.type === "text" /* TEXT */ ? x`<div class="text-chunk"
                  >${searchQuery !== "" ? renderSearchedString(chunk.data, searchQuery) : chunk.data}</div
                >` : x`<div>
                  <img src=${constructImageSrcFromByte(chunk.data)} />
                </div>`
          )}
        </div>`;
        }
      };
      const renderTag = (tag) => x`<li title="${tag}">${tag}</li>`;
      const renderTags = example.tags.length === 0 ? "" : example.tags.length === 1 ? example.tags[0] : x`<ul
              >${example.tags.map((tag) => renderTag(tag))}</ul
            >`;
      const handleClickRaterDetails = () => {
        if (this.appState.selectedExample === example && this.appState.showSelectedExampleDetails === true) {
          this.appState.selectedExample = null;
          this.appState.showSelectedExampleDetails = false;
        } else {
          this.appState.selectedExample = example;
          this.appState.showSelectedExampleDetails = true;
        }
      };
      const isABetter = this.appState.isWinnerFromScore("A", example.score);
      const isBBetter = this.appState.isWinnerFromScore("B", example.score);
      const isAAndBSame = example.score != null && example.score === this.appState.scoreMiddlePoint;
      const getHistogramRawDataValues = () => {
        if (rowIndex >= this.appState.examplesForMainTable.length) {
          return [];
        } else {
          return this.appState.examplesForMainTable[rowIndex].individual_rater_scores.filter((rating) => rating.score != null).map((rating) => rating.score);
        }
      };
      const renderHistogram = x` <comparator-histogram
      .getHistogramSpec=${() => this.appState.histogramSpecForScores}
      .getRawDataValues=${getHistogramRawDataValues}
      .svgWidth=${40}
      .svgHeight=${35}
      .showBottomAxis=${false}
      .neutralColorThreshold=${() => this.appState.winRateThreshold}
      .isSimplified=${true}
      .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
    </comparator-histogram>`;
      const scoreDescription = this.appState.isScoreDivergingScheme === true ? isABetter === true ? x`<div class="score-description a-win-color">A is better</div>` : isBBetter === true ? x`<div class="score-description b-win-color">B is better</div>` : isAAndBSame === true ? x`<div class="score-description">same</div>` : x`<div class="score-description">similar</div>` : "";
      const raterInfoLink = example.individual_rater_scores.length > 0 ? x`<div class="rater-info-link">
            ${example.individual_rater_scores.length}
            rater${example.individual_rater_scores.length > 1 ? "s" : ""}
          </div>
          ${renderHistogram}` : "";
      const renderScore = example.score == null ? "Null" : x`
        <div class="score-holder" style=${styleHolder}>
          <div class="score-number">${example.score.toFixed(2)}</div>
          ${scoreDescription}
          ${raterInfoLink}
        </div>`;
      const styleScore = e6({
        "score": true,
        "clickable": true,
        "a-win": this.appState.isScoreDivergingScheme === true && isABetter === true,
        "b-win": this.appState.isScoreDivergingScheme === true && isBBetter === true
      });
      const styleRationaleItem = (rationaleItem) => (
        // Check if there is a selected or hovered cluster from the sidebar.
        e6({
          "cluster-selected": rationaleItem.assignedClusterIds != null && (this.appState.selectedRationaleClusterId != null && rationaleItem.assignedClusterIds.includes(
            this.appState.selectedRationaleClusterId
          ) || this.appState.hoveredRationaleClusterId != null && rationaleItem.assignedClusterIds.includes(
            this.appState.hoveredRationaleClusterId
          ))
        })
      );
      const handleMouseenterRationaleItem = (rationaleItem) => {
        this.appState.matchedRationaleClusterIds = rationaleItem.assignedClusterIds || [];
      };
      const handleMouseleaveRationaleItem = () => {
        this.appState.matchedRationaleClusterIds = [];
      };
      const searchQueryForRationaleList = this.appState.searchFilters[FIELD_ID_FOR_RATIONALE_LIST];
      const renderRationaleList = example.rationale_list != null && (isABetter === true || isBBetter === true) ? x`
            <div class="list-holder"
              style=${this.styleHolder(example.index)}>
              <ul class="rationale-list">
                ${example.rationale_list.map(
        (item) => x`
                    <li class=${styleRationaleItem(item)}
                      @mouseenter=${() => void handleMouseenterRationaleItem(item)}
                      @mouseleave=${handleMouseleaveRationaleItem}>
                      ${searchQueryForRationaleList == null ? item.rationale : renderSearchedString(
          item.rationale,
          searchQueryForRationaleList
        )}
                    </li>`
      )}
              </ul>
            </div>` : "";
      const renderTagChips = this.appState.isShowTagChips === true && example.tags.length > 0 ? x`<ul class="tag-chips"
            >${example.tags.map(
        (tag) => x`<li class="tag-chip">${tag}</li>`
      )}</ul
          >` : x``;
      const selectedCustomFunc = this.appState.selectedCustomFunc;
      const renderCustomFuncResultChip = (modelIndex) => selectedCustomFunc != null ? this.renderCustomFuncResultChip(
        (example.custom_fields[getFieldIdForCustomFunc(
          selectedCustomFunc.id
        )] || Array)[modelIndex],
        selectedCustomFunc
      ) : x``;
      const renderCustomField = (field, columnIndex) => {
        if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          return this.renderPerRatingPerModelCategoryField(rowIndex, columnIndex);
        } else if (!(isPerModelFieldType(field) === true)) {
          let content = x``;
          if (example.custom_fields[field.id] == null) {
            content = x``;
          } else if (field.type === "number" /* NUMBER */) {
            content = x`
              ${toFixedIfNeeded(example.custom_fields[field.id])}`;
          } else if (field.type === "string" /* STRING */ || field.type === "category" /* CATEGORY */) {
            content = x`
              <div class="text-holder" style=${styleHolder}
              >${example.custom_fields[field.id]}</div>`;
          } else if (field.type === "text" /* TEXT */) {
            content = x`${renderText(
              example.custom_fields[field.id],
              null,
              field.id
            )}`;
          } else if (field.type === "url" /* URL */) {
            content = x`
              <div class="text-holder" style=${styleHolder}
              ><a href=${example.custom_fields[field.id]}
                  target="_blank"
              >${example.custom_fields[field.id]}</a></div>`;
          } else if (field.type === "image_path" /* IMAGE_PATH */) {
            content = x`
              <div class="text-holder" style=${styleHolder}
              ><img src=${example.custom_fields[field.id]} /></div>`;
          } else if (field.type === "image_byte" /* IMAGE_BYTE */) {
            content = x`
              <div class="text-holder" style=${styleHolder}
              ><img src=${constructImageSrcFromByte(
              example.custom_fields[field.id]
            )} /></div>`;
          } else if (field.type === "per_rating_string" /* PER_RATING_STRING */) {
            content = x`
              <div class="text-holder" style=${styleHolder}
              >${example.individual_rater_scores.map(
              (rating) => rating.custom_fields[field.id]
            ).join("\n")}</div>`;
          }
          return x`<td class=${this.styleCustomField(field)}>${content}</td>`;
        } else {
          const values = example.custom_fields[field.id];
          return this.renderPerModelField(values, field, example.index);
        }
      };
      const rationalesText = example.individual_rater_scores.map((rating) => rating.rationale).join("\n__________\n\n");
      const columns = this.appState.visibleColumns;
      const renderRow = columns.map((field, columnIndex) => {
        if (field.id === FIELD_ID_FOR_INDEX) {
          return x` <td>${example.index}</td>`;
        } else if (field.id === FIELD_ID_FOR_INPUT) {
          return x` <td class="input-text">
          ${renderText(example.input_text, null, field.id)} ${renderTagChips}
        </td>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_A) {
          return x` <td class="output-text">
          ${renderText(example.output_text_a, textDiff.parsedA, field.id)}
          ${renderCustomFuncResultChip(0)}
        </td>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_B) {
          return x` <td class="output-text">
          ${renderText(example.output_text_b, textDiff.parsedB, field.id)}
          ${renderCustomFuncResultChip(1)}
        </td>`;
        } else if (field.id === FIELD_ID_FOR_TAGS) {
          return x` <td class="tags"> ${renderTags} </td>`;
        } else if (field.id === FIELD_ID_FOR_SCORE) {
          return x` <td
          class=${styleScore}
          @click=${handleClickRaterDetails}
          title=${example.individual_rater_scores.length > 0 ? "Click to see individual ratings" : ""}>
          ${renderScore}
        </td>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALES) {
          return x` <td class="rationales">
          ${renderText(rationalesText, null, field.id)}
        </td>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALE_LIST) {
          return x` <td class="rationale-list"> ${renderRationaleList} </td>`;
        } else {
          return renderCustomField(field, columnIndex);
        }
      });
      return x` <tr class=${styleRow} @dblclick=${handleDoubleClickRow}>
      ${renderRow}
    </tr>`;
    }
    renderHeaderRow() {
      const styleTextColumn = this.appState.numberOfShownTextColumns !== 3 ? o10({
        "width": `${(100 / this.appState.numberOfShownTextColumns).toFixed(
          1
        )}%`
      }) : o10({});
      const handleClickSortIcon = (sorting) => {
        const currentSorting2 = this.appState.currentSorting;
        if (isEqualSorting(currentSorting2, sorting)) {
          this.appState.resetSorting();
        } else {
          this.appState.updateSorting(sorting);
        }
      };
      const currentSorting = this.appState.currentSorting;
      const styleSortIcons = (sorting) => e6({
        "sort-icon": true,
        "up": sorting.order === "asc" /* ASC */,
        "down": sorting.order === "desc" /* DESC */,
        "active": isEqualSorting(currentSorting, sorting)
      });
      const isRenderSortIconsForFuncs = this.appState.selectedCustomFunc != null && this.appState.selectedCustomFunc.returnType === "Number" /* NUMBER */;
      const renderSortIcons = (column, customField = null, modelIndex = null) => {
        const sortingCriteria = (order) => ({ column, customField, modelIndex, order });
        return x` <div class="sort-icons-container">
        <mwc-icon
          class=${styleSortIcons(sortingCriteria("asc" /* ASC */))}
          @click=${() => void handleClickSortIcon(sortingCriteria("asc" /* ASC */))}>
          arrow_drop_up
        </mwc-icon>
        <mwc-icon
          class=${styleSortIcons(sortingCriteria("desc" /* DESC */))}
          @click=${() => void handleClickSortIcon(sortingCriteria("desc" /* DESC */))}>
          arrow_drop_down
        </mwc-icon>
      </div>`;
      };
      const renderSearchIcon = x` <div class="search-icon-container">
      <mwc-icon
        class="sort-icon"
        @click=${() => this.showSearchBoxes = !this.showSearchBoxes}>
        search
      </mwc-icon>
    </div>`;
      const renderSearchInput = (fieldId) => {
        const handleApplySearchFilter = () => {
          this.appState.searchFilters[fieldId] = this.appState.searchFilterInputs[fieldId];
        };
        const handleChangeSearchFieldText = (e33) => {
          this.appState.searchFilterInputs[fieldId] = e33.target.value;
          if (this.appState.searchFilterInputs[fieldId].length === 0) {
            handleApplySearchFilter();
          }
        };
        return this.showSearchBoxes === true ? x` <div class="search-field">
        <input
          type="search"
          @input=${handleChangeSearchFieldText}
          @change=${handleApplySearchFilter}
          placeholder="Enter text for search"
          .value=${this.appState.searchFilterInputs[fieldId] || ""} />
        <button @click=${handleApplySearchFilter}>Filter</button>
      </div>` : "";
      };
      const columns = this.appState.visibleColumns;
      const firstRow = columns.filter((field) => field.visible === true).map((field) => {
        if (field.id === FIELD_ID_FOR_INDEX) {
          return x` <th class="example-index" rowspan="2">#</th>`;
        } else if (field.id === FIELD_ID_FOR_INPUT) {
          return x` <th
            class="input-text"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            ${renderSearchInput(FIELD_ID_FOR_INPUT)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_A) {
          return x` <th
            class="output-text output-a"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            <br />(${this.appState.models[0].name})
            ${isRenderSortIconsForFuncs === true ? renderSortIcons("value from selected Custom Function for Output A" /* FUNC_A */) : ""}
            ${renderSearchInput(FIELD_ID_FOR_OUTPUT_A)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_OUTPUT_B) {
          return x` <th
            class="output-text output-b"
            rowspan="2"
            style=${styleTextColumn}>
            ${field.name}
            ${renderSearchIcon}
            <br />(${this.appState.models[1].name})
            ${isRenderSortIconsForFuncs === true ? renderSortIcons("value from selected Custom Function for Output B" /* FUNC_B */) : ""}
            ${renderSearchInput(FIELD_ID_FOR_OUTPUT_B)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_TAGS) {
          return x` <th class="tags" rowspan="2">
            ${field.name} ${renderSortIcons("tags" /* TAGS */)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_SCORE) {
          return x` <th class="score" rowspan="2">
            ${field.name} ${renderSortIcons("score" /* SCORE */)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALES) {
          return x` <th class="rationales" rowspan="2">
            ${field.name}
              <br /><small>(Be careful! A and B might be flipped.)</small>
              ${renderSearchIcon}
              ${renderSearchInput(FIELD_ID_FOR_RATIONALES)}
          </th>`;
        } else if (field.id === FIELD_ID_FOR_RATIONALE_LIST) {
          return x`
              <th class="rationale-list" rowspan="2">
                ${field.name}
                ${renderSearchIcon}
                ${renderSearchInput(FIELD_ID_FOR_RATIONALE_LIST)}
              </th>`;
        } else if (isPerModelFieldType(field) === true) {
          return x` <th colspan="2" class=${this.styleCustomField(field)}>
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
          </th>`;
        } else if (field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */) {
          return x` <th class=${this.styleCustomField(field)} rowspan="2">
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
          </th>`;
        } else {
          const sortIcons = field.type === "image_path" /* IMAGE_PATH */ || field.type === "image_byte" /* IMAGE_BYTE */ || field.type === "text" /* TEXT */ ? "" : renderSortIcons("custom attribute" /* CUSTOM_ATTRIBUTE */, field);
          const searchIconAndInput = field.type === "text" /* TEXT */ ? x`
                ${renderSearchIcon}
                ${renderSearchInput(field.id)}` : "";
          return x` <th class=${this.styleCustomField(field)} rowspan="2">
            <div class="custom-field-name" title=${field.name}>
              ${field.name}
            </div>
            ${sortIcons}
            ${searchIconAndInput}
          </th>`;
        }
      });
      const secondRow = columns.filter((field) => field.visible === true).filter((field) => isPerModelFieldType(field) === true).map(
        (field) => x` <th>
              <span class="model-a">A</span>
              ${renderSortIcons("custom attribute" /* CUSTOM_ATTRIBUTE */, field, 0)}
            </th>
            <th>
              <span class="model-b">B</span>
              ${renderSortIcons("custom attribute" /* CUSTOM_ATTRIBUTE */, field, 1)}
            </th>`
      );
      return x` <tr class="header-row">${firstRow}</tr>
      <tr class="second-row">${secondRow}</tr>`;
    }
    // Render button for displaying 50 more examples.
    renderDisplayMoreButton() {
      const numFilteredExamples = this.appState.filteredExamples.length;
      const numExamplesToShowMore = Math.min(
        DEFAULT_NUM_EXAMPLES_TO_DISPLAY,
        numFilteredExamples - this.appState.numExamplesToDisplay
      );
      const handleClickMoreExamples = () => {
        this.appState.numExamplesToDisplay += numExamplesToShowMore;
      };
      return x`
      <div>
        ${numFilteredExamples > this.appState.numExamplesToDisplay ? x`
            <button class="display-more-button clickable"
              @click=${handleClickMoreExamples}>
              Display ${numExamplesToShowMore} more examples
            </button>` : ""}
      </div>`;
    }
    render() {
      const styleHeader = e6({
        "search-box-shown": this.showSearchBoxes
      });
      try {
        const renderRows = this.appState.examplesForMainTable.map(
          (example, rowIndex) => this.renderRow(example, rowIndex)
        );
        return x`
          <table>
            <thead class=${styleHeader}>
              ${this.renderHeaderRow()}
            </thead>
            <tbody>
              ${renderRows}
            </tbody>
          </table>
          ${this.renderDisplayMoreButton()}
      `;
      } catch (error) {
        console.error(error);
        this.appState.updateStatusMessage(
          "Encountered an error while displaying the table."
        );
        return;
      }
    }
  };
  __decorateClass([
    observable
  ], ExampleTableElement.prototype, "showSearchBoxes", 2);
  ExampleTableElement = __decorateClass([
    t3("comparator-example-table")
  ], ExampleTableElement);

  // client/components/metrics_by_slice.css
  var styles9 = i`thead {
  position: sticky;
  top: 0;
}

th.score-avg {
  width: 98px;  /* width sum for score-avg-number and score-avg-chart */
}

td.tag-and-count {
  align-items: center;
  display: flex;
  white-space: nowrap;
}

td.tag-and-count .tag {
  overflow-x: hidden;
  text-overflow: ellipsis;
}

small {
  color: var(--comparator-grey-300);
  font-size: 9px;
  min-width: 15px;
  padding-left: 2px;
}

.number,
small .number {
  color: var(--comparator-grey-500);
  font-family: Roboto;
  font-size: 11px;
}

.number span {
  border-radius: 2px;
  padding: 0 1px;
}

.score-avg-container,
.win-rate-container {
  align-items: center;
  display: flex;
  gap: 2px;
  justify-content: center;
}

.score-avg-container .number,
.win-rate-container .number {
  text-align: right;
  width: 36px;
}

.score-avg-chart {
  font-size: 0;
  width: 62px;  /* distributionAreaWidth + 2px padding */
}

svg {
  background-color: var(--comparator-grey-100);
}

.win-rate-chart {
  font-family: Roboto;
  width: 62px;  /* barAreaWidth + 2px padding */
}

td.score-avg,
td.win-rate-percentage {
  text-align: right;
}

.win-rate-chart svg {
  display: block;
}

.win-rate-chart text {
  fill: var(--comparator-grey-100);
  font-size: 11px;
}

.win-rate-vertical {
  fill: none;
  stroke: var(--comparator-grey-600);
  stroke-width: 2;
}

.win-rate-point {
  fill: var(--comparator-grey-600);
  stroke-width: 0;
}

.win-rate-confidence-interval {
  fill: none;
  stroke: var(--comparator-grey-600);
  stroke-width: 1;
}

rect.bar {
  fill-opacity: 0.75;
}

tr.selected rect.bar {
  fill-opacity: 1.0;
}

rect.bar.win-rate-result-a {
  fill: var(--comparator-model-a-win);
}

rect.bar.win-rate-result-b {
  fill: var(--comparator-model-b-win);
}

rect.bar.win-rate-result-tie {
  fill: var(--comparator-grey-400);
}

.collapsed .table-container {
  max-height: 220px;
  overflow-y: scroll;
}

line.middle-point-vertical {
  fill: none;
  stroke: var(--comparator-grey-300);
  stroke-width: 1;
}

line.error-bar {
  fill: none;
  stroke: var(--comparator-grey-600);
  stroke-width: 1;
}

line.error-bar.a-win-color,
line.win-rate-confidence-interval.a-win-color {
  fill: none;
  stroke: var(--comparator-model-a-win);
}

line.error-bar.b-win-color,
line.win-rate-confidence-interval.b-win-color {
  fill: none;
  stroke: var(--comparator-model-b-win);
}

circle {
  fill: var(--comparator-grey-600);
  stroke-width: 0;
}`;

  // client/components/metrics_by_slice.ts
  var MetricsBySliceElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.distributionAreaWidth = 60;
      this.barAreaWidth = 60;
      this.barHeight = 16;
      this.numRowsDisplayedWhenCollapsed = 10;
      this.sortColumn = "count" /* COUNT */;
      this.sortOrder = "desc" /* DESC */;
      this.isChartCollapsed = true;
      this.winRateMiddlePoint = 0.5;
      makeObservable(this);
    }
    get listTagValues() {
      const valueSet = new Set(
        this.appState.examples.map((ex) => ex.tags).flat()
      );
      return [...valueSet];
    }
    /**
     * Determine the win rate for a score and accumulate to SliceWinRate.
     */
    accumulateWinRateForExample(sliceWinRate, ex, threshold = this.appState.winRateThreshold) {
      sliceWinRate.count += 1;
      if (ex.score == null) {
        sliceWinRate.results["unknown" /* Unknown */] += 1;
      } else if (ex.score > this.appState.scoreMiddlePoint + threshold) {
        sliceWinRate.results["a" /* A */] += 1;
      } else if (ex.score < this.appState.scoreMiddlePoint - threshold) {
        sliceWinRate.results["b" /* B */] += 1;
      } else {
        sliceWinRate.results["tie" /* Tie */] += 1;
      }
      if (ex.score != null) {
        sliceWinRate.scoreSum += ex.score;
        sliceWinRate.scoreSqSum += ex.score ** 2;
      }
    }
    get computeWinRatesByTags() {
      const chartSelectionKey = {
        chartType: "tag" /* TAG */,
        fieldId: "tag",
        model: null
      };
      const filteredExamples = this.appState.getFilteredExamplesExceptForParticularChart(
        chartSelectionKey
      );
      const aggregatedByTags = {};
      aggregatedByTags["All"] = makeNewSliceWinRate("All");
      this.listTagValues.forEach((tag) => {
        aggregatedByTags[tag] = makeNewSliceWinRate(tag);
      });
      filteredExamples.forEach((ex) => {
        this.accumulateWinRateForExample(aggregatedByTags["All"], ex);
        ex.tags.forEach((tag) => {
          this.accumulateWinRateForExample(aggregatedByTags[tag], ex);
        });
      });
      const smallNumber = 1e-4;
      const rate = (winnerCount, tieCount, totalCount) => {
        if (totalCount === 0) {
          return 0;
        }
        return (winnerCount + 0.5 * tieCount + smallNumber) / totalCount;
      };
      return Object.values(aggregatedByTags).sort((i23, j3) => {
        if (this.sortColumn === "count" /* COUNT */) {
          if (this.sortOrder === "desc" /* DESC */) {
            return j3.count - i23.count;
          } else {
            return i23.count - j3.count;
          }
        } else if (this.sortColumn === "avg_score" /* AVG_SCORE */) {
          return compareNumbersWithNulls(
            getAvgScore(i23),
            getAvgScore(j3),
            this.sortOrder === "desc" /* DESC */
          );
        } else if (this.sortColumn === "win_rate" /* WIN_RATE */) {
          if (this.sortOrder === "desc" /* DESC */) {
            return rate(j3.results["a"], j3.results["tie"], j3.count) - rate(i23.results["a"], i23.results["tie"], i23.count);
          } else {
            return rate(j3.results["b"], j3.results["tie"], j3.count) - rate(i23.results["b"], i23.results["tie"], i23.count);
          }
        } else {
          if (this.sortOrder === "desc" /* DESC */) {
            return j3.sliceName.localeCompare(i23.sliceName);
          } else {
            return i23.sliceName.localeCompare(j3.sliceName);
          }
        }
      });
    }
    // Render one of the three bars (e.g., for a, b, or tie) in a row.
    renderWinRateBar(entry, result) {
      const results = entry.results;
      const barCount = results[result];
      const barWidth = this.barAreaWidth * barCount / (entry.count - results["unknown"]);
      const xOffset = this.barAreaWidth * (result === "b" ? results["a"] + results["tie"] : result === "tie" ? results["a"] : 0) / (entry.count - results["unknown"]);
      const xTextOffset = result !== "b" ? 3 : barWidth - 3;
      const textClass = e6({ "right-aligned": result === "b" });
      return b2`
        <g transform="translate(${xOffset}, 0)">
          <rect class="bar win-rate-result-${result}"
            x="0" y="0" width=${barWidth} height=${this.barHeight} />
          ${result !== "tie" && barCount > 0 ? b2`
              <text class=${textClass}
                x=${xTextOffset} y=${this.barHeight - 4}>
                ${barCount}
              </text>` : ""}
        </g>`;
    }
    // Check if the value is significantly higher or lower than the base value.
    isSignificantWinner(model, value, baseValue, intervalLeft, intervalRight) {
      if (value == null) {
        return false;
      }
      if (model === "A" /* A */) {
        return value - baseValue > 0 && intervalLeft - baseValue > 0 && intervalRight - baseValue > 0;
      } else {
        return value - baseValue < 0 && intervalLeft - baseValue < 0 && intervalRight - baseValue < 0;
      }
    }
    // Render a confidence interval chart for average scores.
    renderScoreConfIntervalChart(avgScore, intervalLeft, intervalRight) {
      if (avgScore == null) {
        return x`<svg
        width=${this.distributionAreaWidth}
        height=${this.barHeight}></svg>`;
      }
      const histogramSpec = this.appState.histogramSpecForScores;
      const xValue = (score) => {
        const ratio = (score - histogramSpec.rangeLeft) / (histogramSpec.rangeRight - histogramSpec.rangeLeft);
        return this.distributionAreaWidth * (this.appState.isFlipScoreHistogramAxis === true ? 1 - ratio : ratio);
      };
      const styleElement = (className) => e6({
        "avg-score-point": className === "avg-score-point",
        "error-bar": className === "error-bar",
        "a-win-color": this.isSignificantWinner(
          "A" /* A */,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight
        ),
        "b-win-color": this.isSignificantWinner(
          "B" /* B */,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight
        )
      });
      const tooltipText = `${`95% CI: [${intervalLeft.toFixed(
        3
      )}, ${intervalRight.toFixed(3)}]`}`;
      return x`
        <svg
          width=${this.distributionAreaWidth + 2}
          height=${this.barHeight}>
          <g transform="translate(1, ${this.barHeight * 0.5})">
            <line class="middle-point-vertical"
              x1=${xValue(this.appState.scoreMiddlePoint)}
              x2=${xValue(this.appState.scoreMiddlePoint)}
              y1=${-this.barHeight * 0.5}
              y2=${this.barHeight * 0.5} />
            <line class=${styleElement("error-bar")}
              x1=${xValue(intervalLeft)}
              x2=${xValue(intervalRight)}
              y1="0"
              y2="0" />
            <circle class=${styleElement("avg-score-point")}
              cx=${xValue(avgScore)}
              cy="0"
              r=${3}>
              <title>${tooltipText}</title>
            </circle>
          </g>
        </svg>`;
    }
    renderAvgScoreCell(entry) {
      const avgScore = getAvgScore(entry);
      const histogramSpec = this.appState.histogramSpecForScores;
      const [intervalLeft, intervalRight] = getConfidenceIntervalForMeanFromAggregatedStats(
        entry.count,
        entry.scoreSum,
        entry.scoreSqSum,
        histogramSpec.rangeLeft - histogramSpec.rangeRight > 0
      );
      const styleAvgScoreNumber = e6({
        "a-win-color-bg-darker": this.isSignificantWinner(
          "A" /* A */,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight
        ),
        "b-win-color-bg-darker": this.isSignificantWinner(
          "B" /* B */,
          avgScore,
          this.appState.scoreMiddlePoint,
          intervalLeft,
          intervalRight
        )
      });
      const renderScoreConfIntervalChart = this.renderScoreConfIntervalChart(
        avgScore,
        intervalLeft,
        intervalRight
      );
      return x` <div class="score-avg-container">
      <div class="number">
        <span class=${styleAvgScoreNumber}>
          ${avgScore == null ? "" : avgScore.toFixed(2)}
        </span>
      </div>
      <div class="score-avg-chart">${renderScoreConfIntervalChart}</div>
    </div>`;
    }
    // Render a win rate chart using a stacked percentage bar chart.
    renderWinRateChart(winRate, entry, intervalLeft, intervalRight) {
      const styleElement = (className) => e6({
        "win-rate-point": className === "win-rate-point",
        "win-rate-confidence-interval": className === "win-rate-confidence-interval",
        "a-win-color": intervalLeft != null && intervalRight != null && this.isSignificantWinner(
          "A" /* A */,
          winRate,
          this.winRateMiddlePoint,
          intervalLeft,
          intervalRight
        ),
        "b-win-color": intervalLeft != null && intervalRight != null && this.isSignificantWinner(
          "B" /* B */,
          winRate,
          this.winRateMiddlePoint,
          intervalLeft,
          intervalRight
        )
      });
      const renderConfidenceInterval = intervalLeft != null && intervalRight != null ? b2`
        <line class=${styleElement("win-rate-confidence-interval")}
          x1=${(this.barAreaWidth * intervalLeft).toFixed()}
          y1=${this.barHeight * 0.5}
          x2=${(this.barAreaWidth * intervalRight).toFixed()}
          y2=${this.barHeight * 0.5} />` : b2``;
      const tooltipText = intervalLeft != null && intervalRight != null ? `${`95% CI: [${intervalLeft.toFixed(3)}, ${intervalRight.toFixed(
        3
      )}]`}` : "";
      const renderWinRatePoint = b2`
        <circle class=${styleElement("win-rate-point")}
          cx=${(this.barAreaWidth * winRate).toFixed()}
          r="3"
          cy=${this.barHeight * 0.5}>
          <title>${tooltipText}</title>
        </circle>`;
      return x`
        <svg width=${this.barAreaWidth + 2} height=${this.barHeight}>
          <g transform="translate(1, 0)">
            ${entry.count - entry.results["unknown" /* Unknown */] > 0 ? b2`
                ${this.renderWinRateBar(entry, "tie" /* Tie */)}
                ${this.renderWinRateBar(entry, "b" /* B */)}
                ${this.renderWinRateBar(entry, "a" /* A */)}
                <line class="middle-point-vertical"
                  x1=${this.barAreaWidth * 0.5}
                  y1="0"
                  x2=${this.barAreaWidth * 0.5}
                  y2=${this.barHeight} />
                ${renderConfidenceInterval}
                ${renderWinRatePoint}` : ""}
            </g>
        </svg>`;
    }
    renderWinRateCell(entry) {
      const winRate = getWinRate(entry);
      const [winRateIntervalLeft, winRateIntervalRight] = getConfidenceIntervalForRate(
        entry.results["a"] + entry.results["tie"] * 0.5,
        entry.results["b"] + entry.results["tie"] * 0.5
      );
      const styleWinRateNumber = e6({
        "a-win-color-bg-darker": this.isSignificantWinner(
          "A" /* A */,
          winRate,
          this.winRateMiddlePoint,
          winRateIntervalLeft,
          winRateIntervalRight
        ),
        "b-win-color-bg-darker": this.isSignificantWinner(
          "B" /* B */,
          winRate,
          this.winRateMiddlePoint,
          winRateIntervalLeft,
          winRateIntervalRight
        )
      });
      const renderWinRateChart = this.renderWinRateChart(
        winRate,
        entry,
        winRateIntervalLeft,
        winRateIntervalRight
      );
      return x` <div class="win-rate-container">
      <div class="number">
        <span class=${styleWinRateNumber}>
          ${entry.count > 0 ? x`${formatRateToPercentage(winRate)}` : ""}
        </span>
      </div>
      <div class="win-rate-chart"> ${renderWinRateChart} </div>
    </div>`;
    }
    // Render a stacked bar chart for a slice.
    renderSliceRow(entry) {
      const sliceName = entry.sliceName;
      const handleClickSliceRow = () => {
        if (sliceName === "All" || sliceName === this.appState.selectedTag) {
          this.appState.selectedTag = null;
        } else {
          this.appState.selectedTag = sliceName;
        }
      };
      return x` <tr
      class=${e6({
        "clickable": true,
        "selected": entry.sliceName === this.appState.selectedTag
      })}
      @click=${handleClickSliceRow}>
      <td class="tag-and-count" title=${entry.sliceName}>
        <span class="tag">${entry.sliceName}</span>
        <small class="count">
          (<span class="number">${entry.count}</span>)
        </small>
      </td>
      <td class="score-avg">${this.renderAvgScoreCell(entry)}</td>
      <td class="win-rate">${this.renderWinRateCell(entry)}</td>
    </tr>`;
    }
    // Render a list of stacked bar charts for slices.
    renderWinRateBySliceChart() {
      const renderSliceRows = this.computeWinRatesByTags.map(
        (entry) => this.renderSliceRow(entry)
      );
      const styleComponentContent = e6({
        "sidebar-component-content": true,
        "collapsed": this.isChartCollapsed === true
      });
      const handleClickSortHeader = (columnName) => {
        if (this.sortColumn === columnName) {
          this.sortOrder = this.sortOrder === "asc" /* ASC */ ? "desc" /* DESC */ : "asc" /* ASC */;
        } else {
          this.sortColumn = columnName;
        }
      };
      const styleHeaderCell = (columnName) => e6({
        "tag": columnName === "tag",
        "example-count": columnName === "count",
        "score-avg": columnName === "avg_score",
        "win-rate": columnName === "win_rate",
        "clickable": true,
        "sort-selected": this.sortColumn === columnName
      });
      return x`
        <div class="sidebar-component">
          <div class="sidebar-component-title">
            Metrics by Prompt Category
          </div>
          <div class=${styleComponentContent}>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th class="tag-and-count">
                      <span class=${styleHeaderCell("tag")}
                        title="Click to sort by tag name"
                        @click=${() => void handleClickSortHeader("tag" /* TAG */)}>
                        Category
                      </span>
                      <span class=${styleHeaderCell("count")}
                        title="Click to sort by example count"
                        @click=${() => void handleClickSortHeader("count" /* COUNT */)}>
                        (cnt)
                      </span>
                    </th>
                    <th class=${styleHeaderCell("avg_score")}
                      title="Click to sort by average score"
                      @click=${() => void handleClickSortHeader("avg_score" /* AVG_SCORE */)}>
                      Avg Score
                    </th>
                    <th class=${styleHeaderCell("win_rate")}
                      title="Click to sort by win rate"
                      @click=${() => void handleClickSortHeader("win_rate" /* WIN_RATE */)}>
                      Win Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${renderSliceRows}
                </tbody>
              </table>
            </div>
          </div>
          ${renderSliceRows.length > this.numRowsDisplayedWhenCollapsed ? x`
              <div class="sidebar-component-footer">
                <div @click=${() => this.isChartCollapsed = !this.isChartCollapsed}>
                  ${this.isChartCollapsed === true ? x`<span>Expand</span>` : x`<span>Collapse</span>`}
                </div>
              </div>` : ""}
        </div>`;
    }
    render() {
      return x`${this.renderWinRateBySliceChart()}`;
    }
  };
  MetricsBySliceElement.styles = [styles, styles9];
  __decorateClass([
    observable
  ], MetricsBySliceElement.prototype, "sortColumn", 2);
  __decorateClass([
    observable
  ], MetricsBySliceElement.prototype, "sortOrder", 2);
  __decorateClass([
    observable
  ], MetricsBySliceElement.prototype, "isChartCollapsed", 2);
  __decorateClass([
    computed
  ], MetricsBySliceElement.prototype, "listTagValues", 1);
  __decorateClass([
    computed
  ], MetricsBySliceElement.prototype, "computeWinRatesByTags", 1);
  MetricsBySliceElement = __decorateClass([
    t3("comparator-metrics-by-slice")
  ], MetricsBySliceElement);

  // client/components/rationale_summary.css
  var styles10 = i`th.example-count {
  cursor: pointer;
  width: 50px;
}

th.remove {
  width: 26px;
}

text.bar-count-text {
  alignment-baseline: central;
  fill: var(--comparator-grey-500);
  font-size: 10px;
  text-anchor: start;
}

text.bar-count-text.right-aligned {
  fill: var(--comparator-grey-100);
  text-anchor: end;
}

svg.bar-svg {
  height: 16px;
  width: 42px;
}

td.remove {
  pointer-events: none;
}

.icon {
  color: var(--comparator-grey-300);
  font-size: 12px;
  margin: 0;
  padding: 3px;
  pointer-events: auto;
}`;

  // client/components/rationale_summary.ts
  var RationaleSummaryElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.barMaxWidth = 40;
      this.barHeight = 16;
      this.widthOfNumberLabel = 10;
      this.showOthers = false;
      this.sortColumn = "A";
      makeObservable(this);
    }
    get filteredExamples() {
      const chartSelectionKey = {
        chartType: "rationale_cluster" /* RATIONALE_CLUSTER */,
        fieldId: "rationale_cluster",
        model: null
      };
      return this.appState.getFilteredExamplesExceptForParticularChart(
        chartSelectionKey
      );
    }
    get rationaleClustersWithCounts() {
      const aWinExamples = this.filteredExamples.filter(
        (example) => this.appState.isWinnerFromScore("A", example.score)
      );
      const bWinExamples = this.filteredExamples.filter(
        (example) => this.appState.isWinnerFromScore("B", example.score)
      );
      return this.appState.rationaleClusters.filter(
        (cluster) => this.showOthers === false ? cluster.id >= 0 : true
      ).map((cluster) => {
        const aWinCount = aWinExamples.filter((example) => {
          const clusterIds = example.rationale_list.map(
            (item) => item.assignedClusterIds
          ).flat();
          return clusterIds.includes(cluster.id);
        }).length;
        const bWinCount = bWinExamples.filter((example) => {
          const clusterIds = example.rationale_list.map(
            (item) => item.assignedClusterIds
          ).flat();
          return clusterIds.includes(cluster.id);
        }).length;
        return {
          id: cluster.id,
          title: cluster.title,
          aWinCount,
          bWinCount
        };
      });
    }
    get sortedClusters() {
      return this.rationaleClustersWithCounts.filter(
        (cluster) => cluster.aWinCount > 0 || cluster.bWinCount > 0
      ).sort((i23, j3) => {
        if (i23.id === -1) {
          return 1;
        } else if (j3.id === -1) {
          return -1;
        } else if (this.sortColumn === "A") {
          return j3.aWinCount - i23.aWinCount;
        } else if (this.sortColumn === "B") {
          return j3.bWinCount - i23.bWinCount;
        } else {
          return i23.title.localeCompare(j3.title);
        }
      });
    }
    renderHeaderRow() {
      const styleHeaderCell = (column) => e6({
        "cluster-title": column === "label",
        "example-count": column === "A" || column === "B",
        "sort-selected": this.sortColumn === column,
        "clickable": true
      });
      const handleClickSortHeader = (column) => {
        this.sortColumn = column;
      };
      return x`<tr>
      <th
        class=${styleHeaderCell("label")}
        @click=${() => void handleClickSortHeader("label")}>
        Cluster Label
      </th>
      <th
        class=${styleHeaderCell("A")}
        @click=${() => void handleClickSortHeader("A")}>
        A better
      </th>
      <th
        class=${styleHeaderCell("B")}
        @click=${() => void handleClickSortHeader("B")}>
        B better
      </th>
      <th class="remove"> </th>
    </tr>`;
    }
    // Render a row of the table on the Rationale Summary sidebar component.
    renderClusterRow(cluster, maxCount) {
      const handleClickClusterRow = (clusterId) => {
        if (clusterId === this.appState.selectedRationaleClusterId) {
          this.appState.selectedRationaleClusterId = null;
          this.appState.currentSorting = DEFAULT_SORTING_CRITERIA;
        } else {
          this.appState.selectedRationaleClusterId = clusterId;
          this.appState.currentSorting = {
            column: "similarity between cluster label and the most similar rationale" /* RATIONALE_CLUSTER */,
            customField: null,
            modelIndex: null,
            order: "desc" /* DESC */
          };
        }
      };
      const renderBarCell = (count, maxCount2, model) => {
        const barWidth = this.barMaxWidth * (count / maxCount2);
        const styleBar = e6({
          "bar": true,
          "a-win-color": model === "A",
          "b-win-color": model === "B"
        });
        const styleBarCountText = e6({
          "bar-count-text": true,
          "right-aligned": this.barMaxWidth - barWidth < this.widthOfNumberLabel
        });
        const textHorizontalPadding = this.barMaxWidth - barWidth < this.widthOfNumberLabel ? barWidth - 1 : barWidth + 1;
        return x`<svg class="bar-svg">
        <rect
          class=${styleBar}
          width=${barWidth}
          height=${this.barHeight}
          x=${0}
          y=${0} />
        <text
          class=${styleBarCountText}
          y=${this.barHeight * 0.5}
          dx=${textHorizontalPadding}>
          ${count}
        </text>
      </svg>`;
      };
      const handleMouseEnterRow = (clusterId) => this.appState.hoveredRationaleClusterId = clusterId;
      const handleMouseLeaveRow = () => this.appState.hoveredRationaleClusterId = null;
      return x` <tr
      class=${e6({
        "clickable": true,
        "selected": this.appState.selectedRationaleClusterId === cluster.id || this.appState.matchedRationaleClusterIds.includes(cluster.id)
      })}
      @mouseenter=${() => void handleMouseEnterRow(cluster.id)}
      @mouseleave=${handleMouseLeaveRow}>
      <td class="cluster-title" title=${cluster.title}
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${cluster.title}
      </td>
      <td class="example-count"
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${renderBarCell(cluster.aWinCount, maxCount, "A")}
      </td>
      <td class="example-count"
        @click=${() => void handleClickClusterRow(cluster.id)}>
        ${renderBarCell(cluster.bWinCount, maxCount, "B")}
      </td>
      <td class="remove" title="Click to remove this row">
        <mwc-icon
          class="icon clickable"
          @click=${() => void this.appState.removeCluster(cluster.id)}>
          cancel
        </mwc-icon>
      </td>
    </tr>`;
    }
    render() {
      if (this.appState.hasRationaleClusters === false) {
        return x``;
      }
      const maxCount = Math.max(
        1,
        ...this.sortedClusters.map(
          (cluster) => cluster.aWinCount
        ),
        ...this.sortedClusters.map(
          (cluster) => cluster.bWinCount
        )
      );
      const renderClusters = this.sortedClusters.map(
        (cluster) => this.renderClusterRow(cluster, maxCount)
      );
      return x`<div class="sidebar-component">
      <div class="sidebar-component-title">
        Rationale Summary
      </div>
      <div class="sidebar-component-content">
        <div class="component-content-top">
          <div class="description">
            What are some clusters of the rationales used by the rater
            when it thinks A or B is better?
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              ${this.renderHeaderRow()}
            </thead>
            <tbody>
              ${renderClusters}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
    }
  };
  RationaleSummaryElement.styles = [styles, styles10];
  __decorateClass([
    observable
  ], RationaleSummaryElement.prototype, "showOthers", 2);
  __decorateClass([
    observable
  ], RationaleSummaryElement.prototype, "sortColumn", 2);
  __decorateClass([
    computed
  ], RationaleSummaryElement.prototype, "filteredExamples", 1);
  __decorateClass([
    computed
  ], RationaleSummaryElement.prototype, "rationaleClustersWithCounts", 1);
  __decorateClass([
    computed
  ], RationaleSummaryElement.prototype, "sortedClusters", 1);
  RationaleSummaryElement = __decorateClass([
    t3("comparator-rationale-summary")
  ], RationaleSummaryElement);

  // client/components/score_histogram.css
  var styles11 = i``;

  // client/components/score_histogram.ts
  var ScoreHistogramElement = class extends MobxLitElement {
    constructor() {
      super(...arguments);
      this.appState = core.getService(AppState);
      this.svgWidth = 220;
      this.svgHeight = 110;
    }
    renderScoreHistogram() {
      const chartSelectionKey = {
        chartType: "histogram" /* HISTOGRAM */,
        fieldId: FIELD_ID_FOR_SCORE,
        model: null
      };
      const getHistogramRawDataValues = () => this.appState.getFilteredExamplesExceptForParticularChart(chartSelectionKey).filter((ex) => ex.score != null).map((ex) => ex.score);
      const handleClickHistogramBar = (binIndex) => {
        if (this.appState.selectedHistogramBinForScores === binIndex) {
          this.appState.selectedHistogramBinForScores = null;
        } else {
          this.appState.selectedHistogramBinForScores = binIndex;
        }
      };
      const isAnyBinSelected = () => this.appState.selectedHistogramBinForScores !== null;
      const isThisBinSelected = (binIndex) => binIndex === this.appState.selectedHistogramBinForScores;
      return x`
        <div class="sidebar-component">
          <div class="sidebar-component-title">
            Score Distribution
          </div>
          <div class="sidebar-component-content">
            <comparator-histogram
              .getHistogramSpec=${() => this.appState.histogramSpecForScores}
              .getRawDataValues=${getHistogramRawDataValues}
              .handleClickHistogramBar=${handleClickHistogramBar}
              .isAnyBinSelected=${isAnyBinSelected}
              .isThisBinSelected=${isThisBinSelected}
              .svgWidth=${this.svgWidth}
              .svgHeight=${this.svgHeight}
              .neutralColorThreshold=${() => this.appState.winRateThreshold}
              .showAxisEndDescription=${true}
              .isFlipXAxis=${() => this.appState.isFlipScoreHistogramAxis}>
            </comparator-histogram>
          </div>
        </div>`;
    }
    render() {
      return x` ${this.renderScoreHistogram()}`;
    }
  };
  ScoreHistogramElement.styles = [styles, styles11];
  ScoreHistogramElement = __decorateClass([
    t3("comparator-score-histogram")
  ], ScoreHistogramElement);

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/custom-element.js
  var e12 = (e33) => (n31) => "function" == typeof n31 ? ((e34, n32) => (customElements.define(e34, n32), n32))(e33, n31) : ((e34, n32) => {
    const { kind: t17, elements: s20 } = n32;
    return { kind: t17, elements: s20, finisher(n33) {
      customElements.define(e34, n33);
    } };
  })(e33, n31);

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/property.js
  var i9 = (i23, e33) => "method" === e33.kind && e33.descriptor && !("value" in e33.descriptor) ? { ...e33, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e33.key, initializer() {
    "function" == typeof e33.initializer && (this[e33.key] = e33.initializer.call(this));
  }, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } };
  var e13 = (i23, e33, n31) => {
    e33.constructor.createProperty(n31, i23);
  };
  function n12(n31) {
    return (t17, o29) => void 0 !== o29 ? e13(n31, t17, o29) : i9(n31, t17);
  }

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/state.js
  function t7(t17) {
    return n12({ ...t17, state: true });
  }

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/base.js
  var o11 = ({ finisher: e33, descriptor: t17 }) => (o29, n31) => {
    var r18;
    if (void 0 === n31) {
      const n32 = null !== (r18 = o29.originalKey) && void 0 !== r18 ? r18 : o29.key, i23 = null != t17 ? { kind: "method", placement: "prototype", key: n32, descriptor: t17(o29.key) } : { ...o29, key: n32 };
      return null != e33 && (i23.finisher = function(t18) {
        e33(t18, n32);
      }), i23;
    }
    {
      const r19 = o29.constructor;
      void 0 !== t17 && Object.defineProperty(o29, n31, t17(n31)), null == e33 || e33(r19, n31);
    }
  };

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/event-options.js
  function e14(e33) {
    return o11({ finisher: (r18, t17) => {
      Object.assign(r18.prototype[t17], e33);
    } });
  }

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/query.js
  function i10(i23, n31) {
    return o11({ descriptor: (o29) => {
      const t17 = { get() {
        var o30, n32;
        return null !== (n32 = null === (o30 = this.renderRoot) || void 0 === o30 ? void 0 : o30.querySelector(i23)) && void 0 !== n32 ? n32 : null;
      }, enumerable: true, configurable: true };
      if (n31) {
        const n32 = "symbol" == typeof o29 ? Symbol() : "__" + o29;
        t17.get = function() {
          var o30, t18;
          return void 0 === this[n32] && (this[n32] = null !== (t18 = null === (o30 = this.renderRoot) || void 0 === o30 ? void 0 : o30.querySelector(i23)) && void 0 !== t18 ? t18 : null), this[n32];
        };
      }
      return t17;
    } });
  }

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/query-async.js
  function e15(e33) {
    return o11({ descriptor: (r18) => ({ async get() {
      var r19;
      return await this.updateComplete, null === (r19 = this.renderRoot) || void 0 === r19 ? void 0 : r19.querySelector(e33);
    }, enumerable: true, configurable: true }) });
  }

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n13;
  var e16 = null != (null === (n13 = window.HTMLSlotElement) || void 0 === n13 ? void 0 : n13.prototype.assignedElements) ? (o29, n31) => o29.assignedElements(n31) : (o29, n31) => o29.assignedNodes(n31).filter((o30) => o30.nodeType === Node.ELEMENT_NODE);

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/custom-element.js
  var e17 = (e33) => (n31) => "function" == typeof n31 ? ((e34, n32) => (customElements.define(e34, n32), n32))(e33, n31) : ((e34, n32) => {
    const { kind: t17, elements: s20 } = n32;
    return { kind: t17, elements: s20, finisher(n33) {
      customElements.define(e34, n33);
    } };
  })(e33, n31);

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/property.js
  var i11 = (i23, e33) => "method" === e33.kind && e33.descriptor && !("value" in e33.descriptor) ? { ...e33, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e33.key, initializer() {
    "function" == typeof e33.initializer && (this[e33.key] = e33.initializer.call(this));
  }, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } };
  var e18 = (i23, e33, n31) => {
    e33.constructor.createProperty(n31, i23);
  };
  function n14(n31) {
    return (t17, o29) => void 0 !== o29 ? e18(n31, t17, o29) : i11(n31, t17);
  }

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/state.js
  function t8(t17) {
    return n14({ ...t17, state: true });
  }

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/base.js
  var o12 = ({ finisher: e33, descriptor: t17 }) => (o29, n31) => {
    var r18;
    if (void 0 === n31) {
      const n32 = null !== (r18 = o29.originalKey) && void 0 !== r18 ? r18 : o29.key, i23 = null != t17 ? { kind: "method", placement: "prototype", key: n32, descriptor: t17(o29.key) } : { ...o29, key: n32 };
      return null != e33 && (i23.finisher = function(t18) {
        e33(t18, n32);
      }), i23;
    }
    {
      const r19 = o29.constructor;
      void 0 !== t17 && Object.defineProperty(o29, n31, t17(n31)), null == e33 || e33(r19, n31);
    }
  };

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/query.js
  function i12(i23, n31) {
    return o12({ descriptor: (o29) => {
      const t17 = { get() {
        var o30, n32;
        return null !== (n32 = null === (o30 = this.renderRoot) || void 0 === o30 ? void 0 : o30.querySelector(i23)) && void 0 !== n32 ? n32 : null;
      }, enumerable: true, configurable: true };
      if (n31) {
        const n32 = "symbol" == typeof o29 ? Symbol() : "__" + o29;
        t17.get = function() {
          var o30, t18;
          return void 0 === this[n32] && (this[n32] = null !== (t18 = null === (o30 = this.renderRoot) || void 0 === o30 ? void 0 : o30.querySelector(i23)) && void 0 !== t18 ? t18 : null), this[n32];
        };
      }
      return t17;
    } });
  }

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n15;
  var e19 = null != (null === (n15 = window.HTMLSlotElement) || void 0 === n15 ? void 0 : n15.prototype.assignedElements) ? (o29, n31) => o29.assignedElements(n31) : (o29, n31) => o29.assignedNodes(n31).filter((o30) => o30.nodeType === Node.ELEMENT_NODE);

  // node_modules/@material/dom/ponyfill.js
  function matches2(element, selector) {
    var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
  }

  // node_modules/@material/mwc-base/node_modules/@lit/reactive-element/css-tag.js
  var t9 = window;
  var e20 = t9.ShadowRoot && (void 0 === t9.ShadyCSS || t9.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s8 = Symbol();
  var n16 = /* @__PURE__ */ new WeakMap();
  var o13 = class {
    constructor(t17, e33, n31) {
      if (this._$cssResult$ = true, n31 !== s8)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t17, this.t = e33;
    }
    get styleSheet() {
      let t17 = this.o;
      const s20 = this.t;
      if (e20 && void 0 === t17) {
        const e33 = void 0 !== s20 && 1 === s20.length;
        e33 && (t17 = n16.get(s20)), void 0 === t17 && ((this.o = t17 = new CSSStyleSheet()).replaceSync(this.cssText), e33 && n16.set(s20, t17));
      }
      return t17;
    }
    toString() {
      return this.cssText;
    }
  };
  var r9 = (t17) => new o13("string" == typeof t17 ? t17 : t17 + "", void 0, s8);
  var S5 = (s20, n31) => {
    e20 ? s20.adoptedStyleSheets = n31.map((t17) => t17 instanceof CSSStyleSheet ? t17 : t17.styleSheet) : n31.forEach((e33) => {
      const n32 = document.createElement("style"), o29 = t9.litNonce;
      void 0 !== o29 && n32.setAttribute("nonce", o29), n32.textContent = e33.cssText, s20.appendChild(n32);
    });
  };
  var c6 = e20 ? (t17) => t17 : (t17) => t17 instanceof CSSStyleSheet ? ((t18) => {
    let e33 = "";
    for (const s20 of t18.cssRules)
      e33 += s20.cssText;
    return r9(e33);
  })(t17) : t17;

  // node_modules/@material/mwc-base/node_modules/@lit/reactive-element/reactive-element.js
  var s9;
  var e21 = window;
  var r10 = e21.trustedTypes;
  var h5 = r10 ? r10.emptyScript : "";
  var o14 = e21.reactiveElementPolyfillSupport;
  var n17 = { toAttribute(t17, i23) {
    switch (i23) {
      case Boolean:
        t17 = t17 ? h5 : null;
        break;
      case Object:
      case Array:
        t17 = null == t17 ? t17 : JSON.stringify(t17);
    }
    return t17;
  }, fromAttribute(t17, i23) {
    let s20 = t17;
    switch (i23) {
      case Boolean:
        s20 = null !== t17;
        break;
      case Number:
        s20 = null === t17 ? null : Number(t17);
        break;
      case Object:
      case Array:
        try {
          s20 = JSON.parse(t17);
        } catch (t18) {
          s20 = null;
        }
    }
    return s20;
  } };
  var a5 = (t17, i23) => i23 !== t17 && (i23 == i23 || t17 == t17);
  var l9 = { attribute: true, type: String, converter: n17, reflect: false, hasChanged: a5 };
  var d5 = "finalized";
  var u5 = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
    }
    static addInitializer(t17) {
      var i23;
      this.finalize(), (null !== (i23 = this.h) && void 0 !== i23 ? i23 : this.h = []).push(t17);
    }
    static get observedAttributes() {
      this.finalize();
      const t17 = [];
      return this.elementProperties.forEach((i23, s20) => {
        const e33 = this._$Ep(s20, i23);
        void 0 !== e33 && (this._$Ev.set(e33, s20), t17.push(e33));
      }), t17;
    }
    static createProperty(t17, i23 = l9) {
      if (i23.state && (i23.attribute = false), this.finalize(), this.elementProperties.set(t17, i23), !i23.noAccessor && !this.prototype.hasOwnProperty(t17)) {
        const s20 = "symbol" == typeof t17 ? Symbol() : "__" + t17, e33 = this.getPropertyDescriptor(t17, s20, i23);
        void 0 !== e33 && Object.defineProperty(this.prototype, t17, e33);
      }
    }
    static getPropertyDescriptor(t17, i23, s20) {
      return { get() {
        return this[i23];
      }, set(e33) {
        const r18 = this[t17];
        this[i23] = e33, this.requestUpdate(t17, r18, s20);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t17) {
      return this.elementProperties.get(t17) || l9;
    }
    static finalize() {
      if (this.hasOwnProperty(d5))
        return false;
      this[d5] = true;
      const t17 = Object.getPrototypeOf(this);
      if (t17.finalize(), void 0 !== t17.h && (this.h = [...t17.h]), this.elementProperties = new Map(t17.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t18 = this.properties, i23 = [...Object.getOwnPropertyNames(t18), ...Object.getOwnPropertySymbols(t18)];
        for (const s20 of i23)
          this.createProperty(s20, t18[s20]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i23) {
      const s20 = [];
      if (Array.isArray(i23)) {
        const e33 = new Set(i23.flat(1 / 0).reverse());
        for (const i24 of e33)
          s20.unshift(c6(i24));
      } else
        void 0 !== i23 && s20.push(c6(i23));
      return s20;
    }
    static _$Ep(t17, i23) {
      const s20 = i23.attribute;
      return false === s20 ? void 0 : "string" == typeof s20 ? s20 : "string" == typeof t17 ? t17.toLowerCase() : void 0;
    }
    _$Eu() {
      var t17;
      this._$E_ = new Promise((t18) => this.enableUpdating = t18), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t17 = this.constructor.h) || void 0 === t17 || t17.forEach((t18) => t18(this));
    }
    addController(t17) {
      var i23, s20;
      (null !== (i23 = this._$ES) && void 0 !== i23 ? i23 : this._$ES = []).push(t17), void 0 !== this.renderRoot && this.isConnected && (null === (s20 = t17.hostConnected) || void 0 === s20 || s20.call(t17));
    }
    removeController(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.splice(this._$ES.indexOf(t17) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t17, i23) => {
        this.hasOwnProperty(i23) && (this._$Ei.set(i23, this[i23]), delete this[i23]);
      });
    }
    createRenderRoot() {
      var t17;
      const s20 = null !== (t17 = this.shadowRoot) && void 0 !== t17 ? t17 : this.attachShadow(this.constructor.shadowRootOptions);
      return S5(s20, this.constructor.elementStyles), s20;
    }
    connectedCallback() {
      var t17;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostConnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    enableUpdating(t17) {
    }
    disconnectedCallback() {
      var t17;
      null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostDisconnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    attributeChangedCallback(t17, i23, s20) {
      this._$AK(t17, s20);
    }
    _$EO(t17, i23, s20 = l9) {
      var e33;
      const r18 = this.constructor._$Ep(t17, s20);
      if (void 0 !== r18 && true === s20.reflect) {
        const h11 = (void 0 !== (null === (e33 = s20.converter) || void 0 === e33 ? void 0 : e33.toAttribute) ? s20.converter : n17).toAttribute(i23, s20.type);
        this._$El = t17, null == h11 ? this.removeAttribute(r18) : this.setAttribute(r18, h11), this._$El = null;
      }
    }
    _$AK(t17, i23) {
      var s20;
      const e33 = this.constructor, r18 = e33._$Ev.get(t17);
      if (void 0 !== r18 && this._$El !== r18) {
        const t18 = e33.getPropertyOptions(r18), h11 = "function" == typeof t18.converter ? { fromAttribute: t18.converter } : void 0 !== (null === (s20 = t18.converter) || void 0 === s20 ? void 0 : s20.fromAttribute) ? t18.converter : n17;
        this._$El = r18, this[r18] = h11.fromAttribute(i23, t18.type), this._$El = null;
      }
    }
    requestUpdate(t17, i23, s20) {
      let e33 = true;
      void 0 !== t17 && (((s20 = s20 || this.constructor.getPropertyOptions(t17)).hasChanged || a5)(this[t17], i23) ? (this._$AL.has(t17) || this._$AL.set(t17, i23), true === s20.reflect && this._$El !== t17 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t17, s20))) : e33 = false), !this.isUpdatePending && e33 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t18) {
        Promise.reject(t18);
      }
      const t17 = this.scheduleUpdate();
      return null != t17 && await t17, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t17;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t18, i24) => this[i24] = t18), this._$Ei = void 0);
      let i23 = false;
      const s20 = this._$AL;
      try {
        i23 = this.shouldUpdate(s20), i23 ? (this.willUpdate(s20), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
          var i24;
          return null === (i24 = t18.hostUpdate) || void 0 === i24 ? void 0 : i24.call(t18);
        }), this.update(s20)) : this._$Ek();
      } catch (t18) {
        throw i23 = false, this._$Ek(), t18;
      }
      i23 && this._$AE(s20);
    }
    willUpdate(t17) {
    }
    _$AE(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.forEach((t18) => {
        var i24;
        return null === (i24 = t18.hostUpdated) || void 0 === i24 ? void 0 : i24.call(t18);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t17)), this.updated(t17);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t17) {
      return true;
    }
    update(t17) {
      void 0 !== this._$EC && (this._$EC.forEach((t18, i23) => this._$EO(i23, this[i23], t18)), this._$EC = void 0), this._$Ek();
    }
    updated(t17) {
    }
    firstUpdated(t17) {
    }
  };
  u5[d5] = true, u5.elementProperties = /* @__PURE__ */ new Map(), u5.elementStyles = [], u5.shadowRootOptions = { mode: "open" }, null == o14 || o14({ ReactiveElement: u5 }), (null !== (s9 = e21.reactiveElementVersions) && void 0 !== s9 ? s9 : e21.reactiveElementVersions = []).push("1.6.3");

  // node_modules/@material/mwc-base/node_modules/lit-html/lit-html.js
  var t10;
  var i14 = window;
  var s10 = i14.trustedTypes;
  var e22 = s10 ? s10.createPolicy("lit-html", { createHTML: (t17) => t17 }) : void 0;
  var o15 = "$lit$";
  var n18 = `lit$${(Math.random() + "").slice(9)}$`;
  var l10 = "?" + n18;
  var h6 = `<${l10}>`;
  var r11 = document;
  var u6 = () => r11.createComment("");
  var d6 = (t17) => null === t17 || "object" != typeof t17 && "function" != typeof t17;
  var c7 = Array.isArray;
  var v3 = (t17) => c7(t17) || "function" == typeof (null == t17 ? void 0 : t17[Symbol.iterator]);
  var a6 = "[ 	\n\f\r]";
  var f4 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _16 = /-->/g;
  var m3 = />/g;
  var p4 = RegExp(`>|${a6}(?:([^\\s"'>=/]+)(${a6}*=${a6}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g3 = /'/g;
  var $3 = /"/g;
  var y4 = /^(?:script|style|textarea|title)$/i;
  var w3 = (t17) => (i23, ...s20) => ({ _$litType$: t17, strings: i23, values: s20 });
  var x3 = w3(1);
  var b4 = w3(2);
  var T3 = Symbol.for("lit-noChange");
  var A3 = Symbol.for("lit-nothing");
  var E3 = /* @__PURE__ */ new WeakMap();
  var C3 = r11.createTreeWalker(r11, 129, null, false);
  function P3(t17, i23) {
    if (!Array.isArray(t17) || !t17.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e22 ? e22.createHTML(i23) : i23;
  }
  var V3 = (t17, i23) => {
    const s20 = t17.length - 1, e33 = [];
    let l20, r18 = 2 === i23 ? "<svg>" : "", u11 = f4;
    for (let i24 = 0; i24 < s20; i24++) {
      const s21 = t17[i24];
      let d11, c12, v6 = -1, a11 = 0;
      for (; a11 < s21.length && (u11.lastIndex = a11, c12 = u11.exec(s21), null !== c12); )
        a11 = u11.lastIndex, u11 === f4 ? "!--" === c12[1] ? u11 = _16 : void 0 !== c12[1] ? u11 = m3 : void 0 !== c12[2] ? (y4.test(c12[2]) && (l20 = RegExp("</" + c12[2], "g")), u11 = p4) : void 0 !== c12[3] && (u11 = p4) : u11 === p4 ? ">" === c12[0] ? (u11 = null != l20 ? l20 : f4, v6 = -1) : void 0 === c12[1] ? v6 = -2 : (v6 = u11.lastIndex - c12[2].length, d11 = c12[1], u11 = void 0 === c12[3] ? p4 : '"' === c12[3] ? $3 : g3) : u11 === $3 || u11 === g3 ? u11 = p4 : u11 === _16 || u11 === m3 ? u11 = f4 : (u11 = p4, l20 = void 0);
      const w6 = u11 === p4 && t17[i24 + 1].startsWith("/>") ? " " : "";
      r18 += u11 === f4 ? s21 + h6 : v6 >= 0 ? (e33.push(d11), s21.slice(0, v6) + o15 + s21.slice(v6) + n18 + w6) : s21 + n18 + (-2 === v6 ? (e33.push(void 0), i24) : w6);
    }
    return [P3(t17, r18 + (t17[s20] || "<?>") + (2 === i23 ? "</svg>" : "")), e33];
  };
  var N3 = class _N {
    constructor({ strings: t17, _$litType$: i23 }, e33) {
      let h11;
      this.parts = [];
      let r18 = 0, d11 = 0;
      const c12 = t17.length - 1, v6 = this.parts, [a11, f7] = V3(t17, i23);
      if (this.el = _N.createElement(a11, e33), C3.currentNode = this.el.content, 2 === i23) {
        const t18 = this.el.content, i24 = t18.firstChild;
        i24.remove(), t18.append(...i24.childNodes);
      }
      for (; null !== (h11 = C3.nextNode()) && v6.length < c12; ) {
        if (1 === h11.nodeType) {
          if (h11.hasAttributes()) {
            const t18 = [];
            for (const i24 of h11.getAttributeNames())
              if (i24.endsWith(o15) || i24.startsWith(n18)) {
                const s20 = f7[d11++];
                if (t18.push(i24), void 0 !== s20) {
                  const t19 = h11.getAttribute(s20.toLowerCase() + o15).split(n18), i25 = /([.?@])?(.*)/.exec(s20);
                  v6.push({ type: 1, index: r18, name: i25[2], strings: t19, ctor: "." === i25[1] ? H3 : "?" === i25[1] ? L3 : "@" === i25[1] ? z2 : k5 });
                } else
                  v6.push({ type: 6, index: r18 });
              }
            for (const i24 of t18)
              h11.removeAttribute(i24);
          }
          if (y4.test(h11.tagName)) {
            const t18 = h11.textContent.split(n18), i24 = t18.length - 1;
            if (i24 > 0) {
              h11.textContent = s10 ? s10.emptyScript : "";
              for (let s20 = 0; s20 < i24; s20++)
                h11.append(t18[s20], u6()), C3.nextNode(), v6.push({ type: 2, index: ++r18 });
              h11.append(t18[i24], u6());
            }
          }
        } else if (8 === h11.nodeType)
          if (h11.data === l10)
            v6.push({ type: 2, index: r18 });
          else {
            let t18 = -1;
            for (; -1 !== (t18 = h11.data.indexOf(n18, t18 + 1)); )
              v6.push({ type: 7, index: r18 }), t18 += n18.length - 1;
          }
        r18++;
      }
    }
    static createElement(t17, i23) {
      const s20 = r11.createElement("template");
      return s20.innerHTML = t17, s20;
    }
  };
  function S6(t17, i23, s20 = t17, e33) {
    var o29, n31, l20, h11;
    if (i23 === T3)
      return i23;
    let r18 = void 0 !== e33 ? null === (o29 = s20._$Co) || void 0 === o29 ? void 0 : o29[e33] : s20._$Cl;
    const u11 = d6(i23) ? void 0 : i23._$litDirective$;
    return (null == r18 ? void 0 : r18.constructor) !== u11 && (null === (n31 = null == r18 ? void 0 : r18._$AO) || void 0 === n31 || n31.call(r18, false), void 0 === u11 ? r18 = void 0 : (r18 = new u11(t17), r18._$AT(t17, s20, e33)), void 0 !== e33 ? (null !== (l20 = (h11 = s20)._$Co) && void 0 !== l20 ? l20 : h11._$Co = [])[e33] = r18 : s20._$Cl = r18), void 0 !== r18 && (i23 = S6(t17, r18._$AS(t17, i23.values), r18, e33)), i23;
  }
  var M3 = class {
    constructor(t17, i23) {
      this._$AV = [], this._$AN = void 0, this._$AD = t17, this._$AM = i23;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t17) {
      var i23;
      const { el: { content: s20 }, parts: e33 } = this._$AD, o29 = (null !== (i23 = null == t17 ? void 0 : t17.creationScope) && void 0 !== i23 ? i23 : r11).importNode(s20, true);
      C3.currentNode = o29;
      let n31 = C3.nextNode(), l20 = 0, h11 = 0, u11 = e33[0];
      for (; void 0 !== u11; ) {
        if (l20 === u11.index) {
          let i24;
          2 === u11.type ? i24 = new R3(n31, n31.nextSibling, this, t17) : 1 === u11.type ? i24 = new u11.ctor(n31, u11.name, u11.strings, this, t17) : 6 === u11.type && (i24 = new Z3(n31, this, t17)), this._$AV.push(i24), u11 = e33[++h11];
        }
        l20 !== (null == u11 ? void 0 : u11.index) && (n31 = C3.nextNode(), l20++);
      }
      return C3.currentNode = r11, o29;
    }
    v(t17) {
      let i23 = 0;
      for (const s20 of this._$AV)
        void 0 !== s20 && (void 0 !== s20.strings ? (s20._$AI(t17, s20, i23), i23 += s20.strings.length - 2) : s20._$AI(t17[i23])), i23++;
    }
  };
  var R3 = class _R {
    constructor(t17, i23, s20, e33) {
      var o29;
      this.type = 2, this._$AH = A3, this._$AN = void 0, this._$AA = t17, this._$AB = i23, this._$AM = s20, this.options = e33, this._$Cp = null === (o29 = null == e33 ? void 0 : e33.isConnected) || void 0 === o29 || o29;
    }
    get _$AU() {
      var t17, i23;
      return null !== (i23 = null === (t17 = this._$AM) || void 0 === t17 ? void 0 : t17._$AU) && void 0 !== i23 ? i23 : this._$Cp;
    }
    get parentNode() {
      let t17 = this._$AA.parentNode;
      const i23 = this._$AM;
      return void 0 !== i23 && 11 === (null == t17 ? void 0 : t17.nodeType) && (t17 = i23.parentNode), t17;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t17, i23 = this) {
      t17 = S6(this, t17, i23), d6(t17) ? t17 === A3 || null == t17 || "" === t17 ? (this._$AH !== A3 && this._$AR(), this._$AH = A3) : t17 !== this._$AH && t17 !== T3 && this._(t17) : void 0 !== t17._$litType$ ? this.g(t17) : void 0 !== t17.nodeType ? this.$(t17) : v3(t17) ? this.T(t17) : this._(t17);
    }
    k(t17) {
      return this._$AA.parentNode.insertBefore(t17, this._$AB);
    }
    $(t17) {
      this._$AH !== t17 && (this._$AR(), this._$AH = this.k(t17));
    }
    _(t17) {
      this._$AH !== A3 && d6(this._$AH) ? this._$AA.nextSibling.data = t17 : this.$(r11.createTextNode(t17)), this._$AH = t17;
    }
    g(t17) {
      var i23;
      const { values: s20, _$litType$: e33 } = t17, o29 = "number" == typeof e33 ? this._$AC(t17) : (void 0 === e33.el && (e33.el = N3.createElement(P3(e33.h, e33.h[0]), this.options)), e33);
      if ((null === (i23 = this._$AH) || void 0 === i23 ? void 0 : i23._$AD) === o29)
        this._$AH.v(s20);
      else {
        const t18 = new M3(o29, this), i24 = t18.u(this.options);
        t18.v(s20), this.$(i24), this._$AH = t18;
      }
    }
    _$AC(t17) {
      let i23 = E3.get(t17.strings);
      return void 0 === i23 && E3.set(t17.strings, i23 = new N3(t17)), i23;
    }
    T(t17) {
      c7(this._$AH) || (this._$AH = [], this._$AR());
      const i23 = this._$AH;
      let s20, e33 = 0;
      for (const o29 of t17)
        e33 === i23.length ? i23.push(s20 = new _R(this.k(u6()), this.k(u6()), this, this.options)) : s20 = i23[e33], s20._$AI(o29), e33++;
      e33 < i23.length && (this._$AR(s20 && s20._$AB.nextSibling, e33), i23.length = e33);
    }
    _$AR(t17 = this._$AA.nextSibling, i23) {
      var s20;
      for (null === (s20 = this._$AP) || void 0 === s20 || s20.call(this, false, true, i23); t17 && t17 !== this._$AB; ) {
        const i24 = t17.nextSibling;
        t17.remove(), t17 = i24;
      }
    }
    setConnected(t17) {
      var i23;
      void 0 === this._$AM && (this._$Cp = t17, null === (i23 = this._$AP) || void 0 === i23 || i23.call(this, t17));
    }
  };
  var k5 = class {
    constructor(t17, i23, s20, e33, o29) {
      this.type = 1, this._$AH = A3, this._$AN = void 0, this.element = t17, this.name = i23, this._$AM = e33, this.options = o29, s20.length > 2 || "" !== s20[0] || "" !== s20[1] ? (this._$AH = Array(s20.length - 1).fill(new String()), this.strings = s20) : this._$AH = A3;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17, i23 = this, s20, e33) {
      const o29 = this.strings;
      let n31 = false;
      if (void 0 === o29)
        t17 = S6(this, t17, i23, 0), n31 = !d6(t17) || t17 !== this._$AH && t17 !== T3, n31 && (this._$AH = t17);
      else {
        const e34 = t17;
        let l20, h11;
        for (t17 = o29[0], l20 = 0; l20 < o29.length - 1; l20++)
          h11 = S6(this, e34[s20 + l20], i23, l20), h11 === T3 && (h11 = this._$AH[l20]), n31 || (n31 = !d6(h11) || h11 !== this._$AH[l20]), h11 === A3 ? t17 = A3 : t17 !== A3 && (t17 += (null != h11 ? h11 : "") + o29[l20 + 1]), this._$AH[l20] = h11;
      }
      n31 && !e33 && this.j(t17);
    }
    j(t17) {
      t17 === A3 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t17 ? t17 : "");
    }
  };
  var H3 = class extends k5 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t17) {
      this.element[this.name] = t17 === A3 ? void 0 : t17;
    }
  };
  var I3 = s10 ? s10.emptyScript : "";
  var L3 = class extends k5 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t17) {
      t17 && t17 !== A3 ? this.element.setAttribute(this.name, I3) : this.element.removeAttribute(this.name);
    }
  };
  var z2 = class extends k5 {
    constructor(t17, i23, s20, e33, o29) {
      super(t17, i23, s20, e33, o29), this.type = 5;
    }
    _$AI(t17, i23 = this) {
      var s20;
      if ((t17 = null !== (s20 = S6(this, t17, i23, 0)) && void 0 !== s20 ? s20 : A3) === T3)
        return;
      const e33 = this._$AH, o29 = t17 === A3 && e33 !== A3 || t17.capture !== e33.capture || t17.once !== e33.once || t17.passive !== e33.passive, n31 = t17 !== A3 && (e33 === A3 || o29);
      o29 && this.element.removeEventListener(this.name, this, e33), n31 && this.element.addEventListener(this.name, this, t17), this._$AH = t17;
    }
    handleEvent(t17) {
      var i23, s20;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s20 = null === (i23 = this.options) || void 0 === i23 ? void 0 : i23.host) && void 0 !== s20 ? s20 : this.element, t17) : this._$AH.handleEvent(t17);
    }
  };
  var Z3 = class {
    constructor(t17, i23, s20) {
      this.element = t17, this.type = 6, this._$AN = void 0, this._$AM = i23, this.options = s20;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17) {
      S6(this, t17);
    }
  };
  var B2 = i14.litHtmlPolyfillSupport;
  null == B2 || B2(N3, R3), (null !== (t10 = i14.litHtmlVersions) && void 0 !== t10 ? t10 : i14.litHtmlVersions = []).push("2.8.0");
  var D2 = (t17, i23, s20) => {
    var e33, o29;
    const n31 = null !== (e33 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== e33 ? e33 : i23;
    let l20 = n31._$litPart$;
    if (void 0 === l20) {
      const t18 = null !== (o29 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== o29 ? o29 : null;
      n31._$litPart$ = l20 = new R3(i23.insertBefore(u6(), t18), t18, void 0, null != s20 ? s20 : {});
    }
    return l20._$AI(t17), l20;
  };

  // node_modules/@material/mwc-base/node_modules/lit-element/lit-element.js
  var l11;
  var o16;
  var s11 = class extends u5 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t17, e33;
      const i23 = super.createRenderRoot();
      return null !== (t17 = (e33 = this.renderOptions).renderBefore) && void 0 !== t17 || (e33.renderBefore = i23.firstChild), i23;
    }
    update(t17) {
      const i23 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t17), this._$Do = D2(i23, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t17;
      super.connectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(true);
    }
    disconnectedCallback() {
      var t17;
      super.disconnectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(false);
    }
    render() {
      return T3;
    }
  };
  s11.finalized = true, s11._$litElement$ = true, null === (l11 = globalThis.litElementHydrateSupport) || void 0 === l11 || l11.call(globalThis, { LitElement: s11 });
  var n19 = globalThis.litElementPolyfillSupport;
  null == n19 || n19({ LitElement: s11 });
  (null !== (o16 = globalThis.litElementVersions) && void 0 !== o16 ? o16 : globalThis.litElementVersions = []).push("3.3.3");

  // node_modules/@material/mwc-base/utils.js
  var supportsPassive = false;
  var fn = () => {
  };
  var optionsBlock = {
    get passive() {
      supportsPassive = true;
      return false;
    }
  };
  document.addEventListener("x", fn, optionsBlock);
  document.removeEventListener("x", fn);

  // node_modules/@material/mwc-base/base-element.js
  var BaseElement = class extends s11 {
    click() {
      if (this.mdcRoot) {
        this.mdcRoot.focus();
        this.mdcRoot.click();
        return;
      }
      super.click();
    }
    /**
     * Create and attach the MDC Foundation to the instance
     */
    createFoundation() {
      if (this.mdcFoundation !== void 0) {
        this.mdcFoundation.destroy();
      }
      if (this.mdcFoundationClass) {
        this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
        this.mdcFoundation.init();
      }
    }
    firstUpdated() {
      this.createFoundation();
    }
  };

  // node_modules/@material/base/foundation.js
  var MDCFoundation = (
    /** @class */
    function() {
      function MDCFoundation2(adapter) {
        if (adapter === void 0) {
          adapter = {};
        }
        this.adapter = adapter;
      }
      Object.defineProperty(MDCFoundation2, "cssClasses", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "strings", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "numbers", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCFoundation2, "defaultAdapter", {
        get: function() {
          return {};
        },
        enumerable: false,
        configurable: true
      });
      MDCFoundation2.prototype.init = function() {
      };
      MDCFoundation2.prototype.destroy = function() {
      };
      return MDCFoundation2;
    }()
  );

  // node_modules/@material/ripple/constants.js
  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
    FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
    FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
    ROOT: "mdc-ripple-upgraded",
    UNBOUNDED: "mdc-ripple-upgraded--unbounded"
  };
  var strings = {
    VAR_FG_SCALE: "--mdc-ripple-fg-scale",
    VAR_FG_SIZE: "--mdc-ripple-fg-size",
    VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
    VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
    VAR_LEFT: "--mdc-ripple-left",
    VAR_TOP: "--mdc-ripple-top"
  };
  var numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300
    // Delay between touch and simulated mouse events on touch devices
  };

  // node_modules/@material/ripple/util.js
  function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
      return { x: 0, y: 0 };
    }
    var x6 = pageOffset.x, y7 = pageOffset.y;
    var documentX = x6 + clientRect.left;
    var documentY = y7 + clientRect.top;
    var normalizedX;
    var normalizedY;
    if (evt.type === "touchstart") {
      var touchEvent = evt;
      normalizedX = touchEvent.changedTouches[0].pageX - documentX;
      normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    } else {
      var mouseEvent = evt;
      normalizedX = mouseEvent.pageX - documentX;
      normalizedY = mouseEvent.pageY - documentY;
    }
    return { x: normalizedX, y: normalizedY };
  }

  // node_modules/@material/ripple/foundation.js
  var ACTIVATION_EVENT_TYPES = [
    "touchstart",
    "pointerdown",
    "mousedown",
    "keydown"
  ];
  var POINTER_DEACTIVATION_EVENT_TYPES = [
    "touchend",
    "pointerup",
    "mouseup",
    "contextmenu"
  ];
  var activatedTargets = [];
  var MDCRippleFoundation = (
    /** @class */
    function(_super) {
      __extends(MDCRippleFoundation2, _super);
      function MDCRippleFoundation2(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation2.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded = false;
        _this.activationTimer = 0;
        _this.fgDeactivationRemovalTimer = 0;
        _this.fgScale = "0";
        _this.frame = { width: 0, height: 0 };
        _this.initialSize = 0;
        _this.layoutFrame = 0;
        _this.maxRadius = 0;
        _this.unboundedCoords = { left: 0, top: 0 };
        _this.activationState = _this.defaultActivationState();
        _this.activationTimerCallback = function() {
          _this.activationAnimationHasEnded = true;
          _this.runDeactivationUXLogicIfReady();
        };
        _this.activateHandler = function(e33) {
          _this.activateImpl(e33);
        };
        _this.deactivateHandler = function() {
          _this.deactivateImpl();
        };
        _this.focusHandler = function() {
          _this.handleFocus();
        };
        _this.blurHandler = function() {
          _this.handleBlur();
        };
        _this.resizeHandler = function() {
          _this.layout();
        };
        return _this;
      }
      Object.defineProperty(MDCRippleFoundation2, "cssClasses", {
        get: function() {
          return cssClasses;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "strings", {
        get: function() {
          return strings;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "numbers", {
        get: function() {
          return numbers;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation2, "defaultAdapter", {
        get: function() {
          return {
            addClass: function() {
              return void 0;
            },
            browserSupportsCssVars: function() {
              return true;
            },
            computeBoundingRect: function() {
              return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
            },
            containsEventTarget: function() {
              return true;
            },
            deregisterDocumentInteractionHandler: function() {
              return void 0;
            },
            deregisterInteractionHandler: function() {
              return void 0;
            },
            deregisterResizeHandler: function() {
              return void 0;
            },
            getWindowPageOffset: function() {
              return { x: 0, y: 0 };
            },
            isSurfaceActive: function() {
              return true;
            },
            isSurfaceDisabled: function() {
              return true;
            },
            isUnbounded: function() {
              return true;
            },
            registerDocumentInteractionHandler: function() {
              return void 0;
            },
            registerInteractionHandler: function() {
              return void 0;
            },
            registerResizeHandler: function() {
              return void 0;
            },
            removeClass: function() {
              return void 0;
            },
            updateCssVariable: function() {
              return void 0;
            }
          };
        },
        enumerable: false,
        configurable: true
      });
      MDCRippleFoundation2.prototype.init = function() {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple();
        this.registerRootHandlers(supportsPressRipple);
        if (supportsPressRipple) {
          var _a2 = MDCRippleFoundation2.cssClasses, ROOT_1 = _a2.ROOT, UNBOUNDED_1 = _a2.UNBOUNDED;
          requestAnimationFrame(function() {
            _this.adapter.addClass(ROOT_1);
            if (_this.adapter.isUnbounded()) {
              _this.adapter.addClass(UNBOUNDED_1);
              _this.layoutInternal();
            }
          });
        }
      };
      MDCRippleFoundation2.prototype.destroy = function() {
        var _this = this;
        if (this.supportsPressRipple()) {
          if (this.activationTimer) {
            clearTimeout(this.activationTimer);
            this.activationTimer = 0;
            this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_ACTIVATION);
          }
          if (this.fgDeactivationRemovalTimer) {
            clearTimeout(this.fgDeactivationRemovalTimer);
            this.fgDeactivationRemovalTimer = 0;
            this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_DEACTIVATION);
          }
          var _a2 = MDCRippleFoundation2.cssClasses, ROOT_2 = _a2.ROOT, UNBOUNDED_2 = _a2.UNBOUNDED;
          requestAnimationFrame(function() {
            _this.adapter.removeClass(ROOT_2);
            _this.adapter.removeClass(UNBOUNDED_2);
            _this.removeCssVars();
          });
        }
        this.deregisterRootHandlers();
        this.deregisterDeactivationHandlers();
      };
      MDCRippleFoundation2.prototype.activate = function(evt) {
        this.activateImpl(evt);
      };
      MDCRippleFoundation2.prototype.deactivate = function() {
        this.deactivateImpl();
      };
      MDCRippleFoundation2.prototype.layout = function() {
        var _this = this;
        if (this.layoutFrame) {
          cancelAnimationFrame(this.layoutFrame);
        }
        this.layoutFrame = requestAnimationFrame(function() {
          _this.layoutInternal();
          _this.layoutFrame = 0;
        });
      };
      MDCRippleFoundation2.prototype.setUnbounded = function(unbounded) {
        var UNBOUNDED = MDCRippleFoundation2.cssClasses.UNBOUNDED;
        if (unbounded) {
          this.adapter.addClass(UNBOUNDED);
        } else {
          this.adapter.removeClass(UNBOUNDED);
        }
      };
      MDCRippleFoundation2.prototype.handleFocus = function() {
        var _this = this;
        requestAnimationFrame(function() {
          return _this.adapter.addClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
        });
      };
      MDCRippleFoundation2.prototype.handleBlur = function() {
        var _this = this;
        requestAnimationFrame(function() {
          return _this.adapter.removeClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
        });
      };
      MDCRippleFoundation2.prototype.supportsPressRipple = function() {
        return this.adapter.browserSupportsCssVars();
      };
      MDCRippleFoundation2.prototype.defaultActivationState = function() {
        return {
          activationEvent: void 0,
          hasDeactivationUXRun: false,
          isActivated: false,
          isProgrammatic: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false
        };
      };
      MDCRippleFoundation2.prototype.registerRootHandlers = function(supportsPressRipple) {
        var e_1, _a2;
        if (supportsPressRipple) {
          try {
            for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
              var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
              this.adapter.registerInteractionHandler(evtType, this.activateHandler);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a2 = ACTIVATION_EVENT_TYPES_1.return))
                _a2.call(ACTIVATION_EVENT_TYPES_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          if (this.adapter.isUnbounded()) {
            this.adapter.registerResizeHandler(this.resizeHandler);
          }
        }
        this.adapter.registerInteractionHandler("focus", this.focusHandler);
        this.adapter.registerInteractionHandler("blur", this.blurHandler);
      };
      MDCRippleFoundation2.prototype.registerDeactivationHandlers = function(evt) {
        var e_2, _a2;
        if (evt.type === "keydown") {
          this.adapter.registerInteractionHandler("keyup", this.deactivateHandler);
        } else {
          try {
            for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
              var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
              this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a2 = POINTER_DEACTIVATION_EVENT_TYPES_1.return))
                _a2.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      };
      MDCRippleFoundation2.prototype.deregisterRootHandlers = function() {
        var e_3, _a2;
        try {
          for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
            var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
            this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a2 = ACTIVATION_EVENT_TYPES_2.return))
              _a2.call(ACTIVATION_EVENT_TYPES_2);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
        this.adapter.deregisterInteractionHandler("focus", this.focusHandler);
        this.adapter.deregisterInteractionHandler("blur", this.blurHandler);
        if (this.adapter.isUnbounded()) {
          this.adapter.deregisterResizeHandler(this.resizeHandler);
        }
      };
      MDCRippleFoundation2.prototype.deregisterDeactivationHandlers = function() {
        var e_4, _a2;
        this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler);
        try {
          for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
            var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
            this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a2 = POINTER_DEACTIVATION_EVENT_TYPES_2.return))
              _a2.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
          } finally {
            if (e_4)
              throw e_4.error;
          }
        }
      };
      MDCRippleFoundation2.prototype.removeCssVars = function() {
        var _this = this;
        var rippleStrings = MDCRippleFoundation2.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function(key) {
          if (key.indexOf("VAR_") === 0) {
            _this.adapter.updateCssVariable(rippleStrings[key], null);
          }
        });
      };
      MDCRippleFoundation2.prototype.activateImpl = function(evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) {
          return;
        }
        var activationState = this.activationState;
        if (activationState.isActivated) {
          return;
        }
        var previousActivationEvent = this.previousActivationEvent;
        var isSameInteraction = previousActivationEvent && evt !== void 0 && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
          return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === void 0;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== void 0 && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
        var hasActivatedChild = evt !== void 0 && activatedTargets.length > 0 && activatedTargets.some(function(target) {
          return _this.adapter.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          this.resetActivationState();
          return;
        }
        if (evt !== void 0) {
          activatedTargets.push(evt.target);
          this.registerDeactivationHandlers(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
        if (activationState.wasElementMadeActive) {
          this.animateActivation();
        }
        requestAnimationFrame(function() {
          activatedTargets = [];
          if (!activationState.wasElementMadeActive && evt !== void 0 && (evt.key === " " || evt.keyCode === 32)) {
            activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
            if (activationState.wasElementMadeActive) {
              _this.animateActivation();
            }
          }
          if (!activationState.wasElementMadeActive) {
            _this.activationState = _this.defaultActivationState();
          }
        });
      };
      MDCRippleFoundation2.prototype.checkElementMadeActive = function(evt) {
        return evt !== void 0 && evt.type === "keydown" ? this.adapter.isSurfaceActive() : true;
      };
      MDCRippleFoundation2.prototype.animateActivation = function() {
        var _this = this;
        var _a2 = MDCRippleFoundation2.strings, VAR_FG_TRANSLATE_START = _a2.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a2.VAR_FG_TRANSLATE_END;
        var _b2 = MDCRippleFoundation2.cssClasses, FG_DEACTIVATION = _b2.FG_DEACTIVATION, FG_ACTIVATION = _b2.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation2.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var translateStart = "";
        var translateEnd = "";
        if (!this.adapter.isUnbounded()) {
          var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
          translateStart = startPoint.x + "px, " + startPoint.y + "px";
          translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        clearTimeout(this.activationTimer);
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.rmBoundedActivationClasses();
        this.adapter.removeClass(FG_DEACTIVATION);
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer = setTimeout(function() {
          _this.activationTimerCallback();
        }, DEACTIVATION_TIMEOUT_MS);
      };
      MDCRippleFoundation2.prototype.getFgTranslationCoordinates = function() {
        var _a2 = this.activationState, activationEvent = _a2.activationEvent, wasActivatedByPointer = _a2.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame.width / 2,
            y: this.frame.height / 2
          };
        }
        startPoint = {
          x: startPoint.x - this.initialSize / 2,
          y: startPoint.y - this.initialSize / 2
        };
        var endPoint = {
          x: this.frame.width / 2 - this.initialSize / 2,
          y: this.frame.height / 2 - this.initialSize / 2
        };
        return { startPoint, endPoint };
      };
      MDCRippleFoundation2.prototype.runDeactivationUXLogicIfReady = function() {
        var _this = this;
        var FG_DEACTIVATION = MDCRippleFoundation2.cssClasses.FG_DEACTIVATION;
        var _a2 = this.activationState, hasDeactivationUXRun = _a2.hasDeactivationUXRun, isActivated = _a2.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded) {
          this.rmBoundedActivationClasses();
          this.adapter.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer = setTimeout(function() {
            _this.adapter.removeClass(FG_DEACTIVATION);
          }, numbers.FG_DEACTIVATION_MS);
        }
      };
      MDCRippleFoundation2.prototype.rmBoundedActivationClasses = function() {
        var FG_ACTIVATION = MDCRippleFoundation2.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded = false;
        this.adapter.computeBoundingRect();
      };
      MDCRippleFoundation2.prototype.resetActivationState = function() {
        var _this = this;
        this.previousActivationEvent = this.activationState.activationEvent;
        this.activationState = this.defaultActivationState();
        setTimeout(function() {
          return _this.previousActivationEvent = void 0;
        }, MDCRippleFoundation2.numbers.TAP_DELAY_MS);
      };
      MDCRippleFoundation2.prototype.deactivateImpl = function() {
        var _this = this;
        var activationState = this.activationState;
        if (!activationState.isActivated) {
          return;
        }
        var state = __assign({}, activationState);
        if (activationState.isProgrammatic) {
          requestAnimationFrame(function() {
            _this.animateDeactivation(state);
          });
          this.resetActivationState();
        } else {
          this.deregisterDeactivationHandlers();
          requestAnimationFrame(function() {
            _this.activationState.hasDeactivationUXRun = true;
            _this.animateDeactivation(state);
            _this.resetActivationState();
          });
        }
      };
      MDCRippleFoundation2.prototype.animateDeactivation = function(_a2) {
        var wasActivatedByPointer = _a2.wasActivatedByPointer, wasElementMadeActive = _a2.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady();
        }
      };
      MDCRippleFoundation2.prototype.layoutInternal = function() {
        var _this = this;
        this.frame = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame.height, this.frame.width);
        var getBoundedRadius = function() {
          var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
          return hypotenuse + MDCRippleFoundation2.numbers.PADDING;
        };
        this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        var initialSize = Math.floor(maxDim * MDCRippleFoundation2.numbers.INITIAL_ORIGIN_SCALE);
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
          this.initialSize = initialSize - 1;
        } else {
          this.initialSize = initialSize;
        }
        this.fgScale = "" + this.maxRadius / this.initialSize;
        this.updateLayoutCssVars();
      };
      MDCRippleFoundation2.prototype.updateLayoutCssVars = function() {
        var _a2 = MDCRippleFoundation2.strings, VAR_FG_SIZE = _a2.VAR_FG_SIZE, VAR_LEFT = _a2.VAR_LEFT, VAR_TOP = _a2.VAR_TOP, VAR_FG_SCALE = _a2.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
        if (this.adapter.isUnbounded()) {
          this.unboundedCoords = {
            left: Math.round(this.frame.width / 2 - this.initialSize / 2),
            top: Math.round(this.frame.height / 2 - this.initialSize / 2)
          };
          this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
          this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
        }
      };
      return MDCRippleFoundation2;
    }(MDCFoundation)
  );
  var foundation_default = MDCRippleFoundation;

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/css-tag.js
  var t11 = window;
  var e23 = t11.ShadowRoot && (void 0 === t11.ShadyCSS || t11.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s12 = Symbol();
  var n20 = /* @__PURE__ */ new WeakMap();
  var o17 = class {
    constructor(t17, e33, n31) {
      if (this._$cssResult$ = true, n31 !== s12)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t17, this.t = e33;
    }
    get styleSheet() {
      let t17 = this.o;
      const s20 = this.t;
      if (e23 && void 0 === t17) {
        const e33 = void 0 !== s20 && 1 === s20.length;
        e33 && (t17 = n20.get(s20)), void 0 === t17 && ((this.o = t17 = new CSSStyleSheet()).replaceSync(this.cssText), e33 && n20.set(s20, t17));
      }
      return t17;
    }
    toString() {
      return this.cssText;
    }
  };
  var r12 = (t17) => new o17("string" == typeof t17 ? t17 : t17 + "", void 0, s12);
  var i15 = (t17, ...e33) => {
    const n31 = 1 === t17.length ? t17[0] : e33.reduce((e34, s20, n32) => e34 + ((t18) => {
      if (true === t18._$cssResult$)
        return t18.cssText;
      if ("number" == typeof t18)
        return t18;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t18 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s20) + t17[n32 + 1], t17[0]);
    return new o17(n31, t17, s12);
  };
  var S7 = (s20, n31) => {
    e23 ? s20.adoptedStyleSheets = n31.map((t17) => t17 instanceof CSSStyleSheet ? t17 : t17.styleSheet) : n31.forEach((e33) => {
      const n32 = document.createElement("style"), o29 = t11.litNonce;
      void 0 !== o29 && n32.setAttribute("nonce", o29), n32.textContent = e33.cssText, s20.appendChild(n32);
    });
  };
  var c8 = e23 ? (t17) => t17 : (t17) => t17 instanceof CSSStyleSheet ? ((t18) => {
    let e33 = "";
    for (const s20 of t18.cssRules)
      e33 += s20.cssText;
    return r12(e33);
  })(t17) : t17;

  // node_modules/@material/mwc-ripple/node_modules/@lit/reactive-element/reactive-element.js
  var s13;
  var e24 = window;
  var r13 = e24.trustedTypes;
  var h7 = r13 ? r13.emptyScript : "";
  var o18 = e24.reactiveElementPolyfillSupport;
  var n21 = { toAttribute(t17, i23) {
    switch (i23) {
      case Boolean:
        t17 = t17 ? h7 : null;
        break;
      case Object:
      case Array:
        t17 = null == t17 ? t17 : JSON.stringify(t17);
    }
    return t17;
  }, fromAttribute(t17, i23) {
    let s20 = t17;
    switch (i23) {
      case Boolean:
        s20 = null !== t17;
        break;
      case Number:
        s20 = null === t17 ? null : Number(t17);
        break;
      case Object:
      case Array:
        try {
          s20 = JSON.parse(t17);
        } catch (t18) {
          s20 = null;
        }
    }
    return s20;
  } };
  var a7 = (t17, i23) => i23 !== t17 && (i23 == i23 || t17 == t17);
  var l12 = { attribute: true, type: String, converter: n21, reflect: false, hasChanged: a7 };
  var d7 = "finalized";
  var u7 = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
    }
    static addInitializer(t17) {
      var i23;
      this.finalize(), (null !== (i23 = this.h) && void 0 !== i23 ? i23 : this.h = []).push(t17);
    }
    static get observedAttributes() {
      this.finalize();
      const t17 = [];
      return this.elementProperties.forEach((i23, s20) => {
        const e33 = this._$Ep(s20, i23);
        void 0 !== e33 && (this._$Ev.set(e33, s20), t17.push(e33));
      }), t17;
    }
    static createProperty(t17, i23 = l12) {
      if (i23.state && (i23.attribute = false), this.finalize(), this.elementProperties.set(t17, i23), !i23.noAccessor && !this.prototype.hasOwnProperty(t17)) {
        const s20 = "symbol" == typeof t17 ? Symbol() : "__" + t17, e33 = this.getPropertyDescriptor(t17, s20, i23);
        void 0 !== e33 && Object.defineProperty(this.prototype, t17, e33);
      }
    }
    static getPropertyDescriptor(t17, i23, s20) {
      return { get() {
        return this[i23];
      }, set(e33) {
        const r18 = this[t17];
        this[i23] = e33, this.requestUpdate(t17, r18, s20);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t17) {
      return this.elementProperties.get(t17) || l12;
    }
    static finalize() {
      if (this.hasOwnProperty(d7))
        return false;
      this[d7] = true;
      const t17 = Object.getPrototypeOf(this);
      if (t17.finalize(), void 0 !== t17.h && (this.h = [...t17.h]), this.elementProperties = new Map(t17.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t18 = this.properties, i23 = [...Object.getOwnPropertyNames(t18), ...Object.getOwnPropertySymbols(t18)];
        for (const s20 of i23)
          this.createProperty(s20, t18[s20]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i23) {
      const s20 = [];
      if (Array.isArray(i23)) {
        const e33 = new Set(i23.flat(1 / 0).reverse());
        for (const i24 of e33)
          s20.unshift(c8(i24));
      } else
        void 0 !== i23 && s20.push(c8(i23));
      return s20;
    }
    static _$Ep(t17, i23) {
      const s20 = i23.attribute;
      return false === s20 ? void 0 : "string" == typeof s20 ? s20 : "string" == typeof t17 ? t17.toLowerCase() : void 0;
    }
    _$Eu() {
      var t17;
      this._$E_ = new Promise((t18) => this.enableUpdating = t18), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t17 = this.constructor.h) || void 0 === t17 || t17.forEach((t18) => t18(this));
    }
    addController(t17) {
      var i23, s20;
      (null !== (i23 = this._$ES) && void 0 !== i23 ? i23 : this._$ES = []).push(t17), void 0 !== this.renderRoot && this.isConnected && (null === (s20 = t17.hostConnected) || void 0 === s20 || s20.call(t17));
    }
    removeController(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.splice(this._$ES.indexOf(t17) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t17, i23) => {
        this.hasOwnProperty(i23) && (this._$Ei.set(i23, this[i23]), delete this[i23]);
      });
    }
    createRenderRoot() {
      var t17;
      const s20 = null !== (t17 = this.shadowRoot) && void 0 !== t17 ? t17 : this.attachShadow(this.constructor.shadowRootOptions);
      return S7(s20, this.constructor.elementStyles), s20;
    }
    connectedCallback() {
      var t17;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostConnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    enableUpdating(t17) {
    }
    disconnectedCallback() {
      var t17;
      null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostDisconnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    attributeChangedCallback(t17, i23, s20) {
      this._$AK(t17, s20);
    }
    _$EO(t17, i23, s20 = l12) {
      var e33;
      const r18 = this.constructor._$Ep(t17, s20);
      if (void 0 !== r18 && true === s20.reflect) {
        const h11 = (void 0 !== (null === (e33 = s20.converter) || void 0 === e33 ? void 0 : e33.toAttribute) ? s20.converter : n21).toAttribute(i23, s20.type);
        this._$El = t17, null == h11 ? this.removeAttribute(r18) : this.setAttribute(r18, h11), this._$El = null;
      }
    }
    _$AK(t17, i23) {
      var s20;
      const e33 = this.constructor, r18 = e33._$Ev.get(t17);
      if (void 0 !== r18 && this._$El !== r18) {
        const t18 = e33.getPropertyOptions(r18), h11 = "function" == typeof t18.converter ? { fromAttribute: t18.converter } : void 0 !== (null === (s20 = t18.converter) || void 0 === s20 ? void 0 : s20.fromAttribute) ? t18.converter : n21;
        this._$El = r18, this[r18] = h11.fromAttribute(i23, t18.type), this._$El = null;
      }
    }
    requestUpdate(t17, i23, s20) {
      let e33 = true;
      void 0 !== t17 && (((s20 = s20 || this.constructor.getPropertyOptions(t17)).hasChanged || a7)(this[t17], i23) ? (this._$AL.has(t17) || this._$AL.set(t17, i23), true === s20.reflect && this._$El !== t17 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t17, s20))) : e33 = false), !this.isUpdatePending && e33 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t18) {
        Promise.reject(t18);
      }
      const t17 = this.scheduleUpdate();
      return null != t17 && await t17, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t17;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t18, i24) => this[i24] = t18), this._$Ei = void 0);
      let i23 = false;
      const s20 = this._$AL;
      try {
        i23 = this.shouldUpdate(s20), i23 ? (this.willUpdate(s20), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
          var i24;
          return null === (i24 = t18.hostUpdate) || void 0 === i24 ? void 0 : i24.call(t18);
        }), this.update(s20)) : this._$Ek();
      } catch (t18) {
        throw i23 = false, this._$Ek(), t18;
      }
      i23 && this._$AE(s20);
    }
    willUpdate(t17) {
    }
    _$AE(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.forEach((t18) => {
        var i24;
        return null === (i24 = t18.hostUpdated) || void 0 === i24 ? void 0 : i24.call(t18);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t17)), this.updated(t17);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t17) {
      return true;
    }
    update(t17) {
      void 0 !== this._$EC && (this._$EC.forEach((t18, i23) => this._$EO(i23, this[i23], t18)), this._$EC = void 0), this._$Ek();
    }
    updated(t17) {
    }
    firstUpdated(t17) {
    }
  };
  u7[d7] = true, u7.elementProperties = /* @__PURE__ */ new Map(), u7.elementStyles = [], u7.shadowRootOptions = { mode: "open" }, null == o18 || o18({ ReactiveElement: u7 }), (null !== (s13 = e24.reactiveElementVersions) && void 0 !== s13 ? s13 : e24.reactiveElementVersions = []).push("1.6.3");

  // node_modules/@material/mwc-ripple/node_modules/lit-html/lit-html.js
  var t12;
  var i16 = window;
  var s14 = i16.trustedTypes;
  var e25 = s14 ? s14.createPolicy("lit-html", { createHTML: (t17) => t17 }) : void 0;
  var o19 = "$lit$";
  var n22 = `lit$${(Math.random() + "").slice(9)}$`;
  var l13 = "?" + n22;
  var h8 = `<${l13}>`;
  var r14 = document;
  var u8 = () => r14.createComment("");
  var d8 = (t17) => null === t17 || "object" != typeof t17 && "function" != typeof t17;
  var c9 = Array.isArray;
  var v4 = (t17) => c9(t17) || "function" == typeof (null == t17 ? void 0 : t17[Symbol.iterator]);
  var a8 = "[ 	\n\f\r]";
  var f5 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _17 = /-->/g;
  var m4 = />/g;
  var p5 = RegExp(`>|${a8}(?:([^\\s"'>=/]+)(${a8}*=${a8}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g4 = /'/g;
  var $4 = /"/g;
  var y5 = /^(?:script|style|textarea|title)$/i;
  var w4 = (t17) => (i23, ...s20) => ({ _$litType$: t17, strings: i23, values: s20 });
  var x4 = w4(1);
  var b5 = w4(2);
  var T4 = Symbol.for("lit-noChange");
  var A4 = Symbol.for("lit-nothing");
  var E4 = /* @__PURE__ */ new WeakMap();
  var C4 = r14.createTreeWalker(r14, 129, null, false);
  function P4(t17, i23) {
    if (!Array.isArray(t17) || !t17.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e25 ? e25.createHTML(i23) : i23;
  }
  var V4 = (t17, i23) => {
    const s20 = t17.length - 1, e33 = [];
    let l20, r18 = 2 === i23 ? "<svg>" : "", u11 = f5;
    for (let i24 = 0; i24 < s20; i24++) {
      const s21 = t17[i24];
      let d11, c12, v6 = -1, a11 = 0;
      for (; a11 < s21.length && (u11.lastIndex = a11, c12 = u11.exec(s21), null !== c12); )
        a11 = u11.lastIndex, u11 === f5 ? "!--" === c12[1] ? u11 = _17 : void 0 !== c12[1] ? u11 = m4 : void 0 !== c12[2] ? (y5.test(c12[2]) && (l20 = RegExp("</" + c12[2], "g")), u11 = p5) : void 0 !== c12[3] && (u11 = p5) : u11 === p5 ? ">" === c12[0] ? (u11 = null != l20 ? l20 : f5, v6 = -1) : void 0 === c12[1] ? v6 = -2 : (v6 = u11.lastIndex - c12[2].length, d11 = c12[1], u11 = void 0 === c12[3] ? p5 : '"' === c12[3] ? $4 : g4) : u11 === $4 || u11 === g4 ? u11 = p5 : u11 === _17 || u11 === m4 ? u11 = f5 : (u11 = p5, l20 = void 0);
      const w6 = u11 === p5 && t17[i24 + 1].startsWith("/>") ? " " : "";
      r18 += u11 === f5 ? s21 + h8 : v6 >= 0 ? (e33.push(d11), s21.slice(0, v6) + o19 + s21.slice(v6) + n22 + w6) : s21 + n22 + (-2 === v6 ? (e33.push(void 0), i24) : w6);
    }
    return [P4(t17, r18 + (t17[s20] || "<?>") + (2 === i23 ? "</svg>" : "")), e33];
  };
  var N4 = class _N {
    constructor({ strings: t17, _$litType$: i23 }, e33) {
      let h11;
      this.parts = [];
      let r18 = 0, d11 = 0;
      const c12 = t17.length - 1, v6 = this.parts, [a11, f7] = V4(t17, i23);
      if (this.el = _N.createElement(a11, e33), C4.currentNode = this.el.content, 2 === i23) {
        const t18 = this.el.content, i24 = t18.firstChild;
        i24.remove(), t18.append(...i24.childNodes);
      }
      for (; null !== (h11 = C4.nextNode()) && v6.length < c12; ) {
        if (1 === h11.nodeType) {
          if (h11.hasAttributes()) {
            const t18 = [];
            for (const i24 of h11.getAttributeNames())
              if (i24.endsWith(o19) || i24.startsWith(n22)) {
                const s20 = f7[d11++];
                if (t18.push(i24), void 0 !== s20) {
                  const t19 = h11.getAttribute(s20.toLowerCase() + o19).split(n22), i25 = /([.?@])?(.*)/.exec(s20);
                  v6.push({ type: 1, index: r18, name: i25[2], strings: t19, ctor: "." === i25[1] ? H4 : "?" === i25[1] ? L4 : "@" === i25[1] ? z3 : k6 });
                } else
                  v6.push({ type: 6, index: r18 });
              }
            for (const i24 of t18)
              h11.removeAttribute(i24);
          }
          if (y5.test(h11.tagName)) {
            const t18 = h11.textContent.split(n22), i24 = t18.length - 1;
            if (i24 > 0) {
              h11.textContent = s14 ? s14.emptyScript : "";
              for (let s20 = 0; s20 < i24; s20++)
                h11.append(t18[s20], u8()), C4.nextNode(), v6.push({ type: 2, index: ++r18 });
              h11.append(t18[i24], u8());
            }
          }
        } else if (8 === h11.nodeType)
          if (h11.data === l13)
            v6.push({ type: 2, index: r18 });
          else {
            let t18 = -1;
            for (; -1 !== (t18 = h11.data.indexOf(n22, t18 + 1)); )
              v6.push({ type: 7, index: r18 }), t18 += n22.length - 1;
          }
        r18++;
      }
    }
    static createElement(t17, i23) {
      const s20 = r14.createElement("template");
      return s20.innerHTML = t17, s20;
    }
  };
  function S8(t17, i23, s20 = t17, e33) {
    var o29, n31, l20, h11;
    if (i23 === T4)
      return i23;
    let r18 = void 0 !== e33 ? null === (o29 = s20._$Co) || void 0 === o29 ? void 0 : o29[e33] : s20._$Cl;
    const u11 = d8(i23) ? void 0 : i23._$litDirective$;
    return (null == r18 ? void 0 : r18.constructor) !== u11 && (null === (n31 = null == r18 ? void 0 : r18._$AO) || void 0 === n31 || n31.call(r18, false), void 0 === u11 ? r18 = void 0 : (r18 = new u11(t17), r18._$AT(t17, s20, e33)), void 0 !== e33 ? (null !== (l20 = (h11 = s20)._$Co) && void 0 !== l20 ? l20 : h11._$Co = [])[e33] = r18 : s20._$Cl = r18), void 0 !== r18 && (i23 = S8(t17, r18._$AS(t17, i23.values), r18, e33)), i23;
  }
  var M4 = class {
    constructor(t17, i23) {
      this._$AV = [], this._$AN = void 0, this._$AD = t17, this._$AM = i23;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t17) {
      var i23;
      const { el: { content: s20 }, parts: e33 } = this._$AD, o29 = (null !== (i23 = null == t17 ? void 0 : t17.creationScope) && void 0 !== i23 ? i23 : r14).importNode(s20, true);
      C4.currentNode = o29;
      let n31 = C4.nextNode(), l20 = 0, h11 = 0, u11 = e33[0];
      for (; void 0 !== u11; ) {
        if (l20 === u11.index) {
          let i24;
          2 === u11.type ? i24 = new R4(n31, n31.nextSibling, this, t17) : 1 === u11.type ? i24 = new u11.ctor(n31, u11.name, u11.strings, this, t17) : 6 === u11.type && (i24 = new Z4(n31, this, t17)), this._$AV.push(i24), u11 = e33[++h11];
        }
        l20 !== (null == u11 ? void 0 : u11.index) && (n31 = C4.nextNode(), l20++);
      }
      return C4.currentNode = r14, o29;
    }
    v(t17) {
      let i23 = 0;
      for (const s20 of this._$AV)
        void 0 !== s20 && (void 0 !== s20.strings ? (s20._$AI(t17, s20, i23), i23 += s20.strings.length - 2) : s20._$AI(t17[i23])), i23++;
    }
  };
  var R4 = class _R {
    constructor(t17, i23, s20, e33) {
      var o29;
      this.type = 2, this._$AH = A4, this._$AN = void 0, this._$AA = t17, this._$AB = i23, this._$AM = s20, this.options = e33, this._$Cp = null === (o29 = null == e33 ? void 0 : e33.isConnected) || void 0 === o29 || o29;
    }
    get _$AU() {
      var t17, i23;
      return null !== (i23 = null === (t17 = this._$AM) || void 0 === t17 ? void 0 : t17._$AU) && void 0 !== i23 ? i23 : this._$Cp;
    }
    get parentNode() {
      let t17 = this._$AA.parentNode;
      const i23 = this._$AM;
      return void 0 !== i23 && 11 === (null == t17 ? void 0 : t17.nodeType) && (t17 = i23.parentNode), t17;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t17, i23 = this) {
      t17 = S8(this, t17, i23), d8(t17) ? t17 === A4 || null == t17 || "" === t17 ? (this._$AH !== A4 && this._$AR(), this._$AH = A4) : t17 !== this._$AH && t17 !== T4 && this._(t17) : void 0 !== t17._$litType$ ? this.g(t17) : void 0 !== t17.nodeType ? this.$(t17) : v4(t17) ? this.T(t17) : this._(t17);
    }
    k(t17) {
      return this._$AA.parentNode.insertBefore(t17, this._$AB);
    }
    $(t17) {
      this._$AH !== t17 && (this._$AR(), this._$AH = this.k(t17));
    }
    _(t17) {
      this._$AH !== A4 && d8(this._$AH) ? this._$AA.nextSibling.data = t17 : this.$(r14.createTextNode(t17)), this._$AH = t17;
    }
    g(t17) {
      var i23;
      const { values: s20, _$litType$: e33 } = t17, o29 = "number" == typeof e33 ? this._$AC(t17) : (void 0 === e33.el && (e33.el = N4.createElement(P4(e33.h, e33.h[0]), this.options)), e33);
      if ((null === (i23 = this._$AH) || void 0 === i23 ? void 0 : i23._$AD) === o29)
        this._$AH.v(s20);
      else {
        const t18 = new M4(o29, this), i24 = t18.u(this.options);
        t18.v(s20), this.$(i24), this._$AH = t18;
      }
    }
    _$AC(t17) {
      let i23 = E4.get(t17.strings);
      return void 0 === i23 && E4.set(t17.strings, i23 = new N4(t17)), i23;
    }
    T(t17) {
      c9(this._$AH) || (this._$AH = [], this._$AR());
      const i23 = this._$AH;
      let s20, e33 = 0;
      for (const o29 of t17)
        e33 === i23.length ? i23.push(s20 = new _R(this.k(u8()), this.k(u8()), this, this.options)) : s20 = i23[e33], s20._$AI(o29), e33++;
      e33 < i23.length && (this._$AR(s20 && s20._$AB.nextSibling, e33), i23.length = e33);
    }
    _$AR(t17 = this._$AA.nextSibling, i23) {
      var s20;
      for (null === (s20 = this._$AP) || void 0 === s20 || s20.call(this, false, true, i23); t17 && t17 !== this._$AB; ) {
        const i24 = t17.nextSibling;
        t17.remove(), t17 = i24;
      }
    }
    setConnected(t17) {
      var i23;
      void 0 === this._$AM && (this._$Cp = t17, null === (i23 = this._$AP) || void 0 === i23 || i23.call(this, t17));
    }
  };
  var k6 = class {
    constructor(t17, i23, s20, e33, o29) {
      this.type = 1, this._$AH = A4, this._$AN = void 0, this.element = t17, this.name = i23, this._$AM = e33, this.options = o29, s20.length > 2 || "" !== s20[0] || "" !== s20[1] ? (this._$AH = Array(s20.length - 1).fill(new String()), this.strings = s20) : this._$AH = A4;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17, i23 = this, s20, e33) {
      const o29 = this.strings;
      let n31 = false;
      if (void 0 === o29)
        t17 = S8(this, t17, i23, 0), n31 = !d8(t17) || t17 !== this._$AH && t17 !== T4, n31 && (this._$AH = t17);
      else {
        const e34 = t17;
        let l20, h11;
        for (t17 = o29[0], l20 = 0; l20 < o29.length - 1; l20++)
          h11 = S8(this, e34[s20 + l20], i23, l20), h11 === T4 && (h11 = this._$AH[l20]), n31 || (n31 = !d8(h11) || h11 !== this._$AH[l20]), h11 === A4 ? t17 = A4 : t17 !== A4 && (t17 += (null != h11 ? h11 : "") + o29[l20 + 1]), this._$AH[l20] = h11;
      }
      n31 && !e33 && this.j(t17);
    }
    j(t17) {
      t17 === A4 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t17 ? t17 : "");
    }
  };
  var H4 = class extends k6 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t17) {
      this.element[this.name] = t17 === A4 ? void 0 : t17;
    }
  };
  var I4 = s14 ? s14.emptyScript : "";
  var L4 = class extends k6 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t17) {
      t17 && t17 !== A4 ? this.element.setAttribute(this.name, I4) : this.element.removeAttribute(this.name);
    }
  };
  var z3 = class extends k6 {
    constructor(t17, i23, s20, e33, o29) {
      super(t17, i23, s20, e33, o29), this.type = 5;
    }
    _$AI(t17, i23 = this) {
      var s20;
      if ((t17 = null !== (s20 = S8(this, t17, i23, 0)) && void 0 !== s20 ? s20 : A4) === T4)
        return;
      const e33 = this._$AH, o29 = t17 === A4 && e33 !== A4 || t17.capture !== e33.capture || t17.once !== e33.once || t17.passive !== e33.passive, n31 = t17 !== A4 && (e33 === A4 || o29);
      o29 && this.element.removeEventListener(this.name, this, e33), n31 && this.element.addEventListener(this.name, this, t17), this._$AH = t17;
    }
    handleEvent(t17) {
      var i23, s20;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s20 = null === (i23 = this.options) || void 0 === i23 ? void 0 : i23.host) && void 0 !== s20 ? s20 : this.element, t17) : this._$AH.handleEvent(t17);
    }
  };
  var Z4 = class {
    constructor(t17, i23, s20) {
      this.element = t17, this.type = 6, this._$AN = void 0, this._$AM = i23, this.options = s20;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17) {
      S8(this, t17);
    }
  };
  var B3 = i16.litHtmlPolyfillSupport;
  null == B3 || B3(N4, R4), (null !== (t12 = i16.litHtmlVersions) && void 0 !== t12 ? t12 : i16.litHtmlVersions = []).push("2.8.0");
  var D3 = (t17, i23, s20) => {
    var e33, o29;
    const n31 = null !== (e33 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== e33 ? e33 : i23;
    let l20 = n31._$litPart$;
    if (void 0 === l20) {
      const t18 = null !== (o29 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== o29 ? o29 : null;
      n31._$litPart$ = l20 = new R4(i23.insertBefore(u8(), t18), t18, void 0, null != s20 ? s20 : {});
    }
    return l20._$AI(t17), l20;
  };

  // node_modules/@material/mwc-ripple/node_modules/lit-element/lit-element.js
  var l14;
  var o20;
  var s15 = class extends u7 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t17, e33;
      const i23 = super.createRenderRoot();
      return null !== (t17 = (e33 = this.renderOptions).renderBefore) && void 0 !== t17 || (e33.renderBefore = i23.firstChild), i23;
    }
    update(t17) {
      const i23 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t17), this._$Do = D3(i23, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t17;
      super.connectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(true);
    }
    disconnectedCallback() {
      var t17;
      super.disconnectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(false);
    }
    render() {
      return T4;
    }
  };
  s15.finalized = true, s15._$litElement$ = true, null === (l14 = globalThis.litElementHydrateSupport) || void 0 === l14 || l14.call(globalThis, { LitElement: s15 });
  var n23 = globalThis.litElementPolyfillSupport;
  null == n23 || n23({ LitElement: s15 });
  (null !== (o20 = globalThis.litElementVersions) && void 0 !== o20 ? o20 : globalThis.litElementVersions = []).push("3.3.3");

  // node_modules/@material/mwc-ripple/node_modules/lit-html/directive.js
  var t13 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e26 = (t17) => (...e33) => ({ _$litDirective$: t17, values: e33 });
  var i17 = class {
    constructor(t17) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t17, e33, i23) {
      this._$Ct = t17, this._$AM = e33, this._$Ci = i23;
    }
    _$AS(t17, e33) {
      return this.update(t17, e33);
    }
    update(t17, e33) {
      return this.render(...e33);
    }
  };

  // node_modules/@material/mwc-ripple/node_modules/lit-html/directives/class-map.js
  var o21 = e26(class extends i17 {
    constructor(t17) {
      var i23;
      if (super(t17), t17.type !== t13.ATTRIBUTE || "class" !== t17.name || (null === (i23 = t17.strings) || void 0 === i23 ? void 0 : i23.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t17) {
      return " " + Object.keys(t17).filter((i23) => t17[i23]).join(" ") + " ";
    }
    update(i23, [s20]) {
      var r18, o29;
      if (void 0 === this.it) {
        this.it = /* @__PURE__ */ new Set(), void 0 !== i23.strings && (this.nt = new Set(i23.strings.join(" ").split(/\s/).filter((t17) => "" !== t17)));
        for (const t17 in s20)
          s20[t17] && !(null === (r18 = this.nt) || void 0 === r18 ? void 0 : r18.has(t17)) && this.it.add(t17);
        return this.render(s20);
      }
      const e33 = i23.element.classList;
      this.it.forEach((t17) => {
        t17 in s20 || (e33.remove(t17), this.it.delete(t17));
      });
      for (const t17 in s20) {
        const i24 = !!s20[t17];
        i24 === this.it.has(t17) || (null === (o29 = this.nt) || void 0 === o29 ? void 0 : o29.has(t17)) || (i24 ? (e33.add(t17), this.it.add(t17)) : (e33.remove(t17), this.it.delete(t17)));
      }
      return T4;
    }
  });

  // node_modules/@material/mwc-ripple/node_modules/lit-html/directives/style-map.js
  var i18 = "important";
  var n24 = " !" + i18;
  var o22 = e26(class extends i17 {
    constructor(t17) {
      var e33;
      if (super(t17), t17.type !== t13.ATTRIBUTE || "style" !== t17.name || (null === (e33 = t17.strings) || void 0 === e33 ? void 0 : e33.length) > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t17) {
      return Object.keys(t17).reduce((e33, r18) => {
        const s20 = t17[r18];
        return null == s20 ? e33 : e33 + `${r18 = r18.includes("-") ? r18 : r18.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s20};`;
      }, "");
    }
    update(e33, [r18]) {
      const { style: s20 } = e33.element;
      if (void 0 === this.ht) {
        this.ht = /* @__PURE__ */ new Set();
        for (const t17 in r18)
          this.ht.add(t17);
        return this.render(r18);
      }
      this.ht.forEach((t17) => {
        null == r18[t17] && (this.ht.delete(t17), t17.includes("-") ? s20.removeProperty(t17) : s20[t17] = "");
      });
      for (const t17 in r18) {
        const e34 = r18[t17];
        if (null != e34) {
          this.ht.add(t17);
          const r19 = "string" == typeof e34 && e34.endsWith(n24);
          t17.includes("-") || r19 ? s20.setProperty(t17, r19 ? e34.slice(0, -11) : e34, r19 ? i18 : "") : s20[t17] = e34;
        }
      }
      return T4;
    }
  });

  // node_modules/@material/mwc-ripple/mwc-ripple-base.js
  var RippleBase = class extends BaseElement {
    constructor() {
      super(...arguments);
      this.primary = false;
      this.accent = false;
      this.unbounded = false;
      this.disabled = false;
      this.activated = false;
      this.selected = false;
      this.internalUseStateLayerCustomProperties = false;
      this.hovering = false;
      this.bgFocused = false;
      this.fgActivation = false;
      this.fgDeactivation = false;
      this.fgScale = "";
      this.fgSize = "";
      this.translateStart = "";
      this.translateEnd = "";
      this.leftPos = "";
      this.topPos = "";
      this.mdcFoundationClass = foundation_default;
    }
    get isActive() {
      return matches2(this.parentElement || this, ":active");
    }
    createAdapter() {
      return {
        browserSupportsCssVars: () => true,
        isUnbounded: () => this.unbounded,
        isSurfaceActive: () => this.isActive,
        isSurfaceDisabled: () => this.disabled,
        addClass: (className) => {
          switch (className) {
            case "mdc-ripple-upgraded--background-focused":
              this.bgFocused = true;
              break;
            case "mdc-ripple-upgraded--foreground-activation":
              this.fgActivation = true;
              break;
            case "mdc-ripple-upgraded--foreground-deactivation":
              this.fgDeactivation = true;
              break;
            default:
              break;
          }
        },
        removeClass: (className) => {
          switch (className) {
            case "mdc-ripple-upgraded--background-focused":
              this.bgFocused = false;
              break;
            case "mdc-ripple-upgraded--foreground-activation":
              this.fgActivation = false;
              break;
            case "mdc-ripple-upgraded--foreground-deactivation":
              this.fgDeactivation = false;
              break;
            default:
              break;
          }
        },
        containsEventTarget: () => true,
        registerInteractionHandler: () => void 0,
        deregisterInteractionHandler: () => void 0,
        registerDocumentInteractionHandler: () => void 0,
        deregisterDocumentInteractionHandler: () => void 0,
        registerResizeHandler: () => void 0,
        deregisterResizeHandler: () => void 0,
        updateCssVariable: (varName, value) => {
          switch (varName) {
            case "--mdc-ripple-fg-scale":
              this.fgScale = value;
              break;
            case "--mdc-ripple-fg-size":
              this.fgSize = value;
              break;
            case "--mdc-ripple-fg-translate-end":
              this.translateEnd = value;
              break;
            case "--mdc-ripple-fg-translate-start":
              this.translateStart = value;
              break;
            case "--mdc-ripple-left":
              this.leftPos = value;
              break;
            case "--mdc-ripple-top":
              this.topPos = value;
              break;
            default:
              break;
          }
        },
        computeBoundingRect: () => (this.parentElement || this).getBoundingClientRect(),
        getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset })
      };
    }
    startPress(ev) {
      this.waitForFoundation(() => {
        this.mdcFoundation.activate(ev);
      });
    }
    endPress() {
      this.waitForFoundation(() => {
        this.mdcFoundation.deactivate();
      });
    }
    startFocus() {
      this.waitForFoundation(() => {
        this.mdcFoundation.handleFocus();
      });
    }
    endFocus() {
      this.waitForFoundation(() => {
        this.mdcFoundation.handleBlur();
      });
    }
    startHover() {
      this.hovering = true;
    }
    endHover() {
      this.hovering = false;
    }
    /**
     * Wait for the MDCFoundation to be created by `firstUpdated`
     */
    waitForFoundation(fn2) {
      if (this.mdcFoundation) {
        fn2();
      } else {
        this.updateComplete.then(fn2);
      }
    }
    update(changedProperties) {
      if (changedProperties.has("disabled")) {
        if (this.disabled) {
          this.endHover();
        }
      }
      super.update(changedProperties);
    }
    /** @soyTemplate */
    render() {
      const shouldActivateInPrimary = this.activated && (this.primary || !this.accent);
      const shouldSelectInPrimary = this.selected && (this.primary || !this.accent);
      const classes = {
        "mdc-ripple-surface--accent": this.accent,
        "mdc-ripple-surface--primary--activated": shouldActivateInPrimary,
        "mdc-ripple-surface--accent--activated": this.accent && this.activated,
        "mdc-ripple-surface--primary--selected": shouldSelectInPrimary,
        "mdc-ripple-surface--accent--selected": this.accent && this.selected,
        "mdc-ripple-surface--disabled": this.disabled,
        "mdc-ripple-surface--hover": this.hovering,
        "mdc-ripple-surface--primary": this.primary,
        "mdc-ripple-surface--selected": this.selected,
        "mdc-ripple-upgraded--background-focused": this.bgFocused,
        "mdc-ripple-upgraded--foreground-activation": this.fgActivation,
        "mdc-ripple-upgraded--foreground-deactivation": this.fgDeactivation,
        "mdc-ripple-upgraded--unbounded": this.unbounded,
        "mdc-ripple-surface--internal-use-state-layer-custom-properties": this.internalUseStateLayerCustomProperties
      };
      return x4`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${o21(classes)}"
          style="${o22({
        "--mdc-ripple-fg-scale": this.fgScale,
        "--mdc-ripple-fg-size": this.fgSize,
        "--mdc-ripple-fg-translate-end": this.translateEnd,
        "--mdc-ripple-fg-translate-start": this.translateStart,
        "--mdc-ripple-left": this.leftPos,
        "--mdc-ripple-top": this.topPos
      })}"></div>`;
    }
  };
  __decorate([
    i12(".mdc-ripple-surface")
  ], RippleBase.prototype, "mdcRoot", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "primary", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "accent", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "unbounded", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "disabled", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "activated", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "selected", void 0);
  __decorate([
    n14({ type: Boolean })
  ], RippleBase.prototype, "internalUseStateLayerCustomProperties", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "hovering", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "bgFocused", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "fgActivation", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "fgDeactivation", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "fgScale", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "fgSize", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "translateStart", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "translateEnd", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "leftPos", void 0);
  __decorate([
    t8()
  ], RippleBase.prototype, "topPos", void 0);

  // node_modules/@material/mwc-ripple/mwc-ripple.css.js
  var styles12 = i15`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;

  // node_modules/@material/mwc-ripple/mwc-ripple.js
  var Ripple = class Ripple2 extends RippleBase {
  };
  Ripple.styles = [styles12];
  Ripple = __decorate([
    e17("mwc-ripple")
  ], Ripple);

  // node_modules/@material/mwc-base/aria-property.js
  function tsDecorator(prototype, name, descriptor) {
    const constructor = prototype.constructor;
    if (!descriptor) {
      const litInternalPropertyKey = `__${name}`;
      descriptor = constructor.getPropertyDescriptor(name, litInternalPropertyKey);
      if (!descriptor) {
        throw new Error("@ariaProperty must be used after a @property decorator");
      }
    }
    const propDescriptor = descriptor;
    let attribute = "";
    if (!propDescriptor.set) {
      throw new Error(`@ariaProperty requires a setter for ${name}`);
    }
    if (prototype.dispatchWizEvent) {
      return descriptor;
    }
    const wrappedDescriptor = {
      configurable: true,
      enumerable: true,
      set(value) {
        if (attribute === "") {
          const options = constructor.getPropertyOptions(name);
          attribute = typeof options.attribute === "string" ? options.attribute : name;
        }
        if (this.hasAttribute(attribute)) {
          this.removeAttribute(attribute);
        }
        propDescriptor.set.call(this, value);
      }
    };
    if (propDescriptor.get) {
      wrappedDescriptor.get = function() {
        return propDescriptor.get.call(this);
      };
    }
    return wrappedDescriptor;
  }
  function ariaProperty(protoOrDescriptor, name, descriptor) {
    if (name !== void 0) {
      return tsDecorator(protoOrDescriptor, name, descriptor);
    } else {
      throw new Error("@ariaProperty only supports TypeScript Decorators");
    }
  }

  // node_modules/@material/mwc-base/node_modules/@lit/reactive-element/decorators/property.js
  var i19 = (i23, e33) => "method" === e33.kind && e33.descriptor && !("value" in e33.descriptor) ? { ...e33, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e33.key, initializer() {
    "function" == typeof e33.initializer && (this[e33.key] = e33.initializer.call(this));
  }, finisher(n31) {
    n31.createProperty(e33.key, i23);
  } };
  var e27 = (i23, e33, n31) => {
    e33.constructor.createProperty(n31, i23);
  };
  function n25(n31) {
    return (t17, o29) => void 0 !== o29 ? e27(n31, t17, o29) : i19(n31, t17);
  }

  // node_modules/@material/mwc-base/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n26;
  var e28 = null != (null === (n26 = window.HTMLSlotElement) || void 0 === n26 ? void 0 : n26.prototype.assignedElements) ? (o29, n31) => o29.assignedElements(n31) : (o29, n31) => o29.assignedNodes(n31).filter((o30) => o30.nodeType === Node.ELEMENT_NODE);

  // node_modules/@material/mwc-base/form-element.js
  var _a;
  var _b;
  var USING_SHADY_DOM = (_b = (_a = window.ShadyDOM) === null || _a === void 0 ? void 0 : _a.inUse) !== null && _b !== void 0 ? _b : false;
  var FormElement = class extends BaseElement {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.containingForm = null;
      this.formDataListener = (ev) => {
        if (!this.disabled) {
          this.setFormData(ev.formData);
        }
      };
    }
    findFormElement() {
      if (!this.shadowRoot || USING_SHADY_DOM) {
        return null;
      }
      const root = this.getRootNode();
      const forms = root.querySelectorAll("form");
      for (const form of Array.from(forms)) {
        if (form.contains(this)) {
          return form;
        }
      }
      return null;
    }
    connectedCallback() {
      var _a2;
      super.connectedCallback();
      this.containingForm = this.findFormElement();
      (_a2 = this.containingForm) === null || _a2 === void 0 ? void 0 : _a2.addEventListener("formdata", this.formDataListener);
    }
    disconnectedCallback() {
      var _a2;
      super.disconnectedCallback();
      (_a2 = this.containingForm) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener("formdata", this.formDataListener);
      this.containingForm = null;
    }
    click() {
      if (this.formElement && !this.disabled) {
        this.formElement.focus();
        this.formElement.click();
      }
    }
    firstUpdated() {
      super.firstUpdated();
      if (this.shadowRoot) {
        this.mdcRoot.addEventListener("change", (e33) => {
          this.dispatchEvent(new Event("change", e33));
        });
      }
    }
  };
  FormElement.shadowRootOptions = { mode: "open", delegatesFocus: true };
  __decorate([
    n25({ type: Boolean })
  ], FormElement.prototype, "disabled", void 0);

  // node_modules/@material/mwc-ripple/ripple-handlers.js
  var RippleHandlers = class {
    constructor(rippleFn) {
      this.startPress = (ev) => {
        rippleFn().then((r18) => {
          r18 && r18.startPress(ev);
        });
      };
      this.endPress = () => {
        rippleFn().then((r18) => {
          r18 && r18.endPress();
        });
      };
      this.startFocus = () => {
        rippleFn().then((r18) => {
          r18 && r18.startFocus();
        });
      };
      this.endFocus = () => {
        rippleFn().then((r18) => {
          r18 && r18.endFocus();
        });
      };
      this.startHover = () => {
        rippleFn().then((r18) => {
          r18 && r18.startHover();
        });
      };
      this.endHover = () => {
        rippleFn().then((r18) => {
          r18 && r18.endHover();
        });
      };
    }
  };

  // node_modules/@material/base/observer.js
  function observeProperty(target, property, observer) {
    var targetObservers = installObserver(target, property);
    var observers = targetObservers.getObservers(property);
    observers.push(observer);
    return function() {
      observers.splice(observers.indexOf(observer), 1);
    };
  }
  var allTargetObservers = /* @__PURE__ */ new WeakMap();
  function installObserver(target, property) {
    var observersMap = /* @__PURE__ */ new Map();
    if (!allTargetObservers.has(target)) {
      allTargetObservers.set(target, {
        isEnabled: true,
        getObservers: function(key) {
          var observers = observersMap.get(key) || [];
          if (!observersMap.has(key)) {
            observersMap.set(key, observers);
          }
          return observers;
        },
        installedProperties: /* @__PURE__ */ new Set()
      });
    }
    var targetObservers = allTargetObservers.get(target);
    if (targetObservers.installedProperties.has(property)) {
      return targetObservers;
    }
    var descriptor = getDescriptor2(target, property) || {
      configurable: true,
      enumerable: true,
      value: target[property],
      writable: true
    };
    var observedDescriptor = __assign({}, descriptor);
    var descGet = descriptor.get, descSet = descriptor.set;
    if ("value" in descriptor) {
      delete observedDescriptor.value;
      delete observedDescriptor.writable;
      var value_1 = descriptor.value;
      descGet = function() {
        return value_1;
      };
      if (descriptor.writable) {
        descSet = function(newValue) {
          value_1 = newValue;
        };
      }
    }
    if (descGet) {
      observedDescriptor.get = function() {
        return descGet.call(this);
      };
    }
    if (descSet) {
      observedDescriptor.set = function(newValue) {
        var e_4, _a2;
        var previous = descGet ? descGet.call(this) : newValue;
        descSet.call(this, newValue);
        if (targetObservers.isEnabled && (!descGet || newValue !== previous)) {
          try {
            for (var _b2 = __values(targetObservers.getObservers(property)), _c = _b2.next(); !_c.done; _c = _b2.next()) {
              var observer = _c.value;
              observer(newValue, previous);
            }
          } catch (e_4_1) {
            e_4 = { error: e_4_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b2.return))
                _a2.call(_b2);
            } finally {
              if (e_4)
                throw e_4.error;
            }
          }
        }
      };
    }
    targetObservers.installedProperties.add(property);
    Object.defineProperty(target, property, observedDescriptor);
    return targetObservers;
  }
  function getDescriptor2(target, property) {
    var descriptorTarget = target;
    var descriptor;
    while (descriptorTarget) {
      descriptor = Object.getOwnPropertyDescriptor(descriptorTarget, property);
      if (descriptor) {
        break;
      }
      descriptorTarget = Object.getPrototypeOf(descriptorTarget);
    }
    return descriptor;
  }
  function setObserversEnabled(target, enabled) {
    var targetObservers = allTargetObservers.get(target);
    if (targetObservers) {
      targetObservers.isEnabled = enabled;
    }
  }

  // node_modules/@material/base/observer-foundation.js
  var MDCObserverFoundation = (
    /** @class */
    function(_super) {
      __extends(MDCObserverFoundation2, _super);
      function MDCObserverFoundation2(adapter) {
        var _this = _super.call(this, adapter) || this;
        _this.unobserves = /* @__PURE__ */ new Set();
        return _this;
      }
      MDCObserverFoundation2.prototype.destroy = function() {
        _super.prototype.destroy.call(this);
        this.unobserve();
      };
      MDCObserverFoundation2.prototype.observe = function(target, observers) {
        var e_1, _a2;
        var _this = this;
        var cleanup = [];
        try {
          for (var _b2 = __values(Object.keys(observers)), _c = _b2.next(); !_c.done; _c = _b2.next()) {
            var property = _c.value;
            var observer = observers[property].bind(this);
            cleanup.push(this.observeProperty(target, property, observer));
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b2.return))
              _a2.call(_b2);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        var unobserve = function() {
          var e_2, _a3;
          try {
            for (var cleanup_1 = __values(cleanup), cleanup_1_1 = cleanup_1.next(); !cleanup_1_1.done; cleanup_1_1 = cleanup_1.next()) {
              var cleanupFn = cleanup_1_1.value;
              cleanupFn();
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (cleanup_1_1 && !cleanup_1_1.done && (_a3 = cleanup_1.return))
                _a3.call(cleanup_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
          _this.unobserves.delete(unobserve);
        };
        this.unobserves.add(unobserve);
        return unobserve;
      };
      MDCObserverFoundation2.prototype.observeProperty = function(target, property, observer) {
        return observeProperty(target, property, observer);
      };
      MDCObserverFoundation2.prototype.setObserversEnabled = function(target, enabled) {
        setObserversEnabled(target, enabled);
      };
      MDCObserverFoundation2.prototype.unobserve = function() {
        var e_3, _a2;
        try {
          for (var _b2 = __values(__spreadArray([], __read(this.unobserves))), _c = _b2.next(); !_c.done; _c = _b2.next()) {
            var unobserve = _c.value;
            unobserve();
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b2.return))
              _a2.call(_b2);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
      };
      return MDCObserverFoundation2;
    }(MDCFoundation)
  );

  // node_modules/@material/switch/constants.js
  var CssClasses;
  (function(CssClasses2) {
    CssClasses2["PROCESSING"] = "mdc-switch--processing";
    CssClasses2["SELECTED"] = "mdc-switch--selected";
    CssClasses2["UNSELECTED"] = "mdc-switch--unselected";
  })(CssClasses || (CssClasses = {}));
  var Selectors;
  (function(Selectors2) {
    Selectors2["RIPPLE"] = ".mdc-switch__ripple";
  })(Selectors || (Selectors = {}));

  // node_modules/@material/switch/foundation.js
  var MDCSwitchFoundation = (
    /** @class */
    function(_super) {
      __extends(MDCSwitchFoundation2, _super);
      function MDCSwitchFoundation2(adapter) {
        var _this = _super.call(this, adapter) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
      }
      MDCSwitchFoundation2.prototype.init = function() {
        this.observe(this.adapter.state, {
          disabled: this.stopProcessingIfDisabled,
          processing: this.stopProcessingIfDisabled
        });
      };
      MDCSwitchFoundation2.prototype.handleClick = function() {
        if (this.adapter.state.disabled) {
          return;
        }
        this.adapter.state.selected = !this.adapter.state.selected;
      };
      MDCSwitchFoundation2.prototype.stopProcessingIfDisabled = function() {
        if (this.adapter.state.disabled) {
          this.adapter.state.processing = false;
        }
      };
      return MDCSwitchFoundation2;
    }(MDCObserverFoundation)
  );
  var MDCSwitchRenderFoundation = (
    /** @class */
    function(_super) {
      __extends(MDCSwitchRenderFoundation2, _super);
      function MDCSwitchRenderFoundation2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      MDCSwitchRenderFoundation2.prototype.init = function() {
        _super.prototype.init.call(this);
        this.observe(this.adapter.state, {
          disabled: this.onDisabledChange,
          processing: this.onProcessingChange,
          selected: this.onSelectedChange
        });
      };
      MDCSwitchRenderFoundation2.prototype.initFromDOM = function() {
        this.setObserversEnabled(this.adapter.state, false);
        this.adapter.state.selected = this.adapter.hasClass(CssClasses.SELECTED);
        this.onSelectedChange();
        this.adapter.state.disabled = this.adapter.isDisabled();
        this.adapter.state.processing = this.adapter.hasClass(CssClasses.PROCESSING);
        this.setObserversEnabled(this.adapter.state, true);
        this.stopProcessingIfDisabled();
      };
      MDCSwitchRenderFoundation2.prototype.onDisabledChange = function() {
        this.adapter.setDisabled(this.adapter.state.disabled);
      };
      MDCSwitchRenderFoundation2.prototype.onProcessingChange = function() {
        this.toggleClass(this.adapter.state.processing, CssClasses.PROCESSING);
      };
      MDCSwitchRenderFoundation2.prototype.onSelectedChange = function() {
        this.adapter.setAriaChecked(String(this.adapter.state.selected));
        this.toggleClass(this.adapter.state.selected, CssClasses.SELECTED);
        this.toggleClass(!this.adapter.state.selected, CssClasses.UNSELECTED);
      };
      MDCSwitchRenderFoundation2.prototype.toggleClass = function(addClass, className) {
        if (addClass) {
          this.adapter.addClass(className);
        } else {
          this.adapter.removeClass(className);
        }
      };
      return MDCSwitchRenderFoundation2;
    }(MDCSwitchFoundation)
  );

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/css-tag.js
  var t14 = window;
  var e29 = t14.ShadowRoot && (void 0 === t14.ShadyCSS || t14.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s16 = Symbol();
  var n27 = /* @__PURE__ */ new WeakMap();
  var o24 = class {
    constructor(t17, e33, n31) {
      if (this._$cssResult$ = true, n31 !== s16)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t17, this.t = e33;
    }
    get styleSheet() {
      let t17 = this.o;
      const s20 = this.t;
      if (e29 && void 0 === t17) {
        const e33 = void 0 !== s20 && 1 === s20.length;
        e33 && (t17 = n27.get(s20)), void 0 === t17 && ((this.o = t17 = new CSSStyleSheet()).replaceSync(this.cssText), e33 && n27.set(s20, t17));
      }
      return t17;
    }
    toString() {
      return this.cssText;
    }
  };
  var r15 = (t17) => new o24("string" == typeof t17 ? t17 : t17 + "", void 0, s16);
  var i20 = (t17, ...e33) => {
    const n31 = 1 === t17.length ? t17[0] : e33.reduce((e34, s20, n32) => e34 + ((t18) => {
      if (true === t18._$cssResult$)
        return t18.cssText;
      if ("number" == typeof t18)
        return t18;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t18 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s20) + t17[n32 + 1], t17[0]);
    return new o24(n31, t17, s16);
  };
  var S9 = (s20, n31) => {
    e29 ? s20.adoptedStyleSheets = n31.map((t17) => t17 instanceof CSSStyleSheet ? t17 : t17.styleSheet) : n31.forEach((e33) => {
      const n32 = document.createElement("style"), o29 = t14.litNonce;
      void 0 !== o29 && n32.setAttribute("nonce", o29), n32.textContent = e33.cssText, s20.appendChild(n32);
    });
  };
  var c10 = e29 ? (t17) => t17 : (t17) => t17 instanceof CSSStyleSheet ? ((t18) => {
    let e33 = "";
    for (const s20 of t18.cssRules)
      e33 += s20.cssText;
    return r15(e33);
  })(t17) : t17;

  // node_modules/@material/mwc-switch/node_modules/@lit/reactive-element/reactive-element.js
  var s17;
  var e30 = window;
  var r16 = e30.trustedTypes;
  var h9 = r16 ? r16.emptyScript : "";
  var o25 = e30.reactiveElementPolyfillSupport;
  var n28 = { toAttribute(t17, i23) {
    switch (i23) {
      case Boolean:
        t17 = t17 ? h9 : null;
        break;
      case Object:
      case Array:
        t17 = null == t17 ? t17 : JSON.stringify(t17);
    }
    return t17;
  }, fromAttribute(t17, i23) {
    let s20 = t17;
    switch (i23) {
      case Boolean:
        s20 = null !== t17;
        break;
      case Number:
        s20 = null === t17 ? null : Number(t17);
        break;
      case Object:
      case Array:
        try {
          s20 = JSON.parse(t17);
        } catch (t18) {
          s20 = null;
        }
    }
    return s20;
  } };
  var a9 = (t17, i23) => i23 !== t17 && (i23 == i23 || t17 == t17);
  var l16 = { attribute: true, type: String, converter: n28, reflect: false, hasChanged: a9 };
  var d9 = "finalized";
  var u9 = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
    }
    static addInitializer(t17) {
      var i23;
      this.finalize(), (null !== (i23 = this.h) && void 0 !== i23 ? i23 : this.h = []).push(t17);
    }
    static get observedAttributes() {
      this.finalize();
      const t17 = [];
      return this.elementProperties.forEach((i23, s20) => {
        const e33 = this._$Ep(s20, i23);
        void 0 !== e33 && (this._$Ev.set(e33, s20), t17.push(e33));
      }), t17;
    }
    static createProperty(t17, i23 = l16) {
      if (i23.state && (i23.attribute = false), this.finalize(), this.elementProperties.set(t17, i23), !i23.noAccessor && !this.prototype.hasOwnProperty(t17)) {
        const s20 = "symbol" == typeof t17 ? Symbol() : "__" + t17, e33 = this.getPropertyDescriptor(t17, s20, i23);
        void 0 !== e33 && Object.defineProperty(this.prototype, t17, e33);
      }
    }
    static getPropertyDescriptor(t17, i23, s20) {
      return { get() {
        return this[i23];
      }, set(e33) {
        const r18 = this[t17];
        this[i23] = e33, this.requestUpdate(t17, r18, s20);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t17) {
      return this.elementProperties.get(t17) || l16;
    }
    static finalize() {
      if (this.hasOwnProperty(d9))
        return false;
      this[d9] = true;
      const t17 = Object.getPrototypeOf(this);
      if (t17.finalize(), void 0 !== t17.h && (this.h = [...t17.h]), this.elementProperties = new Map(t17.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t18 = this.properties, i23 = [...Object.getOwnPropertyNames(t18), ...Object.getOwnPropertySymbols(t18)];
        for (const s20 of i23)
          this.createProperty(s20, t18[s20]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i23) {
      const s20 = [];
      if (Array.isArray(i23)) {
        const e33 = new Set(i23.flat(1 / 0).reverse());
        for (const i24 of e33)
          s20.unshift(c10(i24));
      } else
        void 0 !== i23 && s20.push(c10(i23));
      return s20;
    }
    static _$Ep(t17, i23) {
      const s20 = i23.attribute;
      return false === s20 ? void 0 : "string" == typeof s20 ? s20 : "string" == typeof t17 ? t17.toLowerCase() : void 0;
    }
    _$Eu() {
      var t17;
      this._$E_ = new Promise((t18) => this.enableUpdating = t18), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t17 = this.constructor.h) || void 0 === t17 || t17.forEach((t18) => t18(this));
    }
    addController(t17) {
      var i23, s20;
      (null !== (i23 = this._$ES) && void 0 !== i23 ? i23 : this._$ES = []).push(t17), void 0 !== this.renderRoot && this.isConnected && (null === (s20 = t17.hostConnected) || void 0 === s20 || s20.call(t17));
    }
    removeController(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.splice(this._$ES.indexOf(t17) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t17, i23) => {
        this.hasOwnProperty(i23) && (this._$Ei.set(i23, this[i23]), delete this[i23]);
      });
    }
    createRenderRoot() {
      var t17;
      const s20 = null !== (t17 = this.shadowRoot) && void 0 !== t17 ? t17 : this.attachShadow(this.constructor.shadowRootOptions);
      return S9(s20, this.constructor.elementStyles), s20;
    }
    connectedCallback() {
      var t17;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostConnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    enableUpdating(t17) {
    }
    disconnectedCallback() {
      var t17;
      null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
        var i23;
        return null === (i23 = t18.hostDisconnected) || void 0 === i23 ? void 0 : i23.call(t18);
      });
    }
    attributeChangedCallback(t17, i23, s20) {
      this._$AK(t17, s20);
    }
    _$EO(t17, i23, s20 = l16) {
      var e33;
      const r18 = this.constructor._$Ep(t17, s20);
      if (void 0 !== r18 && true === s20.reflect) {
        const h11 = (void 0 !== (null === (e33 = s20.converter) || void 0 === e33 ? void 0 : e33.toAttribute) ? s20.converter : n28).toAttribute(i23, s20.type);
        this._$El = t17, null == h11 ? this.removeAttribute(r18) : this.setAttribute(r18, h11), this._$El = null;
      }
    }
    _$AK(t17, i23) {
      var s20;
      const e33 = this.constructor, r18 = e33._$Ev.get(t17);
      if (void 0 !== r18 && this._$El !== r18) {
        const t18 = e33.getPropertyOptions(r18), h11 = "function" == typeof t18.converter ? { fromAttribute: t18.converter } : void 0 !== (null === (s20 = t18.converter) || void 0 === s20 ? void 0 : s20.fromAttribute) ? t18.converter : n28;
        this._$El = r18, this[r18] = h11.fromAttribute(i23, t18.type), this._$El = null;
      }
    }
    requestUpdate(t17, i23, s20) {
      let e33 = true;
      void 0 !== t17 && (((s20 = s20 || this.constructor.getPropertyOptions(t17)).hasChanged || a9)(this[t17], i23) ? (this._$AL.has(t17) || this._$AL.set(t17, i23), true === s20.reflect && this._$El !== t17 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t17, s20))) : e33 = false), !this.isUpdatePending && e33 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t18) {
        Promise.reject(t18);
      }
      const t17 = this.scheduleUpdate();
      return null != t17 && await t17, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t17;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t18, i24) => this[i24] = t18), this._$Ei = void 0);
      let i23 = false;
      const s20 = this._$AL;
      try {
        i23 = this.shouldUpdate(s20), i23 ? (this.willUpdate(s20), null === (t17 = this._$ES) || void 0 === t17 || t17.forEach((t18) => {
          var i24;
          return null === (i24 = t18.hostUpdate) || void 0 === i24 ? void 0 : i24.call(t18);
        }), this.update(s20)) : this._$Ek();
      } catch (t18) {
        throw i23 = false, this._$Ek(), t18;
      }
      i23 && this._$AE(s20);
    }
    willUpdate(t17) {
    }
    _$AE(t17) {
      var i23;
      null === (i23 = this._$ES) || void 0 === i23 || i23.forEach((t18) => {
        var i24;
        return null === (i24 = t18.hostUpdated) || void 0 === i24 ? void 0 : i24.call(t18);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t17)), this.updated(t17);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t17) {
      return true;
    }
    update(t17) {
      void 0 !== this._$EC && (this._$EC.forEach((t18, i23) => this._$EO(i23, this[i23], t18)), this._$EC = void 0), this._$Ek();
    }
    updated(t17) {
    }
    firstUpdated(t17) {
    }
  };
  u9[d9] = true, u9.elementProperties = /* @__PURE__ */ new Map(), u9.elementStyles = [], u9.shadowRootOptions = { mode: "open" }, null == o25 || o25({ ReactiveElement: u9 }), (null !== (s17 = e30.reactiveElementVersions) && void 0 !== s17 ? s17 : e30.reactiveElementVersions = []).push("1.6.3");

  // node_modules/@material/mwc-switch/node_modules/lit-html/lit-html.js
  var t15;
  var i21 = window;
  var s18 = i21.trustedTypes;
  var e31 = s18 ? s18.createPolicy("lit-html", { createHTML: (t17) => t17 }) : void 0;
  var o26 = "$lit$";
  var n29 = `lit$${(Math.random() + "").slice(9)}$`;
  var l17 = "?" + n29;
  var h10 = `<${l17}>`;
  var r17 = document;
  var u10 = () => r17.createComment("");
  var d10 = (t17) => null === t17 || "object" != typeof t17 && "function" != typeof t17;
  var c11 = Array.isArray;
  var v5 = (t17) => c11(t17) || "function" == typeof (null == t17 ? void 0 : t17[Symbol.iterator]);
  var a10 = "[ 	\n\f\r]";
  var f6 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _18 = /-->/g;
  var m5 = />/g;
  var p6 = RegExp(`>|${a10}(?:([^\\s"'>=/]+)(${a10}*=${a10}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g5 = /'/g;
  var $5 = /"/g;
  var y6 = /^(?:script|style|textarea|title)$/i;
  var w5 = (t17) => (i23, ...s20) => ({ _$litType$: t17, strings: i23, values: s20 });
  var x5 = w5(1);
  var b6 = w5(2);
  var T5 = Symbol.for("lit-noChange");
  var A5 = Symbol.for("lit-nothing");
  var E5 = /* @__PURE__ */ new WeakMap();
  var C5 = r17.createTreeWalker(r17, 129, null, false);
  function P5(t17, i23) {
    if (!Array.isArray(t17) || !t17.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e31 ? e31.createHTML(i23) : i23;
  }
  var V5 = (t17, i23) => {
    const s20 = t17.length - 1, e33 = [];
    let l20, r18 = 2 === i23 ? "<svg>" : "", u11 = f6;
    for (let i24 = 0; i24 < s20; i24++) {
      const s21 = t17[i24];
      let d11, c12, v6 = -1, a11 = 0;
      for (; a11 < s21.length && (u11.lastIndex = a11, c12 = u11.exec(s21), null !== c12); )
        a11 = u11.lastIndex, u11 === f6 ? "!--" === c12[1] ? u11 = _18 : void 0 !== c12[1] ? u11 = m5 : void 0 !== c12[2] ? (y6.test(c12[2]) && (l20 = RegExp("</" + c12[2], "g")), u11 = p6) : void 0 !== c12[3] && (u11 = p6) : u11 === p6 ? ">" === c12[0] ? (u11 = null != l20 ? l20 : f6, v6 = -1) : void 0 === c12[1] ? v6 = -2 : (v6 = u11.lastIndex - c12[2].length, d11 = c12[1], u11 = void 0 === c12[3] ? p6 : '"' === c12[3] ? $5 : g5) : u11 === $5 || u11 === g5 ? u11 = p6 : u11 === _18 || u11 === m5 ? u11 = f6 : (u11 = p6, l20 = void 0);
      const w6 = u11 === p6 && t17[i24 + 1].startsWith("/>") ? " " : "";
      r18 += u11 === f6 ? s21 + h10 : v6 >= 0 ? (e33.push(d11), s21.slice(0, v6) + o26 + s21.slice(v6) + n29 + w6) : s21 + n29 + (-2 === v6 ? (e33.push(void 0), i24) : w6);
    }
    return [P5(t17, r18 + (t17[s20] || "<?>") + (2 === i23 ? "</svg>" : "")), e33];
  };
  var N5 = class _N {
    constructor({ strings: t17, _$litType$: i23 }, e33) {
      let h11;
      this.parts = [];
      let r18 = 0, d11 = 0;
      const c12 = t17.length - 1, v6 = this.parts, [a11, f7] = V5(t17, i23);
      if (this.el = _N.createElement(a11, e33), C5.currentNode = this.el.content, 2 === i23) {
        const t18 = this.el.content, i24 = t18.firstChild;
        i24.remove(), t18.append(...i24.childNodes);
      }
      for (; null !== (h11 = C5.nextNode()) && v6.length < c12; ) {
        if (1 === h11.nodeType) {
          if (h11.hasAttributes()) {
            const t18 = [];
            for (const i24 of h11.getAttributeNames())
              if (i24.endsWith(o26) || i24.startsWith(n29)) {
                const s20 = f7[d11++];
                if (t18.push(i24), void 0 !== s20) {
                  const t19 = h11.getAttribute(s20.toLowerCase() + o26).split(n29), i25 = /([.?@])?(.*)/.exec(s20);
                  v6.push({ type: 1, index: r18, name: i25[2], strings: t19, ctor: "." === i25[1] ? H5 : "?" === i25[1] ? L5 : "@" === i25[1] ? z4 : k7 });
                } else
                  v6.push({ type: 6, index: r18 });
              }
            for (const i24 of t18)
              h11.removeAttribute(i24);
          }
          if (y6.test(h11.tagName)) {
            const t18 = h11.textContent.split(n29), i24 = t18.length - 1;
            if (i24 > 0) {
              h11.textContent = s18 ? s18.emptyScript : "";
              for (let s20 = 0; s20 < i24; s20++)
                h11.append(t18[s20], u10()), C5.nextNode(), v6.push({ type: 2, index: ++r18 });
              h11.append(t18[i24], u10());
            }
          }
        } else if (8 === h11.nodeType)
          if (h11.data === l17)
            v6.push({ type: 2, index: r18 });
          else {
            let t18 = -1;
            for (; -1 !== (t18 = h11.data.indexOf(n29, t18 + 1)); )
              v6.push({ type: 7, index: r18 }), t18 += n29.length - 1;
          }
        r18++;
      }
    }
    static createElement(t17, i23) {
      const s20 = r17.createElement("template");
      return s20.innerHTML = t17, s20;
    }
  };
  function S10(t17, i23, s20 = t17, e33) {
    var o29, n31, l20, h11;
    if (i23 === T5)
      return i23;
    let r18 = void 0 !== e33 ? null === (o29 = s20._$Co) || void 0 === o29 ? void 0 : o29[e33] : s20._$Cl;
    const u11 = d10(i23) ? void 0 : i23._$litDirective$;
    return (null == r18 ? void 0 : r18.constructor) !== u11 && (null === (n31 = null == r18 ? void 0 : r18._$AO) || void 0 === n31 || n31.call(r18, false), void 0 === u11 ? r18 = void 0 : (r18 = new u11(t17), r18._$AT(t17, s20, e33)), void 0 !== e33 ? (null !== (l20 = (h11 = s20)._$Co) && void 0 !== l20 ? l20 : h11._$Co = [])[e33] = r18 : s20._$Cl = r18), void 0 !== r18 && (i23 = S10(t17, r18._$AS(t17, i23.values), r18, e33)), i23;
  }
  var M5 = class {
    constructor(t17, i23) {
      this._$AV = [], this._$AN = void 0, this._$AD = t17, this._$AM = i23;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t17) {
      var i23;
      const { el: { content: s20 }, parts: e33 } = this._$AD, o29 = (null !== (i23 = null == t17 ? void 0 : t17.creationScope) && void 0 !== i23 ? i23 : r17).importNode(s20, true);
      C5.currentNode = o29;
      let n31 = C5.nextNode(), l20 = 0, h11 = 0, u11 = e33[0];
      for (; void 0 !== u11; ) {
        if (l20 === u11.index) {
          let i24;
          2 === u11.type ? i24 = new R5(n31, n31.nextSibling, this, t17) : 1 === u11.type ? i24 = new u11.ctor(n31, u11.name, u11.strings, this, t17) : 6 === u11.type && (i24 = new Z5(n31, this, t17)), this._$AV.push(i24), u11 = e33[++h11];
        }
        l20 !== (null == u11 ? void 0 : u11.index) && (n31 = C5.nextNode(), l20++);
      }
      return C5.currentNode = r17, o29;
    }
    v(t17) {
      let i23 = 0;
      for (const s20 of this._$AV)
        void 0 !== s20 && (void 0 !== s20.strings ? (s20._$AI(t17, s20, i23), i23 += s20.strings.length - 2) : s20._$AI(t17[i23])), i23++;
    }
  };
  var R5 = class _R {
    constructor(t17, i23, s20, e33) {
      var o29;
      this.type = 2, this._$AH = A5, this._$AN = void 0, this._$AA = t17, this._$AB = i23, this._$AM = s20, this.options = e33, this._$Cp = null === (o29 = null == e33 ? void 0 : e33.isConnected) || void 0 === o29 || o29;
    }
    get _$AU() {
      var t17, i23;
      return null !== (i23 = null === (t17 = this._$AM) || void 0 === t17 ? void 0 : t17._$AU) && void 0 !== i23 ? i23 : this._$Cp;
    }
    get parentNode() {
      let t17 = this._$AA.parentNode;
      const i23 = this._$AM;
      return void 0 !== i23 && 11 === (null == t17 ? void 0 : t17.nodeType) && (t17 = i23.parentNode), t17;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t17, i23 = this) {
      t17 = S10(this, t17, i23), d10(t17) ? t17 === A5 || null == t17 || "" === t17 ? (this._$AH !== A5 && this._$AR(), this._$AH = A5) : t17 !== this._$AH && t17 !== T5 && this._(t17) : void 0 !== t17._$litType$ ? this.g(t17) : void 0 !== t17.nodeType ? this.$(t17) : v5(t17) ? this.T(t17) : this._(t17);
    }
    k(t17) {
      return this._$AA.parentNode.insertBefore(t17, this._$AB);
    }
    $(t17) {
      this._$AH !== t17 && (this._$AR(), this._$AH = this.k(t17));
    }
    _(t17) {
      this._$AH !== A5 && d10(this._$AH) ? this._$AA.nextSibling.data = t17 : this.$(r17.createTextNode(t17)), this._$AH = t17;
    }
    g(t17) {
      var i23;
      const { values: s20, _$litType$: e33 } = t17, o29 = "number" == typeof e33 ? this._$AC(t17) : (void 0 === e33.el && (e33.el = N5.createElement(P5(e33.h, e33.h[0]), this.options)), e33);
      if ((null === (i23 = this._$AH) || void 0 === i23 ? void 0 : i23._$AD) === o29)
        this._$AH.v(s20);
      else {
        const t18 = new M5(o29, this), i24 = t18.u(this.options);
        t18.v(s20), this.$(i24), this._$AH = t18;
      }
    }
    _$AC(t17) {
      let i23 = E5.get(t17.strings);
      return void 0 === i23 && E5.set(t17.strings, i23 = new N5(t17)), i23;
    }
    T(t17) {
      c11(this._$AH) || (this._$AH = [], this._$AR());
      const i23 = this._$AH;
      let s20, e33 = 0;
      for (const o29 of t17)
        e33 === i23.length ? i23.push(s20 = new _R(this.k(u10()), this.k(u10()), this, this.options)) : s20 = i23[e33], s20._$AI(o29), e33++;
      e33 < i23.length && (this._$AR(s20 && s20._$AB.nextSibling, e33), i23.length = e33);
    }
    _$AR(t17 = this._$AA.nextSibling, i23) {
      var s20;
      for (null === (s20 = this._$AP) || void 0 === s20 || s20.call(this, false, true, i23); t17 && t17 !== this._$AB; ) {
        const i24 = t17.nextSibling;
        t17.remove(), t17 = i24;
      }
    }
    setConnected(t17) {
      var i23;
      void 0 === this._$AM && (this._$Cp = t17, null === (i23 = this._$AP) || void 0 === i23 || i23.call(this, t17));
    }
  };
  var k7 = class {
    constructor(t17, i23, s20, e33, o29) {
      this.type = 1, this._$AH = A5, this._$AN = void 0, this.element = t17, this.name = i23, this._$AM = e33, this.options = o29, s20.length > 2 || "" !== s20[0] || "" !== s20[1] ? (this._$AH = Array(s20.length - 1).fill(new String()), this.strings = s20) : this._$AH = A5;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17, i23 = this, s20, e33) {
      const o29 = this.strings;
      let n31 = false;
      if (void 0 === o29)
        t17 = S10(this, t17, i23, 0), n31 = !d10(t17) || t17 !== this._$AH && t17 !== T5, n31 && (this._$AH = t17);
      else {
        const e34 = t17;
        let l20, h11;
        for (t17 = o29[0], l20 = 0; l20 < o29.length - 1; l20++)
          h11 = S10(this, e34[s20 + l20], i23, l20), h11 === T5 && (h11 = this._$AH[l20]), n31 || (n31 = !d10(h11) || h11 !== this._$AH[l20]), h11 === A5 ? t17 = A5 : t17 !== A5 && (t17 += (null != h11 ? h11 : "") + o29[l20 + 1]), this._$AH[l20] = h11;
      }
      n31 && !e33 && this.j(t17);
    }
    j(t17) {
      t17 === A5 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t17 ? t17 : "");
    }
  };
  var H5 = class extends k7 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t17) {
      this.element[this.name] = t17 === A5 ? void 0 : t17;
    }
  };
  var I5 = s18 ? s18.emptyScript : "";
  var L5 = class extends k7 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t17) {
      t17 && t17 !== A5 ? this.element.setAttribute(this.name, I5) : this.element.removeAttribute(this.name);
    }
  };
  var z4 = class extends k7 {
    constructor(t17, i23, s20, e33, o29) {
      super(t17, i23, s20, e33, o29), this.type = 5;
    }
    _$AI(t17, i23 = this) {
      var s20;
      if ((t17 = null !== (s20 = S10(this, t17, i23, 0)) && void 0 !== s20 ? s20 : A5) === T5)
        return;
      const e33 = this._$AH, o29 = t17 === A5 && e33 !== A5 || t17.capture !== e33.capture || t17.once !== e33.once || t17.passive !== e33.passive, n31 = t17 !== A5 && (e33 === A5 || o29);
      o29 && this.element.removeEventListener(this.name, this, e33), n31 && this.element.addEventListener(this.name, this, t17), this._$AH = t17;
    }
    handleEvent(t17) {
      var i23, s20;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s20 = null === (i23 = this.options) || void 0 === i23 ? void 0 : i23.host) && void 0 !== s20 ? s20 : this.element, t17) : this._$AH.handleEvent(t17);
    }
  };
  var Z5 = class {
    constructor(t17, i23, s20) {
      this.element = t17, this.type = 6, this._$AN = void 0, this._$AM = i23, this.options = s20;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t17) {
      S10(this, t17);
    }
  };
  var B4 = i21.litHtmlPolyfillSupport;
  null == B4 || B4(N5, R5), (null !== (t15 = i21.litHtmlVersions) && void 0 !== t15 ? t15 : i21.litHtmlVersions = []).push("2.8.0");
  var D4 = (t17, i23, s20) => {
    var e33, o29;
    const n31 = null !== (e33 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== e33 ? e33 : i23;
    let l20 = n31._$litPart$;
    if (void 0 === l20) {
      const t18 = null !== (o29 = null == s20 ? void 0 : s20.renderBefore) && void 0 !== o29 ? o29 : null;
      n31._$litPart$ = l20 = new R5(i23.insertBefore(u10(), t18), t18, void 0, null != s20 ? s20 : {});
    }
    return l20._$AI(t17), l20;
  };

  // node_modules/@material/mwc-switch/node_modules/lit-element/lit-element.js
  var l18;
  var o27;
  var s19 = class extends u9 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t17, e33;
      const i23 = super.createRenderRoot();
      return null !== (t17 = (e33 = this.renderOptions).renderBefore) && void 0 !== t17 || (e33.renderBefore = i23.firstChild), i23;
    }
    update(t17) {
      const i23 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t17), this._$Do = D4(i23, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t17;
      super.connectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(true);
    }
    disconnectedCallback() {
      var t17;
      super.disconnectedCallback(), null === (t17 = this._$Do) || void 0 === t17 || t17.setConnected(false);
    }
    render() {
      return T5;
    }
  };
  s19.finalized = true, s19._$litElement$ = true, null === (l18 = globalThis.litElementHydrateSupport) || void 0 === l18 || l18.call(globalThis, { LitElement: s19 });
  var n30 = globalThis.litElementPolyfillSupport;
  null == n30 || n30({ LitElement: s19 });
  (null !== (o27 = globalThis.litElementVersions) && void 0 !== o27 ? o27 : globalThis.litElementVersions = []).push("3.3.3");

  // node_modules/@material/mwc-switch/node_modules/lit-html/directive.js
  var t16 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e32 = (t17) => (...e33) => ({ _$litDirective$: t17, values: e33 });
  var i22 = class {
    constructor(t17) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t17, e33, i23) {
      this._$Ct = t17, this._$AM = e33, this._$Ci = i23;
    }
    _$AS(t17, e33) {
      return this.update(t17, e33);
    }
    update(t17, e33) {
      return this.render(...e33);
    }
  };

  // node_modules/@material/mwc-switch/node_modules/lit-html/directives/class-map.js
  var o28 = e32(class extends i22 {
    constructor(t17) {
      var i23;
      if (super(t17), t17.type !== t16.ATTRIBUTE || "class" !== t17.name || (null === (i23 = t17.strings) || void 0 === i23 ? void 0 : i23.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t17) {
      return " " + Object.keys(t17).filter((i23) => t17[i23]).join(" ") + " ";
    }
    update(i23, [s20]) {
      var r18, o29;
      if (void 0 === this.it) {
        this.it = /* @__PURE__ */ new Set(), void 0 !== i23.strings && (this.nt = new Set(i23.strings.join(" ").split(/\s/).filter((t17) => "" !== t17)));
        for (const t17 in s20)
          s20[t17] && !(null === (r18 = this.nt) || void 0 === r18 ? void 0 : r18.has(t17)) && this.it.add(t17);
        return this.render(s20);
      }
      const e33 = i23.element.classList;
      this.it.forEach((t17) => {
        t17 in s20 || (e33.remove(t17), this.it.delete(t17));
      });
      for (const t17 in s20) {
        const i24 = !!s20[t17];
        i24 === this.it.has(t17) || (null === (o29 = this.nt) || void 0 === o29 ? void 0 : o29.has(t17)) || (i24 ? (e33.add(t17), this.it.add(t17)) : (e33.remove(t17), this.it.delete(t17)));
      }
      return T5;
    }
  });

  // node_modules/@material/mwc-switch/node_modules/lit-html/directives/if-defined.js
  var l19 = (l20) => null != l20 ? l20 : A5;

  // node_modules/@material/mwc-switch/mwc-switch-base.js
  var SwitchBase = class extends FormElement {
    constructor() {
      super(...arguments);
      this.processing = false;
      this.selected = false;
      this.ariaLabel = "";
      this.ariaLabelledBy = "";
      this.shouldRenderRipple = false;
      this.rippleHandlers = new RippleHandlers(() => {
        this.shouldRenderRipple = true;
        return this.ripple;
      });
      this.name = "";
      this.value = "on";
      this.mdcFoundationClass = MDCSwitchFoundation;
    }
    setFormData(formData) {
      if (this.name && this.selected) {
        formData.append(this.name, this.value);
      }
    }
    click() {
      var _a2, _b2;
      if (this.disabled) {
        return;
      }
      (_a2 = this.mdcRoot) === null || _a2 === void 0 ? void 0 : _a2.focus();
      (_b2 = this.mdcRoot) === null || _b2 === void 0 ? void 0 : _b2.click();
    }
    /** @soyTemplate */
    render() {
      return x5`
      <button
        type="button"
        class="mdc-switch ${o28(this.getRenderClasses())}"
        role="switch"
        aria-checked="${this.selected}"
        aria-label="${l19(this.ariaLabel || void 0)}"
        aria-labelledby="${l19(this.ariaLabelledBy || void 0)}"
        .disabled=${this.disabled}
        @click=${this.handleClick}
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        @pointerup="${this.handlePointerUp}"
        @pointerenter="${this.handlePointerEnter}"
        @pointerleave="${this.handlePointerLeave}"
      >
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__handle-track">
          ${this.renderHandle()}
        </div>
      </button>

      <input
        type="checkbox"
        aria-hidden="true"
        name="${this.name}"
        .checked=${this.selected}
        .value=${this.value}
      >
    `;
    }
    /** @soyTemplate */
    getRenderClasses() {
      return {
        "mdc-switch--processing": this.processing,
        "mdc-switch--selected": this.selected,
        "mdc-switch--unselected": !this.selected
      };
    }
    /** @soyTemplate */
    renderHandle() {
      return x5`
      <div class="mdc-switch__handle">
        ${this.renderShadow()}
        ${this.renderRipple()}
        <div class="mdc-switch__icons">
          ${this.renderOnIcon()}
          ${this.renderOffIcon()}
        </div>
      </div>
    `;
    }
    /** @soyTemplate */
    renderShadow() {
      return x5`
      <div class="mdc-switch__shadow">
        <div class="mdc-elevation-overlay"></div>
      </div>
    `;
    }
    /** @soyTemplate */
    renderRipple() {
      if (this.shouldRenderRipple) {
        return x5`
        <div class="mdc-switch__ripple">
          <mwc-ripple
            internalUseStateLayerCustomProperties
            .disabled="${this.disabled}"
            unbounded>
          </mwc-ripple>
        </div>
      `;
      } else {
        return x5``;
      }
    }
    /** @soyTemplate */
    renderOnIcon() {
      return x5`
      <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
      </svg>
    `;
    }
    /** @soyTemplate */
    renderOffIcon() {
      return x5`
      <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
        <path d="M20 13H4v-2h16v2z" />
      </svg>
    `;
    }
    handleClick() {
      var _a2;
      (_a2 = this.mdcFoundation) === null || _a2 === void 0 ? void 0 : _a2.handleClick();
    }
    handleFocus() {
      this.rippleHandlers.startFocus();
    }
    handleBlur() {
      this.rippleHandlers.endFocus();
    }
    handlePointerDown(event) {
      event.target.setPointerCapture(event.pointerId);
      this.rippleHandlers.startPress(event);
    }
    handlePointerUp() {
      this.rippleHandlers.endPress();
    }
    handlePointerEnter() {
      this.rippleHandlers.startHover();
    }
    handlePointerLeave() {
      this.rippleHandlers.endHover();
    }
    createAdapter() {
      return { state: this };
    }
  };
  __decorate([
    n12({ type: Boolean })
  ], SwitchBase.prototype, "processing", void 0);
  __decorate([
    n12({ type: Boolean })
  ], SwitchBase.prototype, "selected", void 0);
  __decorate([
    ariaProperty,
    n12({ type: String, attribute: "aria-label" })
  ], SwitchBase.prototype, "ariaLabel", void 0);
  __decorate([
    ariaProperty,
    n12({ type: String, attribute: "aria-labelledby" })
  ], SwitchBase.prototype, "ariaLabelledBy", void 0);
  __decorate([
    e15("mwc-ripple")
  ], SwitchBase.prototype, "ripple", void 0);
  __decorate([
    t7()
  ], SwitchBase.prototype, "shouldRenderRipple", void 0);
  __decorate([
    n12({ type: String, reflect: true })
  ], SwitchBase.prototype, "name", void 0);
  __decorate([
    n12({ type: String })
  ], SwitchBase.prototype, "value", void 0);
  __decorate([
    i10("input")
  ], SwitchBase.prototype, "formElement", void 0);
  __decorate([
    i10(".mdc-switch")
  ], SwitchBase.prototype, "mdcRoot", void 0);
  __decorate([
    e14({ passive: true })
  ], SwitchBase.prototype, "handlePointerDown", null);

  // node_modules/@material/mwc-switch/styles.css.js
  var styles13 = i20`.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}:host{display:inline-flex;outline:none}input{display:none}.mdc-switch{width:36px;width:var(--mdc-switch-track-width, 36px)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:#6200ee;background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161;background:var(--mdc-switch-unselected-handle-color, #616161)}.mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mdc-switch .mdc-switch__handle::before{background:#fff;background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mdc-switch:enabled .mdc-switch__shadow{--mdc-elevation-box-shadow-for-gss:0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-handle-elevation, var(--mdc-elevation-box-shadow-for-gss))}.mdc-switch:disabled .mdc-switch__shadow{--mdc-elevation-box-shadow-for-gss:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-disabled-handle-elevation, var(--mdc-elevation-box-shadow-for-gss))}.mdc-switch .mdc-switch__focus-ring-wrapper,.mdc-switch .mdc-switch__handle{height:20px;height:var(--mdc-switch-handle-height, 20px)}.mdc-switch:disabled .mdc-switch__handle::after{opacity:0.38;opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mdc-switch .mdc-switch__handle{border-radius:10px;border-radius:var(--mdc-switch-handle-shape, 10px)}.mdc-switch .mdc-switch__handle{width:20px;width:var(--mdc-switch-handle-width, 20px)}.mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px);width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;width:var(--mdc-switch-selected-icon-size, 18px);height:18px;height:var(--mdc-switch-selected-icon-size, 18px)}.mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;width:var(--mdc-switch-unselected-icon-size, 18px);height:18px;height:var(--mdc-switch-unselected-icon-size, 18px)}.mdc-switch .mdc-switch__ripple{height:48px;height:var(--mdc-switch-state-layer-size, 48px);width:48px;width:var(--mdc-switch-state-layer-size, 48px)}.mdc-switch .mdc-switch__track{height:14px;height:var(--mdc-switch-track-height, 14px)}.mdc-switch:disabled .mdc-switch__track{opacity:0.12;opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mdc-switch:enabled .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-track-color, #d7bbff)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mdc-switch:enabled:active .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mdc-switch:disabled .mdc-switch__track::after{background:#424242;background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mdc-switch:disabled .mdc-switch__track::before{background:#424242;background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mdc-switch .mdc-switch__track{border-radius:7px;border-radius:var(--mdc-switch-track-shape, 7px)}.mdc-switch.mdc-switch--selected{--mdc-ripple-focus-state-layer-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-focus-state-layer-opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12);--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-hover-state-layer-opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04);--mdc-ripple-pressed-state-layer-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee));--mdc-ripple-pressed-state-layer-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mdc-switch.mdc-switch--selected:enabled:focus:not(:active){--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--selected:enabled:active{--mdc-ripple-hover-state-layer-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mdc-switch.mdc-switch--unselected{--mdc-ripple-focus-state-layer-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242);--mdc-ripple-focus-state-layer-opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12);--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242);--mdc-ripple-hover-state-layer-opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04);--mdc-ripple-pressed-state-layer-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242);--mdc-ripple-pressed-state-layer-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mdc-switch.mdc-switch--unselected:enabled:focus:not(:active){--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mdc-switch.mdc-switch--unselected:enabled:active{--mdc-ripple-hover-state-layer-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-switch:disabled .mdc-switch__handle::after{opacity:1;opacity:var(--mdc-switch-disabled-handle-opacity, 1)}.mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:ButtonText;fill:var(--mdc-switch-selected-icon-color, ButtonText)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:GrayText;fill:var(--mdc-switch-disabled-selected-icon-color, GrayText)}.mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:ButtonText;fill:var(--mdc-switch-unselected-icon-color, ButtonText)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:GrayText;fill:var(--mdc-switch-disabled-unselected-icon-color, GrayText)}.mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:1;opacity:var(--mdc-switch-disabled-selected-icon-opacity, 1)}.mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:1;opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 1)}.mdc-switch:disabled .mdc-switch__track{opacity:1;opacity:var(--mdc-switch-disabled-track-opacity, 1)}}`;

  // node_modules/@material/mwc-switch/mwc-switch.js
  var Switch = class Switch2 extends SwitchBase {
  };
  Switch.styles = [styles13];
  Switch = __decorate([
    e12("mwc-switch")
  ], Switch);

  // client/components/settings.css
  var styles14 = i`#settings-panel {
  background-color: var(--comparator-greygreen-100);
  border-right: 2px solid var(--comparator-greygreen-200);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 0 10px 0 20px;
  width: 184px;
}

.panel-title {
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  margin: 30px 0 20px;
}

.section-title {
  margin-top: 20px;
  font-size: 13px;
  padding: 5px 0;
}

.settings-row {
  display: flex;
  gap: 5px;
  padding: 10px 0;
}

mwc-switch {
  --mdc-switch-selected-handle-color: var(--comparator-greygreen-700);
  --mdc-switch-selected-track-color: var(--comparator-greygreen-300);
  --mdc-switch-selected-hover-handle-color: var(--comparator-greygreen-700);
  --mdc-switch-selected-hover-track-color: var(--comparator-greygreen-300);
  --mdc-switch-selected-focus-handle-color: var(--comparator-greygreen-700);
  --mdc-switch-selected-focus-track-color: var(--comparator-greygreen-300);
  --mdc-switch-selected-pressed-handle-color: var(--comparator-greygreen-700);
  --mdc-switch-selected-pressed-track-color: var(--comparator-greygreen-300);
  /* Hide the ripple effect. */
  --mdc-switch-selected-focus-state-layer-opacity: 0;
  --mdc-switch-selected-hover-state-layer-opacity: 0;
  --mdc-switch-selected-pressed-state-layer-opacity: 0;
  --mdc-switch-unselected-focus-state-layer-opacity: 0;
  --mdc-switch-unselected-hover-state-layer-opacity: 0;
  --mdc-switch-unselected-pressed-state-layer-opacity: 0;
}
`;

  // client/components/settings.ts
  var NumericInput = class extends s3 {
    constructor() {
      super(...arguments);
      this.min = 1;
      this.max = 20;
      this.step = 1;
      this.value = 5;
    }
    render() {
      const onInputChange = (e33) => {
        const { value } = e33.target;
        const numberValue = Number(value);
        if (numberValue < this.min) {
          this.value = this.min;
        } else if (numberValue > this.max) {
          this.value = this.max;
        } else {
          this.value = numberValue;
        }
        this.dispatchEvent(new Event("change"));
      };
      return x` <input
      type="number"
      .min=${this.min.toString()}
      .max=${this.max.toString()}
      .step=${this.step.toString()}
      .value=${this.value.toString()}
      @change=${onInputChange} />`;
    }
  };
  NumericInput.styles = i`
    input {
      width: 40px;
    }
  `;
  __decorateClass([
    n4({ type: Number })
  ], NumericInput.prototype, "min", 2);
  __decorateClass([
    n4({ type: Number })
  ], NumericInput.prototype, "max", 2);
  __decorateClass([
    n4({ type: Number })
  ], NumericInput.prototype, "step", 2);
  __decorateClass([
    n4({ type: Number })
  ], NumericInput.prototype, "value", 2);
  NumericInput = __decorateClass([
    t3("comparator-numeric-input")
  ], NumericInput);
  var ComparatorSettingsElement = class extends MobxLitElement {
    constructor() {
      super(...arguments);
      this.appState = core.getService(AppState);
    }
    static get styles() {
      return [styles, styles14];
    }
    renderMainToggles() {
      const handleChangeRationaleClusterSimilarityThreshold = (e33) => {
        this.appState.rationaleClusterSimilarityThreshold = Number(e33.target.value);
        this.appState.reassignClusters();
      };
      return x` <div class="settings-row">
        <mwc-switch
          id="toggle-highlight-matches"
          ?selected=${this.appState.isShowTextDiff}
          @click=${() => this.appState.isShowTextDiff = !this.appState.isShowTextDiff}>
        </mwc-switch>
        <label for="toggle-highlight-matches">Highlight matches</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-monospace"
          ?selected=${this.appState.useMonospace}
          @click=${() => this.appState.useMonospace = !this.appState.useMonospace}>
        </mwc-switch>
        <label for="toggle-monospace">Use monospace font</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="num-lines-in-cell"
          min="2"
          max="20"
          value="${this.appState.numberOfLinesPerOutputCell}"
          @change=${(e33) => this.appState.numberOfLinesPerOutputCell = Number(
        e33.target.value
      )}>
        </comparator-numeric-input>
        <label for="num-lines-in-cell">lines displayed in cell</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="up-to-num-example"
          min="5"
          max="500"
          value="${this.appState.numExamplesToDisplay}"
          @change=${(e33) => this.appState.numExamplesToDisplay = Number(
        e33.target.value
      )}>
        </comparator-numeric-input>
        <label for="up-to-num-example">examples displayed max</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-show-tag-chips"
          ?selected=${this.appState.isShowTagChips}
          @click=${() => this.appState.isShowTagChips = !this.appState.isShowTagChips}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Show tags on prompts</label>
      </div>

      <div class="settings-row">
        <mwc-switch
          id="toggle-flip-score-histogram-axis"
          ?selected=${this.appState.isFlipScoreHistogramAxis}
          @click=${() => this.appState.isFlipScoreHistogramAxis = !this.appState.isFlipScoreHistogramAxis}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Flip score histogram axis</label>
      </div>

      <div class="settings-row">
        <comparator-numeric-input
          id="win-rate-threshold"
          min="0.0"
          max="5.0"
          step="0.05"
          value="${this.appState.winRateThreshold}"
          @change=${(e33) => this.appState.winRateThreshold = Number(
        e33.target.value
      )}>
        </comparator-numeric-input>
        <label for="win-rate-threshold">score threshold for win rate</label>
      </div>

      ${this.appState.hasRationaleClusters === true ? x`
        <div class="settings-row">
          <comparator-numeric-input
            id="rationale-cluster-similarity-threshold"
            min="0.0"
            max="1.0"
            step="0.05"
            value="${this.appState.rationaleClusterSimilarityThreshold}"
            @change=${handleChangeRationaleClusterSimilarityThreshold}>
          </comparator-numeric-input>
          <label for="rationale-cluster-similarity-threshold">
            similarity threshold for rationale summary
          </label>
        </div>` : x``}

      <div class="settings-row">
        <mwc-switch
          id="toggle-show-sidebar"
          ?selected=${this.appState.isShowSidebar}
          @click=${() => this.appState.isShowSidebar = !this.appState.isShowSidebar}>
        </mwc-switch>
        <label for="toggle-show-sidebar">Show sidebar</label>
      </div>`;
    }
    renderColumnVisibilityToggles() {
      const renderColumnToggle = (field) => x` <div class="settings-row">
        <mwc-switch
          id="toggle-column-${field.id}"
          ?selected=${field.visible}
          @click=${() => field.visible = !field.visible}>
        </mwc-switch>
        <label for="toggle-column-${field.id}">${field.name}</label>
      </div>`;
      return x` <section>
      ${this.appState.columns.map((field) => renderColumnToggle(field))}
    </section>`;
    }
    render() {
      return x`
        <div id="settings-panel">
          <div class="panel-title">
            Settings
            <mwc-icon class="icon" title="Close Settings Panel"
              @click=${() => this.appState.isOpenSettingsPanel = false}>
              close
            </mwc-icon>
          </div>

          <section>
            ${this.renderMainToggles()}
          </section>

          <section>
            <div class="section-title">
              Table Column Visibility
            </div>
            ${this.renderColumnVisibilityToggles()}
          </section>
        </div>`;
    }
  };
  ComparatorSettingsElement = __decorateClass([
    t3("comparator-settings")
  ], ComparatorSettingsElement);

  // client/components/toolbar.css
  var styles15 = i`#toolbar {
  align-items: center;
  background-color: var(--comparator-green-200);
  border-radius: 20px;
  display: flex;
  height: 18px;
  justify-content: space-between;
  margin: 7px 16px 8px 15px;
  overflow-x: clip;
  padding: 6px 12px 4px;
}

.toolbar-item {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin: 0 15px;
}

.toolbar-item input {
  margin-bottom: 0;
  margin-top: 0;
}

.toolbar-item.example-count {
  text-align: right;  /* to make "(N total)" stay in the same pos */
  width: 240px;  /* space for four-digit counts */
}

.toolbar-item.example-count span {
  margin-left: auto;
}

.toolbar-item.filters {
  margin-right: auto;
}

.toolbar-item label {
  margin-right: 3px;
}
`;

  // client/components/toolbar.ts
  var ToolbarElement = class extends MobxLitElement {
    constructor() {
      super(...arguments);
      this.appState = core.getService(AppState);
    }
    static get styles() {
      return [styles, styles15];
    }
    renderFilterChip(label, handleClickCancel) {
      return x` <div class="filter-chip">
      <span>${label}</span>
      <mwc-icon class="chip-cancel-icon" @click=${handleClickCancel}>
        cancel
      </mwc-icon>
    </div>`;
    }
    renderFilterChips() {
      const chipForTag = this.appState.selectedTag != null ? this.renderFilterChip(
        `Categories contain "${this.appState.selectedTag}"`,
        () => {
          this.appState.selectedTag = null;
        }
      ) : "";
      const chipForSearch = Object.entries(this.appState.searchFilters).filter(([fieldId, stringToSearch]) => stringToSearch !== "").map(([fieldId, stringToSearch]) => {
        const field = this.appState.getFieldFromId(fieldId);
        return this.renderFilterChip(
          `${field ? field.name : fieldId} matches "${stringToSearch}"`,
          () => {
            this.appState.resetSearchFilter(fieldId);
          }
        );
      });
      const chipForScore = this.appState.selectedHistogramBinForScores != null ? this.renderFilterChip(
        `${getHistogramFilterLabel(
          "score",
          this.appState.histogramSpecForScores,
          this.appState.selectedHistogramBinForScores
        )}`,
        () => {
          this.appState.selectedHistogramBinForScores = null;
        }
      ) : "";
      const chipsForCustomFuncs = Object.values(
        this.appState.customFunctions
      ).flatMap((customFunc) => {
        const selections = this.appState.selectionsFromCustomFuncResults[customFunc.id];
        return Object.entries(selections).filter(([key, value]) => value != null).map(([key, value]) => {
          const histogramSpec = customFunc.returnType === "Number" /* NUMBER */ ? key === "A-B" ? this.appState.histogramSpecForCustomFuncsOfDiff[customFunc.id] : this.appState.histogramSpecForCustomFuncs[customFunc.id] : null;
          const label = customFunc.returnType === "Boolean" /* BOOLEAN */ ? getBarFilterLabel(
            customFunc.name,
            key,
            selections[key]
          ) : getHistogramFilterLabel(
            customFunc.name,
            histogramSpec,
            selections[key],
            key
          );
          const cancelCallback = () => {
            selections[key] = null;
          };
          return this.renderFilterChip(label, cancelCallback);
        });
      });
      const chipsForHistogramsForCustomFields = this.appState.customFieldsOfNumberType.filter(
        (field) => this.appState.selectedHistogramBinForCustomFields[field.id] != null
      ).map(
        (field) => this.renderFilterChip(
          getHistogramFilterLabel(
            field.name,
            this.appState.histogramSpecForCustomFields[field.id],
            this.appState.selectedHistogramBinForCustomFields[field.id]
          ),
          () => {
            this.appState.selectedHistogramBinForCustomFields[field.id] = null;
          }
        )
      );
      const chipsForSideBySideHistograms = this.appState.customFieldsOfPerModelNumberType.flatMap((field) => {
        const selections = this.appState.selectedHistogramBinForCustomFields[field.id];
        return Object.values(AOrB).filter((model) => selections[model] != null).map((model) => {
          const label = getHistogramFilterLabel(
            field.name,
            this.appState.histogramSpecForCustomFields[field.id],
            selections[model],
            model
          );
          const cancelCallback = () => {
            selections[model] = null;
          };
          return this.renderFilterChip(label, cancelCallback);
        });
      });
      const chipsForBarChartsForCustomFields = this.appState.customFieldsOfCategoryType.filter(
        (field) => this.appState.selectedBarChartValues[field.id][0] != null
      ).map(
        (field) => this.renderFilterChip(
          `${field.name} = "${this.appState.selectedBarChartValues[field.id][0]}"`,
          () => {
            this.appState.selectedBarChartValues[field.id][0] = null;
          }
        )
      );
      const chipsForGroupedBarChartsForCustomFields = this.appState.customFieldsOfPerModelCategoryTypeIncludingPerRating.flatMap(
        (field) => {
          const selection = this.appState.selectedBarChartValues[field.id];
          return Object.values(AOrB).map((model, groupIndex) => [model, groupIndex]).filter(
            ([model, groupIndex]) => selection[groupIndex] != null
          ).map(([model, groupIndex]) => {
            const isPerRating = field.type === "per_rating_per_model_category" /* PER_RATING_PER_MODEL_CATEGORY */;
            const operator = isPerRating === true ? "has" : "=";
            return this.renderFilterChip(
              `${field.name}(${model}) ${operator} "${selection[groupIndex]}"`,
              () => {
                selection[groupIndex] = null;
              }
            );
          });
        }
      );
      const chipForRationaleCluster = this.appState.selectedRationaleClusterId != null ? this.renderFilterChip(
        `Rationale Cluster = "${this.appState.rationaleClusters.filter(
          (cluster) => cluster.id === this.appState.selectedRationaleClusterId
        )[0].title}"`,
        () => {
          this.appState.selectedRationaleClusterId = null;
        }
      ) : "";
      return x` ${chipForTag} ${chipForSearch} ${chipForScore}
    ${chipsForCustomFuncs} ${chipForRationaleCluster}
    ${chipsForHistogramsForCustomFields} ${chipsForSideBySideHistograms}
    ${chipsForBarChartsForCustomFields}
    ${chipsForGroupedBarChartsForCustomFields}`;
    }
    render() {
      const totalNum = this.appState.examples.length;
      const filteredNum = this.appState.filteredExamples.length;
      const shownNum = this.appState.examplesForMainTable.length;
      const renderFilterChips = this.renderFilterChips();
      const isAnyFilter = filteredNum < totalNum;
      const currentSorting = this.appState.currentSorting;
      return x`
      <div id="toolbar">
        <div class="toolbar-item example-count">
          <span>
            ${shownNum} displayed
            ${filteredNum !== totalNum ? x`
                of <strong>${this.appState.filteredExamples.length}</strong>
                filtered` : ""}
            (${totalNum} total)
          </span>
        </div>

        <div class="toolbar-item filters">
          ${isAnyFilter === true ? x`<label>Filters:</label> ${renderFilterChips}` : ""}
        </div>

        ${currentSorting.column !== "None" /* NONE */ ? x`
              <div class="toolbar-item">
                <label>Sorted by:</label>
                <span>
                  <strong>
                    ${currentSorting.column === "custom attribute" /* CUSTOM_ATTRIBUTE */ ? currentSorting.customField.name : currentSorting.column}
                    ${currentSorting.modelIndex != null ? ` for Response ${Object.values(AOrB)[currentSorting.modelIndex]}` : ""}
                  </strong>
                  ${currentSorting.order}
                </span>
              </div>` : ""}
      </div>`;
    }
  };
  ToolbarElement = __decorateClass([
    t3("comparator-toolbar")
  ], ToolbarElement);

  // client/app.ts
  var LlmComparatorAppElement = class extends MobxLitElement {
    constructor() {
      super();
      this.appState = core.getService(AppState);
      this.isShowFeedbackTooltip = false;
      makeObservable(this);
    }
    static get styles() {
      return [styles, i``];
    }
    renderHeader() {
      const toggleSettingsIcon = () => {
        this.appState.isOpenSettingsPanel = !this.appState.isOpenSettingsPanel;
      };
      const feedbackLink = "https://github.com/PAIR-code/llm-comparator/issues";
      const documentationLink = "https://github.com/PAIR-code/llm-comparator";
      const handleClickLoadData = () => {
        this.appState.isOpenDatasetSelectionPanel = !this.appState.isOpenDatasetSelectionPanel;
      };
      const renderLoadDataLink = x`
        <button class="load-data-button" @click=${handleClickLoadData}>
          Load Data
        </button>`;
      return x`
      <div id="header">
        <img class="favicon" src="static/favicon.svg" alt="LLM Comparator" />
        <h1>LLM Comparator</h1>
        ${renderLoadDataLink}
        <div class="header-icon-container">
          <div class="link-icon">
            <mwc-icon class="icon" title="Toggle Settings Panel"
              @click=${toggleSettingsIcon}>
              settings
            </mwc-icon>
          </div>
          <div class="link-icon">
            <a href=${feedbackLink} target="_blank">
              <mwc-icon class="icon" title="Send Feedback">
                feedback
              </mwc-icon>
            </a>
          </div>
          <div class="link-icon">
            <a href=${documentationLink} target="_blank">
              <mwc-icon class="icon" title="Open Documentation Page">
                help_outline
              </mwc-icon>
            </a>
          </div>
        </div>
      </div>`;
    }
    renderStatusMessage() {
      return x`
        <div class="status-message-container">
          <div>${this.appState.statusMessage}</div>
          <div class="dismiss-button clickable"
            @click=${() => this.appState.isOpenStatusMessage = false}>
            Dismiss
          </div>
        </div>`;
    }
    renderSidebar() {
      const components = x`
        <comparator-score-histogram></comparator-score-histogram>
        <comparator-metrics-by-slice></comparator-metrics-by-slice>
        <comparator-rationale-summary></comparator-rationale-summary>
        <comparator-custom-functions></comparator-custom-functions>
        <comparator-charts></comparator-charts>`;
      return x`<div id="sidebar">${components}</div>`;
    }
    render() {
      const styleExampleDetailsPanel = e6({
        "expanded": this.appState.exampleDetailsPanelExpanded === true
      });
      return x`
        <div id="container">
          ${this.renderHeader()}
          <div id="main">
            <comparator-dataset-selection></comparator-dataset-selection>
            ${this.appState.isOpenSettingsPanel === true ? x`<comparator-settings></comparator-settings>` : ""}
            <div id="main-panel">
              <comparator-toolbar></comparator-toolbar>
              <div id="main-table" class="table-panel">
                <comparator-example-table></comparator-example-table>
              </div>
              ${this.appState.showSelectedExampleDetails === true && this.appState.selectedExample != null ? x`
                  <div id="example-details" class=${styleExampleDetailsPanel}>
                    <comparator-example-details></comparator-example-details>
                  </div>` : ""}
            </div>
            ${this.appState.isShowSidebar === true ? this.renderSidebar() : ""}
        </div>
          ${this.appState.isOpenStatusMessage === true ? this.renderStatusMessage() : ""}
        </div>`;
    }
  };
  __decorateClass([
    observable
  ], LlmComparatorAppElement.prototype, "isShowFeedbackTooltip", 2);
  LlmComparatorAppElement = __decorateClass([
    t3("llm-comparator-app")
  ], LlmComparatorAppElement);

  // client/index.ts
  async function main() {
    window.addEventListener("load", () => {
      core.initialize();
    });
    j(
      x`<llm-comparator-app></llm-comparator-app>`,
      document.querySelector("#app-container")
    );
  }
  main();
})();
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/mwc-icon/mwc-icon-host.css.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-LIcense-Identifier: Apache-2.0
   *)

@material/mwc-icon/mwc-icon.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/dom/ponyfill.js:
  (**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/mwc-base/utils.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/mwc-base/base-element.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/base/foundation.js:
  (**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@material/ripple/constants.js:
  (**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@material/ripple/foundation.js:
  (**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/mwc-ripple/mwc-ripple-base.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/mwc-ripple/mwc-ripple.css.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-LIcense-Identifier: Apache-2.0
   *)

@material/mwc-ripple/mwc-ripple.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/mwc-base/aria-property.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/mwc-base/form-element.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/mwc-ripple/ripple-handlers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/base/observer.js:
  (**
   * @license
   * Copyright 2021 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@material/base/observer-foundation.js:
  (**
   * @license
   * Copyright 2021 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@material/switch/constants.js:
  (**
   * @license
   * Copyright 2021 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@material/switch/foundation.js:
  (**
   * @license
   * Copyright 2021 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/mwc-switch/mwc-switch-base.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/mwc-switch/styles.css.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-LIcense-Identifier: Apache-2.0
   *)

@material/mwc-switch/mwc-switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=dev_sources.concat.js.map
