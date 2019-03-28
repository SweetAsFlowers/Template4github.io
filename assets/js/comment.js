$(document).ready(function() {
    var loc_url = window.location.href;
    var perfix = (loc_url.substring(0, 4) == 'http')? 'http://': 'https://';
    var owner = loc_url.split(perfix)[1].split('.')[0];
    // owner = 'sweetasflowers' // for debug
    var repo = owner+'.github.io';
    var issues_url = 'https://api.github.com/repos/'+owner+'/'+repo+'/issues';
    var title= $("#title").find("a").text();
    $.ajax({
        type: 'GET',
        url: issues_url,
        dataType: 'json',
        async: false,
        success: function(json) {
            for(var i = 0; i < json.length; i++) {
                if(json[i].title == title) {
                    $("#comments").children("p").children("a").attr('href', json[i].html_url);
                    addComment(json[i]);
                    showComments(json[i].comments_url)
                    break;
                }
            }
        }
    });
})

function showComments(comments_url) {
    $.getJSON(comments_url, function(json) {
        for(var i = 0; i < json.length; i++){
            addComment(json[i]);
        }
    });
}

function addComment(a_json) {
    $("div #comments_list ul").append("<li class='comment'>"
        +"<a class='comment-avatar'>"
        +"<img class='comment-avatar-img' src='"
        +a_json.user.avatar_url
        +"'>"
        +"</a>"
        +"<div class='comment-content'>"
            +"<div class='comment-body'>"
            +a_json.body
            +"</div>"
            +"<div class='comment-footer'>"
                +"<a class='comment-name' href='"
                +a_json.user.html_url
                +"'>"
                +a_json.user.login
                +"</a>"
                +" commented on "
                +"<span>"
                +new Date(a_json.updated_at).toLocaleString()
                +"</span>"
            +"</div>"
        +"</div>"
        +"</li>");
}