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
        id: '1086768042',
        title: 'RCN Col Regs Video - Rule 6 - Safe Speed (Part 1 of 2)',
        url: 'https://vimeo.com/1086768042/85364552a8',
        type: 'video',
      },
      {
        id: '1086769134',
        title: 'RCN Col Regs Video - Rule 6 - Safe Speed (Part 2 of 2)',
        url: 'https://vimeo.com/1086769134/65fe9c691f',
        type: 'video',
      },
      {
        id: '1086770180',
        title: 'RCN Col Regs Video - Rule 7 - Risk of Collision',
        url: 'https://vimeo.com/1086770180/8122e2c6dc',
        type: 'video',
      },
      {
        id: '1086770405',
        title: 'RCN Col Regs Video - Rule 8 - Action to Avoid Collision',
        url: 'https://vimeo.com/1086770405/2cf6e58183',
        type: 'video',
      },
      {
        id: '1086770792',
        title: 'RCN Col Regs Video - Rule 9 - Narrow Channels',
        url: 'https://vimeo.com/1086770792/d7e0ea6e0f',
        type: 'video',
      },
      {
        id: '1086771202',
        title: 'RCN Col Regs Video - Rule 10 - Traffic Separation Schemes (Part 1 of 2)',
        url: 'https://vimeo.com/1086771202/0adc48d667',
        type: 'video',
      },
      {
        id: '1086771667',
        title: 'RCN Col Regs Video - Rule 10 - Traffic Separation Schemes (Part 2 of 2)',
        url: 'https://vimeo.com/1086771667/1f31155097',
        type: 'video',
      },
      {
        id: '1086772386',
        title: 'RCN Col Regs Video - Rule 13 - Overtaking',
        url: 'https://vimeo.com/1086772386/f63a72c627',
        type: 'video',
      },
      {
        id: '1086772737',
        title: 'RCN Col Regs Video - Rule 14 - Head-on Situation',
        url: 'https://vimeo.com/1086772737/16c6ca87c4',
        type: 'video',
      },
      {
        id: '1086772947',
        title: 'RCN Col Regs Video - Rule 15 - Crossing Situation',
        url: 'https://vimeo.com/1086772947/dd8391b4cb',
        type: 'video',
      },
      {
        id: '1086773257',
        title: 'RCN Col Regs Video - Rule 18 - Responsibilities Between Vessels',
        url: 'https://vimeo.com/1086773257/4d4cf9a19d',
        type: 'video',
      },
      {
        id: '1086767408',
        title: 'RCN Col Regs Video - Annex IV - Distress Signals',
        url: 'https://vimeo.com/1086767408/8a7d3787f5',
        type: 'video',
      },
    ],
  },
];
