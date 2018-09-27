function Queue() {
	this.dataStore = [];
}

Queue.prototype = {
	constructor : Queue,
	enqueue : function (element) {
		this.dataStore.push(element);
	},
	dequeue : function () {
		return this.dataStore.shift();
	},
	front : function () {
		return this.dataStore[0];
	} ,
	back : function () {
		return this.dataStore[this.dataStore.length-1];
	},
	toString : function () {
		var retStr = "";
		for (var i = 0; i < this.dataStore.length; ++i) {
			retStr += this.dataStore[i] + "\n";
		} 
		return retStr;
	},
	empty : function () {
		if (this.dataStore.length == 0) {
			return true;
		} else {
			return false;
		}
	}

}





var queue = new Queue();
queue.enqueue("Meredith");
queue.enqueue("Cynthia");
queue.enqueue("Jennifer");
console.log(queue.toString());
queue.dequeue();
console.log(queue.toString());
console.log("Front of queue: " + queue.front());
console.log("Back of queue: " + queue.back());