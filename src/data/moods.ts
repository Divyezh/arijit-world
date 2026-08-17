export interface Mood {
  id: string;
  name: string;
  hindi: string;
  description: string;
  gradient: string;
  accentColor: string;
  icon: string;
}

export const moods: Mood[] = [
  {
    id: "love",
    name: "Love",
    hindi: "इश्क़",
    description:
      "The rush of first glances, the warmth of whispered confessions, and the overwhelming beauty of falling irrevocably, breathlessly in love.",
    gradient: "from-rose-600 via-pink-500 to-amber-400",
    accentColor: "#e11d48",
    icon: "Heart",
  },
  {
    id: "heartbreak",
    name: "Heartbreak",
    hindi: "दर्द",
    description:
      "Songs that hold you while you fall apart. The ache of goodbyes, the silence after someone leaves, and the dignity found in letting go.",
    gradient: "from-indigo-700 via-purple-600 to-slate-500",
    accentColor: "#7c3aed",
    icon: "HeartCrack",
  },
  {
    id: "longing",
    name: "Longing",
    hindi: "तड़प",
    description:
      "The space between missing someone and hoping they return. Distance made musical — every note stretches toward someone who isn't here.",
    gradient: "from-cyan-600 via-teal-500 to-emerald-400",
    accentColor: "#0891b2",
    icon: "Wind",
  },
  {
    id: "dreamy",
    name: "Dreamy",
    hindi: "ख़्वाब",
    description:
      "Hazy golden-hour melodies for slow dances in your imagination. Soft focus, warm light, and the feeling that anything is possible tonight.",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    accentColor: "#f59e0b",
    icon: "Sparkles",
  },
  {
    id: "soulful",
    name: "Soulful",
    hindi: "रूहानी",
    description:
      "When voice becomes prayer. These compositions transcend romance and touch something deeper — devotion, surrender, the sacred in the secular.",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    accentColor: "#059669",
    icon: "Flame",
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    hindi: "यादें",
    description:
      "Songs that taste like old photographs and smell like rain on warm earth. The bittersweet beauty of remembering what was, and smiling through the ache.",
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    accentColor: "#ea580c",
    icon: "Clock",
  },
];

export function getMoodById(id: string): Mood | undefined {
  return moods.find((m) => m.id === id);
}
