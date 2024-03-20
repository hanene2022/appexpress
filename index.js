const express= require('express')
const app= express();
const port =4000;
// importer bodyparser pour lire les données envoyés par le client
const bodyParser=require('body-parser')
 let users=[];
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("welcome to express js")
})
app.get('/hello/:name',(req,res)=>{
    
    res.send(`hello ${req.params.name}`)
})
app.get('/product/:id?',(req,res)=>{
    const id=req.params.id;
    if(id){res.send(`product  is ${id}`)}
    else{res.send("list of product")}
})
app.get('/product/:name',(req,res)=>{
    const name=req.params.name;
    if(name){res.send(`product  is ${name}`)}
    else{res.send("list of product")}
})
app.get('/users',(req,res)=>{
    res.json(users)
})
app.post('/users',(req,res)=>{
    
    const {id,nom,prenom}=req.body
    const newUser={
        id:users.length+1,
        nom,
         prenom
    }
    users.push(newUser)
    res.status(201).json(newUser)
})
app.put('/users/:id',(req,res)=>{
    const id= req.params.id;
     const newUser = req.body; 
    console.log(`le nom de l'utilisateur à modifier:${newUser}`);
const index = users.find(user=>user.id == id);
if(index === -1){
    return res.status(404).json({message:"User not found"});

}
users[index]=newUser;
res.json(users);
})
app.delete('/users/:id',(req,res)=>{
    const id =req.params.id;
      users=users.filter((user)=>user.id != id);
    res.status(204).json();
})


app.listen(port, ()=>{console.log(`server is running on port ${port}`)})