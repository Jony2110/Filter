import { useState, useEffect } from "react";
import productsData from "./assets/products.json";
import styles from "./App.module.css";
const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [shippingFilter, setShippingFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const handleFilter = (event) => {
    event.preventDefault();
    const filtered = products.filter((product) => {
      return (
        (searchTerm === "" ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedCompany === "" || product.company === selectedCompany) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (!shippingFilter || product.shipping === shippingFilter)
      );
    });
    setFilteredProducts(filtered);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCompany("");
    setPriceRange([0, 100000]);
    setShippingFilter(false);
    setFilteredProducts(products);
  };

  return (
    <div className={styles.container}>
      <h1>
        Filter product <br />{" "}
        <span>
          <a href="https://github.com/Jony2110/">by JONNY</a>
        </span>
      </h1>
      <form className={styles.form}>
        <div className={styles.inpGrOne}>
          <label className={styles.label}>
            Search product
            <input
              type="text"
              placeholder="Ichimlik nomini kiriting...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Select Category
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Chairs">Chairs</option>
              <option value="Beds">Beds</option>
              <option value="Sofas">Sofas</option>
            </select>
          </label>
          <label className={styles.label}>
            Select Company
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">All Companies</option>
              <option value="Milacron Inc.">Milacron Inc.</option>
              <option value="Applera Corporation">Applera Corporation</option>
              <option value="Hewlett-Packard Company">
                Hewlett-Packard Company
              </option>
              <option value="National Oilwell Inc">National Oilwell Inc</option>
              <option value="Crown Cork & Seal Co. Inc.">
                Crown Cork & Seal Co. Inc.
              </option>
            </select>
          </label>
        </div>
        <label className={styles.labelPrice}>
          <div className={styles.priceSpan}>
            <span>Select Price</span> <span>{`$${priceRange}`}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
          />
        </label>
        <label className={styles.chekbox}>
          <input
            type="checkbox"
            checked={shippingFilter}
            onChange={(e) => setShippingFilter(e.target.checked)}
          />
        </label>

        <button onClick={handleFilter}>SEARCH</button>
        <button onClick={handleClear}>RESET</button>
      </form>
      <hr />
      <div className={styles.containerCard}>
        {filteredProducts.map((product) => (
          <div className={styles.box} key={product.id}>
            <img
              className={styles.img}
              src={product.image}
              alt={product.title}
            />
            <h2 className={styles.title}>{product.title}</h2>

            <p className={styles.p}>${product.price}</p>
            <p className={styles.p}>
              {product.shipping ? "Yetkazib beriladi" : "Yetkazib berilmaydi"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
