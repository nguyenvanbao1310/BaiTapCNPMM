import { Card, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

export default function ProductCard({
  product,
  userId,
  addItem,
  favouriteIds,
  setFavouriteIds,
}) {
  const [isFavourite, setIsFavourite] = useState(false);

  const { auth } = useContext(AuthContext);
  useEffect(() => {
    setIsFavourite(favouriteIds.includes(product._id));
  }, [favouriteIds, product._id]);

  const toggleFavourite = async () => {
    if (!userId) {
      // LocalStorage fallback
      let favs = JSON.parse(localStorage.getItem("favourites") || "[]");
      if (favs.includes(product._id)) {
        favs = favs.filter((id) => id !== product._id);
        message.info("Đã xóa khỏi yêu thích tạm thời");
      } else {
        favs = [...favs, product._id];
        message.success("Đã thêm vào yêu thích tạm thời");
      }
      localStorage.setItem("favourites", JSON.stringify(favs));
      setFavouriteIds(favs);
      return;
    }

    try {
      if (isFavourite) {
        await axios.delete(
          `http://localhost:8080/v1/api/favourites/${userId}/${product._id}`
        );
        message.info("Đã xóa khỏi yêu thích");
        setFavouriteIds(favouriteIds.filter((id) => id !== product._id));
      } else {
        await axios.post(`http://localhost:8080/v1/api/favourites`, {
          userId,
          productId: product._id,
        });
        message.success("Đã thêm vào yêu thích");
        setFavouriteIds([...favouriteIds, product._id]);
      }
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  const handleViewProduct = async () => {
    // lưu vào DB khi đã login
    if (auth?.user?._id) {
      try {
        await axios.post("http://localhost:8080/v1/api/views", {
          userId: auth.user._id,
          productId: product._id,
        });
      } catch (err) {
        console.error("Error saving view:", err);
      }
    } else {
      // chưa login → lưu localStorage
      let views = JSON.parse(localStorage.getItem("views") || "[]");
      if (!views.includes(product._id)) {
        views.push(product._id);
        localStorage.setItem("views", JSON.stringify(views));
      }
    }
  };

  return (
    <Card
      hoverable
      onClick={handleViewProduct}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      cover={
        <div style={{ position: "relative" }}>
          <img
            alt={product.name}
            src={product.imageUrl}
            style={{
              height: "180px",
              objectFit: "contain",
              width: "100%",
              background: "#f9f9f9",
            }}
          />
          {/* Hiện % giảm giá */}
          {product.discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "#ff4d4f",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "12px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              -{product.discount}%
            </div>
          )}
          {/* Hiện lượt xem */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#1890ff",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          >
            👁 {product.views}
          </div>
        </div>
      }
    >
      <Card.Meta
        title={<b>{product.name}</b>}
        description={product.description || "Không có mô tả"}
      />
      <p style={{ fontWeight: "bold", color: "green", marginTop: "8px" }}>
        ${product.price}
      </p>
      <p style={{ fontSize: "12px", color: "#888" }}>
        Còn lại: {product.quantity}
      </p>

      <Button
        type="primary"
        block
        onClick={() => addItem(product)}
        style={{ marginBottom: "8px" }}
      >
        Thêm vào giỏ
      </Button>

      <Button
        type={isFavourite ? "primary" : "default"}
        danger={isFavourite}
        block
        onClick={toggleFavourite}
      >
        {isFavourite ? "❤️ Yêu thích" : "🤍 Yêu thích"}
      </Button>
    </Card>
  );
}
