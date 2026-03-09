import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

function AdminLogin() {

  const navigate = useNavigate();

  /* ================= SYSTEM ADMINS ================= */

  const SYSTEM_ADMINS = [
    {
      email: "admin@institution.edu",
      password: "Admin@123",
    },
    {
      email: "placement@college.edu",
      password: "Secure@456",
    },
  ];

  /* ================= STATES ================= */

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [remember,setRemember] = useState(false);
  const [showOTP,setShowOTP] = useState(false);

  const [otp,setOtp] = useState(["","","","","",""]);

  /* ================= LOGIN ================= */

  const handleLogin = () => {

    if(!email || !password){
      toast.error("Please enter admin credentials");
      return;
    }

    const admin = SYSTEM_ADMINS.find(
      (a)=> a.email === email && a.password === password
    );

    if(!admin){
      toast.error("Invalid admin credentials");
      return;
    }

    toast.success("Admin verification code sent 🔐");
    setShowOTP(true);

  };

  /* ================= OTP VERIFY ================= */

  const handleVerifyOTP = () => {

    if(otp.join("") === "999999"){

      toast.success("Admin Access Granted 🛡️");

      if(remember){
        localStorage.setItem("adminRemembered",email);
      }

      localStorage.setItem("role","admin");

      navigate("/dashboard/admin");

    } else {

      toast.error("Invalid verification code");

    }

  };

  const resendOTP = () => {

    toast.success("Verification code resent 🔁");

  };

  /* ================= OTP INPUT HANDLING ================= */

  const handleOtpChange = (e,index) => {

    const value = e.target.value;

    if(!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if(value && index < 5){
      e.target.nextElementSibling?.focus();
    }

  };

  const handleOtpKeyDown = (e,index) => {

    if(e.key === "Backspace" && !otp[index] && index > 0){
      e.target.previousElementSibling?.focus();
    }

  };

  const handleOtpPaste = (e) => {

    const paste = e.clipboardData.getData("text").trim();

    if(!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

  };

  return (

    <div className="auth-wrapper admin-auth">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <h1>Institution Control Center</h1>

        <p>
          Secure access for authorized institutional administrators.
          Manage assessments, monitor integrity logs, and analyze
          placement readiness analytics.
        </p>

      </div>


      {/* RIGHT PANEL */}

      <motion.div
        className="auth-card glass-card"
        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        transition={{duration:.4}}
      >

        <h2>Admin Login</h2>

        {!showOTP ? (

          <>

          <div className="input-group">

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <div className="password-wrapper">

              <input
                type={showPassword ? "text":"password"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <span
                className="toggle-eye"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>

            </div>

          </div>

          <div className="auth-options">

            <label className="remember-box">

              <input
                type="checkbox"
                checked={remember}
                onChange={()=>setRemember(!remember)}
              />

              Remember Me

            </label>

          </div>

          <button
            className="primary-btn admin-btn large"
            onClick={handleLogin}
          >
            Continue
          </button>

          </>

        ) : (

          <>

          <div
            className="otp-container"
            onPaste={handleOtpPaste}
          >

            {otp.map((digit,index)=>(
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-box"
                value={digit}
                onChange={(e)=>handleOtpChange(e,index)}
                onKeyDown={(e)=>handleOtpKeyDown(e,index)}
              />
            ))}

          </div>

          <button
            className="primary-btn admin-btn large"
            onClick={handleVerifyOTP}
          >
            Verify & Login
          </button>

          <p
            className="resend-link"
            onClick={resendOTP}
          >
            Resend Verification Code
          </p>

          </>

        )}

        <p className="auth-footer secure-note">
          Admin accounts are provisioned internally by the system.
        </p>

      </motion.div>

    </div>

  );

}

export default AdminLogin;