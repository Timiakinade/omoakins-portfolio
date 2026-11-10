// Built in case studies. Used when Supabase is not connected, and as the
// seed for the case_studies table. Every case study is an ordered array of
// blocks (see lib/blocks.js). A "section" block starts a numbered section,
// which is what the progress sidebar lists.
//
// Images: leave src empty and the page renders a sized frame with the
// caption, so layouts hold until real exports are uploaded.

export const caseStudies = [
  {
    slug: "uba-send-money",
    position: 1,
    status: "published",
    category: "product",
    subgroup: "",
    badge: "Case study", // TODO switch to "Shipped" if this was done with UBA
    kind: "Mobile app",
    client: "UBA",
    year: "2026",
    title: "People open the UBA app for one job: sending money.",
    summary:
      "18 of 20 people I surveyed send money to other banks, so the redesign starts there: account number first, real progress, and a failure screen that says whether you were charged.",
    tags: ["Research", "Fintech", "iOS"],
    meta: [
      { label: "Role", value: "Solo researcher and designer" },
      { label: "Client", value: "Self initiated" }, // TODO confirm
      { label: "Year", value: "2026" },
      { label: "Platform", value: "Mobile app" },
      { label: "Tools", value: "Figma" },
    ],
    cover: { src: "", alt: "Redesigned UBA send money screens", ratio: 1.6 },
    theme: {
      mode: "light",
      bg: "#FBF7F6",
      surface: "#FFFFFF",
      ink: "#1C1213",
      muted: "#6E6162",
      line: "#EADFDF",
      accent: "#D6001C",
      accentSoft: "#FBE4E6",
      onAccent: "#FFFFFF",
    },
    external_url: "https://www.behance.net/gallery/257145737",
    external_label: "See the full case study on Behance",
    blocks: [
      { type: "section", label: "The problem", title: "Why does sending money in the UBA app still feel uncertain?" },
      {
        type: "text",
        width: "prose",
        body: [
          "Transfers are the reason most people open a banking app, and the one place doubt costs the most. A wrong bank, a spinner that never resolves, or a failed transfer with no word on whether money left the account all push people to call support or switch apps.",
          "I surveyed 20 UBA users and interviewed a smaller group about their last few transfers.",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "18 of 20", label: "send money to other banks" },
          { value: "13 of 20", label: "have abandoned a task midway" },
          { value: "16 of 20", label: "have used a better looking bank app" },
          { value: "3 of 20", label: "rated their satisfaction 4 out of 5" },
        ],
      },
      { type: "section", label: "Key decisions", title: "Three changes, each aimed at a moment of doubt." },
      {
        type: "decisions",
        items: [
          {
            title: "Account number first, bank matched for you",
            body: "People were entering a bank, then an account number, then starting over when the name did not resolve. Leading with the number and suggesting the bank removes the reset loop interviewees described.",
          },
          {
            title: "Progress instead of a spinner",
            body: "A spinner says nothing about where the money is. A short step by step status shows the transfer moving, so waiting reads as progress rather than a freeze.",
          },
          {
            title: "A failure screen that answers the real question",
            body: "When a transfer fails, the first thing people want to know is whether they were charged. The new screen says what happened, whether money left the account, and what to do next.",
          },
        ],
      },
      { type: "image", width: "wide", src: "", alt: "Proposed send money flow", ratio: 2.2, caption: "Proposed flow" },
      { type: "section", label: "Screens", title: "The send money flow, end to end." },
      {
        type: "slider",
        items: [
          { src: "", alt: "Recipient entry", ratio: 0.46, caption: "Recipient" },
          { src: "", alt: "Bank match", ratio: 0.46, caption: "Bank match" },
          { src: "", alt: "Amount", ratio: 0.46, caption: "Amount" },
          { src: "", alt: "Review", ratio: 0.46, caption: "Review" },
          { src: "", alt: "Progress", ratio: 0.46, caption: "Progress" },
          { src: "", alt: "Failure state", ratio: 0.46, caption: "Failure, with charge status" },
        ],
      },
      { type: "section", label: "Prototype", title: "Try the flow yourself." },
      {
        type: "prototype",
        url: "https://uba-redesign.vercel.app/",
        label: "Open the prototype",
        title: "Send money prototype",
        note: "The full send money flow, clickable end to end: recipient, bank match, review, progress and the failure state. Best on a phone.",
      },
      { type: "section", label: "Outcome", title: "What the test taught me." },
      {
        type: "stats",
        items: [
          { value: "9.4s", label: "median pause on the failure screen, reading before acting" },
          { value: "4 of 8", label: "testers checked transfer status next" }, // TODO confirm 8 vs 10 testers
          { value: "3 of 8", label: "testers retried the transfer" },
        ],
      },
      { type: "callout", text: "Testing is still running. These numbers will update as more sessions come in." },
      { type: "outbound" },
    ],
  },
  {
    slug: "providus-mobile",
    position: 2,
    status: "published",
    category: "product",
    subgroup: "",
    badge: "Case study",
    kind: "Mobile app",
    client: "Providus Bank",
    year: "2026", // TODO confirm
    title: "Redesigning the Providus Bank mobile experience.",
    summary: "A redesign study of the Providus Bank app. The full on site write up is coming; the complete study is on Behance.",
    tags: ["Redesign", "Fintech", "Mobile"],
    meta: [
      { label: "Role", value: "Product designer" },
      { label: "Client", value: "Self initiated" }, // TODO confirm
      { label: "Platform", value: "Mobile app" },
    ],
    cover: { src: "", alt: "Providus Bank app redesign", ratio: 1.6 },
    theme: {
      mode: "dark",
      bg: "#101114",
      surface: "#17181C",
      ink: "#F4F2EC",
      muted: "#A19E95",
      line: "#26272C",
      accent: "#E8B21E", // TODO pick exact brand hex from Figma
      accentSoft: "#2A2414",
      onAccent: "#101114",
    },
    external_url: "https://www.behance.net/gallery/251545521/Redesigning-the-Providus-Bank-Mobile-Experience",
    external_label: "See the full case study on Behance",
    blocks: [
      { type: "section", label: "Overview", title: "The full write up is on its way." },
      {
        type: "text",
        width: "prose",
        body: ["This page will carry the problem, the key decisions and the outcome. Until then, the full study with research, flows and screens is on Behance."],
      },
      { type: "outbound" },
    ],
  },
  {
    slug: "lg-app",
    position: 3,
    status: "published",
    category: "product",
    subgroup: "",
    badge: "Case study",
    kind: "Mobile app",
    client: "LG",
    year: "2026", // TODO confirm
    title: "Redesigning the LG app.",
    summary: "A redesign study of the LG companion app. The full on site write up is coming soon.",
    tags: ["Redesign", "Consumer", "Mobile"],
    meta: [
      { label: "Role", value: "Product designer" },
      { label: "Client", value: "Self initiated" }, // TODO confirm
      { label: "Platform", value: "Mobile app" },
    ],
    cover: { src: "", alt: "LG app redesign", ratio: 1.6 },
    theme: {
      mode: "light",
      bg: "#F7F6F4",
      surface: "#FFFFFF",
      ink: "#141414",
      muted: "#6B6A66",
      line: "#E5E3DF",
      accent: "#A50034",
      accentSoft: "#F6E3E9",
      onAccent: "#FFFFFF",
    },
    external_url: "", // TODO Behance link
    external_label: "See the full case study on Behance",
    blocks: [
      { type: "section", label: "Overview", title: "The full write up is on its way." },
      {
        type: "text",
        width: "prose",
        body: ["This page will carry the problem, the key decisions and the outcome once the write up is finished."],
      },
      { type: "outbound" },
    ],
  },
];
