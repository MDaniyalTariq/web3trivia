'use client';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { ChevronDownIcon } from '@heroicons/react/outline';
import 'flag-icons/css/flag-icons.min.css'; // Import flag icons

const COOKIE_NAME = 'googtrans';

interface LanguageDescriptor {
    name: string; // Country code (e.g., "en" for English, "fr" for French)
    title: string; // Display name of the language (e.g., "English", "French")
}

declare global {
    namespace globalThis {
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<{ languages: LanguageDescriptor[]; defaultLanguage: string } | undefined>();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];
        let languageValue = existingLanguageCookieValue?.split('/')[2] || '';

        // Detect user's preferred language using navigator.language if no cookie is set
        if (!languageValue) {
            const userLang = navigator.language.split('-')[0]; // Extract language code (e.g., "en" from "en-US")
            languageValue = userLang;
        }

        // Fallback to default language if no detected or existing language
        if (!languageValue && global.__GOOGLE_TRANSLATION_CONFIG__) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }

        if (languageValue) {
            setCurrentLanguage(languageValue);
        }

        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    useEffect(() => {
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME]?.split('/')[2];

        // Only update the cookie and reload if the language has changed
        if (currentLanguage && currentLanguage !== existingLanguageCookieValue) {
            setCookie(null, COOKIE_NAME, `/auto/${currentLanguage}`);
            window.location.reload();
        }
    }, [currentLanguage]);

    if (!currentLanguage || !languageConfig) return null;

    const switchLanguage = (lang: string) => {
        setCookie(null, COOKIE_NAME, `/auto/${lang}`);
        window.location.reload();
    };

    return (
        <div className="absolute top-[2px] right-0 z-50 text-center notranslate">
            <div className="relative inline-block text-center notranslate">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    className="flex items-center px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <span className={`fi fi-${currentLanguage.toLowerCase()} mr-2`} />
                    <span className="font-medium text-sm sm:text-base">
                        {languageConfig.languages.find((lang) => lang.name === currentLanguage)?.title || 'Language'}
                    </span>
                    <ChevronDownIcon className="w-5 h-5 ml-2" />
                </button>

                {dropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
                        style={{ maxHeight: '200px', overflowY: 'auto' }}
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {languageConfig.languages.map((ld) => (
                            <button
                                key={ld.name}
                                onClick={() => switchLanguage(ld.name)}
                                className={`flex items-center w-full px-4 py-2 text-left text-sm transition-colors duration-150 ${currentLanguage === ld.name
                                        ? 'bg-gray-100 text-gray-700 dark:text-white font-semibold dark:bg-gray-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                role="menuitem"
                                disabled={currentLanguage === ld.name}
                            >
                                <span className={`fi fi-${ld.name.toLowerCase()} mr-2`} />
                                {ld.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };
