import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Campaigns() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <a
          href="#"
          className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700"
        >
          <img
            className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal  text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </a>
      </div>
      <Footer />
    </>
  );
}
const styles = {
  container: `flex container mx-auto `,
};
export default Campaigns;
