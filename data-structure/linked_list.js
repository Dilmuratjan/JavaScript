function Node(element) {
   this.element = element;
   this.next = null;
}

function LinkedList() {
   this.head = new Node("head");
}

LinkedList.prototype = {
   constructor : LinkedList,
   remove : function(item) {
      var prevNode = this.findPrevious(item);
      if (!(prevNode.next == null)) {
          prevNode.next = prevNode.next.next;
      }
   },
   findPrevious : function(item) {
      var currNode = this.head;
      while (!(currNode.next == null) && 
              (currNode.next.element != item)) {
         currNode = currNode.next;
      }
      return currNode;
   },
   display : function() {
      var currNode = this.head;
      while (!(currNode.next == null)) {
         console.log(currNode.next.element);
         currNode = currNode.next;
      }
   },
   find : function(item) {
      var currNode = this.head;
      while (currNode.element != item) {
         currNode = currNode.next;
      }
      return currNode;
   },
   insert : function(newElement, item) {
      var newNode = new Node(newElement);
      var current = this.find(item);
      newNode.next = current.next;
      current.next = newNode;
   },
   
}
var cities = new LinkedList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();
