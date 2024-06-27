const express = require('express'); 
const router = express.Router(); 


import fixtureController from './fixtureController';


router.get('/api-football/get-fixture/:id', fixtureController.getFixture);

export default router;
