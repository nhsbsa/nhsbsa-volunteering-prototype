// External dependencies
const express = require('express');

const router = express.Router();

const radioButtonRedirect = require('radio-button-redirect');
router.use(radioButtonRedirect)

let roleTypes = [
    {
      text: "Patient participation and experience",
      value: "meeting-greeting"
    },
    {
      text: "Patient facing support and companionship",
      value: "patient-facing"
    },
    {
      text: "Leisure activities",
      value: "recreational-activities"
    },
    {
      text: "Volunteer admin support",
      value: "admin-volunteering-support"
    },
    {
      text: "Opportunties for young volunteers (16-18)",
      value: "16-18-roles"
    },
    {
      text: "Remote opportunities",
      value: "remote-opportunities"
    },
    {
      text: "Community support",
      value: "community-support"
    },
    {
      text: "Charity and fundraising",
      value: "charity-and-fundraising"
    }
  ]

// Add your routes here - above the module.exports line
router.get('/sprint-:sprintId/volunteer/results-page-postcode', (req, res) => {
  let basePath = "sprint-"+req.params['sprintId']+"/volunteer/"

  let localRoles = roleTypes

  localRoles.forEach((role) => {
    role.checked = null
  })

  let data = { role_types: localRoles }

  res.render(basePath+'results-page-postcode.html', data)
})

router.get('/sprint-:sprintId/volunteer/results-page-remote-2', (req, res) => {
  let basePath = "sprint-"+req.params['sprintId']+"/volunteer/"

  let localRoles = roleTypes

  localRoles.forEach((role) => {
    if (role.value == "remote-opportunities") {
      role.checked = "checked"
    } else {
      role.checked = null
    }
  })

  let data = { role_types: localRoles }

  res.render(basePath+'results-page-remote-2.html', data)
})

router.get('/sprint-:sprintId/volunteer/patient-facing-results', (req, res) => {
  let basePath = "sprint-"+req.params['sprintId']+"/volunteer/"

  let localRoles = roleTypes

  localRoles.forEach((role) => {
    if (role.value == "patient-facing") {
      role.checked = "checked"
    } else {
      role.checked = null
    }
  })

  let data = { role_types: localRoles }

  res.render(basePath+'patient-facing-results.html', data)
})

router.post('/sprint-:sprintId/volunteer/update-search', (req, res) => {
    let basePath = "/sprint-"+req.params['sprintId']+"/volunteer/"

    if (req.session.data.roles == undefined) {
      req.session.data.roles = []
      res.redirect(basePath + 'results-page-postcode')
    }

    if (req.session.data.roles.includes("remote-opportunities")) {
      req.session.data.roles = []
      res.redirect(basePath + 'results-page-remote-2')
    } else if (req.session.data.roles.includes("patient-facing")) {
      req.session.data.roles = []
      res.redirect(basePath + 'patient-facing-results')
    } else {
      req.session.data.roles  = []
      res.redirect(basePath + 'results-page-postcode')
    }
})

module.exports = router;
