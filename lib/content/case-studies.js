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
      { label: "Tools", value: "Figma, FigJam, Dovetail, Google Forms, Vercel" },
    ],
    cover: { src: "/work/uba/cover.webp", alt: "UBA Mobile Redesign case study cover", ratio: 16 / 9 },
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

      { type: "section", label: "Key decisions", title: "21 decisions, each tied to user evidence. These six mattered most." },
      {
        type: "decisions",
        detailed: true,
        items: [
          {
            title: "Account number first, bank matched for you",
            problem: "The current flow makes you pick a bank before anything else. Enter a wrong number and the bank resets. Switch banks and the number clears. Ruth described the order she's used to in other apps: \"I enter the account number, choose the bank, enter the amount, put my PIN, and I'm done.\"",
            decision: "The account number comes first. The app matches the bank and shows it as a card to confirm, with a searchable picker to change it. UBA is pinned at the top and tagged Free. Fixing one field never clears the other, and a confirm sheet shows name, bank and number before you move on.",
            why: "It follows the order users already expect and removes the reset loop. The same account number can exist at more than one bank, so the bank is suggested, never assumed.",
            images: [{ src: "/work/uba/before-send-money.webp", alt: "Current send money screen: pick a bank first", tag: "Before" }, { src: "/work/uba/recipient.webp", alt: "Redesigned: enter the account number first", tag: "After" }],
          },
          {
            title: "Optional note, fee shown upfront",
            problem: "You can't send money without a description, even one random letter. It was Ruth's number one fix. The transfer fee only appeared in a final pop up.",
            decision: "The note is labelled optional. The fee (\u20a610.75, VAT included) and your balance after the transfer show on the amount screen.",
            why: "A required field with no value to the user is pure friction. Showing the fee early means no surprise at the last step.",
            images: [{ src: "/work/uba/before-transfer.webp", alt: "Current transfer screen with required narration", tag: "Before" }, { src: "/work/uba/amount.webp", alt: "Redesigned amount screen with optional note and fee", tag: "After" }],
          },
          {
            title: "Every outcome explains itself",
            problem: "Processing was a plain spinner. Ruth was once debited while the recipient never received the money. The current error screen tells users to message a WhatsApp contact.",
            decision: "Processing shows live steps: recipient verified, sending funds, awaiting bank confirmation. You can leave and get notified. If a transfer can't be confirmed, the screen says your balance hasn't changed, gives a plain reason, and leads with checking status before trying again.",
            why: "Money is a high trust task. Showing progress replaces anxious re checking with information, and a clear failure state protects trust when things go wrong.",
            images: [{ src: "/work/uba/before-failed.webp", alt: "Current failure pop up", tag: "Before" }, { src: "/work/uba/failure.webp", alt: "Redesigned failure screen with next steps", tag: "After" }],
          },
          {
            title: "A real receipt the moment it succeeds",
            problem: "The success screen was a notification, not a receipt, and it carried a DSTV upsell. Ini wanted \"the proper receipt immediately after every successful transaction.\" Zainab screenshots instead.",
            decision: "The success screen shows bank, reference, date and fee, with Share receipt. A full branded receipt can be shared or downloaded as a PDF, and it's one tap from every row in history.",
            why: "For most transfers, proof of payment is part of the job. No upsell, no detour through history.",
            images: [{ src: "/work/uba/before-success.webp", alt: "Current success pop up", tag: "Before" }, { src: "/work/uba/success.webp", alt: "Redesigned transfer successful screen", tag: "After" }],
          },
          {
            title: "Home: services first, balance smaller",
            problem: "The balance took up almost half the screen, while services hid in a sideways slider. Ruth and Zainab both raised this on their own, and neither knew the home screen could be customised.",
            decision: "One compact balance card. A visible services grid replaces the slider. Recent recipients sit under Send again, Personalize your home is in plain view, and a four tab nav replaces Home and More.",
            why: "Every key action is visible without scrolling sideways. Customisation stays, but now people can find it.",
            images: [{ src: "/work/uba/before-home.webp", alt: "Current home screen", tag: "Before" }, { src: "/work/uba/home.webp", alt: "Redesigned home screen", ratio: 390 / 1210, tag: "After" }],
          },
          {
            title: "Readable transaction history",
            problem: "Statements show raw codes like MOB/UTO/LIGHTHOUSE BAP/tithe, and Ini found statements \"not so straightforward\". Zainab checks her history regularly.",
            decision: "History is grouped by date, with filter chips for All, Money in and Money out. Each row shows name, purpose and date, with a receipt one tap away.",
            why: "Seeing your own activity at a glance builds confidence. Two interviewees are behind this one.",
            images: [{ src: "/work/uba/before-history.webp", alt: "Current transaction history", tag: "Before" }, { src: "/work/uba/transactions.webp", alt: "Redesigned history grouped by date", tag: "After" }],
          },
        ],
      },
      { type: "section", label: "Screens", title: "The send money flow, end to end." },
      {
        type: "slider",
        items: [
          { src: "/work/uba/home.webp", alt: "Home", ratio: 390 / 1210, caption: "Home" },
          { src: "/work/uba/recipient.webp", alt: "Enter recipient", ratio: 390 / 844, caption: "Recipient" },
          { src: "/work/uba/bank-detected.webp", alt: "Bank detected", ratio: 390 / 844, caption: "Bank detected" },
          { src: "/work/uba/amount.webp", alt: "Amount", ratio: 390 / 844, caption: "Amount and fee" },
          { src: "/work/uba/confirm.webp", alt: "Confirm", ratio: 390 / 844, caption: "Confirm" },
          { src: "/work/uba/processing.webp", alt: "Processing", ratio: 390 / 844, caption: "Live progress" },
          { src: "/work/uba/success.webp", alt: "Success", ratio: 390 / 844, caption: "Success" },
          { src: "/work/uba/receipt.webp", alt: "Receipt", ratio: 390 / 844, caption: "Receipt" },
          { src: "/work/uba/failure.webp", alt: "Failure", ratio: 390 / 844, caption: "Failure, with next steps" },
          { src: "/work/uba/transactions.webp", alt: "Transactions", ratio: 390 / 844, caption: "History" },
        ],
      },
      { type: "section", label: "Prototype", title: "Try the flow yourself." },
      {
        type: "prototype",
        url: "https://uba-redesign.vercel.app/",
        label: "Open the prototype",
        title: "Send money prototype",
        note: "15 clickable screens with sample data: recipient, bank match, review, live progress, receipt and three failure states. Best on a phone.",
      },
      { type: "section", label: "Testing", title: "Ten people, two tasks, about ten minutes each." },
      {
        type: "text",
        body: [
          "I tested the clickable prototype remotely with volunteers from the survey. Each person worked alone on their own phone or computer. In Task 1 they sent money from the account number through to the success screen. In Task 2 the transfer failed, and I watched what they did next.",
          "A small analytics dashboard built into the prototype logged which screens people reached, whether they finished each task, how long they paused when the transfer failed, and what they did next. A short form followed.",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "10 of 10", label: "sent money end to end on the prototype" },
          { value: "7 of 7", label: "form responses would bank with it, and rated ease, the confirm screen and error clarity 5/5" },
          { value: "9.4s", label: "median pause on the error screen" },
          { value: "4 of 8", label: "checked their status after the failed transfer. 3 tried again, 1 closed the app" },
        ],
      },
      { type: "section", label: "What I learned", title: "What the failure screen taught me." },
      {
        type: "goals",
        items: [
          { title: "The failure screen got read", body: "A 9.4 second median pause, and 4 of 8 testers checked their status next, as the screen intends." },
          { title: "It may invite retries", body: "3 of 8 tried again. A retry after a timeout could duplicate a payment, so the screen now leads with checking status." },
          { title: "No charge can't be promised", body: "On a real timeout the app can't know. The copy now says your transfer did not go through and points to status first." },
          { title: "Testers felt safe", body: "All 7 form responses rated it 5/5 and would bank with it. Two said that feeling is why they would retry." },
        ],
      },
      { type: "callout", text: "Testing is still running. Insufficient funds and unresolved account failures come next, each with its own link." },
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
    client: "ProvidusBank",
    year: "2026",
    title: "From friction to flow: redesigning the ProvidusBank mobile experience.",
    summary: "Key actions were scattered, navigation ignored how people bank, and transfers made you decide before you started. The redesign fixes the dashboard, the navigation and the transfer flow.",
    tags: ["UX redesign", "Fintech", "Mobile"],
    meta: [
      { label: "Role", value: "Product designer" },
      { label: "Client", value: "Self initiated" }, // TODO confirm
      { label: "Year", value: "2026" },
      { label: "Platform", value: "Mobile app" },
      { label: "Focus", value: "Dashboard, navigation, cards, transfers" },
    ],
    cover: { src: "/work/providus/cover.webp", alt: "ProvidusBank mobile redesign cover", ratio: 1440 / 1071 },
    theme: {
      mode: "dark",
      bg: "#0E1621",
      surface: "#152030",
      ink: "#F3F1EA",
      muted: "#A3ACB8",
      line: "#243246",
      accent: "#F7C948",
      accentSoft: "#1B2636",
      onAccent: "#101A26",
    },
    external_url: "https://www.behance.net/gallery/251545521/Redesigning-the-Providus-Bank-Mobile-Experience",
    external_label: "See the full case study on Behance",
    blocks: [
      { type: "section", label: "Context", title: "Mobile banking is where speed and simplicity count." },
      {
        type: "context",
        product: "The ProvidusBank app is where customers make transfers, keep an eye on their accounts and manage their cards. Mobile has become the main way people handle their money, so every extra step in these everyday tasks costs something.",
        role: [
          "Ran a heuristic evaluation of the existing app, covering navigation, dashboard interactions and money transfers",
          "Turned the friction points into four opportunity areas",
          "Redesigned the dashboard, the navigation, a dedicated cards section and the transfer flow",
          "Designed the high fidelity screens",
        ],
      },

      { type: "section", label: "The problem", title: "Key actions were hard to find, and transfers asked too much too early." },
      {
        type: "text",
        body: [
          "For the business: the app offered a wide range of services, but products like card management and promotional offers had little visibility. Navigation gave the primary spots to lower value features, which limited adoption, engagement and discovery. Friction in a high frequency task like transfers also put task completion and satisfaction at risk.",
          "For users: people open the app to make transfers, check their accounts and manage cards. Key actions were hard to find and often took several steps and unnecessary decisions, which raised cognitive load and slowed down common banking tasks.",
        ],
      },

      { type: "section", label: "Research", title: "Five friction points from a heuristic evaluation." },
      {
        type: "text",
        width: "prose",
        body: ["I evaluated the existing app against heuristics, focusing on navigation, dashboard interactions and money transfers. The aim was to find friction in high frequency tasks and where features could be easier to discover."],
      },
      {
        type: "findings",
        items: [
          { title: "High frequency actions lacked visibility", body: "Common tasks like transfers, account management and card services needed several steps to reach." },
          { title: "Navigation did not match user priorities", body: "Frequently used services were buried in secondary menus, while lower value features sat in the primary navigation." },
          { title: "The transfer flow was unnecessarily complex", body: "People had to choose a transfer type before they could do the thing they came for, which added friction and cognitive load." },
          { title: "The dashboard was underused", body: "It is the most visited screen in the app, yet it did little to support everyday tasks or surface key products." },
          { title: "Beneficiaries were cut off from transfers", body: "Saved beneficiaries lived apart from the transfer flow, so repeat transactions took extra steps." },
        ],
      },

      { type: "section", label: "Opportunities", title: "Four areas to redesign." },
      {
        type: "goals",
        items: [
          { title: "Make the dashboard an action hub", body: "Faster access to frequent tasks, clearer account activity, and a place to surface relevant products, services and announcements." },
          { title: "Restructure navigation around priorities", body: "Put high frequency services first, make features easier to discover and give strategic banking products more visibility." },
          { title: "Give cards their own experience", body: "A dedicated Cards section that improves discoverability, simplifies card management and makes card features easy to reach." },
          { title: "Simplify transfers", body: "Cut unnecessary decisions, bring beneficiaries into the flow and let people finish a transfer in fewer steps." },
        ],
      },

      { type: "section", label: "Key decisions", title: "What changed, and why." },
      {
        type: "decisions",
        detailed: true,
        items: [
          {
            title: "A dashboard that leads with money",
            problem: "The original dashboard gave a lot of room to the user's name and pushed the balance and key actions further down. Large areas of empty space added nothing, and people's main financial information was hard to see at a glance.",
            decision: "The redesign puts the account balance first, brings frequently used services up and uses the screen more deliberately, with a structured layout, a promotional banner and recent transactions.",
            why: "Quicker access to essential information and faster task completion, with room to surface products and offers.",
            images: [{ src: "/work/providus/before-home.webp", alt: "Current dashboard", tag: "Before" }, { src: "/work/providus/home.webp", alt: "Redesigned dashboard", ratio: 361 / 782, tag: "After" }],
          },
          {
            title: "Navigation built around what people do",
            problem: "Related banking features were spread across several sections, so people had to hunt through tabs to complete common tasks. Secondary functions were also hidden under a \"More\" section.",
            decision: "Four tabs replace five: Home, Services, Cards and Settings. Services groups account services and help. Settings separates account and security from preferences and app control.",
            why: "Related actions sit together, core banking tasks live in one predictable place, and security and profile controls are no longer mixed in with everything else.",
            images: [{ src: "/work/providus/before-services.webp", alt: "Current services screen", tag: "Before" }, { src: "/work/providus/services.webp", alt: "Redesigned Services tab", ratio: 361 / 782, tag: "After" }],
          },
          {
            title: "A home for cards",
            problem: "Card management was grouped with unrelated financial actions, which cut its visibility and made card specific functions harder to find.",
            decision: "A dedicated Cards section brings card details, actions such as freezing, and card transactions into one place. Card promotions now show up inside the app.",
            why: "Cards get a focused space, people understand what they can do with them, and the app supports the bank's marketing instead of leaving it outside.",
            images: [{ src: "/work/providus/cards.webp", alt: "Redesigned Cards tab", ratio: 361 / 782 }],
          },
          {
            title: "A transfer that starts with the task",
            problem: "Every transfer type had equal prominence, whether people used it often or not. Users weighed several options before starting, even though most transfers go to another Providus account or to another bank. Beneficiaries were managed somewhere else.",
            decision: "Providus and other banks are now the two primary entry points. Beneficiaries are part of the flow, and transfers between your own accounts and bulk transfers move to Services. The flow then guides you step by step.",
            why: "Fewer decisions at the start, quicker repeat transfers, and everyday actions separated from advanced ones.",
            images: [{ src: "/work/providus/before-transfer.webp", alt: "Current transfer options", tag: "Before" }, { src: "/work/providus/transfer.webp", alt: "Redesigned transfer screen", ratio: 361 / 782, tag: "After" }],
          },
        ],
      },

      { type: "section", label: "Screens", title: "The redesigned screens." },
      {
        type: "slider",
        items: [
          { src: "/work/providus/home.webp", alt: "Home", ratio: 361 / 782, caption: "Home" },
          { src: "/work/providus/services.webp", alt: "Services", ratio: 361 / 782, caption: "Services" },
          { src: "/work/providus/cards.webp", alt: "Cards", ratio: 361 / 782, caption: "Cards" },
          { src: "/work/providus/settings.webp", alt: "Settings", ratio: 361 / 782, caption: "Settings" },
          { src: "/work/providus/transfer.webp", alt: "Transfer", ratio: 361 / 782, caption: "Transfer" },
        ],
      },

      { type: "section", label: "Impact", title: "What the redesign is built to improve." },
      {
        type: "goals",
        items: [
          { title: "Faster everyday banking", body: "Quicker access to common actions and less friction in transfers and other high frequency tasks." },
          { title: "Easier discovery", body: "Clearer navigation makes services easier to find, and a dedicated cards section makes card management simpler." },
          { title: "More engagement", body: "Better visibility for card related services and for banking products and self service features." },
          { title: "Fewer drop offs", body: "Reduced transaction drop offs in key flows, and an information architecture that can grow with the product." },
        ],
      },

      { type: "section", label: "Reflection", title: "In banking, trust is designed in from the start." },
      {
        type: "text",
        body: [
          "In financial products people are not just using an interface, they are trusting it. Every action, especially moving money, has to feel clear, predictable and safe.",
          "The original transfer flow was organised more around the system's structure than around how people think when they send money. In the redesign I put the most frequent actions first, Providus to Providus and transfers to other banks. Rarer actions moved to Services, not to remove them but to separate everyday actions from advanced ones.",
          "Trust is also structural. Clear grouping, predictable navigation and consistent patterns reduce uncertainty, so people don't have to think about where to go next.",
        ],
      },
      { type: "callout", text: "Users may not notice when a financial interface is well designed, but they notice straight away when it isn't. Clarity, hierarchy and simplicity are part of the experience, not just visual decisions." },
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
