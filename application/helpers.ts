export abstract class Helpers {
  static async generateAuthenticationToken(): Promise<string> {
    return 'mocked-auth-token';
  }

  static generateAuthHeaders(token: string): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`
    };
  }
}
