import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Terms() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>Terms And Conditions</h1>

        <section>
          <h2 className={styles.h2}>Acceptance of the Terms of Use</h2>

          <p className={styles.p}>
            These terms of use (“Terms of Use”) are entered into by and between
            you (“you”) and <strong> Cryto Crowdfund </strong> Private Limited
            (“Company”), the owner of the website (the “Website”). It governs
            your access to and use of every content, functionality or services
            offered on or through the Website.
          </p>

          <p className={styles.p}>
            These Terms of Use apply to you even if you are a guest and not a
            registered user of the Website. Please therefore read these Terms of
            Use carefully before using the Website. By using the Website or by
            clicking to accept or agree to the Terms of Use, you accept and
            agree to be bound and abide by these Terms of Use and our Privacy
            Policy, found at [PRIVACY POLICY URL], incorporated herein by
            reference. If you do not agree to these Terms of Use or the Privacy
            Policy, you must not access or use the Website.
          </p>

          <p className={styles.p}>
            The two principal categories of users of this Website are
            Campaigners and Donors. A Campaigner is one who launches a campaign
            for donations (“Campaign”). A Donor is anyone who makes a donation
            to the campaign. Additionally, the Website may be accessed by any
            person who is neither a Campaigner nor a Donor. These Terms of Use
            apply to all who access this website, including but not limited to,
            Campaigners and Donors.
          </p>

          <p className={styles.p}>
            Use of the Website, however, is not available to persons who cannot
            form legally binding contracts under the Indian Contract Act, 1872
            (the “Contract Act”). Persons who are not competent to contract
            within the meaning of the Contract Act, i.e., minors, undischarged
            insolvents, etc. are not eligible to use the Website. Such persons
            may not register on the Website, transact on it, or otherwise use
            the Website.
          </p>
        </section>

        <section>
          <h2 className={styles.h2}>Changes to the Terms of Use</h2>

          <p className={styles.p}>
            We may revise and update these Terms of Use from time to time in our
            sole discretion. All changes are effective immediately when we post
            them and apply to all access to and use of the Website thereafter.
            Your continued use of the Website following the posting of revised
            Terms of Use means that you accept and agree to the changes and the
            revised Terms of Use. We do not undertake to notify you of proposed
            or actual changes.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: `container mx-auto md:container md:mx-auto flex flex-wrap mt-6`,
  h1: `text-center self-center text-2xl font-bold whitespace-nowrap dark:text-white my-3`,
  h2: `text-medium my-5 font-semibold whitespace-nowrap dark:text-white`,
  p: `flex flex-wrap items-center mt-5 text-md text-gray-500 dark:text-gray-400 sm:mt-0 p-1`,
  colorPrimary: `underline text-gray-400`,
};

export default Terms;
