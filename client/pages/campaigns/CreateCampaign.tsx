import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Router from "next/router";
import { CustomContext } from "../../contexts/context";
import Toaster from "../../components/Toaster";

function CreateCampaign() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [minContribution, setMinContribution] = useState("");
  const [minContributionError, setMinContributionError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoUrlError, setPhotoUrlError] = useState("");
  const [goal, setGoal] = useState("");
  const [goalError, setGoalError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animateToast, setToasterAnimation] = useState(false);

  const {
    connectWallet,
    currentAccount,
    createCampaign,
    setFormData,
    formData,
    responseType,
  } = useContext(CustomContext);

  // workaround for redirecting to unauthenticated users

  const checkUrlImage = (url: string) => {
    const urlimage = /(https?:\/\/.*\.(?:png|jpg))/;
    return url.match(urlimage);
  };

  const validate = () => {
    setError("");
    setNameError("");
    setMinContributionError("");
    setDescriptionError("");
    setPhotoUrlError("");
    setGoalError("");
    let isValid = true;
    if (name.length < 5) {
      setNameError("Campaign name must contain at least 5 characters");
      isValid = false;
    }
    if (!minContribution) {
      setMinContributionError("Please enter a minimum contribution amount");
      isValid = false;
    } else if (isNaN(Number(minContribution))) {
      setMinContributionError("Minimum contribution must be a valid number");
      isValid = false;
    }
    if (!description) {
      setDescriptionError("Please enter a description");
      isValid = false;
    }
    if (!goal) {
      setGoalError("Please enter a goal amount");
      isValid = false;
    } else if (isNaN(Number(goal))) {
      setGoalError("Goal must be a valid number");
      isValid = false;
    }
    if (!photoUrl) {
      setPhotoUrlError("Please enter a photo url");
      isValid = false;
    } else if (!checkUrlImage(photoUrl)) {
      setPhotoUrlError("Please enter a valid image url");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setFormData({
      name: name,
      minContribution: minContribution,
      goal: goal,
      cover: photoUrl,
      description: description,
    });

    await createCampaign();
    setToasterAnimation(true);
    setIsLoading(false);
  };
  useEffect(() => {
    if (animateToast) {
      setTimeout(() => {
        setToasterAnimation(false);
      }, 2000);
    }
    if (responseType!.success) {
      setName("");
      setMinContribution("");
      setDescription("");
      setPhotoUrl("");
      setGoal("");
    }
  }, [animateToast, responseType]);
  return (
    <>
      <Header />
      {responseType!.success ? (
        <Toaster
          type={"success"}
          message={responseType.message}
          animate={animateToast}
        />
      ) : (
        <Toaster
          type={"error"}
          message={responseType.message}
          animate={animateToast}
        />
      )}
      <div className={styles.container}>
        <form onSubmit={handleSubmit} id="createCampaign">
          <div className={styles.formLayout}>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="company_email"
              id="company_email"
              className={styles.input}
              placeholder=" "
              required={true}
            />
            <label htmlFor="company_email" className={styles.label}>
              Campaign Name
            </label>
            {!!nameError && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">{nameError}</span>
              </p>
            )}
          </div>

          <div className={styles.gridlayout}>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="minimum_contribution"
                id="minimum_contribution"
                value={minContribution}
                onChange={(e) => setMinContribution(e.target.value)}
                className={styles.input}
                placeholder=""
                required={true}
                min="2"
                max="10"
              />
              <label htmlFor="minimum_contribution" className={styles.label}>
                Minimum contribution (ETHER)
              </label>
              {!!minContributionError && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">{minContributionError}</span>
                </p>
              )}
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="goal_target"
                id="goal_target"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className={styles.input}
                placeholder=""
                required={true}
                min="2"
                max="10"
              />
              <label htmlFor="floating_last_name" className={styles.label}>
                Goal target (ETHER)
              </label>
              {!!goalError && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">{goalError}</span>
                </p>
              )}
            </div>
          </div>
          <div className={styles.formLayout}>
            <input
              type="url"
              name="cover_url"
              id="cover_url"
              className={styles.input}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder=" "
              required={true}
            />
            <label htmlFor="cover_url" className={styles.label}>
              Cover url
            </label>
            {!!photoUrlError && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">{photoUrlError}</span>
              </p>
            )}
          </div>
          <div className={styles.formLayout}>
            <textarea
              rows={4}
              name="description"
              id="description"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              required={true}
            />
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            {!!descriptionError && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">{descriptionError}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {!isLoading ? (
              <>Create Campaign</>
            ) : (
              <>
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: `container mx-auto px-5 mt-20 `,
  formLayout: `relative z-0 mb-12 w-full group `,
  gridlayout: `grid md:grid-cols-2 md:gap-6`,
  submitBtn: `inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center
     text-white-900 hover:text-gray-900 border  rounded-lg  focus:ring-4 
text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800`,
  input: `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
  border-b-2  appearance-none text-white border-gray-600
 focus:border-white focus:outline-none focus:ring-0 focus:border-white-600 peer`,
  label: `peer-focus:font-medium absolute 
  text-sm text-gray-400
  duration-300 transhtmlForm -translate-y-6
  scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
   peer-focus:text-white
   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
   peer-focus:scale-75 peer-focus:-translate-y-6`,
};

export default CreateCampaign;
