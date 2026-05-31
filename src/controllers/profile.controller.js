import {
  fetchGithubProfile,
  fetchGithubRepos,
} from "../services/github.service.js";

import {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
} from "../models/profile.model.js";

export async function analyzeProfile(req, res, next) {
  try {
    const { username } = req.params;

    const githubUser = await fetchGithubProfile(username);
    const repos = await fetchGithubRepos(username);

    const createdDate = new Date(githubUser.created_at);

    const accountAgeDays = Math.floor(
      (Date.now() - createdDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    const languageCount = {};

    let totalStars = 0;
    let totalForks = 0;

    let mostStarredRepo = null;
    let maxStars = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] =
          (languageCount[repo.language] || 0) + 1;
      }

      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (repo.stargazers_count > maxStars) {
        maxStars = repo.stargazers_count;
        mostStarredRepo = repo.name;
      }
    });

    const topLanguage =
      Object.keys(languageCount).length > 0
        ? Object.entries(languageCount)
            .sort((a, b) => b[1] - a[1])[0][0]
        : null;

    const profileData = {
      username: githubUser.login ?? null,
      name: githubUser.name ?? null,

      followers: githubUser.followers ?? 0,
      following: githubUser.following ?? 0,
      public_repos: githubUser.public_repos ?? 0,

      bio: githubUser.bio ?? null,
      location: githubUser.location ?? null,
      company: githubUser.company ?? null,
      blog: githubUser.blog ?? null,
      twitter_username: githubUser.twitter_username ?? null,

      public_gists: githubUser.public_gists ?? 0,

      avatar_url: githubUser.avatar_url ?? null,

      created_at_github: githubUser.created_at ?? null,

      account_age_days: accountAgeDays,

      top_language: topLanguage,
      total_stars: totalStars,
      total_forks: totalForks,
      most_starred_repo: mostStarredRepo,
    };

    await saveProfile(profileData);

    return res.status(201).json({
      success: true,
      data: profileData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfiles(req, res, next) {
  try {
    const profiles = await getAllProfiles();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleProfile(req, res, next) {
  try {
    const { username } = req.params;

    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}