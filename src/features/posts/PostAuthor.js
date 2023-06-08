import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);
  return (
    <span>
      by
      {' '}
      {author ? author.name : ' Unknown author '}
    </span>
  );
};

PostAuthor.propTypes = {
  userId: PropTypes.number,
};

PostAuthor.defaultProps = {
  userId: 0,
};

export default PostAuthor;
