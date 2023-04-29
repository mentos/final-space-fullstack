# Final Space Episodes

This is a simple [Next.js](https://nextjs.org/) application for listing Final Space episodes and the characters featured on each of them. It was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) in the interest of time.

## Getting Started

First, install dependencies with eiher of the following commands:

```bash
npm install
```

or

```bash
yarn install
```

If you do not intend to modify any of the files, then you can simply build and run the app using the following commands: `yarn build && yarn start`. This will spin up a server at [http://localhost:3000](http://localhost:3000) and make the app available for browsing.

## Integrating with Final Space API

Since I chose to implement a single endpoint for retrieving episode and character data, it means that I need to aggregate data from both the `/v0/episode` and `/v0/character` endpoints of the Final Space API to populate the response that will be consumed by the frontend.

I made this decision because I could leverage character information overlap between the episodes to reduce the total number of requests made to the Final Space API, since it provides no way to limit characters results by `id`. Furthermore, this approach would make data available to the client in a more transparent way by providing a single resource, called `EpisodePreview`, for both episode and its characters.

This part of the logic has been implemented at `src/lib/finalSpaceApiClient.ts`, eg.:

```typescript
// fetch Final Space API episodes
const apiEpisodesReponse = await client.get<FinalSpaceApiEpisode[]>("/v0/episode");

// paginate reponse based on params to avoid making
// more calls than needed when fetcing characters
const apiEpisodes = paginateCollection<FinalSpaceApiEpisode>(...);

// gather all characters' URL, and use that to fetch all character information
const charactersUrls: string[] = apiEpisodes.flatMap(...).filter(unique);
const apiCharactersResponses = await Promise.allSettled(charactersUrls.map(...));

// construct <character url>: <character response> dictionary so that we
// make our lives easier when populates episode informations
const episodeCharacters = apiCharactersResponses.reduce(...);

// map Final Space API episode and character data to EpisodePreview
const episodes = apiEpisodes.map((episode) => apiEpisodeToPreview(...));
```

## API Routes

The application features a sole API endpoint which lives at `/api/episodes`. This endpoing will accept two optional query params `page` and `perPage` that will be used for paginating results, and will respond with the following information:

- `items`: a list of episodes including details for both episode and episode characters
- `meta`: data for pagination and other future uses
- `error`: message

### Request

```http
GET http://localhost:3000/api/episodes?page=1&perPage=10
```

### Response

```json
{
  "error": null,
  "items": [
    {
      "id": 1,
      "name": "Chapter 1",
      "airDate": "02/15/2018",
      "imageUrl": "http://finalspaceapi.com/api/episode/image/chapter1.jpg",
      "characters": [
        {
          "id": 1,
          "imageUrl": "https://finalspaceapi.com/api/character/avatar/gary_goodspeed.png",
          "name": "Gary Goodspeed"
        },
        {
          "id": 2,
          "imageUrl": "https://finalspaceapi.com/api/character/avatar/mooncake.jpg",
          "name": "Mooncake"
        }
      ]
    }

    // ...
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "perPage": 3,
      "total": 23,
      "totalPages": 8
    }
  }
}
```

### SSR, Initial Render, and Consuming the Local API

This app uses `react-query` to communicate with the local and remote Final Space API. This choice was made so that we have a common interface/DSL for consuming APIs and managing data between parts of the code that run both on the backend and the frontend.

The app utilizes server-side rendering (SSR) for the initial render and then implements shallow routing to enable the frontend to manage its state once the initial render has occurred. The initial SSR allows the content of the site to be generated on the server first and sent to the browser later on. This is useful for SEO purposes because search engines can crawl the content more easily compared to dynamic SPAs, which pose more challenges when it comes to indexing. Additionally, SSR also provides a better UX for users as they avoid running into a "spinner" on their first visit to the website or on page refresh.

Since Final Space API data are not changing that often, the query client is configured to cache the responses for a few minutes before requesting fresh ones from the remote Final Space API.

The UI is functional both on mobile and desktop devices.

### Things to consider next

Here are a few potential additions:

- Add an Episode Details page. This page will feature full episode and episode character information.
- Improve the loading state UX by using skeleton loaders for each of the episode blocks. Currently, the app utilizes a "spinner" to indicate when data is being fetched.
