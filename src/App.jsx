import { useState, useMemo } from 'react';

const types = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const typeLabels = {
  'ISTJ': '管理者',
  'ISFJ': '擁護者',
  'INFJ': '提唱者', 
  'INTJ': '建築家',
  'ISTP': '巨匠', 
  'ISFP': '冒険家',
  'INFP': '仲介者', 
  'INTP': '論理学者',
  'ESTP': '起業家',
  'ESFP': 'エンターテイナー',
  'ENFP': '運動家',
  'ENTP': '討論者',
  'ESTJ': '幹部',
  'ESFJ': '領事官',
  'ENFJ': '主人公',
  'ENTJ': '指揮官'
};

const getCompatibility = (me, you) => {
  if (!me || !you) return null;
  let score = 0;
  for (let i = 0; i < 4; i++) {
    if (i === 2) {
      if (me[i] === you[i]) score += 40;
    } else {
      if (me[i] !== you[i]) score += 20;
    }
  }
  if (score >= 100) return { rank: 'A',score: 100, label: 'Excellent Match', advice: '素晴らしい相性です！お互いの違いを楽しみながら、最高の関係を築けます。', color: '#5bef44' };
  if (score >= 80) return { rank: 'B',score: 80, label: 'Good Match', advice: '良い基盤があります。お互いの視点を尊重することで、さらに絆が深まります。', color: '#efef44' };
  if (score >= 60) return { rank: 'C',score: 60, label: 'Average Match', advice: '歩み寄りが必要です。丁寧なコミュニケーションを心がけましょう。', color: '#44deef' };
  if (score >= 40) return { rank: 'D',score: 40, label: 'Below Average Match', advice: '価値観の違いが大きいかもしれません。歩み寄る努力が鍵となります。', color: '#44b0ef' };
  return { rank: 'F',score: 0, label: 'Poor Match', advice: '根本的な違いがあるようです。時間をかけて理解を深める必要があります。', color: '#ef4444' };
};

export default function App() {
  const [me, setMe] = useState('');
  const [you, setYou] = useState('');

  const result = useMemo(() => {
    return getCompatibility(me, you);
  }, [me, you]);

  const getColorClass = (type) => {
    if (type.includes('ST')) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (type.includes('SF')) return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    if (type.includes('NF')) return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    if (type.includes('NT')) return 'bg-pink-50 border-pink-200 text-pink-700';
    return 'bg-gray-50 border-gray-200 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl shadow-indigo-100/50 p-12 border border-white">
        
        {/* Header Section */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-black text-center text-slate-800 mb-2 tracking-tight">MBTI COMPATIBILITY</h1>
        <p className="text-center text-slate-400 text-sm mb-10 font-medium">Understand your communication style. Build stronger connections.</p>
        
        <div className="space-y-8">
          {/* MY TYPE Section */}
          <div className="bg-white rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">My Type</label>
              {me && <span className="text-blue-500 font-bold ml-2">[{typeLabels[me]}]</span>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {types.map((t) => {
                const isSelected = me === t;
                const colorStyles = getColorClass(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setMe(t)}
                    className={`py-4 px-1 text-sm font-bold rounded-xl border transition-all duration-200 shadow-sm ${
                      isSelected
                        ? `${colorStyles.replace(/-50/g, '-100')} ring-2 ring-offset-1 ring-slate-200 scale-[0.98]`
                        : `${colorStyles} opacity-80 hover:opacity-100 hover:scale-[1.02]`
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1 border-t border-dashed border-slate-200"></div>
            <span className="mx-4 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xs font-black shadow-lg">VS</span>
            <div className="flex-1 border-t border-dashed border-slate-200"></div>
          </div>

          {/* PARTNER TYPE Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Partner Type</label>
              {you && <span className="text-blue-500 font-bold ml-2">[{typeLabels[you]}]</span>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {types.map((t) => {
                const isSelected = you === t;
                const colorStyles = getColorClass(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setYou(t)}
                    className={`py-4 px-1 text-sm font-bold rounded-xl border transition-all duration-200 shadow-sm ${
                      isSelected
                        ? `${colorStyles.replace(/-50/g, '-100')} ring-2 ring-offset-1 ring-slate-200 scale-[0.98]`
                        : `${colorStyles} opacity-80 hover:opacity-100 hover:scale-[1.02]`
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-10 p-8 bg-slate-50 rounded-[30px] text-center border border-slate-100 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-7xl font-black mb-2" style={{ color: result.color }}>{result.rank}</div>
            <div className="text-sm font-bold text-slate-400">マッチ度：{result.score}%</div>
            <div className="text-xl font-extrabold text-slate-800 mb-2">{result.label}</div>
            <p className="text-slate-500 text-sm leading-relaxed">{result.advice}</p>
            <button onClick={() =>{
              setMe('');
              setYou('');
            }} className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">
              Try Again
            </button>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-3 opacity-30">
          <div className="h-[1px] w-8 bg-slate-400"></div>
          <p className="text-slate-900 text-[10px] tracking-[0.1em] font-black">性格特性を理解し、円滑な関係構築を支援する</p>
          <div className="h-[1px] w-8 bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}