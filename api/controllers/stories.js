import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getStories = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = userId
      ? `
      SELECT s.*, u.name
      FROM stories AS s
      JOIN users AS u ON u.id = s.userId
      LEFT JOIN relationships AS r 
        ON s.userId = r.followedUserId AND r.followerUserId = ?
      WHERE (r.followerUserId IS NOT NULL OR s.userId = ?)
      AND (s.createdAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR))
      ORDER BY s.createdAt DESC
      LIMIT 4
    `
      : `
      SELECT s.*, u.name
      FROM stories AS s
      JOIN users AS u ON u.id = s.userId
      LEFT JOIN relationships AS r 
        ON s.userId = r.followedUserId AND r.followerUserId = ?
      WHERE (r.followerUserId IS NOT NULL OR s.userId = ?)
      AND (s.createdAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR))
      ORDER BY s.createdAt DESC
      LIMIT 4
    `;

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) {
        console.error("SQL error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log("User Info:", userInfo);

    const q = "INSERT INTO stories(`img`, `userId`) VALUES (?, ?)";
    const values = [
      req.body.img,
      userInfo.id,
    ];

    console.log("Insert values:", values);

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("Story added successfully:", data);
      return res.status(200).json("Story has been created.");
    });
  });
};

export const deleteStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your story!");
    });
  });
};
