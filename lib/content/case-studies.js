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
    tags: ["UX research", "Fintech", "Mobile"],
    meta: [
      { label: "Role", value: "Solo researcher and designer" },
      { label: "Client", value: "Self initiated" }, // TODO confirm
      { label: "Year", value: "2026" },
      { label: "Platform", value: "Mobile app" },
      { label: "Tools", value: "Figma, FigJam, Dovetail, Google Forms" },
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
    glance: [
      { value: "3", label: "user interviews, about 30 minutes each" },
      { value: "20+", label: "survey responses" },
      { value: "56", label: "tagged statements, clustered by theme" },
      { value: "21", label: "design decisions tied to user evidence" },
    ],
    blocks: [
      { type: "section", label: "Context", title: "A bank app most people open for one job." },
      {
        type: "context",
        product: "UBA (United Bank for Africa) offers a mobile app for sending money, buying airtime and data, paying bills and viewing statements. For most people I spoke to, it is a utility they open for one job: sending money.",
        role: [
          "Interviewed 3 UBA app users and ran a 20 person survey",
          "Turned the findings into five pain points and six problem statements",
          "Redesigned the transfer flow and home screen, with 21 decisions tied to user evidence",
          "Designed the high fidelity screens and a clickable prototype in Figma",
        ],
      },
      {
        type: "scope",
        in: ["The home screen", "The send money flow, from recipient to receipt, including the failure state", "Transaction history and receipts"],
        out: ["App speed and network reliability", "Corporate account app", "PIN reset and setting up on a new phone", "Airtime and data", "Pending incoming transfers and reversals"],
      },

      { type: "section", label: "The problem", title: "Why does sending money in the UBA app still feel uncertain?" },
      {
        type: "text",
        body: [
          "Transfers are the reason most people open a banking app, and the one place doubt costs the most. A wrong bank, a spinner that never resolves, or a failed transfer with no word on whether money left the account all push people to call support, take screenshots, or switch apps.",
          "The survey showed how common this is. The interviews showed something quieter: people have stopped expecting better.",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "18 of 20", label: "regularly transfer to other banks, so this is the job that matters" },
          { value: "13 of 20", label: "have abandoned a task in the app" },
          { value: "16 of 20", label: "have used another banking app that looks or feels better" },
          { value: "3 of 20", label: "rated satisfaction 4 out of 5. Nobody gave a 5" },
        ],
      },
      { type: "quote", text: "I'm already used to the problems on the app.", cite: "Ruth, UBA app user" },

      { type: "section", label: "Research", title: "Three interviews first, then a survey to see how far their stories held." },
      {
        type: "text",
        body: ["I ran three one on one interviews of about 30 minutes, then a 20 person survey to check the patterns across a wider group. 85% of respondents were aged 18 to 34 and 80% were on Android. Every statement from the interviews was tagged and clustered by theme in FigJam."],
      },
      {
        type: "bars",
        title: "What matters most when sending money",
        note: "Rated very important, out of 20 respondents",
        items: [
          { label: "Speed", value: 17, of: 20 },
          { label: "Security cues", value: 16, of: 20 },
        ],
      },

      { type: "section", label: "Where it breaks", title: "Seven stages, and every one of them leaks confidence." },
      {
        type: "text",
        body: ["I mapped the current send money flow stage by stage: what happens today, what users said about it, and the fix each stage gets in the redesign. The feeling row is my reading of each stage, not something users reported."],
      },
      {
        type: "journey",
        stages: [
          { stage: "Choose bank", today: "You must pick a bank before anything else", said: "Ruth: other apps start with the account number", feeling: "Friction", fix: "Bank matched from the account number" },
          { stage: "Enter and validate account", today: "A wrong number resets the bank. Switching banks clears the number", said: "Ruth and Ini", feeling: "Annoyance", fix: "Verified recipient, and nothing resets" },
          { stage: "Amount and narration", today: "A description is compulsory", said: "Ruth. Zainab confirms the field is enforced", feeling: "Irritation", fix: "Optional note, fee shown upfront" },
          { stage: "Review", today: "Key details, such as fees, are not clearly prioritised", said: "Fees only appear in a final pop up", feeling: "Uncertainty", fix: "Clear review with the total first" },
          { stage: "PIN and processing", today: "A plain loader, and an extra confirmation after the PIN", said: "Zainab. Ruth was once debited while the recipient got nothing", feeling: "Anxiety", fix: "Live status steps" },
          { stage: "Success", today: "A notification, not a receipt", said: "Ini and Zainab take screenshots instead", feeling: "Unfinished", fix: "A real receipt to share" },
          { stage: "Failure", today: "A generic error with no clear next step", said: "Ruth: \"It just says Error.\"", feeling: "Helplessness", fix: "Reassurance, then Try again or Get help" },
        ],
      },

      { type: "section", label: "Pain points", title: "Five patterns, each checked against the survey." },
      {
        type: "findings",
        items: [
          { title: "Transfers make you start over", by: "Ruth and Ini", body: "Zainab also mentioned an extra confirmation screen after the PIN. In the survey, two people called out \"too many steps\" and one left a transfer and moved to another app.", quote: "But instead of just asking me to correct the number, it resets the selected bank completely.", who: "Ruth" },
          { title: "Errors don't always explain themselves", by: "Ruth and Ini", body: "Ini and Zainab found validation messages clear. But Ruth gets a bare \"Error\", and Ini's statement requests sometimes look failed when they weren't.", quote: "It just says Error. It doesn't explain anything.", who: "Ruth" },
          { title: "A success message isn't proof of payment", by: "Ini and Zainab", body: "To share a real receipt, both leave the success screen and dig through history, or just take a screenshot.", quote: "Immediately after completing a transfer, the app only shows a success notification. It isn't an actual payment receipt.", who: "Ini" },
          { title: "It works, but it feels lifeless", by: "Zainab and Ruth", body: "In the survey, 45% dislike the look and 40% say it looks old or outdated. Ini disagreed and prefers UBA's interface to PiggyVest's.", quote: "Compared to other banking apps, it feels like there's no life in it.", who: "Zainab" },
          { title: "Hidden features keep people on autopilot", by: "Ruth and Zainab", body: "Services sit in a sideways scrolling slider, and nobody in the survey regularly used cards, account opening or in app support.", quote: "With UBA, I've never even noticed some of the services because they're hidden behind scrolling.", who: "Ruth" },
        ],
      },

      { type: "section", label: "Goals", title: "Four goals, one for each kind of doubt." },
      {
        type: "goals",
        items: [
          { title: "Fast and certain", body: "Make sending money feel quick, and let people fix a mistake without losing what they typed." },
          { title: "Clear outcomes", body: "Show progress live. When a transfer fails, say plainly what happened and what to do next." },
          { title: "Instant proof", body: "A shareable receipt on the success screen, not buried in history." },
          { title: "Services in view", body: "One visible services grid, a smaller balance and a way to personalise home." },
        ],
      },
      {
        type: "hmw",
        intro: "Six questions bridge the problems to the design. Each one traces back to what users said.",
        items: [
          { q: "let people fix a mistake without losing what they've already entered?", from: "Ruth, Ini" },
          { q: "make every transfer outcome, whether success, pending or failed, explain itself?", from: "Ruth, Ini" },
          { q: "give people proof of payment the moment a transfer succeeds?", from: "Ini, Zainab" },
          { q: "remove steps that don't help the user, like a compulsory description?", from: "Ruth" },
          { q: "put the services people need in view without making the home screen busier?", from: "Ruth, Zainab" },
          { q: "keep one interface usable for younger and older users alike?", from: "Survey, Ruth's mum" },
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
          { value: "4 of 8", label: "testers checked transfer status next" }, // TODO Behance blurb says 10 volunteers; confirm
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
