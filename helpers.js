import axios from 'axios';

function getRepos(username) {                                               //gets from the GH
  return axios.get(`https://api.github.com/users/${username}/repos`);
};

function getUserInfo(username) {                                            //same here
  return axios.get(`https://api.github.com/users/${username}`);
};

export default function getGithubInfo(username) {
  return axios.all([getRepos(username), getUserInfo(username)]) //table of functions
  .then((arr) => ({repos: arr[0].data, bio: arr[1].data}))      //.then - there are the results of each function in the table
                                                                //results of first function (getRepos)
                                                                //results of second function (getUserInfo)
  };
