//显示可疑文本数据
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

//显示系统创建的受信内容
function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

//处理用户原始输入
function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;
    //如果用户输入的内容以斜杠开头，将其视为聊天命令
    if (message.chatApp(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#message').append(divSystemContentElement(systemMessage));
        }
    } else {
        //将非命令输入广播给其他用户
        chatApp.sendMessage($('#room').text(), message);
        $('#message').append(divEscapedContentElement(message));
        $('#message').scrollTop($('#message').prop('scrollHeight'));
    }

    $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function () {
    var chatApp = new Chat(socket);

    socket.on('nameResult', function (result) {
        var message;

        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#message').append(divSystemContentElement(message));
    });

    socket.on('joinResult', function (result) {
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('Room changed.'));
    });

    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#message').append(newElement);
    });

    socket.on('rooms', function (rooms) {
        $('#room-list').empty();

        for (var room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room-list').append(divEscapedContentElement(room));
            }
        }

        $('#room-list div').click(function () {
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });

    setInterval(function () {
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    $('#send-message').submit(function () {
        processUserInput(chatApp, socket);
        return false;
    });
});

