function Stack() {
	this.dataStore = [];
	this.top = 0;
}

Stack.prototype = {
	constructor : Stack,
	push : function (element) {
		this.dataStore[this.top++] = element;
	},
	pop : function () {
		return this.dataStore[--this.top];
	},
	peek : function () {
		return this.dataStore[this.top-1];
	},
	length : function () {
		return this.top;
	},
	clear : function () {
		this.top = 0;
	}

}


var stack = new Stack();
stack.push("David");
stack.push("Raymond");
stack.push("Bryan");
console.log("length: " + stack.length());
console.log(stack.peek());
var popped = stack.pop();
console.log("The popped element is: " + popped);
console.log(stack.peek());
stack.push("Cynthia");
console.log(stack.peek());
stack.clear();
console.log("length: " + stack.length());
console.log(stack.peek());
stack.push("Clayton");
console.log(stack.peek());