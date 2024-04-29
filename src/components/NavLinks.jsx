import { NavLink } from "react-router-dom";
import { links } from "../utils/links";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";

const NavLinks = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            onClick={() => dispatch(toggleSidebar())}
            className="nav-link"
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
