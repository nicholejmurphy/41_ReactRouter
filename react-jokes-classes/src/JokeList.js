import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./static/JokeList.css";

class JokeList extends React.Component {
  static defaultProps = { numJokesToGet: 10 };
  constructor(props) {
    super(props);
    this.numJokesToGet = this.props.numJokesToGet;
    this.cachedJokes = localStorage.getItem("jokes");
    this.state = {
      jokes: this.cachedJokes ? JSON.parse(this.cachedJokes) : [],
    };
    this.setJokes = this.setJokes.bind(this);
    this.vote = this.vote.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
  }

  setJokes = (newJokes) => {
    this.setState({ jokes: newJokes });
    localStorage.setItem("jokes", JSON.stringify(newJokes));
  };

  vote = (id, delta) => {
    const updatedJokes = this.state.jokes.map((j) =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    );
    this.setJokes(updatedJokes);
  };

  generateNewJokes = () => {
    this.setJokes([]);
  };

  async componentDidMount() {
    if (this.state.jokes.length === 0) {
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });

          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setJokes(j);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async componentDidUpdate() {
    if (this.state.jokes.length === 0) {
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setJokes(j);
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map((j) => (
            <Joke
              text={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={this.vote}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="JokeList">
        <img
          className="JokeList-spinner"
          src="https://openclipart.org/image/2000px/311354"
          alt="loading"
        />
        <p className="JokeList-loading">Loading...</p>
      </div>
    );
  }
}

export default JokeList;
