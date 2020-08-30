import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return ( 
    <div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1>לצערנו העמוד שחיפשת לא נמצא</h1>
        <br />
        <Link to="/">בחזרה לדף הבית</Link>
    </div> );
}
 
export default PageNotFound;