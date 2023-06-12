import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { addNewPost } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(0);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  // const onSavePostClicked = () => {
  //   if (title && content && userId) {
  //     dispatch(postAdded(title, content, userId));

  //     setTitle('');
  //     setContent('');
  //     setUserId(0);
  //   }
  // };

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
