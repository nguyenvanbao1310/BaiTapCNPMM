// src/components/SimilarProducts.jsx
import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Typography, Spin, message } from "antd";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useCart } from "@bibihero13/my-cart-lib";
import { AuthContext } from "../components/context/auth.context";

const { Title, Text } = Typography;

export default function SimilarProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // giỏ hàng
  const { addItem } = useCart();

  // user login
  const { auth } = useContext(AuthContext);
  const userId = auth?.user?._id;

  // yêu thích
  const [favouriteIds, setFavouriteIds] = useState(
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/v1/api/products/${productId}/similar`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm tương tự:", err);
        message.error("Không tải được sản phẩm tương tự");
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Spin />
      </div>
    );
  }

  if (products.length === 0) {
    return <Text type="secondary">Không có sản phẩm tương tự.</Text>;
  }

  return (
    <div style={{ marginTop: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Sản phẩm tương tự
      </Title>
      <Row gutter={[16, 16]}>
        {products.map((p) => (
          <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
            <ProductCard
              product={p}
              userId={userId}
              addItem={addItem}
              favouriteIds={favouriteIds}
              setFavouriteIds={setFavouriteIds}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
