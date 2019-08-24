const Dev = require("../models/Dev.js");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetDev = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit("match", targetDev);
      }
      if (targetDev) {
        req.io.to(targetDev).emit("match", loggedSocket);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
