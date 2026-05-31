import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github+json",

    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

export async function fetchGithubProfile(username) {
  try {
    const { data } = await githubApi.get(`/users/${username}`);

    return data;
  } catch (error) {
    console.error("GitHub Profile Error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
    });

    if (error.response?.status === 404) {
      throw new Error("GitHub user not found");
    }

    throw new Error(
      error.response?.data?.message ||
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
    console.error("GitHub Repos Error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
    });

    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch repositories"
    );
  }
}