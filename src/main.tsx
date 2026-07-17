import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// 字体（自托管 @fontsource，避免依赖 Google CDN）
// 中文衬线：思源宋体 Noto Serif SC（标题/正文）
import '@fontsource/noto-serif-sc/400.css'
import '@fontsource/noto-serif-sc/500.css'
import '@fontsource/noto-serif-sc/600.css'
import '@fontsource/noto-serif-sc/700.css'
// 英文衬线：Cormorant Garamond（西文刊头/引文 fallback）
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/600-italic.css'
// 等宽：JetBrains Mono（编号/版权）
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
