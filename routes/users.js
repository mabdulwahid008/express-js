const express = require('express');
const router = express.Router();
const db = require('../db')


//Route 1: Get All Users 
router.get('/', async(req, res)=>{
    try {
        const data = await db.query('SELECT * from USERS')
        res.json(data.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//Router 2 : Add New User
router.post('/', async(req, res)=>{
    const user = {
        id : req.body.id,
        fullname : req.body.fullname,
        username : req.body.username,
        pass : req.body.password,
        address : req.body.address,
        phone : req.body.phone,
        email : req.body.email
    }
    try {
        const pool = await db.query(`insert into Users values($1, $2, $3, $4, $5, $6, $7)`,
        [user.id, user.fullname, user.username, user.pass, user.address, user.phone, user.email]
        );
        res.send("Inserted")
    } catch (error) {
        console.log(error.message);
    }
})

// Router 3 : Update User 
router.put('/', async(req, res)=>{
    const { username, newpass } = req.body
    try {
        const pool = await db.query('Update Users set pass = $1 where username = $2',
        [newpass, username]
        );
        res.send("Updated")
    } catch (error) {
        console.log(error.message);
    }
})

// Router 4 : Login 
router.get('/login', async (req, res)=>{
    const {username, pass} = req.body;
    try {
        const pool = await db.query(`Select username, pass from users where username = $1 and pass = $2`,
        [username, pass]
        )
        res.send(pool.rows)  
    } catch (error) {
        console.log(error.message);
    }
})



module.exports = router;
