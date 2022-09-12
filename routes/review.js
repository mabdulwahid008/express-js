const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();
const db = require('../db')

//Router 1 : get Reviews
router.get('/:s_id', async(req,res)=>{
   
    try {
        const data = await db.query('Select fullname ,rtext from Reviews inner join Users on Reviews.u_id = Users.user_id where s_id = $1',[req.params.s_id])
        if(data.rows.length === 0)
            res.send("No Reviews Yet!!")
        else    
            res.send(data.rows)
    } catch (error) {
        console.log(error.message);
    }
}) 


//Router 2 : Add a Review
router.post('/:user_id/:service_id', async(req, res)=>{
    try {
        const worker = await db.query('Select worker_id from Users inner join Services on Services.s_id = Users.user_id where s_id = $1',[req.params.service_id])
        let worker_id = worker.rows.map(a => a.worker_id);
        worker_id = parseInt(worker_id);

        if(worker_id == req.params.user_id)
            res.send("You Can't Review Yourself")
        else    
        {
            const r_id = Math.floor(Math.random() * 99999);
            const data = await db.query('Insert into Reviews values($1, $2, $3, $4)',
            [r_id, req.params.user_id, req.params.service_id, req.body.rtext]
            )
            res.send("Review Added")
        }    
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router