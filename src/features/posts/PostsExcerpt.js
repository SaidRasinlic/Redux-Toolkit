import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectPostById } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

// eslint-disable-next-line import/no-mutable-exports
const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

// PostsExcerpt = React.memo(PostsExcerpt);

PostsExcerpt.propTypes = {
  // PropTypes.shape({}).isRequired
  postId: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default PostsExcerpt;
