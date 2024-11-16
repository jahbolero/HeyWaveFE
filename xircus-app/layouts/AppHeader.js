import { HStack, Image, Spacer, Text } from "@chakra-ui/react"
import { useUser } from "@xw3/maki"
import Avatar from "boring-avatars"
import Link from "next/link"

export const AppHeader = ({ children }) => {
  const user = useUser()
  return (
    <HStack px={6} pt={4}>
      <Link href="/">
        <Image src="/logo-2.svg" rounded="full" boxSize={34} />
      </Link>
      <Spacer />
      {
        user && (
          <Link href="/admin">
            <HStack variant="ghost" size="sm" gap={2}>
              <Avatar size={24} name={user?._id || ''} variant="beam" />
              <Text fontSize="xs">{user?.name || user?.telegram || user?.username}</Text>
            </HStack>
          </Link>
        )
      }
      {children}
    </HStack>    
  )  
}