function insertion_sort(list) {
    let key = 0
    for (let j = 1; j < list.length; j++) {
        key = list[j]
        i = j - 1
        while( i >= 0 && list[i] > key) {
        list[i + 1] = list[i]
        i--
    }
    list[i + 1] = key
}
return list
}

console.log(insertion_sort([1,3,2,5,7,4,3,5,6,7,5,3,3]))