import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            voluptas reiciendis ipsum non molestias reprehenderit eum odit illum
            consectetur magni labore assumenda hic aperiam in eius ratione, unde
            eligendi culpa?
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        {/* Image */}
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
