(e => {
    let w = window;
    w.config = {
        bit: 16,
        level: 0
    };
    w.bitGroup = [];
    w.levelGroup = [];
    w.app = [];
    let showMainPassword = false;
    //let showPassword = false;

    let strCopySuccessfully = { en: "Copied!", zh: "复制成功!" };
    let strBtnShowCustom = { en: "Custom", zh: "添加选项" };
    let strBtnAddCustom = { en: "Add", zh: "添加" };
    let strBtnShowPwd = { en: ["Show", "Hide"], zh: ["显示", "隐藏"] };
    let strBtnStore = { en: ["Store", "Delete"], zh: ["存储", "删除"] };
    let ls = localStorage;
    let strStoreInfo = {
        en: "This action will store your password in \"localStorage\" in your browser, DO NOT store password in public device. This action is NOT recommended.",
        zh: "密码会保存在你浏览器的\"LocalStorage\"中, 不要在公共设备上存储密码。不建议使用这个操作。"
    };
    let strMainPass = { en: "MAIN PASSWORD", zh: "主密码" };
    let strPassword = { en: "Click to copy", zh: "点击复制" };
    let strCustomBit = { en: "Length", zh: "位数" };
    let url = "https://github.com/vidalouiswang/passwordgenerator.github.io";
    let strHeading = { en: "This website is open source on <a href='" + url + "'>GitHub</a>", zh: "这个网站开源在<a href='" + url + "'>GitHub</a>" }
    let isLanguageChinese = navigator.language;
    isLanguageChinese = /zh/i.test(isLanguageChinese);

    //sha256
    (e => {

        let lr = (n, x) => { return (x >>> n) | (x << (32 - n)) }

            , hh = (x, y, z) => { return (x & y) ^ (~x & z) }

            , mi = (x, y, z) => { return (x & y) ^ (x & z) ^ (y & z) }

            , hI0 = x => { return lr(2, x) ^ lr(13, x) ^ lr(22, x) }

            , hI1 = x => { return lr(6, x) ^ lr(11, x) ^ lr(25, x) }

            , hi0 = x => { return lr(7, x) ^ lr(18, x) ^ (x >>> 3) }

            , hi1 = x => { return lr(17, x) ^ lr(19, x) ^ (x >>> 10) };

        let se = (W, j) => { return (W[j & 0x0f] += hi1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] + hi0(W[(j + 1) & 0x0f])) }
        let K256 = new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2);
        let ha, coo, br;
        let hd = "0123456789abcdef";

        let sa = (x, y) => { let lsw = (x & 0xffff) + (y & 0xffff); let msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xffff) }

        let li = () => {
            ha = new Array(8);
            coo = new Array(2);
            br = new Array(64);
            coo[0] = coo[1] = 0;
            ha[0] = 0x6a09e667;
            ha[1] = 0xbb67ae85;
            ha[2] = 0x3c6ef372;
            ha[3] = 0xa54ff53a;
            ha[4] = 0x510e527f;
            ha[5] = 0x9b05688c;
            ha[6] = 0x1f83d9ab;
            ha[7] = 0x5be0cd19
        }

        let tf = () => {
            let a, b, c, d, e, f, g, h, T1, T2;
            let W = new Array(16);
            a = ha[0];
            b = ha[1];
            c = ha[2];
            d = ha[3];
            e = ha[4];
            f = ha[5];
            g = ha[6];
            h = ha[7];
            for (let i = 0; i < 16; i++) W[i] = br[(i << 2) + 3] | (br[(i << 2) + 2] << 8) | (br[(i << 2) + 1] << 16) | (br[i << 2] << 24);
            for (let j = 0; j < 64; j++) {
                T1 = h + hI1(e) + hh(e, f, g) + K256[j];
                if (j < 16) T1 += W[j];
                else T1 += se(W, j);
                T2 = hI0(a) + mi(a, b, c);
                h = g;
                g = f;
                f = e;
                e = sa(d, T1);
                d = c;
                c = b;
                b = a;
                a = sa(T1, T2)
            }
            ha[0] += a;
            ha[1] += b;
            ha[2] += c;
            ha[3] += d;
            ha[4] += e;
            ha[5] += f;
            ha[6] += g;
            ha[7] += h
        }

        let up = (d, il) => {
            let i, k, c = 0;
            k = (coo[0] >> 3) & 0x3f;
            let r = il & 0x3f;
            if ((coo[0] += il << 3) < il << 3) coo[1]++;
            coo[1] += il >> 29;
            for (i = 0; i + 63 < il; i += 64) {
                for (let j = k; j < 64; j++) br[j] = d.charCodeAt(c++);
                tf();
                k = 0;
            }
            for (let j = 0; j < r; j++) br[j] = d.charCodeAt(c++)
        }

        let hha = () => {
            let j = (coo[0] >> 3) & 0x3f;
            br[j++] = 0x80;
            if (j <= 56) { for (let i = j; i < 56; i++) br[i] = 0 } else {
                for (let i = j; i < 64; i++) br[i] = 0;
                tf();
                for (let i = 0; i < 56; i++) br[i] = 0
            }
            br[56] = (coo[1] >>> 24) & 0xff;
            br[57] = (coo[1] >>> 16) & 0xff;
            br[58] = (coo[1] >>> 8) & 0xff;
            br[59] = coo[1] & 0xff;
            br[60] = (coo[0] >>> 24) & 0xff;
            br[61] = (coo[0] >>> 16) & 0xff;
            br[62] = (coo[0] >>> 8) & 0xff;
            br[63] = coo[0] & 0xff;
            tf()
        }

        let seb = () => {
            let j = 0;
            let o = new Array(32);
            for (let i = 0; i < 8; i++) {
                o[j++] = (ha[i] >>> 24) & 0xff;
                o[j++] = (ha[i] >>> 16) & 0xff;
                o[j++] = (ha[i] >>> 8) & 0xff;
                o[j++] = ha[i] & 0xff;
            }
            return o;
        }

        let seh = () => { let o = new String(); for (let i = 0; i < 8; i++) { for (let j = 28; j >= 0; j -= 4) o += hd.charAt((ha[i] >>> j) & 0x0f) } return o }

        let sha256 = (data, bytes) => {
            li();
            up(data, data.length);
            hha();
            return bytes ? seb() : seh()
        };
        let te1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let te2 = "+=-_,.!@#%";

        let df = (s, safeMode) => {
            let result = "";
            if (safeMode == 1) {
                for (let i of s) {
                    result += te1.indexOf(i) == -1 && te2.indexOf(i) == -1 ? (te1 + te2).substr(i.charCodeAt() % (te1.length + te2.length), 1) : i;
                }
            } else if (safeMode == 2) {
                for (let i of s) {
                    result += te1.indexOf(i) == -1 ? te1.substr(i.charCodeAt() % te1.length, 1) : i;
                }
            } else {
                result = s;
            }
            return result;
        };

        let en = (words, times, safeMode) => {
            let result = "";
            let chars = "";
            while (times-- > 0) {
                let t = sha256(chars != "" ? chars : words, true);
                chars = "";
                for (let i of t) {
                    chars += String.fromCharCode(33 + (i % 93));
                }
                chars = df(chars, safeMode);
                result += chars;
            }
            return result;
        };
        w.getPassword = (w, m, l) => {
            let initTimes = 1;
            let r = en(w, parseInt(l / 32) + initTimes++, m);
            let c = !1,
                rd = /[0-9]/,
                rc = /[A-Z]/,
                rc1 = /[a-z]/,
                rn = /[\+=\-,\.!@#%]/,
                rs = /[`~\$\^&\*\(\)\[\]\{\};:'"<>\?\/\\|]/;
            let k = 0;
            let t = "";

            let testReg = (content, arr) => {
                let c = true;
                for (let i of arr) {
                    c = i.test(content);
                    if (!c) {
                        break;
                    }
                }
                return c;
            };

            let getDigit = (d) => {
                let t2 = "";
                for (let i of d) {
                    if (rd.test(i)) {
                        t2 += i;
                    }
                }
                return t2;
            };
            while (!c) {
                if (m != -1) {
                    t = r.substr(k, l);
                    if (m == 0) {
                        c = testReg(t, [rd, rc, rc1, rs]);
                    } else if (m == 1) {
                        c = testReg(t, [rd, rc, rc1, rn]);
                    } else {
                        c = testReg(t, [rd, rc, rc1]);
                    }
                } else {
                    t += getDigit(r);
                    c = l < t.length;
                }
                m != -1 ? (r = (r.length - k++ <= l) ? en(w, parseInt(l / 32) + initTimes++, m) : r) : (r = en(w + t, parseInt(l / 32) + initTimes++, m));
            }
            return m == -1 ? t.substr(0, l) : t;
        };
    })();

    let generatePassword = e => {
        let mainPass = get("mainPass");
        let value = "";
        for (let i of w.app) {
            value += i.value;
        }
        if (mainPass.value && value) {
            let pass = getPassword(mainPass.value + value, w.config.level, w.config.bit);
            get("password").value = pass;
        }
    };

    w.get = function (id) {
        return document.getElementById(id);
    };
    let create = e => {
        e = e || "div";
        return document.createElement(e);
    };

    w.showMsg = (msg, timeout) => {
        let a = get("msgBox");
        a.innerHTML = msg;
        a.className = "msgBox";
        a.onclick = e => {
            a.className = "msgBox msgBoxHide";
        };
        if (timeout) {
            setTimeout(() => {
                a.onclick();
            }, timeout);
        }
    };

    w.custom = e => {
        let bit = get("custom-bit").value;

        if (!bit) {
            return;
        }

        bit = parseInt(bit);
        if (!bit) {
            return;
        }
        if (!ls.custom) {
            ls.custom = "[]";
        }
        let arr = JSON.parse(ls.custom);
        let target = arr.find(e => {
            return e.bit == bit;
        });

        if (!target) {
            arr.push({
                bit: bit
            });
            new Config({
                type: "bit",
                value: bit,
                text: bit.toString(),
                container: containerBits
            });
            ls.custom = JSON.stringify(arr);
        }
    };


    class Config {
        constructor(config) {
            let b = this;
            config = config || {};
            b.type = config.type || "level";
            b.value = config.value;
            b.selected = 0;

            config.type == "bit" ? bitGroup.push(b) : levelGroup.push(b);

            let outerDiv = create();
            outerDiv.className = "config";
            let span = create("span");
            span.innerText = config.value.toString();

            let dot = create();
            b.dot = dot;
            dot.className = "dot";
            outerDiv.appendChild(dot);
            outerDiv.appendChild(span);

            outerDiv.onclick = e => {
                b.select.apply(b, [e]);
            };

            if (config.selected) {
                b.select.apply(b, [e]);
            }

            config.container.appendChild(outerDiv);
        }
        select() {
            let b = this;
            let arr = b.type == "bit" ? bitGroup : levelGroup;
            for (let i of arr) {
                i.unselect();
            }
            b.selected = 1;
            b.dot.className = "dot dot-selected";
            if (b.type == "bit") {
                w.config.bit = b.value;
            } else {
                w.config.level = b.value;
            }
            generatePassword();
        }
        unselect() {
            let b = this;
            b.selected = 0;
            b.dot.className = "dot";
        }
    }

    class App {
        constructor(container) {
            this.input = create("input");
            let input = this.input;
            this.value = "";
            input.type = "text";
            input.className = "app";
            input.placeholder = "App";
            input.onkeyup = e => {
                this.keyup.apply(this, [e]);
            };
            this.container = container;
            container.appendChild(input);
            w.app.push(this);
        }
        keyup(e) {
            //this == app
            this.value = this.input.value;
            generatePassword();
            if (!this.value) {
                if (w.app.length > 1) {
                    w.app.splice(w.app.findIndex(e => { return e == this; }), 1);
                    this.value = "";
                    this.container.removeChild(this.input);
                }

            } else {
                if (w.app[w.app.length - 1].value != "") {
                    new App(get("app"));
                }
            }
        }
    }

    let containerBits = get("div-bits");
    let containerLevel = get("div-level");
    let objMainPassword = get("mainPass");
    let objCustomBit = get("custom-bit");
    let objPassword = get("password");
    get("heading").innerHTML = isLanguageChinese ? strHeading.zh : strHeading.en;

    objCustomBit.placeholder = isLanguageChinese ? strCustomBit.zh : strCustomBit.en;

    objMainPassword.placeholder = isLanguageChinese ? strMainPass.zh : strMainPass.en;
    objPassword.placeholder = isLanguageChinese ? strPassword.zh : strPassword.en;

    objPassword.onclick = function (e) {
        if (this.value && this.value.length) {
            navigator.clipboard.writeText(this.value).then(e => {
                showMsg(isLanguageChinese ? strCopySuccessfully.zh : strCopySuccessfully.en, 1000);
            });
        }
    };

    get("btnShowCustom").innerText = isLanguageChinese ? strBtnShowCustom.zh : strBtnShowCustom.en;
    get("btnAddCustom").innerText = isLanguageChinese ? strBtnAddCustom.zh : strBtnAddCustom.en;

    objMainPassword.onkeyup = e => {
        generatePassword();
    };

    let btnShowPwd = get("btnShowPwd");
    let btnStore = get("btnStore");
    btnShowPwd.innerText = isLanguageChinese ? strBtnShowPwd.zh[0] : strBtnShowPwd.en[0];
    if (ls.password && ls.password.length) {
        objMainPassword.value = ls.password;
        btnStore.innerText = isLanguageChinese ? strBtnStore.zh[1] : strBtnStore.en[1];
    } else {
        btnStore.innerText = isLanguageChinese ? strBtnStore.zh[0] : strBtnStore.en[0];
    }



    get("showM").onclick = function (e) {
        if (!showMainPassword) {
            showMainPassword = !0;
            objMainPassword.type = "text";
            btnShowPwd.innerText = isLanguageChinese ? strBtnShowPwd.zh[1] : strBtnShowPwd.en[1];
        } else {
            showMainPassword = 0;
            objMainPassword.type = "password";
            btnShowPwd.innerText = isLanguageChinese ? strBtnShowPwd.zh[0] : strBtnShowPwd.en[0];
        }
    };

    get("store").onclick = function (e) {
        if (btnStore.innerText == (isLanguageChinese ? strBtnStore.zh[0] : strBtnStore.en[0])) {
            ls.password = objMainPassword.value;
            showMsg(isLanguageChinese ? strStoreInfo.zh : strStoreInfo.en);
            btnStore.innerText = isLanguageChinese ? strBtnStore.zh[1] : strBtnStore.en[1];
        } else {
            ls.password = "";
            btnStore.innerText = isLanguageChinese ? strBtnStore.zh[0] : strBtnStore.en[0];
        }
    };

    if (localStorage.password) {
        objMainPassword.value = localStorage.password;
    }

    new Config({
        type: "bit",
        value: 256,
        container: containerBits
    });

    new Config({
        type: "bit",
        value: 16,
        selected: 1,
        container: containerBits
    });
    new Config({
        type: "bit",
        value: 8,
        container: containerBits
    });
    new Config({
        type: "bit",
        value: 6,
        container: containerBits
    });

    if (ls.custom) {
        let arr = 0;
        try {
            arr = JSON.parse(ls.custom);
        } catch (e) {

        }
        if (arr) {
            for (let i of arr) {
                new Config({
                    type: "bit",
                    custom: !0,
                    value: i.bit,
                    text: i.bit.toString(),
                    container: containerBits
                });
            }
        }
    }

    new Config({
        value: 0,
        text: "A",
        selected: 1,
        container: containerLevel
    });
    new Config({
        value: 1,
        text: "B",
        container: containerLevel
    });
    new Config({
        value: 2,
        text: "C",
        container: containerLevel
    });
    new Config({
        value: -1,
        text: "D",
        container: containerLevel
    });
    new App(get("app"));
})();
