import Announcements from "../components/Announcements";
import Navbar from "../components/navbar";
import Slider from "../components/slider";
import Categories from "../components/categories";
import ProductList from "../components/productList";
import Newsletter from "../components/Newsletter";
import AIPortalComponent from "../components/AIPortalComponent";
import Footer from "../components/Footer";

const AIPortal = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <AIPortalComponent />

      <Newsletter />
      <Footer />
    </div>
  );
};

export default AIPortal;
