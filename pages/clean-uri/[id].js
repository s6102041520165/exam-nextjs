import fetch from 'isomorphic-unfetch';
import Layout from '../../components/MyLayout';

const Post = props => {
  return (
    <Layout>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
      {props.show.image ? <img src={props.show.image.medium} /> : null}
      <style jsx>{`
            h1{
              color:orange;
            }
        `}</style>
    </Layout>
  );
}

Post.getInitialProps = async function (context) {
  const { id } = context.query;
  console.log(id)
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post