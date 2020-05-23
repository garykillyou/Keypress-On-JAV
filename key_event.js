if (window == top) {
    //add the keyboard handler
    window.addEventListener('keyup', doKeyPress, false);
}

function doKeyPress(e) {
    console.log(e); 
    let tmp;
    if (e.code == 'KeyA') {
        tmp = $('.pre.pr-1').attr('href');
        location.assign(tmp);
        console.log('上一支影片')
    } else if (e.code == 'KeyD') {
        tmp = $('.nex.ne-1');
        if (tmp.length > 0) {
            location.assign(tmp.attr('href'));
            console.log('下一支影片')
        }
    } else if (e.code == 'KeyS') {
        copyTitle();
        let url = $('.single-t a').length > 1 ? $('.single-t a')[0].attributes.href : $('.single-t a').attr('href')
        window.open(url);
    } else if (e.code == 'KeyW') {
        tmp = "http://jtl.re/d/" + $('.j-link').attr('href').split("=")[1] + ".torrent";
        console.log(tmp);
        location.href = tmp;
        console.log('複製標題並下載影片種子檔');
    } else if (e.code == 'KeyX') {
        window.close();
    }
}

function copyTitle() {
    $('.s[name="s"]').val($('.entry-title')[0].textContent);
    $('.s[name="s"]').select();
    document.execCommand('copy');
    $('.s[name="s"]').val('');
}

function openUnvisited() {
    let tmp = $('span.base-t');
    tmp.filter(function (i, e) {
        return $(e).css('color') == 'rgb(68, 85, 255)';
    });
}
