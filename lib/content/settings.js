// Site wide settings. When Supabase is connected these come from
// site_settings.data instead, so the admin can edit them.
// Fields marked TODO need Timi's real values before launch.

export const settings = {
  name: "Timi",
  wordmark: "Omoakins",
  role: "Product and brand designer",
  // Two tone static headline (Tsolaye): first part muted, second part full ink.
  heroLead: "Hi, I'm Timi.",
  heroLine: "I design brands, campaigns, and now the products behind them.",
  intro:
    "Years of brand and marketing work for banks, food and hospitality brands taught me what makes people act. I now bring that to product design, one researched case study at a time.",
  availability: "Open to product design roles", // TODO confirm wording and window
  location: "Lagos, Nigeria", // TODO confirm
  email: "", // TODO Timi's email
  links: [
    { label: "Behance", url: "https://www.behance.net/" }, // TODO profile URL
    { label: "LinkedIn", url: "" }, // TODO
  ],
  clients: ["ProvidusBank", "Equinorth Capital", "Sweet Sensation", "World Poetry Day", "Swing Against Cancer"],

  // Filter buckets. Order is fixed: Product first, always.
  categories: {
    product: { button: "Product", heading: "Product", tagline: "" },
    campaigns: {
      button: "Campaigns",
      heading: "Campaigns",
      tagline: "Ideas that had to sell, and still feel like something.",
    },
    "brand-comms": { button: "Brand & Comms", heading: "Brand & Comms", tagline: "" },
  },
  subgroups: {
    "card-campaigns": { heading: "Card campaigns", tagline: "One bank, four cards, four personalities." },
    editorial: { heading: "Editorial & Brand Thinking", tagline: "Work that explains, argues, and earns a second look." },
    events: { heading: "Event Identity", tagline: "Turning a room into a brand." },
    comms: { heading: "Communications", tagline: "Clear messages for customers, partners and teams." },
    corporate: { heading: "Corporate identity", tagline: "" },
  },

  // TODO: About copy and FAQ answers are drafts for Timi to edit.
  about: {
    heading: "From brand work to product work.",
    body: [
      "I started in brand and marketing design: social campaigns, email marketing, brochures, and the internal and external communications that keep a company talking clearly. Most of that work was for finance, food, healthcare and hospitality brands.",
      "Campaign work trains one habit above all: every design has to earn a response. Product design asks the same question at a smaller scale, one screen and one decision at a time. That is the work I am moving into now, starting with research led redesigns of the banking apps I use every day.",
    ],
    toolkit: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop"], // TODO confirm
    now: "Testing the UBA send money prototype and writing up the Providus redesign.",
  },

  faq: [
    {
      q: "What kind of work are you looking for?",
      a: "Product design roles, full time or contract, where research shapes the work. I also take brand and campaign projects.",
    },
    {
      q: "Are the case studies client work?",
      a: "Each card says so. Projects marked Case study are self initiated research and redesign work. Projects marked Shipped went live.",
    },
    {
      q: "Can I see the full process?",
      a: "Every case study ends with a link to the full version on Behance, with research artefacts, flows and exploration rounds.",
    },
    {
      q: "How do I get in touch?",
      a: "Email is fastest. I reply within two working days.",
    },
  ],
};
