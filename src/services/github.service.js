import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export async function fetchGithubProfile(username) {
  try {
    const { data } = await githubApi.get(`/users/${username}`);

    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("GitHub user not found");
    }

    throw new Error("Failed to fetch GitHub profile");
  }
}

export async function fetchGithubRepos(username) {
  try {
    const { data } = await githubApi.get(
      `/users/${username}/repos?per_page=100`
    );

    return data;
  } catch (error) {
    throw new Error("Failed to fetch repositories");
  }
}