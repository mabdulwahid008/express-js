const express = require('express')
const router = express.Router()
const db = require('../db')

//Router 1 : Book a Service
router.post('/:user_id/:service_id', async(req, res)=>{
    const b_id = Math.floor(Math.random() * 99999);
    const b_status = 'In_Process';
    try {
        const worker = await db.query('Select worker_id from Services where s_id = $1',
        [req.params.service_id]
        )
        let worker_id = worker.rows.map(a => a.worker_id);
        worker_id = parseInt(worker_id);

        if(worker_id == req.params.user_id)
            res.send("You can't book yourself")  
        else
        {
            const data = await db.query('Insert into Booking values($1, $2, $3, $4)',
            [b_id, worker_id, req.params.user_id, b_status]
            )
            res.send("You Booked a service Succefully")
        }    
    } catch (error) {
        console.log(error.message);
    }
})


//Router 2 : Update Booking Status
router.put('/', async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router
