const express=require('express')

const app=express()

app.use(express.json())

let user = [{
    name : "Rohit",
    kidney : [{
        healthy : false,
    }]
}]
let Healthy_count=0

let state=0

let Unhealthy_count=0;

app.get("/",(req,res) => {
    const status=user[0].kidney
    const Total_number_of_kidneys=status.length;

    Healthy_count=0;
    Unhealthy_count=0;

    for(let i=0;i<status.length;i++){
        if(status[i].healthy) Healthy_count++;

    Unhealthy_count=Total_number_of_kidneys - Healthy_count;
    }

    res.json({
        Total_number_of_kidneys,
        Healthy_count,
        Unhealthy_count,
    })

})

app.post("/",(req,res) => {
    const status=req.body.isHealthy

    user[0].kidney.push({
        healthy : status
    })

    res.json({
        msg : "Addition done successfully"
    })
})

function checkforfalse(len){
    for(let i=0;i<len;i++){
        if(!user[0].kidney[i].healthy) return false
    }
    return true
}

app.put("/",(req,res) => {

    if(user[0].kidney.length==0){
        res.status(400).json({
            msg : "No Kidney to Heal. Add a Kidney First"
        })
        return
    }

    if(checkforfalse(user[0].kidney.length)){
        res.status(400).json({
            msg : "All Kidneys are already Healed..."
        })
        return
    }
    
    const status=user[0].kidney

    for(let i=0;i<status.length;i++){
        if(!status[i].healthy) status[i].healthy=true;
    }
    res.json({
        msg : "All Kidneys are Healed"
    })
})

app.delete("/",(req,res) => {
    if(user[0].kidney.length==0){
        res.json({
            msg : "Add Kidney!!!!  Patient is about to die"
        })
        return
    }
    else if(checkforfalse(user[0].kidney.length)){
        res.json({
            msg : "Add Kidney are in Healthy and Well-Being"
        })
        return
    }
    const arr =[]

    for(let i=0;i<user[0].kidney.length;i++){
        if(user[0].kidney[i].healthy) arr.push(user[0].kidney[i].healthy)
    }
    user[0].kidney = arr
    res.json({
        msg : "Defected Kidneys has been removed.."
    })
})

setTimeout(() => console.log("Setting up the server..."),1000);

setTimeout(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}, 4000);
