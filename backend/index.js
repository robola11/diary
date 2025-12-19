// app.js
import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import { checkConnection } from './src/config/db.js';
import createAllTable from './src/utils/dbUtils.js';
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors'
import mysql from "mysql2";
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import dotenv from "dotenv";
import { Console, error } from 'console';


dotenv.config();


const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/users', userRoutes); // Use user routes for API calls
app.use('/api/auth', authRoutes); // Use user routes for API calls


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactmysql",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});

app.post("/user", async (req, res) => {
const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const sql = "INSERT INTO users (name,email, mobile, password) VALUES (?)";
  console.log(req.body);
  const val = [req.body.name, req.body.email, req.body.mobile, hashedPassword];
  db.query(sql, [val], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});


// read User
app.get("/readUser/:id",  (req, res) => {

  const page =parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  const countQuery =  "SELECT COUNT(*) as count FROM imagetest WHERE id = ?";
  const id = req.params.id;

  
  db.query(countQuery, [id], (err, countResult) =>{
    if(err) return res.status(500).json({message:"Database Error"});
    
    const totalRows =countResult[0].count;
    const totalPages=Math.ceil(totalRows / limit);

    const dataQuery = "SELECT * FROM imagetest WHERE id=? ORDER BY id DESC LIMIT ? OFFSET ?";

    db.query(dataQuery, [id, limit , offset], (err, data) =>{
      if(err) return res.status(500).json({message:"Database Error"});
      

      res.json({
      data,
      page,
      totalPages,
    });
    });
  });

});

// change user password
app.post("/change-password", async (req, res) => {
  const {password, newPassword} =req.body;
  if (password !== newPassword){
    return res.status(400).json({error:'Passwords do not match'});
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const sql = "UPDATE imagetest SET password =? WHERE id = ?";
  console.log(req.body);
 
  db.query(sql, [hashedPassword, req.body.userId], (err, result) => {
    if (err) return res.json(err);
  
    return res.json(result);
    });
   
  });



// Search and paginate user endpoint
app.get('/userfile', (req, res) => {
    const { search = '', page = 1, limit= 3} = req.query; // Get search term from query parameters
    const offset = (page - 1) * limit;

    const searchTerm = `%${search}%`;
  

    const countQuery = "SELECT COUNT(*) as total FROM users WHERE name LIKE ?";

    const dataQuery = "SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?"; // Example: search by 'name'
    const numQuery ="SELECT COUNT(*) as num FROM users";

     db.query(numQuery, (err, numResult) =>{
  if(err){
      return res.status(500).json({message:"Database Error"});
    }
    const numUsers =numResult[0].num;
   
    db.query(countQuery, [searchTerm], (err, countResult) => {
        if (err) return res.status(500).json({ message: 'database server error' });
        
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [searchTerm, parseInt(limit), parseInt(offset)],(err, results)=>{
          if(err) return res.status(500).json({message:"Database Error"});
      
        res.json({  
      data:results,
      totalItems,
      totalPages,
      currentPage:parseInt(page),
      numUsers
        });
        });
    });
       });
});



// Search and paginate user image endpoint
app.get('/userList', (req, res) => {
    const { search = '', page = 1, limit= 3} = req.query; // Get search term from query parameters
    const offset = (page - 1) * limit;

    const searchTerm = `%${search}%`;
    const searchTerm1 = `%${search}%`;
     const searchTerm2 = `%${search}%`;
  
    const countQuery = "SELECT COUNT(*) as total FROM imagetest WHERE name LIKE ?";

    const dataQuery = "SELECT * FROM imagetest WHERE scn LIKE ? OR name LIKE ? OR lastname LIKE ? LIMIT ? OFFSET ?"; // Example: search by 'name'
    const numQuery ="SELECT COUNT(*) as num FROM imagetest";

     db.query(numQuery, (err, numResult) =>{
  if(err){
      return res.status(500).json({message:"Database Error"});
    }
    const numUsers =numResult[0].num;
   
    db.query(countQuery, [searchTerm, searchTerm1, searchTerm2], (err, countResult) => {
        if (err) return res.status(500).json({ message: 'database server error' });
        
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [searchTerm, searchTerm1, searchTerm2, parseInt(limit), parseInt(offset)],(err, results)=>{
          if(err) return res.status(500).json({message:"Database Error"});
      
        res.json({  
      data:results,
      totalItems,
      totalPages,
      currentPage:parseInt(page),
      numUsers
        });
        });
    });
       });
});

