export interface ILLMProvider {
  invoke(prompt: string): Promise<string>;
}