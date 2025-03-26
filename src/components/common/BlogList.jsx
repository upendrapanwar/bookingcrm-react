import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogPosts } from '../../data/bolgPost';
import BlogHeader from '../../components/common/BlogHeader';
import Footer from '../../components/common/Footer';
import { useHeader } from './HeaderContext';

const BlogList = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
    const { setHeaderData } = useHeader();

  // Extract all unique categories from blog posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on category and search query
  useEffect(() => {
    console.log('BlogList page run')
    let posts = [...blogPosts];

    // Filter by category if not "All"
    if (activeCategory !== 'All') {
      posts = posts.filter(post => post.category === activeCategory);
    }

    // Filter by search query if present
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => {
        const title = post.exactPhrase || post.title;
        return (
          title.toLowerCase().includes(query) ||
          post.subtitle.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
        );
      });
    }

    setFilteredPosts(posts);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
          setHeaderData({
              heading: '',
              // paragraph1: 'Online Monday to Friday, Day Release &amp; Weekend Courses Are Available',
              // paragraph2: 'Or View Our Classroom Courses Here - Site Management Safety Training Scheme'
          })
      }, [setHeaderData]);

  // Determine if a post is an exact match SEO post
  const isExactMatchPost = (post) => post.exactPhrase !== undefined;

  // Get the title to display for a post
  const getPostTitle = (post) => isExactMatchPost(post) ? post.exactPhrase : post.title;

  return (
    <>
      <BlogHeader />
      <section className="page_section contact_form_section bgWhite product_wrapper front_product_section columns-1 pb-25">
        <Helmet>
          <title>SMSTS Training Blog | Expert Guides & Resources | fullstacksmsts.co.uk</title>
          <meta name="description" content="Expert insights, guides, and resources for construction site managers and safety professionals. Learn about SMSTS courses, certification, and best practices." />
          <link rel="canonical" href="https://fullstacksmsts.co.uk/blog/" />
        </Helmet>

        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
              SMSTS Training Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert insights, guides, and resources for construction site managers and safety professionals.
              Learn about SMSTS courses, certification, and best practices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:w-1/3">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/2">
                    <img
                      src={filteredPosts[0].featuredImage}
                      alt={getPostTitle(filteredPosts[0])}
                      className="h-64 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{filteredPosts[0].category}</span>
                      <span className="mx-2">•</span>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                    <Link to={`/blog/${filteredPosts[0].id}`} className="block mt-1">
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-[var(--cta-orange)]">
                        {getPostTitle(filteredPosts[0])}
                      </h2>
                    </Link>
                    <p className="mt-3 text-gray-600">
                      {filteredPosts[0].subtitle}
                    </p>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img src="/api/placeholder/40/40" alt={filteredPosts[0].author} className="h-10 w-10 rounded-full" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{filteredPosts[0].author}</p>
                        <p className="text-sm text-gray-500">{filteredPosts[0].date}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/blog/${filteredPosts[0].id}`}
                        className="text-[var(--cta-orange)] hover:text-[var(--orange-accent)] font-medium flex items-center"
                      >
                        Read full article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No articles found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Blog Post Grid */}
          {filteredPosts.length > 0 && (
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            //   {filteredPosts.slice(1).map(post => (
            //     <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            //       <Link to={`/blog/${post.id}`}>
            //         <img
            //           src={post.featuredImage}
            //           alt={getPostTitle(post)}
            //           className="w-full h-48 object-cover"
            //         />
            //       </Link>
            //       <div className="p-6">
            //         <div className="flex items-center text-sm text-gray-500 mb-2">
            //           <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
            //           <span className="mx-2">•</span>
            //           <span>{post.readTime}</span>
            //           {isExactMatchPost(post) && (
            //             <>
            //               <span className="mx-2">•</span>
            //               <span className="bg-green-100 text-green-800 px-2 py-1 rounded">SEO</span>
            //             </>
            //           )}
            //         </div>
            //         <Link to={`/blog/${post.id}`} className="block mt-2">
            //           <h3 className="text-xl font-bold text-gray-900 hover:text-[var(--cta-orange)]">
            //             {getPostTitle(post)}
            //           </h3>
            //         </Link>
            //         <p className="mt-3 text-gray-600 line-clamp-3">
            //           {post.subtitle}
            //         </p>
            //         <div className="mt-6 flex items-center">
            //           <div className="flex-shrink-0">
            //             <img src="/api/placeholder/40/40" alt={post.author} className="h-8 w-8 rounded-full" />
            //           </div>
            //           <div className="ml-3">
            //             <p className="text-sm font-medium text-gray-900">{post.author}</p>
            //             <p className="text-sm text-gray-500">{post.date}</p>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </div>

            <div className="row g-4 mt-4 mb-4">
            {filteredPosts.slice(1).map((post) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <Link to={`/blog/${post.id}`}>
                    <img
                      src={post.featuredImage}
                      alt={getPostTitle(post)}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
          
                  <div className="card-body">
                    {/* Post category, read time, SEO tag */}
                    <div className="d-flex align-items-center mb-2 small text-muted flex-wrap">
                      <span className="badge bg-primary me-2 mb-1">{post.category}</span>
                      <span className="me-2 mb-1">• {post.readTime}</span>
                      {isExactMatchPost(post) && (
                        <span className="badge bg-success mb-1">SEO</span>
                      )}
                    </div>
          
                    {/* Post title */}
                    <Link to={`/blog/${post.id}`} className="text-decoration-none">
                      <h5 className="card-title text-dark">
                        {getPostTitle(post)}
                      </h5>
                    </Link>
          
                    {/* Post subtitle */}
                    <p className="card-text text-muted">{post.subtitle}</p>
                  </div>
          
                  {/* Author section */}
                  <div className="card-footer d-flex align-items-center bg-white">
                    <img
                      src="/api/placeholder/40/40"
                      alt={post.author}
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <p className="mb-0 fw-bold">{post.author}</p>
                      <small className="text-muted">{post.date}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

          )}

          {/* CTA Section */}
          <div className="mt-16 bg-[var(--primary-blue)] text-white rounded-xl p-8 shadow-lg">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Ready to advance your construction career?</h2>
                <p className="mb-6 md:mb-0">
                  Book your SMSTS course today with fullstacksmsts.co.uk. With a 98% pass rate and competitive pricing of just £360+VAT, we're the trusted choice for SMSTS training across the UK.
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <Link
                  to="/book-course"
                  className="inline-block bg-[var(--cta-orange)] hover:bg-[var(--orange-accent)] text-white font-medium py-3 px-6 rounded-lg transition duration-150"
                >
                  Book SMSTS Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogList;