//edit users im imagetest
app.put("/userList/:id", (req, res) => {
  const sql = "UPDATE imagetest SET scn=?, name=?, lastname =?, email =?, mobile=?, userType=? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.scn,req.body.name, req.body.lastname, req.body.email, req.body.mobile, req.body.userType, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});



//api to get picture by id
app.get("/userLists/:id", (req, res) => {
  const sql = "SELECT * FROM imagetest WHERE id =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result[0]);
  });
});






//cases

app.get("/readCase/:id",  (req, res) => {

  const page =parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const offset = (page - 1) * limit;

  const countQuery =  "SELECT COUNT(*) as count FROM endorsement WHERE caseid = ?";
  const id = req.params.id;

  
  db.query(countQuery, [id], (err, countResult) =>{
    if(err) return res.status(500).json({message:"Database Error"});
    
    const totalRows =countResult[0].count;
    const totalPages=Math.ceil(totalRows / limit);

    const dataQuery = "SELECT * FROM endorsement WHERE caseid=? ORDER BY id DESC LIMIT ? OFFSET ?";

    db.query(dataQuery, [id, limit , offset], (err, data) =>{
      if(err) return res.status(500).json({message:"Database Error"});
      

      res.json({
      data,
      page,
      totalPages,
    });
    });
  });

});


//edit case im imagetest
app.put("/caseEdit/:id", (req, res) => {
  const sql = "UPDATE cases SET suitnumber=?, parties=? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.suitnumber,req.body.parties, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
     const endSql = "UPDATE endorsement SET suitnumber=?, parties=? WHERE caseid=?";
     db.query(endSql, [req.body.suitnumber,req.body.parties, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
    
  });
});




// Search and paginate cases endpoint
app.get('/casefile', (req, res) => {
    const { search = '', page = 1, limit= 3} = req.query; // Get search term from query parameters
    const offset = (page - 1) * limit;

    const searchTerm = `%${search}%`;
    const searchTerm1 = `%${search}%`;
  

    const countQuery = "SELECT COUNT(*) as total FROM cases WHERE parties LIKE ?";

    const dataQuery = "SELECT * FROM cases WHERE suitnumber LIKE ? OR parties LIKE ? LIMIT ? OFFSET ?"; // Example: search by 'name'
    const numQuery ="SELECT COUNT(*) as num FROM cases";

     db.query(numQuery, (err, numResult) =>{
  if(err){
      return res.status(500).json({message:"Database Error"});
    }
    const numCases =numResult[0].num;
   
    db.query(countQuery, [searchTerm, searchTerm1], (err, countResult) => {
        if (err) return res.status(500).json({ message: 'database server error' });
        
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [searchTerm, searchTerm1, parseInt(limit), parseInt(offset)],(err, results)=>{
          if(err) return res.status(500).json({message:"Database Error"});
      
        res.json({  
      data:results,
      totalItems,
      totalPages,
      currentPage:parseInt(page),
      numCases
        });
        });
    });
       });
});




//add cases 
app.post("/createCase", (req, res) => {
  const sql = "INSERT INTO cases (suitnumber, parties, comments, date) VALUES (?)";
  console.log(req.body);
 
  const newDate = new Date().toLocaleDateString();
  const val = [req.body.suitnumber, req.body.parties, req.body.endorsement, newDate];
  
  db.query(sql, [val], (err, result) => {
    if (err) return res.json(err);
    const endSql = 'INSERT INTO endorsement (caseid, suitnumber, parties, comments, date) VALUES (?, ?, ?, ?, ?)';
    const caseId = result.insertId;
   
    db.query(endSql, [caseId,req.body.suitnumber, req.body.parties, req.body.endorsement, newDate], (err, endResult) => {
      if (err) return res.status(500).send(err,'Error saving to endorsement ');
    return res.json(endResult);
    });
   
  });
});


