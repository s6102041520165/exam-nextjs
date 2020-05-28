import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react'

const initialState = {
  keyword: "",
}
const Index = props => {
  const [{keyword}, setKeyword] = useState(initialState);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (movie.length === 0) {
      setMovie(props.shows)
    }
  })

  const getDataProps = async (keyword) => {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${keyword}`);
    const data = await res.json();
    await setMovie(data.map(entry => entry.show));
    return keyword
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setKeyword(prevState => ({ ...prevState, [name]: value }));

    getDataProps(value)
  };

  return (
    <Layout>

      <h1>TV </h1>
      <ul>
        <input type="text" name="keyword" onChange={handleChange} value={keyword} />
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

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.tvmaze.com/shows');
    const data = await res.json();
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      props: {
        shows: data.map(entry => entry)
      }

    };
  } catch (error) {
    console.log(error)
  }
};
/* Index.getInitialProps = async () =>{
  try {
    const res = await fetch('https://api.tvmaze.com/shows');
    const data = await res.json();
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      //props: {
      shows: data.map(entry => entry)
      //}

    };
  } catch (error) {
    console.log(error)
  }
}; */

export default Index