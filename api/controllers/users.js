import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json("User not found");
        }

        const { password, ...info } = data[0];
        return res.json(info);
    });
};

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE users SET `name`=?,`city`=?,`direction`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

        const values = [
            req.body.name,
            req.body.city,
            req.body.direction,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        });
    });
};

export const getFriends = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    const userId = req.params.userId;
    const q = `
    SELECT u.id, u.name, u.profilePic
    FROM relationships r
    JOIN users u ON u.id = r.followedUserId
    WHERE r.followerUserId = ?
    AND r.followedUserId IN (
      SELECT followerUserId FROM relationships WHERE followedUserId = ?
    )`;

    db.query(q, [userId, userId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data);
    });
};

export const getFollowing = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  const userId = req.params.userId;

  const q = `
    SELECT u.id, u.name, u.profilePic
    FROM relationships r
    JOIN users u ON u.id = r.followedUserId
    WHERE r.followerUserId = ?
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const getFollowed = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  const userId = req.params.userId;

  const q = `
    SELECT u.id, u.name, u.profilePic
    FROM relationships r
    JOIN users u ON u.id = r.followerUserId
    WHERE r.followedUserId = ? 
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const getUsersList = (req, res) => {
  const q = "SELECT id, name, profilePic FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}

export const getSearchUsers = (req, res) => {
  const search = `%${req.query.search}%`;
  const q = "SELECT id, name, profilePic FROM users WHERE name LIKE ?";
  db.query(q, search, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}