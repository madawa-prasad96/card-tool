const templates = [
  {
    id: 1,
    name: 'Floral (Portrait)',
    width: 500,
    height: 700,
    background: 'https://placeimg.com/500/700/nature?1',
    placeholders: [
      { id: 1, x: 50, y: 50, width: 400, height: 300 },
    ],
  },
  {
    id: 2,
    name: 'Modern (Portrait)',
    width: 500,
    height: 700,
    background: 'https://placeimg.com/500/700/arch?2',
    placeholders: [
      { id: 1, x: 50, y: 50, width: 180, height: 250 },
      { id: 2, x: 270, y: 50, width: 180, height: 250 },
      { id: 3, x: 50, y: 350, width: 400, height: 200 },
    ],
  },
  {
    id: 3,
    name: 'Classic (Landscape)',
    width: 700,
    height: 500,
    background: 'https://placeimg.com/700/500/arch?3',
    placeholders: [
      { id: 1, x: 50, y: 50, width: 250, height: 400 },
      { id: 2, x: 350, y: 50, width: 300, height: 200 },
    ],
  },
  {
    id: 4,
    name: 'Minimalist (Landscape)',
    width: 700,
    height: 500,
    background: 'https://placeimg.com/700/500/tech?4',
    placeholders: [
      { id: 1, x: 50, y: 50, width: 600, height: 400 },
    ],
  },
  {
    id: 5,
    name: 'Playful (Square)',
    width: 600,
    height: 600,
    background: 'https://placeimg.com/600/600/animals?5',
    placeholders: [
      { id: 1, x: 50, y: 50, width: 200, height: 200 },
      { id: 2, x: 350, y: 50, width: 200, height: 200 },
      { id: 3, x: 50, y: 350, width: 200, height: 200 },
      { id: 4, x: 350, y: 350, width: 200, height: 200 },
    ],
  },
];

export default templates;
