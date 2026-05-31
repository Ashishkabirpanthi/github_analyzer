import { pool } from "../config/db.config.js";

export async function saveProfile(profile) {
  const query = `
    INSERT INTO github_profiles
    (username,name,followers,following,public_repos)
    VALUES (?,?,?,?,?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      followers = VALUES(followers),
      following = VALUES(following),
      public_repos = VALUES(public_repos)
  `;

  await pool.execute(query, [
    profile.username,
    profile.name,
    profile.followers,
    profile.following,
    profile.public_repos,
  ]);
}

export async function getAllProfiles() {
  const [rows] = await pool.query(
    "SELECT * FROM github_profiles ORDER BY id DESC"
  );

  return rows;
}

export async function getProfileByUsername(username) {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username=?",
    [username]
  );

  return rows[0];
}