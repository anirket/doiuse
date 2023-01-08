export enum SpinnerType {
  PageLoader = 'PageLoader',
  buttonLoader = 'buttonLoader',
}

export const defaultErrorMessage = 'Aww Snap! Something went Wrong!';

export const tipBrowserList = [
  '>= 5% in US',
  'not dead',
  'dead',
  'not Firefox ESR',
  'supports css-grid',
  'defaults, not dead'
]

export enum Browserkeys {
  'Chrome for Android' = 'Chrome for Android',
  'Chrome' = 'Chrome',
  'Safari on iOS' = 'Safari on iOS',
  'Safari' = 'Safari',
  'Edge' = 'Edge',
  'Samsung Internet' = 'Samsung Internet',
  'Firefox' = 'Firefox',
  'Firefox for Android' = 'Firefox for Android',
  'UC Browser for Android' = 'UC Browser for Android',
  'Opera Mini' = 'Opera Mini',
  'Opera' = 'Opera',
  'Opera Mobile' = 'Opera Mobile',
  'QQ Browser' = 'QQ Browser',
  'KaiOS Browser' = 'KaiOS Browser',
  'Android Browser' = 'Android Browser',
  'IE' = 'IE',
  'IE Mobile' = 'IE',
  'Baidu Browser' = 'Baidu Browser',
  'Blackberry Browser' = 'Blackberry Browser',
}

export enum DatakeysforBrowserAvailable {
  'chrome_android' = 'chrome_android',
  'chrome' = 'chrome',
  'edge' = 'edge',
  'firefox' = 'firefox',
  'firefox_android' = 'firefox_android',
  'ie' = 'ie',
  'opera' = 'opera',
  'opera_android' = 'opera_android',
  'safari' = 'safari',
  'safari_ios' = 'safari_ios',
  'samsunginternet_android' = 'samsunginternet_android',
}

export const mapBrowserKeyToData = {
  chrome_android: 'Chrome for Android',
  chrome: 'Chrome',
  edge: 'Edge',
  firefox: 'Firefox',
  firefox_android: 'Firefox for Android',
  ie: 'IE',
  opera: 'Opera',
  opera_android: 'Opera Mobile',
  safari: 'Safari',
  safari_ios: 'Safari on iOS',
  samsunginternet_android: 'Samsung Internet',
};

export const mapBrowserstoImages = {
  'Chrome for Android': 'chrome.svg',
  Chrome: 'chrome.svg',
  'Safari on iOS': 'safari.svg',
  Safari: 'safari.svg',
  Edge: 'edge.svg',
  'Samsung Internet': 'samsung.svg',
  Firefox: 'firefox.svg',
  'Firefox for Android': 'firefox.svg',
  'UC Browser for Android': 'uc.svg',
  'Opera Mini': 'opera-mini.svg',
  Opera: 'opera.svg',
  'Opera Mobile': 'opera.svg',
  'QQ Browser': 'qq.svg',
  'KaiOS Browser': 'kai-os.svg',
  'Android Browser': 'android.svg',
  IE: 'ie.svg',
  'Baidu Browser': 'baidu.svg',
  'Blackberry Browser': 'blackberry.svg',
} as const;
