import deskImage from '@assets/generated_images/modern_minimalist_white_desk_for_home_office.png';
import sofaImage from '@assets/generated_images/comfortable_beige_fabric_sofa.png';
import kidsBedImage from '@assets/generated_images/modern_kids_single_bed_white_wood.png';
import spaceRoomImage from '@assets/generated_images/space_themed_kids_bedroom_with_modern_furniture.png';

export const products = [
  {
    id: 1,
    name: "Roy Motion Desk",
    price: 459000,
    category: "Home Office",
    image: deskImage,
    description: "A smart motion desk that adjusts to your perfect height. Essential for modern remote work.",
    features: ["Height Adjustable", "Cable Management", "Anti-collision"]
  },
  {
    id: 2,
    name: "Copenhagen Sofa",
    price: 890000,
    category: "Living Room",
    image: sofaImage,
    description: "Nordic style fabric sofa. Water-repellent and stain-resistant.",
    features: ["Aquaclean Fabric", "Modular Design", "High Density Foam"]
  },
  {
    id: 3,
    name: "Tinkle Kids Bed",
    price: 320000,
    category: "Kids Room",
    image: kidsBedImage,
    description: "Safe and cozy bed for your little ones. Rounded corners for safety.",
    features: ["E0 Grade Wood", "Safety Guard", "Low Height"]
  }
];

export const spaceConcept = {
  title: "Space Explorer's Room",
  image: spaceRoomImage,
  description: "A dream room for future astronauts. Features a custom arrangement of Tinkle Bed and Roy Desk in a Deep Space Navy theme.",
  products: [1, 3], // Desk and Kids Bed
  totalPrice: 459000 + 320000 + 150000 // Added decoration cost
};
