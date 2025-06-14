import React from 'react';

export const AffiliateLinks = () => {
  // Printrendy calculations
  const printrendyBaseCommission = 15; // 15% base commission
  const printrendyFirstTimeBonus = 25; // 25% of the commission
  const printrendyFirstTimeTotal = (printrendyBaseCommission * printrendyFirstTimeBonus) / 100; // 3.75% for first-time

  // Ursime calculations
  const ursimeBaseCommission = 2; // 2% base commission
  const ursimeFirstTimeBonus = 25; // 25% of the commission
  const ursimeFirstTimeTotal = (ursimeBaseCommission * ursimeFirstTimeBonus) / 100; // 0.5% for first-time

  return (
    <div className="w-full bg-slate-900/50 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Printrendy Affiliate */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 md:col-span-3 w-full h-full">
              <div className="flex flex-col items-center gap-3 h-full">
                <a 
                  rel="sponsored"
                  href="https://printrendy.pxf.io/c/6232366/1453720/17020" 
                  target="_top" 
                  id="1453720"
                  className="block w-full relative"
                >
                  <img 
                    src="https://a.impactradius-go.com/display-ad/17020-1453720" 
                    alt="Printrendy Online Sale - Get 3.75% commission on first-time purchases" 
                    width="235" 
                    height="300"
                    className="rounded-lg w-full h-[230px] object-cover mb-[4px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-700 rounded-lg flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">Printrendy Online Sale<br/>3.75% Commission on First Purchase</p>
                  </div>
                </a>
                <img 
                  height="0" 
                  width="0" 
                  src="https://imp.pxf.io/i/6232366/1453720/17020" 
                  style={{ position: 'absolute', visibility: 'hidden' }} 
                  alt=""
                />
                <div className="text-center w-full mt-auto">
                  <h3 className="text-base font-semibold text-cyan-300 mb-2">Online Sale</h3>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-slate-300">First-time Commission</p>
                    <p className="text-green-400 font-bold text-base">{printrendyFirstTimeTotal}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini Affiliate */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 md:col-span-6 w-full h-full">
              <div className="flex flex-col items-center gap-3 h-full">
                <a 
                  rel="sponsored"
                  href="https://gemini.sjv.io/c/6232366/1958119/11829" 
                  target="_top" 
                  id="1958119"
                  className="block w-full relative"
                >
                  <img 
                    src="https://a.impactradius-go.com/display-ad/11829-1958119" 
                    alt="Gemini Exchange - Get $10 commission on first-time trades" 
                    width="1200" 
                    height="675"
                    className="rounded-lg w-full h-[207px] object-cover mb-[4px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-700 rounded-lg flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">Gemini Exchange<br/>$10 Commission on First Trade</p>
                  </div>
                </a>
                <img 
                  height="0" 
                  width="0" 
                  src="https://imp.pxf.io/i/6232366/1958119/11829" 
                  style={{ position: 'absolute', visibility: 'hidden' }} 
                  alt=""
                />
                <div className="text-center w-full mt-auto">
                  <h3 className="text-base font-semibold text-cyan-300 mb-2">Gemini</h3>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-slate-300">First-time Commission</p>
                    <p className="text-green-400 font-bold text-base">$10.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ursime Affiliate */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 md:col-span-3 w-full h-full">
              <div className="flex flex-col items-center gap-3 h-full">
                <a 
                  rel="sponsored"
                  href="https://ursime.pxf.io/c/6232366/2889438/16384" 
                  target="_top" 
                  id="2889438"
                  className="block w-full relative"
                >
                  <img 
                    src="https://a.impactradius-go.com/display-ad/16384-2889438" 
                    alt="Ursime Online Sale - Get 0.5% commission on first-time purchases" 
                    width="235" 
                    height="300"
                    className="rounded-lg w-full h-[230px] object-cover mb-[4px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-700 rounded-lg flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">Ursime Online Sale<br/>0.5% Commission on First Purchase</p>
                  </div>
                </a>
                <img 
                  height="0" 
                  width="0" 
                  src="https://imp.pxf.io/i/6232366/2889438/16384" 
                  style={{ position: 'absolute', visibility: 'hidden' }} 
                  alt=""
                />
                <div className="text-center w-full mt-auto">
                  <h3 className="text-base font-semibold text-cyan-300 mb-2">Online Sale</h3>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-slate-300">First-time Commission</p>
                    <p className="text-green-400 font-bold text-base">{ursimeFirstTimeTotal}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 