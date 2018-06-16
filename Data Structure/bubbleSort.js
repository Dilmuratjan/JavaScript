function swap(arr, index1, index2) {
   var temp = arr[index1];
   arr[index1] = arr[index2];
   arr[index2] = temp;
}

function bubbleSort(data) {
   var len = data.length;
   var temp;
   for ( var j = len-1; j > 0; j--) {
      console.log(j,len);
      for ( var i = 0; i < j ; ++i ) {
         console.log("["+(i)+","+(i+1)+"]");
         if (data[i] > data[i + 1]) {
            swap(data, i, i + 1);
         }
         console.log(dataStore);
      }
   }
}

function selectionSort() {
   var min, temp;
   for (var outer = 0; outer < this.dataStore.length-1; ++outer) {
      min = outer;
      for (var inner = outer + 1;inner <= this.dataStore.length-1; ++iner) {
         if (this.dataStore[inner] < this.dataStore[min]) {
            min = inner;
         }
      swap(this.dataStore, outer, min);
      }
   }
}
var dataStore = [7,6,5,4,3,2,1]


bubbleSort(dataStore);