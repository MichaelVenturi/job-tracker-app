import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import EditApplication from "./pages/EditApplication";
import ApplicationPage from "./pages/ApplicationPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col h-screen font-mono">
          <Navbar />
          <main className="container grow-1 mx-auto flex items-start">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute redirectPath="/login" />}>
                <Route path="/application-list" element={<Applications />} />
                <Route path="/new-application" element={<NewApplication />} />
                <Route path="/edit-application/:id" element={<EditApplication />} />
                <Route path="/application/:id" element={<ApplicationPage />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
