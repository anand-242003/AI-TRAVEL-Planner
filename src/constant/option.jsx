export const SelectionTravelList = [
    {
      id: 1,
      title: "Just Me",
      description: "I am traveling alone",
      icon: "🧍",
      people: "1"
    },
    {
      id: 2,
      title: "Couple",
      description: "I am traveling with my partner",
      icon: "🧑‍🤝‍🧑",
      people: "2"
    },
    {
      id: 3,
      title: "Family",
      description: "I am traveling with my family",
      icon: "👨‍👩‍👧‍👦",
      people: "4"
    },
    {
      id: 4,
      title: "Friends",
      description: "I am traveling with friends",
      icon: "🧑‍🤝‍🧑🧑‍🤝‍🧑",
      people: "4+"
    }
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: "Cheap",
      description: "Stay conscious of cost",
      icon: "💸"
    },
    {
      id: 2,
      title: "Moderate",
      description: "Keep cost on the average side",
      icon: "💰"
    },
    {
      id: 3,
      title: "Luxury",
      description: "Don't worry about cost",
      icon: "💎"
    }
  ];
 export const AI_PROMPT = 'Generate a travel plan for Location: {location}, for {totalDays} days, for {Traveller}, with a {budget} budget. Provide a list of hotel options including HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, and descriptions. Also, suggest an itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, and time to travel for each location, with a day-by-day plan for {totalDays} days, including the best time to visit. Return the response as a valid JSON object only, without any additional text, Markdown, code blocks, or backticks.';
  