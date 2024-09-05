import { AppProvider } from './hooks'
import { Home } from './screens/Home/home'
import GlobalStyles from './styles/global'

export function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <Home />
    </AppProvider>
  )
}
