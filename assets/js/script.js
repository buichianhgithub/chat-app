
var socket = io.connect();


socket.on('updatechat', function (username, data) {
    $('#chat').append('<b>' + username + ' :</b> ' + data + '<br>');
});
// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function (rooms, current_room) {
    $('#rooms').empty();
    $.each(rooms, function (key, value) {
        if (value == current_room) {
            $('#rooms').append('<div class="btn btn-info" style="margin-bottom:5px;width:100%;background:#483D8B;color:smokewhite">' + value + '</div>');
        }
        else {
            $('#rooms').append('<div><a class="btn btn-info" href="#" style="margin-bottom:5px;width:100%" class="btn btn-success"  onclick="switchRoom(\'' + value + '\')">' + value + '</a></div>');
        }
    });
});

function switchRoom(room) {
    socket.emit('switchRoom', room);
}


$(function () {
$('#roombutton').click(function () {
    $('#roomname').show();

    if (document.getElementById("roomname").value != "") {
        var name = $('#roomname').val();
        $('#roomname').val('');
        socket.emit('create', name)
        $('#roomname').hide();

    }
});
});

// on load of page
$(function () {
    // when the client clicks SEND
    $('#roomname').hide();

    $('#send').click(function () {
        var message = $('#chat').val();
        $('#chat').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#chat').keypress(function (e) {
        if (e.which == 13) {
            $(this).blur();
            $('#send').focus().click();
        }
    });
});



jQuery(function ($) {



    // listener, whenever the server emits 'updatechat', this updates the chat body

    var $nickForm = $('#setNick');
    var $nickBox = $('#nickName');
    var $nickError = $('#nickError');
    var $users = $('#users');
    var $private_name = $('#private_name');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    




    $nickForm.submit(function (e) {

        e.preventDefault();
        socket.emit('new user', $nickBox.val(), function (data) {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html('That username is already taken! Please Try Again. ');
            }
        });
        $nickBox.val('');
    });
    var i;
    socket.on('usernames', function (data) {
        var html = ''
        var list = document.getElementsByClassName("testi");
        for (i = 0; i < data.length; i++) {


            html += '<div class="media">' +
                '<a class="pull-left" href="#">' +
                '<img class="media-object img-circle" style="max-height:40px;" src="img/user_online.png" width="40px" />' +
                '</a>' +
                '<div class="media-body" >' +
                '<h5>' +

                '<p class="testi" style = "color:#6699ff;">' + data[i] + '</p>' +

                '</h5>' +


                '</div>' +

                '</div>'
        }

        $users.html(html);
        for (var s = 0; s < list.length; s++) {
            list[s].setAttribute("id", "box" + s);


        }
        var t;
        for (t = 0; t < s; t++) {
            document.getElementById('box' + t).onclick = function () {
                //var x = document.getElementById('box' + t).innerHTML
                alert(data);
            }
        }
    })

    $("#send").click(function (e) {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), function (data) {
            $chat.append('<span class="error">' + data + "</span><br/>");
        });
        $messageBox.val('');
    });
    $private_name.click(function (e) {
        e.preventDefault();
        alert("1");
    });

    socket.on('load old msgs', function (docs) {
        for (var i = 0; i < docs.length; i++) {
            displayMsg(docs[i]);
        }
    })


    socket.on('new message', function (data) {
        displayMsg(data)
    })
    function displayMsg(data) {

        $chat.append(
            '<div class="media">' +
            '<a class="pull-left" href="#">' +
            '<img class="media-object img-circle " src="img/user.png" width="40px" height="40px" />' +
            '</a>' +
            '<div class="media-body" >' +
            data.msg +
            '<br />' +
            '<small class="text-muted" style = "color:#6699ff;">' +"~~~~"+
            data.nick +"~~~~"+
            '<br />'+
            '</small>' +
            '<hr />' +
            '</div>' +
            '</div>'
        )
    }


    socket.on('whisper', function (data) {
        $chat.append('<div class="media">' +
            '<a class="pull-left" href="#">' +
            '<img class="media-object img-circle " src="img/user.png" width="40px" height="40px"  />' +
            '</a>' +
            '<div class="media-body" >' +
            '<span class="whisper"><b>' + data.msg + '</b></span>' +
            '<br />' +
            '<small class="text-muted" style = "color:#6699ff;">' +
            data.nick +
            '</small>' +
            '<hr />' +
            '</div>' +
            '</div>'
        );
    });
});





