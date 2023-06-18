import { Card, CardBody, CardFooter, ChakraProps, Skeleton, SkeletonText } from '@chakra-ui/react';
import { colors } from '../utilities/colors';

interface Props extends ChakraProps {}

const CardSkeleton = ({ ...otherProps }: Props) => {
  return (
    <Card
      justifyContent={'space-evenly'}
      bgGradient={colors.secondaryGraidient}
      border={'1px'}
      borderColor={colors.lowWhite}
      overflow={'hidden'}
      width={280}
      height={265}
      {...otherProps}
    >
      <CardBody
        _hover={{ cursor: 'pointer' }}
        padding={2}
        margin={0}
        display={'flex'}
        flex={0}
        justifyContent={'center'}
      >
        <Skeleton boxSize={200} />
      </CardBody>
      <CardFooter
        className="card-footer"
        transition={'all 0.25s'}
        borderTop={'1px'}
        borderColor={colors.lowWhite}
        paddingX={2}
        paddingY={0}
        justifyContent={'center'}
        alignItems={'center'}
        flex={1}
      >
        <SkeletonText width={40} noOfLines={1} />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
