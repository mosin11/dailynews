import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({baseURL}) {
  //console.log('baseURL navbar',baseURL)
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{background: 'linear-gradient(to left, #e81abb, #feb47b)'}}>
      <Link className="navbar-brand" to="/">All NEWS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link dropdown-item" to="TheTimesofIndia">Home</Link>
          </li>
          <li className="nav-item dropdown-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/TheTimesofIndia" id="timesDropdown" role="button" aria-haspopup="true" aria-expanded={activeDropdown === 'times'}>
              The Times of India
            </Link>
            <div className="dropdown-menu" aria-labelledby="timesDropdown">
            {baseURL && baseURL.length > 0 ? (
              baseURL.map((links, index) => (                
            <Link key={index} className="dropdown-item dropdown-item" to={`/TheTimesofIndia/${encodeURIComponent(links)}`}>
            {links}
        </Link>
    ))
) : (
    <div>No links available</div>
)}            
             
            </div>
          </li>
          <li className="nav-item dropdown-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/TheHindu" id="hinduDropdown" role="button" aria-haspopup="true" aria-expanded={activeDropdown === 'hindu'}>
              The Hindu
            </Link>
            <div className="dropdown-menu" aria-labelledby="hinduDropdown">              
              <Link className="dropdown-item " to="/TheHindu/business">Business</Link>
              <Link className="dropdown-item" to="/TheHindu/entertainment">Entertainment</Link>
              <Link className="dropdown-item" to="/TheHindu/general">General</Link>
              <Link className="dropdown-item" to="/TheHindu/health">Health</Link>
              <Link className="dropdown-item" to="/TheHindu/science">Science</Link>
              <Link className="dropdown-item" to="/TheHindu/sports">Sports</Link>
              <Link className="dropdown-item" to="/TheHindu/technology">Technology</Link>
            </div>
          </li>
          <li className="nav-item dropdown-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/HindustanTimes" id="hindustanDropdown" role="button" aria-haspopup="true" aria-expanded={activeDropdown === 'hindustan'}>
              Hindustan Times
            </Link>
            <div className="dropdown-menu" aria-labelledby="hindustanDropdown">             
              <Link className="dropdown-item" to="/HindustanTimes/business">Business</Link>
              <Link className="dropdown-item" to="/HindustanTimes/entertainment">Entertainment</Link>
              <Link className="dropdown-item" to="/HindustanTimes/general">General</Link>
              <Link className="dropdown-item" to="/HindustanTimes/health">Health</Link>
              <Link className="dropdown-item" to="/HindustanTimes/science">Science</Link>
              <Link className="dropdown-item" to="/HindustanTimes/sports">Sports</Link>
              <Link className="dropdown-item" to="/HindustanTimes/technology">Technology</Link>
            </div>
          </li>
          <li className="nav-item dropdown-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/TheIndianExpress" id="indianExpressDropdown" role="button" aria-haspopup="true" aria-expanded={activeDropdown === 'indianExpress'}>
              The Indian Express
            </Link>
            <div className="dropdown-menu" aria-labelledby="indianExpressDropdown">            
              <Link className="dropdown-item" to="/TheIndianExpress/business">Business</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/entertainment">Entertainment</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/general">General</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/health">Health</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/science">Science</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/sports">Sports</Link>
              <Link className="dropdown-item" to="/TheIndianExpress/technology">Technology</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
