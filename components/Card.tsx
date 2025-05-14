"use client";

import styled from "styled-components";
import React from "react";
import { WeatherCardTypes } from "@/types";

const CardContainer = styled.div`
  background: linear-gradient(to right bottom, #87ceeb, #4682b4);
  border-radius: clamp(16px, 4vw, 20px);
  padding: clamp(1rem, 3vw, 2rem);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  color: white;
  width: clamp(250px, 80vw, 350px);
  transition: transform 0.2s ease;
  margin: 1rem;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
    margin: 0.5rem;
  }
`;

const Temperature = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin: 0;
  font-weight: 700;
  line-height: 1.2;
`;

const Location = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  margin: 0.5rem 0;
  font-weight: 500;
  word-break: break-word;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-top: clamp(0.8rem, 2vw, 1rem);
  flex-wrap: wrap;

  @media (max-width: 320px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0.5rem;

  span:first-child {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    font-weight: 500;
  }

  span:last-child {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    opacity: 0.8;
  }
`;

const Condition = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin: 0.5rem 0;
  opacity: 0.9;
`;

const WeatherCard = ({
  temperature,
  location,
  humidity,
  windSpeed,
  condition,
}: WeatherCardTypes) => {
  return (
    <CardContainer>
      <Temperature>{temperature}°C</Temperature>
      <Location>{location}</Location>
      <Condition>{condition}</Condition>
      <WeatherInfo>
        <WeatherDetail>
          <span>{humidity}%</span>
          <span>Humidity</span>
        </WeatherDetail>
        <WeatherDetail>
          <span>{windSpeed} km/h</span>
          <span>Wind Speed</span>
        </WeatherDetail>
      </WeatherInfo>
    </CardContainer>
  );
};

export default WeatherCard;
