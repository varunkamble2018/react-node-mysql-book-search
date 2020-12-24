const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host:'googlebooks.cxduagznfkkr.us-west-2.rds.amazonaws.com',
    user:'admin',
    password:'memorang',
    database:'books'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/getUserBooks", (req,res) => {
    const  user_id=req.query.userId;
    
    const sqlSelect = "SELECT * FROM user_books WHERE user_id = ?";
    console.log(user_id);
    //console.log(sqlSelect);

    db.query(sqlSelect,[user_id], (err,result) => {
        
        console.log(result);
        if(err) {
            console.log('error ', err);
        } else {
            res.send(result)
        }
        
    } );

})

app.post("/api/addUserBook", (req,res) => {
      const  bookId =  req.body.bookId;
      const  thumbnail = req.body.thumbnail;
      const  title=req.body.title;
      const  pageCount=req.body.pageCount;
      const  language=req.body.language;
      const  description=req.body.description;
      const  authors=req.body.authors;
      const  publisher=req.body.publisher;
      const  previewLink=req.body.previewLink;
      const  infoLink=req.body.infoLink;
      const  user_id=req.body.userId;

    const sqlInsert = "INSERT INTO user_books (user_id, googleBookId,thumbnail,title,pageCount,language,authors,publisher,description,previewLink,infoLink ) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    
    db.query(sqlInsert, [user_id,bookId,thumbnail,title,pageCount,language,authors,publisher,description,previewLink,infoLink], (err,result) => {
        //res.send(err);
        console.log(result);
        if(err){
            console.log('error ', err);
        } else { 
            res.send(result)
        }
        //console.log(err);
    } );
    
} )

app.delete("/api/deleteUserBook", (req,res) => {
    const  bookId =  req.query.bookId;
    const  user_id= req.query.userId;

    const sqlDelete = "DELETE FROM user_books WHERE user_id = ? and googleBookId = ? ;";
    
    db.query(sqlDelete,[user_id,bookId], (err,result) => {
      
      if(err){
          console.log('error ', err);
      } else { 
          res.send(result)
      }
      //console.log(err);
  } );
  
} )

app.listen( 3003, () => {
    console.log('I am running');
} )
