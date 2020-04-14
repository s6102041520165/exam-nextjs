import Layout from '../components/MyLayout';
import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();
    return (
        <Layout>
            <h1>{router.query.title}</h1>
            <style jsx>{`
                h1{
                color:red;
                }
            `}</style>
        </Layout>
    );
}


export default Post;