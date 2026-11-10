// Block registry. Each case study is an ordered array of these.
// The admin (next build step) will use label, hint and defaults to offer
// an "add block" menu. The renderer lives in components/blocks.

export const BLOCKS = {
  section: { label: "Section", hint: "Starts a numbered section in the sidebar. Title should be a claim, not a label.", defaults: { label: "", title: "" } },
  heading: { label: "Heading", hint: "Sub heading inside a section", defaults: { text: "", level: 3 } },
  text: { label: "Text", hint: "Paragraphs. Width: prose (750) or lede (540)", defaults: { body: [""], width: "prose" } },
  image: { label: "Image", hint: "One image, free ratio. Width: prose, wide or full", defaults: { src: "", alt: "", ratio: 1.6, caption: "", width: "wide" } },
  gallery: { label: "Gallery", hint: "Grid of images, 2 or 3 columns", defaults: { items: [], columns: 2 } },
  slider: { label: "Slider", hint: "Horizontal row of screens with captions", defaults: { items: [] } },
  stats: { label: "Stats", hint: "Numbers. State sample size as a fraction: 6 of 8", defaults: { items: [] } },
  decisions: { label: "Key decisions", hint: "Each decision as a heading plus its reasoning. Show 2 to 4", defaults: { items: [] } },
  quote: { label: "Quote", hint: "A participant or stakeholder quote", defaults: { text: "", cite: "" } },
  callout: { label: "Callout", hint: "A short highlighted note", defaults: { text: "" } },
  prototype: { label: "Prototype", hint: "Link to a live prototype", defaults: { url: "", label: "Open the prototype", note: "" } },
  outbound: { label: "Outbound CTA", hint: "Link out to Behance for the full study", defaults: { url: "", label: "See the full case study on Behance" } },
  divider: { label: "Divider", hint: "Hairline between groups", defaults: {} },
};
