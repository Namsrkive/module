import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

function StudentLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [showPassword,setShowPassword] = useState(false);
  const [remember,setRemember] = useState(false);
  const [showOTP,setShowOTP] = useState(false);
  const [loading,setLoading] = useState(false);

  /* ---------- LOGIN ---------- */

  const handleLogin = () => {

    if(!email || !password){
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(()=>{

      setShowOTP(true);
      setLoading(false);
      toast("Verification code sent to your email 📩");

    },1000);
  };


  /* ---------- VERIFY OTP ---------- */

  const handleVerifyOTP = () => {

    if (otp.join("") === "123456"){

      toast.success("Login Successful 🚀");

      if(remember){
        localStorage.setItem("rememberUser",email);
      }

      localStorage.setItem("role","student");

      navigate("/dashboard/student");

    } else {

      toast.error("Invalid OTP");

    }

  };


  const resendOTP = () => {

    toast.success("Verification email resent 📩");

  };


  const forgotPassword = () => {

    toast("Password reset link sent to your email 🔐");

  };
  const handleOtpChange = (e, index) => {

    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < 5) {
      e.target.nextElementSibling?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.target.previousElementSibling?.focus();
    }

  };

  const handleOtpPaste = (e) => {

    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

  };

  return (

    <div className="auth-wrapper student-auth">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <h1>Welcome Back, Future Achiever</h1>

        <p>
          Secure login with email verification and performance tracking.
        </p>

      </div>


      {/* RIGHT PANEL */}

      <motion.div
        className="auth-card glass-card"
        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        transition={{duration:.5}}
      >

        <h2>Student Login</h2>


        {!showOTP ? (

          <>
          
          <div className="input-group">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />


            <div className="password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
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


          {/* OPTIONS */}

          <div className="auth-options">

            <label className="remember-box">

              <input
              type="checkbox"
              checked={remember}
              onChange={()=>setRemember(!remember)}
              />

              <span className="checkmark"></span>

              Remember Me

            </label>

            <span
              className="forgot-link"
              onClick={forgotPassword}
            >
              Forgot Password?
            </span>

          </div>


          <button
            className="primary-btn large"
            onClick={handleLogin}
            disabled={loading}
          >

            {loading ? "Sending Code..." : "Login"}

          </button>

          </>

        ) : (

          <>
          
          <div className="otp-container"onPaste={handleOtpPaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-box"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
              />
            ))}
          </div>


          <button
            className="primary-btn large"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>


          <p
            className="resend-link"
            onClick={resendOTP}
          >
            Resend Verification Email
          </p>

          </>

        )}


        <p className="auth-footer">

          Don’t have an account?{" "}

          <span
            onClick={()=>navigate("/register/student")}
          >
            Register here
          </span>

        </p>

      </motion.div>

    </div>

  );

}

export default StudentLogin;