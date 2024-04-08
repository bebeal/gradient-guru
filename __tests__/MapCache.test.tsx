import { CachedIcons } from "@/components";

describe('IconCache', () => {
  it('should cache icon render functions correctly', () => {
    // Access the same icon twice
    const firstAccess = CachedIcons.Carbon.Add;
    const secondAccess = CachedIcons.Carbon.Add;

    // Expect that the same instance is returned
    expect(firstAccess).toBe(secondAccess);
    expect(firstAccess.displayName).toBe('IconCache.Carbon.Add');
  });

  it('should return different instances for different icons', () => {
    // Access two different icons
    const uploadIcon = CachedIcons.Carbon.Add;
    const downloadIcon = CachedIcons.Carbon.AddFilled;

    // Expect different instances for different icons
    expect(uploadIcon).not.toBe(downloadIcon);
    expect(uploadIcon.displayName).toBe('IconCache.Carbon.Add');
    expect(downloadIcon.displayName).toBe('IconCache.Carbon.AddFilled');
  });
});
