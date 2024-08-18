import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";

const Products = () => {
  // State variables
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products based on filters and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `https://task-server-three-iota.vercel.app/products`,
          {
            params: {
              page: currentPage,
              size: itemsPerPage,
              filter,
              sort,
              search,
            },
          }
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, filter, itemsPerPage, search, sort]);

  // Fetch total product count for pagination
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const { data } = await axios.get(
          `https://task-server-three-iota.vercel.app/product-count`,
          {
            params: {
              filter,
              search,
            },
          }
        );
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, [filter, search]);

  // Calculate pagination details
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  // Reset filters and search
  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  // Pagination button click handler
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      {/* Filter, Sort, and Search Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        {/* Category Filter */}
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          value={filter}
          className="border p-4 rounded-lg"
        >
          <option value="">Filter By Category</option>
          <option value="Category1">Category1</option>
          <option value="Category2">Category2</option>
          <option value="Category3">Category3</option>
        </select>

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg">
            <input
              className="px-6 py-2 text-gray-700 bg-white outline-none"
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search Products"
            />
            <button className="px-4 py-3 text-sm font-medium text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
              Search
            </button>
          </div>
        </form>

        {/* Sort By Price */}
        <select
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
          value={sort}
          className="border p-4 rounded-md"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>

        {/* Reset Button */}
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handlePaginationButton(btnNum)}
            className={`hidden sm:inline px-4 py-2 mx-1 rounded-md ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } hover:bg-blue-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
