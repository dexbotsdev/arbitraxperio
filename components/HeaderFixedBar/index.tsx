
import { Autocomplete, Group, Burger, rem, Title, Text, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandTelegram, IconBrandTwitter, IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from './HeaderFixedBar.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function HeaderFixedBar() {
  const [opened, { toggle }] = useDisclosure(false);
 

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group gap={'xs'}>
                     
        </Group>
        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <ActionIcon variant="filled" aria-label="Settings" color="#24365b">
              <IconBrandTwitter color='white' style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            &nbsp;&nbsp;&nbsp;
            <ActionIcon variant="filled" aria-label="Settings" color="#24365b">
              <IconBrandTelegram style={{ width: '70%', height: '70%' }} stroke={1.5} color='white' />
            </ActionIcon>
          </Group>
        </Group>
      </div>
    </header>
  );
}