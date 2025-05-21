import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../../context";


const Header = () => {

    const { isLogin, isLoading } = useContext(MyContext);
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.reload();
    isLogin(false);
   
  };



  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
  
        <div className="text-2xl font-bold tracking-wide cursor-pointer">
          Shahan Ahmed
        </div>

       
        <nav>
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <Link
                to={"/"}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>


            {!isLoading && isLogin && (
              <li>
                <Link
                  to={`/dashboard/${userId}`}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
            )}

              {!isLoading && isLogin && (
              <li>
                <Link
                  onClick={handleLogout}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Logout
                </Link>
              </li>
            )}

           <li>
  <Link
    to="/blog"
    className="hover:text-blue-400 transition-colors duration-300"
  >
   Blog
  </Link>
</li>
<li>
  <Link
    to="/project"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    project
  </Link>
</li>
<li>
  <Link
    to="/contact"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    Contact me
  </Link>
</li>
<li>
  <Link
    to="/login"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    Login
  </Link>
</li>



              {!isLoading && isLogin && (
              <li>
                <Link
                  onClick={handleLogout}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
