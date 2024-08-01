import RoutesContext from "./RoutesContext";
import FetchBaseNewsURL from "../../models/FetchBaseNewsURL";
import { useState } from "react";


const RoutesStates = (props) => {
    const [newsURLs, setNewsURLs] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const categoryName = [];
    const newsURL = [];
    const source="TheTimesofIndia"
    //const [source, setSource] = useState("TheTimesofIndia"); // Default or initial source

    // Function to fetch data
    const baseNewsURL = async () => {
        try {
            const fetchedUrls = await FetchBaseNewsURL( source );     
            console.log('fetchedUrls',fetchedUrls);
            setNewsURLs(fetchedUrls.newsURL);
            setCategoryNames(fetchedUrls.categoryName);
            
            
        // for (const element of fetchedUrls.categoryName) {
        //     categoryName.push(element);            
        // };
        // for (const element of fetchedUrls.newsURL) {  
        //     newsURL.push(element);
        // };
       
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when the component mounts or source changes
          
    
    // useEffect(() => {
      //  console.log("useEffect running with source:", source);
       // baseNewsURL();
       // console.log('urls',urls)
      //}, [source]); // Runs once on mount
        
   
   
       console.log('newsURLs',newsURLs);
       console.log('categoryNames',categoryNames);
    return (
        <RoutesContext.Provider value={{newsURL, categoryName,  baseNewsURL}}>
            {props.children}
        </RoutesContext.Provider>
    );
}

export default RoutesStates;
