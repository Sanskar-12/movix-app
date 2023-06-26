import { useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "../contentwrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import Img from "../lazyLoadImage/Img"

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastscrollY, setLastscrollY] = useState(0);
  const [mobilemenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showsearch, setShowsearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  const openSearch = () => {
    setMobileMenu(false);
    setShowsearch(true);
  };

  const openmobilemenu = () => {
    setMobileMenu(true);
    setShowsearch(false);
  };

  const searchQueryhandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowsearch(false);
      }, 1000);
    }
  };

  const navigationhandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  const scrollhandler = () => {
    if (window.scrollY > 196) {
      if (window.scrollY > lastscrollY && !mobilemenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastscrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollhandler);
    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  }, [lastscrollY]);

  return (
    <header className={`header ${mobilemenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate("/")}>
          <Img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li
            className="menuitem"
            onClick={() => {
              navigationhandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuitem"
            onClick={() => {
              navigationhandler("tv");
            }}
          >
            Tv Shows
          </li>
          <li className="menuitem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobilemenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openmobilemenu} />
          )}
        </div>
      
        </ContentWrapper>

      {showsearch && (
        <div className="searchBar">
          <ContentWrapper>

          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for Movie or TV show"
              onKeyUp={searchQueryhandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <VscChromeClose onClick={() => setShowsearch(false)} />
          </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
