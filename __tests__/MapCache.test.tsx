import { Icon, IconCache } from "@/components";

describe('IconCache', () => {
  it('should cache icon render functions correctly', () => {
    // Access the same icon twice
    const firstAccess = IconCache.Carbon.Add;
    const secondAccess = IconCache.Carbon.Add;

    // Expect that the same instance is returned
    expect(firstAccess).toBe(secondAccess);
    expect(firstAccess.displayName).toBe('Icon.Carbon.Add');
  });

  it('should return different instances for different icons', () => {
    // Access two different icons
    const uploadIcon = IconCache.Carbon.Add;
    const downloadIcon = IconCache.Carbon.AddFilled;

    // Expect different instances for different icons
    expect(uploadIcon).not.toBe(downloadIcon);
    expect(uploadIcon.displayName).toBe('Icon.Carbon.Add');
    expect(downloadIcon.displayName).toBe('Icon.Carbon.AddFilled');
  });
});
