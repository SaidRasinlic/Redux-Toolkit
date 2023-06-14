import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetUsersQuery } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const { user: author, isLoading } = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
      isLoading,
    }),
  });

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <span>
      by
      {' '}
      {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : ' Unknown author '}
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
