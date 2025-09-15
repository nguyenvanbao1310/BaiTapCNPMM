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
import ProductCard from "../components/ProductCard";

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

  const [favouriteIds, setFavouriteIds] = useState([]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const userId = localStorage.getItem("userId");

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

  const fetchFavourites = async () => {
    if (!userId) {
      const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
      setFavouriteIds(favs);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/v1/api/favourites/${userId}`
      );
      setFavouriteIds(res.data.map((f) => f.productId._id));
    } catch (err) {
      console.error("Error fetching favourites:", err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [userId]);

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
