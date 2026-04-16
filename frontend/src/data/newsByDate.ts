export type DailyNewsArticle = {
  id: string;
  title: string;
  source: string;
  url: string;
  published: string;
  summary: string;
};

export const TODAY_NEWS_KEY = "today";
export const TODAY_NEWS_DATE = "2026-04-16";

export const dailyNewsByDate: Record<string, DailyNewsArticle[]> = {
  "2026-04-16": [
    {
      id: "16-1",
      title: "Water Metro adds extra evening services after commuter demand rises",
      source: "The Kochi Chronicle",
      url: "https://example.com/kochi/water-metro-evening-services",
      published: "2026-04-16T08:10:00+05:30",
      summary: "Evening frequency has been increased on key routes after higher office-hour footfall, with authorities expecting shorter wait times for regular commuters.",
    },
    {
      id: "16-2",
      title: "Corporation begins pre-monsoon drain cleaning across central Kochi zones",
      source: "City Desk",
      url: "https://example.com/kochi/pre-monsoon-drain-cleaning",
      published: "2026-04-16T10:05:00+05:30",
      summary: "Cleaning work has started in flood-prone pockets ahead of the rains, focusing on drainage chokepoints that affected traffic and neighbourhood access last season.",
    },
    {
      id: "16-3",
      title: "Infopark startup collective announces new hiring fair in Kakkanad",
      source: "Business South",
      url: "https://example.com/kochi/infopark-hiring-fair",
      published: "2026-04-16T13:00:00+05:30",
      summary: "A multi-company hiring event is being planned for this weekend, with roles expected across engineering, operations, support, and design teams.",
    },
    {
      id: "16-4",
      title: "Marine Drive cultural festival to host food, music, and local craft stalls",
      source: "Metro Life",
      url: "https://example.com/kochi/marine-drive-cultural-festival",
      published: "2026-04-16T16:40:00+05:30",
      summary: "Organisers say the festival will feature local performers and small businesses, aiming to draw families and tourists during the holiday weekend.",
    },
  ],
  "2026-04-15": [
    {
      id: "15-1",
      title: "Kochi airport reports rise in domestic passenger movement ahead of holiday rush",
      source: "Travel South",
      url: "https://example.com/kochi/airport-domestic-passenger-rise",
      published: "2026-04-15T07:25:00+05:30",
      summary: "Airport traffic has picked up earlier than expected, with operators preparing for heavier weekend movement and tighter turnaround schedules.",
    },
    {
      id: "15-2",
      title: "Residents seek faster road repair after repeated congestion near Vyttila",
      source: "Local Watch",
      url: "https://example.com/kochi/vyttila-road-repair-demand",
      published: "2026-04-15T11:15:00+05:30",
      summary: "Commuters and nearby residents are pressing for quicker repairs after uneven stretches and diversions continued to slow peak-hour travel.",
    },
    {
      id: "15-3",
      title: "College teams from Kochi qualify for state innovation showcase",
      source: "Campus Wire",
      url: "https://example.com/kochi/state-innovation-showcase",
      published: "2026-04-15T15:55:00+05:30",
      summary: "Student groups working on mobility, climate, and civic-tech ideas have advanced to the next stage of the statewide competition.",
    },
  ],
  "2026-04-14": [
    {
      id: "14-1",
      title: "Harbour maintenance schedule causes partial movement changes for freight traffic",
      source: "Port Update",
      url: "https://example.com/kochi/harbour-maintenance-freight",
      published: "2026-04-14T09:00:00+05:30",
      summary: "Temporary scheduling adjustments are in place while maintenance is completed, with operators asked to follow revised timing windows.",
    },
    {
      id: "14-2",
      title: "Health officials begin awareness drive as summer heat intensifies in Kochi",
      source: "Public Health Desk",
      url: "https://example.com/kochi/summer-heat-awareness-drive",
      published: "2026-04-14T12:20:00+05:30",
      summary: "The campaign focuses on hydration, outdoor work precautions, and special care guidance for children, older adults, and vulnerable groups.",
    },
    {
      id: "14-3",
      title: "Book fair at Ernakulam venue draws strong turnout from schools and families",
      source: "Culture Beat",
      url: "https://example.com/kochi/book-fair-turnout",
      published: "2026-04-14T18:10:00+05:30",
      summary: "Publishers reported strong weekend footfall, with Malayalam titles, children’s books, and academic materials seeing steady demand.",
    },
  ],
};
