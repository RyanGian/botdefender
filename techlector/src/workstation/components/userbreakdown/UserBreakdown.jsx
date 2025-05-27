import { useEffect, useState } from "react";
import "./UserBreakdown.css";
import { AreaChart } from "@mantine/charts";
import { Input, Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { countries } from "./countries";
import { Loader } from "@mantine/core";

export default function UserBreakdown({
  selectedCountry,
  loadingState,
  setLoadingState,
  refresh,
}) {
  const [userData, setUserData] = useState(null);
  const [series, setSeries] = useState([]);

  async function getUserAttacksByCountry(country) {
    try {
      const response = await fetch(
        `http://localhost:8080/countries/users-attacks?country=${country}`
      );
      const result = await response.json();
      // console.log("Raw Result:", result);
      return result;
    } catch (error) {
      console.error("Error fetching attacks:", error);
    }
  }

  useEffect(() => {
    async function fetchAndTransform() {
      const rawDataResponse = await getUserAttacksByCountry(selectedCountry);
      const rawData = rawDataResponse?.data || [];

      // Extract all unique usernames (keys) across all date entries
      const userKeys = new Set();
      rawData.forEach((item) => {
        const date = Object.keys(item)[0];
        const users = item[date];
        Object.keys(users).forEach((name) => userKeys.add(name));
      });

      const allUsernames = Array.from(userKeys);

      // Create a normalized array where every entry has every username key
      const transformed = rawData.map((item) => {
        const date = Object.keys(item)[0];
        const values = item[date];

        const filled = {};
        Object.entries(values).forEach(([key, value]) => {
          filled[key] = Number(value);
        });
        return { date, ...filled };
      });

      //Sort the months
      const sorted = transformed.sort((a, b) => {
        const parseDate = (str) => new Date(str); // relies on "Month YYYY" format
        return parseDate(a.date) - parseDate(b.date);
      });
      setUserData(sorted);

      // Generate the series config dynamically
      // const getRandomColor = () => {
      //   const hue = Math.floor(Math.random() * 360);
      //   return `hsl(${hue}, 70%, 50%)`;
      // };

      const generatedSeries = allUsernames.map((name, index) => ({
        name,
        color: "indigo.8",
      }));

      setSeries(generatedSeries);
      setLoadingState(false);
    }

    if (selectedCountry !== "") {
      fetchAndTransform();
    }
  }, [selectedCountry, refresh]);

  return (
    <div className="userbreakdown-container">
      {/* {console.log(selectedCountry)} */}
      {/* Loading State */}
      {loadingState && (
        <div className="userbreakdown-loading">
          <Loader color="blue" />
        </div>
      )}

      {/* Placeholder State */}
      {!loadingState && !userData && (
        <div className="userbreakdown-placeholder">
          Please select a country on the map for a user request breakdown
        </div>
      )}

      {/* Graph State */}
      {!loadingState && userData && (
        <>
          <div className="userbreakdown-title">
            User requests breakdown by month: {selectedCountry}
          </div>
          <div className="userbreakdown-chart">
            <AreaChart
              h={300}
              data={userData}
              dataKey="date"
              series={series}
              withPointLabels
            />
          </div>
        </>
      )}
    </div>
  );
}
