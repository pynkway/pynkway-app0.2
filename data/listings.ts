import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";
import profile6 from "@/assets/profile-6.jpg";

export type ServiceCategory = "companion" | "dinner" | "travel" | "massage" | "events" | "virtual";

export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  priceFrom: number;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  online: boolean;
  services: string[];
  gallery: string[];
}

export const categories: { value: ServiceCategory | "all"; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "✨" },
  { value: "companion", label: "Companion", icon: "💎" },
  { value: "dinner", label: "Dinner Date", icon: "🍷" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "massage", label: "Wellness", icon: "🧖" },
  { value: "events", label: "Events", icon: "🎭" },
  { value: "virtual", label: "Virtual", icon: "💬" },
];

export const profiles: Profile[] = [
  {
    id: "1",
    name: "Sophia",
    age: 26,
    photo: profile1,
    category: "companion",
    tagline: "Your perfect evening companion",
    description: "Elegant, well-traveled, and great conversationalist. I love fine dining, art galleries, and making every moment unforgettable. Available for dinner dates, events, and exclusive companionship.",
    priceFrom: 250,
    location: "Manhattan, NY",
    rating: 4.9,
    reviews: 127,
    verified: true,
    online: true,
    services: ["Dinner Date", "Events", "Travel Companion", "Private Meeting"],
    gallery: [profile1],
  },
  {
    id: "2",
    name: "James",
    age: 28,
    photo: profile2,
    category: "dinner",
    tagline: "Fine dining & unforgettable nights",
    description: "Charming and sophisticated. Let me take you to the best restaurants in the city for an evening you'll always remember.",
    priceFrom: 200,
    location: "Brooklyn, NY",
    rating: 4.8,
    reviews: 89,
    verified: true,
    online: false,
    services: ["Dinner Date", "Wine Tasting", "Cocktail Evening"],
    gallery: [profile2],
  },
  {
    id: "3",
    name: "Isabella",
    age: 24,
    photo: profile3,
    category: "travel",
    tagline: "Adventure awaits with me",
    description: "Free-spirited travel lover. From weekend getaways to exotic destinations, I'm the perfect travel companion for any adventure.",
    priceFrom: 350,
    location: "Miami, FL",
    rating: 5.0,
    reviews: 64,
    verified: true,
    online: true,
    services: ["Travel Companion", "Beach Day", "City Tour", "Weekend Getaway"],
    gallery: [profile3],
  },
  {
    id: "4",
    name: "Olivia",
    age: 27,
    photo: profile4,
    category: "events",
    tagline: "Your plus-one for any occasion",
    description: "Stylish, confident, and always camera-ready. Perfect for galas, parties, and exclusive events where you want to make an impression.",
    priceFrom: 300,
    location: "Los Angeles, CA",
    rating: 4.7,
    reviews: 42,
    verified: true,
    online: true,
    services: ["Events", "Gala Companion", "Party Date", "Photo Companion"],
    gallery: [profile4],
  },
  {
    id: "5",
    name: "Emma",
    age: 25,
    photo: profile5,
    category: "massage",
    tagline: "Relaxation & wellness specialist",
    description: "Certified wellness enthusiast offering rejuvenating experiences. Unwind and relax in a peaceful, luxurious setting.",
    priceFrom: 150,
    location: "Chicago, IL",
    rating: 4.9,
    reviews: 93,
    verified: true,
    online: false,
    services: ["Wellness Session", "Spa Day", "Relaxation", "Yoga Partner"],
    gallery: [profile5],
  },
  {
    id: "6",
    name: "Mia",
    age: 23,
    photo: profile6,
    category: "virtual",
    tagline: "Connect from anywhere",
    description: "Fun, flirty, and always online. Video calls, voice chats, and virtual companionship wherever you are.",
    priceFrom: 50,
    location: "Anywhere",
    rating: 4.8,
    reviews: 215,
    verified: true,
    online: true,
    services: ["Video Call", "Voice Chat", "Messaging", "Virtual Date"],
    gallery: [profile6],
  },
];
