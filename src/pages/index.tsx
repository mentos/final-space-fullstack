import { Inter } from "next/font/google";
import { DehydratedState, QueryClient, dehydrate, useQuery } from "react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { PaginatedEpisodePreviews } from "@/types";
import {
  fetchPaginatedEpisodes,
  fetchFinalSpacePaginatedEpisodes,
} from "@/lib";
import ReactPaginate from "react-paginate";
import Spinner from "@/components/ui/Spinner";

const DEFAULT_PER_PAGE = 10;
const PAGE_SIZES = [3, 5, 10, 15];

const inter = Inter({ subsets: ["latin"] });

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

      {isError && (
        <div className="text-3xl sticky top-0 z-50 bg-red-700 text-w p-5 text-center leading-none font-bold">
          Something went wrong...
        </div>
      )}

      <main
        className={`bg-white text-slate-950 w-full md:w-3/4 mx-auto md:p-8 pb-8 ${inter.className}`}
      >
        <header>
          <h1 className="bg-black text-3xl md:text-6xl text-white text-center font-bold py-8 px-4 md:mb-10">
            Final Space Episodes
          </h1>
        </header>

        <div
          className={`flex flex-col items-center ${
            isFetching ? "opacity-30" : ""
          }`}
        >
          {isFetching && <Spinner style="overlay" />}

          {(data?.items || []).map(
            ({ id, name, imageUrl, airDate, characters }) => {
              return (
                <article
                  key={`${id}-${name}`}
                  className="w-full flex flex-col md:flex-row pb-8 mb-10 place-content-between border-b border-b-slate-700"
                >
                  <div className="flex flex-col md:flex-row md:basis-2/3">
                    <div className="relative mb-3 basis-1 md:basis-1/2 grow border border-black">
                      <div className="aspect-video">
                        <Image
                          alt={name}
                          blurDataURL={process.env.defaultBlurDataURL}
                          className="object-cover"
                          fill
                          placeholder="blur"
                          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                          src={imageUrl}
                          title={name}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col px-4 mb-4 md:basis-1/2">
                      <h2 className="text-2xl md:text-3xl tracking-tighter font-light">
                        {name}
                      </h2>
                      <div className="text-xs md:text-base uppercase">
                        Air Date: <b>{airDate}</b>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:basis-1/3">
                    <h3 className="text-sm md:hidden md:text-3xl uppercase font-medium tracking-wide mb-4 px-4">
                      Episode Characters
                    </h3>
                    <div className="w-full grid grid-cols-4 gap-4 px-4 md:px-0">
                      {characters.map((character) => (
                        <div className="aspect-square relative border border-black">
                          <Image
                            alt={character.name}
                            blurDataURL={process.env.defaultBlurDataURL}
                            className="object-cover"
                            fill
                            placeholder="blur"
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            src={character.imageUrl}
                            title={character.name}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        <div className="flex flex-col">
          <ReactPaginate
            initialPage={+(router.query?.page || 1) - 1}
            activeClassName="bg-slate-900 text-white"
            breakLabel={<span className="mr-4">...</span>}
            containerClassName="flex items-center justify-center mb-10"
            disableInitialCallback
            onPageChange={({ selected }) => shallowPush(selected + 1, perPage)}
            pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
            pageCount={data?.meta.pagination.totalPages ?? 0}
          />

          <div className="flex flex-row content-center items-center justify-center">
            <span className="inline-block font-medium text-sm mr-4">
              Per page:
            </span>
            {PAGE_SIZES.map((n) => (
              <button
                key={`per-page-picker-${n}`}
                className={`block border- border-solid border-lightGray hover:bg-lightGray w-6 h-6 items-center rounded-md mr-4 text-sm ${
                  perPage === n ? "bg-slate-900 text-white" : ""
                }`}
                onClick={() => shallowPush(1, n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </main>
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
