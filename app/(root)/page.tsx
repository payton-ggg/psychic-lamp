"use client";

import WeatherCard from "@/components/Card";
import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  max-width: 500px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4682b4;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right bottom, #87ceeb, #4682b4);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const getWeatherData = async (country: string, limit: number) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const data = await response.json();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]["lat"]}&lon=${data[0]["lon"]}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    return res.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

const Home = () => {
  const [country, setCountry] = useState("");
  const [limit, setLimit] = useState("");

  const isFormValid = country && limit;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const data = await getWeatherData(country, parseInt(limit));
      console.log(data);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country name"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="limit">Limit</Label>
          <Input
            id="limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Enter limit number"
            min="1"
            max="10"
            required
          />
        </InputGroup>
        <SubmitButton type="submit" disabled={!isFormValid}>
          Get Weather
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default Home;
