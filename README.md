# MURDOKU

Murder mystery logic puzzles. Place suspects on a crime scene grid using clues, then identify the killer.

**Play now:** [murdoku-ten.vercel.app](https://murdoku-ten.vercel.app)

## How It Works

1. Each puzzle gives you a crime scene grid divided into rooms, with objects (chairs, beds, plants, etc.)
2. Read each suspect's clue to figure out where they were standing
3. Place suspects on the grid — **one per row, one per column**
4. The victim was **alone with the murderer in the same room**
5. Once all suspects are placed, name the murderer to solve the case

## Features

- 55 original puzzles across varying difficulty
- Interactive grid with drag-to-place suspects
- Clue panel with placement tracking
- Solution reveal with step-by-step walkthrough
- Progress saved in your browser (localStorage)
- Responsive design, works on mobile

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS
- Static site — no backend, no database

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
