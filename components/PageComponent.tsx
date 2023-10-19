import "@mantine/core/styles.css";
import { Container } from "@mantine/core";

export default function PageComponent({ children }: any) {
  return ( 
      <Container mt={100} ml={'4rem'} mr={'4rem'} fluid>
        {children}
      </Container>
  );
}
