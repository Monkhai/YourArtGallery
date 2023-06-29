import { Box, Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import AppCard from '../components/AppCard';
import { colors } from '../utilities/colors';
import CardSkeleton from '../components/CardSkeleton';
import useGetArtwork, { Art } from '../hooks/useGetArtwork';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const skeletons = Array(20)
  .fill({})
  .map((_, index) => ({ id: index + 1 }));

interface Props {
  onArtClick: (art: Art) => void;
}

const HomeScreen = ({ onArtClick }: Props) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGetArtwork();
  const fetchedArtCount =
    data?.pages.reduce((acc, page) => acc + page._embedded.artworks.length, 0) || 0;

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <Box bgGradient={colors.primaryGraidient} h={'auto'} minHeight={'100vh'}>
        <InfiniteScroll
          dataLength={fetchedArtCount}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          <Grid
            overflowY={'scroll'}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            templateRows="repeat(auto-fill, minmax(auto, 1fr))"
            columnGap={'3.5%'}
            rowGap={5}
            justifyItems="center"
            padding={'3%'}
          >
            {isLoading && skeletons.map((skeleton) => <CardSkeleton key={skeleton.id} />)}

            {data &&
              data.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page._embedded.artworks.map((art) => (
                    <GridItem key={art.id}>
                      <AppCard
                        title={art.title}
                        image={art._links.thumbnail.href}
                        handleClick={() => onArtClick(art)}
                      />
                    </GridItem>
                  ))}
                </React.Fragment>
              ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default HomeScreen;
