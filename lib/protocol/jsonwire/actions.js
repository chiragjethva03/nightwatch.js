const ProtocolActions = require('../actions.js').ProtocolActions;

module.exports = {
  ///////////////////////////////////////////////////////////
  // Session related
  ///////////////////////////////////////////////////////////
  sessionAction(action, sessionId) {
    let options = {
      path: '/session',
      method: action
    };

    if (sessionId) {
      options.path += `/${sessionId}`;
    }

    return options;
  },

  getSessions: '/sessions',
  getStatus: '/status',

  session: {
    ///////////////////////////////////////////////////////////
    // Timeouts
    ///////////////////////////////////////////////////////////
    setTimeoutType(type, value) {
      return ProtocolActions.post({
        path: '/timeouts',
        data: {
          type : type,
          ms : value
        }
      });
    },

    setTimeoutsAsyncScript(value) {
      return ProtocolActions.post({
        path: '/timeouts/async_script',
        data: {
          ms : value
        }
      });
    },

    setTimeoutsImplicitWait(value) {
      return ProtocolActions.post({
        path: '/timeouts/implicit_wait',
        data: {
          ms : value
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Session log
    ///////////////////////////////////////////////////////////
    getSessionLogTypes: '/log/types',

    getLogContents(type) {
      return ProtocolActions.post({
        path: '/log',
        data: {
          type: type
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Navigation
    ///////////////////////////////////////////////////////////
    navigateTo(url) {
      return ProtocolActions.post({
        path: '/url',
        data: {
          url: url
        }
      });
    },

    getCurrentUrl: '/url',
    navigateBack() {
      return ProtocolActions.post({
        path: '/back'
      });
    },
    navigateForward() {
      return ProtocolActions.post({
        path: '/forward'
      });
    },
    pageRefresh() {
      return ProtocolActions.post({
        path: '/refresh'
      });
    },
    getPageTitle: '/title',

    ///////////////////////////////////////////////////////////
    // Windows
    ///////////////////////////////////////////////////////////
    switchToWindow(handle) {
      return ProtocolActions.post({
        path: '/window',
        data: {
          name : handle
        }
      });
    },

    closeWindow() {
      return ProtocolActions.delete('/window');
    },

    getWindowHandle: '/window_handle',

    getAllWindowHandles: '/window_handles',

    getWindowPosition(windowHandle) {
      return `/window/${windowHandle}/position`;
    },

    maximizeWindow(windowHandle) {
      return ProtocolActions.post(`/window/${windowHandle}/maximize`);
    },

    setWindowPosition(windowHandle, offsetX, offsetY) {
      return ProtocolActions.post({
        path: `/window/${windowHandle}/position`,
        data: {
          x : offsetX,
          y : offsetY
        }
      });
    },

    getWindowSize(windowHandle) {
      return `/window/${windowHandle}/size`;
    },

    setWindowSize(windowHandle, width, height) {
      return ProtocolActions.post({
        path: `/window/${windowHandle}/size`,
        data: {
          width : width,
          height : height
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Frames
    ///////////////////////////////////////////////////////////
    switchToFrame(frameId) {
      if (frameId) {
        return ProtocolActions.post({
          path: '/frame',
          data: {
            id: frameId
          }
        });
      }

      return ProtocolActions.post('/frame');
    },

    switchToParentFrame() {
      return ProtocolActions.post('/frame/parent');
    },

    ///////////////////////////////////////////////////////////
    // Elements
    ///////////////////////////////////////////////////////////
    locateSingleElement(strategy, selector) {
      return ProtocolActions.post({
        path: '/element',
        data: {
          using: strategy,
          value: selector
        }
      });
    },

    locateMultipleElements(strategy, selector) {
      return ProtocolActions.post({
        path: '/elements',
        data: {
          using: strategy,
          value: selector
        }
      });
    },

    elementIdEquals(id, otherId) {
      return `/element/${id}/equals/${otherId}`;
    },

    locateSingleElementByElementId(id, strategy, selector) {
      return ProtocolActions.post({
        path: `/element/${id}/element`,
        data: {
          using: strategy,
          value: selector
        }
      });
    },

    locateMultipleElementsByElementId(id, strategy, selector) {
      return ProtocolActions.post({
        path: `/element/${id}/elements`,
        data: {
          using: strategy,
          value: selector
        }
      });
    },

    getActiveElement() {
      return ProtocolActions.post('/element/active');
    },

    getElementAttribute(id, attributeName) {
      return `/element/${id}/attribute/${attributeName}`;
    },

    getElementCSSValue(id, cssPropertyName) {
      return `/element/${id}/css/${cssPropertyName}`;
    },

    getElementTagName(id) {
      return `/element/${id}/name`;
    },

    getElementSize(id) {
      return `/element/${id}/size`;
    },

    getElementText(id) {
      return `/element/${id}/text`;
    },

    getElementValue(id) {
      return `/element/${id}/attribute/value`;
    },

    getElementLocation(id) {
      return `/element/${id}/location`;
    },

    isElementLocationInView(id) {
      return `/element/${id}/location_in_view`;
    },

    isElementDisplayed(id) {
      return `/element/${id}/displayed`;
    },

    isElementEnabled(id) {
      return `/element/${id}/enabled`;
    },

    isElementSelected(id) {
      return `/element/${id}/selected`;
    },

    clearElementValue(id) {
      return ProtocolActions.post(`/element/${id}/clear`);
    },

    setElementValue(id, value) {
      if (Array.isArray(value)) {
        value = value.join('');
      } else {
        value = String(value);
      }

      return ProtocolActions.post({
        path: `/element/${id}/value`,
        data: {
          value: value.split('')
        }
      });
    },

    clickElement(id) {
      return ProtocolActions.post(`/element/${id}/click`);
    },

    elementSubmit(id) {
      return ProtocolActions.post(`/element/${id}/submit`);
    },

    sendKeys(keys) {
      return ProtocolActions.post({
        path: '/keys',
        data: {
          value: keys
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Document Handling
    ///////////////////////////////////////////////////////////
    getPageSource: '/source',

    executeScript(fn, args) {
      return ProtocolActions.post({
        path: '/execute',
        data: {
          script: fn,
          args: args
        }
      });
    },

    executeScriptAsync(fn, args) {
      return ProtocolActions.post({
        path: '/execute_async',
        data: {
          script: fn,
          args: args
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Cookies
    ///////////////////////////////////////////////////////////
    getCookieString: '/cookie',

    setCookieString(value) {
      return ProtocolActions.post({
        path: '/cookie',
        data: {
          cookie : value
        }
      });
    },

    deleteCookie(cookieName) {
      return ProtocolActions.delete(`/cookie/${cookieName}`);
    },

    deleteAllCookies() {
      return ProtocolActions.delete('/cookie');
    },

    ///////////////////////////////////////////////////////////
    // User Actions
    ///////////////////////////////////////////////////////////
    doubleClick() {
      return ProtocolActions.post('/doubleclick');
    },

    mouseButtonClick(buttonIndex) {
      return ProtocolActions.post({
        path: '/click',
        data: {
          button: buttonIndex
        }
      });
    },

    mouseButtonUp(buttonIndex) {
      return ProtocolActions.post({
        path: '/buttonup',
        data: {
          button: buttonIndex
        }
      });
    },

    mouseButtonDown(buttonIndex) {
      return ProtocolActions.post({
        path: '/buttondown',
        data: {
          button: buttonIndex
        }
      });
    },

    moveTo(data) {
      return ProtocolActions.post({
        path: '/moveto',
        data: data
      });
    },

    ///////////////////////////////////////////////////////////
    // User Prompts
    ///////////////////////////////////////////////////////////
    acceptAlert() {
      return ProtocolActions.post('/accept_alert');
    },

    dismissAlert() {
      return ProtocolActions.post('/dismiss_alert');
    },

    getAlertText: '/alert_text',

    setAlertText(value) {
      return ProtocolActions.post({
        path: '/alert_text',
        data: {
          text: value
        }
      });
    },

    ///////////////////////////////////////////////////////////
    // Screen
    ///////////////////////////////////////////////////////////
    getSreenshot(logBase64Data) {
      return {
        path: '/screenshot',
        addtOpts: {
          suppressBase64Data: !logBase64Data
        }
      };
    },

    getSreenOrientation: '/orientation',

    setSreenOrientation(orientation) {
      return ProtocolActions.post({
        path: '/orientation',
        data: {
          orientation : orientation
        }
      });
    },

    getAvailableContexts: '/contexts',

    getCurrentContext: '/context',

    setCurrentContext(context) {
      return ProtocolActions.post({
        path: '/context',
        data: {
          name: context
        }
      });
    }
  }

};