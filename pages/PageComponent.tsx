import "@mantine/core/styles.css";
import { ActionIcon, Container,Divider,Grid, GridCol, Group } from "@mantine/core";
import { IconHome2, IconShieldCheckered, IconUser } from "@tabler/icons-react";
 
export default function PageComponent({ children }: any) {
  return ( 
      <Container  fluid mt={'4rem'} p={0}>
           {children} 
       </Container>
  );
}
