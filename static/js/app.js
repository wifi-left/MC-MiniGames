const commitRootObj = document.getElementById("commits");
document.querySelectorAll(".version-show").forEach((ele) => {
    ele.innerText = BAMBOOMUSIC.version;
});

function loadCommitsFromGitHub() {
    $.fetch("https://api.github.com/repos/wifi-left/Map-MiniGames/commits", "json").then(data => {
        if (data == null) {
            commitRootObj.innerHTML = "获取失败。<br/>" + e.message;
        }
        commitRootObj.innerHTML = "";
        for (let i in data) {
            let dat = data[i];
            let newObj = document.createElement("div");
            newObj.classList.add("commits-text")
            if (dat['commit'] != null) {
                let msgObj = document.createElement("span");
                let timeObj = document.createElement("span");
                let msg = dat['commit']['message'];
                let time = dat['commit']['committer']['date'];
                msgObj.innerText = msg;
                timeObj.innerText = "Update Time: " + time;
                msgObj.classList.add("commit-messages");
                timeObj.classList.add("commit-time");
                newObj.appendChild(msgObj);
                newObj.appendChild(timeObj);
                commitRootObj.appendChild(newObj);
            }
        }
    }).catch(e => {
        commitRootObj.innerHTML = "获取失败。<br/>" + e.message;
    })
    $.fetch("https://api.github.com/repos/wifi-left/Map-MiniGames/releases/latest", "json").then(data => {
        var elements = document.querySelectorAll(".map-version-text");
        for (let i = 0; i < elements.length; i++) {
            let ele = elements[i];
            let version_name = data.name;
            if (version_name == null) {
                throw new WebTransportError("Empty data.");
            }
            ele.innerText = version_name;
        }
    }).catch(e => {
        var elements = document.querySelectorAll(".map-version-text");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "获取失败：" + e.message;
        }
    })
}
loadCommitsFromGitHub();

function displayImage(btn) {
    btn.remove();
    let eles = document.querySelectorAll(".image-viewer");
    for (let i = 0; i < eles.length; i++) {
        let url = eles[i].getAttribute("data-src");
        eles[i].setAttribute("src", url);
        eles[i].style.display = "inline-block";
    }
}