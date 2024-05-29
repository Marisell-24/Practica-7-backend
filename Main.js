console.log("Hola Mundo con Node JS")
//forma antigua de llamar librerias
//const express = require('express' )

//forma actual con ECMAscript 6 de llamar librerias
import bodyParser from "body-parser"
import express, { query } from "express"
import client from "./db.js"


const app = express()
const port = 3000

app.use(bodyParser.json())

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
app.get('/api/v1/usuarios', async(req, res) => {

    await client.connect()

    const db = client.db ("sample_mflix")
   const user = db.collection("users")
   const listaUsuarios = await user.find({}).toArray()
   console.log(listaUsuarios)
    
    console.log(req.query)

    const respuesta = {
        mensaje: "Lista de usuarios"
    }

    res.json(respuesta)
})
app.get('/api/v1/usuarios/:cedula', (req, res) =>{

    console.log(req.params)
    const cedula = req.params.cedula

    res.json({
        mensaje: `usuario obtenido con la cedula:${cedula}`
    })
})

// post: crear datos
app.post('/api/v1/usuarios', (req, res) =>{

    console.log(req.body)

    res.json({
        mensaje: 'usuario guardado'
    })
        
})
app.get('/apiv1/usuarios/cedula/:', (req,res) =>{

})


// put: actualizar todos los
// datos de un elemento
app.put('/api/v1/usuarios/:cedula', (req, res) =>{

    const cedula = req.params.cedula

    res.json({
        
        mensaje: `usuario con cedula ${cedula} actualizado` 
    })
        
})

// patch: actualiza algunos campos
// de nuestro elemento
app.patch('/api/v1/usuarios/:cedula', (req, res) =>{

    const cedula = req.params.cedula

    res.json({
        mensaje: `edad del usuario con cedula ${cedula} actualizada`
    })
        
})
// delete: eliminar un elemento
app.delete('/api/v1/usuarios/:cedula', (req, res) =>{

    const cedula =req.params.cedula
    res.json({
        mensaje: `usuario con cedula ${cedula}  eliminado`
    })
        
})




// Le indicamos a nuestra API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API est escuchando en el puerto ${port}`)
})