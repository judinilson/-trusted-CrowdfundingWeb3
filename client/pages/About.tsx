import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function About() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>About</h1>

        <section>
          <p className={styles.p}>
            <strong>Trusted Crowdfunding</strong> Campaigns will help you turn
            your creative ideas into reality! It's where creators share new
            visions for creative work with the communities that will come
            together to fund them.
          </p>

          <p className={styles.p}>
            Some of these creators already had huge fanbases. But many projects
            have been as small-scale as a limited run of silent meditation
            vinyls or as up-and-coming.
          </p>

          <p className={styles.p}>
            No matter what, creators always control how the work comes
            together—no 100-page grant applications, no donors demanding you
            modify your message, no last-minute edits from investors. When
            backers chip in funding and help spread the word, they too become
            part of these independent works.
          </p>

          <strong className={`${styles.colorPrimary} ${styles.p}`}>
            Worried about being Conned by Fake Campaign Managers?
          </strong>

          <p className={styles.p}>
            <strong>Trusted Crowdfunding</strong> brings power to the Investors
            as well! Backed by the cutting-edge BlockChain Technology, only
            after the majority of the investors has approved a Transaction
            Request, the transaction can be processed.
          </p>

          <p className={styles.p}>
            No more being scammed by Fake Campaign Managers!
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: `container mx-auto md:container md:mx-auto flex flex-wrap mt-6`,
  h1: `self-center text-2xl font-bold whitespace-nowrap dark:text-white my-3`,
  h2: `text-medium my-5 font-semibold whitespace-nowrap dark:text-white`,
  p: `flex flex-wrap items-center mt-5 text-md text-gray-500 dark:text-gray-400 sm:mt-0 p-1`,
  colorPrimary: `underline text-gray-400`,
};

export default About;
