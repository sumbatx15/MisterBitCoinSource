export default function() {
    var t = document.getElementById("gobtc-widget-chart");
    void 0 != t.dataset.width && (t.style["background-color"] = "#fcfcfc");
    var e = parseInt(t.offsetWidth, 10),
        o = t.dataset.cur || "usd",
        a = t.dataset.lang || "en",
        i = void 0 !== t.dataset.area ? t.dataset.area : 1,
        r = "bottom" == t.dataset.selector ? 1 : 0,
        d = Math.ceil(e / 2 + 25),
        n = t.style["background-color"].replace(/[^\d,]/g, "").split(","),
        s = .2126 * n[0] + .7152 * n[1] + .0722 * n[2] < 128;
    t.style.position = "relative", t.style.overflow = "hidden", t.style["box-shadow"] = "0 1px 2px rgba(0,0,0,.15)", t.style["border-radius"] = "2px";
    var l = "position: absolute; z-index: 2;font-weight:100; font-family:sans-serif; text-decoration:none; right:4px; font-size:10px; text-align:right; color:" + (s ? "#fff" : "#000") + "; bottom:" + (1 == r ? "41" : "21") + "px;line-height: 1;",
        c = "https://widgets.gobitcoin.io/v2/chart/?black=" + (s ? "1" : "0") + "&area=" + i + "&cur=" + o + "&selectorBottom=" + r;
    false ? document.getElementById("gobtc-widget-chart-iframe").src = c : (t.innerHTML = '<a href="https://gobitcoin.io/' + ("en" === a ? "" : a + "/") + '" id="brand" style="' + l + '"><img style="display:inline;width:100px" src="https://gobitcoin.io/img/logo-s' + (s ? "" : "b") + '.png" alt="GoBitcoin.io"><br>Bitcoin Converter,Information and Tools<br></a>', t.innerHTML += '<iframe id="gobtc-widget-chart-iframe" width="' + e + '" height="' + d + '" src="' + c + '" style="display:block;border:none"></iframe>')
}