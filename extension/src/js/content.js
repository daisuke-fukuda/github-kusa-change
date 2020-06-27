const exe = () => {
  // eslint-disable-next-line no-console
  console.log('[start]github-kusa-change');

  const kusaList = getKusaList();

  for (let i = 0; i < kusaList.length; i++) {
    changeKusaColor(kusaList[i]);
  }

  const lenengList = getLegendList();
  for (let i = 0; i < lenengList.length; i++) {
    changeLengendColor(lenengList[i]);
  }

  // eslint-disable-next-line no-console
  console.log('[end]github-kusa-change');
};

const getKusaList = () => {
  const svg = document.getElementsByClassName('js-calendar-graph-svg');
  if (!svg || svg.length === 0) {
    return;
  }
  // console.log(svg);
  const child = svg[0].children;
  if (!child || child.length === 0) {
    return;
  }

  const kusaParentList = child[0].children;
  // console.log(kusaParentList);
  if (!kusaParentList || kusaParentList.length === 0) {
    return;
  }

  const kusaList = [];
  for (let i = 0; i < kusaParentList.length; i++) {
    const kusaParent = kusaParentList[i];
    const rects = kusaParent.children;
    for (let j = 0; j < rects.length; j++) {
      const rect = rects[j];
      kusaList.push(rect);
    }
  }

  return kusaList;
};

const colorMap = {
  '#ebedf0': '#ebedf0',
  '#9be9a8': '#d6e685',
  '#40c463': '#8cc665',
  '#30a14e': '#44a340',
  '#216e39': '#1e6823',
};

// https://decks.hatenadiary.org/entry/20100907/1283843862
const rgbTo16 = (col) => `#${col.match(/\d+/g).map((a) => (`0${parseInt(a).toString(16)}`).slice(-2)).join('')}`;


const getLegendList = () => {
  const ul = document.getElementsByClassName('legend');
  if (!ul || ul.length === 0) {
    return;
  }
  return ul[0].children;
};

const changeKusaColor = (kusa) => {
  // attributesのfillは昔のcolorがそのまま入っていて、
  // 新旧のcolorをmappingしたscssで色が変わっている
  // なので、styleでcolorを設定してあげればscssより優先されるので元の色に戻る
  const fill = kusa.getAttribute('fill');
  kusa.style.fill = colorMap[fill];

  // 丸みを帯びたデザインも打ち消し
  kusa.style.width = '11px';
  kusa.style.height = '11px';
  kusa.style.rx = '0';
  kusa.style.ry = '0';
};

const changeLengendColor = (legend) => {
  // styleで元々の色が入っているのを、cssで!importandで無理やり新しい色にしている
  // ので、元のstyleを !importantにしてあげれば、cssより優先されて元の色になる、
  const color = legend.style.backgroundColor;
  console.log(color);
  legend.style.setProperty('background-color', colorMap[rgbTo16(color)]);

  // 丸みを帯びたデザインも打ち消し
  legend.style.width = '11px';
  legend.style.height = '11px';
  legend.style.borderRadius = '0';
};

// popupからのmessage
const addListenerFromPopup = () => {
  // eslint-disable-next-line no-unused-vars
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // console.log('chrome.runtime.onMessage.addListener', msg);

    switch (msg.command) {
      // ツールバー横のアイコンクリック
      case 'start':
        exe();
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn('invalid command');
    }
  });
};

addListenerFromPopup();
