import C1 from '../../assets/Images/C1.png';
import C2 from '../../assets/Images/C2.png';
import C3 from '../../assets/Images/C3.png';
import C4 from '../../assets/Images/C4.png';
import C5 from '../../assets/Images/C5.png';
import C6 from '../../assets/Images/C6.png';

export const shirts = [
  {
    id: 'C1',
    name: 'Classic Green Shirt',
    image: C1,
    price: 1499,
    description: 'Casual green shirt perfect for relaxed outings or everyday wear.',
    longDescription: 'This versatile green casual shirt combines comfort with style, featuring a relaxed fit and breathable fabric that makes it perfect for any casual occasion. The subtle texture adds visual interest while maintaining everyday wearability. Made from high-quality cotton, it provides all-day comfort while looking great.',
    details: {
      material: '100% Cotton',
      fit: 'Regular fit',
      care: 'Machine wash cold, tumble dry low'
    },
    reviews: [
    ]
  },
  {
    id: 'C2',
    name: 'Modern Blue Shirt',
    image: C2,
    price: 1999,
    description: 'Comfortable blue casual shirt suited for both work and leisure.',
    longDescription: 'Our Modern Blue Casual Shirt bridges the gap between professional and casual wear. The contemporary cut and versatile blue shade make it easy to dress up with slacks for the office or down with jeans for a weekend outing. The slight stretch in the fabric ensures comfort throughout your day.',
    details: {
      material: '95% Cotton, 5% Elastane',
      fit: 'Slim fit',
      care: 'Machine wash cold, do not bleach'
    },
    reviews: [
      { id: 1, rating: 5, user: 'Michael T.', comment: 'Perfect for casual Fridays at work! Gets compliments every time.' },
      { id: 2, rating: 4, user: 'David L.', comment: 'Fits great and good quality. The slim fit is flattering but not too tight.' }
    ]
  },
  {
    id: 'C3',
    name: 'Vibrant Red Shirt',
    image: C3,
    price: 1799,
    description: 'Trendy red casual shirt ideal for summer vibes and weekend plans.',
    longDescription: 'Make a statement with our Vibrant Red Summer Shirt, designed to bring energy to your summer wardrobe. The lightweight fabric ensures you stay cool during hot days, while the eye-catching red hue adds personality to any outfit. Perfect for festivals, beach outings, or simply making an impression on a sunny day.',
    details: {
      material: '100% Linen',
      fit: 'Regular fit',
      care: 'Hand wash cold, line dry'
    },
    reviews: [
      { id: 1, rating: 5, user: 'Alex R.', comment: 'The color is amazing! Perfect for summer parties.' },
      { id: 2, rating: 3, user: 'Emma W.', comment: 'Nice shirt but runs slightly large. Consider sizing down.' }
    ]
  },
  {
    id: 'C4',
    name: 'Cozy Brown Jersey',
    image: C4,
    price: 2499,
    description: 'Plain brown jersey, great for chilly days and cozy layers.',
    longDescription: 'Our Cozy Brown Jersey offers exceptional comfort during cooler weather. The soft, insulating fabric retains heat while remaining breathable, making it perfect for layering or wearing on its own when temperatures drop. The timeless brown color pairs effortlessly with both casual and smart-casual outfits, giving you versatility in your wardrobe.',
    details: {
      material: '80% Cotton, 20% Polyester',
      fit: 'Relaxed fit',
      care: 'Machine wash cold, lay flat to dry'
    },
    reviews: [
      { id: 1, rating: 5, user: 'Thomas K.', comment: 'So warm and comfortable! My go-to for cold days.' },
      { id: 2, rating: 5, user: 'Rebecca J.', comment: 'Excellent quality and very soft. Worth the price.' }
    ]
  },
  {
    id: 'C5',
    name: 'Soft Pink Jersey',
    image: C5,
    price: 1699,
    description: 'Light pink plain jersey combining softness and simplicity.',
    longDescription: 'Experience ultimate comfort with our Soft Pink Jersey. The subtle pink tone offers a gentle pop of color while maintaining versatility in your wardrobe. The premium cotton blend ensures a plush feel against your skin while providing enough structure to maintain its shape throughout the day. Ideal for casual outings or lounging at home.',
    details: {
      material: '70% Cotton, 30% Modal',
      fit: 'Regular fit',
      care: 'Machine wash gentle cycle, tumble dry low'
    },
    reviews: [
      { id: 1, rating: 5, user: 'Olivia P.', comment: 'The softest jersey Ive ever owned! Love the subtle pink color.' },
      { id: 2, rating: 4, user: 'James M.', comment: 'Great quality and very comfortable. Holds up well after washing.' }
    ]
  },
  {
    id: 'C6',
    name: 'Fresh Green Jersey',
    image: C6,
    price: 1899,
    description: 'Plain light green jersey offering a fresh, casual style.',
    longDescription: 'Our Fresh Green Jersey brings a touch of nature to your casual wardrobe. The refreshing light green hue evokes a sense of calm and renewal, while the premium jersey fabric ensures day-long comfort. Perfect for casual outings, weekend lounging, or adding a subtle pop of color to your everyday style. The quality construction means this jersey will be a wardrobe staple for seasons to come.',
    details: {
      material: '90% Cotton, 10% Elastane',
      fit: 'Slightly relaxed fit',
      care: 'Machine wash cold, reshape and dry flat'
    },
    reviews: [
      { id: 1, rating: 4, user: 'Nathan T.', comment: 'Great color and very comfortable. Slightly larger than expected.' },
      { id: 2, rating: 5, user: 'Sophia R.', comment: 'Love this jersey! The color is perfect for spring and summer.' }
    ]
  }
];