import { Card, CardBody, CardFooter, ChakraProps, Img } from '@chakra-ui/react';
import { colors } from '../utilities/colors';
import AppTextButton from './AppTextButton';

export interface ArtItem {
  title: string;
}

interface Props extends ChakraProps {
  title: string;
  image: string;

  handleClick: () => void;
}

const AppCard = ({ title, image, handleClick, ...otherProps }: Props) => {
  return (
    <Card
      justifyContent={'space-evenly'}
      bgGradient={colors.secondaryGraidient}
      border={'1px'}
      borderColor={colors.lowWhite}
      textColor={colors.white}
      overflow={'hidden'}
      transition={'all 0.25s'}
      width={280}
      height={265}
      _hover={{ borderColor: colors.midWhite, '& .card-footer': { borderColor: colors.midWhite } }}
      {...otherProps}
    >
      <CardBody
        _hover={{ cursor: 'pointer' }}
        _active={{ opacity: '60%' }}
        onClick={handleClick}
        padding={2}
        margin={0}
        display={'flex'}
        flex={0}
        justifyContent={'center'}
      >
        <Img objectFit={'contain'} boxSize={200} src={image} />
      </CardBody>
      <CardFooter
        className="card-footer"
        transition={'all 0.25s'}
        borderTop={'1px'}
        borderColor={colors.lowWhite}
        paddingX={2}
        paddingY={0}
        justifyContent={'center'}
        flex={1}
      >
        {title.length < 50 ? (
          <AppTextButton
            onClick={handleClick}
            label={title}
            textColor={colors.white}
            fontWeight={'normal'}
            whiteSpace={'break-spaces'}
          />
        ) : (
          <AppTextButton
            padding={1}
            onClick={() => console.log(title)}
            label={title.slice(0, 50) + '...'}
            textColor={colors.white}
            fontWeight={'normal'}
            whiteSpace={'break-spaces'}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default AppCard;
