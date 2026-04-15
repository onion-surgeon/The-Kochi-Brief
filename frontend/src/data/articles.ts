export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  content: string;
  date: string;
  isHighlight?: boolean;
}

export const categories = ["All", "Local", "Business", "Traffic", "Events", "Weather"] as const;

export const articles: Article[] = [
  {
    id: "1",
    title: "Kochi Metro Announces Extended Night Services for Weekend Travellers",
    summary: "Starting next month, Kochi Metro will operate until midnight on Fridays and Saturdays, aiming to boost nightlife and ease late-night commutes across the city.",
    category: "Traffic",
    readTime: "3 min read",
    date: "April 15, 2026",
    isHighlight: true,
    content: `Kochi Metro Rail Limited (KMRL) has announced extended operating hours on weekends, a move that's been long demanded by the city's growing young professional community.\n\nStarting May 1, metro services will run until midnight on Friday and Saturday nights, extending the current last-train time by nearly two hours. The decision comes after months of surveys and ridership data analysis showing strong demand for late-night connectivity.\n\n"We've seen consistent growth in weekend ridership, especially on the Aluva-Pettah corridor," said a KMRL spokesperson. "This extension will serve thousands of commuters who currently rely on private transport after 10 PM."\n\nThe extended services will initially cover all 22 stations on the main line. KMRL also plans to coordinate with KSRTC for last-mile bus connectivity from major metro hubs.\n\nLocal businesses near metro stations have welcomed the move, with restaurant and café owners along MG Road and Edappally expecting a boost in late-evening footfall.\n\nThe initiative is part of KMRL's broader plan to increase daily ridership from the current 75,000 to over 1 lakh by end of 2026.`
  },
  {
    id: "2",
    title: "Fort Kochi Heritage Walk Gets a Digital Makeover with AR Guides",
    summary: "The Tourism Department launches an augmented reality app that brings Fort Kochi's colonial history to life, featuring 3D recreations of historical landmarks.",
    category: "Local",
    readTime: "4 min read",
    date: "April 15, 2026",
    isHighlight: true,
    content: `Fort Kochi's iconic heritage walk is getting a 21st-century upgrade. The Kerala Tourism Department, in collaboration with a Kochi-based tech startup, has launched an augmented reality (AR) mobile app that transforms the traditional walking tour into an immersive historical experience.\n\nThe app, called "Kochi Through Time," uses AR technology to overlay 3D recreations of historical scenes onto the current landscape. Visitors pointing their phones at the Chinese fishing nets, for instance, can see animated depictions of ancient Chinese traders who introduced them centuries ago.\n\n"We wanted to make history tangible," explains Priya Menon, the app's lead developer. "When you stand at St. Francis Church, you can now see a virtual recreation of what the area looked like when Vasco da Gama first arrived."\n\nThe app covers 15 major landmarks across Fort Kochi and Mattancherry, with narration available in English, Malayalam, Hindi, and Japanese. Each stop features a 2-3 minute AR experience with historical context.\n\nEarly reviews from tourists have been overwhelmingly positive, with many praising the seamless blend of technology and heritage. The Tourism Department plans to expand the app to cover Jew Town and the spice markets by December.`
  },
  {
    id: "3",
    title: "New Startup Hub Opens in Kakkanad, Targeting 500 Jobs by Year-End",
    summary: "A 50,000 sq ft co-working and incubation space launches in Smart City Kochi, backed by state government incentives for tech startups.",
    category: "Business",
    readTime: "3 min read",
    date: "April 14, 2026",
    isHighlight: true,
    content: `Kochi's startup ecosystem received a major boost with the inauguration of "LaunchPad Kochi," a sprawling 50,000 square foot co-working and incubation facility in Kakkanad's Smart City campus.\n\nThe facility, which opened its doors this week, aims to house over 80 startups and create 500 direct jobs by December 2026. It features modern workspaces, meeting rooms, a prototyping lab, and a 200-seat auditorium for tech events.\n\nBacked by the Kerala Startup Mission and private investors, LaunchPad Kochi offers subsidized rent for early-stage startups — as low as ₹3,000 per seat per month for the first year.\n\n"Kochi has incredible talent but we've been losing startups to Bangalore because of infrastructure gaps," said the facility's director. "LaunchPad aims to change that equation."\n\nThe hub already has anchor tenants including three AI startups, a climate-tech company, and a healthtech firm that recently raised Series A funding. A dedicated mentor network of 40+ industry veterans will provide guidance to resident startups.\n\nThe state government has also announced additional tax incentives for startups operating from the facility, including a three-year GST holiday for qualifying companies.`
  },
  {
    id: "4",
    title: "Heavy Rainfall Expected This Week: IMD Issues Orange Alert for Ernakulam",
    summary: "The India Meteorological Department warns of heavy to very heavy rainfall in Kochi and surrounding areas, advising residents to stay prepared.",
    category: "Weather",
    readTime: "2 min read",
    date: "April 14, 2026",
    isHighlight: true,
    content: `The India Meteorological Department (IMD) has issued an orange alert for Ernakulam district, predicting heavy to very heavy rainfall over the next three days.\n\nKochi residents are advised to remain cautious as rainfall of 115-204mm is expected within a 24-hour period. The district administration has activated emergency response teams and opened 12 relief camps in low-lying areas.\n\n"We're closely monitoring the situation," said the District Collector. "All agencies are on standby, and we've pre-positioned rescue boats in flood-prone areas around Aluva and Perumbavoor."\n\nKey advisories for residents:\n- Avoid unnecessary travel, especially through waterlogged areas\n- Keep emergency supplies including flashlights, batteries, and first aid kits ready\n- Move vehicles to higher ground if you live in flood-prone areas\n- Save emergency helpline numbers: District Control Room (0484-2423513)\n\nSchools in the district will remain open unless the alert is upgraded to red. The Cochin International Airport has issued an advisory for potential flight delays but operations continue normally for now.\n\nThe IMD forecasts that conditions will improve by Thursday, with rainfall reducing to light to moderate levels by the weekend.`
  },
  {
    id: "5",
    title: "Kochi-Muziris Biennale 2026 Announces Theme: 'Tides of Tomorrow'",
    summary: "India's largest contemporary art exhibition returns in December with a focus on climate, migration, and coastal futures. Over 90 artists confirmed.",
    category: "Events",
    readTime: "3 min read",
    date: "April 13, 2026",
    content: `The Kochi-Muziris Biennale Foundation has unveiled the theme for its 2026 edition: "Tides of Tomorrow," exploring the intersections of climate change, coastal migration, and future imaginaries.\n\nScheduling its opening for December 12, the biennale will feature works by over 90 artists from 35 countries, spread across venues in Fort Kochi and Mattancherry. The Aspinwall House will once again serve as the main venue.\n\nCurator Anita Dube describes the theme as deeply personal to Kochi: "This is a city that lives with water — the backwaters, the sea, the monsoons. 'Tides of Tomorrow' asks what happens when that relationship is disrupted by climate change."\n\nHighlights include a massive installation at the Chinese fishing nets exploring rising sea levels, a virtual reality experience simulating Kochi in 2050, and a community art project involving local fishing communities.\n\nTickets will go on sale in October, with early-bird passes priced at ₹200 for students and ₹500 for adults. The biennale runs through March 2027.`
  },
  {
    id: "6",
    title: "GCDA Greenlights Coastal Cycling Track from Marine Drive to Fort Kochi",
    summary: "A 12 km dedicated cycling path along the coast gets final approval, promising to transform Kochi's waterfront into a recreation corridor.",
    category: "Local",
    readTime: "3 min read",
    date: "April 13, 2026",
    content: `The Greater Cochin Development Authority (GCDA) has given final approval for a 12-kilometer dedicated cycling track running from Marine Drive to Fort Kochi along the waterfront.\n\nThe ₹45 crore project will create a segregated cycling path with rest stops, water fountains, bicycle parking, and lighting. The route passes through some of Kochi's most scenic stretches, including the Subhash Park waterfront, Willingdon Island, and Thoppumpady bridge.\n\n"This isn't just a cycling track — it's a waterfront transformation project," said a GCDA official. "We're creating public spaces that Kochi residents can enjoy for walking, jogging, and cycling."\n\nConstruction is expected to begin in June and complete in phases over 18 months. The first phase, covering Marine Drive to Willingdon Island (4 km), is targeted for completion by December.\n\nThe project also includes a public bicycle-sharing system with 500 cycles available at 25 docking stations along the route. Users will be able to rent cycles via a mobile app at ₹10 per 30 minutes.`
  },
  {
    id: "7",
    title: "Lulu Mall Kochi Crosses 50 Million Visitors Since Opening",
    summary: "India's largest shopping mall celebrates a milestone, contributing an estimated ₹2,000 crore annually to Kochi's local economy.",
    category: "Business",
    readTime: "2 min read",
    date: "April 12, 2026",
    content: `Lulu Mall Kochi has crossed the 50 million visitor mark since its opening, cementing its position as one of India's most visited retail destinations.\n\nThe mall, which spans 17 lakh square feet in Edappally, now houses over 300 retail stores, 50 food outlets, and a 9-screen multiplex. Management estimates the mall contributes approximately ₹2,000 crore annually to Kochi's local economy through direct and indirect employment.\n\n"When we opened, many questioned whether Kochi could support a mall of this scale," said the mall's general manager. "The numbers speak for themselves. We've become a community hub, not just a shopping destination."\n\nTo mark the milestone, Lulu Mall has announced a month-long celebration featuring concerts, art exhibitions, and exclusive retail offers. A new wing dedicated to luxury brands is also set to open in the coming months.`
  },
  {
    id: "8",
    title: "Water Metro's Vyttila-Kakkanad Route Records Highest Ridership Yet",
    summary: "Kochi's water metro sees a record 15,000 daily passengers on the Vyttila-Kakkanad stretch, signaling growing public trust in the waterway transit system.",
    category: "Traffic",
    readTime: "2 min read",
    date: "April 12, 2026",
    content: `Kochi's Water Metro has hit a new ridership record, with the Vyttila-Kakkanad route logging over 15,000 daily passengers for the first time last week.\n\nThe milestone represents a 40% increase from the route's average daily ridership just three months ago, driven by new feeder bus services and a recently launched monthly pass system priced at ₹1,500.\n\n"The water metro is finally becoming what we envisioned — a genuine daily commute option, not just a tourist attraction," said a KMRL official. "The Kakkanad route connects residential areas with the IT corridor, and professionals are increasingly choosing it over road transport."\n\nThe journey from Vyttila to Kakkanad takes approximately 25 minutes by water metro, compared to 45-60 minutes by road during peak hours. Services run every 15 minutes from 6 AM to 9 PM.\n\nKMRL plans to add two more boats to the route by June to handle growing demand, and is exploring extending services to 10 PM on weekdays.`
  }
];
