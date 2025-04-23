import { CategoryData } from '../types/research';

// Data for the research cards with elements for each category
export interface ElementType {
  id: string;
  title: string;
  description: string;
}

export const researchData: CategoryData[] = [
  {
    id: "arc",
    title: "Arc",
    description: "Future trajectory of digital education",
    elements: [
      { id: "arc-1", title: "Hyper-connected", description: "A future where everything and everyone is digitally connected" },
      { id: "arc-2", title: "AI-driven", description: "Artificial intelligence becomes the primary educational driver" },
      { id: "arc-3", title: "Decentralized", description: "Education becomes distributed and community-owned" },
      { id: "arc-4", title: "Post-institutional", description: "Traditional educational institutions become obsolete" },
      { id: "arc-5", title: "Bio-digital", description: "Merging of biological and digital educational interfaces" },
      { id: "arc-6", title: "Climate-adaptive", description: "Education systems that evolve with environmental challenges" },
      { id: "arc-7", title: "Open-source", description: "Knowledge and educational resources freely available to all" },
      { id: "arc-8", title: "Virtual-immersive", description: "Education primarily occurring in virtual spaces" },
      { id: "arc-9", title: "Neo-traditional", description: "Return to traditional values with digital enhancements" },
      { id: "arc-10", title: "Post-human", description: "Education beyond current human cognitive limitations" },
    ]
  },
  {
    id: "object",
    title: "Object",
    description: "Key artifacts in future education",
    elements: [
      { id: "obj-1", title: "Neural interface", description: "Direct brain-to-information connection devices" },
      { id: "obj-2", title: "Knowledge crystal", description: "Crystallized data storage with vast educational content" },
      { id: "obj-3", title: "AI mentor", description: "Personalized artificial intelligence teaching companion" },
      { id: "obj-4", title: "Holographic classroom", description: "3D projection spaces for immersive learning" },
      { id: "obj-5", title: "Biofeedback wearable", description: "Devices that optimize learning based on physiological data" },
      { id: "obj-6", title: "Memory enhancement", description: "Tools that augment human memory capacity and recall" },
      { id: "obj-7", title: "Skill implant", description: "Directly downloadable skills and knowledge" },
      { id: "obj-8", title: "Reality lens", description: "Augmented reality tools that enhance learning in real environments" },
      { id: "obj-9", title: "Community hub", description: "Physical-digital spaces for collaborative education" },
      { id: "obj-10", title: "Quantum textbook", description: "Educational materials that adapt based on the learner's state" },
    ]
  },
  {
    id: "terrain",
    title: "Terrain",
    description: "Educational environments of the future",
    elements: [
      { id: "ter-1", title: "Digital commons", description: "Shared virtual spaces owned by learning communities" },
      { id: "ter-2", title: "Smart campus", description: "Physical spaces enhanced by ambient intelligence" },
      { id: "ter-3", title: "Global classroom", description: "Borderless learning environments connecting worldwide participants" },
      { id: "ter-4", title: "Knowledge forest", description: "Organic information structures that grow with collective learning" },
      { id: "ter-5", title: "Dream academy", description: "Learning environments that operate within dream states" },
      { id: "ter-6", title: "Orbital school", description: "Educational institutions in space or planetary orbit" },
      { id: "ter-7", title: "Underwater institute", description: "Deep-sea environments for specialized learning" },
      { id: "ter-8", title: "Desert wisdom center", description: "Isolated environments focusing on contemplative education" },
      { id: "ter-9", title: "Urban learning mesh", description: "City-integrated learning networks throughout urban environments" },
      { id: "ter-10", title: "Quantum realm classroom", description: "Educational spaces existing across multiple realities" },
    ]
  },
  {
    id: "mood",
    title: "Mood",
    description: "Emotional context of future education",
    elements: [
      { id: "mood-1", title: "Hopeful curiosity", description: "Optimistic exploration of new educational possibilities" },
      { id: "mood-2", title: "Technological anxiety", description: "Concern about rapid changes in educational technology" },
      { id: "mood-3", title: "Collective wonder", description: "Shared amazement at new forms of knowledge and learning" },
      { id: "mood-4", title: "Critical skepticism", description: "Questioning the value and direction of educational evolution" },
      { id: "mood-5", title: "Playful experimentation", description: "Joyful testing of new educational approaches" },
      { id: "mood-6", title: "Nostalgic resistance", description: "Yearning for traditional educational experiences" },
      { id: "mood-7", title: "Transcendent awareness", description: "Expanded consciousness through educational evolution" },
      { id: "mood-8", title: "Pragmatic adaptation", description: "Practical adjustment to changing educational landscapes" },
      { id: "mood-9", title: "Ecological harmony", description: "Learning aligned with natural systems and rhythms" },
      { id: "mood-10", title: "Digital dissonance", description: "Conflicting emotions about technology's role in education" },
    ]
  }
]; 