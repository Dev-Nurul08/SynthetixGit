'use client';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  label: string;
  description?: string;
  icon?: string;
}

export function ToggleSwitch({ enabled, onToggle, label, description, icon }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!enabled)}
      className="flex items-center justify-between gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-colors hover:bg-white/[0.03] cursor-pointer"
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="text-sm shrink-0">{icon}</span>}
        <div className="truncate">
          <div className={`text-xs font-semibold truncate ${enabled ? 'text-slate-200' : 'text-slate-400'}`}>
            {label}
          </div>
          {description && (
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
              {description}
            </div>
          )}
        </div>
      </div>

      <div
        className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 shrink-0 ${
          enabled ? 'bg-blue-600' : 'bg-slate-700'
        }`}
        style={{ height: '18px' }}
      >
        <div
          className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 shadow-sm ${
            enabled ? 'translate-x-3.5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}
