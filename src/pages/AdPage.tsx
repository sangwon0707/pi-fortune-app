import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdPageProps {
  onAdComplete: () => void;
}

const AdPage: React.FC<AdPageProps> = ({ onAdComplete }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Monetag 광고 스크립트 삽입
    const scriptCode = "(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9498297,document.createElement('script'))";
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = scriptCode;
    document.body.appendChild(scriptElement);

    // 로딩 바 진행
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + (100 / 50); // 5초(5000ms) 동안 100ms마다 업데이트
      });
    }, 100);

    // 일정 시간 후 결과 페이지로 자동 전환
    const timer = setTimeout(() => {
      onAdComplete();
    }, 5000); // 5초 후 전환 (광고 로딩 및 시청 시간 고려)

    return () => {
      document.body.removeChild(scriptElement);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onAdComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fffceb] p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {t('adPage.loadingAd')}
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        {t('adPage.pleaseWait')}
      </p>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-coral h-2.5 rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* 실제 광고는 Monetag 스크립트에 의해 팝업됩니다. */}
    </div>
  );
};

export default AdPage;

