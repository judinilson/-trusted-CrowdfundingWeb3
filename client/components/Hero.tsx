import React, { useContext, useEffect, useState } from "react";
import { CustomProvider, CustomContext } from "../contexts/context";
function Hero() {
  const { connectWallet, currentAccount } = useContext(CustomContext);
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.leftLayoutContainer}>
          <h1 className={styles.title}>Trusted Crowdfunding</h1>
          <p className={styles.subtitle}>
            Trusted Crowdfund is a platform for creating and managing
            crowdfunding campaigns. We help you to turn your creative ideas to
            reality.
          </p>
          <a href="#" className={styles.aLink}>
            View campaigns
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          {!currentAccount ? (
            <button className={styles.aButton} onClick={() => connectWallet()}>
              Connect
            </button>
          ) : (
            <a href="#" className={styles.aButton}>
              Create campaign
            </a>
          )}
        </div>
        <div className={styles.ethCard}>
          <img
            src="https://ipfs.pixura.io/ipfs/QmejwrwC4jqvFMZrrRoFGEn7manrDPNzvF1WiMdsAurbx8"
            alt="mockup"
            color="transparent"
          />
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: `dark:bg-gray-900`,
  sectionContainer: `grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12`,
  leftLayoutContainer: `mr-auto place-self-center lg:col-span-7`,
  title: `max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white`,
  subtitle: `max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400`,
  aLink: `inline-flex items-center justify-center px-5 py-3 mr-3 text-base 
  font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800
  focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900`,
  aButton: `inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center
     text-white-900 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 
  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800`,
  ethCard: `hidden lg:mt-0 lg:col-span-5 lg:flex  rounded overflow-hidden shadow-lg`,
};
export default Hero;
