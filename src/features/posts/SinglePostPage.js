import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostsStatus, selectPostById, getPostsError } from './postsSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  let content;
  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = (
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className="postCredit">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    );
  } else if (postStatus === 'failed') {
    content = <section>{error}</section>;
  }

  // if (!post) {
  //   console.log(postStatus);
  //   return (
  //     <section>
  //       <h2>{content}</h2>
  //     </section>
  //   );
  // }

  return (
    <>
      {content}
    </>
    // <article>
    //   <h2>{post.title}</h2>
    //   <p>{post.body}</p>
    //   <p className="postCredit">
    //     <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
    //     <PostAuthor userId={post.userId} />
    //     <TimeAgo timestamp={post.date} />
    //   </p>
    //   <ReactionButtons post={post} />
    // </article>
  );
};

export default SinglePostPage;
