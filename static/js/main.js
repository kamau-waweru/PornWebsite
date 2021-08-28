var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paginaAtual = 0;
var tipoAtual = "portugues";
var query = null;

var pagina = [];

function nextPage() {

  paginaAtual++;

  if (pagina[paginaAtual] != null) {
    insertVideos(pagina[paginaAtual]);
    if (pagina[(paginaAtual + 1)] == null) {
      $.getJSON('/api/?query=' + query + '&tipo=' + tipo + '&pagina=' + (paginaAtual + 1), function (data) {
        pagina[(paginaAtual + 1)] = data;
      });
    }
  } else {
    loadPage(tipoAtual, paginaAtual);
  }

  updateBotaoVoltar();
  updateUrl();
}

function updateBotaoVoltar() {
  if (paginaAtual < 1)
    document.getElementById("botaovoltar").classList.add("is-disabled");
  else
    document.getElementById("botaovoltar").classList.remove("is-disabled");
}

function returnPage() {

  paginaAtual--;

  if (paginaAtual < 0)
    paginaAtual = 0;

  if (pagina[paginaAtual] == null)
    loadPage(tipoAtual, paginaAtual);
  else
    insertVideos(pagina[paginaAtual]);

  updateBotaoVoltar();
  updateUrl();
}

function loadVideosPage() {
  query = (new URLSearchParams(window.location.search).get('q') || null);
  tipo = (new URLSearchParams(window.location.search).get('tipo') || "portugues");
  if (query != null) {
    loadPage("search", 0, query);
  } else {
    loadPage(tipo);
  }
}

function loadVideoInfo() {
  videoId = (new URLSearchParams(window.location.search).get('id') || null);
  titulo = (new URLSearchParams(window.location.search).get('t') || null);
  views = (new URLSearchParams(window.location.search).get('v') || null);
  duracao = (new URLSearchParams(window.location.search).get('d') || null);

  if (videoId == null || titulo == null)
    location.href = "/index.html";

  document.title = titulo + " - PHBPorn";
  document.getElementById("videoTitulo").innerText = titulo;
  document.getElementById("duracao").innerText = duracao;
  document.getElementById("visualizacoes").innerText = views;
  document.getElementById("share_link").value = window.location.href;

  document.getElementById("kt_player").src = "https://www.xvideos.com/embedframe/" + videoId;
}

function loadPhotos() {

}

function loadPage(tipo, newPage = 0, query = "") {
  document.getElementById("videoList").innerHTML = "<div class=\"loader\"></div>";
  tipoAtual = tipo;
  if (newPage < 0)
    newPage = (new URLSearchParams(window.location.search).get('pagina') || null);

  if (newPage < 1)
    document.getElementById("botaovoltar").classList.add("is-disabled");
  else
    document.getElementById("botaovoltar").classList.remove("is-disabled");

  $.getJSON('/api/?query=' + query + '&tipo=' + tipo + '&pagina=' + newPage, function (data) {
    insertVideos(data);
    pagina[newPage] = data;
  });

  $.getJSON('/api/?query=' + query + '&tipo=' + tipo + '&pagina=' + (newPage + 1), function (data) {
    pagina[(newPage + 1)] = data;
  });

  paginaAtual = newPage;
  updateUrl();
}

function updateUrl() {

  const myUrlWithParams = new URL(document.URL);

  if (query+"".length > 0)
    myUrlWithParams.searchParams.append("query", query);

  if(tipoAtual+"".length > 0)
    myUrlWithParams.searchParams.append("tipo", tipoAtual);

  if(paginaAtual != null && paginaAtual > 0)
    myUrlWithParams.searchParams.append("pagina", paginaAtual);

   window.history.pushState('', '', myUrlWithParams.href);
}

function insertVideos(data) {
  paginaAtualJson = data;
  document.getElementById("videoList").innerHTML = "";
  for (var video in data) {
    document.getElementById("videoList").innerHTML = document.getElementById("videoList").innerHTML + "<div class=\"cards__item js-item\"><a style=\"cursor:pointer\" onclick=\"location.href='video.html?id=" + data[video].videoId + "&t=" + data[video].title + "&v=" + data[video].views + "&d=" + data[video].duration + "'\" class=\"card js-link\"" +
      "data-rt=\"25:831c7c7716c2633c91917029aa159d0d:0:13259:1:\">" +
      "<span class=\"card__content\"" +
      "    data-preview=\"" + data[video].preview + "\">" +
      "    <span class=\"flag-group\">" +
      "        <span class=\"flag\">" + data[video].duration + "</span>" +
      "    </span>" +
      "    <img class=\"card__img lazyload\"" +
      "        src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\"" +
      "        data-src=\"" + data[video].thumbnail + "\"" +
      "        data-webp=\"" + data[video].thumbnail + "\"" +
      "        alt=\"" + data[video].title + "\"" +
      "        width=\"320\" height=\"180\" />" +
      "</span>" +
      "<span class=\"card__footer\">" +
      "    <span class=\"card__title\"" +
      "        title=\"" + data[video].title + "\">" + data[video].title + "</span>" +
      "    <span class=\"card__action\">" +
      "        <span class=\"card__col\">" +
      "            <span class=\"card__col\">" +
      "                <span class=\"card__icon\">" +
      "                    <svg class=\"icon icon--eye\">" +
      "                        <use xlink:href=\"#eye\"></use>" +
      "                    </svg>" +
      "                </span>" +
      "                <span class=\"card__text\">" + data[video].views + "</span>" +
      "            </span>" +
      "            <span class=\"card__col\">" +
      "                <span class=\"card__text\">" +
      "                    " + data[video].quality +
      "                </span>" +
      "            </span>" +
      "        </span>" +
      "    </span>" +
      "</span>" +
      "</a>" +
      "</div>";
  }
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.accordion-container > .in, .accordion-container > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.IN)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.IN);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
//# sourceMappingURL=collapse.js.map

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

//function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.OPEN);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', 'true');

      $(parent).toggleClass(ClassName.OPEN);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          $(this).data(DATA_KEY, data = new Dropdown(this));
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = { relatedTarget: toggles[i] };

        if (!$(parent).hasClass(ClassName.OPEN)) {
          continue;
        }

        if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.OPEN);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $.makeArray($(Selector.VISIBLE_ITEMS));

      items = items.filter(function (item) {
        return item.offsetWidth || item.offsetHeight;
      });

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);
//# sourceMappingURL=dropdown.js.map

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return { end: TransitionEndEvent[name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        /* eslint-disable no-bitwise */
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        /* eslint-enable no-bitwise */
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = void 0;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
//# sourceMappingURL=util.js.map

!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n() }(0, function () { "use strict"; function e(e) { function n() { var d = Date.now() - l; d < i && d >= 0 ? r = setTimeout(n, i - d) : (r = null, t || (f = e.apply(u, o), u = null, o = null)) } var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, t = arguments[2], r = void 0, o = void 0, u = void 0, l = void 0, f = void 0, d = function () { u = this; for (var d = arguments.length, a = Array(d), s = 0; s < d; s++)a[s] = arguments[s]; o = a, l = Date.now(); var c = t && !r; return r || (r = setTimeout(n, i)), c && (f = e.apply(u, o), u = null, o = null), f }; return d.clear = function () { r && (clearTimeout(r), r = null) }, d.flush = function () { r && (f = e.apply(u, o), u = null, o = null, clearTimeout(r), r = null) }, d } var n = window.jQuery; if (!n) throw new Error("resizeend require jQuery"); n.event.special.resizeend = { setup: function () { var i = n(this); i.on("resize.resizeend", e.call(null, function (e) { e.type = "resizeend", i.trigger("resizeend", e) }, 250)) }, teardown: function () { n(this).off("resize.resizeend") } } });
/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
; (function (f) { "use strict"; "function" === typeof define && define.amd ? define(["jquery"], f) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery) })(function ($) { "use strict"; function n(a) { return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) } function h(a) { return $.isFunction(a) || $.isPlainObject(a) ? a : { top: a, left: a } } var p = $.scrollTo = function (a, d, b) { return $(window).scrollTo(a, d, b) }; p.defaults = { axis: "xy", duration: 0, limit: !0 }; $.fn.scrollTo = function (a, d, b) { "object" === typeof d && (b = d, d = 0); "function" === typeof b && (b = { onAfter: b }); "max" === a && (a = 9E9); b = $.extend({}, p.defaults, b); d = d || b.duration; var u = b.queue && 1 < b.axis.length; u && (d /= 2); b.offset = h(b.offset); b.over = h(b.over); return this.each(function () { function k(a) { var k = $.extend({}, b, { queue: !0, duration: d, complete: a && function () { a.call(q, e, b) } }); r.animate(f, k) } if (null !== a) { var l = n(this), q = l ? this.contentWindow || window : this, r = $(q), e = a, f = {}, t; switch (typeof e) { case "number": case "string": if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) { e = h(e); break } e = l ? $(e) : $(e, q); case "object": if (e.length === 0) return; if (e.is || e.style) t = (e = $(e)).offset() }var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset; $.each(b.axis.split(""), function (a, c) { var d = "x" === c ? "Left" : "Top", m = d.toLowerCase(), g = "scroll" + d, h = r[g](), n = p.max(q, c); t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d); b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n)); !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {})) }); k(b.onAfter) } }) }; p.max = function (a, d) { var b = "x" === d ? "Width" : "Height", h = "scroll" + b; if (!n(a)) return a[h] - $(a)[b.toLowerCase()](); var b = "client" + b, k = a.ownerDocument || a.document, l = k.documentElement, k = k.body; return Math.max(l[h], k[h]) - Math.min(l[b], k[b]) }; $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = { get: function (a) { return $(a.elem)[a.prop]() }, set: function (a) { var d = this.get(a); if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop(); var b = Math.round(a.now); d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a)) } }; return p });

/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
!function (factory) { "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], factory) : factory("undefined" != typeof module && module.exports ? require("jquery") : jQuery) }(function ($) { "use strict"; function init(options) { return !options || void 0 !== options.allowPageScroll || void 0 === options.swipe && void 0 === options.swipeStatus || (options.allowPageScroll = NONE), void 0 !== options.click && void 0 === options.tap && (options.tap = options.click), options || (options = {}), options = $.extend({}, $.fn.swipe.defaults, options), this.each(function () { var $this = $(this), plugin = $this.data(PLUGIN_NS); plugin || (plugin = new TouchSwipe(this, options), $this.data(PLUGIN_NS, plugin)) }) } function TouchSwipe(element, options) { function touchStart(jqEvent) { if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) { var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent; if (!event.pointerType || "mouse" != event.pointerType || 0 != options.fallbackToMouseEvents) { var ret, touches = event.touches, evt = touches ? touches[0] : event; return phase = PHASE_START, touches ? fingerCount = touches.length : options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), distance = 0, direction = null, currentDirection = null, pinchDirection = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, maximumsMap = createMaximumsData(), cancelMultiFingerRelease(), createFingerData(0, evt), !touches || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches() ? (startTime = getTimeStamp(), 2 == fingerCount && (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)), (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase))) : ret = !1, ret === !1 ? (phase = PHASE_CANCEL, triggerHandler(event, phase), ret) : (options.hold && (holdTimeout = setTimeout($.proxy(function () { $element.trigger("hold", [event.target]), options.hold && (ret = options.hold.call($element, event, event.target)) }, this), options.longTapThreshold)), setTouchInProgress(!0), null) } } } function touchMove(jqEvent) { var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent; if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) { var ret, touches = event.touches, evt = touches ? touches[0] : event, currentFinger = updateFingerData(evt); if (endTime = getTimeStamp(), touches && (fingerCount = touches.length), options.hold && clearTimeout(holdTimeout), phase = PHASE_MOVE, 2 == fingerCount && (0 == startTouchesDistance ? (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)) : (updateFingerData(touches[1]), endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end), pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end)), pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance), pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance)), fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches()) { if (direction = calculateDirection(currentFinger.start, currentFinger.end), currentDirection = calculateDirection(currentFinger.last, currentFinger.end), validateDefaultEvent(jqEvent, currentDirection), distance = calculateDistance(currentFinger.start, currentFinger.end), duration = calculateDuration(), setMaxDistance(direction, distance), ret = triggerHandler(event, phase), !options.triggerOnTouchEnd || options.triggerOnTouchLeave) { var inBounds = !0; if (options.triggerOnTouchLeave) { var bounds = getbounds(this); inBounds = isInBounds(currentFinger.end, bounds) } !options.triggerOnTouchEnd && inBounds ? phase = getNextPhase(PHASE_MOVE) : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)), phase != PHASE_CANCEL && phase != PHASE_END || triggerHandler(event, phase) } } else phase = PHASE_CANCEL, triggerHandler(event, phase); ret === !1 && (phase = PHASE_CANCEL, triggerHandler(event, phase)) } } function touchEnd(jqEvent) { var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent, touches = event.touches; if (touches) { if (touches.length && !inMultiFingerRelease()) return startMultiFingerRelease(event), !0; if (touches.length && inMultiFingerRelease()) return !0 } return inMultiFingerRelease() && (fingerCount = fingerCountAtRelease), endTime = getTimeStamp(), duration = calculateDuration(), didSwipeBackToCancel() || !validateSwipeDistance() ? (phase = PHASE_CANCEL, triggerHandler(event, phase)) : options.triggerOnTouchEnd || options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE ? (options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), phase = PHASE_END, triggerHandler(event, phase)) : !options.triggerOnTouchEnd && hasTap() ? (phase = PHASE_END, triggerHandlerForGesture(event, phase, TAP)) : phase === PHASE_MOVE && (phase = PHASE_CANCEL, triggerHandler(event, phase)), setTouchInProgress(!1), null } function touchCancel() { fingerCount = 0, endTime = 0, startTime = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, cancelMultiFingerRelease(), setTouchInProgress(!1) } function touchLeave(jqEvent) { var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent; options.triggerOnTouchLeave && (phase = getNextPhase(PHASE_END), triggerHandler(event, phase)) } function removeListeners() { $element.unbind(START_EV, touchStart), $element.unbind(CANCEL_EV, touchCancel), $element.unbind(MOVE_EV, touchMove), $element.unbind(END_EV, touchEnd), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave), setTouchInProgress(!1) } function getNextPhase(currentPhase) { var nextPhase = currentPhase, validTime = validateSwipeTime(), validDistance = validateSwipeDistance(), didCancel = didSwipeBackToCancel(); return !validTime || didCancel ? nextPhase = PHASE_CANCEL : !validDistance || currentPhase != PHASE_MOVE || options.triggerOnTouchEnd && !options.triggerOnTouchLeave ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL) : nextPhase = PHASE_END, nextPhase } function triggerHandler(event, phase) { var ret, touches = event.touches; return (didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)), (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH)), didDoubleTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP) : didLongTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, LONG_TAP) : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)), phase === PHASE_CANCEL && touchCancel(event), phase === PHASE_END && (touches ? touches.length || touchCancel(event) : touchCancel(event)), ret } function triggerHandlerForGesture(event, phase, gesture) { var ret; if (gesture == SWIPE) { if ($element.trigger("swipeStatus", [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]), options.swipeStatus && (ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection), ret === !1)) return !1; if (phase == PHASE_END && validateSwipe()) { if (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), $element.trigger("swipe", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipe && (ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection), ret === !1)) return !1; switch (direction) { case LEFT: $element.trigger("swipeLeft", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeLeft && (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection)); break; case RIGHT: $element.trigger("swipeRight", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeRight && (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection)); break; case UP: $element.trigger("swipeUp", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeUp && (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection)); break; case DOWN: $element.trigger("swipeDown", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeDown && (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection)) } } } if (gesture == PINCH) { if ($element.trigger("pinchStatus", [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchStatus && (ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData), ret === !1)) return !1; if (phase == PHASE_END && validatePinch()) switch (pinchDirection) { case IN: $element.trigger("pinchIn", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchIn && (ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData)); break; case OUT: $element.trigger("pinchOut", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchOut && (ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData)) } } return gesture == TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), hasDoubleTap() && !inDoubleTap() ? (doubleTapStartTime = getTimeStamp(), singleTapTimeout = setTimeout($.proxy(function () { doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)) }, this), options.doubleTapThreshold)) : (doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)))) : gesture == DOUBLE_TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), doubleTapStartTime = null, $element.trigger("doubletap", [event.target]), options.doubleTap && (ret = options.doubleTap.call($element, event, event.target))) : gesture == LONG_TAP && (phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), doubleTapStartTime = null, $element.trigger("longtap", [event.target]), options.longTap && (ret = options.longTap.call($element, event, event.target)))), ret } function validateSwipeDistance() { var valid = !0; return null !== options.threshold && (valid = distance >= options.threshold), valid } function didSwipeBackToCancel() { var cancelled = !1; return null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold), cancelled } function validatePinchDistance() { return null !== options.pinchThreshold ? pinchDistance >= options.pinchThreshold : !0 } function validateSwipeTime() { var result; return result = options.maxTimeThreshold ? !(duration >= options.maxTimeThreshold) : !0 } function validateDefaultEvent(jqEvent, direction) { if (options.preventDefaultEvents !== !1) if (options.allowPageScroll === NONE) jqEvent.preventDefault(); else { var auto = options.allowPageScroll === AUTO; switch (direction) { case LEFT: (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault(); break; case RIGHT: (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault(); break; case UP: (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault(); break; case DOWN: (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault(); break; case NONE: } } } function validatePinch() { var hasCorrectFingerCount = validateFingers(), hasEndPoint = validateEndPoint(), hasCorrectDistance = validatePinchDistance(); return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance } function hasPinches() { return !!(options.pinchStatus || options.pinchIn || options.pinchOut) } function didPinch() { return !(!validatePinch() || !hasPinches()) } function validateSwipe() { var hasValidTime = validateSwipeTime(), hasValidDistance = validateSwipeDistance(), hasCorrectFingerCount = validateFingers(), hasEndPoint = validateEndPoint(), didCancel = didSwipeBackToCancel(), valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime; return valid } function hasSwipes() { return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown) } function didSwipe() { return !(!validateSwipe() || !hasSwipes()) } function validateFingers() { return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH } function validateEndPoint() { return 0 !== fingerData[0].end.x } function hasTap() { return !!options.tap } function hasDoubleTap() { return !!options.doubleTap } function hasLongTap() { return !!options.longTap } function validateDoubleTap() { if (null == doubleTapStartTime) return !1; var now = getTimeStamp(); return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold } function inDoubleTap() { return validateDoubleTap() } function validateTap() { return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold) } function validateLongTap() { return duration > options.longTapThreshold && DOUBLE_TAP_THRESHOLD > distance } function didTap() { return !(!validateTap() || !hasTap()) } function didDoubleTap() { return !(!validateDoubleTap() || !hasDoubleTap()) } function didLongTap() { return !(!validateLongTap() || !hasLongTap()) } function startMultiFingerRelease(event) { previousTouchEndTime = getTimeStamp(), fingerCountAtRelease = event.touches.length + 1 } function cancelMultiFingerRelease() { previousTouchEndTime = 0, fingerCountAtRelease = 0 } function inMultiFingerRelease() { var withinThreshold = !1; if (previousTouchEndTime) { var diff = getTimeStamp() - previousTouchEndTime; diff <= options.fingerReleaseThreshold && (withinThreshold = !0) } return withinThreshold } function getTouchInProgress() { return !($element.data(PLUGIN_NS + "_intouch") !== !0) } function setTouchInProgress(val) { $element && (val === !0 ? ($element.bind(MOVE_EV, touchMove), $element.bind(END_EV, touchEnd), LEAVE_EV && $element.bind(LEAVE_EV, touchLeave)) : ($element.unbind(MOVE_EV, touchMove, !1), $element.unbind(END_EV, touchEnd, !1), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave, !1)), $element.data(PLUGIN_NS + "_intouch", val === !0)) } function createFingerData(id, evt) { var f = { start: { x: 0, y: 0 }, last: { x: 0, y: 0 }, end: { x: 0, y: 0 } }; return f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX, f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY, fingerData[id] = f, f } function updateFingerData(evt) { var id = void 0 !== evt.identifier ? evt.identifier : 0, f = getFingerData(id); return null === f && (f = createFingerData(id, evt)), f.last.x = f.end.x, f.last.y = f.end.y, f.end.x = evt.pageX || evt.clientX, f.end.y = evt.pageY || evt.clientY, f } function getFingerData(id) { return fingerData[id] || null } function setMaxDistance(direction, distance) { direction != NONE && (distance = Math.max(distance, getMaxDistance(direction)), maximumsMap[direction].distance = distance) } function getMaxDistance(direction) { return maximumsMap[direction] ? maximumsMap[direction].distance : void 0 } function createMaximumsData() { var maxData = {}; return maxData[LEFT] = createMaximumVO(LEFT), maxData[RIGHT] = createMaximumVO(RIGHT), maxData[UP] = createMaximumVO(UP), maxData[DOWN] = createMaximumVO(DOWN), maxData } function createMaximumVO(dir) { return { direction: dir, distance: 0 } } function calculateDuration() { return endTime - startTime } function calculateTouchesDistance(startPoint, endPoint) { var diffX = Math.abs(startPoint.x - endPoint.x), diffY = Math.abs(startPoint.y - endPoint.y); return Math.round(Math.sqrt(diffX * diffX + diffY * diffY)) } function calculatePinchZoom(startDistance, endDistance) { var percent = endDistance / startDistance * 1; return percent.toFixed(2) } function calculatePinchDirection() { return 1 > pinchZoom ? OUT : IN } function calculateDistance(startPoint, endPoint) { return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))) } function calculateAngle(startPoint, endPoint) { var x = startPoint.x - endPoint.x, y = endPoint.y - startPoint.y, r = Math.atan2(y, x), angle = Math.round(180 * r / Math.PI); return 0 > angle && (angle = 360 - Math.abs(angle)), angle } function calculateDirection(startPoint, endPoint) { if (comparePoints(startPoint, endPoint)) return NONE; var angle = calculateAngle(startPoint, endPoint); return 45 >= angle && angle >= 0 ? LEFT : 360 >= angle && angle >= 315 ? LEFT : angle >= 135 && 225 >= angle ? RIGHT : angle > 45 && 135 > angle ? DOWN : UP } function getTimeStamp() { var now = new Date; return now.getTime() } function getbounds(el) { el = $(el); var offset = el.offset(), bounds = { left: offset.left, right: offset.left + el.outerWidth(), top: offset.top, bottom: offset.top + el.outerHeight() }; return bounds } function isInBounds(point, bounds) { return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom } function comparePoints(pointA, pointB) { return pointA.x == pointB.x && pointA.y == pointB.y } var options = $.extend({}, options), useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents, START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", LEAVE_EV = useTouchEvents ? SUPPORTS_POINTER ? "mouseleave" : null : "mouseleave", CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel", distance = 0, direction = null, currentDirection = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, pinchDirection = 0, maximumsMap = null, $element = $(element), phase = "start", fingerCount = 0, fingerData = {}, startTime = 0, endTime = 0, previousTouchEndTime = 0, fingerCountAtRelease = 0, doubleTapStartTime = 0, singleTapTimeout = null, holdTimeout = null; try { $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel) } catch (e) { $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe") } this.enable = function () { return this.disable(), $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel), $element }, this.disable = function () { return removeListeners(), $element }, this.destroy = function () { removeListeners(), $element.data(PLUGIN_NS, null), $element = null }, this.option = function (property, value) { if ("object" == typeof property) options = $.extend(options, property); else if (void 0 !== options[property]) { if (void 0 === value) return options[property]; options[property] = value } else { if (!property) return options; $.error("Option " + property + " does not exist on jQuery.swipe.options") } return null } } var VERSION = "1.6.18", LEFT = "left", RIGHT = "right", UP = "up", DOWN = "down", IN = "in", OUT = "out", NONE = "none", AUTO = "auto", SWIPE = "swipe", PINCH = "pinch", TAP = "tap", DOUBLE_TAP = "doubletap", LONG_TAP = "longtap", HORIZONTAL = "horizontal", VERTICAL = "vertical", ALL_FINGERS = "all", DOUBLE_TAP_THRESHOLD = 10, PHASE_START = "start", PHASE_MOVE = "move", PHASE_END = "end", PHASE_CANCEL = "cancel", SUPPORTS_TOUCH = "ontouchstart" in window, SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !SUPPORTS_TOUCH, SUPPORTS_POINTER = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH, PLUGIN_NS = "TouchSwipe", defaults = { fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, hold: null, triggerOnTouchEnd: !0, triggerOnTouchLeave: !1, allowPageScroll: "auto", fallbackToMouseEvents: !0, excludedElements: ".noSwipe", preventDefaultEvents: !0 }; $.fn.swipe = function (method) { var $this = $(this), plugin = $this.data(PLUGIN_NS); if (plugin && "string" == typeof method) { if (plugin[method]) return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1)); $.error("Method " + method + " does not exist on jQuery.swipe") } else if (plugin && "object" == typeof method) plugin.option.apply(plugin, arguments); else if (!(plugin || "object" != typeof method && method)) return init.apply(this, arguments); return $this }, $.fn.swipe.version = VERSION, $.fn.swipe.defaults = defaults, $.fn.swipe.phases = { PHASE_START: PHASE_START, PHASE_MOVE: PHASE_MOVE, PHASE_END: PHASE_END, PHASE_CANCEL: PHASE_CANCEL }, $.fn.swipe.directions = { LEFT: LEFT, RIGHT: RIGHT, UP: UP, DOWN: DOWN, IN: IN, OUT: OUT }, $.fn.swipe.pageScroll = { NONE: NONE, HORIZONTAL: HORIZONTAL, VERTICAL: VERTICAL, AUTO: AUTO }, $.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: ALL_FINGERS } });
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function (args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function () {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function () {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function () {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function () {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function () {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function (method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function () {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function () {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function () {
    Waypoint.Context.refreshAll()
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true
    }
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function () {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function () {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function () {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function () {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
  ; (function () {
    'use strict'

    function requestAnimationFrameShim(callback) {
      window.setTimeout(callback, 1000 / 60)
    }

    var keyCounter = 0
    var contexts = {}
    var Waypoint = window.Waypoint
    var oldWindowLoad = window.onload

    /* http://imakewebthings.com/waypoints/api/context */
    function Context(element) {
      this.element = element
      this.Adapter = Waypoint.Adapter
      this.adapter = new this.Adapter(element)
      this.key = 'waypoint-context-' + keyCounter
      this.didScroll = false
      this.didResize = false
      this.oldScroll = {
        x: this.adapter.scrollLeft(),
        y: this.adapter.scrollTop()
      }
      this.waypoints = {
        vertical: {},
        horizontal: {}
      }

      element.waypointContextKey = this.key
      contexts[element.waypointContextKey] = this
      keyCounter += 1
      if (!Waypoint.windowContext) {
        Waypoint.windowContext = true
        Waypoint.windowContext = new Context(window)
      }

      this.createThrottledScrollHandler()
      this.createThrottledResizeHandler()
    }

    /* Private */
    Context.prototype.add = function (waypoint) {
      var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
      this.waypoints[axis][waypoint.key] = waypoint
      this.refresh()
    }

    /* Private */
    Context.prototype.checkEmpty = function () {
      var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
      var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
      var isWindow = this.element == this.element.window
      if (horizontalEmpty && verticalEmpty && !isWindow) {
        this.adapter.off('.waypoints')
        delete contexts[this.key]
      }
    }

    /* Private */
    Context.prototype.createThrottledResizeHandler = function () {
      var self = this

      function resizeHandler() {
        self.handleResize()
        self.didResize = false
      }

      this.adapter.on('resize.waypoints', function () {
        if (!self.didResize) {
          self.didResize = true
          Waypoint.requestAnimationFrame(resizeHandler)
        }
      })
    }

    /* Private */
    Context.prototype.createThrottledScrollHandler = function () {
      var self = this
      function scrollHandler() {
        self.handleScroll()
        self.didScroll = false
      }

      this.adapter.on('scroll.waypoints', function () {
        if (!self.didScroll || Waypoint.isTouch) {
          self.didScroll = true
          Waypoint.requestAnimationFrame(scrollHandler)
        }
      })
    }

    /* Private */
    Context.prototype.handleResize = function () {
      Waypoint.Context.refreshAll()
    }

    /* Private */
    Context.prototype.handleScroll = function () {
      var triggeredGroups = {}
      var axes = {
        horizontal: {
          newScroll: this.adapter.scrollLeft(),
          oldScroll: this.oldScroll.x,
          forward: 'right',
          backward: 'left'
        },
        vertical: {
          newScroll: this.adapter.scrollTop(),
          oldScroll: this.oldScroll.y,
          forward: 'down',
          backward: 'up'
        }
      }

      for (var axisKey in axes) {
        var axis = axes[axisKey]
        var isForward = axis.newScroll > axis.oldScroll
        var direction = isForward ? axis.forward : axis.backward

        for (var waypointKey in this.waypoints[axisKey]) {
          var waypoint = this.waypoints[axisKey][waypointKey]
          if (waypoint.triggerPoint === null) {
            continue
          }
          var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
          var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
          var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
          var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
          if (crossedForward || crossedBackward) {
            waypoint.queueTrigger(direction)
            triggeredGroups[waypoint.group.id] = waypoint.group
          }
        }
      }

      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }

      this.oldScroll = {
        x: axes.horizontal.newScroll,
        y: axes.vertical.newScroll
      }
    }

    /* Private */
    Context.prototype.innerHeight = function () {
      /*eslint-disable eqeqeq */
      if (this.element == this.element.window) {
        return Waypoint.viewportHeight()
      }
      /*eslint-enable eqeqeq */
      return this.adapter.innerHeight()
    }

    /* Private */
    Context.prototype.remove = function (waypoint) {
      delete this.waypoints[waypoint.axis][waypoint.key]
      this.checkEmpty()
    }

    /* Private */
    Context.prototype.innerWidth = function () {
      /*eslint-disable eqeqeq */
      if (this.element == this.element.window) {
        return Waypoint.viewportWidth()
      }
      /*eslint-enable eqeqeq */
      return this.adapter.innerWidth()
    }

    /* Public */
    /* http://imakewebthings.com/waypoints/api/context-destroy */
    Context.prototype.destroy = function () {
      var allWaypoints = []
      for (var axis in this.waypoints) {
        for (var waypointKey in this.waypoints[axis]) {
          allWaypoints.push(this.waypoints[axis][waypointKey])
        }
      }
      for (var i = 0, end = allWaypoints.length; i < end; i++) {
        allWaypoints[i].destroy()
      }
    }

    /* Public */
    /* http://imakewebthings.com/waypoints/api/context-refresh */
    Context.prototype.refresh = function () {
      /*eslint-disable eqeqeq */
      var isWindow = this.element == this.element.window
      /*eslint-enable eqeqeq */
      var contextOffset = isWindow ? undefined : this.adapter.offset()
      var triggeredGroups = {}
      var axes

      this.handleScroll()
      axes = {
        horizontal: {
          contextOffset: isWindow ? 0 : contextOffset.left,
          contextScroll: isWindow ? 0 : this.oldScroll.x,
          contextDimension: this.innerWidth(),
          oldScroll: this.oldScroll.x,
          forward: 'right',
          backward: 'left',
          offsetProp: 'left'
        },
        vertical: {
          contextOffset: isWindow ? 0 : contextOffset.top,
          contextScroll: isWindow ? 0 : this.oldScroll.y,
          contextDimension: this.innerHeight(),
          oldScroll: this.oldScroll.y,
          forward: 'down',
          backward: 'up',
          offsetProp: 'top'
        }
      }

      for (var axisKey in axes) {
        var axis = axes[axisKey]
        for (var waypointKey in this.waypoints[axisKey]) {
          var waypoint = this.waypoints[axisKey][waypointKey]
          var adjustment = waypoint.options.offset
          var oldTriggerPoint = waypoint.triggerPoint
          var elementOffset = 0
          var freshWaypoint = oldTriggerPoint == null
          var contextModifier, wasBeforeScroll, nowAfterScroll
          var triggeredBackward, triggeredForward

          if (waypoint.element !== waypoint.element.window) {
            elementOffset = waypoint.adapter.offset()[axis.offsetProp]
          }

          if (typeof adjustment === 'function') {
            adjustment = adjustment.apply(waypoint)
          }
          else if (typeof adjustment === 'string') {
            adjustment = parseFloat(adjustment)
            if (waypoint.options.offset.indexOf('%') > - 1) {
              adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
            }
          }

          contextModifier = axis.contextScroll - axis.contextOffset
          waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment)
          wasBeforeScroll = oldTriggerPoint < axis.oldScroll
          nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
          triggeredBackward = wasBeforeScroll && nowAfterScroll
          triggeredForward = !wasBeforeScroll && !nowAfterScroll

          if (!freshWaypoint && triggeredBackward) {
            waypoint.queueTrigger(axis.backward)
            triggeredGroups[waypoint.group.id] = waypoint.group
          }
          else if (!freshWaypoint && triggeredForward) {
            waypoint.queueTrigger(axis.forward)
            triggeredGroups[waypoint.group.id] = waypoint.group
          }
          else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
            waypoint.queueTrigger(axis.forward)
            triggeredGroups[waypoint.group.id] = waypoint.group
          }
        }
      }

      Waypoint.requestAnimationFrame(function () {
        for (var groupKey in triggeredGroups) {
          triggeredGroups[groupKey].flushTriggers()
        }
      })

      return this
    }

    /* Private */
    Context.findOrCreateByElement = function (element) {
      return Context.findByElement(element) || new Context(element)
    }

    /* Private */
    Context.refreshAll = function () {
      for (var contextId in contexts) {
        contexts[contextId].refresh()
      }
    }

    /* Public */
    /* http://imakewebthings.com/waypoints/api/context-find-by-element */
    Context.findByElement = function (element) {
      return contexts[element.waypointContextKey]
    }

    window.onload = function () {
      if (oldWindowLoad) {
        oldWindowLoad()
      }
      Context.refreshAll()
    }


    Waypoint.requestAnimationFrame = function (callback) {
      var requestFn = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        requestAnimationFrameShim
      requestFn.call(window, callback)
    }
    Waypoint.Context = Context
  }())
  ; (function () {
    'use strict'

    function byTriggerPoint(a, b) {
      return a.triggerPoint - b.triggerPoint
    }

    function byReverseTriggerPoint(a, b) {
      return b.triggerPoint - a.triggerPoint
    }

    var groups = {
      vertical: {},
      horizontal: {}
    }
    var Waypoint = window.Waypoint

    /* http://imakewebthings.com/waypoints/api/group */
    function Group(options) {
      this.name = options.name
      this.axis = options.axis
      this.id = this.name + '-' + this.axis
      this.waypoints = []
      this.clearTriggerQueues()
      groups[this.axis][this.name] = this
    }

    /* Private */
    Group.prototype.add = function (waypoint) {
      this.waypoints.push(waypoint)
    }

    /* Private */
    Group.prototype.clearTriggerQueues = function () {
      this.triggerQueues = {
        up: [],
        down: [],
        left: [],
        right: []
      }
    }

    /* Private */
    Group.prototype.flushTriggers = function () {
      for (var direction in this.triggerQueues) {
        var waypoints = this.triggerQueues[direction]
        var reverse = direction === 'up' || direction === 'left'
        waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
        for (var i = 0, end = waypoints.length; i < end; i += 1) {
          var waypoint = waypoints[i]
          if (waypoint.options.continuous || i === waypoints.length - 1) {
            waypoint.trigger([direction])
          }
        }
      }
      this.clearTriggerQueues()
    }

    /* Private */
    Group.prototype.next = function (waypoint) {
      this.waypoints.sort(byTriggerPoint)
      var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
      var isLast = index === this.waypoints.length - 1
      return isLast ? null : this.waypoints[index + 1]
    }

    /* Private */
    Group.prototype.previous = function (waypoint) {
      this.waypoints.sort(byTriggerPoint)
      var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
      return index ? this.waypoints[index - 1] : null
    }

    /* Private */
    Group.prototype.queueTrigger = function (waypoint, direction) {
      this.triggerQueues[direction].push(waypoint)
    }

    /* Private */
    Group.prototype.remove = function (waypoint) {
      var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
      if (index > -1) {
        this.waypoints.splice(index, 1)
      }
    }

    /* Public */
    /* http://imakewebthings.com/waypoints/api/first */
    Group.prototype.first = function () {
      return this.waypoints[0]
    }

    /* Public */
    /* http://imakewebthings.com/waypoints/api/last */
    Group.prototype.last = function () {
      return this.waypoints[this.waypoints.length - 1]
    }

    /* Private */
    Group.findOrCreate = function (options) {
      return groups[options.axis][options.name] || new Group(options)
    }

    Waypoint.Group = Group
  }())
  ; (function () {
    'use strict'

    var $ = window.jQuery
    var Waypoint = window.Waypoint

    function JQueryAdapter(element) {
      this.$element = $(element)
    }

    $.each([
      'innerHeight',
      'innerWidth',
      'off',
      'offset',
      'on',
      'outerHeight',
      'outerWidth',
      'scrollLeft',
      'scrollTop'
    ], function (i, method) {
      JQueryAdapter.prototype[method] = function () {
        var args = Array.prototype.slice.call(arguments)
        return this.$element[method].apply(this.$element, args)
      }
    })

    $.each([
      'extend',
      'inArray',
      'isEmptyObject'
    ], function (i, method) {
      JQueryAdapter[method] = $[method]
    })

    Waypoint.adapters.push({
      name: 'jquery',
      Adapter: JQueryAdapter
    })
    Waypoint.Adapter = JQueryAdapter
  }())
  ; (function () {
    'use strict'

    var Waypoint = window.Waypoint

    function createExtension(framework) {
      return function () {
        var waypoints = []
        var overrides = arguments[0]

        if (framework.isFunction(arguments[0])) {
          overrides = framework.extend({}, arguments[1])
          overrides.handler = arguments[0]
        }

        this.each(function () {
          var options = framework.extend({}, overrides, {
            element: this
          })
          if (typeof options.context === 'string') {
            options.context = framework(this).closest(options.context)[0]
          }
          waypoints.push(new Waypoint(options))
        })

        return waypoints
      }
    }

    if (window.jQuery) {
      window.jQuery.fn.waypoint = createExtension(window.jQuery)
    }
    if (window.Zepto) {
      window.Zepto.fn.waypoint = createExtension(window.Zepto)
    }
  }())
  ;
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
; (function (factory) {
  var registeredInModuleLoader = false;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend() {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[i];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init(converter) {
    function api(key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        // We're using "expires" because "max-age" is not supported by IE
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) { }

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        var stringifiedAttributes = '';

        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += '; ' + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += '=' + attributes[attributeName];
        }
        return (document.cookie = key + '=' + value + stringifiedAttributes);
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) { }
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) { }
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api.call(api, key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(function () { });
}));

(function (window, factory) {
  var lazySizes = factory(window, window.document);
  window.lazySizes = lazySizes;
  if (typeof module == 'object' && module.exports) {
    module.exports = lazySizes;
  }
}(window, function l(window, document) {
  'use strict';
  /*jshint eqnull:true */
  if (!document.getElementsByClassName) { return; }

  var lazysizes, lazySizesConfig;

  var docElem = document.documentElement;

  var Date = window.Date;

  var supportPicture = window.HTMLPictureElement;

  var _addEventListener = 'addEventListener';

  var _getAttribute = 'getAttribute';

  var addEventListener = window[_addEventListener];

  var setTimeout = window.setTimeout;

  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

  var requestIdleCallback = window.requestIdleCallback;

  var regPicture = /^picture$/i;

  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

  var regClassCache = {};

  var forEach = Array.prototype.forEach;

  var hasClass = function (ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }
    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };

  var addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };

  var removeClass = function (ele, cls) {
    var reg;
    if ((reg = hasClass(ele, cls))) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };

  var addRemoveLoadEvents = function (dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';
    if (add) {
      addRemoveLoadEvents(dom, fn);
    }
    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };

  var triggerEvent = function (elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('CustomEvent');

    if (!detail) {
      detail = {};
    }

    detail.instance = lazysizes;

    event.initCustomEvent(name, !noBubbles, !noCancelable, detail);

    elem.dispatchEvent(event);
    return event;
  };

  var updatePolyfill = function (el, full) {
    var polyfill;
    if (!supportPicture && (polyfill = (window.picturefill || lazySizesConfig.pf))) {
      polyfill({ reevaluate: true, elements: [el] });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };

  var getCSS = function (elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };

  var getWidth = function (elem, parent, width) {
    width = width || elem.offsetWidth;

    while (width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }

    return width;
  };

  var rAF = (function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;

    var run = function () {
      var runFns = fns;

      fns = firstFns.length ? secondFns : firstFns;

      running = true;
      waiting = false;

      while (runFns.length) {
        runFns.shift()();
      }

      running = false;
    };

    var rafBatch = function (fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);

        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };

    rafBatch._lsFlush = run;

    return rafBatch;
  })();

  var rAFIt = function (fn, simple) {
    return simple ?
      function () {
        rAF(fn);
      } :
      function () {
        var that = this;
        var args = arguments;
        rAF(function () {
          fn.apply(that, args);
        });
      }
      ;
  };

  var throttle = function (fn) {
    var running;
    var lastTime = 0;
    var gDelay = 125;
    var RIC_DEFAULT_TIMEOUT = 666;
    var rICTimeout = RIC_DEFAULT_TIMEOUT;
    var run = function () {
      running = false;
      lastTime = Date.now();
      fn();
    };
    var idleCallback = requestIdleCallback ?
      function () {
        requestIdleCallback(run, { timeout: rICTimeout });
        if (rICTimeout !== RIC_DEFAULT_TIMEOUT) {
          rICTimeout = RIC_DEFAULT_TIMEOUT;
        }
      } :
      rAFIt(function () {
        setTimeout(run);
      }, true)
      ;

    return function (isPriority) {
      var delay;
      if ((isPriority = isPriority === true)) {
        rICTimeout = 44;
      }

      if (running) {
        return;
      }

      running = true;

      delay = gDelay - (Date.now() - lastTime);

      if (delay < 0) {
        delay = 0;
      }

      if (isPriority || (delay < 9 && requestIdleCallback)) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  };

  //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
  var debounce = function (func) {
    var timeout, timestamp;
    var wait = 99;
    var run = function () {
      timeout = null;
      func();
    };
    var later = function () {
      var last = Date.now() - timestamp;

      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };

    return function () {
      timestamp = Date.now();

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };


  var loader = (function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

    var defaultExpand, preloadExpand, hFac;

    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;

    var supportScroll = ('onscroll' in window) && !(/glebot/.test(navigator.userAgent));

    var shrinkExpand = 0;
    var currentExpand = 0;

    var isLoading = 0;
    var lowRuns = -1;

    var resetPreloading = function (e) {
      isLoading--;
      if (e && e.target) {
        addRemoveLoadEvents(e.target, resetPreloading);
      }

      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };

    var isNestedVisible = function (elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;

      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = ((getCSS(parent, 'opacity') || 1) > 0);

        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left &&
            eLleft < outerRect.right &&
            eLbottom > outerRect.top - 1 &&
            eLtop < outerRect.bottom + 1
            ;
        }
      }

      return visible;
    };

    var checkElements = function () {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

      var lazyloadElems = lazysizes.elements;

      if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {

        i = 0;

        lowRuns++;

        if (preloadExpand == null) {
          if (!('expand' in lazySizesConfig)) {
            lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
          }

          defaultExpand = lazySizesConfig.expand;
          preloadExpand = defaultExpand * lazySizesConfig.expFactor;
        }

        if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
          currentExpand = preloadExpand;
          lowRuns = 0;
        } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
          currentExpand = defaultExpand;
        } else {
          currentExpand = shrinkExpand;
        }

        for (; i < eLlen; i++) {

          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) { continue; }

          if (!supportScroll) { unveilElement(lazyloadElems[i]); continue; }

          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }

          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + (elemExpand * hFac);
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }

          rect = lazyloadElems[i].getBoundingClientRect();

          if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
            (eLtop = rect.top) <= elvH &&
            (eLright = rect.right) >= elemNegativeExpand * hFac &&
            (eLleft = rect.left) <= eLvW &&
            (eLbottom || eLright || eLleft || eLtop) &&
            (lazySizesConfig.loadHidden || getCSS(lazyloadElems[i], 'visibility') != 'hidden') &&
            ((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;
            if (isLoading > 9) { break; }
          } else if (!loadedSomething && isCompleted && !autoLoadElem &&
            isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
            (preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
            (preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }

        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };

    var throttledCheckElements = throttle(checkElements);

    var switchLoadingClass = function (e) {
      addClass(e.target, lazySizesConfig.loadedClass);
      removeClass(e.target, lazySizesConfig.loadingClass);
      addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
      triggerEvent(e.target, 'lazyloaded');
    };
    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
    var rafSwitchLoadingClass = function (e) {
      rafedSwitchLoadingClass({ target: e.target });
    };

    var changeIframeSrc = function (elem, src) {
      try {
        elem.contentWindow.location.replace(src);
      } catch (e) {
        elem.src = src;
      }
    };

    var handleSources = function (source) {
      var customMedia;

      var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

      if ((customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')])) {
        source.setAttribute('media', customMedia);
      }

      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };

    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;
      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {

        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesConfig.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }

        srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
        src = elem[_getAttribute](lazySizesConfig.srcAttr);

        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }

        firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

        event = { target: elem };

        if (firesLoad) {
          addRemoveLoadEvents(elem, resetPreloading, true);
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);

          addClass(elem, lazySizesConfig.loadingClass);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }

        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }

        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }

        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, { src: src });
        }
      }

      if (elem._lazyRace) {
        delete elem._lazyRace;
      }
      removeClass(elem, lazySizesConfig.lazyClass);

      rAF(function () {
        if (!firesLoad || (elem.complete && elem.naturalWidth > 1)) {
          if (firesLoad) {
            resetPreloading(event);
          } else {
            isLoading--;
          }
          switchLoadingClass(event);
        }
      }, true);
    });

    var unveilElement = function (elem) {
      var detail;

      var isImg = regImg.test(elem.nodeName);

      //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
      var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
      var isAuto = sizes == 'auto';

      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass)) { return; }

      detail = triggerEvent(elem, 'lazyunveilread').detail;

      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }

      elem._lazyRace = true;
      isLoading++;

      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };

    var onload = function () {
      if (isCompleted) { return; }
      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }
      var afterScroll = debounce(function () {
        lazySizesConfig.loadMode = 3;
        throttledCheckElements();
      });

      isCompleted = true;

      lazySizesConfig.loadMode = 3;

      throttledCheckElements();

      addEventListener('scroll', function () {
        if (lazySizesConfig.loadMode == 3) {
          lazySizesConfig.loadMode = 2;
        }
        afterScroll();
      }, true);
    };

    return {
      _: function () {
        started = Date.now();

        lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
        hFac = lazySizesConfig.hFac;

        addEventListener('scroll', throttledCheckElements, true);

        addEventListener('resize', throttledCheckElements, true);

        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
          setInterval(throttledCheckElements, 999);
        }

        addEventListener('hashchange', throttledCheckElements, true);

        //, 'fullscreenchange'
        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });

        if ((/d$|^c/.test(document.readyState))) {
          onload();
        } else {
          addEventListener('load', onload);
          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
          setTimeout(onload, 20000);
        }

        if (lazysizes.elements.length) {
          checkElements();
          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement
    };
  })();


  var autoSizer = (function () {
    var autosizesElems;

    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';

      elem.setAttribute('sizes', width);

      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');
        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }

      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });
    var getSizeElement = function (elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;

      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', { width: width, dataAttr: !!dataAttr });

        if (!event.defaultPrevented) {
          width = event.detail.width;

          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };

    var updateElementsSizes = function () {
      var i;
      var len = autosizesElems.length;
      if (len) {
        i = 0;

        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };

    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

    return {
      _: function () {
        autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  })();

  var init = function () {
    if (!init.i) {
      init.i = true;
      autoSizer._();
      loader._();
    }
  };

  (function () {
    var prop;


    function canUseWebP() {
      var elem = document.createElement('canvas');
      if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
      }
      return false;
    }

    var hasWebP = canUseWebP();

    if (hasWebP == true) {
      var src_img = 'data-webp'
    } else {
      var src_img = 'data-src';
    }

    console.log(hasWebP);
    console.log(src_img);

    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      srcAttr: src_img,
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
    };

    lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesConfig)) {
        lazySizesConfig[prop] = lazySizesDefaults[prop];
      }
    }

    window.lazySizesConfig = lazySizesConfig;

    setTimeout(function () {
      if (lazySizesConfig.init) {
        init();
      }
    });
  })();

  lazysizes = {
    cfg: lazySizesConfig,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF,
  };

  return lazysizes;
}
));

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-cookies-csscalc-cssfilters-cssremunit-cssvhunit-cssvwunit-fetch-flexbox-flexboxlegacy-flexboxtweener-flexwrap-forcetouch-fullscreen-hovermq-inlinesvg-matchmedia-mediaqueries-svg-svgfilters-touchevents-willchange-setclasses !*/
!function (e, t, n) { function r(e, t) { return typeof e === t } function o() { var e, t, n, o, i, s, a; for (var l in _) if (_.hasOwnProperty(l)) { if (e = [], t = _[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++)e.push(t.options.aliases[n].toLowerCase()); for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++)s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), C.push((o ? "" : "no-") + a.join("-")) } } function i(e) { var t = S.className, n = Modernizr._config.classPrefix || ""; if (w && (t = t.baseVal), Modernizr._config.enableJSClass) { var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)"); t = t.replace(r, "$1" + n + "js$2") } Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), w ? S.className.baseVal = t : S.className = t) } function s() { return "function" != typeof t.createElement ? t.createElement(arguments[0]) : w ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments) } function a(t, n, r) { var o; if ("getComputedStyle" in e) { o = getComputedStyle.call(e, t, n); var i = e.console; if (null !== o) r && (o = o.getPropertyValue(r)); else if (i) { var s = i.error ? "error" : "log"; i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate") } } else o = !n && t.currentStyle && t.currentStyle[r]; return o } function l(e) { return e.replace(/([a-z])-([a-z])/g, function (e, t, n) { return t + n.toUpperCase() }).replace(/^-/, "") } function u(e, t) { if ("object" == typeof e) for (var n in e) z(e, n) && u(n, e[n]); else { e = e.toLowerCase(); var r = e.split("."), o = Modernizr[r[0]]; if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr; t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t) } return Modernizr } function f() { var e = t.body; return e || (e = s(w ? "svg" : "body"), e.fake = !0), e } function c(e, n, r, o) { var i, a, l, u, c = "modernizr", d = s("div"), p = f(); if (parseInt(r, 10)) for (; r--;)l = s("div"), l.id = o ? o[r] : c + (r + 1), d.appendChild(l); return i = s("style"), i.type = "text/css", i.id = "s" + c, (p.fake ? p : d).appendChild(i), p.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", u = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), a = n(d, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = u, S.offsetHeight) : d.parentNode.removeChild(d), !!a } function d(e, t) { return !!~("" + e).indexOf(t) } function p(e, t) { return function () { return e.apply(t, arguments) } } function v(e, t, n) { var o; for (var i in e) if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? p(o, n || t) : o); return !1 } function h(e) { return e.replace(/([A-Z])/g, function (e, t) { return "-" + t.toLowerCase() }).replace(/^ms-/, "-ms-") } function m(t, r) { var o = t.length; if ("CSS" in e && "supports" in e.CSS) { for (; o--;)if (e.CSS.supports(h(t[o]), r)) return !0; return !1 } if ("CSSSupportsRule" in e) { for (var i = []; o--;)i.push("(" + h(t[o]) + ":" + r + ")"); return i = i.join(" or "), c("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) { return "absolute" == a(e, null, "position") }) } return n } function g(e, t, o, i) { function a() { f && (delete N.style, delete N.modElem) } if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) { var u = m(e, o); if (!r(u, "undefined")) return u } for (var f, c, p, v, h, g = ["modernizr", "tspan", "samp"]; !N.style && g.length;)f = !0, N.modElem = s(g.shift()), N.style = N.modElem.style; for (p = e.length, c = 0; p > c; c++)if (v = e[c], h = N.style[v], d(v, "-") && (v = l(v)), N.style[v] !== n) { if (i || r(o, "undefined")) return a(), "pfx" == t ? v : !0; try { N.style[v] = o } catch (y) { } if (N.style[v] != h) return a(), "pfx" == t ? v : !0 } return a(), !1 } function y(e, t, n, o, i) { var s = e.charAt(0).toUpperCase() + e.slice(1), a = (e + " " + P.join(s + " ") + s).split(" "); return r(t, "string") || r(t, "undefined") ? g(a, t, o, i) : (a = (e + " " + k.join(s + " ") + s).split(" "), v(a, t, n)) } function T(e, t, r) { return y(e, n, n, t, r) } var C = [], _ = [], x = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, t) { var n = this; setTimeout(function () { t(n[e]) }, 0) }, addTest: function (e, t, n) { _.push({ name: e, fn: t, options: n }) }, addAsyncTest: function (e) { _.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = x, Modernizr = new Modernizr, Modernizr.addTest("cookies", function () { try { t.cookie = "cookietest=1"; var e = -1 != t.cookie.indexOf("cookietest="); return t.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e } catch (n) { return !1 } }), Modernizr.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), Modernizr.addTest("fetch", "fetch" in e), Modernizr.addTest("svgfilters", function () { var t = !1; try { t = "SVGFEColorMatrixElement" in e && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE } catch (n) { } return t }); var S = t.documentElement; Modernizr.addTest("willchange", "willChange" in S.style); var w = "svg" === S.nodeName.toLowerCase(); Modernizr.addTest("canvas", function () { var e = s("canvas"); return !(!e.getContext || !e.getContext("2d")) }), Modernizr.addTest("cssremunit", function () { var e = s("a").style; try { e.fontSize = "3rem" } catch (t) { } return /rem/.test(e.fontSize) }), Modernizr.addTest("inlinesvg", function () { var e = s("div"); return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI) }); var E = function () { function e(e, t) { var o; return e ? (t && "string" != typeof t || (t = s(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = s("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o) : !1 } var r = !("onblur" in t.documentElement); return e }(); x.hasEvent = E; var b = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""]; x._prefixes = b, Modernizr.addTest("csscalc", function () { var e = "width:", t = "calc(10px);", n = s("a"); return n.style.cssText = e + b.join(t + e), !!n.style.length }); var z; !function () { var e = {}.hasOwnProperty; z = r(e, "undefined") || r(e.call, "undefined") ? function (e, t) { return t in e && r(e.constructor.prototype[t], "undefined") } : function (t, n) { return e.call(t, n) } }(), x._l = {}, x.on = function (e, t) { this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function () { Modernizr._trigger(e, Modernizr[e]) }, 0) }, x._trigger = function (e, t) { if (this._l[e]) { var n = this._l[e]; setTimeout(function () { var e, r; for (e = 0; e < n.length; e++)(r = n[e])(t) }, 0), delete this._l[e] } }, Modernizr._q.push(function () { x.addTest = u }); var O = x.testStyles = c; Modernizr.addTest("touchevents", function () { var n; if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0; else { var r = ["@media (", b.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join(""); O(r, function (e) { n = 9 === e.offsetTop }) } return n }), O("#modernizr { height: 50vh; }", function (t) { var n = parseInt(e.innerHeight / 2, 10), r = parseInt(a(t, null, "height"), 10); Modernizr.addTest("cssvhunit", r == n) }), O("#modernizr { width: 50vw; }", function (t) { var n = parseInt(e.innerWidth / 2, 10), r = parseInt(a(t, null, "width"), 10); Modernizr.addTest("cssvwunit", r == n) }); var M = function () { var t = e.matchMedia || e.msMatchMedia; return t ? function (e) { var n = t(e); return n && n.matches || !1 } : function (t) { var n = !1; return c("@media " + t + " { #modernizr { position: absolute; } }", function (t) { n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position }), n } }(); x.mq = M, Modernizr.addTest("mediaqueries", M("only all")), Modernizr.addTest("hovermq", M("(hover)")); var A = "Moz O ms Webkit", P = x._config.usePrefixes ? A.split(" ") : []; x._cssomPrefixes = P; var R = function (t) { var r, o = b.length, i = e.CSSRule; if ("undefined" == typeof i) return n; if (!t) return !1; if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t; for (var s = 0; o > s; s++) { var a = b[s], l = a.toUpperCase() + "_" + r; if (l in i) return "@-" + a.toLowerCase() + "-" + t } return !1 }; x.atRule = R; var k = x._config.usePrefixes ? A.toLowerCase().split(" ") : []; x._domPrefixes = k; var j = { elem: s("modernizr") }; Modernizr._q.push(function () { delete j.elem }); var N = { style: j.elem.style }; Modernizr._q.unshift(function () { delete N.style }), x.testAllProps = y; var I = x.prefixed = function (e, t, n) { return 0 === e.indexOf("@") ? R(e) : (-1 != e.indexOf("-") && (e = l(e)), t ? y(e, t, n) : y(e, "pfx")) }; Modernizr.addTest("forcetouch", function () { return E(I("mouseforcewillbegin", e, !1), e) ? MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN && MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN : !1 }), Modernizr.addTest("fullscreen", !(!I("exitFullscreen", t, !1) && !I("cancelFullScreen", t, !1))), Modernizr.addTest("matchmedia", !!I("matchMedia", e)), x.testAllProps = T, Modernizr.addTest("flexbox", T("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", T("boxDirection", "reverse", !0)), Modernizr.addTest("flexboxtweener", T("flexAlign", "end", !0)), Modernizr.addTest("flexwrap", T("flexWrap", "wrap", !0)); var L = "CSS" in e && "supports" in e.CSS, q = "supportsCSS" in e; Modernizr.addTest("supports", L || q), Modernizr.addTest("cssfilters", function () { if (Modernizr.supports) return T("filter", "blur(2px)"); var e = s("a"); return e.style.cssText = b.join("filter:blur(2px); "), !!e.style.length && (t.documentMode === n || t.documentMode > 9) }), o(), i(C), delete x.addTest, delete x.addAsyncTest; for (var U = 0; U < Modernizr._q.length; U++)Modernizr._q[U](); e.Modernizr = Modernizr }(window, document);
/*!
Waypoints Sticky Element Shortcut - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function () {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function (direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function () {
    if (this.options.wrapper) {
      this.$element.wrap(this.options.wrapper)
    }
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function () {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass)
      if (this.options.wrapper) {
        this.$element.unwrap()
      }
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
  ;
/*
 * jQuery BlockUI; v20141123
 * http://jquery.malsup.com/block/
 * Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 */
(function () { "use strict"; function e(e) { function o(o, i) { var s, h, k = o == window, v = i && void 0 !== i.message ? i.message : void 0; if (i = e.extend({}, e.blockUI.defaults, i || {}), !i.ignoreIfBlocked || !e(o).data("blockUI.isBlocked")) { if (i.overlayCSS = e.extend({}, e.blockUI.defaults.overlayCSS, i.overlayCSS || {}), s = e.extend({}, e.blockUI.defaults.css, i.css || {}), i.onOverlayClick && (i.overlayCSS.cursor = "pointer"), h = e.extend({}, e.blockUI.defaults.themedCSS, i.themedCSS || {}), v = void 0 === v ? i.message : v, k && b && t(window, { fadeOut: 0 }), v && "string" != typeof v && (v.parentNode || v.jquery)) { var y = v.jquery ? v[0] : v, m = {}; e(o).data("blockUI.history", m), m.el = y, m.parent = y.parentNode, m.display = y.style.display, m.position = y.style.position, m.parent && m.parent.removeChild(y) } e(o).data("blockUI.onUnblock", i.onUnblock); var g, I, w, U, x = i.baseZ; g = r || i.forceIframe ? e('<iframe class="blockUI" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + i.iframeSrc + '"></iframe>') : e('<div class="blockUI" style="display:none"></div>'), I = i.theme ? e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + x++ + ';display:none"></div>') : e('<div class="blockUI blockOverlay" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), i.theme && k ? (U = '<div class="blockUI ' + i.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:fixed">', i.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : i.theme ? (U = '<div class="blockUI ' + i.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:absolute">', i.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : U = k ? '<div class="blockUI ' + i.blockMsgClass + ' blockPage" style="z-index:' + (x + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + i.blockMsgClass + ' blockElement" style="z-index:' + (x + 10) + ';display:none;position:absolute"></div>', w = e(U), v && (i.theme ? (w.css(h), w.addClass("ui-widget-content")) : w.css(s)), i.theme || I.css(i.overlayCSS), I.css("position", k ? "fixed" : "absolute"), (r || i.forceIframe) && g.css("opacity", 0); var C = [g, I, w], S = k ? e("body") : e(o); e.each(C, function () { this.appendTo(S) }), i.theme && i.draggable && e.fn.draggable && w.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" }); var O = f && (!e.support.boxModel || e("object,embed", k ? null : o).length > 0); if (u || O) { if (k && i.allowBodyStretch && e.support.boxModel && e("html,body").css("height", "100%"), (u || !e.support.boxModel) && !k) var E = d(o, "borderTopWidth"), T = d(o, "borderLeftWidth"), M = E ? "(0 - " + E + ")" : 0, B = T ? "(0 - " + T + ")" : 0; e.each(C, function (e, o) { var t = o[0].style; if (t.position = "absolute", 2 > e) k ? t.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + i.quirksmodeOffsetHack + ') + "px"') : t.setExpression("height", 'this.parentNode.offsetHeight + "px"'), k ? t.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : t.setExpression("width", 'this.parentNode.offsetWidth + "px"'), B && t.setExpression("left", B), M && t.setExpression("top", M); else if (i.centerY) k && t.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), t.marginTop = 0; else if (!i.centerY && k) { var n = i.css && i.css.top ? parseInt(i.css.top, 10) : 0, s = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + n + ') + "px"'; t.setExpression("top", s) } }) } if (v && (i.theme ? w.find(".ui-widget-content").append(v) : w.append(v), (v.jquery || v.nodeType) && e(v).show()), (r || i.forceIframe) && i.showOverlay && g.show(), i.fadeIn) { var j = i.onBlock ? i.onBlock : c, H = i.showOverlay && !v ? j : c, z = v ? j : c; i.showOverlay && I._fadeIn(i.fadeIn, H), v && w._fadeIn(i.fadeIn, z) } else i.showOverlay && I.show(), v && w.show(), i.onBlock && i.onBlock.bind(w)(); if (n(1, o, i), k ? (b = w[0], p = e(i.focusableElements, b), i.focusInput && setTimeout(l, 20)) : a(w[0], i.centerX, i.centerY), i.timeout) { var W = setTimeout(function () { k ? e.unblockUI(i) : e(o).unblock(i) }, i.timeout); e(o).data("blockUI.timeout", W) } } } function t(o, t) { var s, l = o == window, a = e(o), d = a.data("blockUI.history"), c = a.data("blockUI.timeout"); c && (clearTimeout(c), a.removeData("blockUI.timeout")), t = e.extend({}, e.blockUI.defaults, t || {}), n(0, o, t), null === t.onUnblock && (t.onUnblock = a.data("blockUI.onUnblock"), a.removeData("blockUI.onUnblock")); var r; r = l ? e("body").children().filter(".blockUI").add("body > .blockUI") : a.find(">.blockUI"), t.cursorReset && (r.length > 1 && (r[1].style.cursor = t.cursorReset), r.length > 2 && (r[2].style.cursor = t.cursorReset)), l && (b = p = null), t.fadeOut ? (s = r.length, r.stop().fadeOut(t.fadeOut, function () { 0 === --s && i(r, d, t, o) })) : i(r, d, t, o) } function i(o, t, i, n) { var s = e(n); if (!s.data("blockUI.isBlocked")) { o.each(function () { this.parentNode && this.parentNode.removeChild(this) }), t && t.el && (t.el.style.display = t.display, t.el.style.position = t.position, t.el.style.cursor = "default", t.parent && t.parent.appendChild(t.el), s.removeData("blockUI.history")), s.data("blockUI.static") && s.css("position", "static"), "function" == typeof i.onUnblock && i.onUnblock(n, i); var l = e(document.body), a = l.width(), d = l[0].style.width; l.width(a - 1).width(a), l[0].style.width = d } } function n(o, t, i) { var n = t == window, l = e(t); if ((o || (!n || b) && (n || l.data("blockUI.isBlocked"))) && (l.data("blockUI.isBlocked", o), n && i.bindEvents && (!o || i.showOverlay))) { var a = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove"; o ? e(document).bind(a, i, s) : e(document).unbind(a, s) } } function s(o) { if ("keydown" === o.type && o.keyCode && 9 == o.keyCode && b && o.data.constrainTabKey) { var t = p, i = !o.shiftKey && o.target === t[t.length - 1], n = o.shiftKey && o.target === t[0]; if (i || n) return setTimeout(function () { l(n) }, 10), !1 } var s = o.data, a = e(o.target); return a.hasClass("blockOverlay") && s.onOverlayClick && s.onOverlayClick(o), a.parents("div." + s.blockMsgClass).length > 0 ? !0 : 0 === a.parents().children().filter("div.blockUI").length } function l(e) { if (p) { var o = p[e === !0 ? p.length - 1 : 0]; o && o.focus() } } function a(e, o, t) { var i = e.parentNode, n = e.style, s = (i.offsetWidth - e.offsetWidth) / 2 - d(i, "borderLeftWidth"), l = (i.offsetHeight - e.offsetHeight) / 2 - d(i, "borderTopWidth"); o && (n.left = s > 0 ? s + "px" : "0"), t && (n.top = l > 0 ? l + "px" : "0") } function d(o, t) { return parseInt(e.css(o, t), 10) || 0 } e.fn._fadeIn = e.fn.fadeIn; var c = e.noop || function () { }, r = /MSIE/.test(navigator.userAgent), u = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent); document.documentMode || 0; var f = e.isFunction(document.createElement("div").style.setExpression); e.blockUI = function (e) { o(window, e) }, e.unblockUI = function (e) { t(window, e) }, e.growlUI = function (o, t, i, n) { var s = e('<div class="growlUI"></div>'); o && s.append("<h1>" + o + "</h1>"), t && s.append("<h2>" + t + "</h2>"), void 0 === i && (i = 3e3); var l = function (o) { o = o || {}, e.blockUI({ message: s, fadeIn: o.fadeIn !== void 0 ? o.fadeIn : 700, fadeOut: o.fadeOut !== void 0 ? o.fadeOut : 1e3, timeout: o.timeout !== void 0 ? o.timeout : i, centerY: !1, showOverlay: !1, onUnblock: n, css: e.blockUI.defaults.growlCSS }) }; l(), s.css("opacity"), s.mouseover(function () { l({ fadeIn: 0, timeout: 3e4 }); var o = e(".blockMsg"); o.stop(), o.fadeTo(300, 1) }).mouseout(function () { e(".blockMsg").fadeOut(1e3) }) }, e.fn.block = function (t) { if (this[0] === window) return e.blockUI(t), this; var i = e.extend({}, e.blockUI.defaults, t || {}); return this.each(function () { var o = e(this); i.ignoreIfBlocked && o.data("blockUI.isBlocked") || o.unblock({ fadeOut: 0 }) }), this.each(function () { "static" == e.css(this, "position") && (this.style.position = "relative", e(this).data("blockUI.static", !0)), this.style.zoom = 1, o(this, t) }) }, e.fn.unblock = function (o) { return this[0] === window ? (e.unblockUI(o), this) : this.each(function () { t(this, o) }) }, e.blockUI.version = 2.7, e.blockUI.defaults = { message: "<h1>Please wait...</h1>", title: null, draggable: !0, theme: !1, css: { padding: 0, margin: 0, width: "30%", top: "40%", left: "35%", textAlign: "center", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" }, themedCSS: { width: "30%", top: "40%", left: "35%" }, overlayCSS: { backgroundColor: "#000", opacity: .6, cursor: "wait" }, cursorReset: "default", growlCSS: { width: "350px", top: "10px", left: "", right: "10px", border: "none", padding: "5px", opacity: .6, cursor: "default", color: "#fff", backgroundColor: "#000", "-webkit-border-radius": "10px", "-moz-border-radius": "10px", "border-radius": "10px" }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: !1, baseZ: 1e3, centerX: !0, centerY: !0, allowBodyStretch: !0, bindEvents: !0, constrainTabKey: !0, fadeIn: 200, fadeOut: 400, timeout: 0, showOverlay: !0, focusInput: !0, focusableElements: ":input:enabled:visible", onBlock: null, onUnblock: null, onOverlayClick: null, quirksmodeOffsetHack: 4, blockMsgClass: "blockMsg", ignoreIfBlocked: !1 }; var b = null, p = [] } "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery) })();

/*
 * jQuery Form Plugin; v20130916
 * http://jquery.malsup.com/form/
 * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 * https://github.com/malsup/form#copyright-and-license
 */
(function (e) { "use strict"; function t(t) { var r = t.data; t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r)) } function r(t) { var r = t.target, a = e(r); if (!a.is("[type=submit],[type=image]")) { var n = a.closest("[type=submit]"); if (0 === n.length) return; r = n[0] } var i = this; if (i.clk = r, "image" == r.type) if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) { var o = a.offset(); i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop; setTimeout(function () { i.clk = i.clk_x = i.clk_y = null }, 100) } function a() { if (e.fn.ajaxSubmit.debug) { var t = "[jquery.form] " + Array.prototype.join.call(arguments, ""); window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t) } } var n = {}; n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData; var i = !!e.fn.prop; e.fn.attr2 = function () { if (!i) return this.attr.apply(this, arguments); var e = this.prop.apply(this, arguments); return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments) }, e.fn.ajaxSubmit = function (t) { function r(r) { var a, n, i = e.param(r, t.traditional).split("&"), o = i.length, s = []; for (a = 0; o > a; a++)i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]); return s } function o(a) { for (var n = new FormData, i = 0; a.length > i; i++)n.append(a[i].name, a[i].value); if (t.extraData) { var o = r(t.extraData); for (i = 0; o.length > i; i++)o[i] && n.append(o[i][0], o[i][1]) } t.data = null; var s = e.extend(!0, {}, e.ajaxSettings, t, { contentType: !1, processData: !1, cache: !1, type: u || "POST" }); t.uploadProgress && (s.xhr = function () { var r = e.ajaxSettings.xhr(); return r.upload && r.upload.addEventListener("progress", function (e) { var r = 0, a = e.loaded || e.position, n = e.total; e.lengthComputable && (r = Math.ceil(100 * (a / n))), t.uploadProgress(e, a, n, r) }, !1), r }), s.data = null; var l = s.beforeSend; return s.beforeSend = function (e, t) { t.data = n, l && l.call(this, e, t) }, e.ajax(s) } function s(r) { function n(e) { var t = null; try { e.contentWindow && (t = e.contentWindow.document) } catch (r) { a("cannot get iframe.contentWindow document: " + r) } if (t) return t; try { t = e.contentDocument ? e.contentDocument : e.document } catch (r) { a("cannot get iframe.contentDocument: " + r), t = e.document } return t } function o() { function t() { try { var e = n(g).readyState; a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50) } catch (r) { a("Server abort: ", r, " (", r.name, ")"), s(D), j && clearTimeout(j), j = void 0 } } var r = f.attr2("target"), i = f.attr2("action"); w.setAttribute("target", d), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }), m.timeout && (j = setTimeout(function () { T = !0, s(k) }, m.timeout)); var o = []; try { if (m.extraData) for (var l in m.extraData) m.extraData.hasOwnProperty(l) && (e.isPlainObject(m.extraData[l]) && m.extraData[l].hasOwnProperty("name") && m.extraData[l].hasOwnProperty("value") ? o.push(e('<input type="hidden" name="' + m.extraData[l].name + '">').val(m.extraData[l].value).appendTo(w)[0]) : o.push(e('<input type="hidden" name="' + l + '">').val(m.extraData[l]).appendTo(w)[0])); m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15); try { w.submit() } catch (c) { var p = document.createElement("form").submit; p.apply(w) } } finally { w.setAttribute("action", i), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(o).remove() } } function s(t) { if (!x.aborted && !F) { if (M = n(g), M || (a("cannot access response document"), t = D), t === k && x) return x.abort("timeout"), S.reject(x, "timeout"), void 0; if (t == D && x) return x.abort("server abort"), S.reject(x, "error", "server abort"), void 0; if (M && M.location.href != m.iframeSrc || T) { g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1); var r, i = "success"; try { if (T) throw "timeout"; var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M); if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), setTimeout(s, 250), void 0; var u = M.body ? M.body : M.documentElement; x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function (e) { var t = { "content-type": m.dataType }; return t[e.toLowerCase()] }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText); var l = (m.dataType || "").toLowerCase(), c = /(json|script|text)/.test(l); if (c || m.textarea) { var f = M.getElementsByTagName("textarea")[0]; if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText; else if (c) { var d = M.getElementsByTagName("pre")[0], h = M.getElementsByTagName("body")[0]; d ? x.responseText = d.textContent ? d.textContent : d.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText) } } else "xml" == l && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText)); try { E = _(x, l, m) } catch (b) { i = "parsererror", x.error = r = b || i } } catch (b) { a("error caught: ", b), i = "error", x.error = r = b || i } x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && 300 > x.status || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), p && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), p && e.event.trigger("ajaxError", [x, m, r])), p && e.event.trigger("ajaxComplete", [x, m]), p && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function () { m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null }, 100) } } } var l, c, m, p, d, v, g, x, b, y, T, j, w = f[0], S = e.Deferred(); if (S.abort = function (e) { x.abort(e) }, r) for (c = 0; h.length > c; c++)l = e(h[c]), i ? l.prop("disabled", !1) : l.removeAttr("disabled"); if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, d = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), y = v.attr2("name"), y ? d = y : v.attr2("name", d)) : (v = e('<iframe name="' + d + '" src="' + m.iframeSrc + '" />'), v.css({ position: "absolute", top: "-1000px", left: "-1000px" })), g = v[0], x = { aborted: 0, responseText: null, responseXML: null, status: 0, statusText: "n/a", getAllResponseHeaders: function () { }, getResponseHeader: function () { }, setRequestHeader: function () { }, abort: function (t) { var r = "timeout" === t ? "timeout" : "aborted"; a("aborting upload... " + r), this.aborted = 1; try { g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop") } catch (n) { } v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), p && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r) } }, p = m.global, p && 0 === e.active++ && e.event.trigger("ajaxStart"), p && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S; if (x.aborted) return S.reject(), S; b = w.clk, b && (y = b.name, y && !b.disabled && (m.extraData = m.extraData || {}, m.extraData[y] = b.value, "image" == b.type && (m.extraData[y + ".x"] = w.clk_x, m.extraData[y + ".y"] = w.clk_y))); var k = 1, D = 2, A = e("meta[name=csrf-token]").attr("content"), L = e("meta[name=csrf-param]").attr("content"); L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10); var E, M, F, O = 50, X = e.parseXML || function (e, t) { return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null }, C = e.parseJSON || function (e) { return window.eval("(" + e + ")") }, _ = function (t, r, a) { var n = t.getResponseHeader("content-type") || "", i = "xml" === r || !r && n.indexOf("xml") >= 0, o = i ? t.responseXML : t.responseText; return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o }; return S } if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this; var u, l, c, f = this; "function" == typeof t ? t = { success: t } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), l = t.url || this.attr2("action"), c = "string" == typeof l ? e.trim(l) : "", c = c || window.location.href || "", c && (c = (c.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, { url: c, success: e.ajaxSettings.success, type: u || e.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, t); var m = {}; if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this; if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this; var p = t.traditional; void 0 === p && (p = e.ajaxSettings.traditional); var d, h = [], v = this.formToArray(t.semantic, h); if (t.data && (t.extraData = t.data, d = e.param(t.data, p)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this; if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this; var g = e.param(v, p); d && (g = g ? g + "&" + d : d), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g; var x = []; if (t.resetForm && x.push(function () { f.resetForm() }), t.clearForm && x.push(function () { f.clearForm(t.includeHidden) }), !t.dataType && t.target) { var b = t.success || function () { }; x.push(function (r) { var a = t.replaceTarget ? "replaceWith" : "html"; e(t.target)[a](r).each(b, arguments) }) } else t.success && x.push(t.success); if (t.success = function (e, r, a) { for (var n = t.context || this, i = 0, o = x.length; o > i; i++)x[i].apply(n, [e, r, a || f, f]) }, t.error) { var y = t.error; t.error = function (e, r, a) { var n = t.context || this; y.apply(n, [e, r, a, f]) } } if (t.complete) { var T = t.complete; t.complete = function (e, r) { var a = t.context || this; T.apply(a, [e, r, f]) } } var j = e("input[type=file]:enabled", this).filter(function () { return "" !== e(this).val() }), w = j.length > 0, S = "multipart/form-data", k = f.attr("enctype") == S || f.attr("encoding") == S, D = n.fileapi && n.formdata; a("fileAPI :" + D); var A, L = (w || k) && !D; t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () { A = s(v) }) : A = s(v) : A = (w || k) && D ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A); for (var E = 0; h.length > E; E++)h[E] = null; return this.trigger("form-submit-notify", [this, t]), this }, e.fn.ajaxForm = function (n) { if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) { var i = { s: this.selector, c: this.context }; return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function () { e(i.s, i.c).ajaxForm(n) }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this) } return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r) }, e.fn.ajaxFormUnbind = function () { return this.unbind("submit.form-plugin click.form-plugin") }, e.fn.formToArray = function (t, r) { var a = []; if (0 === this.length) return a; var i = this[0], o = t ? i.getElementsByTagName("*") : i.elements; if (!o) return a; var s, u, l, c, f, m, p; for (s = 0, m = o.length; m > s; s++)if (f = o[s], l = f.name, l && !f.disabled) if (t && i.clk && "image" == f.type) i.clk == f && (a.push({ name: l, value: e(f).val(), type: f.type }), a.push({ name: l + ".x", value: i.clk_x }, { name: l + ".y", value: i.clk_y })); else if (c = e.fieldValue(f, !0), c && c.constructor == Array) for (r && r.push(f), u = 0, p = c.length; p > u; u++)a.push({ name: l, value: c[u] }); else if (n.fileapi && "file" == f.type) { r && r.push(f); var d = f.files; if (d.length) for (u = 0; d.length > u; u++)a.push({ name: l, value: d[u], type: f.type }); else a.push({ name: l, value: "", type: f.type }) } else null !== c && c !== void 0 && (r && r.push(f), a.push({ name: l, value: c, type: f.type, required: f.required })); if (!t && i.clk) { var h = e(i.clk), v = h[0]; l = v.name, l && !v.disabled && "image" == v.type && (a.push({ name: l, value: h.val() }), a.push({ name: l + ".x", value: i.clk_x }, { name: l + ".y", value: i.clk_y })) } return a }, e.fn.formSerialize = function (t) { return e.param(this.formToArray(t)) }, e.fn.fieldSerialize = function (t) { var r = []; return this.each(function () { var a = this.name; if (a) { var n = e.fieldValue(this, t); if (n && n.constructor == Array) for (var i = 0, o = n.length; o > i; i++)r.push({ name: a, value: n[i] }); else null !== n && n !== void 0 && r.push({ name: this.name, value: n }) } }), e.param(r) }, e.fn.fieldValue = function (t) { for (var r = [], a = 0, n = this.length; n > a; a++) { var i = this[a], o = e.fieldValue(i, t); null === o || void 0 === o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o)) } return r }, e.fieldValue = function (t, r) { var a = t.name, n = t.type, i = t.tagName.toLowerCase(); if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null; if ("select" == i) { var o = t.selectedIndex; if (0 > o) return null; for (var s = [], u = t.options, l = "select-one" == n, c = l ? o + 1 : u.length, f = l ? o : 0; c > f; f++) { var m = u[f]; if (m.selected) { var p = m.value; if (p || (p = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), l) return p; s.push(p) } } return s } return e(t).val() }, e.fn.clearForm = function (t) { return this.each(function () { e("input,select,textarea", this).clearFields(t) }) }, e.fn.clearFields = e.fn.clearInputs = function (t) { var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; return this.each(function () { var a = this.type, n = this.tagName.toLowerCase(); r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "") }) }, e.fn.resetForm = function () { return this.each(function () { ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset() }) }, e.fn.enable = function (e) { return void 0 === e && (e = !0), this.each(function () { this.disabled = !e }) }, e.fn.selected = function (t) { return void 0 === t && (t = !0), this.each(function () { var r = this.type; if ("checkbox" == r || "radio" == r) this.checked = t; else if ("option" == this.tagName.toLowerCase()) { var a = e(this).parent("select"); t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t } }) }, e.fn.ajaxSubmit.debug = !1 })("undefined" != typeof jQuery ? jQuery : window.Zepto);

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
; (function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery || window.Zepto);
  }
}(function ($) {

  /*>>core*/
  /**
   *
   * Magnific Popup Core JS file
   *
   */


  /**
   * Private static constants
   */
  var CLOSE_EVENT = 'Close',
    BEFORE_CLOSE_EVENT = 'BeforeClose',
    AFTER_CLOSE_EVENT = 'AfterClose',
    BEFORE_APPEND_EVENT = 'BeforeAppend',
    MARKUP_PARSE_EVENT = 'MarkupParse',
    OPEN_EVENT = 'Open',
    CHANGE_EVENT = 'Change',
    NS = 'mfp',
    EVENT_NS = '.' + NS,
    READY_CLASS = 'mfp-ready',
    REMOVING_CLASS = 'mfp-removing',
    PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


  /**
   * Private vars
   */
  /*jshint -W079 */
  var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
    MagnificPopup = function () { },
    _isJQ = !!(window.jQuery),
    _prevStatus,
    _window = $(window),
    _document,
    _prevContentType,
    _wrapClasses,
    _currPopupType;


  /**
   * Private functions
   */
  var _mfpOn = function (name, f) {
    mfp.ev.on(NS + name + EVENT_NS, f);
  },
    _getEl = function (className, appendTo, html, raw) {
      var el = document.createElement('div');
      el.className = 'mfp-' + className;
      if (html) {
        el.innerHTML = html;
      }
      if (!raw) {
        el = $(el);
        if (appendTo) {
          el.appendTo(appendTo);
        }
      } else if (appendTo) {
        appendTo.appendChild(el);
      }
      return el;
    },
    _mfpTrigger = function (e, data) {
      mfp.ev.triggerHandler(NS + e, data);

      if (mfp.st.callbacks) {
        // converts "mfpEventName" to "eventName" callback and triggers it if it's present
        e = e.charAt(0).toLowerCase() + e.slice(1);
        if (mfp.st.callbacks[e]) {
          mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
        }
      }
    },
    _getCloseBtn = function (type) {
      if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
        mfp.currTemplate.closeBtn = $(mfp.st.closeMarkup.replace('%title%', mfp.st.tClose));
        _currPopupType = type;
      }
      return mfp.currTemplate.closeBtn;
    },
    // Initialize Magnific Popup only when called at least once
    _checkInstance = function () {
      if (!$.magnificPopup.instance) {
        /*jshint -W020 */
        mfp = new MagnificPopup();
        mfp.init();
        $.magnificPopup.instance = mfp;
      }
    },
    // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
    supportsTransitions = function () {
      var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
        v = ['ms', 'O', 'Moz', 'Webkit']; // 'v' for vendor

      if (s['transition'] !== undefined) {
        return true;
      }

      while (v.length) {
        if (v.pop() + 'Transition' in s) {
          return true;
        }
      }

      return false;
    };



  /**
   * Public functions
   */
  MagnificPopup.prototype = {

    constructor: MagnificPopup,

    /**
     * Initializes Magnific Popup plugin.
     * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
     */
    init: function () {
      var appVersion = navigator.appVersion;
      mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
      mfp.isAndroid = (/android/gi).test(appVersion);
      mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
      mfp.supportsTransition = supportsTransitions();

      // We disable fixed positioned lightbox on devices that don't handle it nicely.
      // If you know a better way of detecting this - let me know.
      mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
      _document = $(document);

      mfp.popupsCache = {};
    },

    /**
     * Opens popup
     * @param  data [description]
     */
    open: function (data) {

      var i;

      if (data.isObj === false) {
        // convert jQuery collection to array to avoid conflicts later
        mfp.items = data.items.toArray();

        mfp.index = 0;
        var items = data.items,
          item;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.parsed) {
            item = item.el[0];
          }
          if (item === data.el[0]) {
            mfp.index = i;
            break;
          }
        }
      } else {
        mfp.items = $.isArray(data.items) ? data.items : [data.items];
        mfp.index = data.index || 0;
      }

      // if popup is already opened - we just update the content
      if (mfp.isOpen) {
        mfp.updateItemHTML();
        return;
      }

      mfp.types = [];
      _wrapClasses = '';
      if (data.mainEl && data.mainEl.length) {
        mfp.ev = data.mainEl.eq(0);
      } else {
        mfp.ev = _document;
      }

      if (data.key) {
        if (!mfp.popupsCache[data.key]) {
          mfp.popupsCache[data.key] = {};
        }
        mfp.currTemplate = mfp.popupsCache[data.key];
      } else {
        mfp.currTemplate = {};
      }



      mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
      mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

      if (mfp.st.modal) {
        mfp.st.closeOnContentClick = false;
        mfp.st.closeOnBgClick = false;
        mfp.st.showCloseBtn = false;
        mfp.st.enableEscapeKey = false;
      }


      // Building markup
      // main containers are created only once
      if (!mfp.bgOverlay) {

        // Dark overlay
        mfp.bgOverlay = _getEl('bg').on('click' + EVENT_NS, function () {
          mfp.close();
        });

        mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click' + EVENT_NS, function (e) {
          if (mfp._checkIfClose(e.target)) {
            mfp.close();
          }
        });

        mfp.container = _getEl('container', mfp.wrap);
      }

      mfp.contentContainer = _getEl('content');
      if (mfp.st.preloader) {
        mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
      }


      // Initializing modules
      var modules = $.magnificPopup.modules;
      for (i = 0; i < modules.length; i++) {
        var n = modules[i];
        n = n.charAt(0).toUpperCase() + n.slice(1);
        mfp['init' + n].call(mfp);
      }
      _mfpTrigger('BeforeOpen');


      if (mfp.st.showCloseBtn) {
        // Close button
        if (!mfp.st.closeBtnInside) {
          mfp.wrap.append(_getCloseBtn());
        } else {
          _mfpOn(MARKUP_PARSE_EVENT, function (e, template, values, item) {
            values.close_replaceWith = _getCloseBtn(item.type);
          });
          _wrapClasses += ' mfp-close-btn-in';
        }
      }

      if (mfp.st.alignTop) {
        _wrapClasses += ' mfp-align-top';
      }



      if (mfp.fixedContentPos) {
        mfp.wrap.css({
          overflow: mfp.st.overflowY,
          overflowX: 'hidden',
          overflowY: mfp.st.overflowY
        });
      } else {
        mfp.wrap.css({
          top: _window.scrollTop(),
          position: 'absolute'
        });
      }
      if (mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos)) {
        mfp.bgOverlay.css({
          height: _document.height(),
          position: 'absolute'
        });
      }



      if (mfp.st.enableEscapeKey) {
        // Close on ESC key
        _document.on('keyup' + EVENT_NS, function (e) {
          if (e.keyCode === 27) {
            mfp.close();
          }
        });
      }

      _window.on('resize' + EVENT_NS, function () {
        mfp.updateSize();
      });


      if (!mfp.st.closeOnContentClick) {
        _wrapClasses += ' mfp-auto-cursor';
      }

      if (_wrapClasses)
        mfp.wrap.addClass(_wrapClasses);


      // this triggers recalculation of layout, so we get it once to not to trigger twice
      var windowHeight = mfp.wH = _window.height();


      var windowStyles = {};

      if (mfp.fixedContentPos) {
        if (mfp._hasScrollBar(windowHeight)) {
          var s = mfp._getScrollbarSize();
          if (s) {
            windowStyles.marginRight = s;
          }
        }
      }

      if (mfp.fixedContentPos) {
        if (!mfp.isIE7) {
          windowStyles.overflow = 'hidden';
        } else {
          // ie7 double-scroll bug
          $('body, html').css('overflow', 'hidden');
        }
      }



      var classesToadd = mfp.st.mainClass;
      if (mfp.isIE7) {
        classesToadd += ' mfp-ie7';
      }
      if (classesToadd) {
        mfp._addClassToMFP(classesToadd);
      }

      // add content
      mfp.updateItemHTML();

      _mfpTrigger('BuildControls');

      // remove scrollbar, add margin e.t.c
      $('html').css(windowStyles);

      // add everything to DOM
      mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || $(document.body));

      // Save last focused element
      mfp._lastFocusedEl = document.activeElement;

      // Wait for next cycle to allow CSS transition
      setTimeout(function () {

        if (mfp.content) {
          mfp._addClassToMFP(READY_CLASS);
          mfp._setFocus();
        } else {
          // if content is not defined (not loaded e.t.c) we add class only for BG
          mfp.bgOverlay.addClass(READY_CLASS);
        }

        // Trap the focus in popup
        _document.on('focusin' + EVENT_NS, mfp._onFocusIn);

      }, 16);

      mfp.isOpen = true;
      mfp.updateSize(windowHeight);
      _mfpTrigger(OPEN_EVENT);

      return data;
    },

    /**
     * Closes the popup
     */
    close: function () {
      if (!mfp.isOpen) return;
      _mfpTrigger(BEFORE_CLOSE_EVENT);

      mfp.isOpen = false;
      // for CSS3 animation
      if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
        mfp._addClassToMFP(REMOVING_CLASS);
        setTimeout(function () {
          mfp._close();
        }, mfp.st.removalDelay);
      } else {
        mfp._close();
      }
    },

    /**
     * Helper for close() function
     */
    _close: function () {
      _mfpTrigger(CLOSE_EVENT);

      var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

      mfp.bgOverlay.detach();
      mfp.wrap.detach();
      mfp.container.empty();

      if (mfp.st.mainClass) {
        classesToRemove += mfp.st.mainClass + ' ';
      }

      mfp._removeClassFromMFP(classesToRemove);

      if (mfp.fixedContentPos) {
        var windowStyles = { marginRight: '' };
        if (mfp.isIE7) {
          $('body, html').css('overflow', '');
        } else {
          windowStyles.overflow = '';
        }
        $('html').css(windowStyles);
      }

      _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
      mfp.ev.off(EVENT_NS);

      // clean up DOM elements that aren't removed
      mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
      mfp.bgOverlay.attr('class', 'mfp-bg');
      mfp.container.attr('class', 'mfp-container');

      // remove close button from target element
      if (mfp.st.showCloseBtn &&
        (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
        if (mfp.currTemplate.closeBtn)
          mfp.currTemplate.closeBtn.detach();
      }


      if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
        $(mfp._lastFocusedEl).focus(); // put tab focus back
      }
      mfp.currItem = null;
      mfp.content = null;
      mfp.currTemplate = null;
      mfp.prevHeight = 0;

      _mfpTrigger(AFTER_CLOSE_EVENT);
    },

    updateSize: function (winHeight) {

      if (mfp.isIOS) {
        // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
        var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
        var height = window.innerHeight * zoomLevel;
        mfp.wrap.css('height', height);
        mfp.wH = height;
      } else {
        mfp.wH = winHeight || _window.height();
      }
      // Fixes #84: popup incorrectly positioned with position:relative on body
      if (!mfp.fixedContentPos) {
        mfp.wrap.css('height', mfp.wH);
      }

      _mfpTrigger('Resize');

    },

    /**
     * Set content of popup based on current index
     */
    updateItemHTML: function () {
      var item = mfp.items[mfp.index];

      // Detach and perform modifications
      mfp.contentContainer.detach();

      if (mfp.content)
        mfp.content.detach();

      if (!item.parsed) {
        item = mfp.parseEl(mfp.index);
      }

      var type = item.type;

      _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
      // BeforeChange event works like so:
      // _mfpOn('BeforeChange', function(e, prevType, newType) { });

      mfp.currItem = item;

      if (!mfp.currTemplate[type]) {
        var markup = mfp.st[type] ? mfp.st[type].markup : false;

        // allows to modify markup
        _mfpTrigger('FirstMarkupParse', markup);

        if (markup) {
          mfp.currTemplate[type] = $(markup);
        } else {
          // if there is no markup found we just define that template is parsed
          mfp.currTemplate[type] = true;
        }
      }

      if (_prevContentType && _prevContentType !== item.type) {
        mfp.container.removeClass('mfp-' + _prevContentType + '-holder');
      }

      var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
      mfp.appendContent(newContent, type);

      item.preloaded = true;

      _mfpTrigger(CHANGE_EVENT, item);
      _prevContentType = item.type;

      // Append container back after its content changed
      mfp.container.prepend(mfp.contentContainer);

      _mfpTrigger('AfterChange');
    },


    /**
     * Set HTML content of popup
     */
    appendContent: function (newContent, type) {
      mfp.content = newContent;

      if (newContent) {
        if (mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
          mfp.currTemplate[type] === true) {
          // if there is no markup, we just append close button element inside
          if (!mfp.content.find('.mfp-close').length) {
            mfp.content.append(_getCloseBtn());
          }
        } else {
          mfp.content = newContent;
        }
      } else {
        mfp.content = '';
      }

      _mfpTrigger(BEFORE_APPEND_EVENT);
      mfp.container.addClass('mfp-' + type + '-holder');

      mfp.contentContainer.append(mfp.content);
    },


    /**
     * Creates Magnific Popup data object based on given data
     * @param  {int} index Index of item to parse
     */
    parseEl: function (index) {
      var item = mfp.items[index],
        type;

      if (item.tagName) {
        item = { el: $(item) };
      } else {
        type = item.type;
        item = { data: item, src: item.src };
      }

      if (item.el) {
        var types = mfp.types;

        // check for 'mfp-TYPE' class
        for (var i = 0; i < types.length; i++) {
          if (item.el.hasClass('mfp-' + types[i])) {
            type = types[i];
            break;
          }
        }

        item.src = item.el.attr('data-mfp-src');
        if (!item.src) {
          item.src = item.el.attr('href');
        }
      }

      item.type = type || mfp.st.type || 'inline';
      item.index = index;
      item.parsed = true;
      mfp.items[index] = item;
      _mfpTrigger('ElementParse', item);

      return mfp.items[index];
    },


    /**
     * Initializes single popup or a group of popups
     */
    addGroup: function (el, options) {
      var eHandler = function (e) {
        e.mfpEl = this;
        mfp._openClick(e, el, options);
      };

      if (!options) {
        options = {};
      }

      var eName = 'click.magnificPopup';
      options.mainEl = el;

      if (options.items) {
        options.isObj = true;
        el.off(eName).on(eName, eHandler);
      } else {
        options.isObj = false;
        if (options.delegate) {
          el.off(eName).on(eName, options.delegate, eHandler);
        } else {
          options.items = el;
          el.off(eName).on(eName, eHandler);
        }
      }
    },
    _openClick: function (e, el, options) {
      var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


      if (!midClick && (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
        return;
      }

      var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

      if (disableOn) {
        if ($.isFunction(disableOn)) {
          if (!disableOn.call(mfp)) {
            return true;
          }
        } else { // else it's number
          if (_window.width() < disableOn) {
            return true;
          }
        }
      }

      if (e.type) {
        e.preventDefault();

        // This will prevent popup from closing if element is inside and popup is already opened
        if (mfp.isOpen) {
          e.stopPropagation();
        }
      }

      options.el = $(e.mfpEl);
      if (options.delegate) {
        options.items = el.find(options.delegate);
      }
      mfp.open(options);
    },


    /**
     * Updates text on preloader
     */
    updateStatus: function (status, text) {

      if (mfp.preloader) {
        if (_prevStatus !== status) {
          mfp.container.removeClass('mfp-s-' + _prevStatus);
        }

        if (!text && status === 'loading') {
          text = mfp.st.tLoading;
        }

        var data = {
          status: status,
          text: text
        };
        // allows to modify status
        _mfpTrigger('UpdateStatus', data);

        status = data.status;
        text = data.text;

        mfp.preloader.html(text);

        mfp.preloader.find('a').on('click', function (e) {
          e.stopImmediatePropagation();
        });

        mfp.container.addClass('mfp-s-' + status);
        _prevStatus = status;
      }
    },


    /*
      "Private" helpers that aren't private at all
     */
    // Check to close popup or not
    // "target" is an element that was clicked
    _checkIfClose: function (target) {

      if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
        return;
      }

      var closeOnContent = mfp.st.closeOnContentClick;
      var closeOnBg = mfp.st.closeOnBgClick;

      if (closeOnContent && closeOnBg) {
        return true;
      } else {

        // We close the popup if click is on close button or on preloader. Or if there is no content.
        if (!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0])) {
          return true;
        }

        // if click is outside the content
        if ((target !== mfp.content[0] && !$.contains(mfp.content[0], target))) {
          if (closeOnBg) {
            // last check, if the clicked element is in DOM, (in case it's removed onclick)
            if ($.contains(document, target)) {
              return true;
            }
          }
        } else if (closeOnContent) {
          return true;
        }

      }
      return false;
    },
    _addClassToMFP: function (cName) {
      mfp.bgOverlay.addClass(cName);
      mfp.wrap.addClass(cName);
    },
    _removeClassFromMFP: function (cName) {
      this.bgOverlay.removeClass(cName);
      mfp.wrap.removeClass(cName);
    },
    _hasScrollBar: function (winHeight) {
      return ((mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()));
    },
    _setFocus: function () {
      (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
    },
    _onFocusIn: function (e) {
      if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
        mfp._setFocus();
        return false;
      }
    },
    _parseMarkup: function (template, values, item) {
      var arr;
      if (item.data) {
        values = $.extend(item.data, values);
      }
      _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

      $.each(values, function (key, value) {
        if (value === undefined || value === false) {
          return true;
        }
        arr = key.split('_');
        if (arr.length > 1) {
          var el = template.find(EVENT_NS + '-' + arr[0]);

          if (el.length > 0) {
            var attr = arr[1];
            if (attr === 'replaceWith') {
              if (el[0] !== value[0]) {
                el.replaceWith(value);
              }
            } else if (attr === 'img') {
              if (el.is('img')) {
                el.attr('src', value);
              } else {
                el.replaceWith($('<img>').attr('src', value).attr('class', el.attr('class')));
              }
            } else {
              el.attr(arr[1], value);
            }
          }

        } else {
          template.find(EVENT_NS + '-' + key).html(value);
        }
      });
    },

    _getScrollbarSize: function () {
      // thx David
      if (mfp.scrollbarSize === undefined) {
        var scrollDiv = document.createElement("div");
        scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
        document.body.appendChild(scrollDiv);
        mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
      }
      return mfp.scrollbarSize;
    }

  }; /* MagnificPopup core prototype end */




  /**
   * Public static functions
   */
  $.magnificPopup = {
    instance: null,
    proto: MagnificPopup.prototype,
    modules: [],

    open: function (options, index) {
      _checkInstance();

      if (!options) {
        options = {};
      } else {
        options = $.extend(true, {}, options);
      }

      options.isObj = true;
      options.index = index || 0;
      return this.instance.open(options);
    },

    close: function () {
      return $.magnificPopup.instance && $.magnificPopup.instance.close();
    },

    registerModule: function (name, module) {
      if (module.options) {
        $.magnificPopup.defaults[name] = module.options;
      }
      $.extend(this.proto, module.proto);
      this.modules.push(name);
    },

    defaults: {

      // Info about options is in docs:
      // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

      disableOn: 0,

      key: null,

      midClick: false,

      mainClass: '',

      preloader: true,

      focus: '', // CSS selector of input to focus after popup is opened

      closeOnContentClick: false,

      closeOnBgClick: true,

      closeBtnInside: true,

      showCloseBtn: true,

      enableEscapeKey: true,

      modal: false,

      alignTop: false,

      removalDelay: 0,

      prependTo: null,

      fixedContentPos: 'auto',

      fixedBgPos: 'auto',

      overflowY: 'auto',

      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

      tClose: 'Close (Esc)',

      tLoading: 'Loading...',

      autoFocusLast: true

    }
  };



  $.fn.magnificPopup = function (options) {
    _checkInstance();

    var jqEl = $(this);

    // We call some API method of first param is a string
    if (typeof options === "string") {

      if (options === 'open') {
        var items,
          itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
          index = parseInt(arguments[1], 10) || 0;

        if (itemOpts.items) {
          items = itemOpts.items[index];
        } else {
          items = jqEl;
          if (itemOpts.delegate) {
            items = items.find(itemOpts.delegate);
          }
          items = items.eq(index);
        }
        mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
      } else {
        if (mfp.isOpen)
          mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
      }

    } else {
      // clone options obj
      options = $.extend(true, {}, options);

      /*
       * As Zepto doesn't support .data() method for objects
       * and it works only in normal browsers
       * we assign "options" object directly to the DOM element. FTW!
       */
      if (_isJQ) {
        jqEl.data('magnificPopup', options);
      } else {
        jqEl[0].magnificPopup = options;
      }

      mfp.addGroup(jqEl, options);

    }
    return jqEl;
  };

  /*>>core*/

  /*>>inline*/

  var INLINE_NS = 'inline',
    _hiddenClass,
    _inlinePlaceholder,
    _lastInlineElement,
    _putInlineElementsBack = function () {
      if (_lastInlineElement) {
        _inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach();
        _lastInlineElement = null;
      }
    };

  $.magnificPopup.registerModule(INLINE_NS, {
    options: {
      hiddenClass: 'hide', // will be appended with `mfp-` prefix
      markup: '',
      tNotFound: 'Content not found'
    },
    proto: {

      initInline: function () {
        mfp.types.push(INLINE_NS);

        _mfpOn(CLOSE_EVENT + '.' + INLINE_NS, function () {
          _putInlineElementsBack();
        });
      },

      getInline: function (item, template) {

        _putInlineElementsBack();

        if (item.src) {
          var inlineSt = mfp.st.inline,
            el = $(item.src);

          if (el.length) {

            // If target element has parent - we replace it with placeholder and put it back after popup is closed
            var parent = el[0].parentNode;
            if (parent && parent.tagName) {
              if (!_inlinePlaceholder) {
                _hiddenClass = inlineSt.hiddenClass;
                _inlinePlaceholder = _getEl(_hiddenClass);
                _hiddenClass = 'mfp-' + _hiddenClass;
              }
              // replace target inline element with placeholder
              _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
            }

            mfp.updateStatus('ready');
          } else {
            mfp.updateStatus('error', inlineSt.tNotFound);
            el = $('<div>');
          }

          item.inlineElement = el;
          return el;
        }

        mfp.updateStatus('ready');
        mfp._parseMarkup(template, {}, item);
        return template;
      }
    }
  });

  /*>>inline*/

  /*>>ajax*/
  var AJAX_NS = 'ajax',
    _ajaxCur,
    _removeAjaxCursor = function () {
      if (_ajaxCur) {
        $(document.body).removeClass(_ajaxCur);
      }
    },
    _destroyAjaxRequest = function () {
      _removeAjaxCursor();
      if (mfp.req) {
        mfp.req.abort();
      }
    };

  $.magnificPopup.registerModule(AJAX_NS, {

    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },

    proto: {
      initAjax: function () {
        mfp.types.push(AJAX_NS);
        _ajaxCur = mfp.st.ajax.cursor;

        _mfpOn(CLOSE_EVENT + '.' + AJAX_NS, _destroyAjaxRequest);
        _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
      },
      getAjax: function (item) {

        if (_ajaxCur) {
          $(document.body).addClass(_ajaxCur);
        }

        mfp.updateStatus('loading');

        var opts = $.extend({
          url: item.src,
          success: function (data, textStatus, jqXHR) {
            var temp = {
              data: data,
              xhr: jqXHR
            };

            _mfpTrigger('ParseAjax', temp);

            mfp.appendContent($(temp.data), AJAX_NS);

            item.finished = true;

            _removeAjaxCursor();

            mfp._setFocus();

            setTimeout(function () {
              mfp.wrap.addClass(READY_CLASS);
            }, 16);

            mfp.updateStatus('ready');

            _mfpTrigger('AjaxContentAdded');
          },
          error: function () {
            _removeAjaxCursor();
            item.finished = item.loadError = true;
            mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
          }
        }, mfp.st.ajax.settings);

        mfp.req = $.ajax(opts);

        return '';
      }
    }
  });

  /*>>ajax*/

  /*>>image*/
  var _imgInterval,
    _getTitle = function (item) {
      if (item.data && item.data.title !== undefined)
        return item.data.title;

      var src = mfp.st.image.titleSrc;

      if (src) {
        if ($.isFunction(src)) {
          return src.call(mfp, item);
        } else if (item.el) {
          return item.el.attr(src) || '';
        }
      }
      return '';
    };

  $.magnificPopup.registerModule('image', {

    options: {
      markup: '<div class="mfp-figure">' +
        '<div class="mfp-close"></div>' +
        '<figure>' +
        '<div class="mfp-img"></div>' +
        '<figcaption>' +
        '<div class="mfp-bottom-bar">' +
        '<div class="mfp-title"></div>' +
        '<div class="mfp-counter"></div>' +
        '</div>' +
        '</figcaption>' +
        '</figure>' +
        '</div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },

    proto: {
      initImage: function () {
        var imgSt = mfp.st.image,
          ns = '.image';

        mfp.types.push('image');

        _mfpOn(OPEN_EVENT + ns, function () {
          if (mfp.currItem.type === 'image' && imgSt.cursor) {
            $(document.body).addClass(imgSt.cursor);
          }
        });

        _mfpOn(CLOSE_EVENT + ns, function () {
          if (imgSt.cursor) {
            $(document.body).removeClass(imgSt.cursor);
          }
          _window.off('resize' + EVENT_NS);
        });

        _mfpOn('Resize' + ns, mfp.resizeImage);
        if (mfp.isLowIE) {
          _mfpOn('AfterChange', mfp.resizeImage);
        }
      },
      resizeImage: function () {
        var item = mfp.currItem;
        if (!item || !item.img) return;

        if (mfp.st.image.verticalFit) {
          var decr = 0;
          // fix box-sizing in ie7/8
          if (mfp.isLowIE) {
            decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'), 10);
          }
          item.img.css('max-height', mfp.wH - decr);
        }
      },
      _onImageHasSize: function (item) {
        if (item.img) {

          item.hasSize = true;

          if (_imgInterval) {
            clearInterval(_imgInterval);
          }

          item.isCheckingImgSize = false;

          _mfpTrigger('ImageHasSize', item);

          if (item.imgHidden) {
            if (mfp.content)
              mfp.content.removeClass('mfp-loading');

            item.imgHidden = false;
          }

        }
      },

      /**
       * Function that loops until the image has size to display elements that rely on it asap
       */
      findImageSize: function (item) {

        var counter = 0,
          img = item.img[0],
          mfpSetInterval = function (delay) {

            if (_imgInterval) {
              clearInterval(_imgInterval);
            }
            // decelerating interval that checks for size of an image
            _imgInterval = setInterval(function () {
              if (img.naturalWidth > 0) {
                mfp._onImageHasSize(item);
                return;
              }

              if (counter > 200) {
                clearInterval(_imgInterval);
              }

              counter++;
              if (counter === 3) {
                mfpSetInterval(10);
              } else if (counter === 40) {
                mfpSetInterval(50);
              } else if (counter === 100) {
                mfpSetInterval(500);
              }
            }, delay);
          };

        mfpSetInterval(1);
      },

      getImage: function (item, template) {

        var guard = 0,

          // image load complete handler
          onLoadComplete = function () {
            if (item) {
              if (item.img[0].complete) {
                item.img.off('.mfploader');

                if (item === mfp.currItem) {
                  mfp._onImageHasSize(item);

                  mfp.updateStatus('ready');
                }

                item.hasSize = true;
                item.loaded = true;

                _mfpTrigger('ImageLoadComplete');

              }
              else {
                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                guard++;
                if (guard < 200) {
                  setTimeout(onLoadComplete, 100);
                } else {
                  onLoadError();
                }
              }
            }
          },

          // image error handler
          onLoadError = function () {
            if (item) {
              item.img.off('.mfploader');
              if (item === mfp.currItem) {
                mfp._onImageHasSize(item);
                mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
              }

              item.hasSize = true;
              item.loaded = true;
              item.loadError = true;
            }
          },
          imgSt = mfp.st.image;


        var el = template.find('.mfp-img');
        if (el.length) {
          var img = document.createElement('img');
          img.className = 'mfp-img';
          if (item.el && item.el.find('img').length) {
            img.alt = item.el.find('img').attr('alt');
          }
          item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
          img.src = item.src;

          // without clone() "error" event is not firing when IMG is replaced by new IMG
          // TODO: find a way to avoid such cloning
          if (el.is('img')) {
            item.img = item.img.clone();
          }

          img = item.img[0];
          if (img.naturalWidth > 0) {
            item.hasSize = true;
          } else if (!img.width) {
            item.hasSize = false;
          }
        }

        mfp._parseMarkup(template, {
          title: _getTitle(item),
          img_replaceWith: item.img
        }, item);

        mfp.resizeImage();

        if (item.hasSize) {
          if (_imgInterval) clearInterval(_imgInterval);

          if (item.loadError) {
            template.addClass('mfp-loading');
            mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
          } else {
            template.removeClass('mfp-loading');
            mfp.updateStatus('ready');
          }
          return template;
        }

        mfp.updateStatus('loading');
        item.loading = true;

        if (!item.hasSize) {
          item.imgHidden = true;
          template.addClass('mfp-loading');
          mfp.findImageSize(item);
        }

        return template;
      }
    }
  });

  /*>>image*/

  /*>>zoom*/
  var hasMozTransform,
    getHasMozTransform = function () {
      if (hasMozTransform === undefined) {
        hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
      }
      return hasMozTransform;
    };

  $.magnificPopup.registerModule('zoom', {

    options: {
      enabled: false,
      easing: 'ease-in-out',
      duration: 300,
      opener: function (element) {
        return element.is('img') ? element : element.find('img');
      }
    },

    proto: {

      initZoom: function () {
        var zoomSt = mfp.st.zoom,
          ns = '.zoom',
          image;

        if (!zoomSt.enabled || !mfp.supportsTransition) {
          return;
        }

        var duration = zoomSt.duration,
          getElToAnimate = function (image) {
            var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
              transition = 'all ' + (zoomSt.duration / 1000) + 's ' + zoomSt.easing,
              cssObj = {
                position: 'fixed',
                zIndex: 9999,
                left: 0,
                top: 0,
                '-webkit-backface-visibility': 'hidden'
              },
              t = 'transition';

            cssObj['-webkit-' + t] = cssObj['-moz-' + t] = cssObj['-o-' + t] = cssObj[t] = transition;

            newImg.css(cssObj);
            return newImg;
          },
          showMainContent = function () {
            mfp.content.css('visibility', 'visible');
          },
          openTimeout,
          animatedImg;

        _mfpOn('BuildControls' + ns, function () {
          if (mfp._allowZoom()) {

            clearTimeout(openTimeout);
            mfp.content.css('visibility', 'hidden');

            // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

            image = mfp._getItemToZoom();

            if (!image) {
              showMainContent();
              return;
            }

            animatedImg = getElToAnimate(image);

            animatedImg.css(mfp._getOffset());

            mfp.wrap.append(animatedImg);

            openTimeout = setTimeout(function () {
              animatedImg.css(mfp._getOffset(true));
              openTimeout = setTimeout(function () {

                showMainContent();

                setTimeout(function () {
                  animatedImg.remove();
                  image = animatedImg = null;
                  _mfpTrigger('ZoomAnimationEnded');
                }, 16); // avoid blink when switching images

              }, duration); // this timeout equals animation duration

            }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


            // Lots of timeouts...
          }
        });
        _mfpOn(BEFORE_CLOSE_EVENT + ns, function () {
          if (mfp._allowZoom()) {

            clearTimeout(openTimeout);

            mfp.st.removalDelay = duration;

            if (!image) {
              image = mfp._getItemToZoom();
              if (!image) {
                return;
              }
              animatedImg = getElToAnimate(image);
            }

            animatedImg.css(mfp._getOffset(true));
            mfp.wrap.append(animatedImg);
            mfp.content.css('visibility', 'hidden');

            setTimeout(function () {
              animatedImg.css(mfp._getOffset());
            }, 16);
          }

        });

        _mfpOn(CLOSE_EVENT + ns, function () {
          if (mfp._allowZoom()) {
            showMainContent();
            if (animatedImg) {
              animatedImg.remove();
            }
            image = null;
          }
        });
      },

      _allowZoom: function () {
        return mfp.currItem.type === 'image';
      },

      _getItemToZoom: function () {
        if (mfp.currItem.hasSize) {
          return mfp.currItem.img;
        } else {
          return false;
        }
      },

      // Get element postion relative to viewport
      _getOffset: function (isLarge) {
        var el;
        if (isLarge) {
          el = mfp.currItem.img;
        } else {
          el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
        }

        var offset = el.offset();
        var paddingTop = parseInt(el.css('padding-top'), 10);
        var paddingBottom = parseInt(el.css('padding-bottom'), 10);
        offset.top -= ($(window).scrollTop() - paddingTop);


        /*
  
        Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
  
         */
        var obj = {
          width: el.width(),
          // fix Zepto height+padding issue
          height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
        };

        // I hate to do this, but there is no another option
        if (getHasMozTransform()) {
          obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
        } else {
          obj.left = offset.left;
          obj.top = offset.top;
        }
        return obj;
      }

    }
  });



  /*>>zoom*/

  /*>>iframe*/

  var IFRAME_NS = 'iframe',
    _emptyPage = '//about:blank',

    _fixIframeBugs = function (isShowing) {
      if (mfp.currTemplate[IFRAME_NS]) {
        var el = mfp.currTemplate[IFRAME_NS].find('iframe');
        if (el.length) {
          // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
          if (!isShowing) {
            el[0].src = _emptyPage;
          }

          // IE8 black screen bug fix
          if (mfp.isIE8) {
            el.css('display', isShowing ? 'block' : 'none');
          }
        }
      }
    };

  $.magnificPopup.registerModule(IFRAME_NS, {

    options: {
      markup: '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' +
        '</div>',

      srcAction: 'iframe_src',

      // we don't care and support only one default type of URL by default
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      }
    },

    proto: {
      initIframe: function () {
        mfp.types.push(IFRAME_NS);

        _mfpOn('BeforeChange', function (e, prevType, newType) {
          if (prevType !== newType) {
            if (prevType === IFRAME_NS) {
              _fixIframeBugs(); // iframe if removed
            } else if (newType === IFRAME_NS) {
              _fixIframeBugs(true); // iframe is showing
            }
          }// else {
          // iframe source is switched, don't do anything
          //}
        });

        _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function () {
          _fixIframeBugs();
        });
      },

      getIframe: function (item, template) {
        var embedSrc = item.src;
        var iframeSt = mfp.st.iframe;

        $.each(iframeSt.patterns, function () {
          if (embedSrc.indexOf(this.index) > -1) {
            if (this.id) {
              if (typeof this.id === 'string') {
                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length);
              } else {
                embedSrc = this.id.call(this, embedSrc);
              }
            }
            embedSrc = this.src.replace('%id%', embedSrc);
            return false; // break;
          }
        });

        var dataObj = {};
        if (iframeSt.srcAction) {
          dataObj[iframeSt.srcAction] = embedSrc;
        }
        mfp._parseMarkup(template, dataObj, item);

        mfp.updateStatus('ready');

        return template;
      }
    }
  });



  /*>>iframe*/

  /*>>gallery*/
  /**
   * Get looped index depending on number of slides
   */
  var _getLoopedId = function (index) {
    var numSlides = mfp.items.length;
    if (index > numSlides - 1) {
      return index - numSlides;
    } else if (index < 0) {
      return numSlides + index;
    }
    return index;
  },
    _replaceCurrTotal = function (text, curr, total) {
      return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
    };

  $.magnificPopup.registerModule('gallery', {

    options: {
      enabled: false,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: true,
      arrows: true,

      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%'
    },

    proto: {
      initGallery: function () {

        var gSt = mfp.st.gallery,
          ns = '.mfp-gallery';

        mfp.direction = true; // true - next, false - prev

        if (!gSt || !gSt.enabled) return false;

        _wrapClasses += ' mfp-gallery';

        _mfpOn(OPEN_EVENT + ns, function () {

          if (gSt.navigateByImgClick) {
            mfp.wrap.on('click' + ns, '.mfp-img', function () {
              if (mfp.items.length > 1) {
                mfp.next();
                return false;
              }
            });
          }

          _document.on('keydown' + ns, function (e) {
            if (e.keyCode === 37) {
              mfp.prev();
            } else if (e.keyCode === 39) {
              mfp.next();
            }
          });
        });

        _mfpOn('UpdateStatus' + ns, function (e, data) {
          if (data.text) {
            data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
          }
        });

        _mfpOn(MARKUP_PARSE_EVENT + ns, function (e, element, values, item) {
          var l = mfp.items.length;
          values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
        });

        _mfpOn('BuildControls' + ns, function () {
          if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
            var markup = gSt.arrowMarkup,
              arrowLeft = mfp.arrowLeft = $(markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left')).addClass(PREVENT_CLOSE_CLASS),
              arrowRight = mfp.arrowRight = $(markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right')).addClass(PREVENT_CLOSE_CLASS);

            arrowLeft.click(function () {
              mfp.prev();
            });
            arrowRight.click(function () {
              mfp.next();
            });

            mfp.container.append(arrowLeft.add(arrowRight));
          }
        });

        _mfpOn(CHANGE_EVENT + ns, function () {
          if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

          mfp._preloadTimeout = setTimeout(function () {
            mfp.preloadNearbyImages();
            mfp._preloadTimeout = null;
          }, 16);
        });


        _mfpOn(CLOSE_EVENT + ns, function () {
          _document.off(ns);
          mfp.wrap.off('click' + ns);
          mfp.arrowRight = mfp.arrowLeft = null;
        });

      },
      next: function () {
        mfp.direction = true;
        mfp.index = _getLoopedId(mfp.index + 1);
        mfp.updateItemHTML();
      },
      prev: function () {
        mfp.direction = false;
        mfp.index = _getLoopedId(mfp.index - 1);
        mfp.updateItemHTML();
      },
      goTo: function (newIndex) {
        mfp.direction = (newIndex >= mfp.index);
        mfp.index = newIndex;
        mfp.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var p = mfp.st.gallery.preload,
          preloadBefore = Math.min(p[0], mfp.items.length),
          preloadAfter = Math.min(p[1], mfp.items.length),
          i;

        for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
          mfp._preloadItem(mfp.index + i);
        }
        for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
          mfp._preloadItem(mfp.index - i);
        }
      },
      _preloadItem: function (index) {
        index = _getLoopedId(index);

        if (mfp.items[index].preloaded) {
          return;
        }

        var item = mfp.items[index];
        if (!item.parsed) {
          item = mfp.parseEl(index);
        }

        _mfpTrigger('LazyLoad', item);

        if (item.type === 'image') {
          item.img = $('<img class="mfp-img" />').on('load.mfploader', function () {
            item.hasSize = true;
          }).on('error.mfploader', function () {
            item.hasSize = true;
            item.loadError = true;
            _mfpTrigger('LazyLoadError', item);
          }).attr('src', item.src);
        }


        item.preloaded = true;
      }
    }
  });

  /*>>gallery*/

  /*>>retina*/

  var RETINA_NS = 'retina';

  $.magnificPopup.registerModule(RETINA_NS, {
    options: {
      replaceSrc: function (item) {
        return item.src.replace(/\.\w+$/, function (m) { return '@2x' + m; });
      },
      ratio: 1 // Function or number.  Set to 1 to disable.
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {

          var st = mfp.st.retina,
            ratio = st.ratio;

          ratio = !isNaN(ratio) ? ratio : ratio();

          if (ratio > 1) {
            _mfpOn('ImageHasSize' + '.' + RETINA_NS, function (e, item) {
              item.img.css({
                'max-width': item.img[0].naturalWidth / ratio,
                'width': '100%'
              });
            });
            _mfpOn('ElementParse' + '.' + RETINA_NS, function (e, item) {
              item.src = st.replaceSrc(item, ratio);
            });
          }
        }

      }
    }
  });

  /*>>retina*/
  _checkInstance();
}));
/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
; (function (f) { "use strict"; "function" === typeof define && define.amd ? define(["jquery"], f) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery) })(function ($) { "use strict"; function n(a) { return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) } function h(a) { return $.isFunction(a) || $.isPlainObject(a) ? a : { top: a, left: a } } var p = $.scrollTo = function (a, d, b) { return $(window).scrollTo(a, d, b) }; p.defaults = { axis: "xy", duration: 0, limit: !0 }; $.fn.scrollTo = function (a, d, b) { "object" === typeof d && (b = d, d = 0); "function" === typeof b && (b = { onAfter: b }); "max" === a && (a = 9E9); b = $.extend({}, p.defaults, b); d = d || b.duration; var u = b.queue && 1 < b.axis.length; u && (d /= 2); b.offset = h(b.offset); b.over = h(b.over); return this.each(function () { function k(a) { var k = $.extend({}, b, { queue: !0, duration: d, complete: a && function () { a.call(q, e, b) } }); r.animate(f, k) } if (null !== a) { var l = n(this), q = l ? this.contentWindow || window : this, r = $(q), e = a, f = {}, t; switch (typeof e) { case "number": case "string": if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) { e = h(e); break } e = l ? $(e) : $(e, q); case "object": if (e.length === 0) return; if (e.is || e.style) t = (e = $(e)).offset() }var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset; $.each(b.axis.split(""), function (a, c) { var d = "x" === c ? "Left" : "Top", m = d.toLowerCase(), g = "scroll" + d, h = r[g](), n = p.max(q, c); t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d); b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n)); !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {})) }); k(b.onAfter) } }) }; p.max = function (a, d) { var b = "x" === d ? "Width" : "Height", h = "scroll" + b; if (!n(a)) return a[h] - $(a)[b.toLowerCase()](); var b = "client" + b, k = a.ownerDocument || a.document, l = k.documentElement, k = k.body; return Math.max(l[h], k[h]) - Math.min(l[b], k[b]) }; $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = { get: function (a) { return $(a.elem)[a.prop]() }, set: function (a) { var d = this.get(a); if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop(); var b = Math.round(a.now); d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a)) } }; return p });

/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
      return factory(window, jQuery);
    });
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}(window, function factory(window, jQuery) {
  'use strict';

  // ----- utils ----- //

  var arraySlice = Array.prototype.slice;

  // helper function for logging errors
  // $.error breaks jQuery chaining
  var console = window.console;
  var logError = typeof console == 'undefined' ? function () { } :
    function (message) {
      console.error(message);
    };

  // ----- jQueryBridget ----- //

  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;
    if (!$) {
      return;
    }

    // add option method -> $().plugin('option', {...})
    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)) {
          return;
        }
        this.options = $.extend(true, this.options, opts);
      };
    }

    // make jQuery plugin
    $.fn[namespace] = function (arg0 /*, arg1 */) {
      if (typeof arg0 == 'string') {
        // method call $().plugin( 'methodName', { options } )
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      }
      // just $().plugin({ options })
      plainCall(this, arg0);
      return this;
    };

    // $().plugin('methodName')
    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

      $elems.each(function (i, elem) {
        // get instance
        var instance = $.data(elem, namespace);
        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
            pluginMethodStr);
          return;
        }

        var method = instance[methodName];
        if (!method || methodName.charAt(0) == '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        }

        // apply method, get return value
        var value = method.apply(instance, args);
        // set return value if value is returned, use only first value
        returnValue = returnValue === undefined ? value : returnValue;
      });

      return returnValue !== undefined ? returnValue : $elems;
    }

    function plainCall($elems, options) {
      $elems.each(function (i, elem) {
        var instance = $.data(elem, namespace);
        if (instance) {
          // set options & init
          instance.option(options);
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }

    updateJQuery($);

  }

  // ----- updateJQuery ----- //

  // set $.bridget for v1 backwards compatibility
  function updateJQuery($) {
    if (!$ || ($ && $.bridget)) {
      return;
    }
    $.bridget = jQueryBridget;
  }

  updateJQuery(jQuery || window.jQuery);

  // -----  ----- //

  return jQueryBridget;

}));

/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('ev-emitter/ev-emitter', factory);
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}(typeof window != 'undefined' ? window : this, function () {



  function EvEmitter() { }

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;

    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var i = 0;
    var listener = listeners[i];
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    while (listener) {
      var isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
      // get next listener
      i += isOnce ? 0 : 1;
      listener = listeners[i];
    }

    return this;
  };

  return EvEmitter;

}));

/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

(function (window, factory) {
  'use strict';

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('get-size/get-size', [], function () {
      return factory();
    });
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})(window, function factory() {
  'use strict';

  // -------------------------- helpers -------------------------- //

  // get a number from a string, not a percentage
  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() { }

  var logError = typeof console == 'undefined' ? noop :
    function (message) {
      console.error(message);
    };

  // -------------------------- measurements -------------------------- //

  var measurements = [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth'
  ];

  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }
    return size;
  }

  // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle(elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      logError('Style returned ' + style +
        '. Are you running this code in a hidden iframe on Firefox? ' +
        'See http://bit.ly/getsizebug1');
    }
    return style;
  }

  // -------------------------- setup -------------------------- //

  var isSetup = false;

  var isBoxSizeOuter;

  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
  function setup() {
    // setup once
    if (isSetup) {
      return;
    }
    isSetup = true;

    // -------------------------- box sizing -------------------------- //

    /**
     * WebKit measures the outer-width on style.width on border-box elems
     * IE & Firefox<29 measures the inner-width
     */
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div);

    getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
    body.removeChild(div);

  }

  // -------------------------- getSize -------------------------- //

  function getSize(elem) {
    setup();

    // use querySeletor if elem is string
    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    }

    // do not proceed on non-objects
    if (!elem || typeof elem != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem);

    // if hidden, everything is 0
    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

    // get all measurements
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value);
      // any 'auto', 'medium' value will be 0
      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth +
        // add padding and border unless it's already including it
        (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight +
        // add padding and border unless it's already including it
        (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if (typeof define == 'function' && define.amd) {
    // AMD
    define('desandro-matches-selector/matches-selector', factory);
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}(window, function factory() {
  'use strict';

  var matchesMethod = (function () {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if (ElemProto.matches) {
      return 'matches';
    }
    // check un-prefixed
    if (ElemProto.matchesSelector) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if (ElemProto[method]) {
        return method;
      }
    }
  })();

  return function matchesSelector(elem, selector) {
    return elem[matchesMethod](selector);
  };

}));

/**
 * Fizzy UI utils v2.0.4
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if (typeof define == 'function' && define.amd) {
    // AMD
    define('fizzy-ui-utils/utils', [
      'desandro-matches-selector/matches-selector'
    ], function (matchesSelector) {
      return factory(window, matchesSelector);
    });
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}(window, function factory(window, matchesSelector) {



  var utils = {};

  // ----- extend ----- //

  // extends objects
  utils.extend = function (a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  };

  // ----- modulo ----- //

  utils.modulo = function (num, div) {
    return ((num % div) + div) % div;
  };

  // ----- makeArray ----- //

  // turn element or nodeList into an array
  utils.makeArray = function (obj) {
    var ary = [];
    if (Array.isArray(obj)) {
      // use object if already an array
      ary = obj;
    } else if (obj && typeof obj == 'object' &&
      typeof obj.length == 'number') {
      // convert nodeList to array
      for (var i = 0; i < obj.length; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }
    return ary;
  };

  // ----- removeFrom ----- //

  utils.removeFrom = function (ary, obj) {
    var index = ary.indexOf(obj);
    if (index != -1) {
      ary.splice(index, 1);
    }
  };

  // ----- getParent ----- //

  utils.getParent = function (elem, selector) {
    while (elem != document.body) {
      elem = elem.parentNode;
      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  };

  // ----- getQueryElement ----- //

  // use element as selector string
  utils.getQueryElement = function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }
    return elem;
  };

  // ----- handleEvent ----- //

  // enable .ontype to trigger from .addEventListener( elem, 'type' )
  utils.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  // ----- filterFindElements ----- //

  utils.filterFindElements = function (elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];

    elems.forEach(function (elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      }
      // add elem if no selector
      if (!selector) {
        ffElems.push(elem);
        return;
      }
      // filter & find items if we have a selector
      // filter
      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      }
      // find children
      var childElems = elem.querySelectorAll(selector);
      // concat childElems to filterFound array
      for (var i = 0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });

    return ffElems;
  };

  // ----- debounceMethod ----- //

  utils.debounceMethod = function (_class, methodName, threshold) {
    // original method
    var method = _class.prototype[methodName];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[methodName] = function () {
      var timeout = this[timeoutName];
      if (timeout) {
        clearTimeout(timeout);
      }
      var args = arguments;

      var _this = this;
      this[timeoutName] = setTimeout(function () {
        method.apply(_this, args);
        delete _this[timeoutName];
      }, threshold || 100);
    };
  };

  // ----- docReady ----- //

  utils.docReady = function (callback) {
    var readyState = document.readyState;
    if (readyState == 'complete' || readyState == 'interactive') {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout(callback);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  // ----- htmlInit ----- //

  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
  utils.toDashed = function (str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */
  utils.htmlInit = function (WidgetClass, namespace) {
    utils.docReady(function () {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems)
        .concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;

      elems.forEach(function (elem) {
        var attr = elem.getAttribute(dataAttr) ||
          elem.getAttribute(dataOptionsAttr);
        var options;
        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className +
              ': ' + error);
          }
          return;
        }
        // initialize
        var instance = new WidgetClass(elem, options);
        // make available via $().data('namespace')
        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });

    });
  };

  // -----  ----- //

  return utils;

}));

/**
 * Outlayer Item
 */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('outlayer/item', [
      'ev-emitter/ev-emitter',
      'get-size/get-size'
    ],
      factory
    );
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}(window, function factory(EvEmitter, getSize) {
  'use strict';

  // ----- helpers ----- //

  function isEmptyObj(obj) {
    for (var prop in obj) {
      return false;
    }
    prop = null;
    return true;
  }

  // -------------------------- CSS3 support -------------------------- //


  var docElemStyle = document.documentElement.style;

  var transitionProperty = typeof docElemStyle.transition == 'string' ?
    'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ?
    'transform' : 'WebkitTransform';

  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[transitionProperty];

  // cache all vendor properties that could have vendor prefix
  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  };

  // -------------------------- Item -------------------------- //

  function Item(element, layout) {
    if (!element) {
      return;
    }

    this.element = element;
    // parent layout class, i.e. Masonry, Isotope, or Packery
    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };

    this._create();
  }

  // inherit EvEmitter
  var proto = Item.prototype = Object.create(EvEmitter.prototype);
  proto.constructor = Item;

  proto._create = function () {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };

    this.css({
      position: 'absolute'
    });
  };

  // trigger specified handler for event type
  proto.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };

  /**
   * apply CSS styles to element
   * @param {Object} style
   */
  proto.css = function (style) {
    var elemStyle = this.element.style;

    for (var prop in style) {
      // use vendor property if available
      var supportedProp = vendorProperties[prop] || prop;
      elemStyle[supportedProp] = style[prop];
    }
  };

  // measure position, and sets it
  proto.getPosition = function () {
    var style = getComputedStyle(this.element);
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    var xValue = style[isOriginLeft ? 'left' : 'right'];
    var yValue = style[isOriginTop ? 'top' : 'bottom'];
    // convert percent to pixels
    var layoutSize = this.layout.size;
    var x = xValue.indexOf('%') != -1 ?
      (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10);
    var y = yValue.indexOf('%') != -1 ?
      (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10);

    // clean up 'auto' or other non-integer values
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    // remove padding from measurement
    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

    this.position.x = x;
    this.position.y = y;
  };

  // set settled position, apply padding
  proto.layoutPosition = function () {
    var layoutSize = this.layout.size;
    var style = {};
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');

    // x
    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';

    var x = this.position.x + layoutSize[xPadding];
    // set in percentage or pixels
    style[xProperty] = this.getXValue(x);
    // reset other property
    style[xResetProperty] = '';

    // y
    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';

    var y = this.position.y + layoutSize[yPadding];
    // set in percentage or pixels
    style[yProperty] = this.getYValue(y);
    // reset other property
    style[yResetProperty] = '';

    this.css(style);
    this.emitEvent('layout', [this]);
  };

  proto.getXValue = function (x) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && !isHorizontal ?
      ((x / this.layout.size.width) * 100) + '%' : x + 'px';
  };

  proto.getYValue = function (y) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && isHorizontal ?
      ((y / this.layout.size.height) * 100) + '%' : y + 'px';
  };

  proto._transitionTo = function (x, y) {
    this.getPosition();
    // get current x & y from top/left
    var curX = this.position.x;
    var curY = this.position.y;

    var compareX = parseInt(x, 10);
    var compareY = parseInt(y, 10);
    var didNotMove = compareX === this.position.x && compareY === this.position.y;

    // save end position
    this.setPosition(x, y);

    // if did not move and not transitioning, just go to layout
    if (didNotMove && !this.isTransitioning) {
      this.layoutPosition();
      return;
    }

    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate(transX, transY);

    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };

  proto.getTranslate = function (x, y) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  };

  // non transition + transform support
  proto.goTo = function (x, y) {
    this.setPosition(x, y);
    this.layoutPosition();
  };

  proto.moveTo = proto._transitionTo;

  proto.setPosition = function (x, y) {
    this.position.x = parseInt(x, 10);
    this.position.y = parseInt(y, 10);
  };

  // ----- transition ----- //

  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */

  // non transition, just trigger callback
  proto._nonTransition = function (args) {
    this.css(args.to);
    if (args.isCleaning) {
      this._removeStyles(args.to);
    }
    for (var prop in args.onTransitionEnd) {
      args.onTransitionEnd[prop].call(this);
    }
  };

  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */
  proto.transition = function (args) {
    // redirect to nonTransition if no transition duration
    if (!parseFloat(this.layout.options.transitionDuration)) {
      this._nonTransition(args);
      return;
    }

    var _transition = this._transn;
    // keep track of onTransitionEnd callback by css property
    for (var prop in args.onTransitionEnd) {
      _transition.onEnd[prop] = args.onTransitionEnd[prop];
    }
    // keep track of properties that are transitioning
    for (prop in args.to) {
      _transition.ingProperties[prop] = true;
      // keep track of properties to clean up when transition is done
      if (args.isCleaning) {
        _transition.clean[prop] = true;
      }
    }

    // set from styles
    if (args.from) {
      this.css(args.from);
      // force redraw. http://blog.alexmaccaw.com/css-transitions
      var h = this.element.offsetHeight;
      // hack for JSHint to hush about unused var
      h = null;
    }
    // enable transition
    this.enableTransition(args.to);
    // set styles that are transitioning
    this.css(args.to);

    this.isTransitioning = true;

  };

  // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform
  function toDashedAll(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }

  var transitionProps = 'opacity,' + toDashedAll(transformProperty);

  proto.enableTransition = function (/* style */) {
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if (this.isTransitioning) {
      return;
    }

    // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for ( var prop in style ) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push( toDashedAll( prop ) );
    // }
    // munge number to millisecond, to match stagger
    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration;
    // enable transition styles
    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    });
    // listen for transition end event
    this.element.addEventListener(transitionEndEvent, this, false);
  };

  // ----- events ----- //

  proto.onwebkitTransitionEnd = function (event) {
    this.ontransitionend(event);
  };

  proto.onotransitionend = function (event) {
    this.ontransitionend(event);
  };

  // properties that I munge to make my life easier
  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };

  proto.ontransitionend = function (event) {
    // disregard bubbled events from children
    if (event.target !== this.element) {
      return;
    }
    var _transition = this._transn;
    // get property name of transitioned property, convert to prefix-free
    var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

    // remove property that has completed transitioning
    delete _transition.ingProperties[propertyName];
    // check if any properties are still transitioning
    if (isEmptyObj(_transition.ingProperties)) {
      // all properties have completed transitioning
      this.disableTransition();
    }
    // clean style
    if (propertyName in _transition.clean) {
      // clean up style
      this.element.style[event.propertyName] = '';
      delete _transition.clean[propertyName];
    }
    // trigger onTransitionEnd callback
    if (propertyName in _transition.onEnd) {
      var onTransitionEnd = _transition.onEnd[propertyName];
      onTransitionEnd.call(this);
      delete _transition.onEnd[propertyName];
    }

    this.emitEvent('transitionEnd', [this]);
  };

  proto.disableTransition = function () {
    this.removeTransitionStyles();
    this.element.removeEventListener(transitionEndEvent, this, false);
    this.isTransitioning = false;
  };

  /**
   * removes style property from element
   * @param {Object} style
  **/
  proto._removeStyles = function (style) {
    // clean up transition styles
    var cleanStyle = {};
    for (var prop in style) {
      cleanStyle[prop] = '';
    }
    this.css(cleanStyle);
  };

  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };

  proto.removeTransitionStyles = function () {
    // remove transition
    this.css(cleanTransitionStyle);
  };

  // ----- stagger ----- //

  proto.stagger = function (delay) {
    delay = isNaN(delay) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  };

  // ----- show/hide/remove ----- //

  // remove element from DOM
  proto.removeElem = function () {
    this.element.parentNode.removeChild(this.element);
    // remove display: none
    this.css({ display: '' });
    this.emitEvent('remove', [this]);
  };

  proto.remove = function () {
    // just remove element if no transition support or no transition
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
      this.removeElem();
      return;
    }

    // start transition
    this.once('transitionEnd', function () {
      this.removeElem();
    });
    this.hide();
  };

  proto.reveal = function () {
    delete this.isHidden;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onRevealTransitionEnd = function () {
    // check if still visible
    // during transition, item may have been hidden
    if (!this.isHidden) {
      this.emitEvent('reveal');
    }
  };

  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */
  proto.getHideRevealTransitionEndProperty = function (styleProperty) {
    var optionStyle = this.layout.options[styleProperty];
    // use opacity
    if (optionStyle.opacity) {
      return 'opacity';
    }
    // get first property
    for (var prop in optionStyle) {
      return prop;
    }
  };

  proto.hide = function () {
    // set flag
    this.isHidden = true;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onHideTransitionEnd = function () {
    // check if still hidden
    // during transition, item may have been un-hidden
    if (this.isHidden) {
      this.css({ display: 'none' });
      this.emitEvent('hide');
    }
  };

  proto.destroy = function () {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };

  return Item;

}));

/*!
 * Outlayer v2.1.0
 * the brains and guts of a layout library
 * MIT license
 */

(function (window, factory) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD - RequireJS
    define('outlayer/outlayer', [
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './item'
    ],
      function (EvEmitter, getSize, utils, Item) {
        return factory(window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict';

  // ----- vars ----- //

  var console = window.console;
  var jQuery = window.jQuery;
  var noop = function () { };

  // -------------------------- Outlayer -------------------------- //

  // globally unique identifiers
  var GUID = 0;
  // internal store of all Outlayer intances
  var instances = {};


  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */
  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);
    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace +
          ': ' + (queryElement || element));
      }
      return;
    }
    this.element = queryElement;
    // add jQuery
    if (jQuery) {
      this.$element = jQuery(this.element);
    }

    // options
    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options);

    // add id for Outlayer.getFromElement
    var id = ++GUID;
    this.element.outlayerGUID = id; // expando
    instances[id] = this; // associate via id

    // kick it off
    this._create();

    var isInitLayout = this._getOption('initLayout');
    if (isInitLayout) {
      this.layout();
    }
  }

  // settings are for internal use only
  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item;

  // default options
  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };

  var proto = Outlayer.prototype;
  // inherit EvEmitter
  utils.extend(proto, EvEmitter.prototype);

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function (opts) {
    utils.extend(this.options, opts);
  };

  /**
   * get backwards compatible option value, check old name
   */
  proto._getOption = function (option) {
    var oldOption = this.constructor.compatOptions[option];
    return oldOption && this.options[oldOption] !== undefined ?
      this.options[oldOption] : this.options[option];
  };

  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };

  proto._create = function () {
    // get items from children
    this.reloadItems();
    // elements that affect layout, but are not laid out
    this.stamps = [];
    this.stamp(this.options.stamp);
    // set container style
    utils.extend(this.element.style, this.options.containerStyle);

    // bind resize method
    var canBindResize = this._getOption('resize');
    if (canBindResize) {
      this.bindResize();
    }
  };

  // goes through all children again and gets bricks in proper order
  proto.reloadItems = function () {
    // collection of item elements
    this.items = this._itemize(this.element.children);
  };


  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */
  proto._itemize = function (elems) {

    var itemElems = this._filterFindItemElements(elems);
    var Item = this.constructor.Item;

    // create new Outlayer Items for collection
    var items = [];
    for (var i = 0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }

    return items;
  };

  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */
  proto._filterFindItemElements = function (elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };

  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */
  proto.getItemElements = function () {
    return this.items.map(function (item) {
      return item.element;
    });
  };

  // ----- init & layout ----- //

  /**
   * lays out all items
   */
  proto.layout = function () {
    this._resetLayout();
    this._manageStamps();

    // don't animate first layout
    var layoutInstant = this._getOption('layoutInstant');
    var isInstant = layoutInstant !== undefined ?
      layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant);

    // flag for initalized
    this._isLayoutInited = true;
  };

  // _init is alias for layout
  proto._init = proto.layout;

  /**
   * logic before any new layout
   */
  proto._resetLayout = function () {
    this.getSize();
  };


  proto.getSize = function () {
    this.size = getSize(this.element);
  };

  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */
  proto._getMeasurement = function (measurement, size) {
    var option = this.options[measurement];
    var elem;
    if (!option) {
      // default to 0
      this[measurement] = 0;
    } else {
      // use option as an element
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      }
      // use size of element, if element
      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  };

  /**
   * layout a collection of item elements
   * @api public
   */
  proto.layoutItems = function (items, isInstant) {
    items = this._getItemsForLayout(items);

    this._layoutItems(items, isInstant);

    this._postLayout();
  };

  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */
  proto._getItemsForLayout = function (items) {
    return items.filter(function (item) {
      return !item.isIgnored;
    });
  };

  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */
  proto._layoutItems = function (items, isInstant) {
    this._emitCompleteOnItems('layout', items);

    if (!items || !items.length) {
      // no items, emit event with empty array
      return;
    }

    var queue = [];

    items.forEach(function (item) {
      // get x/y object from method
      var position = this._getItemLayoutPosition(item);
      // enqueue
      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);

    this._processLayoutQueue(queue);
  };

  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */
  proto._getItemLayoutPosition = function ( /* item */) {
    return {
      x: 0,
      y: 0
    };
  };

  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */
  proto._processLayoutQueue = function (queue) {
    this.updateStagger();
    queue.forEach(function (obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  };

  // set stagger from option in milliseconds number
  proto.updateStagger = function () {
    var stagger = this.options.stagger;
    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }
    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };

  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */
  proto._positionItem = function (item, x, y, isInstant, i) {
    if (isInstant) {
      // if not transition, just set CSS
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };

  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */
  proto._postLayout = function () {
    this.resizeContainer();
  };

  proto.resizeContainer = function () {
    var isResizingContainer = this._getOption('resizeContainer');
    if (!isResizingContainer) {
      return;
    }
    var size = this._getContainerSize();
    if (size) {
      this._setContainerMeasure(size.width, true);
      this._setContainerMeasure(size.height, false);
    }
  };

  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */
  proto._getContainerSize = noop;

  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */
  proto._setContainerMeasure = function (measure, isWidth) {
    if (measure === undefined) {
      return;
    }

    var elemSize = this.size;
    // add padding and border width if border box
    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
        elemSize.borderLeftWidth + elemSize.borderRightWidth :
        elemSize.paddingBottom + elemSize.paddingTop +
        elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }

    measure = Math.max(measure, 0);
    this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  };

  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */
  proto._emitCompleteOnItems = function (eventName, items) {
    var _this = this;
    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [items]);
    }

    var count = items.length;
    if (!items || !count) {
      onComplete();
      return;
    }

    var doneCount = 0;
    function tick() {
      doneCount++;
      if (doneCount == count) {
        onComplete();
      }
    }

    // bind callback
    items.forEach(function (item) {
      item.once(eventName, tick);
    });
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function (type, event, args) {
    // add original event to arguments
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);

    if (jQuery) {
      // set this.$element
      this.$element = this.$element || jQuery(this.element);
      if (event) {
        // create jQuery event
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        // just trigger with type if no event available
        this.$element.trigger(type, args);
      }
    }
  };

  // -------------------------- ignore & stamps -------------------------- //


  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */
  proto.ignore = function (elem) {
    var item = this.getItem(elem);
    if (item) {
      item.isIgnored = true;
    }
  };

  /**
   * return item to layout collection
   * @param {Element} elem
   */
  proto.unignore = function (elem) {
    var item = this.getItem(elem);
    if (item) {
      delete item.isIgnored;
    }
  };

  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */
  proto.stamp = function (elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }

    this.stamps = this.stamps.concat(elems);
    // ignore
    elems.forEach(this.ignore, this);
  };

  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */
  proto.unstamp = function (elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }

    elems.forEach(function (elem) {
      // filter out removed stamp elements
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };

  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */
  proto._find = function (elems) {
    if (!elems) {
      return;
    }
    // if string, use argument as selector string
    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }
    elems = utils.makeArray(elems);
    return elems;
  };

  proto._manageStamps = function () {
    if (!this.stamps || !this.stamps.length) {
      return;
    }

    this._getBoundingRect();

    this.stamps.forEach(this._manageStamp, this);
  };

  // update boundingLeft / Top
  proto._getBoundingRect = function () {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };

  /**
   * @param {Element} stamp
  **/
  proto._manageStamp = noop;

  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */
  proto._getElementOffset = function (elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  };

  // -------------------------- resize -------------------------- //

  // enable event handlers for listeners
  // i.e. resize -> onresize
  proto.handleEvent = utils.handleEvent;

  /**
   * Bind layout to window resizing
   */
  proto.bindResize = function () {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };

  /**
   * Unbind layout to window resizing
   */
  proto.unbindResize = function () {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };

  proto.onresize = function () {
    this.resize();
  };

  utils.debounceMethod(Outlayer, 'onresize', 100);

  proto.resize = function () {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }

    this.layout();
  };

  /**
   * check if layout is needed post layout
   * @returns Boolean
   */
  proto.needsResizeLayout = function () {
    var size = getSize(this.element);
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  };

  // -------------------------- methods -------------------------- //

  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/
  proto.addItems = function (elems) {
    var items = this._itemize(elems);
    // add items to collection
    if (items.length) {
      this.items = this.items.concat(items);
    }
    return items;
  };

  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  proto.appended = function (elems) {
    var items = this.addItems(elems);
    if (!items.length) {
      return;
    }
    // layout and reveal just the new items
    this.layoutItems(items, true);
    this.reveal(items);
  };

  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */
  proto.prepended = function (elems) {
    var items = this._itemize(elems);
    if (!items.length) {
      return;
    }
    // add items to beginning of collection
    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems);
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // layout new stuff without transition
    this.layoutItems(items, true);
    this.reveal(items);
    // layout previous items
    this.layoutItems(previousItems);
  };

  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.reveal = function (items) {
    this._emitCompleteOnItems('reveal', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };

  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.hide = function (items) {
    this._emitCompleteOnItems('hide', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };

  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.revealItemElements = function (elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };

  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.hideItemElements = function (elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };

  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */
  proto.getItem = function (elem) {
    // loop through items to get the one that matches
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.element == elem) {
        // return item
        return item;
      }
    }
  };

  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */
  proto.getItems = function (elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function (elem) {
      var item = this.getItem(elem);
      if (item) {
        items.push(item);
      }
    }, this);

    return items;
  };

  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */
  proto.remove = function (elems) {
    var removeItems = this.getItems(elems);

    this._emitCompleteOnItems('remove', removeItems);

    // bail if no items to remove
    if (!removeItems || !removeItems.length) {
      return;
    }

    removeItems.forEach(function (item) {
      item.remove();
      // remove item from collection
      utils.removeFrom(this.items, item);
    }, this);
  };

  // ----- destroy ----- //

  // remove and disable Outlayer instance
  proto.destroy = function () {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = '';
    // destroy items
    this.items.forEach(function (item) {
      item.destroy();
    });

    this.unbindResize();

    var id = this.element.outlayerGUID;
    delete instances[id]; // remove reference to instance by id
    delete this.element.outlayerGUID;
    // remove data for jQuery
    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }

  };

  // -------------------------- data -------------------------- //

  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */
  Outlayer.data = function (elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[id];
  };


  // -------------------------- create Outlayer class -------------------------- //

  /**
   * create a layout class
   * @param {String} namespace
   */
  Outlayer.create = function (namespace, options) {
    // sub-class Outlayer
    var Layout = subclass(Outlayer);
    // apply new options and compatOptions
    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);

    Layout.namespace = namespace;

    Layout.data = Outlayer.data;

    // sub-class Item
    Layout.Item = subclass(Item);

    // -------------------------- declarative -------------------------- //

    utils.htmlInit(Layout, namespace);

    // -------------------------- jQuery bridge -------------------------- //

    // make into jQuery plugin
    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }

    return Layout;
  };

  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }

    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;

    return SubClass;
  }

  // ----- helpers ----- //

  // how many milliseconds are in each unit
  var msUnits = {
    ms: 1,
    s: 1000
  };

  // munge time-like parameter into millisecond number
  // '0.4s' -> 40
  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }
    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];
    if (!num.length) {
      return 0;
    }
    num = parseFloat(num);
    var mult = msUnits[unit] || 1;
    return num * mult;
  }

  // ----- fin ----- //

  // back in global
  Outlayer.Item = Item;

  return Outlayer;

}));

/*!
 * Masonry v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if (typeof define == 'function' && define.amd) {
    // AMD
    define([
      'outlayer/outlayer',
      'get-size/get-size'
    ],
      factory);
  } else if (typeof module == 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}(window, function factory(Outlayer, getSize) {



  // -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function () {
    this.getSize();
    this._getMeasurement('columnWidth', 'outerWidth');
    this._getMeasurement('gutter', 'outerWidth');
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for (var i = 0; i < this.cols; i++) {
      this.colYs.push(0);
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function () {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if (!this.columnWidth) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[mathMethod](cols);
    this.cols = Math.max(cols, 1);
  };

  proto.getContainerWidth = function () {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize(container);
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function (item) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
    colSpan = Math.min(colSpan, this.cols);
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ?
      '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[colPosMethod](colSpan, item);
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for (var i = colPosition.col; i < setMax; i++) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function (colSpan) {
    var colGroup = this._getTopColGroup(colSpan);
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply(Math, colGroup);

    return {
      col: colGroup.indexOf(minimumY),
      y: minimumY,
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function (colSpan) {
    if (colSpan < 2) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for (var i = 0; i < groupCount; i++) {
      colGroup[i] = this._getColGroupY(i, colSpan);
    }
    return colGroup;
  };

  proto._getColGroupY = function (col, colSpan) {
    if (colSpan < 2) {
      return this.colYs[col];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice(col, col + colSpan);
    // and get the max value of the array
    return Math.max.apply(Math, groupColYs);
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function (colSpan, item) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY(col, colSpan),
    };
  };

  proto._manageStamp = function (stamp) {
    var stampSize = getSize(stamp);
    var offset = this._getElementOffset(stamp);
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor(firstX / this.columnWidth);
    firstCol = Math.max(0, firstCol);
    var lastCol = Math.floor(lastX / this.columnWidth);
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min(this.cols - 1, lastCol);
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
      stampSize.outerHeight;
    for (var i = firstCol; i <= lastCol; i++) {
      this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
    }
  };

  proto._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var size = {
      height: this.maxY
    };

    if (this._getOption('fitWidth')) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function () {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while (--i) {
      if (this.colYs[i] !== 0) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function () {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));


/*
 * priority-nav - v1.0.12 | (c) 2016 @gijsroge | MIT license
 * Repository: https://github.com/gijsroge/priority-navigation.git
 * Description: Priority+ pattern navigation that hides menu items if they don't fit on screen.
 * Demo: http://gijsroge.github.io/priority-nav.js/
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define("priorityNav", factory(root));
  } else if (typeof exports === "object") {
    module.exports = factory(root);
  } else {
    root.priorityNav = factory(root);
  }
})(window || this, function (root) {

  "use strict";

  /**
   * Variables
   */
  var priorityNav = {}; // Object for public APIs
  var breaks = []; // Object to store instances with breakpoints where the instances menu item"s didin"t fit.
  var supports = !!document.querySelector && !!root.addEventListener; // Feature test
  var settings = {};
  var instance = 0;
  var count = 0;
  var mainNavWrapper, totalWidth, restWidth, mainNav, navDropdown, navDropdownToggle, dropDownWidth, toggleWrapper;
  var viewportWidth = 0;

  /**
   * Default settings
   * @type {{initClass: string, navDropdown: string, navDropdownToggle: string, mainNavWrapper: string, moved: Function, movedBack: Function}}
   */
  var defaults = {
    initClass: "js-priorityNav", // Class that will be printed on html element to allow conditional css styling.
    mainNavWrapper: "nav", // mainnav wrapper selector (must be direct parent from mainNav)
    mainNav: "ul", // mainnav selector. (must be inline-block)
    navDropdownClassName: "nav__dropdown", // class used for the dropdown.
    navDropdownToggleClassName: "nav__dropdown-toggle", // class used for the dropdown toggle.
    navDropdownLabel: "more", // Text that is used for the dropdown toggle.
    navDropdownBreakpointLabel: "menu", //button label for navDropdownToggle when the breakPoint is reached.
    breakPoint: 500, //amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
    throttleDelay: 50, // this will throttle the calculating logic on resize because i'm a responsible dev.
    offsetPixels: 0, // increase to decrease the time it takes to move an item.
    count: true, // prints the amount of items are moved to the attribute data-count to style with css counter.

    //Callbacks
    moved: function () {
    },
    movedBack: function () {
    }
  };


  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists
   * @private
   * @param {Array|Object|NodeList} collection Collection of items to iterate
   * @param {Function} callback Callback function for each iteration
   * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
   */
  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };


  /**
   * Get the closest matching element up the DOM tree
   * @param {Element} elem Starting element
   * @param {String} selector Selector to match against (class, ID, or data attribute)
   * @return {Boolean|Element} Returns false if not match found
   */
  var getClosest = function (elem, selector) {
    var firstChar = selector.charAt(0);
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (firstChar === ".") {
        if (elem.classList.contains(selector.substr(1))) {
          return elem;
        }
      } else if (firstChar === "#") {
        if (elem.id === selector.substr(1)) {
          return elem;
        }
      } else if (firstChar === "[") {
        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
          return elem;
        }
      }
    }
    return false;
  };


  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function (defaults, options) {
    var extended = {};
    forEach(defaults, function (value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function (value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };


  /**
   * Debounced resize to throttle execution
   * @param func
   * @param wait
   * @param immediate
   * @returns {Function}
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }


  /**
   * Toggle class on element
   * @param el
   * @param className
   */
  var toggleClass = function (el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(" ");
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1); else
        classes.push(className);

      el.className = classes.join(" ");
    }
  };


  /**
   * Check if dropdown menu is already on page before creating it
   * @param mainNavWrapper
   */
  var prepareHtml = function (_this, settings) {

    /**
     * Create dropdow menu
     * @type {HTMLElement}
     */
    toggleWrapper = document.createElement("span");
    navDropdown = document.createElement("ul");
    navDropdownToggle = document.createElement("button");

    /**
     * Set label for dropdown toggle
     * @type {string}
     */
    navDropdownToggle.innerHTML = settings.navDropdownLabel;

    /**
     * Set aria attributes for accessibility
     */
    navDropdownToggle.setAttribute("aria-controls", "menu");
    navDropdownToggle.setAttribute("type", "button");
    navDropdown.setAttribute("aria-hidden", "true");


    /**
     * Move elements to the right spot
     */
    if (_this.querySelector(mainNav).parentNode !== _this) {
      console.warn("mainNav is not a direct child of mainNavWrapper, double check please");
      return;
    }

    _this.insertAfter(toggleWrapper, _this.querySelector(mainNav));

    toggleWrapper.appendChild(navDropdownToggle);
    toggleWrapper.appendChild(navDropdown);

    /**
     * Add classes so we can target elements
     */
    navDropdown.classList.add(settings.navDropdownClassName);
    navDropdown.classList.add("priority-nav__dropdown");

    navDropdownToggle.classList.add(settings.navDropdownToggleClassName);
    navDropdownToggle.classList.add("priority-nav__dropdown-toggle");

    toggleWrapper.classList.add(settings.navDropdownClassName + "-wrapper");
    toggleWrapper.classList.add("priority-nav__wrapper");

    _this.classList.add("priority-nav");
  };


  /**
   * Get innerwidth without padding
   * @param element
   * @returns {number}
   */
  var getElementContentWidth = function (element) {
    var styles = window.getComputedStyle(element);
    var padding = parseFloat(styles.paddingLeft) +
      parseFloat(styles.paddingRight);

    return element.clientWidth - padding;
  };


  /**
   * Get viewport size
   * @returns {{width: number, height: number}}
   */
  var viewportSize = function () {
    var doc = document, w = window;
    var docEl = (doc.compatMode && doc.compatMode === "CSS1Compat") ?
      doc.documentElement : doc.body;

    var width = docEl.clientWidth;
    var height = docEl.clientHeight;

    // mobile zoomed in?
    if (w.innerWidth && width > w.innerWidth) {
      width = w.innerWidth;
      height = w.innerHeight;
    }

    return { width: width, height: height };
  };


  /**
   * Get width
   * @param elem
   * @returns {number}
   */
  var calculateWidths = function (_this) {
    totalWidth = getElementContentWidth(_this);
    //Check if parent is the navwrapper before calculating its width
    if (_this.querySelector(navDropdown).parentNode === _this) {
      dropDownWidth = _this.querySelector(navDropdown).offsetWidth;
    } else {
      dropDownWidth = 0;
    }
    restWidth = getChildrenWidth(_this) + settings.offsetPixels;
    viewportWidth = viewportSize().width;
  };


  /**
   * Move item to array
   * @param item
   */
  priorityNav.doesItFit = function (_this) {

    /**
     * Check if it is the first run
     */
    var delay = _this.getAttribute("instance") === 0 ? delay : settings.throttleDelay;

    /**
     * Increase instance
     */
    instance++;

    /**
     * Debounced execution of the main logic
     */
    (debounce(function () {

      /**
       * Get the current element"s instance
       * @type {string}
       */
      var identifier = _this.getAttribute("instance");

      /**
       * Update width
       */
      calculateWidths(_this);

      /**
       * Keep executing until all menu items that are overflowing are moved
       */
      while (totalWidth <= restWidth && _this.querySelector(mainNav).children.length > 0 || viewportWidth < settings.breakPoint && _this.querySelector(mainNav).children.length > 0) {
        //move item to dropdown
        priorityNav.toDropdown(_this, identifier);
        //recalculate widths
        calculateWidths(_this, identifier);
        //update dropdownToggle label
        if (viewportWidth < settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
      }

      /**
       * Keep executing until all menu items that are able to move back are moved
       */
      while (totalWidth >= breaks[identifier][breaks[identifier].length - 1] && viewportWidth > settings.breakPoint) {
        //move item to menu
        priorityNav.toMenu(_this, identifier);
        //update dropdownToggle label
        if (viewportWidth > settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownLabel);
      }

      /**
       * If there are no items in dropdown hide dropdown
       */
      if (breaks[identifier].length < 1) {
        _this.querySelector(navDropdown).classList.remove("show");
        //show navDropdownLabel
        updateLabel(_this, identifier, settings.navDropdownLabel);
      }

      /**
       * If there are no items in menu
       */
      if (_this.querySelector(mainNav).children.length < 1) {
        //show navDropdownBreakpointLabel
        _this.classList.add("is-empty");
        updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
      } else {
        _this.classList.remove("is-empty");
      }

      /**
       * Check if we need to show toggle menu button
       */
      showToggle(_this, identifier);

    }, delay))();
  };


  /**
   * Show/hide toggle button
   */
  var showToggle = function (_this, identifier) {
    if (breaks[identifier].length < 1) {
      _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-hidden");
      _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-visible");
      _this.classList.remove("priority-nav-has-dropdown");

      /**
       * Set aria attributes for accessibility
       */
      _this.querySelector(".priority-nav__wrapper").setAttribute("aria-haspopup", "false");

    } else {
      _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-visible");
      _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-hidden");
      _this.classList.add("priority-nav-has-dropdown");

      /**
       * Set aria attributes for accessibility
       */
      _this.querySelector(".priority-nav__wrapper").setAttribute("aria-haspopup", "true");
    }
  };


  /**
   * Update count on dropdown toggle button
   */
  var updateCount = function (_this, identifier) {
    _this.querySelector(navDropdownToggle).setAttribute("priorityNav-count", breaks[identifier].length);
  };

  var updateLabel = function (_this, identifier, label) {
    _this.querySelector(navDropdownToggle).innerHTML = label;
  };


  /**
   * Move item to dropdown
   */
  priorityNav.toDropdown = function (_this, identifier) {


    /**
     * move last child of navigation menu to dropdown
     */
    if (_this.querySelector(navDropdown).firstChild && _this.querySelector(mainNav).children.length > 0) {
      _this.querySelector(navDropdown).insertBefore(_this.querySelector(mainNav).lastElementChild, _this.querySelector(navDropdown).firstChild);
    } else if (_this.querySelector(mainNav).children.length > 0) {
      _this.querySelector(navDropdown).appendChild(_this.querySelector(mainNav).lastElementChild);
    }

    /**
     * store breakpoints
     */
    breaks[identifier].push(restWidth);

    /**
     * check if we need to show toggle menu button
     */
    showToggle(_this, identifier);

    /**
     * update count on dropdown toggle button
     */
    if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
      updateCount(_this, identifier);
    }

    /**
     * If item has been moved to dropdown trigger the callback
     */
    settings.moved();
  };


  /**
   * Move item to menu
   */
  priorityNav.toMenu = function (_this, identifier) {

    /**
     * move last child of navigation menu to dropdown
     */
    if (_this.querySelector(navDropdown).children.length > 0) _this.querySelector(mainNav).appendChild(_this.querySelector(navDropdown).firstElementChild);

    /**
     * remove last breakpoint
     */
    breaks[identifier].pop();

    /**
     * Check if we need to show toggle menu button
     */
    showToggle(_this, identifier);

    /**
     * update count on dropdown toggle button
     */
    if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
      updateCount(_this, identifier);
    }

    /**
     * If item has been moved back to the main menu trigger the callback
     */
    settings.movedBack();
  };


  /**
   * Count width of children and return the value
   * @param e
   */
  var getChildrenWidth = function (e) {
    var children = e.childNodes;
    var sum = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i].nodeType !== 3) {
        if (!isNaN(children[i].offsetWidth)) {
          sum += children[i].offsetWidth;
        }

      }
    }
    return sum;
  };



  /**
   * Bind eventlisteners
   */
  var listeners = function (_this, settings) {

    // Check if an item needs to move
    if (window.attachEvent) {
      window.attachEvent("onresize", function () {
        if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
      });
    }
    else if (window.addEventListener) {
      window.addEventListener("resize", function () {
        if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
      }, true);
    }

    // Toggle dropdown
    _this.querySelector(navDropdownToggle).addEventListener("click", function () {
      toggleClass(_this.querySelector(navDropdown), "show");
      toggleClass(this, "is-open");
      toggleClass(_this, "is-open");

      /**
       * Toggle aria hidden for accessibility
       */
      if (-1 !== _this.className.indexOf("is-open")) {
        _this.querySelector(navDropdown).setAttribute("aria-hidden", "false");
      } else {
        _this.querySelector(navDropdown).setAttribute("aria-hidden", "true");
        _this.querySelector(navDropdown).blur();
      }
    });

    /*
     * Remove when clicked outside dropdown
     */
    document.addEventListener("click", function (event) {
      if (!getClosest(event.target, "." + settings.navDropdownClassName) && event.target !== _this.querySelector(navDropdownToggle)) {
        _this.querySelector(navDropdown).classList.remove("show");
        _this.querySelector(navDropdownToggle).classList.remove("is-open");
        _this.classList.remove("is-open");
      }
    });

    /**
     * Remove when escape key is pressed
     */
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode === 27) {
        document.querySelector(navDropdown).classList.remove("show");
        document.querySelector(navDropdownToggle).classList.remove("is-open");
        mainNavWrapper.classList.remove("is-open");
      }
    };
  };


  /**
   * Remove function
   */
  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };

  /*global HTMLCollection */
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };


  /**
   * Destroy the current initialization.
   * @public
   */
  priorityNav.destroy = function () {
    // If plugin isn"t already initialized, stop
    if (!settings) return;
    // Remove feedback class
    document.documentElement.classList.remove(settings.initClass);
    // Remove toggle
    toggleWrapper.remove();
    // Remove settings
    settings = null;
    delete priorityNav.init;
    delete priorityNav.doesItFit;
  };


  /**
   * insertAfter function
   * @param n
   * @param r
   */
  if (supports && typeof Node !== "undefined") {
    Node.prototype.insertAfter = function (n, r) { this.insertBefore(n, r.nextSibling); };
  }

  var checkForSymbols = function (string) {
    var firstChar = string.charAt(0);
    if (firstChar === "." || firstChar === "#") {
      return false;
    } else {
      return true;
    }
  };


  /**
   * Initialize Plugin
   * @public
   * @param {Object} options User settings
   */
  priorityNav.init = function (options) {

    /**
     * Merge user options with defaults
     * @type {Object}
     */
    settings = extend(defaults, options || {});

    // Feature test.
    if (!supports && typeof Node === "undefined") {
      console.warn("This browser doesn't support priorityNav");
      return;
    }

    // Options check
    if (!checkForSymbols(settings.navDropdownClassName) || !checkForSymbols(settings.navDropdownToggleClassName)) {
      console.warn("No symbols allowed in navDropdownClassName & navDropdownToggleClassName. These are not selectors.");
      return;
    }

    /**
     * Store nodes
     * @type {NodeList}
     */
    var elements = document.querySelectorAll(settings.mainNavWrapper);

    /**
     * Loop over every instance and reference _this
     */
    forEach(elements, function (_this) {

      /**
       * Create breaks array
       * @type {number}
       */
      breaks[count] = [];

      /**
       * Set the instance number as data attribute
       */
      _this.setAttribute("instance", count++);

      /**
       * Store the wrapper element
       */
      mainNavWrapper = _this;
      if (!mainNavWrapper) {
        console.warn("couldn't find the specified mainNavWrapper element");
        return;
      }

      /**
       * Store the menu elementStore the menu element
       */
      mainNav = settings.mainNav;
      if (!_this.querySelector(mainNav)) {
        console.warn("couldn't find the specified mainNav element");
        return;
      }

      /**
       * Check if we need to create the dropdown elements
       */
      prepareHtml(_this, settings);

      /**
       * Store the dropdown element
       */
      navDropdown = "." + settings.navDropdownClassName;
      if (!_this.querySelector(navDropdown)) {
        console.warn("couldn't find the specified navDropdown element");
        return;
      }

      /**
       * Store the dropdown toggle element
       */
      navDropdownToggle = "." + settings.navDropdownToggleClassName;
      if (!_this.querySelector(navDropdownToggle)) {
        console.warn("couldn't find the specified navDropdownToggle element");
        return;
      }

      /**
       * Event listeners
       */
      listeners(_this, settings);

      /**
       * Start first check
       */
      priorityNav.doesItFit(_this);

    });

    /**
     * Count amount of instances
     */
    instance++;

    /**
     * Add class to HTML element to activate conditional CSS
     */
    document.documentElement.classList.add(settings.initClass);
  };


  /**
   * Public APIs
   */
  return priorityNav;

});
(function ($) {
  var rotationThumbs = {},
    rotationId = null,
    rotationUid = null,
    isTouch = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone/gi).test(navigator.appVersion)
    ;
  function swipeDetect(el, callback) {
    var touchsurface = el,
      swipedir,
      startX,
      startY,
      distX,
      distY,
      threshold = 30, //required min distance traveled to be considered swipe
      restraint = 100, // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 300, // maximum time allowed to travel that distance
      elapsedTime,
      startTime,
      handleswipe = callback || function (swipedir) { }
    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime) { // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
          swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
          swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir)
    }, false)
  }
  function rotationStop() {
    if (rotationId) {
      var thumbData = rotationThumbs[rotationId];
      if (thumbData && thumbData['thumb'] && thumbData['thumbInitial']) {
        thumbData['thumb'].src = thumbData['thumbInitial'];
      }
    }
    rotationId = null;
    rotationUid = null;
  }

  function rotationStart(image, thumbCount, rotationPeriod, dir) {
    rotationStop();

    if (image) {
      var currentThumbUrl = image.src;
      if (currentThumbUrl.indexOf('data:image') == 0) {
        return;
      }
      if (currentThumbUrl.lastIndexOf('/') > 0) {
        var urlPrefix = currentThumbUrl.substring(0, currentThumbUrl.lastIndexOf('/') + 1);
      }

      var thumbId = image.id;
      if (!thumbId) {
        thumbId = 'rid_' + new Date().getTime();
        image.id = thumbId
      }
      var initialIdx = 1;
      if (image.src.indexOf('' + urlPrefix + initialIdx + '.jpg') >= 0) {
        initialIdx = 2;
      }
      rotationThumbs[thumbId] = {
        thumb: image,
        thumbInitial: currentThumbUrl,
        prefix: urlPrefix,
        count: thumbCount,
        ext: '.jpg',
        idx: initialIdx - 1,
        dir: dir || null
      };

      if (rotationThumbs[thumbId]['thumb']) {
        rotationUid = new Date().getTime();
        rotationId = thumbId;
        rotationInvoke(thumbId, rotationUid, rotationPeriod);
      }
    }
  }

  function rotationInvoke(thumbId, uid, rotationPeriod) {
    var thumbData = rotationThumbs[thumbId];
    if (thumbData) {
      var thumb = thumbData['thumb'];
      var prefix = thumbData['prefix'];
      var count = thumbData['count'];
      var ext = thumbData['ext'];
      var idx = thumbData['idx'];
      var dir = thumbData['dir'];
      if (dir == 'right') {
        idx = (idx == 1 ? count : idx - 1);
      } else if (dir == 'left' || !isTouch) {
        idx = (idx == count ? 1 : idx + 1);
      }

      thumbData['idx'] = idx;

      var url = prefix + idx + (ext ? ext : '.jpg');
      var img = new Image();
      img.onload = function () {
        if ((thumbId == rotationId) && (uid == rotationUid)) {
          if (img.width == 0) {
            rotationInvoke(thumbId, uid, rotationPeriod);
          }
          thumb.src = url;
          setTimeout(function () {
            rotationInvoke(thumbId, uid, rotationPeriod);
          }, rotationPeriod * 1000);
        }
      };
      img.onerror = function () {
        if ((thumbId == rotationId) && (uid == rotationUid)) {
          rotationInvoke(thumbId, uid, rotationPeriod);
        }
      };
      img.src = url;
      rotationThumbs[thumbId] = thumbData;
    }
  }

  $.fn.thumbs = function (time) {
    this.each(function () {
      var rotationPeriod = time || 0.8;
      var $thumb = $(this);
      var imagesCount = parseInt($thumb.attr('data-cnt'));
      if (imagesCount && imagesCount > 1) {
        if (isTouch) {
          swipeDetect($thumb[0], function (dir) {
            rotationStart($thumb[0], imagesCount, rotationPeriod, dir);
          });
          $thumb[0].addEventListener('touchcancel', function () {
            rotationStop();
          });
        } else {
          $thumb.mouseover(function () {
            rotationStart(this, imagesCount, rotationPeriod);
          });
          $thumb.mouseout(function () {
            rotationStop();
          });
        }
      }
    });
    return this;
  };
}(jQuery));

/*!
 * Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
    (function () {
      // Restore the Select2 AMD loader so it can be used
      // Needed mostly in the language files, where the loader is not inserted
      if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
        var S2 = jQuery.fn.select2.amd;
      }
      var S2; (function () {
        if (!S2 || !S2.requirejs) {
          if (!S2) { S2 = {}; } else { require = S2; }
          /**
           * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
           * Available via the MIT or new BSD license.
           * see: http://github.com/jrburke/almond for details
           */
          //Going sloppy to avoid 'use strict' string cost, but strict practices should
          //be followed.
          /*jslint sloppy: true */
          /*global setTimeout: false */

          var requirejs, require, define;
          (function (undef) {
            var main, req, makeMap, handlers,
              defined = {},
              waiting = {},
              config = {},
              defining = {},
              hasOwn = Object.prototype.hasOwnProperty,
              aps = [].slice,
              jsSuffixRegExp = /\.js$/;

            function hasProp(obj, prop) {
              return hasOwn.call(obj, prop);
            }

            /**
             * Given a relative module name, like ./something, normalize it to
             * a real name that can be mapped to a path.
             * @param {String} name the relative name
             * @param {String} baseName a real name that the name arg is relative
             * to.
             * @returns {String} normalized name
             */
            function normalize(name, baseName) {
              var nameParts, nameSegment, mapValue, foundMap, lastIndex,
                foundI, foundStarMap, starI, i, j, part,
                baseParts = baseName && baseName.split("/"),
                map = config.map,
                starMap = (map && map['*']) || {};

              //Adjust any relative paths.
              if (name && name.charAt(0) === ".") {
                //If have a base name, try to normalize against it,
                //otherwise, assume it is a top-level require that will
                //be relative to baseUrl in the end.
                if (baseName) {
                  name = name.split('/');
                  lastIndex = name.length - 1;

                  // Node .js allowance:
                  if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                  }

                  //Lop off the last part of baseParts, so that . matches the
                  //"directory" and not name of the baseName's module. For instance,
                  //baseName of "one/two/three", maps to "one/two/three.js", but we
                  //want the directory, "one/two" for this normalization.
                  name = baseParts.slice(0, baseParts.length - 1).concat(name);

                  //start trimDots
                  for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                      name.splice(i, 1);
                      i -= 1;
                    } else if (part === "..") {
                      if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                      } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                      }
                    }
                  }
                  //end trimDots

                  name = name.join("/");
                } else if (name.indexOf('./') === 0) {
                  // No baseName, so this is ID is resolved relative
                  // to baseUrl, pull off the leading dot.
                  name = name.substring(2);
                }
              }

              //Apply map config if available.
              if ((baseParts || starMap) && map) {
                nameParts = name.split('/');

                for (i = nameParts.length; i > 0; i -= 1) {
                  nameSegment = nameParts.slice(0, i).join("/");

                  if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                      mapValue = map[baseParts.slice(0, j).join('/')];

                      //baseName segment has  config, find if it has one for
                      //this name.
                      if (mapValue) {
                        mapValue = mapValue[nameSegment];
                        if (mapValue) {
                          //Match, update name to the new value.
                          foundMap = mapValue;
                          foundI = i;
                          break;
                        }
                      }
                    }
                  }

                  if (foundMap) {
                    break;
                  }

                  //Check for a star map match, but just hold on to it,
                  //if there is a shorter segment match later in a matching
                  //config, then favor over this star map.
                  if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                  }
                }

                if (!foundMap && foundStarMap) {
                  foundMap = foundStarMap;
                  foundI = starI;
                }

                if (foundMap) {
                  nameParts.splice(0, foundI, foundMap);
                  name = nameParts.join('/');
                }
              }

              return name;
            }

            function makeRequire(relName, forceSync) {
              return function () {
                //A version of a require function that passes a moduleName
                //value for items that may need to
                //look up paths relative to the moduleName
                var args = aps.call(arguments, 0);

                //If first arg is not require('string'), and there is only
                //one arg, it is the array form without a callback. Insert
                //a null so that the following concat is correct.
                if (typeof args[0] !== 'string' && args.length === 1) {
                  args.push(null);
                }
                return req.apply(undef, args.concat([relName, forceSync]));
              };
            }

            function makeNormalize(relName) {
              return function (name) {
                return normalize(name, relName);
              };
            }

            function makeLoad(depName) {
              return function (value) {
                defined[depName] = value;
              };
            }

            function callDep(name) {
              if (hasProp(waiting, name)) {
                var args = waiting[name];
                delete waiting[name];
                defining[name] = true;
                main.apply(undef, args);
              }

              if (!hasProp(defined, name) && !hasProp(defining, name)) {
                throw new Error('No ' + name);
              }
              return defined[name];
            }

            //Turns a plugin!resource to [plugin, resource]
            //with the plugin being undefined if the name
            //did not have a plugin prefix.
            function splitPrefix(name) {
              var prefix,
                index = name ? name.indexOf('!') : -1;
              if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
              }
              return [prefix, name];
            }

            /**
             * Makes a name map, normalizing the name, and using a plugin
             * for normalization if necessary. Grabs a ref to plugin
             * too, as an optimization.
             */
            makeMap = function (name, relName) {
              var plugin,
                parts = splitPrefix(name),
                prefix = parts[0];

              name = parts[1];

              if (prefix) {
                prefix = normalize(prefix, relName);
                plugin = callDep(prefix);
              }

              //Normalize according
              if (prefix) {
                if (plugin && plugin.normalize) {
                  name = plugin.normalize(name, makeNormalize(relName));
                } else {
                  name = normalize(name, relName);
                }
              } else {
                name = normalize(name, relName);
                parts = splitPrefix(name);
                prefix = parts[0];
                name = parts[1];
                if (prefix) {
                  plugin = callDep(prefix);
                }
              }

              //Using ridiculous property names for space reasons
              return {
                f: prefix ? prefix + '!' + name : name, //fullName
                n: name,
                pr: prefix,
                p: plugin
              };
            };

            function makeConfig(name) {
              return function () {
                return (config && config.config && config.config[name]) || {};
              };
            }

            handlers = {
              require: function (name) {
                return makeRequire(name);
              },
              exports: function (name) {
                var e = defined[name];
                if (typeof e !== 'undefined') {
                  return e;
                } else {
                  return (defined[name] = {});
                }
              },
              module: function (name) {
                return {
                  id: name,
                  uri: '',
                  exports: defined[name],
                  config: makeConfig(name)
                };
              }
            };

            main = function (name, deps, callback, relName) {
              var cjsModule, depName, ret, map, i,
                args = [],
                callbackType = typeof callback,
                usingExports;

              //Use name if no relName
              relName = relName || name;

              //Call the callback to define the module, if necessary.
              if (callbackType === 'undefined' || callbackType === 'function') {
                //Pull out the defined dependencies and pass the ordered
                //values to the callback.
                //Default to [require, exports, module] if no deps
                deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
                for (i = 0; i < deps.length; i += 1) {
                  map = makeMap(deps[i], relName);
                  depName = map.f;

                  //Fast path CommonJS standard dependencies.
                  if (depName === "require") {
                    args[i] = handlers.require(name);
                  } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                  } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                  } else if (hasProp(defined, depName) ||
                    hasProp(waiting, depName) ||
                    hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                  } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                  } else {
                    throw new Error(name + ' missing ' + depName);
                  }
                }

                ret = callback ? callback.apply(defined[name], args) : undefined;

                if (name) {
                  //If setting exports via "module" is in play,
                  //favor that over return value and exports. After that,
                  //favor a non-undefined return value over exports use.
                  if (cjsModule && cjsModule.exports !== undef &&
                    cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                  } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                  }
                }
              } else if (name) {
                //May just be an object definition for the module. Only
                //worry about defining if have a module name.
                defined[name] = callback;
              }
            };

            requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
              if (typeof deps === "string") {
                if (handlers[deps]) {
                  //callback in this case is really relName
                  return handlers[deps](callback);
                }
                //Just return the module wanted. In this scenario, the
                //deps arg is the module name, and second arg (if passed)
                //is just the relName.
                //Normalize module name, if it contains . or ..
                return callDep(makeMap(deps, callback).f);
              } else if (!deps.splice) {
                //deps is a config object, not an array.
                config = deps;
                if (config.deps) {
                  req(config.deps, config.callback);
                }
                if (!callback) {
                  return;
                }

                if (callback.splice) {
                  //callback is an array, which means it is a dependency list.
                  //Adjust args if there are dependencies
                  deps = callback;
                  callback = relName;
                  relName = null;
                } else {
                  deps = undef;
                }
              }

              //Support require(['a'])
              callback = callback || function () { };

              //If relName is a function, it is an errback handler,
              //so remove it.
              if (typeof relName === 'function') {
                relName = forceSync;
                forceSync = alt;
              }

              //Simulate async callback;
              if (forceSync) {
                main(undef, deps, callback, relName);
              } else {
                //Using a non-zero value because of concern for what old browsers
                //do, and latest browsers "upgrade" to 4 if lower value is used:
                //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
                //If want a value immediately, use require('id') instead -- something
                //that works in almond on the global level, but not guaranteed and
                //unlikely to work in other AMD implementations.
                setTimeout(function () {
                  main(undef, deps, callback, relName);
                }, 4);
              }

              return req;
            };

            /**
             * Just drops the config on the floor, but returns req in case
             * the config return value is used.
             */
            req.config = function (cfg) {
              return req(cfg);
            };

            /**
             * Expose module registry for debugging and tooling
             */
            requirejs._defined = defined;

            define = function (name, deps, callback) {
              if (typeof name !== 'string') {
                throw new Error('See almond README: incorrect module build, no module name');
              }

              //This module may not have dependencies
              if (!deps.splice) {
                //deps is not an array, so probably means
                //an object literal or factory function for
                //the value. Adjust args.
                callback = deps;
                deps = [];
              }

              if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                waiting[name] = [name, deps, callback];
              }
            };

            define.amd = {
              jQuery: true
            };
          }());

          S2.requirejs = requirejs; S2.require = require; S2.define = define;
        }
      }());
      S2.define("almond", function () { });

      /* global jQuery:false, $:false */
      S2.define('jquery', [], function () {
        var _$ = jQuery || $;

        if (_$ == null && console && console.error) {
          console.error(
            'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
            'found. Make sure that you are including jQuery before Select2 on your ' +
            'web page.'
          );
        }

        return _$;
      });

      S2.define('select2/utils', [
        'jquery'
      ], function ($) {
        var Utils = {};

        Utils.Extend = function (ChildClass, SuperClass) {
          var __hasProp = {}.hasOwnProperty;

          function BaseConstructor() {
            this.constructor = ChildClass;
          }

          for (var key in SuperClass) {
            if (__hasProp.call(SuperClass, key)) {
              ChildClass[key] = SuperClass[key];
            }
          }

          BaseConstructor.prototype = SuperClass.prototype;
          ChildClass.prototype = new BaseConstructor();
          ChildClass.__super__ = SuperClass.prototype;

          return ChildClass;
        };

        function getMethods(theClass) {
          var proto = theClass.prototype;

          var methods = [];

          for (var methodName in proto) {
            var m = proto[methodName];

            if (typeof m !== 'function') {
              continue;
            }

            if (methodName === 'constructor') {
              continue;
            }

            methods.push(methodName);
          }

          return methods;
        }

        Utils.Decorate = function (SuperClass, DecoratorClass) {
          var decoratedMethods = getMethods(DecoratorClass);
          var superMethods = getMethods(SuperClass);

          function DecoratedClass() {
            var unshift = Array.prototype.unshift;

            var argCount = DecoratorClass.prototype.constructor.length;

            var calledConstructor = SuperClass.prototype.constructor;

            if (argCount > 0) {
              unshift.call(arguments, SuperClass.prototype.constructor);

              calledConstructor = DecoratorClass.prototype.constructor;
            }

            calledConstructor.apply(this, arguments);
          }

          DecoratorClass.displayName = SuperClass.displayName;

          function ctr() {
            this.constructor = DecoratedClass;
          }

          DecoratedClass.prototype = new ctr();

          for (var m = 0; m < superMethods.length; m++) {
            var superMethod = superMethods[m];

            DecoratedClass.prototype[superMethod] =
              SuperClass.prototype[superMethod];
          }

          var calledMethod = function (methodName) {
            // Stub out the original method if it's not decorating an actual method
            var originalMethod = function () { };

            if (methodName in DecoratedClass.prototype) {
              originalMethod = DecoratedClass.prototype[methodName];
            }

            var decoratedMethod = DecoratorClass.prototype[methodName];

            return function () {
              var unshift = Array.prototype.unshift;

              unshift.call(arguments, originalMethod);

              return decoratedMethod.apply(this, arguments);
            };
          };

          for (var d = 0; d < decoratedMethods.length; d++) {
            var decoratedMethod = decoratedMethods[d];

            DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
          }

          return DecoratedClass;
        };

        var Observable = function () {
          this.listeners = {};
        };

        Observable.prototype.on = function (event, callback) {
          this.listeners = this.listeners || {};

          if (event in this.listeners) {
            this.listeners[event].push(callback);
          } else {
            this.listeners[event] = [callback];
          }
        };

        Observable.prototype.trigger = function (event) {
          var slice = Array.prototype.slice;
          var params = slice.call(arguments, 1);

          this.listeners = this.listeners || {};

          // Params should always come in as an array
          if (params == null) {
            params = [];
          }

          // If there are no arguments to the event, use a temporary object
          if (params.length === 0) {
            params.push({});
          }

          // Set the `_type` of the first object to the event
          params[0]._type = event;

          if (event in this.listeners) {
            this.invoke(this.listeners[event], slice.call(arguments, 1));
          }

          if ('*' in this.listeners) {
            this.invoke(this.listeners['*'], arguments);
          }
        };

        Observable.prototype.invoke = function (listeners, params) {
          for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i].apply(this, params);
          }
        };

        Utils.Observable = Observable;

        Utils.generateChars = function (length) {
          var chars = '';

          for (var i = 0; i < length; i++) {
            var randomChar = Math.floor(Math.random() * 36);
            chars += randomChar.toString(36);
          }

          return chars;
        };

        Utils.bind = function (func, context) {
          return function () {
            func.apply(context, arguments);
          };
        };

        Utils._convertData = function (data) {
          for (var originalKey in data) {
            var keys = originalKey.split('-');

            var dataLevel = data;

            if (keys.length === 1) {
              continue;
            }

            for (var k = 0; k < keys.length; k++) {
              var key = keys[k];

              // Lowercase the first letter
              // By default, dash-separated becomes camelCase
              key = key.substring(0, 1).toLowerCase() + key.substring(1);

              if (!(key in dataLevel)) {
                dataLevel[key] = {};
              }

              if (k == keys.length - 1) {
                dataLevel[key] = data[originalKey];
              }

              dataLevel = dataLevel[key];
            }

            delete data[originalKey];
          }

          return data;
        };

        Utils.hasScroll = function (index, el) {
          // Adapted from the function created by @ShadowScripter
          // and adapted by @BillBarry on the Stack Exchange Code Review website.
          // The original code can be found at
          // http://codereview.stackexchange.com/q/13338
          // and was designed to be used with the Sizzle selector engine.

          var $el = $(el);
          var overflowX = el.style.overflowX;
          var overflowY = el.style.overflowY;

          //Check both x and y declarations
          if (overflowX === overflowY &&
            (overflowY === 'hidden' || overflowY === 'visible')) {
            return false;
          }

          if (overflowX === 'scroll' || overflowY === 'scroll') {
            return true;
          }

          return ($el.innerHeight() < el.scrollHeight ||
            $el.innerWidth() < el.scrollWidth);
        };

        Utils.escapeMarkup = function (markup) {
          var replaceMap = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#47;'
          };

          // Do not try to escape the markup if it's not a string
          if (typeof markup !== 'string') {
            return markup;
          }

          return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
            return replaceMap[match];
          });
        };

        // Append an array of jQuery nodes to a given element.
        Utils.appendMany = function ($element, $nodes) {
          // jQuery 1.7.x does not support $.fn.append() with an array
          // Fall back to a jQuery object collection using $.fn.add()
          if ($.fn.jquery.substr(0, 3) === '1.7') {
            var $jqNodes = $();

            $.map($nodes, function (node) {
              $jqNodes = $jqNodes.add(node);
            });

            $nodes = $jqNodes;
          }

          $element.append($nodes);
        };

        return Utils;
      });

      S2.define('select2/results', [
        'jquery',
        './utils'
      ], function ($, Utils) {
        function Results($element, options, dataAdapter) {
          this.$element = $element;
          this.data = dataAdapter;
          this.options = options;

          Results.__super__.constructor.call(this);
        }

        Utils.Extend(Results, Utils.Observable);

        Results.prototype.render = function () {
          var $results = $(
            '<ul class="select2-results__options" role="tree"></ul>'
          );

          if (this.options.get('multiple')) {
            $results.attr('aria-multiselectable', 'true');
          }

          this.$results = $results;

          return $results;
        };

        Results.prototype.clear = function () {
          this.$results.empty();
        };

        Results.prototype.displayMessage = function (params) {
          var escapeMarkup = this.options.get('escapeMarkup');

          this.clear();
          this.hideLoading();

          var $message = $(
            '<li role="treeitem" aria-live="assertive"' +
            ' class="select2-results__option"></li>'
          );

          var message = this.options.get('translations').get(params.message);

          $message.append(
            escapeMarkup(
              message(params.args)
            )
          );

          $message[0].className += ' select2-results__message';

          this.$results.append($message);
        };

        Results.prototype.hideMessages = function () {
          this.$results.find('.select2-results__message').remove();
        };

        Results.prototype.append = function (data) {
          this.hideLoading();

          var $options = [];

          if (data.results == null || data.results.length === 0) {
            if (this.$results.children().length === 0) {
              this.trigger('results:message', {
                message: 'noResults'
              });
            }

            return;
          }

          data.results = this.sort(data.results);

          for (var d = 0; d < data.results.length; d++) {
            var item = data.results[d];

            var $option = this.option(item);

            $options.push($option);
          }

          this.$results.append($options);
        };

        Results.prototype.position = function ($results, $dropdown) {
          var $resultsContainer = $dropdown.find('.select2-results');
          $resultsContainer.append($results);
        };

        Results.prototype.sort = function (data) {
          var sorter = this.options.get('sorter');

          return sorter(data);
        };

        Results.prototype.highlightFirstItem = function () {
          var $options = this.$results
            .find('.select2-results__option[aria-selected]');

          var $selected = $options.filter('[aria-selected=true]');

          // Check if there are any selected options
          if ($selected.length > 0) {
            // If there are selected options, highlight the first
            $selected.first().trigger('mouseenter');
          } else {
            // If there are no selected options, highlight the first option
            // in the dropdown
            $options.first().trigger('mouseenter');
          }

          this.ensureHighlightVisible();
        };

        Results.prototype.setClasses = function () {
          var self = this;

          this.data.current(function (selected) {
            var selectedIds = $.map(selected, function (s) {
              return s.id.toString();
            });

            var $options = self.$results
              .find('.select2-results__option[aria-selected]');

            $options.each(function () {
              var $option = $(this);

              var item = $.data(this, 'data');

              // id needs to be converted to a string when comparing
              var id = '' + item.id;

              if ((item.element != null && item.element.selected) ||
                (item.element == null && $.inArray(id, selectedIds) > -1)) {
                $option.attr('aria-selected', 'true');
              } else {
                $option.attr('aria-selected', 'false');
              }
            });

          });
        };

        Results.prototype.showLoading = function (params) {
          this.hideLoading();

          var loadingMore = this.options.get('translations').get('searching');

          var loading = {
            disabled: true,
            loading: true,
            text: loadingMore(params)
          };
          var $loading = this.option(loading);
          $loading.className += ' loading-results';

          this.$results.prepend($loading);
        };

        Results.prototype.hideLoading = function () {
          this.$results.find('.loading-results').remove();
        };

        Results.prototype.option = function (data) {
          var option = document.createElement('li');
          option.className = 'select2-results__option';

          var attrs = {
            'role': 'treeitem',
            'aria-selected': 'false'
          };

          if (data.disabled) {
            delete attrs['aria-selected'];
            attrs['aria-disabled'] = 'true';
          }

          if (data.id == null) {
            delete attrs['aria-selected'];
          }

          if (data._resultId != null) {
            option.id = data._resultId;
          }

          if (data.title) {
            option.title = data.title;
          }

          if (data.children) {
            attrs.role = 'group';
            attrs['aria-label'] = data.text;
            delete attrs['aria-selected'];
          }

          for (var attr in attrs) {
            var val = attrs[attr];

            option.setAttribute(attr, val);
          }

          if (data.children) {
            var $option = $(option);

            var label = document.createElement('strong');
            label.className = 'select2-results__group';

            var $label = $(label);
            this.template(data, label);

            var $children = [];

            for (var c = 0; c < data.children.length; c++) {
              var child = data.children[c];

              var $child = this.option(child);

              $children.push($child);
            }

            var $childrenContainer = $('<ul></ul>', {
              'class': 'select2-results__options select2-results__options--nested'
            });

            $childrenContainer.append($children);

            $option.append(label);
            $option.append($childrenContainer);
          } else {
            this.template(data, option);
          }

          $.data(option, 'data', data);

          return option;
        };

        Results.prototype.bind = function (container, $container) {
          var self = this;

          var id = container.id + '-results';

          this.$results.attr('id', id);

          container.on('results:all', function (params) {
            self.clear();
            self.append(params.data);

            if (container.isOpen()) {
              self.setClasses();
              self.highlightFirstItem();
            }
          });

          container.on('results:append', function (params) {
            self.append(params.data);

            if (container.isOpen()) {
              self.setClasses();
            }
          });

          container.on('query', function (params) {
            self.hideMessages();
            self.showLoading(params);
          });

          container.on('select', function () {
            if (!container.isOpen()) {
              return;
            }

            self.setClasses();
            self.highlightFirstItem();
          });

          container.on('unselect', function () {
            if (!container.isOpen()) {
              return;
            }

            self.setClasses();
            self.highlightFirstItem();
          });

          container.on('open', function () {
            // When the dropdown is open, aria-expended="true"
            self.$results.attr('aria-expanded', 'true');
            self.$results.attr('aria-hidden', 'false');

            self.setClasses();
            self.ensureHighlightVisible();
          });

          container.on('close', function () {
            // When the dropdown is closed, aria-expended="false"
            self.$results.attr('aria-expanded', 'false');
            self.$results.attr('aria-hidden', 'true');
            self.$results.removeAttr('aria-activedescendant');
          });

          container.on('results:toggle', function () {
            var $highlighted = self.getHighlightedResults();

            if ($highlighted.length === 0) {
              return;
            }

            $highlighted.trigger('mouseup');
          });

          container.on('results:select', function () {
            var $highlighted = self.getHighlightedResults();

            if ($highlighted.length === 0) {
              return;
            }

            var data = $highlighted.data('data');

            if ($highlighted.attr('aria-selected') == 'true') {
              self.trigger('close', {});
            } else {
              self.trigger('select', {
                data: data
              });
            }
          });

          container.on('results:previous', function () {
            var $highlighted = self.getHighlightedResults();

            var $options = self.$results.find('[aria-selected]');

            var currentIndex = $options.index($highlighted);

            // If we are already at te top, don't move further
            if (currentIndex === 0) {
              return;
            }

            var nextIndex = currentIndex - 1;

            // If none are highlighted, highlight the first
            if ($highlighted.length === 0) {
              nextIndex = 0;
            }

            var $next = $options.eq(nextIndex);

            $next.trigger('mouseenter');

            var currentOffset = self.$results.offset().top;
            var nextTop = $next.offset().top;
            var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

            if (nextIndex === 0) {
              self.$results.scrollTop(0);
            } else if (nextTop - currentOffset < 0) {
              self.$results.scrollTop(nextOffset);
            }
          });

          container.on('results:next', function () {
            var $highlighted = self.getHighlightedResults();

            var $options = self.$results.find('[aria-selected]');

            var currentIndex = $options.index($highlighted);

            var nextIndex = currentIndex + 1;

            // If we are at the last option, stay there
            if (nextIndex >= $options.length) {
              return;
            }

            var $next = $options.eq(nextIndex);

            $next.trigger('mouseenter');

            var currentOffset = self.$results.offset().top +
              self.$results.outerHeight(false);
            var nextBottom = $next.offset().top + $next.outerHeight(false);
            var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

            if (nextIndex === 0) {
              self.$results.scrollTop(0);
            } else if (nextBottom > currentOffset) {
              self.$results.scrollTop(nextOffset);
            }
          });

          container.on('results:focus', function (params) {
            params.element.addClass('select2-results__option--highlighted');
          });

          container.on('results:message', function (params) {
            self.displayMessage(params);
          });

          if ($.fn.mousewheel) {
            this.$results.on('mousewheel', function (e) {
              var top = self.$results.scrollTop();

              var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

              var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
              var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

              if (isAtTop) {
                self.$results.scrollTop(0);

                e.preventDefault();
                e.stopPropagation();
              } else if (isAtBottom) {
                self.$results.scrollTop(
                  self.$results.get(0).scrollHeight - self.$results.height()
                );

                e.preventDefault();
                e.stopPropagation();
              }
            });
          }

          this.$results.on('mouseup', '.select2-results__option[aria-selected]',
            function (evt) {
              var $this = $(this);

              var data = $this.data('data');

              if ($this.attr('aria-selected') === 'true') {
                if (self.options.get('multiple')) {
                  self.trigger('unselect', {
                    originalEvent: evt,
                    data: data
                  });
                } else {
                  self.trigger('close', {});
                }

                return;
              }

              self.trigger('select', {
                originalEvent: evt,
                data: data
              });
            });

          this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
            function (evt) {
              var data = $(this).data('data');

              self.getHighlightedResults()
                .removeClass('select2-results__option--highlighted');

              self.trigger('results:focus', {
                data: data,
                element: $(this)
              });
            });
        };

        Results.prototype.getHighlightedResults = function () {
          var $highlighted = this.$results
            .find('.select2-results__option--highlighted');

          return $highlighted;
        };

        Results.prototype.destroy = function () {
          this.$results.remove();
        };

        Results.prototype.ensureHighlightVisible = function () {
          var $highlighted = this.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          var $options = this.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          var currentOffset = this.$results.offset().top;
          var nextTop = $highlighted.offset().top;
          var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

          var offsetDelta = nextTop - currentOffset;
          nextOffset -= $highlighted.outerHeight(false) * 2;

          if (currentIndex <= 2) {
            this.$results.scrollTop(0);
          } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
            this.$results.scrollTop(nextOffset);
          }
        };

        Results.prototype.template = function (result, container) {
          var template = this.options.get('templateResult');
          var escapeMarkup = this.options.get('escapeMarkup');

          var content = template(result, container);

          if (content == null) {
            container.style.display = 'none';
          } else if (typeof content === 'string') {
            container.innerHTML = escapeMarkup(content);
          } else {
            $(container).append(content);
          }
        };

        return Results;
      });

      S2.define('select2/keys', [

      ], function () {
        var KEYS = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          ESC: 27,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46
        };

        return KEYS;
      });

      S2.define('select2/selection/base', [
        'jquery',
        '../utils',
        '../keys'
      ], function ($, Utils, KEYS) {
        function BaseSelection($element, options) {
          this.$element = $element;
          this.options = options;

          BaseSelection.__super__.constructor.call(this);
        }

        Utils.Extend(BaseSelection, Utils.Observable);

        BaseSelection.prototype.render = function () {
          var $selection = $(
            '<span class="select2-selection" role="combobox" ' +
            ' aria-haspopup="true" aria-expanded="false">' +
            '</span>'
          );

          this._tabindex = 0;

          if (this.$element.data('old-tabindex') != null) {
            this._tabindex = this.$element.data('old-tabindex');
          } else if (this.$element.attr('tabindex') != null) {
            this._tabindex = this.$element.attr('tabindex');
          }

          $selection.attr('title', this.$element.attr('title'));
          $selection.attr('tabindex', this._tabindex);

          this.$selection = $selection;

          return $selection;
        };

        BaseSelection.prototype.bind = function (container, $container) {
          var self = this;

          var id = container.id + '-container';
          var resultsId = container.id + '-results';

          this.container = container;

          this.$selection.on('focus', function (evt) {
            self.trigger('focus', evt);
          });

          this.$selection.on('blur', function (evt) {
            self._handleBlur(evt);
          });

          this.$selection.on('keydown', function (evt) {
            self.trigger('keypress', evt);

            if (evt.which === KEYS.SPACE) {
              evt.preventDefault();
            }
          });

          container.on('results:focus', function (params) {
            self.$selection.attr('aria-activedescendant', params.data._resultId);
          });

          container.on('selection:update', function (params) {
            self.update(params.data);
          });

          container.on('open', function () {
            // When the dropdown is open, aria-expanded="true"
            self.$selection.attr('aria-expanded', 'true');
            self.$selection.attr('aria-owns', resultsId);

            self._attachCloseHandler(container);
          });

          container.on('close', function () {
            // When the dropdown is closed, aria-expanded="false"
            self.$selection.attr('aria-expanded', 'false');
            self.$selection.removeAttr('aria-activedescendant');
            self.$selection.removeAttr('aria-owns');

            self.$selection.focus();

            self._detachCloseHandler(container);
          });

          container.on('enable', function () {
            self.$selection.attr('tabindex', self._tabindex);
          });

          container.on('disable', function () {
            self.$selection.attr('tabindex', '-1');
          });
        };

        BaseSelection.prototype._handleBlur = function (evt) {
          var self = this;

          // This needs to be delayed as the active element is the body when the tab
          // key is pressed, possibly along with others.
          window.setTimeout(function () {
            // Don't trigger `blur` if the focus is still in the selection
            if (
              (document.activeElement == self.$selection[0]) ||
              ($.contains(self.$selection[0], document.activeElement))
            ) {
              return;
            }

            self.trigger('blur', evt);
          }, 1);
        };

        BaseSelection.prototype._attachCloseHandler = function (container) {
          var self = this;

          $(document.body).on('mousedown.select2.' + container.id, function (e) {
            var $target = $(e.target);

            var $select = $target.closest('.select2');

            var $all = $('.select2.select2-container--open');

            $all.each(function () {
              var $this = $(this);

              if (this == $select[0]) {
                return;
              }

              var $element = $this.data('element');

              $element.select2('close');
            });
          });
        };

        BaseSelection.prototype._detachCloseHandler = function (container) {
          $(document.body).off('mousedown.select2.' + container.id);
        };

        BaseSelection.prototype.position = function ($selection, $container) {
          var $selectionContainer = $container.find('.selection');
          $selectionContainer.append($selection);
        };

        BaseSelection.prototype.destroy = function () {
          this._detachCloseHandler(this.container);
        };

        BaseSelection.prototype.update = function (data) {
          throw new Error('The `update` method must be defined in child classes.');
        };

        return BaseSelection;
      });

      S2.define('select2/selection/single', [
        'jquery',
        './base',
        '../utils',
        '../keys'
      ], function ($, BaseSelection, Utils, KEYS) {
        function SingleSelection() {
          SingleSelection.__super__.constructor.apply(this, arguments);
        }

        Utils.Extend(SingleSelection, BaseSelection);

        SingleSelection.prototype.render = function () {
          var $selection = SingleSelection.__super__.render.call(this);

          $selection.addClass('select2-selection--single');

          $selection.html(
            '<span class="select2-selection__rendered"></span>' +
            '<span class="select2-selection__arrow" role="presentation">' +
            '<b role="presentation"></b>' +
            '</span>'
          );

          return $selection;
        };

        SingleSelection.prototype.bind = function (container, $container) {
          var self = this;

          SingleSelection.__super__.bind.apply(this, arguments);

          var id = container.id + '-container';

          this.$selection.find('.select2-selection__rendered').attr('id', id);
          this.$selection.attr('aria-labelledby', id);

          this.$selection.on('mousedown', function (evt) {
            // Only respond to left clicks
            if (evt.which !== 1) {
              return;
            }

            self.trigger('toggle', {
              originalEvent: evt
            });
          });

          this.$selection.on('focus', function (evt) {
            // User focuses on the container
          });

          this.$selection.on('blur', function (evt) {
            // User exits the container
          });

          container.on('focus', function (evt) {
            if (!container.isOpen()) {
              self.$selection.focus();
            }
          });

          container.on('selection:update', function (params) {
            self.update(params.data);
          });
        };

        SingleSelection.prototype.clear = function () {
          this.$selection.find('.select2-selection__rendered').empty();
        };

        SingleSelection.prototype.display = function (data, container) {
          var template = this.options.get('templateSelection');
          var escapeMarkup = this.options.get('escapeMarkup');

          return escapeMarkup(template(data, container));
        };

        SingleSelection.prototype.selectionContainer = function () {
          return $('<span></span>');
        };

        SingleSelection.prototype.update = function (data) {
          if (data.length === 0) {
            this.clear();
            return;
          }

          var selection = data[0];

          var $rendered = this.$selection.find('.select2-selection__rendered');
          var formatted = this.display(selection, $rendered);

          $rendered.empty().append(formatted);
          $rendered.prop('title', selection.title || selection.text);
        };

        return SingleSelection;
      });

      S2.define('select2/selection/multiple', [
        'jquery',
        './base',
        '../utils'
      ], function ($, BaseSelection, Utils) {
        function MultipleSelection($element, options) {
          MultipleSelection.__super__.constructor.apply(this, arguments);
        }

        Utils.Extend(MultipleSelection, BaseSelection);

        MultipleSelection.prototype.render = function () {
          var $selection = MultipleSelection.__super__.render.call(this);

          $selection.addClass('select2-selection--multiple');

          $selection.html(
            '<ul class="select2-selection__rendered"></ul>'
          );

          return $selection;
        };

        MultipleSelection.prototype.bind = function (container, $container) {
          var self = this;

          MultipleSelection.__super__.bind.apply(this, arguments);

          this.$selection.on('click', function (evt) {
            self.trigger('toggle', {
              originalEvent: evt
            });
          });

          this.$selection.on(
            'click',
            '.select2-selection__choice__remove',
            function (evt) {
              // Ignore the event if it is disabled
              if (self.options.get('disabled')) {
                return;
              }

              var $remove = $(this);
              var $selection = $remove.parent();

              var data = $selection.data('data');

              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            }
          );
        };

        MultipleSelection.prototype.clear = function () {
          this.$selection.find('.select2-selection__rendered').empty();
        };

        MultipleSelection.prototype.display = function (data, container) {
          var template = this.options.get('templateSelection');
          var escapeMarkup = this.options.get('escapeMarkup');

          return escapeMarkup(template(data, container));
        };

        MultipleSelection.prototype.selectionContainer = function () {
          var $container = $(
            '<li class="select2-selection__choice">' +
            '<span class="select2-selection__choice__remove" role="presentation">' +
            '&times;' +
            '</span>' +
            '</li>'
          );

          return $container;
        };

        MultipleSelection.prototype.update = function (data) {
          this.clear();

          if (data.length === 0) {
            return;
          }

          var $selections = [];

          for (var d = 0; d < data.length; d++) {
            var selection = data[d];

            var $selection = this.selectionContainer();
            var formatted = this.display(selection, $selection);

            $selection.append(formatted);
            $selection.prop('title', selection.title || selection.text);

            $selection.data('data', selection);

            $selections.push($selection);
          }

          var $rendered = this.$selection.find('.select2-selection__rendered');

          Utils.appendMany($rendered, $selections);
        };

        return MultipleSelection;
      });

      S2.define('select2/selection/placeholder', [
        '../utils'
      ], function (Utils) {
        function Placeholder(decorated, $element, options) {
          this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

          decorated.call(this, $element, options);
        }

        Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
          if (typeof placeholder === 'string') {
            placeholder = {
              id: '',
              text: placeholder
            };
          }

          return placeholder;
        };

        Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
          var $placeholder = this.selectionContainer();

          $placeholder.html(this.display(placeholder));
          $placeholder.addClass('select2-selection__placeholder')
            .removeClass('select2-selection__choice');

          return $placeholder;
        };

        Placeholder.prototype.update = function (decorated, data) {
          var singlePlaceholder = (
            data.length == 1 && data[0].id != this.placeholder.id
          );
          var multipleSelections = data.length > 1;

          if (multipleSelections || singlePlaceholder) {
            return decorated.call(this, data);
          }

          this.clear();

          var $placeholder = this.createPlaceholder(this.placeholder);

          this.$selection.find('.select2-selection__rendered').append($placeholder);
        };

        return Placeholder;
      });

      S2.define('select2/selection/allowClear', [
        'jquery',
        '../keys'
      ], function ($, KEYS) {
        function AllowClear() { }

        AllowClear.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          if (this.placeholder == null) {
            if (this.options.get('debug') && window.console && console.error) {
              console.error(
                'Select2: The `allowClear` option should be used in combination ' +
                'with the `placeholder` option.'
              );
            }
          }

          this.$selection.on('mousedown', '.select2-selection__clear',
            function (evt) {
              self._handleClear(evt);
            });

          container.on('keypress', function (evt) {
            self._handleKeyboardClear(evt, container);
          });
        };

        AllowClear.prototype._handleClear = function (_, evt) {
          // Ignore the event if it is disabled
          if (this.options.get('disabled')) {
            return;
          }

          var $clear = this.$selection.find('.select2-selection__clear');

          // Ignore the event if nothing has been selected
          if ($clear.length === 0) {
            return;
          }

          evt.stopPropagation();

          var data = $clear.data('data');

          for (var d = 0; d < data.length; d++) {
            var unselectData = {
              data: data[d]
            };

            // Trigger the `unselect` event, so people can prevent it from being
            // cleared.
            this.trigger('unselect', unselectData);

            // If the event was prevented, don't clear it out.
            if (unselectData.prevented) {
              return;
            }
          }

          this.$element.val(this.placeholder.id).trigger('change');

          this.trigger('toggle', {});
        };

        AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
          if (container.isOpen()) {
            return;
          }

          if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
            this._handleClear(evt);
          }
        };

        AllowClear.prototype.update = function (decorated, data) {
          decorated.call(this, data);

          if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
            data.length === 0) {
            return;
          }

          var $remove = $(
            '<span class="select2-selection__clear">' +
            '&times;' +
            '</span>'
          );
          $remove.data('data', data);

          this.$selection.find('.select2-selection__rendered').prepend($remove);
        };

        return AllowClear;
      });

      S2.define('select2/selection/search', [
        'jquery',
        '../utils',
        '../keys'
      ], function ($, Utils, KEYS) {
        function Search(decorated, $element, options) {
          decorated.call(this, $element, options);
        }

        Search.prototype.render = function (decorated) {
          var $search = $(
            '<li class="select2-search select2-search--inline">' +
            '<input class="select2-search__field" type="search" tabindex="-1"' +
            ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
            ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
            '</li>'
          );

          this.$searchContainer = $search;
          this.$search = $search.find('input');

          var $rendered = decorated.call(this);

          this._transferTabIndex();

          return $rendered;
        };

        Search.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          container.on('open', function () {
            self.$search.trigger('focus');
          });

          container.on('close', function () {
            self.$search.val('');
            self.$search.removeAttr('aria-activedescendant');
            self.$search.trigger('focus');
          });

          container.on('enable', function () {
            self.$search.prop('disabled', false);

            self._transferTabIndex();
          });

          container.on('disable', function () {
            self.$search.prop('disabled', true);
          });

          container.on('focus', function (evt) {
            self.$search.trigger('focus');
          });

          container.on('results:focus', function (params) {
            self.$search.attr('aria-activedescendant', params.id);
          });

          this.$selection.on('focusin', '.select2-search--inline', function (evt) {
            self.trigger('focus', evt);
          });

          this.$selection.on('focusout', '.select2-search--inline', function (evt) {
            self._handleBlur(evt);
          });

          this.$selection.on('keydown', '.select2-search--inline', function (evt) {
            evt.stopPropagation();

            self.trigger('keypress', evt);

            self._keyUpPrevented = evt.isDefaultPrevented();

            var key = evt.which;

            if (key === KEYS.BACKSPACE && self.$search.val() === '') {
              var $previousChoice = self.$searchContainer
                .prev('.select2-selection__choice');

              if ($previousChoice.length > 0) {
                var item = $previousChoice.data('data');

                self.searchRemoveChoice(item);

                evt.preventDefault();
              }
            }
          });

          // Try to detect the IE version should the `documentMode` property that
          // is stored on the document. This is only implemented in IE and is
          // slightly cleaner than doing a user agent check.
          // This property is not available in Edge, but Edge also doesn't have
          // this bug.
          var msie = document.documentMode;
          var disableInputEvents = msie && msie <= 11;

          // Workaround for browsers which do not support the `input` event
          // This will prevent double-triggering of events for browsers which support
          // both the `keyup` and `input` events.
          this.$selection.on(
            'input.searchcheck',
            '.select2-search--inline',
            function (evt) {
              // IE will trigger the `input` event when a placeholder is used on a
              // search box. To get around this issue, we are forced to ignore all
              // `input` events in IE and keep using `keyup`.
              if (disableInputEvents) {
                self.$selection.off('input.search input.searchcheck');
                return;
              }

              // Unbind the duplicated `keyup` event
              self.$selection.off('keyup.search');
            }
          );

          this.$selection.on(
            'keyup.search input.search',
            '.select2-search--inline',
            function (evt) {
              // IE will trigger the `input` event when a placeholder is used on a
              // search box. To get around this issue, we are forced to ignore all
              // `input` events in IE and keep using `keyup`.
              if (disableInputEvents && evt.type === 'input') {
                self.$selection.off('input.search input.searchcheck');
                return;
              }

              var key = evt.which;

              // We can freely ignore events from modifier keys
              if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                return;
              }

              // Tabbing will be handled during the `keydown` phase
              if (key == KEYS.TAB) {
                return;
              }

              self.handleSearch(evt);
            }
          );
        };

        /**
         * This method will transfer the tabindex attribute from the rendered
         * selection to the search box. This allows for the search box to be used as
         * the primary focus instead of the selection container.
         *
         * @private
         */
        Search.prototype._transferTabIndex = function (decorated) {
          this.$search.attr('tabindex', this.$selection.attr('tabindex'));
          this.$selection.attr('tabindex', '-1');
        };

        Search.prototype.createPlaceholder = function (decorated, placeholder) {
          this.$search.attr('placeholder', placeholder.text);
        };

        Search.prototype.update = function (decorated, data) {
          var searchHadFocus = this.$search[0] == document.activeElement;

          this.$search.attr('placeholder', '');

          decorated.call(this, data);

          this.$selection.find('.select2-selection__rendered')
            .append(this.$searchContainer);

          this.resizeSearch();
          if (searchHadFocus) {
            this.$search.focus();
          }
        };

        Search.prototype.handleSearch = function () {
          this.resizeSearch();

          if (!this._keyUpPrevented) {
            var input = this.$search.val();

            this.trigger('query', {
              term: input
            });
          }

          this._keyUpPrevented = false;
        };

        Search.prototype.searchRemoveChoice = function (decorated, item) {
          this.trigger('unselect', {
            data: item
          });

          this.$search.val(item.text);
          this.handleSearch();
        };

        Search.prototype.resizeSearch = function () {
          this.$search.css('width', '25px');

          var width = '';

          if (this.$search.attr('placeholder') !== '') {
            width = this.$selection.find('.select2-selection__rendered').innerWidth();
          } else {
            var minimumWidth = this.$search.val().length + 1;

            width = (minimumWidth * 0.75) + 'em';
          }

          this.$search.css('width', width);
        };

        return Search;
      });

      S2.define('select2/selection/eventRelay', [
        'jquery'
      ], function ($) {
        function EventRelay() { }

        EventRelay.prototype.bind = function (decorated, container, $container) {
          var self = this;
          var relayEvents = [
            'open', 'opening',
            'close', 'closing',
            'select', 'selecting',
            'unselect', 'unselecting'
          ];

          var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

          decorated.call(this, container, $container);

          container.on('*', function (name, params) {
            // Ignore events that should not be relayed
            if ($.inArray(name, relayEvents) === -1) {
              return;
            }

            // The parameters should always be an object
            params = params || {};

            // Generate the jQuery event for the Select2 event
            var evt = $.Event('select2:' + name, {
              params: params
            });

            self.$element.trigger(evt);

            // Only handle preventable events if it was one
            if ($.inArray(name, preventableEvents) === -1) {
              return;
            }

            params.prevented = evt.isDefaultPrevented();
          });
        };

        return EventRelay;
      });

      S2.define('select2/translation', [
        'jquery',
        'require'
      ], function ($, require) {
        function Translation(dict) {
          this.dict = dict || {};
        }

        Translation.prototype.all = function () {
          return this.dict;
        };

        Translation.prototype.get = function (key) {
          return this.dict[key];
        };

        Translation.prototype.extend = function (translation) {
          this.dict = $.extend({}, translation.all(), this.dict);
        };

        // Static functions

        Translation._cache = {};

        Translation.loadPath = function (path) {
          if (!(path in Translation._cache)) {
            var translations = require(path);

            Translation._cache[path] = translations;
          }

          return new Translation(Translation._cache[path]);
        };

        return Translation;
      });

      S2.define('select2/diacritics', [

      ], function () {
        var diacritics = {
          '\u24B6': 'A',
          '\uFF21': 'A',
          '\u00C0': 'A',
          '\u00C1': 'A',
          '\u00C2': 'A',
          '\u1EA6': 'A',
          '\u1EA4': 'A',
          '\u1EAA': 'A',
          '\u1EA8': 'A',
          '\u00C3': 'A',
          '\u0100': 'A',
          '\u0102': 'A',
          '\u1EB0': 'A',
          '\u1EAE': 'A',
          '\u1EB4': 'A',
          '\u1EB2': 'A',
          '\u0226': 'A',
          '\u01E0': 'A',
          '\u00C4': 'A',
          '\u01DE': 'A',
          '\u1EA2': 'A',
          '\u00C5': 'A',
          '\u01FA': 'A',
          '\u01CD': 'A',
          '\u0200': 'A',
          '\u0202': 'A',
          '\u1EA0': 'A',
          '\u1EAC': 'A',
          '\u1EB6': 'A',
          '\u1E00': 'A',
          '\u0104': 'A',
          '\u023A': 'A',
          '\u2C6F': 'A',
          '\uA732': 'AA',
          '\u00C6': 'AE',
          '\u01FC': 'AE',
          '\u01E2': 'AE',
          '\uA734': 'AO',
          '\uA736': 'AU',
          '\uA738': 'AV',
          '\uA73A': 'AV',
          '\uA73C': 'AY',
          '\u24B7': 'B',
          '\uFF22': 'B',
          '\u1E02': 'B',
          '\u1E04': 'B',
          '\u1E06': 'B',
          '\u0243': 'B',
          '\u0182': 'B',
          '\u0181': 'B',
          '\u24B8': 'C',
          '\uFF23': 'C',
          '\u0106': 'C',
          '\u0108': 'C',
          '\u010A': 'C',
          '\u010C': 'C',
          '\u00C7': 'C',
          '\u1E08': 'C',
          '\u0187': 'C',
          '\u023B': 'C',
          '\uA73E': 'C',
          '\u24B9': 'D',
          '\uFF24': 'D',
          '\u1E0A': 'D',
          '\u010E': 'D',
          '\u1E0C': 'D',
          '\u1E10': 'D',
          '\u1E12': 'D',
          '\u1E0E': 'D',
          '\u0110': 'D',
          '\u018B': 'D',
          '\u018A': 'D',
          '\u0189': 'D',
          '\uA779': 'D',
          '\u01F1': 'DZ',
          '\u01C4': 'DZ',
          '\u01F2': 'Dz',
          '\u01C5': 'Dz',
          '\u24BA': 'E',
          '\uFF25': 'E',
          '\u00C8': 'E',
          '\u00C9': 'E',
          '\u00CA': 'E',
          '\u1EC0': 'E',
          '\u1EBE': 'E',
          '\u1EC4': 'E',
          '\u1EC2': 'E',
          '\u1EBC': 'E',
          '\u0112': 'E',
          '\u1E14': 'E',
          '\u1E16': 'E',
          '\u0114': 'E',
          '\u0116': 'E',
          '\u00CB': 'E',
          '\u1EBA': 'E',
          '\u011A': 'E',
          '\u0204': 'E',
          '\u0206': 'E',
          '\u1EB8': 'E',
          '\u1EC6': 'E',
          '\u0228': 'E',
          '\u1E1C': 'E',
          '\u0118': 'E',
          '\u1E18': 'E',
          '\u1E1A': 'E',
          '\u0190': 'E',
          '\u018E': 'E',
          '\u24BB': 'F',
          '\uFF26': 'F',
          '\u1E1E': 'F',
          '\u0191': 'F',
          '\uA77B': 'F',
          '\u24BC': 'G',
          '\uFF27': 'G',
          '\u01F4': 'G',
          '\u011C': 'G',
          '\u1E20': 'G',
          '\u011E': 'G',
          '\u0120': 'G',
          '\u01E6': 'G',
          '\u0122': 'G',
          '\u01E4': 'G',
          '\u0193': 'G',
          '\uA7A0': 'G',
          '\uA77D': 'G',
          '\uA77E': 'G',
          '\u24BD': 'H',
          '\uFF28': 'H',
          '\u0124': 'H',
          '\u1E22': 'H',
          '\u1E26': 'H',
          '\u021E': 'H',
          '\u1E24': 'H',
          '\u1E28': 'H',
          '\u1E2A': 'H',
          '\u0126': 'H',
          '\u2C67': 'H',
          '\u2C75': 'H',
          '\uA78D': 'H',
          '\u24BE': 'I',
          '\uFF29': 'I',
          '\u00CC': 'I',
          '\u00CD': 'I',
          '\u00CE': 'I',
          '\u0128': 'I',
          '\u012A': 'I',
          '\u012C': 'I',
          '\u0130': 'I',
          '\u00CF': 'I',
          '\u1E2E': 'I',
          '\u1EC8': 'I',
          '\u01CF': 'I',
          '\u0208': 'I',
          '\u020A': 'I',
          '\u1ECA': 'I',
          '\u012E': 'I',
          '\u1E2C': 'I',
          '\u0197': 'I',
          '\u24BF': 'J',
          '\uFF2A': 'J',
          '\u0134': 'J',
          '\u0248': 'J',
          '\u24C0': 'K',
          '\uFF2B': 'K',
          '\u1E30': 'K',
          '\u01E8': 'K',
          '\u1E32': 'K',
          '\u0136': 'K',
          '\u1E34': 'K',
          '\u0198': 'K',
          '\u2C69': 'K',
          '\uA740': 'K',
          '\uA742': 'K',
          '\uA744': 'K',
          '\uA7A2': 'K',
          '\u24C1': 'L',
          '\uFF2C': 'L',
          '\u013F': 'L',
          '\u0139': 'L',
          '\u013D': 'L',
          '\u1E36': 'L',
          '\u1E38': 'L',
          '\u013B': 'L',
          '\u1E3C': 'L',
          '\u1E3A': 'L',
          '\u0141': 'L',
          '\u023D': 'L',
          '\u2C62': 'L',
          '\u2C60': 'L',
          '\uA748': 'L',
          '\uA746': 'L',
          '\uA780': 'L',
          '\u01C7': 'LJ',
          '\u01C8': 'Lj',
          '\u24C2': 'M',
          '\uFF2D': 'M',
          '\u1E3E': 'M',
          '\u1E40': 'M',
          '\u1E42': 'M',
          '\u2C6E': 'M',
          '\u019C': 'M',
          '\u24C3': 'N',
          '\uFF2E': 'N',
          '\u01F8': 'N',
          '\u0143': 'N',
          '\u00D1': 'N',
          '\u1E44': 'N',
          '\u0147': 'N',
          '\u1E46': 'N',
          '\u0145': 'N',
          '\u1E4A': 'N',
          '\u1E48': 'N',
          '\u0220': 'N',
          '\u019D': 'N',
          '\uA790': 'N',
          '\uA7A4': 'N',
          '\u01CA': 'NJ',
          '\u01CB': 'Nj',
          '\u24C4': 'O',
          '\uFF2F': 'O',
          '\u00D2': 'O',
          '\u00D3': 'O',
          '\u00D4': 'O',
          '\u1ED2': 'O',
          '\u1ED0': 'O',
          '\u1ED6': 'O',
          '\u1ED4': 'O',
          '\u00D5': 'O',
          '\u1E4C': 'O',
          '\u022C': 'O',
          '\u1E4E': 'O',
          '\u014C': 'O',
          '\u1E50': 'O',
          '\u1E52': 'O',
          '\u014E': 'O',
          '\u022E': 'O',
          '\u0230': 'O',
          '\u00D6': 'O',
          '\u022A': 'O',
          '\u1ECE': 'O',
          '\u0150': 'O',
          '\u01D1': 'O',
          '\u020C': 'O',
          '\u020E': 'O',
          '\u01A0': 'O',
          '\u1EDC': 'O',
          '\u1EDA': 'O',
          '\u1EE0': 'O',
          '\u1EDE': 'O',
          '\u1EE2': 'O',
          '\u1ECC': 'O',
          '\u1ED8': 'O',
          '\u01EA': 'O',
          '\u01EC': 'O',
          '\u00D8': 'O',
          '\u01FE': 'O',
          '\u0186': 'O',
          '\u019F': 'O',
          '\uA74A': 'O',
          '\uA74C': 'O',
          '\u01A2': 'OI',
          '\uA74E': 'OO',
          '\u0222': 'OU',
          '\u24C5': 'P',
          '\uFF30': 'P',
          '\u1E54': 'P',
          '\u1E56': 'P',
          '\u01A4': 'P',
          '\u2C63': 'P',
          '\uA750': 'P',
          '\uA752': 'P',
          '\uA754': 'P',
          '\u24C6': 'Q',
          '\uFF31': 'Q',
          '\uA756': 'Q',
          '\uA758': 'Q',
          '\u024A': 'Q',
          '\u24C7': 'R',
          '\uFF32': 'R',
          '\u0154': 'R',
          '\u1E58': 'R',
          '\u0158': 'R',
          '\u0210': 'R',
          '\u0212': 'R',
          '\u1E5A': 'R',
          '\u1E5C': 'R',
          '\u0156': 'R',
          '\u1E5E': 'R',
          '\u024C': 'R',
          '\u2C64': 'R',
          '\uA75A': 'R',
          '\uA7A6': 'R',
          '\uA782': 'R',
          '\u24C8': 'S',
          '\uFF33': 'S',
          '\u1E9E': 'S',
          '\u015A': 'S',
          '\u1E64': 'S',
          '\u015C': 'S',
          '\u1E60': 'S',
          '\u0160': 'S',
          '\u1E66': 'S',
          '\u1E62': 'S',
          '\u1E68': 'S',
          '\u0218': 'S',
          '\u015E': 'S',
          '\u2C7E': 'S',
          '\uA7A8': 'S',
          '\uA784': 'S',
          '\u24C9': 'T',
          '\uFF34': 'T',
          '\u1E6A': 'T',
          '\u0164': 'T',
          '\u1E6C': 'T',
          '\u021A': 'T',
          '\u0162': 'T',
          '\u1E70': 'T',
          '\u1E6E': 'T',
          '\u0166': 'T',
          '\u01AC': 'T',
          '\u01AE': 'T',
          '\u023E': 'T',
          '\uA786': 'T',
          '\uA728': 'TZ',
          '\u24CA': 'U',
          '\uFF35': 'U',
          '\u00D9': 'U',
          '\u00DA': 'U',
          '\u00DB': 'U',
          '\u0168': 'U',
          '\u1E78': 'U',
          '\u016A': 'U',
          '\u1E7A': 'U',
          '\u016C': 'U',
          '\u00DC': 'U',
          '\u01DB': 'U',
          '\u01D7': 'U',
          '\u01D5': 'U',
          '\u01D9': 'U',
          '\u1EE6': 'U',
          '\u016E': 'U',
          '\u0170': 'U',
          '\u01D3': 'U',
          '\u0214': 'U',
          '\u0216': 'U',
          '\u01AF': 'U',
          '\u1EEA': 'U',
          '\u1EE8': 'U',
          '\u1EEE': 'U',
          '\u1EEC': 'U',
          '\u1EF0': 'U',
          '\u1EE4': 'U',
          '\u1E72': 'U',
          '\u0172': 'U',
          '\u1E76': 'U',
          '\u1E74': 'U',
          '\u0244': 'U',
          '\u24CB': 'V',
          '\uFF36': 'V',
          '\u1E7C': 'V',
          '\u1E7E': 'V',
          '\u01B2': 'V',
          '\uA75E': 'V',
          '\u0245': 'V',
          '\uA760': 'VY',
          '\u24CC': 'W',
          '\uFF37': 'W',
          '\u1E80': 'W',
          '\u1E82': 'W',
          '\u0174': 'W',
          '\u1E86': 'W',
          '\u1E84': 'W',
          '\u1E88': 'W',
          '\u2C72': 'W',
          '\u24CD': 'X',
          '\uFF38': 'X',
          '\u1E8A': 'X',
          '\u1E8C': 'X',
          '\u24CE': 'Y',
          '\uFF39': 'Y',
          '\u1EF2': 'Y',
          '\u00DD': 'Y',
          '\u0176': 'Y',
          '\u1EF8': 'Y',
          '\u0232': 'Y',
          '\u1E8E': 'Y',
          '\u0178': 'Y',
          '\u1EF6': 'Y',
          '\u1EF4': 'Y',
          '\u01B3': 'Y',
          '\u024E': 'Y',
          '\u1EFE': 'Y',
          '\u24CF': 'Z',
          '\uFF3A': 'Z',
          '\u0179': 'Z',
          '\u1E90': 'Z',
          '\u017B': 'Z',
          '\u017D': 'Z',
          '\u1E92': 'Z',
          '\u1E94': 'Z',
          '\u01B5': 'Z',
          '\u0224': 'Z',
          '\u2C7F': 'Z',
          '\u2C6B': 'Z',
          '\uA762': 'Z',
          '\u24D0': 'a',
          '\uFF41': 'a',
          '\u1E9A': 'a',
          '\u00E0': 'a',
          '\u00E1': 'a',
          '\u00E2': 'a',
          '\u1EA7': 'a',
          '\u1EA5': 'a',
          '\u1EAB': 'a',
          '\u1EA9': 'a',
          '\u00E3': 'a',
          '\u0101': 'a',
          '\u0103': 'a',
          '\u1EB1': 'a',
          '\u1EAF': 'a',
          '\u1EB5': 'a',
          '\u1EB3': 'a',
          '\u0227': 'a',
          '\u01E1': 'a',
          '\u00E4': 'a',
          '\u01DF': 'a',
          '\u1EA3': 'a',
          '\u00E5': 'a',
          '\u01FB': 'a',
          '\u01CE': 'a',
          '\u0201': 'a',
          '\u0203': 'a',
          '\u1EA1': 'a',
          '\u1EAD': 'a',
          '\u1EB7': 'a',
          '\u1E01': 'a',
          '\u0105': 'a',
          '\u2C65': 'a',
          '\u0250': 'a',
          '\uA733': 'aa',
          '\u00E6': 'ae',
          '\u01FD': 'ae',
          '\u01E3': 'ae',
          '\uA735': 'ao',
          '\uA737': 'au',
          '\uA739': 'av',
          '\uA73B': 'av',
          '\uA73D': 'ay',
          '\u24D1': 'b',
          '\uFF42': 'b',
          '\u1E03': 'b',
          '\u1E05': 'b',
          '\u1E07': 'b',
          '\u0180': 'b',
          '\u0183': 'b',
          '\u0253': 'b',
          '\u24D2': 'c',
          '\uFF43': 'c',
          '\u0107': 'c',
          '\u0109': 'c',
          '\u010B': 'c',
          '\u010D': 'c',
          '\u00E7': 'c',
          '\u1E09': 'c',
          '\u0188': 'c',
          '\u023C': 'c',
          '\uA73F': 'c',
          '\u2184': 'c',
          '\u24D3': 'd',
          '\uFF44': 'd',
          '\u1E0B': 'd',
          '\u010F': 'd',
          '\u1E0D': 'd',
          '\u1E11': 'd',
          '\u1E13': 'd',
          '\u1E0F': 'd',
          '\u0111': 'd',
          '\u018C': 'd',
          '\u0256': 'd',
          '\u0257': 'd',
          '\uA77A': 'd',
          '\u01F3': 'dz',
          '\u01C6': 'dz',
          '\u24D4': 'e',
          '\uFF45': 'e',
          '\u00E8': 'e',
          '\u00E9': 'e',
          '\u00EA': 'e',
          '\u1EC1': 'e',
          '\u1EBF': 'e',
          '\u1EC5': 'e',
          '\u1EC3': 'e',
          '\u1EBD': 'e',
          '\u0113': 'e',
          '\u1E15': 'e',
          '\u1E17': 'e',
          '\u0115': 'e',
          '\u0117': 'e',
          '\u00EB': 'e',
          '\u1EBB': 'e',
          '\u011B': 'e',
          '\u0205': 'e',
          '\u0207': 'e',
          '\u1EB9': 'e',
          '\u1EC7': 'e',
          '\u0229': 'e',
          '\u1E1D': 'e',
          '\u0119': 'e',
          '\u1E19': 'e',
          '\u1E1B': 'e',
          '\u0247': 'e',
          '\u025B': 'e',
          '\u01DD': 'e',
          '\u24D5': 'f',
          '\uFF46': 'f',
          '\u1E1F': 'f',
          '\u0192': 'f',
          '\uA77C': 'f',
          '\u24D6': 'g',
          '\uFF47': 'g',
          '\u01F5': 'g',
          '\u011D': 'g',
          '\u1E21': 'g',
          '\u011F': 'g',
          '\u0121': 'g',
          '\u01E7': 'g',
          '\u0123': 'g',
          '\u01E5': 'g',
          '\u0260': 'g',
          '\uA7A1': 'g',
          '\u1D79': 'g',
          '\uA77F': 'g',
          '\u24D7': 'h',
          '\uFF48': 'h',
          '\u0125': 'h',
          '\u1E23': 'h',
          '\u1E27': 'h',
          '\u021F': 'h',
          '\u1E25': 'h',
          '\u1E29': 'h',
          '\u1E2B': 'h',
          '\u1E96': 'h',
          '\u0127': 'h',
          '\u2C68': 'h',
          '\u2C76': 'h',
          '\u0265': 'h',
          '\u0195': 'hv',
          '\u24D8': 'i',
          '\uFF49': 'i',
          '\u00EC': 'i',
          '\u00ED': 'i',
          '\u00EE': 'i',
          '\u0129': 'i',
          '\u012B': 'i',
          '\u012D': 'i',
          '\u00EF': 'i',
          '\u1E2F': 'i',
          '\u1EC9': 'i',
          '\u01D0': 'i',
          '\u0209': 'i',
          '\u020B': 'i',
          '\u1ECB': 'i',
          '\u012F': 'i',
          '\u1E2D': 'i',
          '\u0268': 'i',
          '\u0131': 'i',
          '\u24D9': 'j',
          '\uFF4A': 'j',
          '\u0135': 'j',
          '\u01F0': 'j',
          '\u0249': 'j',
          '\u24DA': 'k',
          '\uFF4B': 'k',
          '\u1E31': 'k',
          '\u01E9': 'k',
          '\u1E33': 'k',
          '\u0137': 'k',
          '\u1E35': 'k',
          '\u0199': 'k',
          '\u2C6A': 'k',
          '\uA741': 'k',
          '\uA743': 'k',
          '\uA745': 'k',
          '\uA7A3': 'k',
          '\u24DB': 'l',
          '\uFF4C': 'l',
          '\u0140': 'l',
          '\u013A': 'l',
          '\u013E': 'l',
          '\u1E37': 'l',
          '\u1E39': 'l',
          '\u013C': 'l',
          '\u1E3D': 'l',
          '\u1E3B': 'l',
          '\u017F': 'l',
          '\u0142': 'l',
          '\u019A': 'l',
          '\u026B': 'l',
          '\u2C61': 'l',
          '\uA749': 'l',
          '\uA781': 'l',
          '\uA747': 'l',
          '\u01C9': 'lj',
          '\u24DC': 'm',
          '\uFF4D': 'm',
          '\u1E3F': 'm',
          '\u1E41': 'm',
          '\u1E43': 'm',
          '\u0271': 'm',
          '\u026F': 'm',
          '\u24DD': 'n',
          '\uFF4E': 'n',
          '\u01F9': 'n',
          '\u0144': 'n',
          '\u00F1': 'n',
          '\u1E45': 'n',
          '\u0148': 'n',
          '\u1E47': 'n',
          '\u0146': 'n',
          '\u1E4B': 'n',
          '\u1E49': 'n',
          '\u019E': 'n',
          '\u0272': 'n',
          '\u0149': 'n',
          '\uA791': 'n',
          '\uA7A5': 'n',
          '\u01CC': 'nj',
          '\u24DE': 'o',
          '\uFF4F': 'o',
          '\u00F2': 'o',
          '\u00F3': 'o',
          '\u00F4': 'o',
          '\u1ED3': 'o',
          '\u1ED1': 'o',
          '\u1ED7': 'o',
          '\u1ED5': 'o',
          '\u00F5': 'o',
          '\u1E4D': 'o',
          '\u022D': 'o',
          '\u1E4F': 'o',
          '\u014D': 'o',
          '\u1E51': 'o',
          '\u1E53': 'o',
          '\u014F': 'o',
          '\u022F': 'o',
          '\u0231': 'o',
          '\u00F6': 'o',
          '\u022B': 'o',
          '\u1ECF': 'o',
          '\u0151': 'o',
          '\u01D2': 'o',
          '\u020D': 'o',
          '\u020F': 'o',
          '\u01A1': 'o',
          '\u1EDD': 'o',
          '\u1EDB': 'o',
          '\u1EE1': 'o',
          '\u1EDF': 'o',
          '\u1EE3': 'o',
          '\u1ECD': 'o',
          '\u1ED9': 'o',
          '\u01EB': 'o',
          '\u01ED': 'o',
          '\u00F8': 'o',
          '\u01FF': 'o',
          '\u0254': 'o',
          '\uA74B': 'o',
          '\uA74D': 'o',
          '\u0275': 'o',
          '\u01A3': 'oi',
          '\u0223': 'ou',
          '\uA74F': 'oo',
          '\u24DF': 'p',
          '\uFF50': 'p',
          '\u1E55': 'p',
          '\u1E57': 'p',
          '\u01A5': 'p',
          '\u1D7D': 'p',
          '\uA751': 'p',
          '\uA753': 'p',
          '\uA755': 'p',
          '\u24E0': 'q',
          '\uFF51': 'q',
          '\u024B': 'q',
          '\uA757': 'q',
          '\uA759': 'q',
          '\u24E1': 'r',
          '\uFF52': 'r',
          '\u0155': 'r',
          '\u1E59': 'r',
          '\u0159': 'r',
          '\u0211': 'r',
          '\u0213': 'r',
          '\u1E5B': 'r',
          '\u1E5D': 'r',
          '\u0157': 'r',
          '\u1E5F': 'r',
          '\u024D': 'r',
          '\u027D': 'r',
          '\uA75B': 'r',
          '\uA7A7': 'r',
          '\uA783': 'r',
          '\u24E2': 's',
          '\uFF53': 's',
          '\u00DF': 's',
          '\u015B': 's',
          '\u1E65': 's',
          '\u015D': 's',
          '\u1E61': 's',
          '\u0161': 's',
          '\u1E67': 's',
          '\u1E63': 's',
          '\u1E69': 's',
          '\u0219': 's',
          '\u015F': 's',
          '\u023F': 's',
          '\uA7A9': 's',
          '\uA785': 's',
          '\u1E9B': 's',
          '\u24E3': 't',
          '\uFF54': 't',
          '\u1E6B': 't',
          '\u1E97': 't',
          '\u0165': 't',
          '\u1E6D': 't',
          '\u021B': 't',
          '\u0163': 't',
          '\u1E71': 't',
          '\u1E6F': 't',
          '\u0167': 't',
          '\u01AD': 't',
          '\u0288': 't',
          '\u2C66': 't',
          '\uA787': 't',
          '\uA729': 'tz',
          '\u24E4': 'u',
          '\uFF55': 'u',
          '\u00F9': 'u',
          '\u00FA': 'u',
          '\u00FB': 'u',
          '\u0169': 'u',
          '\u1E79': 'u',
          '\u016B': 'u',
          '\u1E7B': 'u',
          '\u016D': 'u',
          '\u00FC': 'u',
          '\u01DC': 'u',
          '\u01D8': 'u',
          '\u01D6': 'u',
          '\u01DA': 'u',
          '\u1EE7': 'u',
          '\u016F': 'u',
          '\u0171': 'u',
          '\u01D4': 'u',
          '\u0215': 'u',
          '\u0217': 'u',
          '\u01B0': 'u',
          '\u1EEB': 'u',
          '\u1EE9': 'u',
          '\u1EEF': 'u',
          '\u1EED': 'u',
          '\u1EF1': 'u',
          '\u1EE5': 'u',
          '\u1E73': 'u',
          '\u0173': 'u',
          '\u1E77': 'u',
          '\u1E75': 'u',
          '\u0289': 'u',
          '\u24E5': 'v',
          '\uFF56': 'v',
          '\u1E7D': 'v',
          '\u1E7F': 'v',
          '\u028B': 'v',
          '\uA75F': 'v',
          '\u028C': 'v',
          '\uA761': 'vy',
          '\u24E6': 'w',
          '\uFF57': 'w',
          '\u1E81': 'w',
          '\u1E83': 'w',
          '\u0175': 'w',
          '\u1E87': 'w',
          '\u1E85': 'w',
          '\u1E98': 'w',
          '\u1E89': 'w',
          '\u2C73': 'w',
          '\u24E7': 'x',
          '\uFF58': 'x',
          '\u1E8B': 'x',
          '\u1E8D': 'x',
          '\u24E8': 'y',
          '\uFF59': 'y',
          '\u1EF3': 'y',
          '\u00FD': 'y',
          '\u0177': 'y',
          '\u1EF9': 'y',
          '\u0233': 'y',
          '\u1E8F': 'y',
          '\u00FF': 'y',
          '\u1EF7': 'y',
          '\u1E99': 'y',
          '\u1EF5': 'y',
          '\u01B4': 'y',
          '\u024F': 'y',
          '\u1EFF': 'y',
          '\u24E9': 'z',
          '\uFF5A': 'z',
          '\u017A': 'z',
          '\u1E91': 'z',
          '\u017C': 'z',
          '\u017E': 'z',
          '\u1E93': 'z',
          '\u1E95': 'z',
          '\u01B6': 'z',
          '\u0225': 'z',
          '\u0240': 'z',
          '\u2C6C': 'z',
          '\uA763': 'z',
          '\u0386': '\u0391',
          '\u0388': '\u0395',
          '\u0389': '\u0397',
          '\u038A': '\u0399',
          '\u03AA': '\u0399',
          '\u038C': '\u039F',
          '\u038E': '\u03A5',
          '\u03AB': '\u03A5',
          '\u038F': '\u03A9',
          '\u03AC': '\u03B1',
          '\u03AD': '\u03B5',
          '\u03AE': '\u03B7',
          '\u03AF': '\u03B9',
          '\u03CA': '\u03B9',
          '\u0390': '\u03B9',
          '\u03CC': '\u03BF',
          '\u03CD': '\u03C5',
          '\u03CB': '\u03C5',
          '\u03B0': '\u03C5',
          '\u03C9': '\u03C9',
          '\u03C2': '\u03C3'
        };

        return diacritics;
      });

      S2.define('select2/data/base', [
        '../utils'
      ], function (Utils) {
        function BaseAdapter($element, options) {
          BaseAdapter.__super__.constructor.call(this);
        }

        Utils.Extend(BaseAdapter, Utils.Observable);

        BaseAdapter.prototype.current = function (callback) {
          throw new Error('The `current` method must be defined in child classes.');
        };

        BaseAdapter.prototype.query = function (params, callback) {
          throw new Error('The `query` method must be defined in child classes.');
        };

        BaseAdapter.prototype.bind = function (container, $container) {
          // Can be implemented in subclasses
        };

        BaseAdapter.prototype.destroy = function () {
          // Can be implemented in subclasses
        };

        BaseAdapter.prototype.generateResultId = function (container, data) {
          var id = container.id + '-result-';

          id += Utils.generateChars(4);

          if (data.id != null) {
            id += '-' + data.id.toString();
          } else {
            id += '-' + Utils.generateChars(4);
          }
          return id;
        };

        return BaseAdapter;
      });

      S2.define('select2/data/select', [
        './base',
        '../utils',
        'jquery'
      ], function (BaseAdapter, Utils, $) {
        function SelectAdapter($element, options) {
          this.$element = $element;
          this.options = options;

          SelectAdapter.__super__.constructor.call(this);
        }

        Utils.Extend(SelectAdapter, BaseAdapter);

        SelectAdapter.prototype.current = function (callback) {
          var data = [];
          var self = this;

          this.$element.find(':selected').each(function () {
            var $option = $(this);

            var option = self.item($option);

            data.push(option);
          });

          callback(data);
        };

        SelectAdapter.prototype.select = function (data) {
          var self = this;

          data.selected = true;

          // If data.element is a DOM node, use it instead
          if ($(data.element).is('option')) {
            data.element.selected = true;

            this.$element.trigger('change');

            return;
          }

          if (this.$element.prop('multiple')) {
            this.current(function (currentData) {
              var val = [];

              data = [data];
              data.push.apply(data, currentData);

              for (var d = 0; d < data.length; d++) {
                var id = data[d].id;

                if ($.inArray(id, val) === -1) {
                  val.push(id);
                }
              }

              self.$element.val(val);
              self.$element.trigger('change');
            });
          } else {
            var val = data.id;

            this.$element.val(val);
            this.$element.trigger('change');
          }
        };

        SelectAdapter.prototype.unselect = function (data) {
          var self = this;

          if (!this.$element.prop('multiple')) {
            return;
          }

          data.selected = false;

          if ($(data.element).is('option')) {
            data.element.selected = false;

            this.$element.trigger('change');

            return;
          }

          this.current(function (currentData) {
            var val = [];

            for (var d = 0; d < currentData.length; d++) {
              var id = currentData[d].id;

              if (id !== data.id && $.inArray(id, val) === -1) {
                val.push(id);
              }
            }

            self.$element.val(val);

            self.$element.trigger('change');
          });
        };

        SelectAdapter.prototype.bind = function (container, $container) {
          var self = this;

          this.container = container;

          container.on('select', function (params) {
            self.select(params.data);
          });

          container.on('unselect', function (params) {
            self.unselect(params.data);
          });
        };

        SelectAdapter.prototype.destroy = function () {
          // Remove anything added to child elements
          this.$element.find('*').each(function () {
            // Remove any custom data set by Select2
            $.removeData(this, 'data');
          });
        };

        SelectAdapter.prototype.query = function (params, callback) {
          var data = [];
          var self = this;

          var $options = this.$element.children();

          $options.each(function () {
            var $option = $(this);

            if (!$option.is('option') && !$option.is('optgroup')) {
              return;
            }

            var option = self.item($option);

            var matches = self.matches(params, option);

            if (matches !== null) {
              data.push(matches);
            }
          });

          callback({
            results: data
          });
        };

        SelectAdapter.prototype.addOptions = function ($options) {
          Utils.appendMany(this.$element, $options);
        };

        SelectAdapter.prototype.option = function (data) {
          var option;

          if (data.children) {
            option = document.createElement('optgroup');
            option.label = data.text;
          } else {
            option = document.createElement('option');

            if (option.textContent !== undefined) {
              option.textContent = data.text;
            } else {
              option.innerText = data.text;
            }
          }

          if (data.id) {
            option.value = data.id;
          }

          if (data.disabled) {
            option.disabled = true;
          }

          if (data.selected) {
            option.selected = true;
          }

          if (data.title) {
            option.title = data.title;
          }

          var $option = $(option);

          var normalizedData = this._normalizeItem(data);
          normalizedData.element = option;

          // Override the option's data with the combined data
          $.data(option, 'data', normalizedData);

          return $option;
        };

        SelectAdapter.prototype.item = function ($option) {
          var data = {};

          data = $.data($option[0], 'data');

          if (data != null) {
            return data;
          }

          if ($option.is('option')) {
            data = {
              id: $option.val(),
              text: $option.text(),
              disabled: $option.prop('disabled'),
              selected: $option.prop('selected'),
              title: $option.prop('title')
            };
          } else if ($option.is('optgroup')) {
            data = {
              text: $option.prop('label'),
              children: [],
              title: $option.prop('title')
            };

            var $children = $option.children('option');
            var children = [];

            for (var c = 0; c < $children.length; c++) {
              var $child = $($children[c]);

              var child = this.item($child);

              children.push(child);
            }

            data.children = children;
          }

          data = this._normalizeItem(data);
          data.element = $option[0];

          $.data($option[0], 'data', data);

          return data;
        };

        SelectAdapter.prototype._normalizeItem = function (item) {
          if (!$.isPlainObject(item)) {
            item = {
              id: item,
              text: item
            };
          }

          item = $.extend({}, {
            text: ''
          }, item);

          var defaults = {
            selected: false,
            disabled: false
          };

          if (item.id != null) {
            item.id = item.id.toString();
          }

          if (item.text != null) {
            item.text = item.text.toString();
          }

          if (item._resultId == null && item.id && this.container != null) {
            item._resultId = this.generateResultId(this.container, item);
          }

          return $.extend({}, defaults, item);
        };

        SelectAdapter.prototype.matches = function (params, data) {
          var matcher = this.options.get('matcher');

          return matcher(params, data);
        };

        return SelectAdapter;
      });

      S2.define('select2/data/array', [
        './select',
        '../utils',
        'jquery'
      ], function (SelectAdapter, Utils, $) {
        function ArrayAdapter($element, options) {
          var data = options.get('data') || [];

          ArrayAdapter.__super__.constructor.call(this, $element, options);

          this.addOptions(this.convertToOptions(data));
        }

        Utils.Extend(ArrayAdapter, SelectAdapter);

        ArrayAdapter.prototype.select = function (data) {
          var $option = this.$element.find('option').filter(function (i, elm) {
            return elm.value == data.id.toString();
          });

          if ($option.length === 0) {
            $option = this.option(data);

            this.addOptions($option);
          }

          ArrayAdapter.__super__.select.call(this, data);
        };

        ArrayAdapter.prototype.convertToOptions = function (data) {
          var self = this;

          var $existing = this.$element.find('option');
          var existingIds = $existing.map(function () {
            return self.item($(this)).id;
          }).get();

          var $options = [];

          // Filter out all items except for the one passed in the argument
          function onlyItem(item) {
            return function () {
              return $(this).val() == item.id;
            };
          }

          for (var d = 0; d < data.length; d++) {
            var item = this._normalizeItem(data[d]);

            // Skip items which were pre-loaded, only merge the data
            if ($.inArray(item.id, existingIds) >= 0) {
              var $existingOption = $existing.filter(onlyItem(item));

              var existingData = this.item($existingOption);
              var newData = $.extend(true, {}, item, existingData);

              var $newOption = this.option(newData);

              $existingOption.replaceWith($newOption);

              continue;
            }

            var $option = this.option(item);

            if (item.children) {
              var $children = this.convertToOptions(item.children);

              Utils.appendMany($option, $children);
            }

            $options.push($option);
          }

          return $options;
        };

        return ArrayAdapter;
      });

      S2.define('select2/data/ajax', [
        './array',
        '../utils',
        'jquery'
      ], function (ArrayAdapter, Utils, $) {
        function AjaxAdapter($element, options) {
          this.ajaxOptions = this._applyDefaults(options.get('ajax'));

          if (this.ajaxOptions.processResults != null) {
            this.processResults = this.ajaxOptions.processResults;
          }

          AjaxAdapter.__super__.constructor.call(this, $element, options);
        }

        Utils.Extend(AjaxAdapter, ArrayAdapter);

        AjaxAdapter.prototype._applyDefaults = function (options) {
          var defaults = {
            data: function (params) {
              return $.extend({}, params, {
                q: params.term
              });
            },
            transport: function (params, success, failure) {
              var $request = $.ajax(params);

              $request.then(success);
              $request.fail(failure);

              return $request;
            }
          };

          return $.extend({}, defaults, options, true);
        };

        AjaxAdapter.prototype.processResults = function (results) {
          return results;
        };

        AjaxAdapter.prototype.query = function (params, callback) {
          var matches = [];
          var self = this;

          if (this._request != null) {
            // JSONP requests cannot always be aborted
            if ($.isFunction(this._request.abort)) {
              this._request.abort();
            }

            this._request = null;
          }

          var options = $.extend({
            type: 'GET'
          }, this.ajaxOptions);

          if (typeof options.url === 'function') {
            options.url = options.url.call(this.$element, params);
          }

          if (typeof options.data === 'function') {
            options.data = options.data.call(this.$element, params);
          }

          function request() {
            var $request = options.transport(options, function (data) {
              var results = self.processResults(data, params);

              if (self.options.get('debug') && window.console && console.error) {
                // Check to make sure that the response included a `results` key.
                if (!results || !results.results || !$.isArray(results.results)) {
                  console.error(
                    'Select2: The AJAX results did not return an array in the ' +
                    '`results` key of the response.'
                  );
                }
              }

              callback(results);
            }, function () {
              // Attempt to detect if a request was aborted
              // Only works if the transport exposes a status property
              if ($request.status && $request.status === '0') {
                return;
              }

              self.trigger('results:message', {
                message: 'errorLoading'
              });
            });

            self._request = $request;
          }

          if (this.ajaxOptions.delay && params.term != null) {
            if (this._queryTimeout) {
              window.clearTimeout(this._queryTimeout);
            }

            this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
          } else {
            request();
          }
        };

        return AjaxAdapter;
      });

      S2.define('select2/data/tags', [
        'jquery'
      ], function ($) {
        function Tags(decorated, $element, options) {
          var tags = options.get('tags');

          var createTag = options.get('createTag');

          if (createTag !== undefined) {
            this.createTag = createTag;
          }

          var insertTag = options.get('insertTag');

          if (insertTag !== undefined) {
            this.insertTag = insertTag;
          }

          decorated.call(this, $element, options);

          if ($.isArray(tags)) {
            for (var t = 0; t < tags.length; t++) {
              var tag = tags[t];
              var item = this._normalizeItem(tag);

              var $option = this.option(item);

              this.$element.append($option);
            }
          }
        }

        Tags.prototype.query = function (decorated, params, callback) {
          var self = this;

          this._removeOldTags();

          if (params.term == null || params.page != null) {
            decorated.call(this, params, callback);
            return;
          }

          function wrapper(obj, child) {
            var data = obj.results;

            for (var i = 0; i < data.length; i++) {
              var option = data[i];

              var checkChildren = (
                option.children != null &&
                !wrapper({
                  results: option.children
                }, true)
              );

              var checkText = option.text === params.term;

              if (checkText || checkChildren) {
                if (child) {
                  return false;
                }

                obj.data = data;
                callback(obj);

                return;
              }
            }

            if (child) {
              return true;
            }

            var tag = self.createTag(params);

            if (tag != null) {
              var $option = self.option(tag);
              $option.attr('data-select2-tag', true);

              self.addOptions([$option]);

              self.insertTag(data, tag);
            }

            obj.results = data;

            callback(obj);
          }

          decorated.call(this, params, wrapper);
        };

        Tags.prototype.createTag = function (decorated, params) {
          var term = $.trim(params.term);

          if (term === '') {
            return null;
          }

          return {
            id: term,
            text: term
          };
        };

        Tags.prototype.insertTag = function (_, data, tag) {
          data.unshift(tag);
        };

        Tags.prototype._removeOldTags = function (_) {
          var tag = this._lastTag;

          var $options = this.$element.find('option[data-select2-tag]');

          $options.each(function () {
            if (this.selected) {
              return;
            }

            $(this).remove();
          });
        };

        return Tags;
      });

      S2.define('select2/data/tokenizer', [
        'jquery'
      ], function ($) {
        function Tokenizer(decorated, $element, options) {
          var tokenizer = options.get('tokenizer');

          if (tokenizer !== undefined) {
            this.tokenizer = tokenizer;
          }

          decorated.call(this, $element, options);
        }

        Tokenizer.prototype.bind = function (decorated, container, $container) {
          decorated.call(this, container, $container);

          this.$search = container.dropdown.$search || container.selection.$search ||
            $container.find('.select2-search__field');
        };

        Tokenizer.prototype.query = function (decorated, params, callback) {
          var self = this;

          function createAndSelect(data) {
            // Normalize the data object so we can use it for checks
            var item = self._normalizeItem(data);

            // Check if the data object already exists as a tag
            // Select it if it doesn't
            var $existingOptions = self.$element.find('option').filter(function () {
              return $(this).val() === item.id;
            });

            // If an existing option wasn't found for it, create the option
            if (!$existingOptions.length) {
              var $option = self.option(item);
              $option.attr('data-select2-tag', true);

              self._removeOldTags();
              self.addOptions([$option]);
            }

            // Select the item, now that we know there is an option for it
            select(item);
          }

          function select(data) {
            self.trigger('select', {
              data: data
            });
          }

          params.term = params.term || '';

          var tokenData = this.tokenizer(params, this.options, createAndSelect);

          if (tokenData.term !== params.term) {
            // Replace the search term if we have the search box
            if (this.$search.length) {
              this.$search.val(tokenData.term);
              this.$search.focus();
            }

            params.term = tokenData.term;
          }

          decorated.call(this, params, callback);
        };

        Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
          var separators = options.get('tokenSeparators') || [];
          var term = params.term;
          var i = 0;

          var createTag = this.createTag || function (params) {
            return {
              id: params.term,
              text: params.term
            };
          };

          while (i < term.length) {
            var termChar = term[i];

            if ($.inArray(termChar, separators) === -1) {
              i++;

              continue;
            }

            var part = term.substr(0, i);
            var partParams = $.extend({}, params, {
              term: part
            });

            var data = createTag(partParams);

            if (data == null) {
              i++;
              continue;
            }

            callback(data);

            // Reset the term to not include the tokenized portion
            term = term.substr(i + 1) || '';
            i = 0;
          }

          return {
            term: term
          };
        };

        return Tokenizer;
      });

      S2.define('select2/data/minimumInputLength', [

      ], function () {
        function MinimumInputLength(decorated, $e, options) {
          this.minimumInputLength = options.get('minimumInputLength');

          decorated.call(this, $e, options);
        }

        MinimumInputLength.prototype.query = function (decorated, params, callback) {
          params.term = params.term || '';

          if (params.term.length < this.minimumInputLength) {
            this.trigger('results:message', {
              message: 'inputTooShort',
              args: {
                minimum: this.minimumInputLength,
                input: params.term,
                params: params
              }
            });

            return;
          }

          decorated.call(this, params, callback);
        };

        return MinimumInputLength;
      });

      S2.define('select2/data/maximumInputLength', [

      ], function () {
        function MaximumInputLength(decorated, $e, options) {
          this.maximumInputLength = options.get('maximumInputLength');

          decorated.call(this, $e, options);
        }

        MaximumInputLength.prototype.query = function (decorated, params, callback) {
          params.term = params.term || '';

          if (this.maximumInputLength > 0 &&
            params.term.length > this.maximumInputLength) {
            this.trigger('results:message', {
              message: 'inputTooLong',
              args: {
                maximum: this.maximumInputLength,
                input: params.term,
                params: params
              }
            });

            return;
          }

          decorated.call(this, params, callback);
        };

        return MaximumInputLength;
      });

      S2.define('select2/data/maximumSelectionLength', [

      ], function () {
        function MaximumSelectionLength(decorated, $e, options) {
          this.maximumSelectionLength = options.get('maximumSelectionLength');

          decorated.call(this, $e, options);
        }

        MaximumSelectionLength.prototype.query =
          function (decorated, params, callback) {
            var self = this;

            this.current(function (currentData) {
              var count = currentData != null ? currentData.length : 0;
              if (self.maximumSelectionLength > 0 &&
                count >= self.maximumSelectionLength) {
                self.trigger('results:message', {
                  message: 'maximumSelected',
                  args: {
                    maximum: self.maximumSelectionLength
                  }
                });
                return;
              }
              decorated.call(self, params, callback);
            });
          };

        return MaximumSelectionLength;
      });

      S2.define('select2/dropdown', [
        'jquery',
        './utils'
      ], function ($, Utils) {
        function Dropdown($element, options) {
          this.$element = $element;
          this.options = options;

          Dropdown.__super__.constructor.call(this);
        }

        Utils.Extend(Dropdown, Utils.Observable);

        Dropdown.prototype.render = function () {
          var $dropdown = $(
            '<span class="select2-dropdown">' +
            '<span class="select2-results"></span>' +
            '</span>'
          );

          $dropdown.attr('dir', this.options.get('dir'));

          this.$dropdown = $dropdown;

          return $dropdown;
        };

        Dropdown.prototype.bind = function () {
          // Should be implemented in subclasses
        };

        Dropdown.prototype.position = function ($dropdown, $container) {
          // Should be implmented in subclasses
        };

        Dropdown.prototype.destroy = function () {
          // Remove the dropdown from the DOM
          this.$dropdown.remove();
        };

        return Dropdown;
      });

      S2.define('select2/dropdown/search', [
        'jquery',
        '../utils'
      ], function ($, Utils) {
        function Search() { }

        Search.prototype.render = function (decorated) {
          var $rendered = decorated.call(this);

          var $search = $(
            '<span class="select2-search select2-search--dropdown">' +
            '<input class="select2-search__field" type="search" tabindex="-1"' +
            ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
            ' spellcheck="false" role="textbox" />' +
            '</span>'
          );

          this.$searchContainer = $search;
          this.$search = $search.find('input');

          $rendered.prepend($search);

          return $rendered;
        };

        Search.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          this.$search.on('keydown', function (evt) {
            self.trigger('keypress', evt);

            self._keyUpPrevented = evt.isDefaultPrevented();
          });

          // Workaround for browsers which do not support the `input` event
          // This will prevent double-triggering of events for browsers which support
          // both the `keyup` and `input` events.
          this.$search.on('input', function (evt) {
            // Unbind the duplicated `keyup` event
            $(this).off('keyup');
          });

          this.$search.on('keyup input', function (evt) {
            self.handleSearch(evt);
          });

          container.on('open', function () {
            self.$search.attr('tabindex', 0);

            self.$search.focus();

            window.setTimeout(function () {
              self.$search.focus();
            }, 0);
          });

          container.on('close', function () {
            self.$search.attr('tabindex', -1);

            self.$search.val('');
          });

          container.on('focus', function () {
            if (container.isOpen()) {
              self.$search.focus();
            }
          });

          container.on('results:all', function (params) {
            if (params.query.term == null || params.query.term === '') {
              var showSearch = self.showSearch(params);

              if (showSearch) {
                self.$searchContainer.removeClass('select2-search--hide');
              } else {
                self.$searchContainer.addClass('select2-search--hide');
              }
            }
          });
        };

        Search.prototype.handleSearch = function (evt) {
          if (!this._keyUpPrevented) {
            var input = this.$search.val();

            this.trigger('query', {
              term: input
            });
          }

          this._keyUpPrevented = false;
        };

        Search.prototype.showSearch = function (_, params) {
          return true;
        };

        return Search;
      });

      S2.define('select2/dropdown/hidePlaceholder', [

      ], function () {
        function HidePlaceholder(decorated, $element, options, dataAdapter) {
          this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

          decorated.call(this, $element, options, dataAdapter);
        }

        HidePlaceholder.prototype.append = function (decorated, data) {
          data.results = this.removePlaceholder(data.results);

          decorated.call(this, data);
        };

        HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
          if (typeof placeholder === 'string') {
            placeholder = {
              id: '',
              text: placeholder
            };
          }

          return placeholder;
        };

        HidePlaceholder.prototype.removePlaceholder = function (_, data) {
          var modifiedData = data.slice(0);

          for (var d = data.length - 1; d >= 0; d--) {
            var item = data[d];

            if (this.placeholder.id === item.id) {
              modifiedData.splice(d, 1);
            }
          }

          return modifiedData;
        };

        return HidePlaceholder;
      });

      S2.define('select2/dropdown/infiniteScroll', [
        'jquery'
      ], function ($) {
        function InfiniteScroll(decorated, $element, options, dataAdapter) {
          this.lastParams = {};

          decorated.call(this, $element, options, dataAdapter);

          this.$loadingMore = this.createLoadingMore();
          this.loading = false;
        }

        InfiniteScroll.prototype.append = function (decorated, data) {
          this.$loadingMore.remove();
          this.loading = false;

          decorated.call(this, data);

          if (this.showLoadingMore(data)) {
            this.$results.append(this.$loadingMore);
          }
        };

        InfiniteScroll.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          container.on('query', function (params) {
            self.lastParams = params;
            self.loading = true;
          });

          container.on('query:append', function (params) {
            self.lastParams = params;
            self.loading = true;
          });

          this.$results.on('scroll', function () {
            var isLoadMoreVisible = $.contains(
              document.documentElement,
              self.$loadingMore[0]
            );

            if (self.loading || !isLoadMoreVisible) {
              return;
            }

            var currentOffset = self.$results.offset().top +
              self.$results.outerHeight(false);
            var loadingMoreOffset = self.$loadingMore.offset().top +
              self.$loadingMore.outerHeight(false);

            if (currentOffset + 50 >= loadingMoreOffset) {
              self.loadMore();
            }
          });
        };

        InfiniteScroll.prototype.loadMore = function () {
          this.loading = true;

          var params = $.extend({}, { page: 1 }, this.lastParams);

          params.page++;

          this.trigger('query:append', params);
        };

        InfiniteScroll.prototype.showLoadingMore = function (_, data) {
          return data.pagination && data.pagination.more;
        };

        InfiniteScroll.prototype.createLoadingMore = function () {
          var $option = $(
            '<li ' +
            'class="select2-results__option select2-results__option--load-more"' +
            'role="treeitem" aria-disabled="true"></li>'
          );

          var message = this.options.get('translations').get('loadingMore');

          $option.html(message(this.lastParams));

          return $option;
        };

        return InfiniteScroll;
      });

      S2.define('select2/dropdown/attachBody', [
        'jquery',
        '../utils'
      ], function ($, Utils) {
        function AttachBody(decorated, $element, options) {
          this.$dropdownParent = options.get('dropdownParent') || $(document.body);

          decorated.call(this, $element, options);
        }

        AttachBody.prototype.bind = function (decorated, container, $container) {
          var self = this;

          var setupResultsEvents = false;

          decorated.call(this, container, $container);

          container.on('open', function () {
            self._showDropdown();
            self._attachPositioningHandler(container);

            if (!setupResultsEvents) {
              setupResultsEvents = true;

              container.on('results:all', function () {
                self._positionDropdown();
                self._resizeDropdown();
              });

              container.on('results:append', function () {
                self._positionDropdown();
                self._resizeDropdown();
              });
            }
          });

          container.on('close', function () {
            self._hideDropdown();
            self._detachPositioningHandler(container);
          });

          this.$dropdownContainer.on('mousedown', function (evt) {
            evt.stopPropagation();
          });
        };

        AttachBody.prototype.destroy = function (decorated) {
          decorated.call(this);

          this.$dropdownContainer.remove();
        };

        AttachBody.prototype.position = function (decorated, $dropdown, $container) {
          // Clone all of the container classes
          $dropdown.attr('class', $container.attr('class'));

          $dropdown.removeClass('select2');
          $dropdown.addClass('select2-container--open');

          $dropdown.css({
            position: 'absolute',
            top: -999999
          });

          this.$container = $container;
        };

        AttachBody.prototype.render = function (decorated) {
          var $container = $('<span></span>');

          var $dropdown = decorated.call(this);
          $container.append($dropdown);

          this.$dropdownContainer = $container;

          return $container;
        };

        AttachBody.prototype._hideDropdown = function (decorated) {
          this.$dropdownContainer.detach();
        };

        AttachBody.prototype._attachPositioningHandler =
          function (decorated, container) {
            var self = this;

            var scrollEvent = 'scroll.select2.' + container.id;
            var resizeEvent = 'resize.select2.' + container.id;
            var orientationEvent = 'orientationchange.select2.' + container.id;

            var $watchers = this.$container.parents().filter(Utils.hasScroll);
            $watchers.each(function () {
              $(this).data('select2-scroll-position', {
                x: $(this).scrollLeft(),
                y: $(this).scrollTop()
              });
            });

            $watchers.on(scrollEvent, function (ev) {
              var position = $(this).data('select2-scroll-position');
              $(this).scrollTop(position.y);
            });

            $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
              function (e) {
                self._positionDropdown();
                self._resizeDropdown();
              });
          };

        AttachBody.prototype._detachPositioningHandler =
          function (decorated, container) {
            var scrollEvent = 'scroll.select2.' + container.id;
            var resizeEvent = 'resize.select2.' + container.id;
            var orientationEvent = 'orientationchange.select2.' + container.id;

            var $watchers = this.$container.parents().filter(Utils.hasScroll);
            $watchers.off(scrollEvent);

            $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
          };

        AttachBody.prototype._positionDropdown = function () {
          var $window = $(window);

          var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
          var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

          var newDirection = null;

          var offset = this.$container.offset();

          offset.bottom = offset.top + this.$container.outerHeight(false);

          var container = {
            height: this.$container.outerHeight(false)
          };

          container.top = offset.top;
          container.bottom = offset.top + container.height;

          var dropdown = {
            height: this.$dropdown.outerHeight(false)
          };

          var viewport = {
            top: $window.scrollTop(),
            bottom: $window.scrollTop() + $window.height()
          };

          var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
          var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

          var css = {
            left: offset.left,
            top: container.bottom
          };

          // Determine what the parent element is to use for calciulating the offset
          var $offsetParent = this.$dropdownParent;

          // For statically positoned elements, we need to get the element
          // that is determining the offset
          if ($offsetParent.css('position') === 'static') {
            $offsetParent = $offsetParent.offsetParent();
          }

          var parentOffset = $offsetParent.offset();

          css.top -= parentOffset.top;
          css.left -= parentOffset.left;

          if (!isCurrentlyAbove && !isCurrentlyBelow) {
            newDirection = 'below';
          }

          if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
            newDirection = 'above';
          } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
            newDirection = 'below';
          }

          if (newDirection == 'above' ||
            (isCurrentlyAbove && newDirection !== 'below')) {
            css.top = container.top - parentOffset.top - dropdown.height;
          }

          if (newDirection != null) {
            this.$dropdown
              .removeClass('select2-dropdown--below select2-dropdown--above')
              .addClass('select2-dropdown--' + newDirection);
            this.$container
              .removeClass('select2-container--below select2-container--above')
              .addClass('select2-container--' + newDirection);
          }

          this.$dropdownContainer.css(css);
        };

        AttachBody.prototype._resizeDropdown = function () {
          var css = {
            width: this.$container.outerWidth(false) + 'px'
          };

          if (this.options.get('dropdownAutoWidth')) {
            css.minWidth = css.width;
            css.position = 'relative';
            css.width = 'auto';
          }

          this.$dropdown.css(css);
        };

        AttachBody.prototype._showDropdown = function (decorated) {
          this.$dropdownContainer.appendTo(this.$dropdownParent);

          this._positionDropdown();
          this._resizeDropdown();
        };

        return AttachBody;
      });

      S2.define('select2/dropdown/minimumResultsForSearch', [

      ], function () {
        function countResults(data) {
          var count = 0;

          for (var d = 0; d < data.length; d++) {
            var item = data[d];

            if (item.children) {
              count += countResults(item.children);
            } else {
              count++;
            }
          }

          return count;
        }

        function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
          this.minimumResultsForSearch = options.get('minimumResultsForSearch');

          if (this.minimumResultsForSearch < 0) {
            this.minimumResultsForSearch = Infinity;
          }

          decorated.call(this, $element, options, dataAdapter);
        }

        MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
          if (countResults(params.data.results) < this.minimumResultsForSearch) {
            return false;
          }

          return decorated.call(this, params);
        };

        return MinimumResultsForSearch;
      });

      S2.define('select2/dropdown/selectOnClose', [

      ], function () {
        function SelectOnClose() { }

        SelectOnClose.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          container.on('close', function (params) {
            self._handleSelectOnClose(params);
          });
        };

        SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
          if (params && params.originalSelect2Event != null) {
            var event = params.originalSelect2Event;

            // Don't select an item if the close event was triggered from a select or
            // unselect event
            if (event._type === 'select' || event._type === 'unselect') {
              return;
            }
          }

          var $highlightedResults = this.getHighlightedResults();

          // Only select highlighted results
          if ($highlightedResults.length < 1) {
            return;
          }

          var data = $highlightedResults.data('data');

          // Don't re-select already selected resulte
          if (
            (data.element != null && data.element.selected) ||
            (data.element == null && data.selected)
          ) {
            return;
          }

          this.trigger('select', {
            data: data
          });
        };

        return SelectOnClose;
      });

      S2.define('select2/dropdown/closeOnSelect', [

      ], function () {
        function CloseOnSelect() { }

        CloseOnSelect.prototype.bind = function (decorated, container, $container) {
          var self = this;

          decorated.call(this, container, $container);

          container.on('select', function (evt) {
            self._selectTriggered(evt);
          });

          container.on('unselect', function (evt) {
            self._selectTriggered(evt);
          });
        };

        CloseOnSelect.prototype._selectTriggered = function (_, evt) {
          var originalEvent = evt.originalEvent;

          // Don't close if the control key is being held
          if (originalEvent && originalEvent.ctrlKey) {
            return;
          }

          this.trigger('close', {
            originalEvent: originalEvent,
            originalSelect2Event: evt
          });
        };

        return CloseOnSelect;
      });

      S2.define('select2/i18n/en', [], function () {
        // English
        return {
          errorLoading: function () {
            return 'The results could not be loaded.';
          },
          inputTooLong: function (args) {
            var overChars = args.input.length - args.maximum;

            var message = 'Please delete ' + overChars + ' character';

            if (overChars != 1) {
              message += 's';
            }

            return message;
          },
          inputTooShort: function (args) {
            var remainingChars = args.minimum - args.input.length;

            var message = 'Please enter ' + remainingChars + ' or more characters';

            return message;
          },
          loadingMore: function () {
            return 'Loading more results…';
          },
          maximumSelected: function (args) {
            var message = 'You can only select ' + args.maximum + ' item';

            if (args.maximum != 1) {
              message += 's';
            }

            return message;
          },
          noResults: function () {
            return 'No results found';
          },
          searching: function () {
            return 'Searching…';
          }
        };
      });

      S2.define('select2/defaults', [
        'jquery',
        'require',

        './results',

        './selection/single',
        './selection/multiple',
        './selection/placeholder',
        './selection/allowClear',
        './selection/search',
        './selection/eventRelay',

        './utils',
        './translation',
        './diacritics',

        './data/select',
        './data/array',
        './data/ajax',
        './data/tags',
        './data/tokenizer',
        './data/minimumInputLength',
        './data/maximumInputLength',
        './data/maximumSelectionLength',

        './dropdown',
        './dropdown/search',
        './dropdown/hidePlaceholder',
        './dropdown/infiniteScroll',
        './dropdown/attachBody',
        './dropdown/minimumResultsForSearch',
        './dropdown/selectOnClose',
        './dropdown/closeOnSelect',

        './i18n/en'
      ], function ($, require,

        ResultsList,

        SingleSelection, MultipleSelection, Placeholder, AllowClear,
        SelectionSearch, EventRelay,

        Utils, Translation, DIACRITICS,

        SelectData, ArrayData, AjaxData, Tags, Tokenizer,
        MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

        Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
        AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

        EnglishTranslation) {
        function Defaults() {
          this.reset();
        }

        Defaults.prototype.apply = function (options) {
          options = $.extend(true, {}, this.defaults, options);

          if (options.dataAdapter == null) {
            if (options.ajax != null) {
              options.dataAdapter = AjaxData;
            } else if (options.data != null) {
              options.dataAdapter = ArrayData;
            } else {
              options.dataAdapter = SelectData;
            }

            if (options.minimumInputLength > 0) {
              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                MinimumInputLength
              );
            }

            if (options.maximumInputLength > 0) {
              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                MaximumInputLength
              );
            }

            if (options.maximumSelectionLength > 0) {
              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                MaximumSelectionLength
              );
            }

            if (options.tags) {
              options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
            }

            if (options.tokenSeparators != null || options.tokenizer != null) {
              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                Tokenizer
              );
            }

            if (options.query != null) {
              var Query = require(options.amdBase + 'compat/query');

              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                Query
              );
            }

            if (options.initSelection != null) {
              var InitSelection = require(options.amdBase + 'compat/initSelection');

              options.dataAdapter = Utils.Decorate(
                options.dataAdapter,
                InitSelection
              );
            }
          }

          if (options.resultsAdapter == null) {
            options.resultsAdapter = ResultsList;

            if (options.ajax != null) {
              options.resultsAdapter = Utils.Decorate(
                options.resultsAdapter,
                InfiniteScroll
              );
            }

            if (options.placeholder != null) {
              options.resultsAdapter = Utils.Decorate(
                options.resultsAdapter,
                HidePlaceholder
              );
            }

            if (options.selectOnClose) {
              options.resultsAdapter = Utils.Decorate(
                options.resultsAdapter,
                SelectOnClose
              );
            }
          }

          if (options.dropdownAdapter == null) {
            if (options.multiple) {
              options.dropdownAdapter = Dropdown;
            } else {
              var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

              options.dropdownAdapter = SearchableDropdown;
            }

            if (options.minimumResultsForSearch !== 0) {
              options.dropdownAdapter = Utils.Decorate(
                options.dropdownAdapter,
                MinimumResultsForSearch
              );
            }

            if (options.closeOnSelect) {
              options.dropdownAdapter = Utils.Decorate(
                options.dropdownAdapter,
                CloseOnSelect
              );
            }

            if (
              options.dropdownCssClass != null ||
              options.dropdownCss != null ||
              options.adaptDropdownCssClass != null
            ) {
              var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

              options.dropdownAdapter = Utils.Decorate(
                options.dropdownAdapter,
                DropdownCSS
              );
            }

            options.dropdownAdapter = Utils.Decorate(
              options.dropdownAdapter,
              AttachBody
            );
          }

          if (options.selectionAdapter == null) {
            if (options.multiple) {
              options.selectionAdapter = MultipleSelection;
            } else {
              options.selectionAdapter = SingleSelection;
            }

            // Add the placeholder mixin if a placeholder was specified
            if (options.placeholder != null) {
              options.selectionAdapter = Utils.Decorate(
                options.selectionAdapter,
                Placeholder
              );
            }

            if (options.allowClear) {
              options.selectionAdapter = Utils.Decorate(
                options.selectionAdapter,
                AllowClear
              );
            }

            if (options.multiple) {
              options.selectionAdapter = Utils.Decorate(
                options.selectionAdapter,
                SelectionSearch
              );
            }

            if (
              options.containerCssClass != null ||
              options.containerCss != null ||
              options.adaptContainerCssClass != null
            ) {
              var ContainerCSS = require(options.amdBase + 'compat/containerCss');

              options.selectionAdapter = Utils.Decorate(
                options.selectionAdapter,
                ContainerCSS
              );
            }

            options.selectionAdapter = Utils.Decorate(
              options.selectionAdapter,
              EventRelay
            );
          }

          if (typeof options.language === 'string') {
            // Check if the language is specified with a region
            if (options.language.indexOf('-') > 0) {
              // Extract the region information if it is included
              var languageParts = options.language.split('-');
              var baseLanguage = languageParts[0];

              options.language = [options.language, baseLanguage];
            } else {
              options.language = [options.language];
            }
          }

          if ($.isArray(options.language)) {
            var languages = new Translation();
            options.language.push('en');

            var languageNames = options.language;

            for (var l = 0; l < languageNames.length; l++) {
              var name = languageNames[l];
              var language = {};

              try {
                // Try to load it with the original name
                language = Translation.loadPath(name);
              } catch (e) {
                try {
                  // If we couldn't load it, check if it wasn't the full path
                  name = this.defaults.amdLanguageBase + name;
                  language = Translation.loadPath(name);
                } catch (ex) {
                  // The translation could not be loaded at all. Sometimes this is
                  // because of a configuration problem, other times this can be
                  // because of how Select2 helps load all possible translation files.
                  if (options.debug && window.console && console.warn) {
                    console.warn(
                      'Select2: The language file for "' + name + '" could not be ' +
                      'automatically loaded. A fallback will be used instead.'
                    );
                  }

                  continue;
                }
              }

              languages.extend(language);
            }

            options.translations = languages;
          } else {
            var baseTranslation = Translation.loadPath(
              this.defaults.amdLanguageBase + 'en'
            );
            var customTranslation = new Translation(options.language);

            customTranslation.extend(baseTranslation);

            options.translations = customTranslation;
          }

          return options;
        };

        Defaults.prototype.reset = function () {
          function stripDiacritics(text) {
            // Used 'uni range + named function' from http://jsperf.com/diacritics/18
            function match(a) {
              return DIACRITICS[a] || a;
            }

            return text.replace(/[^\u0000-\u007E]/g, match);
          }

          function matcher(params, data) {
            // Always return the object if there is nothing to compare
            if ($.trim(params.term) === '') {
              return data;
            }

            // Do a recursive check for options with children
            if (data.children && data.children.length > 0) {
              // Clone the data object if there are children
              // This is required as we modify the object to remove any non-matches
              var match = $.extend(true, {}, data);

              // Check each child of the option
              for (var c = data.children.length - 1; c >= 0; c--) {
                var child = data.children[c];

                var matches = matcher(params, child);

                // If there wasn't a match, remove the object in the array
                if (matches == null) {
                  match.children.splice(c, 1);
                }
              }

              // If any children matched, return the new object
              if (match.children.length > 0) {
                return match;
              }

              // If there were no matching children, check just the plain object
              return matcher(params, match);
            }

            var original = stripDiacritics(data.text).toUpperCase();
            var term = stripDiacritics(params.term).toUpperCase();

            // Check if the text contains the term
            if (original.indexOf(term) > -1) {
              return data;
            }

            // If it doesn't contain the term, don't return anything
            return null;
          }

          this.defaults = {
            amdBase: './',
            amdLanguageBase: './i18n/',
            closeOnSelect: true,
            debug: false,
            dropdownAutoWidth: false,
            escapeMarkup: Utils.escapeMarkup,
            language: EnglishTranslation,
            matcher: matcher,
            minimumInputLength: 0,
            maximumInputLength: 0,
            maximumSelectionLength: 0,
            minimumResultsForSearch: 0,
            selectOnClose: false,
            sorter: function (data) {
              return data;
            },
            templateResult: function (result) {
              return result.text;
            },
            templateSelection: function (selection) {
              return selection.text;
            },
            theme: 'default',
            width: 'resolve'
          };
        };

        Defaults.prototype.set = function (key, value) {
          var camelKey = $.camelCase(key);

          var data = {};
          data[camelKey] = value;

          var convertedData = Utils._convertData(data);

          $.extend(this.defaults, convertedData);
        };

        var defaults = new Defaults();

        return defaults;
      });

      S2.define('select2/options', [
        'require',
        'jquery',
        './defaults',
        './utils'
      ], function (require, $, Defaults, Utils) {
        function Options(options, $element) {
          this.options = options;

          if ($element != null) {
            this.fromElement($element);
          }

          this.options = Defaults.apply(this.options);

          if ($element && $element.is('input')) {
            var InputCompat = require(this.get('amdBase') + 'compat/inputData');

            this.options.dataAdapter = Utils.Decorate(
              this.options.dataAdapter,
              InputCompat
            );
          }
        }

        Options.prototype.fromElement = function ($e) {
          var excludedData = ['select2'];

          if (this.options.multiple == null) {
            this.options.multiple = $e.prop('multiple');
          }

          if (this.options.disabled == null) {
            this.options.disabled = $e.prop('disabled');
          }

          if (this.options.language == null) {
            if ($e.prop('lang')) {
              this.options.language = $e.prop('lang').toLowerCase();
            } else if ($e.closest('[lang]').prop('lang')) {
              this.options.language = $e.closest('[lang]').prop('lang');
            }
          }

          if (this.options.dir == null) {
            if ($e.prop('dir')) {
              this.options.dir = $e.prop('dir');
            } else if ($e.closest('[dir]').prop('dir')) {
              this.options.dir = $e.closest('[dir]').prop('dir');
            } else {
              this.options.dir = 'ltr';
            }
          }

          $e.prop('disabled', this.options.disabled);
          $e.prop('multiple', this.options.multiple);

          if ($e.data('select2Tags')) {
            if (this.options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The `data-select2-tags` attribute has been changed to ' +
                'use the `data-data` and `data-tags="true"` attributes and will be ' +
                'removed in future versions of Select2.'
              );
            }

            $e.data('data', $e.data('select2Tags'));
            $e.data('tags', true);
          }

          if ($e.data('ajaxUrl')) {
            if (this.options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The `data-ajax-url` attribute has been changed to ' +
                '`data-ajax--url` and support for the old attribute will be removed' +
                ' in future versions of Select2.'
              );
            }

            $e.attr('ajax--url', $e.data('ajaxUrl'));
            $e.data('ajax--url', $e.data('ajaxUrl'));
          }

          var dataset = {};

          // Prefer the element's `dataset` attribute if it exists
          // jQuery 1.x does not correctly handle data attributes with multiple dashes
          if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
            dataset = $.extend(true, {}, $e[0].dataset, $e.data());
          } else {
            dataset = $e.data();
          }

          var data = $.extend(true, {}, dataset);

          data = Utils._convertData(data);

          for (var key in data) {
            if ($.inArray(key, excludedData) > -1) {
              continue;
            }

            if ($.isPlainObject(this.options[key])) {
              $.extend(this.options[key], data[key]);
            } else {
              this.options[key] = data[key];
            }
          }

          return this;
        };

        Options.prototype.get = function (key) {
          return this.options[key];
        };

        Options.prototype.set = function (key, val) {
          this.options[key] = val;
        };

        return Options;
      });

      S2.define('select2/core', [
        'jquery',
        './options',
        './utils',
        './keys'
      ], function ($, Options, Utils, KEYS) {
        var Select2 = function ($element, options) {
          if ($element.data('select2') != null) {
            $element.data('select2').destroy();
          }

          this.$element = $element;

          this.id = this._generateId($element);

          options = options || {};

          this.options = new Options(options, $element);

          Select2.__super__.constructor.call(this);

          // Set up the tabindex

          var tabindex = $element.attr('tabindex') || 0;
          $element.data('old-tabindex', tabindex);
          $element.attr('tabindex', '-1');

          // Set up containers and adapters

          var DataAdapter = this.options.get('dataAdapter');
          this.dataAdapter = new DataAdapter($element, this.options);

          var $container = this.render();

          this._placeContainer($container);

          var SelectionAdapter = this.options.get('selectionAdapter');
          this.selection = new SelectionAdapter($element, this.options);
          this.$selection = this.selection.render();

          this.selection.position(this.$selection, $container);

          var DropdownAdapter = this.options.get('dropdownAdapter');
          this.dropdown = new DropdownAdapter($element, this.options);
          this.$dropdown = this.dropdown.render();

          this.dropdown.position(this.$dropdown, $container);

          var ResultsAdapter = this.options.get('resultsAdapter');
          this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
          this.$results = this.results.render();

          this.results.position(this.$results, this.$dropdown);

          // Bind events

          var self = this;

          // Bind the container to all of the adapters
          this._bindAdapters();

          // Register any DOM event handlers
          this._registerDomEvents();

          // Register any internal event handlers
          this._registerDataEvents();
          this._registerSelectionEvents();
          this._registerDropdownEvents();
          this._registerResultsEvents();
          this._registerEvents();

          // Set the initial state
          this.dataAdapter.current(function (initialData) {
            self.trigger('selection:update', {
              data: initialData
            });
          });

          // Hide the original select
          $element.addClass('select2-hidden-accessible');
          $element.attr('aria-hidden', 'true');

          // Synchronize any monitored attributes
          this._syncAttributes();

          $element.data('select2', this);
        };

        Utils.Extend(Select2, Utils.Observable);

        Select2.prototype._generateId = function ($element) {
          var id = '';

          if ($element.attr('id') != null) {
            id = $element.attr('id');
          } else if ($element.attr('name') != null) {
            id = $element.attr('name') + '-' + Utils.generateChars(2);
          } else {
            id = Utils.generateChars(4);
          }

          id = id.replace(/(:|\.|\[|\]|,)/g, '');
          id = 'select2-' + id;

          return id;
        };

        Select2.prototype._placeContainer = function ($container) {
          $container.insertAfter(this.$element);

          var width = this._resolveWidth(this.$element, this.options.get('width'));

          if (width != null) {
            $container.css('width', width);
          }
        };

        Select2.prototype._resolveWidth = function ($element, method) {
          var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

          if (method == 'resolve') {
            var styleWidth = this._resolveWidth($element, 'style');

            if (styleWidth != null) {
              return styleWidth;
            }

            return this._resolveWidth($element, 'element');
          }

          if (method == 'element') {
            var elementWidth = $element.outerWidth(false);

            if (elementWidth <= 0) {
              return 'auto';
            }

            return elementWidth + 'px';
          }

          if (method == 'style') {
            var style = $element.attr('style');

            if (typeof (style) !== 'string') {
              return null;
            }

            var attrs = style.split(';');

            for (var i = 0, l = attrs.length; i < l; i = i + 1) {
              var attr = attrs[i].replace(/\s/g, '');
              var matches = attr.match(WIDTH);

              if (matches !== null && matches.length >= 1) {
                return matches[1];
              }
            }

            return null;
          }

          return method;
        };

        Select2.prototype._bindAdapters = function () {
          this.dataAdapter.bind(this, this.$container);
          this.selection.bind(this, this.$container);

          this.dropdown.bind(this, this.$container);
          this.results.bind(this, this.$container);
        };

        Select2.prototype._registerDomEvents = function () {
          var self = this;

          this.$element.on('change.select2', function () {
            self.dataAdapter.current(function (data) {
              self.trigger('selection:update', {
                data: data
              });
            });
          });

          this.$element.on('focus.select2', function (evt) {
            self.trigger('focus', evt);
          });

          this._syncA = Utils.bind(this._syncAttributes, this);
          this._syncS = Utils.bind(this._syncSubtree, this);

          if (this.$element[0].attachEvent) {
            this.$element[0].attachEvent('onpropertychange', this._syncA);
          }

          var observer = window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
            ;

          if (observer != null) {
            this._observer = new observer(function (mutations) {
              $.each(mutations, self._syncA);
              $.each(mutations, self._syncS);
            });
            this._observer.observe(this.$element[0], {
              attributes: true,
              childList: true,
              subtree: false
            });
          } else if (this.$element[0].addEventListener) {
            this.$element[0].addEventListener(
              'DOMAttrModified',
              self._syncA,
              false
            );
            this.$element[0].addEventListener(
              'DOMNodeInserted',
              self._syncS,
              false
            );
            this.$element[0].addEventListener(
              'DOMNodeRemoved',
              self._syncS,
              false
            );
          }
        };

        Select2.prototype._registerDataEvents = function () {
          var self = this;

          this.dataAdapter.on('*', function (name, params) {
            self.trigger(name, params);
          });
        };

        Select2.prototype._registerSelectionEvents = function () {
          var self = this;
          var nonRelayEvents = ['toggle', 'focus'];

          this.selection.on('toggle', function () {
            self.toggleDropdown();
          });

          this.selection.on('focus', function (params) {
            self.focus(params);
          });

          this.selection.on('*', function (name, params) {
            if ($.inArray(name, nonRelayEvents) !== -1) {
              return;
            }

            self.trigger(name, params);
          });
        };

        Select2.prototype._registerDropdownEvents = function () {
          var self = this;

          this.dropdown.on('*', function (name, params) {
            self.trigger(name, params);
          });
        };

        Select2.prototype._registerResultsEvents = function () {
          var self = this;

          this.results.on('*', function (name, params) {
            self.trigger(name, params);
          });
        };

        Select2.prototype._registerEvents = function () {
          var self = this;

          this.on('open', function () {
            self.$container.addClass('select2-container--open');
          });

          this.on('close', function () {
            self.$container.removeClass('select2-container--open');
          });

          this.on('enable', function () {
            self.$container.removeClass('select2-container--disabled');
          });

          this.on('disable', function () {
            self.$container.addClass('select2-container--disabled');
          });

          this.on('blur', function () {
            self.$container.removeClass('select2-container--focus');
          });

          this.on('query', function (params) {
            if (!self.isOpen()) {
              self.trigger('open', {});
            }

            this.dataAdapter.query(params, function (data) {
              self.trigger('results:all', {
                data: data,
                query: params
              });
            });
          });

          this.on('query:append', function (params) {
            this.dataAdapter.query(params, function (data) {
              self.trigger('results:append', {
                data: data,
                query: params
              });
            });
          });

          this.on('keypress', function (evt) {
            var key = evt.which;

            if (self.isOpen()) {
              if (key === KEYS.ESC || key === KEYS.TAB ||
                (key === KEYS.UP && evt.altKey)) {
                self.close();

                evt.preventDefault();
              } else if (key === KEYS.ENTER) {
                self.trigger('results:select', {});

                evt.preventDefault();
              } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
                self.trigger('results:toggle', {});

                evt.preventDefault();
              } else if (key === KEYS.UP) {
                self.trigger('results:previous', {});

                evt.preventDefault();
              } else if (key === KEYS.DOWN) {
                self.trigger('results:next', {});

                evt.preventDefault();
              }
            } else {
              if (key === KEYS.ENTER || key === KEYS.SPACE ||
                (key === KEYS.DOWN && evt.altKey)) {
                self.open();

                evt.preventDefault();
              }
            }
          });
        };

        Select2.prototype._syncAttributes = function () {
          this.options.set('disabled', this.$element.prop('disabled'));

          if (this.options.get('disabled')) {
            if (this.isOpen()) {
              this.close();
            }

            this.trigger('disable', {});
          } else {
            this.trigger('enable', {});
          }
        };

        Select2.prototype._syncSubtree = function (evt, mutations) {
          var changed = false;
          var self = this;

          // Ignore any mutation events raised for elements that aren't options or
          // optgroups. This handles the case when the select element is destroyed
          if (
            evt && evt.target && (
              evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
            )
          ) {
            return;
          }

          if (!mutations) {
            // If mutation events aren't supported, then we can only assume that the
            // change affected the selections
            changed = true;
          } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
            for (var n = 0; n < mutations.addedNodes.length; n++) {
              var node = mutations.addedNodes[n];

              if (node.selected) {
                changed = true;
              }
            }
          } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
            changed = true;
          }

          // Only re-pull the data if we think there is a change
          if (changed) {
            this.dataAdapter.current(function (currentData) {
              self.trigger('selection:update', {
                data: currentData
              });
            });
          }
        };

        /**
         * Override the trigger method to automatically trigger pre-events when
         * there are events that can be prevented.
         */
        Select2.prototype.trigger = function (name, args) {
          var actualTrigger = Select2.__super__.trigger;
          var preTriggerMap = {
            'open': 'opening',
            'close': 'closing',
            'select': 'selecting',
            'unselect': 'unselecting'
          };

          if (args === undefined) {
            args = {};
          }

          if (name in preTriggerMap) {
            var preTriggerName = preTriggerMap[name];
            var preTriggerArgs = {
              prevented: false,
              name: name,
              args: args
            };

            actualTrigger.call(this, preTriggerName, preTriggerArgs);

            if (preTriggerArgs.prevented) {
              args.prevented = true;

              return;
            }
          }

          actualTrigger.call(this, name, args);
        };

        Select2.prototype.toggleDropdown = function () {
          if (this.options.get('disabled')) {
            return;
          }

          if (this.isOpen()) {
            this.close();
          } else {
            this.open();
          }
        };

        Select2.prototype.open = function () {
          if (this.isOpen()) {
            return;
          }

          this.trigger('query', {});
        };

        Select2.prototype.close = function () {
          if (!this.isOpen()) {
            return;
          }

          this.trigger('close', {});
        };

        Select2.prototype.isOpen = function () {
          return this.$container.hasClass('select2-container--open');
        };

        Select2.prototype.hasFocus = function () {
          return this.$container.hasClass('select2-container--focus');
        };

        Select2.prototype.focus = function (data) {
          // No need to re-trigger focus events if we are already focused
          if (this.hasFocus()) {
            return;
          }

          this.$container.addClass('select2-container--focus');
          this.trigger('focus', {});
        };

        Select2.prototype.enable = function (args) {
          if (this.options.get('debug') && window.console && console.warn) {
            console.warn(
              'Select2: The `select2("enable")` method has been deprecated and will' +
              ' be removed in later Select2 versions. Use $element.prop("disabled")' +
              ' instead.'
            );
          }

          if (args == null || args.length === 0) {
            args = [true];
          }

          var disabled = !args[0];

          this.$element.prop('disabled', disabled);
        };

        Select2.prototype.data = function () {
          if (this.options.get('debug') &&
            arguments.length > 0 && window.console && console.warn) {
            console.warn(
              'Select2: Data can no longer be set using `select2("data")`. You ' +
              'should consider setting the value instead using `$element.val()`.'
            );
          }

          var data = [];

          this.dataAdapter.current(function (currentData) {
            data = currentData;
          });

          return data;
        };

        Select2.prototype.val = function (args) {
          if (this.options.get('debug') && window.console && console.warn) {
            console.warn(
              'Select2: The `select2("val")` method has been deprecated and will be' +
              ' removed in later Select2 versions. Use $element.val() instead.'
            );
          }

          if (args == null || args.length === 0) {
            return this.$element.val();
          }

          var newVal = args[0];

          if ($.isArray(newVal)) {
            newVal = $.map(newVal, function (obj) {
              return obj.toString();
            });
          }

          this.$element.val(newVal).trigger('change');
        };

        Select2.prototype.destroy = function () {
          this.$container.remove();

          if (this.$element[0].detachEvent) {
            this.$element[0].detachEvent('onpropertychange', this._syncA);
          }

          if (this._observer != null) {
            this._observer.disconnect();
            this._observer = null;
          } else if (this.$element[0].removeEventListener) {
            this.$element[0]
              .removeEventListener('DOMAttrModified', this._syncA, false);
            this.$element[0]
              .removeEventListener('DOMNodeInserted', this._syncS, false);
            this.$element[0]
              .removeEventListener('DOMNodeRemoved', this._syncS, false);
          }

          this._syncA = null;
          this._syncS = null;

          this.$element.off('.select2');
          this.$element.attr('tabindex', this.$element.data('old-tabindex'));

          this.$element.removeClass('select2-hidden-accessible');
          this.$element.attr('aria-hidden', 'false');
          this.$element.removeData('select2');

          this.dataAdapter.destroy();
          this.selection.destroy();
          this.dropdown.destroy();
          this.results.destroy();

          this.dataAdapter = null;
          this.selection = null;
          this.dropdown = null;
          this.results = null;
        };

        Select2.prototype.render = function () {
          var $container = $(
            '<span class="select2 select2-container">' +
            '<span class="selection"></span>' +
            '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
            '</span>'
          );

          $container.attr('dir', this.options.get('dir'));

          this.$container = $container;

          this.$container.addClass('select2-container--' + this.options.get('theme'));

          $container.data('element', this.$element);

          return $container;
        };

        return Select2;
      });

      S2.define('jquery-mousewheel', [
        'jquery'
      ], function ($) {
        // Used to shim jQuery.mousewheel for non-full builds.
        return $;
      });

      S2.define('jquery.select2', [
        'jquery',
        'jquery-mousewheel',

        './select2/core',
        './select2/defaults'
      ], function ($, _, Select2, Defaults) {
        if ($.fn.select2 == null) {
          // All methods that should return the element
          var thisMethods = ['open', 'close', 'destroy'];

          $.fn.select2 = function (options) {
            options = options || {};

            if (typeof options === 'object') {
              this.each(function () {
                var instanceOptions = $.extend(true, {}, options);

                var instance = new Select2($(this), instanceOptions);
              });

              return this;
            } else if (typeof options === 'string') {
              var ret;
              var args = Array.prototype.slice.call(arguments, 1);

              this.each(function () {
                var instance = $(this).data('select2');

                if (instance == null && window.console && console.error) {
                  console.error(
                    'The select2(\'' + options + '\') method was called on an ' +
                    'element that is not using Select2.'
                  );
                }

                ret = instance[options].apply(instance, args);
              });

              // Check if we should be returning `this`
              if ($.inArray(options, thisMethods) > -1) {
                return this;
              }

              return ret;
            } else {
              throw new Error('Invalid arguments for Select2: ' + options);
            }
          };
        }

        if ($.fn.select2.defaults == null) {
          $.fn.select2.defaults = Defaults;
        }

        return Select2;
      });

      // Return the AMD loader configuration so it can be used outside of this file
      return {
        define: S2.define,
        require: S2.require
      };
    }());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: March 10, 2017
 */
(function () {
  'use strict';
  var $;

  /*===========================
  Swiper
  ===========================*/
  var Swiper = function (container, params) {
    if (!(this instanceof Swiper)) return new Swiper(container, params);


    var defaults = {
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      // autoplay
      autoplay: false,
      autoplayDisableOnInteraction: true,
      autoplayStopOnLast: false,
      // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
      iOSEdgeSwipeDetection: false,
      iOSEdgeSwipeThreshold: 20,
      // Free mode
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: true,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: false,
      freeModeMinimumVelocity: 0.02,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      flip: {
        slideShadows: true,
        limitRotation: true
      },
      cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      },
      fade: {
        crossFade: false
      },
      // Parallax
      parallax: false,
      // Zoom
      zoom: false,
      zoomMax: 3,
      zoomMin: 1,
      zoomToggle: true,
      // Scrollbar
      scrollbar: null,
      scrollbarHide: true,
      scrollbarDraggable: false,
      scrollbarSnapOnRelease: false,
      // Keyboard Mousewheel
      keyboardControl: false,
      mousewheelControl: false,
      mousewheelReleaseOnEdges: false,
      mousewheelInvert: false,
      mousewheelForceToAxis: false,
      mousewheelSensitivity: 1,
      mousewheelEventsTarged: 'container',
      // Hash Navigation
      hashnav: false,
      hashnavWatchState: false,
      // History
      history: false,
      // Commong Nav State
      replaceState: false,
      // Breakpoints
      breakpoints: undefined,
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      centeredSlides: false,
      slidesOffsetBefore: 0, // in px
      slidesOffsetAfter: 0, // in px
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      onlyExternal: false,
      threshold: 0,
      touchMoveStopPropagation: true,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Pagination
      pagination: null,
      paginationElement: 'span',
      paginationClickable: false,
      paginationHide: false,
      paginationBulletRender: null,
      paginationProgressRender: null,
      paginationFractionRender: null,
      paginationCustomRender: null,
      paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Next/prev buttons
      nextButton: null,
      prevButton: null,
      // Progress
      watchSlidesProgress: false,
      watchSlidesVisibility: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // Lazy Loading
      lazyLoading: false,
      lazyLoadingInPrevNext: false,
      lazyLoadingInPrevNextAmount: 1,
      lazyLoadingOnTransitionStart: false,
      // Images
      preloadImages: true,
      updateOnImagesReady: true,
      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      // Control
      control: undefined,
      controlInverse: false,
      controlBy: 'slide', //or 'container'
      normalizeSlideIndex: true,
      // Swiping/no swiping
      allowSwipeToPrev: true,
      allowSwipeToNext: true,
      swipeHandler: null, //'.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      // Passive Listeners
      passiveListeners: true,
      // NS
      containerModifierClass: 'swiper-container-', // NEW
      slideClass: 'swiper-slide',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      buttonDisabledClass: 'swiper-button-disabled',
      paginationCurrentClass: 'swiper-pagination-current',
      paginationTotalClass: 'swiper-pagination-total',
      paginationHiddenClass: 'swiper-pagination-hidden',
      paginationProgressbarClass: 'swiper-pagination-progressbar',
      paginationClickableClass: 'swiper-pagination-clickable', // NEW
      paginationModifierClass: 'swiper-pagination-', // NEW
      lazyLoadingClass: 'swiper-lazy',
      lazyStatusLoadingClass: 'swiper-lazy-loading',
      lazyStatusLoadedClass: 'swiper-lazy-loaded',
      lazyPreloaderClass: 'swiper-lazy-preloader',
      notificationClass: 'swiper-notification',
      preloaderClass: 'preloader',
      zoomContainerClass: 'swiper-zoom-container',

      // Observer
      observer: false,
      observeParents: false,
      // Accessibility
      a11y: false,
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      // Callbacks
      runCallbacksOnInit: true
      /*
      Callbacks:
      onInit: function (swiper)
      onDestroy: function (swiper)
      onBeforeResize: function (swiper)
      onAfterResize: function (swiper)
      onClick: function (swiper, e)
      onTap: function (swiper, e)
      onDoubleTap: function (swiper, e)
      onSliderMove: function (swiper, e)
      onSlideChangeStart: function (swiper)
      onSlideChangeEnd: function (swiper)
      onTransitionStart: function (swiper)
      onTransitionEnd: function (swiper)
      onImagesReady: function (swiper)
      onProgress: function (swiper, progress)
      onTouchStart: function (swiper, e)
      onTouchMove: function (swiper, e)
      onTouchMoveOpposite: function (swiper, e)
      onTouchEnd: function (swiper, e)
      onReachBeginning: function (swiper)
      onReachEnd: function (swiper)
      onSetTransition: function (swiper, duration)
      onSetTranslate: function (swiper, translate)
      onAutoplayStart: function (swiper)
      onAutoplayStop: function (swiper),
      onLazyImageLoad: function (swiper, slide, image)
      onLazyImageReady: function (swiper, slide, image)
      onKeyPress: function (swiper, keyCode)
      */

    };
    var initialVirtualTranslate = params && params.virtualTranslate;

    params = params || {};
    var originalParams = {};
    for (var param in params) {
      if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
        originalParams[param] = {};
        for (var deepParam in params[param]) {
          originalParams[param][deepParam] = params[param][deepParam];
        }
      }
      else {
        originalParams[param] = params[param];
      }
    }
    for (var def in defaults) {
      if (typeof params[def] === 'undefined') {
        params[def] = defaults[def];
      }
      else if (typeof params[def] === 'object') {
        for (var deepDef in defaults[def]) {
          if (typeof params[def][deepDef] === 'undefined') {
            params[def][deepDef] = defaults[def][deepDef];
          }
        }
      }
    }

    // Swiper
    var s = this;

    // Params
    s.params = params;
    s.originalParams = originalParams;

    // Classname
    s.classNames = [];
    /*=========================
      Dom Library and plugins
      ===========================*/
    if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
      $ = Dom7;
    }
    if (typeof $ === 'undefined') {
      if (typeof Dom7 === 'undefined') {
        $ = window.Dom7 || window.Zepto || window.jQuery;
      }
      else {
        $ = Dom7;
      }
      if (!$) return;
    }
    // Export it to Swiper instance
    s.$ = $;

    /*=========================
      Breakpoints
      ===========================*/
    s.currentBreakpoint = undefined;
    s.getActiveBreakpoint = function () {
      //Get breakpoint for window width
      if (!s.params.breakpoints) return false;
      var breakpoint = false;
      var points = [], point;
      for (point in s.params.breakpoints) {
        if (s.params.breakpoints.hasOwnProperty(point)) {
          points.push(point);
        }
      }
      points.sort(function (a, b) {
        return parseInt(a, 10) > parseInt(b, 10);
      });
      for (var i = 0; i < points.length; i++) {
        point = points[i];
        if (point >= window.innerWidth && !breakpoint) {
          breakpoint = point;
        }
      }
      return breakpoint || 'max';
    };
    s.setBreakpoint = function () {
      //Set breakpoint for window width and update parameters
      var breakpoint = s.getActiveBreakpoint();
      if (breakpoint && s.currentBreakpoint !== breakpoint) {
        var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
        var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
        for (var param in breakPointsParams) {
          s.params[param] = breakPointsParams[param];
        }
        s.currentBreakpoint = breakpoint;
        if (needsReLoop && s.destroyLoop) {
          s.reLoop(true);
        }
      }
    };
    // Set breakpoint on load
    if (s.params.breakpoints) {
      s.setBreakpoint();
    }

    /*=========================
      Preparation - Define Container, Wrapper and Pagination
      ===========================*/
    s.container = $(container);
    if (s.container.length === 0) return;
    if (s.container.length > 1) {
      var swipers = [];
      s.container.each(function () {
        var container = this;
        swipers.push(new Swiper(this, params));
      });
      return swipers;
    }

    // Save instance in container HTML Element and in data
    s.container[0].swiper = s;
    s.container.data('swiper', s);

    s.classNames.push(s.params.containerModifierClass + s.params.direction);

    if (s.params.freeMode) {
      s.classNames.push(s.params.containerModifierClass + 'free-mode');
    }
    if (!s.support.flexbox) {
      s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
      s.params.slidesPerColumn = 1;
    }
    if (s.params.autoHeight) {
      s.classNames.push(s.params.containerModifierClass + 'autoheight');
    }
    // Enable slides progress when required
    if (s.params.parallax || s.params.watchSlidesVisibility) {
      s.params.watchSlidesProgress = true;
    }
    // Max resistance when touchReleaseOnEdges
    if (s.params.touchReleaseOnEdges) {
      s.params.resistanceRatio = 0;
    }
    // Coverflow / 3D
    if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
      if (s.support.transforms3d) {
        s.params.watchSlidesProgress = true;
        s.classNames.push(s.params.containerModifierClass + '3d');
      }
      else {
        s.params.effect = 'slide';
      }
    }
    if (s.params.effect !== 'slide') {
      s.classNames.push(s.params.containerModifierClass + s.params.effect);
    }
    if (s.params.effect === 'cube') {
      s.params.resistanceRatio = 0;
      s.params.slidesPerView = 1;
      s.params.slidesPerColumn = 1;
      s.params.slidesPerGroup = 1;
      s.params.centeredSlides = false;
      s.params.spaceBetween = 0;
      s.params.virtualTranslate = true;
    }
    if (s.params.effect === 'fade' || s.params.effect === 'flip') {
      s.params.slidesPerView = 1;
      s.params.slidesPerColumn = 1;
      s.params.slidesPerGroup = 1;
      s.params.watchSlidesProgress = true;
      s.params.spaceBetween = 0;
      if (typeof initialVirtualTranslate === 'undefined') {
        s.params.virtualTranslate = true;
      }
    }

    // Grab Cursor
    if (s.params.grabCursor && s.support.touch) {
      s.params.grabCursor = false;
    }

    // Wrapper
    s.wrapper = s.container.children('.' + s.params.wrapperClass);

    // Pagination
    if (s.params.pagination) {
      s.paginationContainer = $(s.params.pagination);
      if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
        s.paginationContainer = s.container.find(s.params.pagination);
      }

      if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
        s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
      }
      else {
        s.params.paginationClickable = false;
      }
      s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
    }
    // Next/Prev Buttons
    if (s.params.nextButton || s.params.prevButton) {
      if (s.params.nextButton) {
        s.nextButton = $(s.params.nextButton);
        if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
          s.nextButton = s.container.find(s.params.nextButton);
        }
      }
      if (s.params.prevButton) {
        s.prevButton = $(s.params.prevButton);
        if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
          s.prevButton = s.container.find(s.params.prevButton);
        }
      }
    }

    // Is Horizontal
    s.isHorizontal = function () {
      return s.params.direction === 'horizontal';
    };
    // s.isH = isH;

    // RTL
    s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
    if (s.rtl) {
      s.classNames.push(s.params.containerModifierClass + 'rtl');
    }

    // Wrong RTL support
    if (s.rtl) {
      s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
    }

    // Columns
    if (s.params.slidesPerColumn > 1) {
      s.classNames.push(s.params.containerModifierClass + 'multirow');
    }

    // Check for Android
    if (s.device.android) {
      s.classNames.push(s.params.containerModifierClass + 'android');
    }

    // Add classes
    s.container.addClass(s.classNames.join(' '));

    // Translate
    s.translate = 0;

    // Progress
    s.progress = 0;

    // Velocity
    s.velocity = 0;

    /*=========================
      Locks, unlocks
      ===========================*/
    s.lockSwipeToNext = function () {
      s.params.allowSwipeToNext = false;
      if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
        s.unsetGrabCursor();
      }
    };
    s.lockSwipeToPrev = function () {
      s.params.allowSwipeToPrev = false;
      if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
        s.unsetGrabCursor();
      }
    };
    s.lockSwipes = function () {
      s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
      if (s.params.grabCursor) s.unsetGrabCursor();
    };
    s.unlockSwipeToNext = function () {
      s.params.allowSwipeToNext = true;
      if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
        s.setGrabCursor();
      }
    };
    s.unlockSwipeToPrev = function () {
      s.params.allowSwipeToPrev = true;
      if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
        s.setGrabCursor();
      }
    };
    s.unlockSwipes = function () {
      s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
      if (s.params.grabCursor) s.setGrabCursor();
    };

    /*=========================
      Round helper
      ===========================*/
    function round(a) {
      return Math.floor(a);
    }
    /*=========================
      Set grab cursor
      ===========================*/
    s.setGrabCursor = function (moving) {
      s.container[0].style.cursor = 'move';
      s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
      s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
      s.container[0].style.cursor = moving ? 'grabbing' : 'grab';
    };
    s.unsetGrabCursor = function () {
      s.container[0].style.cursor = '';
    };
    if (s.params.grabCursor) {
      s.setGrabCursor();
    }
    /*=========================
      Update on Images Ready
      ===========================*/
    s.imagesToLoad = [];
    s.imagesLoaded = 0;

    s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
      var image;
      function onReady() {
        if (callback) callback();
      }
      if (!imgElement.complete || !checkForComplete) {
        if (src) {
          image = new window.Image();
          image.onload = onReady;
          image.onerror = onReady;
          if (sizes) {
            image.sizes = sizes;
          }
          if (srcset) {
            image.srcset = srcset;
          }
          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }

      } else {//image already loaded...
        onReady();
      }
    };
    s.preloadImages = function () {
      s.imagesToLoad = s.container.find('img');
      function _onReady() {
        if (typeof s === 'undefined' || s === null || !s) return;
        if (s.imagesLoaded !== undefined) s.imagesLoaded++;
        if (s.imagesLoaded === s.imagesToLoad.length) {
          if (s.params.updateOnImagesReady) s.update();
          s.emit('onImagesReady', s);
        }
      }
      for (var i = 0; i < s.imagesToLoad.length; i++) {
        s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
      }
    };

    /*=========================
      Autoplay
      ===========================*/
    s.autoplayTimeoutId = undefined;
    s.autoplaying = false;
    s.autoplayPaused = false;
    function autoplay() {
      var autoplayDelay = s.params.autoplay;
      var activeSlide = s.slides.eq(s.activeIndex);
      if (activeSlide.attr('data-swiper-autoplay')) {
        autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
      }
      s.autoplayTimeoutId = setTimeout(function () {
        if (s.params.loop) {
          s.fixLoop();
          s._slideNext();
          s.emit('onAutoplay', s);
        }
        else {
          if (!s.isEnd) {
            s._slideNext();
            s.emit('onAutoplay', s);
          }
          else {
            if (!params.autoplayStopOnLast) {
              s._slideTo(0);
              s.emit('onAutoplay', s);
            }
            else {
              s.stopAutoplay();
            }
          }
        }
      }, autoplayDelay);
    }
    s.startAutoplay = function () {
      if (typeof s.autoplayTimeoutId !== 'undefined') return false;
      if (!s.params.autoplay) return false;
      if (s.autoplaying) return false;
      s.autoplaying = true;
      s.emit('onAutoplayStart', s);
      autoplay();
    };
    s.stopAutoplay = function (internal) {
      if (!s.autoplayTimeoutId) return;
      if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
      s.autoplaying = false;
      s.autoplayTimeoutId = undefined;
      s.emit('onAutoplayStop', s);
    };
    s.pauseAutoplay = function (speed) {
      if (s.autoplayPaused) return;
      if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
      s.autoplayPaused = true;
      if (speed === 0) {
        s.autoplayPaused = false;
        autoplay();
      }
      else {
        s.wrapper.transitionEnd(function () {
          if (!s) return;
          s.autoplayPaused = false;
          if (!s.autoplaying) {
            s.stopAutoplay();
          }
          else {
            autoplay();
          }
        });
      }
    };
    /*=========================
      Min/Max Translate
      ===========================*/
    s.minTranslate = function () {
      return (-s.snapGrid[0]);
    };
    s.maxTranslate = function () {
      return (-s.snapGrid[s.snapGrid.length - 1]);
    };
    /*=========================
      Slider/slides sizes
      ===========================*/
    s.updateAutoHeight = function () {
      var activeSlides = [];
      var newHeight = 0;
      var i;

      // Find slides currently in view
      if (s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
        for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
          var index = s.activeIndex + i;
          if (index > s.slides.length) break;
          activeSlides.push(s.slides.eq(index)[0]);
        }
      } else {
        activeSlides.push(s.slides.eq(s.activeIndex)[0]);
      }

      // Find new height from heighest slide in view
      for (i = 0; i < activeSlides.length; i++) {
        if (typeof activeSlides[i] !== 'undefined') {
          var height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      }

      // Update Height
      if (newHeight) s.wrapper.css('height', newHeight + 'px');
    };
    s.updateContainerSize = function () {
      var width, height;
      if (typeof s.params.width !== 'undefined') {
        width = s.params.width;
      }
      else {
        width = s.container[0].clientWidth;
      }
      if (typeof s.params.height !== 'undefined') {
        height = s.params.height;
      }
      else {
        height = s.container[0].clientHeight;
      }
      if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
        return;
      }

      //Subtract paddings
      width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
      height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);

      // Store values
      s.width = width;
      s.height = height;
      s.size = s.isHorizontal() ? s.width : s.height;
    };

    s.updateSlidesSize = function () {
      s.slides = s.wrapper.children('.' + s.params.slideClass);
      s.snapGrid = [];
      s.slidesGrid = [];
      s.slidesSizesGrid = [];

      var spaceBetween = s.params.spaceBetween,
        slidePosition = -s.params.slidesOffsetBefore,
        i,
        prevSlideSize = 0,
        index = 0;
      if (typeof s.size === 'undefined') return;
      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
      }

      s.virtualSize = -spaceBetween;
      // reset margins
      if (s.rtl) s.slides.css({ marginLeft: '', marginTop: '' });
      else s.slides.css({ marginRight: '', marginBottom: '' });

      var slidesNumberEvenToRows;
      if (s.params.slidesPerColumn > 1) {
        if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
          slidesNumberEvenToRows = s.slides.length;
        }
        else {
          slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
        }
        if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
        }
      }

      // Calc slides
      var slideSize;
      var slidesPerColumn = s.params.slidesPerColumn;
      var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
      var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
      for (i = 0; i < s.slides.length; i++) {
        slideSize = 0;
        var slide = s.slides.eq(i);
        if (s.params.slidesPerColumn > 1) {
          // Set slides order
          var newSlideOrderIndex;
          var column, row;
          if (s.params.slidesPerColumnFill === 'column') {
            column = Math.floor(i / slidesPerColumn);
            row = i - column * slidesPerColumn;
            if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
              if (++row >= slidesPerColumn) {
                row = 0;
                column++;
              }
            }
            newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
            slide
              .css({
                '-webkit-box-ordinal-group': newSlideOrderIndex,
                '-moz-box-ordinal-group': newSlideOrderIndex,
                '-ms-flex-order': newSlideOrderIndex,
                '-webkit-order': newSlideOrderIndex,
                'order': newSlideOrderIndex
              });
          }
          else {
            row = Math.floor(i / slidesPerRow);
            column = i - row * slidesPerRow;
          }
          slide
            .css(
              'margin-' + (s.isHorizontal() ? 'top' : 'left'),
              (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
            )
            .attr('data-swiper-column', column)
            .attr('data-swiper-row', row);

        }
        if (slide.css('display') === 'none') continue;
        if (s.params.slidesPerView === 'auto') {
          slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
          if (s.params.roundLengths) slideSize = round(slideSize);
        }
        else {
          slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
          if (s.params.roundLengths) slideSize = round(slideSize);

          if (s.isHorizontal()) {
            s.slides[i].style.width = slideSize + 'px';
          }
          else {
            s.slides[i].style.height = slideSize + 'px';
          }
        }
        s.slides[i].swiperSlideSize = slideSize;
        s.slidesSizesGrid.push(slideSize);


        if (s.params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
          if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
          if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
          s.slidesGrid.push(slidePosition);
        }
        else {
          if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
          s.slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        s.virtualSize += slideSize + spaceBetween;

        prevSlideSize = slideSize;

        index++;
      }
      s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
      var newSlidesGrid;

      if (
        s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
        s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
      }
      if (!s.support.flexbox || s.params.setWrapperSize) {
        if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
        else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
      }

      if (s.params.slidesPerColumn > 1) {
        s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
        s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
        if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
        else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
        if (s.params.centeredSlides) {
          newSlidesGrid = [];
          for (i = 0; i < s.snapGrid.length; i++) {
            if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
          }
          s.snapGrid = newSlidesGrid;
        }
      }

      // Remove last grid elements depending on width
      if (!s.params.centeredSlides) {
        newSlidesGrid = [];
        for (i = 0; i < s.snapGrid.length; i++) {
          if (s.snapGrid[i] <= s.virtualSize - s.size) {
            newSlidesGrid.push(s.snapGrid[i]);
          }
        }
        s.snapGrid = newSlidesGrid;
        if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
          s.snapGrid.push(s.virtualSize - s.size);
        }
      }
      if (s.snapGrid.length === 0) s.snapGrid = [0];

      if (s.params.spaceBetween !== 0) {
        if (s.isHorizontal()) {
          if (s.rtl) s.slides.css({ marginLeft: spaceBetween + 'px' });
          else s.slides.css({ marginRight: spaceBetween + 'px' });
        }
        else s.slides.css({ marginBottom: spaceBetween + 'px' });
      }
      if (s.params.watchSlidesProgress) {
        s.updateSlidesOffset();
      }
    };
    s.updateSlidesOffset = function () {
      for (var i = 0; i < s.slides.length; i++) {
        s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
      }
    };

    /*=========================
      Dynamic Slides Per View
      ===========================*/
    s.currentSlidesPerView = function () {
      var spv = 1, i, j;
      if (s.params.centeredSlides) {
        var size = s.slides[s.activeIndex].swiperSlideSize;
        var breakLoop;
        for (i = s.activeIndex + 1; i < s.slides.length; i++) {
          if (s.slides[i] && !breakLoop) {
            size += s.slides[i].swiperSlideSize;
            spv++;
            if (size > s.size) breakLoop = true;
          }
        }
        for (j = s.activeIndex - 1; j >= 0; j--) {
          if (s.slides[j] && !breakLoop) {
            size += s.slides[j].swiperSlideSize;
            spv++;
            if (size > s.size) breakLoop = true;
          }
        }
      }
      else {
        for (i = s.activeIndex + 1; i < s.slides.length; i++) {
          if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
            spv++;
          }
        }
      }
      return spv;
    };
    /*=========================
      Slider/slides progress
      ===========================*/
    s.updateSlidesProgress = function (translate) {
      if (typeof translate === 'undefined') {
        translate = s.translate || 0;
      }
      if (s.slides.length === 0) return;
      if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();

      var offsetCenter = -translate;
      if (s.rtl) offsetCenter = translate;

      // Visible Slides
      s.slides.removeClass(s.params.slideVisibleClass);
      for (var i = 0; i < s.slides.length; i++) {
        var slide = s.slides[i];
        var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
        if (s.params.watchSlidesVisibility) {
          var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
          var slideAfter = slideBefore + s.slidesSizesGrid[i];
          var isVisible =
            (slideBefore >= 0 && slideBefore < s.size) ||
            (slideAfter > 0 && slideAfter <= s.size) ||
            (slideBefore <= 0 && slideAfter >= s.size);
          if (isVisible) {
            s.slides.eq(i).addClass(s.params.slideVisibleClass);
          }
        }
        slide.progress = s.rtl ? -slideProgress : slideProgress;
      }
    };
    s.updateProgress = function (translate) {
      if (typeof translate === 'undefined') {
        translate = s.translate || 0;
      }
      var translatesDiff = s.maxTranslate() - s.minTranslate();
      var wasBeginning = s.isBeginning;
      var wasEnd = s.isEnd;
      if (translatesDiff === 0) {
        s.progress = 0;
        s.isBeginning = s.isEnd = true;
      }
      else {
        s.progress = (translate - s.minTranslate()) / (translatesDiff);
        s.isBeginning = s.progress <= 0;
        s.isEnd = s.progress >= 1;
      }
      if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
      if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);

      if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
      s.emit('onProgress', s, s.progress);
    };
    s.updateActiveIndex = function () {
      var translate = s.rtl ? s.translate : -s.translate;
      var newActiveIndex, i, snapIndex;
      for (i = 0; i < s.slidesGrid.length; i++) {
        if (typeof s.slidesGrid[i + 1] !== 'undefined') {
          if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
            newActiveIndex = i;
          }
          else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
            newActiveIndex = i + 1;
          }
        }
        else {
          if (translate >= s.slidesGrid[i]) {
            newActiveIndex = i;
          }
        }
      }
      // Normalize slideIndex
      if (s.params.normalizeSlideIndex) {
        if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
      }
      // for (i = 0; i < s.slidesGrid.length; i++) {
      // if (- translate >= s.slidesGrid[i]) {
      // newActiveIndex = i;
      // }
      // }
      snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
      if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

      if (newActiveIndex === s.activeIndex) {
        return;
      }
      s.snapIndex = snapIndex;
      s.previousIndex = s.activeIndex;
      s.activeIndex = newActiveIndex;
      s.updateClasses();
      s.updateRealIndex();
    };
    s.updateRealIndex = function () {
      s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
    };

    /*=========================
      Classes
      ===========================*/
    s.updateClasses = function () {
      s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
      var activeSlide = s.slides.eq(s.activeIndex);
      // Active classes
      activeSlide.addClass(s.params.slideActiveClass);
      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
        }
        else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
        }
      }
      // Next Slide
      var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
      if (s.params.loop && nextSlide.length === 0) {
        nextSlide = s.slides.eq(0);
        nextSlide.addClass(s.params.slideNextClass);
      }
      // Prev Slide
      var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
      if (s.params.loop && prevSlide.length === 0) {
        prevSlide = s.slides.eq(-1);
        prevSlide.addClass(s.params.slidePrevClass);
      }
      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
        }
        else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
        }
        if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
        }
        else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
        }
      }

      // Pagination
      if (s.paginationContainer && s.paginationContainer.length > 0) {
        // Current/Total
        var current,
          total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
        if (s.params.loop) {
          current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
          if (current > s.slides.length - 1 - s.loopedSlides * 2) {
            current = current - (s.slides.length - s.loopedSlides * 2);
          }
          if (current > total - 1) current = current - total;
          if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
        }
        else {
          if (typeof s.snapIndex !== 'undefined') {
            current = s.snapIndex;
          }
          else {
            current = s.activeIndex || 0;
          }
        }
        // Types
        if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
          s.bullets.removeClass(s.params.bulletActiveClass);
          if (s.paginationContainer.length > 1) {
            s.bullets.each(function () {
              if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
            });
          }
          else {
            s.bullets.eq(current).addClass(s.params.bulletActiveClass);
          }
        }
        if (s.params.paginationType === 'fraction') {
          s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
          s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
        }
        if (s.params.paginationType === 'progress') {
          var scale = (current + 1) / total,
            scaleX = scale,
            scaleY = 1;
          if (!s.isHorizontal()) {
            scaleY = scale;
            scaleX = 1;
          }
          s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
        }
        if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
          s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
          s.emit('onPaginationRendered', s, s.paginationContainer[0]);
        }
      }

      // Next/active buttons
      if (!s.params.loop) {
        if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
          if (s.isBeginning) {
            s.prevButton.addClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
          }
          else {
            s.prevButton.removeClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
          }
        }
        if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
          if (s.isEnd) {
            s.nextButton.addClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
          }
          else {
            s.nextButton.removeClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
          }
        }
      }
    };

    /*=========================
      Pagination
      ===========================*/
    s.updatePagination = function () {
      if (!s.params.pagination) return;
      if (s.paginationContainer && s.paginationContainer.length > 0) {
        var paginationHTML = '';
        if (s.params.paginationType === 'bullets') {
          var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
          for (var i = 0; i < numberOfBullets; i++) {
            if (s.params.paginationBulletRender) {
              paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
            }
            else {
              paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
            }
          }
          s.paginationContainer.html(paginationHTML);
          s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
          if (s.params.paginationClickable && s.params.a11y && s.a11y) {
            s.a11y.initPagination();
          }
        }
        if (s.params.paginationType === 'fraction') {
          if (s.params.paginationFractionRender) {
            paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
          }
          else {
            paginationHTML =
              '<span class="' + s.params.paginationCurrentClass + '"></span>' +
              ' / ' +
              '<span class="' + s.params.paginationTotalClass + '"></span>';
          }
          s.paginationContainer.html(paginationHTML);
        }
        if (s.params.paginationType === 'progress') {
          if (s.params.paginationProgressRender) {
            paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
          }
          else {
            paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
          }
          s.paginationContainer.html(paginationHTML);
        }
        if (s.params.paginationType !== 'custom') {
          s.emit('onPaginationRendered', s, s.paginationContainer[0]);
        }
      }
    };
    /*=========================
      Common update method
      ===========================*/
    s.update = function (updateTranslate) {
      if (!s) return;
      s.updateContainerSize();
      s.updateSlidesSize();
      s.updateProgress();
      s.updatePagination();
      s.updateClasses();
      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
      }
      var newTranslate;
      function forceSetTranslate() {
        var translate = s.rtl ? -s.translate : s.translate;
        newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
        s.setWrapperTranslate(newTranslate);
        s.updateActiveIndex();
        s.updateClasses();
      }
      if (updateTranslate) {
        var translated;
        if (s.controller && s.controller.spline) {
          s.controller.spline = undefined;
        }
        if (s.params.freeMode) {
          forceSetTranslate();
          if (s.params.autoHeight) {
            s.updateAutoHeight();
          }
        }
        else {
          if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
            translated = s.slideTo(s.slides.length - 1, 0, false, true);
          }
          else {
            translated = s.slideTo(s.activeIndex, 0, false, true);
          }
          if (!translated) {
            forceSetTranslate();
          }
        }
      }
      else if (s.params.autoHeight) {
        s.updateAutoHeight();
      }
    };

    /*=========================
      Resize Handler
      ===========================*/
    s.onResize = function (forceUpdatePagination) {
      if (s.params.onBeforeResize) s.params.onBeforeResize(s);
      //Breakpoints
      if (s.params.breakpoints) {
        s.setBreakpoint();
      }

      // Disable locks on resize
      var allowSwipeToPrev = s.params.allowSwipeToPrev;
      var allowSwipeToNext = s.params.allowSwipeToNext;
      s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;

      s.updateContainerSize();
      s.updateSlidesSize();
      if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
      }
      if (s.controller && s.controller.spline) {
        s.controller.spline = undefined;
      }
      var slideChangedBySlideTo = false;
      if (s.params.freeMode) {
        var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
        s.setWrapperTranslate(newTranslate);
        s.updateActiveIndex();
        s.updateClasses();

        if (s.params.autoHeight) {
          s.updateAutoHeight();
        }
      }
      else {
        s.updateClasses();
        if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
          slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
        }
        else {
          slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
        }
      }
      if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
        s.lazy.load();
      }
      // Return locks after resize
      s.params.allowSwipeToPrev = allowSwipeToPrev;
      s.params.allowSwipeToNext = allowSwipeToNext;
      if (s.params.onAfterResize) s.params.onAfterResize(s);
    };

    /*=========================
      Events
      ===========================*/

    //Define Touch Events
    s.touchEventsDesktop = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };
    if (window.navigator.pointerEnabled) s.touchEventsDesktop = { start: 'pointerdown', move: 'pointermove', end: 'pointerup' };
    else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' };
    s.touchEvents = {
      start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : s.touchEventsDesktop.start,
      move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
      end: s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
    };


    // WP8 Touch Events Fix
    if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
      (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
    }

    // Attach/detach events
    s.initEvents = function (detach) {
      var actionDom = detach ? 'off' : 'on';
      var action = detach ? 'removeEventListener' : 'addEventListener';
      var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
      var target = s.support.touch ? touchEventsTarget : document;

      var moveCapture = s.params.nested ? true : false;

      //Touch Events
      if (s.browser.ie) {
        touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
        target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
        target[action](s.touchEvents.end, s.onTouchEnd, false);
      }
      else {
        if (s.support.touch) {
          var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
          touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
          touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
          touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
          touchEventsTarget[action]('mousedown', s.onTouchStart, false);
          document[action]('mousemove', s.onTouchMove, moveCapture);
          document[action]('mouseup', s.onTouchEnd, false);
        }
      }
      window[action]('resize', s.onResize);

      // Next, Prev, Index
      if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
        s.nextButton[actionDom]('click', s.onClickNext);
        if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
      }
      if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
        s.prevButton[actionDom]('click', s.onClickPrev);
        if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
      }
      if (s.params.pagination && s.params.paginationClickable) {
        s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
        if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
      }

      // Prevent Links Clicks
      if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
    };
    s.attachEvents = function () {
      s.initEvents();
    };
    s.detachEvents = function () {
      s.initEvents(true);
    };

    /*=========================
      Handle Clicks
      ===========================*/
    // Prevent Clicks
    s.allowClick = true;
    s.preventClicks = function (e) {
      if (!s.allowClick) {
        if (s.params.preventClicks) e.preventDefault();
        if (s.params.preventClicksPropagation && s.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    };
    // Clicks
    s.onClickNext = function (e) {
      e.preventDefault();
      if (s.isEnd && !s.params.loop) return;
      s.slideNext();
    };
    s.onClickPrev = function (e) {
      e.preventDefault();
      if (s.isBeginning && !s.params.loop) return;
      s.slidePrev();
    };
    s.onClickIndex = function (e) {
      e.preventDefault();
      var index = $(this).index() * s.params.slidesPerGroup;
      if (s.params.loop) index = index + s.loopedSlides;
      s.slideTo(index);
    };

    /*=========================
      Handle Touches
      ===========================*/
    function findElementInEvent(e, selector) {
      var el = $(e.target);
      if (!el.is(selector)) {
        if (typeof selector === 'string') {
          el = el.parents(selector);
        }
        else if (selector.nodeType) {
          var found;
          el.parents().each(function (index, _el) {
            if (_el === selector) found = selector;
          });
          if (!found) return undefined;
          else return selector;
        }
      }
      if (el.length === 0) {
        return undefined;
      }
      return el[0];
    }
    s.updateClickedSlide = function (e) {
      var slide = findElementInEvent(e, '.' + s.params.slideClass);
      var slideFound = false;
      if (slide) {
        for (var i = 0; i < s.slides.length; i++) {
          if (s.slides[i] === slide) slideFound = true;
        }
      }

      if (slide && slideFound) {
        s.clickedSlide = slide;
        s.clickedIndex = $(slide).index();
      }
      else {
        s.clickedSlide = undefined;
        s.clickedIndex = undefined;
        return;
      }
      if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
        var slideToIndex = s.clickedIndex,
          realIndex,
          duplicatedSlides,
          slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
        if (s.params.loop) {
          if (s.animating) return;
          realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
          if (s.params.centeredSlides) {
            if ((slideToIndex < s.loopedSlides - slidesPerView / 2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2)) {
              s.fixLoop();
              slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
              setTimeout(function () {
                s.slideTo(slideToIndex);
              }, 0);
            }
            else {
              s.slideTo(slideToIndex);
            }
          }
          else {
            if (slideToIndex > s.slides.length - slidesPerView) {
              s.fixLoop();
              slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
              setTimeout(function () {
                s.slideTo(slideToIndex);
              }, 0);
            }
            else {
              s.slideTo(slideToIndex);
            }
          }
        }
        else {
          s.slideTo(slideToIndex);
        }
      }
    };

    var isTouched,
      isMoved,
      allowTouchCallbacks,
      touchStartTime,
      isScrolling,
      currentTranslate,
      startTranslate,
      allowThresholdMove,
      // Form elements to match
      formElements = 'input, select, textarea, button, video',
      // Last click time
      lastClickTime = Date.now(), clickTimeout,
      //Velocities
      velocities = [],
      allowMomentumBounce;

    // Animating Flag
    s.animating = false;

    // Touches information
    s.touches = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      diff: 0
    };

    // Touch handlers
    var isTouchEvent, startMoving;
    s.onTouchStart = function (e) {
      if (e.originalEvent) e = e.originalEvent;
      isTouchEvent = e.type === 'touchstart';
      if (!isTouchEvent && 'which' in e && e.which === 3) return;
      if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
        s.allowClick = true;
        return;
      }
      if (s.params.swipeHandler) {
        if (!findElementInEvent(e, s.params.swipeHandler)) return;
      }

      var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
      if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
        return;
      }

      isTouched = true;
      isMoved = false;
      allowTouchCallbacks = true;
      isScrolling = undefined;
      startMoving = undefined;
      s.touches.startX = startX;
      s.touches.startY = startY;
      touchStartTime = Date.now();
      s.allowClick = true;
      s.updateContainerSize();
      s.swipeDirection = undefined;
      if (s.params.threshold > 0) allowThresholdMove = false;
      if (e.type !== 'touchstart') {
        var preventDefault = true;
        if ($(e.target).is(formElements)) preventDefault = false;
        if (document.activeElement && $(document.activeElement).is(formElements)) {
          document.activeElement.blur();
        }
        if (preventDefault) {
          e.preventDefault();
        }
      }
      s.emit('onTouchStart', s, e);
    };

    s.onTouchMove = function (e) {
      if (e.originalEvent) e = e.originalEvent;
      if (isTouchEvent && e.type === 'mousemove') return;
      if (e.preventedByNestedSwiper) {
        s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        return;
      }
      if (s.params.onlyExternal) {
        // isMoved = true;
        s.allowClick = false;
        if (isTouched) {
          s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
          s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
          touchStartTime = Date.now();
        }
        return;
      }
      if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
        if (!s.isHorizontal()) {
          // Vertical
          if (
            (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
            (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
          ) {
            return;
          }
        }
        else {
          if (
            (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
            (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
          ) {
            return;
          }
        }
      }
      if (isTouchEvent && document.activeElement) {
        if (e.target === document.activeElement && $(e.target).is(formElements)) {
          isMoved = true;
          s.allowClick = false;
          return;
        }
      }
      if (allowTouchCallbacks) {
        s.emit('onTouchMove', s, e);
      }
      if (e.targetTouches && e.targetTouches.length > 1) return;

      s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        var touchAngle;
        if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
          isScrolling = false;
        }
        else {
          touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
          isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
        }
      }
      if (isScrolling) {
        s.emit('onTouchMoveOpposite', s, e);
      }
      if (typeof startMoving === 'undefined') {
        if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
          startMoving = true;
        }
      }
      if (!isTouched) return;
      if (isScrolling) {
        isTouched = false;
        return;
      }
      if (!startMoving) {
        return;
      }
      s.allowClick = false;
      s.emit('onSliderMove', s, e);
      e.preventDefault();
      if (s.params.touchMoveStopPropagation && !s.params.nested) {
        e.stopPropagation();
      }

      if (!isMoved) {
        if (params.loop) {
          s.fixLoop();
        }
        startTranslate = s.getWrapperTranslate();
        s.setWrapperTransition(0);
        if (s.animating) {
          s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
        }
        if (s.params.autoplay && s.autoplaying) {
          if (s.params.autoplayDisableOnInteraction) {
            s.stopAutoplay();
          }
          else {
            s.pauseAutoplay();
          }
        }
        allowMomentumBounce = false;
        //Grab Cursor
        if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
          s.setGrabCursor(true);
        }
      }
      isMoved = true;

      var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;

      diff = diff * s.params.touchRatio;
      if (s.rtl) diff = -diff;

      s.swipeDirection = diff > 0 ? 'prev' : 'next';
      currentTranslate = diff + startTranslate;

      var disableParentSwiper = true;
      if ((diff > 0 && currentTranslate > s.minTranslate())) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
      }
      else if (diff < 0 && currentTranslate < s.maxTranslate()) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      }

      // Directions locks
      if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
        currentTranslate = startTranslate;
      }
      if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
        currentTranslate = startTranslate;
      }


      // Threshold
      if (s.params.threshold > 0) {
        if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
          if (!allowThresholdMove) {
            allowThresholdMove = true;
            s.touches.startX = s.touches.currentX;
            s.touches.startY = s.touches.currentY;
            currentTranslate = startTranslate;
            s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
            return;
          }
        }
        else {
          currentTranslate = startTranslate;
          return;
        }
      }

      if (!s.params.followFinger) return;

      // Update active index in free mode
      if (s.params.freeMode || s.params.watchSlidesProgress) {
        s.updateActiveIndex();
      }
      if (s.params.freeMode) {
        //Velocity
        if (velocities.length === 0) {
          velocities.push({
            position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
            time: touchStartTime
          });
        }
        velocities.push({
          position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
          time: (new window.Date()).getTime()
        });
      }
      // Update progress
      s.updateProgress(currentTranslate);
      // Update translate
      s.setWrapperTranslate(currentTranslate);
    };
    s.onTouchEnd = function (e) {
      if (e.originalEvent) e = e.originalEvent;
      if (allowTouchCallbacks) {
        s.emit('onTouchEnd', s, e);
      }
      allowTouchCallbacks = false;
      if (!isTouched) return;
      //Return Grab Cursor
      if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
        s.setGrabCursor(false);
      }

      // Time diff
      var touchEndTime = Date.now();
      var timeDiff = touchEndTime - touchStartTime;

      // Tap, doubleTap, Click
      if (s.allowClick) {
        s.updateClickedSlide(e);
        s.emit('onTap', s, e);
        if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
          if (clickTimeout) clearTimeout(clickTimeout);
          clickTimeout = setTimeout(function () {
            if (!s) return;
            if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
              s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
            }
            s.emit('onClick', s, e);
          }, 300);

        }
        if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
          if (clickTimeout) clearTimeout(clickTimeout);
          s.emit('onDoubleTap', s, e);
        }
      }

      lastClickTime = Date.now();
      setTimeout(function () {
        if (s) s.allowClick = true;
      }, 0);

      if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
        isTouched = isMoved = false;
        return;
      }
      isTouched = isMoved = false;

      var currentPos;
      if (s.params.followFinger) {
        currentPos = s.rtl ? s.translate : -s.translate;
      }
      else {
        currentPos = -currentTranslate;
      }
      if (s.params.freeMode) {
        if (currentPos < -s.minTranslate()) {
          s.slideTo(s.activeIndex);
          return;
        }
        else if (currentPos > -s.maxTranslate()) {
          if (s.slides.length < s.snapGrid.length) {
            s.slideTo(s.snapGrid.length - 1);
          }
          else {
            s.slideTo(s.slides.length - 1);
          }
          return;
        }

        if (s.params.freeModeMomentum) {
          if (velocities.length > 1) {
            var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();

            var distance = lastMoveEvent.position - velocityEvent.position;
            var time = lastMoveEvent.time - velocityEvent.time;
            s.velocity = distance / time;
            s.velocity = s.velocity / 2;
            if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
              s.velocity = 0;
            }
            // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.
            if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
              s.velocity = 0;
            }
          } else {
            s.velocity = 0;
          }
          s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;

          velocities.length = 0;
          var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
          var momentumDistance = s.velocity * momentumDuration;

          var newPosition = s.translate + momentumDistance;
          if (s.rtl) newPosition = - newPosition;
          var doBounce = false;
          var afterBouncePosition;
          var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
          if (newPosition < s.maxTranslate()) {
            if (s.params.freeModeMomentumBounce) {
              if (newPosition + s.maxTranslate() < -bounceAmount) {
                newPosition = s.maxTranslate() - bounceAmount;
              }
              afterBouncePosition = s.maxTranslate();
              doBounce = true;
              allowMomentumBounce = true;
            }
            else {
              newPosition = s.maxTranslate();
            }
          }
          else if (newPosition > s.minTranslate()) {
            if (s.params.freeModeMomentumBounce) {
              if (newPosition - s.minTranslate() > bounceAmount) {
                newPosition = s.minTranslate() + bounceAmount;
              }
              afterBouncePosition = s.minTranslate();
              doBounce = true;
              allowMomentumBounce = true;
            }
            else {
              newPosition = s.minTranslate();
            }
          }
          else if (s.params.freeModeSticky) {
            var j = 0,
              nextSlide;
            for (j = 0; j < s.snapGrid.length; j += 1) {
              if (s.snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }

            }
            if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
              newPosition = s.snapGrid[nextSlide];
            } else {
              newPosition = s.snapGrid[nextSlide - 1];
            }
            if (!s.rtl) newPosition = - newPosition;
          }
          //Fix duration
          if (s.velocity !== 0) {
            if (s.rtl) {
              momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
            }
            else {
              momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
            }
          }
          else if (s.params.freeModeSticky) {
            s.slideReset();
            return;
          }

          if (s.params.freeModeMomentumBounce && doBounce) {
            s.updateProgress(afterBouncePosition);
            s.setWrapperTransition(momentumDuration);
            s.setWrapperTranslate(newPosition);
            s.onTransitionStart();
            s.animating = true;
            s.wrapper.transitionEnd(function () {
              if (!s || !allowMomentumBounce) return;
              s.emit('onMomentumBounce', s);

              s.setWrapperTransition(s.params.speed);
              s.setWrapperTranslate(afterBouncePosition);
              s.wrapper.transitionEnd(function () {
                if (!s) return;
                s.onTransitionEnd();
              });
            });
          } else if (s.velocity) {
            s.updateProgress(newPosition);
            s.setWrapperTransition(momentumDuration);
            s.setWrapperTranslate(newPosition);
            s.onTransitionStart();
            if (!s.animating) {
              s.animating = true;
              s.wrapper.transitionEnd(function () {
                if (!s) return;
                s.onTransitionEnd();
              });
            }

          } else {
            s.updateProgress(newPosition);
          }

          s.updateActiveIndex();
        }
        if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
          s.updateProgress();
          s.updateActiveIndex();
        }
        return;
      }

      // Find current slide
      var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
      for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
        if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
          if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
            stopIndex = i;
            groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
          }
        }
        else {
          if (currentPos >= s.slidesGrid[i]) {
            stopIndex = i;
            groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
          }
        }
      }

      // Find current slide size
      var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;

      if (timeDiff > s.params.longSwipesMs) {
        // Long touches
        if (!s.params.longSwipes) {
          s.slideTo(s.activeIndex);
          return;
        }
        if (s.swipeDirection === 'next') {
          if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
          else s.slideTo(stopIndex);

        }
        if (s.swipeDirection === 'prev') {
          if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
          else s.slideTo(stopIndex);
        }
      }
      else {
        // Short swipes
        if (!s.params.shortSwipes) {
          s.slideTo(s.activeIndex);
          return;
        }
        if (s.swipeDirection === 'next') {
          s.slideTo(stopIndex + s.params.slidesPerGroup);

        }
        if (s.swipeDirection === 'prev') {
          s.slideTo(stopIndex);
        }
      }
    };
    /*=========================
      Transitions
      ===========================*/
    s._slideTo = function (slideIndex, speed) {
      return s.slideTo(slideIndex, speed, true, true);
    };
    s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
      if (typeof runCallbacks === 'undefined') runCallbacks = true;
      if (typeof slideIndex === 'undefined') slideIndex = 0;
      if (slideIndex < 0) slideIndex = 0;
      s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
      if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;

      var translate = - s.snapGrid[s.snapIndex];
      // Stop autoplay
      if (s.params.autoplay && s.autoplaying) {
        if (internal || !s.params.autoplayDisableOnInteraction) {
          s.pauseAutoplay(speed);
        }
        else {
          s.stopAutoplay();
        }
      }
      // Update progress
      s.updateProgress(translate);

      // Normalize slideIndex
      if (s.params.normalizeSlideIndex) {
        for (var i = 0; i < s.slidesGrid.length; i++) {
          if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
            slideIndex = i;
          }
        }
      }

      // Directions locks
      if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
        return false;
      }
      if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
        if ((s.activeIndex || 0) !== slideIndex) return false;
      }

      // Update Index
      if (typeof speed === 'undefined') speed = s.params.speed;
      s.previousIndex = s.activeIndex || 0;
      s.activeIndex = slideIndex;
      s.updateRealIndex();
      if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
        // Update Height
        if (s.params.autoHeight) {
          s.updateAutoHeight();
        }
        s.updateClasses();
        if (s.params.effect !== 'slide') {
          s.setWrapperTranslate(translate);
        }
        return false;
      }
      s.updateClasses();
      s.onTransitionStart(runCallbacks);

      if (speed === 0 || s.browser.lteIE9) {
        s.setWrapperTranslate(translate);
        s.setWrapperTransition(0);
        s.onTransitionEnd(runCallbacks);
      }
      else {
        s.setWrapperTranslate(translate);
        s.setWrapperTransition(speed);
        if (!s.animating) {
          s.animating = true;
          s.wrapper.transitionEnd(function () {
            if (!s) return;
            s.onTransitionEnd(runCallbacks);
          });
        }

      }

      return true;
    };

    s.onTransitionStart = function (runCallbacks) {
      if (typeof runCallbacks === 'undefined') runCallbacks = true;
      if (s.params.autoHeight) {
        s.updateAutoHeight();
      }
      if (s.lazy) s.lazy.onTransitionStart();
      if (runCallbacks) {
        s.emit('onTransitionStart', s);
        if (s.activeIndex !== s.previousIndex) {
          s.emit('onSlideChangeStart', s);
          if (s.activeIndex > s.previousIndex) {
            s.emit('onSlideNextStart', s);
          }
          else {
            s.emit('onSlidePrevStart', s);
          }
        }

      }
    };
    s.onTransitionEnd = function (runCallbacks) {
      s.animating = false;
      s.setWrapperTransition(0);
      if (typeof runCallbacks === 'undefined') runCallbacks = true;
      if (s.lazy) s.lazy.onTransitionEnd();
      if (runCallbacks) {
        s.emit('onTransitionEnd', s);
        if (s.activeIndex !== s.previousIndex) {
          s.emit('onSlideChangeEnd', s);
          if (s.activeIndex > s.previousIndex) {
            s.emit('onSlideNextEnd', s);
          }
          else {
            s.emit('onSlidePrevEnd', s);
          }
        }
      }
      if (s.params.history && s.history) {
        s.history.setHistory(s.params.history, s.activeIndex);
      }
      if (s.params.hashnav && s.hashnav) {
        s.hashnav.setHash();
      }

    };
    s.slideNext = function (runCallbacks, speed, internal) {
      if (s.params.loop) {
        if (s.animating) return false;
        s.fixLoop();
        var clientLeft = s.container[0].clientLeft;
        return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
      }
      else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
    };
    s._slideNext = function (speed) {
      return s.slideNext(true, speed, true);
    };
    s.slidePrev = function (runCallbacks, speed, internal) {
      if (s.params.loop) {
        if (s.animating) return false;
        s.fixLoop();
        var clientLeft = s.container[0].clientLeft;
        return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
      }
      else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
    };
    s._slidePrev = function (speed) {
      return s.slidePrev(true, speed, true);
    };
    s.slideReset = function (runCallbacks, speed, internal) {
      return s.slideTo(s.activeIndex, speed, runCallbacks);
    };

    s.disableTouchControl = function () {
      s.params.onlyExternal = true;
      return true;
    };
    s.enableTouchControl = function () {
      s.params.onlyExternal = false;
      return true;
    };

    /*=========================
      Translate/transition helpers
      ===========================*/
    s.setWrapperTransition = function (duration, byController) {
      s.wrapper.transition(duration);
      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        s.effects[s.params.effect].setTransition(duration);
      }
      if (s.params.parallax && s.parallax) {
        s.parallax.setTransition(duration);
      }
      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.setTransition(duration);
      }
      if (s.params.control && s.controller) {
        s.controller.setTransition(duration, byController);
      }
      s.emit('onSetTransition', s, duration);
    };
    s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
      var x = 0, y = 0, z = 0;
      if (s.isHorizontal()) {
        x = s.rtl ? -translate : translate;
      }
      else {
        y = translate;
      }

      if (s.params.roundLengths) {
        x = round(x);
        y = round(y);
      }

      if (!s.params.virtualTranslate) {
        if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
        else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
      }

      s.translate = s.isHorizontal() ? x : y;

      // Check if we need to update progress
      var progress;
      var translatesDiff = s.maxTranslate() - s.minTranslate();
      if (translatesDiff === 0) {
        progress = 0;
      }
      else {
        progress = (translate - s.minTranslate()) / (translatesDiff);
      }
      if (progress !== s.progress) {
        s.updateProgress(translate);
      }

      if (updateActiveIndex) s.updateActiveIndex();
      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        s.effects[s.params.effect].setTranslate(s.translate);
      }
      if (s.params.parallax && s.parallax) {
        s.parallax.setTranslate(s.translate);
      }
      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.setTranslate(s.translate);
      }
      if (s.params.control && s.controller) {
        s.controller.setTranslate(s.translate, byController);
      }
      s.emit('onSetTranslate', s, s.translate);
    };

    s.getTranslate = function (el, axis) {
      var matrix, curTransform, curStyle, transformMatrix;

      // automatic axis detection
      if (typeof axis === 'undefined') {
        axis = 'x';
      }

      if (s.params.virtualTranslate) {
        return s.rtl ? -s.translate : s.translate;
      }

      curStyle = window.getComputedStyle(el, null);
      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      }
      else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
          curTransform = transformMatrix.m41;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
          curTransform = parseFloat(matrix[12]);
        //Normal Browsers
        else
          curTransform = parseFloat(matrix[4]);
      }
      if (axis === 'y') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
          curTransform = transformMatrix.m42;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
          curTransform = parseFloat(matrix[13]);
        //Normal Browsers
        else
          curTransform = parseFloat(matrix[5]);
      }
      if (s.rtl && curTransform) curTransform = -curTransform;
      return curTransform || 0;
    };
    s.getWrapperTranslate = function (axis) {
      if (typeof axis === 'undefined') {
        axis = s.isHorizontal() ? 'x' : 'y';
      }
      return s.getTranslate(s.wrapper[0], axis);
    };

    /*=========================
      Observer
      ===========================*/
    s.observers = [];
    function initObserver(target, options) {
      options = options || {};
      // create an observer instance
      var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
      var observer = new ObserverFunc(function (mutations) {
        mutations.forEach(function (mutation) {
          s.onResize(true);
          s.emit('onObserverUpdate', s, mutation);
        });
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });

      s.observers.push(observer);
    }
    s.initObservers = function () {
      if (s.params.observeParents) {
        var containerParents = s.container.parents();
        for (var i = 0; i < containerParents.length; i++) {
          initObserver(containerParents[i]);
        }
      }

      // Observe container
      initObserver(s.container[0], { childList: false });

      // Observe wrapper
      initObserver(s.wrapper[0], { attributes: false });
    };
    s.disconnectObservers = function () {
      for (var i = 0; i < s.observers.length; i++) {
        s.observers[i].disconnect();
      }
      s.observers = [];
    };
    /*=========================
      Loop
      ===========================*/
    // Create looped slides
    s.createLoop = function () {
      // Remove duplicated slides
      s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();

      var slides = s.wrapper.children('.' + s.params.slideClass);

      if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;

      s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
      s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
      if (s.loopedSlides > slides.length) {
        s.loopedSlides = slides.length;
      }

      var prependSlides = [], appendSlides = [], i;
      slides.each(function (index, el) {
        var slide = $(this);
        if (index < s.loopedSlides) appendSlides.push(el);
        if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
        slide.attr('data-swiper-slide-index', index);
      });
      for (i = 0; i < appendSlides.length; i++) {
        s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }
      for (i = prependSlides.length - 1; i >= 0; i--) {
        s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }
    };
    s.destroyLoop = function () {
      s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
      s.slides.removeAttr('data-swiper-slide-index');
    };
    s.reLoop = function (updatePosition) {
      var oldIndex = s.activeIndex - s.loopedSlides;
      s.destroyLoop();
      s.createLoop();
      s.updateSlidesSize();
      if (updatePosition) {
        s.slideTo(oldIndex + s.loopedSlides, 0, false);
      }

    };
    s.fixLoop = function () {
      var newIndex;
      //Fix For Negative Oversliding
      if (s.activeIndex < s.loopedSlides) {
        newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
        newIndex = newIndex + s.loopedSlides;
        s.slideTo(newIndex, 0, false, true);
      }
      //Fix For Positive Oversliding
      else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
        newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
        newIndex = newIndex + s.loopedSlides;
        s.slideTo(newIndex, 0, false, true);
      }
    };
    /*=========================
      Append/Prepend/Remove Slides
      ===========================*/
    s.appendSlide = function (slides) {
      if (s.params.loop) {
        s.destroyLoop();
      }
      if (typeof slides === 'object' && slides.length) {
        for (var i = 0; i < slides.length; i++) {
          if (slides[i]) s.wrapper.append(slides[i]);
        }
      }
      else {
        s.wrapper.append(slides);
      }
      if (s.params.loop) {
        s.createLoop();
      }
      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }
    };
    s.prependSlide = function (slides) {
      if (s.params.loop) {
        s.destroyLoop();
      }
      var newActiveIndex = s.activeIndex + 1;
      if (typeof slides === 'object' && slides.length) {
        for (var i = 0; i < slides.length; i++) {
          if (slides[i]) s.wrapper.prepend(slides[i]);
        }
        newActiveIndex = s.activeIndex + slides.length;
      }
      else {
        s.wrapper.prepend(slides);
      }
      if (s.params.loop) {
        s.createLoop();
      }
      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }
      s.slideTo(newActiveIndex, 0, false);
    };
    s.removeSlide = function (slidesIndexes) {
      if (s.params.loop) {
        s.destroyLoop();
        s.slides = s.wrapper.children('.' + s.params.slideClass);
      }
      var newActiveIndex = s.activeIndex,
        indexToRemove;
      if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
        for (var i = 0; i < slidesIndexes.length; i++) {
          indexToRemove = slidesIndexes[i];
          if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
          if (indexToRemove < newActiveIndex) newActiveIndex--;
        }
        newActiveIndex = Math.max(newActiveIndex, 0);
      }
      else {
        indexToRemove = slidesIndexes;
        if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex--;
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (s.params.loop) {
        s.createLoop();
      }

      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }
      if (s.params.loop) {
        s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
      }
      else {
        s.slideTo(newActiveIndex, 0, false);
      }

    };
    s.removeAllSlides = function () {
      var slidesIndexes = [];
      for (var i = 0; i < s.slides.length; i++) {
        slidesIndexes.push(i);
      }
      s.removeSlide(slidesIndexes);
    };


    /*=========================
      Effects
      ===========================*/
    s.effects = {
      fade: {
        setTranslate: function () {
          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var offset = slide[0].swiperSlideOffset;
            var tx = -offset;
            if (!s.params.virtualTranslate) tx = tx - s.translate;
            var ty = 0;
            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
            }
            var slideOpacity = s.params.fade.crossFade ?
              Math.max(1 - Math.abs(slide[0].progress), 0) :
              1 + Math.min(Math.max(slide[0].progress, -1), 0);
            slide
              .css({
                opacity: slideOpacity
              })
              .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');

          }

        },
        setTransition: function (duration) {
          s.slides.transition(duration);
          if (s.params.virtualTranslate && duration !== 0) {
            var eventTriggered = false;
            s.slides.transitionEnd(function () {
              if (eventTriggered) return;
              if (!s) return;
              eventTriggered = true;
              s.animating = false;
              var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
              for (var i = 0; i < triggerEvents.length; i++) {
                s.wrapper.trigger(triggerEvents[i]);
              }
            });
          }
        }
      },
      flip: {
        setTranslate: function () {
          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var progress = slide[0].progress;
            if (s.params.flip.limitRotation) {
              progress = Math.max(Math.min(slide[0].progress, 1), -1);
            }
            var offset = slide[0].swiperSlideOffset;
            var rotate = -180 * progress,
              rotateY = rotate,
              rotateX = 0,
              tx = -offset,
              ty = 0;
            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
              rotateX = -rotateY;
              rotateY = 0;
            }
            else if (s.rtl) {
              rotateY = -rotateY;
            }

            slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;

            if (s.params.flip.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }

            slide
              .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
          }
        },
        setTransition: function (duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
          if (s.params.virtualTranslate && duration !== 0) {
            var eventTriggered = false;
            s.slides.eq(s.activeIndex).transitionEnd(function () {
              if (eventTriggered) return;
              if (!s) return;
              if (!$(this).hasClass(s.params.slideActiveClass)) return;
              eventTriggered = true;
              s.animating = false;
              var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
              for (var i = 0; i < triggerEvents.length; i++) {
                s.wrapper.trigger(triggerEvents[i]);
              }
            });
          }
        }
      },
      cube: {
        setTranslate: function () {
          var wrapperRotate = 0, cubeShadow;
          if (s.params.cube.shadow) {
            if (s.isHorizontal()) {
              cubeShadow = s.wrapper.find('.swiper-cube-shadow');
              if (cubeShadow.length === 0) {
                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                s.wrapper.append(cubeShadow);
              }
              cubeShadow.css({ height: s.width + 'px' });
            }
            else {
              cubeShadow = s.container.find('.swiper-cube-shadow');
              if (cubeShadow.length === 0) {
                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                s.container.append(cubeShadow);
              }
            }
          }
          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var slideAngle = i * 90;
            var round = Math.floor(slideAngle / 360);
            if (s.rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
            var progress = Math.max(Math.min(slide[0].progress, 1), -1);
            var tx = 0, ty = 0, tz = 0;
            if (i % 4 === 0) {
              tx = - round * 4 * s.size;
              tz = 0;
            }
            else if ((i - 1) % 4 === 0) {
              tx = 0;
              tz = - round * 4 * s.size;
            }
            else if ((i - 2) % 4 === 0) {
              tx = s.size + round * 4 * s.size;
              tz = s.size;
            }
            else if ((i - 3) % 4 === 0) {
              tx = - s.size;
              tz = 3 * s.size + s.size * 4 * round;
            }
            if (s.rtl) {
              tx = -tx;
            }

            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
            }

            var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
            if (progress <= 1 && progress > -1) {
              wrapperRotate = i * 90 + progress * 90;
              if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
            }
            slide.transform(transform);
            if (s.params.cube.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          s.wrapper.css({
            '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
            '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
            '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
            'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
          });

          if (s.params.cube.shadow) {
            if (s.isHorizontal()) {
              cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
            }
            else {
              var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
              var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
              var scale1 = s.params.cube.shadowScale,
                scale2 = s.params.cube.shadowScale / multiplier,
                offset = s.params.cube.shadowOffset;
              cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
            }
          }
          var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
          s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
        },
        setTransition: function (duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
          if (s.params.cube.shadow && !s.isHorizontal()) {
            s.container.find('.swiper-cube-shadow').transition(duration);
          }
        }
      },
      coverflow: {
        setTranslate: function () {
          var transform = s.translate;
          var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
          var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
          var translate = s.params.coverflow.depth;
          //Each slide offset from center
          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideSize = s.slidesSizesGrid[i];
            var slideOffset = slide[0].swiperSlideOffset;
            var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;

            var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
            var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
            // var rotateZ = 0
            var translateZ = -translate * Math.abs(offsetMultiplier);

            var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
            var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;

            //Fix for ultra small values
            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;

            var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

            slide.transform(slideTransform);
            slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
            if (s.params.coverflow.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
              if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
            }
          }

          //Set correct perspective for IE10
          if (s.browser.ie) {
            var ws = s.wrapper[0].style;
            ws.perspectiveOrigin = center + 'px 50%';
          }
        },
        setTransition: function (duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
        }
      }
    };


    /*=========================
      Images Lazy Loading
      ===========================*/
    s.lazy = {
      initialImageLoaded: false,
      loadImageInSlide: function (index, loadInDuplicate) {
        if (typeof index === 'undefined') return;
        if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
        if (s.slides.length === 0) return;

        var slide = s.slides.eq(index);
        var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
        if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
          img = img.add(slide[0]);
        }
        if (img.length === 0) return;

        img.each(function () {
          var _img = $(this);
          _img.addClass(s.params.lazyStatusLoadingClass);
          var background = _img.attr('data-background');
          var src = _img.attr('data-src'),
            srcset = _img.attr('data-srcset'),
            sizes = _img.attr('data-sizes');
          s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
            if (typeof s === 'undefined' || s === null || !s) return;
            if (background) {
              _img.css('background-image', 'url("' + background + '")');
              _img.removeAttr('data-background');
            }
            else {
              if (srcset) {
                _img.attr('srcset', srcset);
                _img.removeAttr('data-srcset');
              }
              if (sizes) {
                _img.attr('sizes', sizes);
                _img.removeAttr('data-sizes');
              }
              if (src) {
                _img.attr('src', src);
                _img.removeAttr('data-src');
              }

            }

            _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
            slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
            if (s.params.loop && loadInDuplicate) {
              var slideOriginalIndex = slide.attr('data-swiper-slide-index');
              if (slide.hasClass(s.params.slideDuplicateClass)) {
                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                s.lazy.loadImageInSlide(originalSlide.index(), false);
              }
              else {
                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
              }
            }
            s.emit('onLazyImageReady', s, slide[0], _img[0]);
          });

          s.emit('onLazyImageLoad', s, slide[0], _img[0]);
        });

      },
      load: function () {
        var i;
        var slidesPerView = s.params.slidesPerView;
        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }
        if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
        if (s.params.watchSlidesVisibility) {
          s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
            s.lazy.loadImageInSlide($(this).index());
          });
        }
        else {
          if (slidesPerView > 1) {
            for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            }
          }
          else {
            s.lazy.loadImageInSlide(s.activeIndex);
          }
        }
        if (s.params.lazyLoadingInPrevNext) {
          if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
            var amount = s.params.lazyLoadingInPrevNextAmount;
            var spv = slidesPerView;
            var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
            var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
            // Next Slides
            for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            }
            // Prev Slides
            for (i = minIndex; i < s.activeIndex; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            }
          }
          else {
            var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
            if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

            var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
            if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
          }
        }
      },
      onTransitionStart: function () {
        if (s.params.lazyLoading) {
          if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
            s.lazy.load();
          }
        }
      },
      onTransitionEnd: function () {
        if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
          s.lazy.load();
        }
      }
    };


    /*=========================
      Scrollbar
      ===========================*/
    s.scrollbar = {
      isTouched: false,
      setDragPosition: function (e) {
        var sb = s.scrollbar;
        var x = 0, y = 0;
        var translate;
        var pointerPosition = s.isHorizontal() ?
          ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
          ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
        var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
        var positionMin = -s.minTranslate() * sb.moveDivider;
        var positionMax = -s.maxTranslate() * sb.moveDivider;
        if (position < positionMin) {
          position = positionMin;
        }
        else if (position > positionMax) {
          position = positionMax;
        }
        position = -position / sb.moveDivider;
        s.updateProgress(position);
        s.setWrapperTranslate(position, true);
      },
      dragStart: function (e) {
        var sb = s.scrollbar;
        sb.isTouched = true;
        e.preventDefault();
        e.stopPropagation();

        sb.setDragPosition(e);
        clearTimeout(sb.dragTimeout);

        sb.track.transition(0);
        if (s.params.scrollbarHide) {
          sb.track.css('opacity', 1);
        }
        s.wrapper.transition(100);
        sb.drag.transition(100);
        s.emit('onScrollbarDragStart', s);
      },
      dragMove: function (e) {
        var sb = s.scrollbar;
        if (!sb.isTouched) return;
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
        sb.setDragPosition(e);
        s.wrapper.transition(0);
        sb.track.transition(0);
        sb.drag.transition(0);
        s.emit('onScrollbarDragMove', s);
      },
      dragEnd: function (e) {
        var sb = s.scrollbar;
        if (!sb.isTouched) return;
        sb.isTouched = false;
        if (s.params.scrollbarHide) {
          clearTimeout(sb.dragTimeout);
          sb.dragTimeout = setTimeout(function () {
            sb.track.css('opacity', 0);
            sb.track.transition(400);
          }, 1000);

        }
        s.emit('onScrollbarDragEnd', s);
        if (s.params.scrollbarSnapOnRelease) {
          s.slideReset();
        }
      },
      draggableEvents: (function () {
        if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
        else return s.touchEvents;
      })(),
      enableDraggable: function () {
        var sb = s.scrollbar;
        var target = s.support.touch ? sb.track : document;
        $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
        $(target).on(sb.draggableEvents.move, sb.dragMove);
        $(target).on(sb.draggableEvents.end, sb.dragEnd);
      },
      disableDraggable: function () {
        var sb = s.scrollbar;
        var target = s.support.touch ? sb.track : document;
        $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
        $(target).off(sb.draggableEvents.move, sb.dragMove);
        $(target).off(sb.draggableEvents.end, sb.dragEnd);
      },
      set: function () {
        if (!s.params.scrollbar) return;
        var sb = s.scrollbar;
        sb.track = $(s.params.scrollbar);
        if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
          sb.track = s.container.find(s.params.scrollbar);
        }
        sb.drag = sb.track.find('.swiper-scrollbar-drag');
        if (sb.drag.length === 0) {
          sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
          sb.track.append(sb.drag);
        }
        sb.drag[0].style.width = '';
        sb.drag[0].style.height = '';
        sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;

        sb.divider = s.size / s.virtualSize;
        sb.moveDivider = sb.divider * (sb.trackSize / s.size);
        sb.dragSize = sb.trackSize * sb.divider;

        if (s.isHorizontal()) {
          sb.drag[0].style.width = sb.dragSize + 'px';
        }
        else {
          sb.drag[0].style.height = sb.dragSize + 'px';
        }

        if (sb.divider >= 1) {
          sb.track[0].style.display = 'none';
        }
        else {
          sb.track[0].style.display = '';
        }
        if (s.params.scrollbarHide) {
          sb.track[0].style.opacity = 0;
        }
      },
      setTranslate: function () {
        if (!s.params.scrollbar) return;
        var diff;
        var sb = s.scrollbar;
        var translate = s.translate || 0;
        var newPos;

        var newSize = sb.dragSize;
        newPos = (sb.trackSize - sb.dragSize) * s.progress;
        if (s.rtl && s.isHorizontal()) {
          newPos = -newPos;
          if (newPos > 0) {
            newSize = sb.dragSize - newPos;
            newPos = 0;
          }
          else if (-newPos + sb.dragSize > sb.trackSize) {
            newSize = sb.trackSize + newPos;
          }
        }
        else {
          if (newPos < 0) {
            newSize = sb.dragSize + newPos;
            newPos = 0;
          }
          else if (newPos + sb.dragSize > sb.trackSize) {
            newSize = sb.trackSize - newPos;
          }
        }
        if (s.isHorizontal()) {
          if (s.support.transforms3d) {
            sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
          }
          else {
            sb.drag.transform('translateX(' + (newPos) + 'px)');
          }
          sb.drag[0].style.width = newSize + 'px';
        }
        else {
          if (s.support.transforms3d) {
            sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
          }
          else {
            sb.drag.transform('translateY(' + (newPos) + 'px)');
          }
          sb.drag[0].style.height = newSize + 'px';
        }
        if (s.params.scrollbarHide) {
          clearTimeout(sb.timeout);
          sb.track[0].style.opacity = 1;
          sb.timeout = setTimeout(function () {
            sb.track[0].style.opacity = 0;
            sb.track.transition(400);
          }, 1000);
        }
      },
      setTransition: function (duration) {
        if (!s.params.scrollbar) return;
        s.scrollbar.drag.transition(duration);
      }
    };


    /*=========================
      Controller
      ===========================*/
    s.controller = {
      LinearSpline: function (x, y) {
        var binarySearch = (function () {
          var maxIndex, minIndex, guess;
          return function (array, val) {
            minIndex = -1;
            maxIndex = array.length;
            while (maxIndex - minIndex > 1)
              if (array[guess = maxIndex + minIndex >> 1] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            return maxIndex;
          };
        })();
        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1;
        // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.
        var i1, i3;
        var l = this.x.length;

        this.interpolate = function (x2) {
          if (!x2) return 0;

          // Get the indexes of x1 and x3 (the array indexes before and after given x2):
          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1;

          // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
          return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
        };
      },
      //xxx: for now i will just save one spline function to to
      getInterpolateFunction: function (c) {
        if (!s.controller.spline) s.controller.spline = s.params.loop ?
          new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
          new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
      },
      setTranslate: function (translate, byController) {
        var controlled = s.params.control;
        var multiplier, controlledTranslate;
        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
          if (s.params.controlBy === 'slide') {
            s.controller.getInterpolateFunction(c);
            // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out
            controlledTranslate = -s.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || s.params.controlBy === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
            controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
          }

          if (s.params.controlInverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }
          c.updateProgress(controlledTranslate);
          c.setWrapperTranslate(controlledTranslate, false, s);
          c.updateActiveIndex();
        }
        if (Array.isArray(controlled)) {
          for (var i = 0; i < controlled.length; i++) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {

          setControlledTranslate(controlled);
        }
      },
      setTransition: function (duration, byController) {
        var controlled = s.params.control;
        var i;
        function setControlledTransition(c) {
          c.setWrapperTransition(duration, s);
          if (duration !== 0) {
            c.onTransitionStart();
            c.wrapper.transitionEnd(function () {
              if (!controlled) return;
              if (c.params.loop && s.params.controlBy === 'slide') {
                c.fixLoop();
              }
              c.onTransitionEnd();

            });
          }
        }
        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i++) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      }
    };


    /*=========================
      Hash Navigation
      ===========================*/
    s.hashnav = {
      onHashCange: function (e, a) {
        var newHash = document.location.hash.replace('#', '');
        var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
        if (newHash !== activeSlideHash) {
          s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
        }
      },
      attachEvents: function (detach) {
        var action = detach ? 'off' : 'on';
        $(window)[action]('hashchange', s.hashnav.onHashCange);
      },
      setHash: function () {
        if (!s.hashnav.initialized || !s.params.hashnav) return;
        if (s.params.replaceState && window.history && window.history.replaceState) {
          window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
        } else {
          var slide = s.slides.eq(s.activeIndex);
          var hash = slide.attr('data-hash') || slide.attr('data-history');
          document.location.hash = hash || '';
        }
      },
      init: function () {
        if (!s.params.hashnav || s.params.history) return;
        s.hashnav.initialized = true;
        var hash = document.location.hash.replace('#', '');
        if (hash) {
          var speed = 0;
          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideHash = slide.attr('data-hash') || slide.attr('data-history');
            if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
              var index = slide.index();
              s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
            }
          }
        }
        if (s.params.hashnavWatchState) s.hashnav.attachEvents();
      },
      destroy: function () {
        if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
      }
    };


    /*=========================
      History Api with fallback to Hashnav
      ===========================*/
    s.history = {
      init: function () {
        if (!s.params.history) return;
        if (!window.history || !window.history.pushState) {
          s.params.history = false;
          s.params.hashnav = true;
          return;
        }
        s.history.initialized = true;
        this.paths = this.getPathValues();
        if (!this.paths.key && !this.paths.value) return;
        this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
        if (!s.params.replaceState) {
          window.addEventListener('popstate', this.setHistoryPopState);
        }
      },
      setHistoryPopState: function () {
        s.history.paths = s.history.getPathValues();
        s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
      },
      getPathValues: function () {
        var pathArray = window.location.pathname.slice(1).split('/');
        var total = pathArray.length;
        var key = pathArray[total - 2];
        var value = pathArray[total - 1];
        return { key: key, value: value };
      },
      setHistory: function (key, index) {
        if (!s.history.initialized || !s.params.history) return;
        var slide = s.slides.eq(index);
        var value = this.slugify(slide.attr('data-history'));
        if (!window.location.pathname.includes(key)) {
          value = key + '/' + value;
        }
        if (s.params.replaceState) {
          window.history.replaceState(null, null, value);
        } else {
          window.history.pushState(null, null, value);
        }
      },
      slugify: function (text) {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      },
      scrollToSlide: function (speed, value, runCallbacks) {
        if (value) {
          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideHistory = this.slugify(slide.attr('data-history'));
            if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
              var index = slide.index();
              s.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          s.slideTo(0, speed, runCallbacks);
        }
      }
    };


    /*=========================
      Keyboard Control
      ===========================*/
    function handleKeyboard(e) {
      if (e.originalEvent) e = e.originalEvent; //jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
        return false;
      }
      if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }
      if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return;
      }
      if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
        var inView = false;
        //Check that swiper should be inside of visible area of window
        if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
          return;
        }
        var windowScroll = {
          left: window.pageXOffset,
          top: window.pageYOffset
        };
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var swiperOffset = s.container.offset();
        if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + s.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + s.height],
          [swiperOffset.left + s.width, swiperOffset.top + s.height]
        ];
        for (var i = 0; i < swiperCoord.length; i++) {
          var point = swiperCoord[i];
          if (
            point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
            point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
          ) {
            inView = true;
          }

        }
        if (!inView) return;
      }
      if (s.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) e.preventDefault();
          else e.returnValue = false;
        }
        if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
        if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
      }
      else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) e.preventDefault();
          else e.returnValue = false;
        }
        if (kc === 40) s.slideNext();
        if (kc === 38) s.slidePrev();
      }
      s.emit('onKeyPress', s, kc);
    }
    s.disableKeyboardControl = function () {
      s.params.keyboardControl = false;
      $(document).off('keydown', handleKeyboard);
    };
    s.enableKeyboardControl = function () {
      s.params.keyboardControl = true;
      $(document).on('keydown', handleKeyboard);
    };


    /*=========================
      Mousewheel Control
      ===========================*/
    s.mousewheel = {
      event: false,
      lastScrollTime: (new window.Date()).getTime()
    };
    function isEventSupported() {
      var eventName = 'onwheel';
      var isSupported = eventName in document;

      if (!isSupported) {
        var element = document.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      if (!isSupported &&
        document.implementation &&
        document.implementation.hasFeature &&
        // always returns true in newer browsers as per the standard.
        // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
        document.implementation.hasFeature('', '') !== true) {
        // This is the only way to test support for the `wheel` event in IE9+.
        isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
      }

      return isSupported;
    }
    /**
     * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
     * complicated, thus this doc is long and (hopefully) detailed enough to answer
     * your questions.
     *
     * If you need to react to the mouse wheel in a predictable way, this code is
     * like your bestest friend. * hugs *
     *
     * As of today, there are 4 DOM event types you can listen to:
     *
     *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
     *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
     *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
     *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
     *
     * So what to do?  The is the best:
     *
     *   normalizeWheel.getEventType();
     *
     * In your event callback, use this code to get sane interpretation of the
     * deltas.  This code will return an object with properties:
     *
     *   spinX   -- normalized spin speed (use for zoom) - x plane
     *   spinY   -- " - y plane
     *   pixelX  -- normalized distance (to pixels) - x plane
     *   pixelY  -- " - y plane
     *
     * Wheel values are provided by the browser assuming you are using the wheel to
     * scroll a web page by a number of lines or pixels (or pages).  Values can vary
     * significantly on different platforms and browsers, forgetting that you can
     * scroll at different speeds.  Some devices (like trackpads) emit more events
     * at smaller increments with fine granularity, and some emit massive jumps with
     * linear speed or acceleration.
     *
     * This code does its best to normalize the deltas for you:
     *
     *   - spin is trying to normalize how far the wheel was spun (or trackpad
     *     dragged).  This is super useful for zoom support where you want to
     *     throw away the chunky scroll steps on the PC and make those equal to
     *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
     *     resolve a single slow step on a wheel to 1.
     *
     *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
     *     get the crazy differences between browsers, but at least it'll be in
     *     pixels!
     *
     *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
     *     should translate to positive value zooming IN, negative zooming OUT.
     *     This matches the newer 'wheel' event.
     *
     * Why are there spinX, spinY (or pixels)?
     *
     *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
     *     with a mouse.  It results in side-scrolling in the browser by default.
     *
     *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
     *
     *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
     *     probably is by browsers in conjunction with fancy 3D controllers .. but
     *     you know.
     *
     * Implementation info:
     *
     * Examples of 'wheel' event if you scroll slowly (down) by one step with an
     * average mouse:
     *
     *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
     *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
     *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
     *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
     *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
     *
     * On the trackpad:
     *
     *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
     *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
     *
     * On other/older browsers.. it's more complicated as there can be multiple and
     * also missing delta values.
     *
     * The 'wheel' event is more standard:
     *
     * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
     *
     * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
     * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
     * backward compatibility with older events.  Those other values help us
     * better normalize spin speed.  Example of what the browsers provide:
     *
     *                          | event.wheelDelta | event.detail
     *        ------------------+------------------+--------------
     *          Safari v5/OS X  |       -120       |       0
     *          Safari v5/Win7  |       -120       |       0
     *         Chrome v17/OS X  |       -120       |       0
     *         Chrome v17/Win7  |       -120       |       0
     *                IE9/Win7  |       -120       |   undefined
     *         Firefox v4/OS X  |     undefined    |       1
     *         Firefox v4/Win7  |     undefined    |       3
     *
     */
    function normalizeWheel( /*object*/ event) /*object*/ {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0, sY = 0,       // spinX, spinY
        pX = 0, pY = 0;       // pixelX, pixelY

      // Legacy
      if ('detail' in event) {
        sY = event.detail;
      }
      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }
      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }
      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {                             // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }
    if (s.params.mousewheelControl) {
      /**
       * The best combination if you prefer spinX + spinY normalization.  It favors
       * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
       * 'wheel' event, making spin speed determination impossible.
       */
      s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
        'DOMMouseScroll' :
        isEventSupported() ?
          'wheel' : 'mousewheel';
    }
    function handleMousewheel(e) {
      if (e.originalEvent) e = e.originalEvent; //jquery fix
      var delta = 0;
      var rtlFactor = s.rtl ? -1 : 1;

      var data = normalizeWheel(e);

      if (s.params.mousewheelForceToAxis) {
        if (s.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
          else return;
        }
        else {
          if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
          else return;
        }
      }
      else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
      }

      if (delta === 0) return;

      if (s.params.mousewheelInvert) delta = -delta;

      if (!s.params.freeMode) {
        if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!s.isEnd || s.params.loop) && !s.animating) {
              s.slideNext();
              s.emit('onScroll', s, e);
            }
            else if (s.params.mousewheelReleaseOnEdges) return true;
          }
          else {
            if ((!s.isBeginning || s.params.loop) && !s.animating) {
              s.slidePrev();
              s.emit('onScroll', s, e);
            }
            else if (s.params.mousewheelReleaseOnEdges) return true;
          }
        }
        s.mousewheel.lastScrollTime = (new window.Date()).getTime();

      }
      else {
        //Freemode or scrollContainer:
        var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
        var wasBeginning = s.isBeginning,
          wasEnd = s.isEnd;

        if (position >= s.minTranslate()) position = s.minTranslate();
        if (position <= s.maxTranslate()) position = s.maxTranslate();

        s.setWrapperTransition(0);
        s.setWrapperTranslate(position);
        s.updateProgress();
        s.updateActiveIndex();

        if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
          s.updateClasses();
        }

        if (s.params.freeModeSticky) {
          clearTimeout(s.mousewheel.timeout);
          s.mousewheel.timeout = setTimeout(function () {
            s.slideReset();
          }, 300);
        }
        else {
          if (s.params.lazyLoading && s.lazy) {
            s.lazy.load();
          }
        }
        // Emit event
        s.emit('onScroll', s, e);

        // Stop autoplay
        if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();

        // Return page scroll on edge positions
        if (position === 0 || position === s.maxTranslate()) return;
      }

      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      return false;
    }
    s.disableMousewheelControl = function () {
      if (!s.mousewheel.event) return false;
      var target = s.container;
      if (s.params.mousewheelEventsTarged !== 'container') {
        target = $(s.params.mousewheelEventsTarged);
      }
      target.off(s.mousewheel.event, handleMousewheel);
      s.params.mousewheelControl = false;
      return true;
    };

    s.enableMousewheelControl = function () {
      if (!s.mousewheel.event) return false;
      var target = s.container;
      if (s.params.mousewheelEventsTarged !== 'container') {
        target = $(s.params.mousewheelEventsTarged);
      }
      target.on(s.mousewheel.event, handleMousewheel);
      s.params.mousewheelControl = true;
      return true;
    };


    /*=========================
      Parallax
      ===========================*/
    function setParallaxTransform(el, progress) {
      el = $(el);
      var p, pX, pY;
      var rtlFactor = s.rtl ? -1 : 1;

      p = el.attr('data-swiper-parallax') || '0';
      pX = el.attr('data-swiper-parallax-x');
      pY = el.attr('data-swiper-parallax-y');
      if (pX || pY) {
        pX = pX || '0';
        pY = pY || '0';
      }
      else {
        if (s.isHorizontal()) {
          pX = p;
          pY = '0';
        }
        else {
          pY = p;
          pX = '0';
        }
      }

      if ((pX).indexOf('%') >= 0) {
        pX = parseInt(pX, 10) * progress * rtlFactor + '%';
      }
      else {
        pX = pX * progress * rtlFactor + 'px';
      }
      if ((pY).indexOf('%') >= 0) {
        pY = parseInt(pY, 10) * progress + '%';
      }
      else {
        pY = pY * progress + 'px';
      }

      el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
    }
    s.parallax = {
      setTranslate: function () {
        s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
          setParallaxTransform(this, s.progress);

        });
        s.slides.each(function () {
          var slide = $(this);
          slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
            var progress = Math.min(Math.max(slide[0].progress, -1), 1);
            setParallaxTransform(this, progress);
          });
        });
      },
      setTransition: function (duration) {
        if (typeof duration === 'undefined') duration = s.params.speed;
        s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
          var el = $(this);
          var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) parallaxDuration = 0;
          el.transition(parallaxDuration);
        });
      }
    };


    /*=========================
      Zoom
      ===========================*/
    s.zoom = {
      // "Global" Props
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        slide: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        image: undefined,
        imageWrap: undefined,
        zoomMax: s.params.zoomMax
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {}
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
      },
      // Calc Scale From Multi-touches
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var x1 = e.targetTouches[0].pageX,
          y1 = e.targetTouches[0].pageY,
          x2 = e.targetTouches[1].pageX,
          y2 = e.targetTouches[1].pageY;
        var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance;
      },
      // Events
      onGestureStart: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
          if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
            return;
          }
          z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
        }
        if (!z.gesture.slide || !z.gesture.slide.length) {
          z.gesture.slide = $(this);
          if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
          z.gesture.image = z.gesture.slide.find('img, svg, canvas');
          z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
          z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
          if (z.gesture.imageWrap.length === 0) {
            z.gesture.image = undefined;
            return;
          }
        }
        z.gesture.image.transition(0);
        z.isScaling = true;
      },
      onGestureChange: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
          if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
            return;
          }
          z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (s.support.gestures) {
          z.scale = e.scale * z.currentScale;
        }
        else {
          z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
        }
        if (z.scale > z.gesture.zoomMax) {
          z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
        }
        if (z.scale < s.params.zoomMin) {
          z.scale = s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
        }
        z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
      },
      onGestureEnd: function (e) {
        var z = s.zoom;
        if (!s.support.gestures) {
          if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
            return;
          }
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
        z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        z.currentScale = z.scale;
        z.isScaling = false;
        if (z.scale === 1) z.gesture.slide = undefined;
      },
      onTouchStart: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (z.image.isTouched) return;
        if (s.device.os === 'android') e.preventDefault();
        z.image.isTouched = true;
        z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      },
      onTouchMove: function (e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        s.allowClick = false;
        if (!z.image.isTouched || !z.gesture.slide) return;

        if (!z.image.isMoved) {
          z.image.width = z.gesture.image[0].offsetWidth;
          z.image.height = z.gesture.image[0].offsetHeight;
          z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
          z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
          z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
          z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
          z.gesture.imageWrap.transition(0);
          if (s.rtl) z.image.startX = -z.image.startX;
          if (s.rtl) z.image.startY = -z.image.startY;
        }
        // Define if we need image drag
        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;

        if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;

        z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
        z.image.maxY = -z.image.minY;

        z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!z.image.isMoved && !z.isScaling) {
          if (s.isHorizontal() &&
            (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
            (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
          ) {
            z.image.isTouched = false;
            return;
          }
          else if (!s.isHorizontal() &&
            (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
            (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
          ) {
            z.image.isTouched = false;
            return;
          }
        }
        e.preventDefault();
        e.stopPropagation();

        z.image.isMoved = true;
        z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
        z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

        if (z.image.currentX < z.image.minX) {
          z.image.currentX = z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
        }
        if (z.image.currentX > z.image.maxX) {
          z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
        }

        if (z.image.currentY < z.image.minY) {
          z.image.currentY = z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
        }
        if (z.image.currentY > z.image.maxY) {
          z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
        }

        //Velocity
        if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
        if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
        if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
        z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
        z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
        if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
        if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
        z.velocity.prevPositionX = z.image.touchesCurrent.x;
        z.velocity.prevPositionY = z.image.touchesCurrent.y;
        z.velocity.prevTime = Date.now();

        z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
      },
      onTouchEnd: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (!z.image.isTouched || !z.image.isMoved) {
          z.image.isTouched = false;
          z.image.isMoved = false;
          return;
        }
        z.image.isTouched = false;
        z.image.isMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = z.velocity.x * momentumDurationX;
        var newPositionX = z.image.currentX + momentumDistanceX;
        var momentumDistanceY = z.velocity.y * momentumDurationY;
        var newPositionY = z.image.currentY + momentumDistanceY;

        //Fix duration
        if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
        if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        z.image.currentX = newPositionX;
        z.image.currentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;
        z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
        z.image.maxY = -z.image.minY;
        z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
        z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);

        z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
      },
      onTransitionEnd: function (s) {
        var z = s.zoom;
        if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
          z.gesture.image.transform('translate3d(0,0,0) scale(1)');
          z.gesture.imageWrap.transform('translate3d(0,0,0)');
          z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
          z.scale = z.currentScale = 1;
        }
      },
      // Toggle Zoom
      toggleZoom: function (s, e) {
        var z = s.zoom;
        if (!z.gesture.slide) {
          z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
          z.gesture.image = z.gesture.slide.find('img, svg, canvas');
          z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
        }
        if (!z.gesture.image || z.gesture.image.length === 0) return;

        var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

        if (typeof z.image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        }
        else {
          touchX = z.image.touchesStart.x;
          touchY = z.image.touchesStart.y;
        }

        if (z.scale && z.scale !== 1) {
          // Zoom Out
          z.scale = z.currentScale = 1;
          z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
          z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
          z.gesture.slide = undefined;
        }
        else {
          // Zoom In
          z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
          if (e) {
            slideWidth = z.gesture.slide[0].offsetWidth;
            slideHeight = z.gesture.slide[0].offsetHeight;
            offsetX = z.gesture.slide.offset().left;
            offsetY = z.gesture.slide.offset().top;
            diffX = offsetX + slideWidth / 2 - touchX;
            diffY = offsetY + slideHeight / 2 - touchY;

            imageWidth = z.gesture.image[0].offsetWidth;
            imageHeight = z.gesture.image[0].offsetHeight;
            scaledWidth = imageWidth * z.scale;
            scaledHeight = imageHeight * z.scale;

            translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
            translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
            translateMaxX = -translateMinX;
            translateMaxY = -translateMinY;

            translateX = diffX * z.scale;
            translateY = diffY * z.scale;

            if (translateX < translateMinX) {
              translateX = translateMinX;
            }
            if (translateX > translateMaxX) {
              translateX = translateMaxX;
            }

            if (translateY < translateMinY) {
              translateY = translateMinY;
            }
            if (translateY > translateMaxY) {
              translateY = translateMaxY;
            }
          }
          else {
            translateX = 0;
            translateY = 0;
          }
          z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
          z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        }
      },
      // Attach/Detach Events
      attachEvents: function (detach) {
        var action = detach ? 'off' : 'on';

        if (s.params.zoom) {
          var target = s.slides;
          var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
          // Scale image
          if (s.support.gestures) {
            s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
            s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
            s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
          }
          else if (s.touchEvents.start === 'touchstart') {
            s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
            s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
            s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
          }

          // Move image
          s[action]('touchStart', s.zoom.onTouchStart);
          s.slides.each(function (index, slide) {
            if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
              $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
            }
          });
          s[action]('touchEnd', s.zoom.onTouchEnd);

          // Scale Out
          s[action]('transitionEnd', s.zoom.onTransitionEnd);
          if (s.params.zoomToggle) {
            s.on('doubleTap', s.zoom.toggleZoom);
          }
        }
      },
      init: function () {
        s.zoom.attachEvents();
      },
      destroy: function () {
        s.zoom.attachEvents(true);
      }
    };


    /*=========================
      Plugins API. Collect all and init all plugins
      ===========================*/
    s._plugins = [];
    for (var plugin in s.plugins) {
      var p = s.plugins[plugin](s, s.params[plugin]);
      if (p) s._plugins.push(p);
    }
    // Method to call all plugins event/method
    s.callPlugins = function (eventName) {
      for (var i = 0; i < s._plugins.length; i++) {
        if (eventName in s._plugins[i]) {
          s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }
    };


    /*=========================
      Events/Callbacks/Plugins Emitter
      ===========================*/
    function normalizeEventName(eventName) {
      if (eventName.indexOf('on') !== 0) {
        if (eventName[0] !== eventName[0].toUpperCase()) {
          eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
        }
        else {
          eventName = 'on' + eventName;
        }
      }
      return eventName;
    }
    s.emitterEventListeners = {

    };
    s.emit = function (eventName) {
      // Trigger callbacks
      if (s.params[eventName]) {
        s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }
      var i;
      // Trigger events
      if (s.emitterEventListeners[eventName]) {
        for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
          s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }
      // Trigger plugins
      if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    };
    s.on = function (eventName, handler) {
      eventName = normalizeEventName(eventName);
      if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
      s.emitterEventListeners[eventName].push(handler);
      return s;
    };
    s.off = function (eventName, handler) {
      var i;
      eventName = normalizeEventName(eventName);
      if (typeof handler === 'undefined') {
        // Remove all handlers for such event
        s.emitterEventListeners[eventName] = [];
        return s;
      }
      if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
      for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
        if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
      }
      return s;
    };
    s.once = function (eventName, handler) {
      eventName = normalizeEventName(eventName);
      var _handler = function () {
        handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        s.off(eventName, _handler);
      };
      s.on(eventName, _handler);
      return s;
    };


    // Accessibility tools
    s.a11y = {
      makeFocusable: function ($el) {
        $el.attr('tabIndex', '0');
        return $el;
      },
      addRole: function ($el, role) {
        $el.attr('role', role);
        return $el;
      },

      addLabel: function ($el, label) {
        $el.attr('aria-label', label);
        return $el;
      },

      disable: function ($el) {
        $el.attr('aria-disabled', true);
        return $el;
      },

      enable: function ($el) {
        $el.attr('aria-disabled', false);
        return $el;
      },

      onEnterKey: function (event) {
        if (event.keyCode !== 13) return;
        if ($(event.target).is(s.params.nextButton)) {
          s.onClickNext(event);
          if (s.isEnd) {
            s.a11y.notify(s.params.lastSlideMessage);
          }
          else {
            s.a11y.notify(s.params.nextSlideMessage);
          }
        }
        else if ($(event.target).is(s.params.prevButton)) {
          s.onClickPrev(event);
          if (s.isBeginning) {
            s.a11y.notify(s.params.firstSlideMessage);
          }
          else {
            s.a11y.notify(s.params.prevSlideMessage);
          }
        }
        if ($(event.target).is('.' + s.params.bulletClass)) {
          $(event.target)[0].click();
        }
      },

      liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),

      notify: function (message) {
        var notification = s.a11y.liveRegion;
        if (notification.length === 0) return;
        notification.html('');
        notification.html(message);
      },
      init: function () {
        // Setup accessibility
        if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
          s.a11y.makeFocusable(s.nextButton);
          s.a11y.addRole(s.nextButton, 'button');
          s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
        }
        if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
          s.a11y.makeFocusable(s.prevButton);
          s.a11y.addRole(s.prevButton, 'button');
          s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
        }

        $(s.container).append(s.a11y.liveRegion);
      },
      initPagination: function () {
        if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
          s.bullets.each(function () {
            var bullet = $(this);
            s.a11y.makeFocusable(bullet);
            s.a11y.addRole(bullet, 'button');
            s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
          });
        }
      },
      destroy: function () {
        if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
      }
    };


    /*=========================
      Init/Destroy
      ===========================*/
    s.init = function () {
      if (s.params.loop) s.createLoop();
      s.updateContainerSize();
      s.updateSlidesSize();
      s.updatePagination();
      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
        if (s.params.scrollbarDraggable) {
          s.scrollbar.enableDraggable();
        }
      }
      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        if (!s.params.loop) s.updateProgress();
        s.effects[s.params.effect].setTranslate();
      }
      if (s.params.loop) {
        s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
      }
      else {
        s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
        if (s.params.initialSlide === 0) {
          if (s.parallax && s.params.parallax) s.parallax.setTranslate();
          if (s.lazy && s.params.lazyLoading) {
            s.lazy.load();
            s.lazy.initialImageLoaded = true;
          }
        }
      }
      s.attachEvents();
      if (s.params.observer && s.support.observer) {
        s.initObservers();
      }
      if (s.params.preloadImages && !s.params.lazyLoading) {
        s.preloadImages();
      }
      if (s.params.zoom && s.zoom) {
        s.zoom.init();
      }
      if (s.params.autoplay) {
        s.startAutoplay();
      }
      if (s.params.keyboardControl) {
        if (s.enableKeyboardControl) s.enableKeyboardControl();
      }
      if (s.params.mousewheelControl) {
        if (s.enableMousewheelControl) s.enableMousewheelControl();
      }
      // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
      if (s.params.hashnavReplaceState) {
        s.params.replaceState = s.params.hashnavReplaceState;
      }
      if (s.params.history) {
        if (s.history) s.history.init();
      }
      if (s.params.hashnav) {
        if (s.hashnav) s.hashnav.init();
      }
      if (s.params.a11y && s.a11y) s.a11y.init();
      s.emit('onInit', s);
    };

    // Cleanup dynamic styles
    s.cleanupStyles = function () {
      // Container
      s.container.removeClass(s.classNames.join(' ')).removeAttr('style');

      // Wrapper
      s.wrapper.removeAttr('style');

      // Slides
      if (s.slides && s.slides.length) {
        s.slides
          .removeClass([
            s.params.slideVisibleClass,
            s.params.slideActiveClass,
            s.params.slideNextClass,
            s.params.slidePrevClass
          ].join(' '))
          .removeAttr('style')
          .removeAttr('data-swiper-column')
          .removeAttr('data-swiper-row');
      }

      // Pagination/Bullets
      if (s.paginationContainer && s.paginationContainer.length) {
        s.paginationContainer.removeClass(s.params.paginationHiddenClass);
      }
      if (s.bullets && s.bullets.length) {
        s.bullets.removeClass(s.params.bulletActiveClass);
      }

      // Buttons
      if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
      if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);

      // Scrollbar
      if (s.params.scrollbar && s.scrollbar) {
        if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
        if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
      }
    };

    // Destroy
    s.destroy = function (deleteInstance, cleanupStyles) {
      // Detach evebts
      s.detachEvents();
      // Stop autoplay
      s.stopAutoplay();
      // Disable draggable
      if (s.params.scrollbar && s.scrollbar) {
        if (s.params.scrollbarDraggable) {
          s.scrollbar.disableDraggable();
        }
      }
      // Destroy loop
      if (s.params.loop) {
        s.destroyLoop();
      }
      // Cleanup styles
      if (cleanupStyles) {
        s.cleanupStyles();
      }
      // Disconnect observer
      s.disconnectObservers();

      // Destroy zoom
      if (s.params.zoom && s.zoom) {
        s.zoom.destroy();
      }
      // Disable keyboard/mousewheel
      if (s.params.keyboardControl) {
        if (s.disableKeyboardControl) s.disableKeyboardControl();
      }
      if (s.params.mousewheelControl) {
        if (s.disableMousewheelControl) s.disableMousewheelControl();
      }
      // Disable a11y
      if (s.params.a11y && s.a11y) s.a11y.destroy();
      // Delete history popstate
      if (s.params.history && !s.params.replaceState) {
        window.removeEventListener('popstate', s.history.setHistoryPopState);
      }
      if (s.params.hashnav && s.hashnav) {
        s.hashnav.destroy();
      }
      // Destroy callback
      s.emit('onDestroy');
      // Delete instance
      if (deleteInstance !== false) s = null;
    };

    s.init();



    // Return swiper instance
    return s;
  };


  /*==================================================
      Prototype
  ====================================================*/
  Swiper.prototype = {
    isSafari: (function () {
      var ua = window.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    })(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    isArray: function (arr) {
      return Object.prototype.toString.apply(arr) === '[object Array]';
    },
    /*==================================================
    Browser
    ====================================================*/
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
      lteIE9: (function () {
        // create temporary DIV
        var div = document.createElement('div');
        // add content to tmp DIV which is wrapped into the IE HTML conditional statement
        div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
        // return true / false value based on what will browser render
        return div.getElementsByTagName('i').length === 1;
      })()
    },
    /*==================================================
    Devices
    ====================================================*/
    device: (function () {
      var ua = window.navigator.userAgent;
      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      return {
        ios: ipad || iphone || ipod,
        android: android
      };
    })(),
    /*==================================================
    Feature Detection
    ====================================================*/
    support: {
      touch: (window.Modernizr && Modernizr.touch === true) || (function () {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
      })(),

      transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
        var div = document.createElement('div').style;
        return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
      })(),

      flexbox: (function () {
        var div = document.createElement('div').style;
        var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
        for (var i = 0; i < styles.length; i++) {
          if (styles[i] in div) return true;
        }
      })(),

      observer: (function () {
        return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
      })(),

      passiveListener: (function () {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function () {
              supportsPassive = true;
            }
          });
          window.addEventListener('testPassiveListener', null, opts);
        } catch (e) { }
        return supportsPassive;
      })(),

      gestures: (function () {
        return 'ongesturestart' in window;
      })()
    },
    /*==================================================
    Plugins
    ====================================================*/
    plugins: {}
  };


  /*===========================
   Get Dom libraries
   ===========================*/
  var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
  for (var i = 0; i < swiperDomPlugins.length; i++) {
    if (window[swiperDomPlugins[i]]) {
      addLibraryPlugin(window[swiperDomPlugins[i]]);
    }
  }
  // Required DOM Plugins
  var domLib;
  if (typeof Dom7 === 'undefined') {
    domLib = window.Dom7 || window.Zepto || window.jQuery;
  }
  else {
    domLib = Dom7;
  }


  /*===========================
  Add .swiper plugin from Dom libraries
  ===========================*/
  function addLibraryPlugin(lib) {
    lib.fn.swiper = function (params) {
      var firstInstance;
      lib(this).each(function () {
        var s = new Swiper(this, params);
        if (!firstInstance) firstInstance = s;
      });
      return firstInstance;
    };
  }

  if (domLib) {
    if (!('transitionEnd' in domLib.fn)) {
      domLib.fn.transitionEnd = function (callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
          i, j, dom = this;
        function fireCallBack(e) {
          /*jshint validthis:true */
          if (e.target !== this) return;
          callback.call(this, e);
          for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
          }
        }
        if (callback) {
          for (i = 0; i < events.length; i++) {
            dom.on(events[i], fireCallBack);
          }
        }
        return this;
      };
    }
    if (!('transform' in domLib.fn)) {
      domLib.fn.transform = function (transform) {
        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
        }
        return this;
      };
    }
    if (!('transition' in domLib.fn)) {
      domLib.fn.transition = function (duration) {
        if (typeof duration !== 'string') {
          duration = duration + 'ms';
        }
        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
        }
        return this;
      };
    }
    if (!('outerWidth' in domLib.fn)) {
      domLib.fn.outerWidth = function (includeMargins) {
        if (this.length > 0) {
          if (includeMargins)
            return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
          else
            return this[0].offsetWidth;
        }
        else return null;
      };
    }
  }


  window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (typeof (module) !== 'undefined') {
  module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
  define([], function () {
    'use strict';
    return window.Swiper;
  });
}

//# sourceMappingURL=maps/swiper.jquery.js.map

// main
$(function () {
  (function () {
    $.fn.exists = function () {
      return this.length > 0;
    };
    var isMobileDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone/gi).test(navigator.appVersion);
    var utilitiesScrollTo = function ($obj, speed) {
      if (typeof speed == 'undefined') {
        speed = 400;
      }
      if ($obj.exists()) {
        var windowTop = $(document).scrollTop();
        var windowBottom = windowTop + $(window).height();
        var objectTop = $obj.offset().top;
        if (objectTop > windowTop && objectTop < windowBottom) {
          return;
        }
      }
      $.scrollTo($obj, speed, { offset: -200 });
    };
    var utilitiesAjaxRequest = function (sender, params, successCallback) {
      var url = window.location.href;
      if (url.indexOf('#') > 0) {
        url = url.substring(0, url.indexOf('#'));
      }
      $.ajax({
        url: url + (url.indexOf('?') >= 0 ? '&' : '?') + 'mode=async&format=json&' + $.param(params),
        type: 'GET',
        beforeSend: function () {
          $(sender).block({ message: null });
        },
        complete: function () {
          $(sender).unblock();
        },
        success: function (json) {
          if (typeof json != 'object') {
            json = JSON.parse(json);
          }
          if (json && successCallback) {
            successCallback(json);
          }
        },
      });
    };
    var utilitiesGetBlock = function (blockId, sender, args, params) {
      var url = (args.url ? args.url : window.location.href);
      if (url.indexOf('#') > 0) {
        url = url.substring(0, url.indexOf('#'));
      }
      $.ajax({
        url: url + (url.indexOf('?') >= 0 ? '&' : '?') + 'mode=async&function=get_block&block_id=' + blockId + (params ? '&' + $.param(params) : ''),
        type: 'GET',
        cache: false,
        beforeSend: function () {
          $(sender).block({ message: null });
          if (args.beforeSend) {
            args.beforeSend(sender);
          }
        },
        complete: function () {
          $(sender).unblock();
          if (args.complete) {
            args.complete(sender);
          }
        },
        success: function (html) {
          if (args.success) {
            args.success(sender, html);
          }
        },
        error: function () {
          if (args.error) {
            args.error(sender);
          }
        }
      });
    };
    var utilitiesParseParameters = function (str) {
      var result = {};
      if (str) {
        var params = str.split(';');
        for (var i = 0; i < params.length; i++) {
          var pair = params[i].split(':');
          if (pair.length == 2) {
            var paramNames = pair[0].split('+');
            for (var j = 0; j < paramNames.length; j++) {
              result[paramNames[j]] = decodeURIComponent(pair[1]).replace(/[+]/g, ' ');
            }
          }
        }
      }
      return result;
    };
    var utilitiesReloadBlock = function (blockId, sender, scroll, animate) {
      if (!blockId) {
        window.location.reload();
        return;
      }
      var params = null;

      var args = {};
      args.success = function (sender, html) {
        var animationOpacity = 0.1;
        if (!animate) {
          animationOpacity = 1;
        }
        if (scroll) {
          utilitiesScrollTo($('#' + blockId));
        }
        $('#' + blockId).animate({ opacity: animationOpacity }, 400, function () {
          var div = document.createElement('div');
          div.innerHTML = html;

          var content = $(div).children().first();
          $(content).css('opacity', animationOpacity);
          $(this).replaceWith(content);
          $('#' + blockId).animate({ opacity: 1 }, 400);
          initKVSLists($('#' + blockId));
        });
      };

      var errorTries = 0;
      args.error = function () {
        errorTries++;
        var hasFromParameter = false;
        for (var paramName in params) {
          if (params.hasOwnProperty(paramName)) {
            if (paramName.indexOf('from') == 0 && parseInt(params[paramName]) > 1) {
              params[paramName] = parseInt(params[paramName]) - 1;
              if (errorTries > 1) {
                params[paramName] = 1;
              }
              hasFromParameter = true;
            }
          }
        }
        if (!hasFromParameter) {
          params = null;
        }

        if (errorTries > 1) {
          delete args.error;
        }

        utilitiesGetBlock(blockId, sender, args, params);
      };

      utilitiesGetBlock(blockId, sender, args, params);
    };

    "use strict";
    'use strict';

    var initKVSMasonry = function initKVSMasonry(container, opt) {
      if (container === undefined) {
        var container = $('.masonry');
      }
      var defaultOptions = {
        itemSelector: '.masonry-item',
        percentPosition: true
      };
      if (opt) {
        $.extend(defaultOptions, opt);
      } else {
        var _opt = defaultOptions;
      }
      var masonryEl = container.each(function () {
        var $module = $(this);
        var update = function update() {
          $module.masonry('layout');
        };
        this.addEventListener('load', update, true);
        return $module.masonry(defaultOptions);
      });
      return masonryEl;
    };

    var initKVSPlayTrailerOnHover = function initKVSPlayTrailerOnHover() {
      var timeout1;
      var timeout2;
      var interval;
      var count = 0;
      function trailerPlay(el) {
        var $this = el;
        var $video = $this.find('video');
        var $image = $this.find('img');
        if ($video.length) {
          $video.get(0).play();
          $image.hide();
        } else {
          var $loader = $('<div class="preview-progress"></div>');
          $this.append($loader);
          setTimeout(function () {
            $loader.addClass('is-full');
          });

          timeout1 = setTimeout(function () {
            //avoid downloading video with quick hover
            var video_url = $this.attr('data-preview');
            var $new_video = $('<video autoplay loop muted playsinline src="' + video_url + '">');

            function playVideo() {
              $this.append($new_video);
              $new_video.get(0).play();
              $image.hide();
              $loader.remove();
            }
            timeout2 = setTimeout(function () {
              if ($new_video.get(0).readyState > 0) {
                //play video if already loaded in 1000 ms
                playVideo();
              } else {
                interval = setInterval(function () {
                  //wait and play once loaded
                  if ($new_video.get(0).readyState > 0) {
                    playVideo();
                    clearInterval(interval);
                  }
                }, 100);
              }
            }, 1000);
          }, 200);
        }
      }
      $('[data-preview]').swipe({
        swipeLeft: function swipeLeft(event, direction, distance, duration, fingerCount) {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearInterval(interval);
          $('[data-preview]').each(function (idx) {
            var $this = $(this);
            var $video = $this.find('video');
            if ($video.length) {
              $video.get(0).pause();
            }
            $this.find('.preview-progress').remove();
          });
          trailerPlay($(this));
        },
        swipeRight: function swipeRight(event, direction, distance, duration, fingerCount) {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearInterval(interval);
          $('[data-preview]').each(function (idx) {
            var $this = $(this);
            var $video = $this.find('video');
            if ($video.length) {
              $video.get(0).pause();
            }
            $this.find('.preview-progress').remove();
          });
          trailerPlay($(this));
        },
        preventDefaultEvents: false,
        // fix
        threshold: 80
      });
      $('body').on('mouseenter', '[data-preview]', function () {
        trailerPlay($(this));
      }).on('mouseleave', '[data-preview]', function () {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearInterval(interval);
        var $this = $(this);
        var $video = $this.find('video');
        if ($video.length) {
          $video.get(0).pause();
        }
        $this.find('.preview-progress').remove();
      });
    };

    var initKVSLists = function initKVSLists($container) {
      if (!$container) {
        $container = $(document);
      }

      //     if (typeof Storage !== 'undefined') {
      //         var ajaxIds = {};
      //         $container.find('[data-action="ajax"]').each(function() {
      //             var id = $(this).attr('data-block-id');
      //             if (!ajaxIds[id]) {
      //                 ajaxIds[id] = true;
      //             }
      //         });

      //         var userId = '';
      //         if (pageContext && pageContext['userId']) {
      //             userId = pageContext['userId'] + ':';
      //         }

      //         for (var blockId in ajaxIds) {
      //             if (ajaxIds.hasOwnProperty(blockId)) {
      //                 var html = sessionStorage.getItem(userId + location.href + '#' + blockId);
      //                 if (!html) {
      //                     html = sessionStorage.getItem(location.href + '#' + blockId);
      //                 }
      //                 if (html) {
      //                     $('#' + blockId).html(html).find('[data-fancybox="ajax"]').each(function() {
      //                         $(this).click(function(e) {
      //                             e.preventDefault();
      //                             utilitiesAjaxFancyBox($(this), this.href || $(this).attr('data-href'));
      //                         });
      //                     });
      //                 }
      //                 var params = sessionStorage.getItem(userId + location.href + '#' + blockId + ':params');
      //                 if (!params) {
      //                     params = sessionStorage.getItem(location.href + '#' + blockId + ':params');
      //                 }
      //                 if (params) {
      //                     try {
      //                         storage[blockId] = JSON.parse(params);
      //                     } catch (e) {}

      //                     if (listNonCachableBlocks[blockId]) {
      //                         $('#' + blockId).find('img.lazy-load').removeClass('lazy-load');
      //                         utilitiesReloadBlock(blockId, blockId, false, false);
      //                     }
      //                 }
      //             }
      //         }
      //     }
      // } else {
      //     $container.find('[data-fancybox="ajax"]').each(function() {
      //         $(this).click(function(e) {
      //             e.preventDefault();
      //             utilitiesAjaxFancyBox($(this), this.href || $(this).attr('data-href'));
      //         });
      //     });
      // }

      if ($.fn.thumbs) {
        $container.find('img[data-cnt]').thumbs();
      }

      $container.find('[data-action="ajax"]').on('click', function (e) {
        e.preventDefault();

        var args = {};
        var $sender = $(this);
        var appendTo = $sender.attr('data-append-items-to');
        var maxQueries = parseInt($sender.attr('data-max-queries')) || 0;
        var blockId = $sender.attr('data-block-id');
        var $blockId = $('#' + blockId);
        if (!blockId || $sender.hasClass('is-active')) {
          return;
        }
        var containerId = $sender.attr('data-container-id');

        if (maxQueries && appendTo) {
          var currentQueries = parseInt($('#' + appendTo).attr('data-current-queries')) || 0;
          if (currentQueries < maxQueries) {
            currentQueries++;
            if (currentQueries == maxQueries) {
              $('#' + containerId).remove();
            } else {
              $('#' + appendTo).attr('data-current-queries', currentQueries);
            }
          } else {
            return;
          }
        }

        var params = utilitiesParseParameters($sender.attr('data-parameters'));

        var userId = '';

        args.success = function (sender, html) {
          if (appendTo) {
            var resultElement = document.createElement('DIV');
            resultElement.innerHTML = html;

            if (containerId) {
              var $newContainer = $(resultElement).find('#' + containerId);
              if ($newContainer.exists()) {
                $('#' + containerId).replaceWith($newContainer);
                initKVSLists($newContainer);
              } else {
                $('#' + containerId).remove();
              }
            }
            var $itemsToAppend = $(resultElement).find('#' + appendTo + ' .js-item');
            $itemsToAppend.css({ display: 'none' });
            if ($('#' + appendTo).attr('data-append-to-beginning') == 'true') {
              $itemsToAppend.insertBefore($('#' + appendTo).find('.js-item').first());
            } else {
              $itemsToAppend.insertAfter($('#' + appendTo).find('.js-item').last());
            }
            $itemsToAppend.fadeIn().promise().done(function () {
              for (var paramName in params) {
                if (params.hasOwnProperty(paramName)) {
                  if (paramName.indexOf('from') == 0 && parseInt(params[paramName]) > 1) {
                    delete params[paramName];
                    break;
                  }
                }
              }
              // if (!listNonCachableBlocks[blockId]) {
              //     if (typeof Storage !== 'undefined') {
              //         sessionStorage.setItem(userId + location.href + '#' + blockId, $('#' + blockId).html());
              //         sessionStorage.setItem(
              //             userId + location.href + '#' + blockId + ':params',
              //             JSON.stringify(params),
              //         );
              //     }
              // }
            });
            $('#' + blockId + '_items').masonry('appended', $itemsToAppend);
            // console.log();
            // $(`${blockId}_items`).masonry('layoutItems', $itemsToAppend );
            // $(`${blockId}_items`).masonry('layout');
            initKVSLists($itemsToAppend);
            if (window.tabsSwiper) {
              tabsSwiper.updateAutoHeight();
            }
          } else {
            setTimeout(function () {
              utilitiesScrollTo($('#' + blockId));
              var div = document.createElement('div');
              div.innerHTML = html;
              var content = $(div).find('#' + blockId);
              $blockId.replaceWith(content);
              initKVSLists($('#' + blockId));
              initKVSMasonry();
              if (window.tabsSwiper) {
                tabsSwiper.updateAutoHeight();
              }
            }, 250);
          }
        };
        utilitiesGetBlock(blockId, containerId ? $('#' + containerId) : $sender, args, params);
      });

      $container.find('[data-hide-thumbs]').on('click', function (e) {
        e.preventDefault();
        var $sender = $(this);
        var blockId = $sender.attr('data-block-id');
        $sender.closest('#' + blockId).toggleClass('is-hidden-thumbs');
      });

      $container.find('[data-rt]').mousedown(function () {
        console.log("troca página");
        var rotatorParams = $(this).attr('data-rt');
        if (rotatorParams) {
          var url = window.location.href;
          if (url.indexOf('#') > 0) {
            url = url.substring(0, url.indexOf('#'));
          }
          var img = new Image();
          img.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'mode=async&action=rotator_videos&pqr=' + rotatorParams;
          $(this).attr('data-rt', '');
        }
      });

      $container.find('[data-playlist-item]').on('click', function (e) {
        e.preventDefault();

        $container.find('[data-playlist-item]').removeClass('is-selected');

        var $item = $(this);
        $item.addClass('is-selected');

        var playlistItemUrl = $item.attr('data-playlist-item');
        if (playlistItemUrl) {

          var args = {};
          args.url = playlistItemUrl;
          args.success = function (sender, html) {
            $('.player').html('').append($(html.trim()).find('.player__holder'));
            $('.player__holder').find('[data-magnific="ajax"]').each(function () {
              $(this).click(function (e) {
                e.preventDefault();
                utilitiesAjaxMagnific($(this), this.href || $(this).attr('data-href'));
              });
            });
            $('.player__holder').find('[data-form="ajax"]').each(function () {
              utilitiesAjaxForm($(this));
            });
            setTimeout(function () {
              utilitiesScrollTo($('.player'), 200);
            }, 0);
          };
          utilitiesGetBlock('video_view_video_view', $item, args);
        }
      });

      var $defaultItem = $container.find('[data-playlist-item]').first();
      if ($defaultItem.exists()) {
        $defaultItem.addClass('is-selected').click();
      }

      $container.find('[data-fav-video-id]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $link = $(this);
        var videoId = $link.attr('data-fav-video-id');
        var favType = $link.attr('data-fav-type') || 0;
        var favAction = $link.attr('data-fav-action');
        var blockId = $link.attr('data-block-id');
        var params = {
          action: favAction,
          video_id: videoId,
          video_ids: [videoId],
          fav_type: favType,
          playlist_id: 0
        };
        if (favAction == 'delete_from_favourites') {
          params = {
            action: favAction,
            fav_type: favType,
            playlist_id: 0,
            delete: [videoId],
            block_id: blockId,
            function: 'get_block'
          };
        }
        utilitiesAjaxRequest($link, params, function (json) {
          if (json.status == 'failure' && json.errors && json.errors[0] && json.errors[0].code == 'not_logged_in') {
          } else if (favAction == 'add_to_favourites') {
            $link.addClass('is-fixed');
            $link.attr('data-fav-action', 'delete_from_favourites');
          } else {
            $link.removeClass('is-fixed');
            $link.attr('data-fav-action', 'add_to_favourites');
          }
        });
      });

      $container.find('[data-fav-album-id]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $link = $(this);
        var albumId = $link.attr('data-fav-album-id');
        var favType = $link.attr('data-fav-type') || 0;
        var favAction = $link.attr('data-fav-action');
        var blockId = $link.attr('data-block-id');
        var params = {
          action: favAction,
          album_id: albumId,
          album_ids: [albumId],
          fav_type: favType,
          playlist_id: 0
        };
        if (favAction == 'delete_from_favourites') {
          params = {
            action: favAction,
            fav_type: favType,
            playlist_id: 0,
            delete: [albumId],
            block_id: blockId,
            function: 'get_block'
          };
        }
        utilitiesAjaxRequest($link, params, function (json) {
          if (json.status == 'failure' && json.errors && json.errors[0] && json.errors[0].code == 'not_logged_in') {

          } else if (favAction == 'add_to_favourites') {
            $link.addClass('is-fixed');
            $link.attr('data-fav-action', 'delete_from_favourites');
          } else {
            $link.removeClass('is-fixed');
            $link.attr('data-fav-action', 'add_to_favourites');
          }
        });
      });

      function createDeleteCallback($form, $sender, blockId) {
        return function (json) {
          if (json.status == 'success') {
            utilitiesReloadBlock(blockId, $sender, true, true);
            if ($form.attr('data-refresh-block-ids')) {
              var blockIds = $form.attr('data-refresh-block-ids').split(',');
              for (var j = 0; j < blockIds.length; j++) {
                utilitiesReloadBlock(blockIds[j], $sender, false, true);
              }
            } else if ($sender.attr('data-redirect-url')) {
              window.location = $sender.attr('data-redirect-url');
            }
          } else {
            for (var i = 0; i < json.errors.length; i++) {
              var error = json.errors[i];
              var errorMessage = error.message;
              if (errorMessage) {
                $form.find('.generic-error').empty().text(errorMessage).fadeIn();
              }
            }
            utilitiesScrollTo($('#' + blockId), 0);
          }
        };
      }

      $container.find('[data-action="select"]').each(function () {
        $(this).find('label').on('click', function (e) {
          e.stopPropagation();
        });
        $(this).on('click', function (e) {
          if ($(this).hasClass('disabled')) {
            return;
          }
          var $form = $(this).parents('form');
          var $checkbox = $(this).find('input');
          if (!$(e.target).is($checkbox)) {
            $checkbox.prop('checked', !$checkbox.prop('checked'));
          }
          var selectedNumber = parseInt($form.attr('data-selected-cnt')) || 0;
          if ($checkbox.prop('checked')) {
            $(this).addClass('is-active');
            selectedNumber++;
          } else {
            $(this).removeClass('is-active');
            selectedNumber = Math.max(selectedNumber - 1, 0);
          }
          $form.find('[data-mode="selection"]').prop('disabled', selectedNumber == 0);
          $form.find('[data-action="select_all"]').toggleClass('is-active', selectedNumber == $form.find('input[type=checkbox]').length - $form.find('input[type=checkbox][disabled]').length);
          $form.attr('data-selected-cnt', selectedNumber);
          console.log(selectedNumber);
        });
      });

      $container.find('[data-action="choose"]').each(function () {
        $(this).click(function () {
          if ($(this).hasClass('disabled')) {
            return;
          }

          var $form = $(this).parents('form');
          var $radio = $(this).find('input');
          $radio.prop('checked', true);

          if ($radio.prop('checked')) {
            $form.find('[data-action="choose"]').removeClass('is-active');
            $(this).addClass('is-active');
          }
        });
      });

      $container.find('[data-action="delete"]').each(function () {
        $(this).click(function (e) {
          e.preventDefault();

          if ($(this).hasClass('disabled')) {
            return;
          }

          var $form = $(this).parents('form');
          var $button = $(this);
          var confirmText = $button.attr('data-confirm') || '';
          if (!confirmText || confirm(confirmText)) {
            var objectId = $button.attr('data-id');
            if (!objectId) {
              return;
            }

            var blockId = $form.attr('data-block-id');
            var params = utilitiesParseParameters($form.attr('data-parameters'));
            params['function'] = 'get_block';
            params['block_id'] = blockId;
            params['delete'] = [objectId];
            utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
          }
        });
      });

      $container.find('form[data-controls]').each(function () {
        var $form = $(this);
        var blockId = $form.attr('data-block-id');

        $form.find('button[type="button"]').each(function () {
          $(this).click(function (e) {
            e.preventDefault();

            var $button = $(this);
            var confirmText = $button.attr('data-confirm') || '';
            if (confirmText) {
              var selectedNumber = parseInt($form.attr('data-selected-cnt')) || 0;
              confirmText = confirmText.replace(/\[count\](.*)\[\/count\]/gi, function (match, p1) {
                var defaultValue = '';
                var values = p1.split('||');
                for (var i = 0; i < values.length; i++) {
                  var temp = values[i].split(':', 2);
                  if (temp.length == 1) {
                    defaultValue = temp[0].trim();
                  } else {
                    var compareExamples = temp[0].split(',');
                    for (var j = 0; j < compareExamples.length; j++) {
                      var compareExample = compareExamples[j].trim();
                      if (compareExample.indexOf('//') == 0) {
                        if (selectedNumber % 100 == parseInt(compareExample.substring(2))) {
                          return temp[1].trim().replace('%1%', '' + selectedNumber);
                        }
                      } else if (compareExample.indexOf('/') == 0) {
                        if (selectedNumber % 10 == parseInt(compareExample.substring(1))) {
                          return temp[1].trim().replace('%1%', '' + selectedNumber);
                        }
                      } else if (selectedNumber == parseInt(temp[0].trim())) {
                        return temp[1].trim().replace('%1%', '' + selectedNumber);
                      }
                    }
                  }
                }
                return defaultValue;
              }).replace('%1%', '' + selectedNumber);
            }
            var params = {};
            if (!confirmText || confirm(confirmText)) {
              if ($button.attr('data-action') == 'select_all') {
                if ($button.hasClass('is-active')) {
                  $form.find('input[type=checkbox]').each(function () {
                    if (this.checked) {
                      $(this).click();
                    }
                  });
                } else {
                  $form.find('input[type=checkbox]').each(function () {
                    if (!this.checked) {
                      $(this).click();
                    }
                  });
                }
              } else if ($button.attr('data-action') == 'delete_multi') {
                params = utilitiesParseParameters($form.attr('data-parameters'));
                params['function'] = 'get_block';
                params['block_id'] = blockId;
                params['delete'] = [];
                $form.find('input[type=checkbox]').each(function () {
                  if (this.checked) {
                    params['delete'].push(this.value);
                  }
                });

                utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
              } else if ($button.attr('data-action') == 'move_multi') {
                var playlistSelectorUrl = $button.attr('data-href');
                if (playlistSelectorUrl) {
                  utilitiesAjaxMagnific($button, playlistSelectorUrl, function () {
                    var $inner_form = this.inner.find('form');
                    utilitiesAjaxForm($inner_form, {
                      beforeSubmit: function beforeSubmit($inner_form) {
                        $.magnificPopup.close();

                        var playlistId = parseInt($inner_form.find('[name="playlist_id"]:checked').val());
                        if (playlistId) {
                          params = utilitiesParseParameters($form.attr('data-parameters'));
                          params['function'] = 'get_block';
                          params['block_id'] = blockId;
                          params['move_to_playlist_id'] = playlistId;
                          params['delete'] = [];
                          $form.find('input[type=checkbox]').each(function () {
                            if (this.checked) {
                              params['delete'].push(this.value);
                            }
                          });

                          utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
                        } else {
                          var createPlaylistUrl = $inner_form.attr('data-create-playlist-url');
                          if (createPlaylistUrl) {
                            utilitiesAjaxMagnific($button, createPlaylistUrl, function () {
                              var $inner_form = this.inner.find('form');
                              utilitiesAjaxForm($inner_form, {
                                success: function success($inner_form, newPlaylistData) {
                                  $.magnificPopup.close();

                                  newPlaylistData = $(newPlaylistData);
                                  playlistId = newPlaylistData.attr('data-playlist-id');

                                  if (playlistId) {
                                    params = utilitiesParseParameters($form.attr('data-parameters'));
                                    params['function'] = 'get_block';
                                    params['block_id'] = blockId;
                                    params['move_to_playlist_id'] = playlistId;
                                    params['delete'] = [];
                                    $form.find('input[type=checkbox]').each(function () {
                                      if (this.checked) {
                                        params['delete'].push(this.value);
                                      }
                                    });

                                    utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
                                  }
                                }
                              });
                            });
                          }
                        }
                        return false;
                      }
                    });
                  });
                }
              } else if ($button.attr('data-action') == 'redirect') {
                var redirectUrl = $button.attr('data-redirect-url');
                if (!redirectUrl) {
                  return;
                }

                window.location = redirectUrl;
              } else if ($button.attr('data-action') == 'delete_playlist') {
                var playlistId = $button.attr('data-id');
                if (!playlistId) {
                  return;
                }

                params['action'] = 'delete_playlists';
                params['delete'] = [playlistId];
                utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
              } else if ($button.attr('data-action') == 'delete_dvd') {
                var dvdId = $button.attr('data-id');
                if (!dvdId) {
                  return;
                }

                params['action'] = 'delete_dvds';
                params['delete'] = [dvdId];
                utilitiesAjaxRequest($button, params, createDeleteCallback($form, $button, blockId));
              }
            }
          });
        });
      });
    };
    "use strict";
    'use strict';

    var initKVSCommentForm = function initKVSCommentForm() {
      var $blockComments = $('.js-comments');
      if ($blockComments.exists()) {
        var $captcha = $blockComments.find('.captcha img');
        if ($captcha.exists()) {
          if ($captcha.attr('data-src')) {
            $captcha.attr('src', $captcha.attr('data-src').replace(new RegExp('rand=\\d+'), 'rand=' + new Date().getTime()));
          } else {
            $captcha.attr('src', $captcha.attr('src').replace(new RegExp('rand=\\d+'), 'rand=' + new Date().getTime()));
          }
        }
        var $commentsForm = $blockComments.find('form');
        if ($commentsForm.exists()) {
          utilitiesLoadSmileys($blockComments);
          utilitiesAjaxForm($commentsForm, {
            success: function success($form, newCommentData) {
              var $anonymousUsernameField = $form.find('[name="anonymous_username"]');
              var anonymousUsername = $anonymousUsernameField.val();
              if (anonymousUsername) {
                Cookies.set('kt_anonymous_username', anonymousUsername, { path: '/' });
              }

              $form.get(0).reset();
              $anonymousUsernameField.val(anonymousUsername || '');

              var $captcha = $form.find('.captcha img');
              if ($captcha.exists()) {
                $captcha.attr('src', $captcha.attr('src').replace(new RegExp('rand=\\d+'), 'rand=' + new Date().getTime()));
              }

              var commentsBlockId = $blockComments.attr('data-block-id');
              var $commentsList = $blockComments.find('.js-list-comments');
              if (newCommentData && newCommentData['approved'] && commentsBlockId && $commentsList.exists()) {
                var args = {
                  success: function success(sender, html) {
                    if (typeof Storage !== 'undefined') {
                      var userId = '';

                    }

                    var resultElement = document.createElement('DIV');
                    resultElement.innerHTML = html;

                    var $newItem = $(resultElement).find('.js-item[data-comment-id="' + (newCommentData['comment_id'] || newCommentData['entry_id']) + '"]').addClass('is-hidden');
                    $blockComments.find('#' + commentsBlockId + '_items').prepend($newItem);
                    setTimeout(function () {
                      $commentsList.show();
                      console.log($commentsList);
                      $newItem.fadeIn();
                    }, 200);
                  }
                };
                utilitiesGetBlock(commentsBlockId, null, args);
              } else {
                $commentsForm.find('.message-success').show();
              }
            }
          });
        }
        $commentsForm.find('[name="anonymous_username"]').val(Cookies.get('kt_anonymous_username') || '');
      }
    };
    var initKVSCommentActions = function initKVSCommentActions() {
      $('.js-comments').on('click', '.comment-options button', function (e) {
        var $link = $(this);
        var $item = $(this).parents('.js-item');
        var $rating = $item.find('.comment-rating');
        var $ratingLinks = $item.find('.comment-like, .comment-dislike');
        var commentId = $item.attr('data-comment-id');

        if ($link.hasClass('comment-like') || $link.hasClass('comment-dislike')) {
          e.preventDefault();
          if ($link.hasClass('is-disabled')) {
            return;
          }
          var increment = $link.hasClass('comment-dislike') ? -1 : 1;
          utilitiesAjaxRequest($link, { action: 'vote_comment', vote: increment, comment_id: commentId }, function (json) {
            if (json['status'] == 'success') {
              $ratingLinks.fadeOut();
              if ($rating.exists()) {
                var ratingValue = parseInt($rating.html());
                if (!isNaN(ratingValue)) {
                  ratingValue += increment;
                  $rating.html(ratingValue);
                  if (ratingValue > 0) {
                    $rating.addClass('is-positive');
                  } else if (ratingValue < 0) {
                    $rating.addClass('is-negative');
                    $item.addClass('is-dim');
                  } else if (ratingValue == 0) {
                    $rating.removeClass('is-positive').removeClass('is-negative');
                    $item.removeClass('is-dim');
                  }
                }
              }
            } else {
              $ratingLinks.addClass('is-disabled');
            }
          });
        }
      });
    };
    "use strict";
    'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var initKVSSelect2 = function initKVSSelect2() {
      $('.js-tag-select').select2({
        minimumResultsForSearch: Infinity,
        theme: 'dark'
      });
      $('.js-light-select').select2({
        minimumResultsForSearch: Infinity,
        theme: 'light'
      });
      $('.js-icon-select').select2({
        minimumResultsForSearch: Infinity,
        theme: 'light',
        templateResult: formatIcon,
        templateSelection: formatIcon
      });
      function formatIcon(icon) {
        var originalId = icon.id,
          originalOption = icon.element,
          originalText = icon.text;
        if (!originalId) {
          return originalText;
        }
        var $icon = $('<svg class="icon icon--select"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + $(originalOption).data('icon') + '"></use></svg>' + ('<span class="select2-selection__text">' + originalText + '</span>'));
        return $icon;
      }
      $('#edit_video_tags, #edit_album_tags').on('change', function (e) {
        $(this).closest('form').find('input[name="tags"]').val($(this).val().toString());
      });
    };
    var utilitiesAjaxForm = function utilitiesAjaxForm($form, callbacks) {
      var considerFormBlocking = function considerFormBlocking($form, isBlock) {
        var $popupParent = $form.parents('.popup');
        if ($popupParent.exists()) {
          $form = $popupParent;
        }
        isBlock ? $form.block({ message: null }) : $form.unblock();
      };

      var defaultErrorMessage = 'Unexpected server response received. Please contact support.';


      $form.ajaxForm({
        data: {
          format: 'json',
          mode: 'async'
        },

        beforeSerialize: function beforeSerialize() {
          var $autoPopulates = $form.find('[data-form-populate-from]');
          $autoPopulates.each(function () {
            var populateFromName = $(this).attr('data-form-populate-from');
            if (populateFromName) {
              var $populateFrom = $form.find('[name="' + populateFromName + '"]');
              if ($populateFrom.exists()) {
                $(this).val($populateFrom.val());
              }
            }
          });
          if (callbacks && callbacks['beforeSerialize']) {
            callbacks['beforeSerialize']($form);
          }
        },

        beforeSubmit: function beforeSubmit(data) {
          var confirmText = $form.attr('data-confirm') || '';
          if (confirmText && !confirm(confirmText)) {
            return false;
          }

          var result = true;
          if (callbacks && callbacks['beforeSubmit']) {
            result = callbacks['beforeSubmit']($form, data);
          }
          considerFormBlocking($form, result);
          return result;
        },

        uploadProgress: function uploadProgress(event, position, total, percent) {
          if (callbacks && callbacks['uploadProgress']) {
            callbacks['uploadProgress']($form, percent);
          }
          considerFormBlocking($form, false);
        },

        success: function success(response, statusText, xhr) {
          $form.find('.message-error').empty().hide();
          considerFormBlocking($form, false);
          if (xhr.getResponseHeader('Content-Type').indexOf('application/json') >= 0) {
            if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object') {
              response = JSON.parse(response);
            }

            if (response['status'] == 'failure') {
              for (var i = 0; i < response['errors'].length; i++) {
                var error = response['errors'][i];

                var fieldName = error['field'];
                var errorCode = error['code'];
                var errorMessage = error['message'];

                var $errorContainer = null;
                if (fieldName) {
                  var $field = $form.find('[name="' + fieldName + '"]');
                  if (!$field.exists()) {
                    $field = $form.find('[data-name="' + fieldName + '"] [type="text"]');
                  }
                  if (!$field.exists()) {
                    $field = $form.find('[data-name="' + fieldName + '"] select');
                  }
                  if ($field.exists()) {
                    $field.addClass('is-error');
                    $field.parents('.file-control').find('[type="text"]').addClass('is-error');
                    $errorContainer = $field.parent().find('.validate--error');
                    if (!$errorContainer.exists()) {
                      var fieldTitle = $field.parent().find('label').text();
                      if (fieldTitle) {
                        errorMessage += ' (' + fieldTitle + ')';
                      }
                    }
                    if (i == 0) {
                      $field.focus();
                    }
                  } else {
                    errorMessage += ' (' + fieldName + ')';
                  }
                }
                if (!$errorContainer || !$errorContainer.exists()) {
                  $errorContainer = $form.find('.message-error');
                }

                $errorContainer.empty().text(errorMessage).fadeIn();

                if (fieldName == 'code' && errorCode != 'required') {
                  var $captcha = $form.find('.captcha img');
                  if ($captcha.exists()) {
                    $captcha.attr('src', $captcha.attr('src').replace(new RegExp('rand=\\d+'), 'rand=' + new Date().getTime()));
                    $form.find('.captcha .field').val('');
                  }
                }
              }
              if (callbacks && callbacks['error']) {
                callbacks['error']($form);
              }
              // utilitiesScrollTo($form, 0);
            } else if (response['status'] == 'success') {
              if (callbacks && callbacks['success']) {
                callbacks['success']($form, response['data']);
              } else if (response['redirect']) {
                window.location = response['redirect'];
              } else {
                var $reloader = $('[data-reload-to]');
                if ($reloader.exists()) {
                  window.location = $reloader.attr('data-reload-to');
                } else {
                  window.location.reload();
                }
              }
            } else {
              $form.find('.message-error').text(defaultErrorMessage).show();
              // utilitiesScrollTo($form, 0);
              if (callbacks && callbacks['error']) {
                callbacks['error']($form);
              }
            }
          } else if (xhr.getResponseHeader('Content-Type').indexOf('text/html') >= 0) {
            if (callbacks && callbacks['success']) {
              callbacks['success']($form, response);
            } else {
              if ($(response).attr('data-magnific') == 'message' || $(response).find('[data-magnific="message"]').exists()) {
                utilitiesAjaxMagnific(null, $(response), 'inline', {
                  beforeClose: function beforeClose() {
                    var $redirectTo = this.inner.find('[data-magnific-redirect-to]');
                    if ($redirectTo.exists()) {
                      window.location = $redirectTo.attr('data-magnific-redirect-to');
                    } else {
                      window.location.reload();
                    }
                    return true;
                  }
                });
              } else {
                $form.empty().append(response);
              }
            }
          } else {
            $form.find('.message-error').text(defaultErrorMessage).show();
            // utilitiesScrollTo($form, 0);
            if (callbacks && callbacks['error']) {
              callbacks['error']($form);
            }
          }
        },

        error: function error() {
          considerFormBlocking($form, false);
          $form.find('.message-error').text(defaultErrorMessage).show();
          // utilitiesScrollTo($form, 0);
          if (callbacks && callbacks['error']) {
            callbacks['error']($form);
          }
        },

        complete: function complete() {
          if (callbacks && callbacks['complete']) {
            callbacks['complete']($form);
          }
        }
      });

      $form.find('input, select, textarea').each(function () {
        var $field = $(this);

        var hideErrorFunction = function hideErrorFunction() {
          var $errorContainer = $field.parent().find('.validate--error');
          $errorContainer.fadeOut();
          $field.removeClass('is-error');
          $field.parents('fieldset').removeClass('is-error');
          $field.parents('.file-control').find('[type="text"]').removeClass('is-error');
        };

        $field.change(hideErrorFunction);
        if ($field.get(0).tagName.toLowerCase() == 'textarea' || $field.get(0).type == 'text' || $field.get(0).type == 'password') {
          $field.keypress(hideErrorFunction);
        }
      });

      $form.find('.file-control [type="file"]').change(function () {
        var $input = $(this);
        var value = $input.val();
        if (value.lastIndexOf('/') >= 0) {
          value = value.substring(value.lastIndexOf('/') + 1);
        }
        if (value.lastIndexOf('\\') >= 0) {
          value = value.substring(value.lastIndexOf('\\') + 1);
        }
        var files = $input.prop('files');
        if (files && files.length > 1) {
          value = '';
          for (var i = 0; i < files.length; i++) {
            if (value) {
              value += ', ';
            }
            if (i >= 3) {
              value += '...';
              break;
            }
            value += files[i].name;
          }
        }
        var $container = $input.parents('.file-control');
        if ($input.attr('multiple') && (!files || files.length == 1)) {
          var $clone = $container.clone(true, true);
          $clone.wrap('<form>').parent('form').trigger('reset');
          $clone.unwrap();
          $container.parent().append($clone);
          if (tabsSwiper) {
            tabsSwiper.updateAutoHeight();
          }
        }
        $container.find('[type="text"]').val(value);
      });
      $form.find('.smileys-support img').each(function () {
        $(this).attr('title', $(this).attr('alt'));
        $(this).click(function () {
          var $textarea = $(this).parents('.smileys-support').find('textarea');
          if (!$textarea.exists()) {
            return;
          }
          var textarea = $textarea.get(0);
          var smiley = $(this).attr('alt');

          if (document.selection) {
            textarea.focus();
            var sel = document.selection.createRange();
            sel.text = smiley;
            textarea.focus();
          } else if (textarea.selectionStart || textarea.selectionStart == '0') {
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            var scrollTop = textarea.scrollTop;
            textarea.value = textarea.value.substring(0, startPos) + smiley + textarea.value.substring(endPos, textarea.value.length);
            textarea.focus();
            textarea.selectionStart = startPos + smiley.length;
            textarea.selectionEnd = startPos + smiley.length;
            textarea.scrollTop = scrollTop;
          } else {
            textarea.value += smiley;
            textarea.focus();
          }
        });
      });
      $form.find('[data-expand-id]').click(function () {
        var $button = $(this);
        var contentId = $button.attr('data-expand-id');
        if (contentId) {
          var $content = $('#' + contentId);
          if ($button.hasClass('expand')) {
            $content.slideDown(400, function () {
              $(window).trigger('scroll');
              if (storage['movable']) {
                storage['movable']();
              }
            });
            $button.removeClass('expand').addClass('collapse');
          } else {
            $content.slideUp(400, function () {
              if (storage['movable']) {
                storage['movable']();
              }
            });
            $button.removeClass('collapse').addClass('expand');
          }
        }
      });

      $form.find('[data-action="choose"]').each(function () {
        $(this).click(function () {
          if ($(this).hasClass('disabled')) {
            return;
          }

          var $form = $(this).parents('form');
          var $radio = $(this).find('input');
          $form.find('[data-action="choose"] [type="radio"]').prop('checked', false);
          $radio.prop('checked', true);

          if ($radio.prop('checked')) {
            $form.find('[data-action="choose"]').removeClass('active');
            $(this).addClass('active');

            var $captchaControl = $form.find('.captcha-control');
            if ($captchaControl.exists()) {
              if ($radio.attr('name') == 'payment_option') {
                $captchaControl.append($captchaControl.parent().find('[type="submit"]'));
                $captchaControl.parent().find('label').removeClass('hidden');
                $captchaControl.removeClass('hidden');
              } else if ($radio.attr('name') == 'card_package_id') {
                $captchaControl.parent().append($captchaControl.find('[type="submit"]'));
                $captchaControl.parent().find('label').addClass('hidden');
                $captchaControl.addClass('hidden');
              }
            }
          }
        });
      });
      initKVSSelect2();
    };
    var initKVSAjaxForms = function initKVSAjaxForms() {
      $('[data-form="ajax"]').each(function () {
        utilitiesAjaxForm($(this));
      });
    };
    'use strict';

    var initKVSGallery = function initKVSGallery() {
      var $galleryPrewiew = $('.js-gallery-preview');
      var $galleryImages = $('.js-gallery-images');
      var $galleryMasonry = $('.js-gallery-masonry');
      var instancePreview = $galleryPrewiew.swiper({
        nextButton: $galleryPrewiew.parent().find('.swiper-button-next')[0],
        prevButton: $galleryPrewiew.parent().find('.swiper-button-prev')[0],
        preloadImages: false,
        lazyLoading: true,
        onSlideChangeStart: function onSlideChangeStart(swiper, event) {
          $galleryImages.find('.js-gallery-item').removeClass('is-active');
          $galleryImages.find('.js-gallery-item').filter(function () {
            return $(this).data('index') === swiper.activeIndex;
          }).addClass('is-active');
        }
      });
      var swiperGal = $galleryImages.swiper({
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        scrollbarHide: false,
        preloadImages: false,
        lazyLoading: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        observeParents: true,
        observer: true
      });
      var $controls = $galleryImages.find('.js-gallery-item');

      function galleryControl() {
        var index = $(this).data('index');
        $controls.removeClass('is-active');
        instancePreview.slideTo(index);
        $(this).addClass('is-active');
        utilitiesScrollTo($galleryPrewiew, 400);
      }
      $controls.on('click', galleryControl);
      if (swiperGal) {
        swiperGal.on('lazyImageReady', function () {
          swiperGal.update();
        });
      }
      initKVSMasonry($galleryMasonry);
    };
    'use strict';

    var initKVSStickyHeader = function initKVSStickyHeader() {
      var sticky = $('.js-sticky');
      var stickyHeader = new Waypoint.Sticky({
        element: sticky[0]
      });
      return stickyHeader;
    };
    'use strict';

    var initKVSLanguages = function initKVSLanguages() {
      var $languageParent = $('.js-language');
      var $selectedNode = $languageParent.find('[data-selected]');
      var selectedValue = $selectedNode.data('lang-value');
      if (!selectedValue) {
        selectedValue = $languageParent.find('.js-language-switch').first().data('lang-value');
      }
      $languageParent.find('.js-language-icon').addClass('flag-icon-' + selectedValue);
      $languageParent.find('.js-language-name').text(selectedValue);

      $languageParent.find('.js-language-switch').on('click', function (e) {
        e.preventDefault();
        var value = $(this).data('lang-value');
        var optionId = $languageParent.first().data('id');
        if (optionId) {
          Cookies.set(optionId, value, { expires: 365, domain: '.' + window.location.hostname });
          window.location.reload();
        }
      });
    };
    'use strict';

    var initKVSNavigation = function initKVSNavigation() {
      var nav = priorityNav.init({
        breakPoint: 1,
        initClass: 'js-nav-priority',
        mainNavWrapper: '.js-nav-priority',
        navDropdownClassName: 'navigation__dropdown',
        navDropdownToggleClassName: 'navigation__dropdown-toggle',
        navDropdownLabel: '\n                <span class="navigation__icon">\n                    <svg class="icon icon--burger">\n                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#burger"></use>\n                    </svg>\n                </span>\n                <span class="navigation__text">More</span>\n                <span class="navigation__arrow">\n                    <svg class="icon icon--arrow-down">\n                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>\n                    </svg>\n                </span>',
        navDropdownBreakpointLabel: '\n        <span class="navigation__icon">\n            <svg class="icon icon--burger">\n                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#burger"></use>\n            </svg>\n        </span>\n        <span class="navigation__text">Menu</span>\n        <span class="navigation__arrow">\n            <svg class="icon icon--arrow-down">\n                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>\n            </svg>\n        </span>'
      });
    };
    var initKVSTouchMenu = function initKVSTouchMenu() {
      if (window.matchMedia('(max-width: 767px)').matches) {
        $('.js-open-user').on('click', function () {
          $('body').toggleClass('user-open');
          $('body').removeClass('nav-open');
        });
        $('.js-open-navigation').on('click', function () {
          $('body').toggleClass('nav-open');
          $('body').removeClass('user-open');
        });
      }
    };
    'use strict';

    var initKVSOrientation = function initKVSOrientation() {
      var $orientParent = $('.js-orientation');
      var $orientBtn = $orientParent.find('button');
      var param = $orientParent.data('orient-param');
      var defaultOrient = Cookies.get(param);
      if (defaultOrient !== undefined) {
        $orientBtn.removeClass('is-active');
        $orientBtn.filter(function (idx) {
          return $($orientBtn.eq(idx)).data('orient-id').toString() === defaultOrient;
        }).addClass('is-active');
      } else {
        $orientBtn.eq(0).addClass('is-active');
      }
      $orientBtn.on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('orient-id');
        $orientBtn.removeClass('is-active');
        $(this).addClass('is-active');
        if (id) {
          Cookies.set(param, id, { expires: 7, domain: '.' + window.location.hostname });
          window.location.reload();
        }
      });
    };
    'use strict';

    var utilitiesAjaxMagnific = function utilitiesAjaxMagnific($sender, url, type, afterShowCallback) {
      var popupOptions = {
        items: {
          src: url,
          type: type || 'ajax'
        },
        mainClass: 'mfp-vertical-top',
        type: 'ajax',
        removalDelay: 300,
        showCloseBtn: false,
        midClick: true,
        tLoading: '',
        fixedContentPos: true,
        callbacks: {
          ajaxContentAdded: function ajaxContentAdded() {
            if (!afterShowCallback) {
              $(this.content).find('[data-form="ajax"]').each(function () {
                utilitiesAjaxForm($(this));
              });
              $(this.content).find('[data-form="ajax-upload"]').each(function () {
                utilitiesVideoUploadForm($(this));
              });
              $(this.content).find('.js-tabs').each(function () {
                utilitiesTabs($(this));
              });
              initKVSSelect2();
            }
            if (afterShowCallback) {
              afterShowCallback.call(this);
            }
          },
          beforeClose: function beforeClose() {
            if ($(this.content).find('[data-magnific="refresh"]').exists()) {
              if ($sender && $sender.attr('data-magnific-refresh-id')) {
                utilitiesReloadBlock($sender.attr('data-magnific-refresh-id'), $sender, false, true);
              } else {
                window.location.reload();
              }
            } else if ($sender && $sender.attr('data-magnific-refresh-id')) {
              utilitiesReloadBlock($sender.attr('data-magnific-refresh-id'), $sender, false, true);
            } else if ($(this.content).find('[data-magnific-redirect-to]').exists()) {
              window.location.href = $(this.content).find('[data-magnific-redirect-to]').attr('data-magnific-redirect-to');
            }
            return true;
          }
        }
      };
      var animationTimeout = 0;
      if ($.magnificPopup.instance.isOpen) {
        $.magnificPopup.close();
        animationTimeout = popupOptions.removalDelay;
      }
      setTimeout(function () {
        $.magnificPopup.open(popupOptions, 0);
      }, animationTimeout);
    };
    var initKVSMagnific = function initKVSMagnific() {
      $(document).on('click', '[data-magnific="ajax"]', function (e) {
        e.preventDefault();
        utilitiesAjaxMagnific($(this), this.href || $(this).attr('data-src'));
      });
      $(document).on('click', '[data-magnific="close"]', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
      });
      if (window.location.href.indexOf('?login') > 0) {
        $('#login-btn').trigger('click');
      }
      if (window.location.href.indexOf('?signup') > 0) {
        $('#signup-btn').trigger('click');
      }
    };
    var utilitiesVideoUploadForm = function utilitiesVideoUploadForm(el) {
      var $form = $(el);
      var redirectUrl = $form.attr('data-redirect-url');
      var progressUrl = $form.attr('data-progress-url');
      var continueForm = $form.attr('data-continue-form');
      var $continueForm = $(continueForm);
      var previewUrl = $continueForm.attr('data-preview-url');
      var lastPercent = 0;
      var timeoutId = null;

      var progressFunction = function progressFunction(percent) {
        percent = Math.min(percent || 0, 100);
        if (percent > lastPercent) {
          $form.parent().find('.progress .progress-bar').stop(true, true).animate({ width: percent + '%' });
          $form.parent().find('.progress .progress-text').html(percent + '%');
          lastPercent = percent;
        }
      };

      utilitiesAjaxForm($form, {
        success: function success($form, uploadData) {
          $form.parent().find('.progress .progress-bar').css({ width: '100%' });
          if (uploadData && uploadData.filename && redirectUrl) {
            window.location = redirectUrl.replace('%HASH%', uploadData.filename);
          } else if (uploadData && uploadData.filename && continueForm && previewUrl) {
            var blockId = $continueForm.find('input[name="block_id"]').val();
            $continueForm.find('input[name="file"]').val(uploadData.filename + '.mp4');
            $continueForm.find('input[name="file_hash"]').val(uploadData.filename);
            $continueForm.find('input[name="files"]').val(uploadData.filename);
            var args = {};
            args.url = previewUrl.replace('%HASH%', uploadData.filename);
            args.success = function (sender, html) {
              var preview = $(html).find('.js-preview');
              $continueForm.find('.js-preview').replaceWith(preview);
            };
            utilitiesGetBlock(blockId, null, args);
          }
        },
        beforeSerialize: function beforeSerialize($form) {
          var md5filename = '';
          if ($form.find('[name="url"]').val() || $form.find('[name="content"]').val() || $form.find('[name="content[]"]').val()) {
            for (var i = 0; i < 32; i++) {
              md5filename += '' + Math.floor(Math.random() * 10);
            }
            $form.find('[name="filename"]').val(md5filename);
          } else {
            $form.find('[name="filename"]').val(md5filename);
          }
        },
        beforeSubmit: function beforeSubmit($form) {
          lastPercent = 0;
          var progressTemplate = $('<div class="progress"><div class="progress-bar"><div class="progress-text"></div></div></div>');
          if ($continueForm.length) {
            progressTemplate.appendTo($continueForm.find('.js-progress'));
          } else {
            $form.append(progressTemplate);
          }
          if ($form.find('[name="upload_option"]:checked').val() == 'url' && progressUrl) {
            var md5filename = $form.find('[name="filename"]').val();
            if (md5filename) {
              var checkProgressFunction = function checkProgressFunction() {
                $.ajax({
                  url: progressUrl.replace('%HASH%', md5filename),
                  type: 'GET',
                  timeout: 10000,
                  cache: false,

                  success: function success(xml) {
                    if (xml && xml.documentElement) {
                      var loaded = $(xml.documentElement).find('loaded').text() || 0;
                      var total = $(xml.documentElement).find('total').text() || 1;
                      progressFunction(Math.floor(loaded / total * 100));
                    }
                  },
                  complete: function complete() {
                    timeoutId = setTimeout(checkProgressFunction, 5000);
                  }
                });
              };
              timeoutId = setTimeout(checkProgressFunction, 5000);
            }
          }
          return true;
        },
        uploadProgress: function uploadProgress($form, percent) {
          if ($form.find('[name="upload_option"]:checked').val() != 'url') {
            progressFunction(percent);
          }
          if ($continueForm.length) {
            $form.hide();
            $continueForm.show();
          }
        },
        complete: function complete($form) {
          if ($continueForm.length) {
            $continueForm.find('button').enable(true);
            $continueForm.find('.progress').hide().remove();
          } else {
            $form.parent().find('.progress').hide().remove();
          }
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        },
        error: function error($form) {
          if ($continueForm.length) {
            $form.show();
            $continueForm.hide();
          }
        }
      });

      $form.find('[name="upload_option"]').on('change', function () {
        var $radio = $(this);
        if ($radio.prop('checked')) {
          var disabledProp = 'disabled';
          if ($radio.val() == 'file') {
            $form.find('[name="content"]').parents('.file-control').find('input').removeAttr(disabledProp).click();
            $form.find('[name="url"]').attr(disabledProp, disabledProp).val('').change();
            $form.find('[name="duration"]').attr(disabledProp, disabledProp).val('').change().parents('.form__group').find('label').removeClass('is-required');
            $form.find('[name="screenshot"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change().parents('.form__group').find('label').removeClass('is-required');
          } else if ($radio.val() == 'url') {
            $form.find('[name="content"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change();
            $form.find('[name="url"]').removeAttr(disabledProp).focus();
            $form.find('[name="duration"]').attr(disabledProp, disabledProp).val('').change().parents('.form__group').find('label').removeClass('is-required');
            $form.find('[name="screenshot"]').parents('.file-control').find('input').attr(disabledProp, disabledProp).val('').change().parents('.form__group').find('label').removeClass('is-required');
          }
        }
      });

      var params = {
        mode: 'async',
        format: 'json',
        action: $form.find('[name="action"]').val()
      };
      $form.attr('action', ($form.attr('action') || '') + (($form.attr('action') || '').indexOf('?') >= 0 ? '&' : '?') + $.param(params));
    };
    'use strict';

    var initKVSProfile = function initKVSProfile() {
      $('[data-action="message"],[data-action="add_to_friends"]').on('click', function (e) {
        e.preventDefault();

        var $btn = $(this);
        if ($btn.hasClass('done')) {
          return;
        }
        var popupClass = '.js-popup-message';
        if ($btn.attr('data-action') == 'add_to_friends') {
          popupClass = '.js-popup-friends';
        }
        $.magnificPopup.open({
          items: {
            src: $(popupClass),
            type: 'inline'
          },
          mainClass: 'mfp-vertical-top',
          removalDelay: 300,
          showCloseBtn: false,
          midClick: true,
          tLoading: '',
          fixedContentPos: true,
          callbacks: {
            open: function open() {
              var $form = this.content.find('form');
              var userId = $btn.data('user-id');
              var action = $form.attr('action');
              if (action && userId) {
                $form.attr('action', action.replace('%ID%', userId));
              }
              utilitiesAjaxForm($form, {
                success: function success() {
                  $btn.addClass('done');
                  $.magnificPopup.close();
                  if ($btn.attr('data-action') == 'add_to_friends') {
                    window.location.reload();
                  }
                }
              });
            }
          }
        });
      });
    };
    var initKVSMessages = function initKVSMessages() {
      var $messageForm = $('#send_message_form');
      if ($messageForm.exists()) {
        utilitiesAjaxForm($messageForm, {
          success: function success($form, newMessageData) {
            var editing = false;
            if ($form.find('[name="message_id"]').val() == newMessageData['message_id']) {
              editing = true;
            }
            $form.get(0).reset();
            $form.find('[name="message_id"]').val('');

            var messagesBlockId = $form.attr('data-block-id');
            var $messagesList = $('.list-messages');
            if (newMessageData && messagesBlockId && $messagesList.exists()) {
              var args = {
                success: function success(sender, html) {
                  var resultElement = document.createElement('DIV');
                  resultElement.innerHTML = html;

                  if (editing) {
                    $messagesList.find('.js-item[data-message-id="' + newMessageData['message_id'] + '"]').replaceWith($(resultElement).find('.js-item[data-message-id="' + newMessageData['message_id'] + '"]'));
                  } else {
                    var $newItem = $(resultElement).find('.js-item[data-message-id="' + newMessageData['message_id'] + '"]').addClass('is-hidden');
                    $messagesList.find('#' + messagesBlockId + '_items').append($newItem);

                    setTimeout(function () {
                      $messagesList.show();
                      $newItem.fadeIn();
                    }, 200);
                  }
                }
              };
              utilitiesGetBlock(messagesBlockId, null, args);
            }
          }
        });
      }

      $('[data-action="delete_conversation"], [data-action="ignore_conversation"]').on('click', function (e) {
        e.preventDefault();

        var $button = $(this);
        var confirmText = $button.attr('data-confirm') || '';
        if (!confirmText || confirm(confirmText)) {
          var userId = $button.attr('data-user-id');
          if (!userId) {
            return;
          }

          var blockId = $button.attr('data-block-id');
          var params = {};
          params['function'] = 'get_block';
          params['block_id'] = blockId;
          params['action'] = $button.attr('data-action');
          params['conversation_user_id'] = userId;
          utilitiesAjaxRequest($button, params, function (json) {
            if (json['status'] == 'success') {
              window.location.reload();
            }
          });
        }
      });

      $(document).on('click', '[data-edit-message-id]', function (e) {
        e.preventDefault();

        var $button = $(this);
        var messageId = $button.attr('data-edit-message-id');
        if (!messageId) {
          return;
        }

        var $form = $('#send_message_form');
        if ($form.find('[name="message_id"]').val()) {
          return;
        }
        $form.find('[name="message_id"]').val(messageId);
        utilitiesScrollTo($form);

        var $item = $button.parents('.js-item[data-message-id="' + messageId + '"]');
        $item.addClass('is-editing');

        var originalText = $item.find('.original-text').html() || '';
        originalText = originalText.replace(/<br>/gi, '\n').replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&#34;/gi, '"');
        originalText = originalText.replace(/<img.*?alt=['"](.*?)['"].*?>/gi, '$1');
        originalText = originalText.trim();
        $form.find('[name="message"]').val(originalText).focus();
      });
    };
    'use strict';

    var initKVSRating = function initKVSRating() {
      var $ratingContainer = $(document).find('.js-rating');
      var $links = $(document).find('.js-like, .js-dislike');
      $links.on('click', function (e) {
        e.preventDefault();
        var $link = $(this);
        if ($link.hasClass('is-disabled') || $link.hasClass('is-voted')) {
          return;
        }
        var vote = parseInt($link.attr('data-vote')) || 0;
        var videoId = $link.attr('data-video-id');
        var albumId = $link.attr('data-album-id');
        var playlistId = $link.attr('data-playlist-id');
        var postId = $link.attr('data-post-id');
        var modelId = $link.attr('data-model-id');
        var csId = $link.attr('data-cs-id');
        var dvdId = $link.attr('data-dvd-id');
        var flagId = $link.attr('data-flag-id');
        if (videoId || albumId || playlistId || modelId || csId || postId || dvdId) {
          utilitiesAjaxRequest($link, {
            action: 'rate',
            video_id: videoId,
            album_id: albumId,
            playlist_id: playlistId,
            model_id: modelId,
            cs_id: csId,
            post_id: postId,
            dvd_id: dvdId,
            vote: vote
          }, function (json) {
            if (json['status'] == 'success') {
              $links.addClass('is-disabled');
              $link.removeClass('is-disabled').addClass('is-voted');
              $ratingContainer.find('.js-progress-text').addClass('is-success').html($ratingContainer.find('.js-progress-bar').attr('data-success'));

              var $indicator = $ratingContainer.find('.js-indicator');
              var oldRating = parseFloat($indicator.attr('data-rating'));
              var oldRatingVotes = parseInt($indicator.attr('data-votes'));
              if (oldRatingVotes > 0) {
                if (oldRating == 0) {
                  oldRatingVotes = 0;
                }
                var newRating = (oldRating * oldRatingVotes + vote) / (oldRatingVotes + 1) / 5 * 100;
                if (newRating > 100) {
                  newRating = 100;
                }
                $ratingContainer.find('.js-indicator').css({ width: newRating + '%' });
              }
              var $likesEl = $link.find('[data-likes]');
              var $dislikesEl = $link.find('[data-dislikes]');
              if ($likesEl.exists()) {
                $likesEl.html(parseInt($likesEl.attr('data-likes')) + 1);
              } else {
                $dislikesEl.html(parseInt($dislikesEl.attr('data-dislikes')) + 1);
              }
            } else {
              $links.addClass('is-disabled');
              $ratingContainer.find('.js-progress-text').addClass('is-error').html($ratingContainer.find('.js-progress-bar').attr('data-error'));
            }
          });
          if (flagId) {
            utilitiesAjaxRequest($link, {
              action: 'flag',
              video_id: videoId,
              album_id: albumId,
              playlist_id: playlistId,
              postId: postId,
              dvdId: dvdId,
              flag_id: flagId
            }, function () { });
          }
        }
      });
    };
    'use strict';

    var initKVSErrorFlaggingForm = function initKVSErrorFlaggingForm() {
      var $flaggingForm = $('.js-report');
      if ($flaggingForm.exists()) {
        if ($flaggingForm.exists()) {
          utilitiesAjaxForm($flaggingForm, {
            success: function success($form) {
              $form.find('.message-success').fadeIn();
              $form.find('.report__container').fadeOut();
            }
          });
        }
      }
    };
    'use strict';

    var initKVSSearch = function initKVSSearch() {
      $('#search_form').on('submit', function (e) {
        try {
          if (this.q.value == '') {
            this.q.focus();
            e.preventDefault();
            return;
          }
          if ($(this).attr('data-url')) {
            var value = this.q.value.replace(/[ ]+/g, '-').replace(/[?]/g, '').replace(/[&]/g, '%26').replace(/[?]/g, '%3F').replace(/[/]/g, '%2F');
            window.location = $(this).attr('data-url').replace('%QUERY%', encodeURIComponent(value));
            e.preventDefault();
          }
        } catch (e) {
          console.log(e);
        }
      });

      $('#search_form .js-search-submit').on('click', function () {
        $(this).submit();
      });
    };
    'use strict';

    var initKVSShareForm = function initKVSShareForm() {
      var $blockShare = $('.share');
      if ($blockShare.exists()) {
        if (typeof window.getEmbed === 'function') {
          $blockShare.find('textarea').val(window.getEmbed());
        }
      }
    };
    'use strict';

    var initKVSSlider = function initKVSSlider() {
      var $swipers = $('.js-slider');
      $swipers.each(function () {
        $(this).swiper({
          nextButton: $(this).parent().find('.swiper-button-next')[0],
          prevButton: $(this).parent().find('.swiper-button-prev')[0]
        });
      });
      var $swipersCards = $('.js-slider-cards');
      $swipersCards.each(function () {
        $(this).swiper({
          nextButton: $(this).parent().find('.swiper-button-next')[0],
          prevButton: $(this).parent().find('.swiper-button-prev')[0],
          slidesPerView: 4,
          spaceBetween: 10,
          breakpoints: {
            480: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
        });
      });
    };
    'use strict';

    var initKVSSubscriptions = function initKVSSubscriptions() {
      var $btnSubscriptions = $('[data-action="subscribe"], [data-action="unsubscribe"]');
      $btnSubscriptions.on('click', function (e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading');
        var subscriptionTo = $btn.attr('data-target');
        var subscriptionId = $btn.attr('data-id');
        if (subscriptionTo && subscriptionId) {
          var params = { action: 'subscribe' };
          if ($btn.attr('data-action') !== 'subscribe') {
            params.action = 'unsubscribe';
          }
          if (subscriptionTo === 'category') {
            params[params.action + '_category_id'] = subscriptionId;
          } else if (subscriptionTo === 'model') {
            params[params.action + '_model_id'] = subscriptionId;
          } else if (subscriptionTo === 'content_source') {
            params[params.action + '_cs_id'] = subscriptionId;
          } else if (subscriptionTo === 'user') {
            params[params.action + '_user_id'] = subscriptionId;
          } else if (subscriptionTo === 'playlist') {
            params[params.action + '_playlist_id'] = subscriptionId;
          } else if (subscriptionTo === 'dvd') {
            params[params.action + '_dvd_id'] = subscriptionId;
          }
          utilitiesAjaxRequest($btn, params, function (json) {
            if (json.status === 'success') {
              $btn.removeClass('is-loading');
              var $subscribeCount = $btn.closest('.js-subscribe').find('.js-subscribe-count');
              if (params.action === 'subscribe') {
                if ($subscribeCount.exists()) {
                  $subscribeCount.html(parseInt($subscribeCount.html()) + 1);
                }
                $btn.attr('data-action', 'unsubscribe');
                $btn.find('.btn__text').html($btn.attr('data-text-unsubscribe'));
              } else {
                if ($subscribeCount.exists()) {
                  $subscribeCount.html(parseInt($subscribeCount.html()) - 1);
                }
                $btn.attr('data-action', 'subscribe');
                $btn.find('.btn__text').html($btn.attr('data-text-subscribe'));
              }
            }
          });
        }
      });
    };
    'use strict';

    var initKVSTabs = function initKVSTabs() {
      var $tabs = $('.js-tabs');
      if ($tabs.length) {
        $tabs.each(function () {
          utilitiesTabs($(this));
        });
      }
    };
    var utilitiesTabs = function utilitiesTabs(el) {
      if (!el) {
        return;
      }
      var $controls = el.find('.js-tabs-control');
      var swiperContainer = el.find('.js-tabs-content');
      var tabsSwiper = swiperContainer.swiper({
        autoHeight: true,
        simulateTouch: false,
        observer: true,
        observeParents: true
      });
      var $swiperWrapper = $(tabsSwiper.wrapper);
      function tabsControl() {
        var $this = $(this);
        var index = $this.data('index');
        var blockId = $this.data('block-id');
        $controls.removeClass('is-active');
        if (blockId && !$swiperWrapper.find('#' + blockId).exists()) {
          var args = {};
          args.url = $this.data('url');
          args.success = function (sender, html) {
            tabsSwiper.appendSlide(html);
            if ($swiperWrapper.find('#' + blockId + ' [data-form="ajax"]')) {
              initKVSSelect2();
              $swiperWrapper.find('#' + blockId + ' [data-form="ajax"]').each(function () {
                utilitiesAjaxForm($(this));
              });
            }
            if ($swiperWrapper.find('#' + blockId + ' [data-form="ajax-upload"]')) {
              $swiperWrapper.find('#' + blockId + ' [data-form="ajax-upload"]').each(function () {
                utilitiesVideoUploadForm($(this));
              });
            }
            tabsSwiper.update();
            tabsSwiper.slideTo(index);
          };
          utilitiesGetBlock(blockId, swiperContainer.parent(), args);
        } else {
          tabsSwiper.slideTo(index);
        }
        $this.addClass('is-active');
      }
      $controls.on('click', tabsControl);
      $('.collapse').on('show.bs.collapse hide.bs.collapse', function () {
        $swiperWrapper.css('height', 'auto');
      });
      $('.collapse').on('shown.bs.collapse hidden.bs.collapse', function () {
        tabsSwiper.updateAutoHeight();
      });
      window.tabsSwiper = tabsSwiper;

      // TODO: settimeout
      // function updateSwiper(swiper) {
      //     if (swiper) {
      //         swiper.update(true);
      //     }
      // }
      // var timerId;
      // $('.collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
      //     timerId = setTimeout(function update() {
      //         updateSwiper(tabsSwiper);
      //         timerId = setTimeout(update, 0);
      //     }, 0);
      // });
      // $('.collapse').on('shown.bs.collapse hidden.bs.collapse', function(e) {
      //     clearTimeout(timerId);
      // });
    };
    "use strict";
    'use strict';

    var initKVSAddToFavourites = function initKVSAddToFavourites() {
      $('.js-fav-link').on('click', function (e) {
        var $link = $(this);
        var videoId = $link.attr('data-video-id');
        var albumId = $link.attr('data-album-id');
        var favType = $link.attr('data-fav-type') || 0;
        var playlistId = $link.attr('data-playlist-id') || 0;
        if (videoId || albumId) {
          e.preventDefault();
          e.stopPropagation();
          if ($link.hasClass('delete')) {
            utilitiesAjaxRequest($link, {
              action: 'delete_from_favourites',
              video_id: videoId,
              fav_type: favType,
              album_id: albumId,
              playlist_id: playlistId
            }, function (json) {
              if (json['status'] == 'success') {
                if (playlistId > 0) {
                  $link.addClass('is-hidden');
                  $link.closest('div').find('#add_playlist_' + playlistId).removeClass('is-hidden');
                } else {
                  $link.addClass('is-hidden');
                  $link.closest('div').find('#add_fav_' + favType).removeClass('is-hidden');
                }
              }
            });
          } else {
            utilitiesAjaxRequest($link, {
              action: 'add_to_favourites',
              video_id: videoId,
              fav_type: favType,
              album_id: albumId,
              playlist_id: playlistId
            }, function (json) {
              if (json['status'] == 'success') {
                if (playlistId > 0) {
                  $link.addClass('is-hidden');
                  $link.closest('div').find('#delete_playlist_' + playlistId).removeClass('is-hidden');
                } else {
                  $link.addClass('is-hidden');
                  $link.closest('div').find('#delete_fav_' + favType).removeClass('is-hidden');
                }
              }
            });
          }
        }
      });
    };
    var initKVSPlaylists = function initKVSPlaylists() {
      $('[data-action="playlist"]').on('click', function (e) {
        e.preventDefault();
        var $btn = $(this);
        var popupClass = '.js-popup-playlist';
        $.magnificPopup.open({
          items: {
            src: $(popupClass),
            type: 'inline'
          },
          mainClass: 'mfp-vertical-top',
          removalDelay: 300,
          showCloseBtn: false,
          midClick: true,
          tLoading: '',
          fixedContentPos: true,
          callbacks: {
            open: function open() {
              var $form = this.content.find('form');
              utilitiesAjaxForm($form, {
                success: function success() {
                  $form.find('.message-success').fadeIn();
                }
              });
            }
          }
        });
      });
    };
    var utilitiesLoadSmileys = function ($container) {
      $container.find('img[data-src]').each(function () {
        var originalSrc = $(this).attr('data-src');
        if (originalSrc) {
          this.src = originalSrc;
          $(this).removeAttr('data-src');
        }
      });
    };
    var initStats = function () {
      var sendStatsReq = function (action) {
        var statsUrl = window.location.href;
        if (statsUrl.indexOf('#') > 0) {
          statsUrl = statsUrl.substring(0, statsUrl.indexOf('#'));
        }
        if (statsUrl.indexOf('?') >= 0) {
          statsUrl += '&';
        } else {
          statsUrl += '?';
        }



        var img = new Image();
        img.src = statsUrl + 'mode=async&action=' + action + '&rand=' + new Date().getTime();
      };

      Cookies.set('kt_tcookie', '1', { expires: 7, path: '/' });
      if (Cookies.get('kt_tcookie') == '1') {
        sendStatsReq('js_stats');
      }


    };
    var initMethods = [
      initKVSNavigation,
      initKVSTouchMenu,
      initKVSStickyHeader,
      initKVSMasonry,
      initKVSMagnific,
      initKVSTabs,
      initKVSSelect2,
      initKVSGallery,
      initKVSSlider,
      initKVSLanguages,
      initKVSSearch,
      initKVSPlayTrailerOnHover,
      initKVSLists,
      initKVSOrientation,
      initKVSSubscriptions,
      initKVSCommentForm,
      initKVSCommentActions,
      initKVSAddToFavourites,
      initKVSRating,
      initKVSShareForm,
      initKVSAjaxForms,
      initKVSErrorFlaggingForm,
      initKVSProfile,
      initKVSMessages,
      initStats
    ];
    for (var i = 0; i < initMethods.length; i++) {
      if (typeof initMethods[i] == 'function') {
        try {
          initMethods[i].call(this);
        } catch (e) {
          if (console && console.error) {
            console.error(e);
          }
        }
      }
    }
  })();
});

//# sourceMappingURL=main1.js.map


$(document).ready(function () {
  function readCookieDelit(name) {
    var name_cook = name + "=";
    var spl = document.cookie.split(';');
    for (var i = 0; i < spl.length; i++) {
      var c = spl[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(name_cook) == 0) return c.substring(name_cook.length, c.length);
    }
    return null;
  }

  var value_cookie_adv = readCookieDelit('kt_chat_hidden');

  if (value_cookie_adv == null) {
    $('.chat-holder').addClass('show');
  }

  $(".js-close-chat").on("click", function () {
    $('.chat-holder').removeClass("show");
    var date = new Date(new Date().getTime() + 60 * 1000);
    document.cookie = "kt_chat_hidden=1; path=/; expires=" + date.toUTCString();
  });
});