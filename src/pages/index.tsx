import { GET_ANIME_QUERY } from "@/utils/queries";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState(null);

  const [page, setPage] = useState<number>(1);

  const GRAPHQL_API = "https://graphql.anilist.co";

  const getAnimes = async () => {
    setLoading(true);
    try {
      const response = await fetch(GRAPHQL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_ANIME_QUERY,
          variables: {
            page,
          },
        }),

      });
      const data = await response.json();
      setData(data.data.Page.media);
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  };



  useEffect(() => {
    getAnimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;


  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

export default Home;