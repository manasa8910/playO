import React, { useState } from "react";
import Orders from "./components/Orders";
import data from "./orders";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter((order) =>
    order.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex gap-2 border-gray-400 border-2 w-[300px] rounded-lg p-2 m-2">
        <img
          src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/icons/search.svg"
          alt="Search Icon"
          style={{ filter: "brightness(0%)", opacity: "0.5" }}
        />

        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ outline: "none" }}
        />
      </div>

      <Orders data={currentPageData} />

      <div className="pagination m-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
