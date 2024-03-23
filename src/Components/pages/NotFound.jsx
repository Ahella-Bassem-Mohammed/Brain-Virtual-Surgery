import { Link } from "react-router-dom";
import './LoginSignup/LoginSignup.css';

const NotFound = () => {
    return ( 
        <section className="NotFound">
            <div className="not-found-title">404</div>
            <h1 className="not-found-text">Page Not Found!</h1>
            <Link className="not-found-link" to= "/">Go to home page</Link>
        </section>

     );
}
 
export default NotFound;