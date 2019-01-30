const db = new DBComment();
const id = Number(new Date);

const user = db.getLoginUser();
console.log(JSON.stringify(user));
/*user{
    "id":"l1gOnG52RT",
    "nickName":"gApQgcoJsL",
    "avatarURL":"img/avatar6.png"
}*/

window.onload = loadList(1);

function loadList(page){
    console.log('转跳至第' + page + '页');
    let list = document.getElementById('commentList');
    let pageDevice = document.getElementsByClassName('page_device');
    list.innerHTML = '';
    pageDevice[0].innerHTML = '';
    let obj = {
        page: 0,
        limit: 10,
    }
    obj.page = page;
    db.getCommentList(obj).then((list) => {
        list.forEach(people => {
            loadComment(people);
        });
    });
    db.getCommentTotal().then((total) => {
        let counter =  document.getElementsByClassName('counter');
        counter[0].innerText = `共${total}条评论`
        loadButton(page, total);
    })
}

function loadComment(people) {
    let child_div = document.createElement('div');
    let parent_div = document.getElementById('commentList');
    parent_div.appendChild(child_div);
    child_div.className = 'one_comment';
    child_div.id = people.user.id;
    child_div.innerHTML += `
        <div class="avatar">
            <img src="${ people.user.avatarURL}" />
        </div>
        <div class="content">
            <a href="#">${ people.user.nickName}:&nbsp;</a>
            <span class="sentence">${ people.content.substring(0, 139)}</span>
        </div>
        <div class="content_right">
            <div class="date">
                ${ formatDate(people.time) }
            </div>
            <a href="#" class="delete" onclick="delete_comment(${ people.user.id})">删除</a>
        </div>`
}

function loadButton(page, total){
    let pageDevice = document.getElementsByClassName('page_device');
    totalPage = Math.ceil(total / 10);
    let buttons = new Array(5);
    
    /* 上一页按钮 */
    let lastPage = document.createElement('button');
    lastPage.className = 'page_change_btn';
    lastPage.innerText = '< 上一页'
    lastPage.addEventListener('click', () => {
        loadList(page - 1);
    }, true);

    /* 下一页按钮 */
    let nextPage = document.createElement('button');
    nextPage.className = 'page_change_btn';
    nextPage.innerText = '下一页 >'
    nextPage.addEventListener('click', () => {
        loadList(page + 1);
    }, true);

    pageDevice[0].appendChild(lastPage);

    /* 添加五个页码按钮 */
    for(let i = 0; i < 5; i++){
        buttons[i] = document.createElement('button');
        buttons[i].className = 'page_btn'
        pageDevice[0].appendChild(buttons[i]);
    }

    buttons[0].innerText = '1';
    buttons[0].addEventListener('click', () => {
        loadList(1);
    }, true);
    buttons[4].innerText = totalPage.toString();
    buttons[4].addEventListener('click', () => {
        loadList(totalPage);
    }, true);
    for(let i = 1; i < 4; i++){
        if(page == 1){
            buttons[i].innerText = (page - 1 + i).toString();
        } else if(page == totalPage){
            buttons[i].innerText = (page - 3 + i).toString();
        } else {
            buttons[i].innerText = (page - 2 + i).toString();
        }
        if(buttons[i].innerText == page.toString()){
            buttons[i].className = 'page_btn page_btn_selected';
        }
        if(parseInt(buttons[i]) > totalPage){
            buttons[i].style.display = 'none';
        }
        buttons[i].addEventListener('click', () => {
            loadList(parseInt(buttons[i].innerText));
        });
    }
    
    pageDevice[0].appendChild(nextPage);

    /* 最小页与首页重复 或 最大页与尾页重复 隐藏首页或尾页 */
    if((parseInt(buttons[1].innerText) - parseInt(buttons[0].innerText)) <= 0){
        buttons[0].style.display = 'none';
    }
    if((parseInt(buttons[4].innerText) - parseInt(buttons[3].innerText)) <= 0){
        buttons[4].style.display = 'none';
    }
    /* 最小页与首页间隔大于1 或 最大页与尾页间隔大于1 添加... */
    if((parseInt(buttons[1].innerText) - parseInt(buttons[0].innerText)) > 1){
        let span = document.createElement('span');
        span.innerText = '...';
        pageDevice[0].insertBefore(span, buttons[1]);
    }
    if((parseInt(buttons[4].innerText) - parseInt(buttons[3].innerText)) > 1){
        let span = document.createElement('span');
        span.innerText = '...';
        pageDevice[0].insertBefore(span, buttons[4]);
    }

    for(let i = 1; i < 4; i++){
        if(buttons[i].className == 'page_btn page_btn_selected'){
            /* 当前为第一页或为最后一页时，要disabled上一页或下一页按钮 */
            if(buttons[i].innerText == '1'){
                lastPage.disabled = true;
                lastPage.style.cursor = 'initial';
            }
            else if(buttons[i].innerText == totalPage.toString()){
                nextPage.disabled = true;
                nextPage.style.cursor = 'initial';
            }
        }
    }

}

function comment_counter() {
    var content = document.getElementsByTagName('textarea');
    var length = content[0].value.length.toString();
    var str_number = document.getElementsByClassName('comment_counter');
    str_number[0].innerText = length + '/140';
}

function add_comment() {
    var content = document.getElementsByTagName('textarea');
    var length = content[0].value.length.toString();
    if (length <= 0) {
        alert('评论为空');
    }
    else if (length > 140) {
        alert('评论字数不能多余140字');
    }
    else {
        var date = new Date();
        var child_div = document.createElement('div');
        var parent_div = document.getElementById('commentList');
        parent_div.appendChild(child_div);
        child_div.className = 'one_comment';
        child_div.id = user.id;
        child_div.innerHTML += `
            <div class="avatar">
                <img src="${ user.avatarURL}" />
            </div>
            <div class="content">
                <a href="#">${ user.nickName}:&nbsp;</a>
                <span>${ content[0].value}</span>
            </div>
            <div class="content_right">
                <div class="date">
                    ${ formatDate(date)}
                </div>
                <a href="#" class="delete" onclick="delete_comment(${ user.id})">删除</a>
            </div>`
        content[0].value = '';
        alert('评论成功');
    }

}

function delete_comment(delete_id) {
    var parent_div2 = document.getElementById('commentList');
    parent_div2.removeChild(delete_id);
}

function randomNumber(min, max) {
    var choices = max - min + 1;
    return Math.floor(Math.random() * (choices) + min);
}

function formatDate(time) {
    let timeNow = new Date();
    let differ = timeNow.getTime() - time;
    differ = Math.floor(differ/1000);
    if(differ < 1){
        return '刚刚';
    } else if(differ < 60){
        return `${ differ }秒前`
    } else if(differ < 3600){
        return `${ Math.floor(differ/60) }分钟前`
    } else if(differ < 86400){
        return `${ Math.floor(differ/3600) }小时前`
    } else if(differ < 864000){
        return `${ Math.floor(differ/86400) }天前`
    } else{
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}年${month}月${day}日`;
    }
}

