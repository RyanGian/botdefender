import { useEffect, useState } from "react";
import "./CountryComparison.css";
import { AreaChart } from "@mantine/charts";

export default function CountryComparison() {
  const data = [
    { date: "Mar", temperature: 5 },
    { date: "Apr", temperature: 15 },
    { date: "May", temperature: 30 },
    { date: "Jun", temperature: 15 },
    { date: "Jul", temperature: 30 },
    { date: "Aug", temperature: 40 },
    { date: "Sep", temperature: 15 },
    { date: "Oct", temperature: 20 },
    { date: "Nov", temperature: 0 },
  ];

  const [userData, setUserData] = useState(null);

  async function getUserAttacksByCountry(country) {
    try {
      const response = await fetch(
        `http://localhost:5173/countries/users-attacks?country=${country}`
      );
      const result = await response.json();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.error("Error fetching attacks:", error);
    }
  }

  useEffect(() => {
    getUserAttacksByCountry("Australia");
    console.log(JSON.stringify(userData));
  }, []);

  return (
    <div className="countrycomparison-container">
      <div className="gradient">Country Request Gradient</div>

      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        type="stacked"
        series={[
          { name: "date", color: "indigo.6" },
          { name: "temperature", color: "blue.6" },
        ]}
      />
    </div>
  );
}
