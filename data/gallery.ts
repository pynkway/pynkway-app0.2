import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";
import profile6 from "@/assets/profile-6.jpg";

export interface GalleryImage {
  id: string;
  creatorId: string;
  src: string;
  caption: string;
  isPublic: boolean;
  order: number;
}

export const mockGallery: GalleryImage[] = [
  { id: "g1", creatorId: "1", src: profile1, caption: "Beach photoshoot", isPublic: true, order: 0 },
  { id: "g2", creatorId: "1", src: profile2, caption: "Evening look", isPublic: true, order: 1 },
  { id: "g3", creatorId: "1", src: profile3, caption: "Travel vibes", isPublic: true, order: 2 },
  { id: "g4", creatorId: "1", src: profile4, caption: "Studio session", isPublic: false, order: 3 },
  { id: "g5", creatorId: "3", src: profile3, caption: "Miami sunset", isPublic: true, order: 0 },
  { id: "g6", creatorId: "3", src: profile5, caption: "Pool day", isPublic: true, order: 1 },
  { id: "g7", creatorId: "4", src: profile4, caption: "Red carpet", isPublic: true, order: 0 },
  { id: "g8", creatorId: "4", src: profile6, caption: "Casual shoot", isPublic: true, order: 1 },
];
