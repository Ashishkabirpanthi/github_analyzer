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
    console.error("GitHub Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch GitHub profile"
    );
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