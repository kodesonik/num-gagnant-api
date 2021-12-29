
const express = require('express')
const app = express()
const cors = require("cors")

const getRandomNumberBetween = require('./random')

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors())

app.get('/', (req, res)=> {
  res.send('Hello World')
}) 

app.post('/generate', (req, res)=> {
    const date = new Date()
    const today = date.getFullYear()+'/'+(date.getMonth() + 1) + '/' + date.getDate()

    admin.firestore().collection('numeros').where('date', '==', today).get().then(
        res => {
            if (res.docs.length === 0) {
                //  generate num
                const result = getRandomNumberBetween(0, 90, 10)
                console.log(result)
                // save num
            
                const doc = date.getTime()
                admin.firestore().collection('numeros').doc(doc.toString()).set({ result, date: today })
                res.send(result)
            } else {
                console.log('already exist!')
            }
        }
    )

    
}) 

const port = process.env.PORT || 80

app.listen(port,()=>{
 console.log("starting...")
})
