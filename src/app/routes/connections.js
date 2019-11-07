const express = require('express');
const router = express.Router();

const Operator = require('../models/operator/operatorConections');


    router.put( '/add/:jobId', ( req,resp,next )=>{ Operator.createConnection( req.body._id , req.params.jobId , resp,next )} )

    router.delete( '/remove/:jobId', ( req,resp,next )=>{ Operator.removeConnection( req,resp,next )} )

    router.put( '/attatchjob/:jobId', ( req,resp,next )=>{ Operator.responseAddJobInCandidate( req.body._id , req.params.jobId , resp,next )} )

    router.put( '/attatchcandidates/:jobId', ( req,resp,next )=>{ Operator.responseAttatchCandidatesToAJob( req.body , req.params.jobId ,next )} )

    router.put( '/unattatchcandidates/:jobId', ( req,resp,next )=>{ Operator.responseRemoveCandidatesFromAJob( req.body , req.params.jobId ,next )} )
    
module.exports = router;
