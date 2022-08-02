import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Toaster from "../components/Toaster";
import { CustomContext } from "../contexts/context";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fakeData = [5];
  const { getCampaigns, responseType } = useContext(CustomContext);
  const [animateToast, setToasterAnimation] = useState(false);

  const fakeDatagenerate = () => {
    const data = [];
    for (let index = 0; index < 5; index++) {
      data.push(index);
    }
    return data;
  };
  const formatDate = (date: any) => {
    const _date = new Date(date);
    return _date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setToasterAnimation(true);
      setCampaigns(await getCampaigns());

      setIsLoading(false);
    })();
    if (animateToast) {
      setTimeout(() => {
        setToasterAnimation(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      <Header />
      {responseType!.error && (
        <Toaster
          type={"error"}
          message={responseType.message}
          animate={animateToast}
        />
      )}
      {isLoading ? (
        <>
          <div className={styles.container}>
            <div
              role="status"
              className="p-4 space-y-4 w-full rounded border  divide-y  shadow animate-pulse divide-gray-700 md:p-6 border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                </div>
                <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="overflow-x-auto relative container mx-auto shadow-md sm:rounded-lg my-5 max-h-[32rem]">
            <table className="w-full text-sm text-left  text-gray-400 ">
              <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Campaign Name
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c: any, index) => (
                  <tr
                    key={index}
                    className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600 cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="flex items-center py-4 px-6  whitespace-nowrap text-white"
                      onClick={() => {
                        Router.push({
                          pathname: `/campaigns/`,
                          query: { campaignId: c.id },
                        });
                      }}
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={String(c.urlCover)}
                        alt="cover image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {c.campaignName}
                        </div>
                        <div className="font-normal text-gray-500">
                          by: {c.creator}
                        </div>
                      </div>
                    </th>
                    <td className="py-4 px-6"> {formatDate(c.dateTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
const styles = {
  container: `flex container mx-auto justify-center my-5`,
};
export default Campaigns;
