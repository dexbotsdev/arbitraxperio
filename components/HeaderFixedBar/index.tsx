
import { Group, ActionIcon, Container, Grid, GridCol } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandTelegram, IconBrandTwitter } from '@tabler/icons-react';
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
    <Container fluid className={classes.header}>
      <Grid justify="space-between" h={'100%'} mt={4}>
        <GridCol span={1}>
        </GridCol>
        <GridCol span={8}>
        </GridCol>
        <GridCol span={3}>
          <Group>
            <Group gap={2} className={classes.links} >
              <ActionIcon variant="filled" aria-label="Settings" color="#24365b">
                <IconBrandTwitter color='white' style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              &nbsp;&nbsp;&nbsp;
              <ActionIcon variant="filled" aria-label="Settings" color="#24365b">
                <IconBrandTelegram style={{ width: '70%', height: '70%' }} stroke={1.5} color='white' />
              </ActionIcon>
            </Group>
          </Group>
        </GridCol>
      </Grid>
    </Container>

  );
}