import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TripDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  let tripData = location.state?.tripData;

  // Fallback: Try loading from localStorage
  if (!tripData) {
    const storedTripData = localStorage.getItem('tripData');
    if (storedTripData) {
      tripData = storedTripData;
    } else {
      navigate('/create-trip');
      return null;
    }
  }

  // Parse data if needed
  let parsedTripData;
  try {
    parsedTripData = typeof tripData === 'string' ? JSON.parse(tripData) : tripData;
  } catch (error) {
    console.error('Failed to parse tripData:', error);
    navigate('/create-trip');
    return null;
  }

  // Validate structure
  if (
    !parsedTripData ||
    typeof parsedTripData !== 'object' ||
    !parsedTripData.location ||
    !Array.isArray(parsedTripData.hotels) ||
    !Array.isArray(parsedTripData.itinerary)
  ) {
    console.error('Invalid trip data:', parsedTripData);
    navigate('/create-trip');
    return null;
  }

  return (
    <div>
      <h1>Trip Details for {parsedTripData.location}</h1>
      <h2>Duration: {parsedTripData.days} Days</h2>

      <h3>Hotels</h3>
      <ul>
        {parsedTripData.hotels.length > 0 ? (
          parsedTripData.hotels.map((hotel, index) => (
            <li key={index}>
              <strong>{hotel.hotelName}</strong> - ₹{hotel.price} - Rating: {hotel.rating}
              <p>{hotel.description}</p>
              <p>Address: {hotel.hotelAddress}</p>
              <img
                src={hotel.hotelImageUrl}
                alt={hotel.hotelName}
                style={{ width: '200px', borderRadius: '8px', marginTop: '5px' }}
              />
            </li>
          ))
        ) : (
          <li>No hotels available.</li>
        )}
      </ul>

      <h3>Itinerary</h3>
      {parsedTripData.itinerary.length > 0 ? (
        parsedTripData.itinerary.map((day, dayIndex) => (
          <div key={dayIndex}>
            <h4>Day {day.day}</h4>
            <ul>
              {Array.isArray(day.places) && day.places.length > 0 ? (
                day.places.map((place, placeIndex) => (
                  <li key={placeIndex}>
                    <strong>{place.placeName}</strong> - ₹{place.ticketPricing} - Rating: {place.rating}
                    <p>{place.placeDetails}</p>
                    <p>Time to Travel: {place.timeToTravel}</p>
                    <img
                      src={place.placeImageUrl}
                      alt={place.placeName}
                      style={{ width: '200px', borderRadius: '8px', marginTop: '5px' }}
                    />
                  </li>
                ))
              ) : (
                <li>No places available for this day.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No itinerary available.</p>
      )}

      {parsedTripData.bestTimeToVisit && (
        <h4 style={{ marginTop: '20px' }}>Best Time to Visit: {parsedTripData.bestTimeToVisit}</h4>
      )}
    </div>
  );
}

export default TripDetails;
