
import Head from 'next/head';
import Navbar from '@/component/navBar';
import "../styles/globals.css"
import Footer from '@/component/footer';
import BlogPage from '@/component/blogs';
import StockDetails from '@/component/stockDetails';

export default function Home() {


  return (
    <div>
      <Navbar />
      <Head>
        <title>CSK Shares</title>
        <meta name="description" content="Chennai Super Kings Unlisted Shares" />
      </Head>
      <main>
        <div className="heading-div">
          <h1>Chennai Super Kings (CSK) Shares</h1>
        </div>
      </main>
      <StockDetails />
      <BlogPage />
      <Footer />
    </div>
  );
}



