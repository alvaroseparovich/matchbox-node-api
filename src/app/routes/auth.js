const express = require('express');
const router = express.Router();
const Operator = require('../models/operator/operatorAuth');


router.post( '/', (req,resp,next)=>{ Operator.routeAuth(req,resp,next)} );

module.exports = router;