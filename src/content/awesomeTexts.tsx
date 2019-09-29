import random from "lodash/random";

export const awesomeTexts = [
    "You are perfect!",
    "You look beautiful today.",
    "You are amazing.",
    "Keep up the good work. You're doing great.",
    "I know you can do it!",
    "Yes we can!",
    "I believe in you.",
    "It's great to be with you.",
    "Hello again, good-looking. ;)",
    "Let's do our best again today to have a beautiful and fun day.",
    "Have a great and successful day.",
    "Arigatou. That's Japanese for 'thank you' and I just wanted to tell you thank you.",
    "Thanks for being the person you are.",
    "You are worthy of your dreams.",
    "I've got the power!",
    "May the Force be with you.",
    "You're so courageous. I admire that.",
    "Keep calm and hug the cat. ~(=^‥^)/",
    "Beautiful. Just beautiful.",
    "Hakuna Matata.",
    "You can dream it, you can reach it.",
    "Don't tell anybody the names are randomly generated.",
];

export const randomAwesomeText = () =>
    awesomeTexts[random(awesomeTexts.length - 1)];
