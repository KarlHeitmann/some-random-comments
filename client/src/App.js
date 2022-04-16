import './css/bulma.min.css';
import './css/style.css';
import NewComment from "./components/NewComment";

function App() {
  return (
    <section className="container px-2">
      <h1 className="is-size-1">Discussion</h1>
      <NewComment />
      <hr />
    </section>
  );
}

export default App;
