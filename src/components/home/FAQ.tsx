import { useState } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation(['home', 'common']);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-semibold text-iaeva-blue-dark dark:text-iaeva-teal uppercase tracking-wider mb-2">
            {t('faq.subtitle')}
          </h2>
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('faq.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('faq.description')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
                )}
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('faq.more_questions')}
          </p>
          <a
            href={SIGNUP_URL}
            className="px-6 py-3 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            {t('faq.contact_button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
