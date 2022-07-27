import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link href="/" className="flex items-center">
          {/* <img src="/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"> */}
          <span className={styles.navTitle}>Trusted Crowdfunding</span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className={styles.navToggleButton}
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={styles.navItems} id="navbar-default">
          <ul className={styles.ul}>
            <li>
              <a href="#" className={styles.aLink} aria-current="page">
                Canpaigns
              </a>
            </li>
            <li>
              <a href="#" className={styles.aLink}>
                Connect
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
const styles = {
  nav: `border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900`,
  navContainer: `container flex flex-wrap justify-between items-center mx-auto`,
  navTitle: `self-center text-l font-semibold whitespace-nowrap dark:text-white`,
  navToggleButton: `inline-flex items-center p-2 ml-3 text-sm text-gray-500 
  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2
   focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`,
  navItems: `hidden w-full md:block md:w-auto`,
  ul: `flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium`,
  aLink: `block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent 
  md:hover:text-white md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700
  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-base`,
};
export default Header;
