import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
 
function AnimatedRoutes() {
  const location = useLocation();
 
  return (
<AnimatePresence mode="wait">
<motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
>
<Routes location={location}>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
</Routes>
</motion.div>
</AnimatePresence>
  );
}
 
function App() {
  return (
<Router>
<AnimatedRoutes />
</Router>
  );
}
 
export default App;