// read to edit case
app.get("/caseread/:id", (req, res) => {
  const sql = "SELECT * FROM endorsement WHERE caseid =?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});



app.put("/edit/:id", (req, res) => {
  const sql = "UPDATE users SET name=?, email =? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});

// edit case
app.put("/editCase/:id", (req, res) => {
  const sql = "UPDATE cases SET suitnumber=?, parties =? WHERE id=?";
  const id = req.params.id;
  db.query(sql, [req.body.suitnumber, req.body.parties, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    const endSql ="UPDATE endorsement SET suitnumber=?, parties =? WHERE caseid=?";
      db.query(endSql, [req.body.suitnumber, req.body.parties, id], (err, results) => {
         if (err) return res.status(500).send(err,'Error saving to endorsement ');
    return res.json(results);
      })
  });
});

// endorse case
app.post("/endorseCase/:id", (req, res) => {
  
    const endSql = 'INSERT INTO endorsement (caseid, suitnumber, parties, comments, date) VALUES (?, ?, ?, ?, ?)';
    const caseId = req.params.id;
    const currentDate = new Date();
    
    const newDate = currentDate.toString().slice(0,25).replace('T', ' ');
    db.query(endSql, [caseId,req.body.suitnumber, req.body.parties, req.body.endorsement, newDate], (err, endResult) => {
      if (err) return res.status(500).send(err, 'Error saving to endorsement ');
    return res.json(endResult);
    });
});

// endorse and case table update
app.put("/caseEndorse/:id", (req, res) => {
  
    const endSql = 'INSERT INTO endorsement (caseid, suitnumber, parties, comments, date) VALUES (?, ?, ?, ?, ?)';
    const caseId = req.params.id;
    const currentDate = new Date();
    
    const newDate = currentDate.toString().slice(0,25).replace('T', ' ');
    db.query(endSql, [caseId,req.body.suitnumber, req.body.parties, req.body.endorsement, newDate], (err, endResult) => {
      if (err){
        return res.status(500).send(err, 'Error saving to endorsement ');
      
      } 

      const caseSql ="UPDATE cases SET comments=?, date =? WHERE id=?";
     db.query(caseSql, [req.body.endorsement, newDate, caseId], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
    });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});

// user delete
app.delete("/userDelete/:id", (req, res) => {
  const sql = "DELETE FROM imagetest WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});

// delete case
app.delete("/deleteCase/:id", (req, res) => {
  const sql = "DELETE FROM cases WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
    return res.json(result);
  });
});

app.delete("/caseDelete/:id", (req, res) => {
   const sql = "DELETE FROM cases WHERE id=?";
  const id = req.params.id;  
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    const endSql = 'DELETE FROM endorsement WHERE caseid=?';
   
    db.query(endSql, [id], (err, endResult) => {
      if (err) return res.status(500).send(err,'Error Deleting from endorsement ');
    return res.json(endResult);
    });
   
  });
});

//image files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit:'10mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//create image directory

const dir = './public/images';
if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive:true});

}

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype.startsWith('image/')){
            cb(null, true);
        }else {
            cb(new Error('Only Image Allowed'), false);
        }
    },
    limits:{fileSize:5 * 1024 * 1024 }
 });




// route to upload image

app.post("/upload",upload.single('image'), async(req, res)=>{
  const {name} =req.body;
   const {lastname} =req.body;
  const {email} = req.body;
    const {mobile} =req.body;
  const {scn} = req.body;
  const {access} = req.body;
  const hashedPassword = await bcrypt.hash(lastname, 10);
    if(!req.file){
        return res.status(400).json({error:"No File Uploaded"});

    }
    const filePath = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
    const sql = "INSERT INTO imagetest (scn, name, lastname, email, mobile, imgname, password, userType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [scn,name, lastname, email, mobile, filePath, hashedPassword, access], (err, result) =>{
        if(err){
            console.error("Error Saving To DB", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json({message:'File Uploaded', filePath });
    });
});

//edit users and image im imagetest

  app.post("/userLists/:id",upload.single('image'), async(req, res)=>{

  const id = req.params.id;
  const imagePath = req.file ?  `/uploads/${req.file.filename}` : null;
  if (!imagePath) return res.status(400).json({error:'No Image uploaded'});

  db.query("SELECT image FROM imagetest WHERE id =?", [id], (err, result) =>{
      if(err) return res.status(500).json({error: err.message});
      const oldImagePath = result[0]?.image;

    })
      const sql = "UPDATE imagetest SET scn=?, name=?, lastname =?, imgname=?, email =?, mobile=?, userType=? WHERE id=?";
      db.query(sql, [req.body.scn,req.body.name, req.body.lastname, imagePath, req.body.email, req.body.mobile, req.body.userType, id], (err, result) => {
    if (err) return res.json({ message: "Server Side Error" });
       if(oldImagePath){
          const oldFilePath=path.join(__dirname, oldImagePath);
          fs.unlink(oldFilePath, (err) =>{
            if(err && err.code !=='ENOENT') {
              console.error('Error Deleting old image', err);
            }
          })
        }
    return res.json(result);
  });
});



app.listen(3000, async() => {
  console.log('Server running on port 3000');
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});

