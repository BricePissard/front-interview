import Layout from '../components/Layout'
import ActionBar from '../components/ActionBar'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { withRedux } from '../libs/redux'

const API_ENDPOINT = 'https://upply-interview.herokuapp.com'

const PostLink = post => (
  <li key={post.id}>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      {post.title && <h3>{post.title}</h3>}
      {post.text && <p>{post.text}</p>}
      {post.src && <img data-testid="img" src={`${API_ENDPOINT}/images/${post.src}`} alt="img"/>}
    </Link>
  </li>
);

const Blog = props => (
  <Layout>
    <h1 data-testid="page-title">Blog</h1>
    <ActionBar/>
    <ul>
      {props && props.posts && props.posts.map(post => post && <PostLink {...post}/>)}
    </ul>
  </Layout>
);

Blog.getInitialProps = async ({reduxStore}) => {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();

  console.log('Blog.getInitialProps()', data);

  return {
    posts: data
  };
};

export default withRedux(Blog)