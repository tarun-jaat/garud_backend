const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../model/Notification.model');
const User = require('../model/User.model');
const authMiddleware = require('../Middleware/Auth.middleWare');

const router = express.Router();

// Send notification to a particular user
router.post('/send-notification/:userId', authMiddleware.isAdmin, async (req, res) => {
  const userId = req.params.userId;
  const title = req.body.title;
  const message = req.body.message;

  try { 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notification = new Notification({ title, message, userId, isAdmin: true });
    await notification.save();

    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Send notification to all users
router.post('/send-notification/all', authMiddleware.isAdmin, async (req, res) => {
  const title = req.body.title;
  const message = req.body.message;

  try {
    const notifications = await Notification.insertMany(
      await Promise.all(
        (await User.find()).map((user) => ({
          title,
          message,
          userId: user._id,
          isAdmin: true
        }))
      )
    );

    res.json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

// Generate a notification when a new user is created
mongoose.model('user').watch().on('change', (change) => {
  if (change.operationType === 'insert') {
    const user = change.fullDocument;
    const notification = new Notification({
      title: 'Welcome to our platform!',
      message: `Hi ${user.name}, thanks for joining us!`,
      userId: user._id,
    });
    notification.save();
  }
});

module.exports = router;