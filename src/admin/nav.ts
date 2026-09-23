/* The dashboard sidebar: one screen per page of the site. */
import type { EntryType } from "../lib/schema";

export interface Screen {
  key: string;
  label: string;
  settings?: string; // which part of Site settings this screen edits (admin/fields.ts SETTINGS_SCREENS)
  list?: Exclude<EntryType, "settings">; // items listed on this screen
  preview?: string; // page shown by Preview for the settings part
  intro: string;
}

export const SCREENS: Screen[] = [
  { key: "home", label: "Home", settings: "home", preview: "home", intro: "Everything on the Home page, top to bottom." },
  { key: "work", label: "Work", settings: "work", list: "project", preview: "work", intro: "Your projects (each is a tile and a case study), and the Work page text." },
  { key: "blog", label: "Blog", settings: "blog", list: "post", preview: "blog", intro: "Blog posts, and the Blog page text. The Blog link appears in the menu once a post is published." },
  { key: "about", label: "About", settings: "about", preview: "about", intro: "Everything on the About page." },
  { key: "contact", label: "Contact", settings: "contact", preview: "contact", intro: "The Contact page and your contact details." },
  { key: "pages", label: "Landing pages", list: "page", intro: "Extra pages built from sections, e.g. a Services page. Add one to the menu under Menu & links." },
  { key: "testimonials", label: "Testimonials", list: "testimonial", intro: "Quotes shown on the Home page. The section appears once one is published." },
  { key: "menu", label: "Menu & links", settings: "menu", preview: "home", intro: "The top menu, the green menu button, social links and names." },
];

export const SOON = ["Messages", "Visitors"];

/** Sidebar screen an item belongs to. */
export const screenFor = (type: EntryType) =>
  ({ project: "work", post: "blog", page: "pages", testimonial: "testimonials", settings: "home" })[type];
