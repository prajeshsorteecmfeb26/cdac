import { BrowserRouter, useLocation } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { AppRouter } from "./components/AppRouter";
import { Bounce, ToastContainer } from "react-toastify";
import { Layout } from "./components/Layout";

function App() {

  return (
    <BrowserRouter>
    
      <Layout/>
      
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce} />
    </BrowserRouter>
  )
}

export default App
