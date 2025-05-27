import "./AttackInput.css";
import { useState } from "react";
import { Group, TextInput, Autocomplete, Button, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { countries } from "./countries";

export default function AttackInput({ toggleRefresh }) {
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
            const result = await sendAttack(values.name.trim(), values.country);
            setSubmitted(true);
            setError(null);
            setTimeout(() => setSubmitted(false), 2000);
          } catch (err) {
            console.error("Submission error:", err.message);
            setError(err.message);
            setSubmitted(false);
            setTimeout(() => setError(null), 2000);
          } finally {
            setLoading(false); // End loading
            toggleRefresh();
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
