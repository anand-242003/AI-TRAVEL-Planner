import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectionTravelList } from '@/constant/option';
import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export default function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: '',
    Budget: '',
    TravelWith: '',
  });
  const [openDialog,setopenDialog]=useState(false)

  const handleInputChanges = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    const users=localStorage.getItem("user")
    if (!users){
      setopenDialog(true)
      return ;
    }
    if (!formData.location || !formData.noOfDays || !formData.Budget || !formData.TravelWith) {
      toast('Please fill all details');
      return;
    }

    const Final_prompt = AI_PROMPT
      .replace('{location}', formData.location.label)
      .replace('{totalDays}', formData.noOfDays)
      .replace('{Traveller}', formData.TravelWith)
      .replace('{budget}', formData.Budget);
      console.log(Final_prompt)

    try {
      const result = await model.generateContent(Final_prompt);
      const responseText = result.response.text();
      console.log('Trip Data:', responseText);

      // Add logic to display trip or navigate to another page
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('Error generating trip: ' + error.message);
    }
  };

  return (
    <div className="trip-container">
      <h2 className="trip-title">Tell us what you like!</h2>
      <p className="trip-subtitle">
        Share a few details, and our AI-powered trip planner will craft a personalized itinerary tailored to your vibe, interests, and dream destinations.
      </p>

      <div className="trip-form">
        <div className="trip-section">
          <h2 className="trip-section-title">What's your dream destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChanges('location', v);
              },
              className: 'google-autocomplete',
            }}
          />
        </div>

        <div className="trip-section">
          <h2 className="trip-section-title">How many days for your adventure?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChanges('noOfDays', e.target.value)}
            className="trip-input"
          />
        </div>

        <div className="trip-section">
          <h2 className="trip-section-title">What's your budget vibe?</h2>
          <div className="trip-option-grid">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChanges('Budget', item.title)}
                className={`trip-option-card ${formData.Budget === item.title ? 'active' : ''}`}
              >
                <div className="trip-option-icon">{item.icon}</div>
                <div className="trip-option-title">{item.title}</div>
                <div className="trip-option-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trip-section">
          <h2 className="trip-section-title">Who's joining the journey?</h2>
          <div className="trip-option-grid">
            {SelectionTravelList.map((option) => (
              <div
                key={option.id}
                onClick={() => handleInputChanges('TravelWith', option.people)}
                className={`trip-option-card ${formData.TravelWith === option.people ? 'active' : ''}`}
              >
                <div className="trip-option-icon">{option.icon}</div>
                <div className="trip-option-title">{option.title}</div>
                <div className="trip-option-description">{option.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trip-submit">
        <Button onClick={OnGenerateTrip} className="trip-button">
          Generate Trip
        </Button>
      </div>
      <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
}