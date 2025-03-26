import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import RelatedPosts from './RelatedPosts';
// import CommentSection from './CommentSection';
import { blogPosts } from '../../data/bolgPost';
import BlogHeader from '../../components/common/BlogHeader';
import Footer from '../../components/common/Footer';

const BlogPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real implementation, this would fetch from an API
        const fetchPost = () => {
            setIsLoading(true);

            // Find the current post
            const currentPost = blogPosts.find(post => post.id === postId);

            if (currentPost) {
                // Get related posts
                const related = currentPost.related
                    ? currentPost.related
                        .map(relId => blogPosts.find(p => p.id === relId))
                        .filter(p => p !== undefined)
                    : [];

                setPost(currentPost);
                setRelatedPosts(related);

                // Scroll to top when post changes
                window.scrollTo(0, 0);
            }

            setIsLoading(false);
        };

        fetchPost();
    }, [postId]);

    // Function to convert markdown content to HTML (simplified version)
    const renderContent = (markdown) => {
        // In a real implementation, you would use a library like marked or react-markdown
        // This is a simplified example
        const html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$2</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
            .replace(/\- (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/gm, '<br><br>');

        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!post) {
        return <div className="text-center py-12">Blog post not found</div>;
    }

    // Determine if this is an exact match SEO post
    const isExactMatchPost = post.exactPhrase !== undefined;

    // Set title and meta description based on post type
    const pageTitle = isExactMatchPost
        ? `${post.exactPhrase} | SMSTS Training Guide | fullstacksmsts.co.uk`
        : `${post.title} | SMSTS Blog | fullstacksmsts.co.uk`;

    const metaDescription = isExactMatchPost
        ? `${post.exactPhrase}? Learn everything you need to know about SMSTS courses, certification, and training options. £360+VAT with 98% pass rate.`
        : post.subtitle;

    // Structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": isExactMatchPost ? post.exactPhrase : post.title,
        "description": isExactMatchPost
            ? `${post.exactPhrase}? Comprehensive guide for construction professionals.`
            : post.subtitle,
        "image": post.featuredImage,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "FullStack SMSTS",
            "logo": {
                "@type": "ImageObject",
                "url": "https://fullstacksmsts.co.uk/logo.png"
            }
        },
        "datePublished": post.dateIso || post.date,
        "dateModified": post.modifiedDateIso || post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://fullstacksmsts.co.uk/blog/${post.id}/`
        }
    };

    // FAQ structured data for exact match posts
    const faqStructuredData = isExactMatchPost && post.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <>
            <BlogHeader />
            <section className="page_section contact_form_section bgWhite product_wrapper front_product_section columns-1 pb-25">
                <Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={metaDescription} />
                    <link rel="canonical" href={`https://fullstacksmsts.co.uk/blog/${post.id}/`} />
                    {/* Open Graph tags */}
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={metaDescription} />
                    <meta property="og:image" content={post.featuredImage} />
                    <meta property="og:url" content={`https://fullstacksmsts.co.uk/blog/${post.id}/`} />
                    <meta property="og:type" content="article" />
                    {/* Twitter Card tags */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={pageTitle} />
                    <meta name="twitter:description" content={metaDescription} />
                    <meta name="twitter:image" content={post.featuredImage} />
                    {/* Structured Data */}
                    <script type="application/ld+json">
                        {JSON.stringify(structuredData)}
                    </script>
                    {faqStructuredData && (
                        <script type="application/ld+json">
                            {JSON.stringify(faqStructuredData)}
                        </script>
                    )}
                </Helmet>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                        <ol className="flex flex-wrap">
                            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                            <li className="mx-2">/</li>
                            <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
                            <li className="mx-2">/</li>
                            <li className="text-gray-700">{isExactMatchPost ? post.exactPhrase : post.title}</li>
                        </ol>
                    </nav>

                    {/* Featured Image */}
                    <div className="mb-6">
                        <img
                            src={post.featuredImage}
                            alt={isExactMatchPost ? post.exactPhrase : post.title}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>

                    {/* Post Header */}
                    <header className="mb-8">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {isExactMatchPost ? post.exactPhrase : post.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
                        <div className="flex items-center">
                            <img src="/api/placeholder/48/48" alt={post.author} className="w-12 h-12 rounded-full" />
                            <div className="ml-3">
                                <p className="text-gray-900 font-medium">{post.author}</p>
                                <p className="text-gray-500 text-sm">{post.date}</p>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <article className="prose max-w-none mb-12">
                        {renderContent(post.content)}
                    </article>

                    {/* FAQ Section for Exact Match Posts */}
                    {isExactMatchPost && post.faqs && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {post.faqs.map((faq, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.question}</h3>
                                        <div className="text-gray-700">{faq.answer}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    {/* <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-12">
                        <h3 className="text-xl font-bold text-blue-800 mb-2">Book Your SMSTS Course Today</h3>
                        <p className="mb-4">With a 98% pass rate and competitive pricing of just £360+VAT, fullstacksmsts.co.uk is the trusted choice for SMSTS training across the UK.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/book-course" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg text-center transition duration-150">
                                Book SMSTS Course
                            </Link>
                            <Link to="/contact" className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-2 px-6 rounded-lg text-center transition duration-150">
                                Request a Callback
                            </Link>
                        </div>
                    </div> */}

                    {/* Related Posts */}
                    {/* {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )} */}

                    {/* Comment Section */}
                    {/* <CommentSection /> */}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogPost;
