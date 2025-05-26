import { useEffect, useState } from "react";
import "./CountryComparison.css";
import { AreaChart } from "@mantine/charts";
import { Input, Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { countries } from "./countries";

export default function CountryComparison({
  selectedCountry,
  setSelectedCountry,
}) {
  const [userData, setUserData] = useState([]);
  const [series, setSeries] = useState([]);

  async function getUserAttacksByCountry(country) {
    try {
      const response = await fetch(
        `http://localhost:8080/countries/users-attacks?country=${country}`
      );
      const result = await response.json();
      console.log("Raw Result:", result);
      return result;
    } catch (error) {
      console.error("Error fetching attacks:", error);
      return { data: [] };
    }
  }
  useEffect(() => {
    console.log(selectedCountry);
  }, [selectedCountry]);

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

      // Sort usernames to put "f" first
      allUsernames.sort((a, b) =>
        a === "f" ? -1 : b === "f" ? 1 : a.localeCompare(b)
      );

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

      // console.log("Transformed:", transformed);
      // console.log("Series:", generatedSeries);
    }

    fetchAndTransform();
  }, [selectedCountry]);

  return (
    <div className="countrycomparison-container">
      <div className="countrycomparison-title">
        User requests breakdown by month: {selectedCountry}
      </div>
      {/* <div className="country-search">
        <Autocomplete
          leftSection={<IconSearch></IconSearch>}
          size="md"
          radius="md"
          placeholder="Search a Country"
          style={{ width: "200px", marginBottom: "1rem" }}
          data={countries}
        />
      </div> */}
      <div style={{ width: "95%" }}>
        {
          <AreaChart
            h={300}
            data={userData}
            dataKey="date"
            // type="gradient"
            series={series}
            withPointLabels
          />
        }
      </div>
    </div>
  );
}
