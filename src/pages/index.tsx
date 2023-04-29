import { DehydratedState, QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { PaginatedEpisodePreviews } from "@/types";
import {
  ErrorBanner,
  Heading,
  PageSizePicker,
  Pagination,
} from "@/components/ui";
import {
  fetchPaginatedEpisodes,
  fetchFinalSpacePaginatedEpisodes,
} from "@/lib";
import EpisodePreview from "@/components/EpisodePreview";
import EpisodesContainer from "@/components/EpisodesContainer";
import PageContainer from "@/components/PageContainer";

const DEFAULT_PER_PAGE = process.env.defaultPerPage;
const PAGE_SIZES = [3, 5, 10, 15];

const Index: React.FC = () => {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const perPage = Number(router.query.perPage || DEFAULT_PER_PAGE);

  const { data, isError, isFetching } = useQuery<PaginatedEpisodePreviews>(
    `paginatedEpisodes-${page}-${perPage}`,
    () => fetchPaginatedEpisodes(page, perPage)
  );

  const shallowPush = (page: number, perPage: number) =>
    router.push({ pathname: "/", query: { page, perPage } }, undefined, {
      scroll: true,
      shallow: true,
    });

  return (
    <>
      <Head>
        <title>Final Space Episodes</title>
      </Head>

      {isError && <ErrorBanner>Something went wrong...</ErrorBanner>}

      <PageContainer>
        <header>
          <Heading size={1}>Final Space Episodes</Heading>
        </header>

        <EpisodesContainer loading={isFetching}>
          {(data?.items || []).map((episode) => (
            <EpisodePreview
              key={`${episode.id}-${episode.name}`}
              episode={episode}
            />
          ))}
        </EpisodesContainer>

        <div className="flex flex-col">
          <Pagination
            className="flex items-center justify-center mb-10"
            currentPage={+(router.query?.page || 1)}
            onPageChange={(index) => shallowPush(index + 1, perPage)}
            totalPages={data?.meta.pagination.totalPages ?? 0}
          />

          <PageSizePicker
            activeSize={perPage}
            onClick={(pageSize) => shallowPush(1, pageSize)}
            sizes={PAGE_SIZES}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const page: number = Number(context.query?.page || 1);
  const perPage: number = Number(context.query?.perPage || DEFAULT_PER_PAGE);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`paginatedEpisodes-${page}-${perPage}`, () =>
    fetchFinalSpacePaginatedEpisodes(page, perPage)
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
