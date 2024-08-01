const FetchBaseNewsURL = async (source) => {
    try {
        const url = `http://localhost:5000/rss/${source}`;

        const requestBody = {              
            source: source || '' // Include source if available
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();       
        const categoryName = [];
        const newsURL = [];
        for (const element of data.totalArticles) {
            categoryName.push(element.categoryName);
            newsURL.push(element.newsURL);
        }
        return {newsURL,categoryName };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { categoryName: [], newsURL: [] }; // Return empty arrays in case of error
    }
}

export default FetchBaseNewsURL;
