import React, { useState } from 'react';

const PackHistoryPage = () => {
  const [history] = useState([
    {
      id: 1,
      packName: 'Premium Pack',
      packImage: '💎',
      openedAt: '2024-03-15T14:30:00',
      items: [
        { id: 1, name: 'Rare Skin', rarity: 'Rare', value: 25.00, image: '🎨' },
        { id: 2, name: 'Epic Mount', rarity: 'Epic', value: 75.00, image: '🐎' }
      ],
      totalValue: 100.00
    },
    {
      id: 2,
      packName: 'Elite Pack',
      packImage: '👑',
      openedAt: '2024-03-14T18:45:00',
      items: [
        { id: 3, name: 'Legendary Weapon', rarity: 'Legendary', value: 150.00, image: '⚔️' }
      ],
      totalValue: 150.00
    },
    {
      id: 3,
      packName: 'Mystery Pack',
      packImage: '❓',
      openedAt: '2024-03-13T10:15:00',
      items: [
        { id: 4, name: 'Common Emote', rarity: 'Common', value: 5.00, image: '😄' },
        { id: 5, name: 'Uncommon Banner', rarity: 'Uncommon', value: 15.00, image: '🎌' }
      ],
      totalValue: 20.00
    }
  ]);

  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Pack Opening History</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Total Value Opened:</span>
          <span className="text-xl font-bold text-green-400">
            ${history.reduce((acc, record) => acc + record.totalValue, 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {history.map((record) => (
          <div key={record.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{record.packImage}</span>
                <div>
                  <h3 className="text-xl font-bold">{record.packName}</h3>
                  <p className="text-sm text-gray-400">{formatDate(record.openedAt)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-400">
                  Total Value: ${record.totalValue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  {record.items.length} item{record.items.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {record.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3"
                >
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${getRarityColor(item.rarity)}`}>
                        {item.rarity}
                      </span>
                      <span className="text-sm text-green-400">
                        ${item.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackHistoryPage; 