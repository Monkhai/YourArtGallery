import { Box, Grid, GridItem } from '@chakra-ui/react';
import AppCard from '../components/AppCard';
import { colors } from '../utilities/colors';
import useArtwork from '../hooks/useArtworks';
import CardSkeleton from '../components/CardSkeleton';
import { Art } from '../hooks/useArtworks';
import { useEffect, useRef } from 'react';

const skeletons = Array(20)
  .fill({})
  .map((_, index) => ({ id: index + 1 }));

interface Props {
  onArtClick: (art: Art) => void;
}

const HomeScreen = ({ onArtClick }: Props) => {
  const { art, loadMore } = useArtwork();
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

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
          {art
            ? art.map((art, index) => (
                <GridItem key={art.id + index}>
                  <AppCard
                    title={art.title}
                    image={art._links.thumbnail.href}
                    handleClick={() => onArtClick(art)}
                  />
                </GridItem>
              ))
            : skeletons.map((Skeleton) => <CardSkeleton key={Skeleton.id} />)}
        </Grid>
      </Box>
      <div ref={loader} />
    </>
  );
};

export default HomeScreen;
