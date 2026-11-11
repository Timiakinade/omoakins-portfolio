// Site wide settings. When Supabase is connected these come from
// site_settings.data instead, so the admin can edit them.
// Fields marked TODO need real values before launch.

export const settings = {
  name: "",
  wordmark: "Portfolio",
  role: "Product and brand designer",
  location: "Lagos, Nigeria", // TODO confirm
  timezone: "Africa/Lagos",
  email: "", // TODO owner's email
  resume: "", // TODO resume link
  availability: "Open to product design roles", // TODO confirm wording

  // Home
  hero: {
    statement: ["Design that", "earns a response."],
    intro: "Hello.",
    heading: "I design brands, campaigns, and now the products behind them.",
    body: "Years of campaign work for banks, food and hospitality brands taught me what makes people act. I bring that to product design, one researched case study at a time.",
    portrait: "", // TODO portrait image
  },
  path: ["Brand identity", "Campaigns and comms", "Product design"],
  sectors: ["Finance", "Food", "Healthcare", "Hospitality"],

  socials: [
    { label: "Behance", url: "https://www.behance.net/" }, // TODO profile URL
    { label: "LinkedIn", url: "" }, // TODO
    { label: "X", url: "" }, // TODO
    { label: "Instagram", url: "" }, // TODO
    { label: "Dribbble", url: "" }, // TODO
  ],
  clients: ["ProvidusBank", "Equinorth Capital", "Sweet Sensation", "World Poetry Day", "Swing Against Cancer"],

  // Filter buckets. Order is fixed: Product first, always.
  categories: {
    product: { button: "Product", heading: "Product", tagline: "" },
    campaigns: { button: "Campaigns", heading: "Campaigns", tagline: "Ideas that had to sell, and still feel like something." },
    "brand-comms": { button: "Brand & Comms", heading: "Brand & Comms", tagline: "" },
  },
  subgroups: {
    "card-campaigns": { heading: "Card campaigns", tagline: "One bank, four cards, four personalities." },
    editorial: { heading: "Editorial & Brand Thinking", tagline: "Work that explains, argues, and earns a second look." },
    events: { heading: "Event Identity", tagline: "Turning a room into a brand." },
    comms: { heading: "Communications", tagline: "Clear messages for customers, partners and teams." },
    corporate: { heading: "Corporate identity", tagline: "" },
  },

  // TODO: About copy, chapters and FAQ answers are drafts to edit.
  about: {
    heading: "From brand work to product work.",
    intro: "I started in brand and marketing design and I'm moving into product. The thread through all of it: every design has to earn a response.",
    chapters: [
      {
        label: "Brand",
        title: "Learning what a brand sounds like",
        body: "Identity, brochures and the internal and external communications that keep a company talking clearly, for finance, food, healthcare and hospitality brands.",
      },
      {
        label: "Campaigns",
        title: "Ideas that had to sell",
        body: "Social campaigns, email marketing and launches. Campaign work trains one habit above all: a design is only good if people act on it.",
      },
      {
        label: "Product",
        title: "The same question, one screen at a time",
        body: "Research led redesigns of the banking apps I use every day, starting with UBA's send money flow and Providus Bank's mobile app.",
      },
    ],
    now: "Testing the UBA send money prototype and writing up the Providus redesign.",
    nowUpdated: "Nov 2026",
    toolkit: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop"], // TODO confirm
  },

  faqCategories: [
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "availability", label: "Availability" },
  ],
  faq: [
    { cat: "availability", q: "What kind of work are you looking for?", a: "Product design roles, full time or contract, where research shapes the work. I also take brand and campaign projects." },
    { cat: "work", q: "Are the case studies client work?", a: "Each card says so. Projects marked Case study are self initiated research and redesign work. Projects marked Shipped went live." },
    { cat: "process", q: "Can I see the full process?", a: "Every case study ends with a link to the full version on Behance, with research artefacts, flows and exploration rounds." },
    { cat: "process", q: "How do you start a project?", a: "With the people using it. A short survey or a handful of interviews comes before any screens." },
    { cat: "availability", q: "How do I get in touch?", a: "Email is fastest. The address is in the footer, one click copies it." },
  ],
};
