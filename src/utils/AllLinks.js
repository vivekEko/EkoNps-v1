import { BASE_API_LINK } from "../../../../utils/BaseAPILink";

export default {
  fetchNps: {
    url: `${BASE_API_LINK}/Nps/all/week?api_key=${API_KEY}&language=en-US`,
  },
};
