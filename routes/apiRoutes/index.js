const express = require('express');
const router = express.Router();
router.use(require('./employeeRoutes'));
router.use(require('./departmentRoutes'));
// router.use(require('./voterRoutes'));
// router.use(require('./voteRoutes'));

module.exports = router;