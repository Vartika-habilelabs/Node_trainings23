
const express=require('express');
const { getAll, create, highSalary, update } = require('../Controller/employeeController');
const router=express.Router();

router.get('/',getAll);
router.post('/createEmployee',create)
router.get("/high-salary-employees/:val", highSalary);
router.put('/updateEmployee/:id',update)

module.exports=router