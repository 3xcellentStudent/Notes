class XHR{

   getNotes(){return this.GET('get-notes')}

   getNoteOfID(id){return this.POST('get-note-id', {id})}

   createNote(title, descr){
      const object = {title, descr}
      return this.POST('create-note', object)
   }

   updateNote(object){return this.POST('update-note', object)}

   remove(object){return this.POST('remove', object)}

   GET(url){
      return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest()
         xhr.open('GET', `http://localhost:5500/api/${url}`, true)
         xhr.onload = () => resolve(xhr.response)
         xhr.send()
      })
   }

   POST(url, object){
      return new Promise((resolve, reject) => {
         const result = JSON.stringify(object)
         const xhr = new XMLHttpRequest()
         xhr.open('POST', `http://localhost:5500/api/${url}`, true)
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
         xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
         xhr.setRequestHeader("Access-Control-Allow-Credentials", "true")
         xhr.setRequestHeader("Access-Control-Max-Age", "1800")
         xhr.setRequestHeader("Access-Control-Allow-Headers", "content-type")
         xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
         xhr.onload = () => resolve(xhr.response)
         xhr.send(result)
      })
   }
}

export default new XHR()