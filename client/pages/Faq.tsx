//@ts-nocheck
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Faq() {
  const [hide, setHide] = useState(false);
  const [isHidden, setIsHidden] = useState("");

  useEffect(() => {
    if (hide) {
      setIsHidden("hidden");
    }

    return () => {
      setHide(false);
    };
  }, [hide, isHidden]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>FAQ</h1>
        <div id="accordion-open" data-accordion="open">
          <div>
            <h2 id="accordion-open-heading-1">
              <button
                type="button"
                className={styles.button}
                data-accordion-target="#accordion-open-body-1"
                aria-expanded="true"
                aria-controls="accordion-open-body-1"
              >
                <span className="flex items-center text-gray-200">
                  <svg
                    className="w-5 h-5 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How does the Campaigns work?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-6 h-6 rotate-180 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-1"
              className=""
              aria-labelledby="accordion-open-heading-1"
            >
              <div className={styles.showAccordion}>
                The Campaigns are processed in the following order:
                <ol className="flex flex-wrap  items-center text-md my-2 text-gray-500 dark:text-gray-400">
                  <li>
                    Anyone can sign-up at <strong>Crypto Crowdfund</strong> and
                    start a campaign.
                  </li>
                  <li>
                    After the campaign is created, the contributors send money
                    directly to the smart contract for the campaign.
                  </li>
                  <li>
                    Once the contract has sufficient funds, the campaign manager
                    can create a transaction request to utilize the funds.
                  </li>
                  <li>Now the contributors vote on the transaction request.</li>
                  <li>
                    Only after the transaction request receives more than 50%
                    approvals, can it be finalized.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div>
            <h2 id="accordion-open-heading-2">
              <button
                type="button"
                className={styles.button}
                data-accordion-target="#accordion-open-body-2"
                aria-expanded="false"
                aria-controls="accordion-open-body-2"
              >
                <span className="flex items-center text-gray-200">
                  <svg
                    className="w-5 h-5 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  "How do I contribute to a campaign?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-6 h-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-2"
              className="hidden"
              aria-labelledby="accordion-open-heading-2"
            >
              <div className={styles.showAccordion}>
                <p className="mb-2 text-gray-400 dark:text-gray-400">
                  You need a Meta Mask wallet to contribute to any campaign.
                  After creating & logging in to your Meta Mask wallet, whenever
                  you want to contribute to any campaign, Meta Mask will request
                  your consent and process the transaction accordingly.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 id="accordion-open-heading-3">
              <button
                type="button"
                className={styles.button}
                data-accordion-target="#accordion-open-body-3"
                aria-expanded="false"
                aria-controls="accordion-open-body-3"
              >
                <span className="flex items-center text-gray-200">
                  <svg
                    className="w-5 h-5 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  Why am I being charged for a request campaign vote?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-6 h-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-3"
              className="hidden"
              aria-labelledby="accordion-open-heading-3"
            >
              <div className={styles.showAccordion}>
                <p className="mb-2 text-gray-400">
                  The <strong>Trusted Crowdfunding</strong> is a decentralized
                  application backed by Etherium Blockchain.
                  <strong> Any action that modifies the Blockchain </strong>
                  typically takes a 15 to 30 seconds to process and come to a
                  consensus globally. This ensures nobody can manipulate the
                  data, making the application incredibly secure.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 id="accordion-open-heading-3">
              <button
                type="button"
                className={styles.button}
                data-accordion-target="#accordion-open-body-3"
                aria-expanded="false"
                aria-controls="accordion-open-body-3"
              >
                <span className="flex items-center text-gray-200">
                  <svg
                    className="w-5 h-5 mr-2 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  What if my campaign doesn’t reach its goal amount?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-6 h-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              id="accordion-open-body-3"
              className="hidden"
              aria-labelledby="accordion-open-heading-3"
            >
              <div className={styles.showAccordion}>
                <p className="mb-2 text-gray-400 dark:text-gray-400">
                  No problem! We follow a flexible model where you can keep what
                  you’ve raised without being penalised for not meeting your
                  goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: `rounded-lg shadow container mx-auto px-4 mt-10`,
  h1: `flex flex-wrap  text-2xl font-bold whitespace-nowrap dark:text-white my-3`,
  button: `flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 
  border-gray-700 rounded-t-xl focus:ring-4 focus:ring-gray-800 dark:focus:ring-gray-800 dark:border-gray-700
  dark:hover:bg-gray-800 bg-gray-800 dark:bg-gray-800 text-gray-900 dark:text-white`,
  showAccordion: `p-5 font-light border border-b-0  border-gray-700 bg-gray-900"`,
};

export default Faq;
