import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Terms() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>Privacy Policy</h1>

        <section>
          <h2 className={styles.h2}>Respecting Privacy</h2>

          <p className={styles.p}>
            Privacy is a fundamental right, and at Crypto Crowdfund and its
            group companies, it is treated as such. This document sets forth our
            current policy in this regard.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>Sources of Personal Data</h2>

          <p className={styles.p}>
            Our business is founded on the principle that people matter. Respect
            for people is the foundation of our business. Respect for people
            includes respecting their right to privacy.
          </p>

          <p className={styles.p}>
            We are engaged in the business of using innovative ways to bring
            health to all in India. Our website seeks to bring cases of those in
            need of healthcare and other essential services to the attention of
            those in a position to make a difference and the opportunity to do
            so. The users of our website are those in need and those seeking to
            help.
          </p>
          <p className={styles.p}>
            In the conduct of our business, we collect and process personal data
            of our users and visitors. Personal data is collected in the course
            of transacting on the website. Personal data is also collected by
            Crypto Crowdfund and its affiliates outside of website through
            in-person meetings, participation in conferences and other business
            forums, transaction or promotion of business, and with respect to
            job applicants, through job application materials and interviews.
            Personal data is also collected through social media; from solicited
            and unsolicited communications; responses to promotional and other
            materials, among others. If your personal data is available with us,
            more likely than not, it has been shared by you with us.
          </p>
          <p className={styles.p}>
            Data collection technologies built into our websites,
            telecommunication systems, digital advertising, social media, etc.
            are additional sources of personal data collection. In addition to
            personal data that a user voluntarily furnishes, these electronic
            systems also collect personal data without the knowledge of the
            user, including user’s preferences, frequency of access, IP
            addresses, type of browser, communication device or operating
            systems used, and geographic location, etc.
          </p>
          <p className={styles.p}>
            Separately, we also collect and process personal data of our
            employees and independent contractors at the time of, in the course
            of and following their retention.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: `container mx-auto md:container md:mx-auto flex flex-wrap mt-6`,
  h1: `flex flex-wrap justify-end text-2xl font-bold whitespace-nowrap dark:text-white my-3`,
  h2: `text-medium my-5 font-semibold whitespace-nowrap dark:text-white`,
  p: `flex flex-wrap items-center mt-5 text-md text-gray-500 dark:text-gray-400 sm:mt-0 p-1`,
  colorPrimary: `underline text-gray-400`,
};

export default Terms;
