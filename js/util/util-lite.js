function testBrowser(browser) {
  var result;

  switch (browser) {
    case 'safari':
      result = (typeof window.safari !== 'undefined' && window.safari.pushNotification);
      break;
    case 'safari mobile':
      result = /iPhone/i.test(navigator.userAgent) && /Safari/i.test(navigator.userAgent);
      break;
    case 'chrome':
      result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent);
      break;
    case 'chrome mobile':
      result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent) && window.chrome && !window.chrome.webstore;
      break;
    case 'firefox':
      result = !/Chrome/.test(navigator.userAgent) && /Mozilla/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent);
      break;
    case 'edge':
      result = /Edge/.test(window.navigator.userAgent);
      break;
    default:
      result = false;
      break
  }
  return result;
}

function waitForFont(fontName, cb) {
  let fonts = [];
  const isArray = Array.isArray(fontName);
  let done = false;
  if (isArray) {
    fonts.push(...fontName);
  }else {
    fonts.push(fontName);
  }
  fonts = fonts.map(font => {
    return {
      name: font,
      loaded: false
    }
  });
  const check = () => {
    const loaded = fonts.filter(font => font.loaded);
    if (loaded.length === fonts.length && !done) {
      done = true;
      if(interval) clearInterval(interval);
      cb();
    }
  }
  const interval = setInterval(() => {
    fonts.forEach(font => {
      const isReady = document.fonts.check(`1em ${font.name}`);
      if(isReady && testBrowser('chrome')) {
        font.loaded = true;
      } else {
        if(document.fonts.size > 0) {
          document.fonts.ready.then(() => {
            font.loaded = true;
          });
        }
      }
      check();
    });
  }, 100);
}

export default {
  waitForFont,
  testBrowser
}