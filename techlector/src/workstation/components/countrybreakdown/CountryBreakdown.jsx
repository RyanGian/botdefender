import "./CountryBreakdown.css";
import { useState, useEffect } from "react";
import { BarChart } from "@mantine/charts";

import { Group, Button, Select, Input } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconSortAscending,
  IconSortDescending,
  IconSearch,
} from "@tabler/icons-react";

export default function CountryBreakdown() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("desc");
  const [nameFilter, setNameFilter] = useState("");
  const [limit] = useState(10);

  const [pageCursors, setPageCursors] = useState([null]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setPageCursors([null]);
    setCurrentPage(0);
    fetchPage(0, true);
  }, [sort, nameFilter]);

  const fetchPage = async (pageIndex, reset = false) => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageIndex];
      const url = new URL("http://localhost:8080/countries/filter");
      url.searchParams.append("limit", limit);
      url.searchParams.append("sort", sort);

      if (nameFilter) {
        url.searchParams.append("nameFilter", nameFilter);
      } else if (cursor) {
        url.searchParams.append("cursorRequests", cursor.cursorRequests);
        url.searchParams.append("cursorCountryName", cursor.cursorCountryName);
      }

      const res = await fetch(url);
      const json = await res.json();

      if (reset) {
        setPageCursors([null]);
        setCurrentPage(0);
      }

      setCountries(json.data);

      if (json.nextCursor) {
        const newCursors = [...pageCursors];
        newCursors[pageIndex + 1] = json.nextCursor;
        setPageCursors(newCursors);
      }

      setCurrentPage(pageIndex);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Ensure a minimum of 10 rows
  const MIN_ROWS = 10;
  const paddedCountries = [
    ...countries,
    ...Array.from(
      { length: Math.max(0, MIN_ROWS - countries.length) },
      (_, i) => ({
        countryName: ``,
        requests: 0,
      })
    ),
  ];

  const maxRequests = Math.max(...paddedCountries.map((c) => c.requests));
  const step = 5;
  const ticks = Array.from(
    { length: Math.ceil(maxRequests / step) + 1 },
    (_, i) => i * step
  );

  return (
    <div className="countrybreakdown-container">
      <div>
        <div className="breakdown-filters" style={{ marginBottom: "1rem" }}>
          Country Request Audit
          <Input
            type="text"
            leftSection={<IconSearch></IconSearch>}
            placeholder="Search country"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <Select
            leftSection={
              sort === "desc" ? <IconSortDescending /> : <IconSortAscending />
            }
            className="select-sort"
            value={sort}
            data={[
              { value: "desc", label: "Highest" },
              { value: "asc", label: "Lowest" },
            ]}
            onChange={setSort}
          />
          {/* <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Highest Requests</option>
            <option value="asc">Lowest Requests</option>
          </select> */}
        </div>

        <BarChart
          className="barchart"
          h={300}
          data={paddedCountries}
          dataKey="countryName"
          orientation="vertical"
          xAxisProps={{
            type: "number",
            ticks,
          }}
          yAxisProps={{ width: 100 }}
          barProps={{ radius: 10 }}
          series={[
            { name: "requests", color: "blue.6", label: "No. requests" },
          ]}
          gridProps={{
            strokeDasharray: "0", // Removes dashed line
            stroke: "transparent", // Hides grid entirely
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginTop: "1rem",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Group justify="center">
            <Button
              variant="light"
              className="arrow-buttons"
              disabled={currentPage === 0 || loading}
              onClick={() => fetchPage(currentPage - 1)}
            >
              <IconArrowLeft size={14}></IconArrowLeft>
            </Button>
            <span>Page {currentPage + 1}</span>
            <Button
              className="arrow-buttons"
              variant="light"
              disabled={loading || !pageCursors[currentPage + 1]}
              onClick={() => fetchPage(currentPage + 1)}
            >
              <IconArrowRight size={14} />
            </Button>
          </Group>
          {/* <button
            onClick={() => fetchPage(currentPage - 1)}
            disabled={currentPage === 0 || loading}
          >
            ← Previous
          </button>

          <span>Page {currentPage + 1}</span>

          <button
            onClick={() => fetchPage(currentPage + 1)}
            disabled={loading || !pageCursors[currentPage + 1]}
          >
            Next →
          </button> */}
        </div>
      </div>
    </div>
  );
}
