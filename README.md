# KoNam Tourism Website

A dynamic tourism website connecting Korean travelers with Namibian experiences.

## Project Overview

KoNam is a tourism company specializing in creating unforgettable Namibian experiences for Korean travelers. This website showcases tour packages, vehicle rentals, and allows visitors to make enquiries.

### Key Features

- **Tour Packages**: Browse and filter through various tour packages
- **Vehicle Rentals**: Explore available vehicles for rent
- **Enquiry Form**: Submit travel preferences and questions
- **Responsive Design**: Optimized for all devices
- **Bilingual Content**: English with Korean translations

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Supabase for data storage and authentication
- **Animations**: Framer Motion for smooth transitions
- **Deployment**: Netlify

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment on Netlify

This project is configured for easy deployment on Netlify:

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add your environment variables in the Netlify dashboard
5. Deploy!

The included `netlify.toml` file handles the configuration automatically.

## Project Structure

- `app/` - Next.js application code
  - `components/` - Reusable UI components
  - `lib/` - Utility functions and types
  - `tours/` - Tour packages page
  - `vehicles/` - Vehicle rentals page
  - `enquiry/` - Enquiry form page

## Image Credits

For the production site, replace the placeholder images in the `public/images/` directory with properly licensed photos of Namibian landscapes, wildlife, and vehicles.

## License

This project is licensed under the MIT License.
