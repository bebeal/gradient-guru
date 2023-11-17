import { IconSetCache } from "@/components";

describe('IconSetCache', () => {
  it('should cache icon render functions correctly', () => {
    // Access the same icon twice
    const firstAccess = IconSetCache.Carbon.Add;
    const secondAccess = IconSetCache.Carbon.Add;

    // Expect that the same instance is returned
    expect(firstAccess).toBe(secondAccess);
    expect(firstAccess.displayName).toBe('IconSetCache.Carbon.Add');
  });

  it('should return different instances for different icons', () => {
    // Access two different icons
    const uploadIcon = IconSetCache.Carbon.Add;
    const downloadIcon = IconSetCache.Carbon.AddFilled;

    // Expect different instances for different icons
    expect(uploadIcon).not.toBe(downloadIcon);
    expect(uploadIcon.displayName).toBe('IconSetCache.Carbon.Add');
    expect(downloadIcon.displayName).toBe('IconSetCache.Carbon.AddFilled');
  });
});
