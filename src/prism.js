/* http://prismjs.com/download.html?themes=prism-dark&languages=markup+css+clike+javascript+c+ruby+php+jsx&plugins=line-highlight+line-numbers */
var _self =
  typeof window !== "undefined"
    ? window // if in browser
    : typeof WorkerGlobalScope !== "undefined" &&
      self instanceof WorkerGlobalScope
      ? self // if in worker
      : {}; // if in node js

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function() {
  // Private helper vars
  var lang = /\blang(?:uage)?-(\w+)\b/i;
  var uniqueId = 0;

  var _ = (_self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    util: {
      encode: function(tokens) {
        if (tokens instanceof Token) {
          return new Token(
            tokens.type,
            _.util.encode(tokens.content),
            tokens.alias
          );
        } else if (_.util.type(tokens) === "Array") {
          return tokens.map(_.util.encode);
        } else {
          return tokens
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/\u00a0/g, " ");
        }
      },

      type: function(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },

      objId: function(obj) {
        if (!obj["__id"]) {
          Object.defineProperty(obj, "__id", { value: ++uniqueId });
        }
        return obj["__id"];
      },

      // Deep clone a language definition (e.g. to extend it)
      clone: function(o) {
        var type = _.util.type(o);

        switch (type) {
          case "Object":
            var clone = {};

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key]);
              }
            }

            return clone;

          case "Array":
            return o.map(function(v) {
              return _.util.clone(v);
            });
        }

        return o;
      }
    },

    languages: {
      extend: function(id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore: function(inside, before, insert, root) {
        root = root || _.languages;
        var grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        var ret = {};

        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        }

        // Update references in other language definitions
        _.languages.DFS(_.languages, function(key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return (root[inside] = ret);
      },

      // Traverse a language definition with Depth First Search
      DFS: function(o, callback, type, visited) {
        visited = visited || {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (
              _.util.type(o[i]) === "Object" &&
              !visited[_.util.objId(o[i])]
            ) {
              visited[_.util.objId(o[i])] = true;
              _.languages.DFS(o[i], callback, null, visited);
            } else if (
              _.util.type(o[i]) === "Array" &&
              !visited[_.util.objId(o[i])]
            ) {
              visited[_.util.objId(o[i])] = true;
              _.languages.DFS(o[i], callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},

    highlightAll: function(async, callback) {
      var env = {
        callback: callback,
        selector:
          'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };

      _.hooks.run("before-highlightall", env);

      var elements = env.elements || document.querySelectorAll(env.selector);

      for (var i = 0, element; (element = elements[i++]); ) {
        _.highlightElement(element, async === true, env.callback);
      }
    },

    highlightElement: function(element, sync, callback) {
      // Find language
      var language,
        grammar,
        parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ""])[1].toLowerCase();
        grammar = _.languages[language];
      }

      // Set language on the element, if not present
      element.className =
        element.className.replace(lang, "").replace(/\s+/g, " ") +
        " language-" +
        language;

      // Set language on the parent, for styling
      parent = element.parentNode;

      if (/pre/i.test(parent.nodeName)) {
        parent.className =
          parent.className.replace(lang, "").replace(/\s+/g, " ") +
          " language-" +
          language;
      }

      var code = element.textContent;

      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };

      _.hooks.run("before-sanity-check", env);

      if (!env.code || !env.grammar) {
        if (env.code) {
          _.hooks.run("before-highlight", env);
          env.element.textContent = env.code;
          _.hooks.run("after-highlight", env);
        }
        _.hooks.run("complete", env);
        return;
      }

      _.hooks.run("before-highlight", env);

      if (sync && _self.Worker) {
        var worker = new Worker(_.filename);

        worker.onmessage = function(evt) {
          env.highlightedCode = evt.data;

          _.hooks.run("before-insert", env);

          env.element.innerHTML = env.highlightedCode;

          callback && callback.call(env.element);
          _.hooks.run("after-highlight", env);
          _.hooks.run("complete", env);
        };

        worker.postMessage(
          JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          })
        );
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run("before-insert", env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(element);

        _.hooks.run("after-highlight", env);
        _.hooks.run("complete", env);
      }
    },

    highlight: function(text, grammar, language) {
      var tokens = _.tokenize(text, grammar);
      return Token.stringify(_.util.encode(tokens), language);
    },

    matchGrammar: function(
      text,
      strarr,
      grammar,
      index,
      startPos,
      oneshot,
      target
    ) {
      var Token = _.Token;

      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        if (token == target) {
          return;
        }

        var patterns = grammar[token];
        patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
            inside = pattern.inside,
            lookbehind = !!pattern.lookbehind,
            greedy = !!pattern.greedy,
            lookbehindLength = 0,
            alias = pattern.alias;

          if (greedy && !pattern.pattern.global) {
            // Without the global flag, lastIndex won't work
            var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
            pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
          }

          pattern = pattern.pattern || pattern;

          // Don’t cache length as it changes during the loop
          for (
            var i = index, pos = startPos;
            i < strarr.length;
            pos += strarr[i].length, ++i
          ) {
            var str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              return;
            }

            if (str instanceof Token) {
              continue;
            }

            pattern.lastIndex = 0;

            var match = pattern.exec(str),
              delNum = 1;

            // Greedy patterns can override/remove up to two previously matched tokens
            if (!match && greedy && i != strarr.length - 1) {
              pattern.lastIndex = pos;
              match = pattern.exec(text);
              if (!match) {
                break;
              }

              var from = match.index + (lookbehind ? match[1].length : 0),
                to = match.index + match[0].length,
                k = i,
                p = pos;

              for (
                var len = strarr.length;
                k < len &&
                (p < to || (!strarr[k].type && !strarr[k - 1].greedy));
                ++k
              ) {
                p += strarr[k].length;
                // Move the index i to the element in strarr that is closest to from
                if (from >= p) {
                  ++i;
                  pos = p;
                }
              }

              /*
               * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
               * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
               */
              if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
                continue;
              }

              // Number of tokens to delete and replace with the new match
              delNum = k - i;
              str = text.slice(pos, p);
              match.index -= pos;
            }

            if (!match) {
              if (oneshot) {
                break;
              }

              continue;
            }

            if (lookbehind) {
              lookbehindLength = match[1].length;
            }

            var from = match.index + lookbehindLength,
              match = match[0].slice(lookbehindLength),
              to = from + match.length,
              before = str.slice(0, from),
              after = str.slice(to);

            var args = [i, delNum];

            if (before) {
              ++i;
              pos += before.length;
              args.push(before);
            }

            var wrapped = new Token(
              token,
              inside ? _.tokenize(match, inside) : match,
              alias,
              match,
              greedy
            );

            args.push(wrapped);

            if (after) {
              args.push(after);
            }

            Array.prototype.splice.apply(strarr, args);

            if (delNum != 1)
              _.matchGrammar(text, strarr, grammar, i, pos, true, token);

            if (oneshot) break;
          }
        }
      }
    },

    tokenize: function(text, grammar, language) {
      var strarr = [text];

      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      _.matchGrammar(text, strarr, grammar, 0, 0, false);

      return strarr;
    },

    hooks: {
      all: {},

      add: function(name, callback) {
        var hooks = _.hooks.all;

        hooks[name] = hooks[name] || [];

        hooks[name].push(callback);
      },

      run: function(name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; (callback = callbacks[i++]); ) {
          callback(env);
        }
      }
    }
  });

  var Token = (_.Token = function(type, content, alias, matchedStr, greedy) {
    this.type = type;
    this.content = content;
    this.alias = alias;
    // Copy of the full string this token was created from
    this.length = (matchedStr || "").length | 0;
    this.greedy = !!greedy;
  });

  Token.stringify = function(o, language, parent) {
    if (typeof o == "string") {
      return o;
    }

    if (_.util.type(o) === "Array") {
      return o
        .map(function(element) {
          return Token.stringify(element, language, o);
        })
        .join("");
    }

    var env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: "span",
      classes: ["token", o.type],
      attributes: {},
      language: language,
      parent: parent
    };

    if (env.type == "comment") {
      env.attributes["spellcheck"] = "true";
    }

    if (o.alias) {
      var aliases = _.util.type(o.alias) === "Array" ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run("wrap", env);

    var attributes = Object.keys(env.attributes)
      .map(function(name) {
        return (
          name +
          '="' +
          (env.attributes[name] || "").replace(/"/g, "&quot;") +
          '"'
        );
      })
      .join(" ");

    return (
      "<" +
      env.tag +
      ' class="' +
      env.classes.join(" ") +
      '"' +
      (attributes ? " " + attributes : "") +
      ">" +
      env.content +
      "</" +
      env.tag +
      ">"
    );
  };

  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _self.Prism;
    }
    // In worker
    _self.addEventListener(
      "message",
      function(evt) {
        var message = JSON.parse(evt.data),
          lang = message.language,
          code = message.code,
          immediateClose = message.immediateClose;

        _self.postMessage(_.highlight(code, _.languages[lang], lang));
        if (immediateClose) {
          _self.close();
        }
      },
      false
    );

    return _self.Prism;
  }

  //Get current script and highlight
  var script =
    document.currentScript ||
    [].slice.call(document.getElementsByTagName("script")).pop();

  if (script) {
    _.filename = script.src;

    if (!_.manual && !script.hasAttribute("data-manual")) {
      if (document.readyState !== "loading") {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(_.highlightAll);
        } else {
          window.setTimeout(_.highlightAll, 16);
        }
      } else {
        document.addEventListener("DOMContentLoaded", _.highlightAll);
      }
    }
  }

  return _self.Prism;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== "undefined") {
  global.Prism = Prism;
}
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
        inside: {
          punctuation: /[=>"']/
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
};

Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] =
  Prism.languages.markup["entity"];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
    inside: {
      rule: /@[\w-]+/
      // See rest below
    }
  },
  url: /url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/
};

