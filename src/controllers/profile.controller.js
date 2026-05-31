import { fetchGithubProfile } from "../services/github.service.js";

import {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
} from "../models/profile.model.js";

export async function analyzeProfile(req, res, next) {
  try {
    const { username } = req.params;

    const githubUser = await fetchGithubProfile(username);

    const profileData = {
      username: githubUser.login,
      name: githubUser.name,
      followers: githubUser.followers,
      following: githubUser.following,
      public_repos: githubUser.public_repos,
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
    const profile = await getProfileByUsername(
      req.params.username
    );

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