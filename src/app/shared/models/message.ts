import {CodeFile} from "./code-file";
import {ResourceFile} from "./resource-file";

export class Message {
  id: number;
  ja: string;
  vi: string;
  en: string;
  message_key: string;
  final: string;
  applied: boolean;
  tested: boolean;
  code_file_id: number;
  resource_file_id: number;
  code_file: CodeFile;
  resource_file: ResourceFile;
  customer_support: boolean;
  updated_by: string;
  updated_at: string;
  created_at: string;
}
