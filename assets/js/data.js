/* Content data for the Omoakins portfolio.
   THIS is the file to edit to add/change projects or copy.
   Each PROJECTS entry drives the Home bento, the Work grid, and its Case Study page.
   Case-study prose + stats are placeholder scaffolding — swap with real detail. */

window.CATS = ["Product · UI","Brand","Marketing"];

window.PROJECTS = [
  {
    id:"providus", name:"Providus Bank", cat:"Product · UI", tag2:"Finance", year:"2026", featured:true,
    desc:"A cleaner, calmer core banking experience — built to feel trustworthy at a glance.",
    role:"Product / UI Design", client:"Providus Bank (redesign study)", timeline:"6 weeks",
    deliverables:"Product audit · Flow redesign · UI system · Prototype",
    tools:"Figma · Prototyping",
    overview:"A redesign study of a Nigerian bank's core app — reworking the everyday flows (balance, transfer, cards) so money feels clear and safe, not buried under menus.",
    challenge:"Banking apps pile features until the everyday task — see balance, move money — takes too many taps and too much doubt. The redesign had to lead with trust and speed.",
    approach:"Lead with net position, one clear accent for money movement, honest spacing, and a hierarchy that surfaces the common action first and hides the rest until asked.",
    outcome:"A calmer, faster core experience presented as a full product case — the flagship of the product-design shift.",
    statBig:"3", statCap:"Taps to move money", preview:"dashboard"
  },
  {
    id:"faith", name:"Faith", cat:"Product · UI", tag2:"Lifestyle", year:"2026", green:true,
    desc:"A daily-practice app designed to be gentle, not gamified.", wordmark:"Faith",
    role:"Product / UI Design", client:"Faith (product concept)", timeline:"5 weeks",
    deliverables:"Concept · Core flows · UI system · Prototype",
    tools:"Figma",
    overview:"Faith helps people keep a daily practice going. The design leans warm and calm — a product you return to because it feels good, not because it nags.",
    challenge:"Habit apps default to streaks and guilt. Faith needed motivation that felt supportive, and a home screen that rewarded showing up without pressure.",
    approach:"A soft, focused home, a single clear next action, and progress shown as encouragement rather than a scoreboard.",
    outcome:"A concept product that shows range beyond finance — the same trust-first thinking in a gentler domain.",
    statBig:"1", statCap:"Clear next action", preview:"phones"
  },
  {
    id:"lg", name:"LG App Redesign", cat:"Product · UI", tag2:"Consumer tech", year:"2025",
    desc:"A more human companion app for everyday devices.",
    role:"Product / UI Design", client:"LG (redesign study)", timeline:"5 weeks",
    deliverables:"UX audit · Redesigned flows · UI system · Prototype",
    tools:"Figma",
    overview:"A redesign study of a consumer-tech companion app — simplifying device setup and control so a non-technical person can get going without the manual.",
    challenge:"Companion apps carry every device's features at once, and the everyday jobs — connect, control, check status — get lost in the pile.",
    approach:"A device-first layout, plain-language controls, and status that reads at a glance, with advanced settings tucked one layer down.",
    outcome:"A cleaner, friendlier control experience presented as a structured product case.",
    statBig:"1", statCap:"Screen you live in", preview:"split"
  },
  {
    id:"livestock", name:"Livestock Marketplace", cat:"Product · UI", tag2:"E-commerce", year:"2026", live:true,
    desc:"Group-buy for livestock and meat — coordination made simple.",
    role:"Product / UI Design", client:"Livestock (in progress)", timeline:"Ongoing",
    deliverables:"Marketplace UI · Group-buy flow · Buyer & vendor sides",
    tools:"Figma",
    overview:"A marketplace built around group buying — buyers pool orders so a whole animal gets bought without waste, and vendors sell without haggling one cut at a time.",
    challenge:"Group buying adds coordination most marketplaces avoid: who's in, what's left, when it closes. That state has to be obvious, not anxious.",
    approach:"A buy flow that shows the pool filling in real time, clear deadlines, and vendor tools that make listing a whole animal simple.",
    outcome:"The current build — a real problem answered in a portfolio-grade product.",
    statBig:"∞→1", statCap:"Buyers, one order", preview:"grid"
  },
  {
    id:"brand", name:"Brand & Campaigns", cat:"Brand", tag2:"Multi-vertical", year:"2021—25",
    desc:"Identity, campaigns and social across finance, food, healthcare and hospitality.",
    role:"Brand & Marketing Design", client:"Various", timeline:"Ongoing",
    deliverables:"Brand identities · Campaign creative · Social systems",
    tools:"Figma · Illustrator · After Effects",
    overview:"Several years of brand and campaign work across four verticals — the foundation the product move is built on. Identities, launch campaigns, and social systems that keep a brand consistent everywhere it shows up.",
    challenge:"Every vertical speaks differently — finance wants trust, food wants appetite, healthcare wants calm, hospitality wants warmth — while each brand still has to feel like one voice.",
    approach:"Tight systems over one-off graphics: a core identity, a flexible campaign kit, and social templates the team can run without me in the room.",
    outcome:"Brands that stayed consistent as they scaled — the discipline that now carries into product.",
    statBig:"04", statCap:"Verticals, one craft", preview:"grid"
  },
  {
    id:"marketing", name:"Marketing Systems", cat:"Marketing", tag2:"Email · Comms", year:"2021—25",
    desc:"Email marketing, internal & external comms, and brochures that stay on-brand.",
    role:"Marketing Design", client:"Various", timeline:"Ongoing",
    deliverables:"Email systems · Internal/external comms · Brochures",
    tools:"Figma · HTML email",
    overview:"The unglamorous work that keeps a company sounding like itself: email marketing, internal and external communications, and print — built as reusable systems, not one-off files.",
    challenge:"Comms sprawl fast — a dozen people, a dozen templates, and the brand drifts. It had to stay coherent without a designer touching every send.",
    approach:"Modular templates, clear rules, and kits that non-designers can use and still stay on-brand.",
    outcome:"Systems that hold the voice steady across every channel — the same systems thinking product design rewards.",
    statBig:"1", statCap:"Voice, every channel", preview:"web"
  }
];
