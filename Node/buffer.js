// 写入缓冲区
// buf.write(string[, offset[, length]][, encoding])
// string - 写入缓冲区的字符串。
// offset - 缓冲区开始写入的索引值，默认为 0 。
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8' 。

// 根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 
// 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。

// 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

// 实例
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);

// 从缓冲区读取数据
// buf.toString([encoding[, start[, end]]])
// encoding - 使用的编码。默认为 'utf8' 。
// start - 指定开始读取的索引位置，默认为 0。
// end - 结束位置，默认为缓冲区的末尾。
// 返回值
// 解码缓冲区数据并使用指定的编码返回字符串。
// 实例
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
