import logo from './logo.svg';
// import './App.css';
import './css/bulma.min.css';
import './css/style.css';

function App() {
  return (
    <section class="container px-2">
      <h1 class="is-size-1">Discussion</h1>
      <div class="is-flex is-align-items-center">
        <figure class="image is-64x64">
          <img src="./assets/images/person_ph_1.jpg" alt="person 1" class="is-rounded" />
        </figure>
        <input
          class="input is-primary mx-4"
          id="comment-content"
          type="text"
          placeholder="What are your thoughts?"
          />
        <div class="buttons">
          <button class="button is-primary" id="create-comment">Comment</button>
        </div>
      </div>
      <hr />
    </section>
  );
}

export default App;
