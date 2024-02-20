
import { Autocomplete, Group, Burger, rem, Title, Text, ActionIcon, Container, Stack, Grid, GridCol } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandTelegram, IconBrandTwitter, IconGavel, IconGift, IconGiftCard, IconGiftCardFilled, IconScaleOutline, IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from './AdBar.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function AdBar() {
  const [opened, { toggle }] = useDisclosure(false);


  return (
    <Container fluid className={classes.barheader}>
      <Grid justify="space-between" align="stretch" h={'100%'} style={{ padding: '5px' }}> 
        <GridCol span={10} ml={'1rem'}>
          <Group style={{ padding: '5px' }} ml={'6rem'}>
            <IconScaleOutline size={'48px'} color='#fff' stroke={'1px'} />
            <Stack gap="1px">
              <Text fw={600} size='14px' c='white'>Subscribe Now & Get 15% off!.</Text>
              <Text c="wheat" size='12px'>Eligible for new subscribers only. T&Cs apply.</Text>
            </Stack>
          </Group>
        </GridCol>
        <GridCol span={1}>
        </GridCol>
        <GridCol span={1}>
        </GridCol> 
      </Grid>

    </Container>
  );
}