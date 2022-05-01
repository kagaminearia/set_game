import axios from "axios";

/* starts new game if no set game currently exists. otherwise gets current set game. can start new set game */
export function postSetGame(playerCount = 1, difficulty = 0, reset = false) {
  return axios
    .post(`http://localhost:3000/Game/`, {
      playerCount: playerCount,
      difficulty: difficulty,
      reset: reset,
    })
    .then((res) => {
      return res.data;
    });
}

/* get current set game */
export function getSetGame() {
  return axios.get(`http://localhost:3000/Game/`).then((res) => {
    return res.data;
  });
}

/* send valid set call */
export function postValidSet(cards) {
  return axios.post(`http://localhost:3000/Game/set`, cards).then((res) => {
    return res.data;
  });
}

/* hint call */
export function getValidSet() {
  return axios.get(`http://localhost:3000/Game/set`).then((res) => {
    return res.data;
  });
}

/* draw cards call */
export function postSetDrawCards() {
  return axios.post(`http://localhost:3000/Game/hand`).then((res) => {
    return res.data;
  });
}

export function getLeaderboard() {
  return axios.get("http://localhost:3000/Leaderboard/").then((res) => {
    return res.data;
  });
}

export function postLeaderboard(name, score, time) {
  return axios
    .post("http://localhost:3000/Leaderboard/", {
      name: name,
      score: score,
      time: time,
    })
    .then((res) => console.log(res.data));
}
