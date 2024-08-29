import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { FaGlobe, FaTelegram, FaXTwitter } from 'react-icons/fa6';

import { EarnAvatar } from '@/components/shared/EarnAvatar';
import { skillMap } from '@/constants';
import {
  extractTelegramUsername,
  extractTwitterUsername,
} from '@/utils/extractUsername';

import { type LocalMember } from '../../queries';
import { SortableTH, TH } from './TH';
import { UserDrawer } from './UserDrawer';

interface SortState {
  column: string;
  direction: 'asc' | 'desc' | null;
}

interface MembersTableProps {
  currentUsers: LocalMember[];
  currentSort: SortState;
  setSort: (column: string, direction: 'asc' | 'desc' | null) => void;
}

export const UserTable = ({
  currentUsers,
  currentSort,
  setSort,
}: MembersTableProps) => {
  return (
    <TableContainer
      mb={8}
      borderWidth={'1px'}
      borderColor={'brand.slate.200'}
      borderRadius={8}
    >
      <Table variant="simple">
        <Thead>
          <Tr bg="brand.slate.100">
            <SortableTH
              column="rank"
              currentSort={currentSort}
              setSort={setSort}
              px={1}
              justify="center"
            >
              # Rank
            </SortableTH>
            <SortableTH
              column="user"
              currentSort={currentSort}
              setSort={setSort}
            >
              User
            </SortableTH>
            <SortableTH
              column="earned"
              currentSort={currentSort}
              setSort={setSort}
              px={1}
            >
              $ Earned
            </SortableTH>
            <SortableTH
              column="submissions"
              currentSort={currentSort}
              setSort={setSort}
              px={0}
              justify="center"
            >
              Submissions
            </SortableTH>
            <SortableTH
              column="wins"
              currentSort={currentSort}
              setSort={setSort}
              px={1}
              justify="center"
            >
              Wins
            </SortableTH>
            <TH>Skills</TH>
            <TH>Socials</TH>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user) => (
            <MemberRow key={user.id} user={user} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const MemberRow = ({ user }: { user: LocalMember }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const skills = user.skills.flatMap((skills: any) => skills.skills);
  const socialLinks = [
    {
      icon: FaTelegram,
      link: user.telegram
        ? `https://t.me/${extractTelegramUsername(user.telegram)}`
        : '',
    },
    {
      icon: FaXTwitter,
      link: user.twitter
        ? `https://x.com/${extractTwitterUsername(user.twitter)}`
        : '',
    },
    { icon: FaGlobe, link: user?.website },
  ];

  return (
    <Tr
      _hover={{ backgroundColor: 'brand.slate.50' }}
      cursor="pointer"
      onClick={onOpen}
      role="group"
    >
      <Td p={1}>
        <Text
          maxW={'3rem'}
          color="brand.slate.700"
          fontSize={'0.9rem'}
          textAlign={'center'}
        >
          #{user?.rank}
        </Text>
      </Td>
      <Td>
        <Flex align="center">
          <EarnAvatar size="36px" id={user?.id} avatar={user?.photo} />
          <Box display={{ base: 'none', md: 'block' }} ml={2}>
            <Text
              overflowX="hidden"
              w={'10rem'}
              color="brand.slate.700"
              fontSize="sm"
              fontWeight={500}
              _groupHover={{
                textDecoration: 'underline',
              }}
              textOverflow={'ellipsis'}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Text>
            <Text
              overflowX="hidden"
              maxW={'10rem'}
              color="brand.slate.500"
              fontSize="sm"
              fontWeight={500}
              textOverflow={'ellipsis'}
            >
              @{user?.username}
            </Text>
          </Box>
        </Flex>
        <UserDrawer isOpen={isOpen} onClose={onClose} user={user} />
      </Td>
      <Td px={1}>
        <Text
          w={'5rem'}
          color="brand.slate.700"
          fontSize={'0.9rem'}
          fontWeight={500}
        >
          $
          {user.totalEarnings.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </Text>
      </Td>
      <Td p={0}>
        <Text color="brand.slate.700" fontSize={'0.9rem'} textAlign={'center'}>
          {user?.totalSubmissions}
        </Text>
      </Td>
      <Td p={1}>
        <Text color="brand.slate.700" fontSize={'0.9rem'} textAlign={'center'}>
          {user?.wins}
        </Text>
      </Td>
      <Td>
        <Flex gap={2} h="full" textAlign={'center'}>
          {skills.slice(0, 2).map((skill: string) => (
            <Badge
              key={skill}
              px={2}
              color={`${skillMap.find((e) => e.mainskill === skill)?.color}`}
              fontSize={'x-small'}
              fontWeight={500}
              textTransform={'none'}
              bg={`${skillMap.find((e) => e.mainskill === skill)?.color}1A`}
              rounded="sm"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Popover trigger="hover">
              <PopoverTrigger>
                <Badge
                  px={2}
                  color="#64739C"
                  fontSize={'x-small'}
                  fontWeight={500}
                  textTransform={'none'}
                  bg="#EFF1F5"
                  rounded="sm"
                >
                  +{skills.length - 2}
                </Badge>
              </PopoverTrigger>
              <PopoverContent
                w="fit-content"
                maxW="10rem"
                px={4}
                py={2}
                shadow="lg"
              >
                <Flex
                  wrap={'wrap'}
                  gap={2}
                  w="fit-content"
                  h="full"
                  textAlign={'center'}
                >
                  {skills.slice(2).map((skill: string) => (
                    <Badge
                      key={skill}
                      px={2}
                      color={`${skillMap.find((e) => e.mainskill === skill)?.color}`}
                      fontSize={'x-small'}
                      fontWeight={500}
                      textTransform={'none'}
                      bg={`${skillMap.find((e) => e.mainskill === skill)?.color}1A`}
                      rounded="sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Td>
      <Td>
        <Flex justify="flex-start" gap={4} minW={16}>
          {socialLinks.map((ele, eleIndex) => (
            <Box
              key={eleIndex}
              flexShrink={0}
              onClick={(e) => {
                e.stopPropagation();
                if (ele.link) {
                  const formattedLink =
                    ele.link.startsWith('http://') ||
                    ele.link.startsWith('https://')
                      ? ele.link
                      : `https://${ele.link}`;
                  window.open(formattedLink, '_blank');
                }
              }}
            >
              <Icon
                as={ele.icon}
                boxSize={'1.2rem'}
                opacity={!ele.link ? '0.3' : '1'}
                cursor={ele.link ? 'pointer' : 'default'}
                filter={!ele.link ? 'grayscale(100%)' : 'none'}
              />
            </Box>
          ))}
        </Flex>
      </Td>
      <Td>
        <Link
          as={NextLink}
          color="brand.slate.500"
          fontSize={'0.9rem'}
          fontWeight={500}
          href={`/t/${user.username}`}
          onClick={(e) => e.stopPropagation()}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Profile <ArrowForwardIcon />
        </Link>
      </Td>
    </Tr>
  );
};
