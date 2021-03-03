declare interface String {
  format: (data: unknown[] | { [key: string]: any }) => string;
}
