import "./AttackInput.css";
import { useState } from "react";
import { Group, TextInput, Autocomplete, Button, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react"; // For success icon

export default function AttackInput() {
  const countries = [
    "Afghanistan",
    "Angola",
    "Albania",
    "United Arab Emirates",
    "Argentina",
    "Armenia",
    "Antarctica",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Burundi",
    "Belgium",
    "Benin",
    "Burkina Faso",
    "Bangladesh",
    "Bulgaria",
    "The Bahamas",
    "Belarus",
    "Belize",
    "Bolivia",
    "Brazil",
    "Brunei",
    "Bhutan",
    "Botswana",
    "Canada",
    "Switzerland",
    "Chile",
    "China",
    "Ivory Coast",
    "Cameroon",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Northern Cyprus",
    "Cyprus",
    "Czechia",
    "Germany",
    "Djibouti",
    "Denmark",
    "Dominican Republic",
    "Algeria",
    "Ecuador",
    "Egypt",
    "Eritrea",
    "Spain",
    "Estonia",
    "Ethiopia",
    "Finland",
    "Fiji",
    "Falkland Islands",
    "France",
    "Gabon",
    "United Kingdom",
    "Georgia",
    "Ghana",
    "Guinea",
    "Gambia",
    "Guinea Bissau",
    "Equatorial Guinea",
    "Greece",
    "Greenland",
    "Guatemala",
    "Guyana",
    "Honduras",
    "Croatia",
    "Haiti",
    "Hungary",
    "Indonesia",
    "India",
    "Ireland",
    "Iran",
    "Iraq",
    "Iceland",
    "Israel",
    "Italy",
    "Jamaica",
    "Jordan",
    "Japan",
    "Kazakhstan",
    "Kenya",
    "Kyrgyzstan",
    "Cambodia",
    "South Korea",
    "Kosovo",
    "Kuwait",
    "Laos",
    "Lebanon",
    "Liberia",
    "Libya",
    "Sri Lanka",
    "Lesotho",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Morocco",
    "Moldova",
    "Madagascar",
    "Mexico",
    "North Macedonia",
    "Mali",
    "Myanmar",
    "Montenegro",
    "Mongolia",
    "Mozambique",
    "Mauritania",
    "Malawi",
    "Malaysia",
    "Namibia",
    "New Caledonia",
    "Niger",
    "Nigeria",
    "Nicaragua",
    "Netherlands",
    "Norway",
    "Nepal",
    "New Zealand",
    "Oman",
    "Pakistan",
    "Panama",
    "Peru",
    "Philippines",
    "Papua New Guinea",
    "Poland",
    "Puerto Rico",
    "North Korea",
    "Portugal",
    "Paraguay",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Western Sahara",
    "Saudi Arabia",
    "Sudan",
    "South Sudan",
    "Senegal",
    "Solomon Islands",
    "Sierra Leone",
    "El Salvador",
    "Somaliland",
    "Somalia",
    "Serbia",
    "Suriname",
    "Slovakia",
    "Slovenia",
    "Sweden",
    "Eswatini",
    "Syria",
    "Chad",
    "Togo",
    "Thailand",
    "Tajikistan",
    "Turkmenistan",
    "Timor Leste",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Taiwan",
    "Tanzania",
    "Uganda",
    "Ukraine",
    "Uruguay",
    "United States of America",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Vanuatu",
    "West Bank",
    "Yemen",
    "South Africa",
    "Zambia",
    "Zimbabwe",
  ].sort((a, b) => a.localeCompare(b));

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // <-- Loading state

  const form = useForm({
    initialValues: {
      name: "",
      country: "",
    },

    validate: {
      name: (value) => {
        if (!value.trim()) return "Name is required";
        if (!/^[a-zA-Z0-9 ]+$/.test(value)) return "Name must be alphanumeric";
        return null;
      },
      country: (value) => (value ? null : "Please select a country"),
    },
  });

  async function sendAttack(name, country) {
    try {
      const response = await fetch("http://localhost:8080/attack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, country }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="attackinput-outer-container">
      <form
        onSubmit={form.onSubmit(async (values) => {
          setLoading(true); // Start loading
          try {
            const result = await sendAttack(values.name, values.country);
            setSubmitted(true);
            setError(null);
            setTimeout(() => setSubmitted(false), 1000);
          } catch (err) {
            console.error("Submission error:", err.message);
            setError(err.message);
            setSubmitted(false);
            setTimeout(() => setError(null), 1500);
          } finally {
            setLoading(false); // End loading
          }
        })}
        className="attackinput-container"
      >
        <div style={{ marginBottom: "1rem" }}>Trigger request</div>

        <TextInput
          label="Name"
          size="md"
          radius="md"
          placeholder="Name"
          value={form.values.name}
          onChange={(e) =>
            form.setFieldValue("name", e.currentTarget.value.toLowerCase())
          }
          style={{ width: "200px", marginBottom: "1rem" }}
          error={form.errors.name}
        />

        <Autocomplete
          label="Country"
          size="md"
          radius="md"
          placeholder="Select a Country"
          style={{ width: "200px", marginBottom: "1rem" }}
          data={countries}
          {...form.getInputProps("country")}
          error={form.errors.country}
        />

        <div className="submit-div">
          <Group mt="md">
            <Button
              style={{ position: "relative", marginLeft: "110px" }}
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Group>

          {submitted && (
            <Alert
              icon={<IconCheck size={16} />}
              title="Success!"
              color="green"
              style={{
                position: "relative",
                width: "200px",
                marginTop: "1rem",
              }}
            >
              Attack logged successfully.
            </Alert>
          )}

          {error && (
            <Alert
              title="Error"
              color="red"
              style={{
                position: "relative",
                width: "200px",
                marginTop: "1rem",
              }}
            >
              {error}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
