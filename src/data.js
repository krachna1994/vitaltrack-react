const image = (name) => `/images/${name}.webp`;

export const IMAGES = {
  welcome: image('welcome'),
  male: image('gender-male'),
  female: image('gender-female'),
  loss: image('goal-loss'),
  muscle: image('goal-muscle'),
  fit: image('goal-fit'),
  focus: image('focus'),
  height: image('height'),
  avatar: image('avatar'),
  marathon: image('marathon'),
  challenge: image('beach-challenge'),
  friends: image('friends'),
  ball: image('workout-ball'),
  basketball: image('basketball'),
  cover: image('workout-cover'),
  exercise: image('exercise'),
};

export const WORKOUTS = [
  {
    id: 'ball', title: 'Workouts with Ball', image: IMAGES.ball,
    exercises: 10, level: 'Entry level', duration: '30–35 min', category: 'For you',
    description: 'A full-body stability session designed to build core strength and balance.',
  },
  {
    id: 'basketball', title: 'Workouts with Basketball', image: IMAGES.basketball,
    exercises: 8, level: 'Advanced level', duration: '25–30 min', category: 'Most Popular',
    description: 'Agility, strength and cardio inspired by basketball training.',
  },
  {
    id: 'marathon', title: 'Get ready for the marathon', image: IMAGES.marathon,
    exercises: 12, level: 'Medium level', duration: '40–45 min', category: 'Most Popular',
    description: 'Build the stamina to take on your next running challenge.',
  },
  {
    id: 'waist', title: 'Waist Cinching Workout', image: IMAGES.friends,
    exercises: 10, level: 'Entry level', duration: '20–25 min', category: 'For you',
    description: 'Core-focused movements to improve strength and stability.',
  },
];

export const EXERCISES = [
  { name: 'Hull lift', sets: 12, rest: 2 },
  { name: 'Touching your raised leg', sets: 12, rest: 2 },
  { name: 'Skewed Curls', sets: 14, rest: 3 },
  { name: 'Feel crosses', sets: 14, rest: 3 },
  { name: 'Body swivels', sets: 14, rest: 3 },
  { name: 'Hyperextension', sets: 14, rest: 3 },
  { name: 'Seated knee tucks', sets: 12, rest: 2 },
  { name: 'Side plank hold', sets: 12, rest: 2 },
  { name: 'Standing twists', sets: 14, rest: 2 },
  { name: 'Cool-down stretch', sets: 10, rest: 1 },
];

export const CHALLENGES = [
  { id: 'steps5k', title: 'Walk 5,000 steps in a day', points: 1000, icon: 'steps' },
  { id: 'steps10k', title: 'Walk 10,000 steps in a day', points: 2000, icon: 'steps' },
  { id: 'calories', title: 'Burn 1000 Calories', points: 500, icon: 'flame' },
  { id: 'weight', title: 'Lose 3 kg weight', points: 1500, icon: 'target' },
  { id: 'friend', title: 'Reward for adding a friend on the app', points: 1000, icon: 'friend' },
  { id: 'consistent', title: 'Workout 4 times a week for a month', points: 5000, icon: 'trophy' },
];

export const GIFT_CARDS = [
  { id: 'amazon500', brand: 'amazon pay', title: 'Amazon Pay eGift Card INR 500', value: '₹500', points: 2500, theme: 'amazon' },
  { id: 'pvr1000', brand: 'PVR', title: 'PVR eGift Card INR 1000', value: '₹1,000', points: 5000, theme: 'pvr' },
  { id: 'flipkart500', brand: 'Flipkart', title: 'Flipkart eGift Card INR 500', value: '₹500', points: 2500, theme: 'flipkart' },
  { id: 'starbucks1000', brand: 'Starbucks', title: 'Starbucks eGift Card INR 1000', value: '₹1,000', points: 5000, theme: 'starbucks' },
  { id: 'myntra500', brand: 'Myntra', title: 'Myntra eGift Card INR 500', value: '₹500', points: 2000, theme: 'myntra' },
  { id: 'fastrack500', brand: 'fastrack', title: 'Fastrack eGift Card INR 500', value: '₹500', points: 2000, theme: 'fastrack' },
];

export const WEEKLY_ACTIVITY = [34, 18, 49, 38, 25, 52, 72];
export const MONTHLY_ACTIVITY = [34, 58, 44, 67, 48, 75, 90];
export const ALL_TIME_ACTIVITY = [35, 19, 51, 44, 27, 53, 79];
export const TIME_ACTIVITY = [34, 18, 51, 44, 27, 53, 79];
export const formatPoints = (points) => Number(points).toLocaleString('en-IN');
