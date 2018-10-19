function get_random_int_inclusive(min, max) {
    [min, max] = [Math.ceil(min), Math.floor(max)];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertion_sort(list) {
    let key = 0
    for (let j = 1; j < list.length; j++) {
        key = list[j]
        i = j - 1
        while (i >= 0 && list[i] < key) {
            list[i + 1] = list[i]
            i--
        }
        list[i + 1] = key
    }
    return list
}

function test(n) {
    let list = []
    for (let i = 0; i < n; i++) {
        list.push(get_random_int_inclusive(1, 10))
    }
    console.log(insertion_sort(list))
}

test(5)