import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const post = () => {
    axios.post("http://localhost:5000/ask", {
      "prompt": document.getElementById("question").value
    })
    .then((res) => {
      const answer = document.getElementById("answer");
      answer.innerHTML = res.data.data.trim();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="question" />
        <button onClick={post}>Post</button>
        <h3 id="answer"></h3>
      </header>
    </div>
  );
}

export default App;
