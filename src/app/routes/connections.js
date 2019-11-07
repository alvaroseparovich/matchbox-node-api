const express = require('express');
const router = express.Router();

const Operator = require('../models/operator/operatorConections');

    router.put( '/attatchcandidates/:jobId', ( req,resp,next )=>{ Operator.responseAttatchCandidatesToAJob( req.body , req.params.jobId ,next )} )

    router.put( '/unattatchcandidates/:jobId', ( req,resp,next )=>{ Operator.responseRemoveCandidatesFromAJob( req.body , req.params.jobId ,next )} )

    router.put( '/attatchjobs/:candidateId', ( req,resp,next )=>{ Operator.responseAttatchCandidatesToAJob( req.body , req.params.candidateId ,next )} )

    router.put( '/unattatchjobs/:candidateId', ( req,resp,next )=>{ Operator.responseRemoveCandidatesFromAJob( req.body , req.params.jobId ,next )} )


module.exports = router;
