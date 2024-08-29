import { Box, Flex, Icon, Input, Text } from '@chakra-ui/react';
import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaTelegram,
  FaXTwitter,
} from 'react-icons/fa6';
import { toast } from 'sonner';

import {
  isValidDiscordInput,
  isValidGitHubInput,
  isValidLinkedInInput,
  isValidTelegramInput,
  isValidTwitterInput,
  isValidWebsiteUrl,
} from '@/utils/validateSocialLinks';

type SocialInputProps = {
  register: UseFormRegister<any>;
};

const socials = [
  {
    name: 'discord',
    placeholder: 'johncena#7589',
    icon: FaDiscord,
    required: true,
  },
  {
    name: 'twitter',
    label: 'x.com/',
    placeholder: 'johncena',
    icon: FaXTwitter,
  },
  {
    name: 'github',
    label: 'github.com/',
    placeholder: 'johncena',
    icon: FaGithub,
  },
  {
    name: 'linkedin',
    label: 'linkedin.com/in/',
    placeholder: 'johncena',
    icon: FaLinkedin,
  },
  {
    name: 'telegram',
    label: 't.me/',
    placeholder: 'tonystark',
    icon: FaTelegram,
  },
  {
    name: 'website',
    placeholder: 'https://starkindustries.com',
    icon: FaGlobe,
  },
];

export const SocialInput = ({ register }: SocialInputProps) => {
  const validateSocial = (value: string, name: string) => {
    if (name === 'discord' && !value) {
      toast.error('Discord is required');
      return false;
    }
    if (value) {
      switch (name) {
        case 'discord':
          if (!isValidDiscordInput(value)) {
            toast.error('Invalid Discord username');
            return false;
          }
          break;
        case 'twitter':
          if (!isValidTwitterInput(value)) {
            toast.error('Invalid Twitter username or URL');
            return false;
          }
          break;
        case 'github':
          if (!isValidGitHubInput(value)) {
            toast.error('Invalid GitHub username or URL');
            return false;
          }
          break;
        case 'linkedin':
          if (!isValidLinkedInInput(value)) {
            toast.error('Invalid LinkedIn username or URL');
            return false;
          }
          break;
        case 'telegram':
          if (!isValidTelegramInput(value)) {
            toast.error('Invalid Telegram username or URL');
            return false;
          }
          break;
        case 'website':
          if (!isValidWebsiteUrl(value)) {
            toast.error('Invalid website URL');
            return false;
          }
          break;
      }
    }

    return true;
  };
  return (
    <>
      {socials.map(({ name, label, placeholder, icon, required }) => (
        <Box key={name} mb={'1.25rem'}>
          <Flex align="center" justify="center" direction="row">
            <Icon as={icon} boxSize={5} mr={3} color={'brand.slate.600'} />
            {label && (
              <Box
                h="2.6875rem"
                px={3}
                border="1px solid"
                borderColor={'brand.slate.300'}
                borderRight="none"
                borderLeftRadius={'md'}
              >
                <Flex
                  align="center"
                  justify={{ base: 'center', md: 'start' }}
                  w={'100%'}
                  h={'100%'}
                >
                  <Text
                    h="4.3rem"
                    color={'brand.slate.600'}
                    fontSize={{ base: '0.7rem', md: '0.875rem' }}
                    fontWeight={500}
                    lineHeight="4.3rem"
                    textAlign="left"
                  >
                    {label}
                    {required && (
                      <Text as="sup" ml={1} color="red">
                        *
                      </Text>
                    )}
                  </Text>
                </Flex>
              </Box>
            )}
            <Input
              w="full"
              h="2.6875rem"
              color={'gray.800'}
              fontSize="0.875rem"
              fontWeight={500}
              borderColor={'brand.slate.300'}
              borderLeftRadius={label ? 0 : 6}
              _placeholder={{
                color: 'brand.slate.300',
              }}
              focusBorderColor="brand.purple"
              placeholder={placeholder}
              {...register(name, {
                validate: (value) => validateSocial(value, name),
              })}
            />
          </Flex>
        </Box>
      ))}
    </>
  );
};
