import { CodeLanguage, CodeLanguageProperties, CodeLanguages } from '../CustomIcons/CodeLanguages';

export const CodeLanguagesIconSet = Object.entries(CodeLanguages).reduce<Record<CodeLanguage, CodeLanguageProperties>>(
  (acc, [codeLanguage, codeLanguageProperties]) => {
    acc[codeLanguage as CodeLanguage] = codeLanguageProperties.icon;
    return acc;
  },
  {} as Record<CodeLanguage, any>,
);
