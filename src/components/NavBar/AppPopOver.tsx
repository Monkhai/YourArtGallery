import {
  Container,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { Item } from './categoryObjects';
import AppTextButton from '../AppTextButton';

interface Props {
  items: Item[];
  label: string;
  onClick: (item: Item) => void;
}

const AppPopOver = ({ items, label, onClick }: Props) => {
  return (
    <Container width={'auto'} margin={0} padding={0} bg={'none'} display={'flex'}>
      <Popover trigger="hover" placement="bottom-start" openDelay={0.2}>
        <PopoverTrigger>
          <AppTextButton textColor="white" padding={0} label={label} />
        </PopoverTrigger>
        <Portal>
          <PopoverContent border={'none'} bg={'black'} minWidth={10} maxWidth={40}>
            <PopoverBody>
              <Flex flexDirection={'column'}>
                {items.map((item) => (
                  <AppTextButton
                    onClick={() => onClick(item)}
                    paddingX={1}
                    marginY={1}
                    textColor="white"
                    justifyContent={'start'}
                    key={item.id}
                    label={item.name}
                    icon={item.icon}
                  />
                ))}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Container>
  );
};

export default AppPopOver;
