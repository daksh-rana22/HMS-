import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Palette, Check } from 'lucide-react'
import { useTheme, HERO_FOOTER_THEMES } from '../../contexts/ThemeContext'

export default function ThemeChanger() {
  const { heroTheme, setHeroTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // Close panel when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const isOceanic = heroTheme === 'oceanic'

  return (
    <>
      {/* Floating Action Button (FAB) — Dynamic Theme Color */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full text-white flex items-center justify-center cursor-pointer outline-none border-2 border-white/20 transition-all duration-300 shadow-[0_8px_25px_var(--t-btn-shadow)]"
        style={{ background: 'var(--t-primary, #00685e)' }}
        aria-label="Change Appearance"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        title="Appearance Settings"
      >
        <Palette size={26} strokeWidth={2.2} />
      </motion.button>

      {/* Appearance Modal Drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 bg-black/20 backdrop-blur-xs">
            <motion.div
              ref={panelRef}
              className="w-full max-w-[340px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-white/80 space-y-4 text-slate-800"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors bg-white shadow-xs"
                    style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)', color: 'var(--t-primary)' }}>
                    <Settings size={18} />
                  </div>
                  <h2 className="text-lg font-extrabold tracking-tight text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Appearance
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 cursor-pointer"
                >
                  Done
                </button>
              </div>

              {/* Themes list */}
              <div>
                <div className="grid grid-cols-1 gap-3">
                  {Object.values(HERO_FOOTER_THEMES).map((t) => {
                    const active = heroTheme === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => setHeroTheme(t.id)}
                        className={`group relative text-left p-3.5 rounded-2xl border transition-all cursor-pointer bg-white ${
                          active
                            ? 'shadow-sm ring-2'
                            : 'border-slate-200 hover:border-slate-300 shadow-xs'
                        }`}
                        style={{
                          borderColor: active ? t.dotColor : undefined,
                          boxShadow: active ? `0 0 0 2px ${t.dotColor}33` : undefined,
                        }}
                      >
                        {/* Gradient preview rectangle */}
                        <div
                          className="relative h-14 rounded-xl mb-3 overflow-hidden flex items-start justify-end p-2 border border-black/5"
                          style={{ background: t.gradientBg }}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                            style={{ background: t.dotColor }}
                          />
                        </div>

                        {/* Card Title & Desc */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-extrabold text-slate-900 leading-snug">
                            {t.name}
                          </span>
                          {active && (
                            <Check size={16} className="shrink-0" style={{ color: t.dotColor }} strokeWidth={3} />
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-medium block leading-tight mt-0.5">
                          {t.description}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
