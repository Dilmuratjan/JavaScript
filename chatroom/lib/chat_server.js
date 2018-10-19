var socketio = require('socket.io');
var io;
var guestNumber = 0;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
//启动Socket.IO服务器
exports.listen = function (server) {
    //启动Socket.IO服务器，允许它搭载在已有的HTTP服务器上
    console.log(`[chat_server] -- listen`);
    io = socketio.listen(server);
    io.set = ('log level', 1);
    //定义每个用户连接的处理逻辑
    io.sockets.on('connection', function (socket) {
        //在用户连接上来时赋予其一个访客名
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        //在用户连接上来时把他放入聊天室Lobby里面
        joinRoom(socket, 'Lobby');
        //处理用户的消息，更名，以及聊天室的创建和变更
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        //用户发出请求时，向其提供已经被占用的聊天室的列表
        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        //定义用户断开连接后的清除逻辑
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

//分配用户昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    console.log(`[chat_server] -- assignGuestName`);
    //生成新昵称
    var name = 'Guest :' + guestNumber;
    console.log(name);
    //将用户昵称与客户端连接ID关联
    nickNames[socket.id] = name;
    //让用户知道自己的昵称
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    //存放已被占用的昵称
    namesUsed.push(name);
    //增加用来生成昵称的计数器
    return guestNumber + 1;
}

//与进入聊天室相关的逻辑
function joinRoom(socket, room) {
    console.log(`[chat_server] -- joinRoom`);
    //让用户进入房间
    socket.join(room);
    //记录用户的当前房间
    currentRoom[socket.id] = room;
    //让用户知道自己进入了新的房间
    socket.emit('joinResult', {room: room});
    //让房间里的其他用户得知有新用户进入了房间
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });
    //确定房间里有哪些用户
    var userInRoom = io.sockets.clients(room);
    //如果有多个人，则汇总人数
    if (userInRoom.length > 1) {
        var userInRoomSummary = 'User currently in ' + room + ':';
        for (var index in userInRoom) {
            var userSocketId = userInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    userInRoomSummary += ', ';
                }
                userInRoomSummary += nickNames [userSocketId];
            }
        }
        userInRoomSummary += '.';
        //将汇总信息发送给这个用户
        socket.emit('message', {text: userInRoomSummary});
    }
}

//更名请求的处理逻辑
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    console.log(`[chat_server] -- handleNameChangeAttempts`);
    //添加nameAttempt事件的监听器
    socket.on('nameAttempt', function (name) {
        //昵称不能以Guest开头
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Name cannot begin with "Guest".'
            });
        } else {
            //如果昵称未被占用则注册新昵称
            if (namesUsed.indexOf(name) == -1) {
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                //删除旧的昵称
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name,
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now known as ' + name + '.'
                });
            } else {
                //如果昵称已被占用，则发送错误信息给客户端
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use.'
                });
            }
        }
    });
}

//发送聊天消息
function handleMessageBroadcasting(socket) {
    console.log(`[chat_server] -- handleMessageBroadcasting`);
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

//创建房间
function handleRoomJoining(socket) {
    console.log(`[chat_server] -- handleRoomJoining`);
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

//用户断开连接
function handleClientDisconnection(socket) {
    console.log(`[chat_server] -- handleClientDisconnection`);
    socket.on('disconnection', function () {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}