Prism.languages.css["atrule"].inside.rest = Prism.util.clone(
  Prism.languages.css
);

if (Prism.languages.markup) {
  Prism.languages.insertBefore("markup", "tag", {
    style: {
      pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
      lookbehind: true,
      inside: Prism.languages.css,
      alias: "language-css"
    }
  });

  Prism.languages.insertBefore(
    "inside",
    "attr-value",
    {
      "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
          "attr-name": {
            pattern: /^\s*style/i,
            inside: Prism.languages.markup.tag.inside
          },
          punctuation: /^\s*=\s*['"]|['"]\s*$/,
          "attr-value": {
            pattern: /.+/i,
            inside: Prism.languages.css
          }
        },
        alias: "language-css"
      }
    },
    Prism.languages.markup.tag
  );
}
Prism.languages.clike = {
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true
    }
  ],
  string: {
    pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b-?(0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*\()/i,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: true,
    greedy: true
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)\s*=>))/i,
    alias: "function"
  }
});

Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\\\|\\?[^\\])*?`/,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript,
      alias: "language-javascript"
    }
  });
}

Prism.languages.js = Prism.languages.javascript;

Prism.languages.c = Prism.languages.extend("clike", {
  keyword: /\b(_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
});

Prism.languages.insertBefore("c", "string", {
  macro: {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
    lookbehind: true,
    alias: "property",
    inside: {
      // highlight the path of the include statement as a string
      string: {
        pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
        lookbehind: true
      },
      // highlight macro directives as keywords
      directive: {
        pattern: /(#\s*)\b(define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
        lookbehind: true,
        alias: "keyword"
      }
    }
  },
  // highlight predefined macros as constants
  constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
});

delete Prism.languages.c["class-name"];
delete Prism.languages.c["boolean"];

/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 * 		constant, builtin, variable, symbol, regex
 */
(function(Prism) {
  Prism.languages.ruby = Prism.languages.extend("clike", {
    comment: [
      /#(?!\{[^\r\n]*?\}).*/,
      /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m
    ],
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
  });

  var interpolation = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: {
        pattern: /^#\{|\}$/,
        alias: "tag"
      },
      rest: Prism.util.clone(Prism.languages.ruby)
    }
  };

  Prism.languages.insertBefore("ruby", "keyword", {
    regex: [
      {
        pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        // Here we need to specifically allow interpolation
        pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true,
        greedy: true
      }
    ],
    variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
    symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
  });

  Prism.languages.insertBefore("ruby", "number", {
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
  });

  Prism.languages.ruby.string = [
    {
      pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    },
    {
      pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    },
    {
      // Here we need to specifically allow interpolation
      pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    },
    {
      pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    },
    {
      pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    },
    {
      pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
      greedy: true,
      inside: {
        interpolation: interpolation
      }
    }
  ];
})(Prism);
/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 * 		- Extends clike syntax
 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
 * 		- Smarter constant and function matching
 *
 * Adds the following new token classes:
 * 		constant, delimiter, variable, function, package
 */

Prism.languages.php = Prism.languages.extend("clike", {
  keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  }
});

// Shell-like comments are matched after strings, because they are less
// common than strings containing hashes...
Prism.languages.insertBefore("php", "class-name", {
  "shell-comment": {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    alias: "comment"
  }
});

Prism.languages.insertBefore("php", "keyword", {
  delimiter: {
    pattern: /\?>|<\?(?:php|=)?/i,
    alias: "important"
  },
  variable: /\$\w+\b/i,
  package: {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
    lookbehind: true,
    inside: {
      punctuation: /\\/
    }
  }
});

// Must be defined after the function pattern
Prism.languages.insertBefore("php", "operator", {
  property: {
    pattern: /(->)[\w]+/,
    lookbehind: true
  }
});

// Add HTML support if the markup language exists
if (Prism.languages.markup) {
  // Tokenize all inline PHP blocks that are wrapped in <?php ?>
  // This allows for easy PHP + markup highlighting
  Prism.hooks.add("before-highlight", function(env) {
    if (env.language !== "php" || !/(?:<\?php|<\?)/gi.test(env.code)) {
      return;
    }

    env.tokenStack = [];

    env.backupCode = env.code;
    env.code = env.code.replace(/(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi, function(
      match
    ) {
      var i = env.tokenStack.length;
      // Check for existing strings
      while (env.backupCode.indexOf("___PHP" + i + "___") !== -1) ++i;

      // Create a sparse array
      env.tokenStack[i] = match;

      return "___PHP" + i + "___";
    });

    // Switch the grammar to markup
    env.grammar = Prism.languages.markup;
  });

  // Restore env.code for other plugins (e.g. line-numbers)
  Prism.hooks.add("before-insert", function(env) {
    if (env.language === "php" && env.backupCode) {
      env.code = env.backupCode;
      delete env.backupCode;
    }
  });

  // Re-insert the tokens after highlighting
  Prism.hooks.add("after-highlight", function(env) {
    if (env.language !== "php" || !env.tokenStack) {
      return;
    }

    // Switch the grammar back
    env.grammar = Prism.languages.php;

    for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
      var k = keys[i];
      var t = env.tokenStack[k];

      // The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
      env.highlightedCode = env.highlightedCode.replace(
        "___PHP" + k + "___",
        '<span class="token php language-php">' +
          Prism.highlight(t, env.grammar, "php").replace(/\$/g, "$$$$") +
          "</span>"
      );
    }

    env.element.innerHTML = env.highlightedCode;
  });
}
(function(Prism) {
  var javascript = Prism.util.clone(Prism.languages.javascript);

  Prism.languages.jsx = Prism.languages.extend("markup", javascript);
  Prism.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+(?:[\w\.:-]+(?:=(?:("|')(\\?[\s\S])*?\1|[^\s'">=]+|(\{[\s\S]*?\})))?|\{\.{3}\w+\}))*\s*\/?>/i;

  Prism.languages.jsx.tag.inside[
    "attr-value"
  ].pattern = /=(?!\{)(?:('|")[\s\S]*?(\1)|[^\s>]+)/i;

  Prism.languages.insertBefore(
    "inside",
    "attr-name",
    {
      spread: {
        pattern: /\{\.{3}\w+\}/,
        inside: {
          punctuation: /\{|\}|\./,
          "attr-value": /\w+/
        }
      }
    },
    Prism.languages.jsx.tag
  );

  var jsxExpression = Prism.util.clone(Prism.languages.jsx);

  delete jsxExpression.punctuation;

  jsxExpression = Prism.languages.insertBefore(
    "jsx",
    "operator",
    {
      punctuation: /=(?={)|[{}[\];(),.:]/
    },
    { jsx: jsxExpression }
  );

  Prism.languages.insertBefore(
    "inside",
    "attr-value",
    {
      script: {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
        inside: jsxExpression,
        alias: "language-javascript"
      }
    },
    Prism.languages.jsx.tag
  );
})(Prism);

(function() {
  if (
    typeof self === "undefined" ||
    !self.Prism ||
    !self.document ||
    !document.querySelector
  ) {
    return;
  }

  function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
  }

  function hasClass(element, className) {
    className = " " + className + " ";
    return (
      (" " + element.className + " ")
        .replace(/[\n\t]/g, " ")
        .indexOf(className) > -1
    );
  }

  // Some browsers round the line-height, others don't.
  // We need to test for it to position the elements properly.
  var isLineHeightRounded = (function() {
    var res;
    return function() {
      if (typeof res === "undefined") {
        var d = document.createElement("div");
        d.style.fontSize = "13px";
        d.style.lineHeight = "1.5";
        d.style.padding = 0;
        d.style.border = 0;
        d.innerHTML = "&nbsp;<br />&nbsp;";
        document.body.appendChild(d);
        // Browsers that round the line-height should have offsetHeight === 38
        // The others should have 39.
        res = d.offsetHeight === 38;
        document.body.removeChild(d);
      }
      return res;
    };
  })();

  function highlightLines(pre, lines, classes) {
    var ranges = lines.replace(/\s+/g, "").split(","),
      offset = +pre.getAttribute("data-line-offset") || 0;

    var parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
    var lineHeight = parseMethod(getComputedStyle(pre).lineHeight);

    for (var i = 0, range; (range = ranges[i++]); ) {
      range = range.split("-");

      var start = +range[0],
        end = +range[1] || start;

      var line = document.createElement("div");

      line.textContent = Array(end - start + 2).join(" \n");
      line.setAttribute("aria-hidden", "true");
      line.className = (classes || "") + " line-highlight";

      //if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
      if (!hasClass(pre, "line-numbers")) {
        line.setAttribute("data-start", start);

        if (end > start) {
          line.setAttribute("data-end", end);
        }
      }

      line.style.top = (start - offset - 1) * lineHeight + "px";

      //allow this to play nicely with the line-numbers plugin
      if (hasClass(pre, "line-numbers")) {
        //need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
        pre.appendChild(line);
      } else {
        (pre.querySelector("code") || pre).appendChild(line);
      }
    }
  }

  function applyHash() {
    var hash = location.hash.slice(1);

    // Remove pre-existing temporary lines
    $$(".temporary.line-highlight").forEach(function(line) {
      line.parentNode.removeChild(line);
    });

    var range = (hash.match(/\.([\d,-]+)$/) || [, ""])[1];

    if (!range || document.getElementById(hash)) {
      return;
    }

    var id = hash.slice(0, hash.lastIndexOf(".")),
      pre = document.getElementById(id);

    if (!pre) {
      return;
    }

    if (!pre.hasAttribute("data-line")) {
      pre.setAttribute("data-line", "");
    }

    highlightLines(pre, range, "temporary ");

    document.querySelector(".temporary.line-highlight").scrollIntoView();
  }

  var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

  Prism.hooks.add("before-sanity-check", function(env) {
    var pre = env.element.parentNode;
    var lines = pre && pre.getAttribute("data-line");

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    /*
     * Cleanup for other plugins (e.g. autoloader).
     *
     * Sometimes <code> blocks are highlighted multiple times. It is necessary
     * to cleanup any left-over tags, because the whitespace inside of the <div>
     * tags change the content of the <code> tag.
     */
    var num = 0;
    $$(".line-highlight", pre).forEach(function(line) {
      num += line.textContent.length;
      line.parentNode.removeChild(line);
    });
    // Remove extra whitespace
    if (num && /^( \n)+$/.test(env.code.slice(-num))) {
      env.code = env.code.slice(0, -num);
    }
  });

  Prism.hooks.add("complete", function(env) {
    var pre = env.element.parentNode;
    var lines = pre && pre.getAttribute("data-line");

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    clearTimeout(fakeTimer);
    highlightLines(pre, lines);

    fakeTimer = setTimeout(applyHash, 1);
  });

  window.addEventListener("hashchange", applyHash);
})();

(function() {
  if (typeof self === "undefined" || !self.Prism || !self.document) {
    return;
  }

  /**
   * Class name for <pre> which is activating the plugin
   * @type {String}
   */
  var PLUGIN_CLASS = "line-numbers";

  /**
   * Resizes line numbers spans according to height of line of code
   * @param  {Element} element <pre> element
   */
  var _resizeElement = function(element) {
    var codeStyles = getStyles(element);
    var whiteSpace = codeStyles["white-space"];

    if (whiteSpace === "pre-wrap" || whiteSpace === "pre-line") {
      var codeElement = element.querySelector("code");
      var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
      var lineNumberSizer = element.querySelector(".line-numbers-sizer");
      var codeLines = element.textContent.split("\n");

      if (!lineNumberSizer) {
        lineNumberSizer = document.createElement("span");
        lineNumberSizer.className = "line-numbers-sizer";

        codeElement.appendChild(lineNumberSizer);
      }

      lineNumberSizer.style.display = "block";

      codeLines.forEach(function(line, lineNumber) {
        lineNumberSizer.textContent = line || "\n";
        var lineSize = lineNumberSizer.getBoundingClientRect().height;
        lineNumbersWrapper.children[lineNumber].style.height = lineSize + "px";
      });

      lineNumberSizer.textContent = "";
      lineNumberSizer.style.display = "none";
    }
  };

  /**
   * Returns style declarations for the element
   * @param {Element} element
   */
  var getStyles = function(element) {
    if (!element) {
      return null;
    }

    return window.getComputedStyle
      ? getComputedStyle(element)
      : element.currentStyle || null;
  };

  window.addEventListener("resize", function() {
    Array.prototype.forEach.call(
      document.querySelectorAll("pre." + PLUGIN_CLASS),
      _resizeElement
    );
  });

  Prism.hooks.add("complete", function(env) {
    if (!env.code) {
      return;
    }

    // works only for <code> wrapped inside <pre> (not inline)
    var pre = env.element.parentNode;
    var clsReg = /\s*\bline-numbers\b\s*/;
    if (
      !pre ||
      !/pre/i.test(pre.nodeName) ||
      // Abort only if nor the <pre> nor the <code> have the class
      (!clsReg.test(pre.className) && !clsReg.test(env.element.className))
    ) {
      return;
    }

    if (env.element.querySelector(".line-numbers-rows")) {
      // Abort if line numbers already exists
      return;
    }

    if (clsReg.test(env.element.className)) {
      // Remove the class "line-numbers" from the <code>
      env.element.className = env.element.className.replace(clsReg, " ");
    }
    if (!clsReg.test(pre.className)) {
      // Add the class "line-numbers" to the <pre>
      pre.className += " line-numbers";
    }

    var match = env.code.match(/\n(?!$)/g);
    var linesNum = match ? match.length + 1 : 1;
    var lineNumbersWrapper;

    var lines = new Array(linesNum + 1);
    lines = lines.join("<span></span>");

    lineNumbersWrapper = document.createElement("span");
    lineNumbersWrapper.setAttribute("aria-hidden", "true");
    lineNumbersWrapper.className = "line-numbers-rows";
    lineNumbersWrapper.innerHTML = lines;

    if (pre.hasAttribute("data-start")) {
      pre.style.counterReset =
        "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1);
    }

    env.element.appendChild(lineNumbersWrapper);

    _resizeElement(pre);
  });
})();
