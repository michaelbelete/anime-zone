import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout";
import { GET_ANIME_QUERY, Anime, PageInfo } from "@/utils/queries";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Table, Pagination, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LinkOutlined } from "@ant-design/icons";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Anime[] | undefined>();

  const [page, setPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();

  const getAnimes = async () => {
    setLoading(true);
    try {
      const GRAPHQL_API = "https://graphql.anilist.co";

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
      setPageInfo(data.data.Page.pageInfo);
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAnimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const columns: ColumnsType<Anime> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (item: Anime["title"]) => item.native,
    },
    {
      title: "Link",
      dataIndex: "siteUrl",
      key: "siteUrl",
      render: (text: string) => (
        <a href={text} target="_blank">
          {text} <LinkOutlined />
        </a>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>AnimeZone</title>
        <meta
          name="description"
          content="Action Anime Movies Released After 2020"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout title="Action Anime Movies Released After 2020">
        {/* Error message */}
        {error && <Alert message={error.message} type="error" showIcon />}

        {/* Data table */}
        <Table
          columns={columns}
          bordered
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 400 }}
        />

        {/* pagination */}
        {pageInfo && (
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              total={pageInfo.total}
              defaultCurrent={1}
              responsive
              showSizeChanger={false}
              current={page}
              onChange={(page) => {
                setPage(page);
                //scroll to top when page change
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Home;
