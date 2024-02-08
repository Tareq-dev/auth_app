import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import getUser from "./../context/getUser";
import { signOut } from "firebase/auth";
import auth from "./../firebase.auth";
import toast from "react-hot-toast";

function Header() {
  const [currentUser, loading] = getUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logged Out");
      localStorage.removeItem("rememberMeToken");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  return (
    <Navbar fluid rounded className="py-6">
      <Navbar.Brand href="/">
        <img
          src="https://www.flowbite-react.com/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Auth App
        </span>
      </Navbar.Brand>
      <div className="md:flex hidden  md:order-2 gap-3">
        {currentUser?.email ? (
          <Button className="bg-[#27634D]" onClick={handleLogout} size="sm">
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button className="bg-[#27634D]" size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
        <div className=" md:hidden block my-2 ml-2">
          {currentUser?.email ? (
            <Button onClick={handleLogout} size="xs">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button size="xs">Login</Button>
            </Link>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
