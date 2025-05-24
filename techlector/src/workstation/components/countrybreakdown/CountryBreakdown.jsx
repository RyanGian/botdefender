import "./CountryBreakdown.css";
import { BarChart } from "@mantine/charts";
import { useState, useEffect } from "react";

export default function CountryBreakdown() {
  const data = [
    { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("desc");
  const [nameFilter, setNameFilter] = useState("");
  const [limit] = useState(5);

  const [pageCursors, setPageCursors] = useState([null]); // cursor for each page
  const [currentPage, setCurrentPage] = useState(0); // page index

  const [totalPages, setTotalPages] = useState(null); // optional enhancement

  useEffect(() => {
    setPageCursors([null]);
    setCurrentPage(0);
    fetchPage(0, true);
  }, [sort, nameFilter]);

  const fetchPage = async (pageIndex, reset = false) => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageIndex] ?? null;
      const url = new URL("http://localhost:8080/countries");
      url.searchParams.append("limit", limit);
      url.searchParams.append("sort", sort);
      if (nameFilter) url.searchParams.append("nameFilter", nameFilter);
      if (cursor) url.searchParams.append("cursor", cursor);

      const res = await fetch(url);
      const json = await res.json();

      setCountries(json.data);

      // if moving forward and new cursor exists, add it to list
      if (json.nextCursor && pageCursors.length === pageIndex + 1) {
        setPageCursors((prev) => [...prev, json.nextCursor]);
      }

      if (reset) {
        setCountries(json.data);
      }

      setCurrentPage(pageIndex);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="countrybreakdown-container">
      {/* <BarChart
        className="barchart"
        h={390}
        data={data}
        dataKey="month"
        orientation="vertical"
        yAxisProps={{ width: 100 }}
        barProps={{ radius: 10 }}
        series={[{ name: "Smartphones", color: "blue.6" }]}
      /> */}
      <div>
        {/* Filter Controls */}
        <div style={{ marginBottom: "1rem" }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Highest Requests</option>
            <option value="asc">Lowest Requests</option>
          </select>
          <input
            type="text"
            placeholder="Search country"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        {/* Country List */}
        <ul>
          {countries.map((c) => (
            <li key={c.id}>
              {c.country} — Requests: {c.requests}
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => fetchPage(currentPage - 1)}
            disabled={currentPage === 0 || loading}
          >
            ← Previous
          </button>

          <span>
            Page {currentPage + 1}
            {totalPages ? ` of ${totalPages}` : ""}
          </span>

          <button
            onClick={() => fetchPage(currentPage + 1)}
            disabled={loading || !pageCursors[currentPage + 1]}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
