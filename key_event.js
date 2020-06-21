if (window == top) {
    //add the keyboard handler
    window.addEventListener('keyup', doKeyPress, false);
}

window.onload = function () {

};

function doKeyPress(e) {
    console.log(e);
    let tmp;
    if (e.code == 'KeyA') {
        tmp = document.querySelector('.pre.pr-1')?.getAttribute('href');
        if (tmp != undefined) {
            location.assign(tmp);
            console.log('上一支影片');
        }
    } else if (e.code == 'KeyD') {
        tmp = document.querySelector('.nex.ne-1')?.getAttribute('href');
        if (tmp != undefined) {
            location.assign(tmp);
            console.log('下一支影片');
        }
    } else if (e.code == 'KeyS') {
        copyTitle();
        let url = document.querySelector('.single-t a')?.getAttribute('href');
        window.open(url);
    } else if (e.code == 'KeyW') {
        // tmp = `http://jtl.re/d/${document.querySelector('a.j-link')?.getAttribute('href').split("=")[1]}.torrent`;
        // tmp = "http://jtl.re/d/" + $('.j-link').attr('href').split("=")[1] + ".torrent";
        tmp = document.querySelector('a.j-link')?.getAttribute('href');
        console.log(tmp);
        location.assign(tmp);
        console.log('複製標題並下載影片種子檔');
    } else if (e.code == 'KeyX') {
        window.close();
    } else if (e.code == 'KeyV') {
        QueryHistory();
    } else if (e.code == 'KeyC') {
        OpenWindows();
    }

}

function copyTitle() {
    let nameObj = document.getElementsByClassName('entry-title')[0];
    let nameTxt = nameObj.textContent;
    nameTxt = nameTxt.replace(/[\*\|\\:"<>?\/]/g, '');
    $('.s[name="s"]').val(nameTxt);
    $('.s[name="s"]').select();
    document.execCommand('copy');
    $('.s[name="s"]').val('');
}

var linkList = [];

function QueryHistory() {
    let aList = document.querySelectorAll('div.base.rank div a:first-child');
    let hrefList = [];
    aList.forEach(el => {
        hrefList.push(el.getAttribute('href'));
    });

    let port = chrome.runtime.connect({ name: "knockknock" });
    port.postMessage({ hrefList });
    port.onMessage.addListener(function (response) {
        console.log(response);
        linkList = response;
        OpenWindows();
    });
}

function OpenWindows() {
    console.log(linkList);
    for (let i = 10; i > 0 && linkList.length > 0; i--) {
        window.open(linkList.pop());
    }
}
