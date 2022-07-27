import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        © 2022{" "}
        <a href="https://github.com/judinilson" className="hover:underline">
          Mr.Black™
        </a>
        . All Rights Reserved.
      </span>
      <ul className={styles.ul}>
        <li className="mx-2">
          <Link href="/About" className={styles.aLink}>
            About
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/Terms" className={styles.aLink}>
            Terms & Conditions
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/Privacy" className={styles.aLink}>
            Privacy Policy
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/Faq" className={styles.aLink}>
            FAQ
          </Link>
        </li>
        <li className="mx-2">
          <a
            href="https://linkedin.com/in/judinilson-monchacha"
            target="_blank"
            className={styles.aLink}
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

const styles = {
  footer: ` fixed bottom-0 left-0 w-full z-20 p-4  rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800`,
  copyright: `text-sm text-gray-500 sm:text-center dark:text-gray-400`,
  ul: `flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0`,
  aLink: `mr-4 hover:underline md:mr-6 hover:text-white`,
};
export default Footer;
