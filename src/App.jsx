import { useState, useEffect, useRef, useCallback } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  💌  CUSTOMIZE YOUR LOVE STORY  — Edit only this section        ║
// ╚══════════════════════════════════════════════════════════════════╝
const STORY = {
  him: "My Jaan",           // ← Your husband's name
  you: "Your Love",            // ← Your name
  proposeDate: "February 14, 2015",
  yearsLabel: "10 Years. 1 Love Story.",

  // levels: [
  //   {
  //     num: 1,
  //     title: "The Beginning",
  //     icon: "✨",
  //     accent: "#FF6B9D",
  //     type: "choice",

  //     question: "Which moment quietly changed two lives forever?",

  //     hint: "Some love stories begin long before the proposal 💖",

  //     options: [
  //       {
  //         text: "The day we first met at tuitions",
  //         emoji: "📚"
  //       },
  //       {
  //         text: "15th Dec 2015 — when our conversations became special",
  //         emoji: "💬"
  //       },
  //       {
  //         text: "17th May 2016 — when you asked me to be yours forever",
  //         emoji: "💍"
  //       }
  //     ],

  //     correct: 2,

  //     win: "And just like that… my forever began with you ❤️"
  //   },
  //   {
  //     num: 2,
  //     title: "Do You Remember?",
  //     icon: "🕰️",
  //     accent: "#A78BFA",
  //     type: "timeline",

  //     question: "Can you relive our story in the exact order it touched our hearts?",

  //     hint: "Every little moment led us closer to forever 💖",

  //     items: [
  //       {
  //         text: "Those simple WhatsApp conversations that slowly turned into feelings we never expected 💖",
  //         order: 4
  //       },
  //       {
  //         text: "15th Dec 2015 — when our conversations started 💬",
  //         order: 2
  //       },
  //       {
  //         text: "The day we first met outside tuitions… and you softly asked, “તું Surbhi છે?” 💫",
  //         order: 1
  //       },
  //       {
  //         text: "17th May 2016 — the day you proposed to me 💍",
  //         order: 5
  //       },
  //       {
  //         text: "When you stayed awake late at night just because you knew that’s when I would finally reply after working on my projects 🌃❤️",
  //         order: 3
  //       },
  //     ],

  //     win: "And somehow… every moment was leading us to forever ❤️"
  //   }, 
  //   {
  //     num: 3, title: "Find My Heart", icon: "💝", accent: "#F43F5E",
  //     type: "hearts",
  //     question: "Find my heart among the many",
  //     hint: "One heart is glowing brighter than all the rest…",
  //     correctIndex: 7,  // ← which heart index is the special one (0–11)
  //     win: "You always find my heart, wherever it hides 💖",
  //   },   
  //   {
  //     num: 4,
  //     title: "The Proposal Story",
  //     icon: "💍",
  //     accent: "#F43F5E",
  //     type: "choice",

  //     question: "Which proposal became my forever favorite? ✨",

  //     hint: "One happened through a screen… the other came with birthday emotions and Vadapav ❤️",

  //     options: [
  //       {
  //         text: "That sweet WhatsApp confession 💬",
  //         emoji: "📱"
  //       },
  //       {
  //         text: "The birthday proposal with Vadapav 🌭",
  //         emoji: "🎂"
  //       },
  //       {
  //         text: "Both… because both carried your heart 💖",
  //         emoji: "💝"
  //       }
  //     ],

  //     correct: 2,

  //     win: "Two proposals. One forever love story and honestly… I fell for you a little more both times ❤️"
  //   },
  //   {
  //     num: 5,
  //     title: "Hidden Truth",
  //     icon: "🔐",
  //     accent: "#10B981",
  //     type: "decode",

  //     question: "Decode the truth my heart has known for years 💫",

  //     hint: "Every heartbeat already knows the answer ❤️",

  //     word: "Everything",

  //     revealText: "You are my everything… Tame mari jaan cho… mara praan cho… mara praan vase che tamara ma 🥹❤️",

  //     win: "And no matter where life takes us… my soul will always find home in you 💖"
  //   },
  //   {
  //     num: 6, title: "Our Journey", icon: "✈️", accent: "#F59E0B",
  //     type: "journey",
  //     question: "Trace the journey we have taken",
  //     hint: "Tap each place in the order we experienced it together",
  //     waypoints: [
  //       { label: "Where we first met",      emoji: "👋" },
  //       { label: "Our first trip together", emoji: "✈️" },
  //       { label: "The proposal spot",       emoji: "💍" },
  //       { label: "Our home",                emoji: "🏡" },
  //     ],
  //     win: "Every journey with you is my favourite adventure 🗺️",
  //   },
  //   {
  //     num: 7, title: "Love Meter", icon: "💗", accent: "#EC4899",
  //     type: "meter",
  //     question: "How compatible are we, really?",
  //     hint: "Science is about to confirm what our hearts already know",
  //     win: "Off the charts! Shocking to absolutely no one 💞",
  //   },
  //   {
  //     num: 8, title: "Proposal Memories", icon: "💍", accent: "#8B5CF6",
  //     type: "choice",
  //     question: "What was the best part of that day?",
  //     hint: "When you asked, time stood completely still…",
  //     options: [
  //       { text: "Your adorably nervous smile",      emoji: "😊" },
  //       { text: "The exact words you chose",        emoji: "💬" },
  //       { text: "The most beautiful ring ever",     emoji: "✨" },
  //       { text: "The happy tears I couldn't stop",  emoji: "😭" },
  //     ],
  //     correct: "any",   // any answer is correct here ❤️
  //     win: "Every single moment of that day was perfect 💎",
  //   },
  //   {
  //     num: 9, title: "Our Forever", icon: "🌙", accent: "#6366F1",
  //     type: "multiselect",
  //     question: "What does our forever look like?",
  //     hint: "Select all the dreams you want us to live together",
  //     options: [
  //       { text: "Travel every corner of the world",  emoji: "🌍" },
  //       { text: "Grow beautifully old together",     emoji: "🌿" },
  //       { text: "Fill our home with laughter",       emoji: "🏡" },
  //       { text: "Dance in the kitchen at midnight",  emoji: "💃" },
  //       { text: "Love each other more every day",    emoji: "❤️" },
  //       { text: "All of the above, and more",        emoji: "✨" },
  //     ],
  //     win: "Our future is the most beautiful story ever written 🌟",
  //   },
  //   {
  //     num: 10, title: "The Final Unlock", icon: "🗝️", accent: "#FFD700",
  //     type: "final",
  //     question: "Will you continue this love story forever with me?",
  //     hint: "This is the moment everything has been building toward…",
  //     win: "The answer that unlocks everything. Always yes. 💛",
  //   },
  // ],

  levels: [
    {
      num: 1,
      title: "The Beginning",
      icon: "✨",
      accent: "#FF6B9D",
      type: "choice",

      question: "Which moment quietly changed two lives forever?",

      hint: "Some love stories begin long before the proposal 💖",

      options: [
        {
          text: "The day we first met at tuitions",
          emoji: "📚"
        },
        {
          text: "15th Dec 2015 — when our conversations became special",
          emoji: "💬"
        },
        {
          text: "17th May 2016 — when you asked me to be yours forever",
          emoji: "💍"
        }
      ],

      correct: 2,

      win: "And just like that… my forever began with you ❤️"
    },

    {
      num: 2,
      title: "Do You Remember?",
      icon: "🕰️",
      accent: "#A78BFA",
      type: "timeline",

      question: "Can you relive our story in the exact order it touched our hearts?",

      hint: "Every little moment led us closer to forever 💖",

      items: [
        {
          text: "Those simple WhatsApp conversations that slowly turned into feelings we never expected 💖",
          order: 4
        },
        {
          text: "15th Dec 2015 — when our conversations started 💬",
          order: 2
        },
        {
          text: "The day we first met outside tuitions… and you softly asked, “તું Surbhi છે?” 💫",
          order: 1
        },
        {
          text: "17th May 2016 — the day you proposed to me 💍",
          order: 5
        },
        {
          text: "When you stayed awake late at night just because you knew that’s when I would finally reply after working on my projects 🌃❤️",
          order: 3
        },
      ],

      win: "And somehow… every moment was leading us to forever ❤️"
    },

    {
      num: 3,
      title: "The Proposal Story",
      icon: "💍",
      accent: "#F43F5E",
      type: "choice",

      question: "Which proposal became my forever favorite? ✨",

      hint: "One happened through a screen… the other came with birthday emotions and Vadapav ❤️",

      options: [
        {
          text: "That sweet WhatsApp confession 💬",
          emoji: "📱"
        },
        {
          text: "The birthday proposal with Vadapav 🌭",
          emoji: "🎂"
        },
        {
          text: "Both… because both carried your heart 💖",
          emoji: "💝"
        }
      ],

      correct: 2,

      win: "Two proposals. One forever love story and honestly… I fell for you a little more both times ❤️"
    },

    {
      num: 4,
      title: "Find My Heart",
      icon: "💝",
      accent: "#F43F5E",
      type: "hearts",

      question: "Find my heart among the many",

      hint: "One heart is glowing brighter than all the rest…",

      correctIndex: 7,

      win: "You always find my heart, wherever it hides 💖"
    },

    {
      num: 5,
      title: "Hidden Truth",
      icon: "🔐",
      accent: "#10B981",
      type: "decode",

      question: "Decode the truth my heart has known for years 💫",

      hint: "Every heartbeat already knows the answer ❤️",

      word: "Everything",

      revealText: "You are my everything… Tame mari jaan cho… mara praan cho… mara praan vase che tamara ma 🥹❤️",

      win: "And no matter where life takes us… my soul will always find home in you 💖"
    },

    {
      num: 6,
      title: "Little Things",
      icon: "✨",
      accent: "#8B5CF6",
      type: "choice",

      question: "What truly made me fall in love with you? ❤️",

      hint: "Not grand gestures… but the little things ✨",

      options: [
        {
          text: "The way you waited for my replies every night 🌙",
          emoji: "🥹"
        },
        {
          text: "The way you noticed tiny details about me that nobody else did 💖",
          emoji: "✨"
        },
        {
          text: "The way you remembered my routines better than I did 💻❤️",
          emoji: "💫"
        },
        {
          text: "The way you loved me patiently, softly, and endlessly 💞",
          emoji: "❤️"
        },
        {
          text: "All of the above",
          emoji: "💖✨"
        }
      ],

      correct: 4,

      win: "Love was never one big moment… it was always you, in every little thing ❤️"
    },

    {
      num: 7,
      title: "Love Meter",
      icon: "💗",
      accent: "#EC4899",
      type: "meter",

      question: "How compatible are we, really? 💞",

      hint: "Science is about to confirm what our hearts already know ✨",

      win: "Off the charts! Shocking absolutely nobody 💖"
    },

    {
      num: 8,
      title: "Two Proposals, One Forever ❤️",
      icon: "💍",
      accent: "#F472B6",
      type: "choice",

      question: "Do you know what made both of your proposals so unforgettable to me? ✨",

      hint: "One came through a screen… the other came with Vadapav and a racing heartbeat ❤️",

      options: [
        {
          text: "The way you gathered courage to confess your feelings on WhatsApp 💬",
          emoji: "📱"
        },
        {
          text: "The birthday proposal that somehow made Vadapav feel romantic 🌭🥹",
          emoji: "🎂"
        },
        {
          text: "The love, effort, and sincerity behind both moments ❤️",
          emoji: "💖"
        },
        {
          text: "The fact that you never stopped choosing me 💫",
          emoji: "✨"
        },
        {
          text: "Honestly… all of the above ❤️",
          emoji: "🥹"
        }
      ],

      correct: 4,

      win: "No matter how you proposed… my heart would always choose you ❤️"
    },

    {
      num: 9,
      title: "Our Forever",
      icon: "🌙",
      accent: "#6366F1",
      type: "multiselect",

      question: "What does our forever look like? ✨",

      hint: "Select every dream you want us to live together ❤️",

      options: [
        {
          text: "Travel every corner of the world together 🌍",
          emoji: "✈️"
        },
        {
          text: "Grow beautifully old together 🌿",
          emoji: "👴❤️👵"
        },
        {
          text: "Fill our home with laughter and warmth 🏡",
          emoji: "💞"
        },
        {
          text: "Dance together in the kitchen at midnight 💃",
          emoji: "🌙"
        },
        {
          text: "Keep falling in love with each other every single day ❤️",
          emoji: "✨"
        },
        {
          text: "All of this… and so much more 💫",
          emoji: "💖"
        }
      ],

      correct: 5,
      win: "Our future together is my favorite dream of all ❤️"
    },

    {
      num: 10,
      title: "The Final Unlock",
      icon: "🗝️",
      accent: "#FFD700",
      type: "final",

      question: "Will you continue this beautiful love story forever with me? 💛",

      hint: "This is the moment every memory has been leading toward ✨",

      win: "The answer that unlocks forever. Always yes. 💍❤️"
    }
  ],
  
  letter: {
      greeting: "To My Dearest Everything, My Jaan ❤️",

      paragraphs: [
        "Happy 10 Years to our Propose Day, babbu. 10 years ago, you proposed to me, and that one moment completely changed our lives forever. I feel so blessed every single day that you chose me to be part of your life.",

        "Thank you, my love, for loving me from 17th May 2016 until today — and for loving me more beautifully with every passing day. It honestly feels unbelievable that it has already been 10 years.",

        "Sometimes I still feel like we met just recently and slowly fell in love with each other all over again. Even after all these years, you still make me feel the same butterflies, the same excitement, and the same warmth. Our love never feels old to me — it still feels fresh, magical, and full of life.",

        "In these ten years, you have been my safest place and my greatest adventure. You have made me laugh until I cried, and held me when I cried until I could laugh again. You are the reason I believe, fully and completely, in forever.",

        "I am so addicted to you, jaan. I truly cannot imagine my life without you. My mornings start with you, and my days end with you only. You are my habit, my comfort, my happiness, and my home.",

        "Today, on this special day, I just want to thank you for everything — for every small effort you make for me, for making me feel deeply loved and cared for, for always making me your priority, and for standing beside me through everything.",

        "Bacha, will you spend your whole life loving only me? Babbu, will you always be mine no matter what happens? Jaan, will you always stay with me forever?",

        "Because I promise you this with all my heart — yes, I will always be yours, no matter what life brings. I will always stand beside you, love you unconditionally, and choose you in every lifetime.",

        "Happy 10 Years of loving us, my jaan. Here is to the next ten years, and every beautiful lifetime after that. ❤️",
      ],

      closing: "With all my heart, now and always,",

      signature: "Yours forever SurbhUddy ❤️",
      
    },

};
// ╔══════════════════════════════════════════════════════════════════╗
// ║  END OF CUSTOMIZATION SECTION                                    ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── CSS Animations ────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("lj-styles")) return;
  const s = document.createElement("style");
  s.id = "lj-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300;400;500;600&display=swap');
    .lj-root *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    .lj-root{position:fixed;inset:0;overflow-y:auto;overflow-x:hidden;background:linear-gradient(135deg,#0d0016 0%,#130024 40%,#0a0a2a 100%);font-family:'Quicksand','Helvetica Neue',sans-serif;color:#FFF8E7;min-height:100vh}
    .lj-serif{font-family:'Playfair Display',Georgia,serif}
    @keyframes lj-float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(4deg)}}
    @keyframes lj-floatUp{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-110vh) scale(0.4);opacity:0}}
    @keyframes lj-fadeInUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
    @keyframes lj-fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes lj-scaleIn{from{opacity:0;transform:scale(0.75)}to{opacity:1;transform:scale(1)}}
    @keyframes lj-glow{0%,100%{box-shadow:0 0 20px rgba(255,105,180,0.35)}50%{box-shadow:0 0 45px rgba(255,105,180,0.7),0 0 70px rgba(255,105,180,0.3)}}
    @keyframes lj-glowGold{0%,100%{box-shadow:0 0 20px rgba(255,215,0,0.4)}50%{box-shadow:0 0 50px rgba(255,215,0,0.8),0 0 80px rgba(255,215,0,0.3)}}
    @keyframes lj-shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes lj-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes lj-heartBeat{0%,100%{transform:scale(1)}15%{transform:scale(1.35)}30%{transform:scale(1)}45%{transform:scale(1.15)}}
    @keyframes lj-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes lj-twinkle{0%,100%{opacity:0.2;transform:scale(0.7)}50%{opacity:1;transform:scale(1.3)}}
    @keyframes lj-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
    @keyframes lj-meterFill{from{width:0%}to{width:100%}}
    @keyframes lj-confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
    @keyframes lj-scanLine{0%{top:-5%}100%{top:105%}}
    @keyframes lj-explosionRing{0%{transform:scale(0);opacity:1}100%{transform:scale(5);opacity:0}}
    @keyframes lj-letterRise{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes lj-candleFlicker{0%,100%{opacity:0.8;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
    @keyframes lj-starSpin{from{transform:rotate(0deg) scale(1)}to{transform:rotate(360deg) scale(1.2)}}
    .lj-a-fadeInUp{animation:lj-fadeInUp 0.7s ease forwards}
    .lj-a-fadeIn{animation:lj-fadeIn 0.5s ease forwards}
    .lj-a-scaleIn{animation:lj-scaleIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards}
    .lj-a-float{animation:lj-float 3.5s ease-in-out infinite}
    .lj-a-pulse{animation:lj-pulse 2s ease infinite}
    .lj-a-heartBeat{animation:lj-heartBeat 1.4s ease infinite}
    .lj-a-glow{animation:lj-glow 2s ease infinite}
    .lj-a-glowGold{animation:lj-glowGold 2s ease infinite}
    .lj-a-shimmer{animation:lj-shimmer 2s linear infinite}
    .lj-glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.10);border-radius:20px}
    .lj-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:16px 18px;cursor:pointer;transition:all 0.3s ease}
    .lj-card:hover{background:rgba(255,255,255,0.11);transform:translateY(-2px)}
    .lj-card.correct{background:rgba(16,185,129,0.18);border-color:rgba(16,185,129,0.55);box-shadow:0 0 20px rgba(16,185,129,0.25)}
    .lj-card.wrong{background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.4);animation:lj-shake 0.4s ease}
    .lj-card.selected{background:rgba(255,64,129,0.14);border-color:rgba(255,64,129,0.5)}
    .lj-btn{border:none;border-radius:50px;cursor:pointer;font-family:'Quicksand',sans-serif;font-weight:600;letter-spacing:0.5px;transition:all 0.3s ease}
    .lj-btn-rose{background:linear-gradient(135deg,#FF6B9D,#FF4081);color:#fff;animation:lj-glow 2s ease infinite}
    .lj-btn-rose:hover{transform:scale(1.06) translateY(-2px);box-shadow:0 0 50px rgba(255,64,129,0.6)}
    .lj-btn-gold{background:linear-gradient(135deg,#FFD700,#FFA500);color:#1a0028;animation:lj-glowGold 2s ease infinite}
    .lj-btn-gold:hover{transform:scale(1.06) translateY(-2px);box-shadow:0 0 60px rgba(255,215,0,0.65)}
    .lj-progress{height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;position:fixed;top:0;left:0;right:0;z-index:200}
    .lj-progress-fill{height:100%;background:linear-gradient(90deg,#FF4081,#FFD700,#FF4081);background-size:200%;animation:lj-shimmer 3s linear infinite;transition:width 0.9s cubic-bezier(0.4,0,0.2,1)}
    .lj-dots{position:fixed;top:14px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:200;padding:7px 14px;background:rgba(20,0,40,0.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:50px;border:1px solid rgba(255,255,255,0.08)}
    .lj-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.18);transition:all 0.4s ease}
    .lj-dot.done{background:linear-gradient(135deg,#FFD700,#FF4081);box-shadow:0 0 8px rgba(255,64,129,0.45)}
    .lj-dot.current{background:rgba(255,255,255,0.75);width:18px;border-radius:3px;box-shadow:0 0 10px rgba(255,255,255,0.35)}
    @keyframes lj-toastIn{0%{opacity:0;transform:translate(-50%,10px)}15%{opacity:1;transform:translate(-50%,0)}85%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,-6px)}}
    .lj-toast{position:fixed;bottom:84px;left:50%;background:rgba(20,0,40,0.95);border:1px solid rgba(255,105,180,0.45);border-radius:50px;padding:10px 22px;color:#FFF8E7;font-size:14px;font-weight:500;z-index:600;animation:lj-toastIn 2.4s ease forwards;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 8px 32px rgba(255,64,129,0.3);max-width:90%;text-align:center;pointer-events:none}
    .lj-wrong-shake{animation:lj-shake 0.45s ease}
    .lj-music{position:fixed;bottom:24px;right:20px;z-index:300;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all 0.3s ease}
    .lj-music:hover{background:rgba(255,255,255,0.18);transform:scale(1.1)}
    .lj-star{position:absolute;border-radius:50%;background:white;animation:lj-twinkle ease-in-out infinite}
  `;
  document.head.appendChild(s);
};

// ─── Background Stars ───────────────────────────────────────────────
function BackgroundStars() {
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 4,
      dur: 2 + Math.random() * 3,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {stars.current.map((s) => (
        <div
          key={s.id}
          className="lj-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Particles ─────────────────────────────────────────────
function Particle({ x, y, emoji, duration }) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        fontSize: 22,
        animation: `lj-floatUp ${duration}s ease-out forwards`,
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {emoji}
    </div>
  );
}

// ─── Level Header ───────────────────────────────────────────────────
function LevelHeader({ level }) {
  const data = STORY.levels[level - 1];
  return (
    <div className="lj-a-fadeInUp" style={{ textAlign: "center", padding: "28px 0 4px" }}>
      <div style={{ fontSize: 52, marginBottom: 6, display: "block", animation: "lj-float 3.5s ease-in-out infinite" }}>
        {data.icon}
      </div>
      <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,200,200,0.5)", marginBottom: 6 }}>
        Level {data.num} of 10
      </div>
      <div
        className="lj-serif"
        style={{
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 14,
          background: `linear-gradient(135deg, #FFD700, ${data.accent})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {data.title}
      </div>
      <div className="lj-serif" style={{ fontSize: 19, fontStyle: "italic", color: "#FFF8E7", marginBottom: 6, lineHeight: 1.45, padding: "0 8px" }}>
        "{data.question}"
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,248,231,0.45)", marginBottom: 22, lineHeight: 1.5 }}>
        {data.hint}
      </div>
    </div>
  );
}

// ─── Level 1 & 8: Choice ────────────────────────────────────────────
function ChoiceLevel({ data, levelNum, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [tries, setTries] = useState(0);
  const [toast, setToast] = useState(null);

  const flashToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2400);
  };

  const pick = (idx) => {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    const isCorrect = data.correct === "any" || idx === data.correct;
    setTimeout(() => {
      if (isCorrect) onComplete(levelNum);
      else {
        const t = tries + 1;
        setTries(t);
        setSelected(null);
        setLocked(false);
        flashToast(t >= 2 ? "Look closer — the heart already knows 💕" : "Almost — try another memory 💫");
      }
    }, 900);
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.options.map((opt, i) => {
          let cls = "lj-card";
          if (selected === i) cls += data.correct === "any" || i === data.correct ? " correct" : " wrong";
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              style={{ display: "flex", alignItems: "center", gap: 12, border: "none", width: "100%", textAlign: "left", color: "#FFF8E7" }}
            >
              <span style={{ fontSize: 26 }}>{opt.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35 }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {toast && <div key={toast.id} className="lj-toast">{toast.msg}</div>}
    </div>
  );
}

// ─── Level 2: Timeline ──────────────────────────────────────────────
function TimelineLevel({ data, levelNum, onComplete }) {
  const [clicked, setClicked] = useState([]);
  const [locked, setLocked] = useState(false);
  const [wrongKey, setWrongKey] = useState(null);
  const [toast, setToast] = useState(null);
  const items = useRef([...data.items].sort(() => Math.random() - 0.5));

  const flashToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2400);
  };

  const tap = (item) => {
    if (locked || clicked.find((c) => c.text === item.text)) return;
    const expected = clicked.length + 1;
    if (item.order === expected) {
      const next = [...clicked, item];
      setClicked(next);
      if (next.length === data.items.length) {
        setLocked(true);
        setTimeout(() => onComplete(levelNum), 900);
      }
    } else {
      setWrongKey(item.text);
      flashToast("Not quite — try a different memory 💕");
      setTimeout(() => setWrongKey(null), 500);
    }
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      <div style={{ background: "rgba(167,139,250,0.08)", borderRadius: 14, padding: "10px 12px", marginBottom: 14, fontSize: 13, color: "rgba(167,139,250,0.8)", textAlign: "center" }}>
        Tap in order: {clicked.length}/{data.items.length}
      </div>
      {items.current.map((item, i) => {
        const done = !!clicked.find((c) => c.text === item.text);
        const pos = clicked.findIndex((c) => c.text === item.text);
        const isWrong = wrongKey === item.text;
        return (
          <button
            key={i}
            onClick={() => tap(item)}
            className={isWrong ? "lj-wrong-shake" : ""}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px", borderRadius: 14, marginBottom: 10, width: "100%", textAlign: "left",
              background: isWrong ? "rgba(239,68,68,0.12)" : done ? "rgba(167,139,250,0.18)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${isWrong ? "rgba(239,68,68,0.4)" : done ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: "#FFF8E7", cursor: "pointer", transition: "all 0.3s ease", fontFamily: "inherit",
              transform: done ? "translateX(4px)" : "translateX(0)",
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              background: done ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)",
              border: `1px solid ${done ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.15)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: done ? "#C4B5FD" : "rgba(255,248,231,0.4)",
            }}>
              {done ? pos + 1 : "?"}
            </div>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{item.text}</span>
          </button>
        );
      })}
      {toast && <div key={toast.id} className="lj-toast">{toast.msg}</div>}
    </div>
  );
}

// ─── Level 3: Find the Heart ────────────────────────────────────────
function HeartsLevel({ data, levelNum, onComplete }) {
  const [found, setFound] = useState(false);
  const [wrong, setWrong] = useState(null);
  const [tries, setTries] = useState(0);
  const [toast, setToast] = useState(null);
  const hearts = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 6 + (i % 4) * 22 + Math.random() * 6,
      y: 10 + Math.floor(i / 4) * 30 + Math.random() * 8,
      delay: Math.random() * 2,
      dur: 2.5 + Math.random() * 1.5,
      isSpecial: i === data.correctIndex,
    }))
  );

  const flashToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2200);
  };

  const tap = (h) => {
    if (found) return;
    if (h.isSpecial) {
      setFound(true);
      setTimeout(() => onComplete(levelNum), 900);
    } else {
      setWrong(h.id);
      const t = tries + 1;
      setTries(t);
      if (t >= 3) flashToast("One heart glows brighter than the rest ✨");
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      <div style={{ position: "relative", height: 280, marginBottom: 10 }}>
        {hearts.current.map((h) => (
          <button
            key={h.id}
            onClick={() => tap(h)}
            style={{
              position: "absolute",
              left: `${h.x}%`,
              top: `${h.y}%`,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: h.isSpecial && found ? 52 : 30,
              animation: `lj-float ${h.dur}s ${h.delay}s ease-in-out infinite`,
              filter: h.isSpecial
                ? "drop-shadow(0 0 12px rgba(255,64,129,0.9)) drop-shadow(0 0 24px rgba(255,215,0,0.6))"
                : wrong === h.id
                ? "grayscale(1) opacity(0.4)"
                : "drop-shadow(0 0 4px rgba(255,100,150,0.3))",
              transition: "all 0.3s ease",
              transform: h.isSpecial ? "scale(1)" : "scale(0.9)",
            }}
          >
            {h.isSpecial ? "💖" : "🖤"}
          </button>
        ))}
      </div>
      {!found && (
        <div style={{ textAlign: "center", fontSize: 13, color: "rgba(244,63,94,0.6)" }}>
          One heart glows differently… find it 💫
        </div>
      )}
      {toast && <div key={toast.id} className="lj-toast">{toast.msg}</div>}
    </div>
  );
}

// ─── Level 4: Songs ─────────────────────────────────────────────────
function SongsLevel({ data, levelNum, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [wave, setWave] = useState(false);

  const pick = (i) => {
    if (locked) return;
    setSelected(i);
    setWave(true);
    setLocked(true);
    setTimeout(() => {
      if (i === data.correct) onComplete(levelNum);
      else { setSelected(null); setLocked(false); setWave(false); }
    }, 1100);
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      {wave && (
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16, height: 36, alignItems: "flex-end" }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 4, borderRadius: 2,
                background: `linear-gradient(180deg, #06B6D4, #A78BFA)`,
                height: `${10 + Math.abs(Math.sin((i + Date.now() / 200) * 0.8)) * 24}px`,
                animation: `lj-pulse ${0.3 + (i % 4) * 0.1}s ease infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.options.map((song, i) => {
          const isSel = selected === i;
          const isCorrect = isSel && i === data.correct;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 18px", borderRadius: 16, width: "100%", textAlign: "left",
                background: isCorrect ? "rgba(6,182,212,0.22)" : isSel ? "rgba(239,68,68,0.12)" : "rgba(6,182,212,0.07)",
                border: `1px solid ${isCorrect ? "rgba(6,182,212,0.6)" : isSel ? "rgba(239,68,68,0.4)" : "rgba(6,182,212,0.18)"}`,
                color: "#FFF8E7", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s ease",
                boxShadow: isCorrect ? "0 0 20px rgba(6,182,212,0.3)" : "none",
              }}
            >
              <span style={{ fontSize: 28 }}>{song.emoji}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{song.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,248,231,0.5)", marginTop: 2 }}>{song.artist}</div>
              </div>
              {i === data.correct && selected !== null && (
                <span style={{ marginLeft: "auto", fontSize: 20 }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Level 5: Decode ────────────────────────────────────────────────
function DecodeLevel({ data, levelNum, onComplete }) {
  const target = data.word.toUpperCase();
  const [typed, setTyped] = useState([]);
  const [locked, setLocked] = useState(false);
  const [wrongIdx, setWrongIdx] = useState(null);
  const [toast, setToast] = useState(null);

  // Scrambled alphabet tiles showing target letters + noise
  const allLetters = useRef(
    [...target.split(""), ..."LVEAMIOU".split("")]
      .sort(() => Math.random() - 0.5)
  );

  const flashToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2200);
  };

  const tap = (letter, idx) => {
    if (locked) return;
    if (typed.includes(idx)) return;
    const next = [...typed, idx];
    const formed = next.map((ti) => allLetters.current[ti]).join("");
    if (!target.startsWith(formed)) {
      // wrong letter — shake the tile, keep prior progress
      setWrongIdx(idx);
      flashToast("That letter doesn't fit yet 💫");
      setTimeout(() => setWrongIdx(null), 450);
      return;
    }
    setTyped(next);
    if (formed === target) {
      setLocked(true);
      setTimeout(() => onComplete(levelNum), 900);
    }
  };

  const formed = typed.map((ti) => allLetters.current[ti]).join("");

  return (
    <div>
      <LevelHeader level={levelNum} />
      {/* target slots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 22 }}>
        {target.split("").map((ch, i) => (
          <div
            key={i}
            style={{
              width: 40, height: 50, borderBottom: `2px solid rgba(16,185,129,0.5)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: i < formed.length ? "#6EE7B7" : "transparent",
              transition: "color 0.3s ease",
            }}
          >
            {i < formed.length ? formed[i] : "_"}
          </div>
        ))}
      </div>
      {/* letter tiles */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 16 }}>
        {allLetters.current.map((letter, i) => {
          const used = typed.includes(i);
          const isWrong = wrongIdx === i;
          return (
            <button
              key={i}
              onClick={() => tap(letter, i)}
              className={isWrong ? "lj-wrong-shake" : ""}
              style={{
                width: 44, height: 50, borderRadius: 10,
                background: isWrong ? "rgba(239,68,68,0.18)" : used ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.08)",
                border: `1px solid ${isWrong ? "rgba(239,68,68,0.5)" : used ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.15)"}`,
                color: used ? "rgba(16,185,129,0.5)" : "#FFF8E7",
                fontSize: 20, fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                cursor: used ? "default" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
      {typed.length > 0 && !locked && (
        <button
          onClick={() => setTyped([])}
          style={{
            display: "block", margin: "0 auto", padding: "8px 20px", borderRadius: 50,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,248,231,0.5)", fontSize: 13, cursor: "pointer",
          }}
        >
          ↩ Reset
        </button>
      )}
      {toast && <div key={toast.id} className="lj-toast">{toast.msg}</div>}
    </div>
  );
}

// ─── Level 6: Journey ───────────────────────────────────────────────
function JourneyLevel({ data, levelNum, onComplete }) {
  const [visited, setVisited] = useState([]);

  const tap = (i) => {
    if (visited.includes(i)) return;
    if (i !== visited.length) return; // must go in order
    const next = [...visited, i];
    setVisited(next);
    if (next.length === data.waypoints.length) {
      setTimeout(() => onComplete(levelNum), 800);
    }
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      {/* Journey line */}
      <div style={{ position: "relative", paddingLeft: 40, marginBottom: 8 }}>
        {data.waypoints.map((wp, i) => {
          const done = visited.includes(i);
          const isNext = i === visited.length;
          return (
            <div key={i} style={{ position: "relative", marginBottom: i < data.waypoints.length - 1 ? 0 : 0 }}>
              {/* connector line */}
              {i < data.waypoints.length - 1 && (
                <div style={{
                  position: "absolute", left: -20, top: 42, width: 2, height: "calc(100% - 0px)",
                  background: done ? "linear-gradient(180deg, rgba(245,158,11,0.6), rgba(245,158,11,0.2))" : "rgba(255,255,255,0.08)",
                  transition: "background 0.5s ease",
                }} />
              )}
              {/* dot */}
              <div style={{
                position: "absolute", left: -28, top: 16, width: 16, height: 16,
                borderRadius: "50%", background: done ? "#F59E0B" : isNext ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.12)",
                border: `2px solid ${done ? "#FFD700" : isNext ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.15)"}`,
                transition: "all 0.4s ease",
                boxShadow: done ? "0 0 10px rgba(255,215,0,0.5)" : "none",
              }} />
              <button
                onClick={() => tap(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 18px", borderRadius: 14, marginBottom: 10, width: "100%", textAlign: "left",
                  background: done ? "rgba(245,158,11,0.16)" : isNext ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${done ? "rgba(245,158,11,0.5)" : isNext ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: done ? "#FDE68A" : isNext ? "#FFF8E7" : "rgba(255,248,231,0.4)",
                  cursor: done || !isNext ? "default" : "pointer",
                  fontFamily: "inherit", transition: "all 0.3s ease",
                  transform: done ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <span style={{ fontSize: 26 }}>{wp.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: done ? 600 : 500 }}>{wp.label}</span>
                {done && <span style={{ marginLeft: "auto", fontSize: 18 }}>✓</span>}
                {isNext && !done && <span style={{ marginLeft: "auto", fontSize: 14, color: "rgba(245,158,11,0.6)" }}>→ tap</span>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Level 7: Love Meter ────────────────────────────────────────────
function MeterLevel({ data, levelNum, onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [meterWidth, setMeterWidth] = useState(0);
  const [phase, setPhase] = useState(0); // 0=idle 1=scanning 2=done
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef();

  const startScan = () => {
    if (phase !== 0) return;
    setPhase(1);
    setScanning(true);
    let start = null;
    const dur = 3000;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setScanY(p * 100);
      setMeterWidth(Math.min(p * 110, 100));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
      else {
        setMeterWidth(100);
        setPhase(2);
        setScanning(false);
        setTimeout(() => onComplete(levelNum), 1200);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div>
      <LevelHeader level={levelNum} />
      {/* Scanner box */}
      <div
        className="lj-glass"
        style={{ padding: 24, textAlign: "center", marginBottom: 20, position: "relative", overflow: "hidden" }}
      >
        {phase === 1 && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #EC4899, transparent)",
            top: `${scanY}%`, transition: "top 0.05s linear",
            boxShadow: "0 0 12px rgba(236,72,153,0.8)",
          }} />
        )}
        <div style={{ fontSize: 40, marginBottom: 12, animation: phase > 0 ? "lj-heartBeat 1s ease infinite" : "none" }}>
          {phase === 2 ? "💯" : "💗"}
        </div>
        <div className="lj-serif" style={{ fontSize: 17, marginBottom: 16, color: "rgba(255,248,231,0.7)" }}>
          {phase === 0 && "Scanning compatibility…"}
          {phase === 1 && "Calculating…"}
          {phase === 2 && "Analysis complete 💞"}
        </div>
        {phase > 0 && (
          <>
            {[
              { label: "Love", pct: meterWidth },
              { label: "Trust", pct: Math.min(meterWidth * 1.01, 100) },
              { label: "Magic", pct: Math.min(meterWidth * 1.01, 100) },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: 12, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,248,231,0.55)", marginBottom: 4 }}>
                  <span>{bar.label}</span>
                  <span>{Math.round(bar.pct)}%</span>
                </div>
                <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${bar.pct}%`,
                    background: "linear-gradient(90deg, #FF4081, #FFD700, #FF4081)",
                    backgroundSize: "200%",
                    animation: "lj-shimmer 2s linear infinite",
                    borderRadius: 5, transition: "width 0.1s linear",
                  }} />
                </div>
              </div>
            ))}
            {phase === 2 && (
              <div style={{ marginTop: 12, padding: "10px 16px", borderRadius: 12, background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700", fontSize: 14, fontWeight: 600 }}>
                ✨ 100% Soulmate Match ✨
              </div>
            )}
          </>
        )}
      </div>
      {phase === 0 && (
        <button
          className="lj-btn lj-btn-rose"
          onClick={startScan}
          style={{ display: "block", margin: "0 auto", padding: "14px 32px", fontSize: 16 }}
        >
          💗 Run Love Scan
        </button>
      )}
    </div>
  );
}

// ─── Level 9: Multi Select ──────────────────────────────────────────
function MultiSelectLevel({ data, levelNum, onComplete }) {
  const [selected, setSelected] = useState(new Set());
  const [locked, setLocked] = useState(false);
  const [toast, setToast] = useState(null);

  const flashToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2400);
  };

  const toggle = (i) => {
    if (locked) return;
    const s = new Set(selected);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelected(s);
  };

  const confirm = () => {
    if (selected.size === 0 || locked) return;
    const validSelection =
      data.correct === undefined ||
      selected.has(data.correct) ||
      selected.size === data.options.length;
    if (!validSelection) {
      flashToast("Pick the dream that holds them all 💖");
      return;
    }
    setLocked(true);
    setTimeout(() => onComplete(levelNum), 400);
  };

  return (
    <div>
      <LevelHeader level={levelNum} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {data.options.map((opt, i) => {
          const sel = selected.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 18px", borderRadius: 14, width: "100%", textAlign: "left",
                background: sel ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.06)",
                border: `1px solid ${sel ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.18)"}`,
                color: sel ? "#C7D2FE" : "#FFF8E7",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s ease",
                transform: sel ? "translateX(4px)" : "none",
                boxShadow: sel ? "0 0 14px rgba(99,102,241,0.2)" : "none",
              }}
            >
              <span style={{ fontSize: 26 }}>{opt.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: sel ? 600 : 500 }}>{opt.text}</span>
              {sel && <span style={{ marginLeft: "auto", fontSize: 16, color: "#818CF8" }}>✓</span>}
            </button>
          );
        })}
      </div>
      {selected.size > 0 && (
        <button
          className="lj-btn lj-btn-rose"
          onClick={confirm}
          style={{ display: "block", margin: "0 auto", padding: "14px 32px", fontSize: 16 }}
        >
          These are my dreams ❤️
        </button>
      )}
      {toast && <div key={toast.id} className="lj-toast">{toast.msg}</div>}
    </div>
  );
}

// ─── Level 10: Final ────────────────────────────────────────────────
function FinalLevel({ data, levelNum, onComplete }) {
  const [state, setState] = useState("idle"); // idle | unlocking | done

  const sayYes = () => {
    if (state !== "idle") return;
    setState("unlocking");
    setTimeout(() => {
      setState("done");
      setTimeout(() => onComplete(levelNum), 1000);
    }, 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <LevelHeader level={levelNum} />
      <div className="lj-glass" style={{ padding: 28, marginBottom: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 14, animation: "lj-heartBeat 1.2s ease infinite" }}>
          {state === "done" ? "💛" : state === "unlocking" ? "🔓" : "🗝️"}
        </div>
        {state === "idle" && (
          <div className="lj-serif" style={{ fontSize: 20, fontStyle: "italic", color: "#FFF8E7", lineHeight: 1.5 }}>
            This is the moment
            <br />
            everything has been building toward…
          </div>
        )}
        {state === "unlocking" && (
          <div>
            <div className="lj-serif" style={{ fontSize: 18, color: "#FFD700", marginBottom: 16, animation: "lj-pulse 0.5s ease infinite" }}>
              Unlocking your love story…
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFD700, #FF4081)",
                  animation: `lj-pulse 0.6s ${i * 0.12}s ease infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        {state === "done" && (
          <div className="lj-serif" style={{ fontSize: 20, color: "#FFD700", animation: "lj-scaleIn 0.5s ease forwards" }}>
            The vault is open 💛
          </div>
        )}
      </div>
      {state === "idle" && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            className="lj-btn lj-btn-gold"
            onClick={sayYes}
            style={{ padding: "16px 36px", fontSize: 18, minWidth: 130 }}
          >
            Yes, Forever 💍
          </button>
          <button
            onClick={sayYes}
            style={{
              padding: "16px 24px", fontSize: 14, borderRadius: 50,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,248,231,0.35)", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Hmm… 🤔
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Landing Screen ─────────────────────────────────────────────────
function LandingScreen({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
      {/* Ambient rings */}
      {[200, 280, 360].map((size, i) => (
        <div key={i} style={{
          position: "absolute", width: size, height: size,
          borderRadius: "50%", border: "1px solid rgba(255,105,180,0.08)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          animation: `lj-pulse ${3 + i * 0.7}s ${i * 0.3}s ease infinite`,
        }} />
      ))}
      <div style={{ fontSize: 68, marginBottom: 16, animation: "lj-heartBeat 1.8s ease infinite" }}>💑</div>
      <div
        className="lj-serif"
        style={{
          fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 12,
          background: "linear-gradient(135deg, #FFD700, #FF80AB, #FFD700)",
          backgroundSize: "200%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "lj-shimmer 4s linear infinite",
        }}
      >
        {STORY.yearsLabel}
      </div>
      <div className="lj-serif" style={{ fontSize: 18, fontStyle: "italic", color: "rgba(255,248,231,0.6)", marginBottom: 10 }}>
        A journey made only for you
      </div>
      <div style={{ fontSize: 22, marginBottom: 36, animation: "lj-float 2.5s ease-in-out infinite" }}>❤️</div>
      <button
        className="lj-btn lj-btn-rose"
        onClick={onStart}
        style={{ padding: "18px 42px", fontSize: 17 }}
      >
        Begin Our Journey ✨
      </button>
      <div style={{ marginTop: 20, fontSize: 13, color: "rgba(255,248,231,0.3)" }}>
        10 levels of love await
      </div>
      {/* Floating ambient hearts */}
      {["💗", "💕", "✨", "🌹", "💫", "⭐"].map((em, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${5 + i * 16}%`,
          top: `${10 + (i % 3) * 25}%`,
          fontSize: 18 + (i % 3) * 6,
          opacity: 0.25 + (i % 3) * 0.1,
          animation: `lj-float ${3 + i * 0.4}s ${i * 0.5}s ease-in-out infinite`,
          pointerEvents: "none",
        }}>
          {em}
        </div>
      ))}
    </div>
  );
}

// ─── Level Transition ───────────────────────────────────────────────
function LevelTransition({ nextLevel }) {
  const data = STORY.levels[nextLevel - 1];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: "radial-gradient(circle at center, rgba(20,0,40,0.98) 0%, rgba(5,0,20,0.99) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "lj-fadeIn 0.3s ease",
    }}>
      <div style={{ textAlign: "center", animation: "lj-scaleIn 0.4s ease" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>{data?.icon || "💫"}</div>
        <div className="lj-serif" style={{ fontSize: 22, color: "#FFD700" }}>
          Level {nextLevel}
        </div>
        <div className="lj-serif" style={{ fontSize: 16, color: "rgba(255,248,231,0.5)", marginTop: 6 }}>
          {data?.title}
        </div>
      </div>
    </div>
  );
}

// ─── Success Overlay ────────────────────────────────────────────────
function SuccessOverlay({ message }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 500, padding: 24,
    }}>
      <div className="lj-glass" style={{
        padding: "32px 28px", textAlign: "center", maxWidth: 320,
        animation: "lj-scaleIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
      }}>
        <div style={{ fontSize: 56, marginBottom: 14, animation: "lj-heartBeat 1s ease infinite" }}>✨</div>
        <div className="lj-serif" style={{ fontSize: 22, color: "#FFD700", marginBottom: 10 }}>
          Beautiful!
        </div>
        <div style={{ fontSize: 15, color: "rgba(255,248,231,0.75)", lineHeight: 1.55 }}>
          {message}
        </div>
      </div>
    </div>
  );
}

// ─── Love Letter Screen ─────────────────────────────────────────────
function LoveLetterScreen({ onContinue }) {
  const [phase, setPhase] = useState(0); // 0=envelope 1=opening 2=letter
  const [letterIdx, setLetterIdx] = useState(-1);
  const [typeText, setTypeText] = useState("");
  const [paraIdx, setParaIdx] = useState(0);
  const letter = STORY.letter;

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 2 && letterIdx < letter.paragraphs.length) {
      const t = setTimeout(() => setLetterIdx((p) => p + 1), 500);
      return () => clearTimeout(t);
    }
  }, [phase, letterIdx]);

  return (
    <div style={{ minHeight: "100vh", padding: "40px 16px 60px", position: "relative", zIndex: 1 }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,100,150,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Candle flickers */}
      {["🕯️", "🕯️"].map((c, i) => (
        <div key={i} style={{
          position: "fixed", fontSize: 28,
          left: i === 0 ? "8%" : "auto", right: i === 1 ? "8%" : "auto",
          top: "12%", animation: "lj-candleFlicker 1.5s ease-in-out infinite",
          animationDelay: `${i * 0.3}s`, pointerEvents: "none",
        }}>
          {c}
        </div>
      ))}

      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* Envelope phase */}
        {phase < 2 && (
          <div style={{ textAlign: "center", animation: "lj-fadeInUp 0.6s ease" }}>
            <div style={{ fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,215,0,0.5)", marginBottom: 20 }}>
              A letter for you
            </div>
            <div style={{
              width: 180, height: 130, margin: "0 auto 24px",
              position: "relative", filter: "drop-shadow(0 20px 40px rgba(255,100,150,0.3))",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #2d1b3d, #1a0d2e)",
                border: "2px solid rgba(255,215,0,0.35)", borderRadius: 10,
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 65,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(135deg, #3d2050, #2d1b3d)",
                borderBottom: "2px solid rgba(255,215,0,0.25)",
                transformOrigin: "top center",
                transition: "transform 0.8s ease",
                transform: phase === 1 ? "rotateX(-180deg)" : "rotateX(0deg)",
              }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                💌
              </div>
            </div>
            <div className="lj-serif" style={{ fontSize: 18, color: "rgba(255,248,231,0.6)", fontStyle: "italic" }}>
              {phase === 0 ? "A letter sealed with love…" : "Opening with love…"}
            </div>
          </div>
        )}

        {/* Letter phase */}
        {phase === 2 && (
          <div style={{ animation: "lj-letterRise 0.8s ease forwards" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,215,0,0.5)", marginBottom: 8 }}>
                A love letter
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                {["🌹", "💛", "🌹"].map((e, i) => (
                  <span key={i} style={{ fontSize: 18, animation: `lj-float ${2 + i * 0.3}s ease-in-out infinite` }}>{e}</span>
                ))}
              </div>
            </div>

            {/* Letter paper */}
            <div style={{
              background: "linear-gradient(180deg, #FFF8E7 0%, #FFF0D6 100%)",
              borderRadius: 16, padding: "32px 28px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,215,0,0.2)",
              color: "#2d1b3d", position: "relative", overflow: "hidden",
            }}>
              {/* Paper lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  position: "absolute", left: 0, right: 0,
                  top: 60 + i * 30, height: 1,
                  background: "rgba(100,60,120,0.07)",
                  pointerEvents: "none",
                }} />
              ))}
              {/* Red margin line */}
              <div style={{ position: "absolute", left: 44, top: 0, bottom: 0, width: 1, background: "rgba(220,80,80,0.18)" }} />

              <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {/* Date */}
                {letterIdx >= -1 && (
                  <div style={{ textAlign: "right", fontSize: 13, color: "rgba(80,40,100,0.55)", marginBottom: 20, animation: "lj-fadeIn 0.5s ease" }}>
                    {letter.date}
                  </div>
                )}
                {/* Greeting */}
                {letterIdx >= -1 && (
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 18, color: "#3d2050", animation: "lj-fadeIn 0.5s ease" }}>
                    {letter.greeting}
                  </div>
                )}
                {/* Paragraphs */}
                {letter.paragraphs.map((para, i) => (
                  letterIdx > i && (
                    <div key={i} style={{
                      fontSize: 15, lineHeight: 1.8, color: "#4a2060", marginBottom: 16,
                      animation: "lj-fadeInUp 0.6s ease forwards",
                      animationDelay: `${i * 0.1}s`,
                    }}>
                      {para}
                    </div>
                  )
                ))}
                {/* Closing */}
                {letterIdx >= letter.paragraphs.length && (
                  <div style={{ marginTop: 24, animation: "lj-fadeInUp 0.6s ease" }}>
                    <div style={{ fontSize: 15, color: "#4a2060", marginBottom: 8 }}>{letter.closing}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#7B2D8B", fontStyle: "italic" }}>
                      {letter.signature}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Continue button */}
            {letterIdx >= letter.paragraphs.length && (
              <div style={{ textAlign: "center", marginTop: 30, animation: "lj-fadeInUp 0.6s ease" }}>
                <button
                  className="lj-btn lj-btn-gold"
                  onClick={onContinue}
                  style={{ padding: "16px 36px", fontSize: 16 }}
                >
                  💛 Continue to Celebration
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Ending Screen ──────────────────────────────────────────────────
function EndingScreen({ onReplay }) {
  const [confetti] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      dur: 4 + Math.random() * 3,
      color: ["#FF4081", "#FFD700", "#A78BFA", "#06B6D4", "#10B981"][Math.floor(Math.random() * 5)],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
    }))
  );
  const [floaters] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      dur: 5 + Math.random() * 4,
      delay: Math.random() * 4,
      em: ["💖", "💕", "🌹", "✨", "💫", "⭐"][Math.floor(Math.random() * 6)],
    }))
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
      {/* Confetti */}
      {confetti.map((c) => (
        <div key={c.id} style={{
          position: "fixed", left: `${c.x}%`, top: -20,
          width: c.size, height: c.size,
          background: c.color, borderRadius: 2,
          transform: `rotate(${c.rotate}deg)`,
          animation: `lj-confetti ${c.dur}s ${c.delay}s linear infinite`,
          opacity: 0.85, pointerEvents: "none",
        }} />
      ))}
      {/* Heart floaters */}
      {floaters.map((f) => (
        <div key={f.id} style={{
          position: "fixed", left: `${f.x}%`, top: "90%",
          fontSize: 16 + Math.random() * 10,
          animation: `lj-floatUp ${f.dur}s ${f.delay}s ease-in-out infinite`,
          pointerEvents: "none", zIndex: 0,
        }}>
          {f.em}
        </div>
      ))}

      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 340, height: 340, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,215,0,0.14) 0%, transparent 70%)",
        animation: "lj-pulse 3s ease infinite",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 72, marginBottom: 16, animation: "lj-heartBeat 1.5s ease infinite" }}>
          💑
        </div>
        <div
          className="lj-serif"
          style={{
            fontSize: 30, fontWeight: 700, lineHeight: 1.25, marginBottom: 10,
            background: "linear-gradient(135deg, #FFD700, #FF80AB, #FFD700)",
            backgroundSize: "200%", animation: "lj-shimmer 4s linear infinite",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          Happy 10 Years of
          <br />
          Loving You 💛
        </div>
        <div className="lj-serif" style={{ fontSize: 16, fontStyle: "italic", color: "rgba(255,248,231,0.55)", marginBottom: 8, lineHeight: 1.55 }}>
          Here's to every year before us —
          <br />
          each one more beautiful than the last.
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "20px 0 28px", flexWrap: "wrap" }}>
          {["🎊", "🌹", "💍", "✨", "🥂", "💫"].map((e, i) => (
            <span key={i} style={{ fontSize: 28, animation: `lj-float ${2 + i * 0.3}s ${i * 0.2}s ease-in-out infinite` }}>
              {e}
            </span>
          ))}
        </div>

        {/* Achievement badges */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {["10 Levels Complete", "Love Certified", "Forever Unlocked"].map((badge, i) => (
            <div key={i} style={{
              padding: "6px 14px", borderRadius: 50,
              background: `rgba(${["255,215,0", "255,64,129", "167,139,250"][i]},0.15)`,
              border: `1px solid rgba(${["255,215,0", "255,64,129", "167,139,250"][i]},0.4)`,
              fontSize: 12, fontWeight: 600,
              color: `rgba(${["255,215,0", "255,64,129", "167,139,250"][i]},0.9)`,
              animation: `lj-fadeInUp 0.6s ${i * 0.2}s ease forwards`, opacity: 0,
            }}>
              ✦ {badge}
            </div>
          ))}
        </div>

        <button
          className="lj-btn lj-btn-gold"
          onClick={onReplay}
          style={{ padding: "16px 36px", fontSize: 16 }}
        >
          ↩ Replay Our Journey
        </button>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedCount, setCompletedCount] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextLevelNum, setNextLevelNum] = useState(1);
  const [particles, setParticles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const pidRef = useRef(0);

  useEffect(() => { injectStyles(); }, []);

  const burst = useCallback((count = 14) => {
    const ps = Array.from({ length: count }, (_, i) => ({
      id: ++pidRef.current,
      x: 40 + Math.random() * (window.innerWidth - 80),
      y: 60 + Math.random() * (window.innerHeight * 0.4),
      emoji: ["💖", "✨", "🌹", "💫", "⭐", "💝", "🎊"][Math.floor(Math.random() * 7)],
      duration: 2.5 + Math.random() * 2,
    }));
    setParticles((prev) => [...prev, ...ps]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !ps.find((n) => n.id === p.id))), 5000);
  }, []);

  const completeLevel = useCallback((levelNum) => {
    const data = STORY.levels[levelNum - 1];
    setSuccessMsg(data?.win || "");
    setShowSuccess(true);
    burst(18);

    setTimeout(() => {
      setShowSuccess(false);
      setCompletedCount(levelNum);
      const goTo = levelNum < 10 ? levelNum + 1 : null;

      setTransitioning(true);
      setNextLevelNum(goTo || levelNum);

      setTimeout(() => {
        setTransitioning(false);
        if (goTo) {
          setCurrentLevel(goTo);
          setScreen("level");
        } else {
          setScreen("letter");
        }
      }, 1200);
    }, 2600);
  }, [burst]);

  const renderLevel = () => {
    const data = STORY.levels[currentLevel - 1];
    const props = { data, levelNum: currentLevel, onComplete: completeLevel };
    switch (data.type) {
      case "choice":      return <ChoiceLevel {...props} />;
      case "timeline":    return <TimelineLevel {...props} />;
      case "hearts":      return <HeartsLevel {...props} />;
      case "songs":       return <SongsLevel {...props} />;
      case "decode":      return <DecodeLevel {...props} />;
      case "journey":     return <JourneyLevel {...props} />;
      case "meter":       return <MeterLevel {...props} />;
      case "multiselect": return <MultiSelectLevel {...props} />;
      case "final":       return <FinalLevel {...props} />;
      default:            return null;
    }
  };

  return (
    <div className="lj-root">
      <BackgroundStars />

      {/* Particles */}
      {particles.map((p) => <Particle key={p.id} {...p} />)}

      {/* Level dots */}
      {screen === "level" && (
        <div className="lj-dots" aria-label={`Level ${currentLevel} of 10`}>
          {Array.from({ length: 10 }, (_, i) => {
            const n = i + 1;
            const cls = n <= completedCount ? "lj-dot done" : n === currentLevel ? "lj-dot current" : "lj-dot";
            return <div key={n} className={cls} title={`Level ${n}`} />;
          })}
        </div>
      )}

      {/* Music toggle */}
      <div className="lj-music" onClick={() => setMusicOn((m) => !m)} title={musicOn ? "Mute" : "Music"}>
        {musicOn ? "🔊" : "🔇"}
      </div>

      {/* Level transition overlay */}
      {transitioning && <LevelTransition nextLevel={nextLevelNum} />}

      {/* Success overlay */}
      {showSuccess && <SuccessOverlay message={successMsg} />}

      {/* Screens */}
      {screen === "landing" && (
        <LandingScreen onStart={() => { setCurrentLevel(1); setCompletedCount(0); setScreen("level"); }} />
      )}

      {screen === "level" && !transitioning && (
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "56px 16px 80px", position: "relative", zIndex: 1 }}>
          {renderLevel()}
        </div>
      )}

      {screen === "letter" && (
        <LoveLetterScreen onContinue={() => { burst(30); setScreen("ending"); }} />
      )}

      {screen === "ending" && (
        <EndingScreen onReplay={() => { setCurrentLevel(1); setCompletedCount(0); setScreen("landing"); }} />
      )}
    </div>
  );
}
