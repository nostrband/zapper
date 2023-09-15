import { IntlProvider as ReactIntlProvider } from 'react-intl'

import enMessages from '../../translations/en.json'

// import useLogin from "Hooks/useLogin";

const DefaultLocale = 'en-US'

const getMessages = (locale) => {
   const truncatedLocale = locale.toLowerCase().split(/[_-]+/)[0]

   const matchLang = (lng) => {
      switch (lng) {
         //      case "ta-IN":
         //      case "ta":
         //        return taINMessages;
         case DefaultLocale:
         case 'en':
         default:
            return enMessages
      }
   }

   return matchLang(locale) ?? matchLang(truncatedLocale) ?? enMessages
}

export const IntlProvider = ({ children }) => {
   //  const { language } = useLogin().preferences;
   //  const locale = language ?? getLocale();
   const locale = getLocale()

   return (
      <ReactIntlProvider locale={locale} messages={getMessages(locale)}>
         {children}
      </ReactIntlProvider>
   )
}

export const getLocale = () => {
   return (
      (navigator.languages && navigator.languages[0]) ??
      navigator.language ??
      DefaultLocale
   )
}
