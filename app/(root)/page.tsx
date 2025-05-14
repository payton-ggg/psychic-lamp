"use client";

import WeatherCard from "@/components/Card";
import { getWeatherData } from "@/features/getWeatherData";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [country, setCountry] = useState("");
  const [limit, setLimit] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    const savedWeather = localStorage.getItem("weatherHistory");
    if (savedWeather) {
      const parsedData = JSON.parse(savedWeather);
      setWeatherData(parsedData);
    }

    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      const { country: savedCountry, limit: savedLimit } =
        JSON.parse(lastSearch);
      setCountry(savedCountry);
      setLimit(savedLimit);
    }
  }, []);

  const isFormValid = country && limit;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem("lastSearch", JSON.stringify({ country, limit }));

      const data = await getWeatherData(country, parseInt(limit));

      const updatedWeatherData = [data, ...weatherData];
      setWeatherData(updatedWeatherData);

      // Save to localStorage
      localStorage.setItem(
        "weatherHistory",
        JSON.stringify(updatedWeatherData)
      );
    }
  };

  const handleRemoveCard = (index: number) => {
    const updatedWeatherData = weatherData.filter((_, i) => i !== index);
    setWeatherData(updatedWeatherData);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedWeatherData));
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
      <CardsContainer>
        {weatherData.map((data, index) => (
          <div key={`${data.name}-${index}`}>
            <WeatherCard
              temperature={Math.round(data.main.temp - 273.15)}
              location={data.name}
              humidity={data.main.humidity}
              windSpeed={Math.round(data.wind.speed * 3.6)}
              condition={data.weather[0].main}
            />
            <RemoveButton onClick={() => handleRemoveCard(index)}>
              Remove
            </RemoveButton>
          </div>
        ))}
      </CardsContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  max-width: 1400px;
  margin: 2rem auto;
  background: rgba(255, 255, 255, 0.95);
  color: black;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  color: #2c3e50;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #4682b4;
    box-shadow: 0 0 0 4px rgba(70, 130, 180, 0.1);
    background: white;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00b4db, #0083b0);
  color: white;
  padding: 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: linear-gradient(135deg, #a0a0a0, #808080);
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  margin: 3rem auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const RemoveButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
  color: white;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Home;
