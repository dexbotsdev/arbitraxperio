import { Button, Container, Group } from "@mantine/core";
import PageComponent from "../components/PageComponent";

export default function IndexPage() {
  return (
    <PageComponent>
      <Group justify="center">
        <Button size="xl">Welcome to Index!</Button>
      </Group>
    </PageComponent>
  );
}
