const db = new DBComment();
const id = Number(new Date);

const user = db.getLoginUser();
console.log(JSON.stringify(user));
/*user{
    "id":"l1gOnG52RT",
    "nickName":"gApQgcoJsL",
    "avatarURL":"img/avatar6.png"
}*/

window.onload = function loadList() {
    db.getCommentList({ page: 1, limit: 10 }).then((list) => {
        list.forEach(people => {
            loadComment(people);
        });
    });
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
    console.log(differ);
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

