const connection = require('./database')

class Controller{

   getNotes(req, res){
      connection.query('SELECT * FROM notes;', (err, result) => {
         if(err) console.log(err)
         else res.json({result})
      })
   }

   createNote(req, res){
      const {title, data} = req.body
      connection.query(`INSERT INTO notes(title, descr) VALUES('${title}', '${JSON.stringify(data)}');`, (err, result) => {
         if(err) console.log(err)
         else res.json(result)
      })
   }

   updateNote(req, res){
     
   }

   removeNote(req, res){
    
   }
}

module.exports = new Controller()