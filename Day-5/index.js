import express from "express";

const app = express();

// .use() is a inbuilt middleware
app.use(express.json());  //request body parsed


app.get('/',(req,res) =>{
res.send("Working,It is activated");
});

app.post('/register',(req,res) => {

try{
    //console.log(req.body,"request body");
    const{name, email, password, confirmPassword} = req.body;
    //console.log(name,email, password, confirmPassword,"name")
if(!name || !email || !password || !confirmPassword){
    res.send("All fields are required.");

}
if (password !== confirmPassword){
    res.send("Password and confirm password not matched")
}

//store data in mongodb
    res.send("Registration Successfull");
 }  catch(error){
    res.send(error);
}
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});
