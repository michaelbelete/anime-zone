export const GET_ANIME_QUERY = `
query ($page: Int) {
  Page(page: $page, perPage: 20) {
   media(type: ANIME, startDate_greater: 2020, genre_in: "Action", sort: START_DATE) {
     siteUrl
     title {
       native
     }
   }
  }
 }
`;
