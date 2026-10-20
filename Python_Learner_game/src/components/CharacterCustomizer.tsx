import React, { useState } from 'react';
import { PlayerCustomization } from '../types/game';
import { User, Sparkles, Check, ArrowLeft, Wand2, Shield, Heart } from 'lucide-react';

interface CharacterCustomizerProps {
  customization: PlayerCustomization;
  onSave: (newCustomization: PlayerCustomization) => void;
  onClose: () => void;
}

export const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({
  customization,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<PlayerCustomization>({ ...customization });

  const archetypes = [
    { id: 'sorcerer', name: 'Arcane Sorcerer', desc: 'Masters the purest syntax incantations and loop logic.' },
    { id: 'ranger', name: 'Forest Ranger', desc: 'Navigates recursive paths and environmental sensors.' },
    { id: 'knight', name: 'Cyber Knight', desc: 'Armored with robust error shields and defensive checks.' },
    { id: 'artificer', name: 'Clockwork Artificer', desc: 'Constructs intricate object blueprints and data machines.' },
  ] as const;

  const cloakColors = [
    { label: 'Royal Azure', hex: '#2563EB' },
    { label: 'Forest Emerald', hex: '#059669' },
    { label: 'Crimson Velvet', hex: '#DC2626' },
    { label: 'Amethyst Purple', hex: '#7C3AED' },
    { label: 'Solar Amber', hex: '#D97706' },
    { label: 'Midnight Slate', hex: '#334155' },
  ];

  const skinTones = [
    { label: 'Light', hex: '#FDE68A' },
    { label: 'Warm', hex: '#FCD34D' },
    { label: 'Tan', hex: '#F59E0B' },
    { label: 'Bronze', hex: '#D97706' },
    { label: 'Deep', hex: '#92400E' },
  ];

  const familiars: { id: 'owl' | 'dragon' | 'robot' | 'fox'; name: string; desc: string; image?: string }[] = [
    { id: 'owl', name: 'Mechanical Owl', desc: 'Wise companion with glowing brass optics.', image: '/src/assets/images/companion_owl_robot_1792500206640.jpg' },
    { id: 'dragon', name: 'Spark Drake', desc: 'Playful serpent of pure computational flame.' },
    { id: 'robot', name: 'Byte Sprite', desc: 'Compact hover drone carrying system logs.' },
    { id: 'fox', name: 'Spirit Fox', desc: 'Mystic guide through complex algorithmic labyrinths.' },
  ];

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Hero Customization</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Name & Live Avatar Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            {/* Live Vector Sprite Box */}
            <div className="relative w-28 h-28 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-lg"
                style={{ backgroundColor: formData.cloakColor }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                  style={{ backgroundColor: formData.skinTone }}
                />
              </div>
              <div className="absolute bottom-1 text-[10px] text-slate-400 font-mono capitalize">
                {formData.archetype}
              </div>
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-semibold text-slate-300">Adventurer Name</label>
              <input
                type="text"
                value={formData.name}
                maxLength={20}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
                placeholder="Enter hero name..."
              />
              <p className="text-[11px] text-slate-500">
                Your character name will be inscribed upon challenge certificates and quest logs.
              </p>
            </div>
          </div>

          {/* Archetype Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Class Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypes.map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, archetype: arch.id })}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    formData.archetype === arch.id
                      ? 'bg-emerald-950/30 border-emerald-500/80 text-emerald-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{arch.name}</span>
                    {formData.archetype === arch.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{arch.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cloak Color Palette */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Cloak & Robe Color
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {cloakColors.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setFormData({ ...formData, cloakColor: color.hex })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    formData.cloakColor === color.hex
                      ? 'bg-slate-800 border-white text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                  <span>{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Familiar Companion */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Familiar Companion
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {familiars.map((fam) => (
                <button
                  key={fam.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, familiar: fam.id })}
                  className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    formData.familiar === fam.id
                      ? 'bg-amber-950/30 border-amber-500/80 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                    {fam.image ? (
                      <img src={fam.image} alt={fam.name} className="w-full h-full object-cover" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs text-white">{fam.name}</span>
                      {formData.familiar === fam.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{fam.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-colors"
          >
            Save Character
          </button>
        </div>
      </div>
    </div>
  );
};
