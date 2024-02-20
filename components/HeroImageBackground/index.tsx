import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Arbitrage CEX Data Analysis for{' '}
          <Text component="span" inherit className={classes.highlight}>
            Crypto Trader XPerio
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Build more reliable software with the help of DexbotsDev. 
            Our Bots are trained to detect lazy
            traders who do nothing and just complain on Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg" component='a' href='/arbitrades'>
            Get started
          </Button> 
        </div>
      </div>
    </div>
  );
}