import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';
   import { AI_PROMPT, SelectBudgetOptions, SelectionTravelList } from '@/constant/option';
   import { GoogleGenerativeAI } from '@google/generative-ai';
   import React, { useEffect, useState } from 'react';
   import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
   import { toast } from 'sonner';
   import { useNavigate } from 'react-router-dom';
   import { useAuth } from '../context/authcontext.jsx';

   // Initialize the Google Generative AI client
   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

   export default function CreateTrip() {
     const { user, login } = useAuth();
     const navigate = useNavigate();
     const [place, setPlace] = useState(null);
     const [formData, setFormData] = useState({
       location: null,
       noOfDays: '',
       Budget: '',
       TravelWith: '',
     });
     const [isGenerating, setIsGenerating] = useState(false);

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
       if (isGenerating) return;

       if (!formData.location || !formData.noOfDays || !formData.Budget || !formData.TravelWith) {
         toast('Please fill all details');
         return;
       }
       if (parseInt(formData.noOfDays) <= 0) {
         toast('Number of days must be positive');
         return;
       }

       const Final_prompt = AI_PROMPT
         .replace('{location}', formData.location.label)
         .replace('{totalDays}', formData.noOfDays)
         .replace('{Traveller}', formData.TravelWith)
         .replace('{budget}', formData.Budget);
       console.log(Final_prompt);

       if (!user) {
         if (!window.google) {
           toast('Google Sign-In script not loaded. Please try again.');
           return;
         }

         // Initialize Google OAuth client
         const client = window.google.accounts.oauth2.initTokenClient({
           client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
           scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
           callback: async (response) => {
             try {
               if (response.access_token) {
                 // Fetch user info using the access token
                 const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                   headers: { Authorization: `Bearer ${response.access_token}` },
                 });
                 const userInfo = await userInfoResponse.json();
                 login(userInfo, response.access_token);
                 toast('Signed in successfully!');

                 // Generate trip after sign-in
                 setIsGenerating(true);
                 try {
                   const result = await model.generateContent(Final_prompt);
                   const responseText = result.response.text();
                   JSON.parse(responseText); // Validate JSON
                   console.log('Trip Data:', responseText);
                   navigate('/trip-details', { state: { tripData: responseText } });
                 } catch (error) {
                   console.error('Error generating trip:', error);
                   toast('Error generating trip: ' + error.message);
                 } finally {
                   setIsGenerating(false);
                 }
               } else {
                 toast('Sign-in failed: No access token received.');
               }
             } catch (error) {
               console.error('Sign-in error:', error);
               toast('Sign-in failed: ' + error.message);
             }
           },
         });

         // Trigger Google Sign-In popup
         client.requestAccessToken();
         return;
       }

       // If user is authenticated, generate trip directly
       setIsGenerating(true);
       try {
         const result = await model.generateContent(Final_prompt);
         let responseText =result.response.text();
         const cleanResponse = responseText.replace(/```json```/g, '').trim();
         console.log('Response Text:', responseText);

        JSON.parse(cleanResponse); 
         console.log('Trip Data:', responseText);
         navigate('/trip-details', { state: { tripData: responseText } });
       } catch (error) {
         console.error('Error generating trip:', error);
         toast('Error generating trip: ' + error.message);
       } finally {
         setIsGenerating(false);
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
               min="1"
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
           <Button onClick={OnGenerateTrip} disabled={isGenerating} className="trip-button">
             {isGenerating ? 'Generating...' : 'Generate Trip'}
           </Button>
         </div>
       </div>
     );
   }