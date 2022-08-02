import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CustomContext } from "../../contexts/context";

function campaign() {
  const router = useRouter();
  const campaignId = router.query.campaignId;
  const [campaign, setCampaign] = useState({});
  const { getCampaignById, responseType } = useContext(CustomContext);

  const [isLoading, setIsLoading] = useState(false);
  const [animateToast, setToasterAnimation] = useState(false);

  const getCampaign = useCallback(async () => {
    setIsLoading(true);
    setToasterAnimation(true);
    console.log("loading....");
    const _campaign = await getCampaignById(campaignId);
    setCampaign(_campaign);

    if (responseType.success) {
      setIsLoading(false);
    }
    console.log(campaign);
  }, [campaignId]);

  useEffect(() => {
    //getCampaign();

    if (animateToast) {
      setTimeout(() => {
        setToasterAnimation(false);
      }, 2000);
    }
  }, [campaignId]);

  return (
    <div className={styles.container}>
      <div className={styles.leftLayout}>
        <img
          src="https://i.ytimg.com/vi/lbHuwpPwfoc/maxresdefault.jpg"
          alt="cover"
          className={styles.imgLayer}
        />
        <h2 className={styles.campaignName}>Campaing name</h2>
      </div>
      <div className={styles.rightLayout}>
        <div>
          <div className={styles.title}>Contribute</div>
          <input
            type="number"
            id="contribution"
            className={styles.input}
            placeholder="contribution amount"
            required
          />
          <button type="button" className={styles.button}>
            Contribute
          </button>
          <div className="text-gray-400  flex flex-row ">
            <p className="text-gray-100 text-sm">NOTE:</p>
            <div className="px-3 w-full text-xs font-light">
              If you have already contributed to this campaign, please log in
              using the correct MetaMask account
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className={styles.title}>Requests</div>
          <button type="button" className={styles.button}>
            Create Request
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: `flex flex-row justify-around space-x-8 mt-12 w-sm:flex-wrap`,
  leftLayout: `basis-1/2`,
  rightLayout: `basis-1/4 w-full`,
  imgLayer: ` w-full`,
  campaignName: `my-3 text-2xl font-bold`,
  title: `text-lg text-white mb-3`,

  input: ` border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white
            focus:ring-gray-200 focus:border-gray-200`,
  button: `inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center
     text-white-900 hover:text-gray-900 border  rounded-lg  focus:ring-4 
text-white border-gray-700 hover:bg-gray-100 focus:ring-gray-800 w-full my-3`,
};
export default campaign;
