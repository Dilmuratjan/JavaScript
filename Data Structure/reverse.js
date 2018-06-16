const text="I am you're friend"


function reverse(str){
	let a = [];
	let b = [];
	for(let i = 0;i<str.length;i++){
		if(str[i]!==" "){
			a.push(str[i]);
		}
		if(str[i]==" "){
			reverse(a);
			b.unshift(a)
			a=[];
		}
	}
	b.unshift(a)
	return	b
}

console.log(reverse(text))