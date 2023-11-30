import { DiaryEntry } from "../src/types";
import toNewDiaryEntry from "../src/utils";

const data = [
  {
    "id": 'fe07019d-9c89-4482-8ca4-2be41c982e6e',
    "date": "2017-01-01",
    "weather": "rainy",
    "visibility": "poor",
    "comment": "Pretty scary flight, I'm glad I'm alive"
  },
  {
    "id": '41ae6e07-4e76-458f-b44e-27177e87bc37',
    "date": "2017-04-01",
    "weather": "sunny",
    "visibility": "good",
    "comment": "Everything went better than expected, I'm learning much"
  },
  {
    "id": '71054ac8-e5d5-4021-8f57-779be0c4c25c',
    "date": "2017-04-15",
    "weather": "windy",
    "visibility": "good",
    "comment": "I'm getting pretty confident although I hit a flock of birds"
  },
  {
    "id": '2284e43c-fd26-4c5a-8474-14a2ce51459b',
    "date": "2017-05-11",
    "weather": "cloudy",
    "visibility": "good",
    "comment": "I almost failed the landing but I survived"
  }
];

const diaryEntries: DiaryEntry [] = data.map(obj => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaryEntries;