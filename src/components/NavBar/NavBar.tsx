import { ChakraProps, Flex, Image } from '@chakra-ui/react';
import { colors } from '../../utilities/colors';

interface Props extends ChakraProps {
  onLogoClick: () => void;
}

const NavBar = ({ onLogoClick, ...otherProps }: Props) => {
  return (
    <Flex
      {...otherProps}
      paddingX={'3%'}
      bgGradient={colors.primaryGraidient}
      height={'82px'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        onClick={onLogoClick}
        transition={'all, 0.25s'}
        _hover={{ cursor: 'pointer', height: '75px' }}
        flexShrink={0}
        height={'70px'}
        padding={2}
        margin={0}
        src="/assets/gallery-logo.svg"
      />
    </Flex>
  );
};

export default NavBar;
