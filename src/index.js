const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

app.set('port', process.env.PORT || 4000)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Vista principal")
})
app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'benjamin',
        password: '12345'
    }
    const token = jwt.sign( {user}, 'keysecret' )
    res.json({
        token, 
        user
    })
})
function verificarToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if( token ){
        jwt.verify(token,'keysecret', (err, data) => {
            if(err){
                return res.status(500).json({message: err})
            }
            res.status(200).json({
                token, 
                data
            });
            next()
        } );
    }
}
app.post('/user', verificarToken, (req, res) => {
    res.status(200)
})

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})

/*
	Header
	- Authorization
	
	Value
	- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJlbmphbWluIiwicGFzc3dvcmQiOiIxMjM0NSJ9LCJpYXQiOjE2NTkyMzIzMjJ9.aeLHyk68NqSKsrHOcIlbKt9sfdSnhS0PNYdHvHVfKsU
*/


