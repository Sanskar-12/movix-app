import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "../contentwrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a target={"blank"} href="https://github.com/Sanskar-12">
              <FaGithub />
            </a>
          </span>
          <span className="icon">
            <a
              target={"blank"}
              href="https://www.instagram.com/__sanskar______/"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="icon">
            <a target={"blank"} href="https://twitter.com/sanskarv2004">
              <FaTwitter />
            </a>
          </span>
          <span className="icon">
            <a
              target={"blank"}
              href="https://www.linkedin.com/in/sanskar-vishwakarma-a706b5252/"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
