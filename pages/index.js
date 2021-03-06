import styled from 'styled-components'
import Header from '../components/header'
import Footer from '../components/footer'
import { Container, Text, Heading } from '@hackclub/design-system'
import Search from '../components/search'
import theme from '../theme/config'

const Highlight = styled(Text.span)`
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`

const Page = () => (
  <>
    <Header />
    <Container width={1} maxWidth={48} px={3} pb={4}>
      <Heading.h1 f={[5, 6]} regular>
        Your vote counts. <Text.span bold>Cast it.</Text.span>
      </Heading.h1>
      <Text f={3} mt={2} mb={2}>
        While young people are more informed and engaged than ever, we’re not
        turning up at the polls.{' '}
        <Highlight>Our votes are critical to the future we want.</Highlight>
      </Text>
      <Text f={3} mb={[3, 4]}>
        <Text.span bold>Know who you’re voting for, then vote.</Text.span> We’re
        here to help.
      </Text>
      <Search />
    </Container>
    <Footer />
  </>
)

export default Page
