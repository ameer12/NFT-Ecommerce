import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import LoginHero from "./LoginHero";
import { CustomButton } from "../UI";

const Login = () => {
  const redirect = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletAddress(address);
        console.log("Wallet connected:", address);

        // يمكنك هنا إرسال العنوان إلى backend لإنشاء جلسة أو التحقق من المستخدم
        redirect("/");
      } catch (error) {
        console.error("Wallet connection failed:", error);
        setErrorMessage("Wallet connection failed. Please try again.");
      }
    } else {
      setErrorMessage("MetaMask not detected. Please install MetaMask.");
    }
  };

  return (
    <div className={classes.login_section}>
      <div className={classes.left_section}>
        <LoginHero />
      </div>
      <div className={classes.right_section}>
        <h1 className={classes.login_text}>Connect Your Wallet</h1>
        <div className={classes.form}>
          <div className={classes.btn}>
            <CustomButton
              onClick={connectWallet}
              label="Connect Wallet"
              filled
            />
          </div>
          {walletAddress && (
            <p className={classes.login_para}>
              Connected: {walletAddress}
            </p>
          )}
          {errorMessage && (
            <p className={classes.login_para} style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
