import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllUsers, useGetUsersQuery } from './usersSlice';

const UsersList = () => {
  const {
    // data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('getUsers');

  const users = useSelector(selectAllUsers);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const renderedUsers = users.map((obj) => (
      <li key={obj.id}>
        <Link to={`/user/${obj.id}`}>{obj.name}</Link>
        {/* <Link to={`/user/${userId}`}>{users.entities[userId].name}</Link> */}
      </li>
    ));

    content = (
      <section>
        <h2>Users</h2>

        <ul>{renderedUsers}</ul>
      </section>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default UsersList;
