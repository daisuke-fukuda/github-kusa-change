const exe = () => {
  // eslint-disable-next-line no-console
  console.log('[start]github-kusa-change');

  const kusaList = getKusaList();
  console.log(kusaList);

  for (let i = 0; i < kusaList.length; i++) {
    changeKusaColor(kusaList[i]);
  }

  // 末端の要素のtextを置換
  // const { body } = document;
  // getChildrenAndReplace(body);

  // 全部置換しても大丈夫そうな要素
  // replaceByTagName('span');
  // replaceByTagName('h1');
  // replaceByTagName('h2');
  // replaceByTagName('h3');
  // replaceByTagName('h4');
  // replaceByTagName('a');
  // replaceByTagName('p');
  replaceByTagName('div');
  replaceImg();
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

const changeKusaColor = (kusa) => {
  // attributesのfillは昔のcolorがそのまま入っていて、
  // 新旧のcolorをmappingしたscssで色が変わっている
  // なので、styleでcolorを設定してあげればscssより優先されるので元の色に戻る
  const fill = kusa.getAttribute('fill');
  kusa.style.fill = fill;

  // 丸みを帯びたデザインも打ち消し
  kusa.style.width = '11px';
  kusa.style.height = '11px';
  kusa.style.rx = '0';
  kusa.style.ry = '0';
};

const replaceImg = () => {
  const imgs = document.getElementsByTagName('img');
  // eslint-disable-next-line no-restricted-syntax
  for (const img of imgs) {
    img.src = getImgUrl();
  }
  const sources = document.getElementsByTagName('source');
  // eslint-disable-next-line no-restricted-syntax
  for (const source of sources) {
    source.srcset = getImgUrl();
  }
};
const getImgUrl = () => chrome.extension.getURL(`cat${randRange(1, 5).toString()}.jpg`);
// https://qiita.com/uto-usui/items/7193db237175ba15aaa3
const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const replaceByTagName = (tag) => {
  const elements = document.getElementsByTagName(tag);
  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    replaceText(element);
  }
};
const getChildrenAndReplace = (node) => {
  if (node.children.length === 0) {
    replaceText(node);
  } else {
    const { children } = node;
    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
      getChildrenAndReplace(child);
    }
  }
};

const replaceText = (e) => {
  // 末尾nodeだけ
  if (e.innerHTML) {
    let text = e.innerHTML;
    text = text.replace(/コロナウイルス/g, '猫ちゃん');
    text = text.replace(/コロナ/g, '子猫');
    text = text.replace(/ウイルス/g, '🐈');
    text = text.replace(/肺炎/g, '肉球');
    text = text.replace(/新型/g, '今までより可愛い');
    text = text.replace(/死亡/g, '😺可愛い');
    text = text.replace(/死者/g, '🐈好き');
    text = text.replace(/無くなった/g, '🐈好きになった');
    text = text.replace(/感染者/g, '猫好きな人');
    text = text.replace(/感染/g, '猫好き');
    text = text.replace(/トイレットペーパー/g, 'キャットフード');
    text = text.replace(/ティッシュペーパー/g, 'カリカリ');
    text = text.replace(/マスク/g, 'またたび');
    text = text.replace(/重篤/g, '猫しか見えない');
    text = text.replace(/患者/g, 'ネコ好き');
    text = text.replace(/重体/g, '重度の猫好き');
    text = text.replace(/軽症/g, '猫が気になってきて');
    text = text.replace(/意識不明/g, '可愛すぎて');
    text = text.replace(/濃厚接触した/g, 'ネコとべたべた');
    text = text.replace(/接触/g, 'ネコにもふもふ');
    e.innerHTML = text;
  }
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
