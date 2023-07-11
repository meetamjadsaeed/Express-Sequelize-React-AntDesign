import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Single from "./components/products/Single";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import AddProduct from "./components/products/AddProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import Register from "./components/oath/Register";
import LogIn from "./components/oath/Login";

import ProtectedRoute from "./ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:ID" element={<Single />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/updateProduct/:ID" element={<UpdateProduct />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
