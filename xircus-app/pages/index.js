import { AppLayout } from "@/layouts/AppLayout"
import { Heading, VStack } from "@chakra-ui/react"
import { QuestorPoints } from "@xw3/maki-quest"

export default function Home() {
  return (
    <AppLayout>
      <Heading>Home</Heading>
      <VStack>
        <Heading size="4xl"><QuestorPoints /></Heading>
        <Heading size="sm">Total Points</Heading>
      </VStack>
    </AppLayout>
  )
}