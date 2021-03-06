
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
  res.send('Your api is working...')
}) 

app.post('/generate', (req, res)=> {
    const date = new Date()
    if (date.getDay()) {
        const today = date.getFullYear()+'/'+(date.getMonth() + 1) + '/' + date.getDate()

        admin.firestore().collection('numeros').where('date', '==', today).get().then(
            ref => {
                if (ref.docs.length === 0) {
                    //  generate num
                    const result = getRandomNumberBetween(1, 90, 10)
                    console.log(result)
                    // save num
                
                    const doc = date.getTime()
                    const createdAt = admin.firestore.FieldValue.serverTimestamp()
                    admin.firestore().collection('numeros').doc(doc.toString()).set({ result, date: today, createdAt })
                    res.send({ message: 'make with success!!!'})
                } else {
                   res.send({ message: 'already exist!'})
                }
            }
        )

    } else {
        res.send('Today is sunday!')
    }
    
}) 

const port = process.env.PORT || 3000

app.listen(port,()=>{
 console.log("starting...")
})
