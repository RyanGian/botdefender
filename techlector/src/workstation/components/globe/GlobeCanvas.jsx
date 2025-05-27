import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useLayoutEffect } from "react";

export default function GlobeCanvas({ selectedCountry, setSelectedCountry }) {
  const globeRef = useRef();
  const containerRef = useRef();

  const [countries, setCountries] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // const selectCountry = (country) => {
  //   setSelectedCountry(country);
  // };

  const [highlightedCountries, setHighlightedCountries] = useState([]);

  // const highlightedCountries = ["United States", "Canada", "Brazil"];

  // Load countries GeoJSON
  useEffect(() => {
    fetch("/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  useEffect(() => {
    fetchHighlightedCountries();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [globeRef.current]);

  // ResizeObserver to track parent size
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchHighlightedCountries = async () => {
    try {
      const url = new URL("http://localhost:8080/countries");
      const res = await fetch(url);
      const json = await res.json();

      const allHighlightedCountries = json.data.reduce((acc, item) => {
        const countryName = Object.keys(item)[0];
        acc[countryName] = item[countryName];
        return acc;
      }, {});

      setHighlightedCountries(allHighlightedCountries);
      console.log(JSON.stringify(allHighlightedCountries));
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const getPolygonCapColor = (country) => {
    if (Object.keys(highlightedCountries).includes(country.properties.ADMIN)) {
      if (highlightedCountries[country.properties.ADMIN] === 0) {
        return "rgba(22, 128, 75, 0.8)"; // Highlighted color (red)
      } else {
        return "rgba(255, 0, 0, 0.8)"; // Highlighted color (red)
      }
    }
    return "rgba(238, 243, 243, 0.6)"; // Default color (cyan)
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
          polygonsData={countries}
          polygonSideColor={() => "rgba(11, 65, 146, 0.15)"}
          polygonCapColor={getPolygonCapColor}
          polygonStrokeColor={() =>
            localStorage.getItem("isDark") === "true" ? "gray" : "white"
          }
          polygonLabel={({ properties }) =>
            `<div style="text-align: left;">
              <strong>${properties.ADMIN}</strong><br/>
              Population: ${Number(properties.POP_EST).toLocaleString()}<br/>
              Region: ${properties.REGION_UN || "N/A"}<br/>
              Users Banned: ${highlightedCountries[properties.ADMIN] ?? "N/A"}
            </div>`
          }
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="rgba(209, 209, 209, 0)"
          atmosphereAltitude={0.15}
          onPolygonClick={(polygon) => {
            // console.log("Clicked country:", polygon.properties.ADMIN);
            const countryName = polygon.properties.ADMIN;
            // console.log(polygon);
            setSelectedCountry(countryName);
            // console.log("typeof setSelectedCountry", typeof setSelectedCountry);
            // console.log("asfasdfasd");
          }}
        />
      )}
    </div>
  );
}
