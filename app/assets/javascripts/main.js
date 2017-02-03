
$(document).on('click','.close',function(){
    $(this).parent().remove();
});

function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
        r = delta + ' seconds ago';
    } else if(delta < 120) {
        r = 'a minute ago';
    } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
        r = 'an hour ago';
    } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
        r = 'a day ago';
    } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return r;
};


$(document).ready(function () {

    $('#submit_comment').on("click", function() {
        var form = $(this).parent('form');
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            success: function(data) {
                $('#comments')
                    .append("<li class='cmmnt'><div class='cmmnt-content'><header><a href='#' class='userlink'>" + data.name + "</a> - <span class='pubdate'> posted " + relative_time(data.created_at )+ "</span></header><p>" + data.body + "</p></div></li>");
                $('#new_comment')[0].reset();

            },
            error: function() {
                console.log("ERROR");
            },
            dataType: 'JSON'
        });
    });


});


function getComments() {
    event.preventDefault();

    $.ajax({
        type: "GET",
        url: 'posts/1/comments', // not working get the actual path and concatenate them
        success: function(data) {
            console.log(data);

        },
        error: function() {
            console.log("ERROR");
        },
        dataType: 'JSON'
    });

};