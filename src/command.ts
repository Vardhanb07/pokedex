export type CLICommand = {
  name: string;
  description: string;
  callback: () => void;
};