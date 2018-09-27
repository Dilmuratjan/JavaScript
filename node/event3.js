var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('listener1');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('listener2');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.addListener('connection', listener2);
//count
var Counter = events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(Counter + "total");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 done");

// 触发连接事件
eventEmitter.emit('connection');
//count
Counter = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(Counter + "total");

console.log("Finished");
console.log("printed error1")
emitter.emit('error'); 
console.log("printed error2");