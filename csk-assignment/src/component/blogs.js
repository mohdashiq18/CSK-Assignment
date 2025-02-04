import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "10 Tips to Evaluate Unlisted Share Price Before Investing",
      desc: "Investing in unlisted shares can be challenging, as these shares are not traded on stock exchanges and require careful evaluation...",
      img: "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac7e0e51ee769398493c_Checklist-for-investing-in-Unlisted-Equities-1-p-500.avif",
      link: "/blog/evaluate-unlisted-shares",
    },
    {
      id: 2,
      title: "A Beginner’s Guide to Buying Unlisted Shares in India",
      desc: "Investing in unlisted shares is gaining traction among investors in India...",
      img: "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac743d1dc2e1cafce757_679ca5b2e573df26c838e759_116602-min-p-800.avif",
      link: "/blog/buying-unlisted-shares",
    },
    {
      id: 3,
      title: "Top Factors That Influence Unlisted Share Price in 2025",
      desc: "Unlisted shares are becoming more common as an investment option...",
      img: "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac8bd306e05901ffadf9_679ca4e89ed402fd777e3440_18258-min-p-800-p-500.avif",
      link: "/blog/factors-unlisted-shares",
    },
  ];

  return (
    <div className="blog-container">
      <h2 className="blog-title">Our Blogs</h2>
      <p className="blog-description">
        Our blog provides insightful information about unlisted shares, offering a deeper understanding of how these assets work, their potential benefits, and the risks involved. Whether you're new to unlisted shares or looking to expand your knowledge, we cover topics such as investment strategies, valuation methods, market trends, and regulatory aspects. Stay updated with expert tips and guides to navigate the unlisted share market effectively.
      </p>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.img} alt={blog.title} width={350} height={200} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-text">{blog.desc}</p>
            <Link href={blog.link} className="blog-link">Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
