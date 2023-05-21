const mysql = require('mysql2')

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '28102000andrE',
   database: 'todoapp',
})

connection.connect(err => {
   if (err) {
      console.log('Connect Error: ', err)
      return
   }
   console.log('Database connected...')
})

module.exports = connection