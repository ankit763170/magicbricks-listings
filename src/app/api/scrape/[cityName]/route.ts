import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Project } from '@/types';

const POSITIONSTACK_API_KEY = process.env.POSITIONSTACK_API_KEY;

// Default coordinates for major Indian cities
const DEFAULT_COORDINATES: { [key: string]: { lat: number; lon: number } } = {
  'hyderabad': { lat: 17.3850, lon: 78.4867 },
  'mumbai': { lat: 19.0760, lon: 72.8777 },
  'delhi': { lat: 28.7041, lon: 77.1025 },
  'bangalore': { lat: 12.9716, lon: 77.5946 },
  'chennai': { lat: 13.0827, lon: 80.2707 },
  'kolkata': { lat: 22.5726, lon: 88.3639 },
  'pune': { lat: 18.5204, lon: 73.8567 },
  'ahmedabad': { lat: 23.0225, lon: 72.5714 },
  'jaipur': { lat: 26.9124, lon: 75.7873 },
  'lucknow': { lat: 26.8467, lon: 80.9462 }
};

async function geocodeLocation(location: string, cityName: string): Promise<{ lat: number; lon: number }> {
  // First try to get default coordinates for the city
  const defaultCoords = DEFAULT_COORDINATES[cityName.toLowerCase()];
  if (defaultCoords) {
    return defaultCoords;
  }

  // If no API key, return default coordinates for the city
  if (!POSITIONSTACK_API_KEY) {
    console.warn('PositionStack API key not found');
    return DEFAULT_COORDINATES['hyderabad']; // Fallback to Hyderabad coordinates
  }

  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${encodeURIComponent(location)}&country=IN&limit=1`
    );
    
    if (!response.ok) {
      console.warn(`Geocoding failed for ${location}: ${response.statusText}`);
      return DEFAULT_COORDINATES['hyderabad']; // Fallback to Hyderabad coordinates
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return {
        lat: data.data[0].latitude,
        lon: data.data[0].longitude,
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  return DEFAULT_COORDINATES['hyderabad']; // Fallback to Hyderabad coordinates
}

// Mock scraping function - replace with actual MagicBricks scraping
async function scrapeMagicBricks(cityName: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data with realistic project information
  const mockProjects = [
    {
      name: 'Luxury Heights',
      location: `Banjara Hills, ${cityName}`,
      priceRange: '₹1.2 Cr - ₹2.5 Cr',
      builderName: 'Prestige Group',
      coordinates: await geocodeLocation(`Banjara Hills, ${cityName}`, cityName),
    },
    {
      name: 'Green Valley Residency',
      location: `Gachibowli, ${cityName}`,
      priceRange: '₹75 Lac - ₹1.5 Cr',
      builderName: 'DLF Limited',
      coordinates: await geocodeLocation(`Gachibowli, ${cityName}`, cityName),
    },
    {
      name: 'Royal Gardens',
      location: `Jubilee Hills, ${cityName}`,
      priceRange: '₹2 Cr - ₹4 Cr',
      builderName: 'Sobha Limited',
      coordinates: await geocodeLocation(`Jubilee Hills, ${cityName}`, cityName),
    },
    {
      name: 'Tech Park Residences',
      location: `HITEC City, ${cityName}`,
      priceRange: '₹90 Lac - ₹1.8 Cr',
      builderName: 'Brigade Group',
      coordinates: await geocodeLocation(`HITEC City, ${cityName}`, cityName),
    },
    {
      name: 'Lakeview Apartments',
      location: `Hussain Sagar, ${cityName}`,
      priceRange: '₹1.5 Cr - ₹3 Cr',
      builderName: 'Godrej Properties',
      coordinates: await geocodeLocation(`Hussain Sagar, ${cityName}`, cityName),
    },
    {
      name: 'Garden City',
      location: `Madhapur, ${cityName}`,
      priceRange: '₹60 Lac - ₹1.2 Cr',
      builderName: 'Prestige Group',
      coordinates: await geocodeLocation(`Madhapur, ${cityName}`, cityName),
    },
    {
      name: 'Sky Towers',
      location: `Kondapur, ${cityName}`,
      priceRange: '₹2.5 Cr - ₹5 Cr',
      builderName: 'Lodha Group',
      coordinates: await geocodeLocation(`Kondapur, ${cityName}`, cityName),
    },
    {
      name: 'Urban Oasis',
      location: `Kukatpally, ${cityName}`,
      priceRange: '₹45 Lac - ₹90 Lac',
      builderName: 'Sobha Limited',
      coordinates: await geocodeLocation(`Kukatpally, ${cityName}`, cityName),
    },
  ];

  return mockProjects;
}

export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  try {
    const cityName = params.cityName;

    if (!cityName) {
      return NextResponse.json({ error: 'City name is required' }, { status: 400 });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(`https://www.magicbricks.com/property-for-sale/residential-real-estate?proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment&cityName=${cityName}`);

    // Wait for the listings to load
    await page.waitForSelector('.mb-srp__list');

    const projects: Project[] = await page.evaluate(() => {
      const listings = document.querySelectorAll('.mb-srp__list__item');
      return Array.from(listings).map((listing) => {
        const name = listing.querySelector('.mb-srp__card__title')?.textContent?.trim() || '';
        const location = listing.querySelector('.mb-srp__card__summary--value')?.textContent?.trim() || '';
        const price = listing.querySelector('.mb-srp__card__price--amount')?.textContent?.trim() || '';
        const area = listing.querySelector('.mb-srp__card__summary--label')?.textContent?.trim() || '';
        const developer = listing.querySelector('.mb-srp__card__developer--name')?.textContent?.trim() || '';
        const description = listing.querySelector('.mb-srp__card__desc--text')?.textContent?.trim() || '';
        const amenities = Array.from(listing.querySelectorAll('.mb-srp__card__summary--label'))
          .map((amenity: Element) => amenity.textContent?.trim() || '')
          .filter(Boolean);

        return {
          name,
          location,
          price,
          area,
          developer,
          description,
          amenities,
        };
      });
    });

    await browser.close();

    // Get coordinates for each project
    const projectsWithCoordinates = await Promise.all(
      projects.map(async (project) => {
        try {
          const response = await fetch(
            `http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${encodeURIComponent(
              project.location
            )}`
          );
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            return {
              ...project,
              latitude: data.data[0].latitude,
              longitude: data.data[0].longitude,
            };
          }
          return project;
        } catch (error) {
          console.error('Error getting coordinates:', error);
          return project;
        }
      })
    );

    return NextResponse.json(projectsWithCoordinates);
  } catch (error) {
    console.error('Error scraping data:', error);
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 }
    );
  }
} 