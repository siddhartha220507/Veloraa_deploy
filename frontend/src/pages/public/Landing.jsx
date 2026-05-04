import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../components/public/HeroSection";
import FeaturesSection from "../../components/public/Features";
import StepsSection from "../../components/public/StepSection";
import Footer from "../../components/public/Footer";

const Landing = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    // 1. Check karo ki kya URL mein token chup kar aaya hai?
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // 2. Agar token mil gaya, toh usko save karke direct Dashboard le jao
    if (token) {
      localStorage.setItem('token', token);
      
      // Optional: URL ko clean kar do taaki token ganda na dikhe
      window.history.replaceState({}, document.title, "/"); 
      
      // User context refresh karo taaki loading state sahi rahe
      refreshUser().then(() => {
        navigate('/dashboard');
      }).catch(() => {
        navigate('/login?error=session_sync_failed');
      });
    }
  }, [navigate, refreshUser]);

  return (
    <div>
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <StepsSection />
      </div>
      <div id="ready-to-deploy">
        <Footer/>
      </div>
    </div>
  );
};


export default Landing;
