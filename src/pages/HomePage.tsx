import Announcements from "../components/Announcements";
import Navbar from "../components/navbar";
import Slider from "../components/slider";
import Categories from "../components/categories";
import ProductList from "../components/productList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <ProductList />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
