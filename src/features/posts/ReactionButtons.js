import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
    >
      {emoji}
      {' '}
      {post.reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};

ReactionButtons.propTypes = {
  // PropTypes.shape({}).isRequired
  post: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ReactionButtons;
