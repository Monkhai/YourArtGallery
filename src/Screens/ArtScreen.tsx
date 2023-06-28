import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { colors } from '../utilities/colors';

import { useParams } from 'react-router-dom';
import useGetArtist from '../hooks/useGetArtist';
import { Art } from '../hooks/useGetArtwork';

interface Props {
  art: Art | null;
}

const ArtScreen = ({ art }: Props) => {
  const imageVersion = 'normalized';
  const artistLink = art?._links.artists.href;
  const { id } = useParams();
  const { data: artist, error } = useGetArtist(artistLink, id);

  if (error) return <Text>{error.message}</Text>;

  return (
    <Flex
      bgGradient={colors.primaryGraidient}
      h={'auto'}
      minHeight={'100vh'}
      direction={'column'}
      alignItems={'center'}
    >
      <Box
        bgGradient={colors.secondaryGraidient}
        margin={5}
        paddingY={2}
        paddingX={4}
        border={'1px'}
        borderColor={colors.white}
        borderRadius={20}
        boxShadow={'xl'}
      >
        <Text textColor={colors.white} fontSize={'24px'}>
          {art?.title}
        </Text>
      </Box>
      <Flex width={'95%'}>
        <Box flex={1} justifyContent={'start'}>
          <Text textColor={'white'}>
            <b>Artist: </b>
            {artist?.name}
          </Text>
          <Text textColor={'white'}>
            <b>Category: </b>
            {art?.category}
          </Text>
          <Text textColor={'white'}>
            <b>Date: </b>
            {art?.date}
          </Text>
          <Text textColor={'white'}>
            <b>Medium: </b>
            {art?.medium}
          </Text>
        </Box>
        <Image
          boxShadow={'dark-lg'}
          borderRadius={10}
          height={500}
          src={art?._links.image.href.replace('{image_version}', imageVersion)}
          alt={art?.title}
          flex={1}
        />
        <Flex flex={1} />
      </Flex>
    </Flex>
  );
};

export default ArtScreen;
