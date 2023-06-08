import PostsList from './features/posts/PostsList';
import './assets/style/style.css';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <main className="App">
      {/* <AddPostForm /> */}
      <PostsList />
      <AddPostForm />
    </main>
  );
}

export default App;
