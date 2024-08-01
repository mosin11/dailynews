import React, { useState, useEffect } from 'react';

const NewsReader = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch('http://localhost:5000/rss');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  return (
    <div>
      <h1>News Feed</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.contentSnippet}</p>
          <p><strong>Source:</strong> {article.source}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsReader;
