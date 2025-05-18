
import AsSeenIn from "@/components/AsSeenIn";
import CelebrityCloset from "@/components/CelebrityCloset";
import HeroSection from "@/components/HeroSection";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Jhalak from "@/components/Jhalak";
import NewArrivals from "@/components/NewArrivals";
import ReadyToShipStyles from "@/components/ReadyToShipStyles";
import ShopByCollections from "@/components/ShopByCollections";
import ShopTheFeed from "@/components/ShopTheFeed";
import { FEED_IMAGES } from "@/constant/constant";
import { Fragment } from "react";

const sampleImages = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain vista at sunset with vibrant colors reflecting on the snow-capped peaks.',
    date: '2024-01-15',
    category: ['Nature', 'Landscape'],
    width: 1920,
    height: 1280
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
    title: 'Urban Architecture',
    description: 'Modern skyscraper with unique geometric design elements captured from street level.',
    date: '2024-02-08',
    category: ['Architecture', 'Urban'],
    width: 1200,
    height: 1800
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg',
    title: 'Coastal Sunset',
    description: 'Breathtaking sunset over the ocean with silhouetted palm trees and gentle waves.',
    date: '2024-01-22',
    category: ['Nature', 'Sunset', 'Beach'],
    width: 1920,
    height: 1280
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/450038/pexels-photo-450038.jpeg',
    title: 'Wildlife Portrait',
    description: 'Close-up wildlife portrait of a majestic tiger in its natural habitat.',
    date: '2024-02-19',
    category: ['Wildlife', 'Animals'],
    width: 1600,
    height: 1067
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/4937195/pexels-photo-4937195.jpeg',
    title: 'Minimalist Interior',
    description: 'Clean, minimalist interior design featuring natural light and sustainable materials.',
    date: '2024-03-05',
    category: ['Interior', 'Design', 'Minimal'],
    width: 1600,
    height: 2400
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg',
    title: 'Abstract Art Installation',
    description: 'Colorful abstract art installation exploring themes of movement and transformation.',
    date: '2024-03-12',
    category: ['Art', 'Abstract'],
    width: 1920,
    height: 1080
  },
  {
    id: '7',
    src: 'https://images.pexels.com/photos/36478/amazing-beautiful-beauty-blue.jpg',
    title: 'Northern Lights',
    description: 'Stunning aurora borealis display over a snow-covered landscape in northern Finland.',
    date: '2024-01-30',
    category: ['Nature', 'Night Sky', 'Phenomena'],
    width: 2048,
    height: 1365
  },
  {
    id: '8',
    src: 'https://images.pexels.com/photos/1334605/pexels-photo-1334605.jpeg',
    title: 'Street Photography',
    description: 'Candid street photography capturing daily life in a bustling metropolitan area.',
    date: '2024-02-27',
    category: ['Street', 'People', 'Urban'],
    width: 1400,
    height: 1800
  },
  {
    id: '9',
    src: 'https://images.pexels.com/photos/2710043/pexels-photo-2710043.jpeg',
    title: 'Aerial Landscape',
    description: 'Breathtaking aerial view of winding rivers cutting through lush forest landscapes.',
    date: '2024-03-08',
    category: ['Aerial', 'Landscape', 'Nature'],
    width: 2048,
    height: 1365
  },
  {
    id: '10',
    src: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg',
    title: 'Macro Photography',
    description: 'Detailed macro photography of morning dew on a delicate spider web.',
    date: '2024-02-05',
    category: ['Macro', 'Nature', 'Detail'],
    width: 1800,
    height: 1200
  },
  {
    id: '11',
    src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    title: 'Historic Architecture',
    description: 'Ornate details of historic European architecture showcasing centuries of craftsmanship.',
    date: '2024-01-18',
    category: ['Architecture', 'Historic', 'Travel'],
    width: 1365,
    height: 2048
  },
  {
    id: '12',
    src: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
    title: 'Astro Photography',
    description: 'Stunning night sky photograph capturing the Milky Way galaxy over a mountain range.',
    date: '2024-03-15',
    category: ['Astro', 'Night', 'Stars'],
    width: 2048,
    height: 1365
  }
];



export default function Home() {

  
  return (
    <Fragment>
      <HeroSection />
      <NewArrivals />
      <ReadyToShipStyles />
      <ShopByCollections />
      <CelebrityCloset />
      <Jhalak />
      <AsSeenIn />
      <ShopTheFeed />
      <ImageGallery images={FEED_IMAGES} />
    </Fragment>
  );
}
