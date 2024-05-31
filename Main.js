console.log("Hola Mundo con Node JS")
//forma antigua de llamar librerias
//const express = require('express' )

//forma actual con ECMAscript 6 de llamar librerias
import bodyParser from "body-parser"
import express, { query } from "express"
import client from "./db.js"
import { ObjectId } from 'mongodb'

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

    // 1. conectarnos a la base de dato
    await client.connect()

    // 2. seleccionar  la db que vamos a utilzar
    const db = client.db ("sample_mflix")

    // 3. se4leccionar la coleccion
   const user = db.collection("users")

   // 4. hacer la consulta  =>query
   const listaUsuarios = await user.find({}).toArray()

   console.log(listaUsuarios)

   // 5. cerrar la coleccion a la db
    await client.close()
    
    console.log(req.query)

    const respuesta = {
        mensaje: "Lista de usuarios"
    }

    res.json(respuesta)
})

// obtener un usuario
app.get('/api/v1/usuarios/:id', async (req, res) =>{

    console.log(req.params)
    let id = req.params.id

      // 1. conectarnos a la base de dato
      await client.connect()

      // 2. seleccionar  la db que vamos a utilzar
      const db = client.db ("sample_mflix")
  
      // 3. seleccionar la coleccion
     const usercollection = db.collection("users")

    id = new ObjectId(id)
    // 4. consulta
    const user = await usercollection.findOne({
        _id: id
     })
     await client.close()
    res.json({
        mensaje: `usuario obtenido con el id: ${id}`
    })
})

// post: crear datos
app.post('/api/v1/usuarios', async (req, res) =>{

    console.log(req.body)
    const userData = req.body
// 1. conectarnos a la base de dato
    await client.connect()

// 2. seleccionar  la db que vamos a utilzar
const db = client.db ("sample_mflix")

// 3. se4leccionar la coleccion
const user = db.collection("users")

// 4. alacenar un usuario
    await user.insertOne({
    nombre: userData.nombre,
    apellido: userData.apellido,
    email: userData.email,
    edad: userData.edad,
    //ubicacion : userData.ubicacion
    ubicacion: {
        latitud: 14562,
        longitud: 25468
    }
})

// 5. cerrar coneccion
    await client.close()


    res.json({
        mensaje: 'usuario guardado'
    })
        
})


// put: actualizar todos los
// datos de un elemento
app.put('/api/v1/usuarios/:id', async (req, res) =>{

    let id = req.params.id
    const userData = req.body

        // 1. conectarnos a la base de dato
        await client.connect()

        // 2. seleccionar  la db que vamos a utilzar
        const db = client.db ("sample_mflix")

        // 3. se4leccionar la coleccion
        const usercollection = db.collection("users")

        id = new ObjectId(id)

        // 4. realizar consulta a la db
        await usercollection.updateOne(
            { _id: id},
            {
                $set: {
                    name: userData.name
                }
            }
        )

        // cerrar la conexion
        await client.close()

    res.json({
        
        mensaje: `usuario con id ${id} actualizado` 
    })
        
})

// patch: actualiza algunos campos
// de nuestro elemento
app.patch('/api/v1/usuarios/:cedula', async (req, res) =>{

    const cedula = req.params.cedula

    
    res.json({
        mensaje: `edad del usuario con cedula ${cedula} actualizada`
    })

})
// delete: eliminar un elemento
app.delete('/api/v1/usuarios/:id', async(req, res) =>{

const id = req.params.id

    // 1. conectarnos a la base de dato
    await client.connect()

    // 2. seleccionar  la db que vamos a utilzar
    const db = client.db ("sample_mflix")

    // 3. seleccionar la coleccion
   const usercollection = db.collection("users")
   id = new ObjectId
   // 4. realizar consulta
   await usercollection.deleteOne({
    _id: id
   })
   // 5. cerrar conecexion
   await client. close()


    const cedulid =req.params._id
    res.json({
        mensaje: `usuario con cedula ${id}  eliminado`
    })
        
})




// Le indicamos a nuestra API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API est escuchando en el puerto ${port}`)
})