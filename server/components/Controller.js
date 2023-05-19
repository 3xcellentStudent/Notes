const connection = require('./database')

class Controller{

   getNotes(req, res){
      connection.query('SELECT * FROM notes;', (err, result) => {
         if(err) console.log(err)
         else {
            res.json(result)
            res.end()
         }
      })
   }

   getNoteOfID(req, res){
      connection.query(`SELECT * FROM notes WHERE id = ${req.body.id};`, (err, result) => {
         if(err) console.log(err)
         else {
            res.json(result)
            res.end()
         }
      })
   }

   createNote(req, res){
      const {title, descr} = req.body
      connection.query(`INSERT INTO notes(title, descr) VALUES('${title}', '${JSON.stringify(descr)}');`, (err, result) => {
         if(err) console.log(err)
         else {
            res.json(result)
            res.end()
         }
      })
   }

   updateNote(req, res){
      const {id, title, descr} = req.body
      connection.query(`UPDATE notes SET title='${title}', descr='${JSON.stringify(descr)}' WHERE id=${id};`, (err, result) => {
         if(err) console.log(err)
         else {
            res.json(result)
            res.end()
         }
      })
   }

   remove(req, res){
      connection.query(`DELETE FROM notes WHERE id=${req.body.id};`, (err, result) => {
         if(err) console.log(err)
         else {
            res.json(result)
            res.end()
         }
      })
   }
}

module.exports = new Controller()