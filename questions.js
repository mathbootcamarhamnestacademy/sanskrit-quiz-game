// =======================================================
// ArhamNest Academy - Sanskrit Quest v1.2
// Comprehensive Data Bank (Chapters 1 to 6 Balanced)
// =======================================================

const allQuestions = {
  // CHAPTER 1 – वन्दना (PRAYER & MANTRAS)
  "1": [
    {
      question: "What is the meaning of 'भूः' in the Gayatri Mantra?",
      options: ["Atmosphere", "Earth", "Heaven", "Water"],
      answer: 1
    },
    {
      question: "What does 'सवितुः' mean?",
      options: ["Moon", "Star", "Sun / Creator", "Wind"],
      answer: 2
    },
    {
      question: "The word 'धियो' translates to:",
      options: ["Hearts", "Intellect / Thoughts", "Hands", "Eyes"],
      answer: 1
    },
    {
      question: "What is the meaning of 'शरदः शतम्' in the Vedic prayer?",
      options: ["100 Autumns / Years", "100 Days", "100 Months", "10 Seasons"],
      answer: 0
    },
    {
      question: "Complete the phrase: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो _________।'",
      options: ["परब्रह्म", "महेश्वरः", "सदाशिवः", "नमस्तुभ्यम्"],
      answer: 1
    },
    {
      question: "What does 'साक्षात्' mean in English?",
      options: ["Invisible", "Directly manifest / Before our eyes", "Far away", "Imaginary"],
      answer: 1
    },
    {
      question: "What is the Sanskrit word for 'Heaven' (from the phrase 'भूर्भुवः स्वः')?",
      options: ["भूः", "भुवः", "स्वः", "धीमहि"],
      answer: 2
    },
    {
      question: "Complete the phrase: 'पश्येम शरदः शतम्, _________ शरदः शतम्।'",
      options: ["जीवेम", "शृणुयाम", "प्रब्रवाम", "अदीनाः"],
      answer: 0
    },
    {
      question: "What does 'शृणुयाम' mean?",
      options: ["May we see", "May we live", "May we hear", "May we speak"],
      answer: 2
    },
    {
      question: "What is the meaning of 'अदीनाः' in the context of the life prayer?",
      options: ["Poor and weak", "Independent / Not helpless", "Proud", "Angry"],
      answer: 1
    }
  ],

  // CHAPTER 2 – शब्द परिचय (NOUN IDENTIFICATION & SPELLING BLENDS)
  "2": [
    {
      question: "What vowel blend does 'म् + ऋ' make?",
      options: ["मा", "मी", "मृ", "मे"],
      answer: 2
    },
    {
      question: "Identify the word type for 'रामः' (र् + आ + म् + अ):",
      options: ["अकारान्त (Ending in 'अ')", "आकारान्त (Ending in 'आ')", "इकारान्त", "उकारान्त"],
      answer: 0
    },
    {
      question: "Identify the word type for 'लेखिका' (ल् + ए + ख् + इ + क + आ):",
      options: ["अकारान्त", "आकारान्त (Ending in 'आ')", "ईकारान्त", "ऋकारान्त"],
      answer: 1
    },
    {
      question: "What is the meaning of 'छात्रौ'?",
      options: ["One Student", "Two Students", "Many Students", "Teacher"],
      answer: 1
    },
    {
      question: "What is the plural form (बहुवचन) of 'गजः'?",
      options: ["गजौ", "गजे", "गजाः", "गजम्"],
      answer: 2
    },
    {
      question: "What is the English meaning of 'कलिका'?",
      options: ["A full flower", "A bud", "A leaf", "A root"],
      answer: 1
    },
    {
      question: "Which of the following is a Neuter (नपुंसकलिंग) noun?",
      options: ["बालकः", "लता", "फलम्", "सिंहः"],
      answer: 2
    },
    {
      question: "What does the plural word 'पुस्तकानि' mean?",
      options: ["One book", "Two books", "Many books", "Library"],
      answer: 2
    },
    {
      question: "How do you say 'Two Fruits' in Sanskrit?",
      options: ["फलम्", "फले", "फलानि", "फलाः"],
      answer: 1
    },
    {
      question: "What gender type is the word 'मक्षिका' (Fly)?",
      options: ["Masculine", "Feminine", "Neuter", "None of the above"],
      answer: 1
    }
  ],

  // CHAPTER 3 – सर्वनाम (PRONOUNS)
  "3": [
    {
      question: "What does the pronoun 'अहम्' mean?",
      options: ["I", "You", "He", "They"],
      answer: 0
    },
    {
      question: "What does the pronoun 'त्वम्' mean?",
      options: ["I", "You (Singular)", "He", "We"],
      answer: 1
    },
    {
      question: "What does 'वयम्' mean?",
      options: ["We all", "You all", "They all", "These two"],
      answer: 0
    },
    {
      question: "What is the Masculine Singular pronoun for 'He' / 'That'?",
      options: ["सा", "सह", "तत्", "एषा"],
      answer: 1
    },
    {
      question: "What is the Feminine Singular pronoun for 'She' / 'That'?",
      options: ["सह", "सा", "तत्", "ते"],
      answer: 1
    },
    {
      question: "What does the Neuter pronoun 'तत्' mean?",
      options: ["He", "She", "It / That", "They"],
      answer: 2
    },
    {
      question: "What is the meaning of 'युवाम्'?",
      options: ["I", "You two", "We two", "They two"],
      answer: 1
    },
    {
      question: "What does 'एषः' mean in Masculine context?",
      options: ["That", "This", "Who", "What"],
      answer: 1
    },
    {
      question: "What is the plural form of 'सह' (He -> They all)?",
      options: ["तौ", "ते", "ताः", "तानि"],
      answer: 1
    },
    {
      question: "Which pronoun represents 'We two'?",
      options: ["अहम्", "आवाम्", "वयम्", "युवाम्"],
      answer: 1
    }
  ],

  // CHAPTER 4 – धातु (VERBS & ACTION WORDS)
  "4": [
    {
      question: "What does the verb 'गच्छति' mean?",
      options: ["Reads", "Goes", "Writes", "Runs"],
      answer: 1
    },
    {
      question: "What does 'पठति' mean?",
      options: ["Reads / Studies", "Eats", "Sleeps", "Laughs"],
      answer: 0
    },
    {
      question: "Match the action for: 'फले पततः।'",
      options: ["One fruit falls.", "Two fruits fall.", "Many fruits fall.", "Fruits are growing."],
      answer: 1
    },
    {
      question: "Complete the sentence: 'अजाः (Goats) _________।'",
      options: ["चरति", "चरतः", "चरन्ति", "पठामि"],
      answer: 2
    },
    {
      question: "What is the meaning of 'खादति'?",
      options: ["Drinks", "Eats", "Sings", "Plays"],
      answer: 1
    },
    {
      question: "If 'चलति' means walks (singular), what does 'चलन्ति' mean?",
      options: ["Walks (Dual)", "Walks (Plural / Many)", "Ran away", "Will walk"],
      answer: 1
    },
    {
      question: "What is the correct verb pairing for 'अहम्' (I)?",
      options: ["पठति", "पठसि", "पठामि", "पठामः"],
      answer: 2
    },
    {
      question: "What is the correct verb pairing for 'त्वम्' (You)?",
      options: ["पठति", "पठसि", "पठामि", "पठथः"],
      answer: 1
    },
    {
      question: "What does 'धावति' mean?",
      options: ["Runs", "Sits", "Stands", "Looks"],
      answer: 0
    },
    {
      question: "What does 'हसतः' indicate?",
      options: ["One person laughs", "Two people laugh", "Many people laugh", "No one laughs"],
      answer: 1
    }
  ],

  // CHAPTER 5 – NUMBERS (संख्या)
  "5": [
    {
      question: "What is the Sanskrit word for number 1 in Neuter form (e.g., One Book)?",
      options: ["एकः", "एका", "एकम्", "प्रथमः"],
      answer: 2
    },
    {
      question: "What is the Masculine form of number 2?",
      options: ["द्वौ", "द्वे", "द्वयम्", "द्वितीयः"],
      answer: 0
    },
    {
      question: "What does 'त्रीणि' mean?",
      options: ["Two", "Three", "Four", "Five"],
      answer: 1
    },
    {
      question: "Translate number 5 into Sanskrit:",
      options: ["पञ्च", "षट्", "सप्त", "अष्ट"],
      answer: 0
    },
    {
      question: "What number does 'षट्' represent?",
      options: ["4", "5", "6", "7"],
      answer: 2
    },
    {
      question: "What is the Sanskrit name for number 7?",
      options: ["सप्त", "अष्ट", "नव", "दश"],
      answer: 0
    },
    {
      question: "What does 'दश' translate to?",
      options: ["8", "9", "10", "100"],
      answer: 2
    },
    {
      question: "How do you write number 4 in Neuter form (e.g., Four Leaves)?",
      options: ["चत्वारः", "चतस्रः", "चत्वारि", "चतुर्थः"],
      answer: 2
    },
    {
      question: "What does 'नव' mean?",
      options: ["New", "Nine", "Name", "No"],
      answer: 1
    },
    {
      question: "What number comes immediately after 'सप्त'?",
      options: ["षट्", "अष्ट", "नव", "दश"],
      answer: 1
    }
  ],

  // CHAPTER 6 – REVISION (मिश्रित अभ्यास)
  "6": [
    {
      question: "Choose the correct expression for: 'I go.'",
      options: ["अहम् गच्छति", "अहम् गच्छसि", "अहम् गच्छामि", "त्वम् गच्छामि"],
      answer: 2
    },
    {
      question: "Choose the correct expression for: 'You read.'",
      options: ["त्वम् पठति", "त्वम् पठसि", "अहम् पठसि", "वयम् पठामः"],
      answer: 1
    },
    {
      question: "What is the meaning of 'बालकः'?",
      options: ["Girl", "Boy", "Man", "Woman"],
      answer: 1
    },
    {
      question: "What is the meaning of 'सीता'?",
      options: ["Girl / Proper Name", "Boy", "River", "Mountain"],
      answer: 0
    },
    {
      question: "What does 'भवनम्' mean?",
      options: ["House / Building", "Forest", "Road", "Temple"],
      answer: 0
    },
    {
      question: "What is the plural form of 'कलिका' (Bud)?",
      options: ["कलिके", "कलिकाः", "कलिकानि", "कलिका"],
      answer: 1
    },
    {
      question: "Complete the blend: 'त् + व् + अ + म्' =",
      options: ["त्वम्", "तम्", "वम्", "त्वाम"],
      answer: 0
    },
    {
      question: "What is 'पश्येम' in English?",
      options: ["May we live", "May we see", "May we speak", "May we hear"],
      answer: 1
    },
    {
      question: "Which form is 'पत्राणि'?",
      options: ["Singular Masculine", "Plural Neuter", "Dual Feminine", "Singular Neuter"],
      answer: 1
    },
    {
      question: "Translate this phrase: 'सिंहौ धावतः।'",
      options: ["One lion runs.", "Two lions run.", "Many lions run.", "Lions are sleeping."],
      answer: 1
    }
  ]
};
