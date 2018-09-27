/*	listSize	列表的元素个数
**	pos			列表的当前位置
**	length		返回列表中元素的个数
**	clear		清空列表中的所有元素
**	toString	返回列表的字符串形式
**	getElement	返回当前位置的元素
**	insert		在现有元素后插入新元素
**	append		在列表的末尾添加新元素
**	remove		从列表中删除元素
**	front		将列表的当前位置设移动到第一个元素
**	end			将列表的当前位置移动到最后一个元素
**	prev		将当前位置后移一位
**	next		将当前位置前移一位
**	currPos		返回列表的当前位置
**	moveTo		将当前位置移动到指定位置
*/

function List() {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];
}

List.prototype = {
	constructor : List,
	append : function (element) {
		this.dataStore[this.listSize++] = element;
	},
	find : function(element) {
		for (var i = 0; i < this.dataStore.length; ++i) {
			if (this.dataStore[i] == element) {
			return i;
			}
		} return -1;
	},
	remove : function (element) {
		var foundAt = this.find(element);
		if (foundAt > -1) {
			this.dataStore.splice(foundAt,1);
			--this.listSize;
			return true;
		} 
		return false;
	},
	length : function () {
		return this.listSize;
	},
	 toString : function() {
		return this.dataStore;
	},
	insert : function (element, after) {
		var insertPos = this.find(after);
		if (insertPos > -1) {
			this.dataStore.splice(insertPos+1, 0, element);
			++this.listSize;
			return true;
		} 
		return false;
	},
	clear : function () {
		delete this.dataStore;
		this.dataStore = [];
		this.listSize = this.pos = 0;
	},
	contains : function (element) {
		for (var i = 0; i < this.dataStore.length; ++i) {
			if (this.dataStore[i] == element) {
				return true;
			}
		} 
		return false;
	},
	front : function () {
		this.pos = 0;
	},
	end : function () {
		this.pos = this.listSize-1;
	},
	prev : function () {
		if (this.pos > 0) {
		--this.pos;
		}
	},
	next : function () {
		if (this.pos < this.listSize-1) {
		++this.pos;
		}
	},
	currPos : function () {
		return this.pos;
	},
	moveTo : function (position) {
		this.pos = position;
	},
	getElement : function () {
		return this.dataStore[this.pos];
	}
}

var names = new List();
names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");
// names.front();
// console.log(names.getElement());
// names.next();
// console.log(names.getElement()); 
// names.next();
// names.next();
// names.prev();
// console.log(names.getElement());
