import { AppLayout } from "@/layouts/AppLayout"
import { Box, Heading } from "@chakra-ui/react"
import { QuestTasks, useQuestorItems } from "@xw3/maki-quest"
import { useRouter } from "next/router"

export default function QuestId() {
  const router = useRouter()

  return (
    <AppLayout>
      <Box mb={100}>
        <Heading>Quest ID</Heading>
        <QuestTasks 
          questId={router?.query?.questId} 
          theme={{ 
            done: { color: 'gray.500' } }}
          />
      </Box>
    </AppLayout>
  )
}