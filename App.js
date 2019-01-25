function comment_counter(){
    var content = document.getElementsByTagName('textarea');
    console.log(content[0].value);
    var length = content[0].value.length.toString();
    var str_number = document.getElementsByClassName('comment_counter');
    console.log(length, str_number);
    str_number[0].innerText = length + '/140';
}