import { useEffect, useState, useContext } from "react";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import { AuthContext } from "../components/context/auth.context";
import ProductCard from "../components/ProductCard";
import { useCart } from "@bibihero13/my-cart-lib";

export default function ViewedProducts() {
  const { auth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const fetchViewsAndFavourites = async () => {
    setLoading(true);
    try {
      if (auth?.user?._id) {
        // lấy viewed products
        const res = await axios.get(
          `http://localhost:8080/v1/api/views/${auth.user._id}`
        );
        let viewed = res.data.map((v) => v.productId);
        // loại bỏ trùng sản phẩm
        viewed = viewed.filter(
          (p, index, self) => index === self.findIndex((x) => x._id === p._id)
        );
        setProducts(viewed);

        // lấy favourite products
        const favRes = await axios.get(
          `http://localhost:8080/v1/api/favourites/${auth.user._id}`
        );
        setFavouriteIds(favRes.data.map((f) => f.productId._id));
      } else {
        // chưa login -> lấy viewed từ localStorage
        let views = JSON.parse(localStorage.getItem("views") || "[]");
        if (views.length > 0) {
          const res = await axios.get(
            `http://localhost:8080/v1/api/products/search`,
            { params: { ids: views.join(",") } }
          );
          setProducts(res.data.data || []);
        }

        // favourite tạm lưu trong localStorage
        const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
        setFavouriteIds(favs);
      }
    } catch (err) {
      console.error("Error fetching viewed products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchViewsAndFavourites();
  }, [auth?.user?._id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sản phẩm đã xem</h2>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
              <ProductCard
                product={p}
                userId={auth?.user?._id}
                addItem={addItem}
                favouriteIds={favouriteIds}
                setFavouriteIds={setFavouriteIds}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
