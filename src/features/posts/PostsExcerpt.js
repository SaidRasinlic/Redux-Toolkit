import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = ({ post }) => (
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

PostsExcerpt.propTypes = {
  // PropTypes.shape({}).isRequired
  post: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PostsExcerpt;
