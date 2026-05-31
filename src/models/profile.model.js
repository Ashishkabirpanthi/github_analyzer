import { pool } from "../config/db.config.js";

export async function saveProfile(profile) {
  const query = `
  INSERT INTO github_profiles (
    username,
    name,
    followers,
    following,
    public_repos,
    bio,
    location,
    company,
    blog,
    twitter_username,
    public_gists,
    avatar_url,
    created_at_github,
    account_age_days,
    top_language,
    total_stars,
    total_forks,
    most_starred_repo
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    followers = VALUES(followers),
    following = VALUES(following),
    public_repos = VALUES(public_repos),
    bio = VALUES(bio),
    location = VALUES(location),
    company = VALUES(company),
    blog = VALUES(blog),
    twitter_username = VALUES(twitter_username),
    public_gists = VALUES(public_gists),
    avatar_url = VALUES(avatar_url),
    created_at_github = VALUES(created_at_github),
    account_age_days = VALUES(account_age_days),
    top_language = VALUES(top_language),
    total_stars = VALUES(total_stars),
    total_forks = VALUES(total_forks),
    most_starred_repo = VALUES(most_starred_repo)
  `;

  const values = [
    profile.username,
    profile.name,
    profile.followers,
    profile.following,
    profile.public_repos,
    profile.bio,
    profile.location,
    profile.company,
    profile.blog,
    profile.twitter_username,
    profile.public_gists,
    profile.avatar_url,
    profile.created_at_github,
    profile.account_age_days,
    profile.top_language,
    profile.total_stars,
    profile.total_forks,
    profile.most_starred_repo,
  ];

  const [result] = await pool.execute(query, values);

  return result;
}

export async function getAllProfiles() {
  const [rows] = await pool.query(
    "SELECT * FROM github_profiles ORDER BY id DESC"
  );

  return rows;
}

export async function getProfileByUsername(username) {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username]
  );

  return rows[0];
}