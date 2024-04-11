function CapitalString(str){
    return str.charAt(0).toUpperCase()+  str.slice(1);
}

// console.log(CapitalString("ashwani"));


function ReverseString(str){
    return str.split('').reverse().join("");
}
console.log(ReverseString('ashwani'))
module.exports = { CapitalString, ReverseString };