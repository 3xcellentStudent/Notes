export function getNotes(){
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://localhost:5500/api/get-notes', true)
      xhr.onload = () => resolve(xhr.response)
      xhr.send()
   })
}

export function createNote(title, data){
   return new Promise((resolve, reject) => {
      const result = JSON.stringify({title, data})
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'http://localhost:5500/api/create-note', true)
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