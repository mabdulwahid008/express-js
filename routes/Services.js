const express = require('express')
const router = express.Router()
const db = require('../db')

//Router 1 : Get Service Data
router.get('/', async(req, res)=>{
    try {
        const data = await db.query('Select * from ServiceData')
        res.send(data.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//Router 2 : Get Services with Categories
router.get('/category', async(req, res)=>{
    try {
        const data = await db.query('Select * from ServiceData where c_name = $1',[req.body.c_name])
        res.send(data.rows);
    } catch (error) {
        console.log(error.message);
    }
})


//Router 3 : Get Services with Price
router.get('/price', async(req, res)=>{
    try {
        const data = await db.query('Select * from ServiceData where spriceperhour < $1',[req.body.price])
        res.send(data.rows);
    } catch (error) {
        console.log(error.message);
    }
})


//Router 4 : Add Sercice
router.post('/:id', async(req, res)=>{
    const { sdesc, spriceperhour, c_name} = req.body;
    const s_id = Math.floor(Math.random() * 99999);
    try {
        const catagorydata = await db.query('SELECT * from Categories where c_name = $1',[c_name]);
        let c_id = catagorydata.rows.map(a => a.c_id);
        c_id = parseInt(c_id);

        const data = await db.query('insert into services values($1, $2, $3, $4, $5)',
        [s_id, sdesc, spriceperhour, req.params.id, c_id]
        )
        res.send("Inserted");
    } catch (error) {
        console.log(error.message);
    }
})



module.exports = router