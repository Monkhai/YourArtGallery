import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { HiSearch } from 'react-icons/hi';
import AppTextButton from './AppTextButton';
import { colors } from '../utilities/colors';

interface Props {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        ref.current && onSearch(ref.current?.value);
      }}
    >
      <InputGroup display="flex" gap={2}>
        <InputLeftElement children={<Icon as={HiSearch} color={'black'} />} />
        <Input
          borderRadius={'50'}
          bgColor={colors.white}
          ref={ref}
          _hover={{ color: 'none' }}
          placeholder="search"
          textColor={colors.black}
          focusBorderColor={colors.white}
        />
        <AppTextButton textColor={'white'} type="submit" label="search" padding={0} margin={0} />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
