import "./CountryComparison.css";
import { LineChart } from "@mantine/charts";

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

  return (
    <div className="countrycomparison-container">
      <div className="gradient">Country Request Gradient</div>

      <LineChart
        className="heat-graph"
        h={300}
        data={data}
        series={[{ name: "temperature", label: "Avg. Temperature" }]}
        dataKey="date"
        type="gradient"
        gradientStops={[
          { offset: 0, color: "red.6" },
          { offset: 20, color: "orange.6" },
          { offset: 40, color: "yellow.5" },
          { offset: 70, color: "lime.5" },
          { offset: 80, color: "cyan.5" },
          { offset: 100, color: "blue.5" },
        ]}
        strokeWidth={5}
        curveType="natural"
      />
    </div>
  );
}
