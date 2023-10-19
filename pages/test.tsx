import { Button, Group } from "@mantine/core";
import PageComponent from "../components/PageComponent";

export default function TestPage() {
  return (
     <PageComponent>
      <Group justify="center">
        <Button size="xl">Welcome to Test Page!</Button>
      </Group>
      </PageComponent>
  );
}
