# MagicBricks Real Estate Listings

A Next.js application that displays real estate projects from MagicBricks with real-time updates and interactive maps.

## Features

- Dynamic routing based on city names (`/city/[cityName]`)
- Real-time project data display with incremental loading
- Interactive map showing project locations
- Project details including name, location, price range, and builder information
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- PositionStack API key (for geocoding)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd magicbricks-listings
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your PositionStack API key:
   ```
   POSITIONSTACK_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/city/[cityName]/page.tsx` - Dynamic city page
- `src/app/api/scrape/[cityName]/route.ts` - API route for scraping and geocoding
- `src/components/ProjectMap.tsx` - Interactive map component
- `src/components/ProjectList.tsx` - Project listing component
- `src/store/useStore.ts` - Zustand store for state management

## Implementation Details

- The application uses Next.js 13+ with the App Router
- State management is handled by Zustand
- Map integration uses Leaflet.js with React-Leaflet
- Project data is currently mocked but structured to support real scraping
- Real-time updates are simulated with incremental loading
- Geocoding is implemented using the PositionStack API

## Deployment

The application can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add your PositionStack API key in the environment variables
4. Deploy

## Future Improvements

- Implement actual MagicBricks scraping
- Add search and filtering capabilities
- Implement user authentication
- Add more detailed project information
- Improve map interactivity and styling

## License

MIT
