// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Spin,
  Image,
  message,
} from "antd";
import SimilarProducts from "../components/SimilarProducts";

const { Title, Paragraph, Text } = Typography;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ buyersCount: 0, commentersCount: 0 });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        message.error("Không tải được thông tin sản phẩm");
        setLoading(false);
      });
    axios
      .get(`http://localhost:8080/v1/api/products/${id}/stats`)
      .then((res) => setStats(res.data))
      .catch(() => setStats({ buyersCount: 0, commentersCount: 0 }));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <p style={{ textAlign: "center" }}>Sản phẩm không tồn tại.</p>;
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fefffbe6", // 🌸 nền xám nhạt dịu
        minHeight: "100vh", // đảm bảo phủ hết màn hình
      }}
    >
      <Row gutter={24} align="stretch">
        {/* Ảnh sản phẩm */}
        <Col xs={24} md={10}>
          <Card
            bordered
            hoverable
            style={{
              borderRadius: 12,
              textAlign: "center",
              height: "100%", // 🔥 ép full chiều cao
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              style={{
                maxHeight: 350,
                objectFit: "contain",
              }}
            />
          </Card>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col xs={24} md={14}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              height: "100%", // 🔥 ép full chiều cao
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Title level={3}>{product.name}</Title>

              <Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: "Xem thêm" }}
                style={{ marginBottom: 16 }}
              >
                {product.description}
              </Paragraph>

              <Divider />
              <Row gutter={24} style={{ marginBottom: 16 }}>
                <Col>
                  <Text style={{ fontSize: 16 }}>
                    <span role="img" aria-label="sold">
                      🛒
                    </span>
                    <strong> {stats.buyersCount}</strong> lượt mua
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 16 }}>
                    <span role="img" aria-label="comments">
                      💬
                    </span>
                    <strong> {stats.commentersCount}</strong> bình luận
                  </Text>
                </Col>
              </Row>
              <Text
                strong
                style={{ fontSize: 20, color: "#ff4d4f", marginBottom: 30 }}
              >
                Giá tiền: ${product.price.toLocaleString()}
              </Text>
              <br />
              <Text type={product.quantity > 0 ? "success" : "danger"}>
                {product.quantity > 0
                  ? `Còn lại: ${product.quantity}`
                  : "Hết hàng"}
              </Text>
            </div>

            <div style={{ marginTop: 16 }}>
              <Divider />
              <Row gutter={16}>
                <Col>
                  <button
                    style={{
                      background: "#1890ff",
                      color: "#fff",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                    onClick={() => console.log("Thêm vào giỏ", product._id)}
                  >
                    🛒 Thêm vào giỏ
                  </button>
                </Col>
                <Col>
                  <button
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                    onClick={() => console.log("Mua ngay", product._id)}
                  >
                    ⚡ Mua ngay
                  </button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 🔥 Sản phẩm tương tự */}
      <Divider />
      <SimilarProducts productId={id} />
    </div>
  );
}
