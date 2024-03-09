import Navbar from "../components/navbar";
import Announcements from "../components/Announcements";
import ProductListByCategory from "../components/ProductListByCategory";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const ProductListPage = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <ProductListByCategory />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductListPage;
