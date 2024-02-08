import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getUser from "../context/getUser";
import Loading from "../components/Loading";
import Header from "./../components/Header";
import FooterSection from './../components/FooterSection';

function Home() {
  const [currentUser, loading] = getUser();
  return (
    <div className="container mx-auto">
      <Header />
      <div className="flex justify-center h-[400px] items-center">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {currentUser?.email ? (
              <h1 className="text-2xl text-center">LOGGED IN USER</h1>
            ) : (
              <div>
                <h1 className="text-2xl text-center">Home Page</h1>
              </div>
            )}
            {currentUser?.email && (
              <div>
                <p className="text-center bg-black px-3 py-1 rounded-md text-white mt-5">
                  Email: {currentUser?.email}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

export default React.memo(Home);
