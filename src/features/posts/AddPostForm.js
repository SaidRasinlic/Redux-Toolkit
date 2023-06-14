import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postsSlice';
import { useGetUsersQuery } from '../users/usersSlice';

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(0);

  const { data: users, isSuccess } = useGetUsersQuery('getUsers');

  const navigate = useNavigate();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  let usersOptions;

  if (isSuccess) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">
          Post Title:
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="postAuthor">
          Author:
          <select id="postAuthor" value={userId} onChange={(e) => setUserId(parseInt(e.target.value, 10))}>
            <option value={0} disabled defaultValue>
              Select Author
            </option>
            {usersOptions}
          </select>
        </label>
        <label htmlFor="postContent">
          Content:
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
