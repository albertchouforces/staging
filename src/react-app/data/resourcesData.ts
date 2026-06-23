export type ResourceType = 'link' | 'video';

export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  description?: string;
  embedUrl?: string;
}

export interface ResourceSection {
  id: string;
  heading: string;
  items: ResourceItem[];
}

// Organize sections and links in the exact order you want them displayed.
export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: 'reference-materials',
    heading: 'Reference Materials',
    items: [
      {
        id: 'collision-regulations',
        title: 'Collision Regulations (Canada)',
        url: 'https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html',
        type: 'link',
      },
    ],
  },
  {
    id: 'video-resources',
    heading: 'Video Resources',
    items: [
      {
        id: '1049436538',
        title: 'RCN Col Regs Video - Rule 6 - Safe Speed (Part 1 of 2)',
        url: 'https://vimeo.com/1049436538',
        type: 'video',
      },
      {
        id: '1063345593',
        title: 'RCN Col Regs Video - Rule 6 - Safe Speed (Part 2 of 2)',
        url: 'https://vimeo.com/1063345593',
        type: 'video',
      },
      {
        id: '607640999',
        title: 'RCN Col Regs Video - Rule 7 - Risk of Collision',
        url: 'https://vimeo.com/607640999',
        type: 'video',
      },
      {
        id: '607641210',
        title: 'RCN Col Regs Video - Rule 8 - Action to Avoid Collision',
        url: 'https://vimeo.com/607641210',
        type: 'video',
      },
      {
        id: '607641964',
        title: 'RCN Col Regs Video - Rule 9 - Narrow Channels',
        url: 'https://vimeo.com/607641964',
        type: 'video',
      },
      {
        id: '623417379',
        title: 'RCN Col Regs Video - Rule 10 - Traffic Separation Schemes (Part 1 of 2)',
        url: 'https://vimeo.com/623417379',
        type: 'video',
      },
      {
        id: '1047958510',
        title: 'RCN Col Regs Video - Rule 10 - Traffic Separation Schemes (Part 2 of 2)',
        url: 'https://vimeo.com/1047958510',
        type: 'video',
      },
      {
        id: '607638308',
        title: 'RCN Col Regs Video - Rule 13 - Overtaking',
        url: 'https://vimeo.com/607638308',
        type: 'video',
      },
      {
        id: '607638775',
        title: 'RCN Col Regs Video - Rule 14 - Head-on Situation',
        url: 'https://vimeo.com/607638775',
        type: 'video',
      },
      {
        id: '607639296',
        title: 'RCN Col Regs Video - Rule 15 - Crossing Situation',
        url: 'https://vimeo.com/607639296',
        type: 'video',
      },
      {
        id: '607639992',
        title: 'RCN Col Regs Video - Rule 18 - Responsibilities Between Vessels',
        url: 'https://vimeo.com/607639992',
        type: 'video',
      },
      {
        id: '1047197993',
        title: 'RCN Col Regs Video - Annex IV - Distress Signals',
        url: 'https://vimeo.com/1047197993',
        type: 'video',
      },
    ],
  },
];
