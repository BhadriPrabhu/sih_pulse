import { libraryData } from './libraryData';
import { mediaData } from './mediaData';
import { lessonKits } from './learnData';

export const getSearchContext = () => {
  return {
    datasets: libraryData.map(d => ({ id: d.id, title: d.title, abstract: d.abstract })),
    media: mediaData.map(m => ({ id: m.id, title: m.caption, category: m.category })),
    kits: lessonKits.map(k => ({ id: k.id, title: k.title, grade: k.grade }))
  };
};

// Robust offline fallback if the API fails or times out
export const runFallbackSearch = (query) => {
  const q = query.toLowerCase();
  
  const datasetIds = libraryData.filter(d => d.title.toLowerCase().includes(q) || d.abstract.toLowerCase().includes(q)).map(d => d.id).slice(0, 2);
  const mediaIds = mediaData.filter(m => m.caption.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)).map(m => m.id).slice(0, 2);
  const kitIds = lessonKits.filter(k => k.title.toLowerCase().includes(q)).map(k => k.id).slice(0, 1);

  // If literally nothing matches, provide some default fascinating data
  if (datasetIds.length === 0) datasetIds.push(libraryData[0].id);
  if (mediaIds.length === 0) mediaIds.push(mediaData[0].id);

  return {
    answer: `I searched the archives for "${query}" and compiled the closest field notes I could find. \n\nOur polar data spans from deep ice core drilling to upper atmospheric readings. I've attached some relevant datasets and media from recent expeditions to help you explore this topic further.`,
    keyTerms: ["field notes", "ice core", "expeditions"],
    datasetIds,
    mediaIds,
    kitIds
  };
};