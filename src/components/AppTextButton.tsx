import { Button, ButtonProps, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../utilities/colors';

interface Props extends ButtonProps {
  label: string;
  icon?: React.ComponentType;
}

const AppTextButton = React.forwardRef(({ icon, label, ...otherProps }: Props, ref) => (
  <>
    <Button
      minWidth={'auto'}
      height={'auto'}
      bg={'none'}
      textTransform={'capitalize'}
      {...otherProps}
      _hover={{
        bg: 'none',
        textDecorationLine: 'underline',
      }}
      _active={{ opacity: '80%' }}
      ref={ref}
    >
      <Flex gap={2} alignItems={'center'}>
        {icon && <Icon color={colors.white} as={icon} />}
        {label}
      </Flex>
    </Button>
  </>
));

export default AppTextButton;
