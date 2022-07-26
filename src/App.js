import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":movieId" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
