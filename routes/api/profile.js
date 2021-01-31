const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../schemas/Profile')
const User = require('../../schemas/Users')

// Getting User Profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user',
    ['name'])

    if (!profile) {
      return res.status(400).json({ msg: 'Profile Not Found' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Updating/Creating Profile
router.post('/', 
    [
      auth, 
    [ 
      check('positive', 'Health Status is required').not().isEmpty() 
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    const { positive, listedStates } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (positive) profileFields.positive = positive
    if (listedStates) profileFields.listedStates = listedStates
    
    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }

      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)

    } catch {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// Get User Profile by ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate('user', 
      [
        'name'
      ])

      if(!profile) return res.status(400).json({ msg: 'Profile Not Found'})

      res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile Not Found'})
    }
    res.status(500).send('Server Error')
  }
})

// Delete Profile
router.delete('/', auth, async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: "User Deleted"})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// Update States List
router.put('/listedstates', auth, async (req, res) => {
  const {
    specificState,
    deaths,
    positives,
    specificDate
  } = req.body

  const newState = {
    specificState,
    deaths,
    positives,
    specificDate
  } 
  console.log(req.body, newState)
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    profile.listedStates.unshift(newState)
    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Delete State from List
router.delete('/listedstates/:state_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    const removeIndex = profile.listedStates.map(item => item.id).indexOf(req.params.state_id)

      profile.listedStates.splice(removeIndex, 1)

      await profile.save()

      res.json(profile)
  } catch (error) {
    res.status(500).send('Server Error')
  }
})

module.exports = router