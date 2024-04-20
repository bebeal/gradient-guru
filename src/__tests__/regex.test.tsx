import { dateRegex, emailRegex, phoneNumberRegex, postalCodeRegex, urlRegex } from '@/utils/regex';

interface TestData {
  passing: string[];
  failing: {
    input: string;
    reason: string;
  }[];
}

describe('Regular Expression Tests', () => {
  // Test data for Date Regex
  const dateTestData = {
    passing: ['2023-11-21'],
    failing: [{ input: '2023/11/21', reason: 'Date format should be YYYY-MM-DD' }],
  };

  // Test data for URL Regex
  const urlTestData = {
    passing: ['https://www.example.com'],
    failing: [{ input: 'example', reason: 'URL should include http:// or https:// and a domain' }],
  };

  // Test data for Phone Number Regex
  const phoneNumberTestData = {
    passing: ['(123) 456-7890'],
    failing: [{ input: '123-45-678', reason: 'Phone number should match the specified formats' }],
  };

  // Test data for Email Regex
  const emailTestData = {
    passing: ['test@example.com'],
    failing: [{ input: 'test@example', reason: 'Email should have a valid domain and extension' }],
  };

  // Test data for Postal Code Regex
  const postalCodeTestData = {
    passing: ['12345', '12345-1234'],
    failing: [
      { input: '1234', reason: 'US ZIP code should be 5 digits or 5-4 format' },
      { input: '123456', reason: 'US ZIP code should be 5 digits or 5-4 format' },
    ],
  };

  // Running tests for each regex
  const runTests = (regex: RegExp, testData: TestData, description: string) => {
    describe(description, () => {
      testData.passing.forEach((input: string) => {
        it(`should pass for valid format: ${input}`, () => {
          expect(regex.test(input)).toBeTruthy();
        });
      });
      testData.failing.forEach(({ input, reason }: { input: string; reason: string }) => {
        it(`should fail for ${input}: ${reason}`, () => {
          expect(regex.test(input)).toBeFalsy();
        });
      });
    });
  };

  // Execute tests
  runTests(dateRegex, dateTestData, 'Date Regex');
  runTests(urlRegex, urlTestData, 'URL Regex');
  runTests(phoneNumberRegex, phoneNumberTestData, 'Phone Number Regex');
  runTests(emailRegex, emailTestData, 'Email Regex');
  runTests(postalCodeRegex, postalCodeTestData, 'Postal Code Regex');
});
