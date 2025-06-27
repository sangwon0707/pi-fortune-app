import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface AdPageProps {
  onAdComplete: () => void;
}

const AdPage: React.FC<AdPageProps> = ({ onAdComplete }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Monetag 광고 스크립트 삽입
    const scriptCode = "(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9498297,document.createElement('script'))";
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = scriptCode;
    document.body.appendChild(scriptElement);

    // 일정 시간 후 결과 페이지로 자동 전환
    const timer = setTimeout(() => {
      onAdComplete();
    }, 5000); // 5초 후 전환 (광고 로딩 및 시청 시간 고려)

    return () => {
      document.body.removeChild(scriptElement);
      clearTimeout(timer);
    };
  }, [onAdComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fffceb] p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {t('adPage.loadingAd') || 'Loading your result...'}
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        {t('adPage.pleaseWait') || 'Please wait a moment while we prepare your personalized pie.'}
      </p>
      {/* 실제 광고는 Monetag 스크립트에 의해 팝업됩니다. */}
    </div>
  );
};

export default AdPage;
