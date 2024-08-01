// App.js
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import { useState, useMemo,  useEffect } from 'react';
import FetchBaseNewsURL from './models/FetchBaseNewsURL'


function App() {
  const [isCategoryFetched, setIsCategoryFetched] = useState(true);
  const [loading, setLoading] = useState(true);
  const [baseURL,setBaseURL]=useState({});
  const categoryName =[];
  const newsURL =[];
   const source="TheTimesofIndia"

   const fetchNewsAPI = async ()=>{
    const baseURL = await FetchBaseNewsURL( source );
    setBaseURL(baseURL);
    //console.log('fetchedUrls in app',baseURL)
  }
   const sources = [
    { name: "TheTimesofIndia", categories: [] },
    { name: "TheHindu", categories: ["business", "entertainment", "general", "health", "science", "sports", "technology"] },
    { name: "HindustanTimes", categories: ["business", "entertainment", "general", "health", "science", "sports", "technology"] },
    { name: "TheIndianExpress", categories: ["business", "entertainment", "general", "health", "science", "sports", "technology"] }
  ];

  const baseRoutes = useMemo(() => 
    sources.map(source => ({
      path: `/${source.name}`,
      category: source.name === "TheTimesofIndia" ? baseURL.categoryName : source.categories,
      newsURL: source.name === "TheTimesofIndia" ? baseURL.newsURL : "",
      source: source.name
    })), 
  [baseURL]);

 
  const generateRoutes = (baseRoutes, sources) => {
    let dynamicRoutes = [];
    sources.forEach(source => {
      if (source.name === "TheTimesofIndia" && baseURL.newsURL && baseURL.newsURL.length > 0) {
        dynamicRoutes = dynamicRoutes.concat(
          baseURL.newsURL.map((url, index) => ({
            path: `/${source.name}/${baseURL.categoryName[index]}`,
            category: baseURL.categoryName[index],
            newsURL: url,
            source: source.name
          }))
        );
      } else {
        dynamicRoutes = dynamicRoutes.concat(
          source.categories.map(category => ({
            path: `/${source.name}/${category}`,
            category,
            newsURL: category,
            source: source.name
          }))
        );
      }
    });
    return [...baseRoutes, ...dynamicRoutes];
  };


  const routes = useMemo(() => generateRoutes(baseRoutes, sources), [baseRoutes, sources, baseURL]);

  

  const updateCategoryAndNewsURL = async (location) => {
   // console.log('routes in side update', routes)
    const route = routes.find(route => route.path === location.pathname);
    
    if (route) {
      //console.log('clicked routes',route)
      setIsCategoryFetched(true);
      setLoading(false);
    }
  };

  const LocationComponent = () => {
    const location = useLocation();
    useEffect(() => {
      updateCategoryAndNewsURL(location);
    }, [location]);
    return null;
  };
useEffect(()=>{
  fetchNewsAPI();
},[]);
  

  return (
    <Router basename="/dailynews">
      <Navbar baseURL={baseURL.categoryName} fetchedUrlscategory={categoryName} newsURL={newsURL} />
      <div className="container my-3">
        <Routes>
        <Route path="/" element={<Navigate to="/TheTimesofIndia" />} />
          {routes.map(({ newsURL, path, category, source }) => (
            <Route
              key={path}
              path={path}
              element={
                <News
                  key={path}
                  isCategoryFetched={isCategoryFetched}
                  setIsCategoryFetched={setIsCategoryFetched}
                  newsURL={newsURL}
                  path={path}
                  category={category}
                  source={source}
                  loading={loading}
                />
              }
            />
          ))}
        </Routes>
        <LocationComponent />
      </div>
    </Router>
  );
}

export default App;
