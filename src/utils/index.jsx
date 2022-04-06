import html2canvas from 'html2canvas';

// 获取url的参数
export const queryString = () => {
  let _queryString = {};
  const _query = window.location.search.substr(1);
  const _vars = _query.split('&');
  _vars.forEach((v, i) => {
    const _pair = v.split('=');
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
      _queryString[_pair[0]] = _arr;
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
    }
  });
  return _queryString;
};

// 生成随机字符串
export const randomString = (len) => {
  len = len || 24;
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// 切换全屏的方法
export const fullScreen = (isOpen, target) => {
  let dom = target || void 0
  let open_list = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullScreen', 'msRequestFullscreen']
  let cancel_list = ['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msExitFullscreen']
  let fn = void 0
  if (isOpen) {
    fn = open_list.find((n) => Boolean(dom[n]))
    fn && dom[fn]()
  } else {
    fn = cancel_list.find((n) => Boolean(document[n]))
    fn && document[fn]()
  }
}

// 判断是否是全屏
export const isFullScreen = () => document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen

// 生成屏幕截图
export const generateImage = (ele, name, option = {}) => {
  if (!ele) {return}
  html2canvas(ele, {
    ...option,
    useCORS: true, // 保证跨域图片的显示
  }).then(function (canvas) {
    let thumbnailBase64 = canvas.toDataURL('image/jpeg', 1); // 控制图片清晰度
    const a = document.createElement('a');
    a.setAttribute('href', thumbnailBase64);
    a.setAttribute('download', name || '图表');
    a.click();
  });
}

// 监听div尺寸变化，利用iframe的resize事件
export const resizeDiv = (el, cb) => {
  // 创建iframe标签，设置样式并插入到被监听元素中
  let iframe = document.createElement('iframe');
  iframe.setAttribute('class', 'iframe-size-watch');

  if (el) {
    el.appendChild(iframe);
  }
  // 记录元素当前宽高
  let oldWidth = el ? el.offsetWidth : 0;
  let oldHeight = el ? el.offsetHeight : 0;

  // iframe 大小变化时的回调函数
  function sizeChange () {
    // 记录元素变化后的宽高
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    // 不一致时触发回调函数 cb，并更新元素当前宽高
    if (width !== oldWidth || height !== oldHeight) {
      cb({width: width, height: height}, {oldWidth: oldWidth, oldHeight: oldHeight});
      oldWidth = width;
      oldHeight = height;
    }
  }

  // 设置定时器用于节流
  let timer = 0;
  // 将 sizeChange 函数挂载到 iframe 的resize回调中
  if (el) {
    iframe.contentWindow.onresize = function () {
      clearTimeout(timer);
      timer = setTimeout(sizeChange, 20);
    };
  }
}

/**
 * 函数节流 鼠标移入能立刻执行，停止触发的时候还能再执行一次！
 * @param func 回调函数
 * @param wait 延时时间
 * @param options leading:false禁用第一次执行,trailing: false 禁用结束后再执行一次
 * @returns {throttled}
 */
export const throttle = (func, wait, options) => {
  let timeout, context, args, result;
  let previous_time = 0;
  if (!options) {options = {};}

  let later = function () {
    // leading为false将初始时间设为0
    previous_time = options.leading === false ? 0 : Date.now();
    timeout = null;
    func.apply(func, args);
    if (!timeout) {context = args = null;}
  };

  let throttled = function () {
    let now_time = Date.now();
    if (!previous_time && options.leading === false) {previous_time = now_time;}
    // 下次触发func的剩余时间
    let remaining = wait - (now_time - previous_time);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间,则进行首次执行
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous_time = now_time;
      func.apply(context, args);
      if (!timeout) {context = args = null;}
    } else if (!timeout && options.trailing !== false) {
      // 条件满足，利用延时函数在结束后再执行一次
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous_time = 0;
    timeout = null;
  };

  return throttled;
}
