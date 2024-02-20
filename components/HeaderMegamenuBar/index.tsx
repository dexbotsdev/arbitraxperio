import {
    Container, Grid, GridCol,
    Group,
    Divider,
    Burger,

    ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconUser,
    IconShieldCheckered,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { IconHome2 } from '@tabler/icons-react';
import Link from 'next/link'
 
export const HeaderNavBar = () => {

    const [opened, { toggle }] = useDisclosure(false);


    return (
        <Container fluid h={'50px'} mt={'4px'} className="header2">
            <Grid justify="space-between" align="stretch" h={'100%'}>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" style={{ marginTop: '12px' }} />
                <GridCol span={1}>
                </GridCol>
                <GridCol span={2}>
                    <img
                        alt="Link etherscan"
                        src="/assets/DexSmart.png"
                        width={'150px'}
                        style={{ marginTop: '10px' }}
                    />
                </GridCol>
                <GridCol span={8}>
                    <Group h="100%" gap={0} visibleFrom="md" justify="flex-end" mt={'1px'}>
                        <Link href="/" className={classes.link2}>
                            <IconHome2 size="1rem" stroke={1.5} />&nbsp;Home
                        </Link>
                        <Link href="/arbitrades" className={classes.link2}>
                            <IconShieldCheckered size="1rem" stroke={1.5} />&nbsp;Arbitrades
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Divider orientation='vertical' size={'xs'} />&nbsp;&nbsp; 
                       
                    </Group>
                </GridCol>
                <GridCol span={1}>
                </GridCol>

            </Grid>
        </Container>
    );
};
