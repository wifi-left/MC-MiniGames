const promptBlockTitleObj = document.getElementById("prompt-content");
const promptBlockObj = document.querySelector(".promptBlock");
var SlideDownTimeoutFunc = 0;
var nowWindow = "";

// 初始化部分 HTML 对象方法
function init_elements() {
}

// 主菜单
var rootmenu = document.getElementsByClassName("root-left-part")[0];
// 显示/隐藏主菜单
function show_or_hide_the_menubar(op = null) {
    let winbtn = document.querySelector(".active");
    if (op == true) {
        rootmenu.classList.add("show");
        let dsTop = winbtn.getBoundingClientRect().top + 22;
        document.getElementById("left-sel-display-bar").style.top = dsTop + "px";
        return;
    } else if (op == false) {
        rootmenu.classList.remove("show");
        return;
    }
    if (rootmenu.classList.contains("show")) {
        rootmenu.classList.remove("show");
    } else {
        rootmenu.classList.add("show");
        if (winbtn != undefined) {
            let dsTop = winbtn.getBoundingClientRect().top + 22;
            document.getElementById("left-sel-display-bar").style.top = dsTop + "px";
        }
    }
}
var PromptTimeoutId = -1;
function show_msg(message, timeout = 0, raw = false) {
    if (raw) {
        promptBlockTitleObj.innerHTML = message;
    } else {
        promptBlockTitleObj.innerText = message;
    }
    $(promptBlockObj).fadeIn(200);
    if (timeout > 0) {
        PromptTimeoutId = setTimeout(function () {
            $(promptBlockObj).fadeOut(200);
            PromptTimeoutId = -1;
        }, timeout);
    }
}
// 变更窗口
function showWindow(winname, closeold = false) {
    let wid = "win-" + winname;
    let winele = document.getElementById(wid);
    winele.style.display = "inline-block";
}
function changeWindow(winname, closeold = true, _element) {
    let wid = "win-" + winname;
    nowWindow = winname;
    let winele = document.getElementById(wid);
    let allwins = document.getElementsByClassName("app-content-window");
    let winbtn = document.getElementById("btn-" + winname);
    let winbtn2 = null;
    location.hash = winname;
    try {
        winbtn2 = document.getElementById("btn-" + winname + "-bottom");
    } catch (e) {
        console.error(e);
    }
    if (winbtn == undefined) winbtn = { id: undefined };
    let allbtns = document.querySelectorAll(".active");
    if (_element != null) {
        if (_element.classList.contains("active")) {
            return;
        }
    }
    if (allbtns != undefined && closeold) {
        for (let i = 0; i < allbtns.length; i++) {
            allbtns[i].classList.remove("active");
        }
    }
    if (winbtn.id != undefined) {
        let dsTop = winbtn.getBoundingClientRect().top + 22;

        document.getElementById("left-sel-display-bar").style.top = dsTop + "px";
        winbtn.classList.add("active")
        winbtn2.classList.add("active")
    }
    if (closeold) {
        for (var i = 0; i < allwins.length; i++) {
            // $(allwins[i]).fadeOut(1);
            allwins[i].style.display = "none";
        }
    }
    $(winele).fadeIn(100);
    rootmenu.classList.remove("show");
}

function hideWindow(ele) {
    // $(ele).an;
    ele.style.display = "none";
    // $("#top-bar").show();
}
function slideDownWindow(ele) {
    // $(ele).an;
    // clearInterval(SlideDownTimeoutFunc);
    ele.style.top = "100%";
    // $("#top-bar").show();
}
function slideUpWindow(ele) {
    // clearInterval(SlideDownTimeoutFunc);
    // $(ele).an;
    ele.style.top = "0%";
    // $("#top-bar").hide();
}

function closeWindow(ele) {
    $(ele).fadeOut(100);
}
function slideUpWindow_name(elename) {
    let winele = document.getElementById("win-" + elename);
    // console.log(winele.style.top);
    if (winele.style.top == "" || winele.style.top == null) {
        winele.style.display = "inline-block";
        winele.style.top = "100%";
        setTimeout(() => {
            winele.style.top = "0%";
        }, 1);
    } else {
        winele.style.display = "inline-block";
        winele.style.top = "0";
    }

}
function getQueryString(name, url = window.location.search) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substring(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
// 页面加载完后...
window.onload = function () {
    if (location.hash === "#download") {
        changeWindow("download");
        return;
    }
    if (location.hash === "#donate") {
        changeWindow("donate");
        return;
    }
    changeWindow(default_page);

}

// 初始化部分HTML对象
init_elements();
