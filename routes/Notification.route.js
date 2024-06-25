const express = require("express");
const router = express.Router();
const notificationController = require("../Controllers/Notification.controller");

router
  .route("/notification")
  .post(notificationController.getAllNotifications)
  .delete(notificationController.deleteNotification)
  .patch(notificationController.markOneNotificationasread);

router
  .route("/allnotifications")
  .delete(notificationController.deleteAllNotifications)
  .patch(notificationController.markAllNotificationsAsRead);

module.exports = router;
