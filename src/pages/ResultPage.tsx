import React, { useRef } from 'react';
import { mbtiData, MbtiType } from '../data/mbti';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';

interface ResultPageProps {
  result: MbtiType;
  onRestart: () => void;
}

const getMbtiImagePath = (mbtiType: MbtiType) => {
  try {
    return require(`../assets/images/MBTI_${mbtiType}.png`);
  } catch (error) {
    console.error(`Image for ${mbtiType} not found:`, error);
    return null; // Or a placeholder image
  }
};

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart }) => {
  const { t } = useTranslation();
  const resultData = mbtiData.results[result];
  const mbtiImage = getMbtiImagePath(result);
  const goodMatchImage = getMbtiImagePath(mbtiData.results[result].goodMatch as MbtiType);
  const badMatchImage = getMbtiImagePath(mbtiData.results[result].badMatch as MbtiType);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, {
        useCORS: true, // Important for handling images loaded from external sources or local files
        ignoreElements: (element) => {
          return element.id === 'restart-button'; // Exclude the restart button
        }
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `MBTI_Result_${result}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="relative flex size-full h-full flex-col bg-[#fffceb] justify-between group/design-root overflow-x-hidden">
      <div ref={resultRef}> {/* Wrap the content to be captured with a ref */}
        {mbtiImage && (
          <div className="flex justify-center mt-8 mb-4">
            <img src={mbtiImage} alt={result} className="w-[200px] h-[200px] rounded-full object-cover shadow-lg" />
          </div>
        )}
        <h2 className="text-[#0c151d] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          {t('resultPage.yourResult', { result: t(`mbtiData.mbtiPies.${result}.pie`) })}
        </h2>
        
        <p className="text-[#0c151d] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          {t(`mbtiData.mbtiPies.${result}.description`)}
        </p>
        <div className="flex justify-around w-full my-6 px-4">
          <div className="text-center p-4 rounded-lg bg-green-100 flex-1 mx-2">
            <h3 className="text-xl font-semibold mb-2 text-green-800">{t('resultPage.goodMatch')}</h3>
            {goodMatchImage && (
              <img src={goodMatchImage} alt={resultData.goodMatch} className="w-20 h-20 rounded-full object-cover mx-auto mb-2" />
            )}
            <p className="text-base font-bold text-green-500">{t(`mbtiData.mbtiPies.${resultData.goodMatch}.pie`)}</p>
            <p className="text-sm text-gray-600 mt-2">{t(`mbtiData.results.${resultData.goodMatch}.goodMatchDescription`)}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-100 flex-1 mx-2">
            <h3 className="text-xl font-semibold mb-2 text-red-800">{t('resultPage.badMatch')}</h3>
            {badMatchImage && (
              <img src={badMatchImage} alt={resultData.badMatch} className="w-20 h-20 rounded-full object-cover mx-auto mb-2" />
            )}
            <p className="text-base font-bold text-red-500">{t(`mbtiData.mbtiPies.${resultData.badMatch}.pie`)}</p>
            <p className="text-sm text-gray-600 mt-2">{t(`mbtiData.results.${resultData.badMatch}.badMatchDescription`)}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex px-4 py-3">
          <button
            onClick={handleDownload}
            className="flex min-w-[84px] max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-coral text-[#0c151d] text-base font-bold leading-normal tracking-[0.015em] shadow-lg transform transition-transform hover:scale-105 mr-2"
          >
            <span className="truncate">Download</span>
          </button>
          <button
            id="restart-button" // Added ID to exclude from screenshot
            onClick={onRestart}
            className="flex min-w-[84px] max-w-[720px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-coral text-[#0c151d] text-base font-bold leading-normal tracking-[0.015em] shadow-lg transform transition-transform hover:scale-105"
          >
            <span className="truncate">{t('resultPage.restartButton')}</span>
          </button>
        </div>
        <div className="h-5 bg-[#fffceb]"></div>
      </div>
    </div>
  );
};

export default ResultPage;
