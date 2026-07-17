import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// 字体（自托管 @fontsource，避免依赖外部 CDN）
// 西文无衬线：Inter（标题/正文）
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
// 中文无衬线：思源黑体 Noto Sans SC
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
import '@fontsource/noto-sans-sc/700.css'
// 等宽：JetBrains Mono（编号/版权）
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
