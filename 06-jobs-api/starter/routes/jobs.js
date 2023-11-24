const express= require('express')
const router= express.Router()

const{getAllJobs,getJobs,createJobs,updateJobs,deleteJobs}= require('../controllers/jobs')

router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').get(getJobs).delete(deleteJobs).patch(updateJobs)

module.exports = router