const express = require("express");
const app = express();


app.use("/public", express.static(__dirname + "/public"));

//below: this is needed to allow the tests to go forward
//below: they really should include something to warn testing students about it
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/api/?",(req,res)=>{
  res.json({
    unix:new Date().getTime(),
    utc:new Date().toUTCString()
  })
})

app.get("/api/:date_string?",(req,res)=>{
  const {date_string} = req.params;	
  const date = new Date(date_string);
//below: checks if you have a valid date
  if(date.toString() === "Invalid Date"){
//if its an invalid you need to check whether you have milliseconds or a true invalid value
//below tests whether it is a straight  up number
//if its not milliseconds then it will respond with Invalid Date JSON
    const testIfMilli = /^\d+$/.test(date_string);
    if(testIfMilli){
      returnJSON(res, Number.parseInt(date_string, 10));
    }else{
      res.json({
        error:"Invalid Date"
      })
    }
  }else{
//if value is a date in date format then this would return the correct JSON
    returnJSON(res, date_string)
  }
})
function returnJSON(res,value,decider){
//This function will return the correct JSON return based on whether decider is a straight up number or not
  return res.json({
    unix:decider ? new Date(value).getTime() : new Date(value).getTime(),
    utc:decider ? new Date(value).toUTCString() : new Date(value).toUTCString()
  })
}

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/pages/timestamp-microservice.html");
})

app.listen(3000,()=>{
  console.log("Running");
})
