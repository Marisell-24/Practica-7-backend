console.log("Hola Mundo con Node JS")

const express = require('express' )
const app = express()
const port = 3000

// ---------------Endpoint----------------------
// con get le indicamos que nuestra API acepta
// el method GET.
// El primer parametro establece el path (ruta) del
// codigo que queremos ejecutar
// el segundo parametro establece el codigo a ejecutar
// en forma de callback
// - el callback recibe 2 parametros:
// - req: request o la peticion
// - res: responde o la respuesta
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

// Le indicamos a nuestra API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API est escuchando en el puerto ${port}`)
})