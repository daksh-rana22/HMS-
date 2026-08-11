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

  return (
    <>
      {/* Floating Action Button — compact */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] w-11 h-11 rounded-full text-white flex items-center justify-center cursor-pointer outline-none border border-white/20 transition-all duration-300 shadow-[0_6px_18px_var(--t-btn-shadow)]"
        style={{ background: 'var(--t-primary, #00685e)' }}
        aria-label="Change Appearance"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Appearance Settings"
      >
        <Palette size={20} strokeWidth={2.2} />
      </motion.button>

      {/* Appearance Panel */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6 bg-black/15 backdrop-blur-xs">
            <motion.div
              ref={panelRef}
              className="w-full max-w-[280px] bg-white/96 backdrop-blur-2xl rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-white/80 space-y-2.5 text-slate-800"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center border bg-white shadow-xs"
                    style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 30%, transparent)', color: 'var(--t-primary)' }}
                  >
                    <Settings size={13} />
                  </div>
                  <h2 className="text-sm font-extrabold tracking-tight text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Appearance
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors px-1.5 py-0.5 cursor-pointer"
                >
                  Done
                </button>
              </div>

              {/* 2-column theme grid */}
              <div className="grid grid-cols-2 gap-2">
                {Object.values(HERO_FOOTER_THEMES).map((t) => {
                  const active = heroTheme === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setHeroTheme(t.id)}
                      className={`group relative text-left p-2 rounded-xl border transition-all cursor-pointer bg-white ${
                        active
                          ? 'shadow-sm ring-2'
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                      style={{
                        borderColor: active ? t.dotColor : undefined,
                        boxShadow: active ? `0 0 0 2px ${t.dotColor}33` : undefined,
                      }}
                    >
                      {/* Compact swatch bar */}
                      <div
                        className="relative h-8 rounded-lg mb-1.5 overflow-hidden flex items-start justify-end p-1.5 border border-black/5"
                        style={{ background: t.gradientBg }}
                      >
                        {active
                          ? <Check size={11} strokeWidth={3} style={{ color: t.dotColor, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', padding: '1px' }} />
                          : <span className="w-2 h-2 rounded-full shrink-0 shadow-xs" style={{ background: t.dotColor }} />
                        }
                      </div>

                      {/* Name & Desc */}
                      <span className="text-[11px] font-bold text-slate-800 leading-tight block">
                        {t.name}
                      </span>
                      <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5 block truncate">
                        {t.description}
                      </span>
                    </button>
                  )
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
