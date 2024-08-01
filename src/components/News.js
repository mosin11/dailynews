import React, {  useState ,useEffect } from 'react';
import NewsItem from './NewsItem'; // Ensure you have this component
import Spinner from './Spinner'; // Ensure you have this component
import InfiniteScroll from 'react-infinite-scroll-component';
import latestImg from './img/latest-news.jpg';
// import RoutesContext from '../context/routers/RoutesContext'

const News = ({ path,isCategoryFetched, category,newsURL,source}) => {
    const [articles, setArticles] = useState([]);
    const [articlesMetaData, setArticlesMetaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
   
    
    const fetchArticles = async () => { 
        
        try {
            //let urls = `http://localhost:5000/rss${path}`;             
            const url = `http://localhost:5000/rss/${source}/${category}`;
            
    const requestBody = {
            newsURL :newsURL,            
            category:category,                 
            source: source || '' // Include source if available
        };

            const response = await fetch(url,
                {
                    method: 'POST', // Use POST method
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody) // Send the request body
                }); 

               
            if (!response.ok) throw new Error('Network response was not ok');            
            const data = await response.json();      
            
            console.log("response data articles metadata",data.metadata);
            console.log("response data articles totalResults",data.totalArticles);

            setArticles(prevArticles => prevArticles.concat(data.totalArticles)); // Append new articles
            setArticlesMetaData(data.metadata);
            setTotalResults(data.totalArticles.length); // Assuming your API returns the total number of results
            setLoading(false);

            // Capitalize category for the document title
            
            const title = category ? `${category} - News Feed` : 'News Feed';
            document.title = title;
        } catch (error) {
            console.error('Error fetching articles:', error);
            setLoading(false);
        }
    };

    const fetchMoreArticles = () => {
        if (articles.length < totalResults && !loading) {
        setCurrentPage(currentPage + 1); // Increment page number to fetch more
        }
    };
    useEffect(() => {
        if(isCategoryFetched){
            fetchArticles();
        }
    },[category]);
    return (    
        <div className='container my-4'>        
            {loading && currentPage === 1 ? (
                <Spinner />
            ) : (
                <InfiniteScroll
                        className="custom-infinite-scroll"
                        dataLength={articles.length}
                        next={fetchMoreArticles}
                        hasMore={articles.length < totalResults}
                        loader={<h4>Loading...</h4>}
                    > 
                <div className="row" style={{marginTop: '5%'}}>
                    {articlesMetaData.title ?(
                        <h1 style={{marginTop:'1%',border: '2px solid #333',borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}} className='text-center'>{articlesMetaData.title || 'News Feed'}</h1>
                    ):(
                        <h1 style={{border: '2px solid #333',borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}  className='text-center'>News Feed</h1>
                    )}
                        {articles.map((article, index) => (
                         
                                <div className="col-md-4" style={{background: 'linear-gradient(to bottom, #19f5ea, #feb47b)'}} key={index}>
                                <NewsItem
                                    title={article.title || "Unknown"}                                    
                                    description={article.description || ''}                                   
                                    imageURL={article.itemImg || latestImg}                                   
                                    newsURL={article.link}                                  
                                    author={article.creator || 'Unknown'}
                                    date={article.pubDate}
                                    latestImg ={latestImg}                                   
                                    source={articlesMetaData.sourceImg || 'Unknown'}
                                   
                                />
                            </div>
                                                       
                        ))}
                      
                </div>
                </InfiniteScroll>
            )}
        </div>
        
    );
};

export default News;
