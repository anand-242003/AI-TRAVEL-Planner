import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TripDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData;

  // If no trip data is available, redirect to /create-trip
  if (!tripData) {
    navigate('/create-trip');
    return null;
  }

  let parsedTripData;
  try {
    parsedTripData = typeof tripData === 'string' ? JSON.parse(tripData) : tripData;
  } catch (error) {
    console.error('Error parsing tripData:', error);
    navigate('/create-trip'); // Redirect if parsing fails
    return null;
  }

  // Additional check to ensure parsedTripData is an object with required properties
  if (!parsedTripData || typeof parsedTripData !== 'object' || !parsedTripData.location) {
    navigate('/create-trip');
    return null;
  }

  return (
    <div>
      <h1>Trip Details for {parsedTripData.location}</h1>
      <h2>Duration: {parsedTripData.days} Days</h2>
      <h3>Hotels</h3>
      <ul>
        {parsedTripData.hotels?.map((hotel, index) => (
          <li key={index}>
            <strong>{hotel.hotelName}</strong> - ${hotel.price} - Rating: {hotel.rating}
            <p>{hotel.description}</p>
            <p>Address: {hotel.hotelAddress}</p>
            <img src={hotel.hotelImageUrl} alt={hotel.hotelName} style={{ width: '200px' }} />
          </li>
        ))}
      </ul>
      <h3>Itinerary</h3>
      {parsedTripData.itinerary?.map((day, dayIndex) => (
        <div key={dayIndex}>
          <h4>Day {day.day}</h4>
          <ul>
            {day.places?.map((place, placeIndex) => (
              <li key={placeIndex}>
                <strong>{place.placeName}</strong> - ${place.ticketPricing} - Rating: {place.rating}
                <p>{place.placeDetails}</p>
                <p>Time to Travel: {place.timeToTravel}</p>
                <img src={place.placeImageUrl} alt={place.placeName} style={{ width: '200px' }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TripDetails;