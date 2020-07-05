const exe = () => {
  // eslint-disable-next-line no-console
  console.log('[start]github-kusa-change');

  const kusaList = getKusaList();

  if (!kusaList) {
    return;
  }
  for (let i = 0; i < kusaList.length; i++) {
    changeKusaColor(kusaList[i]);
  }

  const legendList = getLegendList();

  if (!legendList) {
    return;
  }
  for (let i = 0; i < legendList.length; i++) {
    const legend = legendList[i];
    if (legend instanceof HTMLElement) {
      changeLegendColor(legend);
    }
  }

  // eslint-disable-next-line no-console
  console.log('[end]github-kusa-change');
};

const getKusaList = (): HTMLElement[] | undefined => {
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

  const kusaList: HTMLElement[] = [];
  for (let i = 0; i < kusaParentList.length; i++) {
    const kusaParent = kusaParentList[i];
    const rects = kusaParent.children;
    for (let j = 0; j < rects.length; j++) {
      const rect = rects[j];
      if (rect instanceof HTMLElement) {
        kusaList.push(rect);
      }
    }
  }

  return kusaList;
};

const colorMap: { [index: string]: string } = {
  '#ebedf0': '#ebedf0',
  '#9be9a8': '#cbe295',
  '#40c463': '#89c578',
  '#30a14e': '#439647',
  '#216e39': '#2b5e2d',
};

// https://decks.hatenadiary.org/entry/20100907/1283843862
const rgbTo16 = (col: string) =>
  `#${col
    .match(/\d+/g)
    ?.map(a => `0${parseInt(a).toString(16)}`.slice(-2))
    .join('')}`;

const getLegendList = () => {
  const ul = document.getElementsByClassName('legend');
  if (!ul || ul.length === 0) {
    return;
  }
  return ul[0].children;
};

const changeKusaColor = (kusa: HTMLElement) => {
  const fill = kusa.getAttribute('fill');
  if (fill) {
    kusa.style.fill = colorMap[fill];
  }

  // 丸みを帯びたデザインも打ち消し
  kusa.style.width = '11px';
  kusa.style.height = '11px';
  // eslint-disable-next-line
  // @ts-ignore
  kusa.style.rx = '0';
  // eslint-disable-next-line
  // @ts-ignore
  kusa.style.ry = '0';
};

const changeLegendColor = (legend: HTMLElement) => {
  const color = legend.style.backgroundColor;
  legend.style.setProperty('background-color', colorMap[rgbTo16(color)]);

  // 丸みを帯びたデザインも打ち消し
  legend.style.width = '11px';
  legend.style.height = '11px';
  legend.style.borderRadius = '0';
};

window.addEventListener('load', exe, false);
