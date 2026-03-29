# Althair

Althair is a digital outfit builder where you can catalog your clothing by uploading pictures, create outfit combinations and save them to plan your daily looks or simply rediscover combinations to help you save up on clothing.

This app has been built solely to help remember clothing pieces and their versatility in different comnbinations to strategically avoid laundry at all cost, save on new clothing and perhaps maybe to help me pack lightly?

Live at [althair.vercel.app](https://althair.vercel.app)

---

## What it does

You upload photos of your clothes, tag them with whatever metadata feels useful like category, color, fit, size and they go into your wardrobe. From there you can pull items onto a drag-and-drop canvas, layer and resize them, and save the result as an outfit. Each outfit gets its own page with a swipeable view between the canvas reconstruction and any reference image you attached.

There's also a curated collection of common wardrobe staples built into the app. So if you just want to throw a white tee or a pair of jeans onto a canvas without photographing your own, you can grab it from there instead.

The frontend has been designed to let you quickly browse through your wardrobe and your outfits and help look through all combinations and clothing at a glance.

---

## Work In Progress (if possible)

- **Uploaded clothing photos need to have their backgrounds already removed.** The canvas stacks items on top of each other, so anything with a background is going to look like a mess. I couldn't quite around this as this would require either hosting a model on a bit more powerful server that free tiers don't offer or doing it on the frontend that is not feasible for mobile devices which are the primary use case devices of this app, so for now it's a manual step. [remove.bg](https://remove.bg) or in built AI features on most modern smartphone work fine for this.
- **Tracker, Notifications and Niche Features** The app could include a tracker for all the clothings and outfits and reminder / suggestion notifications but it remains out of scope for now along with other niche features like shuffles, cataloging into seperate sections and scraped info.

---

## Features

- Drag-and-drop outfit canvas for making outfits. Item positions are stored as normalized coordinates so the layout holds across screen sizes
- Outfit tracking on every clothing item to help list all outfits it's used in
- Saving outfits and any real life reference picture to help identify or remember a look better
- Curated collection of common pieces to help with easy onboarding and redundant uploading of common clothing items
- Full-text search across both your wardrobe and outfits
- Integrated with Google OAuth for easy sign ups and logins
- Also contains integration with Gemini API for writing suggestions on better use of the pieces and outfits

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- react-draggable
- shadcn/ui, MUI icons, Lucide

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- AWS S3
- Google OAuth 2.0
- Gemini 2.5 Flash

---

## Project Structure

```
althair/
├── frontend/
│   └── src/
│       ├── Pages/
│       ├── Components/
│       └── App.jsx
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    └── utils/
```

---

## Environment Variables

**Backend**
```
MONGO_URI=
PORT=
CLIENT_URL=
JWT_SECRET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
ENABLE_CURATED_UPLOAD=    # "true" only in local admin env
NODE_ENV=
```

**Frontend**
```
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## Local Setup

```bash
# Backend
cd backend
npm install
npm run scripts

# Frontend
cd frontend
npm install
npm run dev
```
