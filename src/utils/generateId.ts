export function generateOpportunityId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}