import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

const rawData = fs.readFileSync("./data/hospitaldata.json");

//HOME ROUTE TO DISPLAY AVAILABLE ROUTES
app.get("/", (req, res) => {
  const routes = [
    { GET: "/all/hospital-data" },
    { POST: "/add/hospital-data" },
    { PUT: "/update/hospital-data" },
    { DELETE: "/delete/hospital-data" },
  ];

  res.json(routes);
});

//GET METHOD TO RETRIEVE ALL THE DATA FROM JSON
app.get("/all/hospital-data/:id", (req, res) => {
  const recordID = Number(req.params.id);
  const data = JSON.parse(rawData);

  const resultData = data.filter((each) => each.id === recordID);
  res.send(resultData);
});

//POST METHOD TO UPDATE INTO JSONDATA
app.post("/all/hospital-data/:id", (req, res) => {
  const postData = req.body;
  const currentData = JSON.parse(rawData);
  currentData.push(postData);

  const updatedData = JSON.stringify(currentData);
  fs.writeFileSync("./data/hospitaldata.json", updatedData);

  res.send("Data Updated Successfully");
});


//PUT METHOD TO UPDATE THE JSONDATA
app.put('/update/hospital-data',(req,res) => {
    const postData = req.body;
    const data = JSON.parse(rawData);
    const currentdata = data.find(each => each.id === Number(postData['id']));
    const updatedData = {...currentdata,...postData};
    const updatedArray = data.map(each => {
        if(each.id === Number(postData['id'])){
            return updatedData;
        }
        return each;
    })
    console.log(updatedArray);
    fs.writeFileSync('./data/hospitaldata.json',JSON.stringify(updatedArray));
    res.send("Updated Successfully");
})


//DELETE METHOD TO DELETE THE EXISTING DATA
app.delete('/delete/:id',(req,res) => {
    const recordID = req.params.id;
    const data = JSON.parse(rawData);
    const updatedArray = data.filter(each => each.id !== Number(recordID));
    fs.writeFileSync('./data/hospitaldata.json', JSON.stringify(updatedArray));
    res.send(`Record with ID ${recordID} deleted successfully`);
})

app.listen(PORT, () => {
  console.log(`app listetning at ${PORT}`);
});
