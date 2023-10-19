import {
    Container, Grid, GridCol, HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea, NavLink,
    rem,
    useMantineTheme,
    ActionIcon,
} from '@mantine/core';
import logo from '../../assets/AddZero.png'
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconUser,
    IconBrandTelegram,
    IconFence,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { useState } from 'react';
import { Badge } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';

const mockdata = [
    {
        icon: IconCode,
        title: 'Research',
        description: 'Layman\'s Research Tool for Sniping Tokens',
    },
    {
        icon: IconCoin,
        title: 'ZeroSniper',
        description: 'A True MultiDex MultiPattern Sniper for Dex Traders',
    },
    {
        icon: IconBook,
        title: 'TargetHunter',
        description: 'PinPoint Target Tokens eligible to Snipe for an easy 2x+',
    },
    {
        icon: IconFingerprint,
        title: 'WalletReCoupe',
        description: 'Pocketknife Wallet Recovery Tool',
    },
    {
        icon: IconBrandTelegram,
        title: 'Bots',
        description: 'Telegram Bot for manual traders and snipers',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Subscribe to Bots for realtime notifications',
    },
];
export const HeaderNavBar = () => {

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <a href="/#/" className={classes.nocolours}  key={item.title}>
        <UnstyledButton className={classes.subLink2}  mt="xs">
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={24} radius="md" color="#24365b">
                    <item.icon style={{ width: rem(18), height: rem(18) }} color='white' />
                </ThemeIcon>
                <div>
               
                    <Text size="sm" fw={800}>
                        {item.title}
                    </Text>
               
                    <Text size="xs" >
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton> </a>
    ));
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);


    return (
        <header className="header2">
            <div className="nav">
                <Container fluid ml={'4rem'} mr={'14rem'} h={'100%'} mt={'4px'}>
                    <Grid justify="space-between" align="stretch" h={'100%'}>
                        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                        <GridCol span={3}>
                            <img 
                                className="link-etherscan"
                                alt="Link etherscan"
                                src="/assets/AddZero.png"
                                width={'150px'}
                            />
                        </GridCol>
                        <GridCol span={9}>
                            <Group h="100%" gap={0} visibleFrom="sm" justify="flex-end" mt={'10px'}>
                                <a href="/#/" className={classes.link2}>
                                    <IconHome2 size="1rem" stroke={1.5} />&nbsp;Home
                                </a>
                                <a href="/#/" className={classes.link2}>
                                    <IconFence size="1rem" stroke={1.5} />&nbsp;WalletReCoupe
                                </a>
                                <HoverCard width={600} position="bottom" radius="md" shadow="xs" withinPortal zIndex={999} variant='outline'>
                                    <HoverCard.Target>
                                        <a href="#" className={classes.link2}>
                                            <Center inline>
                                            <IconActivity size="1rem" stroke={1.5} />&nbsp;
                                                <Box component="span" mr={5}>
                                                    DexOps
                                                </Box>
                                                <IconChevronDown
                                                    style={{ width: rem(16), height: rem(16) }}
                                                    color="#ffffff"
                                                />
                                            </Center>
                                        </a>
                                    </HoverCard.Target>

                                    <HoverCard.Dropdown style={{ overflow: 'hidden', backgroundColor: '#111a2f' }}>

                                        <SimpleGrid cols={2} spacing={0}>
                                            {links}
                                        </SimpleGrid>

                                        <div className={classes.dropdownFooter2}>
                                            <Group justify="space-between">
                                                <div>
                                                    <Text fw={800} fz="sm">
                                                        Get started
                                                    </Text>
                                                    <Text size="xs" c="white">
                                                        Subscription provides value info.
                                                    </Text>
                                                </div>
                                                <Button variant="default" style={{ overflow: 'hidden', backgroundColor: '#111a2e' }} >Get started</Button>
                                            </Group>
                                        </div>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                                <a href="#" className={classes.link2}>
                                    Learn
                                </a>
                                <a href="#" className={classes.link2}>
                                    Pricing
                                </a>
                                &nbsp;&nbsp;&nbsp;
                                <Divider orientation='vertical' size={'xs'} />&nbsp;&nbsp;
                              
                                <a href="#" className={classes.link2}>
                                <ActionIcon variant="outline" aria-label="Settings" color="#ffffff" radius={'xl'} size={'xs'}>
                                    <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5} color='white' />
                                </ActionIcon>
                                &nbsp;&nbsp;SignIn
                                </a>
                            </Group>
                        </GridCol>

                    </Grid>
                </Container>
            </div>
        </header>
    );
};
