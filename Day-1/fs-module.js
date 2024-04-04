const { error } = require("console");
const fs = require("fs");


fs.writeFile('Welcome.txt',"Welcome to My New Updated File.",(error)=>{
    if(error){
        console.log(error);
    }else {
        console.log("File successfully written");
    }
    
});


fs.readFile("Welcome.txt","utf8", (error, data) => {
    if (error) throw error;
console.log(data);
});