// External dependencies
const express = require('express');

const router = express.Router();
// Run this code when a form is submitted to 'reuse-data-answer'
router.post('/reuse-data-answer', function (req, res) {

    // Make a variable and give it the value from 'reuse-data'
    var reuseData = req.session.data['reuse-data']
  
    // Check whether the variable matches a condition
    if (reuseData == "yes"){
      // Send user to next page
      res.redirect('/sprint-2/sign-in')
    } else {
      // Send user to ineligible page
      res.redirect('/sprint-2/ineligible')
    }
  
  })
// Add your routes here - above the module.exports line

module.exports = router;
