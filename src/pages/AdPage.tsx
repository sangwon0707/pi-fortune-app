import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdPageProps {
  onAdComplete: () => void;
}

const AdPage: React.FC<AdPageProps> = ({ onAdComplete }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fffceb] p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {t('adPage.title') || 'A quick message from our sponsors!'}
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        {t('adPage.description') || 'Your result is almost ready. Please wait a moment.'}
      </p>
      {/* Here you would integrate your actual ad code */}
      <button
        onClick={onAdComplete}
        className="mt-6 w-full bg-coral hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-opacity"
      >
        {t('adPage.continueButton') || 'Continue to Result'}
      </button>
    </div>
  );
};

export default AdPage;
