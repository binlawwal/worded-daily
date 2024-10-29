import React from 'react';
import { Trophy } from 'lucide-react';

interface Leader {
  rank: number;
  name: string;
  score: number;
  country: string;
}

const leaders: Leader[] = [
  { rank: 1, name: 'Sarah Chen', score: 2500, country: 'CN' },
  { rank: 2, name: 'John Smith', score: 2350, country: 'US' },
  { rank: 3, name: 'Maria Garcia', score: 2200, country: 'ES' },
  { rank: 4, name: 'Yuki Tanaka', score: 2100, country: 'JP' },
  { rank: 5, name: 'Alex Kumar', score: 2000, country: 'IN' },
];

const Leaderboard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="text-yellow-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Daily Leaders</h2>
      </div>

      <div className="space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className={`
                w-6 h-6 flex items-center justify-center rounded-full font-bold
                ${leader.rank === 1 ? 'bg-yellow-400 text-black' : 
                  leader.rank === 2 ? 'bg-gray-300 text-black' :
                  leader.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-white/20 text-white'}
              `}>
                {leader.rank}
              </span>
              <div className="flex items-center space-x-2">
                <img
                  src={`https://flagcdn.com/24x18/${leader.country.toLowerCase()}.png`}
                  alt={`${leader.country} flag`}
                  className="w-6 h-4 rounded-sm object-cover"
                />
                <span className="text-white">{leader.name}</span>
              </div>
            </div>
            <span className="text-white font-bold">{leader.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;