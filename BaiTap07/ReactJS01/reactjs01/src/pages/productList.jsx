import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Select,
  Pagination,
  Spin,
  Input,
  Slider,
} from "antd";
import axios from "axios";
import { useCart } from "@bibihero13/my-cart-lib";

const { Option } = Select;
const { Search } = Input;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [discount, setDiscount] = useState(0);
  const [views, setViews] = useState([0, 10000]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const limit = 4;

  // Lấy danh sách category
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/v1/api/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Lấy danh sách sản phẩm (ES)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/v1/api/products/search",
        {
          params: {
            page,
            limit,
            name: keyword,
            category,
            brand,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            discount,
            minViews: views[0],
            maxViews: views[1],
          },
        }
      );
      setProducts(res.data.data || []);
      setTotalItems(res.data.totalItems || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, category, brand, keyword, priceRange, discount, views]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Sản phẩm
      </h2>

      {/* Bộ lọc */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Category */}
        <Select
          value={category || "all"}
          style={{ width: 200 }}
          onChange={(value) => {
            setCategory(value === "all" ? "" : value);
            setPage(1);
          }}
        >
          <Option value="all">Tất cả danh mục</Option>
          {categories.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>

        {/* Brand */}
        <Select
          value={brand || "all"}
          style={{ width: 200 }}
          onChange={(value) => {
            setBrand(value === "all" ? "" : value);
            setPage(1);
          }}
        >
          <Option value="all">Tất cả thương hiệu</Option>
          <Option value="Asus">Asus</Option>
          <Option value="Dell">Dell</Option>
          <Option value="HP">HP</Option>
        </Select>

        {/* Search */}
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          enterButton="Tìm"
          onSearch={(val) => {
            setKeyword(val);
            setPage(1);
          }}
          style={{ width: 300 }}
        />

        {/* Price */}
        <div style={{ width: 250 }}>
          <p>Khoảng giá:</p>
          <Slider
            range
            min={0}
            max={3000}
            step={100}
            value={priceRange}
            onChange={(val) => {
              setPriceRange(val);
              setPage(1);
            }}
          />
          <p>
            {priceRange[0]}$ - {priceRange[1]}$
          </p>
        </div>

        {/* Discount */}
        <div style={{ width: 200 }}>
          <p>Khuyến mãi từ (%):</p>
          <Slider
            min={0}
            max={50}
            step={5}
            value={discount}
            onChange={(val) => {
              setDiscount(val);
              setPage(1);
            }}
          />
          <p>{discount}%</p>
        </div>

        {/* Views */}
        <div style={{ width: 250 }}>
          <p>Lượt xem:</p>
          <Slider
            range
            min={0}
            max={1000}
            step={100}
            value={views}
            onChange={(val) => {
              setViews(val);
              setPage(1);
            }}
          />
          <p>
            {views[0]} - {views[1]}
          </p>
        </div>
      </div>

      {/* Grid sản phẩm */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={p.name}
                      src={p.imageUrl}
                      style={{
                        height: "180px",
                        objectFit: "contain",
                        width: "100%",
                        background: "#f9f9f9",
                      }}
                    />
                    {p.discount > 0 && (
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
                        -{p.discount}%
                      </div>
                    )}
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
                      👁 {p.views}
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={<b>{p.name}</b>}
                  description={p.description || "description"}
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    color: "green",
                    fontSize: "16px",
                  }}
                >
                  ${p.price}
                </p>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  Còn lại: {p.quantity}
                </p>
                <Button type="primary" block onClick={() => addItem(p)}>
                  Thêm vào giỏ
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalItems}
          onChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
