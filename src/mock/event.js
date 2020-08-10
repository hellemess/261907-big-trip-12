import {DESTINATIONS, OPTIONS, TYPES_IN, TYPES_TO} from '../const';
import {getRandomArrayValue, getRandomInteger} from '../utils';

const MAX_PHOTOS_COUNT = 10;
const MAX_OPTIONS_COUNT = 3;

const descriptionSentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const types = [...TYPES_IN, ...TYPES_TO];

const generateDescription = () => {
  const randomSentencesCount = getRandomInteger(0, descriptionSentences.length);

  return descriptionSentences.slice(0, randomSentencesCount).join(` `);
};

const generatePhotos = () => {
  const randomPhotosCount = getRandomInteger(1, MAX_PHOTOS_COUNT);

  return new Array(randomPhotosCount).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getOptions = (type) => {
  const randomOptionsCount = getRandomInteger(0, MAX_OPTIONS_COUNT);

  return OPTIONS.filter((option) => option.forTypes.indexOf(type) >= 0).slice(0, randomOptionsCount);
};

const getPrep = (type) => TYPES_IN.indexOf(type) < 0
  ? `to`
  : `in`;

export const generateEvent = () => {
  const type = getRandomArrayValue(types);
  const prep = getPrep(type);
  const options = getOptions(type);

  return {
    type,
    prep,
    destination: getRandomArrayValue(DESTINATIONS),
    startDate: ``,
    finishDate: ``,
    cost: getRandomInteger(10, 200),
    options,
    info: {
      description: generateDescription(),
      photos: generatePhotos()
    }
  };
};
