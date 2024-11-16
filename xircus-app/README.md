# Xircus Quest MAKI Template

Modern Web3 Application Kit

- Pre-built Quest Modules
- Admin Panel
- Profile Editing
- Joining Quests and Doing Tasks

### Admin Features
- Bot Management
- App Management
- Quest Management

### Structure
- admin
- components
- constants
- hooks
- layouts
- pages
- theme

### Initial Setup
To begin, make sure to configure environment variable
```
NEXT_PUBLIC_API_URL=https://quests.xircus.co/YOUR_APP_URL/graph
```

### Fonts
Recommended to put them inside the _document.js
Change the theme/index.js

```
const fonts = {
  body: 'FontName',
  heading: 'FontName',
  mono: 'FontName'
}

export default extendTheme({
  config,
  styles,
  components,
  fonts
})
```