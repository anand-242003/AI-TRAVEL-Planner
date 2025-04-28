import React from 'react';
import { useLocation } from 'react-router-dom';

export default function TripDetails() {
  const { state } = useLocation();
  const tripData = state?.tripData;

  if (!tripData) {
    return <div>No trip data available</div>;
  }

  return (
    <div className="trip-details-container">
      <h2>Trip to {tripData.tripDetails.location}</h2>
      <p>Duration: {tripData.tripDetails.duration}</p>
      <p>Budget: {tripData.tripDetails.budget}</p>
      <p>Travelers: {tripData.tripDetails.travelers}</p>

      <h3>Hotel Options</h3>
      <ul>
        {tripData.hotelOptions.map((hotel, index) => (
          <li key={index}>
            <h4>{hotel.hotelName}</h4>
            <p>Address: {hotel.hotelAddress}</p>
            <p>Price: {hotel.price}</p>
            <p>Rating: {hotel.rating}</p>
            <p>{hotel.description}</p>
          </li>
        ))}
      </ul>

      <h3>Itinerary</h3>
      {tripData.itinerary.map((day, index) => (
        <div key={index}>
          <h4>Day {day.day} ({day.bestTimeToVisit})</h4>
          <ul>
            {day.plan.map((place, placeIndex) => (
              <li key={placeIndex}>
                <h5>{place.placeName}</h5>
                <p>{place.placeDetails}</p>
                <p>Ticket Pricing: {place.ticketPricing}</p>
                <p>Rating: {place.rating}</p>
                <p>Time to Spend: {place.timeTravel}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}