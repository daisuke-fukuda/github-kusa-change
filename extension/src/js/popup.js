import '../css/popup.css';

(function (i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
}(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')); // 1.httpsをつけます

ga('create', 'UA-116929671-3', 'auto');
ga('set', 'checkProtocolTask', null); // 2.httpやhttpsのprotocolチェックを回避します
ga('send', 'pageview', '/popup.html'); // 3.GA内で表示したいように設定します

// test
// setInterval(function() {
//   console.log('setInterval');
//   ga('send', 'event', 'button', 'click', 'nav-buttons');
// }, 1000)
