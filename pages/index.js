import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react'

const Index = props => {
  const [keyword, setKeyword] = useState("");
  const [movie, setMovie] = useState([]);

  const handleChange = async event => {
    await setKeyword(event.target.value)
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${keyword}`);
    const data = await res.json();

    //console.log(data)

    console.log(`Show data fetched. Count: ${data.length}`);

    await setMovie(data.map(entry => entry.show));
    //console.log(movie)
    //console.log(props.shows)
  }
  return (
    <Layout>
      
      <h1>TV Shows</h1>
      <ul>
        <form>
          <input type="text" onChange={handleChange} value={keyword} />
        </form>
        {movie.map(show => (
          <li key={show.id}>
            <Link href="/clean-uri/[id]" as={`/clean-uri/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
}

Index.getInitialProps = async function () {
  const res = await fetch('http://api.tvmaze.com/shows');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry)
  };
};

export default Index