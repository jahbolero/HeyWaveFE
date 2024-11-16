import { AppLayout } from "@/layouts/AppLayout"
import { Box, Heading } from "@chakra-ui/react"
import { Packs } from "@xw3/maki-quest"

export default function Shop() {
  return (
    <AppLayout>
      <Heading>Shop</Heading>
      <Packs />
    </AppLayout>
  )
}