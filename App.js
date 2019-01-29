function comment_counter(){
    var content = document.getElementsByTagName('textarea');
    console.log(content[0].value);
    var length = content[0].value.length.toString();
    var str_number = document.getElementsByClassName('comment_counter');
    console.log(length, str_number);
    str_number[0].innerText = length + '/140';
}

function comment_btn(){
    var content = document.getElementsByTagName('textarea');
    console.log(content[0].value);
    var length = content[0].value.length.toString();
    if(length <= 0){
        alert('评论为空');
    }
    else if(length > 140){
        alert('评论字数不能多余140字');
    }
    else{
        var date = new Date();
        var child_div = document.createElement('div');
        var parent_div = document.getElementById('commentList');
        parent_div.appendChild(child_div);
        child_div.className = "one_comment";
        child_div.innerHTML += `
            <div class="avatar">
                <img src="img/avatar`+ randomNumber(0, 9) +`.png" />
            </div>
            <div class="content">
                <a href="#">葵葵:&nbsp;</a>
                <span>嚯嚯嚯嚯嚯嚯嚯嚯嚯~</span>
            </div>
            <div class="content_right">
                <div class="date">`
                    + formatDate(date) + `
                </div>
                <a href="#" class="delete">删除</a>
            </div>`
        alert('评论成功');
    }
    
}

function randomNumber(min, max){
    var choices = max - min + 1;
    return Math.floor(Math.random() * (choices) + min);
}

function formatDate(date){
    var year =  date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate(); 
    return year + `年` + month + `月` + day + `日`;
}