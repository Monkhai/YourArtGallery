import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import AppCard from '../components/AppCard';
import { colors } from '../utilities/colors';
import CardSkeleton from '../components/CardSkeleton';
import useGetArtwork, { Art } from '../hooks/useGetArtwork';
import React from 'react';

const skeletons = Array(20)
  .fill({})
  .map((_, index) => ({ id: index + 1 }));

interface Props {
  onArtClick: (art: Art) => void;
}

const HomeScreen = ({ onArtClick }: Props) => {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } = useGetArtwork();

  if (error) return <Text>{error.message}</Text>;

  if (isLoading) {
    return (
      <Box bgGradient={colors.primaryGraidient} h={'auto'} minHeight={'100vh'}>
        <Grid
          overflowY={'scroll'}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          templateRows="repeat(auto-fill, minmax(auto, 1fr))"
          columnGap={'3.5%'}
          rowGap={5}
          justifyItems="center"
          padding={'3%'}
        >
          {skeletons.map((Skeleton) => (
            <CardSkeleton key={Skeleton.id} />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Box bgGradient={colors.primaryGraidient} h={'auto'} minHeight={'100vh'}>
        <Grid
          overflowY={'scroll'}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          templateRows="repeat(auto-fill, minmax(auto, 1fr))"
          columnGap={'3.5%'}
          rowGap={5}
          justifyItems="center"
          padding={'3%'}
        >
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
        <Box width={'100vw'} display={'flex'} justifyContent={'center'}>
          <Button
            justifySelf={'center'}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomeScreen;
